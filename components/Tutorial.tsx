import React, { useState, useEffect, useLayoutEffect } from 'react';

interface TutorialStep {
  elementId: string;
  title: string;
  description: string;
}

interface TutorialProps {
  steps: TutorialStep[];
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  onFinish: () => void;
  t: any;
}

const Tutorial: React.FC<TutorialProps> = ({ steps, currentStep, onNext, onPrev, onFinish, t }) => {
  const [highlightBox, setHighlightBox] = useState<DOMRect | null>(null);
  const [popoverPosition, setPopoverPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 });

  useLayoutEffect(() => {
    const step = steps[currentStep];
    if (!step || !step.elementId) {
      setHighlightBox(null);
      return;
    }

    const updatePosition = () => {
      const element = document.getElementById(step.elementId);
      if (element) {
        const rect = element.getBoundingClientRect();
        setHighlightBox(rect);

        const popoverHeight = 150; // Approximate height
        const popoverWidth = 300;  // Approximate width
        let top = rect.bottom + 16;
        let left = rect.left + rect.width / 2 - popoverWidth / 2;

        if (top + popoverHeight > window.innerHeight) {
          top = rect.top - popoverHeight - 16;
        }

        if (left < 16) left = 16;
        if (left + popoverWidth > window.innerWidth) {
          left = window.innerWidth - popoverWidth - 16;
        }

        setPopoverPosition({ top, left });
      } else {
        console.warn(`Tutorial element not found: #${step.elementId}`);
        setHighlightBox(null);
      }
    };
    
    // Using a timeout can help ensure the element is painted before we get its rect.
    const timeoutId = setTimeout(updatePosition, 100);
    
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [currentStep, steps]);

  const step = steps[currentStep];
  if (!step) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-simple-fade-in" onClick={onFinish} />

      {/* Highlight Box */}
      {highlightBox && (
        <div
          className="fixed transition-all duration-300 ease-in-out bg-transparent rounded-lg"
          style={{
            top: highlightBox.top - 8,
            left: highlightBox.left - 8,
            width: highlightBox.width + 16,
            height: highlightBox.height + 16,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Popover */}
      {highlightBox && (
        <div
          className="fixed w-80 bg-white rounded-lg shadow-2xl p-6 animate-simple-fade-in text-slate-800"
          style={{ top: popoverPosition.top, left: popoverPosition.left }}
        >
          <h3 className="text-lg font-bold text-[color:var(--accent-primary)] mb-2">{step.title}</h3>
          <p className="text-sm text-slate-600 mb-6">{step.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-500">{currentStep + 1} / {steps.length}</span>
            <div className="flex gap-2">
              {currentStep > 0 && (
                <button
                  onClick={onPrev}
                  className="px-4 py-1.5 text-sm font-semibold text-slate-700 bg-slate-200 rounded-md hover:bg-slate-300 transition-colors"
                >
                  {t.prev_btn}
                </button>
              )}
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={onNext}
                  className="px-4 py-1.5 text-sm font-semibold text-white bg-[color:var(--accent-primary)] rounded-md hover:bg-[color:var(--accent-primary-hover)] transition-colors"
                >
                  {t.next_btn}
                </button>
              ) : (
                <button
                  onClick={onFinish}
                  className="px-4 py-1.5 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                >
                  {t.finish_btn}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tutorial;