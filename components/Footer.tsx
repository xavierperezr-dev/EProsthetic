import React from 'react';
import { LinkedInIcon, InstagramIcon, YouTubeIcon } from './icons';
import { Language } from '../types';

interface FooterProps {
  t: any; // footer translations
  storeCountry: Language;
  onSupportClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  const socialIcons = [
    { href: t.social.linkedin, Icon: LinkedInIcon, label: "LinkedIn" },
    { href: t.social.instagram, Icon: InstagramIcon, label: "Instagram" },
    { href: t.social.youtube, Icon: YouTubeIcon, label: "YouTube" },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white text-sm mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="font-bold text-gray-400 uppercase tracking-wider text-xs mb-4">{t.socialTitle}</h3>
        <div className="flex justify-center space-x-6">
          {socialIcons.map(({ href, Icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <span className="sr-only">{label}</span>
              <Icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;