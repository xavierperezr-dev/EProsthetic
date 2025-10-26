import React from 'react';
import { Filters, CaseStatus, RestorationType, ConnectionType, SoftwareType } from '../types';
import { ResetIcon, ChevronLeftIcon, FilterIcon, CcIcon, ExtIcon, TriIcon, MuaIcon, N1Icon, PearlIcon, N1BaseIcon, On1Icon, UnitariaIndicatorIcon, MultipleIndicatorIcon, DTXIcon, ExocadIcon, ThreeShapeIcon, DentalwingsIcon, AngulationYesIcon, AngulationNoIcon } from './icons';
import SegmentedControl from './SegmentedControl';

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (name: keyof Filters, value: string) => void;
  onResetFilters: () => void;
  isAnyFilterActive: boolean;
  t: any; // Translation object
  isCollapsed: boolean;
  onToggle: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, onResetFilters, isAnyFilterActive, t, isCollapsed, onToggle }) => {

  const statusOptions = [
    { value: "", label: t.options.all },
    { value: CaseStatus.Local, label: t.options[CaseStatus.Local] },
    { value: CaseStatus.Procera, label: t.options[CaseStatus.Procera] },
    { value: CaseStatus.Standard, label: t.options[CaseStatus.Standard] },
    { value: CaseStatus.Otros, label: t.options[CaseStatus.Otros] },
  ];

  const restorationTypeOptions = [
    { value: "", label: t.options.all },
    { value: RestorationType.Unitaria, label: t.options[RestorationType.Unitaria], icon: <UnitariaIndicatorIcon className="h-14" /> },
    { value: RestorationType.Multiple, label: t.options[RestorationType.Multiple], icon: <MultipleIndicatorIcon className="h-14" /> },
  ];

  const connectionTypeOptions = [
    { value: "", label: t.options.all },
    { value: ConnectionType.CC, label: ConnectionType.CC, icon: <CcIcon /> },
    { value: ConnectionType.MultiUnit, label: ConnectionType.MultiUnit, icon: <MuaIcon /> },
    { value: ConnectionType.N1, label: ConnectionType.N1, icon: <N1Icon /> },
    { value: ConnectionType.N1Base, label: ConnectionType.N1Base, icon: <N1BaseIcon /> },
    { value: ConnectionType.On1, label: ConnectionType.On1, icon: <On1Icon /> },
    { value: ConnectionType.Branemark, label: ConnectionType.Branemark, icon: <ExtIcon /> },
    { value: ConnectionType.TriChannel, label: ConnectionType.TriChannel, icon: <TriIcon /> },
    { value: ConnectionType.Pearl, label: t.options[ConnectionType.Pearl], icon: <PearlIcon /> },
  ];

  const softwareTypeOptions = [
    { value: "", label: t.options.all },
    { value: SoftwareType.DTX, label: SoftwareType.DTX, icon: <DTXIcon className="h-6 w-auto" /> },
    { value: SoftwareType.Exocad, label: SoftwareType.Exocad, icon: <ExocadIcon className="h-5 w-auto" /> },
    { value: SoftwareType.ThreeShape, label: SoftwareType.ThreeShape, icon: <ThreeShapeIcon className="h-5 w-auto" /> },
    { value: SoftwareType.Dentalwings, label: SoftwareType.Dentalwings, icon: <DentalwingsIcon className="h-5 w-auto" /> },
  ];

  const angulationOptions = [
    { value: "", label: t.options.all },
    { value: "true", label: t.options.yes, icon: <AngulationYesIcon className="h-14" /> },
    { value: "false", label: t.options.no, icon: <AngulationNoIcon className="h-14" /> },
  ];

  return (
    <div className={`bg-white rounded-lg shadow-md h-full transition-all duration-300 ease-in-out flex flex-col ${isCollapsed ? 'p-3' : 'p-6'}`}>
      <div className="flex items-start mb-4 pb-3 border-b border-slate-200 flex-shrink-0">
        <h2 className={`text-lg font-semibold text-[color:var(--text-primary)] whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'}`}>
          {t.title}
        </h2>
        <div className="relative flex-shrink-0 ml-auto">
          <button
            onClick={onToggle}
            className="p-1.5 text-slate-600 rounded-full hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[color:var(--accent-primary)]"
            aria-label={isCollapsed ? t.show_filters : t.hide_filters}
          >
            {isCollapsed ? <FilterIcon className="h-5 w-5" /> : <ChevronLeftIcon className="h-5 w-5" />}
          </button>
          {isCollapsed && isAnyFilterActive && (
            <span 
              className="absolute -top-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" 
              title={t.filters_active_tooltip}
            ></span>
          )}
        </div>
      </div>
      
      <div className={`flex-grow flex flex-col min-h-0 ${isCollapsed ? 'hidden' : ''}`}>
        <div className="flex-grow overflow-y-auto space-y-6 pr-3 custom-scrollbar">
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-slate-600 mb-1">
              {t.production_label}
            </label>
            <div role="group" aria-label={t.production_label} className="grid grid-cols-3 gap-1 bg-slate-100 rounded-md p-0.5 ring-1 ring-inset ring-slate-200">
              {statusOptions.map((option) => {
                const isSelected = filters.status === option.value;
                const isFilterActive = isSelected && option.value !== '';
                const isAllSelected = isSelected && option.value === '';
                
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onFilterChange('status', option.value)}
                    className={`
                      w-full px-2 py-1 text-xs font-semibold transition-all duration-200 rounded flex items-center justify-center
                      focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)] focus:ring-offset-2
                      min-h-9
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
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-slate-600 mb-1">
              {t.restoration_type_label}
            </label>
            <SegmentedControl
              name="type"
              options={restorationTypeOptions}
              value={filters.type}
              onChange={(value) => onFilterChange('type', value)}
            />
          </div>
          
          <div>
            <label htmlFor="angulation" className="block text-sm font-medium text-slate-600 mb-1">
              {t.angulated_access_label}
            </label>
            <SegmentedControl
              name="angulation"
              options={angulationOptions}
              value={filters.angulation}
              onChange={(value) => onFilterChange('angulation', value)}
            />
          </div>

          <div>
            <label htmlFor="connectionType" className="block text-sm font-medium text-slate-600 mb-1">
              {t.connection_type_label}
            </label>
            <SegmentedControl
              name="connectionType"
              options={connectionTypeOptions}
              value={filters.connectionType}
              onChange={(value) => onFilterChange('connectionType', value)}
            />
          </div>

          <div>
            <label htmlFor="softwareType" className="block text-sm font-medium text-slate-600 mb-1">
              {t.software_type_label}
            </label>
            <SegmentedControl
              name="softwareType"
              options={softwareTypeOptions}
              value={filters.softwareType}
              onChange={(value) => onFilterChange('softwareType', value)}
            />
          </div>
        </div>
        
        <div className="pt-4 mt-auto border-t border-slate-200 flex-shrink-0">
             <button
              onClick={onResetFilters}
              disabled={!isAnyFilterActive}
              className={`flex items-center justify-center w-full h-9 px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 border
              ${
                isAnyFilterActive
                  ? 'bg-white text-[color:var(--accent-primary)] border-[color:var(--accent-primary)] hover:bg-[color:var(--accent-primary)] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary)]'
                  : 'text-slate-500 bg-slate-100 border-slate-300 cursor-not-allowed'
              }`}
            >
              <ResetIcon className="h-4 w-4 mr-2" />
              {t.reset_button}
            </button>
          </div>
      </div>
    </div>
  );
};

export default FilterBar;