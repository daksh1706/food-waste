import React from 'react';
import { Download } from 'lucide-react';
import { WasteRecord } from '../../types/waste';
import { formatRecordsForCSV } from '../../utils/exportFormatters';

interface ExportButtonProps {
  records: WasteRecord[];
  type: 'csv' | 'pdf';
}

export function ExportButton({ records, type }: ExportButtonProps) {
  const exportData = () => {
    if (type === 'csv') {
      const csvContent = formatRecordsForCSV(records);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `waste-report-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
    }
  };

  return (
    <button
      onClick={exportData}
      className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
    >
      <Download className="w-4 h-4 mr-2" />
      Export {type.toUpperCase()}
    </button>
  );
}