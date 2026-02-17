import { WasteRecord } from '../types/waste';
import { format } from 'date-fns';

export function formatRecordsForCSV(records: WasteRecord[]): string {
  const headers = ['Date', 'Amount (kg)', 'Comments'];
  const rows = records.map(record => [
    format(new Date(record.date), 'yyyy-MM-dd'),
    record.waste_amount.toString(),
    `"${(record.comments || '').replace(/"/g, '""')}"`
  ]);

  return [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
}