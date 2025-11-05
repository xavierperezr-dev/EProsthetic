import React from 'react';
import { FilterIcon } from './icons';

interface FilterTooltipProps {
  isActive: boolean;
  onResetFilters: () => void;
  t: any; // translation object for this component
}

const FilterTooltip: React.FC<FilterTooltipProps> = ({ isActive, onResetFilters, t }) => {
  if (!isActive) {
    return null;
  }

  return (
    <div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-800/95 backdrop-blur-sm text-white rounded-full shadow-lg flex items-center gap-4 pl-5 pr-3 py-2 animate-simple-fade-in"
      role="status"
      aria-live="polite"
    >
      <FilterIcon className="h-5 w-5 text-slate-300" />
      <span className="text-sm font-semibold whitespace-nowrap">{t.filters_active_label}</span>
      <div className="h-5 w-px bg-slate-600"></div>
      <button
        onClick={onResetFilters}
        className="text-sm font-semibold text-amber-300 hover:text-amber-200 hover:underline focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-md px-2 py-1"
      >
        {t.remove_filters_link}
      </button>
    </div>
  );
};

export default FilterTooltip;
