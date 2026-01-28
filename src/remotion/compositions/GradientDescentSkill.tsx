import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  Sequence,
} from "remotion";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { MathFormula } from "../components/MathFormula";
import { Graph } from "../components/Graph";

interface GradientDescentSkillProps {
  learningRate: number;
  showMath: boolean;
}

export const GradientDescentSkill: React.FC<GradientDescentSkillProps> = ({
  learningRate,
  showMath,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Simulate gradient descent on a parabola f(x) = x^2
  const steps = 20;
  const startX = 4;
  const descentPath: Array<{ x: number; y: number }> = [];

  let currentX = startX;
  for (let i = 0; i <= steps; i++) {
    const y = currentX * currentX;
    descentPath.push({ x: currentX, y });
    const gradient = 2 * currentX;
    currentX = currentX - learningRate * gradient;
  }

  // Animation progress
  const descentProgress = interpolate(frame, [60, 300], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const currentStep = Math.floor(descentProgress * steps);
  const currentPos = descentPath[Math.min(currentStep, descentPath.length - 1)];

  // Generate the loss surface points
  const surfacePoints: Array<{ x: number; y: number }> = [];
  for (let x = -5; x <= 5; x += 0.2) {
    surfacePoints.push({ x, y: x * x });
  }

  // Ball position on the curve
  const ballOpacity = spring({
    frame: frame - 60,
    fps,
    from: 0,
    to: 1,
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
      }}
    >
      {/* Title */}
      <Sequence from={0} durationInFrames={90}>
        <div
          style={{
            position: "absolute",
            top: 60,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AnimatedTitle
            title="Gradient Descent"
            subtitle="Finding the Minimum"
            color="#10B981"
          />
        </div>
      </Sequence>

      {/* Loss Surface Visualization */}
      <div
        style={{
          position: "absolute",
          left: width / 2 - 300,
          top: 200,
        }}
      >
        <Graph
          points={surfacePoints}
          width={600}
          height={400}
          color="#3B82F6"
          xLabel="Parameter (θ)"
          yLabel="Loss (J)"
          delay={30}
        />

        {/* Animated ball rolling down */}
        {frame > 60 && (
          <svg
            width={600}
            height={400}
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            {/* Trail */}
            {descentPath.slice(0, currentStep + 1).map((point, i) => {
              const normalizedX = 40 + ((point.x + 5) / 10) * 520;
              const normalizedY = 360 - (point.y / 25) * 320;

              return (
                <circle
                  key={i}
                  cx={normalizedX}
                  cy={normalizedY}
                  r={4}
                  fill="#F59E0B"
                  opacity={0.3 + (i / currentStep) * 0.5}
                />
              );
            })}

            {/* Current position ball */}
            <circle
              cx={40 + ((currentPos.x + 5) / 10) * 520}
              cy={360 - (currentPos.y / 25) * 320}
              r={15}
              fill="#F59E0B"
              opacity={ballOpacity}
              style={{ filter: "drop-shadow(0 0 10px #F59E0B)" }}
            />
          </svg>
        )}
      </div>

      {/* Math formulas */}
      {showMath && (
        <>
          <Sequence from={90}>
            <MathFormula
              formula="θ = θ - α · ∇J(θ)"
              description="Update rule: subtract gradient scaled by learning rate"
              x={width - 500}
              y={220}
              delay={0}
            />
          </Sequence>

          <Sequence from={150}>
            <MathFormula
              formula={`α = ${learningRate}`}
              description="Learning rate controls step size"
              x={width - 500}
              y={340}
              delay={0}
              fontSize={28}
            />
          </Sequence>

          <Sequence from={200}>
            <div
              style={{
                position: "absolute",
                right: 60,
                bottom: 140,
                background: "rgba(16, 185, 129, 0.1)",
                border: "1px solid #10B981",
                borderRadius: 12,
                padding: "16px 24px",
                maxWidth: 350,
              }}
            >
              <p
                style={{
                  color: "#10B981",
                  fontSize: 18,
                  margin: 0,
                  fontFamily: "system-ui",
                }}
              >
                Step {currentStep + 1}: x = {currentPos.x.toFixed(3)}, Loss ={" "}
                {currentPos.y.toFixed(3)}
              </p>
            </div>
          </Sequence>
        </>
      )}

      {/* Explanation panel */}
      <Sequence from={120}>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 60,
            background: "rgba(30, 41, 59, 0.9)",
            padding: "20px 30px",
            borderRadius: 12,
            border: "1px solid #10B981",
            maxWidth: 450,
          }}
        >
          <h3
            style={{
              color: "#F1F5F9",
              fontSize: 22,
              margin: 0,
              marginBottom: 10,
              fontFamily: "system-ui",
            }}
          >
            How It Works
          </h3>
          <p
            style={{
              color: "#94A3B8",
              fontSize: 15,
              margin: 0,
              lineHeight: 1.5,
              fontFamily: "system-ui",
            }}
          >
            Gradient descent iteratively adjusts parameters by moving in the
            direction opposite to the gradient, gradually finding the minimum of
            the loss function.
          </p>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
