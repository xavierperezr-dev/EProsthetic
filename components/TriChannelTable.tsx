import React from 'react';
import { Language } from '../types';

interface TablaTriChannelProps {
  t: any; // Translation object for this specific table
  storeCountry: Language;
  isTableEditMode?: boolean;
  data: any[];
  onDataChange: (data: any[]) => void;
}

const getStorePath = (country: Language): string => {
  switch (country) {
    case 'fr': return 'fr/fr';
    case 'pt': return 'pt/pt';
    case 'sv': return 'se/se';
    default: return 'es/es';
  }
};


const TablaTriChannel: React.FC<TablaTriChannelProps> = ({ t, storeCountry, isTableEditMode, data, onDataChange }) => {
  const platformHeaders = ['np', 'rp', 'wp', '6'];
  
  const platformHeaderLabels: { [key: string]: string } = {
    np: 'NP',
    rp: 'RP',
    wp: 'WP',
    '6': '6.0',
  };

  const platformColors: { [key: string]: string } = {
    np: 'text-pink-600',
    rp: 'text-amber-600',
    wp: 'text-blue-600',
    '6': 'text-green-600',
  };

  const handleLabelBlur = (e: React.FocusEvent<HTMLTableCellElement>, rowIndex: number) => {
    const newValue = e.target.innerText;
    const currentLabel = (data[rowIndex] as any).label ?? t[(data[rowIndex] as any).rowKey];
    if (currentLabel !== newValue) {
        const newData = data.map((row, i) => {
            if (i === rowIndex) {
                return { ...row, label: newValue };
            }
            return row;
        });
        onDataChange(newData);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLSpanElement>, rowIndex: number, colKey: string) => {
    const newValue = e.target.innerText;
    if (data[rowIndex][colKey] !== newValue) {
      const newData = [...data];
      newData[rowIndex] = { ...newData[rowIndex], [colKey]: newValue };
      onDataChange(newData);
    }
  };

  const renderCellContent = (ref: string, rowKey: string, rowIndex: number, colKey: string) => {
    if (!ref || ref === '—') {
      return (
        <span
          onBlur={(e) => isTableEditMode && handleBlur(e, rowIndex, colKey)}
          contentEditable={isTableEditMode}
          suppressContentEditableWarning
          className={isTableEditMode ? "outline-none focus:bg-amber-100 rounded px-1" : "text-slate-500"}
        >
          {ref === '—' ? '—' : ''}
        </span>
      );
    }

    let text = ref;
    let searchTerm = ref.replace('*', '').trim();
    const storePath = getStorePath(storeCountry);

    if (rowKey === 'destornillador') {
        text = `${t.destornillador} ${searchTerm}`;
        searchTerm = text;
    }
    
    if (isTableEditMode) {
        return (
            <span
              onBlur={(e) => handleBlur(e, rowIndex, colKey)}
              contentEditable
              suppressContentEditableWarning
              className="font-semibold text-[color:var(--accent-primary)] outline-none focus:bg-amber-100 rounded px-1"
            >
              {text}
            </span>
        );
    }
    
    const url = `https://store.nobelbiocare.com/${storePath}/catalogsearch/result/?q=${encodeURIComponent(searchTerm)}`;

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-[color:var(--accent-primary)] hover:text-[color:var(--accent-primary-hover)] hover:underline transition-colors"
      >
        {text}
      </a>
    );
  };

  return (
    <div className="p-4">
      <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">{t.conexionHeader}</th>
              {platformHeaders.map(p => (
                <th key={p} className={`px-4 py-2 text-center text-xs font-semibold uppercase tracking-wider ${platformColors[p]}`}>
                  {platformHeaderLabels[p]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {data.map((row, rowIndex) => (
              <tr key={row.rowKey} className="hover:bg-slate-50">
                <td 
                  className="px-4 py-2 whitespace-nowrap font-medium text-slate-800"
                  onBlur={(e) => isTableEditMode && handleLabelBlur(e, rowIndex)}
                  contentEditable={isTableEditMode}
                  suppressContentEditableWarning={true}
                >
                  {(row as any).label ?? t[row.rowKey]}
                </td>
                {platformHeaders.map(p => (
                  <td key={p} className="px-4 py-2 whitespace-nowrap text-center">
                    {renderCellContent((row as any)[p], row.rowKey, rowIndex, p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-xs text-slate-500 mt-2 text-right">
        {t.footer}
      </div>
    </div>
  );
};

export default TablaTriChannel;