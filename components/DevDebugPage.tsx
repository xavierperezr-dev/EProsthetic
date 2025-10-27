import React from 'react';

interface DevDebugPageProps {
  t: any;
}

const DevDebugPage: React.FC<DevDebugPageProps> = ({ t }) => {
  const modalData = [
    // Modals triggered by Case Cards
    { title: 'Base Universal sobre N1 TCC', trigger: 'EXO006', component: 'TablaComponentesConexion (N1_TCC_UNITARIA_NO_ROTATORIA_DATA)', location: 'constants.ts:625' },
    { title: 'Base Universal sobre base N1', trigger: 'EXO013', component: 'TablaComponentesConexion (N1_BASE_...)', location: 'constants.ts:601' },
    { title: 'Pilar Standard', trigger: 'EXO014', component: 'ConnectionSelector + Contenido Dinámico', location: 'App.tsx:729' },
    { title: 'Base Universal On1', trigger: 'EXO019', component: 'TablaComponentesConexion (PILAR_UNIVERSAL_ON1_...)', location: 'constants.ts:573' },
    { title: 'Pre-milled blank', trigger: 'EXO016', component: 'PreMilledBlanksPage / TablaPremecanizadosN1TCC', location: 'constants.ts:465' },
    { title: 'Pilar NobelPearl', trigger: 'EXO020', component: 'TablaComponentesConexion (NOBEL_PEARL_COMPONENTS_DATA)', location: 'constants.ts:924' },
    { title: 'Puente sobre implantes Procera Zirconia...', trigger: 'EXO024, EXO025', component: 'ConnectionSelector + Contenido Dinámico (ZIRCONIA_BRIDGE_...)', location: 'constants.ts:637' },
    { title: 'Procera FCZ Implant Crown', trigger: 'EXO026', component: 'TablaComponentesConexion (PROCERA_FCZ_IMPLANT_CROWN_DATA)', location: 'constants.ts:669' },
    { title: 'Pilar Procera de Titanio', trigger: 'EXO027', component: 'ConnectionSelector + Contenido Dinámico (PROCERA_TITANIUM_...)', location: 'constants.ts:678' },
    { title: 'Pilar Procera de Titanio ASC', trigger: 'EXO028', component: 'ConnectionSelector + Contenido Dinámico (PROCERA_TITANIUM_ASC_...)', location: 'constants.ts:826' },
    { title: 'Puente sobre implantes Procera de Titanio', trigger: 'EXO029', component: 'ConnectionSelector + Contenido Dinámico (PROCERA_TITANIUM_BRIDGE_...)', location: 'constants.ts:790' },
    { title: 'Pilar Procera de Zirconia', trigger: 'EXO030', component: 'ConnectionSelector + Contenido Dinámico (PROCERA_ZIRCONIA_...)', location: 'constants.ts:708' },
    { title: 'Barras de titanio NobelProcera', trigger: 'EXO032', component: 'ConnectionSelector + Contenido Dinámico (NOBELPROCERA_TITANIUM_BAR_...)', location: 'constants.ts:856' },
    { title: 'Pilar transepitelial Standard Multi-unit', trigger: 'EXO034', component: 'ConnectionSelector + TablaMUA (MUA_...)', location: 'constants.ts:936' },
    { title: 'Base Universal No rotatoria', trigger: 'EXO021', component: 'ConnectionSelector + Contenido Dinámico (UNIVERSAL_BASE_NON_ROTATING_...)', location: 'constants.ts:332' },
    { title: 'Base Universal Rotatoria', trigger: 'EXO022', component: 'ConnectionSelector + Contenido Dinámico (UNIVERSAL_BASE_ROTATING_...)', location: 'constants.ts:347' },
    // Non-CaseCard Modals
    { title: 'Selección de Idioma/País (Intro)', trigger: 'Carga de App / Botón Globo', component: 'IntroModal', location: 'components/IntroModal.tsx:1' },
    { title: 'Soporte Técnico', trigger: 'Botón Header (ES/PT)', component: 'SupportModal', location: 'App.tsx:96' },
    { title: 'Atención al Cliente', trigger: 'Botón Header (FR/SV)', component: 'CustomerServiceModal', location: 'components/CustomerServiceModal.tsx:1' },
    { title: 'Centro de Descargas', trigger: 'Botón Header', component: 'DownloadCenterModalContent', location: 'App.tsx:424' },
    { title: 'Descarga de Librerías (Ayuda)', trigger: 'Botón "Descargar Librerías"', component: 'DescargasProceraModalContent / DescargasOtherProcera', location: 'components/DescargasProceraModalContent.tsx:1' },
    { title: 'Seleccionar Flujo de Trabajo', trigger: 'Modal de Ayuda de Descarga', component: 'SelecProLocal', location: 'components/SelecProLocal.tsx:1' },
    { title: 'Información de la Interfaz', trigger: 'Botón "Tablas" en TEST001', component: 'TablesModalContent', location: 'App.tsx:351' },
    { title: 'Tabla de Test', trigger: 'Icono Tabla en TEST001', component: 'TablaTriChannel', location: 'components/TriChannelTable.tsx:1' },
    { title: 'Galería de Botones', trigger: 'Botón "Galería" en debug (obsoleto)', component: 'BotonesModalContent', location: 'components/BotonesModalContent.tsx:1' },
    { title: 'Análisis de Interfaz (EXOS)', trigger: 'Botón "EXOS" en TEST001', component: 'ExosModalContent', location: 'components/ExosModalContent.tsx:1' },
  ];

  const tableHeaderClass = "px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider";

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold text-[color:var(--text-primary)] mb-4 pb-2 border-b border-slate-200">
        {t.analysis_table_title}
      </h3>
      <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className={`${tableHeaderClass} w-1/4`}>{t.table_col_title}</th>
              <th className={`${tableHeaderClass} w-1/4`}>{t.table_col_trigger}</th>
              <th className={`${tableHeaderClass} w-1/4`}>{t.table_col_component}</th>
              <th className={`${tableHeaderClass} w-1/4`}>{t.table_col_location}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {modalData.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors duration-150">
                <td className="px-4 py-3 whitespace-normal font-medium text-slate-800">{row.title}</td>
                <td className="px-4 py-3 whitespace-nowrap font-mono text-xs text-slate-600">{row.trigger}</td>
                <td className="px-4 py-3 whitespace-normal text-slate-600">{row.component}</td>
                <td className="px-4 py-3 whitespace-nowrap font-mono text-xs text-blue-600">{row.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DevDebugPage;