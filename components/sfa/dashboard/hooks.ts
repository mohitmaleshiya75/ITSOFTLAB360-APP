import Constants from "expo-constants";
import { useCallback, useEffect, useRef, useState } from "react";

/* ============================================================
   FIXED SUPER ADMIN JWT ACCESS TOKEN
   Paste the REAL accessToken from your SFA backend here:
============================================================ */
const SUPER_ADMIN_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkNDc0MDdmMC00Y2Y1LTRmYWMtOTI5NS0zNTFiZjY5Njg5ZGMiLCJvcmdhbml6YXRpb25JZCI6Ijk5ZmQxN2MxLWJkZjQtNGQ1MC04OGY0LWI4OWQ5N2FmZTkwNSIsInJvbGVJZCI6ImJlMmM5YTI2LTMwNDAtNGExNS04Y2VhLTEzOWQ3MWQ0ZjMyOCIsInJvbGVOYW1lIjoiT3JnYW5pemF0aW9uIFN1cGVyIEFkbWluIiwicGVybWlzc2lvbnMiOltdLCJpYXQiOjE3OTAwNjUyNjMsImV4cCI6MTc5MDA5NDA2M30.pN6H0tQ6kpJS0P7Bw0cJV8EmOEa1tb_9kAdcdQXkSCc";

/* ============================================================
   TYPESCRIPT INTERFACES
============================================================ */

export interface OrganizationOverview {
  organizations?: number;
  companies?: number;
  branches?: number;
  departments?: number;
  teams?: number;
  users?: number;
}

export interface DashboardCards {
  totalOrganizations?: number;
  totalCompanies?: number;
  totalBranches?: number;
  totalDepartments?: number;
  totalTeams?: number;
  totalUsers?: number;
  totalCustomers?: number;
  totalSalesOrders?: number;
  totalRevenue?: number;
  todaysRevenue?: number;
  totalVisits?: number;
  todayVisits?: number;
  pendingVisits?: number;
  completedVisits?: number;
  presentEmployees?: number;
  absentEmployees?: number;
  leaveRequests?: number;
}

export interface MonthlyRevenueItem {
  month: string;
  revenue: number;
}

export interface RecentOrder {
  id: string;
  orderNumber?: string;
  status?: string;
  totalAmount?: number;
  createdAt?: string;
  customer?: {
    name?: string;
  };
}

export interface LicenseQuota {
  maxLicenses?: number;
  consumedLicenses?: number;
  availableLicenses?: number;
  isLimitReached?: boolean;
}

export interface RecentOrganization {
  id?: string;
  name?: string;
  slug?: string;
  createdAt?: string;
}

export interface RecentUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: string;
}

export interface SuperAdminDashboardData {
  organizationOverview?: OrganizationOverview;
  cards?: DashboardCards;
  orders?: {
    DRAFT?: { count?: number; revenue?: number };
    COMPLETED?: { count?: number; revenue?: number };
    APPROVED?: { count?: number; revenue?: number };
    PENDING?: { count?: number };
    CANCELLED?: { count?: number };
  };
  monthlyRevenue?: MonthlyRevenueItem[];
  recentOrders?: RecentOrder[];
  licenseQuota?: LicenseQuota;
  license?: LicenseQuota;
  recentOrganizations?: RecentOrganization[];
  recentCompanies?: any[];
  recentUsers?: RecentUser[];
  organizationInfo?: {
    name?: string;
  };
  targets?: {
    metric?: string;
    targetValue?: number;
    achievedValue?: number;
  }[];
  visitSummary?: Record<string, number>;
  attendanceToday?: Record<string, number>;
}

export interface SuperAdminDashboardApiResponse {
  success: boolean;
  message?: string;
  timestamp?: string;
  data: SuperAdminDashboardData;
}

export interface UseSuperAdminDashboardReturn {
  dashboard: SuperAdminDashboardData | null;
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  refresh: () => Promise<void>;
}

/* ============================================================
   API CONFIGURATION
============================================================ */

/**
 * Resolve candidate API base URLs in priority order:
 * 1. EXPO_PUBLIC_API_URL if configured
 * 2. Active laptop LAN IP auto-detected from Expo Go's Metro connection
 * 3. Active laptop Wi-Fi IP (192.168.1.36:5000)
 * 4. Secondary Wi-Fi fallback (192.168.29.83:5000)
 */
export function getCandidateBaseUrls(): string[] {
  const candidates: string[] = [];

  const envUrl =
    typeof process !== "undefined" && process.env?.EXPO_PUBLIC_API_URL
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

  // Active Wi-Fi LAN IP of development machine
  candidates.push("http://192.168.1.36:5000");
  // Known alternative LAN IP
  candidates.push("http://192.168.29.83:5000");

  // Deduplicate preserving order
  return Array.from(new Set(candidates));
}

export function getApiBaseUrl(): string {
  return getCandidateBaseUrls()[0] || "http://192.168.1.36:5000";
}

/* ============================================================
   API FETCH FUNCTION
============================================================ */

/**
 * Fetch Super Admin Dashboard data strictly from GET /api/v1/dashboard/superadmin
 * Uses fixed SUPER_ADMIN_JWT in Authorization Bearer header.
 */
export async function fetchSuperAdminDashboard(
  signal?: AbortSignal
): Promise<SuperAdminDashboardData> {
  if (
    !SUPER_ADMIN_JWT ||
    SUPER_ADMIN_JWT.includes("PASTE_REAL_SUPER_ADMIN_ACCESS_TOKEN_HERE") ||
    SUPER_ADMIN_JWT.trim() === ""
  ) {
    const err = "REAL JWT TOKEN HAS NOT BEEN INSERTED";
    console.log("[SFA] JWT available: false");
    console.log("[SFA] Dashboard request failed:", err);
    throw new Error(err);
  }

  console.log("[SFA] JWT available:", Boolean(SUPER_ADMIN_JWT));
  console.log("[SFA] JWT length:", SUPER_ADMIN_JWT.length);

  const candidateUrls = getCandidateBaseUrls();
  let lastError: Error | null = null;

  for (let i = 0; i < candidateUrls.length; i++) {
    const baseUrl = candidateUrls[i];
    const endpoint = `${baseUrl}/api/v1/dashboard/superadmin`;

    console.log("[SFA] API base URL:", baseUrl);
    console.log("[SFA] Dashboard API URL:", endpoint);
    console.log("[SFA] Request started");

    const headers: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPER_ADMIN_JWT}`,
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
      console.log(`[SFA] Connection failed on ${baseUrl}:`, networkErr?.message || networkErr);
      lastError = new Error("Unable to connect to SFA backend.");
      // Try next candidate URL if available
      continue;
    } finally {
      clearTimeout(timeoutId);
      if (signal) {
        signal.removeEventListener("abort", onCallerAbort);
      }
    }

    console.log("[SFA] Response status:", response.status);
    console.log("[SFA] Response content-type:", response.headers.get("content-type"));

    let responseText = "";
    try {
      responseText = await response.text();
      console.log("[SFA] Response body preview:", responseText.slice(0, 120));
    } catch {
      // ignore preview error
    }

    if (response.status === 200) {
      let json: any;
      try {
        json = JSON.parse(responseText);
      } catch {
        throw new Error("Server error.");
      }

      if (json && typeof json === "object") {
        console.log("[SFA] Dashboard response status: 200");
        console.log("[SFA] Dashboard request successful — real data received");
        if ("data" in json && json.data) {
          return json.data as SuperAdminDashboardData;
        }
        return json as SuperAdminDashboardData;
      }
      throw new Error("Server error.");
    }

    if (response.status === 401) {
      console.log("[SFA] Dashboard response status: 401");
      console.log("[SFA] Authentication failed — token invalid or expired.");
      throw new Error("Super Admin authentication token is invalid or expired.");
    }

    if (response.status === 403) {
      console.log("[SFA] Dashboard response status: 403");
      throw new Error("Super Admin is not authorized.");
    }

    if (response.status === 404) {
      console.log("[SFA] Dashboard response status: 404");
      throw new Error("Dashboard endpoint not found (HTTP 404).");
    }

    if (response.status >= 500) {
      console.log("[SFA] Dashboard response status:", response.status);
      throw new Error(`Server error (HTTP ${response.status}).`);
    }

    throw new Error(`Server error (HTTP ${response.status}).`);
  }

  throw lastError || new Error("Unable to connect to SFA backend.");
}

/* ============================================================
   MAIN HOOK: useSuperAdminDashboard
============================================================ */

export function useSuperAdminDashboard(): UseSuperAdminDashboardReturn {
  const [dashboard, setDashboard] = useState<SuperAdminDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const isMountedRef = useRef<boolean>(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const executeFetch = useCallback(
    async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const data = await fetchSuperAdminDashboard(controller.signal);
        if (isMountedRef.current) {
          setDashboard(data);
          setError(null);
        }
      } catch (err: any) {
        if (err?.name === "AbortError" && !isMountedRef.current) {
          return;
        }
        if (controller.signal.aborted && !isMountedRef.current) {
          return;
        }
        const errorMessage =
          err?.message || "Unable to connect to SFA backend.";
        console.log("[SFA] Dashboard request failed:", errorMessage);
        if (isMountedRef.current) {
          setDashboard(null);
          setError(errorMessage);
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    []
  );

  const refresh = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    await executeFetch();
  }, [executeFetch]);

  useEffect(() => {
    isMountedRef.current = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    refreshing,
    refresh,
  };
}

