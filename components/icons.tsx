import React from 'react';

export const ToothIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17.85 2.15c-1.3-1.3-3.18-2.15-5.35-2.15s-4.05.85-5.35 2.15C5.85 3.45 5 5.33 5 7.5s.85 4.05 2.15 5.35c1.12 1.12 2.62 1.83 4.35 2.05v3.6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-3.6c1.73-.22 3.23-.93 4.35-2.05C20.15 11.55 21 9.67 21 7.5s-.85-4.05-2.15-5.35zM12 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
    <path d="M12 23c-1.53 0-2.93-.5-4.08-1.36-.6-.45-.7-1.36-.25-1.95.45-.6 1.36-.7 1.95-.25C10.51 20.1 11.23 20.5 12 20.5c.78 0 1.49-.4 2.38-1.06.6-.45 1.5-.35 1.95.25.45.6.35 1.5-.25 1.95C14.93 22.5 13.53 23 12 23z" />
  </svg>
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export const ResetIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 9a9 9 0 0115-4.58M20 15a9 9 0 01-15 4.58" />
    </svg>
);

export const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M9.75 12.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm3-3h.008v.008h-.008v-.008zm3 0h.008v.008h-.008v-.008zm-3 3h.008v.008h-.008v-.008z" />
  </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export const ChevronUpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

export const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

// FIX: Added missing 'ArrowRightIcon' to fix import error in App.tsx.
export const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
  </svg>
);

export const BookOpenIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

export const IFUIcon: React.FC<{ className?: string }> = ({ className }) => (
  <span className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold text-white bg-gray-500 rounded hover:bg-gray-600 transition-colors ${className}`}>
    IFU
  </span>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const WarrantyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className={className}>
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 221.9-99.6 221.9-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-65.7-10.8-94-31.5l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-22.5-35.8-34.5-77.4-34.5-121.3 0-108.8 88.4-197.3 197.3-197.3 53.2 0 103.1 20.8 140 57.8 36.9 36.9 57.8 86.8 57.8 140 0 108.8-88.4 197.3-197.3 197.3zm83.7-118.3c-3.9-2-22.9-11.3-26.5-12.6-3.6-1.3-6.2-2-8.8 2-2.6 3.9-10 12.6-12.3 15.2-2.3 2.6-4.5 2.9-8.4 1-3.9-1.9-16.5-6.1-31.4-19.4-11.6-10.3-19.4-23-21.7-27-2.3-3.9-.2-6.1 1.8-8.1 1.8-1.8 3.9-4.5 5.9-6.8 2-2.3 2.6-3.9 3.9-6.5 1.3-2.6 0-4.9-1.3-6.8-1.3-1.9-8.8-21.1-12-28.9-3.1-7.8-6.2-6.7-8.7-6.7h-7.8c-2.5 0-6.5 1-10 5.9-3.5 4.9-13.4 13-13.4 31.7s13.7 36.8 15.6 39.3c1.9 2.6 27.2 41.6 65.8 58.1 9.4 4 16.5 6.4 22.1 8.2 8.4 2.7 15.9 2.3 22 1.4 6.9-1 13.9-5.9 19.8-11.6 5.9-5.7 5.9-10.5 4.1-12.6z"/>
  </svg>
);

export const EmailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25-2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

export const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
  </svg>
);

export const UnitariaIndicatorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 28" fill="none" className={className}>
    <title>Single restoration</title>
    <g>
      {/* Path data and viewBox have been adjusted to vertically align this icon with MultipleIndicatorIcon. */}
      <path d="M19.5 15H4.5C4.5 10 6 5.5 8.5 3.5C11 1.5 13 1.5 15.5 3.5C18 5.5 19.5 10 19.5 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <text x="12" y="24" textAnchor="middle" fontSize="6" fontWeight="bold" fill="currentColor">Single</text>
  </svg>
);

export const MultipleIndicatorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="-2 0 84 60" fill="none" className={className}>
    <title>Multiple restoration</title>
    <g transform="translate(40, 16) scale(1) translate(-40, -20)">
      <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 35 C2 20, 8 5, 15 5 L25 5 C32 5, 38 20, 35 35 Z" />
        <path d="M40 35 C38 25, 42 10, 47 8 C52 10, 56 25, 54 35 Z" />
        <path d="M60 35 C58 25, 62 8, 68 6 C74 8, 78 25, 76 35 Z" />
      </g>
    </g>
    <text x="41" y="52" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">Multiple</text>
  </svg>
);

export const FilterIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h16M4 8h12M5 12h8M6 16h4" />
  </svg>
);

export const Icon35: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 30" fill="none" className={className}>
    <title>Torque 35 Ncm</title>
    <g stroke="#E5E7EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"/>
      <path d="M12 6V3L9 5"/>
    </g>
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"/>
      <path d="M12 6V3L9 5"/>
    </g>
    <text x="12" y="12.5" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="bold">35</text>
    <text x="12" y="28" textAnchor="middle" fontSize="6" fontWeight="bold" fill="currentColor">Torque</text>
  </svg>
);

export const Icon15: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 30" fill="none" className={className}>
    <title>Torque 15 Ncm</title>
    <g stroke="#E5E7EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"/>
      <path d="M12 6V3L9 5"/>
    </g>
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"/>
      <path d="M12 6V3L9 5"/>
    </g>
    <text x="12" y="12.5" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="bold">15</text>
    <text x="12" y="28" textAnchor="middle" fontSize="6" fontWeight="bold" fill="currentColor">Torque</text>
  </svg>
);

export const Icon20: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 30" fill="none" className={className}>
    <title>Torque 20 Ncm</title>
    <g stroke="#E5E7EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"/>
      <path d="M12 6V3L9 5"/>
    </g>
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"/>
      <path d="M12 6V3L9 5"/>
    </g>
    <text x="12" y="12.5" dominantBaseline="middle" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="bold">20</text>
    <text x="12" y="28" textAnchor="middle" fontSize="6" fontWeight="bold" fill="currentColor">Torque</text>
  </svg>
);

export const CcIcon: React.FC<{ className?: string; withLeftDot?: boolean }> = ({ className, withLeftDot }) => (
  <svg viewBox="0 0 28 30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <title>Conical Connection (CC)</title>
    {withLeftDot && <circle cx="3" cy="12" r="3" fill="#4CAF50" stroke="none" />}
    <g transform="translate(4, 0)">
      <g>
        <circle cx="12" cy="12" r="10" />
        <path d="M17.2 9L12 6L6.8 9V15L12 18L17.2 15V9Z" />
      </g>
      <text x="12" y="29" textAnchor="middle" fontSize="6" fontWeight="bold" fill="currentColor" stroke="none">CC</text>
    </g>
  </svg>
);

export const TriIcon: React.FC<{ className?: string; withLeftDot?: boolean }> = ({ className, withLeftDot }) => (
  <svg viewBox="0 0 28 30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <title>Tri-Channel</title>
    {withLeftDot && <circle cx="3" cy="12" r="3" fill="#4CAF50" stroke="none" />}
    <g transform="translate(4, 0)">
      <g>
        <circle cx="12" cy="12" r="10" />
        <path d="M12,6 Q14,12 19,16 Q12,17 5,16 Q10,12 12,6 Z" />
      </g>
      <text x="12" y="29" textAnchor="middle" fontSize="5" fontWeight="bold" fill="currentColor" stroke="none">Tri-channel</text>
    </g>
  </svg>
);

export const ExtIcon: React.FC<{ className?: string; withLeftDot?: boolean }> = ({ className, withLeftDot }) => (
  <svg viewBox="0 0 28 30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <title>External Hex</title>
    {withLeftDot && <circle cx="3" cy="12" r="3" fill="#4CAF50" stroke="none" />}
    <g transform="translate(4, 0)">
      <g>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="7.5" />
        <path d="M15.5 10L12 8L8.5 10V14L12 16L15.5 14V10Z" />
      </g>
      <text x="12" y="29" textAnchor="middle" fontSize="6" fontWeight="bold" fill="currentColor" stroke="none">Hex</text>
    </g>
  </svg>
);

export const MuaIcon: React.FC<{ className?: string; withLeftDot?: boolean }> = ({ className, withLeftDot }) => (
  <svg viewBox="0 0 28 30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <title>Multi Unit Abutment (MUA)</title>
    {withLeftDot && <circle cx="3" cy="12" r="3" fill="#4CAF50" stroke="none" />}
    <g transform="translate(4, 0)">
      <g>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="14" r="1.5" />
        <path d="M10 11 A 3.5 3.5 0 0 1 14 11" />
        <path d="M8.5 9 A 6 6 0 0 1 15.5 9" />
      </g>
      <text x="12" y="29" textAnchor="middle" fontSize="6" fontWeight="bold" fill="currentColor" stroke="none">MUA</text>
    </g>
  </svg>
);

export const MuaOtrosIcon: React.FC<{ className?: string; withLeftDot?: boolean }> = ({ className, withLeftDot }) => (
  <svg viewBox="0 0 28 30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <title>MUA Otros</title>
    {withLeftDot && <circle cx="3" cy="12" r="3" fill="#4CAF50" stroke="none" />}
    <g transform="translate(4, 0)">
      <g>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="7" />
        <circle cx="12" cy="14" r="1.5" />
        <path d="M10 11 A 3.5 3.5 0 0 1 14 11" />
        <path d="M8.5 9 A 6 6 0 0 1 15.5 9" />
      </g>
      <text x="12" y="27" textAnchor="middle" fontSize="5" fontWeight="bold" fill="currentColor" stroke="none">
          <tspan x="12">MUA</tspan>
          <tspan x="12" dy="5">otros</tspan>
      </text>
    </g>
  </svg>
);

export const N1Icon: React.FC<{ className?: string; withLeftDot?: boolean }> = ({ className, withLeftDot }) => (
    <svg viewBox="0 0 28 30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <title>N1 Profile</title>
        {withLeftDot && <circle cx="3" cy="12" r="3" fill="#4CAF50" stroke="none" />}
        <g transform="translate(4, 0)">
            <g>
                <path d="M12 2 C 19 2, 21 7, 21 13 C 21 19, 17 22, 12 22 C 7 22, 3 19, 3 13 C 3 7, 5 2, 12 2 Z" strokeWidth="1.5" />
                <path d="M12 4 C 17.5 4, 19 8, 19 13 C 19 18, 15.5 20, 12 20 C 8.5 20, 5 18, 5 13 C 5 8, 6.5 4, 12 4 Z" strokeWidth="1" />
                <g transform="translate(12, 12) scale(0.6) translate(-12, -12)">
                    <circle cx="12" cy="12" r="2.5" strokeWidth="1.5" />
                    <g strokeWidth="1.5">
                        <circle cx="12"    cy="8.25"  r="1.25" />
                        <circle cx="15.25" cy="10.13" r="1.25" />
                        <circle cx="15.25" cy="13.87" r="1.25" />
                        <circle cx="12"    cy="15.75" r="1.25" />
                        <circle cx="8.75"  cy="13.87" r="1.25" />
                        <circle cx="8.75"  cy="10.13" r="1.25" />
                    </g>
                </g>
            </g>
            <text x="12" y="29" textAnchor="middle" fontSize="6" fontWeight="bold" fill="currentColor" stroke="none">N1</text>
        </g>
    </svg>
);

export const N1BaseIcon: React.FC<{ className?: string; withLeftDot?: boolean }> = ({ className, withLeftDot }) => (
  <svg viewBox="0 0 28 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <title>N1 Base</title>
      {withLeftDot && <circle cx="3" cy="15" r="3" fill="#4CAF50" stroke="none" />}
      <g transform="translate(4, 0)">
        <g transform="translate(0, 1)">
          <path d="M7,4 H17 L19,7 Q16,16 15,20 L16,22 H8 L9,20 Q8,16 5,7 L7,4 Z" />
        </g>
        <text x="12" y="30" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="currentColor" stroke="none">N1 Base</text>
      </g>
  </svg>
);

export const On1Icon: React.FC<{ className?: string; withLeftDot?: boolean }> = ({ className, withLeftDot }) => (
  <svg viewBox="0 0 28 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <title>On1 Connection</title>
    {withLeftDot && <circle cx="3" cy="15" r="3" fill="#4CAF50" stroke="none" />}
    <g transform="translate(4, 0)">
        <g transform="translate(0, 1)">
            {/* Base Platform */}
            <path d="M3 20 H 21" />

            {/* Stem */}
            <path d="M10.5 20 L 9.5 23 H 14.5 L 13.5 20" />

            {/* Main Cylinder */}
            <path d="M7 20 V 10 H 17 V 20" />

            {/* Side Lugs */}
            <path d="M7 17 H 5 V 13 H 7" />
            <path d="M17 17 H 19 V 13 H 17" />
            
            {/* Top Section */}
            <path d="M8 10 C 8 7, 9 6, 12 6 C 15 6, 16 7, 16 10" />
            
            {/* Grooves and Cap */}
            <path d="M8.5 8.5 H 15.5" />
            <path d="M9 7 H 15" />
            <path d="M10 4.5 H 14" />
        </g>
        <text x="12" y="30" textAnchor="middle" fontSize="6" fontWeight="bold" fill="currentColor" stroke="none">On1</text>
    </g>
  </svg>
);

export const PearlIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 34" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <title>Inter-X Pearl Connection</title>
    <g transform="translate(0, 1)">
        <path d="M8 3 L 7 20 H 17 L 16 3 H 8 Z" />
        <path d="M6 21.5 L 4 25 H 20 L 18 21.5 H 6 Z" />
        <path d="M5 25 V 27" />
        <path d="M19 25 V 27" />
        <path d="M10.5 25 L 12 27 L 13.5 25" />
    </g>
    <text x="12" y="33" textAnchor="middle" fontSize="5" fontWeight="bold" fill="currentColor" stroke="none">Inter-X Pearl</text>
  </svg>
);

export const InterxIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 35.8 42" fill="currentColor" className={className}>
    <title>Inter-X</title>
    <g>
        <path d="M17.9 35.8C8 35.8 0 27.8 0 17.9S8 0 17.9 0s17.9 8 17.9 17.9-8 17.9-17.9 17.9zm0-33.8C9.2 2 2 9.2 2 17.9s7.2 15.9 15.9 15.9 15.9-7.2 15.9-15.9S26.6 2 17.9 2z"></path>
        <path d="M17.9 24.3c-3.5 0-6.4-2.9-6.4-6.4s2.9-6.4 6.4-6.4 6.4 2.9 6.4 6.4-2.8 6.4-6.4 6.4zm0-10.8c-2.4 0-4.4 2-4.4 4.4s2 4.4 4.4 4.4 4.4-2 4.4-4.4-2-4.4-4.4-4.4z"></path>
        <path d="M23.1 13.6h-3.1c-.5 0-1-.4-1-1V9.4c0-.5.4-1 1-1h.1c.5 0 1 .4 1 1v2.1h2.1c.5 0 1 .4 1 1s-.5 1.1-1.1 1.1zM12.7 23.2h3.1c.5 0 1 .4 1 1v3.1c0 .5-.4 1-1 1h-.1c-.5 0-1-.4-1-1v-2.1h-2.1c-.5 0-1-.4-1-1s.4-1 1-1zM22.2 23.1v-3.1c0-.5.4-1 1-1h3.1c.5 0 1 .4 1 1s-.4 1-1 1h-2.1v2.1c0 .5-.4 1-1 1-.5 0-1-.5-1-1zM11.5 12.7V9.6c0-.5-.4-1-1-1s-1 .4-1 1v2.1H7.4c-.5 0-1 .4-1 1s.4 1 1 1h3.1c.6 0 1-.5 1-1z"></path>
    </g>
    <text x="17.9" y="41" textAnchor="middle" fontSize="6" fontWeight="bold" fill="currentColor">Inter-X</text>
  </svg>
);

export const InterxImageIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 35.8 42" fill="currentColor" className={className}>
    <title>Inter-X Image</title>
    <g>
        <path d="M17.9 35.8C8 35.8 0 27.8 0 17.9S8 0 17.9 0s17.9 8 17.9 17.9-8 17.9-17.9 17.9zm0-33.8C9.2 2 2 9.2 2 17.9s7.2 15.9 15.9 15.9 15.9-7.2 15.9-15.9S26.6 2 17.9 2z"></path>
        <path d="M17.9 24.3c-3.5 0-6.4-2.9-6.4-6.4s2.9-6.4 6.4-6.4 6.4 2.9 6.4 6.4-2.8 6.4-6.4 6.4zm0-10.8c-2.4 0-4.4 2-4.4 4.4s2 4.4 4.4 4.4 4.4-2 4.4-4.4-2-4.4-4.4-4.4z"></path>
        <path d="M23.1 13.6h-3.1c-.5 0-1-.4-1-1V9.4c0-.5.4-1 1-1h.1c.5 0 1 .4 1 1v2.1h2.1c.5 0 1 .4 1 1s-.5 1.1-1.1 1.1zM12.7 23.2h3.1c.5 0 1 .4 1 1v3.1c0 .5-.4 1-1 1h-.1c-.5 0-1-.4-1-1v-2.1h-2.1c-.5 0-1-.4-1-1s.4-1 1-1zM22.2 23.1v-3.1c0-.5.4-1 1-1h3.1c.5 0 1 .4 1 1s-.4 1-1 1h-2.1v2.1c0 .5-.4 1-1 1-.5 0-1-.5-1-1zM11.5 12.7V9.6c0-.5-.4-1-1-1s-1 .4-1 1v2.1H7.4c-.5 0-1 .4-1 1s.4 1 1 1h3.1c.6 0 1-.5 1-1z"></path>
    </g>
    <text x="17.9" y="41" textAnchor="middle" fontSize="6" fontWeight="bold" fill="currentColor">Inter-X</text>
  </svg>
);

export const DTXIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 160 70" className={className} xmlns="http://www.w3.org/2000/svg">
    <title>DTX Studio Lab</title>
    <g transform="translate(0, 0) scale(0.95) translate(3, 2)">
      <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none">
        {/* Solid inner lines */}
        <path d="M30 5 V 65" />
        <path d="M5 20 L 55 50" />
        <path d="M5 50 L 55 20" />
        
        {/* Gapped outer lines */}
        <path d="M5 20 L 28 8.5" />
        <path d="M32 8.5 L 55 20" />
        
        <path d="M55 20 V 33.5" />
        <path d="M55 36.5 V 50" />

        <path d="M55 50 L 32 61.5" />
        <path d="M28 61.5 L 5 50" />
        
        <path d="M5 50 V 36.5" />
        <path d="M5 33.5 V 20" />
      </g>
    </g>
    <text x="70" y="32" fontFamily="'Mark Pro', 'Manrope', sans-serif" fontSize="28" fontWeight="500" fill="currentColor">
      DTX
    </text>
    <text x="70" y="58" fontFamily="'Mark Pro', 'Manrope', sans-serif" fontSize="20" fontWeight="400" fill="currentColor">
      Studio Lab
    </text>
  </svg>
);

export const ExocadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 65 25" className={className} xmlns="http://www.w3.org/2000/svg">
    <title>Exocad</title>
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fill="currentColor"
      fontSize="14"
      fontWeight="600"
      fontFamily="'Mark Pro', 'Manrope', sans-serif"
      letterSpacing="-0.5"
    >
      Exocad
    </text>
  </svg>
);

export const ThreeShapeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 65 25" className={className} xmlns="http://www.w3.org/2000/svg">
    <title>3Shape</title>
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fill="currentColor"
      fontSize="14"
      fontWeight="600"
      fontFamily="'Mark Pro', 'Manrope', sans-serif"
    >
      3shape
    </text>
  </svg>
);

export const DentalwingsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 120 50" className={className} xmlns="http://www.w3.org/2000/svg">
        <title>Dentalwings</title>
        <text
            x="50%"
            y="15"
            textAnchor="middle"
            fill="currentColor"
            fontSize="24"
            fontFamily="'Mark Pro', 'Manrope', sans-serif"
            fontWeight="500"
        >
            dental
            <tspan x="50%" dy="22" fontWeight="bold">wings</tspan>
        </text>
    </svg>
);

export const AngulationNoIcon: React.FC<{ className?: string; withLeftDot?: boolean }> = ({ className, withLeftDot }) => (
  <svg viewBox="0 0 28 30" fill="none" className={className}>
    <title>Sin angulación (No ASC)</title>
    {withLeftDot && <circle cx="3" cy="12" r="3" fill="#4CAF50" stroke="none" />}
    <g transform="translate(4, 0)">
      {/* Vertical line representing the implant axis in grey */}
      <path d="M12 21V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      <text
        x="7.5"
        y="8"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="currentColor"
        fontSize="7"
        fontWeight="bold"
        opacity="0.8"
      >
        0º
      </text>
      {/* Red slash */}
      <path d="M5 19L19 5" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
      <text x="12" y="28" textAnchor="middle" fontSize="6" fontWeight="bold" fill="currentColor">No ASC</text>
    </g>
  </svg>
);

export const AngulationYesIcon: React.FC<{ className?: string; withLeftDot?: boolean }> = ({ className, withLeftDot }) => (
  <svg viewBox="0 0 28 30" fill="none" className={className}>
    <title>Con angulación hasta 25º (ASC)</title>
    {withLeftDot && <circle cx="3" cy="12" r="3" fill="#4CAF50" stroke="none" />}
    <g transform="translate(4, 0)">
      <path d="M8 21L18 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <text
        x="8"
        y="7"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="currentColor"
        fontSize="7"
        fontWeight="bold"
      >
        25º
      </text>
      <text x="12" y="28" textAnchor="middle" fontSize="6" fontWeight="bold" fill="currentColor">ASC</text>
    </g>
  </svg>
);

export const ClipboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5.25H7.5a2.25 2.25 0 00-2.25 2.25v10.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V7.5a2.25 2.25 0 00-2.25-2.25H15M9 5.25V3.75A1.5 1.5 0 0110.5 2.25h3A1.5 1.5 0 0115 3.75v1.5M9 5.25h6" />
  </svg>
);

export const MagnifyingGlassIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
  </svg>
);

export const ScrewIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 30" fill="none" className={className}>
    <title>Screw included</title>
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Head */}
      <path d="M5 4 H19 V8 H5 Z" />
      {/* Drive (simplified hex) */}
      <path d="M12 5 L14 6 L14 7 L12 8 L10 7 L10 6 Z" />
      {/* Shaft */}
      <path d="M9 8 V 22 H 15 V 8" />
      {/* Threads */}
      <path d="M9 11 L15 12" />
      <path d="M9 14 L15 15" />
      <path d="M9 17 L15 18" />
      <path d="M9 20 L15 21" />
    </g>
    <text x="12" y="28.5" dominantBaseline="middle" textAnchor="middle" fontSize="7" fontWeight="bold" fill="currentColor">Included</text>
  </svg>
);

export const ExternalLinkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export const TableIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125V5.625c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v12.75c0 .621-.504 1.125-1.125 1.125m-17.25 0h-1.125" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 9.75h17.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15" />
  </svg>
);

export const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5M3.75 15h16.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75c-3.142 0-6 4.318-6 9.625s2.858 9.625 6 9.625c3.142 0 6-4.318 6-9.625S15.142 3.75 12 3.75z" />
    </svg>
);

export const StoreIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5c0-.933.767-1.5 1.5-1.5h4.5c.733 0 1.5.567 1.5 1.5V21m-10.5 0v-7.5c0-.933.767-1.5 1.5-1.5h1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21v-7.5c0-.933.767-1.5 1.5-1.5H6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V9.75a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 9.75V12z" />
    </svg>
);

export const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542 7z" />
  </svg>
);

export const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M14 13.5h2.5l-.5 2.5h-2v6.5c4.5-.5 8-4 8-8.5a10 10 0 0 0-10-10c-5.5 0-10 4.5-10 10 0 5 3.5 9 8 9.5V16h-2.5V13.5H8V11c0-2.5 1.5-4 4-4h2.5v2.5H12c-.5 0-1 .5-1 1v2.5h3z" />
  </svg>
);

export const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className={className}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);

export const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.5 1.5 4S2.5 1.5 4 1.5 6.5 2.5 6.5 4 5.5 6.5 4 6.5zM21.5 21.5h-5v-6.5c0-1.5-.5-2.5-2-2.5s-1.5 1-1.5 2.5v6.5h-5v-13h5v2.5c1-1.5 2.5-2.5 4.5-2.5s5 3 5 7.5v5.5z" />
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M21.582 6.186A2.5 2.5 0 0 0 19.82 4.42C18.1 4 12 4 12 4s-6.1 0-7.82.42A2.5 2.5 0 0 0 2.418 6.186 26.004 26.004 0 0 0 2 12s.418 5.814 2.182 7.574A2.5 2.5 0 0 0 4.18 21.34c1.72.42 7.82.42 7.82.42s6.1 0 7.82-.42a2.5 2.5 0 0 0 1.762-1.764A26.004 26.004 0 0 0 22 12s-.418-5.814-2.182-7.574zM10 15.5v-7l6 3.5-6 3.5z"/>
  </svg>
);

export const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
);

// FIX: Add missing SparklesIcon for CaseCard AI feature
export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a2.25 2.25 0 01-1.473-1.473L12 18.75l1.938-.648a2.25 2.25 0 011.473-1.473L16.25 15l.648 1.938a2.25 2.25 0 011.473 1.473L20.25 18.75l-1.938.648a2.25 2.25 0 01-1.473 1.473z" />
  </svg>
);

// FIX: Add missing SpinnerIcon for CaseCard loading state
export const SpinnerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={className}>
        <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 12a9 9 0 11-6.219-8.56"
        />
    </svg>
);

// FIX: Add missing SpeakerWaveIcon for CaseCard text-to-speech feature
export const SpeakerWaveIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012 12c0-.83.112-1.633.322-2.396C2.556 8.756 3.379 8.25 4.26 8.25H6.75z" />
  </svg>
);

// FIX: Add missing SpeakerXMarkIcon for CaseCard text-to-speech feature
export const SpeakerXMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012 12c0-.83.112-1.633.322-2.396C2.556 8.756 3.379 8.25 4.26 8.25H6.75z" />
  </svg>
);

// FIX: Add missing SendIcon for Chatbot component
export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

// FIX: Add missing ChatbotIcon for Chatbot component
export const ChatbotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.056 3 12c0 2.224.966 4.234 2.557 5.688L4.5 21l3.353-1.676A8.956 8.956 0 0012 20.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 9.75h.008v.008h-.008v-.008zM13.5 9.75h.008v.008h-.008v-.008z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12.75h4.5" />
  </svg>
);

export const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const DownloadCenterIllustration: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
        <path d="M47.9,33.9A15.9,15.9,0,0,0,32,18a15.8,15.8,0,0,0-15.3,11.2,12.5,12.5,0,0,0-1.2,2.5,12.8,12.8,0,0,0,12.8,15.3H46.4a11.2,11.2,0,0,0,1.5-22.1Z"
              fill="var(--card-bg-cornflower)"
              stroke="var(--accent-primary)"
              strokeMiterlimit="10"
              strokeWidth="1.5"/>
        <polyline points="32 28 32 50 26 44 32 50 38 44"
                  fill="none"
                  stroke="var(--accent-primary)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"/>
    </svg>
);