import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

interface MathFormulaProps {
  formula: string;
  description?: string;
  delay?: number;
  x?: number;
  y?: number;
  fontSize?: number;
}

export const MathFormula: React.FC<MathFormulaProps> = ({
  formula,
  description,
  delay = 0,
  x = 0,
  y = 0,
  fontSize = 36,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: { damping: 15 },
  });

  const translateY = spring({
    frame: frame - delay,
    fps,
    from: 20,
    to: 0,
    config: { damping: 12 },
  });

  const descriptionOpacity = interpolate(
    frame - delay,
    [20, 40],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: Math.max(0, opacity),
        transform: `translateY(${translateY}px)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(30, 41, 59, 0.9)",
          padding: "16px 32px",
          borderRadius: 12,
          border: "2px solid #3B82F6",
          boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)",
        }}
      >
        <span
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize,
            color: "#E2E8F0",
            fontWeight: "bold",
          }}
        >
          {formula}
        </span>
      </div>
      {description && (
        <p
          style={{
            fontSize: 20,
            color: "#94A3B8",
            opacity: descriptionOpacity,
            fontFamily: "system-ui, -apple-system, sans-serif",
            margin: 0,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};
