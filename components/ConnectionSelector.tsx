import React from 'react';

interface ConnectionSelectorProps {
  connections: string[];
  selectedConnection: string;
  onConnectionChange: (connection: string) => void;
  t: any;
}

const ConnectionSelector: React.FC<ConnectionSelectorProps> = ({ connections, selectedConnection, onConnectionChange, t }) => (
  <div className="my-4">
    <label className="block text-sm font-semibold text-slate-600 mb-2">{t.connection_selector_label}</label>
    <div className="flex flex-row flex-wrap gap-2">
      {connections.map(conn => {
        const isSelected = conn === selectedConnection;
        return (
          <button
            key={conn}
            onClick={() => onConnectionChange(conn)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent-primary)] ${
              isSelected 
                ? 'bg-[color:var(--accent-primary)] text-white border-[color:var(--accent-primary)] shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400'
            }`}
            aria-pressed={isSelected}
          >
            {conn}
          </button>
        );
      })}
    </div>
  </div>
);

export default ConnectionSelector;