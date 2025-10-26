import React from 'react';
import { InfoIcon, DownloadIcon, GlobeIcon } from './icons';
import { Language } from '../types';

interface HeaderProps {
  title: string;
  language: Language;
  // FIX: Changed type to 'Language' to match the state type in App.tsx and fix the compilation error.
  storeCountry: Language;
  onLanguageChange: (lang: Language) => void;
  onSupportClick: () => void;
  onCustomerServiceClick: () => void;
  onDownloadCenterClick: () => void;
  onGlobeClick: () => void;
  t: any;
}

const Header: React.FC<HeaderProps> = ({ title, language, storeCountry, onLanguageChange, onSupportClick, onCustomerServiceClick, onDownloadCenterClick, onGlobeClick, t }) => {
  const activeClass = "bg-[color:var(--accent-primary)] text-white";
  const inactiveClass = "text-slate-600 hover:bg-slate-200";

  return (
    <header className="bg-white sticky top-0 z-10 py-4 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-color)] shadow-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
        <div className="justify-self-start flex items-center gap-4">
          <img 
            src="https://www.nobelbiocare.com/themes/custom/nobel/logo.svg" 
            alt="Nobel Biocare logo" 
            className="h-8"
          />
          {(language === 'en' || language === 'es' || language === 'pt') && (
            <button
              onClick={onDownloadCenterClick}
              className="hidden sm:inline-flex items-center justify-center gap-2 h-9 px-4 text-sm font-semibold text-white bg-[color:var(--card-bg-raspberry)] rounded-md hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--card-bg-raspberry)]"
            >
              <DownloadIcon className="h-5 w-5" />
              <span>{t.download_center_button}</span>
            </button>
          )}
        </div>
        
        <h1 className="text-lg font-semibold text-[color:var(--text-primary)] justify-self-center text-center">
          {title}
        </h1>

        <div className="justify-self-end flex items-center gap-4">
          {(language === 'en' || language === 'es' || language === 'pt') && (
            <button
              onClick={onSupportClick}
              className="inline-flex items-center justify-center gap-2 h-9 px-4 text-sm font-semibold text-white bg-[color:var(--card-bg-raspberry)] rounded-md hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--card-bg-raspberry)]"
            >
              <InfoIcon className="h-5 w-5" />
              <span>{t.support_button}</span>
            </button>
          )}
          {(language === 'fr' || language === 'sv') && (
            <button
              onClick={onCustomerServiceClick}
              className="inline-flex items-center justify-center gap-2 h-9 px-4 text-sm font-semibold text-white bg-[color:var(--card-bg-raspberry)] rounded-md hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--card-bg-raspberry)]"
            >
              <InfoIcon className="h-5 w-5" />
              <span>{t.customer_service_button}</span>
            </button>
          )}

          <div className="h-6 w-px bg-slate-300"></div>

          <button
            onClick={onGlobeClick}
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[color:var(--accent-primary)] transition-colors duration-200"
            title="Change language and country"
            aria-label="Change language and online store country"
          >
            <GlobeIcon className="h-6 w-6" />
            <span>{language.toUpperCase()} / {storeCountry.toUpperCase()}</span>
          </button>
          
          <div className="hidden flex items-center border border-slate-300 rounded-md p-0.5 bg-slate-100">
             <button
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1 text-sm font-semibold rounded-sm transition-all duration-200 ${language === 'en' ? activeClass : inactiveClass}`}
              aria-pressed={language === 'en'}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('es')}
              className={`px-3 py-1 text-sm font-semibold rounded-sm transition-all duration-200 ${language === 'es' ? activeClass : inactiveClass}`}
              aria-pressed={language === 'es'}
            >
              ES
            </button>
            <button
              onClick={() => onLanguageChange('pt')}
              className={`px-3 py-1 text-sm font-semibold rounded-sm transition-all duration-200 ${language === 'pt' ? activeClass : inactiveClass}`}
              aria-pressed={language === 'pt'}
            >
              PT
            </button>
            <button
              onClick={() => onLanguageChange('fr')}
              className={`px-3 py-1 text-sm font-semibold rounded-sm transition-all duration-200 ${language === 'fr' ? activeClass : inactiveClass}`}
              aria-pressed={language === 'fr'}
            >
              FR
            </button>
            <button
              onClick={() => onLanguageChange('sv')}
              className={`px-3 py-1 text-sm font-semibold rounded-sm transition-all duration-200 ${language === 'sv' ? activeClass : inactiveClass}`}
              aria-pressed={language === 'sv'}
            >
              SV
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;