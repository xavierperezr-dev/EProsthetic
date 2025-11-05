import React from 'react';
import { Filters, CaseStatus, RestorationType, ConnectionType, SoftwareType } from '../types';
import { ResetIcon, ChevronLeftIcon, FilterIcon, CcIcon, ExtIcon, TriIcon, MuaIcon, N1Icon, PearlIcon, N1BaseIcon, On1Icon, UnitariaIndicatorIcon, MultipleIndicatorIcon, DTXIcon, ExocadIcon, ThreeShapeIcon, DentalwingsIcon, AngulationYesIcon, AngulationNoIcon } from './icons';
import SegmentedControl from './SegmentedControl';

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (name: keyof Filters, value: string | string[]) => void;
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

  const handleStatusChange = (statusValue: CaseStatus | "") => {
    if (statusValue === "") {
        onFilterChange('status', []);
    } else {
        const currentStatus = filters.status;
        const newStatus = currentStatus.includes(statusValue)
            ? currentStatus.filter(s => s !== statusValue)
            : [...currentStatus, statusValue];
        onFilterChange('status', newStatus);
    }
  };

  const handleConnectionTypeChange = (connValue: ConnectionType | "") => {
    if (connValue === "") {
        onFilterChange('connectionType', []);
    } else {
        const currentConnections = filters.connectionType;
        const newConnections = currentConnections.includes(connValue)
            ? currentConnections.filter(c => c !== connValue)
            : [...currentConnections, connValue];
        onFilterChange('connectionType', newConnections);
    }
  };

  const handleAngulationChange = (angulationValue: "true" | "false" | "") => {
    onFilterChange('angulation', angulationValue);
  };

  return (
    <div className={`bg-white rounded-lg shadow-md h-full transition-all duration-300 ease-in-out flex flex-col ${isCollapsed ? 'p-3' : 'p-6'}`}>
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center gap-2">
           <button
              onClick={onResetFilters}
              disabled={!isAnyFilterActive}
              className={`flex items-center justify-center h-9 text-sm font-semibold rounded-md transition-all duration-200 border
              ${isCollapsed ? 'w-9 p-0' : 'px-4 py-2'}
              ${
                isAnyFilterActive
                  ? 'bg-[var(--card-bg-raspberry)] text-white border-transparent hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--card-bg-raspberry)]'
                  : 'text-slate-400 bg-slate-100 border-slate-300 cursor-not-allowed'
              }`}
              title={t.reset_button}
            >
              <ResetIcon className="h-5 w-5" />
              <span className={isCollapsed ? 'sr-only' : 'ml-2'}>{t.reset_button}</span>
            </button>
            <h2 className={`text-lg font-semibold text-[color:var(--text-primary)] whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${isCollapsed ? 'max-w-0 opacity-0' : 'max-w-xs opacity-100'}`}>
              {t.title}
            </h2>
        </div>
        <div className="relative flex items-center gap-2">
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
                const isAllButton = option.value === "";
                const isSelected = isAllButton
                  ? filters.status.length === 0
                  : filters.status.includes(option.value as CaseStatus);
                
                let buttonClass = 'text-slate-600 hover:bg-white/60';
                if (isSelected) {
                  if (isAllButton) {
                    buttonClass = 'bg-white shadow-sm text-slate-800 ring-1 ring-inset ring-slate-300';
                  } else {
                    buttonClass = 'bg-white shadow-sm ring-2 ring-inset ring-[color:var(--accent-primary)] text-[color:var(--accent-primary)]';
                  }
                }

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleStatusChange(option.value as CaseStatus | "")}
                    className={`
                      w-full px-2 py-1 text-xs font-semibold transition-all duration-200 rounded flex items-center justify-center
                      focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)] focus:ring-offset-2
                      min-h-9
                      ${buttonClass}
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
            <div role="group" aria-label={t.angulated_access_label} className="grid grid-cols-3 gap-1 bg-slate-100 rounded-md p-0.5 ring-1 ring-inset ring-slate-200">
              {angulationOptions.map((option) => {
                const isSelected = filters.angulation === option.value;
                
                let buttonClass = 'text-slate-600 hover:bg-white/60';
                if (isSelected) {
                  if (option.value === "") {
                    buttonClass = 'bg-white shadow-sm text-slate-800 ring-1 ring-inset ring-slate-300';
                  } else {
                    buttonClass = 'bg-white shadow-sm ring-2 ring-inset ring-[color:var(--accent-primary)] text-[color:var(--accent-primary)]';
                  }
                }

                const content = option.icon ? (
                    <>
                      {React.cloneElement(option.icon, { className: 'h-12' })}
                      <span className="mt-1">{option.label}</span>
                    </>
                ) : (
                    <span className="font-semibold text-sm">{option.label}</span>
                );

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleAngulationChange(option.value as "true" | "false" | "")}
                    className={`
                      w-full h-24 px-1 py-2 text-xs font-semibold transition-all duration-200 rounded flex flex-col items-center justify-center gap-1
                      focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)] focus:ring-offset-2
                      ${buttonClass}
                    `}
                    aria-pressed={isSelected}
                    title={option.label}
                  >
                    {content}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label htmlFor="connectionType" className="block text-sm font-medium text-slate-600 mb-1">
              {t.connection_type_label}
            </label>
            <div role="group" aria-label={t.connection_type_label} className="space-y-2">
              <button
                type="button"
                onClick={() => handleConnectionTypeChange("")}
                className={`w-full h-9 px-2 py-1 text-sm font-semibold transition-all duration-200 rounded-md flex items-center justify-center ${
                  filters.connectionType.length === 0
                    ? 'bg-white shadow-sm ring-1 ring-inset ring-slate-400 text-slate-800'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 ring-1 ring-slate-200'
                }`}
                aria-pressed={filters.connectionType.length === 0}
              >
                {t.options.all}
              </button>
              <div className="grid grid-cols-4 gap-2">
                {connectionTypeOptions.filter(o => o.value !== "").map((option) => {
                  const isSelected = filters.connectionType.includes(option.value as ConnectionType);

                  const buttonClass = isSelected
                    ? 'bg-white shadow-md ring-2 ring-inset ring-[color:var(--accent-primary)] text-[color:var(--accent-primary)]'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 ring-1 ring-inset ring-slate-200';

                  return (
                    <button
                      key={option.value}
                      type="button"
                      title={option.label}
                      onClick={() => handleConnectionTypeChange(option.value as ConnectionType)}
                      className={`aspect-square p-2 text-xs font-semibold transition-all duration-200 rounded-md flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)] focus:ring-offset-1 ${buttonClass}`}
                      aria-pressed={isSelected}
                    >
                      {option.icon ? React.cloneElement(option.icon, { className: 'h-10 w-10' }) : option.label}
                    </button>
                  );
                })}
              </div>
            </div>
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
      </div>
    </div>
  );
};

export default FilterBar;
