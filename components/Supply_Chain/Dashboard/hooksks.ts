import Constants from "expo-constants";
import { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

/* ============================================================
   TYPESCRIPT INTERFACES FOR SCLM ADMIN DASHBOARD
============================================================ */

export interface SclmLicenseUsage {
  total?: number;
  used?: number;
  remaining?: number;
}

export interface SclmInventorySummary {
  availableQuantity?: number;
  reservedQuantity?: number;
  damagedQuantity?: number;
  totalQuantity?: number;
}

export interface SclmDashboardCards {
  users?: number;
  activeUsers?: number;
  inactiveUsers?: number;
  blockedUsers?: number;
  products?: number;
  suppliers?: number;
  warehouses?: number;
  purchaseOrders?: number;
  supplierContracts?: number;
  inventory?: SclmInventorySummary;
  lowStock?: number;
  reorderAlerts?: number;
  incomingGoods?: number;
  outgoingGoods?: number;
  pendingPurchaseOrders?: number;
  pendingFulfilment?: number;
  pendingWarehouse?: number;
  activeShipments?: number;
  deliveredShipments?: number;
  delayedShipments?: number;
  availableDrivers?: number;
  availableVehicles?: number;
}

export interface SclmUserRoleCount {
  role?: string;
  code?: string;
  count: number;
}

export interface SclmRecentActivity {
  id?: string;
  action?: string;
  details?: string;
  user?: string;
  userName?: string;
  userEmail?: string;
  entityType?: string | null;
  createdAt?: string;
}

export interface SclmAdminDashboardData {
  licenses?: SclmLicenseUsage;
  cards?: SclmDashboardCards;
  usersByRole?: SclmUserRoleCount[];
  recentActivities?: SclmRecentActivity[];
  rolePerformance?: any[];
  reports?: any[];
}

export interface SclmDashboardApiResponse {
  success: boolean;
  message?: string;
  data: SclmAdminDashboardData;
}

export interface UseSupplyChainDashboardReturn {
  dashboard: SclmAdminDashboardData | null;
  loading: boolean;
  error: string | null;
  httpStatus: number | null;
  refreshing: boolean;
  refresh: () => Promise<void>;
}

/* ============================================================
   STORAGE & AUTHENTICATION UTILITIES
============================================================ */

async function getStorageItem(key: string): Promise<string | null> {
  if (Platform.OS === "web") {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn("Storage read error (web):", e);
    }
    return null;
  }
  try {
    return await SecureStore.getItemAsync(key);
  } catch (e) {
    console.warn("Storage read error (native):", e);
    return null;
  }
}

const SCLM_TEST_ADMIN_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNjliZGZiNS0yZThlLTQ0ZTMtYTcwNy00NzAzZGNmMDQxMjUiLCJ1c2VySWQiOiIyNjliZGZiNS0yZThlLTQ0ZTMtYTcwNy00NzAzZGNmMDQxMjUiLCJyb2xlIjoiQURNSU4iLCJvcmdhbml6YXRpb25JZCI6ImFhYWFhYWFhLTAwMDAtNDAwMC1hMDAwLTAwMDAwMDAwMDAwMSIsImFkbWluSWQiOm51bGwsImNyZWF0ZWRCeU9yZGVyTWFuYWdlcklkIjpudWxsLCJpYXQiOjE3OTAxNjE2NzEsImV4cCI6MTc5Mjc1MzY3MX0.QbG2xpzPV1QkMbVk02cdz2ubqjD0_uoj1i2zpbGNagQ";

/**
 * Resolves SCLM Authentication Token.
 * 1. Checks persistent storage (SecureStore/localStorage)
 * 2. Checks temporary development test token (EXPO_PUBLIC_SCLM_TEST_JWT in .env)
 * 3. Fallbacks to verified development SCLM test-admin JWT
 */
export async function getSclmAuthToken(): Promise<string | null> {
  // Check persistent storage keys
  const storageKeys = [
    "sclm_access_token",
    "accessToken",
    "access_token",
    "authToken",
    "jwt_token",
    "token",
  ];

  for (const key of storageKeys) {
    const token = await getStorageItem(key);
    if (token && token.trim().length > 0) {
      return token.trim();
    }
  }

  // Development environment variable fallback
  if (
    typeof process !== "undefined" &&
    process.env?.EXPO_PUBLIC_SCLM_TEST_JWT &&
    process.env.EXPO_PUBLIC_SCLM_TEST_JWT.trim().length > 0
  ) {
    return process.env.EXPO_PUBLIC_SCLM_TEST_JWT.trim();
  }

  // Fallback to verified development SCLM test-admin token (matching SFA pattern)
  return SCLM_TEST_ADMIN_JWT;
}

/* ============================================================
   API BASE URL RESOLUTION
============================================================ */

export function getCandidateBaseUrls(): string[] {
  const candidates: string[] = [];

  const envUrl =
    typeof process !== "undefined" && process.env?.EXPO_PUBLIC_SCLM_API_URL
      ? process.env.EXPO_PUBLIC_SCLM_API_URL.trim()
      : typeof process !== "undefined" && process.env?.EXPO_PUBLIC_API_URL
      ? process.env.EXPO_PUBLIC_API_URL.trim()
      : "";

  if (envUrl.length > 0) {
    candidates.push(envUrl.replace(/\/+$/, "").replace(/\/api\/v1\/?$/, ""));
  }

  // Auto-detect development machine host IP from Expo Go Metro connection
  try {
    const hostUri = Constants.expoConfig?.hostUri;
    if (hostUri) {
      const host = hostUri.split(":")[0];
      if (host && host !== "localhost" && host !== "127.0.0.1") {
        candidates.push(`http://${host}:5000`);
      }
    }
  } catch {
    // ignore
  }

  // Local development defaults
  candidates.push("http://localhost:5000");
  candidates.push("http://127.0.0.1:5000");
  candidates.push("http://192.168.1.36:5000");
  candidates.push("http://192.168.29.83:5000");

  return Array.from(new Set(candidates));
}

export function getSclmApiBaseUrl(): string {
  return getCandidateBaseUrls()[0] || "http://localhost:5000";
}

/* ============================================================
   API FETCH FUNCTION
============================================================ */

export async function fetchSclmAdminDashboard(
  signal?: AbortSignal
): Promise<{ data: SclmAdminDashboardData; status: number }> {
  const token = await getSclmAuthToken();

  if (!token) {
    throw new Error(
      "AUTHENTICATION_BLOCKED: No valid SCLM authentication token found. Configure EXPO_PUBLIC_SCLM_TEST_JWT or log in."
    );
  }

  const candidateUrls = getCandidateBaseUrls();
  let lastError: Error | null = null;
  let lastStatus: number | null = null;

  for (let i = 0; i < candidateUrls.length; i++) {
    const baseUrl = candidateUrls[i];
    const endpoint = `${baseUrl}/api/v1/admin/dashboard`;

    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const timeoutController = new AbortController();
    const timeoutId = setTimeout(() => {
      timeoutController.abort();
    }, 10000);

    const onCallerAbort = () => {
      timeoutController.abort();
    };

    if (signal) {
      if (signal.aborted) {
        clearTimeout(timeoutId);
        const abortErr = new Error("Aborted");
        abortErr.name = "AbortError";
        throw abortErr;
      }
      signal.addEventListener("abort", onCallerAbort);
    }

    let response: Response;
    try {
      response = await fetch(endpoint, {
        method: "GET",
        headers,
        signal: timeoutController.signal,
      });
    } catch (networkErr: any) {
      clearTimeout(timeoutId);
      if (signal) {
        signal.removeEventListener("abort", onCallerAbort);
      }
      if (signal?.aborted) {
        const abortErr = new Error("Aborted");
        abortErr.name = "AbortError";
        throw abortErr;
      }
      lastError = new Error(`Connection failed on ${baseUrl}: ${networkErr?.message || "Unreachable"}`);
      continue;
    } finally {
      clearTimeout(timeoutId);
      if (signal) {
        signal.removeEventListener("abort", onCallerAbort);
      }
    }

    lastStatus = response.status;

    let responseText = "";
    try {
      responseText = await response.text();
    } catch {
      // ignore preview error
    }

    if (response.status === 200) {
      let json: any;
      try {
        json = JSON.parse(responseText);
      } catch {
        throw new Error("Invalid JSON returned from SCLM server.");
      }

      if (json && typeof json === "object") {
        if ("data" in json && json.data) {
          return { data: json.data as SclmAdminDashboardData, status: 200 };
        }
        return { data: json as SclmAdminDashboardData, status: 200 };
      }
      throw new Error("Invalid response format from SCLM server.");
    }

    if (response.status === 401) {
      throw new Error("SCLM authentication failed: Token is invalid or expired (HTTP 401).");
    }

    if (response.status === 403) {
      throw new Error("SCLM authorization failed: User lacks ADMIN privileges (HTTP 403).");
    }

    if (response.status === 404) {
      throw new Error("SCLM endpoint not found: GET /api/v1/admin/dashboard (HTTP 404).");
    }

    if (response.status >= 500) {
      throw new Error(`SCLM Server Error (HTTP ${response.status}).`);
    }

    throw new Error(`SCLM request returned unexpected status (HTTP ${response.status}).`);
  }

  throw lastError || new Error(`Unable to connect to SCLM backend on port 5000 (Last status: ${lastStatus || "unknown"}).`);
}

/* ============================================================
   MAIN HOOK: useSupplyChainDashboard
============================================================ */

export function useSupplyChainDashboard(): UseSupplyChainDashboardReturn {
  const [dashboard, setDashboard] = useState<SclmAdminDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [httpStatus, setHttpStatus] = useState<number | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const isMountedRef = useRef<boolean>(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const executeFetch = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const result = await fetchSclmAdminDashboard(controller.signal);
      if (isMountedRef.current) {
        setDashboard(result.data);
        setHttpStatus(result.status);
        setError(null);
      }
    } catch (err: any) {
      if (err?.name === "AbortError" && !isMountedRef.current) {
        return;
      }
      if (controller.signal.aborted && !isMountedRef.current) {
        return;
      }
      const errorMessage = err?.message || "Unable to connect to SCLM backend.";
      if (isMountedRef.current) {
        setDashboard(null);
        setError(errorMessage);
        setHttpStatus(null);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    await executeFetch();
  }, [executeFetch]);

  useEffect(() => {
    isMountedRef.current = true;
    void executeFetch();

    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [executeFetch]);

  return {
    dashboard,
    loading,
    error,
    httpStatus,
    refreshing,
    refresh,
  };
}
