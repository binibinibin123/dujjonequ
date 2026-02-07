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
}

export type Tab = 'GAME' | 'SHOP' | 'COLLECTION';

export interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string;
}
