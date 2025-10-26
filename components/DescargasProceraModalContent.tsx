import React, { useEffect, useRef } from 'react';
import { CalendarIcon, InfoIcon, ExternalLinkIcon } from './icons';
import { Language } from '../types';

interface DescargasProceraModalContentProps {
  t: any;
  onClose: () => void;
  language: Language;
  onOpenSelecProLocal: () => void;
}

const DescargasProceraModalContent: React.FC<DescargasProceraModalContentProps> = ({ t, onClose, language, onOpenSelecProLocal }) => {
  const salirButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Set focus on the "Salir" button when the modal opens
    salirButtonRef.current?.focus();
  }, []);

  const getStorePath = (country: Language) => {
    switch (country) {
      case 'fr': return 'fr/fr';
      case 'pt': return 'pt/pt';
      case 'sv': return 'se/se';
      default: return 'es/es';
    }
  };

  const getOpenAccessUrl = (lang: Language): string => {
    const storePath = getStorePath(lang);
    return `https://www.nobelbiocare.com/${storePath}/nobelprocera-openaccess#44615`;
  }

  const openAccessUrl = getOpenAccessUrl(language);
  const newBookingUrl = "https://outlook.office365.com/book/SoporteTcnicoNobelBiocare@dentalco.org/";
  const newQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=128x128&data=${encodeURIComponent(newBookingUrl)}`;

  return (
    <div className="p-4 text-center">
      <div className="flex items-start justify-center gap-4 text-left bg-amber-50 border-l-4 border-amber-400 p-4 rounded-md mb-6">
        <InfoIcon className="h-8 w-8 text-amber-500 flex-shrink-0 mt-1" />
        <p className="text-slate-700 text-base">
          {t.descargas_procera_modal_text}
        </p>
      </div>
      
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 inline-block">
        <h4 className="font-bold text-lg text-[color:var(--text-primary)] mb-2 flex items-center justify-center gap-2">
          <CalendarIcon className="h-6 w-6 text-blue-500" /> {t.support_modal_book_title}
        </h4>
        <div className="flex justify-center my-4">
            <img src={newQrUrl} alt="Calendar QR Code" className="w-32 h-32" />
        </div>
        <a href={newBookingUrl} target="_blank" rel="noopener noreferrer" className="text-center block text-[color:var(--accent-primary)] hover:underline">{t.support_modal_book_link}</a>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
            onClick={onClose}
            ref={salirButtonRef}
            className="px-6 py-2 text-sm font-semibold text-white bg-[color:var(--accent-primary)] rounded-md border border-[color:var(--accent-primary)] hover:bg-[color:var(--accent-primary-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary)]"
        >
            {t.descargas_procera_modal_salir_button}
        </button>
        <button
            onClick={onOpenSelecProLocal}
            className="inline-flex items-center justify-center gap-2 px-6 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-md border border-slate-300 hover:bg-slate-200 transition-colors"
        >
            {t.descargas_procera_modal_hacerlo_button}
        </button>
      </div>
    </div>
  );
};

export default DescargasProceraModalContent;