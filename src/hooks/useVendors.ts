import { useState, useEffect } from 'react';
import { Vendor } from '../types';
import { vendorAPI } from '../services/api';

export function useVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        const data = await vendorAPI.getAll();
        setVendors(data);
      } catch (err) {
        setError('Failed to fetch vendors');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  return { vendors, loading, error };
}