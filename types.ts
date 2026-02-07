export type RecipeStage = 'KATAIFI' | 'PISTACHIO' | 'MARSHMALLOW' | 'WRAPPING' | 'FINISHED';

export interface LevelData {
  level: number;
  name: string;
  description: string;
  baseCost: number;
  successRate: number; // 0.0 to 1.0
  visualParams: {
    stage: RecipeStage;
    color: string; // Base color (Tailwind class or hex)
    accentColor?: string; // Secondary color
    texture?: string; // Optional texture description
    particles?: string; // emoji
  };
}

export interface PlayerState {
  currentLevel: number;
  money: number; // "Crumbs"
  unlockedLevels: number[];
  inventory: {
    chocolate: number;
    pistachio: number;
    goldLeaf: number;
  };
  stats: {
    totalClicks: number;
    totalMoneyEarned: number;
    failedUpgrades: number;
  };
  achievements: string[]; // IDs of unlocked achievements
  tutorialCompleted: boolean;
  upgrades: Record<string, number>; // upgradeId -> level
  helpers: Record<string, number>; // helperId -> count
  feverGauge: number; // 0 to 100
  prestigeTickets: number; // For permanent multiplier
  mastery: Record<number, number>; // level -> star count
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  maxLevel: number;
  icon: string;
  type: 'CLICK_POWER' | 'CHANCE' | 'STOCK_MAX' | 'STOCK_SPEED';
}

export interface Helper {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  baseCPS: number; // Clicks Per Second contribution
  icon: string;
}

export type Tab = 'GAME' | 'COLLECTION';

export interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
}
