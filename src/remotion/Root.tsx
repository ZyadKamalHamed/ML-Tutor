import { Composition } from "remotion";
import { NeuralNetworkSkill } from "./compositions/NeuralNetworkSkill";
import { GradientDescentSkill } from "./compositions/GradientDescentSkill";
import { BackpropagationSkill } from "./compositions/BackpropagationSkill";
import { ActivationFunctionsSkill } from "./compositions/ActivationFunctionsSkill";
import { LossFunctionsSkill } from "./compositions/LossFunctionsSkill";
import { ConceptExplainerSkill } from "./compositions/ConceptExplainerSkill";
import { skillsRegistry } from "./skills/registry";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Core ML Concept Skills */}
      <Composition
        id="NeuralNetwork"
        component={NeuralNetworkSkill}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Neural Networks Explained",
          layers: [4, 6, 6, 2],
        }}
      />
      <Composition
        id="GradientDescent"
        component={GradientDescentSkill}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          learningRate: 0.1,
          showMath: true,
        }}
      />
      <Composition
        id="Backpropagation"
        component={BackpropagationSkill}
        durationInFrames={420}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          networkLayers: [3, 4, 2],
          highlightPath: true,
        }}
      />
      <Composition
        id="ActivationFunctions"
        component={ActivationFunctionsSkill}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          functions: ["sigmoid", "relu", "tanh", "softmax"],
        }}
      />
      <Composition
        id="LossFunctions"
        component={LossFunctionsSkill}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          functions: ["mse", "cross-entropy", "mae"],
        }}
      />

      {/* Dynamic Concept Explainer */}
      <Composition
        id="ConceptExplainer"
        component={ConceptExplainerSkill}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          concept: "neural-networks",
          style: "visual",
        }}
      />

      {/* Register all skills from registry */}
      {skillsRegistry.getAll().map((skill) => (
        <Composition
          key={skill.id}
          id={skill.id}
          component={skill.component}
          durationInFrames={skill.durationInFrames}
          fps={skill.fps}
          width={skill.width}
          height={skill.height}
          defaultProps={skill.defaultProps}
        />
      ))}
    </>
  );
};
