import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  Sequence,
} from "remotion";
import { AnimatedTitle } from "../components/AnimatedTitle";

interface ConceptExplainerSkillProps {
  concept: string;
  style: "visual" | "text" | "mixed";
}

const concepts: Record<
  string,
  {
    title: string;
    subtitle: string;
    color: string;
    keyPoints: string[];
    analogy: string;
    icon: string;
  }
> = {
  "neural-networks": {
    title: "Neural Networks",
    subtitle: "Brain-Inspired Computing",
    color: "#3B82F6",
    keyPoints: [
      "Composed of interconnected neurons (nodes)",
      "Learn by adjusting connection weights",
      "Can approximate any continuous function",
      "Require training data to learn patterns",
    ],
    analogy:
      "Like a team where each member processes information and passes it on, learning from mistakes to improve.",
    icon: "🧠",
  },
  "gradient-descent": {
    title: "Gradient Descent",
    subtitle: "Finding the Optimal Path",
    color: "#10B981",
    keyPoints: [
      "Optimization algorithm for minimizing loss",
      "Follows the steepest descent direction",
      "Learning rate controls step size",
      "Can get stuck in local minima",
    ],
    analogy:
      "Like hiking down a mountain in fog - you feel which direction is steepest and step that way.",
    icon: "⛰️",
  },
  backpropagation: {
    title: "Backpropagation",
    subtitle: "Learning from Errors",
    color: "#EC4899",
    keyPoints: [
      "Calculates gradients efficiently using chain rule",
      "Propagates error signals backward through network",
      "Updates weights to reduce future errors",
      "Foundation of deep learning training",
    ],
    analogy:
      "Like tracing back through a recipe to find which step caused a dish to taste wrong.",
    icon: "🔄",
  },
  overfitting: {
    title: "Overfitting",
    subtitle: "When Models Memorize",
    color: "#F59E0B",
    keyPoints: [
      "Model learns noise instead of patterns",
      "High training accuracy, low test accuracy",
      "Prevented by regularization and dropout",
      "Need balance between complexity and generalization",
    ],
    analogy:
      "Like memorizing answers to a practice test instead of understanding the material.",
    icon: "📈",
  },
  regularization: {
    title: "Regularization",
    subtitle: "Preventing Overfitting",
    color: "#8B5CF6",
    keyPoints: [
      "Adds penalty for model complexity",
      "L1 promotes sparsity (feature selection)",
      "L2 prevents extreme weight values",
      "Dropout randomly disables neurons",
    ],
    analogy:
      "Like a teacher saying 'keep it simple' - penalizing unnecessarily complex explanations.",
    icon: "⚖️",
  },
};

export const ConceptExplainerSkill: React.FC<ConceptExplainerSkillProps> = ({
  concept,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const conceptData = concepts[concept] || concepts["neural-networks"];

  // Animation phases
  const titleDone = frame > 45;
  const showPoints = frame > 60;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
      }}
    >
      {/* Decorative background elements */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          background: `radial-gradient(circle, ${conceptData.color}20 0%, transparent 70%)`,
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 500,
          height: 500,
          background: `radial-gradient(circle, ${conceptData.color}15 0%, transparent 70%)`,
          borderRadius: "50%",
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          padding: "60px 80px",
        }}
      >
        {/* Header with icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontSize: 72,
              opacity: interpolate(frame, [0, 30], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            {conceptData.icon}
          </span>
          <div>
            <AnimatedTitle
              title={conceptData.title}
              subtitle={conceptData.subtitle}
              color={conceptData.color}
            />
          </div>
        </div>

        {/* Key points */}
        {showPoints && (
          <div
            style={{
              display: "flex",
              flex: 1,
              gap: 60,
              marginTop: 40,
            }}
          >
            {/* Left - Key points */}
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontSize: 24,
                  color: "#64748B",
                  margin: 0,
                  marginBottom: 24,
                  fontFamily: "system-ui",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                }}
              >
                Key Concepts
              </h3>
              {conceptData.keyPoints.map((point, i) => {
                const pointDelay = 60 + i * 15;
                const opacity = interpolate(frame - pointDelay, [0, 20], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                });
                const translateX = spring({
                  frame: frame - pointDelay,
                  fps,
                  from: -30,
                  to: 0,
                  config: { damping: 12 },
                });

                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 16,
                      marginBottom: 20,
                      opacity,
                      transform: `translateX(${translateX}px)`,
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: conceptData.color,
                        marginTop: 10,
                        flexShrink: 0,
                      }}
                    />
                    <p
                      style={{
                        fontSize: 22,
                        color: "#E2E8F0",
                        margin: 0,
                        lineHeight: 1.5,
                        fontFamily: "system-ui",
                      }}
                    >
                      {point}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Right - Analogy */}
            <div style={{ flex: 1 }}>
              <Sequence from={120}>
                <div
                  style={{
                    background: "rgba(30, 41, 59, 0.8)",
                    padding: "32px 36px",
                    borderRadius: 16,
                    border: `2px solid ${conceptData.color}40`,
                    opacity: interpolate(frame - 120, [0, 30], [0, 1], {
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  <h4
                    style={{
                      fontSize: 20,
                      color: conceptData.color,
                      margin: 0,
                      marginBottom: 16,
                      fontFamily: "system-ui",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span>💡</span>
                    Think of it like...
                  </h4>
                  <p
                    style={{
                      fontSize: 24,
                      color: "#CBD5E1",
                      margin: 0,
                      lineHeight: 1.6,
                      fontFamily: "system-ui",
                      fontStyle: "italic",
                    }}
                  >
                    "{conceptData.analogy}"
                  </p>
                </div>
              </Sequence>
            </div>
          </div>
        )}

        {/* Bottom branding */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "auto",
          }}
        >
          <span
            style={{
              fontSize: 16,
              color: "#475569",
              fontFamily: "system-ui",
            }}
          >
            ML Tutor • {conceptData.title}
          </span>
          <span
            style={{
              fontSize: 14,
              color: "#334155",
              fontFamily: "system-ui",
            }}
          >
            Powered by Remotion Skills
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
