import { useState, useEffect, useCallback } from "react";

export function useApiSimulation(delayMs: number = 2000) {
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        let mounted = true;
        const timer = setTimeout(() => {
            if (mounted) {
                setIsLoading(false);
            }
        }, delayMs);

        return () => {
            mounted = false;
            clearTimeout(timer);
        };
    }, [delayMs]);

    const handleRefresh = useCallback(() => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
        }, delayMs);
    }, [delayMs]);

    return {
        isLoading,
        isRefreshing,
        handleRefresh,
    };
}
