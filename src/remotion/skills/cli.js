#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SKILLS_DIR = path.join(__dirname, "..", "compositions");
const REGISTRY_FILE = path.join(__dirname, "dev-skills.json");

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  title: (msg) =>
    console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
};

// Available dev skills
const DEV_SKILLS = {
  "remotion/dev/skills": {
    name: "ML Tutor Remotion Skills",
    description: "Video generation skills for ML concept explanations",
    skills: [
      {
        id: "NeuralNetwork",
        name: "Neural Network Visualization",
        category: "neural-networks",
        description: "Animated neural network architecture visualization",
      },
      {
        id: "GradientDescent",
        name: "Gradient Descent Animation",
        category: "optimization",
        description: "Visual explanation of gradient descent optimization",
      },
      {
        id: "Backpropagation",
        name: "Backpropagation Flow",
        category: "neural-networks",
        description: "Animated forward and backward pass visualization",
      },
      {
        id: "ActivationFunctions",
        name: "Activation Functions Gallery",
        category: "neural-networks",
        description: "Interactive showcase of activation functions",
      },
      {
        id: "LossFunctions",
        name: "Loss Functions Explorer",
        category: "optimization",
        description: "Visual comparison of loss functions",
      },
      {
        id: "ConceptExplainer",
        name: "Concept Explainer",
        category: "general",
        description: "Dynamic ML concept explanations with analogies",
      },
    ],
  },
};

function loadRegistry() {
  try {
    if (fs.existsSync(REGISTRY_FILE)) {
      return JSON.parse(fs.readFileSync(REGISTRY_FILE, "utf-8"));
    }
  } catch (e) {
    // Ignore errors
  }
  return { installed: [], version: "1.0.0" };
}

function saveRegistry(registry) {
  fs.writeFileSync(REGISTRY_FILE, JSON.stringify(registry, null, 2));
}

function listSkills() {
  log.title("📚 Available Skill Packages");

  Object.entries(DEV_SKILLS).forEach(([packageId, pkg]) => {
    console.log(
      `${colors.bright}${packageId}${colors.reset} - ${pkg.description}`
    );
    console.log(`  ${colors.cyan}Skills:${colors.reset}`);
    pkg.skills.forEach((skill) => {
      console.log(`    • ${skill.name} (${skill.id})`);
      console.log(`      ${colors.yellow}${skill.description}${colors.reset}`);
    });
    console.log();
  });

  const registry = loadRegistry();
  if (registry.installed.length > 0) {
    log.title("✅ Installed Packages");
    registry.installed.forEach((pkg) => {
      console.log(`  • ${pkg}`);
    });
  }
}

function addSkills(packageId) {
  const pkg = DEV_SKILLS[packageId];

  if (!pkg) {
    log.error(`Package "${packageId}" not found.`);
    console.log("\nAvailable packages:");
    Object.keys(DEV_SKILLS).forEach((id) => {
      console.log(`  • ${id}`);
    });
    process.exit(1);
  }

  log.title(`📦 Installing ${pkg.name}`);

  const registry = loadRegistry();

  if (registry.installed.includes(packageId)) {
    log.warn(`Package "${packageId}" is already installed.`);
    return;
  }

  // Simulate installation steps
  log.info("Checking dependencies...");
  log.info("Validating skill compositions...");

  pkg.skills.forEach((skill) => {
    const skillFile = path.join(SKILLS_DIR, `${skill.id}Skill.tsx`);
    if (fs.existsSync(skillFile)) {
      log.success(`Found ${skill.name}`);
    } else {
      log.warn(`Skill file for ${skill.name} not found at ${skillFile}`);
    }
  });

  // Update registry
  registry.installed.push(packageId);
  registry.lastUpdated = new Date().toISOString();
  saveRegistry(registry);

  log.success(`\nSuccessfully installed ${pkg.name}!`);
  console.log(`\n${colors.bright}Installed skills:${colors.reset}`);
  pkg.skills.forEach((skill) => {
    console.log(`  ${colors.green}✓${colors.reset} ${skill.name} (${skill.id})`);
  });

  console.log(`\n${colors.cyan}Quick Start:${colors.reset}`);
  console.log("  1. Run the Remotion studio:");
  console.log(`     ${colors.yellow}npm run remotion:dev${colors.reset}`);
  console.log("\n  2. Preview a skill:");
  console.log(`     ${colors.yellow}npm run remotion:preview -- --props='{"title":"My Video"}'${colors.reset}`);
  console.log("\n  3. Render a video:");
  console.log(`     ${colors.yellow}npm run remotion:build -- NeuralNetwork out/video.mp4${colors.reset}`);
}

function removeSkills(packageId) {
  const registry = loadRegistry();

  if (!registry.installed.includes(packageId)) {
    log.error(`Package "${packageId}" is not installed.`);
    return;
  }

  registry.installed = registry.installed.filter((p) => p !== packageId);
  saveRegistry(registry);

  log.success(`Removed package "${packageId}"`);
}

function showStatus() {
  const registry = loadRegistry();

  log.title("🎬 Remotion Skills Status");

  console.log(`${colors.bright}Registry Version:${colors.reset} ${registry.version}`);
  console.log(
    `${colors.bright}Last Updated:${colors.reset} ${registry.lastUpdated || "Never"}`
  );
  console.log();

  if (registry.installed.length === 0) {
    log.info("No skill packages installed.");
    console.log("\nRun 'npm run skills add remotion/dev/skills' to get started.");
  } else {
    console.log(`${colors.bright}Installed Packages:${colors.reset}`);
    registry.installed.forEach((pkgId) => {
      const pkg = DEV_SKILLS[pkgId];
      if (pkg) {
        console.log(`\n  ${colors.cyan}${pkgId}${colors.reset}`);
        console.log(`  ${pkg.description}`);
        console.log(`  Skills: ${pkg.skills.length}`);
      }
    });
  }

  // Check composition files
  console.log(`\n${colors.bright}Composition Files:${colors.reset}`);
  try {
    const files = fs.readdirSync(SKILLS_DIR).filter((f) => f.endsWith("Skill.tsx"));
    files.forEach((file) => {
      console.log(`  ${colors.green}✓${colors.reset} ${file}`);
    });
  } catch (e) {
    log.warn("Could not read compositions directory");
  }
}

function showHelp() {
  console.log(`
${colors.bright}${colors.cyan}ML Tutor Skills CLI${colors.reset}
Manage Remotion video generation skills for ML concept explanations.

${colors.bright}Usage:${colors.reset}
  npm run skills <command> [options]

${colors.bright}Commands:${colors.reset}
  ${colors.green}list${colors.reset}              List all available skill packages
  ${colors.green}add${colors.reset} <package>     Install a skill package
  ${colors.green}remove${colors.reset} <package>  Remove an installed skill package
  ${colors.green}status${colors.reset}            Show installation status
  ${colors.green}help${colors.reset}              Show this help message

${colors.bright}Examples:${colors.reset}
  npm run skills list
  npm run skills add remotion/dev/skills
  npm run skills status

${colors.bright}Available Packages:${colors.reset}
  ${colors.cyan}remotion/dev/skills${colors.reset}  - ML concept video generation skills
`);
}

// Main CLI handler
const args = process.argv.slice(2);
const command = args[0];
const argument = args[1];

switch (command) {
  case "list":
    listSkills();
    break;
  case "add":
    if (!argument) {
      log.error("Please specify a package to install.");
      console.log("Example: npm run skills add remotion/dev/skills");
      process.exit(1);
    }
    addSkills(argument);
    break;
  case "remove":
    if (!argument) {
      log.error("Please specify a package to remove.");
      process.exit(1);
    }
    removeSkills(argument);
    break;
  case "status":
    showStatus();
    break;
  case "help":
  case "--help":
  case "-h":
    showHelp();
    break;
  default:
    if (command) {
      log.error(`Unknown command: ${command}`);
    }
    showHelp();
    break;
}
