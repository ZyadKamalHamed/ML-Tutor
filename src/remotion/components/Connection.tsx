import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

interface ConnectionProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  weight?: number;
  delay?: number;
  animated?: boolean;
  highlighted?: boolean;
}

export const Connection: React.FC<ConnectionProps> = ({
  x1,
  y1,
  x2,
  y2,
  weight = 1,
  delay = 0,
  animated = false,
  highlighted = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: { damping: 15 },
  });

  const strokeWidth = Math.abs(weight) * 3 + 1;
  const opacity = interpolate(weight, [-1, 0, 1], [0.8, 0.2, 0.8]);
  const color = highlighted
    ? "#F59E0B"
    : weight >= 0
    ? "#60A5FA"
    : "#F87171";

  // Calculate the actual endpoint based on progress
  const currentX2 = x1 + (x2 - x1) * Math.max(0, progress);
  const currentY2 = y1 + (y2 - y1) * Math.max(0, progress);

  // Animated pulse along the connection
  const pulsePosition = animated
    ? interpolate(frame % 60, [0, 60], [0, 1])
    : 0;

  const pulseX = x1 + (x2 - x1) * pulsePosition;
  const pulseY = y1 + (y2 - y1) * pulsePosition;

  return (
    <g>
      {/* Main connection line */}
      <line
        x1={x1}
        y1={y1}
        x2={currentX2}
        y2={currentY2}
        stroke={color}
        strokeWidth={strokeWidth}
        opacity={opacity}
        strokeLinecap="round"
      />

      {/* Animated pulse */}
      {animated && progress > 0.9 && (
        <circle
          cx={pulseX}
          cy={pulseY}
          r={5}
          fill="#FBBF24"
          opacity={0.8}
          style={{ filter: "blur(2px)" }}
        />
      )}

      {/* Highlight glow */}
      {highlighted && (
        <line
          x1={x1}
          y1={y1}
          x2={currentX2}
          y2={currentY2}
          stroke="#F59E0B"
          strokeWidth={strokeWidth + 4}
          opacity={0.3}
          strokeLinecap="round"
          style={{ filter: "blur(4px)" }}
        />
      )}
    </g>
  );
};
