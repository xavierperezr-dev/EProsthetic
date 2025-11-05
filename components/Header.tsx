import React from 'react';
import { InfoIcon, DownloadIcon, GlobeIcon, MenuIcon, SparklesIcon } from './icons';
import { Language } from '../types';

interface HeaderProps {
  title: string;
  language: Language;
  storeCountry: Language;
  onLanguageChange: (lang: Language) => void;
  onSupportClick: () => void;
  onCustomerServiceClick: () => void;
  onDownloadCenterClick: () => void;
  onGlobeClick: () => void;
  t: any;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  menuData: { [key: string]: { id: string; label: string; imageUrl: string; }[] };
  onMenuItemClick: (caseId: string) => void;
  onAssistantClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  language, 
  storeCountry, 
  onLanguageChange, 
  onSupportClick, 
  onCustomerServiceClick, 
  onDownloadCenterClick, 
  onGlobeClick, 
  t,
  isMenuOpen,
  onToggleMenu,
  menuData,
  onMenuItemClick,
  onAssistantClick
}) => {

  return (
    <header className="bg-white sticky top-0 z-20 py-4 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-color)] shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        {/* Top row */}
        <div className="flex justify-between items-center gap-4">
           <button
              onClick={onAssistantClick}
              className="inline-flex items-center justify-center gap-2 h-9 px-4 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
           >
              <SparklesIcon className="h-5 w-5 text-yellow-300" />
              <span>{t.assistant_button}</span>
           </button>
          <div className="flex items-center gap-4">
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
        </div>
        
        {/* Bottom row */}
        <div className="grid grid-cols-3 items-center">
            <div className="justify-self-start flex items-center gap-4">
                 <img 
                    src="https://www.nobelbiocare.com/themes/custom/nobel/logo.svg" 
                    alt="Nobel Biocare logo" 
                    className="h-8"
                  />
            </div>
            <h1 className="text-lg font-semibold text-[color:var(--text-primary)] justify-self-center text-center">
              {title}
            </h1>
            <div className="justify-self-end relative">
              <button
                onClick={onToggleMenu}
                className="flex flex-col items-center justify-center w-16 h-12 bg-[color:var(--accent-primary)] text-white rounded-md hover:bg-[color:var(--accent-primary-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary)]"
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
              >
                <MenuIcon className="h-5 w-5" />
                <span className="text-xs font-semibold mt-0.5">Menu</span>
              </button>
              {isMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-slate-200 z-30 py-2 animate-simple-fade-in max-h-[70vh] overflow-y-auto custom-scrollbar">
                  {/* FIX: Replaced Object.entries with Object.keys to iterate over menuData. This avoids potential type inference issues with Object.entries where item values could be typed as 'unknown', leading to an error when calling '.map'. */}
                  {Object.keys(menuData).map((category) => {
                    const items = menuData[category];
                    return (
                      <div key={category}>
                        <h4 className="px-4 py-2 text-sm font-bold text-slate-500 bg-slate-100 sticky top-0">{category}</h4>
                        <ul>
                          {items.map(item => (
                            <li key={item.id}>
                              <button
                                onClick={() => onMenuItemClick(item.id)}
                                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-purple-50 hover:text-[color:var(--accent-primary)] transition-colors duration-150 flex items-center gap-3"
                              >
                                <img src={item.imageUrl} alt={item.label} className="w-10 h-10 object-contain rounded-md bg-slate-100 p-1 flex-shrink-0" />
                                <span className="flex-grow">{item.label}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;