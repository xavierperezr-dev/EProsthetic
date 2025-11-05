import React from 'react';
import { MuaOtrosIcon, ToothIcon, SearchIcon, ResetIcon } from './icons';

interface DevDebugPageProps {
  t: any;
}

const DevDebugPage: React.FC<DevDebugPageProps> = ({ t }) => {
  const caseModalData = [
    { title: 'Puente sobre implantes Procera Zirconia estética', codeName: 'EXO024', tableName: 'ZIRCONIA_BRIDGE_CC_DATA, ZIRCONIA_BRIDGE_BRANEMARK_DATA, ZIRCONIA_BRIDGE_TRICHANNEL_DATA, MULTI_UNIT_CONNECTION_DATA', location: 'constants.ts:637' },
    { title: 'Puente sobre implantes Procera Zirconia', codeName: 'EXO025', tableName: 'ZIRCONIA_BRIDGE_CC_DATA, ZIRCONIA_BRIDGE_BRANEMARK_DATA, ZIRCONIA_BRIDGE_TRICHANNEL_DATA, MULTI_UNIT_CONNECTION_DATA', location: 'constants.ts:637' },
    { title: 'Procera FCZ Implant Crown', codeName: 'EXO026', tableName: 'PROCERA_FCZ_IMPLANT_CROWN_DATA', location: 'constants.ts:669' },
    { title: 'Pilar Procera de Titanio ASC', codeName: 'EXO028', tableName: 'PROCERA_TITANIUM_ASC_CC_DATA, PROCERA_TITANIUM_ASC_TRICHANNEL_DATA', location: 'constants.ts:762' },
    { title: 'Pilar Procera de Titanio', codeName: 'EXO027', tableName: 'PROCERA_TITANIUM_CC_DATA, PROCERA_TITANIUM_BRANEMARK_DATA, PROCERA_TITANIUM_TRICHANNEL_DATA', location: 'constants.ts:678' },
    { title: 'Pilar Procera de Zirconia', codeName: 'EXO030', tableName: 'PROCERA_ZIRCONIA_CC_DATA, PROCERA_ZIRCONIA_BRANEMARK_DATA, PROCERA_ZIRCONIA_TRICHANNEL_DATA', location: 'constants.ts:708' },
    { title: 'Puente sobre implantes Procera de Titanio', codeName: 'EXO029', tableName: 'PROCERA_TITANIUM_BRIDGE_CC_DATA, PROCERA_TITANIUM_BRIDGE_BRANEMARK_DATA, PROCERA_TITANIUM_BRIDGE_TRICHANNEL_UPDATED_DATA, MULTI_UNIT_CONNECTION_DATA', location: 'constants.ts:735' },
    { title: 'Coronas y puentes Procera cementados', codeName: 'EXO031', tableName: 'MOCK_CASES (Contenido por defecto)', location: 'constants.ts:8' },
    { title: 'Barras de titanio NobelProcera', codeName: 'EXO032', tableName: 'NOBELPROCERA_TITANIUM_BAR_CC_DATA, NOBELPROCERA_TITANIUM_BAR_BRANEMARK_DATA, NOBELPROCERA_TITANIUM_BAR_TRICHANNEL_DATA, MULTI_UNIT_CONNECTION_DATA', location: 'constants.ts:780' },
    { title: 'Base Universal No rotatoria', codeName: 'EXO021', tableName: 'UNIVERSAL_BASE_NON_ROTATING_CC_DATA, UNIVERSAL_BASE_NON_ROTATING_BRANEMARK_DATA, UNIVERSAL_BASE_NON_ROTATING_TRICHANNEL_DATA', location: 'constants.ts:332' },
    { title: 'Nobel Biocare® - Base Universal Rotatoria', codeName: 'EXO022', tableName: 'UNIVERSAL_BASE_ROTATING_..._DATA, UNIVERSAL_MULTI_UNIT_..._DATA', location: 'constants.ts:347' },
    { title: 'Base Universal sobre base N1', codeName: 'EXO013', tableName: 'N1_BASE_UNITARIA_NO_ROTATORIO_DATA, N1_BASE_PUENTE_ROTATORIO_DATA', location: 'constants.ts:590' },
    { title: 'Base Universal sobre N1 TCC', codeName: 'EXO006', tableName: 'N1_TCC_UNITARIA_NO_ROTATORIA_DATA', location: 'constants.ts:612' },
    { title: 'Pilar Standard', codeName: 'EXO014', tableName: 'PROCERA_TITANIUM_..._DATA, N1_..._DATA, PILAR_UNIVERSAL_ON1_ROTATORIO_DATA', location: 'App.tsx:729' },
    { title: 'Base Universal On1', codeName: 'EXO019', tableName: 'PILAR_UNIVERSAL_ON1_NO_ROTATORIO_DATA, PILAR_UNIVERSAL_ON1_ROTATORIO_DATA', location: 'constants.ts:573' },
    { title: 'Pilar NobelPearl', codeName: 'EXO020', tableName: 'NOBEL_PEARL_COMPONENTS_DATA', location: 'constants.ts:811' },
    { title: 'Provisional a partir de planificación en DTX Clinic', codeName: 'EXO023', tableName: 'MOCK_CASES (Contenido por defecto)', location: 'constants.ts:8' },
    { title: 'Tornillo Temporal para MUA en restauraciones impresas', codeName: 'EXO033', tableName: 'MOCK_CASES (Contenido por defecto)', location: 'constants.ts:8' },
    { title: 'Pre-milled blank', codeName: 'EXO016', tableName: 'PRE_MILLED_BLANKS_DATA, PRE_MILLED_BLANKS_N1_TCC_DATA', location: 'constants.ts:465' },
    { title: 'Pilar transepitelial Standard Multi-unit', codeName: 'EXO034', tableName: 'MUA_XEAL_..._DATA, MUA_BRANEMARK_..._DATA, MUA_TRICHANNEL_..._DATA', location: 'constants.ts:821' },
  ];

  const otherModalData = [
    { title: 'Selección de Idioma/País', codeName: 'IntroModal', tableName: 'N/A', location: 'components/IntroModal.tsx:1' },
    { title: 'Soporte Técnico', codeName: 'SupportModal', tableName: 'N/A', location: 'App.tsx:96' },
    { title: 'Atención al Cliente', codeName: 'CustomerServiceModal', tableName: 'N/A', location: 'components/CustomerServiceModal.tsx:1' },
    { title: 'Descarga de Librerías (Ayuda)', codeName: 'DescargasProceraModalContent', tableName: 'N/A', location: 'components/DescargasProceraModalContent.tsx:1' },
    { title: 'Seleccionar Flujo de Trabajo', codeName: 'SelecProLocal', tableName: 'N/A', location: 'components/SelecProLocal.tsx:1' },
    { title: 'Asistente Virtual', codeName: 'Chatbot', tableName: 'N/A', location: 'components/Chatbot.tsx:1' },
  ];

  const tableHeaderClass = "px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider";

  const renderTable = (title: string, data: any[]) => (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-[color:var(--text-primary)] mb-4 pb-2 border-b border-slate-200">
        {title}
      </h3>
      <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className={`${tableHeaderClass} w-2/6`}>Título de la ventana modal</th>
              <th className={`${tableHeaderClass} w-1/6`}>Nombre en el código</th>
              <th className={`${tableHeaderClass} w-2/6`}>Nombre de la tabla del código</th>
              <th className={`${tableHeaderClass} w-1/6`}>Fichero y línea</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors duration-150">
                <td className="px-4 py-3 whitespace-normal font-medium text-slate-800">{row.title}</td>
                <td className="px-4 py-3 whitespace-nowrap font-mono text-xs text-slate-600">{row.codeName}</td>
                <td className="px-4 py-3 whitespace-normal text-xs text-slate-600 font-mono">{row.tableName}</td>
                <td className="px-4 py-3 whitespace-nowrap font-mono text-xs text-blue-600">{row.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      {renderTable("Modales de Fichas de Casos", caseModalData)}
      {renderTable("Otros Modales de la Aplicación", otherModalData)}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-[color:var(--text-primary)] mb-4 pb-2 border-b border-slate-200">
          {t.iconGridTitle}
        </h3>
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-6 text-slate-600">
                <div className="flex flex-col items-center">
                    <MuaOtrosIcon className="h-12 w-12 text-green-500" />
                    <span className="text-xs mt-1">MuaOtrosIcon</span>
                </div>
                <div className="flex flex-col items-center">
                    <ToothIcon className="h-12 w-12" />
                    <span className="text-xs mt-1">ToothIcon</span>
                </div>
                <div className="flex flex-col items-center">
                    <SearchIcon className="h-12 w-12" />
                    <span className="text-xs mt-1">SearchIcon</span>
                </div>
                <div className="flex flex-col items-center">
                    <ResetIcon className="h-12 w-12" />
                    <span className="text-xs mt-1">ResetIcon</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DevDebugPage;