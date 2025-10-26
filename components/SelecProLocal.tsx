import React from 'react';
import { DownloadIcon, ExternalLinkIcon } from './icons';
import { Language } from '../types';

interface SelecProLocalProps {
  t: any;
  onClose: () => void;
  language: Language;
}

const getStorePath = (country: Language): string => {
  switch (country) {
    case 'fr': return 'fr/fr';
    case 'pt': return 'pt/pt';
    case 'sv': return 'se/se';
    default: return 'es/es';
  }
};

const SelecProLocal: React.FC<SelecProLocalProps> = ({ t, onClose, language }) => {
  const getProceraUrl = (lang: Language): string => {
    const storePath = getStorePath(lang);
    switch (lang) {
      case 'pt':
        return 'https://www.nobelbiocare.com/pt/pt/restauracoes-nobelprocera';
      case 'fr':
        return 'https://www.nobelbiocare.com/fr-fr/protheses-nobelprocera';
      case 'sv':
      case 'es':
      default:
        return `https://www.nobelbiocare.com/${storePath}/nobelprocera-openaccess`;
    }
  };

  const getLocalProductionUrl = (lang: Language): string => {
    const storePath = getStorePath(lang);
     switch (lang) {
        case 'pt':
            return 'https://www.nobelbiocare.com/pt/pt/producao-local';
        case 'fr':
            return 'https://www.nobelbiocare.com/fr-fr/production-locale';
        case 'sv':
            return 'https://www.nobelbiocare.com/en-se/local-production';
        case 'es':
        default:
            return `https://www.nobelbiocare.com/${storePath}/produccion-local#66588`;
    }
  };

  const proceraUrl = getProceraUrl(language);
  const localProductionUrl = getLocalProductionUrl(language);

  return (
    <div className="p-6 flex flex-col items-center text-center">
      <DownloadIcon className="h-12 w-12 text-slate-400 mb-4" />
      <p className="text-slate-600 mb-8 max-w-md">
        {t.selec_pro_local_description}
      </p>
      <div className="w-full max-w-sm flex flex-col gap-4">
        <a
          href={proceraUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="w-full inline-flex items-center justify-center whitespace-nowrap px-4 py-3 text-sm font-semibold text-white bg-[color:var(--accent-primary)] border border-[color:var(--accent-primary)] rounded-lg hover:bg-[color:var(--accent-primary-hover)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary)]"
        >
          {t.download_procera_button}
          <ExternalLinkIcon className="h-4 w-4 ml-2" />
        </a>
        <a
          href={localProductionUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="w-full inline-flex items-center justify-center whitespace-nowrap px-4 py-3 text-sm font-semibold text-white bg-[color:var(--accent-primary)] border border-[color:var(--accent-primary)] rounded-lg hover:bg-[color:var(--accent-primary-hover)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary)]"
        >
          {t.download_local_button}
          <ExternalLinkIcon className="h-4 w-4 ml-2" />
        </a>
      </div>
    </div>
  );
};

export default SelecProLocal;