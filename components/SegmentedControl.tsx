import React, { useRef, useState, useEffect } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from './icons';

interface SegmentedControlOption {
  value: string;
  label: string;
  // FIX: Explicitly type the icon to accept a className prop to satisfy React.cloneElement, fixing a TypeScript error.
  icon?: React.ReactElement<{ className?: string }>;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, value, onChange, name }) => {
  const isIconGrid = options.some(opt => opt.icon) && options.length > 4;

  if (isIconGrid) {
    const allOption = options.find(o => o.value === '');
    const iconOptions = options.filter(o => o.value !== '');

    return (
      <div role="group" aria-label={name} className="space-y-2">
        {allOption && (
          <button
            key={allOption.value}
            type="button"
            onClick={() => onChange(allOption.value)}
            className={`
              w-full h-9 px-2 py-1 text-sm font-semibold transition-all duration-200 rounded-md flex items-center justify-center
              focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)] focus:ring-offset-2
              ${
                value === allOption.value
                  ? 'bg-white shadow-sm ring-1 ring-inset ring-slate-400 text-slate-800'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 ring-1 ring-slate-200'
              }
            `}
            aria-pressed={value === allOption.value}
          >
            {allOption.label}
          </button>
        )}
        <div className="relative">
          <div
            className="grid grid-cols-3 gap-2"
          >
            {iconOptions.map((option) => {
              let isSelected = value === option.value;
              if (name === 'connectionType' && value === 'N1' && option.value === 'N1 Base') {
                isSelected = true;
              }
              return (
                <button
                  key={option.value}
                  type="button"
                  title={option.label}
                  onClick={() => onChange(option.value)}
                  className={`
                    aspect-square p-2 text-xs font-semibold transition-all duration-200 rounded-md flex items-center justify-center
                    focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)] focus:ring-offset-1
                    ${
                      isSelected
                        ? `bg-white shadow-md ring-2 ring-inset ring-[color:var(--accent-primary)] text-[color:var(--accent-primary)]`
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 ring-1 ring-inset ring-slate-200'
                    }
                  `}
                  aria-pressed={isSelected}
                >
                  {option.icon ? React.cloneElement(option.icon, { className: 'h-16 w-16' }) : option.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Original single-row flex layout for text or few icons
  return (
    <div role="group" aria-label={name} className="flex w-full min-h-9 bg-slate-100 rounded-md p-0.5 ring-1 ring-inset ring-slate-200 items-stretch">
      {options.map((option) => {
        const isSelected = value === option.value;
        const isFilterActive = isSelected && option.value !== '';
        const isAllSelected = isSelected && option.value === '';
        
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              w-full px-2 py-1 text-xs font-semibold transition-all duration-200 rounded flex items-center justify-center
              focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)] focus:ring-offset-2
              ${
                isFilterActive
                  ? 'bg-white shadow-sm ring-2 ring-inset ring-[color:var(--accent-primary)] text-[color:var(--accent-primary)]'
                  : isAllSelected
                    ? 'bg-white shadow-sm text-slate-800 ring-1 ring-inset ring-slate-300'
                    : 'text-slate-600 hover:bg-white/60'
              }
            `}
            aria-pressed={isSelected}
          >
            {option.icon ? option.icon : option.label}
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;