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
import { MOCK_CASES, UNIVERSAL_BASE_NON_ROTATING_DATA, UNIVERSAL_BASE_ROTATING_DATA, PRE_MILLED_BLANKS_DATA, PRE_MILLED_DESCRIPTIONS, UNIVERSAL_BASE_ROTATING_CC_DATA, UNIVERSAL_BASE_ROTATING_BRANEMARK_DATA, UNIVERSAL_BASE_ROTATING_TRICHANNEL_DATA, UNIVERSAL_MULTI_UNIT_RECTO_DATA, UNIVERSAL_MULTI_UNIT_CONICO_DATA, PILAR_UNIVERSAL_ON1_NO_ROTATORIO_DATA, PILAR_UNIVERSAL_ON1_ROTATORIO_DATA, N1_BASE_UNITARIA_NO_ROTATORIO_DATA, N1_BASE_PUENTE_ROTATORIO_DATA, N1_TCC_UNITARIA_NO_ROTATORIA_DATA, ZIRCONIA_BRIDGE_DATA, ZIRCONIA_BRIDGE_CC_DATA, ZIRCONIA_BRIDGE_BRANEMARK_DATA, ZIRCONIA_BRIDGE_TRICHANNEL_DATA, REFERENCE_IMAGE_MAP, PRE_MILLED_BLANKS_N1_TCC_DATA, N1_TCC_CASE_DATA, ELOS_TOOLS_DATA, UNIVERSAL_BASE_NON_ROTATING_CC_DATA, UNIVERSAL_BASE_NON_ROTATING_BRANEMARK_DATA, UNIVERSAL_BASE_NON_ROTATING_TRICHANNEL_DATA, UNIVERSAL_BASE_ROTATING_CONICO_CC_DATA, UNIVERSAL_BASE_ROTATING_CONICO_BRANEMARK_DATA, UNIVERSAL_BASE_ROTATING_CONICO_TRICHANNEL_DATA, MULTI_UNIT_CONNECTION_DATA, PROCERA_FCZ_IMPLANT_CROWN_DATA, PROCERA_TITANIUM_CC_DATA, PROCERA_TITANIUM_BRANEMARK_DATA, PROCERA_TITANIUM_TRICHANNEL_DATA, PROCERA_TITANIUM_ASC_CC_DATA, PROCERA_TITANIUM_ASC_TRICHANNEL_DATA, PROCERA_ZIRCONIA_CC_DATA, PROCERA_ZIRCONIA_BRANEMARK_DATA, PROCERA_ZIRCONIA_TRICHANNEL_DATA, PROCERA_TITANIUM_BRIDGE_CC_DATA, PROCERA_TITANIUM_BRIDGE_BRANEMARK_DATA, PROCERA_TITANIUM_BRIDGE_TRICHANNEL_UPDATED_DATA, NOBELPROCERA_TITANIUM_BAR_CC_DATA, NOBELPROCERA_TITANIUM_BAR_BRANEMARK_DATA, NOBELPROCERA_TITANIUM_BAR_TRICHANNEL_DATA, NOBEL_PEARL_COMPONENTS_DATA, MUA_XEAL_CC_RECTO_DATA, MUA_XEAL_CC_ANGULADO_DATA, MUA_XEAL_N1_TCC_RECTO_DATA, MUA_XEAL_N1_TCC_ANGULADO_DATA, MUA_BRANEMARK_RECTO_DATA, MUA_BRANEMARK_ANGULADO_DATA, MUA_TRICHANNEL_RECTO_DATA, MUA_TRICHANNEL_ANGULADO_DATA, TRI_CHANNEL_TABLE_DATA, MUA_OTRAS_MARCAS_ASTRA_EV_DATA, MUA_OTRAS_MARCAS_ASTRA_OSSEOSPEED_DATA, MUA_OTRAS_MARCAS_BIOHORIZONS_DATA, MUA_OTRAS_MARCAS_DENTIUM_DATA, MUA_OTRAS_MARCAS_NEODENT_DATA, MUA_OTRAS_MARCAS_OSSTEM_DATA, MUA_OTRAS_MARCAS_STRAUMANN_BL_DATA, MUA_OTRAS_MARCAS_STRAUMANN_BLX_DATA, MUA_OTRAS_MARCAS_ZIMMER_DATA, MUA_OTRAS_MARCAS_3I_DATA } from './constants';
import { translations } from './translations';
import { caseDescriptions } from './prescripcion';
import { DentalCase, Filters, RestorationType, ConnectionType, CaseStatus, Language, SoftwareType } from './types';
import { DownloadIcon, InfoIcon, MagnifyingGlassIcon, ExternalLinkIcon, FilterIcon, ArrowRightIcon, WhatsAppIcon, CalendarIcon, EmailIcon, PhoneIcon, ClipboardIcon, CheckIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from './components/icons';
import CaseDetailIcons from './components/CaseDetailIcons';
import ConnectionSelector from './components/ConnectionSelector';
import BotonesModalContent from './components/BotonesModalContent';
import ExosModalContent from './components/ExosModalContent';
import IntroModal from './components/IntroModal';
import ResourceButtons from './components/ResourceButtons';
import DownloadCenterModalContent from './components/DownloadCenterModalContent';
import AssistantModalContent, { AssistantSelections } from './components/AssistantModalContent';
import FilterTooltip from './components/FilterTooltip';

const getStorePath = (country: Language) => {
    switch (country) {
      case 'fr': return 'fr/fr';
      case 'pt': return 'pt/pt';
      case 'sv': return 'se/se';
      default: return 'es/es';
    }
};

const generateSearchableString = (data: any): string => {
    if (!data) return '';
    if (Array.isArray(data)) {
        return data.map(item => generateSearchableString(item)).join(' ');
    }
    if (typeof data === 'object') {
        return Object.values(data).map(value => generateSearchableString(value)).join(' ');
    }
    return String(data);
};

const TemporalAbutmentsTables: React.FC<{ storeCountry: Language }> = ({ storeCountry }) => {
    const renderCell = (ref: string | undefined) => {
        if (!ref || ref === '-') return <span className="text-slate-500">—</span>;
        const storePath = getStorePath(storeCountry);
        const searchTerm = ref.replace('*', '');
        const url = `https://store.nobelbiocare.com/${storePath}/catalogsearch/result/?q=${encodeURIComponent(searchTerm)}`;
        return (
          <a href={url} className="font-semibold text-[color:var(--accent-primary)] hover:text-[color:var(--accent-primary-hover)] hover:underline transition-colors" target="_blank" rel="noopener noreferrer">
            {ref}
          </a>
        );
    };

    const thClass = "px-3 py-2 text-center text-[10px] font-semibold text-slate-700 uppercase tracking-wider";
    const thClassLeft = `${thClass} text-left`;
    const tdClass = "px-3 py-2 whitespace-nowrap text-center text-slate-600";
    const tdClassHeader = "px-3 py-2 whitespace-nowrap font-medium text-slate-800 text-left";
    const trClass = "hover:bg-slate-50";

    return (
        <div className="space-y-8 mt-6">
            <div>
                <div className="flex items-center gap-4 mb-3">
                    <img src="https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/6/36664_00_57c0.png" alt="Pilar temporal Unitarios (No rotatorio) para CC Conical Connection" className="w-16 h-16 object-contain rounded-md border p-1 bg-white shadow-sm" />
                    <h3 className="text-xl font-semibold text-slate-800">Pilar temporal Unitarios (No rotatorio) para CC Conical Connection</h3>
                </div>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
                    <table className="min-w-full text-[10px]">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className={thClassLeft} rowSpan={2}></th>
                                <th className={thClass} colSpan={4}>Unitarios (No rotatorio)</th>
                            </tr>
                            <tr>
                                <th className={thClass}>1.5 mm</th>
                                <th className={thClass}>3 mm</th>
                                <th className={thClass}>1.5 mm snap</th>
                                <th className={thClass}>3 mm snap</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            <tr className={trClass}><td className={tdClassHeader}>3.0¹</td><td className={tdClass}>{renderCell('36779')}</td><td className={tdClass}>{renderCell('-')}</td><td className={tdClass}>{renderCell('-')}</td><td className={tdClass}>{renderCell('-')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader} style={{ color: '#A7358B', fontWeight: 'bold' }}>NP</td><td className={tdClass}>{renderCell('36663')}</td><td className={tdClass}>{renderCell('-')}</td><td className={tdClass}>{renderCell('38760')}</td><td className={tdClass}>{renderCell('38847')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader} style={{ color: '#FECD50', fontWeight: 'bold' }}>RP</td><td className={tdClass}>{renderCell('36664')}</td><td className={tdClass}>{renderCell('-')}</td><td className={tdClass}>{renderCell('38761')}</td><td className={tdClass}>{renderCell('38848')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader} style={{ color: '#245BA7', fontWeight: 'bold' }}>WP</td><td className={tdClass}>{renderCell('37823')}</td><td className={tdClass}>{renderCell('37824')}</td><td className={tdClass}>{renderCell('38762')}</td><td className={tdClass}>{renderCell('38849')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader}>Destornillador</td><td className={tdClass} colSpan={4}>{renderCell('Unigrip')}</td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 text-right">Torque manual. Tornillo Clínico incluido *Torque 15Ncm</p>
            </div>

            <div>
                <div className="flex items-center gap-4 mb-3">
                    <img src="https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/6/36662_00_58aa.png" alt="Pilar temporal Puentes (rotatorios) para CC Conical Connection" className="w-16 h-16 object-contain rounded-md border p-1 bg-white shadow-sm" />
                    <h3 className="text-xl font-semibold text-slate-800">Pilar temporal Puentes (rotatorios) para CC Conical Connection</h3>
                </div>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
                    <table className="min-w-full text-[10px]">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr><th className={thClassLeft}></th><th className={thClass}>1.5 mm</th><th className={thClass}>3 mm</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            <tr className={trClass}><td className={tdClassHeader}>3.0¹</td><td className={tdClass}>{renderCell('-')}</td><td className={tdClass}>{renderCell('-')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader} style={{ color: '#A7358B', fontWeight: 'bold' }}>NP</td><td className={tdClass}>{renderCell('36661')}</td><td className={tdClass}>{renderCell('-')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader} style={{ color: '#FECD50', fontWeight: 'bold' }}>RP</td><td className={tdClass}>{renderCell('36662')}</td><td className={tdClass}>{renderCell('-')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader} style={{ color: '#245BA7', fontWeight: 'bold' }}>WP</td><td className={tdClass}>{renderCell('37825')}</td><td className={tdClass}>{renderCell('37826')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader}>Destornillador</td><td className={tdClass} colSpan={2}>{renderCell('Unigrip')}</td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 text-right">Torque 35 Ncm. Tornillo Clínico incluido. *Torque 15Ncm</p>
            </div>

            <div>
                <div className="flex items-center gap-4 mb-3">
                    <img src="https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/2/9/29046_cc01.png" alt="Pilar temporal para Multi-unit" className="w-16 h-16 object-contain rounded-md border p-1 bg-white shadow-sm" />
                    <h3 className="text-xl font-semibold text-slate-800">Pilar temporal para Multi-unit</h3>
                </div>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
                    <table className="w-full text-[10px]">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className={thClassLeft}></th>
                                <th className={thClass}>Regular</th>
                                <th className={thClass}>Snap</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            <tr className={trClass}>
                                <td className={tdClassHeader} style={{ color: '#A7358B', fontWeight: 'bold' }}>NP</td>
                                <td className={tdClass}>{renderCell('29046')}</td>
                                <td className={tdClass}>{renderCell('38915')}</td>
                            </tr>
                            <tr className={trClass}>
                                <td className={tdClassHeader} style={{ color: '#FECD50', fontWeight: 'bold' }}>RP / WP</td>
                                <td className={tdClass}>{renderCell('29046')}</td>
                                <td className={tdClass}>{renderCell('-')}</td>
                            </tr>
                            <tr className={trClass}>
                                <td className={tdClassHeader}>Solo Hex ext. <span style={{ color: '#245BA7', fontWeight: 'bold' }}>WP</span></td>
                                <td className={tdClass}>{renderCell('29047')}</td>
                                <td className={tdClass}>{renderCell('-')}</td>
                            </tr>
                            <tr className={trClass}>
                                <td className={tdClassHeader}>Destornillador</td>
                                <td className={tdClass}>{renderCell('Unigrip')}</td>
                                <td className={tdClass}>{renderCell('Unigrip')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 text-right">Torque 15 Ncm. Tornillo Clínico incluido.</p>
            </div>

            <div>
                 <div className="flex items-center gap-4 mb-3">
                    <img src="https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/8/38703_1_2b11.png" alt="Pilar temporal para On1" className="w-16 h-16 object-contain rounded-md border p-1 bg-white shadow-sm" />
                    <h3 className="text-xl font-semibold text-slate-800">Pilar temporal para On1</h3>
                </div>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
                    <table className="w-full text-[10px]">
                        <thead className="bg-slate-50 border-b border-slate-200"><tr><th className={thClassLeft}></th><th className={thClass}>Unitarios</th><th className={thClass}>Puentes</th></tr></thead>
                        <tbody className="divide-y divide-slate-200">
                            <tr className={trClass}><td className={tdClassHeader} style={{ color: '#A7358B', fontWeight: 'bold' }}>NP</td><td className={tdClass}>{renderCell('38701')}</td><td className={tdClass}>{renderCell('38702')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader} style={{ color: '#FECD50', fontWeight: 'bold' }}>RP</td><td className={tdClass}>{renderCell('38703')}</td><td className={tdClass}>{renderCell('38704')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader} style={{ color: '#245BA7', fontWeight: 'bold' }}>WP</td><td className={tdClass}>{renderCell('38705')}</td><td className={tdClass}>{renderCell('38706')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader}>Destornillador</td><td className={tdClass} colSpan={2}>{renderCell('Unigrip')}</td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 text-right">Torque 35 Ncm. Tornillo Clínico incluido.</p>
            </div>
            <div>
                 <div className="flex items-center gap-4 mb-3">
                    <img src="https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/300936_9935.png" alt="Pilar temporal Unitarios (No rotatorio) N1 TCC" className="w-16 h-16 object-contain rounded-md border p-1 bg-white shadow-sm" />
                    <h3 className="text-xl font-semibold text-slate-800">Pilar temporal Unitarios (No rotatorio) N1 TCC</h3>
                </div>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
                    <table className="w-full text-[10px]">
                        <thead className="bg-slate-50 border-b border-slate-200"><tr><th className={thClassLeft}></th><th className={thClass}>1.5 mm</th><th className={thClass}>3 mm</th></tr></thead>
                        <tbody className="divide-y divide-slate-200">
                            <tr className={trClass}><td className={tdClassHeader} style={{ color: '#A7358B', fontWeight: 'bold' }}>NP</td><td className={tdClass}>{renderCell('300934')}</td><td className={tdClass}>{renderCell('300935')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader} style={{ color: '#FECD50', fontWeight: 'bold' }}>RP</td><td className={tdClass}>{renderCell('300936')}</td><td className={tdClass}>{renderCell('300937')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader}>Destornillador</td><td className={tdClass} colSpan={2}>{renderCell('Omnigrip-Mini')}</td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 text-right">Torque 20 Ncm. Tornillo Clínico incluido</p>
            </div>
             <div>
                <h3 className="text-xl font-semibold mb-3 text-slate-800">Pilar temporal sobre base N1</h3>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
                    <table className="w-full text-[10px]">
                        <thead className="bg-slate-50 border-b border-slate-200"><tr><th className={thClassLeft}></th><th className={thClass}>Unitarios</th><th className={thClass}>Puentes</th></tr></thead>
                        <tbody className="divide-y divide-slate-200">
                            <tr className={trClass}><td className={tdClassHeader} style={{ color: '#A7358B', fontWeight: 'bold' }}>NP</td><td className={tdClass}>{renderCell('300994')}</td><td className={tdClass}>{renderCell('300996')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader} style={{ color: '#FECD50', fontWeight: 'bold' }}>RP</td><td className={tdClass}>{renderCell('300995')}</td><td className={tdClass}>{renderCell('300997')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader}>Destornillador</td><td className={tdClass} colSpan={2}>{renderCell('Omnigrip-Mini')}</td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 text-right">Torque 20 Ncm. Tornillo Clínico incluido</p>
            </div>
            <div>
                <div className="flex items-center gap-4 mb-3">
                    <img src="https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/2/9/29030_acdf.png" alt="Pilar temporal Unitarios (No rotatorio) para Hex. Externo" className="w-16 h-16 object-contain rounded-md border p-1 bg-white shadow-sm" />
                    <h3 className="text-xl font-semibold text-slate-800">Pilar temporal Unitarios (No rotatorio) para Hex. Externo</h3>
                </div>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
                    <table className="w-full text-[10px]">
                        <thead className="bg-slate-50 border-b border-slate-200"><tr><th className={thClassLeft}></th><th className={thClass}>Unitarios</th><th className={thClass}>Puentes</th></tr></thead>
                        <tbody className="divide-y divide-slate-200">
                            <tr className={trClass}><td className={tdClassHeader} style={{ color: '#A7358B', fontWeight: 'bold' }}>NP</td><td className={tdClass}>{renderCell('29028')}</td><td className={tdClass}>{renderCell('29029')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader} style={{ color: '#FECD50', fontWeight: 'bold' }}>RP</td><td className={tdClass}>{renderCell('29030')}</td><td className={tdClass}>{renderCell('29031')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader} style={{ color: '#245BA7', fontWeight: 'bold' }}>WP</td><td className={tdClass}>{renderCell('29032')}</td><td className={tdClass}>{renderCell('29033')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader}>Destornillador</td><td className={tdClass} colSpan={2}>{renderCell('Unigrip')}</td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 text-right">Torque 35 Ncm. Tornillo Clínico incluido.</p>
            </div>
             <div>
                <div className="flex items-center gap-4 mb-3">
                    <img src="https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/2/9/29036_77b0.png" alt="Pilar temporal para Tri-Channel" className="w-16 h-16 object-contain rounded-md border p-1 bg-white shadow-sm" />
                    <h3 className="text-xl font-semibold text-slate-800">Pilar temporal para Tri-Channel</h3>
                </div>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
                    <table className="w-full text-[10px]">
                        <thead className="bg-slate-50 border-b border-slate-200"><tr><th className={thClassLeft}></th><th className={thClass}>Unitarios</th><th className={thClass}>Puentes</th></tr></thead>
                        <tbody className="divide-y divide-slate-200">
                            <tr className={trClass}><td className={tdClassHeader} style={{ color: '#A7358B', fontWeight: 'bold' }}>NP</td><td className={tdClass}>{renderCell('36834')}</td><td className={tdClass}>{renderCell('36835')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader} style={{ color: '#FECD50', fontWeight: 'bold' }}>RP</td><td className={tdClass}>{renderCell('29036')}</td><td className={tdClass}>{renderCell('29037')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader} style={{ color: '#245BA7', fontWeight: 'bold' }}>WP</td><td className={tdClass}>{renderCell('29038')}</td><td className={tdClass}>{renderCell('29039')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader}>6</td><td className={tdClass}>{renderCell('31456')}</td><td className={tdClass}>{renderCell('31457')}</td></tr>
                            <tr className={trClass}><td className={tdClassHeader}>Destornillador</td><td className={tdClass} colSpan={2}>{renderCell('Unigrip')}</td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 text-right">Torque 35 Ncm. Tornillo clínico incluido.</p>
            </div>
        </div>
    );
};


const caseToTablesMap: { [key: string]: any[] } = {
    'EXO021': [UNIVERSAL_BASE_NON_ROTATING_DATA],
    'EXO022': [UNIVERSAL_BASE_ROTATING_DATA, UNIVERSAL_MULTI_UNIT_RECTO_DATA, UNIVERSAL_MULTI_UNIT_CONICO_DATA],
    'EXO016': [PRE_MILLED_BLANKS_DATA, PRE_MILLED_BLANKS_N1_TCC_DATA],
    'EXO024': [ZIRCONIA_BRIDGE_DATA, MULTI_UNIT_CONNECTION_DATA],
    'EXO025': [ZIRCONIA_BRIDGE_DATA, MULTI_UNIT_CONNECTION_DATA],
    'EXO026': [PROCERA_FCZ_IMPLANT_CROWN_DATA],
    'EXO028': [PROCERA_TITANIUM_ASC_CC_DATA, PROCERA_TITANIUM_ASC_TRICHANNEL_DATA],
    'EXO027': [PROCERA_TITANIUM_CC_DATA, PROCERA_TITANIUM_BRANEMARK_DATA, PROCERA_TITANIUM_TRICHANNEL_DATA],
    'EXO030': [PROCERA_ZIRCONIA_CC_DATA, PROCERA_ZIRCONIA_BRANEMARK_DATA, PROCERA_ZIRCONIA_TRICHANNEL_DATA],
    'EXO029': [PROCERA_TITANIUM_BRIDGE_CC_DATA, PROCERA_TITANIUM_BRIDGE_BRANEMARK_DATA, PROCERA_TITANIUM_BRIDGE_TRICHANNEL_UPDATED_DATA, MULTI_UNIT_CONNECTION_DATA],
    'EXO032': [NOBELPROCERA_TITANIUM_BAR_CC_DATA, NOBELPROCERA_TITANIUM_BAR_BRANEMARK_DATA, NOBELPROCERA_TITANIUM_BAR_TRICHANNEL_DATA, MULTI_UNIT_CONNECTION_DATA],
    'EXO013': [N1_BASE_UNITARIA_NO_ROTATORIO_DATA, N1_BASE_PUENTE_ROTATORIO_DATA],
    'EXO006': [N1_TCC_UNITARIA_NO_ROTATORIA_DATA],
    'EXO014': [PROCERA_TITANIUM_CC_DATA, N1_TCC_UNITARIA_NO_ROTATORIA_DATA, N1_BASE_UNITARIA_NO_ROTATORIO_DATA, PROCERA_TITANIUM_BRANEMARK_DATA, PROCERA_TITANIUM_TRICHANNEL_DATA],
    'EXO019': [PILAR_UNIVERSAL_ON1_NO_ROTATORIO_DATA, PILAR_UNIVERSAL_ON1_ROTATORIO_DATA],
    'EXO020': [NOBEL_PEARL_COMPONENTS_DATA],
    'EXO034': [MUA_XEAL_CC_RECTO_DATA, MUA_XEAL_CC_ANGULADO_DATA, MUA_XEAL_N1_TCC_RECTO_DATA, MUA_XEAL_N1_TCC_ANGULADO_DATA, MUA_BRANEMARK_RECTO_DATA, MUA_BRANEMARK_ANGULADO_DATA, MUA_TRICHANNEL_RECTO_DATA, MUA_TRICHANNEL_ANGULADO_DATA, MUA_OTRAS_MARCAS_ASTRA_EV_DATA, MUA_OTRAS_MARCAS_ASTRA_OSSEOSPEED_DATA, MUA_OTRAS_MARCAS_BIOHORIZONS_DATA, MUA_OTRAS_MARCAS_DENTIUM_DATA, MUA_OTRAS_MARCAS_NEODENT_DATA, MUA_OTRAS_MARCAS_OSSTEM_DATA, MUA_OTRAS_MARCAS_STRAUMANN_BL_DATA, MUA_OTRAS_MARCAS_STRAUMANN_BLX_DATA, MUA_OTRAS_MARCAS_ZIMMER_DATA, MUA_OTRAS_MARCAS_3I_DATA],
};

const searchableDataMap: { [key: string]: string } = {};
for (const caseId in caseToTablesMap) {
    searchableDataMap[caseId] = generateSearchableString(caseToTablesMap[caseId]).toLowerCase();
}


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
  const newBookingUrl = "https://outlook.office365.com/book/SoporteTcnicoNobelBiocare@dentalco.org/";
  const newQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent(newBookingUrl)}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Block 1: WhatsApp */}
        <div className="bg-slate-800/70 backdrop-blur-sm p-4 rounded-lg border border-slate-600 flex flex-col text-white">
          <div>
            <h4 className="font-bold text-lg text-white mb-2 flex items-center gap-2">
              <WhatsAppIcon className="h-6 w-6 text-green-400" /> {t.support_modal_whatsapp_title}
            </h4>
            <p className="text-slate-300 mb-2">{t.support_modal_intro}</p>
          </div>
          <div className="mt-auto">
            <div className="flex justify-center my-4">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=https://wa.me/16573635454" alt="WhatsApp QR Code" className="w-32 h-32 bg-white p-1 rounded-md" />
            </div>
            <p className="text-slate-400 text-center text-xs">{t.support_modal_manual} <br /> <b>{t.support_modal_contact_name}</b> <br /> <b>+1 (657) 363-5454</b> ({t.support_modal_whatsapp_only})</p>
          </div>
        </div>

        {/* Block 2: Calendar */}
        <div className="bg-slate-800/70 backdrop-blur-sm p-4 rounded-lg border border-slate-600 flex flex-col text-white">
          <div>
            <h4 className="font-bold text-lg text-white mb-2 flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-blue-400" /> {t.support_modal_book_title}
            </h4>
            <p className="text-slate-300 mb-2">{t.support_modal_book_intro}</p>
          </div>
          <div className="mt-auto">
            <div className="flex justify-center my-4">
              <img src={newQrUrl} alt="Calendar QR Code" className="w-32 h-32 bg-white p-1 rounded-md" />
            </div>
            <a href={newBookingUrl} target="_blank" rel="noopener noreferrer" className="text-center block text-blue-400 hover:underline">{t.support_modal_book_link}</a>
          </div>
        </div>
        
        {/* Block 3: Email */}
        <div className="bg-slate-800/70 backdrop-blur-sm p-4 rounded-lg border border-slate-600 flex flex-col text-white">
          <h4 className="font-bold text-lg text-white mb-2 flex items-center gap-2">
            <EmailIcon className="h-6 w-6 text-red-400" /> {t.support_modal_email_title}
          </h4>
          <p className="text-slate-300 mb-4 flex-grow">{t.support_modal_email_intro}</p>
          <a href={`mailto:${emailAddress}`} className="text-center block text-blue-400 hover:underline">{t.support_modal_email_link}</a>
          <div className="text-center text-slate-400 my-2">{t.support_modal_email_address_text}</div>
          <div className="relative mt-1">
            <input type="text" readOnly value={emailAddress} className="w-full bg-slate-700 border-slate-500 rounded-md text-center p-2 text-slate-200" />
            <button onClick={() => copyToClipboard(emailAddress, 'email')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white" aria-label={t.copy_email_aria_label}>
              {copied === 'email' ? <CheckIcon className="h-5 w-5"/> : <ClipboardIcon className="h-5 w-5"/>}
            </button>
          </div>
        </div>

        {/* Block 4: Phone */}
        <div className="bg-slate-800/70 backdrop-blur-sm p-4 rounded-lg border border-slate-600 flex flex-col text-white">
          <h4 className="font-bold text-lg text-white mb-2 flex items-center gap-2">
            <PhoneIcon className="h-6 w-6 text-purple-400" /> {t.support_modal_phone_title}
          </h4>
          <div className="text-center text-slate-300 mb-4 whitespace-pre-line flex-grow">{t.support_modal_phone_schedule}</div>
          <a href={`tel:${phoneTel}`} className="w-full text-center py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors">{t.support_modal_phone_cta}</a>
          <div className="relative mt-3">
            <input type="text" readOnly value={phoneNumber} className="w-full bg-slate-700 border-slate-500 rounded-md text-center p-2 text-slate-200" />
            <button onClick={() => copyToClipboard(phoneNumber, 'phone')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white" aria-label={t.copy_phone_aria_label}>
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
};

const TablaOtrasMarcas: React.FC<{
  title: string;
  headers: string[];
  data: any[];
  t: any;
  storeCountry: Language;
  notes?: string;
}> = ({ title, headers, data, t, storeCountry, notes }) => {
    const dataWithRowSpans = useMemo(() => {
        return data.map((row, index, arr) => {
            if (index === 0 || arr[index - 1].connection !== row.connection) {
                let span = 1;
                for (let i = index + 1; i < arr.length; i++) {
                    if (arr[i].connection === row.connection) {
                        span++;
                    } else {
                        break;
                    }
                }
                return { ...row, rowSpan: span };
            }
            return { ...row, rowSpan: 0 };
        });
    }, [data]);

    const renderCell = (ref: string) => {
        if (!ref || ref === '-') return <span className="text-slate-400">—</span>;
        const storePath = getStorePath(storeCountry);
        const searchTerm = ref.replace(/[¹*]/g, '').trim();
        const url = `https://store.nobelbiocare.com/${storePath}/catalogsearch/result/?q=${encodeURIComponent(searchTerm)}`;
        return (
            <a href={url} className="font-semibold text-[color:var(--accent-primary)] hover:text-[color:var(--accent-primary-hover)] hover:underline transition-colors" target="_blank" rel="noopener noreferrer">
                {ref}
            </a>
        );
    };

    return (
        <div className="mb-8 last:mb-0">
            <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
            <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
                <table className="min-w-full text-xs">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-3 py-2 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Conexión</th>
                            <th className="px-3 py-2 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Ángulo</th>
                            {headers.map(h => <th key={h} className="px-3 py-2 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">{h}</th>)}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100">
                        {dataWithRowSpans.map((row, index) => (
                            <tr key={index} className="hover:bg-slate-50">
                                {row.rowSpan > 0 && (
                                    <td rowSpan={row.rowSpan} className="px-3 py-2 whitespace-nowrap font-medium text-slate-800 text-left border-r border-slate-100 align-top">{row.connection}</td>
                                )}
                                <td className="px-3 py-2 text-center whitespace-nowrap text-slate-600">{row.angle}</td>
                                {headers.map(header => (
                                    <td key={header} className="px-3 py-2 text-center whitespace-nowrap text-slate-600">
                                        {renderCell(row[header])}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {notes && <p className="text-xs text-slate-600 mt-2">{notes}</p>}
        </div>
    );
};


const App: React.FC = () => {
    const [filters, setFilters] = useState<Filters>({ searchText: '', status: [], type: '', connectionType: [], softwareType: '', angulation: '' });
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
    const [isModalSpeaking, setIsModalSpeaking] = useState(false);
    const caseRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const menuRef = useRef<HTMLDivElement>(null);

    const t = translations[language];
    const initialFilters: Filters = { searchText: '', status: [], type: '', connectionType: [], softwareType: '', angulation: '' };
    
    useEffect(() => {
        // User and Visit Tracking
        let userId = localStorage.getItem('appUserId');
        if (!userId) {
            userId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
            localStorage.setItem('appUserId', userId);
        }

        const visitsRaw = localStorage.getItem('appVisits');
        const visits = visitsRaw ? JSON.parse(visitsRaw) : [];

        visits.push({
            userId: userId,
            timestamp: new Date().toISOString(),
        });

        localStorage.setItem('appVisits', JSON.stringify(visits));
    }, []);
    
    useEffect(() => {
        if (!isModalOpen) {
            window.speechSynthesis.cancel();
            setIsModalSpeaking(false);
        }
    }, [isModalOpen]);

    const handleCloseModal = () => setIsModalOpen(false);

    const handleOpenSelecProLocal = () => {
        setModalTitle(t.modal.selec_pro_local_title);
        setModalContent(<SelecProLocal t={t.modal} onClose={handleCloseModal} language={language} />);
        setModalId('modal-selec-pro-local');
    };

    const handleOpenDownloadsHelpModal = () => {
        if (language === 'fr' || language === 'sv') {
            setModalTitle(t.modal.descargas_procera_modal_title);
            setModalContent(<DescargasOtherProcera t={t.modal} onClose={handleCloseModal} language={language} onOpenSelecProLocal={handleOpenSelecProLocal} />);
            setModalId('modal-support-frsv');
        } else {
            setModalTitle(t.modal.descargas_procera_modal_title);
            setModalContent(<DescargasProceraModalContent t={t.modal} onClose={handleCloseModal} language={language} onOpenSelecProLocal={handleOpenSelecProLocal} />);
            setModalId('modal-support-espt');
        }
        setIsModalOpen(true);
        setModalFooter(null);
    };

    const filteredCases = useMemo(() => {
        return MOCK_CASES.filter(c => {
            const searchLower = filters.searchText.toLowerCase();
            const nameMatch = c.patientName[language].toLowerCase().includes(searchLower);
            const idMatch = c.id.toLowerCase().includes(searchLower);
            const refMatch = c.reference.toLowerCase().includes(searchLower);
            const tableDataMatch = searchableDataMap[c.id]?.includes(searchLower) || false;

            const statusMatch = filters.status.length === 0 || filters.status.includes(c.status);
            const typeMatch = !filters.type || c.restorationType.includes(filters.type);
            const connectionMatch = filters.connectionType.length === 0 || filters.connectionType.some(ct => c.connectionType === ct || c.compatibleConnections?.includes(ct));
            const angulationMatch = !filters.angulation ||
                (filters.angulation === 'true' && c.angulacion === true) ||
                (filters.angulation === 'false' && c.angulacion !== 'N/A');

            return (nameMatch || idMatch || refMatch || tableDataMatch) && statusMatch && typeMatch && connectionMatch && angulationMatch;
        }).sort((a, b) => a.caseNumber - b.caseNumber);
    }, [filters.searchText, filters.status, filters.type, filters.connectionType, filters.angulation, language]);

    const isAnyFilterActive = useMemo(() => {
        return (
            filters.searchText !== '' ||
            filters.status.length > 0 ||
            filters.type !== '' ||
            filters.connectionType.length > 0 ||
            filters.softwareType !== '' ||
            filters.angulation !== ''
        );
    }, [filters]);
    
    const handleFilterChange = (name: keyof Filters, value: string | string[]) => setFilters(prev => ({ ...prev, [name]: value }));
    const handleResetFilters = () => { setFilters(initialFilters); };
    
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
        status: assistantFilters.status,
        angulation: assistantFilters.angulation,
        connectionType: assistantFilters.connections,
      });
      handleCloseModal();
    };

    const handleAssistantClick = () => {
        setModalTitle(t.modal.assistant_title);
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
        setModalId('modal-assistant');
        setModalFooter(null);
    };

    const handleModalSpeak = (text: string, lang: Language) => {
        if (!text || isModalSpeaking) return;

        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        const voice = voices.find(v => v.lang.startsWith(lang));
        if (voice) {
            utterance.voice = voice;
        } else {
            utterance.lang = lang;
        }
        
        utterance.rate = 1.2;

        utterance.onstart = () => setIsModalSpeaking(true);
        utterance.onend = () => setIsModalSpeaking(false);
        utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
            setIsModalSpeaking(false);
            console.error("Speech synthesis error:", event.error);
        };

        const synth = window.speechSynthesis;
        synth.cancel();
        if (synth.paused) {
            synth.resume();
        }
        synth.speak(utterance);
    };

    const handleModalStopSpeaking = () => {
        if (isModalSpeaking) {
            window.speechSynthesis.cancel();
            setIsModalSpeaking(false);
        }
    };


    const handleOpenModal = (caseData: DentalCase, initialConnection?: string) => {
        setModalCaseData(caseData);
        setModalTitle(caseData.patientName[language]);
        setModalId(`modal-${caseData.id}`);
        setModalFooter(null);

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
        
        let descriptionComponent = null;
        if (caseData.id === 'EXO033') {
            const descriptionData = caseDescriptions[caseData.id];
            const descriptionText = descriptionData?.description[language] || descriptionData?.description['es'];
            if (descriptionText) {
                const storePath = getStorePath(storeCountry);
                const articleNumber = '302502';
                const url = `https://store.nobelbiocare.com/${storePath}/catalogsearch/result/?q=${articleNumber}`;
                const parts = descriptionText.split(articleNumber);

                descriptionComponent = (
                    <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                        <div className="flex items-start gap-3">
                            <button
                                onClick={() => isModalSpeaking ? handleModalStopSpeaking() : handleModalSpeak(descriptionText, language)}
                                className="text-slate-500 hover:text-slate-800 transition-colors flex-shrink-0 mt-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary)] rounded-full p-1"
                                aria-label={isModalSpeaking ? t.caseCard.stop_speech_label : t.caseCard.text_to_speech_label}
                                title={isModalSpeaking ? t.caseCard.stop_speech_label : t.caseCard.text_to_speech_label}
                            >
                                {isModalSpeaking ? <SpeakerXMarkIcon className="h-6 w-6" /> : <SpeakerWaveIcon className="h-6 w-6" />}
                            </button>
                            <p className="text-sm text-slate-700 whitespace-pre-wrap">
                                {parts.length > 1 ? (
                                    <>
                                        {parts[0]}
                                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1">
                                            {articleNumber}
                                            <ExternalLinkIcon className="h-3 w-3" />
                                        </a>
                                        {parts[1]}
                                    </>
                                ) : (
                                    descriptionText
                                )}
                            </p>
                        </div>
                    </div>
                );
            }
        }
        
        let content: React.ReactNode = <p>{t.modal.no_components_description}</p>;

        switch(caseData.id) {
            case 'EXO021':
            case 'EXO022': {
                const Content = () => {
                    const connections = caseData.compatibleConnections?.map(c => c.toString()) || [];
                    const [selectedConn, setSelectedConn] = useState(initialConnection || connections[0]);
                    let tableData;
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
                            case ConnectionType.MultiUnit: tableData = <><TablaComponentesConexion data={UNIVERSAL_MULTI_UNIT_RECTO_DATA} title={t.universalMultiUnitTable.rectoTitle} platformHeaders={['np_rp', 'wp']} {...commonTableProps} t={t.universalMultiUnitTable} footerText={t.universalMultiUnitTable.footerRecto} /><TablaComponentesConexion data={UNIVERSAL_MULTI_UNIT_CONICO_DATA} title={t.universalMultiUnitTable.conicoTitle} platformHeaders={['np_rp', 'wp']} {...commonTableProps} t={t.universalMultiUnitTable} /></>; break;
                         }
                    }
                    return (
                        <div>
                            <CaseDetailIcons caseData={caseData} isModal t={t.caseCard} connectionTypeForTable={selectedConn} />
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
                    const connections = ['CC', ConnectionType.Branemark, 'Tri-channel', 'N1 TCC'];
                    const [selectedConn, setSelectedConn] = useState(initialConnection || 'CC');

                    const handleDataChange = (newData: any[]) => {
                        console.log("Data changed:", newData);
                    };

                    let tableContent = null;
                    if (selectedConn === 'N1 TCC') {
                        tableContent = <TablaComponentesConexion data={PRE_MILLED_BLANKS_N1_TCC_DATA} title={t.preMilledBlanksN1TCCTable.title} platformHeaders={['np', 'rp']} {...commonTableProps} t={t.preMilledBlanksN1TCCTable} />;
                    } else {
                        tableContent = <PreMilledBlanksPage 
                            t={t.preMilledBlanksTable}
                            storeCountry={storeCountry}
                            connectionType={selectedConn}
                            data={PRE_MILLED_BLANKS_DATA} 
                            onDataChange={handleDataChange}
                            imageUrl={N1_TCC_CASE_DATA.imageUrls[0]}
                        />;
                    }

                    return (
                        <div>
                            <CaseDetailIcons caseData={caseData} isModal t={t.caseCard} connectionTypeForTable={selectedConn} />
                            <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                            {tableContent}
                        </div>
                    );
                };
                content = <Content />;
                break;
            }
            case 'EXO024':
            case 'EXO025': {
                const Content = () => {
                    const connections = ['CC', 'Brånemark', 'Tri-channel', ConnectionType.MultiUnit];
                    const [selectedConn, setSelectedConn] = useState(initialConnection || 'CC');
                    let tableData;
                     switch(selectedConn){
                        case 'CC': tableData = <TablaComponentesConexion data={ZIRCONIA_BRIDGE_CC_DATA} title={t.zirconiaBridgeCCTable.title} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.proceraFCZImplantCrownTable} />; break;
                        case 'Brånemark': tableData = <TablaComponentesConexion data={ZIRCONIA_BRIDGE_BRANEMARK_DATA} title={t.zirconiaBridgeBranemarkTable.title} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.proceraFCZImplantCrownTable} />; break;
                        case 'Tri-channel': tableData = <TablaComponentesConexion data={ZIRCONIA_BRIDGE_TRICHANNEL_DATA} title={t.zirconiaBridgeTriChannelTable.title} platformHeaders={['np', 'rp', 'wp', '6.0']} {...commonTableProps} t={t.proceraFCZImplantCrownTable} />; break;
                        case ConnectionType.MultiUnit: tableData = <TablaComponentesConexion data={MULTI_UNIT_CONNECTION_DATA} title={t.universalMultiUnitTable.connectionTitle} platformHeaders={['np_rp', 'wp']} {...commonTableProps} t={t.universalMultiUnitTable} />; break;
                     }
                    return (
                        <div>
                            <CaseDetailIcons caseData={caseData} isModal t={t.caseCard} connectionTypeForTable={selectedConn} />
                            <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                            {tableData}
                        </div>
                    );
                };
                content = <Content />;
                break;
            }
            case 'EXO026': {
                content = (
                    <div>
                        <CaseDetailIcons caseData={caseData} isModal t={t.caseCard} />
                        <TablaComponentesConexion data={PROCERA_FCZ_IMPLANT_CROWN_DATA} title={t.proceraFCZImplantCrownTable.title} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.proceraFCZImplantCrownTable} />
                    </div>
                );
                break;
            }
            case 'EXO028': {
                 const Content = () => {
                    const connections = ['CC', 'Tri-channel'];
                    const [selectedConn, setSelectedConn] = useState(initialConnection || 'CC');
                    let tableData;
                     switch(selectedConn){
                        case 'CC': tableData = <TablaComponentesConexion data={PROCERA_TITANIUM_ASC_CC_DATA} title={t.proceraTitaniumAscPillarTable.ccTitle} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.proceraFCZImplantCrownTable} footerText={t.proceraTitaniumAscPillarTable.ccFooter} />; break;
                        case 'Tri-channel': tableData = <TablaComponentesConexion data={PROCERA_TITANIUM_ASC_TRICHANNEL_DATA} title={t.proceraTitaniumAscPillarTable.triChannelTitle} platformHeaders={['np', 'rp', 'wp', '6']} {...commonTableProps} t={t.proceraFCZImplantCrownTable} footerText={t.proceraTitaniumAscPillarTable.triChannelFooter} />; break;
                     }
                    return (
                        <div>
                            <CaseDetailIcons caseData={caseData} isModal t={t.caseCard} connectionTypeForTable={selectedConn} />
                            <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                            {tableData}
                        </div>
                    );
                };
                content = <Content />;
                break;
            }
             case 'EXO027': {
                 const Content = () => {
                    const connections = ['CC', 'Brånemark', 'Tri-channel'];
                    const [selectedConn, setSelectedConn] = useState(initialConnection || 'CC');
                    let tableData;
                     switch(selectedConn){
                        case 'CC': tableData = <TablaComponentesConexion data={PROCERA_TITANIUM_CC_DATA} title={t.proceraTitaniumPillarTable.ccTitle} platformHeaders={['3.0', 'np', 'rp', 'wp']} {...commonTableProps} t={t.proceraFCZImplantCrownTable} />; break;
                        case 'Brånemark': tableData = <TablaComponentesConexion data={PROCERA_TITANIUM_BRANEMARK_DATA} title={t.proceraTitaniumPillarTable.branemarkTitle} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.proceraFCZImplantCrownTable} />; break;
                        case 'Tri-channel': tableData = <TablaComponentesConexion data={PROCERA_TITANIUM_TRICHANNEL_DATA} title={t.proceraTitaniumPillarTable.triChannelTitle} platformHeaders={['np', 'rp', 'wp', '6']} {...commonTableProps} t={t.proceraFCZImplantCrownTable} />; break;
                     }
                    return (
                        <div>
                            <CaseDetailIcons caseData={caseData} isModal t={t.caseCard} connectionTypeForTable={selectedConn} />
                            <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                            {tableData}
                        </div>
                    );
                };
                content = <Content />;
                break;
            }
            case 'EXO030': {
                 const Content = () => {
                    const connections = ['CC', 'Brånemark', 'Tri-channel'];
                    const [selectedConn, setSelectedConn] = useState(initialConnection || 'CC');
                    let tableData;
                     switch(selectedConn){
                        case 'CC': tableData = <TablaComponentesConexion data={PROCERA_ZIRCONIA_CC_DATA} title={t.proceraZirconiaPillarTable.ccTitle} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.proceraFCZImplantCrownTable} />; break;
                        case 'Brånemark': tableData = <TablaComponentesConexion data={PROCERA_ZIRCONIA_BRANEMARK_DATA} title={t.proceraZirconiaPillarTable.branemarkTitle} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.proceraFCZImplantCrownTable} />; break;
                        case 'Tri-channel': tableData = <TablaComponentesConexion data={PROCERA_ZIRCONIA_TRICHANNEL_DATA} title={t.proceraZirconiaPillarTable.triChannelTitle} platformHeaders={['np', 'rp', 'wp', '6']} {...commonTableProps} t={t.proceraFCZImplantCrownTable} footerText={t.proceraZirconiaPillarTable.triChannelFooter} />; break;
                     }
                    return (
                        <div>
                           <CaseDetailIcons caseData={caseData} isModal t={t.caseCard} connectionTypeForTable={selectedConn} />
                           <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                           {tableData}
                        </div>
                    );
                };
                content = <Content />;
                break;
            }
            case 'EXO029': {
                 const Content = () => {
                    const connections = ['CC', 'Brånemark', 'Tri-channel', ConnectionType.MultiUnit];
                    const [selectedConn, setSelectedConn] = useState(initialConnection || 'CC');
                    let tableData;
                     switch(selectedConn){
                        case 'CC': tableData = <TablaComponentesConexion data={PROCERA_TITANIUM_BRIDGE_CC_DATA} title={t.proceraTitaniumBridgeTable.ccTitle} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.proceraFCZImplantCrownTable} />; break;
                        case 'Brånemark': tableData = <TablaComponentesConexion data={PROCERA_TITANIUM_BRIDGE_BRANEMARK_DATA} title={t.proceraTitaniumBridgeTable.branemarkTitle} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.proceraFCZImplantCrownTable} />; break;
                        case 'Tri-channel': tableData = <TablaComponentesConexion data={PROCERA_TITANIUM_BRIDGE_TRICHANNEL_UPDATED_DATA} title={t.proceraTitaniumBridgeTable.triChannelTitle} platformHeaders={['np', 'rp', 'wp', '6']} {...commonTableProps} t={t.nobelProceraTitaniumBarTable} />; break;
                        case ConnectionType.MultiUnit: tableData = <TablaComponentesConexion data={MULTI_UNIT_CONNECTION_DATA} title={t.universalMultiUnitTable.connectionTitle} platformHeaders={['np_rp', 'wp']} {...commonTableProps} t={t.universalMultiUnitTable} />; break;
                     }
                    return (
                        <div>
                           <CaseDetailIcons caseData={caseData} isModal t={t.caseCard} connectionTypeForTable={selectedConn} />
                           <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                           {tableData}
                        </div>
                    );
                };
                content = <Content />;
                break;
            }
             case 'EXO032': {
                 const Content = () => {
                    const connections = ['CC', 'Brånemark', 'Tri-channel', ConnectionType.MultiUnit];
                    const [selectedConn, setSelectedConn] = useState(initialConnection || 'CC');
                    let tableData;
                     switch(selectedConn){
                        case 'CC': tableData = <TablaComponentesConexion data={NOBELPROCERA_TITANIUM_BAR_CC_DATA} title={t.nobelProceraTitaniumBarTable.ccTitle} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.nobelProceraTitaniumBarTable} />; break;
                        case 'Brånemark': tableData = <TablaComponentesConexion data={NOBELPROCERA_TITANIUM_BAR_BRANEMARK_DATA} title={t.nobelProceraTitaniumBarTable.branemarkTitle} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.nobelProceraTitaniumBarTable} />; break;
                        case 'Tri-channel': tableData = <TablaComponentesConexion data={NOBELPROCERA_TITANIUM_BAR_TRICHANNEL_DATA} title={t.nobelProceraTitaniumBarTable.triChannelTitle} platformHeaders={['np', 'rp', 'wp', '6']} {...commonTableProps} t={t.nobelProceraTitaniumBarTable} />; break;
                        case ConnectionType.MultiUnit: tableData = <TablaComponentesConexion data={MULTI_UNIT_CONNECTION_DATA} title={t.universalMultiUnitTable.connectionTitle} platformHeaders={['np_rp', 'wp']} {...commonTableProps} t={t.universalMultiUnitTable} />; break;
                     }
                    return (
                        <div>
                           <CaseDetailIcons caseData={caseData} isModal t={t.caseCard} connectionTypeForTable={selectedConn} />
                           <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                           {tableData}
                        </div>
                    );
                };
                content = <Content />;
                break;
            }
            case 'EXO013': {
                content = (
                    <div>
                        <CaseDetailIcons caseData={caseData} isModal t={t.caseCard} />
                        <TablaComponentesConexion data={N1_BASE_UNITARIA_NO_ROTATORIO_DATA} title={t.n1BaseUniversalTable.unitariaTitle} platformHeaders={['np', 'rp']} {...commonTableProps} t={t.n1BaseUniversalTable} />
                        <TablaComponentesConexion data={N1_BASE_PUENTE_ROTATORIO_DATA} title={t.n1BaseUniversalTable.puenteTitle} platformHeaders={['np', 'rp']} {...commonTableProps} t={t.n1BaseUniversalTable} />
                    </div>
                );
                break;
            }
            case 'EXO006': {
                content = (
                    <div>
                        <CaseDetailIcons caseData={caseData} isModal t={t.caseCard} />
                        <TablaComponentesConexion data={N1_TCC_UNITARIA_NO_ROTATORIA_DATA} title={t.n1TccUnitariaTable.title} platformHeaders={['np', 'rp']} {...commonTableProps} t={t.n1TccUnitariaTable} footerText={t.n1TccUnitariaTable.footer} />
                    </div>
                );
                break;
            }
             case 'EXO014': {
                 const Content = () => {
                    const connections = ['CC', 'N1 TCC', 'N1 Base', 'Branemark', 'Tri-channel'];
                    const [selectedConn, setSelectedConn] = useState(initialConnection || 'CC');
                    let tableData;
                     switch(selectedConn){
                        case 'CC': tableData = <TablaComponentesConexion data={PROCERA_TITANIUM_CC_DATA} title={t.proceraTitaniumPillarTable.ccTitle} platformHeaders={['3.0', 'np', 'rp', 'wp']} {...commonTableProps} t={t.proceraFCZImplantCrownTable} />; break;
                        case 'N1 TCC': tableData = <TablaComponentesConexion data={N1_TCC_UNITARIA_NO_ROTATORIA_DATA} title={t.n1TccUnitariaTable.title} platformHeaders={['np', 'rp']} {...commonTableProps} t={t.n1TccUnitariaTable} footerText={t.n1TccUnitariaTable.footer} />; break;
                        case 'N1 Base': tableData = <><TablaComponentesConexion data={N1_BASE_UNITARIA_NO_ROTATORIO_DATA} title={t.n1BaseUniversalTable.unitariaTitle} platformHeaders={['np', 'rp']} {...commonTableProps} t={t.n1BaseUniversalTable} /><TablaComponentesConexion data={N1_BASE_PUENTE_ROTATORIO_DATA} title={t.n1BaseUniversalTable.puenteTitle} platformHeaders={['np', 'rp']} {...commonTableProps} t={t.n1BaseUniversalTable} /></>; break;
                        case 'Branemark': tableData = <TablaComponentesConexion data={PROCERA_TITANIUM_BRANEMARK_DATA} title={t.proceraTitaniumPillarTable.branemarkTitle} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.proceraFCZImplantCrownTable} />; break;
                        case 'Tri-channel': tableData = <TablaComponentesConexion data={PROCERA_TITANIUM_TRICHANNEL_DATA} title={t.proceraTitaniumPillarTable.triChannelTitle} platformHeaders={['np', 'rp', 'wp', '6']} {...commonTableProps} t={t.proceraFCZImplantCrownTable} />; break;
                     }
                    return (
                        <div>
                           <CaseDetailIcons caseData={caseData} isModal t={t.caseCard} connectionTypeForTable={selectedConn} />
                           <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                           {tableData}
                        </div>
                    );
                };
                content = <Content />;
                break;
            }
             case 'EXO019': {
                content = (
                    <div>
                        <CaseDetailIcons caseData={caseData} isModal t={t.caseCard} />
                        <TablaComponentesConexion data={PILAR_UNIVERSAL_ON1_NO_ROTATORIO_DATA} title={t.pilarUniversalOn1Table.noRotatorioTitle} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.pilarUniversalOn1Table} />
                        <TablaComponentesConexion data={PILAR_UNIVERSAL_ON1_ROTATORIO_DATA} title={t.pilarUniversalOn1Table.rotatorioTitle} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.pilarUniversalOn1Table} footerText={t.pilarUniversalOn1Table.footer} />
                    </div>
                );
                break;
            }
             case 'EXO020': {
                content = (
                    <div>
                        <CaseDetailIcons caseData={caseData} isModal t={t.caseCard} />
                        <TablaComponentesConexion data={NOBEL_PEARL_COMPONENTS_DATA} title={t.nobelPearlTable.title} platformHeaders={['np', 'rp', 'wp']} {...commonTableProps} t={t.nobelPearlTable} footerText={t.nobelPearlTable.footer} />
                    </div>
                );
                break;
            }
            case 'EXO023': {
              const descriptionData = caseDescriptions[caseData.id];
              const descriptionText = descriptionData?.description[language] || descriptionData?.description['es'];
              let descriptionComponent = null;
              if (descriptionText) {
                  const linkTextMap: {[key: string]: string} = { es: 'Ver como', en: 'See how', pt: 'Ver como', fr: 'Voir comment', sv: 'Se hur' };
                  const linkText = linkTextMap[language] || 'See how';
                  const parts = descriptionText.split(linkText);

                  descriptionComponent = (
                      <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                          <p className="text-sm text-slate-700">
                              {parts[0]}
                              <a href="https://tw.dtxstudio.com/video/96336" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1 ml-1">
                                  {linkText}
                                  <ExternalLinkIcon className="h-4 w-4" />
                              </a>
                              {parts.length > 1 && parts[1]}
                          </p>
                      </div>
                  );
              }
              content = (
                <div>
                  <CaseDetailIcons caseData={caseData} isModal t={t.caseCard} />
                  {descriptionComponent}
                </div>
              );
              break;
            }
            case 'EXO034': {
                 const Content = () => {
                    const connections = ['CC', 'N1 TCC', 'Branemark', 'Tri-channel', 'MUA otras marcas'];
                    const [selectedConn, setSelectedConn] = useState(initialConnection || 'CC');
                    let tableData;
                     switch(selectedConn){
                        case 'CC': tableData = <><TablaMUA data={MUA_XEAL_CC_RECTO_DATA} title={t.multiUnitAbutmentsTable.ccRectoTitle} platformHeaders={['1.5', '2.5', '3.5', '4.5']} t={t.multiUnitAbutmentsTable} storeCountry={storeCountry} imageUrl={caseData.imageUrls[0]} /><TablaMUA data={MUA_XEAL_CC_ANGULADO_DATA} title={t.multiUnitAbutmentsTable.ccAnguladoTitle} platformHeaders={['2.5', '3.5', '4.5']} t={t.multiUnitAbutmentsTable} hasAngle storeCountry={storeCountry} /></>; break;
                        case 'N1 TCC': tableData = <><TablaMUA data={MUA_XEAL_N1_TCC_RECTO_DATA} title={t.multiUnitAbutmentsTable.n1TccRectoTitle} platformHeaders={['1.5', '2.5', '3.5', '4.5']} t={t.multiUnitAbutmentsTable} storeCountry={storeCountry} imageUrl={caseData.imageUrls[2]} /><TablaMUA data={MUA_XEAL_N1_TCC_ANGULADO_DATA} title={t.multiUnitAbutmentsTable.n1TccAnguladoTitle} platformHeaders={['2.5', '3.5', '4.5']} t={t.multiUnitAbutmentsTable} hasAngle storeCountry={storeCountry} /></>; break;
                        case 'Branemark': tableData = <><TablaMUA data={MUA_BRANEMARK_RECTO_DATA} title={t.multiUnitAbutmentsTable.branemarkRectoTitle} platformHeaders={['1', '2', '3', '4', '5']} t={t.multiUnitAbutmentsTable} storeCountry={storeCountry} imageUrl={caseData.imageUrls[4]} /><TablaMUA data={MUA_BRANEMARK_ANGULADO_DATA} title={t.multiUnitAbutmentsTable.branemarkAnguladoTitle} platformHeaders={['2', '3', '4', '5']} t={t.multiUnitAbutmentsTable} hasAngle storeCountry={storeCountry} /></>; break;
                        case 'Tri-channel': tableData = <><TablaMUA data={MUA_TRICHANNEL_RECTO_DATA} title={t.multiUnitAbutmentsTable.triChannelRectoTitle} platformHeaders={['1', '2', '3', '4', '5']} t={t.multiUnitAbutmentsTable} storeCountry={storeCountry} imageUrl={caseData.imageUrls[5]} /><TablaMUA data={MUA_TRICHANNEL_ANGULADO_DATA} title={t.multiUnitAbutmentsTable.triChannelAnguladoTitle} platformHeaders={['2', '3', '4', '5']} t={t.multiUnitAbutmentsTable} hasAngle storeCountry={storeCountry} /></>; break;
                        case 'MUA otras marcas': tableData = <>
                          <TablaOtrasMarcas title="Astra Tech Implant System™ EV" headers={['1.5 mm', '2.5 mm', '3.5 mm', '4.5 mm', '5.5 mm']} data={MUA_OTRAS_MARCAS_ASTRA_EV_DATA} t={t} storeCountry={storeCountry} notes="Driver: 29158 with 25 Ncm. ¹Solo 30°" />
                          <TablaOtrasMarcas title="Astra Tech Implant System® OsseoSpeed®" headers={['1.5 mm', '2.5 mm', '3.5 mm', '4.5 mm', '5.5 mm']} data={MUA_OTRAS_MARCAS_ASTRA_OSSEOSPEED_DATA} t={t} storeCountry={storeCountry} notes="Driver: 29158 with 15 Ncm. ¹Driver: Refer to original manufacturer." />
                          <TablaOtrasMarcas title="BioHorizons® Tapered Internal" headers={['1 mm', '2 mm', '3 mm', '4 mm', '5 mm']} data={MUA_OTRAS_MARCAS_BIOHORIZONS_DATA} t={t} storeCountry={storeCountry} notes="Driver: 29158 with 30 Ncm." />
                          <TablaOtrasMarcas title="Dentium® SuperLine® & Implantium®" headers={['1.5 mm', '2.5 mm', '3.5 mm']} data={MUA_OTRAS_MARCAS_DENTIUM_DATA} t={t} storeCountry={storeCountry} notes="Driver: 29158 with 30 Ncm." />
                          <TablaOtrasMarcas title="Neodent® Grand Morse®" headers={['1.5 mm', '2.5 mm', '3.5 mm', '4.5 mm']} data={MUA_OTRAS_MARCAS_NEODENT_DATA} t={t} storeCountry={storeCountry} notes="Driver: 29158 with 32 Ncm." />
                          <TablaOtrasMarcas title="Osstem® TS" headers={['1.5 mm', '2.5 mm', '3.5 mm']} data={MUA_OTRAS_MARCAS_OSSTEM_DATA} t={t} storeCountry={storeCountry} notes="Driver: 29158 with 30 Ncm." />
                          <TablaOtrasMarcas title="Straumann® Bone Level" headers={['1.5 mm', '2.5 mm', '3.5 mm', '4.5 mm']} data={MUA_OTRAS_MARCAS_STRAUMANN_BL_DATA} t={t} storeCountry={storeCountry} notes="Driver: 29158 with 35 Ncm." />
                          <TablaOtrasMarcas title="Straumann® BLX" headers={['1.5 mm', '2.5 mm', '3.5 mm', '4.5 mm']} data={MUA_OTRAS_MARCAS_STRAUMANN_BLX_DATA} t={t} storeCountry={storeCountry} notes="Driver: 29158 with 35 Ncm." />
                          <TablaOtrasMarcas title="Zimmer Dental Tapered Screw-Vent®" headers={['1 mm', '2 mm', '2.5 mm', '3 mm', '3.5 mm', '4 mm', '4.5 mm', '5 mm']} data={MUA_OTRAS_MARCAS_ZIMMER_DATA} t={t} storeCountry={storeCountry} notes="Driver: 29158 with 30 Ncm. ¹Solo 17°" />
                          <TablaOtrasMarcas title="3i™ Certain®" headers={['1 mm', '2 mm', '3 mm', '4 mm', '5 mm']} data={MUA_OTRAS_MARCAS_3I_DATA} t={t} storeCountry={storeCountry} notes="Driver: 29158 with 20 Ncm." />
                        </>; break;
                     }
                    return (
                        <div>
                           <CaseDetailIcons caseData={caseData} isModal t={t.caseCard} connectionTypeForTable={selectedConn} />
                           <ConnectionSelector connections={connections} selectedConnection={selectedConn} onConnectionChange={setSelectedConn} t={t.modal} />
                           {tableData}
                        </div>
                    );
                };
                content = <Content />;
                break;
            }
            case 'EXO033': {
              content = (
                <div>
                  <CaseDetailIcons caseData={caseData} isModal t={t.caseCard} />
                  {descriptionComponent}
                </div>
              );
              break;
            }
            case 'EXO035': {
              content = (
                <div>
                  <CaseDetailIcons caseData={caseData} isModal t={t.caseCard} />
                  <TemporalAbutmentsTables storeCountry={storeCountry} />
                </div>
              );
              break;
            }
        }
        
        const modalFooterContent = <ResourceButtons t={t.modal} caseData={caseData} onOpenDownloadsModal={handleOpenDownloadsHelpModal} language={language} />;
        
        setModalContent(content);
        if (caseData.id !== 'EXO033') {
          setModalFooter(modalFooterContent);
        }
        setIsModalOpen(true);
    };

    const handleHelp001Click = (caseData: DentalCase) => {
        handleOpenDownloadsHelpModal();
    };

    const handleTablesClick = (caseData: DentalCase) => {
        setModalTitle(t.modal.tables_modal_title);
        setModalContent(<DevDebugPage t={t.devDebugPage} />);
        setIsModalOpen(true);
        setModalId('modal-tables');
        setModalFooter(null);
    };

    const [tableData, setTableData] = useState(TRI_CHANNEL_TABLE_DATA);

    const handleTableTestClick = (caseData: DentalCase) => {
        setModalTitle(t.triChannelTestTable.title);
        setModalContent(
          <TablaTriChannel
            t={t.triChannelTestTable}
            storeCountry={storeCountry}
            isTableEditMode
            data={tableData}
            onDataChange={setTableData}
          />
        );
        setIsModalOpen(true);
        setModalId('modal-table-test');
    };

    const handleSupportClick = () => {
        setModalTitle(t.header.support_button);
        setModalContent(<SupportModal t={t.modal} />);
        setIsModalOpen(true);
        setModalId('modal-support');
        setModalFooter(null);
    };

    const handleCustomerServiceClick = () => {
        setModalTitle(t.modal.customer_service_title);
        setModalContent(<CustomerServiceModal t={t.modal} language={language} />);
        setIsModalOpen(true);
        setModalId('modal-customer-service');
        setModalFooter(null);
    };

    const [caseModalData, setCaseModalData] = useState([
        { title: 'Puente sobre implantes Procera Zirconia estética', caseId: 'EXO024', modalType: 'Tablas de componentes con selector' },
        { title: 'Base Universal No rotatoria', caseId: 'EXO021', modalType: 'Tablas de componentes con selector' },
    ]);
    const [modalAnalysisData, setModalAnalysisData] = useState([
        { modalName: 'Componentes/Referencias', description: 'Muestra tablas de componentes para un caso específico.', sections: ['Selector de Conexión', 'Tabla(s) de Componentes', 'Recursos Adicionales (pie de página)'] },
        { modalName: 'Soporte Técnico', description: 'Ofrece múltiples vías de contacto para soporte.', sections: ['WhatsApp (QR)', 'Agendar Sesión (QR/Enlace)', 'Email', 'Teléfono'] },
    ]);

    const handleExosClick = (caseData: DentalCase) => {
        setModalTitle(t.modal.exos_modal_title);
        setModalContent(
            <ExosModalContent
                t={t.exos_modal}
                language={language}
                isTableEditMode
                caseModalData={caseModalData}
                onCaseModalDataChange={setCaseModalData}
                modalAnalysisData={modalAnalysisData}
                onModalAnalysisDataChange={setModalAnalysisData}
            />
        );
        setIsModalOpen(true);
        setModalId('modal-exos');
    };

    const handleDownloadCenterClick = () => {
      setModalTitle(t.modal.download_center_title);
      setModalContent(
          <DownloadCenterModalContent
              t={t}
              onClose={handleCloseModal}
              onOpenWorkflowSelector={handleOpenDownloadsHelpModal}
              language={language}
          />
      );
      setIsModalOpen(true);
      setModalId('modal-download-center');
      setModalFooter(null);
    };
    
    const menuData = useMemo(() => {
        return MOCK_CASES.reduce((acc, caseItem) => {
            const category = t.filterBar.options[caseItem.status] || 'Others';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push({
                id: caseItem.id,
                label: caseItem.patientName[language],
                imageUrl: caseItem.imageUrls[0],
            });
            return acc;
        }, {} as { [key: string]: { id: string; label: string; imageUrl: string; }[] });
    }, [language, t]);

    const handleMenuItemClick = (caseId: string) => {
        setIsMenuOpen(false);
        const element = caseRefs.current[caseId];
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Highlight effect
            element.classList.add('highlight-card');
            setTimeout(() => {
                element.classList.remove('highlight-card');
            }, 1500);
        }
    };
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [menuRef]);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {isIntroModalOpen && (
                <Modal 
                    isOpen={isIntroModalOpen} 
                    onClose={() => {}} 
                    title="" 
                    isDismissable={false} 
                    showHeader={false}
                    id="modal-intro"
                    maxWidth="max-w-2xl"
                    backButtonLabel=""
                >
                    <IntroModal onConfirm={handleConfirmIntro} t={translations} />
                </Modal>
            )}
            
            <Header
              title={t.header.title}
              language={language}
              storeCountry={storeCountry}
              onLanguageChange={(lang) => setLanguage(lang)}
              onSupportClick={handleSupportClick}
              onCustomerServiceClick={handleCustomerServiceClick}
              onDownloadCenterClick={handleDownloadCenterClick}
              onGlobeClick={() => setIsIntroModalOpen(true)}
              t={t.header}
              isMenuOpen={isMenuOpen}
              onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
              menuData={menuData}
              onMenuItemClick={handleMenuItemClick}
              onAssistantClick={handleAssistantClick}
            />

            <div className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-12 gap-8 py-8">
                    <aside className={`col-span-12 lg:col-span-3 transition-all duration-300 ease-in-out`}>
                        <div className="sticky top-24">
                           <div className="relative mb-6">
                               <input
                                   type="search"
                                   placeholder={t.filterBar.search_placeholder}
                                   value={filters.searchText}
                                   onChange={(e) => handleFilterChange('searchText', e.target.value)}
                                   className="w-full h-11 pl-10 pr-4 rounded-md bg-[color:var(--accent-primary)] text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[color:var(--accent-primary)] focus:ring-white"
                               />
                               <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                           </div>
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
                    <main className="col-span-12 lg:col-span-9">
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
                            caseRefs={caseRefs}
                        />
                    </main>
                </div>
            </div>

            <Footer t={t.footer} storeCountry={storeCountry} onSupportClick={handleSupportClick} />
            <FilterTooltip isActive={isAnyFilterActive} onResetFilters={handleResetFilters} t={t.tooltip} />

            <Modal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              title={modalTitle}
              footer={modalFooter}
              backButtonLabel={t.modal.back_button}
              caseData={modalCaseData || undefined}
              t={t}
              id={modalId}
              maxWidth={modalId === 'modal-download-center' ? 'max-w-7xl' : undefined}
            >
              {modalContent}
            </Modal>
        </div>
    );
};

// FIX: Added default export to the App component.
// This resolves the error in 'index.tsx' which tries to import 'App' as a default export.
export default App;
