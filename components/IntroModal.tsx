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
            disablePictureInPicture
            controlsList="nodownload"
        ></video>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10"></div>
        <div className="relative z-20 p-8 flex flex-col justify-start pt-16 h-full">
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
  disabled?: boolean;
}> = ({ onClick, isSelected, children, className = "", disabled = false }) => {
    const baseClasses = "font-bold rounded-lg transition-all duration-200 transform";
    const selectedClasses = "bg-white text-[color:var(--accent-primary)] scale-110 shadow-lg";
    const unselectedClasses = `bg-white/20 text-white ${!disabled ? 'hover:bg-white/40' : ''}`;
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

    return (
        <button 
            onClick={onClick} 
            disabled={disabled}
            className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses} ${disabledClasses} ${className}`}>
            {children}
        </button>
    );
};

const IntroModal: React.FC<IntroModalProps> = ({ onConfirm, t }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Language | null>(null);
  const languages: Language[] = ['en', 'es', 'pt'];
  const countries: Language[] = ['es', 'pt'];
  const modalT = selectedLanguage ? t[selectedLanguage].intro_modal : t.en.intro_modal;
  const DESIGN1_VIDEO_SRC = "https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/Video/intro2.mp4";

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang);
    if (lang === 'es') {
      setSelectedCountry('es');
    } else if (lang === 'pt') {
      setSelectedCountry('pt');
    } else { // for 'en'
      setSelectedCountry(null);
    }
  };

  const handleCountrySelect = (country: Language) => {
    setSelectedCountry(country);
  };

  const handleConfirm = () => {
    if (selectedLanguage && selectedCountry) onConfirm(selectedLanguage, selectedCountry);
  };

  const isCountrySelectionDisabled = !selectedLanguage;

  return (
    <VideoBackground videoSrc={DESIGN1_VIDEO_SRC}>
      <img src="https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/Logo/LogoGris.png" alt="Nobel Biocare logo" className="h-20 mx-auto mb-6" />
      <h2 className="text-2xl font-bold drop-shadow-lg mb-8">{modalT.title}</h2>
      <div className="space-y-10">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2 drop-shadow-md">
            <GlobeIcon className="h-6 w-6" />
            <span>{modalT.language_section_title}</span>
          </h3>
          <div className="flex justify-center items-center">
            {/* Container for ES/PT */}
            <div className="flex gap-4">
              <DarkBgSelectionButton onClick={() => handleLanguageSelect('es')} isSelected={selectedLanguage === 'es'} className="w-20 px-5 py-2 text-base">ES</DarkBgSelectionButton>
              <DarkBgSelectionButton onClick={() => handleLanguageSelect('pt')} isSelected={selectedLanguage === 'pt'} className="w-20 px-5 py-2 text-base">PT</DarkBgSelectionButton>
            </div>
            {/* Separator */}
            <div className="w-px h-8 bg-white/30 mx-4"></div>
            {/* Container for EN */}
            <div className="flex">
              <DarkBgSelectionButton onClick={() => handleLanguageSelect('en')} isSelected={selectedLanguage === 'en'} className="w-20 px-5 py-2 text-base">EN</DarkBgSelectionButton>
            </div>
          </div>
        </div>
        <div>
          <h3 className={`text-lg font-semibold mb-4 flex items-center justify-center gap-2 drop-shadow-md transition-opacity ${isCountrySelectionDisabled ? 'opacity-50' : ''}`}>
            <StoreIcon className="h-6 w-6" />
            <span>{modalT.online_store_country_section_title}</span>
          </h3>
          <div className="flex justify-center items-center">
            {/* Container for ES/PT country buttons, aligned with the language buttons */}
            <div className="flex gap-4">
              <DarkBgSelectionButton 
                onClick={() => handleCountrySelect('es')} 
                isSelected={selectedCountry === 'es'} 
                className="w-20 px-5 py-2 text-base"
                disabled={isCountrySelectionDisabled}
              >ES</DarkBgSelectionButton>
              <DarkBgSelectionButton 
                onClick={() => handleCountrySelect('pt')} 
                isSelected={selectedCountry === 'pt'} 
                className="w-20 px-5 py-2 text-base"
                disabled={isCountrySelectionDisabled}
              >PT</DarkBgSelectionButton>
            </div>
            {/* Placeholder to keep alignment */}
            <div className="w-px h-8 mx-4 opacity-0"></div>
            <div className="flex">
              <div className="w-20"></div> {/* Invisible placeholder */}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <button
          onClick={handleConfirm}
          disabled={!selectedLanguage || !selectedCountry}
          className="w-full max-w-xs px-4 py-2 text-base font-bold text-white bg-[color:var(--accent-primary)] rounded-lg shadow-md hover:bg-[color:var(--accent-primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary-hover)] transition-all duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {modalT.confirm_button}
        </button>
      </div>
    </VideoBackground>
  );
};

export default IntroModal;