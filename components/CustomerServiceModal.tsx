import React from 'react';
import { ExternalLinkIcon } from './icons';
import { Language } from '../types';

interface CustomerServiceModalProps {
  t: any;
  language: Language;
}

const CustomerServiceModal: React.FC<CustomerServiceModalProps> = ({ t, language }) => {
  const getCustomerServiceUrl = (lang: Language): string => {
    switch (lang) {
      case 'fr':
        return 'https://www.nobelbiocare.com/fr-fr/service-client';
      case 'sv':
        return 'https://www.nobelbiocare.com/en-se/customer-service';
      default:
        return ''; // Should not happen
    }
  };

  const url = getCustomerServiceUrl(language);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`;

  if (!url) {
    return null;
  }

  return (
    <div className="p-6 flex flex-col items-center text-center">
      <p className="text-slate-600 mb-6 max-w-md">
        {t.customer_service_intro}
      </p>
      <div className="flex justify-center mb-6">
        <img src={qrUrl} alt="Customer Service QR Code" className="w-40 h-40 border p-1 bg-white rounded-lg shadow-sm" />
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-6 py-2 text-sm font-semibold text-[color:var(--accent-primary)] bg-slate-100 rounded-md border border-slate-300 hover:bg-slate-200 transition-colors"
      >
        {t.customer_service_link}
        <ExternalLinkIcon className="h-4 w-4" />
      </a>
    </div>
  );
};

export default CustomerServiceModal;
