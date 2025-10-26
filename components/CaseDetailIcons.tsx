import React from 'react';
import { DentalCase, ConnectionType, RestorationType, CaseStatus } from '../types';
import { 
    CcIcon, ExtIcon, TriIcon, MuaIcon, UnitariaIndicatorIcon, MultipleIndicatorIcon, 
    N1Icon, AngulationYesIcon, AngulationNoIcon, N1BaseIcon, On1Icon, PearlIcon,
    DTXIcon, ExocadIcon, ThreeShapeIcon, DentalwingsIcon, Icon15, Icon35, Icon20,
    ScrewIcon
} from './icons';

interface CaseDetailIconsProps {
  caseData: DentalCase;
  isModal?: boolean;
  t?: any;
  connectionTypeForTable?: string;
  borderColorClass?: string;
}

const LabeledBlock: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({ label, children, className }) => (
    <div className={`flex flex-col items-center text-center ${className}`}>
        <span className="text-[10px] font-bold text-current opacity-80 uppercase tracking-wider mb-1 whitespace-nowrap">{label}</span>
        <div className="flex items-center justify-center h-full pt-1">{children}</div>
    </div>
);

const CaseDetailIcons: React.FC<CaseDetailIconsProps> = ({ caseData, isModal = false, t, connectionTypeForTable, borderColorClass }) => {
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
        return <CcIcon className={iconSizeClass} />;
      case ConnectionType.TriChannel: return <TriIcon className={iconSizeClass} />;
      case ConnectionType.Branemark: return <ExtIcon className={iconSizeClass} />;
      case ConnectionType.MultiUnit:
        if (status === CaseStatus.Otros) {
          return null;
        }
        return <MuaIcon className={iconSizeClass} />;
      case ConnectionType.N1: return <N1Icon className={iconSizeClass} />;
      case ConnectionType.N1Base: return <N1BaseIcon className={iconSizeClass} />;
      case ConnectionType.On1: return <On1Icon className={iconSizeClass} />;
      case ConnectionType.Pearl: return <PearlIcon className={iconSizeClass} />;
      default: return null;
    }
  };

  const renderCardConnectionIcons = () => {
    const commonFlexClasses = "flex items-center justify-center gap-3";
    const groupFrameClasses = `flex items-center justify-center gap-3 p-2 border rounded-lg ${borderColorClass || 'border-current/20'}`;

    if (id === 'EXO024' || id === 'EXO025') {
      return (
        <div className="flex flex-col gap-2">
          <div className={groupFrameClasses}>
            <CcIcon className={iconSizeClass} />
            <MuaIcon className={iconSizeClass} />
            <AngulationYesIcon className={iconSizeClass} />
          </div>
          <div className={groupFrameClasses}>
            <ExtIcon className={iconSizeClass} />
            <TriIcon className={iconSizeClass} />
            <AngulationNoIcon className={iconSizeClass} />
          </div>
        </div>
      );
    }
    
    const allIcons: React.ReactNode[] = [];
    switch (id) {
        case 'EXO014':
            allIcons.push(<CcIcon className={iconSizeClass} />, <N1Icon className={iconSizeClass} />, <N1BaseIcon className={iconSizeClass} />, <On1Icon className={iconSizeClass} />, <ExtIcon className={iconSizeClass} />, <TriIcon className={iconSizeClass} />, <AngulationNoIcon className={iconSizeClass} />);
            break;
        case 'EXO027':
        case 'EXO030':
            allIcons.push(<CcIcon className={iconSizeClass} />, <ExtIcon className={iconSizeClass} />, <TriIcon className={iconSizeClass} />, <AngulationNoIcon className={iconSizeClass} />);
            break;
        case 'EXO026':
            allIcons.push(<CcIcon className={iconSizeClass} />, <AngulationYesIcon className={iconSizeClass} />);
            break;
        case 'EXO028':
            return (
              <div className="flex flex-col gap-2">
                <div className={groupFrameClasses}>
                  <CcIcon className={iconSizeClass} />
                  <AngulationYesIcon className={iconSizeClass} />
                </div>
                <div className={groupFrameClasses}>
                  <TriIcon className={iconSizeClass} />
                  <AngulationNoIcon className={iconSizeClass} />
                </div>
              </div>
            );
        case 'EXO029':
            allIcons.push(<CcIcon className={iconSizeClass} />, <ExtIcon className={iconSizeClass} />, <TriIcon className={iconSizeClass} />, <MuaIcon className={iconSizeClass} />, <AngulationNoIcon className={iconSizeClass} />);
            break;
        case 'EXO032':
            allIcons.push(<CcIcon className={iconSizeClass} />, <ExtIcon className={iconSizeClass} />, <TriIcon className={iconSizeClass} />, <MuaIcon className={iconSizeClass} />, <AngulationNoIcon className={iconSizeClass} />);
            break;
        case 'EXO034':
             allIcons.push(<CcIcon className={iconSizeClass} />, <N1Icon className={iconSizeClass} />, <ExtIcon className={iconSizeClass} />, <TriIcon className={iconSizeClass} />);
             break;
        case 'EXO031': 
            return isModal ? null : <div className="h-14"></div>;
        case 'EXO013':
            allIcons.push(<N1BaseIcon className={iconSizeClass} />, <AngulationYesIcon className={iconSizeClass} />);
            break;
        case 'EXO016':
            allIcons.push(<CcIcon className={iconSizeClass} />, <ExtIcon className={iconSizeClass} />, <TriIcon className={iconSizeClass} />, <N1Icon className={iconSizeClass} />, <AngulationNoIcon className={iconSizeClass} />);
            break;
        case 'EXO019':
            allIcons.push(<On1Icon className={iconSizeClass} />, <AngulationNoIcon className={iconSizeClass} />);
            break;
        case 'EXO020':
            allIcons.push(<PearlIcon className={iconSizeClass} />, <AngulationNoIcon className={iconSizeClass} />);
            break;
        case 'EXO021':
            allIcons.push(<CcIcon className={iconSizeClass} />, <ExtIcon className={iconSizeClass} />, <TriIcon className={iconSizeClass} />, <AngulationNoIcon className={iconSizeClass} />);
            break;
        case 'EXO022':
            allIcons.push(<CcIcon className={iconSizeClass} />, <ExtIcon className={iconSizeClass} />, <TriIcon className={iconSizeClass} />, <MuaIcon className={iconSizeClass} />, <AngulationNoIcon className={iconSizeClass} />);
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
    if (id === 'EXO014') {
        const platformIcons = (
            <div className="flex items-center justify-center gap-3 flex-wrap">
                <CcIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} />
                <N1Icon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'N1 TCC'} />
                <N1BaseIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'N1 Base'} />
                <On1Icon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'On1'} />
                <ExtIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Branemark'} />
                <TriIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Tri-channel'} />
            </div>
        );
        const Separator = () => <div className="border-l-2 border-slate-200/80 self-stretch h-auto"></div>;
        return (
             <div className="flex items-start justify-between gap-4">
                <div className="flex items-stretch gap-4 flex-1">
                    <LabeledBlock label={t?.restoration_type_label || "Tipo Restauración"}><UnitariaIndicatorIcon className={unitariaSizeClass} /></LabeledBlock>
                    <Separator />
                    <LabeledBlock label={t?.platform_label || "Plataforma"}>{platformIcons}</LabeledBlock>
                    <Separator />
                    <LabeledBlock label={t?.angulation_label || "Angulación"}><AngulationNoIcon className={iconSizeClass} /></LabeledBlock>
                    <Separator />
                    <LabeledBlock label={t?.torque_label || "Torque"}><Icon35 className={iconSizeClass} /></LabeledBlock>
                    <Separator />
                    <LabeledBlock label={t?.software_label || "Soft. Compatible"}>
                        <div className="flex flex-col items-center justify-center gap-2 py-1">
                            <DTXIcon className="h-8" /><ExocadIcon className="h-6" /><ThreeShapeIcon className="h-6" />
                        </div>
                    </LabeledBlock>
                    <Separator />
                    <LabeledBlock label={t?.screw_label || "Tornillo"}><ScrewIcon className={iconSizeClass} /></LabeledBlock>
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
                {restorationType.includes(RestorationType.Multiple) && <MultipleIndicatorIcon className={multipleSizeClass} />}
            </div>
        );

        const platformIcons = (
            <div className="flex items-center justify-center gap-3 flex-wrap">
                <CcIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} />
                <ExtIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Branemark'} />
                <TriIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Tri-channel'} />
                <MuaIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Multi-Unit'} />
            </div>
        );

        const angulationIcon = <AngulationNoIcon className={iconSizeClass} />;

        const torqueIcon = <Icon35 className={iconSizeClass} />;

        const softwareIcons = (
            <>
                <DTXIcon className="h-8" />
                <ExocadIcon className="h-6" />
                <ThreeShapeIcon className="h-6" />
            </>
        );

        const screwIcon = <ScrewIcon className={iconSizeClass} />;
        
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
        const restorationIcons = <MultipleIndicatorIcon className={multipleSizeClass} />;

        const platformIcons = (
            <div className="flex items-center justify-center gap-3 flex-wrap">
                <CcIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} />
                <N1Icon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'N1 TCC'} />
                <ExtIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Branemark'} />
                <TriIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Tri-channel'} />
            </div>
        );

        const angulationIcon = <AngulationNoIcon className={iconSizeClass} />;
        const torqueIcon = <Icon15 className={iconSizeClass} />;

        const softwareIcons = (
            <>
                <DTXIcon className="h-8" />
                <ExocadIcon className="h-6" />
                <ThreeShapeIcon className="h-6" />
            </>
        );

        const screwIcon = <ScrewIcon className={iconSizeClass} />;
        
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
            {restorationType.includes(RestorationType.Unitaria) && <UnitariaIndicatorIcon className={unitariaSizeClass} />}
            {restorationType.includes(RestorationType.Multiple) && <MultipleIndicatorIcon className={multipleSizeClass} />}
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
            <div className="flex flex-col gap-2">
              <div className={groupFrameClasses}>
                <CcIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} />
                <MuaIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Multi-Unit'}/>
                <AngulationYesIcon className={iconSizeClass} withLeftDot={angulationYesDot} />
              </div>
              <div className={groupFrameClasses}>
                <ExtIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Branemark'}/>
                <TriIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Tri-channel'}/>
                <AngulationNoIcon className={iconSizeClass} withLeftDot={angulationNoDot} />
              </div>
            </div>
        );
        angulationIcons = null;
    } else {
        const connIconList: React.ReactNode[] = [];
        const angIconList: React.ReactNode[] = [];

        switch (id) {
            case 'EXO027': case 'EXO030':
                connIconList.push(<CcIcon key="cc" className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} />, <ExtIcon key="ext" className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Branemark'} />, <TriIcon key="tri" className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Tri-channel'} />);
                angIconList.push(<AngulationNoIcon key="ang-no" className={iconSizeClass} withLeftDot={angulationNoDot} />);
                break;
            case 'EXO026':
                connIconList.push(<CcIcon key="cc" className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} />);
                angIconList.push(<AngulationYesIcon key="ang-yes" className={iconSizeClass} withLeftDot={angulationYesDot} />);
                break;
            case 'EXO028':
                connIconList.push(
                    <div key="exo028-icons" className="flex flex-col gap-2">
                        <div className={groupFrameClasses}>
                            <CcIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} />
                            <AngulationYesIcon className={iconSizeClass} withLeftDot={angulationYesDot} />
                        </div>
                        <div className={groupFrameClasses}>
                            <TriIcon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Tri-channel'} />
                            <AngulationNoIcon className={iconSizeClass} withLeftDot={angulationNoDot} />
                        </div>
                    </div>
                );
                break;
            case 'EXO029':
                connIconList.push(<CcIcon key="cc" className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} />, <ExtIcon key="ext" className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Branemark'} />, <TriIcon key="tri" className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Tri-channel'} />, <MuaIcon key="mua" className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Multi-Unit'} />);
                angIconList.push(<AngulationNoIcon key="ang-no" className={iconSizeClass} withLeftDot={angulationNoDot} />);
                break;
            case 'EXO032':
                // This is handled in App.tsx to appear below the downloads section.
                // Leave empty to avoid duplication.
                break;
            case 'EXO013':
                connIconList.push(<N1BaseIcon className={iconSizeClass} />);
                angIconList.push(<AngulationYesIcon key="ang-yes" className={iconSizeClass} withLeftDot={angulationNoDot} />);
                break;
            case 'EXO016':
                connIconList.push(<CcIcon key="cc" className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} />, <ExtIcon key="ext" className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Branemark'} />, <TriIcon key="tri" className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Tri-channel'} />, <N1Icon key="n1" className={iconSizeClass} withLeftDot={connectionTypeForTable === 'N1 TCC'} />);
                angIconList.push(<AngulationNoIcon key="ang-no" className={iconSizeClass} withLeftDot={angulationNoDot} />);
                break;
            case 'EXO019':
                connIconList.push(<On1Icon className={iconSizeClass} />);
                angIconList.push(<AngulationNoIcon key="ang-no" className={iconSizeClass} withLeftDot={angulationNoDot} />);
                break;
            case 'EXO020':
                connIconList.push(<PearlIcon className={iconSizeClass} />);
                angIconList.push(<AngulationNoIcon key="ang-no" className={iconSizeClass} withLeftDot={angulationNoDot} />);
                break;
            case 'EXO021':
                connIconList.push(<CcIcon key="cc" className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} />, <ExtIcon key="ext" className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Branemark'} />, <TriIcon key="tri" className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Tri-channel'} />);
                angIconList.push(<AngulationNoIcon key="ang-no" className={iconSizeClass} withLeftDot={angulationNoDot} />);
                break;
            case 'EXO022':
                connIconList.push(<CcIcon key="cc" className={iconSizeClass} withLeftDot={connectionTypeForTable === 'CC'} />, <ExtIcon key="ext" className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Branemark'} />, <TriIcon key="tri" className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Tri-channel'} />, <MuaIcon key="mua" className={iconSizeClass} withLeftDot={connectionTypeForTable === 'Multi-Unit'} />);
                angIconList.push(<AngulationNoIcon key="ang-no" className={iconSizeClass} withLeftDot={angulationNoDot} />);
                break;
            case 'EXO006':
                connIconList.push(<N1Icon className={iconSizeClass} withLeftDot={connectionTypeForTable === 'N1 TCC'} />);
                angIconList.push(<AngulationNoIcon key="ang-no" className={iconSizeClass} withLeftDot={angulationNoDot} />);
                break;
            case 'EXO031':
                break;
            default:
                const icon = renderConnectionIcon(connectionType);
                if (icon) connIconList.push(icon);
                if (caseData.angulacion === true) angIconList.push(<AngulationYesIcon key="ang-yes" className={iconSizeClass} withLeftDot={angulationYesDot}/>);
                if (caseData.angulacion === false) angIconList.push(<AngulationNoIcon key="ang-no" className={iconSizeClass} withLeftDot={angulationNoDot}/>);
                break;
        }

        if (connIconList.length > 0) connectionIcons = <div className="flex items-center justify-center gap-3 flex-wrap">{connIconList.map((icon, i) => <React.Fragment key={i}>{icon}</React.Fragment>)}</div>;
        if (angIconList.length > 0) angulationIcons = <div className="flex items-center justify-center gap-3 flex-wrap">{angIconList.map((icon, i) => <React.Fragment key={i}>{icon}</React.Fragment>)}</div>;
    }

    if (id === 'EXO022') {
        const isMUA = connectionTypeForTable === 'Multi-Unit' || connectionTypeForTable === 'MUA';
        torqueIcon = isMUA ? <Icon15 className={iconSizeClass} /> : <Icon35 className={iconSizeClass} />;
    } else if (id === 'EXO021') {
        torqueIcon = <Icon35 className={iconSizeClass} />;
    } else if (status === CaseStatus.Procera) {
      let isMUA = false;
      if (connectionTypeForTable) {
        isMUA = connectionTypeForTable === 'Multi-Unit' || connectionTypeForTable === 'MUA';
      } else {
        isMUA = caseData.connectionType === ConnectionType.MultiUnit;
      }

      if (isMUA) {
        torqueIcon = <Icon15 className={iconSizeClass} />;
      } else {
        torqueIcon = <Icon35 className={iconSizeClass} />;
      }
    } else { // Local cases
      if (caseData.torque) {
        let TorqueIcon;
        switch (caseData.torque) {
          case 15:
            TorqueIcon = Icon15;
            break;
          case 20:
            TorqueIcon = Icon20;
            break;
          case 35:
            TorqueIcon = Icon35;
            break;
          default:
            TorqueIcon = null;
        }
        if (TorqueIcon) {
          torqueIcon = <TorqueIcon className={iconSizeClass} />;
        }
      }
    }
    
    const softwareIcons = (caseData.status === CaseStatus.Procera || caseData.status === CaseStatus.Local) ? (
        <>
            <DTXIcon className="h-8" />
            <ExocadIcon className="h-6" />
            <ThreeShapeIcon className="h-6" />
            {caseData.status === CaseStatus.Local && caseData.id !== 'EXO020' && <DentalwingsIcon className="h-6" />}
        </>
    ) : null;

    const screwIcon = (caseData.status === CaseStatus.Procera || caseData.status === CaseStatus.Local) ? (
        <ScrewIcon className={iconSizeClass} />
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