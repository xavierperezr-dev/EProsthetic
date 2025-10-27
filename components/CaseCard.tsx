import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
// FIX: Imported 'Language' type to use for the 'language' prop.
import { DentalCase, CaseStatus, RestorationType, Language } from '../types';
import { ChevronLeftIcon, ChevronRightIcon, WarrantyIcon, UnitariaIndicatorIcon, MultipleIndicatorIcon, DTXIcon, ExocadIcon, ThreeShapeIcon, DentalwingsIcon, TableIcon, EyeIcon, SparklesIcon, SpinnerIcon, SpeakerWaveIcon, SpeakerXMarkIcon, ExternalLinkIcon, CheckIcon } from './icons';
import CaseDetailIcons from './CaseDetailIcons';

interface CaseCardProps {
  caseData: DentalCase;
  displayNumber: number;
  onReferenceClick: (caseData: DentalCase, connection?: string) => void;
  onHelp001Click: (caseData: DentalCase) => void;
  onTablesClick: (caseData: DentalCase) => void;
  onTableTestClick: (caseData: DentalCase) => void;
  onExosClick: (caseData: DentalCase) => void;
  t: any;
  tNotes: any;
  // FIX: Changed type to 'Language' to allow 'en' and fix the compilation error.
  language: Language;
  bgColorVar: string;
  isAnyFilterActive: boolean;
}

interface AiSummaryData {
  internetSummary: string;
  appSummary: string;
  productUrl: string;
}

const CaseCard = React.forwardRef<HTMLDivElement, CaseCardProps>(({ caseData, displayNumber, onReferenceClick, onHelp001Click, onTablesClick, onTableTestClick, onExosClick, t, tNotes, language, bgColorVar, isAnyFilterActive }, ref) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [aiSummaryData, setAiSummaryData] = useState<AiSummaryData | null>(null);
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isIdCopied, setIsIdCopied] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const { patientName, status, imageUrls, observaciones, notes, id, restorationType } = caseData;
  
  const videoSrc =
    isHovered && caseData.id === 'EXO024'
      ? 'https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/Video/People.mp4'
      : isHovered && caseData.id === 'EXO025'
      ? 'https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/Video/Pibanimation.mp4'
      : null;

  // Map of background colors that are dark and require light text
  const lightTextColors = ['--card-bg-raspberry', '--card-bg-blue', '--card-bg-cornflower'];
  const isDarkBg = lightTextColors.includes(bgColorVar);

  const textColorClass = isDarkBg ? 'text-white' : 'text-slate-900';
  const subTextColorClass = isDarkBg ? 'text-white/80' : 'text-slate-600';
  
  // Conditional border class based on background color for INTERNAL elements
  const borderColorClass = isDarkBg ? 'border-white' : 'border-black';

  const infoButtonBaseClasses = `px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary)]`;
  const dynamicInfoButtonClasses = isDarkBg
    ? `text-white ${borderColorClass} hover:bg-black/20`
    : `text-[color:var(--accent-primary)] ${borderColorClass} hover:bg-slate-800 hover:text-white`;
  const finalInfoButtonClass = `${infoButtonBaseClasses} ${dynamicInfoButtonClasses}`;


  useEffect(() => {
    // This helps to populate the voices list on some browsers.
    window.speechSynthesis.getVoices();
    // Cleanup speech synthesis on component unmount.
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };
  
  const handleImageDoubleClick = () => {
    const multiConnectionCases = [
      'EXO021', 'EXO022', 'EXO024', 'EXO025', 'EXO029', 'EXO032',
      'EXO016', 'EXO028', 'EXO030', 'EXO027', 'EXO014'
    ];
    if (multiConnectionCases.includes(caseData.id)) {
      onReferenceClick(caseData, 'CC');
    } else {
      onReferenceClick(caseData);
    }
  };

  const handleGenerateDescription = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isGeneratingDescription) return;
    
    if (aiSummaryData) {
      setShowTooltip(prev => !prev);
      return;
    }

    setIsGeneratingDescription(true);
    setDescriptionError(null);
    setShowTooltip(true);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const { patientName, id, restorationType, connectionType, status, notes, angulacion, baseCementada, torque } = caseData;
        const caseInfoForPrompt = {
            name: patientName[language],
            id,
            restorationType,
            connectionType,
            status,
            notes,
            angulation: angulacion,
            cementedBase: baseCementada,
            torque,
        };

        const prompt = `As a dental prosthetics expert, analyze the product data below and perform a web search.
Product Data: ${JSON.stringify(caseInfoForPrompt, null, 2)}

Tasks:
1.  **Internet Summary:** Write a brief, clear summary of the product as a bulleted list (using '*' or '-') based on your web search.
2.  **App Summary:** Write a brief summary as a bulleted list (using '*' or '-') based ONLY on the provided "Product Data".
3.  **Product URL:** Find the most relevant product page URL from nobelbiocare.com.

Provide the response in the ${language} language as a single, valid JSON object with the following keys: "internetSummary", "appSummary", "productUrl". Do not include any other text or markdown formatting like \`\`\`json. Your entire response must be only the raw JSON object.`;

        const genAIResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              tools: [{googleSearch: {}}],
            },
        });
        
        let responseText = genAIResponse.text.trim();
        // Handle potential markdown code block, just in case the model doesn't follow instructions.
        const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[1]) {
            responseText = jsonMatch[1];
        }
        
        const parsedData = JSON.parse(responseText);
        
        if (parsedData.internetSummary && parsedData.appSummary && parsedData.productUrl) {
            setAiSummaryData(parsedData);
        } else {
            throw new Error("Invalid JSON structure from API.");
        }

    } catch (error) {
        console.error("Error generating description:", error);
        setDescriptionError(t.description_error || "Could not generate description.");
    } finally {
        setIsGeneratingDescription(false);
    }
  };

  const handleSpeak = () => {
    if (!aiSummaryData || isSpeaking) return;

    const textToSpeak = `${t.ai_summary_web_title || "Web Summary"}. ${aiSummaryData.internetSummary}. ${t.ai_summary_app_title || "App Summary"}. ${aiSummaryData.appSummary}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Find a voice for the specified language for better quality.
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(language));
    if (voice) {
      utterance.voice = voice;
    } else {
      // Fallback to setting lang property if no specific voice is found.
      utterance.lang = language;
    }
    
    utterance.rate = 1.2; // Use a slightly safer rate for broader compatibility.
    utteranceRef.current = utterance;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      utteranceRef.current = null;
    };
    utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
      setIsSpeaking(false);
      utteranceRef.current = null;
      console.error("Speech synthesis error:", event.error);
    };

    // Kick-start speech synthesis, a common workaround for browser bugs.
    const synth = window.speechSynthesis;
    synth.cancel(); // Cancel any previous speech to prevent overlap.
    if (synth.paused) {
      synth.resume();
    }
    synth.speak(utterance);
  };

  const handleStopSpeaking = () => {
    if (isSpeaking) {
      // The onend event will fire after cancel, resetting the state.
      window.speechSynthesis.cancel();
    }
  };

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(caseData.id);
    setIsIdCopied(true);
    setTimeout(() => {
      setIsIdCopied(false);
    }, 2000);
  };

  return (
    <div 
      ref={ref}
      id={`case-card-${caseData.id}`}
      className={`bg-white rounded-lg overflow-hidden transition-all duration-300 ease-in-out border border-black flex flex-col relative group ${isAnyFilterActive ? 'ring-2 ring-offset-1 ring-slate-800 shadow-xl' : 'shadow-sm'} hover:shadow-2xl hover:-translate-y-1`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={handleCopyId}
        className={`absolute top-3 right-3 text-xs font-bold rounded-full h-7 w-7 flex items-center justify-center ring-2 ring-white z-10 transition-all duration-200 ${
          isIdCopied
            ? 'bg-green-500 text-white'
            : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
        }`}
        aria-label={`${t.copy_id_label}: ${caseData.id}`}
        title={`${t.copy_id_label}: ${caseData.id}`}
      >
        {isIdCopied ? <CheckIcon className="h-4 w-4" /> : displayNumber}
      </button>
      <div 
        className="relative w-full h-48 bg-white group border-8 cursor-pointer overflow-hidden"
        style={{ borderColor: `var(${bgColorVar})` }}
        onDoubleClick={handleImageDoubleClick}
      >
        {videoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
            src={videoSrc}
            disablePictureInPicture
            controlsList="nodownload"
          />
        ) : imageUrls && imageUrls.length > 0 ? (
          <>
            <img className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" src={imageUrls[currentImageIndex]} alt={`${t.image_alt} ${patientName[language]}`} loading="lazy" decoding="async" />
            
            {imageUrls.length > 1 && (
              <>
                <button 
                  onClick={prevImage} 
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/60 text-slate-700 rounded-full p-1.5 opacity-0 group-hover:opacity-100 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)] shadow-md"
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <button 
                  onClick={nextImage} 
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/60 text-slate-700 rounded-full p-1.5 opacity-0 group-hover:opacity-100 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)] shadow-md"
                  aria-label="Next image"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {imageUrls.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setCurrentImageIndex(index);
                      }}
                      className={`h-2 rounded-full transition-all duration-200 ${index === currentImageIndex ? 'w-4 bg-slate-700' : 'w-2 bg-white hover:bg-slate-200 border border-slate-500'}`}
                      aria-label={`Go to image ${index + 1}`}
                      aria-current={index === currentImageIndex ? "true" : "false"}
                    ></button>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white">
            <span className="text-slate-400 text-sm">{t.no_image}</span>
          </div>
        )}
      </div>

      <div style={{ backgroundColor: `var(${bgColorVar})` }} className={`p-5 flex-grow flex flex-col`}>
        <div className="mb-4">
          <div className={`min-h-[3.5rem] flex items-start justify-between gap-4 ${textColorClass}`}>
            <h3 className="text-xl font-bold text-left flex-grow">{patientName[language]}</h3>
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <button
                    onClick={(e) => { e.stopPropagation(); handleImageDoubleClick(); }}
                    className={`rounded-full p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 ${isDarkBg ? 'hover:bg-white/25 focus:ring-white' : 'hover:bg-black/10 focus:ring-slate-800'}`}
                    aria-label={t.view_details_label}
                    title={t.view_details_label}
                >
                    <EyeIcon className="h-6 w-6" />
                </button>
                <div className="relative">
                    <button
                        onClick={handleGenerateDescription}
                        disabled={isGeneratingDescription}
                        className={`rounded-full p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-wait ${isDarkBg ? 'hover:bg-white/25 focus:ring-white' : 'hover:bg-black/10 focus:ring-slate-800'}`}
                        aria-label={t.generate_description_label}
                        title={t.generate_description_tooltip}
                    >
                        {isGeneratingDescription && !aiSummaryData ? <SpinnerIcon className="h-6 w-6 animate-spin" /> : <SparklesIcon className="h-6 w-6" />}
                    </button>
                    {showTooltip && (
                    <div 
                        className="absolute right-full top-0 mr-2 w-72 p-4 text-sm text-white bg-slate-800/95 rounded-lg shadow-lg z-10 text-left animate-simple-fade-in flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {isGeneratingDescription ? (
                        <div className="flex items-center gap-2">
                            <SpinnerIcon className="h-4 w-4 animate-spin" />
                            <span>{t.generating_description_tooltip}</span>
                        </div>
                        ) : descriptionError ? (
                        <span className="text-red-400">{descriptionError}</span>
                        ) : aiSummaryData ? (
                        <>
                            <div className="max-h-60 overflow-y-auto custom-scrollbar pr-2 mb-3 space-y-4">
                                <div>
                                    <h4 className="font-bold text-slate-300 mb-1 border-b border-slate-600 pb-1">{t.ai_summary_web_title}</h4>
                                    <p className="text-slate-200 whitespace-pre-wrap">{aiSummaryData.internetSummary}</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-300 mb-1 border-b border-slate-600 pb-1">{t.ai_summary_app_title}</h4>
                                    <p className="text-slate-200 whitespace-pre-wrap">{aiSummaryData.appSummary}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-slate-600">
                                <button 
                                    onClick={isSpeaking ? handleStopSpeaking : handleSpeak}
                                    className="text-slate-300 hover:text-white transition-colors flex-shrink-0"
                                    aria-label={isSpeaking ? t.stop_speech_label : t.text_to_speech_label}
                                    title={isSpeaking ? t.stop_speech_label : t.text_to_speech_label}
                                >
                                    {isSpeaking ? <SpeakerXMarkIcon className="h-5 w-5" /> : <SpeakerWaveIcon className="h-5 w-5" />}
                                </button>
                                <a 
                                href={aiSummaryData.productUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 font-semibold text-blue-300 hover:text-blue-200 hover:underline"
                                >
                                <ExternalLinkIcon className="h-4 w-4" />
                                <span>{t.product_link_label}</span>
                                </a>
                            </div>
                        </>
                        ) : null}
                    </div>
                    )}
                </div>
            </div>
          </div>
          <div className={`my-3 border-t-2 ${borderColorClass}`}></div>
          <div className="space-y-3">
            <div className={`flex items-center gap-x-2 min-h-[5rem] ${textColorClass} ${status === CaseStatus.Otros ? 'justify-center' : 'justify-between'}`}>
                {/* Status Tag */}
                <span className={`inline-flex items-center text-center justify-center gap-2.5 p-2 text-sm font-bold rounded-lg border w-32 ${textColorClass} ${borderColorClass}`}>
                    <div className="flex flex-col">
                        <span className={`h-3 w-3 rounded-full bg-current mx-auto mb-1`}></span>
                        <span>{t.status[status].split(' ')[0]}</span>
                        {t.status[status].split(' ').length > 1 && <span className="font-semibold">{t.status[status].split(' ').slice(1).join(' ')}</span>}
                    </div>
                </span>
                
                {status !== CaseStatus.Otros && (
                  <>
                    {/* Restoration Icons */}
                    <div className="flex items-center justify-center flex-grow">
                        {restorationType.includes(RestorationType.Unitaria) && (
                          <UnitariaIndicatorIcon className="h-16 w-16 [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.2))]" />
                        )}
                        {restorationType.includes(RestorationType.Multiple) && (
                          <MultipleIndicatorIcon className="h-20 w-20 [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.2))]" />
                        )}
                    </div>

                    {/* Warranty */}
                    <div className="w-32 flex justify-center">
                        <a 
                          href="https://www.nobelbiocare.com/warranty"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`group flex flex-col items-center justify-center gap-1 hover:opacity-80 transition-opacity ${textColorClass}`}
                          title={t.warranty_tooltip}
                        >
                          <WarrantyIcon className="h-9 w-9" />
                          {status === CaseStatus.Procera && (
                              <span className={`text-xs font-semibold text-center ${subTextColorClass}`}>
                              {t.procera_warranty}
                              </span>
                          )}
                        </a>
                    </div>
                  </>
                )}
            </div>
            <div className={textColorClass}>
              <CaseDetailIcons caseData={caseData} borderColorClass={borderColorClass} />
            </div>
          </div>
        </div>
        
        <div className={`mt-auto ${textColorClass}`}>
          {(caseData.status === CaseStatus.Procera || caseData.status === CaseStatus.Local) && (
            <div className={`flex items-center gap-x-6 gap-y-2 mt-4 pt-4 border-t ${borderColorClass} flex-wrap justify-center`}>
              <DTXIcon className="h-8" />
              <ExocadIcon className="h-6" />
              <ThreeShapeIcon className="h-6" />
              {caseData.status === CaseStatus.Local && caseData.id !== 'EXO020' && <DentalwingsIcon className="h-6" />}
            </div>
          )}

          {status !== CaseStatus.Otros && (
            <div className={`space-y-2 text-sm mt-4 pt-4 border-t ${borderColorClass}`}>
              <div className="flex items-start">
                <span className={`font-semibold shrink-0 pt-1 pr-2 ${subTextColorClass}`}>{t.references}</span>
                <div className="flex-1">
                  {caseData.id === 'EXO021' || caseData.id === 'EXO022' || caseData.id === 'EXO024' || caseData.id === 'EXO025' || caseData.id === 'EXO029' || caseData.id === 'EXO032' ? (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => onReferenceClick(caseData, 'CC')}
                        className={finalInfoButtonClass}
                        aria-label={`${t.aria_view_refs_cc_for} ${patientName[language]}`}
                      >
                        CC
                      </button>
                      <button
                        onClick={() => onReferenceClick(caseData, 'Branemark')}
                        className={finalInfoButtonClass}
                        aria-label={`${t.aria_view_refs_branemark_for} ${patientName[language]}`}
                      >
                        Branemark
                      </button>
                      <button
                        onClick={() => onReferenceClick(caseData, 'Tri-channel')}
                        className={finalInfoButtonClass}
                        aria-label={`${t.aria_view_refs_tri_for} ${patientName[language]}`}
                      >
                        Tri-channel
                      </button>
                      {(caseData.id === 'EXO022' || caseData.id === 'EXO024' || caseData.id === 'EXO025' || caseData.id === 'EXO029' || caseData.id === 'EXO032') && (
                        <button
                          onClick={() => onReferenceClick(caseData, 'Multi-Unit')}
                          className={finalInfoButtonClass}
                          aria-label={`${t.aria_view_refs_mua_for} ${patientName[language]}`}
                        >
                          Multi-Unit
                        </button>
                      )}
                    </div>
                  ) : caseData.id === 'EXO016' ? (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => onReferenceClick(caseData, 'CC')}
                        className={finalInfoButtonClass}
                        aria-label={`${t.aria_view_refs_cc_for} ${patientName[language]}`}
                      >
                        CC
                      </button>
                      <button
                        onClick={() => onReferenceClick(caseData, 'Branemark')}
                        className={finalInfoButtonClass}
                        aria-label={`${t.aria_view_refs_branemark_for} ${patientName[language]}`}
                      >
                        Branemark
                      </button>
                      <button
                        onClick={() => onReferenceClick(caseData, 'Tri-channel')}
                        className={finalInfoButtonClass}
                        aria-label={`${t.aria_view_refs_tri_for} ${patientName[language]}`}
                      >
                        Tri-channel
                      </button>
                      <button
                        onClick={() => onReferenceClick(caseData, 'N1 TCC')}
                        className={finalInfoButtonClass}
                        aria-label={`${t.aria_view_refs_n1tcc_for} ${patientName[language]}`}
                      >
                        N1 TCC
                      </button>
                    </div>
                  ) : caseData.id === 'EXO028' ? (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => onReferenceClick(caseData, 'CC')}
                        className={finalInfoButtonClass}
                        aria-label={`${t.aria_view_refs_cc_for} ${patientName[language]}`}
                      >
                        CC
                      </button>
                      <button
                        onClick={() => onReferenceClick(caseData, 'Tri-channel')}
                        className={finalInfoButtonClass}
                        aria-label={`${t.aria_view_refs_tri_for} ${patientName[language]}`}
                      >
                        Tri-channel
                      </button>
                    </div>
                  ) : caseData.id === 'EXO030' ? (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => onReferenceClick(caseData, 'CC')}
                        className={finalInfoButtonClass}
                        aria-label={`${t.aria_view_refs_cc_for} ${patientName[language]}`}
                      >
                        CC
                      </button>
                      <button
                        onClick={() => onReferenceClick(caseData, 'Branemark')}
                        className={finalInfoButtonClass}
                        aria-label={`${t.aria_view_refs_branemark_for} ${patientName[language]}`}
                      >
                        Branemark
                      </button>
                      <button
                        onClick={() => onReferenceClick(caseData, 'Tri-channel')}
                        className={finalInfoButtonClass}
                        aria-label={`${t.aria_view_refs_tri_for} ${patientName[language]}`}
                      >
                        Tri-channel
                      </button>
                    </div>
                  ) : caseData.id === 'EXO027' ? (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => onReferenceClick(caseData, 'CC')}
                        className={finalInfoButtonClass}
                        aria-label={`${t.aria_view_refs_cc_for} ${patientName[language]}`}
                      >
                        CC
                      </button>
                      <button
                        onClick={() => onReferenceClick(caseData, 'Branemark')}
                        className={finalInfoButtonClass}
                        aria-label={`${t.aria_view_refs_branemark_for} ${patientName[language]}`}
                      >
                        Branemark
                      </button>
                      <button
                        onClick={() => onReferenceClick(caseData, 'Tri-channel')}
                        className={finalInfoButtonClass}
                        aria-label={`${t.aria_view_refs_tri_for} ${patientName[language]}`}
                      >
                        Tri-channel
                      </button>
                    </div>
                  ) : caseData.id === 'EXO014' ? (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button onClick={() => onReferenceClick(caseData, 'CC')} className={finalInfoButtonClass}>CC</button>
                      <button onClick={() => onReferenceClick(caseData, 'N1 TCC')} className={finalInfoButtonClass}>N1 TCC</button>
                      <button onClick={() => onReferenceClick(caseData, 'N1 Base')} className={finalInfoButtonClass}>N1 Base</button>
                      <button onClick={() => onReferenceClick(caseData, 'On1')} className={finalInfoButtonClass}>On1</button>
                      <button onClick={() => onReferenceClick(caseData, 'Branemark')} className={finalInfoButtonClass}>Branemark</button>
                      <button onClick={() => onReferenceClick(caseData, 'Tri-channel')} className={finalInfoButtonClass}>Tri-channel</button>
                    </div>
                  ) : caseData.id === 'EXO034' ? (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => onReferenceClick(caseData, 'CC')}
                        className={finalInfoButtonClass}
                        aria-label={`Ver referencias CC para ${patientName[language]}`}
                      >
                        CC
                      </button>
                      <button
                        onClick={() => onReferenceClick(caseData, 'N1 TCC')}
                        className={finalInfoButtonClass}
                        aria-label={`Ver referencias N1 TCC para ${patientName[language]}`}
                      >
                        N1 TCC
                      </button>
                      <button
                        onClick={() => onReferenceClick(caseData, 'Branemark')}
                        className={finalInfoButtonClass}
                        aria-label={`Ver referencias Branemark para ${patientName[language]}`}
                      >
                        Branemark
                      </button>
                      <button
                        onClick={() => onReferenceClick(caseData, 'Tri-channel')}
                        className={finalInfoButtonClass}
                        aria-label={`Ver referencias Tri-channel para ${patientName[language]}`}
                      >
                        Tri-channel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => onReferenceClick(caseData)}
                        className={finalInfoButtonClass}
                        aria-label={`${t.aria_view_refs_for} ${patientName[language]}`}
                      >
                        {t.view}
                      </button>
                      {caseData.id === 'TEST001' && (
                         <>
                          <button
                            onClick={() => onHelp001Click(caseData)}
                            className="px-2.5 py-1 text-xs font-semibold text-green-700 bg-green-50 rounded-md border border-green-600 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                            aria-label={`${t.aria_download_for} ${patientName[language]}`}
                          >
                            {t.download}
                          </button>
                          <button
                            onClick={() => onTablesClick(caseData)}
                            className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded-md border border-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          >
                            {t.tables}
                          </button>
                          <button
                            onClick={() => onTableTestClick(caseData)}
                            className="px-2.5 py-1 text-xs font-semibold text-purple-700 bg-purple-50 rounded-md border border-purple-600 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                            aria-label="tablatest"
                            title="tablatest"
                          >
                            <TableIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onExosClick(caseData)}
                            className="px-2.5 py-1 text-xs font-semibold text-teal-700 bg-teal-50 rounded-md border border-teal-600 hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
                            title={t.exos_analysis_tooltip}
                          >
                            {t.exos_analysis_button}
                          </button>
                         </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {(observaciones || notes) && (
            <div className="pt-4">
              <p className={`text-xs italic opacity-90 ${textColorClass}`}>
                {observaciones && <span>{observaciones} </span>}
                {notes && <span>{tNotes[notes] || notes}</span>}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default CaseCard;