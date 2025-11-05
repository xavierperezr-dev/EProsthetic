import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { RestorationType, CaseStatus, ConnectionType, DentalCase, Language } from '../types';
import * as Icons from './icons';
import { caseDescriptions } from '../prescripcion';

export interface AssistantSelections {
  restorationType: RestorationType | '';
  status: CaseStatus[];
  angulation: 'true' | 'false' | '';
  connections: ConnectionType[];
}

interface AssistantModalContentProps {
  onClose: () => void;
  onApplyFilters: (filters: AssistantSelections) => void;
  t: any;
  allCases: DentalCase[];
  language: Language;
}

const getEffectiveAngulation = (c: DentalCase): boolean | 'N/A' => {
    const id = c.id;
    if (['EXO024', 'EXO025', 'EXO026', 'EXO028', 'EXO013'].includes(id)) {
        return true;
    }
    if (['EXO014', 'EXO027', 'EXO030', 'EXO029', 'EXO032', 'EXO016', 'EXO019', 'EXO020', 'EXO021', 'EXO022'].includes(id)) {
        return false;
    }
    return 'N/A';
};

const OptionCard: React.FC<{label: string, icon: React.ReactNode, isSelected: boolean, onClick: () => void}> = ({ label, icon, isSelected, onClick }) => {
    return (
        <button 
            onClick={onClick} 
            className={`p-6 rounded-xl border-2 text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 bg-slate-900/60 backdrop-blur-md ${isSelected ? 'border-blue-400 shadow-lg scale-105' : 'border-slate-600 hover:border-slate-400 hover:bg-slate-900/80'}`}
        >
            <div className="mb-4 flex justify-center items-center h-24">{icon}</div>
            <p className={`font-semibold text-lg ${isSelected ? 'text-white' : 'text-slate-100'}`}>{label}</p>
        </button>
    );
};

// FIX: Moved SummaryBadge outside the AssistantModalContent component definition. This prevents it from being redeclared on every render and allows TypeScript to correctly identify it as a React component, thus resolving issues with the 'key' prop.
const SummaryBadge: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
    <div className="flex items-center gap-1.5 bg-slate-200 text-slate-800 rounded-full px-2.5 py-1 text-xs font-semibold animate-simple-fade-in">
        {icon}
        <span>{label}</span>
    </div>
);

const AssistantModalContent: React.FC<AssistantModalContentProps> = ({ onClose, onApplyFilters, t, allCases, language }) => {
  const steps = [
    t.wizard.step1_title,
    t.wizard.step2_title,
    t.wizard.step3_title,
    t.wizard.step4_title,
    t.wizard.results_title,
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState<AssistantSelections>({
    restorationType: '',
    status: [],
    angulation: '',
    connections: [],
  });
  const [noResultsError, setNoResultsError] = useState(false);
  const [results, setResults] = useState<DentalCase[] | null>(null);
  const [speakingCaseId, setSpeakingCaseId] = useState<string | null>(null);

  const handleSpeak = (text: string, caseId: string) => {
    if (speakingCaseId === caseId) {
        window.speechSynthesis.cancel();
        setSpeakingCaseId(null);
        return;
    }
    
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(language));
    if (voice) {
        utterance.voice = voice;
    } else {
        utterance.lang = language;
    }
    
    utterance.onend = () => {
        setSpeakingCaseId(null);
    };
    utterance.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        setSpeakingCaseId(null);
    };

    setSpeakingCaseId(caseId);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
        window.speechSynthesis.cancel();
    };
  }, [currentStep]);

  useEffect(() => {
    // If the restoration type is set to Unitaria, and MUA is selected, remove it.
    if (selections.restorationType === RestorationType.Unitaria && selections.connections.includes(ConnectionType.MultiUnit)) {
      setSelections(prev => ({
        ...prev,
        connections: prev.connections.filter(c => c !== ConnectionType.MultiUnit)
      }));
    }
  }, [selections.restorationType]);

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  
  const handleBack = () => {
    setNoResultsError(false);
    if (currentStep === steps.length) {
        setResults(null);
    }
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleReset = () => {
    setNoResultsError(false);
    setSelections({ restorationType: '', status: [], angulation: '', connections: [] });
    setResults(null);
    setCurrentStep(1);
  };
  
  const findResults = () => {
    setNoResultsError(false);
    
    const filteredResults = allCases.filter(c => {
        if (selections.angulation && c.id === 'EXO031') {
            return false;
        }

        const matchesStatus = selections.status.length === 0 || selections.status.includes(c.status);
        const matchesType = !selections.restorationType || c.restorationType.includes(selections.restorationType);
        
        const matchesConnection = (() => {
            if (selections.connections.length === 0) return true;
            const allCaseConnections = new Set<ConnectionType>([c.connectionType, ...(c.compatibleConnections || [])]);
            return selections.connections.some(wizardConn => allCaseConnections.has(wizardConn));
        })();

        const matchesAngulation = (() => {
            if (selections.angulation === 'true') {
                return getEffectiveAngulation(c) === true;
            }
            return true;
        })();
        
        return matchesStatus && matchesType && matchesConnection && matchesAngulation;
    });

    if (filteredResults.length === 0) {
        setNoResultsError(true);
    } else {
        setResults(filteredResults);
        setCurrentStep(steps.length);
    }
  };

  const handleSelectAndAdvance = (key: keyof Omit<AssistantSelections, 'connections' | 'status'>, value: any) => {
    setNoResultsError(false);
    setSelections(prev => ({ ...prev, [key]: value }));
    handleNext();
  };
  
  const handleConnectionToggle = (connection: ConnectionType) => {
    setNoResultsError(false);
    setSelections(prev => {
        const { connections, restorationType } = prev;
        const isCurrentlySelected = connections.includes(connection);
        const tempConnections = new Set(connections);

        if (isCurrentlySelected) {
            tempConnections.delete(connection);
        } else {
            tempConnections.add(connection);

            if (restorationType === RestorationType.Unitaria) {
                if (connection === ConnectionType.N1) tempConnections.add(ConnectionType.N1Base);
                if (connection === ConnectionType.N1Base) tempConnections.add(ConnectionType.N1);
            } else if (restorationType === RestorationType.Multiple) {
                if (connection === ConnectionType.N1Base || connection === ConnectionType.N1) {
                    tempConnections.add(ConnectionType.N1);
                    tempConnections.add(ConnectionType.N1Base);
                    tempConnections.add(ConnectionType.MultiUnit);
                }
                if ([ConnectionType.CC, ConnectionType.Branemark, ConnectionType.TriChannel].includes(connection)) {
                    tempConnections.add(ConnectionType.MultiUnit);
                }
            }
        }

        return { ...prev, connections: [...tempConnections] };
    });
  };

    const getRestorationText = () => {
        if (selections.restorationType === RestorationType.Unitaria) return t.wizard.step1_option1;
        if (selections.restorationType === RestorationType.Multiple) return t.wizard.step1_option2;
        return null;
    };
    const getStatusText = () => {
        if (selections.status.length === 0) return null;
        return selections.status.map(s => t.filterBar.options[s]).join(', ');
    };
    const getAngulationText = () => {
        if (selections.angulation === 'true') return 'ASC';
        if (selections.angulation === 'false') return 'No ASC';
        return null;
    };

    const renderSummaryBadges = () => {
        const badges = [];

        if (selections.restorationType) {
            badges.push(
                <SummaryBadge
                    key="restoration"
                    label={getRestorationText() || ''}
                    icon={selections.restorationType === RestorationType.Unitaria ? <Icons.UnitariaIndicatorIcon className="h-4 w-4" /> : <Icons.MultipleIndicatorIcon className="h-4 w-4" />}
                />
            );
        }

        if (selections.status.length > 0) {
            badges.push(
                <SummaryBadge
                    key="status"
                    label={getStatusText() || ''}
                    icon={<Icons.FilterIcon className="h-3 w-3" />}
                />
            );
        }
        
        if (selections.angulation) {
            badges.push(
                <SummaryBadge
                    key="angulation"
                    label={getAngulationText() || ''}
                    icon={selections.angulation === 'true' ? <Icons.AngulationYesIcon className="h-4 w-4" /> : <Icons.AngulationNoIcon className="h-4 w-4" />}
                />
            );
        }

        if (selections.connections.length > 0) {
            const connectionIcons: Record<ConnectionType, React.ReactNode> = {
                [ConnectionType.CC]: <Icons.CcIcon className="h-4 w-4" />,
                [ConnectionType.MultiUnit]: <Icons.MuaIcon className="h-4 w-4" />,
                [ConnectionType.N1]: <Icons.N1Icon className="h-4 w-4" />,
                [ConnectionType.N1Base]: <Icons.N1BaseIcon className="h-4 w-4" />,
                [ConnectionType.On1]: <Icons.On1Icon className="h-4 w-4" />,
                [ConnectionType.Branemark]: <Icons.ExtIcon className="h-4 w-4" />,
                [ConnectionType.TriChannel]: <Icons.TriIcon className="h-4 w-4" />,
                [ConnectionType.Pearl]: <Icons.PearlIcon className="h-4 w-4" />,
            };

            selections.connections.forEach(conn => {
                badges.push(
                    <SummaryBadge
                        key={conn}
                        label={conn}
                        icon={connectionIcons[conn]}
                    />
                );
            });
        }

        return badges;
    };


  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OptionCard
              label={t.wizard.step1_option1}
              icon={<Icons.UnitariaIndicatorIcon className="h-24 w-24 text-white" />}
              isSelected={selections.restorationType === RestorationType.Unitaria}
              onClick={() => handleSelectAndAdvance('restorationType', RestorationType.Unitaria)}
            />
            <OptionCard
              label={t.wizard.step1_option2}
              icon={<Icons.MultipleIndicatorIcon className="h-24 w-24 text-white" />}
              isSelected={selections.restorationType === RestorationType.Multiple}
              onClick={() => handleSelectAndAdvance('restorationType', RestorationType.Multiple)}
            />
          </div>
        );
      case 2:
        const productionOptions = [CaseStatus.Local, CaseStatus.Procera, CaseStatus.Standard];
        
        const handleStatusToggle = (status: CaseStatus) => {
            setNoResultsError(false);
            setSelections(prev => ({ ...prev, status: prev.status.includes(status) ? prev.status.filter(s => s !== status) : [...prev.status, status] }));
        };

        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {productionOptions.map(opt => (
                    <button
                        key={opt}
                        onClick={() => handleStatusToggle(opt)}
                        className={`p-4 h-20 rounded-lg border-2 text-center font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 bg-slate-900/60 backdrop-blur-md text-white relative ${selections.status.includes(opt) ? 'border-blue-400' : 'border-slate-600 hover:border-slate-400'}`}
                    >
                        {t.wizard.production_options[opt]}
                        {selections.status.includes(opt) && (
                            <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
                                <Icons.CheckIcon className="h-3 w-3" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OptionCard
              label={t.wizard.step3_option1}
              icon={<Icons.AngulationYesIcon className="h-24 w-24 text-white" />}
              isSelected={selections.angulation === 'true'}
              onClick={() => handleSelectAndAdvance('angulation', 'true')}
            />
            <OptionCard
              label={t.wizard.step3_option2}
              icon={<Icons.AngulationNoIcon className="h-24 w-24 text-white" />}
              isSelected={selections.angulation === 'false'}
              onClick={() => handleSelectAndAdvance('angulation', 'false')}
            />
          </div>
        );
      case 4:
        const connectionOptions = [
            { type: ConnectionType.CC, icon: <Icons.CcIcon className="h-full w-full"/> },
            { type: ConnectionType.MultiUnit, icon: <Icons.MuaIcon className="h-full w-full"/> },
            { type: ConnectionType.N1, icon: <Icons.N1Icon className="h-full w-full"/> },
            { type: ConnectionType.N1Base, icon: <Icons.N1BaseIcon className="h-full w-full"/> },
            { type: ConnectionType.On1, icon: <Icons.On1Icon className="h-full w-full"/> },
            { type: ConnectionType.Branemark, icon: <Icons.ExtIcon className="h-full w-full"/> },
            { type: ConnectionType.TriChannel, icon: <Icons.TriIcon className="h-full w-full"/> },
            { type: ConnectionType.Pearl, icon: <Icons.PearlIcon className="h-full w-full"/> },
        ];
        return (
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {connectionOptions.map(opt => {
                    const isUnitaria = selections.restorationType === RestorationType.Unitaria;
                    const isDisabled = isUnitaria && opt.type === ConnectionType.MultiUnit;
                    
                    return (
                        <button 
                            key={opt.type} 
                            onClick={() => handleConnectionToggle(opt.type)} 
                            disabled={isDisabled}
                            title={isDisabled ? "No disponible para restauración unitaria" : opt.type}
                            className={`p-2 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 relative text-white bg-slate-900/60 backdrop-blur-md ${
                                selections.connections.includes(opt.type) ? 'border-blue-400' : 
                                isDisabled ? 'border-slate-700 opacity-50 cursor-not-allowed' : 
                                'border-slate-600 hover:border-slate-400'
                            }`}
                        >
                            <div className="h-20 w-20 flex items-center justify-center">{opt.icon}</div>
                            {selections.connections.includes(opt.type) && (
                                <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center">
                                    <Icons.CheckIcon className="h-3 w-3" />
                                </div>
                            )}
                        </button>
                    )
                })}
            </div>
        );
        case 5:
            return (
                <div className="max-h-[400px] h-[400px] overflow-y-auto pr-2 custom-scrollbar w-full">
                    <ul className="space-y-4">
                        {results?.map(caseData => {
                            const description = caseDescriptions[caseData.id]?.description[language] || caseDescriptions[caseData.id]?.description['es'];
                            const isSpeaking = speakingCaseId === caseData.id;

                            return (
                                <li key={caseData.id} className="p-4 bg-white/5 border border-white/20 rounded-lg shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <img 
                                            src={caseData.imageUrls[0]} 
                                            alt={caseData.patientName[language]}
                                            className="w-20 h-20 object-contain rounded-md bg-slate-700/50 flex-shrink-0"
                                            loading="lazy"
                                        />
                                        <div className="flex-grow">
                                            <span className="font-semibold text-white text-left">{caseData.patientName[language]}</span>
                                            {description && (
                                                <p className="text-sm text-slate-300 mt-2">{description}</p>
                                            )}
                                        </div>
                                        {description && (
                                            <button 
                                                onClick={() => handleSpeak(description, caseData.id)}
                                                className="p-2 text-slate-300 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 flex-shrink-0"
                                                aria-label={isSpeaking ? "Detener lectura" : "Leer descripción"}
                                            >
                                                {isSpeaking 
                                                    ? <Icons.SpeakerXMarkIcon className="h-5 w-5 text-red-500" /> 
                                                    : <Icons.SpeakerWaveIcon className="h-5 w-5" />
                                                }
                                            </button>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
      default:
        return null;
    }
  };

  return (
      <div className="relative rounded-lg overflow-hidden h-[85vh] max-h-[800px] shadow-2xl flex flex-col bg-slate-800">
          <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
              src="https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/Video/Asist2.mp4"
              disablePictureInPicture
              controlsList="nodownload"
          ></video>
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm z-10"></div>

          <header className="relative z-20 p-4 border-b border-slate-700 flex-shrink-0 bg-slate-900/60 backdrop-blur-md">
            <div className="flex items-center justify-between gap-4">
                <h2 id="modal-title" className="text-xl font-semibold text-white flex-shrink-0">{t.modal.assistant_title}</h2>
                <div className="flex-grow flex items-center gap-2 flex-wrap justify-start ml-4">
                    {renderSummaryBadges()}
                </div>
                <button onClick={onClose} className="p-1.5 text-slate-300 rounded-full hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 ring-offset-slate-800 focus:ring-white flex-shrink-0">
                    <Icons.CloseIcon className="w-6 h-6" />
                </button>
            </div>
          </header>

          <main className="relative z-20 p-4 flex-grow flex flex-col overflow-y-auto custom-scrollbar">
              <div className="mb-8">
                  <div className="flex justify-between mb-1">
                      <span className="text-base font-medium text-blue-300">{steps[currentStep-1]}</span>
                      <span className="text-sm font-medium text-blue-300">Paso {currentStep} de {steps.length}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-300" style={{ width: `${(currentStep / steps.length) * 100}%` }}></div>
                  </div>
              </div>

              <div className="min-h-[400px] flex items-center justify-center flex-grow">
                  {renderStepContent()}
              </div>

              {currentStep === steps.length - 1 && noResultsError && (
                <div className="text-center text-red-300 font-semibold bg-red-500/20 p-3 rounded-md mt-6 animate-simple-fade-in" role="alert">
                  {t.wizard.no_results_message}
                </div>
              )}
          </main>
          
          <footer className="relative z-20 mt-auto p-4 border-t border-white/20 flex-shrink-0">
            <div className="flex justify-between items-center">
                <button 
                    onClick={handleReset}
                    className="px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10 rounded-md"
                >
                    {t.wizard.reset_button}
                </button>
                <div className="flex gap-4">
                    <button 
                        onClick={handleBack}
                        className="px-6 py-2 text-sm font-semibold text-slate-200 bg-white/10 border border-slate-300 rounded-md hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={currentStep === 1}
                    >
                        {t.wizard.back_button}
                    </button>
                    {currentStep === 2 ? (
                        <button
                            onClick={handleNext}
                            className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={selections.status.length === 0}
                        >
                            {t.wizard.next_button}
                        </button>
                    ) : currentStep === steps.length - 1 ? (
                        <button 
                            onClick={findResults}
                            className="px-6 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={selections.connections.length === 0}
                        >
                            {t.wizard.finish_button}
                        </button>
                    ) : currentStep === steps.length ? (
                         <button 
                            onClick={() => onApplyFilters(selections)} 
                            className="px-6 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700"
                         >
                            {t.wizard.apply_filters_button}
                        </button>
                    ) : currentStep === 4 ? (
                         <button 
                            onClick={findResults}
                            className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
                         >
                            {t.wizard.next_button}
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            {t.wizard.next_button}
                        </button>
                    )}
                </div>
            </div>
          </footer>
      </div>
  );
};

export default AssistantModalContent;