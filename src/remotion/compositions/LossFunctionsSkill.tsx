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
import { MathFormula } from "../components/MathFormula";

interface LossFunctionsSkillProps {
  functions: string[];
}

const lossFunctions: Record<
  string,
  {
    name: string;
    formula: string;
    color: string;
    description: string;
    useCase: string;
    generatePoints: () => Array<{ x: number; y: number }>;
  }
> = {
  mse: {
    name: "Mean Squared Error",
    formula: "MSE = (1/n) Σ(yᵢ - ŷᵢ)²",
    color: "#3B82F6",
    description: "Penalizes larger errors more heavily due to squaring",
    useCase: "Regression problems",
    generatePoints: () => {
      const points: Array<{ x: number; y: number }> = [];
      for (let x = -3; x <= 3; x += 0.1) {
        points.push({ x, y: x * x });
      }
      return points;
    },
  },
  "cross-entropy": {
    name: "Cross-Entropy Loss",
    formula: "CE = -Σ yᵢ log(ŷᵢ)",
    color: "#EC4899",
    description: "Measures difference between probability distributions",
    useCase: "Classification problems",
    generatePoints: () => {
      const points: Array<{ x: number; y: number }> = [];
      for (let x = 0.01; x <= 1; x += 0.02) {
        points.push({ x, y: -Math.log(x) });
      }
      return points;
    },
  },
  mae: {
    name: "Mean Absolute Error",
    formula: "MAE = (1/n) Σ|yᵢ - ŷᵢ|",
    color: "#10B981",
    description: "Linear penalty, robust to outliers",
    useCase: "When outliers should be weighted equally",
    generatePoints: () => {
      const points: Array<{ x: number; y: number }> = [];
      for (let x = -3; x <= 3; x += 0.1) {
        points.push({ x, y: Math.abs(x) });
      }
      return points;
    },
  },
  huber: {
    name: "Huber Loss",
    formula: "L = { ½x² if |x| ≤ δ; δ(|x| - ½δ) otherwise",
    color: "#F59E0B",
    description: "Combines MSE and MAE benefits",
    useCase: "Robust regression with some outliers",
    generatePoints: () => {
      const delta = 1;
      const points: Array<{ x: number; y: number }> = [];
      for (let x = -3; x <= 3; x += 0.1) {
        const absX = Math.abs(x);
        const y =
          absX <= delta ? 0.5 * x * x : delta * (absX - 0.5 * delta);
        points.push({ x, y });
      }
      return points;
    },
  },
};

export const LossFunctionsSkill: React.FC<LossFunctionsSkillProps> = ({
  functions,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Animation timing
  const framesPerFunction = 90;
  const currentIndex = Math.min(
    Math.floor(frame / framesPerFunction),
    functions.length - 1
  );
  const currentFn = functions[currentIndex];
  const fnConfig = lossFunctions[currentFn];

  // Slide transition
  const localFrame = frame % framesPerFunction;
  const slideIn = spring({
    frame: localFrame,
    fps,
    from: 50,
    to: 0,
    config: { damping: 15 },
  });
  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(localFrame, [70, 90], [1, 0], {
    extrapolateLeft: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

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
            top: 40,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AnimatedTitle
            title="Loss Functions"
            subtitle="Measuring Model Performance"
            color="#F59E0B"
          />
        </div>
      </Sequence>

      {/* Current loss function */}
      {fnConfig && (
        <div
          style={{
            position: "absolute",
            top: 150,
            width: "100%",
            display: "flex",
            opacity,
            transform: `translateY(${slideIn}px)`,
          }}
        >
          {/* Left side - Graph */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingLeft: 60,
            }}
          >
            <h2
              style={{
                fontSize: 42,
                fontWeight: "bold",
                color: fnConfig.color,
                margin: 0,
                marginBottom: 20,
                fontFamily: "system-ui",
              }}
            >
              {fnConfig.name}
            </h2>

            <Graph
              points={fnConfig.generatePoints()}
              width={550}
              height={350}
              color={fnConfig.color}
              xLabel="Error (y - ŷ)"
              yLabel="Loss"
              delay={0}
            />
          </div>

          {/* Right side - Info */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingRight: 80,
              gap: 30,
            }}
          >
            {/* Formula */}
            <div
              style={{
                background: "rgba(30, 41, 59, 0.9)",
                padding: "20px 28px",
                borderRadius: 12,
                border: `2px solid ${fnConfig.color}`,
              }}
            >
              <code
                style={{
                  fontSize: 24,
                  color: "#E2E8F0",
                  fontFamily: "'Courier New', monospace",
                }}
              >
                {fnConfig.formula}
              </code>
            </div>

            {/* Description */}
            <div>
              <h4
                style={{
                  fontSize: 18,
                  color: "#64748B",
                  margin: 0,
                  marginBottom: 8,
                  fontFamily: "system-ui",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Key Property
              </h4>
              <p
                style={{
                  fontSize: 20,
                  color: "#E2E8F0",
                  margin: 0,
                  lineHeight: 1.5,
                  fontFamily: "system-ui",
                }}
              >
                {fnConfig.description}
              </p>
            </div>

            {/* Use case */}
            <div
              style={{
                background: `${fnConfig.color}20`,
                padding: "16px 20px",
                borderRadius: 10,
                borderLeft: `4px solid ${fnConfig.color}`,
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  color: "#64748B",
                  fontFamily: "system-ui",
                }}
              >
                Best for:{" "}
              </span>
              <span
                style={{
                  fontSize: 18,
                  color: fnConfig.color,
                  fontWeight: 600,
                  fontFamily: "system-ui",
                }}
              >
                {fnConfig.useCase}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Progress dots */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {functions.map((fn, i) => {
          const isActive = i === currentIndex;
          const color = lossFunctions[fn]?.color || "#3B82F6";

          return (
            <div
              key={fn}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: isActive ? 40 : 12,
                  height: 12,
                  borderRadius: 6,
                  background: isActive ? color : "#334155",
                  transition: "all 0.3s",
                }}
              />
              {isActive && (
                <span
                  style={{
                    fontSize: 14,
                    color: "#94A3B8",
                    fontFamily: "system-ui",
                  }}
                >
                  {lossFunctions[fn]?.name}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
