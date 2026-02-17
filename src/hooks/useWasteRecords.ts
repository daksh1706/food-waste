import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { WasteRecord } from '../lib/supabase-types';

export function useWasteRecords() {
  const [records, setRecords] = useState<WasteRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    fetchRecords();

    // Set up real-time subscription
    const subscription = supabase
      .channel('waste_records_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'waste_records' },
        (payload) => {
          setRecords(current => [...current, payload.new as WasteRecord]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchRecords() {
    try {
      const { data, error } = await supabase
        .from('waste_records')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (error) {
      console.error('Error fetching waste records:', error);
    } finally {
      setLoading(false);
    }
  }

  return { records, loading };
}