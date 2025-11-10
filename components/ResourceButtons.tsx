import React from 'react';
import { Language, CaseStatus, DentalCase } from '../types';
import { ExternalLinkIcon } from './icons';

interface ResourceButtonsProps {
  t: any;
  caseData: DentalCase | null;
  onOpenDownloadsModal: () => void;
  language: Language;
}

const getStorePath = (country: Language): string => {
    switch (country) {
      case 'fr': return 'fr/fr';
      case 'pt': return 'pt/pt';
      case 'sv': return 'se/en';
      case 'en': return 'en-int/en';
      default: return 'es/es';
    }
};

const ResourceButtons: React.FC<ResourceButtonsProps> = ({ t, caseData, onOpenDownloadsModal, language }) => {
    const isProceraOrLocalCase = caseData?.status === CaseStatus.Procera || caseData?.status === CaseStatus.Local;
    const isProceraTrackingCase = caseData?.status === CaseStatus.Procera;

    const baseButtonClasses = "inline-flex items-center justify-center whitespace-nowrap px-2.5 py-1 text-xs font-semibold rounded-md border focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200";
    const activeButtonClasses = "bg-[color:var(--card-bg-raspberry)] text-white border-black hover:opacity-90 focus:ring-[color:var(--card-bg-raspberry)]";
    
    const universalBaseCases = ['EXO021', 'EXO022', 'EXO013', 'EXO006', 'EXO019'];
    
    const designServiceCases = ['EXO028', 'EXO027', 'EXO030', 'EXO026'];
    const showDesignServiceButton = caseData && designServiceCases.includes(caseData.id);

    const getDesignServiceUrl = (lang: Language): string => {
        switch (lang) {
            case 'pt': return 'https://store.nobelbiocare.com/pt/pt/abutment/service/index/';
            case 'fr': return 'https://store.nobelbiocare.com/fr/fr/abutment/service/index/';
            case 'sv': return 'https://store.nobelbiocare.com/se/se/abutment/service/index/';
            case 'es':
            default: return 'https://store.nobelbiocare.com/es/es/abutment/service/index/';
        }
    };

    const proceraTrackingUrl = `https://store.nobelbiocare.com/${getStorePath(language)}/procera/`;

    return (
        <div>
            <h4 className="text-sm font-semibold text-slate-600 mb-2">{t.resources_title}</h4>
            <div className="flex flex-row flex-wrap items-center gap-2">
                {isProceraOrLocalCase && (
                    <button
                        onClick={onOpenDownloadsModal}
                        className={`${baseButtonClasses} ${activeButtonClasses}`}
                    >
                        {t.resource1_label_procera}
                    </button>
                )}

                {showDesignServiceButton && (
                    <a
                        href={getDesignServiceUrl(language)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${baseButtonClasses} ${activeButtonClasses}`}
                    >
                        <img 
                            src="https://store.nobelbiocare.com/es/es/static/frontend/Nobel/nobel/es_ES/images/abutment/digital-scan.png" 
                            alt="" 
                            className="h-4 w-4 mr-2"
                        />
                        {t.design_services_button}
                    </a>
                )}

                {caseData?.status === CaseStatus.Procera ? (
                    <a
                        href="https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/PDF/GMT%2095136_ES%20NobelProcera%20product%20overview.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className={`${baseButtonClasses} ${activeButtonClasses}`}
                    >
                        NobelProcera Overview
                    </a>
                ) : caseData?.id === 'EXO019' ? (
                     <a
                        href="https://www.ganarnobelbiocare.com/nobeldesign/E-prosthetic/PDF/87583_On1_product_overview_ES.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className={`${baseButtonClasses} ${activeButtonClasses}`}
                    >
                        Product Overview On1
                    </a>
                ) : caseData && universalBaseCases.includes(caseData.id) ? (
                    <a
                        href="https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/PDF/87971_Universal%20Base%20product%20overview_ES.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className={`${baseButtonClasses} ${activeButtonClasses}`}
                    >
                        Product Overview U. Base
                    </a>
                ) : caseData?.id === 'EXO016' ? (
                    <a
                        href="https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/PDF/88412_Titanium%20Blanks%20product%20overview_ES.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className={`${baseButtonClasses} ${activeButtonClasses}`}
                    >
                        blanks y holders Overview
                    </a>
                ) : caseData?.id === 'EXO020' ? (
                    <a
                        href="https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/PDF/88966_Product%20Overview%20NobelPearl_ES.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className={`${baseButtonClasses} ${activeButtonClasses}`}
                    >
                        Product Overview Nobelpearl
                    </a>
                ) : null}

                {(caseData?.id === 'EXO013' || caseData?.id === 'EXO006') && (
                    <a
                        href="https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/PDF/87730%20Nobel%20Biocare%20N1%20System%20ProdOverw%2021.2%20ES.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className={`${baseButtonClasses} ${activeButtonClasses}`}
                    >
                        Prosthetic Overview N1
                    </a>
                )}
                
                {isProceraTrackingCase && (
                    <a
                        href={proceraTrackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${baseButtonClasses} ${activeButtonClasses}`}
                    >
                        {t.procera_tracking_button}
                        <ExternalLinkIcon className="h-4 w-4 ml-2" />
                    </a>
                )}
                {caseData?.id === 'EXO023' && (
                    <a
                        href="https://tw.dtxstudio.com/video/96336"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${baseButtonClasses} ${activeButtonClasses}`}
                    >
                        Ver Video
                        <ExternalLinkIcon className="h-4 w-4 ml-2" />
                    </a>
                )}
            </div>
        </div>
    );
};

export default ResourceButtons;