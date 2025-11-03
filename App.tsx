import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
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
import CustomerServiceModal from './components/CustomerServiceModal';
import TablaTriChannel from './components/TriChannelTable';
import { MOCK_CASES, UNIVERSAL_BASE_NON_ROTATING_DATA, UNIVERSAL_BASE_ROTATING_DATA, PRE_MILLED_BLANKS_DATA, PRE_MILLED_DESCRIPTIONS, UNIVERSAL_BASE_ROTATING_CC_DATA, UNIVERSAL_BASE_ROTATING_BRANEMARK_DATA, UNIVERSAL_BASE_ROTATING_TRICHANNEL_DATA, UNIVERSAL_MULTI_UNIT_RECTO_DATA, UNIVERSAL_MULTI_UNIT_CONICO_DATA, PILAR_UNIVERSAL_ON1_NO_ROTATORIO_DATA, PILAR_UNIVERSAL_ON1_ROTATORIO_DATA, N1_BASE_UNITARIA_NO_ROTATORIO_DATA, N1_BASE_PUENTE_ROTATORIO_DATA, N1_TCC_UNITARIA_NO_ROTATORIA_DATA, ZIRCONIA_BRIDGE_DATA, ZIRCONIA_BRIDGE_CC_DATA, ZIRCONIA_BRIDGE_BRANEMARK_DATA, ZIRCONIA_BRIDGE_TRICHANNEL_DATA, REFERENCE_IMAGE_MAP, PRE_MILLED_BLANKS_N1_TCC_DATA, N1_TCC_CASE_DATA, ELOS_TOOLS_DATA, UNIVERSAL_BASE_NON_ROTATING_CC_DATA, UNIVERSAL_BASE_NON_ROTATING_BRANEMARK_DATA, UNIVERSAL_BASE_NON_ROTATING_TRICHANNEL_DATA, UNIVERSAL_BASE_ROTATING_CONICO_CC_DATA, UNIVERSAL_BASE_ROTATING_CONICO_BRANEMARK_DATA, UNIVERSAL_BASE_ROTATING_CONICO_TRICHANNEL_DATA, MULTI_UNIT_CONNECTION_DATA, PROCERA_FCZ_IMPLANT_CROWN_DATA, PROCERA_TITANIUM_CC_DATA, PROCERA_TITANIUM_BRANEMARK_DATA, PROCERA_TITANIUM_TRICHANNEL_DATA, PROCERA_TITANIUM_ASC_CC_DATA, PROCERA_TITANIUM_ASC_TRICHANNEL_DATA, PROCERA_ZIRCONIA_CC_DATA, PROCERA_ZIRCONIA_BRANEMARK_DATA, PROCERA_ZIRCONIA_TRICHANNEL_DATA, PROCERA_TITANIUM_BRIDGE_CC_DATA, PROCERA_TITANIUM_BRIDGE_BRANEMARK_DATA, PROCERA_TITANIUM_BRIDGE_TRICHANNEL_UPDATED_DATA, NOBELPROCERA_TITANIUM_BAR_CC_DATA, NOBELPROCERA_TITANIUM_BAR_BRANEMARK_DATA, NOBELPROCERA_TITANIUM_BAR_TRICHANNEL_DATA, NOBEL_PEARL_COMPONENTS_DATA, MUA_XEAL_CC_RECTO_DATA, MUA_XEAL_CC_ANGULADO_DATA, MUA_XEAL_N1_TCC_RECTO_DATA, MUA_XEAL_N1_TCC_ANGULADO_DATA, MUA_BRANEMARK_RECTO_DATA, MUA_BRANEMARK_ANGULADO_DATA, MUA_TRICHANNEL_RECTO_DATA, MUA_TRICHANNEL_ANGULADO_DATA, TRI_CHANNEL_TABLE_DATA } from './constants';
import { translations } from './translations';
import { DentalCase, Filters, RestorationType, ConnectionType, CaseStatus, Language, SoftwareType } from './types';
import { DownloadIcon, InfoIcon, MagnifyingGlassIcon, ExternalLinkIcon, FilterIcon, ArrowRightIcon, WhatsAppIcon, CalendarIcon, EmailIcon, PhoneIcon, ClipboardIcon, CheckIcon } from './components/icons';
import CaseDetailIcons from './components/CaseDetailIcons';
import ConnectionSelector from './components/ConnectionSelector';
import BotonesModalContent from './components/BotonesModalContent';
import ExosModalContent from './components/ExosModalContent';
import IntroModal from './components/IntroModal';
import ResourceButtons from './components/ResourceButtons';
import DownloadCenterModalContent from './components/DownloadCenterModalContent';
import AssistantModalContent, { AssistantSelections } from './components/AssistantModalContent';

const getStorePath = (country: Language) => {
    switch (country) {
      case 'fr': return 'fr/fr';
      case 'pt': return 'pt/pt';
      case 'sv': return 'se/se';
      default: return 'es/es';
    }
};

const SupportModal: React.FC<{ t: any }> = ({ t }) => {
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const emailAddress = "soporte.tecnico@nobelbiocare.com";
  const phoneNumber = t.support_modal_phone_number_copy;
  const phoneTel = t.support_modal_phone_tel;
  const newBookingUrl = "https://outlook.office35.com/book/SoporteTcnicoNobelBiocare@dentalco.org/";
  const newQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent(newBookingUrl)}`;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
      {/* Block 1: WhatsApp */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col">
        <div>
          <h4 className="font-bold text-lg text-[color:var(--text-primary)] mb-2 flex items-center gap-2">
            <WhatsAppIcon className="h-6 w-6 text-green-500" /> {t.support_modal_whatsapp_title}
          </h4>
          <p className="text-slate-600 mb-2">{t.support_modal_intro}</p>
        </div>
        <div className="mt-auto">
          <div className="flex justify-center my-4">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=https://wa.me/16573635454" alt="WhatsApp QR Code" className="w-32 h-32" />
          </div>
          <p className="text-slate-500 text-center text-xs">{t.support_modal_manual} <br /> <b>{t.support_modal_contact_name}</b> <br /> <b>+1 (657) 363-5454</b> ({t.support_modal_whatsapp_only})</p>
        </div>
      </div>

      {/* Block 2: Calendar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col">
        <div>
          <h4 className="font-bold text-lg text-[color:var(--text-primary)] mb-2 flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-blue-500" /> {t.support_modal_book_title}
          </h4>
          <p className="text-slate-600 mb-2">{t.support_modal_book_intro}</p>
        </div>
        <div className="mt-auto">
          <div className="flex justify-center my-4">
              <img src={newQrUrl} alt="Calendar QR Code" className="w-32 h-32" />
          </div>
          <a href={newBookingUrl} target="_blank" rel="noopener noreferrer" className="text-center block text-[color:var(--accent-primary)] hover:underline">{t.support_modal_book_link}</a>
        </div>
      </div>
      
      {/* Block 3: Email */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col">
          <h4 className="font-bold text-lg text-[color:var(--text-primary)] mb-2 flex items-center gap-2">
              <EmailIcon className="h-6 w-6 text-red-500" /> {t.support_modal_email_title}
          </h4>
          <p className="text-slate-600 mb-4 flex-grow">{t.support_modal_email_intro}</p>
          <a href={`mailto:${emailAddress}`} className="text-center block text-[color:var(--accent-primary)] hover:underline">{t.support_modal_email_link}</a>
          <div className="text-center text-slate-500 my-2">{t.support_modal_email_address_text}</div>
          <div className="relative mt-1">
              <input type="text" readOnly value={emailAddress} className="w-full bg-slate-100 border-slate-300 rounded-md text-center p-2 text-slate-700" />
              <button onClick={() => copyToClipboard(emailAddress, 'email')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[color:var(--accent-primary)]" aria-label={t.copy_email_aria_label}>
                  {copied === 'email' ? <CheckIcon className="h-5 w-5"/> : <ClipboardIcon className="h-5 w-5"/>}
              </button>
          </div>
      </div>

      {/* Block 4: Phone */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col">
          <h4 className="font-bold text-lg text-[color:var(--text-primary)] mb-2 flex items-center gap-2">
              <PhoneIcon className="h-6 w-6 text-purple-500" /> {t.support_modal_phone_title}
          </h4>
          <div className="text-center text-slate-600 mb-4 whitespace-pre-line flex-grow">{t.support_modal_phone_schedule}</div>
          <a href={`tel:${phoneTel}`} className="w-full text-center py-2 px-4 bg-[color:var(--accent-primary)] text-white font-semibold rounded-md hover:bg-[color:var(--accent-primary-hover)] transition-colors">{t.support_modal_phone_cta}</a>
          <div className="relative mt-3">
              <input type="text" readOnly value={phoneNumber} className="w-full bg-slate-100 border-slate-300 rounded-md text-center p-2 text-slate-700" />
               <button onClick={() => copyToClipboard(phoneNumber, 'phone')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[color:var(--accent-primary)]" aria-label={t.copy_phone_aria_label}>
                  {copied === 'phone' ? <CheckIcon className="h-5 w-5"/> : <ClipboardIcon className="h-5 w-5"/>}
              </button>
          </div>
      </div>
    </div>
  );
};


function TablaComponentesConexion({
  data, title, t, platformHeaders, storeCountry, footerText, imageUrl
}: {
  data: any[];
  title: string;
  t: any;
  platformHeaders: string[];
  storeCountry: Language;
  footerText?: string;
  imageUrl?: string;
}) {
  const platformColors: { [key: string]: string } = {
    '3.0': 'text-gray-600', np: 'text-pink-600', rp: 'text-amber-600', wp: 'text-blue-600', '6.0': 'text-purple-600', '6': 'text-purple-600', 'np / rp¹': 'text-purple-600', 'np_rp': 'text-purple-600',
  };

  const renderCell = (ref: string) => {
    if (!ref || ref === '-') return <span className="text-slate-400">—</span>;
    const storePath = getStorePath(storeCountry);
    const searchTerm = ref.replace('*', '');
    const url = `https://store.nobelbiocare.com/${storePath}/catalogsearch/result/?q=${encodeURIComponent(searchTerm)}`;
    return (
      <a href={url} className="font-semibold text-[color:var(--accent-primary)] hover:text-[color:var(--accent-primary-hover)] hover:underline transition-colors" target="_blank" rel="noopener noreferrer">
        {ref}
      </a>
    );
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
            {data.map(row => (
              <tr key={row.rowKey} className="hover:bg-slate-50 transition-colors duration-150">
                <td className="px-3 py-1.5 whitespace-normal text-xs font-medium text-slate-800 text-left bg-white border-b border-slate-200">{t[row.rowKey]}</td>
                {row.kit ? (
                  <td colSpan={platformHeaders.length} className="px-2 py-1.5 text-center whitespace-nowrap text-xs text-slate-600 border-b border-l border-slate-200">
                    {renderCell(row.kit)}
                  </td>
                ) : (
                  platformHeaders.map(p => {
                    const cleanHeader = p.toLowerCase().replace(/[¹²³]/g, '');
                    const colKey = cleanHeader.includes('/') ? cleanHeader.replace(/ /g, '').replace('/', '_') : cleanHeader.split(' ')[0];
                    return (
                      <td key={`${row.rowKey}-${p}`} className="px-2 py-1.5 text-center whitespace-nowrap text-xs text-slate-600 border-b border-l border-slate-200">
                        {renderCell(row[colKey])}
                      </td>
                    );
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
}

// FIX: Refactored TablaMUA to be a React.FC with an explicit props interface to resolve TypeScript errors with the 'key' prop.
interface TablaMUAProps {
    data: any[];
    title: string;
    t: any;
    platformHeaders: string[];
    storeCountry: Language;
    imageUrl?: string;
    hasAngle?: boolean;
}

const TablaMUA: React.FC<TablaMUAProps> = ({ data, title, t, platformHeaders, storeCountry, imageUrl, hasAngle = false }) => {
    const renderCell = (ref: string) => {
        if (!ref || ref === '—') return <span className="text-slate-400">—</span>;
        const storePath = getStorePath(storeCountry);
        const searchTerm = ref.replace('*', '');
        const url = `https://store.nobelbiocare.com/${storePath}/catalogsearch/result/?q=${encodeURIComponent(searchTerm)}`;
        return (
            <a href={url} className="font-semibold text-[color:var(--accent-primary)] hover:text-[color:var(--accent-primary-hover)] hover:underline transition-colors" target="_blank" rel="noopener noreferrer">
                {ref}
            </a>
        );
    };

    return (
        <div className="mb-8 last:mb-0">
            {imageUrl && (
                 <div className="flex items-center gap-3 mb-3">
                    <img src={imageUrl} alt={title} className="w-16 h-16 object-contain rounded-md border p-1 bg-white" />
                    <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
                </div>
            )}
            {!imageUrl && <h3 className="text-xl font-semibold text-slate-800 mb-3">{title}</h3>}
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
                <table className="min-w-full text-xs">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-3 py-1.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">{t.platformHeader}</th>
                            {hasAngle && <th className="px-3 py-1.5 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Angle</th>}
                            {platformHeaders.map(h => <th key={h} className="px-3 py-1.5 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">h={h}mm</th>)}
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {data.map(row => (
                            <tr key={row.rowKey} className="hover:bg-slate-50 transition-colors duration-150">
                                <td className="px-3 py-1.5 whitespace-nowrap text-xs font-medium text-slate-800 text-left bg-white border-b border-slate-200">{row.rowKey.split('_')[0].toUpperCase()}</td>
                                {hasAngle && <td className="px-3 py-1.5 text-center whitespace-nowrap text-xs text-slate-600 border-b border-l border-slate-200">{row.angle}</td>}
                                {platformHeaders.map(h => (
                                    <td key={h} className="px-3 py-1.5 text-center whitespace-nowrap text-xs text-slate-600 border-b border-l border-slate-200">
                                        {renderCell(row[h])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


const App: React.FC = () => {
    const [filters, setFilters] = useState<Filters>({ searchText: '', status: '', type: '', connectionType: '', softwareType: '', angulation: '' });
    const [language, setLanguage] = useState<Language>('es');
    const [storeCountry, setStoreCountry] = useState<Language>('es');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const [modalCaseData, setModalCaseData] = useState<DentalCase | null>(null);
    const [modalTitle, setModalTitle] = useState('');
    const [modalFooter, setModalFooter] = useState<React.ReactNode>(null);
    const [modalId, setModalId] = useState<string | undefined>(undefined);
    const [isFilterBarCollapsed, setIsFilterBarCollapsed] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isIntroModalOpen, setIsIntroModalOpen] = useState(true);
    const [activeSearchTerm, setActiveSearchTerm] = useState('');
    const caseRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const menuRef = useRef<HTMLDivElement>(null);

    const t = translations[language];
    const initialFilters: Filters = { searchText: '', status: '', type: '', connectionType: '', softwareType: '', angulation: '' };

    const filteredCases = useMemo(() => {
        return MOCK_CASES.filter(c => {
            const searchLower = activeSearchTerm.toLowerCase();
            const nameMatch = c.patientName[language].toLowerCase().includes(searchLower);
            const idMatch = c.id.toLowerCase().includes(searchLower);
            const refMatch = c.reference.toLowerCase().includes(searchLower);
            
            const statusMatch = !filters.status || c.status === filters.status;
            const typeMatch = !filters.type || c.restorationType.includes(filters.type);
            const connectionMatch = !filters.connectionType || c.connectionType === filters.connectionType || c.compatibleConnections?.includes(filters.connectionType);
            const angulationMatch = !filters.angulation || String(c.angulacion) === filters.angulation;

            return (nameMatch || idMatch || refMatch) && statusMatch && typeMatch && connectionMatch && angulationMatch;
        }).sort((a, b) => a.caseNumber - b.caseNumber);
    }, [MOCK_CASES, filters, activeSearchTerm, language]);

    const isAnyFilterActive = useMemo(() => {
        return Object.values(filters).some(val => val !== '') || activeSearchTerm !== '';
    }, [filters, activeSearchTerm]);
    
    const handleFilterChange = (name: keyof Filters, value: string) => setFilters(prev => ({ ...prev, [name]: value }));
    const handleResetFilters = () => { setFilters(initialFilters); setActiveSearchTerm(''); };
    const handleCloseModal = () => setIsModalOpen(false);
    
    const handleConfirmIntro = (lang: Language, country: Language) => {
        setLanguage(lang);
        setStoreCountry(country);
        setIsIntroModalOpen(false);
    };

    const handleApplyAssistantFilters = (assistantFilters: AssistantSelections) => {
      setFilters({
        searchText: '',
        softwareType: '',
        type: assistantFilters.restorationType,
        status: assistantFilters.status[0] || "",
        angulation: assistantFilters.angulation,
        connectionType: assistantFilters.connections[0] || "",
      });
      handleCloseModal();
    };

    const handleOrientadorClick = () => {
        setModalTitle(t.modal.orientador_title);
        setModalContent(
          <AssistantModalContent
            onClose={handleCloseModal}
            onApplyFilters={handleApplyAssistantFilters}
            t={t}
            allCases={MOCK_CASES}
            language={language}
          />
        );
        setIsModalOpen(true);
        setModalId('modal-orientador');
        setModalFooter(null);
    };

    const handleOpenModal = (caseData: DentalCase, initialConnection?: string) => {
        setModalCaseData(caseData);
        setModalTitle(caseData.patientName[language]);
        setModalId(`modal-${caseData.id}`);
        setModalFooter(null);

        const onSupportClick = () => {
            setModalTitle('Soporte Técnico');
            setModalContent(<SupportModal t={t.modal} />);
        };
    
        const getProceraUrl = (lang: Language): string => {
            const storePath = getStorePath(lang);
            switch (lang) {
                case 'pt': return 'https://www.nobelbiocare.com/pt/pt/restauracoes-nobelprocera';
                case 'fr': return 'https://www.nobelbiocare.com/fr-fr/protheses-nobelprocera';
                case 'sv': case 'es': default: return `https://www.nobelbiocare.com/${storePath}/nobelprocera-openaccess`;
            }
        };
      
        const getLocalProductionUrl = (lang: Language): string => {
            const storePath = getStorePath(lang);
            switch (lang) {
                case 'pt': return 'https://www.nobelbiocare.com/pt/pt/producao-local';
                case 'fr': return 'https://www.nobelbiocare.com/fr-fr/production-locale';
                case 'sv': return 'https://www.nobelbiocare.com/en-se/local-production';
                case 'es': default: return `https://www.nobelbiocare.com/${storePath}/produccion-local#66588`;
            }
        };

        const isProcera = caseData.status === CaseStatus.Procera;
        const url = isProcera ? getProceraUrl(language) : getLocalProductionUrl(language);
        const resourceLinks = {
            exocad: url,
            shape: url,
            dentalwings: isProcera ? undefined : url,
            seeAll: url,
        };

        const commonTableProps = { t: t, storeCountry, imageUrl: caseData.imageUrls[0] };
        
        let content: React.ReactNode = <p>{t.modal.no_components_description}</p>;

        switch(caseData.id) {
            case 'EXO021':
            case 'EXO022': {
                const Content = () => {
                    const connections = caseData.compatibleConnections?.map(c => c.toString()) || [];
                    const [selectedConn, setSelectedConn] = useState(initialConnection || connections[0]);
                    let tableData, tableTitle;
                    if(caseData.id === 'EXO021'){
                         switch(selectedConn){
                            case 'CC': tableData = <TablaComponentesConexion data={UNIVERSAL_BASE_NON_ROTATING_CC_DATA} title={t.universalBaseTable.cc} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.universalBaseTable} />; break;
                            case 'Brånemark': tableData = <TablaComponentesConexion data={UNIVERSAL_BASE_NON_ROTATING_BRANEMARK_DATA} title={t.universalBaseTable.externalHex} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.universalBaseTable} />; break;
                            case 'Tri-channel': tableData = <TablaComponentesConexion data={UNIVERSAL_BASE_NON_ROTATING_TRICHANNEL_DATA} title={t.universalBaseTable.triChannel} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.universalBaseTable} />; break;
                         }
                    } else { // EXO022
                         switch(selectedConn){
                            case 'CC': tableData = <><TablaComponentesConexion data={UNIVERSAL_BASE_ROTATING_CC_DATA} title={t.universalBaseRotatingCCTable.title} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.universalBaseRotatingTable} /><TablaComponentesConexion data={UNIVERSAL_BASE_ROTATING_CONICO_CC_DATA} title={t.universalBaseRotatingConicoCCTable.title} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.universalBaseRotatingTable} /></>; break;
                            case 'Brånemark': tableData = <><TablaComponentesConexion data={UNIVERSAL_BASE_ROTATING_BRANEMARK_DATA} title={t.universalBaseRotatingBranemarkTable.title} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.universalBaseRotatingTable} /><TablaComponentesConexion data={UNIVERSAL_BASE_ROTATING_CONICO_BRANEMARK_DATA} title={t.universalBaseRotatingConicoBranemarkTable.title} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.universalBaseRotatingTable} /></>; break;
                            case 'Tri-channel': tableData = <><TablaComponentesConexion data={UNIVERSAL_BASE_ROTATING_TRICHANNEL_DATA} title={t.universalBaseRotatingTriChannelTable.title} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.universalBaseRotatingTable} /><TablaComponentesConexion data={UNIVERSAL_BASE_ROTATING_CONICO_TRICHANNEL_DATA} title={t.universalBaseRotatingConicoTriChannelTable.title} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.universalBaseRotatingTable} /></>; break;
                            case 'Multi Unit': tableData = <><TablaComponentesConexion data={UNIVERSAL_MULTI_UNIT_RECTO_DATA} title={t.universalMultiUnitTable.rectoTitle} platformHeaders={['np_rp', 'wp']} footerText={t.universalMultiUnitTable.footerRecto} {...commonTableProps} t={t.universalMultiUnitTable} /><TablaComponentesConexion data={UNIVERSAL_MULTI_UNIT_CONICO_DATA} title={t.universalMultiUnitTable.conicoTitle} platformHeaders={['np_rp', 'wp']} {...commonTableProps} t={t.universalMultiUnitTable} /></>; break;
                         }
                    }

                    return (
                        <div>
                            <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                            {tableData}
                        </div>
                    );
                };
                content = <Content />;
                break;
            }
            case 'EXO016': {
                const Content = () => {
                    const connections = ['CC', 'Brånemark', 'Tri-channel', 'N1 TCC'];
                    const [selectedConn, setSelectedConn] = useState(initialConnection || 'CC');
                    if (selectedConn === 'N1 TCC') {
                        return (
                            <div>
                                <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                                <TablaComponentesConexion data={PRE_MILLED_BLANKS_N1_TCC_DATA} title={t.preMilledBlanksN1TCCTable.title} platformHeaders={['np', 'rp']} {...commonTableProps} t={t.preMilledBlanksN1TCCTable}/>
                            </div>
                        );
                    }
                    return (
                        <div>
                            <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                            <PreMilledBlanksPage t={t.preMilledBlanksTable} storeCountry={storeCountry} connectionType={selectedConn} data={PRE_MILLED_BLANKS_DATA} onDataChange={() => {}} imageUrl={N1_TCC_CASE_DATA.imageUrls[0]}/>
                        </div>
                    );
                };
                content = <Content />;
                break;
            }
             case 'EXO024':
             case 'EXO025': {
                const Content = () => {
                    const connections = caseData.compatibleConnections?.map(c => c.toString()) || [];
                    const [selectedConn, setSelectedConn] = useState(initialConnection || connections[0]);
                    let tableData, tableTitle, platformHeaders, tableT, footer;
                    switch(selectedConn) {
                        case 'CC': 
                            tableData = ZIRCONIA_BRIDGE_CC_DATA;
                            tableTitle = t.zirconiaBridgeCCTable.title;
                            platformHeaders = ['np', 'rp', 'wp'];
                            tableT = t.proceraFCZImplantCrownTable;
                            break;
                        case 'Brånemark': 
                            tableData = ZIRCONIA_BRIDGE_BRANEMARK_DATA;
                            tableTitle = t.zirconiaBridgeBranemarkTable.title;
                            platformHeaders = ['np', 'rp', 'wp'];
                            tableT = t.proceraFCZImplantCrownTable;
                            break;
                        case 'Tri-channel': 
                            tableData = ZIRCONIA_BRIDGE_TRICHANNEL_DATA;
                            tableTitle = t.zirconiaBridgeTriChannelTable.title;
                            platformHeaders = ['np', 'rp', 'wp', '6.0'];
                            tableT = t.proceraFCZImplantCrownTable;
                            break;
                        case 'Multi Unit': 
                            tableData = MULTI_UNIT_CONNECTION_DATA;
                            tableTitle = t.universalMultiUnitTable.connectionTitle;
                            platformHeaders = ['np / rp¹', 'wp²'];
                            tableT=t.universalMultiUnitTable;
                            footer = t.universalMultiUnitTable.footerRecto;
                            break;
                    }
                    return (
                        <div>
                            <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                            {tableData && <TablaComponentesConexion data={tableData} title={tableTitle} platformHeaders={platformHeaders} {...commonTableProps} t={tableT} footerText={footer} />}
                        </div>
                    );
                };
                content = <Content />;
                break;
            }
            case 'EXO026': {
                content = <TablaComponentesConexion data={PROCERA_FCZ_IMPLANT_CROWN_DATA} title={t.proceraFCZImplantCrownTable.title} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.proceraFCZImplantCrownTable} />;
                break;
            }
            case 'EXO028': {
                const Content = () => {
                    const connections = ['CC', 'Tri-channel'];
                    const [selectedConn, setSelectedConn] = useState(initialConnection || connections[0]);
                    let tableData, tableTitle, platformHeaders, tableFooter;
                    switch(selectedConn) {
                        case 'CC': tableData = PROCERA_TITANIUM_ASC_CC_DATA; tableTitle = t.proceraTitaniumAscPillarTable.ccTitle; platformHeaders = ['np', 'rp', 'wp']; tableFooter = t.proceraTitaniumAscPillarTable.ccFooter; break;
                        case 'Tri-channel': tableData = PROCERA_TITANIUM_ASC_TRICHANNEL_DATA; tableTitle = t.proceraTitaniumAscPillarTable.triChannelTitle; platformHeaders = ['np', 'rp', 'wp', '6']; tableFooter = t.proceraTitaniumAscPillarTable.triChannelFooter; break;
                    }
                    return (
                        <div>
                            <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                            {tableData && <TablaComponentesConexion data={tableData} title={tableTitle} platformHeaders={platformHeaders} footerText={tableFooter} {...commonTableProps} t={t.proceraFCZImplantCrownTable} />}
                        </div>
                    );
                };
                content = <Content />;
                break;
            }
            case 'EXO027': {
                const Content = () => {
                    const connections = ['CC', 'Brånemark', 'Tri-channel'];
                    const [selectedConn, setSelectedConn] = useState(initialConnection || connections[0]);
                    let tableData, tableTitle, platformHeaders;
                    switch(selectedConn) {
                        case 'CC': tableData = PROCERA_TITANIUM_CC_DATA; tableTitle = t.proceraTitaniumPillarTable.ccTitle; platformHeaders = ['3.0', 'np', 'rp', 'wp']; break;
                        case 'Brånemark': tableData = PROCERA_TITANIUM_BRANEMARK_DATA; tableTitle = t.proceraTitaniumPillarTable.branemarkTitle; platformHeaders = ['np', 'rp', 'wp']; break;
                        case 'Tri-channel': tableData = PROCERA_TITANIUM_TRICHANNEL_DATA; tableTitle = t.proceraTitaniumPillarTable.triChannelTitle; platformHeaders = ['np', 'rp', 'wp', '6']; break;
                    }
                    return (
                        <div>
                            <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                            {tableData && <TablaComponentesConexion data={tableData} title={tableTitle} platformHeaders={platformHeaders} {...commonTableProps} t={t.proceraFCZImplantCrownTable} />}
                        </div>
                    );
                };
                content = <Content />;
                break;
            }
             case 'EXO030': {
                const Content = () => {
                    const connections = ['CC', 'Brånemark', 'Tri-channel'];
                    const [selectedConn, setSelectedConn] = useState(initialConnection || connections[0]);
                    let tableData, tableTitle, platformHeaders, tableFooter;
                    switch(selectedConn) {
                        case 'CC': tableData = PROCERA_ZIRCONIA_CC_DATA; tableTitle = t.proceraZirconiaPillarTable.ccTitle; platformHeaders = ['np', 'rp', 'wp']; break;
                        case 'Brånemark': tableData = PROCERA_ZIRCONIA_BRANEMARK_DATA; tableTitle = t.proceraZirconiaPillarTable.branemarkTitle; platformHeaders = ['np', 'rp', 'wp']; break;
                        case 'Tri-channel': tableData = PROCERA_ZIRCONIA_TRICHANNEL_DATA; tableTitle = t.proceraZirconiaPillarTable.triChannelTitle; platformHeaders = ['np', 'rp', 'wp', '6']; tableFooter = t.proceraZirconiaPillarTable.triChannelFooter; break;
                    }
                    return (
                        <div>
                            <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                            {tableData && <TablaComponentesConexion data={tableData} title={tableTitle} platformHeaders={platformHeaders} footerText={tableFooter} {...commonTableProps} t={t.proceraFCZImplantCrownTable} />}
                        </div>
                    );
                };
                content = <Content />;
                break;
            }
            case 'EXO029': {
                const Content = () => {
                    const connections = ['CC', 'Brånemark', 'Tri-channel', 'Multi Unit'];
                    const [selectedConn, setSelectedConn] = useState(initialConnection || connections[0]);
                    let tableData, tableTitle, platformHeaders;
                    // FIX: Use a local `tableT` variable typed as `any` to dynamically assign the correct translation object based on connection type.
                    let tableT: any;
                    switch(selectedConn) {
                        case 'CC': tableData = PROCERA_TITANIUM_BRIDGE_CC_DATA; tableTitle = t.proceraTitaniumBridgeTable.ccTitle; platformHeaders = ['np', 'rp', 'wp']; tableT = t.proceraFCZImplantCrownTable; break;
                        case 'Brånemark': tableData = PROCERA_TITANIUM_BRIDGE_BRANEMARK_DATA; tableTitle = t.proceraTitaniumBridgeTable.branemarkTitle; platformHeaders = ['np', 'rp', 'wp']; tableT = t.proceraFCZImplantCrownTable; break;
                        case 'Tri-channel': tableData = PROCERA_TITANIUM_BRIDGE_TRICHANNEL_UPDATED_DATA; tableTitle = t.proceraTitaniumBridgeTable.triChannelTitle; platformHeaders = ['np', 'rp', 'wp', '6']; tableT = t.universalBaseTable; break;
                        case 'Multi Unit': tableData = MULTI_UNIT_CONNECTION_DATA; tableTitle = t.universalMultiUnitTable.connectionTitle; platformHeaders = ['np_rp', 'wp']; tableT = t.universalMultiUnitTable; break;
                    }
                    return (
                        <div>
                            <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                            {tableData && <TablaComponentesConexion data={tableData} title={tableTitle} platformHeaders={platformHeaders} {...commonTableProps} t={tableT} />}
                        </div>
                    );
                };
                content = <Content />;
                break;
            }
            case 'EXO032': {
                const Content = () => {
                    const connections = ['CC', 'Brånemark', 'Tri-channel', 'Multi Unit'];
                    const [selectedConn, setSelectedConn] = useState(initialConnection || connections[0]);
                    let tableData, tableTitle, platformHeaders;
                    // FIX: Use a local `tableT` variable typed as `any` to dynamically assign the correct translation object based on connection type.
                    let tableT: any;
                    switch(selectedConn) {
                        case 'CC': tableData = NOBELPROCERA_TITANIUM_BAR_CC_DATA; tableTitle = t.nobelProceraTitaniumBarTable.ccTitle; platformHeaders = ['np', 'rp', 'wp']; tableT = t.nobelProceraTitaniumBarTable; break;
                        case 'Brånemark': tableData = NOBELPROCERA_TITANIUM_BAR_BRANEMARK_DATA; tableTitle = t.nobelProceraTitaniumBarTable.branemarkTitle; platformHeaders = ['np', 'rp', 'wp']; tableT = t.nobelProceraTitaniumBarTable; break;
                        case 'Tri-channel': tableData = NOBELPROCERA_TITANIUM_BAR_TRICHANNEL_DATA; tableTitle = t.nobelProceraTitaniumBarTable.triChannelTitle; platformHeaders = ['np', 'rp', 'wp', '6']; tableT = t.nobelProceraTitaniumBarTable; break;
                        case 'Multi Unit': tableData = MULTI_UNIT_CONNECTION_DATA; tableTitle = t.universalMultiUnitTable.connectionTitle; platformHeaders = ['np_rp', 'wp']; tableT = t.universalMultiUnitTable; break;
                    }
                    return (
                        <div>
                            <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                            {tableData && <TablaComponentesConexion data={tableData} title={tableTitle} platformHeaders={platformHeaders} {...commonTableProps} t={tableT} />}
                        </div>
                    );
                };
                content = <Content />;
                break;
            }
            case 'EXO013': {
                content = (
                    <div>
                        <TablaComponentesConexion data={N1_BASE_UNITARIA_NO_ROTATORIO_DATA} title={t.n1BaseUniversalTable.unitariaTitle} platformHeaders={['np', 'rp']} {...commonTableProps} t={t.n1BaseUniversalTable} />
                        <TablaComponentesConexion data={N1_BASE_PUENTE_ROTATORIO_DATA} title={t.n1BaseUniversalTable.puenteTitle} platformHeaders={['np', 'rp']} {...commonTableProps} t={t.n1BaseUniversalTable} />
                    </div>
                );
                break;
            }
            case 'EXO006': {
                content = <TablaComponentesConexion data={N1_TCC_UNITARIA_NO_ROTATORIA_DATA} title={t.n1TccUnitariaTable.title} platformHeaders={['np', 'rp']} footerText={t.n1TccUnitariaTable.footer} {...commonTableProps} t={t.n1TccUnitariaTable} />;
                break;
            }
            case 'EXO014': {
                 const Content = () => {
                    const connections = ['CC', 'N1 TCC', 'N1 Base', 'On1', 'Brånemark', 'Tri-channel'];
                    const [selectedConn, setSelectedConn] = useState(initialConnection || connections[0]);
                    let tableData, tableTitle, platformHeaders, tableT;
                    switch(selectedConn) {
                        case 'CC': tableData = PROCERA_TITANIUM_CC_DATA; tableTitle = t.proceraTitaniumPillarTable.ccTitle; platformHeaders = ['3.0', 'np', 'rp', 'wp']; tableT = t.proceraFCZImplantCrownTable; break;
                        case 'N1 TCC': tableData = N1_TCC_UNITARIA_NO_ROTATORIA_DATA; tableTitle = t.n1TccUnitariaTable.title; platformHeaders = ['np', 'rp']; tableT = t.n1TccUnitariaTable; break;
                        case 'N1 Base': tableData = N1_BASE_UNITARIA_NO_ROTATORIO_DATA; tableTitle = t.n1BaseUniversalTable.unitariaTitle; platformHeaders = ['np', 'rp']; tableT = t.n1BaseUniversalTable; break;
                        case 'On1': tableData = PILAR_UNIVERSAL_ON1_ROTATORIO_DATA; tableTitle = t.pilarUniversalOn1Table.rotatorioTitle; platformHeaders = ['np', 'rp', 'wp']; tableT = t.pilarUniversalOn1Table; break;
                        case 'Brånemark': tableData = PROCERA_TITANIUM_BRANEMARK_DATA; tableTitle = t.proceraTitaniumPillarTable.branemarkTitle; platformHeaders = ['np', 'rp', 'wp']; tableT = t.proceraFCZImplantCrownTable; break;
                        case 'Tri-channel': tableData = PROCERA_TITANIUM_TRICHANNEL_DATA; tableTitle = t.proceraTitaniumPillarTable.triChannelTitle; platformHeaders = ['np', 'rp', 'wp', '6']; tableT = t.proceraFCZImplantCrownTable; break;
                    }
                    return (
                        <div>
                            <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                            {tableData && <TablaComponentesConexion data={tableData} title={tableTitle} platformHeaders={platformHeaders} {...commonTableProps} t={tableT} />}
                        </div>
                    );
                };
                content = <Content />;
                break;
            }
            case 'EXO019': {
                content = (
                    <div>
                        <TablaComponentesConexion data={PILAR_UNIVERSAL_ON1_NO_ROTATORIO_DATA} title={t.pilarUniversalOn1Table.noRotatorioTitle} platformHeaders={['np', 'rp', 'wp']} footerText={t.pilarUniversalOn1Table.footer} {...commonTableProps} t={t.pilarUniversalOn1Table} />
                        <TablaComponentesConexion data={PILAR_UNIVERSAL_ON1_ROTATORIO_DATA} title={t.pilarUniversalOn1Table.rotatorioTitle} platformHeaders={['np', 'rp', 'wp']} footerText={t.pilarUniversalOn1Table.footer} {...commonTableProps} t={t.pilarUniversalOn1Table} />
                    </div>
                );
                break;
            }
            case 'EXO020': {
                content = <TablaComponentesConexion data={NOBEL_PEARL_COMPONENTS_DATA} title={t.nobelPearlTable.title} platformHeaders={['np', 'rp', 'wp']} footerText={t.nobelPearlTable.footer} {...commonTableProps} t={t.nobelPearlTable} />;
                break;
            }
            case 'EXO034': {
                const Content = () => {
                    const connections = ['CC', 'N1 TCC', 'Brånemark', 'Tri-channel'];
                    const [selectedConn, setSelectedConn] = useState(initialConnection || connections[0]);
                    let tables: React.ReactNode[] = [];
                    
                    switch(selectedConn) {
                        case 'CC': 
                            tables.push(<TablaMUA key="cc-r" data={MUA_XEAL_CC_RECTO_DATA} title={t.multiUnitAbutmentsTable.ccRectoTitle} platformHeaders={['1.5','2.5','3.5','4.5']} t={t} storeCountry={storeCountry} imageUrl={caseData.imageUrls[0]} />);
                            tables.push(<TablaMUA key="cc-a" data={MUA_XEAL_CC_ANGULADO_DATA} title={t.multiUnitAbutmentsTable.ccAnguladoTitle} platformHeaders={['2.5','3.5','4.5']} t={t} storeCountry={storeCountry} hasAngle />);
                            break;
                        case 'N1 TCC': 
                            tables.push(<TablaMUA key="n1-r" data={MUA_XEAL_N1_TCC_RECTO_DATA} title={t.multiUnitAbutmentsTable.n1TccRectoTitle} platformHeaders={['1.5','2.5','3.5','4.5']} t={t} storeCountry={storeCountry} imageUrl={caseData.imageUrls[2]} />);
                            tables.push(<TablaMUA key="n1-a" data={MUA_XEAL_N1_TCC_ANGULADO_DATA} title={t.multiUnitAbutmentsTable.n1TccAnguladoTitle} platformHeaders={['2.5','3.5','4.5']} t={t} storeCountry={storeCountry} hasAngle />);
                            break;
                        case 'Brånemark': 
                            tables.push(<TablaMUA key="br-r" data={MUA_BRANEMARK_RECTO_DATA} title={t.multiUnitAbutmentsTable.branemarkRectoTitle} platformHeaders={['1','2','3','4','5']} t={t} storeCountry={storeCountry} imageUrl={caseData.imageUrls[3]} />);
                            tables.push(<TablaMUA key="br-a" data={MUA_BRANEMARK_ANGULADO_DATA} title={t.multiUnitAbutmentsTable.branemarkAnguladoTitle} platformHeaders={['2','3','4','5']} t={t} storeCountry={storeCountry} hasAngle />);
                            break;
                        case 'Tri-channel': 
                            tables.push(<TablaMUA key="tr-r" data={MUA_TRICHANNEL_RECTO_DATA} title={t.multiUnitAbutmentsTable.triChannelRectoTitle} platformHeaders={['1','2','3','4','5']} t={t} storeCountry={storeCountry} imageUrl={caseData.imageUrls[4]} />);
                            tables.push(<TablaMUA key="tr-a" data={MUA_TRICHANNEL_ANGULADO_DATA} title={t.multiUnitAbutmentsTable.triChannelAnguladoTitle} platformHeaders={['2','3','4','5']} t={t} storeCountry={storeCountry} hasAngle />);
                            break;
                    }
                    return (
                        <div>
                            <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                            {tables}
                        </div>
                    );
                };
                content = <Content />;
                break;
            }
            default:
                content = <p>{t.modal.no_components_description}</p>;
        }

        if ((caseData.status === CaseStatus.Local || caseData.status === CaseStatus.Procera) && caseData.id !== 'EXO031') {
            setModalFooter(
                <ResourceButtons
                    t={t.modal}
                    caseData={caseData}
                    onOpenDownloadsModal={() => handleHelp001Click(caseData)}
                    language={language}
                />
            );
        }

        const modalBody = (
            <React.Fragment>
                <CaseDetailIcons caseData={caseData} isModal t={t.caseCard} connectionTypeForTable={initialConnection} />
                <hr className="my-6 border-slate-200" />
                {content}
            </React.Fragment>
        );
        
        setModalContent(modalBody);
        setIsModalOpen(true);
    };

    const handleHelp001Click = (caseData: DentalCase) => {
        setModalCaseData(caseData);
        setModalId('modal-help001');
        setModalTitle(t.modal.descargas_procera_modal_title);
        if (language === 'en' || language === 'es' || language === 'pt') {
            setModalContent(<DescargasProceraModalContent t={t.modal} onClose={handleCloseModal} language={language} onOpenSelecProLocal={() => setModalContent(<SelecProLocal t={t.modal} onClose={handleCloseModal} language={language}/>)}/>);
        } else {
            setModalContent(<DescargasOtherProcera t={t.modal} onClose={handleCloseModal} language={language} onOpenSelecProLocal={() => setModalContent(<SelecProLocal t={t.modal} onClose={handleCloseModal} language={language}/>)}/>);
        }
        setIsModalOpen(true);
    };

    const handleTablesClick = (caseData: DentalCase) => {
        setModalCaseData(caseData);
        setModalId('modal-dev-debug');
        setModalTitle(t.modal.tables_modal_title);
        setModalContent(<DevDebugPage t={t.devDebugPage} />);
        setIsModalOpen(true);
    };
    
    const handleMenuItemClick = (caseId: string) => {
        const cardElement = caseRefs.current[caseId];
        if (cardElement) {
            cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            cardElement.classList.add('highlight-card');
            setTimeout(() => {
                cardElement.classList.remove('highlight-card');
            }, 1500);
        }
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    const menuData = useMemo(() => {
      const categories: { [key: string]: { id: string; label: string; imageUrl: string }[] } = {};
      MOCK_CASES.forEach(c => {
        const category = t.filterBar.options[c.status] || 'Others';
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push({
          id: c.id,
          label: c.patientName[language],
          imageUrl: c.imageUrls[0] || '',
        });
      });
      return categories;
    }, [language, t]);

    const handleDownloadCenterClick = () => {
        const handleOpenWorkflowSelector = () => {
            setModalTitle(t.modal.selec_pro_local_title);
            setModalContent(<SelecProLocal t={t.modal} onClose={handleCloseModal} language={language}/>);
        };

        const downloadLinks = [
            { text: 'NobelProcera Overview V3.pdf', href: '#' },
            { text: 'Local Production Overview V1.2.pdf', href: '#' },
            { text: 'Material and component compatibility V2.1.pdf', href: '#' },
        ];

        setModalTitle(t.header.download_center_button);
        setModalId('modal-download-center');
        setModalContent(
            <DownloadCenterModalContent
                links={downloadLinks}
                t={t}
                onClose={handleCloseModal}
                onOpenWorkflowSelector={handleOpenWorkflowSelector}
                language={language}
            />
        );
        setIsModalOpen(true);
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Modal isOpen={isIntroModalOpen} onClose={() => {}} title="" backButtonLabel="" isDismissable={false} showHeader={false} id="modal-intro" maxWidth="max-w-xl">
              <IntroModal onConfirm={handleConfirmIntro} t={translations} />
            </Modal>
            
            <Header
                title={t.header.title}
                language={language}
                storeCountry={storeCountry}
                onLanguageChange={setLanguage}
                onSupportClick={() => { setIsModalOpen(true); setModalTitle('Soporte Técnico'); setModalContent(<SupportModal t={t.modal} />); }}
                onCustomerServiceClick={() => { setIsModalOpen(true); setModalTitle(t.modal.customer_service_title); setModalContent(<CustomerServiceModal t={t.modal} language={language}/>); }}
                onDownloadCenterClick={handleDownloadCenterClick}
                onGlobeClick={() => setIsIntroModalOpen(true)}
                t={t.header}
                isMenuOpen={isMenuOpen}
                onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
                menuData={menuData}
                onMenuItemClick={handleMenuItemClick}
                onOrientadorClick={handleOrientadorClick}
            />

            <div className="flex-1 w-full max-w-screen-2xl mx-auto flex">
                <aside className={`flex-shrink-0 transition-all duration-300 ease-in-out ${isFilterBarCollapsed ? 'w-20' : 'w-80'}`}>
                    <div className="sticky top-[145px] h-[calc(100vh-160px)] p-4">
                        <FilterBar 
                            filters={filters} 
                            onFilterChange={handleFilterChange} 
                            onResetFilters={handleResetFilters}
                            isAnyFilterActive={isAnyFilterActive}
                            t={t.filterBar}
                            isCollapsed={isFilterBarCollapsed}
                            onToggle={() => setIsFilterBarCollapsed(!isFilterBarCollapsed)}
                        />
                    </div>
                </aside>
                <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
                    <div className="flex items-center justify-between mb-6">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder={t.filterBar.search_placeholder}
                                value={activeSearchTerm}
                                onChange={(e) => setActiveSearchTerm(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)]"
                            />
                            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        </div>
                    </div>
                    
                    <CaseGrid 
                        cases={filteredCases} 
                        onReferenceClick={handleOpenModal}
                        onHelp001Click={handleHelp001Click}
                        onTablesClick={handleTablesClick}
                        onTableTestClick={() => {}}
                        onExosClick={() => {}}
                        t={t.caseCard} 
                        tNotes={t.notes} 
                        language={language}
                        isAnyFilterActive={isAnyFilterActive}
                        caseRefs={caseRefs}
                    />
                </main>
            </div>
            
            <Footer t={t.footer} storeCountry={storeCountry} onSupportClick={() => {}} />

            <Modal 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={modalTitle}
                backButtonLabel={t.modal.back_button}
                caseData={modalCaseData || undefined}
                t={t}
                id={modalId}
                footer={modalFooter}
            >
                {modalContent}
            </Modal>
        </div>
    );
};

export default App;