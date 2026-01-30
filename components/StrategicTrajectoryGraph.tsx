'use client';

import { useBusinessState } from '@/store/useBusinessState';
import { getStrategicTrajectorySeries } from '@/utils/strategicTrajectory';

export default function StrategicTrajectoryGraph() {
  const { state } = useBusinessState();
  const series = getStrategicTrajectorySeries(state);

  if (series.length < 2) {
    return (
      <div className="command-center p-6 border border-charcoal/20">
        <h3 className="font-serif text-xl mb-2">Strategic Trajectory</h3>
        <p className="text-sm text-charcoal/60 font-mono">
          Complete modules and answer with concrete, strategic language. The graph will reflect profit impact.
        </p>
      </div>
    );
  }

  const width = 500;
  const height = 220;
  const margin = { top: 20, right: 20, bottom: 36, left: 44 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const profits = series.map((d) => d.profit);
  const minP = Math.min(0, ...profits);
  const maxP = Math.max(10, ...profits);
  const range = maxP - minP || 1;

  const points = series.map((d, i) => ({
    x: margin.left + (i / (series.length - 1)) * chartWidth,
    y: margin.top + chartHeight - ((d.profit - minP) / range) * chartHeight,
    ...d,
  }));

  return (
    <div className="command-center p-6 border border-charcoal/20" style={{ borderRadius: 0 }}>
      <h3 className="font-serif text-xl mb-1">Strategic Trajectory</h3>
      <p className="text-xs text-charcoal/60 font-mono mb-4">
        Profit impact from answer quality and keywords across completed modules.
      </p>
      <svg width={width} height={height} className="border border-charcoal/10" style={{ borderRadius: 0 }}>
        <line x1={margin.left} y1={margin.top} x2={margin.left} y2={margin.top + chartHeight} stroke="#1a1a1a" strokeWidth="2" />
        <line x1={margin.left} y1={margin.top + chartHeight} x2={margin.left + chartWidth} y2={margin.top + chartHeight} stroke="#1a1a1a" strokeWidth="2" />
        {[minP, 0, maxP].filter((v, i, a) => a.indexOf(v) === i).map((val) => {
          const y = margin.top + chartHeight - ((val - minP) / range) * chartHeight;
          return (
            <g key={val}>
              <line x1={margin.left - 4} y1={y} x2={margin.left} y2={y} stroke="#1a1a1a" strokeWidth="1" />
              <text x={margin.left - 8} y={y + 4} className="font-mono text-xs fill-charcoal/70" textAnchor="end">
                {val}
              </text>
            </g>
          );
        })}
        {series.map((d, i) => (
          <text
            key={i}
            x={margin.left + (i / (series.length - 1)) * chartWidth}
            y={height - 10}
            className="font-mono text-xs fill-charcoal/60"
            textAnchor="middle"
          >
            {d.label}
          </text>
        ))}
        <polyline
          points={points.map((p) => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="#722f37"
          strokeWidth="2"
          style={{ transition: 'all 0.3s ease-out' }}
        />
        {points.map((point, i) => (
          <circle key={i} cx={point.x} cy={point.y} r="4" fill="#722f37" />
        ))}
      </svg>
    </div>
  );
}
