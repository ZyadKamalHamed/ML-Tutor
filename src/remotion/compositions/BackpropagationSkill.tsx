import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  Sequence,
} from "remotion";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { NeuronNode } from "../components/NeuronNode";
import { Connection } from "../components/Connection";
import { MathFormula } from "../components/MathFormula";

interface BackpropagationSkillProps {
  networkLayers: number[];
  highlightPath: boolean;
}

export const BackpropagationSkill: React.FC<BackpropagationSkillProps> = ({
  networkLayers,
  highlightPath,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Network layout
  const layerSpacing = (width - 400) / (networkLayers.length + 1);
  const startX = 200;

  const getNeuronPosition = (layerIndex: number, neuronIndex: number) => {
    const layerSize = networkLayers[layerIndex];
    const verticalSpacing = Math.min(120, (height - 300) / (layerSize + 1));
    const startY = (height - (layerSize - 1) * verticalSpacing) / 2;

    return {
      x: startX + layerSpacing * (layerIndex + 1),
      y: startY + neuronIndex * verticalSpacing,
    };
  };

  // Animation phases
  const forwardPhase = frame >= 60 && frame < 180;
  const backwardPhase = frame >= 200;
  const forwardProgress = interpolate(frame, [60, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const backwardProgress = interpolate(frame, [200, 360], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const forwardLayer = Math.floor(forwardProgress * networkLayers.length);
  const backwardLayer =
    networkLayers.length - 1 - Math.floor(backwardProgress * networkLayers.length);

  // Generate connections
  const connections: Array<{
    from: { layer: number; neuron: number };
    to: { layer: number; neuron: number };
  }> = [];

  for (let l = 0; l < networkLayers.length - 1; l++) {
    for (let i = 0; i < networkLayers[l]; i++) {
      for (let j = 0; j < networkLayers[l + 1]; j++) {
        connections.push({
          from: { layer: l, neuron: i },
          to: { layer: l + 1, neuron: j },
        });
      }
    }
  }

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
            top: 40,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AnimatedTitle
            title="Backpropagation"
            subtitle="How Neural Networks Learn"
            color="#EC4899"
          />
        </div>
      </Sequence>

      {/* Phase indicators */}
      <div
        style={{
          position: "absolute",
          top: 130,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}
      >
        <div
          style={{
            padding: "10px 24px",
            borderRadius: 20,
            background: forwardPhase ? "#3B82F6" : "rgba(59, 130, 246, 0.2)",
            color: forwardPhase ? "white" : "#64748B",
            fontFamily: "system-ui",
            fontSize: 16,
            fontWeight: 600,
            transition: "all 0.3s",
          }}
        >
          Forward Pass →
        </div>
        <div
          style={{
            padding: "10px 24px",
            borderRadius: 20,
            background: backwardPhase ? "#EC4899" : "rgba(236, 72, 153, 0.2)",
            color: backwardPhase ? "white" : "#64748B",
            fontFamily: "system-ui",
            fontSize: 16,
            fontWeight: 600,
            transition: "all 0.3s",
          }}
        >
          ← Backward Pass
        </div>
      </div>

      {/* Network visualization */}
      <svg width={width} height={height} style={{ position: "absolute" }}>
        {/* Connections */}
        {connections.map((conn, i) => {
          const fromPos = getNeuronPosition(conn.from.layer, conn.from.neuron);
          const toPos = getNeuronPosition(conn.to.layer, conn.to.neuron);

          const isForwardActive =
            forwardPhase && conn.from.layer < forwardLayer;
          const isBackwardActive =
            backwardPhase && conn.to.layer > backwardLayer;

          return (
            <Connection
              key={`conn-${i}`}
              x1={isBackwardActive ? toPos.x : fromPos.x}
              y1={isBackwardActive ? toPos.y : fromPos.y}
              x2={isBackwardActive ? fromPos.x : toPos.x}
              y2={isBackwardActive ? fromPos.y : toPos.y}
              delay={20 + i * 0.3}
              animated={isForwardActive || isBackwardActive}
              highlighted={isBackwardActive && highlightPath}
            />
          );
        })}

        {/* Neurons */}
        {networkLayers.map((layerSize, layerIndex) =>
          Array.from({ length: layerSize }).map((_, neuronIndex) => {
            const pos = getNeuronPosition(layerIndex, neuronIndex);

            const isForwardActivated = forwardPhase && layerIndex <= forwardLayer;
            const isBackwardActivated =
              backwardPhase && layerIndex >= backwardLayer;

            let color = "#3B82F6";
            if (isBackwardActivated) {
              color = "#EC4899";
            } else if (isForwardActivated) {
              color = "#10B981";
            }

            return (
              <NeuronNode
                key={`neuron-${layerIndex}-${neuronIndex}`}
                x={pos.x}
                y={pos.y}
                delay={layerIndex * 8 + neuronIndex * 3}
                activated={isForwardActivated || isBackwardActivated}
                color={color}
                radius={25}
              />
            );
          })
        )}

        {/* Layer labels */}
        {["Input", "Hidden", "Output"].map((label, i) => {
          const layerIndex =
            i === 0 ? 0 : i === 1 ? 1 : networkLayers.length - 1;
          const x = startX + layerSpacing * (layerIndex + 1);

          return (
            <text
              key={label}
              x={x}
              y={height - 60}
              textAnchor="middle"
              fill="#64748B"
              fontSize={16}
              fontFamily="system-ui"
            >
              {label}
            </text>
          );
        })}
      </svg>

      {/* Math formulas */}
      <Sequence from={220}>
        <MathFormula
          formula="∂L/∂w = ∂L/∂a · ∂a/∂z · ∂z/∂w"
          description="Chain rule: propagate gradients backward"
          x={60}
          y={height - 200}
          fontSize={28}
        />
      </Sequence>

      {/* Explanation */}
      <Sequence from={280}>
        <div
          style={{
            position: "absolute",
            right: 60,
            bottom: 100,
            background: "rgba(30, 41, 59, 0.95)",
            padding: "20px 28px",
            borderRadius: 12,
            border: "1px solid #EC4899",
            maxWidth: 380,
          }}
        >
          <h3
            style={{
              color: "#F1F5F9",
              fontSize: 20,
              margin: 0,
              marginBottom: 10,
              fontFamily: "system-ui",
            }}
          >
            Gradient Flow
          </h3>
          <p
            style={{
              color: "#94A3B8",
              fontSize: 14,
              margin: 0,
              lineHeight: 1.6,
              fontFamily: "system-ui",
            }}
          >
            Error gradients flow backward through the network, updating each
            weight based on its contribution to the final error. This is how
            neural networks learn!
          </p>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
