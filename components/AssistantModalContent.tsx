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
            className={`p-6 rounded-xl border-2 text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSelected ? 'bg-blue-100 border-blue-500 shadow-lg' : 'bg-white border-slate-300 hover:border-blue-400 hover:shadow-md'}`}
        >
            <div className="mb-4 flex justify-center items-center h-24">{icon}</div>
            <p className={`font-semibold text-lg ${isSelected ? 'text-blue-800' : 'text-slate-700'}`}>{label}</p>
        </button>
    );
};

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
  const [portalNode, setPortalNode] = useState<Element | null>(null);
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
    const node = document.getElementById('modal-header-extra-content');
    setPortalNode(node);

    // Cleanup function to clear the content when the assistant is closed
    return () => {
      if (node) {
        node.innerHTML = '';
      }
    };
  }, []);

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
        const matchesStatus = selections.status.length === 0 || selections.status.includes(c.status);
        const matchesType = !selections.restorationType || c.restorationType.includes(selections.restorationType);
        
        const matchesConnection = (() => {
            if (selections.connections.length === 0) return true;
            const allCaseConnections = new Set<ConnectionType>([c.connectionType, ...(c.compatibleConnections || [])]);
            return selections.connections.some(wizardConn => allCaseConnections.has(wizardConn));
        })();

        const matchesAngulation = (() => {
            if (selections.angulation === 'true') {
                // If "Yes" is selected, only show angulated.
                return getEffectiveAngulation(c) === true;
            }
            // If "No" is selected ('false'), or nothing is selected (''), show all.
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
        const newConnections = prev.connections.includes(connection)
            ? prev.connections.filter(c => c !== connection)
            : [...prev.connections, connection];
        return { ...prev, connections: newConnections };
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OptionCard
              label={t.wizard.step1_option1}
              icon={<Icons.UnitariaIndicatorIcon className="h-24 w-24 text-slate-700" />}
              isSelected={selections.restorationType === RestorationType.Unitaria}
              onClick={() => handleSelectAndAdvance('restorationType', RestorationType.Unitaria)}
            />
            <OptionCard
              label={t.wizard.step1_option2}
              icon={<Icons.MultipleIndicatorIcon className="h-24 w-24 text-slate-700" />}
              isSelected={selections.restorationType === RestorationType.Multiple}
              onClick={() => handleSelectAndAdvance('restorationType', RestorationType.Multiple)}
            />
          </div>
        );
      case 2:
        const productionOptions = [CaseStatus.Local, CaseStatus.Procera, CaseStatus.Standard];
        
        const handleStatusToggle = (status: CaseStatus) => {
            setNoResultsError(false);
            setSelections(prev => {
                const newStatus = prev.status.includes(status)
                    ? prev.status.filter(s => s !== status)
                    : [...prev.status, status];
                return { ...prev, status: newStatus };
            });
        };

        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {productionOptions.map(opt => (
                    <button
                        key={opt}
                        onClick={() => handleStatusToggle(opt)}
                        className={`p-4 h-20 rounded-lg border-2 text-center font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative ${selections.status.includes(opt) ? 'bg-blue-100 border-blue-500 text-blue-800' : 'bg-white border-slate-300 hover:border-blue-400'}`}
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
              icon={<Icons.AngulationYesIcon className="h-24 w-24 text-slate-700" />}
              isSelected={selections.angulation === 'true'}
              onClick={() => handleSelectAndAdvance('angulation', 'true')}
            />
            <OptionCard
              label={t.wizard.step3_option2}
              icon={<Icons.AngulationNoIcon className="h-24 w-24 text-slate-700" />}
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
                            className={`p-2 rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative ${
                                selections.connections.includes(opt.type) ? 'bg-blue-100 border-blue-500' : 
                                isDisabled ? 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed' : 
                                'bg-white border-slate-300 hover:border-blue-400'
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
                                <li key={caseData.id} className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <img 
                                            src={caseData.imageUrls[0]} 
                                            alt={caseData.patientName[language]}
                                            className="w-20 h-20 object-contain rounded-md bg-slate-100 flex-shrink-0"
                                            loading="lazy"
                                        />
                                        <div className="flex-grow">
                                            <span className="font-semibold text-slate-800 text-left">{caseData.patientName[language]}</span>
                                            {description && (
                                                <p className="text-sm text-slate-600 mt-2">{description}</p>
                                            )}
                                        </div>
                                        {description && (
                                            <button 
                                                onClick={() => handleSpeak(description, caseData.id)}
                                                className="p-2 text-slate-500 rounded-full hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 flex-shrink-0"
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

  const SummaryPortal: React.FC = () => {
    const hasSelections = selections.restorationType || selections.status.length > 0 || selections.angulation || selections.connections.length > 0;
    if (currentStep === 1 || !hasSelections || !portalNode) return null;

    const summaryContent = (
        <div className="bg-[color:var(--card-bg-yellow)] rounded-full flex items-center gap-1.5 p-1 animate-simple-fade-in">
          {selections.restorationType && (
              <div className="h-8 w-8 bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center" title={selections.restorationType}>
                  {selections.restorationType === RestorationType.Unitaria ? <Icons.UnitariaIndicatorIcon className="h-full w-full p-1 text-slate-700" /> : <Icons.MultipleIndicatorIcon className="h-full w-full p-1 text-slate-700" />}
              </div>
          )}
          {selections.status.length > 0 && (
              <div className="h-8 w-8 bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center" title={selections.status.map(s => t.wizard.production_options[s]).join(', ')}>
                  <div className="h-full w-full flex items-center justify-center text-center text-xs font-bold text-white bg-slate-500 rounded-full p-1 leading-none">
                     {selections.status.length}
                  </div>
              </div>
          )}
          {selections.angulation && (
              <div className="h-8 w-8 bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center" title={selections.angulation === 'true' ? 'Con angulación' : 'Sin angulación'}>
                  {selections.angulation === 'true' ? <Icons.AngulationYesIcon className="h-full w-full p-1 text-slate-700" /> : <Icons.AngulationNoIcon className="h-full w-full p-1 text-slate-700" />}
              </div>
          )}
          {selections.connections.length > 0 && (
              <div className="h-8 w-8 bg-white rounded-full border border-slate-200 shadow-sm flex items-center justify-center" title={selections.connections.join(', ')}>
                   <div className="h-full w-full flex items-center justify-center text-center text-xs font-bold text-white bg-slate-500 rounded-full p-1 leading-none">
                     {selections.connections.length}
                  </div>
              </div>
          )}
        </div>
      );

    return ReactDOM.createPortal(summaryContent, portalNode);
  };

  return (
    <div className="p-4">
        <SummaryPortal />

        <div className="mb-8">
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-blue-700">{steps[currentStep-1]}</span>
                <span className="text-sm font-medium text-blue-700">Paso {currentStep} de {steps.length}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${(currentStep / steps.length) * 100}%` }}></div>
            </div>
        </div>

        <div className="min-h-[400px] flex items-center justify-center">
            {renderStepContent()}
        </div>
        
        {currentStep === steps.length - 1 && noResultsError && (
          <div className="text-center text-red-600 font-semibold bg-red-100 p-3 rounded-md mt-6 -mb-2 animate-simple-fade-in" role="alert">
            {t.wizard.no_results_message}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
            <button 
                onClick={handleReset}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-md"
            >
                {t.wizard.reset_button}
            </button>
            <div className="flex gap-4">
                <button 
                    onClick={handleBack}
                    className="px-6 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>
  );
};

export default AssistantModalContent;