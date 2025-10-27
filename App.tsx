import React, { useState, useEffect, useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import { GoogleGenAI, Chat } from "@google/genai";
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
import { DownloadIcon, InfoIcon, ChatbotIcon, MagnifyingGlassIcon, ExternalLinkIcon, FilterIcon, ArrowRightIcon } from './components/icons';
import CaseDetailIcons from './components/CaseDetailIcons';
import ConnectionSelector from './components/ConnectionSelector';
import BotonesModalContent from './components/BotonesModalContent';
import ExosModalContent from './components/ExosModalContent';
import IntroModal from './components/IntroModal';
import Chatbot from './components/Chatbot';

const getStorePath = (country: Language) => {
    switch (country) {
      case 'fr': return 'fr/fr';
      case 'pt': return 'pt/pt';
      case 'sv': return 'se/se';
      default: return 'es/es';
    }
};

const SupportModal: React.FC<{ t: any }> = ({ t }) => (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 text-center">
            <h3 className="font-bold text-lg text-[color:var(--text-primary)] mb-2">{t.support_modal_whatsapp_title}</h3>
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
            <h3 className="font-bold text-lg text-[color:var(--text-primary)] mb-2">{t.support_modal_book_title}</h3>
            <p className="text-slate-600 text-sm mb-4">{t.support_modal_book_intro}</p>
            <div className="flex justify-center mb-4">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=https%3A%2F%2Foutlook.office365.com%2Fbook%2FSoporteTcnicoNobelBiocare%40dentalco.org%2F`} alt="Calendar QR Code" className="w-32 h-32" />
            </div>
            <a href="https://outlook.office365.com/book/SoporteTcnicoNobelBiocare@dentalco.org/" target="_blank" rel="noopener noreferrer" className="text-center block text-[color:var(--accent-primary)] hover:underline">{t.support_modal_book_link}</a>
        </div>
    </div>
);

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
    '3.0': 'text-gray-600', np: 'text-pink-600', rp: 'text-amber-600', wp: 'text-blue-600', '6': 'text-green-600', 'np / rp¹': 'text-purple-600', 'wp²': 'text-blue-600',
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
                  {p === '6' ? '6.0' : p}
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
                    const colKey = p.toLowerCase().includes('np / rp') ? 'np_rp' : p.toLowerCase().split(' ')[0].replace(/[¹²³]/g, '');
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
    
    // Chatbot state
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [isChatbotLoading, setIsChatbotLoading] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([]);
    const chatRef = useRef<Chat | null>(null);

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

    const handleOpenModal = (caseData: DentalCase, initialConnection?: string) => {
        setModalCaseData(caseData);
        setModalTitle(caseData.patientName[language]);
        setModalId(`modal-${caseData.id}`);
        setModalFooter(null);

        const commonTableProps = { t: t, storeCountry, imageUrl: caseData.imageUrls[0] };
        
        const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
            <div>
                <CaseDetailIcons caseData={caseData} isModal t={t.caseCard} connectionTypeForTable={initialConnection} />
                <div className="my-6 border-t border-slate-200"></div>
                {children}
            </div>
        );

        let content: React.ReactNode = <p>{t.modal.no_components_description}</p>;

        if (caseData.id === 'EXO021' || caseData.id === 'EXO022') {
            const Content = () => {
                const connections = caseData.compatibleConnections?.map(c => c.toString()) || [];
                const [selectedConn, setSelectedConn] = useState(initialConnection || connections[0]);
                let tableData, tableTitle, tableFooter;
                if(caseData.id === 'EXO021'){
                     switch(selectedConn){
                        case 'CC': tableData = UNIVERSAL_BASE_NON_ROTATING_CC_DATA; tableTitle = t.universalBaseTable.cc; break;
                        case 'Branemark': tableData = UNIVERSAL_BASE_NON_ROTATING_BRANEMARK_DATA; tableTitle = t.universalBaseTable.externalHex; break;
                        case 'Tri-channel': tableData = UNIVERSAL_BASE_NON_ROTATING_TRICHANNEL_DATA; tableTitle = t.universalBaseTable.triChannel; break;
                     }
                } else {
                     switch(selectedConn){
                        case 'CC': tableData = UNIVERSAL_BASE_ROTATING_CONICO_CC_DATA; tableTitle = t.universalBaseRotatingConicoCCTable.title; break;
                        case 'Branemark': tableData = UNIVERSAL_BASE_ROTATING_CONICO_BRANEMARK_DATA; tableTitle = t.universalBaseRotatingConicoBranemarkTable.title; break;
                        case 'Tri-channel': tableData = UNIVERSAL_BASE_ROTATING_CONICO_TRICHANNEL_DATA; tableTitle = t.universalBaseRotatingConicoTriChannelTable.title; break;
                        case 'Multi-Unit': tableData = MULTI_UNIT_CONNECTION_DATA; tableTitle = t.universalMultiUnitTable.connectionTitle; break;
                     }
                }

                return (
                    <div>
                        <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                        {tableData && <TablaComponentesConexion data={tableData} title={tableTitle} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.universalBaseRotatingTable} />}
                    </div>
                );
            };
            content = <Content />;
        } else if (caseData.id === 'EXO016') {
            const Content = () => {
                const connections = ['CC', 'Branemark', 'Tri-channel', 'N1 TCC'];
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
        }
        
        setModalContent(<ContentWrapper>{content}</ContentWrapper>);
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

    const handleNavigateFromChatbot = (caseId: string) => {
        const caseData = MOCK_CASES.find(c => c.id === caseId);
        if (caseData) {
            handleMenuItemClick(caseId);
            setTimeout(() => handleOpenModal(caseData), 500);
        }
        setIsChatbotOpen(false);
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

    const handleSendMessage = async (message: string) => {
        setMessages(prev => [...prev, { role: 'user', content: message }]);
        setIsChatbotLoading(true);

        try {
            if (!chatRef.current) {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const systemInstruction = `You are a helpful virtual assistant for Nobel Biocare's E-Prosthetic catalog. You will answer questions about the dental prosthetic products. You must answer in ${language}. You can navigate the user to a product if you know its ID. Use the format [link:Product Name|PRODUCT_ID] to create a navigation link. You can show images with [image:URL]. Here is a list of available products in JSON format: ${JSON.stringify(MOCK_CASES.map(({id, patientName, restorationType, connectionType, status, torque}) => ({id, name: patientName[language], restorationType, connectionType, status, torque})))}`;
                
                chatRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: { systemInstruction },
                });
            }
            
            const response = await chatRef.current.sendMessage({ message });
            const botResponse = response.text;
            setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);

        } catch (error) {
            console.error("Chatbot error:", error);
            setMessages(prev => [...prev, { role: 'bot', content: "Sorry, I encountered an error." }]);
        } finally {
            setIsChatbotLoading(false);
        }
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
                onDownloadCenterClick={() => alert('Download center')}
                onGlobeClick={() => setIsIntroModalOpen(true)}
                t={t.header}
                isMenuOpen={isMenuOpen}
                onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
                menuData={menuData}
                onMenuItemClick={handleMenuItemClick}
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
                        onTablesClick={() => {}}
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
            >
                {modalContent}
            </Modal>

            {/* Chatbot Floating Button */}
            {!isChatbotOpen && (
                 <button
                    onClick={() => setIsChatbotOpen(true)}
                    className="fixed bottom-6 right-6 w-16 h-16 bg-[color:var(--accent-primary)] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[color:var(--accent-primary-hover)] transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary)] z-40"
                    aria-label="Open virtual assistant"
                >
                    <ChatbotIcon className="h-8 w-8" />
                </button>
            )}

            <Chatbot
                isOpen={isChatbotOpen}
                onClose={() => setIsChatbotOpen(false)}
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isChatbotLoading}
                t={t.chatbot || { title: "Virtual Assistant", input_placeholder: "Ask something..." }}
                onNavigate={handleNavigateFromChatbot}
                id="chatbot-window"
            />
        </div>
    );
};

export default App;
