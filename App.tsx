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

// FIX: Added ZirconiaBridgeSubTable component definition to fix 'Cannot find name' error.
const ZirconiaBridgeSubTable: React.FC<{
  data: any[];
  onDataChange: (newData: any[]) => void;
  title: string;
  t: any;
  platformHeaders: string[];
  storeCountry: Language;
  footerText?: string;
  imageUrl?: string;
  isTableEditMode?: boolean;
}> = ({ data, onDataChange, title, t, platformHeaders, storeCountry, footerText, imageUrl, isTableEditMode }) => {
  const platformColors: { [key: string]: string } = {
    '3.0': 'text-gray-600',
    np: 'text-pink-600',
    rp: 'text-amber-600',
    wp: 'text-blue-600',
    '6.0': 'text-green-600',
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
    if (data[rowIndex] && data[rowIndex][colKey] !== newValue) {
        const newData = JSON.parse(JSON.stringify(data));
        newData[rowIndex][colKey] = newValue;
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
    const image = REFERENCE_IMAGE_MAP[searchTerm.toLowerCase()];
    
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

    return image && !isTableEditMode ? (
      <div className="relative group flex items-center justify-center">
        {finalContent}
        <img src={image} alt={ref} className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-24 h-24 object-contain bg-white border border-slate-200 rounded-md shadow-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10" />
      </div>
    ) : finalContent;
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
                  {p}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((row, rowIndex) => (
              <tr key={row.rowKey} className="hover:bg-slate-50 transition-colors duration-150">
                <td 
                  className="px-3 py-1.5 whitespace-normal text-xs font-medium text-slate-800 text-left bg-white border-b border-slate-200"
                  onBlur={(e) => isTableEditMode && handleLabelBlur(e, rowIndex)}
                  contentEditable={isTableEditMode}
                  suppressContentEditableWarning={true}
                >
                  {(row as any).label ?? t[row.rowKey]}
                </td>
                {platformHeaders.map(p => {
                  // FIX: Correctly derive column key from header text to handle special cases.
                  const colKey = (() => {
                      if (p === 'NP / RP¹') return 'np_rp';
                      return p.toLowerCase().split(' ')[0].replace(/[¹²³]/g, '');
                  })();
                  return (
                    <td key={`${row.rowKey}-${p}`} className="px-2 py-1.5 text-center whitespace-nowrap text-xs text-slate-600 border-b border-l border-slate-200">
                      {renderCell(row[colKey], row.rowKey, rowIndex, colKey)}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footerText && <div className="text-xs text-slate-500 mt-2 text-right">{footerText}</div>}
    </div>
  );
};

// FIX: Added PreMilledBlanksN1TCCTable component definition to fix 'Cannot find name' error.
const PreMilledBlanksN1TCCTable: React.FC<{
  t: any;
  storeCountry: Language;
  imageUrl?: string;
  isTableEditMode?: boolean;
  data: any[];
  onDataChange: (newData: any[]) => void;
}> = ({ t, storeCountry, imageUrl, isTableEditMode, data, onDataChange }) => {
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
        const newData = JSON.parse(JSON.stringify(data));
        newData[rowIndex][colKey] = newValue;
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

// FIX: Added MuaTable component definition to fix 'Cannot find name' error.
const MuaTable: React.FC<{
  data: any[];
  onDataChange: (newData: any[]) => void;
  title: string;
  headers: string[];
  platformHeader: string;
  platformLabels: { [key: string]: string };
  storeCountry: Language;
  imageUrl?: string;
  isTableEditMode?: boolean;
  isAngled?: boolean;
}> = ({ data, onDataChange, title, headers, platformHeader, platformLabels, storeCountry, imageUrl, isTableEditMode, isAngled }) => {
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
            const newData = JSON.parse(JSON.stringify(data));
            newData[rowIndex][colKey] = newValue;
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

    return (
        <div>
            <h3 className="text-sm font-semibold text-slate-600 mb-2">{t.resources_title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                    onClick={onOpenDownloadsModal}
                    className="w-full inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)] focus:ring-offset-2 transition-all duration-200"
                >
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    {t.resource1_label_procera}
                </button>
                <a
                    href={`https://www.nobelbiocare.com/${storePath}/nobelprocera-scan-and-design-services`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)] focus:ring-offset-2 transition-all duration-200"
                >
                    <ArrowRightIcon className="h-4 w-4 mr-2" />
                    {t.design_services_button}
                </a>
                <a
                    href="https://my.nobelbiocare.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)] focus:ring-offset-2 transition-all duration-200"
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
  
  // FIX: Made the handler generic and cast `newData` to maintain type safety for the state object without causing inference errors.
  const createDataChangeHandler = <K extends keyof typeof allTableData>(key: K) => (newData: any[]) => {
      setAllTableData(prevData => {
          const newDraft = newData as (typeof prevData)[K]['draft'];
          return {
              ...prevData,
              [key]: { ...prevData[key], draft: newDraft }
          };
      });
  };

  const t = translations[language];
  const footerT = translations[storeCountry]?.footer ?? translations.es.footer;

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
        if (newData[key]) {
          newData[key] = { ...newData[key], draft: newData[key].saved };
        }
      });
      return newData;
    });
  };

  useEffect(() => {
    setChatMessages([{ role: 'bot', content: t.chatbot.welcome_message }]);
    const updatedExosData = MOCK_CASES.map(caseData => ({
        title: caseData.patientName[language],
        caseId: caseData.id,
        modalType: getModalContentType(caseData)
    }));
    setAllTableData(prev => ({
      ...prev,
      exosCases: { saved: updatedExosData, draft: updatedExosData }
    }));
  }, [t.chatbot.welcome_message, language]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsTableEditMode(prev => {
          setShowEditModeNotification(true);
          setTimeout(() => setShowEditModeNotification(false), 2000);
          return !prev;
        });
      }
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'x') {
        e.preventDefault();
        if (isTableEditMode) {
          handleSaveChanges();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTableEditMode, allTableData]);

  const caseModalReferences = useMemo(() => {
    const getAllStringValues = (data: any): string[] => {
      const strings: Set<string> = new Set();
      const traverse = (obj: any) => {
        if (typeof obj === 'string') {
          const lowerObj = obj.toLowerCase();
          const isScrewdriver = lowerObj.includes('unigrip') || lowerObj.includes('omnigrip');
          if ((/\d/.test(obj) || isScrewdriver) && obj.length > 2 && !lowerObj.includes('mm') && !lowerObj.includes('kit')) {
            strings.add(lowerObj.replace('*', ''));
          }
        } else if (Array.isArray(obj)) {
          obj.forEach(traverse);
        } else if (typeof obj === 'object' && obj !== null) {
          Object.values(obj).forEach(traverse);
        }
      };
      traverse(data);
      return Array.from(strings);
    };

    const caseToTablesMap: { [key: string]: any[] } = {
      'EXO006': [N1_TCC_UNITARIA_NO_ROTATORIA_DATA],
      'EXO013': [N1_BASE_UNITARIA_NO_ROTATORIA_DATA, N1_BASE_PUENTE_ROTATORIA_DATA],
      'EXO019': [PILAR_UNIVERSAL_ON1_NO_ROTATORIO_DATA, PILAR_UNIVERSAL_ON1_ROTATORIO_DATA],
      'EXO016': [PRE_MILLED_BLANKS_DATA, PRE_MILLED_BLANKS_N1_TCC_DATA],
      'EXO020': [NOBEL_PEARL_COMPONENTS_DATA],
      'EXO029': [PROCERA_TITANIUM_BRIDGE_CC_DATA, PROCERA_TITANIUM_BRIDGE_BRANEMARK_DATA, PROCERA_TITANIUM_BRIDGE_TRICHANNEL_UPDATED_DATA, MULTI_UNIT_CONNECTION_DATA],
      'EXO024': [ZIRCONIA_BRIDGE_CC_DATA, ZIRCONIA_BRIDGE_BRANEMARK_DATA, ZIRCONIA_BRIDGE_TRICHANNEL_DATA, MULTI_UNIT_CONNECTION_DATA],
      'EXO025': [ZIRCONIA_BRIDGE_CC_DATA, ZIRCONIA_BRIDGE_BRANEMARK_DATA, ZIRCONIA_BRIDGE_TRICHANNEL_DATA, MULTI_UNIT_CONNECTION_DATA],
      'EXO021': [UNIVERSAL_BASE_NON_ROTATING_CC_DATA, UNIVERSAL_BASE_NON_ROTATING_BRANEMARK_DATA, UNIVERSAL_BASE_NON_ROTATING_TRICHANNEL_DATA],
      'EXO022': [UNIVERSAL_BASE_ROTATING_CC_DATA, UNIVERSAL_BASE_ROTATING_CONICO_CC_DATA, UNIVERSAL_BASE_ROTATING_BRANEMARK_DATA, UNIVERSAL_BASE_ROTATING_CONICO_BRANEMARK_DATA, UNIVERSAL_BASE_ROTATING_TRICHANNEL_DATA, UNIVERSAL_BASE_ROTATING_CONICO_TRICHANNEL_DATA, UNIVERSAL_MULTI_UNIT_RECTO_DATA, UNIVERSAL_MULTI_UNIT_CONICO_DATA],
      'EXO027': [PROCERA_TITANIUM_CC_DATA, PROCERA_TITANIUM_BRANEMARK_DATA, PROCERA_TITANIUM_TRICHANNEL_DATA],
      'EXO028': [PROCERA_TITANIUM_ASC_CC_DATA, PROCERA_TITANIUM_ASC_TRICHANNEL_DATA],
      'EXO030': [PROCERA_ZIRCONIA_CC_DATA, PROCERA_ZIRCONIA_BRANEMARK_DATA, PROCERA_ZIRCONIA_TRICHANNEL_DATA],
      'EXO026': [PROCERA_FCZ_IMPLANT_CROWN_DATA],
      'EXO032': [NOBELPROCERA_TITANIUM_BAR_CC_DATA, NOBELPROCERA_TITANIUM_BAR_BRANEMARK_DATA, NOBELPROCERA_TITANIUM_BAR_TRICHANNEL_DATA],
    };

    const finalMap = new Map<string, string[]>();
    for (const caseId in caseToTablesMap) {
      const tables = caseToTablesMap[caseId];
      finalMap.set(caseId, getAllStringValues(tables));
    }
    
    return finalMap;
  }, []);

  const casesJsonString = useMemo(() => {
    const allCaseData = MOCK_CASES.map(c => {
        const modalData = caseModalReferences.get(c.id);
        return {
            ...c,
            modalTables: modalData ? JSON.stringify(modalData) : "No specific component data available."
        };
    });

    return JSON.stringify(allCaseData.map(c => ({
        id: c.id,
        nombre: c.patientName[language],
        tipoRestauracion: c.restorationType,
        tipoConexion: c.connectionType,
        conexionesCompatibles: c.compatibleConnections,
        estado: c.status,
        notas: c.notes,
        torque: c.torque,
        accesoAngulado: c.angulacion,
        baseCementada: c.baseCementada,
        imageUrls: c.imageUrls,
        componentes: c.modalTables
    })));
}, [language, storeCountry, caseModalReferences]);

  const handleSendMessage = async (message: string) => {
    const newUserMessage = { role: 'user' as const, content: message };
    setChatMessages(prev => [...prev, newUserMessage]);
    setIsChatbotLoading(true);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const storePath = getStorePath(storeCountry);
    
    const systemInstruction = `Eres un asistente virtual experto en las soluciones protésicas de Nobel Biocare. Tu conocimiento se basa en un catálogo de productos interno y en búsquedas web restringidas. Sigue estas 9 reglas OBLIGATORIAMENTE en TODAS tus respuestas:

1.  **Resumen de la App:** Si el producto está en el catálogo, ofrece un resumen con su información más importante.
2.  **Enlace Interno OBLIGATORIO:** Si mencionas un producto del catálogo, DEBES incluir un enlace para abrirlo en la app. Usa este formato EXACTO: \`[link:NOMBRE_DEL_PRODUCTO|ID_DEL_CASO]\`. Por ejemplo, para el producto con ID "EXO024", el enlace sería \`[link:Puente sobre implantes Procera Zirconia estética|EXO024]\`.
3.  **Imagen del Producto:** Muestra una imagen del producto del catálogo si está disponible. NO debe ser un enlace. Formato: \`[image:URL_DE_LA_IMAGEN]\`.
4.  **Definición de Internet:** Genera una definición resumida del producto o concepto buscando en internet.
5.  **Fuentes Restringidas por Región:** Tus búsquedas y fuentes deben provenir EXCLUSCLUSIVAMENTE de los dominios de Nobel Biocare para la región del usuario (${storeCountry.toUpperCase()}). Dominios permitidos: 'www.nobelbiocare.com/${storePath}', 'store.nobelbiocare.com/${storePath}', 'www.nobelbiocare.com', 'store.nobelbiocare.com'.
6.  **Dominios PROHIBIDOS:** NUNCA ofrezcas enlaces o cites fuentes de los siguientes dominios: https://dentlot.com/, https://www.dessdental.com/, https://ipd2004.com/. No uses ningún dominio que no sea nobelbiocare.com.
7.  **Formato de Fuentes:** Presenta las fuentes en una sección final "**${t.chatbot.sources_title}**". Proporciona las URL completas; la interfaz las formateará.
8.  **Idioma y Tono:** Responde formalmente, en el idioma del usuario (${language}), y usa los nombres completos de los productos.
9.  **No enlaces externos:** No incluyas enlaces web en el cuerpo de tu respuesta, solo en la sección de fuentes. La única excepción es el formato \`[link:..|..]\` para la navegación interna.

Catálogo de productos:
${casesJsonString}`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [...chatMessages.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        })), { role: 'user', parts: [{ text: message }] }],
        config: {
          systemInstruction: systemInstruction,
          tools: [{googleSearch: {}}],
        }
      });
      
      let botResponse = response.text;
      const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
      if (groundingMetadata?.groundingChunks?.length) {
        const allowedHostnames = ['www.nobelbiocare.com', 'store.nobelbiocare.com'];
        const blockedDomains = ['dentlot.com', 'dessdental.com', 'ipd2004.com'];

        const sources = groundingMetadata.groundingChunks
          .map((chunk: any) => chunk.web?.uri)
          .filter((uri: string | undefined): uri is string => {
            if (!uri) return false;
            try {
              const url = new URL(uri);
              const hostname = url.hostname.toLowerCase();

              const isAllowed = allowedHostnames.some(allowed => hostname === allowed || hostname.endsWith(`.${allowed}`));
              if (!isAllowed) return false;
              
              const isBlocked = blockedDomains.some(blocked => hostname.includes(blocked));
              if (isBlocked) return false;
              
              return true;
            } catch (e) {
              return false;
            }
          });
          
        if (sources.length > 0) {
          const uniqueSources = [...new Set(sources)];
          botResponse += `\n\n**${t.chatbot.sources_title}**\n` + uniqueSources.map(source => `- ${source}`).join('\n');
        }
      }

      setChatMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setChatMessages(prev => [...prev, { role: 'bot', content: t.chatbot.error_message }]);
    } finally {
      setIsChatbotLoading(false);
    }
  };

  const isAnyFilterActive = filters.searchText !== '' || filters.status !== '' || filters.type !== '' || filters.connectionType !== '' || filters.softwareType !== '' || filters.angulation !== '';

  const downloadLinks = useMemo(() => {
    const links = new Map<string, { text: string; href: string }>();

    MOCK_CASES.forEach(caseData => {
        const universalBaseCases = ['EXO021', 'EXO022', 'EXO013', 'EXO006', 'EXO019'];
        
        if (caseData.status === CaseStatus.Procera) {
            const href = "https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/PDF/GMT%2095136_ES%20NobelProcera%20product%20overview.pdf";
            if (!links.has(href)) {
                links.set(href, { text: "NobelProcera Overview", href });
            }
        }
        
        if (universalBaseCases.includes(caseData.id)) {
            const href = "https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/PDF/87971_Universal%20Base%20product%20overview_ES.pdf";
            if (!links.has(href)) {
                links.set(href, { text: "Product Overview U. Base", href });
            }
        }

        if (caseData.id === 'EXO016') {
            const href = "https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/PDF/88412_Titanium%20Blanks%20product%20overview_ES.pdf";
            if (!links.has(href)) {
                links.set(href, { text: "blanks y holders Overview", href });
            }
        }

        if (caseData.id === 'EXO020') {
            const href = "https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/PDF/88966_Product%20Overview%20NobelPearl_ES.pdf";
            if (!links.has(href)) {
                links.set(href, { text: "NobelPearl Overview", href });
            }
        }
        
        if (caseData.id === 'EXO013' || caseData.id === 'EXO006') {
            const href = "https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/PDF/87730%20Nobel%20Biocare%20N1%20System%20ProdOverw%2021.2%20ES.pdf";
            if (!links.has(href)) {
                links.set(href, { text: "Prosthetic Overview N1", href });
            }
        }
    });

    return Array.from(links.values());
  }, []);

  const handleFilterChange = (name: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchText: '',
      status: '',
      type: '',
      connectionType: '',
      softwareType: '',
      angulation: '',
    });
  };

  const handleReferenceClick = (caseData: DentalCase, connection?: string) => {
    setSelectedCase(caseData);
    setModalTitle(caseData.patientName[language]);

    // Reset relevant draft data when opening modal
    const tablesToReset: (keyof typeof allTableData)[] = [];
    switch (caseData.id) {
        case 'EXO006': tablesToReset.push('n1TccUnitaria'); break;
        case 'EXO013': tablesToReset.push('n1BaseUnitaria', 'n1BasePuente'); break;
        // ... Add all other cases and their corresponding table keys
    }
    resetDraftsForModal(tablesToReset);


    if (!connection && (caseData.id === 'EXO027' || caseData.id === 'EXO030' || caseData.id === 'EXO028' || caseData.id === 'EXO032' || caseData.id === 'EXO034')) {
      setSelectedModalConnection('CC');
    } else {
      setSelectedModalConnection(connection);
    }
    setIsIconDetailsVisible(true);
    setIsDownloadsVisible(false);
    setIsModalOpen(true);
  };
  
  const handleSupportClick = () => {
    setSelectedCase(null);
    setModalTitle(t.header.support_button);
    setIsModalOpen(true);
  }

  const handleOpenDownloadCenter = () => {
    setIsDownloadCenterModalOpen(true);
  };
  
  const handleOpenSelecProLocalFromDownloads = () => {
    setIsHelp001ModalOpen(false);
    setIsHelpOtherModalOpen(false);
    setIsDownloadCenterModalOpen(false);
    setIsSelecProLocalModalOpen(true);
  };

  const handleOpenDownloadsHelpModal = () => {
    if (selectedCase?.status === CaseStatus.Procera || selectedCase?.status === CaseStatus.Local) {
        if (language === 'es' || language === 'pt') {
            setIsHelp001ModalOpen(true);
        } else {
            setIsHelpOtherModalOpen(true);
        }
    } else if (selectedCase?.id === 'TEST001') {
      setIsHelp001ModalOpen(true);
    } else {
      setIsHelpOtherModalOpen(true);
    }
  };

  const handleOpenTablesModal = () => {
    setIsTablesModalOpen(true);
  };

  const handleTableTestClick = (caseData: DentalCase) => {
    resetDraftsForModal(['triChannel']);
    setIsTableTestModalOpen(true);
  };
  
  const handleExosClick = () => {
    resetDraftsForModal(['exosCases', 'exosAnalysis']);
    setIsExosModalOpen(true);
  };

  const handleCustomerServiceClick = () => { 
    setIsCustomerServiceModalOpen(true);
  };

  const handleOpenBotonesModal = () => {
    setIsBotonesModalOpen(true);
  };

  const handleOpenDownloadHelpFromCenter = () => {
    setIsDownloadCenterModalOpen(false);
    if (language === 'es' || language === 'pt') {
        setIsHelp001ModalOpen(true);
    } else {
        setIsHelpOtherModalOpen(true);
    }
  };

  const handleIntroConfirm = (lang: Language, country: Language) => {
    setLanguage(lang);
    setStoreCountry(country);
    setIsIntroModalOpen(false);
    if (isFirstLaunch) {
        setIsFirstLaunch(false);
    }
  };

  const handleReopenIntroModal = () => {
    setIsIntroModalOpen(true);
  };

  const handleChatbotNavigation = (caseId: string) => {
    const caseToOpen = MOCK_CASES.find(c => c.id === caseId);
    if (caseToOpen) {
      setIsChatbotOpen(false); 
      handleReferenceClick(caseToOpen);
    }
  };

  const filteredCases = useMemo(() => {
    const isCompatibleWithSoftware = (c: DentalCase, software: SoftwareType): boolean => {
      if (c.status !== CaseStatus.Local && c.status !== CaseStatus.Procera) {
        return false;
      }
      switch (software) {
        case SoftwareType.DTX:
        case SoftwareType.Exocad:
        case SoftwareType.ThreeShape:
          return true; // Compatible with both Local and Procera
        case SoftwareType.Dentalwings:
          return c.status === CaseStatus.Local && c.id !== 'EXO020';
        default:
          return false;
      }
    };
    
    const getEffectiveAngulation = (c: DentalCase): boolean | 'N/A' => {
        const id = c.id;

        if (['EXO024', 'EXO025', 'EXO026', 'EXO028', 'EXO013'].includes(id)) {
            return true;
        }
        if (['EXO014', 'EXO027', 'EXO030', 'EXO029', 'EXO032', 'EXO016', 'EXO019', 'EXO020', 'EXO021', 'EXO022'].includes(id)) {
            return false;
        }

        return 'N/A';
    };


    return MOCK_CASES.filter(c => {
      const searchLower = filters.searchText.toLowerCase();
      
      const modalRefs = caseModalReferences.get(c.id) || [];
      const matchesModalRefs = searchLower ? modalRefs.some(ref => ref.includes(searchLower)) : false;

      const matchesSearch = filters.searchText === '' ||
        c.patientName[language].toLowerCase().includes(searchLower) ||
        c.id.toLowerCase().includes(searchLower) ||
        c.reference.toLowerCase().includes(searchLower) ||
        matchesModalRefs;

      const matchesStatus = filters.status === '' || c.status === filters.status;
      const matchesType = filters.type === '' || c.restorationType.includes(filters.type as RestorationType);
      
      const matchesConnection = (() => {
        if (!filters.connectionType) {
          return true;
        }
        
        const allCaseConnections = new Set<ConnectionType>([c.connectionType, ...(c.compatibleConnections || [])]);

        if (filters.connectionType === ConnectionType.N1) {
          return allCaseConnections.has(ConnectionType.N1) || allCaseConnections.has(ConnectionType.N1Base);
        }

        return allCaseConnections.has(filters.connectionType as ConnectionType);
      })();

      const matchesSoftware = filters.softwareType === '' || isCompatibleWithSoftware(c, filters.softwareType as SoftwareType);
      
      const effectiveAngulation = getEffectiveAngulation(c);
      const matchesAngulation = filters.angulation === '' || effectiveAngulation === (filters.angulation === 'true');

      return matchesSearch && matchesStatus && matchesType && matchesConnection && matchesSoftware && matchesAngulation;
    });
  }, [filters, language, caseModalReferences]);

  const casesWithDownloads = useMemo(() => new Set([
    'EXO006', 'EXO013', 'EXO019', 'EXO016', 'EXO029', 'EXO024', 'EXO025', 
    'EXO021', 'EXO022', 'EXO027', 'EXO028', 'EXO030', 'EXO026', 'EXO031', 
    'EXO032', 'EXO014', 'EXO020'
  ]), []);

  const modalConnections = useMemo(() => {
      if (!selectedCase) return [];
      switch (selectedCase.id) {
          case 'EXO014': return ['CC', 'N1 TCC', 'N1 Base', 'On1', 'Branemark', 'Tri-channel'];
          case 'EXO016': return ['CC', 'Branemark', 'Tri-channel', 'N1 TCC'];
          case 'EXO029': return ['CC', 'Branemark', 'Tri-channel', 'Multi-Unit'];
          case 'EXO024':
          case 'EXO025':
          case 'EXO022': 
          case 'EXO032': return ['CC', 'Branemark', 'Tri-channel', 'Multi-Unit'];
          case 'EXO021':
          case 'EXO027':
          case 'EXO030': return ['CC', 'Branemark', 'Tri-channel'];
          case 'EXO028': return ['CC', 'Tri-channel'];
          case 'EXO034': return ['CC', 'N1 TCC', 'Branemark', 'Tri-channel'];
          default: return [];
      }
  }, [selectedCase]);

  const modalLinks = useMemo(() => {
    if (!selectedCase) return undefined;

    const storePath = getStorePath(storeCountry);

    if (selectedCase.status === CaseStatus.Procera) {
      const openAccessUrl = `https://www.nobelbiocare.com/${storePath}/nobelprocera-openaccess`;
      return {
        exocad: openAccessUrl,
        shape: openAccessUrl,
        seeAll: openAccessUrl,
      };
    }

    if (selectedCase.id === 'EXO016') {
      const produccionLocalPath = language === 'es' ? 'produccion-local' : (language === 'pt' ? 'producao-local' : 'production-locale');
      return {
        exocad: "https://www.nobelbiocare.com/sites/g/files/wdvifx201/files/Nobel%20Biocare%20Ti-Blanks.zip",
        shape: "https://www.nobelbiocare.com/sites/g/files/wdvifx201/files/Nobel%20Biocare_Titanium%20Blanks_3Shape_non_fda.zip",
        dentalwings: "https://www.nobelbiocare.com/sites/g/files/wdvifx201/files/NobelBiocare_Titanium%20Blanks_Dental%20Wings.zip",
        seeAll: `https://www.nobelbiocare.com/${storePath}/${produccionLocalPath}#66588`,
      };
    }

    return undefined;
  }, [selectedCase, language, storeCountry]);

  const renderModalContent = () => {
    if (!selectedCase) {
      if (modalTitle === t.header.support_button) {
        return <SupportModal t={t.modal} />;
      }
      return null;
    }
    
    const defaultContent = (
      <div className="p-4">
        <p>{t.modal.no_components_description}</p>
        <p><b>{t.modal.reference_label}</b> {selectedCase.reference}</p>
      </div>
    );

    switch (selectedCase.id) {
        case 'TEST001':
            return <DevDebugPage t={t.devDebugPage} onOpenProceESModal={handleOpenDownloadsHelpModal} onOpenBotonesModal={handleOpenBotonesModal} />;
        case 'EXO006': {
            const t_table = t.n1TccUnitariaTable;
            return (
                <ZirconiaBridgeSubTable 
                    data={allTableData.n1TccUnitaria.draft}
                    onDataChange={createDataChangeHandler('n1TccUnitaria')}
                    title={t_table.title}
                    t={t_table}
                    platformHeaders={['NP', 'RP']}
                    storeCountry={storeCountry}
                    footerText={t_table.footer}
                    imageUrl={selectedCase.imageUrls?.[0]}
                    isTableEditMode={isTableEditMode}
                />
            );
        }
        case 'EXO013': {
            const t_n1base = t.n1BaseUniversalTable;
            const headers = ['NP', 'RP'];
            return (
                <>
                    <ZirconiaBridgeSubTable 
                        data={allTableData.n1BaseUnitaria.draft}
                        onDataChange={createDataChangeHandler('n1BaseUnitaria')}
                        title={t_n1base.unitariaTitle}
                        t={t_n1base}
                        platformHeaders={headers}
                        storeCountry={storeCountry}
                        imageUrl="https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/301006_26b3.png"
                        isTableEditMode={isTableEditMode}
                    />
                    <ZirconiaBridgeSubTable 
                        data={allTableData.n1BasePuente.draft}
                        onDataChange={createDataChangeHandler('n1BasePuente')}
                        title={t_n1base.puenteTitle}
                        t={t_n1base}
                        platformHeaders={headers}
                        storeCountry={storeCountry}
                        imageUrl="https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/301010_48b1.png"
                        isTableEditMode={isTableEditMode}
                    />
                </>
            );
        }
        case 'EXO014': {
            const t_procera_titanium = t.proceraTitaniumPillarTable;
            const t_fcz = t.proceraFCZImplantCrownTable;
            const t_n1tcc = t.n1TccUnitariaTable;
            const t_n1base = t.n1BaseUniversalTable;
            const t_on1 = t.pilarUniversalOn1Table;

            switch(selectedModalConnection) {
              case 'CC':
                return <ZirconiaBridgeSubTable 
                  data={allTableData.proceraTitaniumCC.draft}
                  onDataChange={createDataChangeHandler('proceraTitaniumCC')}
                  title={t_procera_titanium.ccTitle}
                  t={t_fcz}
                  platformHeaders={['3.0', 'NP', 'RP', 'WP']}
                  storeCountry={storeCountry}
                  isTableEditMode={isTableEditMode}
                />;
              case 'Branemark':
                return <ZirconiaBridgeSubTable 
                  data={allTableData.proceraTitaniumBranemark.draft}
                  onDataChange={createDataChangeHandler('proceraTitaniumBranemark')}
                  title={t_procera_titanium.branemarkTitle}
                  t={t_fcz}
                  platformHeaders={['NP', 'RP', 'WP']}
                  storeCountry={storeCountry}
                  isTableEditMode={isTableEditMode}
                />;
              case 'Tri-channel':
                return <ZirconiaBridgeSubTable 
                  data={allTableData.proceraTitaniumTriChannel.draft}
                  onDataChange={createDataChangeHandler('proceraTitaniumTriChannel')}
                  title={t_procera_titanium.triChannelTitle}
                  t={t_fcz}
                  platformHeaders={['NP', 'RP', 'WP', '6.0']}
                  storeCountry={storeCountry}
                  isTableEditMode={isTableEditMode}
                />;
              case 'N1 TCC':
                return <ZirconiaBridgeSubTable 
                  data={allTableData.n1TccUnitaria.draft}
                  onDataChange={createDataChangeHandler('n1TccUnitaria')}
                  title={t_n1tcc.title}
                  t={t_n1tcc}
                  platformHeaders={['NP', 'RP']}
                  storeCountry={storeCountry}
                  footerText={t_n1tcc.footer}
                  isTableEditMode={isTableEditMode}
                />;
              case 'N1 Base':
                return <ZirconiaBridgeSubTable 
                  data={allTableData.n1BaseUnitaria.draft}
                  onDataChange={createDataChangeHandler('n1BaseUnitaria')}
                  title={t_n1base.unitariaTitle}
                  t={t_n1base}
                  platformHeaders={['NP', 'RP']}
                  storeCountry={storeCountry}
                  isTableEditMode={isTableEditMode}
                />;
              case 'On1':
                return <ZirconiaBridgeSubTable 
                  data={allTableData.on1NoRotatorio.draft}
                  onDataChange={createDataChangeHandler('on1NoRotatorio')}
                  title={t_on1.noRotatorioTitle}
                  t={t_on1}
                  platformHeaders={['NP', 'RP', 'WP']}
                  storeCountry={storeCountry}
                  footerText={t_on1.footer}
                  isTableEditMode={isTableEditMode}
                />;
              default:
                return defaultContent;
            }
        }
        case 'EXO019': {
            const t_on1 = t.pilarUniversalOn1Table;
            const headers = ['NP', 'RP', 'WP'];
            return (
                <>
                    <ZirconiaBridgeSubTable 
                        data={allTableData.on1NoRotatorio.draft}
                        onDataChange={createDataChangeHandler('on1NoRotatorio')}
                        title={t_on1.noRotatorioTitle}
                        t={t_on1}
                        platformHeaders={headers}
                        storeCountry={storeCountry}
                        footerText={t_on1.footer}
                        imageUrl="https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/8/38709_1_ab1b.png"
                        isTableEditMode={isTableEditMode}
                    />
                    <ZirconiaBridgeSubTable 
                        data={allTableData.on1Rotatorio.draft}
                        onDataChange={createDataChangeHandler('on1Rotatorio')}
                        title={t_on1.rotatorioTitle}
                        t={t_on1}
                        platformHeaders={headers}
                        storeCountry={storeCountry}
                        footerText={t_on1.footer}
                        imageUrl="https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/300363_03c6.png"
                        isTableEditMode={isTableEditMode}
                    />
                </>
            );
        }
        case 'EXO016': {
            return (
              <>
                {selectedModalConnection === 'N1 TCC' ? (
                  <PreMilledBlanksN1TCCTable 
                    t={t.preMilledBlanksN1TCCTable} 
                    storeCountry={storeCountry} 
                    imageUrl={"https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/301512_0558.png"} 
                    isTableEditMode={isTableEditMode}
                    data={allTableData.preMilledBlanksN1TCC.draft}
                    onDataChange={createDataChangeHandler('preMilledBlanksN1TCC')}
                  />
                ) : (
                  <PreMilledBlanksPage 
                    t={t.preMilledBlanksTable} 
                    storeCountry={storeCountry} 
                    connectionType={selectedModalConnection} 
                    isTableEditMode={isTableEditMode}
                    data={allTableData.preMilledBlanks.draft}
                    onDataChange={createDataChangeHandler('preMilledBlanks')}
                  />
                )}
              </>
            );
        }
        case 'EXO020': {
            const t_table = t.nobelPearlTable;
            return (
                <ZirconiaBridgeSubTable 
                    data={allTableData.nobelPearl.draft}
                    onDataChange={createDataChangeHandler('nobelPearl')}
                    title={t_table.title}
                    t={t_table}
                    platformHeaders={['NP', 'RP', 'WP']}
                    storeCountry={storeCountry}
                    footerText={t_table.footer}
                    imageUrl={selectedCase.imageUrls?.[0]}
                    isTableEditMode={isTableEditMode}
                />
            );
        }
        case 'EXO029': {
            let data: any[], tableTitle: string, headers: string[], footer: string | undefined, t_table: any, onDataChange: (d: any[]) => void, dataKey: keyof typeof allTableData;
            const t_procera_titanium = t.proceraTitaniumPillarTable;
            const t_fcz = t.proceraFCZImplantCrownTable;
        
            switch (selectedModalConnection) {
                case 'CC':
                    dataKey = 'proceraTitaniumBridgeCC'; break;
                case 'Branemark':
                    dataKey = 'proceraTitaniumBridgeBranemark'; break;
                case 'Tri-channel':
                    dataKey = 'proceraTitaniumBridgeTriChannel'; break;
                case 'Multi-Unit':
                    dataKey = 'multiUnitConnection'; break;
                default:
                    return <p>{t.modal.no_components_description}</p>;
            }
            data = allTableData[dataKey].draft;
            onDataChange = createDataChangeHandler(dataKey);

            if (selectedModalConnection === 'Tri-channel') {
              // FIX: Cast `data` to `any` to resolve complex TypeScript union/intersection type error.
              return <ZirconiaBridgeSubTable data={data as any} onDataChange={onDataChange} title={t_procera_titanium.triChannelTitle} t={t.triChannelTestTable} platformHeaders={['NP', 'RP', 'WP', '6.0']} storeCountry={storeCountry} isTableEditMode={isTableEditMode} />;
            }
        
            switch (selectedModalConnection) {
                case 'CC':
                    tableTitle = t_procera_titanium.ccTitle; headers = ['NP', 'RP', 'WP']; t_table = t_fcz; break;
                case 'Branemark':
                    tableTitle = t_procera_titanium.branemarkTitle; headers = ['NP', 'RP', 'WP']; t_table = t_fcz; break;
                case 'Multi-Unit':
                    tableTitle = t.universalMultiUnitTable.connectionTitle; headers = ['NP / RP¹', 'WP²']; footer = t.universalMultiUnitTable.footerRecto; t_table = t.universalBaseRotatingTable; break;
                default: return null;
            }
        
            return (
              // FIX: Cast `data` to `any` to resolve complex TypeScript union/intersection type error.
              <ZirconiaBridgeSubTable 
                  data={data as any}
                  onDataChange={onDataChange}
                  title={tableTitle}
                  t={t_table}
                  platformHeaders={headers}
                  storeCountry={storeCountry}
                  footerText={footer}
                  isTableEditMode={isTableEditMode}
              />
            );
        }
        case 'EXO024':
        case 'EXO025': {
            let data: any[], tableTitle: string, headers: string[], footer: string | undefined, onDataChange: (d: any[]) => void, dataKey: keyof typeof allTableData;
            
            switch (selectedModalConnection) {
                case 'CC':
                    dataKey = 'zirconiaBridgeCC'; tableTitle = t.zirconiaBridgeCCTable.title; headers = ['NP', 'RP', 'WP']; break;
                case 'Branemark':
                    dataKey = 'zirconiaBridgeBranemark'; tableTitle = t.zirconiaBridgeBranemarkTable.title; headers = ['NP', 'RP', 'WP']; break;
                case 'Tri-channel':
                    dataKey = 'zirconiaBridgeTriChannel'; tableTitle = t.zirconiaBridgeTriChannelTable.title; headers = ['NP', 'RP', 'WP', '6.0']; break;
                case 'Multi-Unit':
                    dataKey = 'multiUnitConnection'; tableTitle = t.universalMultiUnitTable.connectionTitle; headers = ['NP / RP¹', 'WP²']; footer = t.universalMultiUnitTable.footerRecto; break;
                default: return <p>{t.modal.no_components_description}</p>;
            }
            data = allTableData[dataKey].draft;
            onDataChange = createDataChangeHandler(dataKey);
            
            return (
              <ZirconiaBridgeSubTable 
                  data={data}
                  onDataChange={onDataChange}
                  title={tableTitle}
                  t={selectedModalConnection === 'Multi-Unit' ? t.universalBaseRotatingTable : t.proceraFCZImplantCrownTable}
                  platformHeaders={headers}
                  storeCountry={storeCountry}
                  footerText={footer}
                  isTableEditMode={isTableEditMode}
              />
            );
        }
        case 'EXO021': {
            let data: any[], tableTitle: string, headers: string[], onDataChange: (d: any[]) => void, dataKey: keyof typeof allTableData;
            const t_table = t.universalBaseTable;

            switch(selectedModalConnection) {
              case 'CC':
                dataKey = 'universalBaseNonRotatingCC'; tableTitle = t.universalBaseTable.cc; headers = ['NP', 'RP', 'WP']; break;
              case 'Branemark':
                dataKey = 'universalBaseNonRotatingBranemark'; tableTitle = t.universalBaseTable.externalHex; headers = ['NP', 'RP', 'WP']; break;
              case 'Tri-channel':
                dataKey = 'universalBaseNonRotatingTriChannel'; tableTitle = t.universalBaseTable.triChannel; headers = ['NP', 'RP', 'WP']; break;
              default: return <p>{t.modal.no_components_description}</p>;
            }
            data = allTableData[dataKey].draft;
            onDataChange = createDataChangeHandler(dataKey);

            return (
              <ZirconiaBridgeSubTable 
                  data={data}
                  onDataChange={onDataChange}
                  title={tableTitle}
                  t={t_table}
                  platformHeaders={headers}
                  storeCountry={storeCountry}
                  footerText={t.universalBaseTable.footer}
                  isTableEditMode={isTableEditMode}
              />
            );
        }
        case 'EXO022': {
            const rectoImg = "https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/301363_universal_base_non_engaging_s_cc_rp_2887.png";
            const conicoImg = selectedCase.imageUrls[2];

            return (
              <>
                {selectedModalConnection === 'CC' && (
                    <>
                        <ZirconiaBridgeSubTable 
                            data={allTableData.universalBaseRotatingCC.draft}
                            onDataChange={createDataChangeHandler('universalBaseRotatingCC')}
                            title={t.universalBaseRotatingCCTable.title}
                            t={t.universalBaseRotatingTable}
                            platformHeaders={['NP', 'RP', 'WP']}
                            storeCountry={storeCountry}
                            footerText={t.universalBaseRotatingTable.footer}
                            imageUrl={rectoImg}
                            isTableEditMode={isTableEditMode}
                        />
                        <ZirconiaBridgeSubTable 
                            data={allTableData.universalBaseRotatingConicoCC.draft}
                            onDataChange={createDataChangeHandler('universalBaseRotatingConicoCC')}
                            title={t.universalBaseRotatingConicoCCTable.title}
                            t={t.universalBaseRotatingTable}
                            platformHeaders={['NP', 'RP', 'WP']}
                            storeCountry={storeCountry}
                            footerText={t.universalBaseRotatingTable.footer}
                            imageUrl={conicoImg}
                            isTableEditMode={isTableEditMode}
                        />
                    </>
                )}

                {selectedModalConnection === 'Branemark' && (
                    <>
                        <ZirconiaBridgeSubTable 
                            data={allTableData.universalBaseRotatingBranemark.draft}
                            onDataChange={createDataChangeHandler('universalBaseRotatingBranemark')}
                            title={t.universalBaseRotatingBranemarkTable.title}
                            t={t.universalBaseRotatingTable}
                            platformHeaders={['NP', 'RP', 'WP']}
                            storeCountry={storeCountry}
                            footerText={t.universalBaseRotatingTable.footer}
                            imageUrl={rectoImg}
                            isTableEditMode={isTableEditMode}
                        />
                        <ZirconiaBridgeSubTable 
                            data={allTableData.universalBaseRotatingConicoBranemark.draft}
                            onDataChange={createDataChangeHandler('universalBaseRotatingConicoBranemark')}
                            title={t.universalBaseRotatingConicoBranemarkTable.title}
                            t={t.universalBaseRotatingTable}
                            platformHeaders={['NP', 'RP', 'WP']}
                            storeCountry={storeCountry}
                            footerText={t.universalBaseRotatingTable.footer}
                            imageUrl={conicoImg}
                            isTableEditMode={isTableEditMode}
                        />
                    </>
                )}

                {selectedModalConnection === 'Tri-channel' && (
                    <>
                        <ZirconiaBridgeSubTable 
                            data={allTableData.universalBaseRotatingTriChannel.draft}
                            onDataChange={createDataChangeHandler('universalBaseRotatingTriChannel')}
                            title={t.universalBaseRotatingTriChannelTable.title}
                            t={t.universalBaseRotatingTable}
                            platformHeaders={['NP', 'RP', 'WP']}
                            storeCountry={storeCountry}
                            footerText={t.universalBaseRotatingTable.footer}
                            imageUrl={rectoImg}
                            isTableEditMode={isTableEditMode}
                        />
                        <ZirconiaBridgeSubTable 
                            data={allTableData.universalBaseRotatingConicoTriChannel.draft}
                            onDataChange={createDataChangeHandler('universalBaseRotatingConicoTriChannel')}
                            title={t.universalBaseRotatingConicoTriChannelTable.title}
                            t={t.universalBaseRotatingTable}
                            platformHeaders={['NP', 'RP', 'WP']}
                            storeCountry={storeCountry}
                            footerText="*5 Pkg"
                            imageUrl={conicoImg}
                            isTableEditMode={isTableEditMode}
                        />
                    </>
                )}
                
                {selectedModalConnection === 'Multi-Unit' && (
                    <>
                        <ZirconiaBridgeSubTable 
                            data={allTableData.universalMultiUnitRecto.draft}
                            onDataChange={createDataChangeHandler('universalMultiUnitRecto')}
                            title={t.universalMultiUnitTable.rectoTitle}
                            t={t.universalBaseRotatingTable}
                            platformHeaders={['NP / RP¹', 'WP²']}
                            storeCountry={storeCountry}
                            footerText={t.universalMultiUnitTable.footerRecto}
                            imageUrl={rectoImg}
                            isTableEditMode={isTableEditMode}
                        />
                        <ZirconiaBridgeSubTable 
                            data={allTableData.universalMultiUnitConico.draft}
                            onDataChange={createDataChangeHandler('universalMultiUnitConico')}
                            title={t.universalMultiUnitTable.conicoTitle}
                            t={t.universalBaseRotatingTable}
                            platformHeaders={['NP / RP¹', 'WP²']}
                            storeCountry={storeCountry}
                            footerText={t.universalMultiUnitTable.footerRecto}
                            imageUrl={conicoImg}
                            isTableEditMode={isTableEditMode}
                        />
                    </>
                )}
              </>
            );
        }
        case 'EXO027': {
            const t_procera_titanium = t.proceraTitaniumPillarTable;
            const t_fcz = t.proceraFCZImplantCrownTable;
            
            return (
              <>
                {selectedModalConnection === 'CC' && (
                  <ZirconiaBridgeSubTable 
                      data={allTableData.proceraTitaniumCC.draft}
                      onDataChange={createDataChangeHandler('proceraTitaniumCC')}
                      title={t_procera_titanium.ccTitle}
                      t={t_fcz}
                      platformHeaders={['3.0', 'NP', 'RP', 'WP']}
                      storeCountry={storeCountry}
                      isTableEditMode={isTableEditMode}
                  />
                )}
                {selectedModalConnection === 'Branemark' && (
                  <ZirconiaBridgeSubTable 
                      data={allTableData.proceraTitaniumBranemark.draft}
                      onDataChange={createDataChangeHandler('proceraTitaniumBranemark')}
                      title={t_procera_titanium.branemarkTitle}
                      t={t_fcz}
                      platformHeaders={['NP', 'RP', 'WP']}
                      storeCountry={storeCountry}
                      isTableEditMode={isTableEditMode}
                  />
                )}
                {selectedModalConnection === 'Tri-channel' && (
                  <ZirconiaBridgeSubTable 
                      data={allTableData.proceraTitaniumTriChannel.draft}
                      onDataChange={createDataChangeHandler('proceraTitaniumTriChannel')}
                      title={t_procera_titanium.triChannelTitle}
                      t={t_fcz}
                      platformHeaders={['NP', 'RP', 'WP', '6.0']}
                      storeCountry={storeCountry}
                      isTableEditMode={isTableEditMode}
                  />
                )}
              </>
            );
        }
        case 'EXO028': {
            const t_asc = t.proceraTitaniumAscPillarTable;
            const t_fcz = t.proceraFCZImplantCrownTable;
            
            return (
              <>
                {selectedModalConnection === 'CC' && (
                  <ZirconiaBridgeSubTable 
                      data={allTableData.proceraTitaniumAscCC.draft}
                      onDataChange={createDataChangeHandler('proceraTitaniumAscCC')}
                      title={t_asc.ccTitle}
                      t={t_fcz}
                      platformHeaders={['NP', 'RP', 'WP']}
                      storeCountry={storeCountry}
                      footerText={t_asc.ccFooter}
                      isTableEditMode={isTableEditMode}
                  />
                )}

                {selectedModalConnection === 'Tri-channel' && (
                  <ZirconiaBridgeSubTable 
                      data={allTableData.proceraTitaniumAscTriChannel.draft}
                      onDataChange={createDataChangeHandler('proceraTitaniumAscTriChannel')}
                      title={t_asc.triChannelTitle}
                      t={t_fcz}
                      platformHeaders={['NP', 'RP', 'WP', '6.0']}
                      storeCountry={storeCountry}
                      footerText={t_asc.triChannelFooter}
                      isTableEditMode={isTableEditMode}
                  />
                )}
              </>
            );
        }
        case 'EXO030': {
            const t_zirconia_pillar_titles = t.proceraZirconiaPillarTable;
            const t_fcz = t.proceraFCZImplantCrownTable;
            
            return (
              <>
                {selectedModalConnection === 'CC' && (
                  <ZirconiaBridgeSubTable 
                      data={allTableData.proceraZirconiaCC.draft}
                      onDataChange={createDataChangeHandler('proceraZirconiaCC')}
                      title={t_zirconia_pillar_titles.ccTitle}
                      t={t_fcz}
                      platformHeaders={['NP', 'RP', 'WP']}
                      storeCountry={storeCountry}
                      isTableEditMode={isTableEditMode}
                  />
                )}
                {selectedModalConnection === 'Branemark' && (
                  <ZirconiaBridgeSubTable 
                      data={allTableData.proceraZirconiaBranemark.draft}
                      onDataChange={createDataChangeHandler('proceraZirconiaBranemark')}
                      title={t_zirconia_pillar_titles.branemarkTitle}
                      t={t_fcz}
                      platformHeaders={['NP', 'RP', 'WP']}
                      storeCountry={storeCountry}
                      isTableEditMode={isTableEditMode}
                  />
                )}
                {selectedModalConnection === 'Tri-channel' && (
                  <ZirconiaBridgeSubTable 
                      data={allTableData.proceraZirconiaTriChannel.draft}
                      onDataChange={createDataChangeHandler('proceraZirconiaTriChannel')}
                      title={t_zirconia_pillar_titles.triChannelTitle}
                      t={t_fcz}
                      platformHeaders={['NP', 'RP', 'WP', '6.0']}
                      storeCountry={storeCountry}
                      footerText={t_zirconia_pillar_titles.triChannelFooter}
                      isTableEditMode={isTableEditMode}
                  />
                )}
              </>
            );
        }
        case 'EXO026': {
            const t_table = t.proceraFCZImplantCrownTable;
            return (
                <ZirconiaBridgeSubTable 
                    data={allTableData.proceraFCZ.draft}
                    onDataChange={createDataChangeHandler('proceraFCZ')}
                    title={t_table.title}
                    t={t_table}
                    platformHeaders={['NP', 'RP', 'WP']}
                    storeCountry={storeCountry}
                    isTableEditMode={isTableEditMode}
                />
            );
        }
        case 'EXO032': {
            let data: any[], tableTitle: string, headers: string[], footer: string | undefined, onDataChange: (d: any[]) => void, dataKey: keyof typeof allTableData;
            const t_nobelprocera_bar = t.nobelProceraTitaniumBarTable;

            switch (selectedModalConnection) {
                case 'CC': dataKey = 'nobelProceraBarCC'; tableTitle = t_nobelprocera_bar.ccTitle; headers = ['NP', 'RP', 'WP']; break;
                case 'Branemark': dataKey = 'nobelProceraBarBranemark'; tableTitle = t_nobelprocera_bar.branemarkTitle; headers = ['NP', 'RP', 'WP']; break;
                case 'Tri-channel': dataKey = 'nobelProceraBarTriChannel'; tableTitle = t_nobelprocera_bar.triChannelTitle; headers = ['NP', 'RP', 'WP', '6.0']; break;
                default: return <div className="p-4 text-center text-slate-500">{t.modal.no_components_description}</div>;
            }
            data = allTableData[dataKey].draft;
            onDataChange = createDataChangeHandler(dataKey);

            return (
              <ZirconiaBridgeSubTable 
                  data={data}
                  onDataChange={onDataChange}
                  title={tableTitle}
                  t={t_nobelprocera_bar}
                  platformHeaders={headers}
                  storeCountry={storeCountry}
                  footerText={footer}
                  isTableEditMode={isTableEditMode}
              />
            );
        }
        case 'EXO034': {
            const t_mua = t.multiUnitAbutmentsTable;
            
            switch(selectedModalConnection) {
              case 'CC':
                return <>
                  <MuaTable 
                    data={allTableData.muaXealCCRecto.draft} onDataChange={createDataChangeHandler('muaXealCCRecto')}
                    title={t_mua.ccRectoTitle} headers={['1.5', '2.5', '3.5', '4.5']} platformHeader={t_mua.platformHeader}
                    platformLabels={{np: 'NP', rp: 'RP', wp: 'WP'}} storeCountry={storeCountry}
                    imageUrl="https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/300174_1_e3b2.png"
                    isTableEditMode={isTableEditMode}
                  />
                  <MuaTable 
                    data={allTableData.muaXealCCAngulado.draft} onDataChange={createDataChangeHandler('muaXealCCAngulado')}
                    title={t_mua.ccAnguladoTitle} headers={['2.5', '3.5', '4.5']} platformHeader={t_mua.platformHeader}
                    platformLabels={{np_17: 'NP', np_30: 'NP', rp_17: 'RP', rp_30: 'RP', wp_17: 'WP'}} isAngled={true} storeCountry={storeCountry}
                    imageUrl="https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/300181_1_7830.png"
                    isTableEditMode={isTableEditMode}
                  />
                </>;
              case 'N1 TCC':
                return <>
                  <MuaTable 
                    data={allTableData.muaXealN1TccRecto.draft} onDataChange={createDataChangeHandler('muaXealN1TccRecto')}
                    title={t_mua.n1TccRectoTitle} headers={['1.5', '2.5', '3.5', '4.5']} platformHeader={t_mua.platformHeader}
                    platformLabels={{np: 'NP', rp: 'RP'}} storeCountry={storeCountry}
                    imageUrl="https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/301045_bc45.png"
                    isTableEditMode={isTableEditMode}
                  />
                  <MuaTable 
                    data={allTableData.muaXealN1TccAngulado.draft} onDataChange={createDataChangeHandler('muaXealN1TccAngulado')}
                    title={t_mua.n1TccAnguladoTitle} headers={['2.5', '3.5', '4.5']} platformHeader={t_mua.platformHeader}
                    platformLabels={{np_17: 'NP', np_30: 'NP', rp_17: 'RP', rp_30: 'RP'}} isAngled={true} storeCountry={storeCountry}
                    imageUrl="https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/301045_bc45.png"
                    isTableEditMode={isTableEditMode}
                  />
                </>;
              case 'Branemark':
                 return <>
                  <MuaTable 
                    data={allTableData.muaBranemarkRecto.draft} onDataChange={createDataChangeHandler('muaBranemarkRecto')}
                    title={t_mua.branemarkRectoTitle} headers={['1', '2', '3', '4', '5']} platformHeader={t_mua.platformHeader}
                    platformLabels={{np: 'NP', rp: 'RP', wp: 'WP'}} storeCountry={storeCountry}
                    imageUrl="https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/2/9/29177_00_4cdd.png"
                    isTableEditMode={isTableEditMode}
                  />
                  <MuaTable 
                    data={allTableData.muaBranemarkAngulado.draft} onDataChange={createDataChangeHandler('muaBranemarkAngulado')}
                    title={t_mua.branemarkAnguladoTitle} headers={['2', '3', '4', '5']} platformHeader={t_mua.platformHeader}
                    platformLabels={{np_17: 'NP', rp_17: 'RP', wp_30: 'WP'}} isAngled={true} storeCountry={storeCountry}
                    imageUrl="https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/2/9/29187_00_6640.png"
                    isTableEditMode={isTableEditMode}
                  />
                </>;
              case 'Tri-channel':
                return <>
                  <MuaTable 
                    data={allTableData.muaTriChannelRecto.draft} onDataChange={createDataChangeHandler('muaTriChannelRecto')}
                    title={t_mua.triChannelRectoTitle} headers={['1', '2', '3', '4', '5']} platformHeader={t_mua.platformHeader}
                    platformLabels={{np: 'NP', rp: 'RP', wp: 'WP'}} storeCountry={storeCountry}
                    imageUrl="https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/2/9/29197_00_df94.png"
                    isTableEditMode={isTableEditMode}
                  />
                  <MuaTable 
                    data={allTableData.muaTriChannelAngulado.draft} onDataChange={createDataChangeHandler('muaTriChannelAngulado')}
                    title={t_mua.triChannelAnguladoTitle} headers={['2', '3', '4', '5']} platformHeader={t_mua.platformHeader}
                    platformLabels={{np_17: 'NP', rp_17: 'RP', wp_30: 'WP'}} isAngled={true} storeCountry={storeCountry}
                    imageUrl="https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/2/9/29235_00_2275.png"
                    isTableEditMode={isTableEditMode}
                  />
                </>;
              default:
                return defaultContent;
            }
        }
        default: {
            return defaultContent;
        }
    }
  };

  const isProceraCase = selectedCase?.status === CaseStatus.Procera;
  const downloadLibsTranslations = (isProceraCase && t.preMilledBlanksTable.download_libraries_title_procera)
      ? { ...t.preMilledBlanksTable, download_libraries_title: t.preMilledBlanksTable.download_libraries_title_procera }
      : t.preMilledBlanksTable;


  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col">
      <Header 
        title={t.header.title} 
        language={language} 
        onLanguageChange={setLanguage} 
        onSupportClick={handleSupportClick} 
        onCustomerServiceClick={handleCustomerServiceClick}
        onDownloadCenterClick={handleOpenDownloadCenter}
        t={t.header}
        storeCountry={storeCountry}
        onGlobeClick={handleReopenIntroModal}
      />
      <main className="p-4 sm:p-6 lg:p-8 flex-grow">
        <div className="flex gap-6 items-start">
          <aside className={`sticky top-24 transition-all duration-300 ease-in-out ${isFilterBarCollapsed ? 'w-20' : 'w-80'}`}>
            <FilterBar 
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              isAnyFilterActive={isAnyFilterActive}
              t={t.filterBar}
              isCollapsed={isFilterBarCollapsed}
              onToggle={() => setIsFilterBarCollapsed(!isFilterBarCollapsed)}
            />
          </aside>
          
          <div className="flex-1">
            <div className="sticky top-16 z-10 bg-[var(--bg-primary)] pt-2 pb-8">
              <div className="relative">
                <input
                    type="text"
                    value={filters.searchText}
                    onChange={(e) => handleFilterChange('searchText', e.target.value)}
                    placeholder={t.filterBar.search_placeholder}
                    className="w-full h-12 pl-12 pr-4 text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)]"
                />
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              </div>
              {isAnyFilterActive && (
                <div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 bg-slate-800 text-white py-3 px-6 rounded-full shadow-lg text-base flex items-center justify-center gap-3 animate-simple-fade-in"
                  role="status"
                >
                  <FilterIcon className="h-5 w-5" />
                  <p>
                    <span className="font-semibold">{t.tooltip.filters_active_label}</span>
                    <button
                        onClick={handleResetFilters}
                        className="underline hover:text-slate-300 transition-colors text-sm font-normal ml-2 focus:outline-none focus:ring-1 focus:ring-slate-400 rounded-sm"
                        aria-label={t.filterBar.reset_button}
                    >
                        {t.tooltip.remove_filters_link}
                    </button>
                  </p>
                </div>
              )}
            </div>
            
            <CaseGrid 
              cases={filteredCases} 
              onReferenceClick={handleReferenceClick}
              onHelp001Click={handleOpenDownloadsHelpModal}
              onTablesClick={handleOpenTablesModal}
              onTableTestClick={handleTableTestClick}
              onExosClick={handleExosClick}
              t={t.caseCard}
              tNotes={t.notes}
              language={language}
              isAnyFilterActive={isAnyFilterActive}
            />
          </div>
        </div>
      </main>
      <Footer t={footerT} storeCountry={storeCountry} onSupportClick={handleSupportClick} />
      {showEditModeNotification && (
        <div className="fixed top-24 right-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg animate-simple-fade-in z-50">
          Modo Edición de Tabla: {isTableEditMode ? 'ACTIVADO' : 'DESACTIVADO'}
        </div>
      )}
       {showSaveNotification && (
        <div className="fixed top-24 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-simple-fade-in z-50 flex items-center gap-2">
          <CheckIcon className="h-5 w-5"/>
          Cambios guardados
        </div>
      )}
      <button
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-6 right-6 bg-[color:var(--accent-primary)] text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-[color:var(--accent-primary-hover)] transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary)]"
        aria-label="Open virtual assistant"
      >
        <ChatbotIcon className="h-8 w-8" />
      </button>

      <Chatbot
        id="chatbot-main"
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        messages={chatMessages}
        onSendMessage={handleSendMessage}
        isLoading={isChatbotLoading}
        t={t.chatbot}
        onNavigate={handleChatbotNavigation}
      />
      <Modal 
        id="modal-references"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsTableEditMode(false);
        }}
        title={modalTitle}
        closeAriaLabel={t.modal.close_aria_label}
        backButtonLabel={t.modal.back_button}
        caseData={selectedCase ?? undefined}
        t={t}
        isTableEditMode={isTableEditMode}
        onSaveChanges={handleSaveChanges}
      >
        {selectedCase && casesWithDownloads.has(selectedCase.id) && (
          <div className="mb-6">
            <ResourceButtons t={t.modal} caseData={selectedCase} onOpenDownloadsModal={handleOpenDownloadsHelpModal} storeCountry={storeCountry} />
          </div>
        )}

        {selectedCase && (
          <div className="mb-6 border border-slate-200 rounded-lg">
            <button
              onClick={() => setIsIconDetailsVisible(prev => !prev)}
              className="w-full flex justify-between items-center p-3 text-left font-semibold text-slate-800 bg-[color:var(--card-bg-yellow)] hover:brightness-95 transition-all duration-200 rounded-t-lg border-b border-slate-200"
              aria-expanded={isIconDetailsVisible}
              aria-controls="icon-details-panel"
            >
              <span className="text-[color:var(--text-primary)]">{t.modal.iconography_details_title}</span>
              {isIconDetailsVisible ? <ChevronUpIcon className="h-5 w-5 text-slate-500" /> : <ChevronDownIcon className="h-5 w-5 text-slate-500" />}
            </button>
            <div
              id="icon-details-panel"
              className={`transition-all duration-300 ease-in-out overflow-hidden bg-white rounded-b-lg ${isIconDetailsVisible ? 'max-h-[500px] opacity-100 p-4' : 'max-h-0 opacity-0'}`}
            >
              <CaseDetailIcons caseData={selectedCase} isModal={true} t={t.caseCard} connectionTypeForTable={selectedModalConnection}/>
            </div>
          </div>
        )}

        {modalConnections.length > 0 && (
          <ConnectionSelector
            connections={modalConnections}
            selectedConnection={selectedModalConnection!}
            onConnectionChange={setSelectedModalConnection}
            t={t.modal}
          />
        )}
        
        {renderModalContent()}
      </Modal>
      <Modal 
        id="modal-help-espt"
        isOpen={isHelp001ModalOpen}
        onClose={() => {
          setIsHelp001ModalOpen(false);
          setIsTableEditMode(false);
        }}
        title={t.modal.descargas_procera_modal_title}
        closeAriaLabel={t.modal.close_aria_label}
        backButtonLabel={t.modal.back_button}
      >
        <DescargasProceraModalContent t={t.modal} onClose={() => setIsHelp001ModalOpen(false)} language={language} onOpenSelecProLocal={handleOpenSelecProLocalFromDownloads} />
      </Modal>
      <Modal 
        id="modal-help-frsv"
        isOpen={isHelpOtherModalOpen}
        onClose={() => {
          setIsHelpOtherModalOpen(false);
          setIsTableEditMode(false);
        }}
        title={t.modal.descargas_procera_modal_title}
        closeAriaLabel={t.modal.close_aria_label}
        backButtonLabel={t.modal.back_button}
      >
        <DescargasOtherProcera t={t.modal} onClose={() => setIsHelpOtherModalOpen(false)} language={language} onOpenSelecProLocal={handleOpenSelecProLocalFromDownloads} />
      </Modal>
      <Modal 
        id="modal-workflow-selector"
        isOpen={isSelecProLocalModalOpen}
        onClose={() => {
          setIsSelecProLocalModalOpen(false);
          setIsTableEditMode(false);
        }}
        title={t.modal.selec_pro_local_title}
        closeAriaLabel={t.modal.close_aria_label}
        backButtonLabel={t.modal.back_button}
      >
        <SelecProLocal t={t.modal} onClose={() => setIsSelecProLocalModalOpen(false)} language={language} />
      </Modal>
      <Modal 
        id="modal-ui-tables"
        isOpen={isTablesModalOpen}
        onClose={() => {
          setIsTablesModalOpen(false);
          setIsTableEditMode(false);
        }}
        title={t.modal.tables_modal_title}
        closeAriaLabel={t.modal.close_aria_label}
        backButtonLabel={t.modal.back_button}
      >
        <TablesModalContent t={t} />
      </Modal>
      <Modal
        id="modal-test-table"
        isOpen={isTableTestModalOpen}
        onClose={() => {
          setIsTableTestModalOpen(false);
          setIsTableEditMode(false);
        }}
        title="Tabla de Test"
        closeAriaLabel="Cerrar modal"
        backButtonLabel="Atrás"
        isTableEditMode={isTableEditMode}
        onSaveChanges={handleSaveChanges}
      >
        <TriChannelTable t={t.triChannelTestTable} storeCountry={storeCountry} isTableEditMode={isTableEditMode} data={allTableData.triChannel.draft} onDataChange={createDataChangeHandler('triChannel')} />
      </Modal>
      <Modal
        id="modal-customer-service"
        isOpen={isCustomerServiceModalOpen}
        onClose={() => {
          setIsCustomerServiceModalOpen(false);
          setIsTableEditMode(false);
        }}
        title={t.modal.customer_service_title}
        closeAriaLabel={t.modal.close_aria_label}
        backButtonLabel={t.modal.back_button}
      >
        <CustomerServiceModal t={t.modal} language={language} />
      </Modal>
      <Modal
        id="modal-button-gallery"
        isOpen={isBotonesModalOpen}
        onClose={() => {
          setIsBotonesModalOpen(false);
          setIsTableEditMode(false);
        }}
        title={t.modal.botones_modal_title}
        closeAriaLabel={t.modal.close_aria_label}
        backButtonLabel={t.modal.back_button}
      >
        <BotonesModalContent />
      </Modal>
      <Modal
        id="modal-download-center"
        isOpen={isDownloadCenterModalOpen}
        onClose={() => {
          setIsDownloadCenterModalOpen(false);
          setIsTableEditMode(false);
        }}
        title={t.modal.download_center_title}
        closeAriaLabel={t.modal.close_aria_label}
        backButtonLabel={t.modal.back_button}
      >
        <DownloadCenterModalContent links={downloadLinks} t={t} onClose={() => setIsDownloadCenterModalOpen(false)} onOpenWorkflowSelector={handleOpenSelecProLocalFromDownloads} storeCountry={storeCountry} />
      </Modal>
      <Modal
        id="modal-exos-analysis"
        isOpen={isExosModalOpen}
        onClose={() => {
          setIsExosModalOpen(false);
          setIsTableEditMode(false);
        }}
        title={t.modal.exos_modal_title}
        closeAriaLabel={t.modal.close_aria_label}
        backButtonLabel={t.modal.back_button}
        isTableEditMode={isTableEditMode}
        onSaveChanges={handleSaveChanges}
      >
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
      <Modal
        id="modal-intro"
        isOpen={isIntroModalOpen}
        onClose={() => {}}
        title=""
        backButtonLabel=""
        isDismissable={false}
        showHeader={false}
        maxWidth="max-w-4xl"
      >
        <IntroModal onConfirm={handleIntroConfirm} t={translations} />
      </Modal>
    </div>
  );
};

export default App;