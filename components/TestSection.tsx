import React from 'react';
// FIX: Replaced non-existent 'AngulationSiIcon' with 'AngulationNoIcon' to fix import error.
import { SearchIcon, ResetIcon, ToothIcon, AngulationNoIcon as AngulationIcon, InterxIcon, InterxImageIcon } from './icons';

interface TestSectionProps {
  t: any;
  onOpenProceESModal: () => void;
  onOpenBotonesModal: () => void;
}

const TestSection: React.FC<TestSectionProps> = ({ t, onOpenProceESModal, onOpenBotonesModal }) => {
  return (
    <div className="bg-white p-4 rounded-lg my-6 max-w-7xl mx-auto border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">{t.title}</h2>
      <div className="space-y-4">
        <p className="text-gray-600">
          {t.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Component Showcase */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">{t.example_buttons_title}</h3>
            <div className="flex items-center gap-4 flex-wrap">
              <button className="h-9 px-8 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors">
                {t.primary_button}
              </button>
              <button className="flex items-center justify-center h-9 px-4 py-2 text-sm font-semibold rounded-md transition-colors text-gray-700 bg-gray-200 hover:bg-gray-300">
                <ResetIcon className="h-4 w-4 mr-2" />
                {t.secondary_button}
              </button>
              <button 
                onClick={onOpenProceESModal}
                className="h-9 px-8 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                ProceES
              </button>
              <button 
                onClick={onOpenBotonesModal}
                className="h-9 px-8 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
              >
                {t.botones_button}
              </button>
            </div>
          </div>
          
          {/* Icon Showcase */}
          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">{t.example_icons_title}</h3>
            <div className="flex items-center gap-6 text-gray-500 flex-wrap">
                <div className="flex flex-col items-center">
                    <ToothIcon className="h-8 w-8" />
                    <span className="text-xs mt-1">ToothIcon</span>
                </div>
                <div className="flex flex-col items-center">
                    <SearchIcon className="h-8 w-8" />
                    <span className="text-xs mt-1">SearchIcon</span>
                </div>
                 <div className="flex flex-col items-center">
                    <ResetIcon className="h-8 w-8" />
                    <span className="text-xs mt-1">ResetIcon</span>
                </div>
                <div className="flex flex-col items-center">
                    <AngulationIcon className="h-8 w-8" />
                    <span className="text-xs mt-1">AngulationIcon</span>
                </div>
                <div className="flex flex-col items-center">
                    <InterxIcon className="h-8 w-8" />
                    <span className="text-xs mt-1">InterxIcon</span>
                </div>
                <div className="flex flex-col items-center">
                    <InterxImageIcon className="h-8 w-8" />
                    <span className="text-xs mt-1">InterxImageIcon</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSection;