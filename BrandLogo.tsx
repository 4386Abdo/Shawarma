import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeMap = {
    sm: { box: 'w-8 h-8', text: 'text-sm' },
    md: { box: 'w-10 h-10', text: 'text-base' },
    lg: { box: 'w-14 h-14', text: 'text-xl' },
    xl: { box: 'w-20 h-20', text: 'text-2xl' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Concentric signature rings logo from packaging */}
      <div
        className={`${currentSize.box} relative flex items-center justify-center rounded-full bg-emerald-600 text-white shadow-md shrink-0 ring-2 ring-emerald-500/30`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="2 2"
            className="opacity-75"
          />
          <circle
            cx="50"
            cy="50"
            r="33"
            stroke="currentColor"
            strokeWidth="5"
          />
          <circle
            cx="50"
            cy="50"
            r="23"
            stroke="currentColor"
            strokeWidth="5"
          />
          <circle
            cx="50"
            cy="50"
            r="12"
            fill="currentColor"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-stone-100 dark:text-stone-100 group-hover:text-emerald-400 transition-colors tracking-tight text-lg">
              شاورمر
            </span>
            <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
              Shawarmer
            </span>
          </div>
          <span className="text-[10px] text-stone-400 font-medium mt-0.5">
            السنطة المحطة · Gharbia
          </span>
        </div>
      )}
    </div>
  );
};
