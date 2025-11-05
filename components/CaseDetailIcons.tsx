import React, { useState } from 'react';
import { DentalCase, ConnectionType, RestorationType, CaseStatus } from '../types';
import { 
    CcIcon, ExtIcon, TriIcon, MuaIcon, UnitariaIndicatorIcon, MultipleIndicatorIcon, 
    N1Icon, AngulationYesIcon, AngulationNoIcon, N1BaseIcon, On1Icon, PearlIcon,
    DTXIcon, ExocadIcon, ThreeShapeIcon, DentalwingsIcon, Icon15, Icon35, Icon20,
    ScrewIcon,
    ChevronDownIcon, ChevronUpIcon
} from './icons';

interface CaseDetailIconsProps {
  caseData: DentalCase;
  isModal?: boolean;
  t?: any;
  connectionTypeForTable?: string;
  borderColorClass?: string;
}

const Tooltip: React.FC<{ text?: string; children: React.ReactNode }> = ({ text, children }) => {
  if (!text) return <>{children}</>;
  return (
    <div className="relative flex items-center group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs p-2 text-xs text-white bg-slate-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none text-center">
        {text}
      </div>
    </div>
  );
};

const LabeledBlock: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({ label, children, className }) => (
    <div className={`flex flex-col items-center text-center ${className}`}>
        <span className="text-[10px] font-bold text-current opacity-80 uppercase tracking-wider mb-1 whitespace-nowrap">{label}</span>
        <div className="flex items-center justify-center h-full pt-1">{children}</div>
    </div>
);

const CaseDetailIcons: React.FC<CaseDetailIconsProps> = ({ caseData, isModal = false, t, connectionTypeForTable, borderColorClass }) => {
  const [isCharacteristicsOpen, setIsCharacteristicsOpen] = useState(true);
  const { id, restorationType, connectionType, patientName, imageUrls, status } = caseData;

  const iconSizeClass = "h-14 w-14";
  const unitariaSizeClass = "h-16 w-16";
  const multipleSizeClass = "h-20 w-20";

  const renderConnectionIcon = (connection: ConnectionType, size: string = iconSizeClass) => {
    switch (connection) {
      case ConnectionType.CC:
        if (status === CaseStatus.Otros) {
          return null;
        }
        return <Tooltip text={t?.tooltips?.cc}><CcIcon className={size} /></Tooltip>;
      case ConnectionType.TriChannel: return <Tooltip text={t?.tooltips?.tri_channel}><TriIcon className={size} /></Tooltip>;
      case ConnectionType.Branemark: return <Tooltip text={t?.tooltips?.branemark}><ExtIcon className={size} /></Tooltip>;
      case ConnectionType.MultiUnit:
        if (status === CaseStatus.Otros && !['EXO033', 'EXO023'].includes(id)) {
          return null;
        }
        return <Tooltip text={t?.tooltips?.multi_unit}><MuaIcon className={size} /></Tooltip>;
      case ConnectionType.N1: return <Tooltip text={t?.tooltips?.n1}><N1Icon className={size} /></Tooltip>;
      case ConnectionType.N1Base: return <Tooltip text={t?.tooltips?.n1_base}><N1BaseIcon className={size} /></Tooltip>;
      case ConnectionType.On1: return <Tooltip text={t?.tooltips?.on1}><On1Icon className={size} /></Tooltip>;
      case ConnectionType.Pearl: return <Tooltip text={t?.tooltips?.pearl}><PearlIcon className={size} /></Tooltip>;
      default: return null;
    }
  };

  const ModalIconsContent: React.FC = () => {
    const { restorationType, connectionType: caseConnectionType, angulacion, torque, status, id, notes, compatibleConnections } = caseData;
    
    const specialAngulationCases = ['EXO024', 'EXO025', 'EXO028'];
    const torqueCases = ['EXO024', 'EXO025'];
    const selectedConn = connectionTypeForTable || '';

    let isYesAngulationSelected = false;
    let isNoAngulationSelected = false;

    // Logic for EXO024 and EXO025
    if (['EXO024', 'EXO025'].includes(id)) {
        if (['CC', ConnectionType.MultiUnit].includes(selectedConn)) {
            isYesAngulationSelected = true;
            isNoAngulationSelected = false;
        } else if (['Brånemark', 'Tri-channel'].includes(selectedConn)) {
            isYesAngulationSelected = false;
            isNoAngulationSelected = true;
        } else {
            // Default to highlight "Yes" if no specific connection is selected yet
            isYesAngulationSelected = true;
            isNoAngulationSelected = false;
        }
    // Logic for EXO028
    } else if (id === 'EXO028') {
        if (selectedConn === 'CC') {
            isYesAngulationSelected = true;
            isNoAngulationSelected = false;
        } else if (selectedConn === 'Tri-channel') {
            isYesAngulationSelected = false;
            isNoAngulationSelected = true;
        } else {
            // Default for EXO028 (CC is the default connection) is ASC
            isYesAngulationSelected = true;
            isNoAngulationSelected = false;
        }
    }

    let displayTorque = torque;
    if (torqueCases.includes(id) && selectedConn === ConnectionType.MultiUnit) {
        displayTorque = 15;
    }

    return (
        <div className="flex flex-row items-start justify-around gap-x-6 gap-y-4 text-slate-800 flex-wrap">
            {/* 1. Restoration Type */}
            {restorationType && restorationType.length > 0 && (
                <LabeledBlock label={t?.restoration_type_label}>
                    <div className="flex items-center justify-center gap-2 min-h-[5rem]">
                        {restorationType.includes(RestorationType.Unitaria) && (
                            <Tooltip text={t?.tooltips?.unitaria}><UnitariaIndicatorIcon className={unitariaSizeClass} /></Tooltip>
                        )}
                        {restorationType.includes(RestorationType.Multiple) && (
                            <Tooltip text={t?.tooltips?.multiple}><MultipleIndicatorIcon className={multipleSizeClass} /></Tooltip>
                        )}
                    </div>
                </LabeledBlock>
            )}

            {/* 2. Platform */}
            <LabeledBlock label={t?.platform_label}>
                <div className="flex items-center justify-center flex-wrap gap-2 min-h-[5rem] max-w-xs px-2">
                    {(compatibleConnections || [caseConnectionType]).map(conn => {
                        const isSelected = (connectionTypeForTable || caseConnectionType) === conn;
                        return (
                            <div
                                key={conn}
                                className={`p-1 rounded-lg transition-all duration-200 ${isSelected ? 'bg-blue-100 ring-2 ring-blue-500' : 'opacity-60 hover:opacity-100'}`}
                            >
                                {renderConnectionIcon(conn, "h-12 w-12")}
                            </div>
                        );
                    })}
                </div>
            </LabeledBlock>
            
            {/* 3. Angulation */}
            {angulacion !== undefined && angulacion !== 'N/A' && (
                 <LabeledBlock label={t?.angulation_label}>
                    <div className="flex items-center justify-center min-h-[5rem] gap-2">
                      {specialAngulationCases.includes(id) ? (
                        <>
                          <div className={`p-1 rounded-lg transition-all duration-200 ${isYesAngulationSelected ? 'bg-blue-100 ring-2 ring-blue-500' : 'opacity-60 hover:opacity-100'}`}>
                            <Tooltip text={t?.tooltips?.angulation_yes}><AngulationYesIcon className={iconSizeClass} /></Tooltip>
                          </div>
                          <div className={`p-1 rounded-lg transition-all duration-200 ${isNoAngulationSelected ? 'bg-blue-100 ring-2 ring-blue-500' : 'opacity-60 hover:opacity-100'}`}>
                            <Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} /></Tooltip>
                          </div>
                        </>
                      ) : (
                        angulacion ? (
                            <Tooltip text={t?.tooltips?.angulation_yes}><AngulationYesIcon className={iconSizeClass} /></Tooltip>
                        ) : (
                            <Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} /></Tooltip>
                        )
                      )}
                    </div>
                </LabeledBlock>
            )}

            {/* 4. Torque */}
            {displayTorque && (
                <LabeledBlock label={t?.torque_label}>
                    <div className="flex items-center justify-center min-h-[5rem]">
                        {displayTorque === 15 && <Tooltip text={t?.tooltips?.torque_15}><Icon15 className={iconSizeClass} /></Tooltip>}
                        {displayTorque === 20 && <Tooltip text={t?.tooltips?.torque_20}><Icon20 className={iconSizeClass} /></Tooltip>}
                        {displayTorque === 35 && <Tooltip text={t?.tooltips?.torque_35}><Icon35 className={iconSizeClass} /></Tooltip>}
                    </div>
                </LabeledBlock>
            )}

            {/* 5. Software */}
            {(status === CaseStatus.Procera || status === CaseStatus.Local) && id !== 'EXO031' && (
                <LabeledBlock label={t?.software_label}>
                    <div className="flex flex-col items-center justify-center gap-y-3 pt-2">
                        <Tooltip text={t?.tooltips?.dtx}><DTXIcon className="h-8" /></Tooltip>
                        <Tooltip text={t?.tooltips?.exocad}><ExocadIcon className="h-6" /></Tooltip>
                        <Tooltip text={t?.tooltips?.three_shape}><ThreeShapeIcon className="h-6" /></Tooltip>
                        {status === CaseStatus.Local && id !== 'EXO020' && (
                            <Tooltip text={t?.tooltips?.dentalwings}><DentalwingsIcon className="h-6" /></Tooltip>
                        )}
                    </div>
                </LabeledBlock>
            )}

            {/* 6. Screw */}
            {notes?.includes("tornillo clínico incluido") && (
                 <LabeledBlock label={t?.screw_label}>
                    <div className="flex items-center justify-center min-h-[5rem]">
                        <Tooltip text={t?.tooltips?.screw_included}><ScrewIcon className={iconSizeClass} /></Tooltip>
                    </div>
                </LabeledBlock>
            )}
        </div>
    );
};

  const renderCardConnectionIcons = () => {
    const commonFlexClasses = "flex items-center justify-center gap-3";
    const groupFrameClasses = `flex items-center justify-center gap-3 p-2 border rounded-lg ${borderColorClass || 'border-current/20'}`;

    if (id === 'EXO024' || id === 'EXO025') {
      return (
        <div className="flex flex-row items-center justify-center gap-2">
          <div className={groupFrameClasses}>
            <Tooltip text={t?.tooltips?.cc}><CcIcon className={iconSizeClass} /></Tooltip>
            <Tooltip text={t?.tooltips?.multi_unit}><MuaIcon className={iconSizeClass} /></Tooltip>
            <Tooltip text={t?.tooltips?.angulation_yes}><AngulationYesIcon className={iconSizeClass} /></Tooltip>
          </div>
          <div className={groupFrameClasses}>
            <Tooltip text={t?.tooltips?.branemark}><ExtIcon className={iconSizeClass} /></Tooltip>
            <Tooltip text={t?.tooltips?.tri_channel}><TriIcon className={iconSizeClass} /></Tooltip>
            <Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} /></Tooltip>
          </div>
        </div>
      );
    }
    
    const allIcons: React.ReactNode[] = [];
    switch (id) {
        case 'EXO014':
            allIcons.push(<Tooltip text={t?.tooltips?.cc}><CcIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.n1}><N1Icon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.n1_base}><N1BaseIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.branemark}><ExtIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.tri_channel}><TriIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} /></Tooltip>);
            break;
        case 'EXO027':
        case 'EXO030':
            allIcons.push(<Tooltip text={t?.tooltips?.cc}><CcIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.branemark}><ExtIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.tri_channel}><TriIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} /></Tooltip>);
            break;
        case 'EXO026':
            allIcons.push(<Tooltip text={t?.tooltips?.cc}><CcIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.angulation_yes}><AngulationYesIcon className={iconSizeClass} /></Tooltip>);
            break;
        case 'EXO028':
            return (
              <div className="flex flex-row items-center justify-center gap-2">
                <div className={groupFrameClasses}>
                  <Tooltip text={t?.tooltips?.cc}><CcIcon className={iconSizeClass} /></Tooltip>
                  <Tooltip text={t?.tooltips?.angulation_yes}><AngulationYesIcon className={iconSizeClass} /></Tooltip>
                </div>
                <div className={groupFrameClasses}>
                  <Tooltip text={t?.tooltips?.tri_channel}><TriIcon className={iconSizeClass} /></Tooltip>
                  <Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} /></Tooltip>
                </div>
              </div>
            );
        case 'EXO029':
            allIcons.push(<Tooltip text={t?.tooltips?.cc}><CcIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.branemark}><ExtIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.tri_channel}><TriIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.multi_unit}><MuaIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} /></Tooltip>);
            break;
        case 'EXO032':
            allIcons.push(<Tooltip text={t?.tooltips?.cc}><CcIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.branemark}><ExtIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.tri_channel}><TriIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.multi_unit}><MuaIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} /></Tooltip>);
            break;
        case 'EXO034':
             allIcons.push(<Tooltip text={t?.tooltips?.cc}><CcIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.n1}><N1Icon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.branemark}><ExtIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.tri_channel}><TriIcon className={iconSizeClass} /></Tooltip>);
             break;
        case 'EXO031': 
            return isModal ? null : <div className="h-14"></div>;
        case 'EXO013':
            allIcons.push(<Tooltip text={t?.tooltips?.n1_base}><N1BaseIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.angulation_yes}><AngulationYesIcon className={iconSizeClass} /></Tooltip>);
            break;
        case 'EXO006':
            allIcons.push(<Tooltip text={t?.tooltips?.n1}><N1Icon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} /></Tooltip>);
            break;
        case 'EXO016':
            allIcons.push(<Tooltip text={t?.tooltips?.cc}><CcIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.branemark}><ExtIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.tri_channel}><TriIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.n1}><N1Icon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} /></Tooltip>);
            break;
        case 'EXO019':
            allIcons.push(<Tooltip text={t?.tooltips?.on1}><On1Icon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} /></Tooltip>);
            break;
        case 'EXO020':
            allIcons.push(<Tooltip text={t?.tooltips?.pearl}><PearlIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} /></Tooltip>);
            break;
        case 'EXO021':
            allIcons.push(<Tooltip text={t?.tooltips?.cc}><CcIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.branemark}><ExtIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.tri_channel}><TriIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} /></Tooltip>);
            break;
        case 'EXO022':
            allIcons.push(<Tooltip text={t?.tooltips?.cc}><CcIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.branemark}><ExtIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.tri_channel}><TriIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.multi_unit}><MuaIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} /></Tooltip>);
            break;
        case 'EXO023':
            allIcons.push(<Tooltip text={t?.tooltips?.cc}><CcIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.tri_channel}><TriIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.branemark}><ExtIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.n1}><N1Icon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.n1_base}><N1BaseIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.multi_unit}><MuaIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} /></Tooltip>);
            break;
        case 'EXO033':
            allIcons.push(<Tooltip text={t?.tooltips?.multi_unit}><MuaIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.angulation_yes}><AngulationYesIcon className={iconSizeClass} /></Tooltip>);
            break;
        default:
            const icon = renderConnectionIcon(connectionType);
            if (icon) allIcons.push(icon);
            break;
    }

    if (allIcons.length > 0) {
      return (
        <div className={`${commonFlexClasses} flex-wrap`}>
          {allIcons.map((icon, index) => <React.Fragment key={index}>{icon}</React.Fragment>)}
        </div>
      );
    }

    return null;
  };
  
  if (isModal) {
    return (
      <div className="border border-slate-200 rounded-lg overflow-hidden mb-6">
          <button
              onClick={() => setIsCharacteristicsOpen(!isCharacteristicsOpen)}
              className="w-full flex items-center justify-between p-3 text-left bg-[var(--card-bg-yellow)]"
              aria-expanded={isCharacteristicsOpen}
              aria-controls="restoration-characteristics-content"
          >
              <h3 className="font-semibold text-slate-800">{t?.characteristics_title}</h3>
              {isCharacteristicsOpen ? <ChevronUpIcon className="h-5 w-5 text-slate-700" /> : <ChevronDownIcon className="h-5 w-5 text-slate-700" />}
          </button>
          {isCharacteristicsOpen && (
              <div id="restoration-characteristics-content" className="p-4 bg-white animate-simple-fade-in">
                  <ModalIconsContent />
              </div>
          )}
      </div>
    );
  }

  // Card View
  return (
    <div>
      <div className={`my-3 border-t ${borderColorClass || 'border-current/20'}`}></div>
      <div className="flex items-center justify-center gap-4">
        {renderCardConnectionIcons()}
      </div>
    </div>
  );
};

export default CaseDetailIcons;