import React, { useState, useRef, useEffect } from 'react';
import { CheckIcon, ChevronDownIcon } from './icons';

interface ComboBoxOption {
  value: string;
  label: string;
  // FIX: Explicitly type the icon to accept a className prop to satisfy React.cloneElement.
  icon?: React.ReactElement<{ className?: string }>;
}

interface ComboBoxProps {
  options: ComboBoxOption[];
  value: string;
  onChange: (value: string) => void;
  isActive?: boolean;
}

const ComboBox: React.FC<ComboBoxProps> = ({ options, value, onChange, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(option => option.value === value) || options[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  
  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        className={`relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-slate-800 ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)] sm:text-sm h-9 ${
          isActive ? 'ring-[color:var(--accent-primary)]' : 'ring-slate-300'
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedOption.icon && React.cloneElement(selectedOption.icon, { className: 'h-6 w-auto flex-shrink-0' })}
          <span className="truncate">{selectedOption.label}</span>
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDownIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
        </span>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-slate-200"
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option.value}
              className="text-slate-800 relative cursor-default select-none py-2 pl-10 pr-4 hover:bg-purple-50 hover:text-[color:var(--accent-primary)]"
              role="option"
              aria-selected={option.value === value}
              onClick={() => handleSelect(option.value)}
            >
              <span className={`flex items-center gap-2 truncate ${option.value === value ? 'font-semibold' : 'font-normal'}`}>
                 {option.icon && React.cloneElement(option.icon, { className: 'h-6 w-auto' })}
                <span>{option.label}</span>
              </span>
              {option.value === value && (
                <span className="text-[color:var(--accent-primary)] absolute inset-y-0 left-0 flex items-center pl-3">
                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComboBox;