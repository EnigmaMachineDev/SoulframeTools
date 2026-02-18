import React from 'react';

export default function ProgressBar({ current, total, size = 'md' }) {
  const percent = total === 0 ? 0 : Math.round((current / total) * 100);

  const heightClass = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-4' : 'h-2.5';

  return (
    <div className="w-full">
      <div className={`w-full bg-sf-bg rounded-full ${heightClass} overflow-hidden border border-sf-border`}>
        <div
          className={`${heightClass} rounded-full transition-all duration-300 ease-out`}
          style={{
            width: `${percent}%`,
            background: percent === 100
              ? 'linear-gradient(90deg, #4a8c4a, #6abf6a)'
              : 'linear-gradient(90deg, #2d5a2d, #4a8c4a)',
          }}
        />
      </div>
      {size !== 'sm' && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-sf-muted">{current}/{total}</span>
          <span className="text-xs text-sf-muted">{percent}%</span>
        </div>
      )}
    </div>
  );
}
