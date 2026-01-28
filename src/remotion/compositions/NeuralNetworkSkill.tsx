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

interface NeuralNetworkSkillProps {
  title: string;
  layers: number[];
}

export const NeuralNetworkSkill: React.FC<NeuralNetworkSkillProps> = ({
  title,
  layers,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Calculate neuron positions
  const layerSpacing = width / (layers.length + 1);
  const maxNeurons = Math.max(...layers);

  const getNeuronPosition = (layerIndex: number, neuronIndex: number) => {
    const layerSize = layers[layerIndex];
    const verticalSpacing = height / (maxNeurons + 2);
    const startY = (height - (layerSize - 1) * verticalSpacing) / 2;

    return {
      x: layerSpacing * (layerIndex + 1),
      y: startY + neuronIndex * verticalSpacing,
    };
  };

  // Generate connections
  const connections: Array<{
    from: { layer: number; neuron: number };
    to: { layer: number; neuron: number };
  }> = [];

  for (let l = 0; l < layers.length - 1; l++) {
    for (let i = 0; i < layers[l]; i++) {
      for (let j = 0; j < layers[l + 1]; j++) {
        connections.push({
          from: { layer: l, neuron: i },
          to: { layer: l + 1, neuron: j },
        });
      }
    }
  }

  // Animation phases
  const showConnections = frame > 60;
  const activateNeurons = frame > 150;
  const activatedLayer = Math.floor((frame - 150) / 30);

  // Layer labels
  const layerLabels = ["Input", ...layers.slice(1, -1).map((_, i) => `Hidden ${i + 1}`), "Output"];

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
          <AnimatedTitle title={title} subtitle="Understanding the Architecture" />
        </div>
      </Sequence>

      {/* Neural Network Visualization */}
      <svg width={width} height={height} style={{ position: "absolute" }}>
        {/* Connections */}
        {showConnections &&
          connections.map((conn, i) => {
            const fromPos = getNeuronPosition(conn.from.layer, conn.from.neuron);
            const toPos = getNeuronPosition(conn.to.layer, conn.to.neuron);
            const weight = Math.random() * 2 - 1; // Random weight for visualization

            return (
              <Connection
                key={`conn-${i}`}
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                weight={weight}
                delay={60 + i * 0.5}
                animated={activateNeurons && conn.from.layer === activatedLayer}
                highlighted={activateNeurons && conn.from.layer === activatedLayer}
              />
            );
          })}

        {/* Neurons */}
        {layers.map((layerSize, layerIndex) =>
          Array.from({ length: layerSize }).map((_, neuronIndex) => {
            const pos = getNeuronPosition(layerIndex, neuronIndex);
            const isActivated =
              activateNeurons && layerIndex <= activatedLayer;

            return (
              <NeuronNode
                key={`neuron-${layerIndex}-${neuronIndex}`}
                x={pos.x}
                y={pos.y}
                delay={layerIndex * 10 + neuronIndex * 5}
                activated={isActivated}
                color={
                  layerIndex === 0
                    ? "#8B5CF6"
                    : layerIndex === layers.length - 1
                    ? "#EC4899"
                    : "#3B82F6"
                }
              />
            );
          })
        )}

        {/* Layer labels */}
        {layers.map((_, layerIndex) => {
          const x = layerSpacing * (layerIndex + 1);
          const labelOpacity = interpolate(frame, [30, 60], [0, 1], {
            extrapolateRight: "clamp",
          });

          return (
            <text
              key={`label-${layerIndex}`}
              x={x}
              y={height - 40}
              textAnchor="middle"
              fill="#94A3B8"
              fontSize={18}
              fontFamily="system-ui"
              opacity={labelOpacity}
            >
              {layerLabels[layerIndex]}
            </text>
          );
        })}
      </svg>

      {/* Information Panel */}
      <Sequence from={180}>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 60,
            background: "rgba(30, 41, 59, 0.9)",
            padding: "20px 30px",
            borderRadius: 12,
            border: "1px solid #3B82F6",
            maxWidth: 400,
          }}
        >
          <h3
            style={{
              color: "#F1F5F9",
              fontSize: 24,
              margin: 0,
              marginBottom: 12,
              fontFamily: "system-ui",
            }}
          >
            Data Flow
          </h3>
          <p
            style={{
              color: "#94A3B8",
              fontSize: 16,
              margin: 0,
              lineHeight: 1.5,
              fontFamily: "system-ui",
            }}
          >
            Information flows from input neurons through hidden layers, with each
            connection weighted to transform the signal until it reaches the
            output.
          </p>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
