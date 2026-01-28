import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

interface NeuronNodeProps {
  x: number;
  y: number;
  radius?: number;
  color?: string;
  delay?: number;
  label?: string;
  activated?: boolean;
}

export const NeuronNode: React.FC<NeuronNodeProps> = ({
  x,
  y,
  radius = 30,
  color = "#3B82F6",
  delay = 0,
  label,
  activated = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 100 },
  });

  const glowIntensity = activated
    ? interpolate(
        Math.sin(frame * 0.1),
        [-1, 1],
        [0.3, 0.8],
        { extrapolateRight: "clamp" }
      )
    : 0;

  const actualColor = activated ? "#10B981" : color;

  return (
    <g transform={`translate(${x}, ${y}) scale(${Math.max(0, scale)})`}>
      {/* Glow effect for activated neurons */}
      {activated && (
        <circle
          r={radius * 1.5}
          fill={`rgba(16, 185, 129, ${glowIntensity})`}
          style={{ filter: "blur(10px)" }}
        />
      )}

      {/* Main neuron circle */}
      <circle
        r={radius}
        fill={actualColor}
        stroke="#1F2937"
        strokeWidth={3}
        style={{
          filter: activated ? "drop-shadow(0 0 10px #10B981)" : "none",
        }}
      />

      {/* Inner highlight */}
      <circle
        r={radius * 0.6}
        fill="rgba(255, 255, 255, 0.2)"
        transform="translate(-5, -5)"
      />

      {/* Label */}
      {label && (
        <text
          textAnchor="middle"
          dominantBaseline="central"
          fill="white"
          fontSize={14}
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          {label}
        </text>
      )}
    </g>
  );
};
