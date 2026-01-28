import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";

interface Point {
  x: number;
  y: number;
}

interface GraphProps {
  points: Point[];
  width?: number;
  height?: number;
  color?: string;
  delay?: number;
  showAxes?: boolean;
  xLabel?: string;
  yLabel?: string;
  animateDrawing?: boolean;
}

export const Graph: React.FC<GraphProps> = ({
  points,
  width = 400,
  height = 300,
  color = "#3B82F6",
  delay = 0,
  showAxes = true,
  xLabel,
  yLabel,
  animateDrawing = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12 },
  });

  const drawProgress = animateDrawing
    ? interpolate(frame - delay, [0, 60], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  // Normalize points to fit within the graph
  const padding = 40;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  const xMin = Math.min(...points.map((p) => p.x));
  const xMax = Math.max(...points.map((p) => p.x));
  const yMin = Math.min(...points.map((p) => p.y));
  const yMax = Math.max(...points.map((p) => p.y));

  const normalizeX = (x: number) =>
    padding + ((x - xMin) / (xMax - xMin || 1)) * graphWidth;
  const normalizeY = (y: number) =>
    height - padding - ((y - yMin) / (yMax - yMin || 1)) * graphHeight;

  // Generate path
  const pathPoints = points.map((p) => ({
    x: normalizeX(p.x),
    y: normalizeY(p.y),
  }));

  const pathD = pathPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  // Calculate partial path for animation
  const totalPoints = Math.floor(pathPoints.length * drawProgress);

  const animatedPathD = pathPoints
    .slice(0, Math.max(2, totalPoints))
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      style={{ opacity: Math.max(0, opacity) }}
    >
      {/* Background */}
      <rect
        width={width}
        height={height}
        fill="rgba(15, 23, 42, 0.8)"
        rx={8}
      />

      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((ratio) => (
        <g key={ratio}>
          <line
            x1={padding}
            y1={padding + graphHeight * ratio}
            x2={width - padding}
            y2={padding + graphHeight * ratio}
            stroke="#334155"
            strokeWidth={1}
            strokeDasharray="4,4"
          />
          <line
            x1={padding + graphWidth * ratio}
            y1={padding}
            x2={padding + graphWidth * ratio}
            y2={height - padding}
            stroke="#334155"
            strokeWidth={1}
            strokeDasharray="4,4"
          />
        </g>
      ))}

      {/* Axes */}
      {showAxes && (
        <>
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="#64748B"
            strokeWidth={2}
          />
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="#64748B"
            strokeWidth={2}
          />

          {/* Axis labels */}
          {xLabel && (
            <text
              x={width / 2}
              y={height - 10}
              textAnchor="middle"
              fill="#94A3B8"
              fontSize={14}
              fontFamily="system-ui"
            >
              {xLabel}
            </text>
          )}
          {yLabel && (
            <text
              x={15}
              y={height / 2}
              textAnchor="middle"
              fill="#94A3B8"
              fontSize={14}
              fontFamily="system-ui"
              transform={`rotate(-90, 15, ${height / 2})`}
            >
              {yLabel}
            </text>
          )}
        </>
      )}

      {/* Line path with glow */}
      <path
        d={animatedPathD}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))" }}
      />

      {/* Data points */}
      {pathPoints.slice(0, totalPoints).map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={6}
          fill={color}
          stroke="white"
          strokeWidth={2}
        />
      ))}
    </svg>
  );
};
