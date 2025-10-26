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

  const modalContainerClasses = `relative z-10 w-full ${maxWidth} flex flex-col ${
    isIntroModal
      ? 'bg-transparent'
      : 'bg-white rounded-lg shadow-2xl border border-slate-200'
  }`;

  const contentContainerClasses = `flex-grow overflow-y-auto ${
    isIntroModal
      ? `max-h-[${showHeader ? '65vh' : '85vh'}]`
      : `p-6 max-h-[${showHeader ? '65vh' : '85vh'}]`
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
        {showHeader && (
          <div className="p-4 border-b border-slate-200 flex-shrink-0">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-grow min-w-0">
                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-1 h-9 px-4 text-sm font-semibold text-slate-700 bg-white rounded-md border border-slate-300 hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary)]"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                  {backButtonLabel}
                </button>
                <h2 id="modal-title" className="text-lg font-semibold text-[color:var(--text-primary)] truncate">{title}</h2>
                {caseData && t?.caseCard?.status && (
                  <span className={`ml-2 inline-flex items-center gap-2 px-2 py-0.5 text-xs font-semibold rounded-md border ${statusTagStyles[caseData.status]}`}>
                      <span className={`h-2 w-2 rounded-full ${statusDotStyles[caseData.status]}`}></span>
                      {t.caseCard.status[caseData.status]}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={onClose}
                  className="p-1 text-slate-500 rounded-full hover:bg-slate-200 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary)]"
                  aria-label={closeAriaLabel}
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        )}
        <div className={contentContainerClasses}>
          {children}
        </div>
        
        {(footer || (isTableEditMode && onSaveChanges)) && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-lg mt-auto flex-shrink-0 flex items-center justify-between">
            <div>{footer}</div>
            {isTableEditMode && onSaveChanges && (
                <div className="flex items-center gap-4 ml-auto">
                    <span className="text-xs text-slate-500 font-semibold">Ctrl + Shift + X</span>
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
