import { useAuth } from "base-shell/lib/providers/Auth";
import { useEffect, useState } from "react";
import { useDeepCompareCallback } from "use-deep-compare";

import { createCachingKey, request } from "utils";

/**
 * @param {string} path
 * @param {Object} initialData
 * @param {Object} params
 * @param {Object.<string, any>} params.search
 * @param {Object} params.body
 * @param {('GET' | 'POST' | 'PUT')} params.method
 */
export function useRequest(path, initialData, params = {}, manual = false, cached = false) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(!manual);
  const [error, setError] = useState(null);
  const { setAuth } = useAuth();

  const fetchData = useDeepCompareCallback(async () => {
    try {
      let cachedResponse = null;
      
      const cachingBlob = {path, params};
      const cachingKey = createCachingKey(cachingBlob);
      if (cached) {
        const rawCachedResponse = localStorage.getItem(cachingKey);
        if (rawCachedResponse) {
          cachedResponse = JSON.parse(rawCachedResponse);
          setData(cachedResponse);
          setLoading(false);
          return;
        }
      }

      const response = await request(path, params);
      if (response.status === 200) {
        const jsonResponse = await response.json();
        if (cached) {
          localStorage.setItem(cachingKey, JSON.stringify(jsonResponse));
        }
        setData(jsonResponse);
      } else {
        if (response.status === 401) {
          setAuth({ isAuthenticated: false });
        }
        throw new Error(`Error! status: ${response.status}`);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [path, params]);

  useEffect(() => {
    if (!manual) {
      fetchData();
    }
  }, [fetchData, manual]);

  return {
    data, loading, error, performRequest: fetchData 
  };
}
