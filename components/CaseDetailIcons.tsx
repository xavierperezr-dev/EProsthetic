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

  const renderConnectionIcon = (connection: ConnectionType) => {
    switch (connection) {
      case ConnectionType.CC:
        if (status === CaseStatus.Otros) {
          return null;
        }
        return <Tooltip text={t?.tooltips?.cc}><CcIcon className={iconSizeClass} /></Tooltip>;
      case ConnectionType.TriChannel: return <Tooltip text={t?.tooltips?.tri_channel}><TriIcon className={iconSizeClass} /></Tooltip>;
      case ConnectionType.Branemark: return <Tooltip text={t?.tooltips?.branemark}><ExtIcon className={iconSizeClass} /></Tooltip>;
      case ConnectionType.MultiUnit:
        if (status === CaseStatus.Otros) {
          return null;
        }
        return <Tooltip text={t?.tooltips?.multi_unit}><MuaIcon className={iconSizeClass} /></Tooltip>;
      case ConnectionType.N1: return <Tooltip text={t?.tooltips?.n1}><N1Icon className={iconSizeClass} /></Tooltip>;
      case ConnectionType.N1Base: return <Tooltip text={t?.tooltips?.n1_base}><N1BaseIcon className={iconSizeClass} /></Tooltip>;
      case ConnectionType.On1: return <Tooltip text={t?.tooltips?.on1}><On1Icon className={iconSizeClass} /></Tooltip>;
      case ConnectionType.Pearl: return <Tooltip text={t?.tooltips?.pearl}><PearlIcon className={iconSizeClass} /></Tooltip>;
      default: return null;
    }
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
            allIcons.push(<Tooltip text={t?.tooltips?.cc}><CcIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.n1}><N1Icon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.n1_base}><N1BaseIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.on1}><On1Icon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.branemark}><ExtIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.tri_channel}><TriIcon className={iconSizeClass} /></Tooltip>, <Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} /></Tooltip>);
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

  const ModalIconsContent: React.FC = () => {
    if (id === 'EXO014') {
        const platformIcons = (
            <div className="flex items-center justify-center gap-3 flex-wrap">
                <Tooltip text={t?.tooltips?.cc}><CcIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} /></Tooltip>
                <Tooltip text={t?.tooltips?.n1}><N1Icon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'N1 TCC'} /></Tooltip>
                <Tooltip text={t?.tooltips?.n1_base}><N1BaseIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'N1 Base'} /></Tooltip>
                <Tooltip text={t?.tooltips?.on1}><On1Icon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'On1'} /></Tooltip>
                <Tooltip text={t?.tooltips?.branemark}><ExtIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Branemark'} /></Tooltip>
                <Tooltip text={t?.tooltips?.tri_channel}><TriIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Tri-channel'} /></Tooltip>
            </div>
        );
        const Separator = () => <div className="border-l-2 border-slate-200/80 self-stretch h-auto"></div>;
        return (
             <div className="flex items-start justify-between gap-4">
                <div className="flex items-stretch gap-4 flex-1">
                    <LabeledBlock label={t?.restoration_type_label || "Tipo Restauración"}><Tooltip text={t?.tooltips?.unitaria}><UnitariaIndicatorIcon className={unitariaSizeClass} /></Tooltip></LabeledBlock>
                    <Separator />
                    <LabeledBlock label={t?.platform_label || "Plataforma"}>{platformIcons}</LabeledBlock>
                    <Separator />
                    <LabeledBlock label={t?.angulation_label || "Angulación"}><Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} /></Tooltip></LabeledBlock>
                    <Separator />
                    <LabeledBlock label={t?.torque_label || "Torque"}><Tooltip text={t?.tooltips?.torque_35}><Icon35 className={iconSizeClass} /></Tooltip></LabeledBlock>
                    <Separator />
                    <LabeledBlock label={t?.software_label || "Soft. Compatible"}>
                        <div className="flex flex-col items-center justify-center gap-2 py-1">
                            <Tooltip text={t?.tooltips?.dtx}><DTXIcon className="h-8" /></Tooltip>
                            <Tooltip text={t?.tooltips?.exocad}><ExocadIcon className="h-6" /></Tooltip>
                            <Tooltip text={t?.tooltips?.three_shape}><ThreeShapeIcon className="h-6" /></Tooltip>
                        </div>
                    </LabeledBlock>
                    <Separator />
                    <LabeledBlock label={t?.screw_label || "Tornillo"}><Tooltip text={t?.tooltips?.screw_included}><ScrewIcon className={iconSizeClass} /></Tooltip></LabeledBlock>
                </div>
                {imageUrls?.[0] && (
                    <div className="flex items-stretch gap-4">
                        <Separator />
                        <LabeledBlock label={t?.image_label || "Imagen"}>
                            <div className="flex items-center justify-center">
                                <img src={imageUrls[0]} alt={`Thumbnail for ${patientName.es}`} className="h-32 w-32 object-contain rounded-md border border-slate-200 bg-white p-0.5" loading="lazy" />
                            </div>
                        </LabeledBlock>
                    </div>
                )}
            </div>
        );
    }
    if (id === 'EXO032') {
        const restorationIcons = (
            <div className="flex items-center justify-center gap-3 flex-wrap">
                {restorationType.includes(RestorationType.Multiple) && <Tooltip text={t?.tooltips?.multiple}><MultipleIndicatorIcon className={multipleSizeClass} /></Tooltip>}
            </div>
        );

        const platformIcons = (
            <div className="flex items-center justify-center gap-3 flex-wrap">
                <Tooltip text={t?.tooltips?.cc}><CcIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} /></Tooltip>
                <Tooltip text={t?.tooltips?.branemark}><ExtIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Branemark'} /></Tooltip>
                <Tooltip text={t?.tooltips?.tri_channel}><TriIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Tri-channel'} /></Tooltip>
                <Tooltip text={t?.tooltips?.multi_unit}><MuaIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Multi-Unit'} /></Tooltip>
            </div>
        );

        const angulationIcon = <Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} /></Tooltip>;

        const torqueIcon = <Tooltip text={t?.tooltips?.torque_35}><Icon35 className={iconSizeClass} /></Tooltip>;

        const softwareIcons = (
            <>
                <Tooltip text={t?.tooltips?.dtx}><DTXIcon className="h-8" /></Tooltip>
                <Tooltip text={t?.tooltips?.exocad}><ExocadIcon className="h-6" /></Tooltip>
                <Tooltip text={t?.tooltips?.three_shape}><ThreeShapeIcon className="h-6" /></Tooltip>
            </>
        );

        const screwIcon = <Tooltip text={t?.tooltips?.screw_included}><ScrewIcon className={iconSizeClass} /></Tooltip>;
        
        const imageThumbnail = imageUrls?.[0] ? (
            <div className="flex-shrink-0">
                <img src={imageUrls[0]} alt={`Thumbnail for ${patientName.es}`} className="h-32 w-32 object-contain rounded-md border border-slate-200 bg-white p-0.5" loading="lazy" />
            </div>
        ) : null;
        
        const Separator = () => <div className="border-l-2 border-slate-200/80 self-stretch h-auto"></div>;

        return (
             <div className="flex items-start justify-between gap-4">
                <div className="flex items-stretch gap-4 flex-1">
                    <LabeledBlock label={t?.restoration_type_label || "Tipo Restauración"}>
                        {restorationIcons}
                    </LabeledBlock>
                    <Separator />
                    <LabeledBlock label={t?.platform_label || "Plataforma"}>
                        {platformIcons}
                    </LabeledBlock>
                    <Separator />
                    <LabeledBlock label={t?.angulation_label || "Angulación"}>
                        {angulationIcon}
                    </LabeledBlock>
                    <Separator />
                    <LabeledBlock label={t?.torque_label || "Torque"}>
                        {torqueIcon}
                    </LabeledBlock>
                    <Separator />
                    <LabeledBlock label={t?.software_label || "Soft. Compatible"}>
                        <div className="flex flex-col items-center justify-center gap-2 py-1">
                            {softwareIcons}
                        </div>
                    </LabeledBlock>
                    <Separator />
                    <LabeledBlock label={t?.screw_label || "Tornillo"}>
                        {screwIcon}
                    </LabeledBlock>
                </div>
                 {imageThumbnail && (
                    <div className="flex items-stretch gap-4">
                        <Separator />
                        <LabeledBlock label={t?.image_label || "Imagen"}>
                            <div className="flex items-center justify-center">{imageThumbnail}</div>
                        </LabeledBlock>
                    </div>
                )}
            </div>
        );
    }
    if (id === 'EXO034') {
        const restorationIcons = <Tooltip text={t?.tooltips?.multiple}><MultipleIndicatorIcon className={multipleSizeClass} /></Tooltip>;

        const platformIcons = (
            <div className="flex items-center justify-center gap-3 flex-wrap">
                <Tooltip text={t?.tooltips?.cc}><CcIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} /></Tooltip>
                <Tooltip text={t?.tooltips?.n1}><N1Icon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'N1 TCC'} /></Tooltip>
                <Tooltip text={t?.tooltips?.branemark}><ExtIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Branemark'} /></Tooltip>
                <Tooltip text={t?.tooltips?.tri_channel}><TriIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Tri-channel'} /></Tooltip>
            </div>
        );

        const angulationIcon = <Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} /></Tooltip>;
        const torqueIcon = <Tooltip text={t?.tooltips?.torque_15}><Icon15 className={iconSizeClass} /></Tooltip>;

        const softwareIcons = (
            <>
                <Tooltip text={t?.tooltips?.dtx}><DTXIcon className="h-8" /></Tooltip>
                <Tooltip text={t?.tooltips?.exocad}><ExocadIcon className="h-6" /></Tooltip>
                <Tooltip text={t?.tooltips?.three_shape}><ThreeShapeIcon className="h-6" /></Tooltip>
            </>
        );

        const screwIcon = <Tooltip text={t?.tooltips?.screw_included}><ScrewIcon className={iconSizeClass} /></Tooltip>;
        
        const imageThumbnail = imageUrls?.[0] ? (
            <div className="flex-shrink-0">
                <img src={imageUrls[0]} alt={`Thumbnail for ${patientName.es}`} className="h-32 w-32 object-contain rounded-md border border-slate-200 bg-white p-0.5" loading="lazy" />
            </div>
        ) : null;
        
        const Separator = () => <div className="border-l-2 border-slate-200/80 self-stretch h-auto"></div>;

        return (
             <div className="flex items-start justify-between gap-4">
                <div className="flex items-stretch gap-4 flex-1">
                    <LabeledBlock label={t?.restoration_type_label || "Tipo Restauración"}>
                        {restorationIcons}
                    </LabeledBlock>
                    <Separator />
                    <LabeledBlock label={t?.platform_label || "Plataforma"}>
                        {platformIcons}
                    </LabeledBlock>
                    <Separator />
                    <LabeledBlock label={t?.angulation_label || "Angulación"}>
                        {angulationIcon}
                    </LabeledBlock>
                    <Separator />
                    <LabeledBlock label={t?.torque_label || "Torque"}>
                        {torqueIcon}
                    </LabeledBlock>
                    <Separator />
                    <LabeledBlock label={t?.software_label || "Soft. Compatible"}>
                        <div className="flex flex-col items-center justify-center gap-2 py-1">
                            {softwareIcons}
                        </div>
                    </LabeledBlock>
                    <Separator />
                    <LabeledBlock label={t?.screw_label || "Tornillo"}>
                        {screwIcon}
                    </LabeledBlock>
                </div>
                 {imageThumbnail && (
                    <div className="flex items-stretch gap-4">
                        <Separator />
                        <LabeledBlock label={t?.image_label || "Imagen"}>
                            <div className="flex items-center justify-center">{imageThumbnail}</div>
                        </LabeledBlock>
                    </div>
                )}
            </div>
        );
    }

    const restorationIcons = (
        <div className="flex items-center justify-center gap-3 flex-wrap">
            {restorationType.includes(RestorationType.Unitaria) && <Tooltip text={t?.tooltips?.unitaria}><UnitariaIndicatorIcon className={unitariaSizeClass} /></Tooltip>}
            {restorationType.includes(RestorationType.Multiple) && <Tooltip text={t?.tooltips?.multiple}><MultipleIndicatorIcon className={multipleSizeClass} /></Tooltip>}
        </div>
    );

    let connectionIcons: React.ReactNode = null;
    let angulationIcons: React.ReactNode = null;
    let torqueIcon: React.ReactNode = null;
    const groupFrameClasses = "flex items-center justify-center gap-3 p-2 border border-slate-200 rounded-lg bg-white";

    const showYesDot = connectionTypeForTable === 'CC' || connectionTypeForTable === 'Multi-Unit';
    const showNoDot = connectionTypeForTable === 'Branemark' || connectionTypeForTable === 'Tri-channel';
    
    const hasBothAngulationIcons = ['EXO024', 'EXO025', 'EXO028'].includes(id);

    const angulationYesDot = hasBothAngulationIcons ? showYesDot : false;
    const angulationNoDot = hasBothAngulationIcons ? showNoDot : false;

    if (id === 'EXO024' || id === 'EXO025') {
        connectionIcons = (
            <div className="flex flex-row items-center justify-center gap-2">
              <div className={groupFrameClasses}>
                <Tooltip text={t?.tooltips?.cc}><CcIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} /></Tooltip>
                <Tooltip text={t?.tooltips?.multi_unit}><MuaIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Multi-Unit'}/></Tooltip>
                <Tooltip text={t?.tooltips?.angulation_yes}><AngulationYesIcon className={iconSizeClass} withLeftDot={angulationYesDot} /></Tooltip>
              </div>
              <div className={groupFrameClasses}>
                <Tooltip text={t?.tooltips?.branemark}><ExtIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Branemark'}/></Tooltip>
                <Tooltip text={t?.tooltips?.tri_channel}><TriIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Tri-channel'}/></Tooltip>
                <Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} withLeftDot={angulationNoDot} /></Tooltip>
              </div>
            </div>
        );
        angulationIcons = null;
    } else {
        const connIconList: React.ReactNode[] = [];
        const angIconList: React.ReactNode[] = [];

        switch (id) {
            case 'EXO027': case 'EXO030':
                connIconList.push(<Tooltip text={t?.tooltips?.cc} key="cc"><CcIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} /></Tooltip>, <Tooltip text={t?.tooltips?.branemark} key="ext"><ExtIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Branemark'} /></Tooltip>, <Tooltip text={t?.tooltips?.tri_channel} key="tri"><TriIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Tri-channel'} /></Tooltip>);
                angIconList.push(<Tooltip text={t?.tooltips?.angulation_no} key="ang-no"><AngulationNoIcon className={iconSizeClass} withLeftDot={angulationNoDot} /></Tooltip>);
                break;
            case 'EXO026':
                connIconList.push(<Tooltip text={t?.tooltips?.cc} key="cc"><CcIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} /></Tooltip>);
                angIconList.push(<Tooltip text={t?.tooltips?.angulation_yes} key="ang-yes"><AngulationYesIcon className={iconSizeClass} withLeftDot={angulationYesDot} /></Tooltip>);
                break;
            case 'EXO028':
                connIconList.push(
                    <div key="exo028-icons" className="flex flex-row items-center justify-center gap-2">
                        <div className={groupFrameClasses}>
                            <Tooltip text={t?.tooltips?.cc}><CcIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} /></Tooltip>
                            <Tooltip text={t?.tooltips?.angulation_yes}><AngulationYesIcon className={iconSizeClass} withLeftDot={angulationYesDot} /></Tooltip>
                        </div>
                        <div className={groupFrameClasses}>
                            <Tooltip text={t?.tooltips?.tri_channel}><TriIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Tri-channel'} /></Tooltip>
                            <Tooltip text={t?.tooltips?.angulation_no}><AngulationNoIcon className={iconSizeClass} withLeftDot={angulationNoDot} /></Tooltip>
                        </div>
                    </div>
                );
                break;
            case 'EXO029':
                connIconList.push(<Tooltip text={t?.tooltips?.cc} key="cc"><CcIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} /></Tooltip>, <Tooltip text={t?.tooltips?.branemark} key="ext"><ExtIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Branemark'} /></Tooltip>, <Tooltip text={t?.tooltips?.tri_channel} key="tri"><TriIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Tri-channel'} /></Tooltip>, <Tooltip text={t?.tooltips?.multi_unit} key="mua"><MuaIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Multi-Unit'} /></Tooltip>);
                angIconList.push(<Tooltip text={t?.tooltips?.angulation_no} key="ang-no"><AngulationNoIcon className={iconSizeClass} withLeftDot={angulationNoDot} /></Tooltip>);
                break;
            case 'EXO032':
                // This is handled in App.tsx to appear below the downloads section.
                // Leave empty to avoid duplication.
                break;
            case 'EXO013':
                connIconList.push(<Tooltip text={t?.tooltips?.n1_base}><N1BaseIcon className={iconSizeClass} /></Tooltip>);
                angIconList.push(<Tooltip text={t?.tooltips?.angulation_yes} key="ang-yes"><AngulationYesIcon className={iconSizeClass} withLeftDot={angulationNoDot} /></Tooltip>);
                break;
            case 'EXO016':
                connIconList.push(<Tooltip text={t?.tooltips?.cc} key="cc"><CcIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} /></Tooltip>, <Tooltip text={t?.tooltips?.branemark} key="ext"><ExtIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Branemark'} /></Tooltip>, <Tooltip text={t?.tooltips?.tri_channel} key="tri"><TriIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Tri-channel'} /></Tooltip>, <Tooltip text={t?.tooltips?.n1} key="n1"><N1Icon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'N1 TCC'} /></Tooltip>);
                angIconList.push(<Tooltip text={t?.tooltips?.angulation_no} key="ang-no"><AngulationNoIcon className={iconSizeClass} withLeftDot={angulationNoDot} /></Tooltip>);
                break;
            case 'EXO019':
                connIconList.push(<Tooltip text={t?.tooltips?.on1}><On1Icon className={iconSizeClass} /></Tooltip>);
                angIconList.push(<Tooltip text={t?.tooltips?.angulation_no} key="ang-no"><AngulationNoIcon className={iconSizeClass} withLeftDot={angulationNoDot} /></Tooltip>);
                break;
            case 'EXO020':
                connIconList.push(<Tooltip text={t?.tooltips?.pearl}><PearlIcon className={iconSizeClass} /></Tooltip>);
                angIconList.push(<Tooltip text={t?.tooltips?.angulation_no} key="ang-no"><AngulationNoIcon className={iconSizeClass} withLeftDot={angulationNoDot} /></Tooltip>);
                break;
            case 'EXO021':
                connIconList.push(<Tooltip text={t?.tooltips?.cc} key="cc"><CcIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} /></Tooltip>, <Tooltip text={t?.tooltips?.branemark} key="ext"><ExtIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Branemark'} /></Tooltip>, <Tooltip text={t?.tooltips?.tri_channel} key="tri"><TriIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Tri-channel'} /></Tooltip>);
                angIconList.push(<Tooltip text={t?.tooltips?.angulation_no} key="ang-no"><AngulationNoIcon className={iconSizeClass} withLeftDot={angulationNoDot} /></Tooltip>);
                break;
            case 'EXO022':
                connIconList.push(<Tooltip text={t?.tooltips?.cc} key="cc"><CcIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} /></Tooltip>, <Tooltip text={t?.tooltips?.branemark} key="ext"><ExtIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Branemark'} /></Tooltip>, <Tooltip text={t?.tooltips?.tri_channel} key="tri"><TriIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Tri-channel'} /></Tooltip>, <Tooltip text={t?.tooltips?.multi_unit} key="mua"><MuaIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Multi-Unit'} /></Tooltip>);
                angIconList.push(<Tooltip text={t?.tooltips?.angulation_no} key="ang-no"><AngulationNoIcon className={iconSizeClass} withLeftDot={angulationNoDot} /></Tooltip>);
                break;
            case 'EXO006':
                connIconList.push(<Tooltip text={t?.tooltips?.n1}><N1Icon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'N1 TCC'} /></Tooltip>);
                angIconList.push(<Tooltip text={t?.tooltips?.angulation_no} key="ang-no"><AngulationNoIcon className={iconSizeClass} withLeftDot={angulationNoDot} /></Tooltip>);
                break;
            case 'EXO031':
                break;
            default:
                const icon = renderConnectionIcon(connectionType);
                if (icon) connIconList.push(icon);
                if (caseData.angulacion === true) angIconList.push(<Tooltip text={t?.tooltips?.angulation_yes} key="ang-yes"><AngulationYesIcon className={iconSizeClass} withLeftDot={angulationYesDot}/></Tooltip>);
                if (caseData.angulacion === false) angIconList.push(<Tooltip text={t?.tooltips?.angulation_no} key="ang-no"><AngulationNoIcon className={iconSizeClass} withLeftDot={angulationNoDot}/></Tooltip>);
                break;
        }

        if (connIconList.length > 0) connectionIcons = <div className="flex items-center justify-center gap-3 flex-wrap">{connIconList.map((icon, i) => <React.Fragment key={i}>{icon}</React.Fragment>)}</div>;
        if (angIconList.length > 0) angulationIcons = <div className="flex items-center justify-center gap-3 flex-wrap">{angIconList.map((icon, i) => <React.Fragment key={i}>{icon}</React.Fragment>)}</div>;
    }

    if (id === 'EXO022') {
        const isMUA = connectionTypeForTable === 'Multi-Unit' || connectionTypeForTable === 'MUA';
        torqueIcon = isMUA ? <Tooltip text={t?.tooltips?.torque_15}><Icon15 className={iconSizeClass} /></Tooltip> : <Tooltip text={t?.tooltips?.torque_35}><Icon35 className={iconSizeClass} /></Tooltip>;
    } else if (id === 'EXO021') {
        torqueIcon = <Tooltip text={t?.tooltips?.torque_35}><Icon35 className={iconSizeClass} /></Tooltip>;
    } else if (status === CaseStatus.Procera) {
      let isMUA = false;
      if (connectionTypeForTable) {
        isMUA = connectionTypeForTable === 'Multi-Unit' || connectionTypeForTable === 'MUA';
      } else {
        isMUA = caseData.connectionType === ConnectionType.MultiUnit;
      }

      if (isMUA) {
        torqueIcon = <Tooltip text={t?.tooltips?.torque_15}><Icon15 className={iconSizeClass} /></Tooltip>;
      } else {
        torqueIcon = <Tooltip text={t?.tooltips?.torque_35}><Icon35 className={iconSizeClass} /></Tooltip>;
      }
    } else { // Local cases
      if (caseData.torque) {
        let TorqueIcon;
        let torqueText;
        switch (caseData.torque) {
          case 15:
            TorqueIcon = Icon15;
            torqueText = t?.tooltips?.torque_15;
            break;
          case 20:
            TorqueIcon = Icon20;
            torqueText = t?.tooltips?.torque_20;
            break;
          case 35:
            TorqueIcon = Icon35;
            torqueText = t?.tooltips?.torque_35;
            break;
          default:
            TorqueIcon = null;
            torqueText = '';
        }
        if (TorqueIcon) {
          torqueIcon = <Tooltip text={torqueText}><TorqueIcon className={iconSizeClass} /></Tooltip>;
        }
      }
    }
    
    const softwareIcons = (caseData.status === CaseStatus.Procera || caseData.status === CaseStatus.Local) ? (
        <>
            <Tooltip text={t?.tooltips?.dtx}><DTXIcon className="h-8" /></Tooltip>
            <Tooltip text={t?.tooltips?.exocad}><ExocadIcon className="h-6" /></Tooltip>
            <Tooltip text={t?.tooltips?.three_shape}><ThreeShapeIcon className="h-6" /></Tooltip>
            {caseData.status === CaseStatus.Local && caseData.id !== 'EXO020' && <Tooltip text={t?.tooltips?.dentalwings}><DentalwingsIcon className="h-6" /></Tooltip>}
        </>
    ) : null;

    const screwIcon = (caseData.status === CaseStatus.Procera || caseData.status === CaseStatus.Local) ? (
        <Tooltip text={t?.tooltips?.screw_included}><ScrewIcon className={iconSizeClass} /></Tooltip>
    ) : null;
    
    const imageThumbnail = imageUrls?.[0] ? (
        <div className="flex-shrink-0">
            <img src={imageUrls[0]} alt={`Thumbnail for ${patientName.es}`} className="h-32 w-32 object-contain rounded-md border border-slate-200 bg-white p-0.5" loading="lazy" />
        </div>
    ) : null;

    const Separator = () => <div className="border-l-2 border-slate-200/80 self-stretch h-auto"></div>;

    return (
        <div className="flex items-start justify-between gap-4">
            <div className="flex items-stretch gap-4 flex-1">
                {/* Block 1: Restoration */}
                {restorationIcons && (
                    <LabeledBlock label={t?.restoration_type_label || "Tipo Restauración"}>
                        {restorationIcons}
                    </LabeledBlock>
                )}

                {/* Separator 1 */}
                {restorationIcons && (connectionIcons || angulationIcons) && <Separator />}

                {/* Block 2: Platform & Angulation Group */}
                {(connectionIcons || angulationIcons) && (
                    <div className="flex items-stretch gap-2">
                        {connectionIcons && (
                            <LabeledBlock label={!angulationIcons ? `${t?.platform_label || "Plataforma"} / ${t?.angulation_label || "Angulación"}`: t?.platform_label || "Plataforma"}>
                               {connectionIcons}
                            </LabeledBlock>
                        )}
                        {angulationIcons && (
                            <LabeledBlock label={t?.angulation_label || "Angulación"}>
                                {angulationIcons}
                            </LabeledBlock>
                        )}
                    </div>
                )}
                
                {/* Separator 2 */}
                {(connectionIcons || angulationIcons) && torqueIcon && <Separator />}
                
                {/* Block 3: Torque */}
                {torqueIcon && (
                    <LabeledBlock label={t?.torque_label || "Torque"}>
                        {torqueIcon}
                    </LabeledBlock>
                )}

                {/* Separator 3 */}
                {torqueIcon && softwareIcons && <Separator />}

                {/* Block 4: Software */}
                {softwareIcons && (
                    <LabeledBlock label={t?.software_label || "Soft. Compatible"}>
                        <div className="flex flex-col items-center justify-center gap-2 py-1">
                            {softwareIcons}
                        </div>
                    </LabeledBlock>
                )}

                {softwareIcons && screwIcon && <Separator />}

                {screwIcon && (
                    <LabeledBlock label={t?.screw_label || "Tornillo"}>
                        {screwIcon}
                    </LabeledBlock>
                )}
            </div>

            {/* Separator before Image */}
            {imageThumbnail && (
                <div className="flex items-stretch gap-4">
                    <Separator />
                    <LabeledBlock label={t?.image_label || "Imagen"}>
                        <div className="flex items-center justify-center">{imageThumbnail}</div>
                    </LabeledBlock>
                </div>
            )}
        </div>
    );
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