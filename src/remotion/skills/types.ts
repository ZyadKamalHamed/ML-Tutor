import { ComponentType } from "react";

export interface SkillConfig {
  id: string;
  name: string;
  description: string;
  category: SkillCategory;
  component: ComponentType<unknown>;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  defaultProps: Record<string, unknown>;
  tags: string[];
  prerequisites?: string[];
}

export type SkillCategory =
  | "neural-networks"
  | "optimization"
  | "math"
  | "data-processing"
  | "model-evaluation"
  | "deep-learning"
  | "reinforcement-learning"
  | "nlp"
  | "computer-vision";

export interface SkillManifest {
  version: string;
  skills: SkillConfig[];
  lastUpdated: string;
}

export interface RenderOptions {
  outputDir: string;
  format: "mp4" | "gif" | "webm";
  quality: "low" | "medium" | "high";
  scale: number;
}

export interface SkillSearchCriteria {
  category?: SkillCategory;
  tags?: string[];
  query?: string;
}
