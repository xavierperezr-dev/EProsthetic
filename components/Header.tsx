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

  return (
    <header className="bg-white sticky top-0 z-10 py-4 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-color)] shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        {/* Top row */}
        <div className="flex justify-end items-center gap-4">
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

          {(language === 'en' || language === 'es' || language === 'pt') && (
            <button
              onClick={onDownloadCenterClick}
              className="hidden sm:inline-flex items-center justify-center gap-2 h-9 px-4 text-sm font-semibold text-white bg-[color:var(--card-bg-raspberry)] rounded-md hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--card-bg-raspberry)]"
            >
              <DownloadIcon className="h-5 w-5" />
              <span>{t.download_center_button}</span>
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
        </div>
        
        {/* Bottom row */}
        <div className="grid grid-cols-3 items-center">
            <div className="justify-self-start">
                 <img 
                    src="https://www.nobelbiocare.com/themes/custom/nobel/logo.svg" 
                    alt="Nobel Biocare logo" 
                    className="h-8"
                  />
            </div>
            <h1 className="text-lg font-semibold text-[color:var(--text-primary)] justify-self-center text-center">
              {title}
            </h1>
            <div className="justify-self-end"></div> {/* Empty div for alignment */}
        </div>
      </div>
    </header>
  );
};

export default Header;