import { SkillConfig, SkillCategory, SkillSearchCriteria } from "./types";

class SkillsRegistry {
  private skills: Map<string, SkillConfig> = new Map();
  private categories: Map<SkillCategory, Set<string>> = new Map();

  register(skill: SkillConfig): void {
    if (this.skills.has(skill.id)) {
      console.warn(`Skill "${skill.id}" is already registered. Overwriting.`);
    }

    this.skills.set(skill.id, skill);

    if (!this.categories.has(skill.category)) {
      this.categories.set(skill.category, new Set());
    }
    this.categories.get(skill.category)!.add(skill.id);

    console.log(`Registered skill: ${skill.name} (${skill.id})`);
  }

  unregister(skillId: string): boolean {
    const skill = this.skills.get(skillId);
    if (!skill) return false;

    this.skills.delete(skillId);
    this.categories.get(skill.category)?.delete(skillId);

    return true;
  }

  get(skillId: string): SkillConfig | undefined {
    return this.skills.get(skillId);
  }

  getAll(): SkillConfig[] {
    return Array.from(this.skills.values());
  }

  getByCategory(category: SkillCategory): SkillConfig[] {
    const skillIds = this.categories.get(category);
    if (!skillIds) return [];

    return Array.from(skillIds)
      .map((id) => this.skills.get(id)!)
      .filter(Boolean);
  }

  search(criteria: SkillSearchCriteria): SkillConfig[] {
    let results = this.getAll();

    if (criteria.category) {
      results = results.filter((s) => s.category === criteria.category);
    }

    if (criteria.tags && criteria.tags.length > 0) {
      results = results.filter((s) =>
        criteria.tags!.some((tag) => s.tags.includes(tag))
      );
    }

    if (criteria.query) {
      const query = criteria.query.toLowerCase();
      results = results.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.description.toLowerCase().includes(query) ||
          s.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    return results;
  }

  getCategories(): SkillCategory[] {
    return Array.from(this.categories.keys());
  }

  getStats(): {
    total: number;
    byCategory: Record<string, number>;
  } {
    const byCategory: Record<string, number> = {};
    this.categories.forEach((skills, category) => {
      byCategory[category] = skills.size;
    });

    return {
      total: this.skills.size,
      byCategory,
    };
  }

  exportManifest(): string {
    return JSON.stringify(
      {
        version: "1.0.0",
        skills: this.getAll(),
        lastUpdated: new Date().toISOString(),
      },
      null,
      2
    );
  }
}

export const skillsRegistry = new SkillsRegistry();

// Auto-register dev skills when in development mode
export function registerDevSkills(): void {
  // This will be populated by the skills CLI
  console.log("Dev skills registration ready");
}
