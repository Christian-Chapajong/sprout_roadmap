import React from "react";

type LearnProgressCircleProps = {
  segments: number;
  value: number; // 0 to segments
  radius?: number;
  strokeWidth?: number;
  filledColor?: string;
  emptyColor?: string;
  gap?: number; // degrees
  children?: React.ReactNode;
};

export const LearnProgressCircle = ({
  segments,
  value,
  radius = 35,
  strokeWidth = 14,
  filledColor = "#22C55E",
  emptyColor = "#E5E7EB",
  gap = 14,
  children,
}: LearnProgressCircleProps) => {
  // SVG size with padding for stroke
  const size = radius * 2 + strokeWidth;
  const cx = size / 2;
  const cy = size / 2;
  const r = radius;

  // Each segment's sweep angle
  const totalGap = segments * gap;
  const segmentAngle = (360 - totalGap) / segments;

  // Helper: arc path between startAngle and endAngle
  function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(cx, cy, r, startAngle);
    const end = polarToCartesian(cx, cy, r, endAngle);
    const sweep = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", start.x, start.y,
      "A", r, r, 0, sweep, 1, end.x, end.y
    ].join(" ");
  }

  // Helper: convert polar to cartesian
  function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
    const rad = (angle - 90) * Math.PI / 180.0;
    return {
      x: cx + (r * Math.cos(rad)),
      y: cy + (r * Math.sin(rad))
    };
  }

  // Start drawing at angle 0 (top) and move clockwise
  return (
    <svg width={size} height={size}>
      {Array.from({ length: segments }).map((_, i) => {
        // Start/end angles for this segment
        const start = i * (segmentAngle + gap);
        const end = start + segmentAngle;
        // Only fill if i < value
        const filled = i < value;
        // For debugging:
        // console.log(`Segment ${i}: start=${start}, end=${end}, filled=${filled}`);
        return (
          <path
            key={i}
            d={describeArc(cx, cy, r, start, end)}
            stroke={filled ? filledColor : emptyColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
        );
      })}
      {/* Overlay icon in center */}
      <foreignObject
        x={strokeWidth}
        y={strokeWidth}
        width={size - strokeWidth * 2}
        height={size - strokeWidth * 2}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            width: size - strokeWidth * 2,
            height: size - strokeWidth * 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          {children}
        </div>
      </foreignObject>
    </svg>
  );
};