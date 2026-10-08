"use client";

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => {
  if (!res.ok) throw new Error("Failed to fetch market data");
  return res.json();
});

export function useMarketData() {
  const { data, error, isLoading, isValidating } = useSWR(
    '/api/signals',
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 86400000, // 24 hours in ms
      focusThrottleInterval: 86400000,
    }
  );

  return {
    marketData: data,
    isLoading,
    isError: error,
    isValidating
  };
}
