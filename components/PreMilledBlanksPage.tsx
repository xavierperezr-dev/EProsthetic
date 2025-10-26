import React from 'react';
import { ChevronLeftIcon, DownloadIcon, InfoIcon } from './icons';
import DownloadLibraries from './DownloadLibraries';
import { Language } from '../types';

interface PreMilledBlanksPageProps {
  t: any; // Translation object for this page
  storeCountry: Language;
  connectionType?: string;
  isTableEditMode?: boolean;
  data: any[];
  onDataChange: (newData: any[]) => void;
  imageUrl?: string;
}

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => {
  return (
    <div className="relative flex items-center group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-md p-2 text-sm text-white bg-gray-900 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none text-left">
        {text}
      </div>
    </div>
  );
};

const getKitSearchTerm = (ref: string): string => {
  switch (ref) {
      case 'IO 2B SA Kit': return '300456';
      case 'IO 6A Kit': return '300455';
      case 'IO 2A Kit': return '300451';
      case 'IO 2B Kit': return '37375';
      case 'IO 2C Kit': return '29007';
      default: return ref;
  }
};

const getStorePath = (country: Language): string => {
  switch (country) {
    case 'fr': return 'fr/fr';
    case 'pt': return 'pt/pt';
    case 'sv': return 'se/se';
    default: return 'es/es';
  }
};

const ConnectionTable: React.FC<{
  connectionKey: 'cc' | 'externalHex' | 'triChannel';
  title: string;
  t: any;
  storeCountry: Language;
  imageUrl?: string;
  isTableEditMode: boolean;
  data: any[];
  onDataChange: (newData: any[]) => void;
}> = ({ connectionKey, title, t, storeCountry, imageUrl, isTableEditMode, data, onDataChange }) => {
  const platforms = ['np', 'rp', 'wp'];
  const platformColors: { [key: string]: string } = {
    np: 'text-pink-600',
    rp: 'text-amber-600',
    wp: 'text-blue-600',
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

  const handleBlur = (e: React.FocusEvent<HTMLSpanElement>, rowIndex: number, platform: string, isKit: boolean) => {
    const newValue = e.target.innerText;
    const currentData = data[rowIndex][connectionKey];

    if (!currentData) return;

    const currentValue = isKit ? currentData.kit : currentData[platform];

    if (currentValue !== newValue) {
        const newData = JSON.parse(JSON.stringify(data));
        if (isKit) {
            newData[rowIndex][connectionKey].kit = newValue;
        } else {
            newData[rowIndex][connectionKey][platform] = newValue;
        }
        onDataChange(newData);
    }
  };

  const renderCell = (ref: string | undefined, rowKey: string, rowIndex: number, platform: string, isKit: boolean) => {
    if (!ref || ref === '-') {
      return (
        <span 
          onBlur={(e) => isTableEditMode && handleBlur(e, rowIndex, platform, isKit)}
          contentEditable={isTableEditMode}
          suppressContentEditableWarning
          className={isTableEditMode ? "outline-none focus:bg-amber-100 rounded px-1" : "text-slate-400"}
        >
          {ref || '—'}
        </span>
      );
    }
    const storePath = getStorePath(storeCountry);
    
    let searchTerm = ref.replace('*', '');
    let displayText = searchTerm;

    if (rowKey === 'screwdriver' && (searchTerm.toLowerCase().includes('unigrip') || searchTerm.toLowerCase().includes('omnigrip'))) {
      displayText = `${t.screwdriver} ${searchTerm}`;
      searchTerm = displayText;
    } else if (rowKey === 'scanbodiesKit') {
      searchTerm = getKitSearchTerm(searchTerm);
    }
    
    if (isTableEditMode) {
      return (
        <span
          onBlur={(e) => handleBlur(e, rowIndex, platform, isKit)}
          contentEditable
          suppressContentEditableWarning
          className="font-semibold text-[color:var(--accent-primary)] outline-none focus:bg-amber-100 rounded px-1"
        >
          {displayText}
        </span>
      );
    }

    const url = `https://store.nobelbiocare.com/${storePath}/catalogsearch/result/?q=${encodeURIComponent(searchTerm)}`;
    const PRE_MILLED_DESCRIPTIONS: { [key: string]: string } = t.PRE_MILLED_DESCRIPTIONS || {};
    const showInfoIcon = (rowKey === 'diameter10' || rowKey === 'diameter14') && PRE_MILLED_DESCRIPTIONS[searchTerm];

    const content = (
      <a href={url} className="font-semibold text-[color:var(--accent-primary)] hover:text-[color:var(--accent-primary-hover)] hover:underline transition-colors" target="_blank" rel="noopener noreferrer">
        {displayText}
      </a>
    );

    return (
      <div className="flex items-center justify-center gap-1">
        {content}
        {!isTableEditMode && showInfoIcon && (
          <Tooltip text={PRE_MILLED_DESCRIPTIONS[searchTerm]}>
            <InfoIcon className="h-4 w-4 text-slate-400 cursor-pointer" />
          </Tooltip>
        )}
      </div>
    );
  };

  return (
    <div className="mb-8 last:mb-0">
      <div className="flex items-center gap-3 mb-3">
        {imageUrl && (
          <div className="flex-shrink-0">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-16 h-16 object-contain rounded-md border p-1 bg-white" 
            />
          </div>
        )}
        <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
      </div>
      <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
        <table className="min-w-full text-xs">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-1.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">{t.component_header}</th>
              {platforms.map(p => (
                <th key={p} className={`px-3 py-1.5 text-center text-xs font-semibold uppercase tracking-wider ${platformColors[p]}`}>
                  {p.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((row, rowIndex) => {
              const connData = row[connectionKey] as any;
              
              const isRowEmpty = connData.kit 
                ? (!connData.kit || connData.kit === '-') 
                : platforms.every(p => !connData[p] || connData[p] === '-');

              if (isRowEmpty) {
                return null;
              }

              return (
                <tr key={row.rowKey} className="hover:bg-slate-50 transition-colors duration-150">
                  <td 
                    className="px-3 py-1.5 whitespace-normal text-xs font-medium text-slate-800 text-left bg-white border-b border-slate-200"
                    onBlur={(e) => isTableEditMode && handleLabelBlur(e, rowIndex)}
                    contentEditable={isTableEditMode}
                    suppressContentEditableWarning={true}
                  >
                    {(row as any).label ?? t[row.rowKey]}
                  </td>
                  {connData.kit ? (
                    <td colSpan={3} className="px-2 py-1.5 text-center whitespace-nowrap text-xs text-slate-600 border-b border-l border-slate-200">
                      {renderCell(connData.kit, row.rowKey, rowIndex, 'kit', true)}
                    </td>
                  ) : (
                    platforms.map(platform => (
                      <td key={`${connectionKey}-${platform}`} className="px-2 py-1.5 text-center whitespace-nowrap text-xs text-slate-600 border-b border-l border-slate-200">
                        {renderCell(connData[platform], row.rowKey, rowIndex, platform, false)}
                      </td>
                    ))
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PreMilledBlanksPage: React.FC<PreMilledBlanksPageProps> = ({ t, storeCountry, connectionType, isTableEditMode, data, onDataChange, imageUrl }) => {
  const renderConnectionTable = () => {
    switch (connectionType) {
      case 'CC':
        return <ConnectionTable connectionKey="cc" title="Conical Connection (CC)" t={t} storeCountry={storeCountry} imageUrl={imageUrl} isTableEditMode={!!isTableEditMode} data={data} onDataChange={onDataChange} />;
      case 'Branemark':
        return <ConnectionTable connectionKey="externalHex" title="Brånemark System® (Hexágono Externo)" t={t} storeCountry={storeCountry} imageUrl={imageUrl} isTableEditMode={!!isTableEditMode} data={data} onDataChange={onDataChange} />;
      case 'Tri-channel':
        return <ConnectionTable connectionKey="triChannel" title="NobelReplace® (Tri-channel)" t={t} storeCountry={storeCountry} imageUrl={imageUrl} isTableEditMode={!!isTableEditMode} data={data} onDataChange={onDataChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div className="space-y-8">
        {renderConnectionTable()}
      </div>

      <div className="text-xs text-slate-500 mt-4 text-left">
          <p>{t.footer}</p>
          <p className="font-semibold">{t.notes}</p>
      </div>
    </div>
  );
};

export default PreMilledBlanksPage;