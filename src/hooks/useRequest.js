import { useAuth } from 'base-shell/lib/providers/Auth';
import { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { request } from 'utils';

/**
 * @param {string} path
 * @param {Object} initialData
 * @param {Object} params
 * @param {Object.<string, any>} params.search
 * @param {Object} params.body
 * @param {('GET' | 'POST' | 'PUT')} params.method
 */
export function useRequest(path, initialData, params = {}) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setAuth } = useAuth()

  useDeepCompareEffect(() => {
    async function fetchData() {
      try {
        const response = await request(path, params);
        if (response.status === 200) {
          setData(await response.json());
        } else {
          if (response.status === 401) {
            setAuth({ isAuthenticated: false })
          }
          throw new Error(`Error! status: ${response.status}`);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, [path, params]);

  return { data, loading, error };
}
