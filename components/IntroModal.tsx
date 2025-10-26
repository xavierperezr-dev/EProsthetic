import React, { useState } from 'react';
import { Language } from '../types';
import { GlobeIcon, StoreIcon } from './icons';

interface IntroModalProps {
  onConfirm: (language: Language, country: Language) => void;
  t: any; // Full translations object
}

// Video Background Wrapper
const VideoBackground: React.FC<{ children: React.ReactNode; videoSrc: string }> = ({ children, videoSrc }) => (
    <div className="relative h-[42rem] w-full text-white text-center overflow-hidden">
        <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src={videoSrc}
        ></video>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10"></div>
        <div className="relative z-20 p-8 flex flex-col justify-center h-full">
            {children}
        </div>
    </div>
);

// SelectionButton for dark backgrounds
const DarkBgSelectionButton: React.FC<{
  onClick: () => void;
  isSelected: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ onClick, isSelected, children, className = "" }) => {
    const baseClasses = "font-bold rounded-lg transition-all duration-200 transform";
    const selectedClasses = "bg-white text-[color:var(--accent-primary)] scale-110 shadow-lg";
    const unselectedClasses = "bg-white/20 text-white hover:bg-white/40";
    return (
        <button onClick={onClick} className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses} ${className}`}>
            {children}
        </button>
    );
};

const IntroModal: React.FC<IntroModalProps> = ({ onConfirm, t }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Language | null>(null);
  const languages: Language[] = ['en', 'es', 'pt', 'fr', 'sv'];
  const countries: Language[] = ['es', 'pt', 'fr', 'sv'];
  const modalT = selectedLanguage ? t[selectedLanguage].intro_modal : t.en.intro_modal;
  const DESIGN1_VIDEO_SRC = "https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/Video/intro2.mp4";

  const handleConfirm = () => {
    if (selectedLanguage && selectedCountry) onConfirm(selectedLanguage, selectedCountry);
  };

  return (
    <VideoBackground videoSrc={DESIGN1_VIDEO_SRC}>
      <img src="https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/Logo/LogoGris.png" alt="Nobel Biocare logo" className="h-10 mx-auto mb-6" />
      <h2 className="text-2xl font-bold drop-shadow-lg mb-8">{modalT.title}</h2>
      <div className="space-y-10">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2 drop-shadow-md">
            <GlobeIcon className="h-6 w-6" />
            <span>{modalT.language_section_title}</span>
          </h3>
          <div className="flex justify-center items-center gap-4">
            {languages.map(lang => (
              <DarkBgSelectionButton key={lang} onClick={() => setSelectedLanguage(lang)} isSelected={selectedLanguage === lang} className="px-5 py-2 text-base">
                {lang.toUpperCase()}
              </DarkBgSelectionButton>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2 drop-shadow-md">
            <StoreIcon className="h-6 w-6" />
            <span>{modalT.online_store_country_section_title}</span>
          </h3>
          <div className="flex justify-center items-center gap-4">
             {countries.map(country => (
              <DarkBgSelectionButton key={country} onClick={() => setSelectedCountry(country)} isSelected={selectedCountry === country} className="px-5 py-2 text-base">
                {country.toUpperCase()}
              </DarkBgSelectionButton>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12">
        <button
          onClick={handleConfirm}
          disabled={!selectedLanguage || !selectedCountry}
          className="w-full max-w-xs px-6 py-3 text-lg font-bold text-white bg-[color:var(--accent-primary)] rounded-lg shadow-md hover:bg-[color:var(--accent-primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary-hover)] transition-all duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {modalT.confirm_button}
        </button>
      </div>
    </VideoBackground>
  );
};

export default IntroModal;