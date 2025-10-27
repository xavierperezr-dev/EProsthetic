import React from 'react';
// FIX: Imported 'Language' type to use for the 'language' prop.
import { DentalCase, Language } from '../types';
import CaseCard from './CaseCard';

interface CaseGridProps {
  cases: DentalCase[];
  onReferenceClick: (caseData: DentalCase, connection?: string) => void;
  onHelp001Click: (caseData: DentalCase) => void;
  onTablesClick: (caseData: DentalCase) => void;
  onTableTestClick: (caseData: DentalCase) => void;
  onExosClick: (caseData: DentalCase) => void;
  t: any;
  tNotes: any;
  // FIX: Changed type to 'Language' to allow 'en' and fix the compilation error.
  language: Language;
  isAnyFilterActive: boolean;
  caseRefs: React.MutableRefObject<{[key: string]: HTMLDivElement | null}>;
}

const CaseGrid: React.FC<CaseGridProps> = ({ cases, onReferenceClick, onHelp001Click, onTablesClick, onTableTestClick, onExosClick, t, tNotes, language, isAnyFilterActive, caseRefs }) => {
  if (cases.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-red-300">{t.no_cases_title}</h2>
        <p className="text-gray-500 mt-2">{t.no_cases_description}</p>
      </div>
    );
  }

  const specialCaseId = 'EXO026'; // Procera FCZ Implant Crown
  const specialCaseColor = '--card-bg-raspberry'; // #e03e52
  
  // All other colors for rotation
  const regularBgColors = [
    '--card-bg-salmon',
    '--card-bg-yellow',
    '--card-bg-teal',
    '--card-bg-blue',
    '--card-bg-cornflower',
  ];
  
  let colorIndex = 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cases.map((caseData) => {
        const bgColorVar = caseData.id === specialCaseId
          ? specialCaseColor
          : regularBgColors[colorIndex++ % regularBgColors.length];

        return (
          <CaseCard
            key={caseData.id}
            // FIX: The ref callback was returning a value, which is not allowed. Changed to a function body that doesn't return anything.
            ref={el => { caseRefs.current[caseData.id] = el }}
            caseData={caseData}
            displayNumber={caseData.caseNumber}
            onReferenceClick={onReferenceClick}
            onHelp001Click={onHelp001Click}
            onTablesClick={onTablesClick}
            onTableTestClick={onTableTestClick}
            onExosClick={onExosClick}
            t={t}
            tNotes={tNotes}
            language={language}
            bgColorVar={bgColorVar}
            isAnyFilterActive={isAnyFilterActive}
          />
        );
      })}
    </div>
  );
};

export default CaseGrid;