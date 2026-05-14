import React from 'react';
interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  fill?: boolean;
}
export function Sparkline({
  data,
  color = '#3F8E84',
  height = 40,
  fill = true
}: SparklineProps) {
  if (data.length === 0) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 100;
  const stepX = width / (data.length - 1);
  const points = data.
  map(
    (v, i) =>
    `${i * stepX},${height - (v - min) / range * (height - 6) - 3}`
  ).
  join(' ');
  const areaPoints = `0,${height} ${points} ${width},${height}`;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="w-full"
      style={{
        height
      }}>
      
      {fill && <polygon points={areaPoints} fill={color} opacity="0.08" />}
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        points={points}
        strokeLinejoin="round"
        strokeLinecap="round" />
      
    </svg>);

}
interface BarChartProps {
  data: {
    label: string;
    value: number;
  }[];
  height?: number;
  color?: string;
}
export function SimpleBarChart({
  data,
  height = 160,
  color = '#3F8E84'
}: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="w-full">
      <div
        className="flex items-end gap-2 h-[160px]"
        style={{
          height
        }}>
        
        {data.map((d, i) =>
        <div
          key={i}
          className="flex-1 flex flex-col items-center gap-2 group">
          
            <div className="text-[10px] font-mono text-ink-tertiary opacity-0 group-hover:opacity-100 transition">
              {d.value}
            </div>
            <div
            className="w-full rounded-t-md transition-all"
            style={{
              height: `${d.value / max * (height - 30)}px`,
              backgroundColor: color,
              opacity: 0.85
            }} />
          
            <div className="text-[10px] text-ink-tertiary whitespace-nowrap">
              {d.label}
            </div>
          </div>
        )}
      </div>
    </div>);

}
interface LineChartProps {
  data: {
    label: string;
    value: number;
  }[];
  height?: number;
  color?: string;
  showAxis?: boolean;
}
export function SimpleLineChart({
  data,
  height = 200,
  color = '#3F8E84',
  showAxis = true
}: LineChartProps) {
  const padding = {
    top: 10,
    right: 10,
    bottom: 24,
    left: 36
  };
  const width = 600;
  const innerW = width - padding.left - padding.right;
  const innerH = height - padding.top - padding.bottom;
  const max = Math.max(...data.map((d) => d.value));
  const min = 0;
  const range = max - min || 1;
  const stepX = innerW / (data.length - 1);
  const points = data.map((d, i) => {
    const x = padding.left + i * stepX;
    const y = padding.top + innerH - (d.value - min) / range * innerH;
    return {
      x,
      y,
      ...d
    };
  });
  const pathD = points.
  map((p, i) => i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`).
  join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + innerH} L ${points[0].x} ${padding.top + innerH} Z`;
  const yTicks = 4;
  const yLabels = Array.from(
    {
      length: yTicks + 1
    },
    (_, i) => Math.round(max / yTicks * i)
  );
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full"
      style={{
        height
      }}>
      
      {showAxis &&
      yLabels.map((v, i) => {
        const y = padding.top + innerH - i / yTicks * innerH;
        return (
          <g key={i}>
              <line
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="#E8E8E5"
              strokeDasharray="2 3"
              className="dark:stroke-[#2A2D32]" />
            
              <text
              x={padding.left - 6}
              y={y + 3}
              textAnchor="end"
              fontSize="9"
              fill="#9A9A98"
              fontFamily="IBM Plex Mono">
              
                {v}
              </text>
            </g>);

      })}
      <path d={areaD} fill={color} opacity="0.08" />
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="1.75"
        strokeLinejoin="round"
        strokeLinecap="round" />
      
      {points.map((p, i) =>
      <circle
        key={i}
        cx={p.x}
        cy={p.y}
        r={2.5}
        fill="white"
        stroke={color}
        strokeWidth="1.5" />

      )}
      {showAxis &&
      points.map((p, i) =>
      <text
        key={i}
        x={p.x}
        y={height - 6}
        textAnchor="middle"
        fontSize="9"
        fill="#9A9A98">
        
            {p.label}
          </text>
      )}
    </svg>);

}
interface DonutChartProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerValue?: string;
}
export function DonutChart({
  data,
  size = 140,
  thickness = 18,
  centerLabel,
  centerValue
}: DonutChartProps) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;
  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} className="-rotate-90 shrink-0">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#F4F4F2"
          strokeWidth={thickness}
          className="dark:stroke-[#1C1F23]" />
        
        {data.map((d, i) => {
          const offset = cumulative / total * circumference;
          const length = d.value / total * circumference;
          cumulative += d.value;
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={d.color}
              strokeWidth={thickness}
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt" />);


        })}
        <g transform={`rotate(90 ${size / 2} ${size / 2})`}>
          {centerValue &&
          <text
            x={size / 2}
            y={size / 2 - 2}
            textAnchor="middle"
            fontFamily="IBM Plex Mono"
            fontWeight="600"
            fontSize="20"
            fill="#18181B"
            className="dark:fill-[#F4F4F5]">
            
              {centerValue}
            </text>
          }
          {centerLabel &&
          <text
            x={size / 2}
            y={size / 2 + 14}
            textAnchor="middle"
            fontSize="9"
            fill="#9A9A98">
            
              {centerLabel}
            </text>
          }
        </g>
      </svg>
      <div className="space-y-2 flex-1 min-w-0">
        {data.map((d, i) =>
        <div
          key={i}
          className="flex items-center justify-between gap-3 text-xs">
          
            <div className="flex items-center gap-2 min-w-0">
              <span
              className="w-2 h-2 rounded-sm shrink-0"
              style={{
                backgroundColor: d.color
              }} />
            
              <span className="text-ink-secondary truncate">{d.label}</span>
            </div>
            <span className="font-mono tabular-nums text-ink-primary dark:text-ink-primary-dark">
              {d.value}
            </span>
          </div>
        )}
      </div>
    </div>);

}