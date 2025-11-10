import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon, ChevronLeftIcon } from './icons';
import { DentalCase, CaseStatus } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  closeAriaLabel?: string;
  footer?: React.ReactNode;
  backButtonLabel: string;
  caseData?: DentalCase;
  t?: any;
  isDismissable?: boolean;
  showHeader?: boolean;
  id?: string;
  maxWidth?: string;
  isTableEditMode?: boolean;
  onSaveChanges?: () => void;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  closeAriaLabel = "Close modal", 
  footer, 
  backButtonLabel, 
  caseData, 
  t,
  isDismissable = true,
  showHeader = true,
  id,
  maxWidth = 'max-w-5xl',
  isTableEditMode,
  onSaveChanges,
}) => {
  const modalRoot = document.getElementById('modal-root');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen && isDismissable) {
      document.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, isDismissable]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !modalRoot) return null;

  const isIntroModal = id === 'modal-intro';
  const isAssistantModal = id === 'modal-assistant';
  const isSupportModal = id === 'modal-support';
  const isDownloadCenterModal = id === 'modal-download-center';
  const hasVideoBg = isSupportModal || isDownloadCenterModal;

  const modalContainerClasses = `relative z-10 w-full ${maxWidth} ${
    isAssistantModal ? '' : 'grid grid-rows-[auto_1fr_auto]'
  } max-h-[90vh] ${
    isIntroModal || isAssistantModal || hasVideoBg
      ? 'bg-transparent'
      : 'bg-white rounded-lg shadow-2xl border border-slate-200'
  } ${hasVideoBg ? 'rounded-lg overflow-hidden' : ''}`;
  
  const contentContainerClasses = ` ${
    isIntroModal || isAssistantModal
      ? ''
      : hasVideoBg
        ? 'overflow-y-auto max-h-[65vh] p-4 sm:p-6'
        : 'overflow-y-auto max-h-[65vh] p-6'
  }`;

  const statusTagStyles: Record<CaseStatus, string> = {
    [CaseStatus.Local]: 'border-purple-200 bg-purple-50 text-[color:var(--accent-primary)]',
    [CaseStatus.Procera]: 'border-indigo-200 bg-indigo-50 text-indigo-800',
    [CaseStatus.Standard]: 'border-green-200 bg-green-50 text-green-800',
    [CaseStatus.Otros]: 'border-slate-300 bg-slate-100 text-slate-700',
  };

   const statusDotStyles: Record<CaseStatus, string> = {
    [CaseStatus.Local]: 'bg-[color:var(--accent-primary)]',
    [CaseStatus.Procera]: 'bg-indigo-500',
    [CaseStatus.Standard]: 'bg-green-500',
    [CaseStatus.Otros]: 'bg-slate-500',
  };

  return ReactDOM.createPortal(
    <div
      id={id}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="fixed inset-0 bg-slate-500/50 backdrop-blur-sm"
        onClick={isDismissable ? onClose : undefined}
        aria-hidden="true"
      ></div>

      <div
        ref={modalRef}
        tabIndex={-1}
        className={modalContainerClasses}
      >
        {hasVideoBg && (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
              src={isSupportModal ? "https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/Video/Asist4.mp4" : "https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/Video/Asist3.mp4"}
            ></video>
            <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-0"></div>
          </>
        )}
        
        {showHeader && !isAssistantModal && (
          <div className={`p-4 border-b flex-shrink-0 relative z-10 ${hasVideoBg ? 'border-slate-600' : 'border-slate-200'}`}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-grow min-w-0">
                {backButtonLabel && (
                  <button
                    onClick={onClose}
                    className={`inline-flex items-center justify-center gap-1 h-9 px-4 text-sm font-semibold rounded-md border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary)] ${hasVideoBg ? 'bg-white/10 border-slate-500 text-slate-200 hover:bg-white/20' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'}`}
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                    {backButtonLabel}
                  </button>
                )}
                <div className="flex items-center justify-between flex-grow">
                  <div className="flex items-center gap-4">
                      <h2 id="modal-title" className={`text-lg font-semibold truncate ${hasVideoBg ? 'text-white' : 'text-[color:var(--text-primary)]'}`}>{title}</h2>
                      {caseData && t?.caseCard?.status && (
                        <span className={`ml-2 inline-flex items-center gap-2 px-2 py-0.5 text-xs font-semibold rounded-md border ${statusTagStyles[caseData.status]}`}>
                            <span className={`h-2 w-2 rounded-full ${statusDotStyles[caseData.status]}`}></span>
                            {t.caseCard.status[caseData.status]}
                        </span>
                      )}
                  </div>
                  <div id="modal-header-extra-content"></div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={onClose}
                  className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary)] ${hasVideoBg ? 'text-slate-300 hover:bg-white/20 hover:text-white' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'}`}
                  aria-label={closeAriaLabel}
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        )}
        <div className={`${contentContainerClasses} relative z-10`}>
          {children}
        </div>
        
        {(footer || (isTableEditMode && onSaveChanges)) && !isAssistantModal && (
          <div className={`p-4 border-t rounded-b-lg mt-auto flex-shrink-0 flex items-center justify-between relative z-10 ${hasVideoBg ? 'bg-slate-900/50 border-slate-600' : 'bg-slate-50 border-slate-200'}`}>
            <div>{footer}</div>
            {isTableEditMode && onSaveChanges && (
                <div className="flex items-center gap-4 ml-auto">
                    <span className={`text-xs font-semibold ${hasVideoBg ? 'text-slate-300' : 'text-slate-500'}`}>Ctrl + Shift + X</span>
                    <button
                        onClick={onSaveChanges}
                        className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Guardar Cambios
                    </button>
                </div>
            )}
          </div>
        )}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;