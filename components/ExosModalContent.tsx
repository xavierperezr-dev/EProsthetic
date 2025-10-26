import React from 'react';
import { MOCK_CASES } from '../constants';
import { DentalCase, Language } from '../types';

interface ExosModalContentProps {
  t: any;
  language: Language;
  isTableEditMode?: boolean;
  caseModalData: any[];
  onCaseModalDataChange: (data: any[]) => void;
  modalAnalysisData: any[];
  onModalAnalysisDataChange: (data: any[]) => void;
}

const ExosModalContent: React.FC<ExosModalContentProps> = ({ 
  t, 
  language,
  isTableEditMode,
  caseModalData,
  onCaseModalDataChange,
  modalAnalysisData,
  onModalAnalysisDataChange
}) => {

    const tableHeaderClass = "px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider";
    const tableCellClass = "px-4 py-3 whitespace-normal text-slate-800";
    const codeCellClass = "px-4 py-3 whitespace-nowrap text-slate-600 font-mono text-xs";
    const editableCellClasses = isTableEditMode ? "outline-none focus:bg-amber-100 rounded px-1" : "";

    const handleCaseDataBlur = (e: React.FocusEvent<HTMLTableCellElement>, rowIndex: number, colKey: 'title' | 'caseId' | 'modalType') => {
        const newValue = e.target.innerText;
        if (caseModalData[rowIndex][colKey] !== newValue) {
            const newData = [...caseModalData];
            newData[rowIndex] = { ...newData[rowIndex], [colKey]: newValue };
            onCaseModalDataChange(newData);
        }
    };
    
    const handleAnalysisDataBlur = (e: React.FocusEvent<HTMLTableCellElement>, rowIndex: number, colKey: 'modalName' | 'description') => {
        const newValue = e.target.innerText;
        if (modalAnalysisData[rowIndex][colKey] !== newValue) {
            const newData = [...modalAnalysisData];
            newData[rowIndex] = { ...newData[rowIndex], [colKey]: newValue };
            onModalAnalysisDataChange(newData);
        }
    };

    return (
        <div className="space-y-8">
            {/* Table 1 */}
            <div>
                <h3 className="text-lg font-bold text-[color:var(--text-primary)] mb-3">{t.table1_title}</h3>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white max-h-96">
                    <table className="min-w-full text-sm divide-y divide-slate-200">
                        <thead className="bg-slate-50 sticky top-0">
                            <tr>
                                <th className={tableHeaderClass}>{t.table1_col_case_title}</th>
                                <th className={tableHeaderClass}>{t.table1_col_case_id}</th>
                                <th className={tableHeaderClass}>{t.table1_col_modal_content}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {caseModalData.map((row, index) => (
                                <tr key={row.caseId} className="hover:bg-slate-50">
                                    <td 
                                      className={`${tableCellClass} font-medium`}
                                      onBlur={(e) => isTableEditMode && handleCaseDataBlur(e, index, 'title')}
                                      contentEditable={isTableEditMode}
                                      suppressContentEditableWarning
                                    >{row.title}</td>
                                    <td 
                                      className={codeCellClass}
                                      onBlur={(e) => isTableEditMode && handleCaseDataBlur(e, index, 'caseId')}
                                      contentEditable={isTableEditMode}
                                      suppressContentEditableWarning
                                    >{row.caseId}</td>
                                    <td 
                                      className={tableCellClass}
                                      onBlur={(e) => isTableEditMode && handleCaseDataBlur(e, index, 'modalType')}
                                      contentEditable={isTableEditMode}
                                      suppressContentEditableWarning
                                    >{row.modalType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Table 2 */}
            <div>
                <h3 className="text-lg font-bold text-[color:var(--text-primary)] mb-3">{t.table2_title}</h3>
                <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white max-h-96">
                    <table className="min-w-full text-sm divide-y divide-slate-200">
                        <thead className="bg-slate-50 sticky top-0">
                            <tr>
                                <th className={`${tableHeaderClass} w-1/4`}>{t.table2_col_modal_name}</th>
                                <th className={`${tableHeaderClass} w-1/4`}>{t.table2_col_description}</th>
                                <th className={`${tableHeaderClass} w-1/2`}>{t.table2_col_sections}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {modalAnalysisData.map((row, index) => (
                                <tr key={row.modalName} className="hover:bg-slate-50">
                                    <td 
                                      className={`${tableCellClass} font-semibold`}
                                      onBlur={(e) => isTableEditMode && handleAnalysisDataBlur(e, index, 'modalName')}
                                      contentEditable={isTableEditMode}
                                      suppressContentEditableWarning
                                    >{row.modalName}</td>
                                    <td 
                                      className={tableCellClass}
                                      onBlur={(e) => isTableEditMode && handleAnalysisDataBlur(e, index, 'description')}
                                      contentEditable={isTableEditMode}
                                      suppressContentEditableWarning
                                    >{row.description}</td>
                                    <td className={tableCellClass}>
                                        <ul className="list-disc list-inside space-y-1">
                                            {row.sections.map((item: string, itemIndex: number) => <li key={itemIndex}>{item}</li>)}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ExosModalContent;
