import React from 'react';
import { DownloadIcon, InfoIcon } from './icons';

interface DownloadLibrariesProps {
  t: any; // Translation object from preMilledBlanksTable
  title: string;
  links?: {
    exocad?: string;
    shape?: string;
    dentalwings?: string;
    seeAll?: string;
  };
  onSupportClick: () => void;
  isProcera?: boolean;
}

const DownloadLibraries: React.FC<DownloadLibrariesProps> = ({ t, title, links, onSupportClick, isProcera = false }) => {
  const hasLinks = !!links;

  const allButtons = [
    { key: 'exocad', label: t.download_libraries_link_text, url: links?.exocad },
    { key: 'shape', label: t.download_libraries_3shape_link_text, url: links?.shape },
    { key: 'dentalwings', label: t.download_libraries_dentalwings_link_text, url: links?.dentalwings },
  ];

  const buttons = isProcera ? allButtons.filter(btn => btn.key !== 'dentalwings') : allButtons;
  
  const seeAllButton = { key: 'seeAll', label: t.download_libraries_see_all_link_text, url: links?.seeAll };

  return (
    <div className="my-4 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-semibold text-slate-600">{title}</h4>
        <button
            onClick={onSupportClick}
            className="inline-flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-[color:var(--accent-primary)] bg-white rounded-md border border-[color:var(--accent-primary)] hover:bg-[color:var(--accent-primary)] hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[color:var(--accent-primary)]"
        >
            <InfoIcon className="h-4 w-4" />
            {t.support_button_text}
        </button>
      </div>
      <div className="flex flex-col items-stretch gap-2">
        {buttons.map(btn => (
          hasLinks && btn.url ? (
            <a 
              key={btn.key}
              href={btn.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)] focus:ring-offset-2 transition-all duration-200"
            >
              <DownloadIcon className="h-4 w-4 mr-2" />
              {btn.label}
            </a>
          ) : (
            <button 
              key={btn.key}
              disabled
              className="w-full inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-xs font-semibold text-slate-400 bg-slate-50 border border-slate-200 rounded-md cursor-not-allowed"
            >
              <DownloadIcon className="h-4 w-4 mr-2" />
              {btn.label}
            </button>
          )
        ))}
        {hasLinks && seeAllButton.url && (
            <a 
              key={seeAllButton.key}
              href={seeAllButton.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-xs font-semibold text-[color:var(--accent-primary)] bg-white rounded-md border border-[color:var(--accent-primary)] hover:bg-[color:var(--accent-primary)] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary)] transition-all duration-200"
            >
              <DownloadIcon className="h-4 w-4 mr-2" />
              {seeAllButton.label}
            </a>
          )}
      </div>
    </div>
  );
};

export default DownloadLibraries;