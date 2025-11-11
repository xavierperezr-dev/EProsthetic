import React, { useState } from 'react';
import { Language } from '../types';
import { DownloadIcon, ExternalLinkIcon, ClipboardIcon, CheckIcon } from './icons';

const getLangPath = (language: Language) => {
  switch (language) {
    case 'fr': return 'fr/fr';
    case 'pt': return 'pt/pt';
    case 'sv': return 'se/en';
    case 'en': return 'en-int/en';
    default: return 'es/es';
  }
};

interface DownloadCenterModalContentProps {
  t: any;
  onClose: () => void;
  onOpenWorkflowSelector: () => void;
  language: Language;
}

const CopyButton: React.FC<{ url: string; title: string, t: any }> = ({ url, title, t }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      title={copied ? t.modal.link_copied_tooltip : t.modal.copy_link_tooltip}
      className="flex-shrink-0 p-2 rounded-md transition-colors text-slate-400 hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
    >
      {copied ? (
        <CheckIcon className="h-5 w-5 text-green-400" />
      ) : (
        <ClipboardIcon className="h-5 w-5" />
      )}
    </button>
  );
};


const GroupColumn: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="flex flex-col space-y-3 bg-white/5 p-4 rounded-lg border border-slate-700 h-full">
    <h4 className="font-bold text-lg text-slate-100 border-b-2 border-slate-500 pb-2 mb-1 text-center">
      {title}
    </h4>
    <div className="flex flex-col space-y-2 flex-grow">
      {children}
    </div>
  </div>
);


const DownloadCenterModalContent: React.FC<DownloadCenterModalContentProps> = ({ t, onClose, onOpenWorkflowSelector, language }) => {
  const handleDownloadLibrariesClick = () => {
    onOpenWorkflowSelector();
  };
  
  const langPath = getLangPath(language);
  const proceraTrackingUrl = `https://store.nobelbiocare.com/${langPath}/procera/`;
  const catalogUrl = "https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/PDF/89351%20Catalogo%20NB%202025.pdf";
  const digitalSolutionsUrl = "https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/PDF/95290%20Digital%20solutions%20GB.pdf";
  
  const baseButtonClass = "w-full inline-flex items-center justify-center gap-2 h-11 px-4 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white backdrop-blur-sm";
  const docLinkClass = `${baseButtonClass} justify-start text-left text-slate-100 bg-white/10 border border-slate-400 hover:bg-white/20`;
  const secondaryActionButtonClass = `${baseButtonClass} text-slate-800 bg-slate-50 hover:bg-slate-200 border border-transparent`;


  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();
  
  const proceraButtons = [
    { type: 'link', text: 'NobelProcera Prosthetic solutions Overview', href: 'https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/PDF/GMT%2095136_ES%20NobelProcera%20product%20overview.pdf', icon: <DownloadIcon className="h-5 w-5 flex-shrink-0 text-slate-200" />, external: false },
    { type: 'button', text: t.modal.procera_tracking_button, onClick: () => window.open(proceraTrackingUrl, '_blank'), className: secondaryActionButtonClass },
    { type: 'button', text: t.modal.resource1_label_procera, onClick: handleDownloadLibrariesClick, className: secondaryActionButtonClass },
  ];

  const localButtons = [
    { text: 'Universal Base product overview', href: 'https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/PDF/87971_Universal%20Base%20product%20overview_ES.pdf' },
    { text: 'Prosthetic overview N1', href: 'https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/PDF/87730%20Nobel%20Biocare%20N1%20System%20ProdOverw%2021.2%20ES.pdf' },
    { text: 'Product Overview On1', href: 'https://www.ganarnobelbiocare.com/nobeldesign/E-prosthetic/PDF/87583_On1_product_overview_ES.pdf' },
    { text: 'Product Overview Nobelpearl', href: 'https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/PDF/88966_Product%20Overview%20NobelPearl_ES.pdf' },
    { text: 'Titanium Blanks product overview', href: 'https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/PDF/88412_Titanium%20Blanks%20product%20overview_ES.pdf' },
  ];
  
  const generalButtons = [
      { text: t.modal.general_catalog_button, href: catalogUrl },
      { text: t.modal.digital_solutions_button, href: digitalSolutionsUrl },
  ];

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GroupColumn title={t.modal.download_center_group_procera}>
          {proceraButtons.map((btn, index) => {
            if (btn.type === 'link') {
              return (
                <div key={index} className="flex items-center gap-1">
                  <a href={btn.href!} target="_blank" rel="noopener noreferrer" className={`${docLinkClass} flex-grow`} onContextMenu={handleContextMenu}>
                    {btn.icon && !btn.external && btn.icon}
                    <span className="flex-grow truncate" title={btn.text}>{btn.text}</span>
                    {btn.icon && btn.external && btn.icon}
                  </a>
                  <CopyButton url={btn.href!} title={btn.text} t={t} />
                </div>
              );
            } else {
              return (
                <button key={index} onClick={(btn as any).onClick} className={(btn as any).className} onContextMenu={handleContextMenu}>
                  {btn.text}
                </button>
              );
            }
          })}
        </GroupColumn>

        <GroupColumn title={t.modal.download_center_group_local}>
          {localButtons.map((link, index) => (
             <div key={index} className="flex items-center gap-1">
                <a href={link.href} target="_blank" rel="noopener noreferrer" download className={`${docLinkClass} flex-grow`} onContextMenu={handleContextMenu}>
                  <DownloadIcon className="h-5 w-5 flex-shrink-0 text-slate-200" />
                  <span className="flex-grow truncate" title={link.text}>{link.text}</span>
                  <ExternalLinkIcon className="h-4 w-4 flex-shrink-0 text-slate-400" />
                </a>
                <CopyButton url={link.href} title={link.text} t={t} />
            </div>
          ))}
          <button onClick={handleDownloadLibrariesClick} className={secondaryActionButtonClass} onContextMenu={handleContextMenu}>
            {t.modal.resource1_label_procera}
          </button>
        </GroupColumn>

        <GroupColumn title={t.modal.download_center_group_general}>
            {generalButtons.map((link, index) => (
                <div key={index} className="flex items-center gap-1">
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className={`${docLinkClass} flex-grow`} onContextMenu={handleContextMenu}>
                        <DownloadIcon className="h-5 w-5 flex-shrink-0 text-slate-200" />
                        <span className="flex-grow truncate" title={link.text}>{link.text}</span>
                        <ExternalLinkIcon className="h-4 w-4 flex-shrink-0 text-slate-400" />
                    </a>
                    <CopyButton url={link.href} title={link.text} t={t} />
                </div>
            ))}
        </GroupColumn>
      </div>
    </div>
  );
};

export default DownloadCenterModalContent;