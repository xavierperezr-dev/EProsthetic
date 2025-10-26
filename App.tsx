import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import { GoogleGenAI } from "@google/genai";
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import CaseGrid from './components/CaseGrid';
import Footer from './components/Footer';
import Modal from './components/Modal';
import PreMilledBlanksPage from './components/PreMilledBlanksPage';
import DescargasProceraModalContent from './components/DescargasProceraModalContent';
import DescargasOtherProcera from './components/DescargasOtherProcera';
import SelecProLocal from './components/SelecProLocal';
import DevDebugPage from './components/DevDebugPage';
import CustomerServiceModal from './components/CustomerServiceModal'; // Added this line
import TriChannelTable from './components/TriChannelTable';
// FIX: Corrected typo in imported constant name 'PROCERA_Zirconia_TRICHANNEL_DATA'.
import { MOCK_CASES, UNIVERSAL_BASE_NON_ROTATING_DATA, UNIVERSAL_BASE_ROTATING_DATA, PRE_MILLED_BLANKS_DATA, PRE_MILLED_DESCRIPTIONS, UNIVERSAL_BASE_ROTATING_CC_DATA, UNIVERSAL_BASE_ROTATING_BRANEMARK_DATA, UNIVERSAL_BASE_ROTATING_TRICHANNEL_DATA, UNIVERSAL_MULTI_UNIT_RECTO_DATA, UNIVERSAL_MULTI_UNIT_CONICO_DATA, PILAR_UNIVERSAL_ON1_NO_ROTATORIO_DATA, PILAR_UNIVERSAL_ON1_ROTATORIO_DATA, N1_BASE_UNITARIA_NO_ROTATORIA_DATA, N1_BASE_PUENTE_ROTATORIA_DATA, N1_TCC_UNITARIA_NO_ROTATORIA_DATA, ZIRCONIA_BRIDGE_DATA, ZIRCONIA_BRIDGE_CC_DATA, ZIRCONIA_BRIDGE_BRANEMARK_DATA, ZIRCONIA_BRIDGE_TRICHANNEL_DATA, REFERENCE_IMAGE_MAP, PRE_MILLED_BLANKS_N1_TCC_DATA, N1_TCC_CASE_DATA, ELOS_TOOLS_DATA, UNIVERSAL_BASE_NON_ROTATING_CC_DATA, UNIVERSAL_BASE_NON_ROTATING_BRANEMARK_DATA, UNIVERSAL_BASE_NON_ROTATING_TRICHANNEL_DATA, UNIVERSAL_BASE_ROTATING_CONICO_CC_DATA, UNIVERSAL_BASE_ROTATING_CONICO_BRANEMARK_DATA, UNIVERSAL_BASE_ROTATING_CONICO_TRICHANNEL_DATA, MULTI_UNIT_CONNECTION_DATA, PROCERA_FCZ_IMPLANT_CROWN_DATA, PROCERA_TITANIUM_CC_DATA, PROCERA_TITANIUM_BRANEMARK_DATA, PROCERA_TITANIUM_TRICHANNEL_DATA, PROCERA_TITANIUM_ASC_CC_DATA, PROCERA_TITANIUM_ASC_TRICHANNEL_DATA, PROCERA_ZIRCONIA_CC_DATA, PROCERA_ZIRCONIA_BRANEMARK_DATA, PROCERA_ZIRCONIA_TRICHANNEL_DATA, PROCERA_TITANIUM_BRIDGE_CC_DATA, PROCERA_TITANIUM_BRIDGE_BRANEMARK_DATA, PROCERA_TITANIUM_BRIDGE_TRICHANNEL_UPDATED_DATA, NOBELPROCERA_TITANIUM_BAR_CC_DATA, NOBELPROCERA_TITANIUM_BAR_BRANEMARK_DATA, NOBELPROCERA_TITANIUM_BAR_TRICHANNEL_DATA, NOBEL_PEARL_COMPONENTS_DATA, MUA_XEAL_CC_RECTO_DATA, MUA_XEAL_CC_ANGULADO_DATA, MUA_XEAL_N1_TCC_RECTO_DATA, MUA_XEAL_N1_TCC_ANGULADO_DATA, MUA_BRANEMARK_RECTO_DATA, MUA_BRANEMARK_ANGULADO_DATA, MUA_TRICHANNEL_RECTO_DATA, MUA_TRICHANNEL_ANGULADO_DATA, TRI_CHANNEL_TABLE_DATA } from './constants';
import { translations } from './translations';
import { DentalCase, Filters, RestorationType, ConnectionType, CaseStatus, Language, SoftwareType } from './types';
import { DownloadIcon, InfoIcon, CalendarIcon, WhatsAppIcon, EmailIcon, PhoneIcon, ChevronLeftIcon, UnitariaIndicatorIcon, MultipleIndicatorIcon, SearchIcon, Icon35, Icon15, CcIcon, TriIcon, ExtIcon, MuaIcon, N1Icon, DTXIcon, ExocadIcon, ThreeShapeIcon, DentalwingsIcon, ClipboardIcon, CheckIcon, AngulationNoIcon, N1BaseIcon, AngulationYesIcon, On1Icon, PearlIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon, ExternalLinkIcon, FilterIcon, ArrowRightIcon, ChatbotIcon } from './components/icons';
import CaseDetailIcons from './components/CaseDetailIcons';
import ConnectionSelector from './components/ConnectionSelector';
import BotonesModalContent from './components/BotonesModalContent';
import ExosModalContent from './components/ExosModalContent';
import IntroModal from './components/IntroModal';
import Chatbot from './components/Chatbot';

type ComponentTableItem = {
  name: string;
  np?: string;
  npLink?: string;
  npImage?: string;
  rp?: string;
  rpLink?: string;
  rpImage?: string;
  wp?: string;
  wpLink?: string;
  wpImage?: string;
};

// FIX: Added SupportModal component definition to fix 'Cannot find name' error.
const SupportModal: React.FC<{ t: any }> = ({ t }) => (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
            <h3 className="font-bold text-lg text-[color:var(--text-primary)] mb-2 flex items-center justify-center gap-2"><WhatsAppIcon className="h-6 w-6 text-green-500" /> {t.support_modal_whatsapp_title}</h3>
            <p className="text-slate-600 text-sm mb-4">{t.support_modal_intro}</p>
            <div className="flex justify-center mb-4">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=https%3A%2F%2Fwa.me%2F34935088829`} alt="WhatsApp QR Code" className="w-32 h-32" />
            </div>
            <p className="text-slate-500 text-xs">{t.support_modal_manual}</p>
            <p className="font-semibold text-slate-700">{t.support_modal_contact_name}</p>
            <p className="font-mono text-slate-700 text-lg">+34 93 508 88 29</p>
            <p className="text-red-600 font-semibold text-xs mt-1">{t.support_modal_whatsapp_only}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
            <h3 className="font-bold text-lg text-[color:var(--text-primary)] mb-2 flex items-center justify-center gap-2"><CalendarIcon className="h-6 w-6 text-blue-500" /> {t.support_modal_book_title}</h3>
            <p className="text-slate-600 text-sm mb-4">{t.support_modal_book_intro}</p>
            <div className="flex justify-center mb-4">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=https%3A%2F%2Foutlook.office365.com%2Fbook%2FSoporteTcnicoNobelBiocare%40dentalco.org%2F`} alt="Calendar QR Code" className="w-32 h-32" />
            </div>
            <a href="https://outlook.office365.com/book/SoporteTcnicoNobelBiocare@dentalco.org/" target="_blank" rel="noopener noreferrer" className="text-center block text-[color:var(--accent-primary)] hover:underline">{t.support_modal_book_link}</a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg text-[color:var(--text-primary)] mb-2 flex items-center gap-2"><EmailIcon className="h-6 w-6 text-slate-500" /> {t.support_modal_email_title}</h3>
            <p className="text-slate-600 text-sm mb-4">{t.support_modal_email_intro}</p>
            <a href="mailto:soporte.tecnico@nobelbiocare.com" className="inline-flex items-center justify-center w-full bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-md hover:bg-slate-200 transition-colors mb-4">{t.support_modal_email_link}</a>
            <p className="text-slate-500 text-xs">{t.support_modal_email_address_text}</p>
            <div className="flex items-center">
                <p className="font-mono text-slate-700 text-sm flex-grow">soporte.tecnico@nobelbiocare.com</p>
                <button onClick={() => navigator.clipboard.writeText('soporte.tecnico@nobelbiocare.com')} className="p-2 text-slate-500 hover:text-slate-800"><ClipboardIcon className="h-5 w-5"/></button>
            </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg text-[color:var(--text-primary)] mb-2 flex items-center gap-2"><PhoneIcon className="h-6 w-6 text-slate-500" /> {t.support_modal_phone_title}</h3>
            <p className="text-slate-600 text-sm whitespace-pre-line mb-4">{t.support_modal_phone_schedule}</p>
            <a href={`tel:${t.support_modal_phone_tel}`} className="inline-flex items-center justify-center w-full bg-slate-100 text-slate-700 font-semibold py-2 px-4 rounded-md hover:bg-slate-200 transition-colors mb-4">{t.support_modal_phone_cta}</a>
            <p className="text-slate-500 text-xs">{t.support_modal_phone_number_copy}</p>
            <div className="flex items-center">
                <p className="font-mono text-slate-700 text-lg flex-grow">{t.support_modal_phone_number_copy}</p>
                <button onClick={() => navigator.clipboard.writeText(t.support_modal_phone_number_copy)} className="p-2 text-slate-500 hover:text-slate-800"><ClipboardIcon className="h-5 w-5"/></button>
            </div>
        </div>
    </div>
);

// FIX: Removed generic type to simplify props and fix complex type inference issues across multiple usages.
function ZirconiaBridgeSubTable({
  data, onDataChange, title, t, platformHeaders, storeCountry, footerText, imageUrl, isTableEditMode
}: {
  data: { rowKey: string; [key: string]: any; }[];
  // FIX: Changed the type of `onDataChange` prop to accept `any[]` to resolve a complex TypeScript type inference issue.
  onDataChange: (newData: any[]) => void;
  title: string;
  t: any;
  platformHeaders: string[];
  storeCountry: Language;
  footerText?: string;
  imageUrl?: string;
  isTableEditMode?: boolean;
}) {
  const platformColors: { [key: string]: string } = {
    '3.0': 'text-gray-600',
    np: 'text-pink-600',
    rp: 'text-amber-600',
    wp: 'text-blue-600',
    // FIX: Changed key from '6.0' to '6' for consistency.
    '6': 'text-green-600',
    'np / rp¹': 'text-purple-600',
    'wp²': 'text-blue-600',
  };

  const getStorePath = (country: Language) => {
    switch (country) {
      case 'fr': return 'fr/fr';
      case 'pt': return 'pt/pt';
      case 'sv': return 'se/se';
      default: return 'es/es';
    }
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
    if (data[rowIndex] && (data[rowIndex] as any)[colKey] !== newValue) {
        const newData = data.map((row, i) => {
            if (i === rowIndex) {
                return { ...row, [colKey]: newValue };
            }
            return row;
        });
        onDataChange(newData);
    }
  };

  const renderCell = (ref: string, rowKey: string, rowIndex: number, colKey: string) => {
    if (!ref || ref === '-') {
      return <span 
        onBlur={(e) => isTableEditMode && handleBlur(e, rowIndex, colKey)}
        contentEditable={isTableEditMode}
        suppressContentEditableWarning
        className={isTableEditMode ? "outline-none focus:bg-amber-100 rounded px-1" : "text-slate-400"}
      >{ref || '—'}</span>;
    }

    const storePath = getStorePath(storeCountry);
    const searchTerm = ref.replace('*', '');
    const url = `https://store.nobelbiocare.com/${storePath}/catalogsearch/result/?q=${encodeURIComponent(searchTerm)}`;
    
    const content = (
      <span
        onBlur={(e) => isTableEditMode && handleBlur(e, rowIndex, colKey)}
        contentEditable={isTableEditMode}
        suppressContentEditableWarning
        className={isTableEditMode ? "font-semibold text-[color:var(--accent-primary)] outline-none focus:bg-amber-100 rounded px-1" : ""}
      >
        {ref}
      </span>
    );

    const finalContent = isTableEditMode ? content : (
      <a href={url} className="font-semibold text-[color:var(--accent-primary)] hover:text-[color:var(--accent-primary-hover)] hover:underline transition-colors" target="_blank" rel="noopener noreferrer">
        {ref}
      </a>
    );

    return finalContent;
  };
  
  if (!data || data.length === 0) return null;

  return (
    <div className="mb-8 last:mb-0">
      <div className="flex items-center gap-3 mb-3">
        {imageUrl && <img src={imageUrl} alt={title} className="w-16 h-16 object-contain rounded-md border p-1 bg-white" />}
        <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
      </div>
      <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
        <table className="min-w-full text-xs">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-1.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">{t.conexion || 'Componente'}</th>
              {platformHeaders.map(p => (
                <th key={p} className={`px-3 py-1.5 text-center text-xs font-semibold uppercase tracking-wider ${platformColors[p.toLowerCase()] || 'text-slate-700'}`}>
                  {/* FIX: Render '6.0' when the header key is '6'. */}
                  {p === '6' ? '6.0' : p}
                </th>
              ))}
            </tr>
          </thead>
          {/* FIX: Added handling for 'kit' property in data rows to prevent rendering errors. */}
          <tbody className="bg-white">
            {data.map((row, rowIndex) => (
              <tr key={row.rowKey} className="hover:bg-slate-50 transition-colors duration-150">
                <td 
                  className="px-3 py-1.5 whitespace-normal text-xs font-medium text-slate-800 text-left bg-white border-b border-slate-200"
                  onBlur={(e) => isTableEditMode && handleLabelBlur(e, rowIndex)}
                  contentEditable={isTableEditMode}
                  suppressContentEditableWarning={true}
                >
                  {(row as any).label ?? t[(row as any).rowKey]}
                </td>
                {(row as any).kit ? (
                  <td colSpan={platformHeaders.length} className="px-2 py-1.5 text-center whitespace-nowrap text-xs text-slate-600 border-b border-l border-slate-200">
                    {renderCell((row as any).kit, row.rowKey, rowIndex, 'kit')}
                  </td>
                ) : (
                  platformHeaders.map(p => {
                    const colKey = (() => {
                        if (p.toLowerCase().includes('np / rp')) return 'np_rp';
                        const baseKey = p.toLowerCase().split(' ')[0].replace(/[¹²³]/g, '');
                        if (baseKey === '6.0') return '6';
                        return baseKey;
                    })();
                    return (
                      <td key={`${row.rowKey}-${p}`} className="px-2 py-1.5 text-center whitespace-nowrap text-xs text-slate-600 border-b border-l border-slate-200">
                        {renderCell((row as any)[colKey], row.rowKey, rowIndex, colKey)}
                      </td>
                    )
                  })
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footerText && <div className="text-xs text-slate-500 mt-2 text-right">{footerText}</div>}
    </div>
  );
};

// FIX: Removed generic type to simplify props and fix complex type inference issues.
function PreMilledBlanksN1TCCTable({
  t, storeCountry, imageUrl, isTableEditMode, data, onDataChange
}: {
  t: any;
  storeCountry: Language;
  imageUrl?: string;
  isTableEditMode?: boolean;
  data: { rowKey: string; [key: string]: any; }[];
  // FIX: Changed the type of `onDataChange` prop to accept `any[]` to resolve a complex TypeScript type inference issue.
  onDataChange: (newData: any[]) => void;
}) {
  const platformHeaders = ['np', 'rp'];

  const getStorePath = (country: Language) => {
    switch (country) {
      case 'fr': return 'fr/fr';
      case 'pt': return 'pt/pt';
      case 'sv': return 'se/se';
      default: return 'es/es';
    }
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
    if (data[rowIndex] && data[rowIndex][colKey] !== newValue) {
        const newData = data.map((row, i) => {
            if (i === rowIndex) {
                return { ...row, [colKey]: newValue };
            }
            return row;
        });
        onDataChange(newData);
    }
  };

  const renderCell = (ref: string, rowIndex: number, colKey: string) => {
    if (!ref) return <span onBlur={(e) => isTableEditMode && handleBlur(e, rowIndex, colKey)} contentEditable={isTableEditMode} suppressContentEditableWarning className={isTableEditMode ? "outline-none focus:bg-amber-100 rounded px-1" : ""}>—</span>;
    const storePath = getStorePath(storeCountry);
    const url = `https://store.nobelbiocare.com/${storePath}/catalogsearch/result/?q=${encodeURIComponent(ref)}`;
    
    if (isTableEditMode) {
      return <span onBlur={(e) => handleBlur(e, rowIndex, colKey)} contentEditable suppressContentEditableWarning className="font-semibold text-[color:var(--accent-primary)] outline-none focus:bg-amber-100 rounded px-1">{ref}</span>;
    }

    return (
      <a href={url} className="font-semibold text-[color:var(--accent-primary)] hover:text-[color:var(--accent-primary-hover)] hover:underline transition-colors" target="_blank" rel="noopener noreferrer">
        {ref}
      </a>
    );
  };
  
  return (
    <div className="mb-8">
       <div className="flex items-center gap-3 mb-3">
        {imageUrl && <img src={imageUrl} alt={t.title} className="w-16 h-16 object-contain rounded-md border p-1 bg-white" />}
        <h3 className="text-xl font-semibold text-slate-800">{t.title}</h3>
      </div>
      <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
        <table className="min-w-full text-xs">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-1.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">{t.component_header || 'Componente'}</th>
              <th className="px-3 py-1.5 text-center text-xs font-semibold uppercase tracking-wider text-pink-600">NP</th>
              <th className="px-3 py-1.5 text-center text-xs font-semibold uppercase tracking-wider text-amber-600">RP</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((row, rowIndex) => (
              <tr key={row.rowKey} className="hover:bg-slate-50">
                <td 
                  className="px-3 py-1.5 text-xs font-medium text-slate-800 border-b border-slate-200"
                  onBlur={(e) => isTableEditMode && handleLabelBlur(e, rowIndex)}
                  contentEditable={isTableEditMode}
                  suppressContentEditableWarning={true}
                >
                  {(row as any).label ?? t[row.rowKey]}
                </td>
                {platformHeaders.map(p => (
                  <td key={`${row.rowKey}-${p}`} className="px-2 py-1.5 text-center text-xs text-slate-600 border-b border-l border-slate-200">
                    {renderCell((row as any)[p], rowIndex, p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// FIX: Removed generic type to simplify props and fix complex type inference issues.
function MuaTable({
  data, onDataChange, title, headers, platformHeader, platformLabels, storeCountry, imageUrl, isTableEditMode, isAngled
}: {
  data: { rowKey: string; [key: string]: any; }[];
  // FIX: Changed the type of `onDataChange` prop to accept `any[]` to resolve a complex TypeScript type inference issue.
  onDataChange: (newData: any[]) => void;
  title: string;
  headers: string[];
  platformHeader: string;
  platformLabels: { [key: string]: string };
  storeCountry: Language;
  imageUrl?: string;
  isTableEditMode?: boolean;
  isAngled?: boolean;
}) {
    const getStorePath = (country: Language): string => {
        switch (country) {
            case 'fr': return 'fr/fr';
            case 'pt': return 'pt/pt';
            case 'sv': return 'se/se';
            default: return 'es/es';
        }
    };

    const handleLabelBlur = (e: React.FocusEvent<HTMLTableCellElement>, rowIndex: number) => {
      const newValue = e.target.innerText;
      const currentLabel = (data[rowIndex] as any).label ?? platformLabels[(data[rowIndex] as any).rowKey];
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
        if (data[rowIndex] && data[rowIndex][colKey] !== newValue) {
            const newData = data.map((row, i) => {
                if (i === rowIndex) {
                    return { ...row, [colKey]: newValue };
                }
                return row;
            });
            onDataChange(newData);
        }
    };
    
    const renderCell = (ref: string, rowIndex: number, colKey: string) => {
        if (!ref || ref === '—') return <span onBlur={(e) => isTableEditMode && handleBlur(e, rowIndex, colKey)} contentEditable={isTableEditMode} suppressContentEditableWarning className={isTableEditMode ? "outline-none focus:bg-amber-100 rounded px-1" : "text-slate-400"}>{'—'}</span>;
        
        if (isTableEditMode) {
          return <span onBlur={(e) => handleBlur(e, rowIndex, colKey)} contentEditable suppressContentEditableWarning className="font-semibold text-[color:var(--accent-primary)] outline-none focus:bg-amber-100 rounded px-1">{ref}</span>;
        }

        const storePath = getStorePath(storeCountry);
        const url = `https://store.nobelbiocare.com/${storePath}/catalogsearch/result/?q=${encodeURIComponent(ref)}`;
        return (
            <a href={url} className="font-semibold text-[color:var(--accent-primary)] hover:text-[color:var(--accent-primary-hover)] hover:underline transition-colors" target="_blank" rel="noopener noreferrer">
                {ref}
            </a>
        );
    };

    const platformColors: { [key: string]: string } = {
        np: 'bg-pink-100 text-pink-800',
        rp: 'bg-amber-100 text-amber-800',
        wp: 'bg-blue-100 text-blue-800',
    };

    return (
        <div className="mb-8 last:mb-0">
            <div className="flex items-center gap-3 mb-3">
                {imageUrl && <img src={imageUrl} alt={title} className="w-16 h-16 object-contain rounded-md border p-1 bg-white" />}
                <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
            </div>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
                <table className="min-w-full text-xs">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-3 py-1.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">{platformHeader}</th>
                            {isAngled && <th className="px-3 py-1.5 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Angle</th>}
                            {headers.map(h => (
                                <th key={h} className="px-3 py-1.5 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">{h} mm</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {data.map((row, rowIndex) => {
                            const platformKey = row.rowKey.split('_')[0];
                            return (
                                <tr key={row.rowKey} className="hover:bg-slate-50 transition-colors duration-150">
                                    <td 
                                      className={`px-3 py-1.5 whitespace-nowrap text-xs font-bold text-center border-b border-slate-200 ${platformColors[platformKey] || 'bg-slate-100'}`}
                                      onBlur={(e) => isTableEditMode && handleLabelBlur(e, rowIndex)}
                                      contentEditable={isTableEditMode}
                                      suppressContentEditableWarning={true}
                                    >
                                      {(row as any).label ?? platformLabels[row.rowKey]}
                                    </td>
                                    {isAngled && <td className="px-3 py-1.5 text-center font-semibold text-slate-600 border-b border-l border-slate-200">{row.angle}</td>}
                                    {headers.map(h => {
                                        const colKey = h.replace('.', '_');
                                        return (
                                            <td key={`${row.rowKey}-${h}`} className="px-2 py-1.5 text-center whitespace-nowrap text-xs text-slate-600 border-b border-l border-slate-200">
                                                {renderCell(row[colKey], rowIndex, colKey)}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// FIX: Added ResourceButtons component definition to fix 'Cannot find name' error.
const ResourceButtons: React.FC<{ t: any, caseData: DentalCase, onOpenDownloadsModal: () => void, storeCountry: Language }> = ({ t, caseData, onOpenDownloadsModal, storeCountry }) => {
    const getStorePath = (country: Language) => {
        switch (country) {
            case 'fr': return 'fr/fr';
            case 'pt': return 'pt/pt';
            case 'sv': return 'se/se';
            default: return 'es/es';
        }
    };
    const storePath = getStorePath(storeCountry);
    const buttonClasses = "inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-xs font-semibold text-white bg-[color:var(--card-bg-raspberry)] border border-black rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[color:var(--card-bg-raspberry)] focus:ring-offset-2 transition-all duration-200";

    return (
        <div>
            <h3 className="text-sm font-semibold text-slate-600 mb-2">{t.resources_title}</h3>
            <div className="flex items-center gap-2">
                <button
                    onClick={onOpenDownloadsModal}
                    className={buttonClasses}
                >
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    {t.resource1_label_procera}
                </button>
                <a
                    href={`https://www.nobelbiocare.com/${storePath}/nobelprocera-scan-and-design-services`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses}
                >
                    <ArrowRightIcon className="h-4 w-4 mr-2" />
                    {t.design_services_button}
                </a>
                <a
                    href="https://my.nobelbiocare.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClasses}
                >
                    <ArrowRightIcon className="h-4 w-4 mr-2" />
                    {t.procera_tracking_button}
                </a>
            </div>
        </div>
    );
};

// FIX: Added TablesModalContent component definition to fix 'Cannot find name' error.
const TablesModalContent: React.FC<{ t: any }> = ({ t }) => {
    const tablesT = t.modal.tables_modal;
    const tableHeaderClass = "px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider";
    
    const modalsContent = Object.keys(tablesT.modals_data)
      .filter(key => key.endsWith('_trigger'))
      .map(key => key.replace('_trigger', ''));
      
    return (
        <div className="space-y-8 p-4">
            {/* Windows Table */}
            <div>
                <h3 className="text-xl font-bold text-[color:var(--text-primary)] mb-4 pb-2 border-b border-slate-200">{tablesT.windows_title}</h3>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className={`${tableHeaderClass} w-1/3`}>{tablesT.windows_col_component}</th>
                                <th className={`${tableHeaderClass} w-2/3`}>{tablesT.windows_col_purpose}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {Object.entries(tablesT.windows_data).map(([key, value]) => (
                                <tr key={key} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-800">{key}</td>
                                    <td className="px-4 py-3 text-slate-600">{value as string}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Buttons Table */}
            <div>
                <h3 className="text-xl font-bold text-[color:var(--text-primary)] mb-4 pb-2 border-b border-slate-200">{tablesT.buttons_title}</h3>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className={`${tableHeaderClass}`}>{tablesT.buttons_col_label}</th>
                                <th className={`${tableHeaderClass}`}>{tablesT.buttons_col_action}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {Object.entries(tablesT.buttons_data).map(([key, value]) => (
                                <tr key={key} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-800 capitalize">{key.replace(/_/g, ' ')}</td>
                                    <td className="px-4 py-3 text-slate-600">{value as string}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals Table */}
            <div>
                <h3 className="text-xl font-bold text-[color:var(--text-primary)] mb-4 pb-2 border-b border-slate-200">{tablesT.modals_title}</h3>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
                    <table className="min-w-full text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className={`${tableHeaderClass}`}>{tablesT.modals_col_trigger}</th>
                                <th className={`${tableHeaderClass}`}>{tablesT.modals_col_components}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {modalsContent.map(key => (
                                <tr key={key} className="hover:bg-slate-50">
                                    <td className="px-4 py-3 font-medium text-slate-800">{tablesT.modals_data[`${key}_trigger`]}</td>
                                    <td className="px-4 py-3 text-slate-600">{tablesT.modals_data[`${key}_content`]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// FIX: Added DownloadCenterModalContent component definition to fix 'Cannot find name' error.
const DownloadCenterModalContent: React.FC<{
    links: { text: string; href: string }[];
    t: any;
    onClose: () => void;
    onOpenWorkflowSelector: () => void;
    storeCountry: Language;
}> = ({ links, t, onClose, onOpenWorkflowSelector, storeCountry }) => {
    return (
        <div className="p-6 text-center">
            <img src="https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/Logo/descargas.png" alt="Download illustration" className="w-48 mx-auto mb-6" />
            <div className="space-y-3 mb-6">
                {links.map(link => (
                    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="w-full max-w-sm mx-auto inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)] focus:ring-offset-2 transition-all duration-200">
                        <DownloadIcon className="h-4 w-4 mr-2" />
                        {link.text}
                    </a>
                ))}
            </div>
            <div className="border-t pt-6">
                 <button
                    onClick={onOpenWorkflowSelector}
                    className="w-full max-w-sm mx-auto inline-flex items-center justify-center whitespace-nowrap px-4 py-3 text-sm font-semibold text-white bg-[color:var(--accent-primary)] border border-[color:var(--accent-primary)] rounded-lg hover:bg-[color:var(--accent-primary-hover)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary)]"
                 >
                    <DownloadIcon className="h-5 w-5 mr-2" />
                    {t.modal.download_procera_button}
                 </button>
            </div>
        </div>
    );
};


const getStorePath = (country: Language) => {
  switch (country) {
    case 'fr': return 'fr/fr';
    case 'pt': return 'pt/pt';
    case 'sv': return 'en-se';
    default: return 'es/es';
  }
};

const getModalContentType = (caseData: DentalCase): string => {
    switch (caseData.id) {
        case 'TEST001': return "Página de Depuración (DevDebugPage)";
        case 'EXO006': return "Tabla N1 TCC Unitaria";
        case 'EXO013': return "Tablas N1 Base (Unitaria y Puente)";
        case 'EXO014': return "Tablas de Pilar Standard (dinámico por conexión)";
        case 'EXO019': return "Tablas Pilar Universal On1 (Rotatorio y No Rotatorio)";
        case 'EXO016': return "Página de Premecanizados (PremilledBlanksPage)";
        case 'EXO020': return "Tabla de Componentes NobelPearl";
        case 'EXO029': return "Tablas de Puente de Titanio Procera (dinámico por conexión)";
        case 'EXO024':
        case 'EXO025': return "Tablas de Puente de Zirconia (dinámico por conexión)";
        case 'EXO021': return "Tablas de Base Universal No Rotatoria (dinámico por conexión)";
        case 'EXO022': return "Tablas de Base Universal Rotatoria (dinámico por conexión)";
        case 'EXO027': return "Tablas de Pilar de Titanio Procera (dinámico por conexión)";
        case 'EXO028': return "Tablas de Pilar de Titanio ASC Procera (dinámico por conexión)";
        case 'EXO030': return "Tablas de Pilar de Zirconia Procera (dinámico por conexión)";
        case 'EXO026': return "Tabla de Corona Procera FCZ";
        case 'EXO032': return "Tablas de Barra de Titanio NobelProcera (dinámico por conexión)";
        case 'EXO034': return "Tablas de Pilar Transepitelial (dinámico por conexión)";
        default: return "Contenido por Defecto (Referencia)";
    }
};

const initialModalAnalysisData = [
    {
        modalName: "Principal de Componentes/Referencias",
        description: "Modal principal que muestra detalles de componentes. El contenido es dinámico y cambia según el caso y la conexión seleccionada.",
        sections: [
            "Botones de Recursos (Descargar Librerías, Overviews, Seguimiento de Envíos)",
            "Acordeón 'Detalles de Iconografía' (muestra iconos de restauración, plataforma, torque, etc.)",
            "Selector de Conexión (botones para cambiar entre CC, Branemark, etc., si aplica)",
            "Tablas de Componentes (una o más tablas detallando referencias, tornillos, etc.)"
        ]
    },
    {
        modalName: "Soporte Técnico",
        description: "Ofrece múltiples vías de contacto con el soporte técnico de Nobel Biocare.",
        sections: [
            "Sección de WhatsApp con código QR e información de contacto.",
            "Sección 'Agendar Sesión' con código QR y enlace al calendario de reservas.",
            "Sección de Email con enlace `mailto` y dirección de correo para copiar.",
            "Sección de Teléfono con horario, botón para llamar y número para copiar."
        ]
    },
    {
        modalName: "Atención al Cliente",
        description: "Proporciona un punto de acceso al servicio de atención al cliente para los idiomas francés y sueco.",
        sections: [
            "Texto introductorio.",
            "Código QR y enlace a la página web de atención al cliente."
        ]
    },
    {
        modalName: "Descarga de Librerías (ES/PT)",
        description: "Guía al usuario para la descarga de librerías de Procera, ofreciendo ayuda.",
        sections: [
            "Mensaje informativo.",
            "Sección para agendar una sesión de ayuda (QR y enlace).",
            "Botón 'Salir'.",
            "Botón 'Prefiero hacerlo yo mismo' (abre el modal 'Seleccionar Flujo de Trabajo')."
        ]
    },
    {
        modalName: "Descarga de Librerías (FR/SV)",
        description: "Informa al usuario sobre cómo obtener librerías, dirigiendo a atención al cliente.",
        sections: [
            "Mensaje informativo.",
            "Sección de contacto con código QR y enlace.",
            "Botón 'Salir'.",
            "Botón 'Prefiero hacerlo yo mismo' (abre el modal 'Seleccionar Flujo de Trabajo')."
        ]
    },
    {
        modalName: "Seleccionar Flujo de Trabajo",
        description: "Permite al usuario elegir entre flujos de trabajo de Procera o de Producción Local para acceder a las librerías correspondientes.",
        sections: [
            "Texto descriptivo.",
            "Botón 'Librerías para Producción Procera' (enlace externo).",
            "Botón 'Librerías para Producción Local' (enlace externo)."
        ]
    },
    {
        modalName: "Centro de Descargas",
        description: "Modal centralizado que ofrece acceso a documentos y librerías.",
        sections: [
            "Ilustración.",
            "Lista de enlaces para descargar documentos (Overviews).",
            "Botón 'Descargar Librerías' (abre el modal 'Seleccionar Flujo de Trabajo').",
            "Botón 'Seguimiento envíos NobelProcera' (enlace externo)."
        ]
    },
    {
        modalName: "Galería de Botones",
        description: "Muestra una colección de todos los estilos de botones disponibles para fines de desarrollo.",
        sections: [ "Grid con 15 estilos de botones diferentes." ]
    },
    {
        modalName: "Información de UI (Tablas)",
        description: "Proporciona metainformación sobre la estructura y funcionalidad de la propia aplicación.",
        sections: [
            "Tabla 'Ventanas y Componentes Principales'.",
            "Tabla 'Botones y Acciones'.",
            "Tabla 'Modales y Contenido Emergente'."
        ]
    },
    {
        modalName: "Análisis de UI (EXOS)",
        description: "Este mismo modal, que ofrece un análisis de la estructura de la UI.",
        sections: [
            "Tabla 'Relación Caso - Contenido Modal'.",
            "Tabla 'Análisis de Ventanas Modales'."
        ]
    }
];

const App: React.FC = () => {
  const [filters, setFilters] = useState<Filters>({
    searchText: '',
    status: '',
    type: '',
    connectionType: '',
    softwareType: '',
    angulation: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHelp001ModalOpen, setIsHelp001ModalOpen] = useState(false);
  const [isHelpOtherModalOpen, setIsHelpOtherModalOpen] = useState(false);
  const [isSelecProLocalModalOpen, setIsSelecProLocalModalOpen] = useState(false);
  const [isTablesModalOpen, setIsTablesModalOpen] = useState(false);
  const [isTableTestModalOpen, setIsTableTestModalOpen] = useState(false);
  const [isCustomerServiceModalOpen, setIsCustomerServiceModalOpen] = useState(false);
  const [isBotonesModalOpen, setIsBotonesModalOpen] = useState(false);
  const [isDownloadCenterModalOpen, setIsDownloadCenterModalOpen] = useState(false);
  const [isExosModalOpen, setIsExosModalOpen] = useState(false);
  const [isIntroModalOpen, setIsIntroModalOpen] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedCase, setSelectedCase] = useState<DentalCase | null>(null);
  const [language, setLanguage] = useState<Language>('es');
  const [storeCountry, setStoreCountry] = useState<Language>('es');
  const [isFilterBarCollapsed, setIsFilterBarCollapsed] = useState(false);
  const [selectedModalConnection, setSelectedModalConnection] = useState<string | undefined>();
  const [isIconDetailsVisible, setIsIconDetailsVisible] = useState(true);
  const [isDownloadsVisible, setIsDownloadsVisible] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([]);
  const [isChatbotLoading, setIsChatbotLoading] = useState(false);
  const [isTableEditMode, setIsTableEditMode] = useState(false);
  const [showEditModeNotification, setShowEditModeNotification] = useState(false);
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  const initialExosCaseModalData = useMemo(() => MOCK_CASES.map(caseData => ({
      title: caseData.patientName[language],
      caseId: caseData.id,
      modalType: getModalContentType(caseData)
  })), [language]);

  const [allTableData, setAllTableData] = useState({
    triChannel: { saved: TRI_CHANNEL_TABLE_DATA, draft: TRI_CHANNEL_TABLE_DATA },
    exosCases: { saved: initialExosCaseModalData, draft: initialExosCaseModalData },
    exosAnalysis: { saved: initialModalAnalysisData, draft: initialModalAnalysisData },
    preMilledBlanks: { saved: PRE_MILLED_BLANKS_DATA, draft: PRE_MILLED_BLANKS_DATA },
    preMilledBlanksN1TCC: { saved: PRE_MILLED_BLANKS_N1_TCC_DATA, draft: PRE_MILLED_BLANKS_N1_TCC_DATA },
    n1TccUnitaria: { saved: N1_TCC_UNITARIA_NO_ROTATORIA_DATA, draft: N1_TCC_UNITARIA_NO_ROTATORIA_DATA },
    n1BaseUnitaria: { saved: N1_BASE_UNITARIA_NO_ROTATORIA_DATA, draft: N1_BASE_UNITARIA_NO_ROTATORIA_DATA },
    n1BasePuente: { saved: N1_BASE_PUENTE_ROTATORIA_DATA, draft: N1_BASE_PUENTE_ROTATORIA_DATA },
    on1NoRotatorio: { saved: PILAR_UNIVERSAL_ON1_NO_ROTATORIO_DATA, draft: PILAR_UNIVERSAL_ON1_NO_ROTATORIO_DATA },
    on1Rotatorio: { saved: PILAR_UNIVERSAL_ON1_ROTATORIO_DATA, draft: PILAR_UNIVERSAL_ON1_ROTATORIO_DATA },
    nobelPearl: { saved: NOBEL_PEARL_COMPONENTS_DATA, draft: NOBEL_PEARL_COMPONENTS_DATA },
    zirconiaBridgeCC: { saved: ZIRCONIA_BRIDGE_CC_DATA, draft: ZIRCONIA_BRIDGE_CC_DATA },
    zirconiaBridgeBranemark: { saved: ZIRCONIA_BRIDGE_BRANEMARK_DATA, draft: ZIRCONIA_BRIDGE_BRANEMARK_DATA },
    zirconiaBridgeTriChannel: { saved: ZIRCONIA_BRIDGE_TRICHANNEL_DATA, draft: ZIRCONIA_BRIDGE_TRICHANNEL_DATA },
    multiUnitConnection: { saved: MULTI_UNIT_CONNECTION_DATA, draft: MULTI_UNIT_CONNECTION_DATA },
    universalBaseNonRotatingCC: { saved: UNIVERSAL_BASE_NON_ROTATING_CC_DATA, draft: UNIVERSAL_BASE_NON_ROTATING_CC_DATA },
    universalBaseNonRotatingBranemark: { saved: UNIVERSAL_BASE_NON_ROTATING_BRANEMARK_DATA, draft: UNIVERSAL_BASE_NON_ROTATING_BRANEMARK_DATA },
    universalBaseNonRotatingTriChannel: { saved: UNIVERSAL_BASE_NON_ROTATING_TRICHANNEL_DATA, draft: UNIVERSAL_BASE_NON_ROTATING_TRICHANNEL_DATA },
    universalBaseRotatingCC: { saved: UNIVERSAL_BASE_ROTATING_CC_DATA, draft: UNIVERSAL_BASE_ROTATING_CC_DATA },
    universalBaseRotatingConicoCC: { saved: UNIVERSAL_BASE_ROTATING_CONICO_CC_DATA, draft: UNIVERSAL_BASE_ROTATING_CONICO_CC_DATA },
    universalBaseRotatingBranemark: { saved: UNIVERSAL_BASE_ROTATING_BRANEMARK_DATA, draft: UNIVERSAL_BASE_ROTATING_BRANEMARK_DATA },
    universalBaseRotatingConicoBranemark: { saved: UNIVERSAL_BASE_ROTATING_CONICO_BRANEMARK_DATA, draft: UNIVERSAL_BASE_ROTATING_CONICO_BRANEMARK_DATA },
    universalBaseRotatingTriChannel: { saved: UNIVERSAL_BASE_ROTATING_TRICHANNEL_DATA, draft: UNIVERSAL_BASE_ROTATING_TRICHANNEL_DATA },
    universalBaseRotatingConicoTriChannel: { saved: UNIVERSAL_BASE_ROTATING_CONICO_TRICHANNEL_DATA, draft: UNIVERSAL_BASE_ROTATING_CONICO_TRICHANNEL_DATA },
    universalMultiUnitRecto: { saved: UNIVERSAL_MULTI_UNIT_RECTO_DATA, draft: UNIVERSAL_MULTI_UNIT_RECTO_DATA },
    universalMultiUnitConico: { saved: UNIVERSAL_MULTI_UNIT_CONICO_DATA, draft: UNIVERSAL_MULTI_UNIT_CONICO_DATA },
    proceraFCZ: { saved: PROCERA_FCZ_IMPLANT_CROWN_DATA, draft: PROCERA_FCZ_IMPLANT_CROWN_DATA },
    proceraTitaniumCC: { saved: PROCERA_TITANIUM_CC_DATA, draft: PROCERA_TITANIUM_CC_DATA },
    proceraTitaniumBranemark: { saved: PROCERA_TITANIUM_BRANEMARK_DATA, draft: PROCERA_TITANIUM_BRANEMARK_DATA },
    proceraTitaniumTriChannel: { saved: PROCERA_TITANIUM_TRICHANNEL_DATA, draft: PROCERA_TITANIUM_TRICHANNEL_DATA },
    proceraTitaniumAscCC: { saved: PROCERA_TITANIUM_ASC_CC_DATA, draft: PROCERA_TITANIUM_ASC_CC_DATA },
    proceraTitaniumAscTriChannel: { saved: PROCERA_TITANIUM_ASC_TRICHANNEL_DATA, draft: PROCERA_TITANIUM_ASC_TRICHANNEL_DATA },
    proceraZirconiaCC: { saved: PROCERA_ZIRCONIA_CC_DATA, draft: PROCERA_ZIRCONIA_CC_DATA },
    proceraZirconiaBranemark: { saved: PROCERA_ZIRCONIA_BRANEMARK_DATA, draft: PROCERA_ZIRCONIA_BRANEMARK_DATA },
    proceraZirconiaTriChannel: { saved: PROCERA_ZIRCONIA_TRICHANNEL_DATA, draft: PROCERA_ZIRCONIA_TRICHANNEL_DATA },
    proceraTitaniumBridgeCC: { saved: PROCERA_TITANIUM_BRIDGE_CC_DATA, draft: PROCERA_TITANIUM_BRIDGE_CC_DATA },
    proceraTitaniumBridgeBranemark: { saved: PROCERA_TITANIUM_BRIDGE_BRANEMARK_DATA, draft: PROCERA_TITANIUM_BRIDGE_BRANEMARK_DATA },
    proceraTitaniumBridgeTriChannel: { saved: PROCERA_TITANIUM_BRIDGE_TRICHANNEL_UPDATED_DATA, draft: PROCERA_TITANIUM_BRIDGE_TRICHANNEL_UPDATED_DATA },
    nobelProceraBarCC: { saved: NOBELPROCERA_TITANIUM_BAR_CC_DATA, draft: NOBELPROCERA_TITANIUM_BAR_CC_DATA },
    nobelProceraBarBranemark: { saved: NOBELPROCERA_TITANIUM_BAR_BRANEMARK_DATA, draft: NOBELPROCERA_TITANIUM_BAR_BRANEMARK_DATA },
    nobelProceraBarTriChannel: { saved: NOBELPROCERA_TITANIUM_BAR_TRICHANNEL_DATA, draft: NOBELPROCERA_TITANIUM_BAR_TRICHANNEL_DATA },
    muaXealCCRecto: { saved: MUA_XEAL_CC_RECTO_DATA, draft: MUA_XEAL_CC_RECTO_DATA },
    muaXealCCAngulado: { saved: MUA_XEAL_CC_ANGULADO_DATA, draft: MUA_XEAL_CC_ANGULADO_DATA },
    muaXealN1TccRecto: { saved: MUA_XEAL_N1_TCC_RECTO_DATA, draft: MUA_XEAL_N1_TCC_RECTO_DATA },
    muaXealN1TccAngulado: { saved: MUA_XEAL_N1_TCC_ANGULADO_DATA, draft: MUA_XEAL_N1_TCC_ANGULADO_DATA },
    muaBranemarkRecto: { saved: MUA_BRANEMARK_RECTO_DATA, draft: MUA_BRANEMARK_RECTO_DATA },
    muaBranemarkAngulado: { saved: MUA_BRANEMARK_ANGULADO_DATA, draft: MUA_BRANEMARK_ANGULADO_DATA },
    muaTriChannelRecto: { saved: MUA_TRICHANNEL_RECTO_DATA, draft: MUA_TRICHANNEL_RECTO_DATA },
    muaTriChannelAngulado: { saved: MUA_TRICHANNEL_ANGULADO_DATA, draft: MUA_TRICHANNEL_ANGULADO_DATA },
  });
  
  // FIX: Adjusted handler to work with non-generic table components, using a type cast for state updates.
  // FIX: Changed the type of `newData` to `any[]` to resolve a complex TypeScript type inference issue.
  const createDataChangeHandler = <K extends keyof typeof allTableData>(key: K) => (newData: any[]) => {
      setAllTableData(prevData => ({
          ...prevData,
          [key]: { ...prevData[key], draft: newData as (typeof allTableData)[K]['draft'] }
      }));
  };

  const t = translations[language];
  const footerT = translations[storeCountry]?.footer ?? translations.es.footer;

  // FIX: Moved Separator and commonAccordionClasses to the App component scope to resolve "Cannot find name" errors.
  const Separator = () => <div className="border-t my-6 border-slate-200"></div>;
  const commonAccordionClasses = "w-full text-left text-sm font-semibold text-amber-900 py-3 px-4 bg-amber-200 hover:bg-amber-300 transition-colors flex justify-between items-center rounded-md";

  const handleSaveChanges = () => {
    setAllTableData(prevData => {
        const newData = { ...prevData };
        for (const key in newData) {
            newData[key as keyof typeof allTableData] = { 
                ...newData[key as keyof typeof allTableData], 
                saved: newData[key as keyof typeof allTableData].draft 
            };
        }
        return newData;
    });
    
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const resetDraftsForModal = (tableKeys: (keyof typeof allTableData)[]) => {
    setAllTableData(prevData => {
      const newData = { ...prevData };
      tableKeys.forEach(key => {
        newData[key] = {
          ...newData[key],
          draft: newData[key].saved
        };
      });
      return newData;
    });
  };

  const toggleEditMode = () => {
      setIsTableEditMode(prev => {
          if (!prev) {
              setShowEditModeNotification(true);
              setTimeout(() => setShowEditModeNotification(false), 3000);
          }
          return !prev;
      });
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'X') {
        e.preventDefault();
        toggleEditMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  useEffect(() => {
    if (!isFirstLaunch) {
      localStorage.setItem('appLanguage', language);
      localStorage.setItem('appStoreCountry', storeCountry);
    }
  }, [language, storeCountry, isFirstLaunch]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('appLanguage');
    const savedStoreCountry = localStorage.getItem('appStoreCountry');
    if (savedLanguage && savedStoreCountry) {
      setLanguage(savedLanguage as Language);
      setStoreCountry(savedStoreCountry as Language);
      setIsIntroModalOpen(false);
      setIsFirstLaunch(false);
    } else {
      setIsIntroModalOpen(true);
    }
    
    const initialMessages = [{ role: 'bot' as const, content: t.chatbot.welcome_message }];
    setChatMessages(initialMessages);

  }, []);
  
  useEffect(() => {
    if (isChatbotOpen) {
      setChatMessages([{ role: 'bot' as const, content: t.chatbot.welcome_message }]);
    }
  }, [isChatbotOpen, language]);
  
  const handleIntroConfirm = (selectedLang: Language, selectedCountry: Language) => {
    setLanguage(selectedLang);
    setStoreCountry(selectedCountry);
    setIsIntroModalOpen(false);
    setIsFirstLaunch(false);
  };

  const handleFilterChange = (name: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({ searchText: '', status: '', type: '', connectionType: '', softwareType: '', angulation: '' });
  };

  const isAnyFilterActive = useMemo(() => {
    return Object.values(filters).some(value => value !== '');
  }, [filters]);
  
  const filteredCases = useMemo(() => {
    return MOCK_CASES.filter(c => {
      const searchTextLower = filters.searchText.toLowerCase();
      
      const nameMatch = c.patientName[language].toLowerCase().includes(searchTextLower);
      const idMatch = c.id.toLowerCase().includes(searchTextLower);
      const refMatch = c.reference.toLowerCase().includes(searchTextLower);
      
      const statusMatch = !filters.status || c.status === filters.status;
      const typeMatch = !filters.type || c.restorationType.includes(filters.type as RestorationType);
      const connectionMatch = !filters.connectionType || c.connectionType === filters.connectionType || c.compatibleConnections?.includes(filters.connectionType as ConnectionType);

      const softwareTypeMatch = () => {
        if (!filters.softwareType) return true;
        switch (filters.softwareType) {
          case SoftwareType.Exocad:
          case SoftwareType.ThreeShape:
          case SoftwareType.Dentalwings:
            return c.status === CaseStatus.Local || c.status === CaseStatus.Procera;
          case SoftwareType.DTX:
            return true;
          default:
            return false;
        }
      };
      
      const angulationMatch = () => {
        if (!filters.angulation) return true;
        if (c.angulacion === 'N/A') return false;
        
        const filterValue = filters.angulation === 'true';
        return c.angulacion === filterValue;
      };

      return (nameMatch || idMatch || refMatch) && statusMatch && typeMatch && connectionMatch && softwareTypeMatch() && angulationMatch();
    });
  }, [filters, language]);
  
  const handleOpenModal = (caseData: DentalCase, connection?: string) => {
    setSelectedCase(caseData);
    setModalTitle(caseData.patientName[language]);
    setSelectedModalConnection(connection);
    setIsDownloadsVisible(caseData.status === CaseStatus.Procera);
    setIsIconDetailsVisible(true);
    setIsModalOpen(true);
  };
  
  const handleHelp001Click = (caseData: DentalCase) => {
    setSelectedCase(caseData);
    setModalTitle(t.modal.descargas_procera_modal_title);
    if (language === 'es' || language === 'pt') {
        setIsHelp001ModalOpen(true);
    } else {
        setIsHelpOtherModalOpen(true);
    }
  };
  
  const handleTablesClick = (caseData: DentalCase) => {
    setSelectedCase(caseData);
    setModalTitle(t.modal.tables_modal_title);
    setIsTablesModalOpen(true);
  };
  
  const handleTableTestClick = (caseData: DentalCase) => {
    setSelectedCase(caseData);
    setModalTitle(t.triChannelTestTable.title);
    setIsTableTestModalOpen(true);
  };
  
  const handleCustomerServiceClick = () => {
    setModalTitle(t.modal.customer_service_title);
    setIsCustomerServiceModalOpen(true);
  }
  
  const handleExosClick = (caseData: DentalCase) => {
    setSelectedCase(caseData);
    setModalTitle(t.modal.exos_modal_title);
    setIsExosModalOpen(true);
  };

  const handleCloseModal = () => {
    const tableKeysToReset: (keyof typeof allTableData)[] = [
      'preMilledBlanks',
      'preMilledBlanksN1TCC',
      'n1TccUnitaria',
      'n1BaseUnitaria',
      'n1BasePuente',
      'on1NoRotatorio',
      'on1Rotatorio',
      'nobelPearl',
      'zirconiaBridgeCC',
      'zirconiaBridgeBranemark',
      'zirconiaBridgeTriChannel',
      'multiUnitConnection',
      'universalBaseNonRotatingCC',
      'universalBaseNonRotatingBranemark',
      'universalBaseNonRotatingTriChannel',
      'universalBaseRotatingCC',
      'universalBaseRotatingConicoCC',
      'universalBaseRotatingBranemark',
      'universalBaseRotatingConicoBranemark',
      'universalBaseRotatingTriChannel',
      'universalBaseRotatingConicoTriChannel',
      'universalMultiUnitRecto',
      'universalMultiUnitConico',
      'proceraFCZ',
      'proceraTitaniumCC',
      'proceraTitaniumBranemark',
      'proceraTitaniumTriChannel',
      'proceraTitaniumAscCC',
      'proceraTitaniumAscTriChannel',
      'proceraZirconiaCC',
      'proceraZirconiaBranemark',
      'proceraZirconiaTriChannel',
      'proceraTitaniumBridgeCC',
      'proceraTitaniumBridgeBranemark',
      'proceraTitaniumBridgeTriChannel',
      'nobelProceraBarCC',
      'nobelProceraBarBranemark',
      'nobelProceraBarTriChannel',
      'muaXealCCRecto',
      'muaXealCCAngulado',
      'muaXealN1TccRecto',
      'muaXealN1TccAngulado',
      'muaBranemarkRecto',
      'muaBranemarkAngulado',
      'muaTriChannelRecto',
      'muaTriChannelAngulado',
      'triChannel',
      'exosCases',
      'exosAnalysis',
    ];
    resetDraftsForModal(tableKeysToReset);
    setIsModalOpen(false);
  };

  const handleOpenProceESModal = () => setIsHelp001ModalOpen(true);
  const handleOpenBotonesModal = () => {
    setModalTitle(t.modal.botones_modal_title);
    setIsBotonesModalOpen(true);
  };
  
  const handleOpenDownloadCenter = () => {
    setModalTitle(t.modal.download_center_title);
    setIsDownloadCenterModalOpen(true);
  };
  
  const handleCloseDownloadCenter = () => {
    setIsDownloadCenterModalOpen(false);
  };
  
  const handleOpenWorkflowSelector = () => {
    setIsDownloadCenterModalOpen(false);
    setIsSelecProLocalModalOpen(true);
  };
  
  const handleNavigateFromChat = (caseId: string) => {
    const caseData = MOCK_CASES.find(c => c.id === caseId);
    if (caseData) {
      setIsChatbotOpen(false);
      handleOpenModal(caseData);
    }
  };
  
  const handleSendMessage = async (message: string) => {
      setChatMessages(prev => [...prev, { role: 'user', content: message }]);
      setIsChatbotLoading(true);
      
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const caseDataForContext = MOCK_CASES.map(c => ({
            id: c.id,
            name: c.patientName[language],
            description: `${c.restorationType.join(', ')} - ${c.connectionType} - ${c.status}`,
            imageUrl: c.imageUrls[0]
        }));
        
        const systemInstruction = `You are a virtual assistant for Nobel Biocare's prosthetic solutions catalog.
Your task is to help users find products from the provided JSON data based on their queries.
- Analyze the user's query to identify keywords related to product names, types, connections, or features.
- Search the JSON data for matching products.
- Your response MUST be in ${language}.
- When you find relevant products, present them as a list.
- For each product, ALWAYS include:
  1. The product name.
  2. A direct link to the product using the format [link:PRODUCT_NAME|PRODUCT_ID]. Example: for "Procera Zirconia Bridge" with ID "EXO025", the link is [link:Procera Zirconia Bridge|EXO025].
- If an image URL is available in the JSON, include it using the format [image:IMAGE_URL].
- If the user's query is too vague, ask for more specific details.
- If no products match, inform the user and suggest alternative searches.
- Use **bold text** for emphasis where appropriate.
- Be concise and helpful.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `User query: "${message}"\n\nJSON Data:\n${JSON.stringify(caseDataForContext, null, 2)}`,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        
        const botResponse = response.text;
        setChatMessages(prev => [...prev, { role: 'bot', content: botResponse }]);

      } catch (error) {
        console.error("Chatbot error:", error);
        setChatMessages(prev => [...prev, { role: 'bot', content: t.chatbot.error_message }]);
      } finally {
        setIsChatbotLoading(false);
      }
  };

  const getDownloadLinks = (lang: Language) => {
    const storePath = getStorePath(lang);
    return [
      { text: 'Prosthetic solutions on implants', href: `https://www.nobelbiocare.com/${storePath}/products/prosthetics` },
      { text: 'All-on-4® treatment concept', href: `https://www.nobelbiocare.com/${storePath}/products/all-on-4-treatment-concept` },
      { text: 'Creos™ regenerative solutions', href: `https://www.nobelbiocare.com/${storePath}/products/creos-regenerative-solutions` }
    ];
  };

  const downloadLinks = getDownloadLinks(storeCountry);

  const renderModalContent = () => {
    if (!selectedCase) return null;
    
    switch (selectedCase.id) {
        case 'TEST001':
            return <DevDebugPage t={t.devDebugPage} onOpenProceESModal={handleOpenProceESModal} onOpenBotonesModal={handleOpenBotonesModal} />;
        case 'EXO006':
            const n1TccUnitariaData = isTableEditMode ? allTableData.n1TccUnitaria.draft : allTableData.n1TccUnitaria.saved;
            return <ZirconiaBridgeSubTable data={n1TccUnitariaData} onDataChange={createDataChangeHandler('n1TccUnitaria')} title={t.n1TccUnitariaTable.title} t={t.n1TccUnitariaTable} platformHeaders={['np', 'rp']} storeCountry={storeCountry} footerText={t.n1TccUnitariaTable.footer} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode} />;
        case 'EXO013':
            const n1BaseUnitariaData = isTableEditMode ? allTableData.n1BaseUnitaria.draft : allTableData.n1BaseUnitaria.saved;
            const n1BasePuenteData = isTableEditMode ? allTableData.n1BasePuente.draft : allTableData.n1BasePuente.saved;
            return (
                <div className="space-y-6">
                    <ZirconiaBridgeSubTable data={n1BaseUnitariaData} onDataChange={createDataChangeHandler('n1BaseUnitaria')} title={t.n1BaseUniversalTable.unitariaTitle} t={t.n1BaseUniversalTable} platformHeaders={['np', 'rp']} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode} />
                    <ZirconiaBridgeSubTable data={n1BasePuenteData} onDataChange={createDataChangeHandler('n1BasePuente')} title={t.n1BaseUniversalTable.puenteTitle} t={t.n1BaseUniversalTable} platformHeaders={['np', 'rp']} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[1]} isTableEditMode={isTableEditMode} />
                </div>
            );
        case 'EXO014':
            return (
                <div>
                  <ConnectionSelector connections={['CC', 'N1 TCC', 'N1 Base', 'On1', 'Branemark', 'Tri-channel']} selectedConnection={selectedModalConnection!} onConnectionChange={setSelectedModalConnection} t={t.modal} />
                  {/* Content based on selection will be rendered below or handled inside ConnectionSelector */}
                </div>
            );
        case 'EXO019':
            const pilarUniversalOn1NoRotatorioData = isTableEditMode ? allTableData.on1NoRotatorio.draft : allTableData.on1NoRotatorio.saved;
            const pilarUniversalOn1RotatorioData = isTableEditMode ? allTableData.on1Rotatorio.draft : allTableData.on1Rotatorio.saved;
            return (
              <div className="space-y-6">
                <ZirconiaBridgeSubTable data={pilarUniversalOn1NoRotatorioData} onDataChange={createDataChangeHandler('on1NoRotatorio')} title={t.pilarUniversalOn1Table.noRotatorioTitle} t={t.pilarUniversalOn1Table} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} footerText={t.pilarUniversalOn1Table.footer} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode} />
                <ZirconiaBridgeSubTable data={pilarUniversalOn1RotatorioData} onDataChange={createDataChangeHandler('on1Rotatorio')} title={t.pilarUniversalOn1Table.rotatorioTitle} t={t.pilarUniversalOn1Table} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[1]} isTableEditMode={isTableEditMode} />
              </div>
            );
        case 'EXO016':
            const preMilledBlanksData = isTableEditMode ? allTableData.preMilledBlanks.draft : allTableData.preMilledBlanks.saved;
            const preMilledBlanksN1TccData = isTableEditMode ? allTableData.preMilledBlanksN1TCC.draft : allTableData.preMilledBlanksN1TCC.saved;
            return (
              <div>
                <ConnectionSelector connections={['CC', 'Branemark', 'Tri-channel', 'N1 TCC']} selectedConnection={selectedModalConnection!} onConnectionChange={setSelectedModalConnection} t={t.modal} />
                {selectedModalConnection === 'N1 TCC' ? (
                  <PreMilledBlanksN1TCCTable t={t.preMilledBlanksN1TCCTable} storeCountry={storeCountry} isTableEditMode={isTableEditMode} data={preMilledBlanksN1TccData} onDataChange={createDataChangeHandler('preMilledBlanksN1TCC')} />
                ) : (
                  <PreMilledBlanksPage t={t.preMilledBlanksTable} storeCountry={storeCountry} connectionType={selectedModalConnection} isTableEditMode={isTableEditMode} data={preMilledBlanksData} onDataChange={createDataChangeHandler('preMilledBlanks')} />
                )}
              </div>
            );
        case 'EXO020':
            const nobelPearlData = isTableEditMode ? allTableData.nobelPearl.draft : allTableData.nobelPearl.saved;
            return <ZirconiaBridgeSubTable data={nobelPearlData} onDataChange={createDataChangeHandler('nobelPearl')} title={t.nobelPearlTable.title} t={t.nobelPearlTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} footerText={t.nobelPearlTable.footer} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode} />;
        case 'EXO029':
            let contentEXO029 = null;
            if (selectedModalConnection === 'CC') {
                const data = isTableEditMode ? allTableData.proceraTitaniumBridgeCC.draft : allTableData.proceraTitaniumBridgeCC.saved;
                contentEXO029 = <ZirconiaBridgeSubTable data={data} onDataChange={createDataChangeHandler('proceraTitaniumBridgeCC')} title="Componentes para Puente de Titanio - Conical Connection" t={t.proceraFCZImplantCrownTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode} />;
            } else if (selectedModalConnection === 'Branemark') {
                const data = isTableEditMode ? allTableData.proceraTitaniumBridgeBranemark.draft : allTableData.proceraTitaniumBridgeBranemark.saved;
                contentEXO029 = <ZirconiaBridgeSubTable data={data} onDataChange={createDataChangeHandler('proceraTitaniumBridgeBranemark')} title="Componentes para Puente de Titanio - Brånemark System®" t={t.proceraFCZImplantCrownTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode} />;
            } else if (selectedModalConnection === 'Tri-channel') {
                const data = isTableEditMode ? allTableData.proceraTitaniumBridgeTriChannel.draft : allTableData.proceraTitaniumBridgeTriChannel.saved;
                contentEXO029 = <ZirconiaBridgeSubTable data={data} onDataChange={createDataChangeHandler('proceraTitaniumBridgeTriChannel')} title="Componentes para Puente de Titanio - NobelReplace® (Tri-channel)" t={t.proceraFCZImplantCrownTable} platformHeaders={['np', 'rp', 'wp', '6']} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode} />;
            } else if (selectedModalConnection === 'Multi-Unit') {
                const data = isTableEditMode ? allTableData.multiUnitConnection.draft : allTableData.multiUnitConnection.saved;
                contentEXO029 = <ZirconiaBridgeSubTable data={data} onDataChange={createDataChangeHandler('multiUnitConnection')} title={t.universalMultiUnitTable.connectionTitle} t={t.universalMultiUnitTable} platformHeaders={['np / rp¹', 'wp²']} storeCountry={storeCountry} footerText={t.universalMultiUnitTable.footerRecto} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode} />;
            }
            return (
                <div>
                    <ConnectionSelector connections={['CC', 'Branemark', 'Tri-channel', 'Multi-Unit']} selectedConnection={selectedModalConnection!} onConnectionChange={setSelectedModalConnection} t={t.modal} />
                    <div className="mt-6">{contentEXO029}</div>
                </div>
            );
        case 'EXO024':
        case 'EXO025':
            let contentEXO024 = null;
            if (selectedModalConnection === 'CC') {
                const data = isTableEditMode ? allTableData.zirconiaBridgeCC.draft : allTableData.zirconiaBridgeCC.saved;
                contentEXO024 = <ZirconiaBridgeSubTable data={data} onDataChange={createDataChangeHandler('zirconiaBridgeCC')} title={t.zirconiaBridgeCCTable.title} t={t.proceraFCZImplantCrownTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode} />;
            } else if (selectedModalConnection === 'Branemark') {
                const data = isTableEditMode ? allTableData.zirconiaBridgeBranemark.draft : allTableData.zirconiaBridgeBranemark.saved;
                contentEXO024 = <ZirconiaBridgeSubTable data={data} onDataChange={createDataChangeHandler('zirconiaBridgeBranemark')} title={t.zirconiaBridgeBranemarkTable.title} t={t.proceraFCZImplantCrownTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode} />;
            } else if (selectedModalConnection === 'Tri-channel') {
                const data = isTableEditMode ? allTableData.zirconiaBridgeTriChannel.draft : allTableData.zirconiaBridgeTriChannel.saved;
                contentEXO024 = <ZirconiaBridgeSubTable data={data} onDataChange={createDataChangeHandler('zirconiaBridgeTriChannel')} title={t.zirconiaBridgeTriChannelTable.title} t={t.proceraFCZImplantCrownTable} platformHeaders={['np', 'rp', 'wp', '6']} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode} />;
            } else if (selectedModalConnection === 'Multi-Unit') {
                const data = isTableEditMode ? allTableData.multiUnitConnection.draft : allTableData.multiUnitConnection.saved;
                contentEXO024 = <ZirconiaBridgeSubTable data={data} onDataChange={createDataChangeHandler('multiUnitConnection')} title={t.universalMultiUnitTable.connectionTitle} t={t.universalMultiUnitTable} platformHeaders={['np / rp¹', 'wp²']} storeCountry={storeCountry} footerText={t.universalMultiUnitTable.footerRecto} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode} />;
            }
            return (
                <div>
                    <ConnectionSelector connections={['CC', 'Branemark', 'Tri-channel', 'Multi-Unit']} selectedConnection={selectedModalConnection!} onConnectionChange={setSelectedModalConnection} t={t.modal} />
                    <div className="mt-6">{contentEXO024}</div>
                </div>
            );
        case 'EXO021':
            let contentEXO021 = null;
            if (selectedModalConnection === 'CC') {
                const data = isTableEditMode ? allTableData.universalBaseNonRotatingCC.draft : allTableData.universalBaseNonRotatingCC.saved;
                contentEXO021 = <ZirconiaBridgeSubTable data={data} onDataChange={createDataChangeHandler('universalBaseNonRotatingCC')} title={t.universalBaseTable.cc} t={t.universalBaseTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} footerText={t.universalBaseTable.footer} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode} />;
            } else if (selectedModalConnection === 'Branemark') {
                const data = isTableEditMode ? allTableData.universalBaseNonRotatingBranemark.draft : allTableData.universalBaseNonRotatingBranemark.saved;
                contentEXO021 = <ZirconiaBridgeSubTable data={data} onDataChange={createDataChangeHandler('universalBaseNonRotatingBranemark')} title={t.universalBaseTable.externalHex} t={t.universalBaseTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} footerText={t.universalBaseTable.footer} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode} />;
            } else if (selectedModalConnection === 'Tri-channel') {
                const data = isTableEditMode ? allTableData.universalBaseNonRotatingTriChannel.draft : allTableData.universalBaseNonRotatingTriChannel.saved;
                contentEXO021 = <ZirconiaBridgeSubTable data={data} onDataChange={createDataChangeHandler('universalBaseNonRotatingTriChannel')} title={t.universalBaseTable.triChannel} t={t.universalBaseTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} footerText={t.universalBaseTable.footer} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode} />;
            }
            return (
                <div>
                    <ConnectionSelector connections={['CC', 'Branemark', 'Tri-channel']} selectedConnection={selectedModalConnection!} onConnectionChange={setSelectedModalConnection} t={t.modal} />
                    <div className="mt-6">{contentEXO021}</div>
                </div>
            );
        case 'EXO022':
            let contentEXO022 = null;
            if (selectedModalConnection === 'CC') {
                contentEXO022 = (
                    <div className="space-y-6">
                        <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.universalBaseRotatingCC.draft : allTableData.universalBaseRotatingCC.saved} onDataChange={createDataChangeHandler('universalBaseRotatingCC')} title={t.universalBaseRotatingCCTable.title} t={t.universalBaseRotatingTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} footerText={t.universalBaseRotatingTable.footer} imageUrl={selectedCase.imageUrls[1]} isTableEditMode={isTableEditMode}/>
                        <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.universalBaseRotatingConicoCC.draft : allTableData.universalBaseRotatingConicoCC.saved} onDataChange={createDataChangeHandler('universalBaseRotatingConicoCC')} title={t.universalBaseRotatingConicoCCTable.title} t={t.universalBaseRotatingTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} footerText={t.universalBaseRotatingTable.footer} imageUrl={selectedCase.imageUrls[1]} isTableEditMode={isTableEditMode}/>
                    </div>
                );
            } else if (selectedModalConnection === 'Branemark') {
                contentEXO022 = (
                    <div className="space-y-6">
                        <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.universalBaseRotatingBranemark.draft : allTableData.universalBaseRotatingBranemark.saved} onDataChange={createDataChangeHandler('universalBaseRotatingBranemark')} title={t.universalBaseRotatingBranemarkTable.title} t={t.universalBaseRotatingTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} footerText={t.universalBaseRotatingTable.footer} imageUrl={selectedCase.imageUrls[2]} isTableEditMode={isTableEditMode}/>
                        <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.universalBaseRotatingConicoBranemark.draft : allTableData.universalBaseRotatingConicoBranemark.saved} onDataChange={createDataChangeHandler('universalBaseRotatingConicoBranemark')} title={t.universalBaseRotatingConicoBranemarkTable.title} t={t.universalBaseRotatingTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} footerText={t.universalBaseRotatingTable.footer} imageUrl={selectedCase.imageUrls[2]} isTableEditMode={isTableEditMode}/>
                    </div>
                );
            } else if (selectedModalConnection === 'Tri-channel') {
                 contentEXO022 = (
                    <div className="space-y-6">
                        <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.universalBaseRotatingTriChannel.draft : allTableData.universalBaseRotatingTriChannel.saved} onDataChange={createDataChangeHandler('universalBaseRotatingTriChannel')} title={t.universalBaseRotatingTriChannelTable.title} t={t.universalBaseRotatingTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} footerText={t.universalBaseRotatingTable.footer} imageUrl={selectedCase.imageUrls[3]} isTableEditMode={isTableEditMode}/>
                        <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.universalBaseRotatingConicoTriChannel.draft : allTableData.universalBaseRotatingConicoTriChannel.saved} onDataChange={createDataChangeHandler('universalBaseRotatingConicoTriChannel')} title={t.universalBaseRotatingConicoTriChannelTable.title} t={t.universalBaseRotatingTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} footerText={t.universalBaseRotatingTable.footer} imageUrl={selectedCase.imageUrls[3]} isTableEditMode={isTableEditMode}/>
                    </div>
                );
            } else if (selectedModalConnection === 'Multi-Unit') {
                contentEXO022 = (
                    <div className="space-y-6">
                        <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.universalMultiUnitRecto.draft : allTableData.universalMultiUnitRecto.saved} onDataChange={createDataChangeHandler('universalMultiUnitRecto')} title={t.universalMultiUnitTable.rectoTitle} t={t.universalMultiUnitTable} platformHeaders={['np / rp¹', 'wp²']} storeCountry={storeCountry} footerText={t.universalMultiUnitTable.footerRecto} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode}/>
                        <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.universalMultiUnitConico.draft : allTableData.universalMultiUnitConico.saved} onDataChange={createDataChangeHandler('universalMultiUnitConico')} title={t.universalMultiUnitTable.conicoTitle} t={t.universalMultiUnitTable} platformHeaders={['np / rp¹', 'wp²']} storeCountry={storeCountry} footerText={t.universalMultiUnitTable.footerRecto} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode}/>
                    </div>
                );
            }
             return (
                <div>
                    <ConnectionSelector connections={['CC', 'Branemark', 'Tri-channel', 'Multi-Unit']} selectedConnection={selectedModalConnection!} onConnectionChange={setSelectedModalConnection} t={t.modal} />
                    <div className="mt-6">{contentEXO022}</div>
                </div>
            );
        case 'EXO027':
            let contentEXO027 = null;
            if (selectedModalConnection === 'CC') {
                contentEXO027 = <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.proceraTitaniumCC.draft : allTableData.proceraTitaniumCC.saved} onDataChange={createDataChangeHandler('proceraTitaniumCC')} title={t.proceraTitaniumPillarTable.ccTitle} t={t.proceraFCZImplantCrownTable} platformHeaders={['3.0', 'np', 'rp', 'wp']} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode}/>;
            } else if (selectedModalConnection === 'Branemark') {
                contentEXO027 = <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.proceraTitaniumBranemark.draft : allTableData.proceraTitaniumBranemark.saved} onDataChange={createDataChangeHandler('proceraTitaniumBranemark')} title={t.proceraTitaniumPillarTable.branemarkTitle} t={t.proceraFCZImplantCrownTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[1]} isTableEditMode={isTableEditMode}/>;
            } else if (selectedModalConnection === 'Tri-channel') {
                contentEXO027 = <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.proceraTitaniumTriChannel.draft : allTableData.proceraTitaniumTriChannel.saved} onDataChange={createDataChangeHandler('proceraTitaniumTriChannel')} title={t.proceraTitaniumPillarTable.triChannelTitle} t={t.proceraFCZImplantCrownTable} platformHeaders={['np', 'rp', 'wp', '6']} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[1]} isTableEditMode={isTableEditMode}/>;
            }
            return (
                <div>
                    <ConnectionSelector connections={['CC', 'Branemark', 'Tri-channel']} selectedConnection={selectedModalConnection!} onConnectionChange={setSelectedModalConnection} t={t.modal} />
                    <div className="mt-6">{contentEXO027}</div>
                </div>
            );
        case 'EXO028':
            let contentEXO028 = null;
            if (selectedModalConnection === 'CC') {
                contentEXO028 = <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.proceraTitaniumAscCC.draft : allTableData.proceraTitaniumAscCC.saved} onDataChange={createDataChangeHandler('proceraTitaniumAscCC')} title={t.proceraTitaniumAscPillarTable.ccTitle} t={t.proceraFCZImplantCrownTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} footerText={t.proceraTitaniumAscPillarTable.ccFooter} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode}/>;
            } else if (selectedModalConnection === 'Tri-channel') {
                contentEXO028 = <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.proceraTitaniumAscTriChannel.draft : allTableData.proceraTitaniumAscTriChannel.saved} onDataChange={createDataChangeHandler('proceraTitaniumAscTriChannel')} title={t.proceraTitaniumAscPillarTable.triChannelTitle} t={t.proceraFCZImplantCrownTable} platformHeaders={['np', 'rp', 'wp', '6']} storeCountry={storeCountry} footerText={t.proceraTitaniumAscPillarTable.triChannelFooter} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode}/>;
            }
            return (
                <div>
                    <ConnectionSelector connections={['CC', 'Tri-channel']} selectedConnection={selectedModalConnection!} onConnectionChange={setSelectedModalConnection} t={t.modal} />
                    <div className="mt-6">{contentEXO028}</div>
                </div>
            );
        case 'EXO030':
            let contentEXO030 = null;
            if (selectedModalConnection === 'CC') {
                contentEXO030 = <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.proceraZirconiaCC.draft : allTableData.proceraZirconiaCC.saved} onDataChange={createDataChangeHandler('proceraZirconiaCC')} title={t.proceraZirconiaPillarTable.ccTitle} t={t.proceraFCZImplantCrownTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode}/>;
            } else if (selectedModalConnection === 'Branemark') {
                contentEXO030 = <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.proceraZirconiaBranemark.draft : allTableData.proceraZirconiaBranemark.saved} onDataChange={createDataChangeHandler('proceraZirconiaBranemark')} title={t.proceraZirconiaPillarTable.branemarkTitle} t={t.proceraFCZImplantCrownTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode}/>;
            } else if (selectedModalConnection === 'Tri-channel') {
                contentEXO030 = <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.proceraZirconiaTriChannel.draft : allTableData.proceraZirconiaTriChannel.saved} onDataChange={createDataChangeHandler('proceraZirconiaTriChannel')} title={t.proceraZirconiaPillarTable.triChannelTitle} t={t.proceraFCZImplantCrownTable} platformHeaders={['np', 'rp', 'wp', '6']} storeCountry={storeCountry} footerText={t.proceraZirconiaPillarTable.triChannelFooter} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode}/>;
            }
            return (
                <div>
                    <ConnectionSelector connections={['CC', 'Branemark', 'Tri-channel']} selectedConnection={selectedModalConnection!} onConnectionChange={setSelectedModalConnection} t={t.modal} />
                    <div className="mt-6">{contentEXO030}</div>
                </div>
            );
        case 'EXO026':
            return <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.proceraFCZ.draft : allTableData.proceraFCZ.saved} onDataChange={createDataChangeHandler('proceraFCZ')} title={t.proceraFCZImplantCrownTable.title} t={t.proceraFCZImplantCrownTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode}/>;
        case 'EXO032':
            let contentEXO032 = null;
             if (selectedModalConnection === 'CC') {
                contentEXO032 = <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.nobelProceraBarCC.draft : allTableData.nobelProceraBarCC.saved} onDataChange={createDataChangeHandler('nobelProceraBarCC')} title={t.nobelProceraTitaniumBarTable.ccTitle} t={t.nobelProceraTitaniumBarTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[1]} isTableEditMode={isTableEditMode}/>;
            } else if (selectedModalConnection === 'Branemark') {
                contentEXO032 = <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.nobelProceraBarBranemark.draft : allTableData.nobelProceraBarBranemark.saved} onDataChange={createDataChangeHandler('nobelProceraBarBranemark')} title={t.nobelProceraTitaniumBarTable.branemarkTitle} t={t.nobelProceraTitaniumBarTable} platformHeaders={['np', 'rp', 'wp']} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[2]} isTableEditMode={isTableEditMode}/>;
            } else if (selectedModalConnection === 'Tri-channel') {
                contentEXO032 = <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.nobelProceraBarTriChannel.draft : allTableData.nobelProceraBarTriChannel.saved} onDataChange={createDataChangeHandler('nobelProceraBarTriChannel')} title={t.nobelProceraTitaniumBarTable.triChannelTitle} t={t.nobelProceraTitaniumBarTable} platformHeaders={['np', 'rp', 'wp', '6']} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[3]} isTableEditMode={isTableEditMode}/>;
            } else if (selectedModalConnection === 'Multi-Unit') {
                contentEXO032 = <ZirconiaBridgeSubTable data={isTableEditMode ? allTableData.multiUnitConnection.draft : allTableData.multiUnitConnection.saved} onDataChange={createDataChangeHandler('multiUnitConnection')} title={t.universalMultiUnitTable.connectionTitle} t={t.universalMultiUnitTable} platformHeaders={['np / rp¹', 'wp²']} storeCountry={storeCountry} footerText={t.universalMultiUnitTable.footerRecto} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode}/>;
            }
            return (
                <div>
                    <ConnectionSelector connections={['CC', 'Branemark', 'Tri-channel', 'Multi-Unit']} selectedConnection={selectedModalConnection!} onConnectionChange={setSelectedModalConnection} t={t.modal} />
                    <div className="mt-6">{contentEXO032}</div>
                </div>
            );
        case 'EXO034':
            const MUA_T = t.multiUnitAbutmentsTable;
            const platformLabels = {
              np: "NP", rp: "RP", wp: "WP",
              np_17: "NP", np_30: "NP",
              rp_17: "RP", rp_30: "RP",
              wp_17: "WP", wp_30: "WP",
            };
            let contentEXO034 = null;
            if (selectedModalConnection === 'CC') {
                contentEXO034 = (
                  <div className="space-y-6">
                    <MuaTable data={isTableEditMode ? allTableData.muaXealCCRecto.draft : allTableData.muaXealCCRecto.saved} onDataChange={createDataChangeHandler('muaXealCCRecto')} title={MUA_T.ccRectoTitle} headers={['1.5', '2.5', '3.5', '4.5']} platformHeader={MUA_T.platformHeader} platformLabels={platformLabels} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[0]} isTableEditMode={isTableEditMode}/>
                    <MuaTable data={isTableEditMode ? allTableData.muaXealCCAngulado.draft : allTableData.muaXealCCAngulado.saved} onDataChange={createDataChangeHandler('muaXealCCAngulado')} title={MUA_T.ccAnguladoTitle} headers={['2.5', '3.5', '4.5']} platformHeader={MUA_T.platformHeader} platformLabels={platformLabels} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[1]} isTableEditMode={isTableEditMode} isAngled/>
                  </div>
                );
            } else if (selectedModalConnection === 'N1 TCC') {
                contentEXO034 = (
                  <div className="space-y-6">
                    <MuaTable data={isTableEditMode ? allTableData.muaXealN1TccRecto.draft : allTableData.muaXealN1TccRecto.saved} onDataChange={createDataChangeHandler('muaXealN1TccRecto')} title={MUA_T.n1TccRectoTitle} headers={['1.5', '2.5', '3.5', '4.5']} platformHeader={MUA_T.platformHeader} platformLabels={platformLabels} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[2]} isTableEditMode={isTableEditMode}/>
                    <MuaTable data={isTableEditMode ? allTableData.muaXealN1TccAngulado.draft : allTableData.muaXealN1TccAngulado.saved} onDataChange={createDataChangeHandler('muaXealN1TccAngulado')} title={MUA_T.n1TccAnguladoTitle} headers={['2.5', '3.5', '4.5']} platformHeader={MUA_T.platformHeader} platformLabels={platformLabels} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[2]} isTableEditMode={isTableEditMode} isAngled/>
                  </div>
                );
            } else if (selectedModalConnection === 'Branemark') {
                 contentEXO034 = (
                  <div className="space-y-6">
                    <MuaTable data={isTableEditMode ? allTableData.muaBranemarkRecto.draft : allTableData.muaBranemarkRecto.saved} onDataChange={createDataChangeHandler('muaBranemarkRecto')} title={MUA_T.branemarkRectoTitle} headers={['1', '2', '3', '4', '5']} platformHeader={MUA_T.platformHeader} platformLabels={platformLabels} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[3]} isTableEditMode={isTableEditMode}/>
                    <MuaTable data={isTableEditMode ? allTableData.muaBranemarkAngulado.draft : allTableData.muaBranemarkAngulado.saved} onDataChange={createDataChangeHandler('muaBranemarkAngulado')} title={MUA_T.branemarkAnguladoTitle} headers={['2', '3', '4', '5']} platformHeader={MUA_T.platformHeader} platformLabels={platformLabels} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[4]} isTableEditMode={isTableEditMode} isAngled/>
                  </div>
                );
            } else if (selectedModalConnection === 'Tri-channel') {
                 contentEXO034 = (
                  <div className="space-y-6">
                    <MuaTable data={isTableEditMode ? allTableData.muaTriChannelRecto.draft : allTableData.muaTriChannelRecto.saved} onDataChange={createDataChangeHandler('muaTriChannelRecto')} title={MUA_T.triChannelRectoTitle} headers={['1', '2', '3', '4', '5']} platformHeader={MUA_T.platformHeader} platformLabels={platformLabels} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[5]} isTableEditMode={isTableEditMode}/>
                    <MuaTable data={isTableEditMode ? allTableData.muaTriChannelAngulado.draft : allTableData.muaTriChannelAngulado.saved} onDataChange={createDataChangeHandler('muaTriChannelAngulado')} title={MUA_T.triChannelAnguladoTitle} headers={['2', '3', '4', '5']} platformHeader={MUA_T.platformHeader} platformLabels={platformLabels} storeCountry={storeCountry} imageUrl={selectedCase.imageUrls[5]} isTableEditMode={isTableEditMode} isAngled/>
                  </div>
                );
            }
            return (
              <div>
                <ConnectionSelector connections={['CC', 'N1 TCC', 'Branemark', 'Tri-channel']} selectedConnection={selectedModalConnection!} onConnectionChange={setSelectedModalConnection} t={t.modal} />
                <div className="mt-6">{contentEXO034}</div>
              </div>
            );
        default:
            return <div className="text-center p-8 text-slate-500">{t.modal.no_components_description}</div>;
    }
  };
  
  return (
    <div className="bg-slate-100 min-h-screen flex flex-col page-container-enter">
        <Header 
          title={t.header.title} 
          language={language}
          storeCountry={storeCountry}
          onLanguageChange={setLanguage}
          onSupportClick={() => setIsHelp001ModalOpen(true)}
          onCustomerServiceClick={handleCustomerServiceClick}
          onDownloadCenterClick={handleOpenDownloadCenter}
          onGlobeClick={() => setIsIntroModalOpen(true)}
          t={t.header}
        />
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex">
            <aside className={`transition-all duration-300 ease-in-out ${isFilterBarCollapsed ? 'w-20' : 'w-80'}`}>
                <FilterBar 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                    onResetFilters={resetFilters}
                    isAnyFilterActive={isAnyFilterActive}
                    t={t.filterBar}
                    isCollapsed={isFilterBarCollapsed}
                    onToggle={() => setIsFilterBarCollapsed(!isFilterBarCollapsed)}
                />
            </aside>
            <div className="flex-1 pl-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="relative w-full max-w-lg">
                        <input
                            type="text"
                            placeholder={t.filterBar.search_placeholder}
                            value={filters.searchText}
                            onChange={(e) => handleFilterChange('searchText', e.target.value)}
                            className="w-full h-11 pl-10 pr-4 py-2 text-sm text-slate-800 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)]"
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    </div>
                </div>

                <CaseGrid 
                  cases={filteredCases} 
                  onReferenceClick={handleOpenModal} 
                  onHelp001Click={handleHelp001Click}
                  onTablesClick={handleTablesClick}
                  onTableTestClick={handleTableTestClick}
                  onExosClick={handleExosClick}
                  t={t.caseCard}
                  tNotes={t.notes}
                  language={language}
                  isAnyFilterActive={isAnyFilterActive}
                />
            </div>
        </main>
        
        {/* Chatbot Toggle Button */}
        <button
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-[color:var(--accent-primary)] text-white rounded-full shadow-lg hover:bg-[color:var(--accent-primary-hover)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary)] z-40 flex items-center justify-center"
          aria-label={t.chatbot.title}
        >
            <ChatbotIcon className="h-8 w-8" />
        </button>

        {/* Modals */}
        <Chatbot
          id="chatbot-main"
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
          messages={chatMessages}
          onSendMessage={handleSendMessage}
          isLoading={isChatbotLoading}
          t={t.chatbot}
          onNavigate={handleNavigateFromChat}
        />
        <Modal
            id="modal-references"
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={modalTitle}
            backButtonLabel={t.modal.back_button}
            caseData={selectedCase ?? undefined}
            t={t}
            isTableEditMode={isTableEditMode}
            onSaveChanges={handleSaveChanges}
        >
            <div className="space-y-6">
                {/* FIX: Changed the onOpenDownloadsModal prop to pass an arrow function, resolving a type mismatch. The function now correctly calls handleHelp001Click with the selected case. */}
                {isDownloadsVisible && <ResourceButtons t={t.modal} caseData={selectedCase!} onOpenDownloadsModal={() => handleHelp001Click(selectedCase!)} storeCountry={storeCountry} />}

                {isIconDetailsVisible && (
                     <div className="space-y-3">
                        <button
                            onClick={() => setIsIconDetailsVisible(prev => !prev)}
                            className={commonAccordionClasses}
                        >
                            <span>{t.modal.iconography_details_title}</span>
                            {isIconDetailsVisible ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                        </button>
                        {isIconDetailsVisible && (
                           <div className="p-4 bg-slate-50 rounded-b-md border border-t-0 border-slate-200">
                             <CaseDetailIcons caseData={selectedCase!} isModal={true} t={t.caseCard} connectionTypeForTable={selectedModalConnection} />
                           </div>
                        )}
                     </div>
                )}
                {renderModalContent()}
            </div>
        </Modal>

        <Modal id="modal-help-espt" isOpen={isHelp001ModalOpen} onClose={() => setIsHelp001ModalOpen(false)} title={t.modal.descargas_procera_modal_title} backButtonLabel={t.modal.back_button}>
             <DescargasProceraModalContent t={t.modal} onClose={() => setIsHelp001ModalOpen(false)} language={language} onOpenSelecProLocal={() => { setIsHelp001ModalOpen(false); setIsSelecProLocalModalOpen(true); }} />
        </Modal>
        
         <Modal id="modal-help-frsv" isOpen={isHelpOtherModalOpen} onClose={() => setIsHelpOtherModalOpen(false)} title={t.modal.descargas_procera_modal_title} backButtonLabel={t.modal.back_button}>
             <DescargasOtherProcera t={t.modal} onClose={() => setIsHelpOtherModalOpen(false)} language={language} onOpenSelecProLocal={() => { setIsHelpOtherModalOpen(false); setIsSelecProLocalModalOpen(true); }} />
        </Modal>

        <Modal id="modal-workflow-selector" isOpen={isSelecProLocalModalOpen} onClose={() => setIsSelecProLocalModalOpen(false)} title={t.modal.selec_pro_local_title} backButtonLabel={t.modal.back_button}>
            <SelecProLocal t={t.modal} onClose={() => setIsSelecProLocalModalOpen(false)} language={language} />
        </Modal>

        <Modal id="modal-ui-tables" isOpen={isTablesModalOpen} onClose={() => setIsTablesModalOpen(false)} title={t.modal.tables_modal_title} backButtonLabel={t.modal.back_button}>
            <TablesModalContent t={t} />
        </Modal>
        
        <Modal id="modal-test-table" isOpen={isTableTestModalOpen} onClose={() => setIsTableTestModalOpen(false)} title={t.triChannelTestTable.title} backButtonLabel={t.modal.back_button} isTableEditMode={isTableEditMode} onSaveChanges={handleSaveChanges}>
            <TriChannelTable t={t.triChannelTestTable} storeCountry={storeCountry} isTableEditMode={isTableEditMode} data={allTableData.triChannel.draft} onDataChange={createDataChangeHandler('triChannel')} />
        </Modal>

        <Modal id="modal-customer-service" isOpen={isCustomerServiceModalOpen} onClose={() => setIsCustomerServiceModalOpen(false)} title={t.modal.customer_service_title} backButtonLabel={t.modal.back_button}>
            <CustomerServiceModal t={t.modal} language={language} />
        </Modal>
        
        <Modal id="modal-button-gallery" isOpen={isBotonesModalOpen} onClose={() => setIsBotonesModalOpen(false)} title={t.modal.botones_modal_title} backButtonLabel={t.modal.back_button}>
            <BotonesModalContent />
        </Modal>
        
        <Modal id="modal-download-center" isOpen={isDownloadCenterModalOpen} onClose={handleCloseDownloadCenter} title={t.modal.download_center_title} backButtonLabel={t.modal.back_button}>
            <DownloadCenterModalContent links={downloadLinks} t={t} onClose={handleCloseDownloadCenter} onOpenWorkflowSelector={handleOpenWorkflowSelector} storeCountry={storeCountry} />
        </Modal>
        
        <Modal id="modal-exos-analysis" isOpen={isExosModalOpen} onClose={() => setIsExosModalOpen(false)} title={t.modal.exos_modal_title} backButtonLabel={t.modal.back_button} isTableEditMode={isTableEditMode} onSaveChanges={handleSaveChanges}>
            <ExosModalContent 
                t={t.exos_modal}
                language={language}
                isTableEditMode={isTableEditMode}
                caseModalData={allTableData.exosCases.draft}
                onCaseModalDataChange={createDataChangeHandler('exosCases')}
                modalAnalysisData={allTableData.exosAnalysis.draft}
                onModalAnalysisDataChange={createDataChangeHandler('exosAnalysis')}
            />
        </Modal>

        {isIntroModalOpen && (
            <Modal
              id="modal-intro"
              isOpen={isIntroModalOpen}
              onClose={() => {}} // Cannot be closed
              title=""
              backButtonLabel=""
              isDismissable={false}
              showHeader={false}
              maxWidth="max-w-xl"
            >
              <IntroModal onConfirm={handleIntroConfirm} t={translations} />
            </Modal>
        )}
        
        {/* Notifications */}
        {showEditModeNotification && (
            <div className="fixed top-24 right-6 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg animate-simple-fade-in z-50">
                <p className="font-semibold">Modo Edición Activado</p>
                <p className="text-sm">Ahora puede editar el contenido de las tablas.</p>
            </div>
        )}
        {showSaveNotification && (
            <div className="fixed top-24 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-simple-fade-in z-50">
                <p className="font-semibold">¡Cambios Guardados!</p>
                <p className="text-sm">Sus modificaciones han sido guardadas.</p>
            </div>
        )}

        <Footer t={footerT} storeCountry={storeCountry} onSupportClick={() => setIsHelp001ModalOpen(true)} />
    </div>
  );
};

export default App;