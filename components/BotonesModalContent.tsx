import React from 'react';
import { CheckIcon } from './icons';

const BotonesModalContent: React.FC = () => {
    const baseClasses = "w-full py-2 px-4 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center";

    const buttons = [
        { label: "Boton 1", className: `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500` },
        { label: "Boton 2", className: `${baseClasses} bg-slate-600 text-white hover:bg-slate-700 focus:ring-slate-500` },
        { label: "Boton 3", className: `${baseClasses} bg-green-500 text-white hover:bg-green-600 focus:ring-green-400` },
        { label: "Boton 4", className: `${baseClasses} bg-red-600 text-white hover:bg-red-700 focus:ring-red-500` },
        { label: "Boton 5", className: `${baseClasses} bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-400` },
        { label: "Boton 6", className: `${baseClasses} text-blue-600 border border-blue-600 bg-white hover:bg-blue-50 focus:ring-blue-500` },
        { label: "Boton 7", className: `${baseClasses} text-slate-600 border border-slate-600 bg-white hover:bg-slate-100 focus:ring-slate-500` },
        { label: "Boton 8", className: `${baseClasses} text-blue-600 bg-transparent hover:bg-blue-50 focus:ring-blue-500` },
        { label: "Boton 9", className: `${baseClasses} bg-slate-200 text-slate-400 cursor-not-allowed`, disabled: true },
        { label: "Boton 10", className: `${baseClasses} rounded-full bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500` },
        { label: "Boton 11", className: `${baseClasses} bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500`, icon: <CheckIcon className="h-4 w-4 mr-2" /> },
        { label: "Boton 12", className: `${baseClasses} bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 focus:ring-cyan-400` },
        { label: "Boton 13", className: `${baseClasses} bg-white text-slate-700 shadow hover:shadow-md border border-slate-200 focus:ring-slate-300` },
        { label: "Boton 14", className: `${baseClasses} px-8 py-3 text-lg bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500` },
        { label: "Boton 15", className: `${baseClasses} px-2 py-1 text-xs bg-pink-600 text-white hover:bg-pink-700 focus:ring-pink-500` },
    ];

    return (
        <div className="p-4 bg-slate-50 rounded-lg">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {buttons.map((btn, index) => (
                    <button key={index} className={btn.className} disabled={btn.disabled}>
                        {btn.icon}
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BotonesModalContent;
