'use client';

import { useMemo } from 'react';
import { useBusinessState } from '@/store/useBusinessState';
import { getModuleById } from '@/data/all-modules';

interface HindsightGraphProps {
  currentModuleId: string;
}

export default function HindsightGraph({ currentModuleId }: HindsightGraphProps) {
  const { state } = useBusinessState();
  
  // Check if Module 4 (Positioning) has been completed
  const module4 = getModuleById('module-4');
  const module4Output = state.moduleOutputs['module-4'];
  const module6Output = state.moduleOutputs['module-6'];
  
  const projection = useMemo(() => {
    if (!module4Output || currentModuleId !== 'module-6') return null;
    
    // Get positioning choice
    const positioning = module4Output.requiredOutputs?.['target-customer'] || 
                       module4Output.worksheets?.['worksheet-4-1']?.fields?.['target-customer'];
    
    if (!positioning) return null;
    
    const isMassMarket = typeof positioning === 'string' && 
                        positioning.toLowerCase().includes('mass');
    
    if (isMassMarket) {
      // Project margin collapse in Year 3
      return {
        type: 'margin-collapse',
        message: 'Mass Market positioning projects margin compression in Year 3',
        data: [
          { year: 1, margin: 60 },
          { year: 2, margin: 55 },
          { year: 3, margin: 35 }, // Collapse
          { year: 4, margin: 25 },
        ],
      };
    }
    
    return null;
  }, [module4Output, currentModuleId]);

  if (!projection) return null;

  const width = 400;
  const height = 200;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const maxMargin = 70;
  const minMargin = 0;
  const marginRange = maxMargin - minMargin;

  const points = projection.data.map((d, i) => ({
    x: margin.left + (i / (projection.data.length - 1)) * chartWidth,
    y: margin.top + chartHeight - ((d.margin - minMargin) / marginRange) * chartHeight,
    year: d.year,
    margin: d.margin,
  }));

  return (
    <div className="command-center rounded-sm p-6 mb-6 border-2 border-red-600/30 bg-red-50/50">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">👁️</span>
        <div className="flex-1">
          <h3 className="font-serif text-lg text-ink mb-2">Hindsight Projection</h3>
          <p className="text-sm text-charcoal/80 mb-4">{projection.message}</p>
        </div>
      </div>

      <svg width={width} height={height} className="border border-charcoal/20">
        {/* Axes */}
        <line
          x1={margin.left}
          y1={margin.top}
          x2={margin.left}
          y2={margin.top + chartHeight}
          stroke="#1a1a1a"
          strokeWidth="2"
        />
        <line
          x1={margin.left}
          y1={margin.top + chartHeight}
          x2={margin.left + chartWidth}
          y2={margin.top + chartHeight}
          stroke="#1a1a1a"
          strokeWidth="2"
        />

        {/* Year labels */}
        {projection.data.map((d, i) => (
          <text
            key={i}
            x={margin.left + (i / (projection.data.length - 1)) * chartWidth}
            y={height - 10}
            className="font-mono text-xs fill-charcoal/60"
            textAnchor="middle"
          >
            Year {d.year}
          </text>
        ))}

        {/* Margin labels */}
        {[0, 20, 40, 60].map((val) => {
          const y = margin.top + chartHeight - ((val - minMargin) / marginRange) * chartHeight;
          return (
            <g key={val}>
              <line
                x1={margin.left - 5}
                y1={y}
                x2={margin.left}
                y2={y}
                stroke="#1a1a1a"
                strokeWidth="1"
              />
              <text
                x={margin.left - 10}
                y={y + 4}
                className="font-mono text-xs fill-charcoal/60"
                textAnchor="end"
              >
                {val}%
              </text>
            </g>
          );
        })}

        {/* Ghost line (projected collapse) */}
        <polyline
          points={points.map((p) => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="#dc2626"
          strokeWidth="2"
          strokeDasharray="5,5"
          opacity="0.7"
        />

        {/* Data points */}
        {points.map((point, i) => (
          <g key={i}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#dc2626"
              opacity="0.8"
            />
            {i === 2 && (
              <text
                x={point.x}
                y={point.y - 10}
                className="font-mono text-xs fill-red-600 font-semibold"
                textAnchor="middle"
              >
                Collapse
              </text>
            )}
          </g>
        ))}
      </svg>

      <p className="text-xs text-charcoal/60 mt-4 italic font-mono">
        Projection based on Module 4 positioning choice. Verify assumptions.
      </p>
    </div>
  );
}
