import React from 'react';
import { Language } from '../types';
import { DownloadIcon, ExternalLinkIcon, DownloadCenterIllustration } from './icons';

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
  links: { text: string; href: string }[];
  t: any;
  onClose: () => void;
  onOpenWorkflowSelector: () => void;
  language: Language;
}

const DownloadCenterModalContent: React.FC<DownloadCenterModalContentProps> = ({ links, t, onClose, onOpenWorkflowSelector, language }) => {
  if (links.length === 0 && !t.modal.procera_tracking_button) {
    return <p className="text-center text-slate-500">No hay descargas disponibles.</p>;
  }

  const handleDownloadLibrariesClick = () => {
    onOpenWorkflowSelector();
  };
  
  const langPath = getLangPath(language);
  const proceraTrackingUrl = `https://store.nobelbiocare.com/${langPath}/procera/`;

  const overviewLink = links.find(link => link.text.includes("Overview"));
  const otherLinks = links.filter(link => !link.text.includes("Overview"));
  
  const baseButtonClass = "w-full inline-flex items-center justify-center gap-2 h-11 px-4 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary)]";
  
  const docLinkClass = `${baseButtonClass} justify-start text-left text-slate-800 bg-slate-100 border border-slate-300 hover:bg-slate-200`;
  const actionButtonClass = `${baseButtonClass} text-white bg-[color:var(--accent-primary)] hover:bg-[color:var(--accent-primary-hover)]`;

  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="flex justify-center">
        <DownloadCenterIllustration className="h-24 w-auto text-[color:var(--accent-primary)]" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {/* Left Column: Other Document Downloads */}
        <div className="space-y-2">
          {otherLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              download
              className={docLinkClass}
              onContextMenu={handleContextMenu}
            >
              <DownloadIcon className="h-5 w-5 flex-shrink-0 text-[color:var(--accent-primary)]" />
              <span className="flex-grow truncate" title={link.text}>{link.text}</span>
              <ExternalLinkIcon className="h-4 w-4 flex-shrink-0 text-slate-500" />
            </a>
          ))}
        </div>
        
        {/* Right Column: Key Actions & Overview */}
        <div className="space-y-2">
          {overviewLink && (
            <a
              href={overviewLink.href}
              target="_blank"
              rel="noopener noreferrer"
              download
              className={docLinkClass}
              onContextMenu={handleContextMenu}
            >
              <DownloadIcon className="h-5 w-5 flex-shrink-0 text-[color:var(--accent-primary)]" />
              <span className="flex-grow truncate" title={overviewLink.text}>{overviewLink.text}</span>
              <ExternalLinkIcon className="h-4 w-4 flex-shrink-0 text-slate-500" />
            </a>
          )}
          <button
            onClick={handleDownloadLibrariesClick}
            className={actionButtonClass}
            onContextMenu={handleContextMenu}
          >
            {t.modal.resource1_label_procera}
          </button>
          <a
            href={proceraTrackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={actionButtonClass}
            onContextMenu={handleContextMenu}
          >
            {t.modal.procera_tracking_button}
            <ExternalLinkIcon className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DownloadCenterModalContent;
