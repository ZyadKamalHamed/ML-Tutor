import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  Sequence,
} from "remotion";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { Graph } from "../components/Graph";

interface ActivationFunctionsSkillProps {
  functions: string[];
}

const activationFunctions: Record<
  string,
  {
    fn: (x: number) => number;
    name: string;
    formula: string;
    color: string;
    description: string;
  }
> = {
  sigmoid: {
    fn: (x) => 1 / (1 + Math.exp(-x)),
    name: "Sigmoid",
    formula: "σ(x) = 1 / (1 + e⁻ˣ)",
    color: "#3B82F6",
    description: "Squashes values between 0 and 1",
  },
  relu: {
    fn: (x) => Math.max(0, x),
    name: "ReLU",
    formula: "f(x) = max(0, x)",
    color: "#10B981",
    description: "Outputs x if positive, else 0",
  },
  tanh: {
    fn: (x) => Math.tanh(x),
    name: "Tanh",
    formula: "tanh(x) = (eˣ - e⁻ˣ) / (eˣ + e⁻ˣ)",
    color: "#F59E0B",
    description: "Squashes values between -1 and 1",
  },
  softmax: {
    fn: (x) => Math.exp(x) / (Math.exp(x) + Math.exp(0)),
    name: "Softmax",
    formula: "softmax(xᵢ) = eˣⁱ / Σeˣʲ",
    color: "#EC4899",
    description: "Converts to probability distribution",
  },
  leaky_relu: {
    fn: (x) => (x > 0 ? x : 0.01 * x),
    name: "Leaky ReLU",
    formula: "f(x) = max(0.01x, x)",
    color: "#8B5CF6",
    description: "Like ReLU but with small negative slope",
  },
};

export const ActivationFunctionsSkill: React.FC<
  ActivationFunctionsSkillProps
> = ({ functions }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Generate graph points for each function
  const generatePoints = (fnKey: string) => {
    const fn = activationFunctions[fnKey]?.fn || ((x: number) => x);
    const points: Array<{ x: number; y: number }> = [];
    for (let x = -5; x <= 5; x += 0.1) {
      points.push({ x, y: fn(x) });
    }
    return points;
  };

  // Determine which function to show based on frame
  const functionsPerSlide = 60;
  const currentFunctionIndex = Math.min(
    Math.floor(frame / functionsPerSlide),
    functions.length - 1
  );
  const currentFn = functions[currentFunctionIndex];
  const fnConfig = activationFunctions[currentFn];

  // Transition animation
  const slideProgress = (frame % functionsPerSlide) / functionsPerSlide;
  const isTransitioning = slideProgress > 0.85;

  const opacity = isTransitioning
    ? interpolate(slideProgress, [0.85, 1], [1, 0])
    : interpolate(slideProgress, [0, 0.15], [0, 1], {
        extrapolateRight: "clamp",
      });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
      }}
    >
      {/* Title */}
      <Sequence from={0} durationInFrames={60}>
        <div
          style={{
            position: "absolute",
            top: 50,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AnimatedTitle
            title="Activation Functions"
            subtitle="Non-linearity in Neural Networks"
            color="#8B5CF6"
          />
        </div>
      </Sequence>

      {/* Current function display */}
      {fnConfig && (
        <div
          style={{
            position: "absolute",
            top: 180,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity,
          }}
        >
          {/* Function name */}
          <h2
            style={{
              fontSize: 48,
              fontWeight: "bold",
              color: fnConfig.color,
              margin: 0,
              marginBottom: 20,
              fontFamily: "system-ui",
            }}
          >
            {fnConfig.name}
          </h2>

          {/* Graph */}
          <div style={{ marginBottom: 30 }}>
            <Graph
              points={generatePoints(currentFn)}
              width={700}
              height={400}
              color={fnConfig.color}
              xLabel="x"
              yLabel="f(x)"
              delay={0}
            />
          </div>

          {/* Formula */}
          <div
            style={{
              background: "rgba(30, 41, 59, 0.9)",
              padding: "16px 32px",
              borderRadius: 12,
              border: `2px solid ${fnConfig.color}`,
              marginBottom: 20,
            }}
          >
            <code
              style={{
                fontSize: 28,
                color: "#E2E8F0",
                fontFamily: "'Courier New', monospace",
              }}
            >
              {fnConfig.formula}
            </code>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: 22,
              color: "#94A3B8",
              margin: 0,
              fontFamily: "system-ui",
            }}
          >
            {fnConfig.description}
          </p>
        </div>
      )}

      {/* Progress indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {functions.map((fn, i) => (
          <div
            key={fn}
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background:
                i === currentFunctionIndex
                  ? activationFunctions[fn]?.color || "#3B82F6"
                  : "#334155",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
