import React from 'react';
import * as Icons from './icons';
import TestSection from './TestSection';
import { translations } from '../translations';

interface DevDebugPageProps {
  t: any;
  onOpenProceESModal: () => void;
  onOpenBotonesModal: () => void;
}

const ColorPalette: React.FC<{ t: any }> = ({ t }) => {
  const colors = [
    { name: t.colors.raspberry, varName: '--card-bg-raspberry', hex: '#e03e52' },
    { name: t.colors.salmon, varName: '--card-bg-salmon', hex: '#ffa38b' },
    { name: t.colors.yellow, varName: '--card-bg-yellow', hex: '#fed880' },
    { name: t.colors.teal, varName: '--card-bg-teal', hex: '#7ae1bf' },
    { name: t.colors.blue, varName: '--card-bg-blue', hex: '#007398' },
    { name: t.colors.cornflower, varName: '--card-bg-cornflower', hex: '#87a9e2' },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-[color:var(--text-primary)] mb-4 pb-2 border-b border-slate-200">
        {t.colorPaletteTitle}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {colors.map((color) => (
          <div key={color.name} className="border border-slate-200 rounded-lg shadow-sm">
            <div
              className="h-24 rounded-t-lg"
              style={{ backgroundColor: `var(${color.varName})` }}
            ></div>
            <div className="p-3 bg-white rounded-b-lg">
              <p className="font-semibold text-slate-800 text-sm">{color.name}</p>
              <p className="text-xs text-slate-500">{color.hex}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => (
  <div className="relative flex items-center group">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs p-2 text-xs text-white bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
      {text}
    </div>
  </div>
);


const DevDebugPage: React.FC<DevDebugPageProps> = ({ t, onOpenProceESModal, onOpenBotonesModal }) => {
  const allIcons = Object.entries(Icons).map(([name, IconComponent]) => ({
    name,
    Component: IconComponent as React.FC<{ className?: string }>,
  }));

  const modalData = [
    { uiTitle: t.modal_titles.references, codeId: 'modal-references', trigger: t.modal_triggers.references, purpose: t.modal_purposes.references },
    { uiTitle: t.modal_titles.help_espt, codeId: 'modal-help-espt', trigger: t.modal_triggers.help_espt, purpose: t.modal_purposes.help_espt },
    { uiTitle: t.modal_titles.help_frsv, codeId: 'modal-help-frsv', trigger: t.modal_triggers.help_frsv, purpose: t.modal_purposes.help_frsv },
    { uiTitle: t.modal_titles.workflow_selector, codeId: 'modal-workflow-selector', trigger: t.modal_triggers.workflow_selector, purpose: t.modal_purposes.workflow_selector },
    { uiTitle: t.modal_titles.ui_tables, codeId: 'modal-ui-tables', trigger: t.modal_triggers.ui_tables, purpose: t.modal_purposes.ui_tables },
    { uiTitle: t.modal_titles.test_table, codeId: 'modal-test-table', trigger: t.modal_triggers.test_table, purpose: t.modal_purposes.test_table },
    { uiTitle: t.modal_titles.customer_service, codeId: 'modal-customer-service', trigger: t.modal_triggers.customer_service, purpose: t.modal_purposes.customer_service },
    { uiTitle: t.modal_titles.button_gallery, codeId: 'modal-button-gallery', trigger: t.modal_triggers.button_gallery, purpose: t.modal_purposes.button_gallery },
    { uiTitle: t.modal_titles.download_center, codeId: 'modal-download-center', trigger: t.modal_triggers.download_center, purpose: t.modal_purposes.download_center },
    { uiTitle: t.modal_titles.exos_analysis, codeId: 'modal-exos-analysis', trigger: t.modal_triggers.exos_analysis, purpose: t.modal_purposes.exos_analysis },
    { uiTitle: t.modal_titles.intro, codeId: 'modal-intro', trigger: t.modal_triggers.intro, purpose: t.modal_purposes.intro },
    { uiTitle: t.modal_titles.chatbot, codeId: 'chatbot-main', trigger: t.modal_triggers.chatbot, purpose: t.modal_purposes.chatbot },
  ];

  const tableHeaderClass = "px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider";

  return (
    <div className="space-y-8 p-2">
      <TestSection t={t.testSection} onOpenProceESModal={onOpenProceESModal} onOpenBotonesModal={onOpenBotonesModal} />
      <ColorPalette t={t} />

      <div>
        <h3 className="text-xl font-bold text-[color:var(--text-primary)] mb-4 pb-2 border-b border-slate-200">
          {t.iconGridTitle}
        </h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
          {allIcons.map(({ name, Component }) => (
            <div key={name} className="flex flex-col items-center justify-center text-center p-2 border border-slate-200 rounded-lg bg-slate-50 h-28">
              <div className="flex-grow flex items-center justify-center">
                <Component className="h-8 w-8 text-slate-600" />
              </div>
              <p className="text-xs text-slate-500 mt-2 break-all">{name}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-[color:var(--text-primary)] mb-4 pb-2 border-b border-slate-200">
          {t.referenceTableTitle}
        </h3>
        <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className={`${tableHeaderClass} w-1/6`}>{t.uiTitleHeader}</th>
                <th className={`${tableHeaderClass} w-1/6`}>{t.modalIdHeader}</th>
                <th className={`${tableHeaderClass} w-1/4`}>{t.modalTriggerHeader}</th>
                <th className={`${tableHeaderClass} w-2/4`}>{t.modalPurposeHeader}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {modalData.map((row) => (
                <tr key={row.codeId} className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="px-4 py-3 whitespace-normal font-medium text-slate-800">{row.uiTitle}</td>
                  <td className="px-4 py-3 whitespace-nowrap font-mono text-xs">
                    <Tooltip text={t.linkTooltip}>
                      <a href={`#${row.codeId}`} className="text-blue-600 hover:underline">{row.codeId}</a>
                    </Tooltip>
                  </td>
                  <td className="px-4 py-3 whitespace-normal text-slate-600">{row.trigger}</td>
                  <td className="px-4 py-3 whitespace-normal text-slate-600">{row.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DevDebugPage;
