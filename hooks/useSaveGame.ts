import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'dujjonequ_save';
const AUTO_SAVE_INTERVAL = 5000; // 5초마다 자동 저장

export interface SaveData {
  currentLevel: number;
  money: number;
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
  achievements: string[];
  lastSaved: number;
  tutorialCompleted: boolean;
  upgrades: Record<string, number>;
  helpers: Record<string, number>;
}

const DEFAULT_SAVE: SaveData = {
  currentLevel: 1,
  money: 0,
  unlockedLevels: [1],
  inventory: { chocolate: 0, pistachio: 0, goldLeaf: 0 },
  stats: {
    totalClicks: 0,
    totalMoneyEarned: 0,
    failedUpgrades: 0,
  },
  achievements: [],
  lastSaved: Date.now(),
  tutorialCompleted: false,
  upgrades: {},
  helpers: {},
};

export function useSaveGame() {
  const [saveData, setSaveData] = useState<SaveData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState<number>(0);

  // 게임 로드
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as SaveData;
        // 데이터 유효성 검증
        if (validateSaveData(parsed)) {
          setSaveData(parsed);
          setLastSaveTime(parsed.lastSaved);
        } else {
          console.warn('Invalid save data, starting fresh');
          setSaveData(DEFAULT_SAVE);
        }
      } else {
        setSaveData(DEFAULT_SAVE);
      }
    } catch (error) {
      console.error('Failed to load save:', error);
      setSaveData(DEFAULT_SAVE);
    }
    setIsLoaded(true);
  }, []);

  // 저장 함수
  const save = useCallback((data: Omit<SaveData, 'lastSaved'>) => {
    const savePayload: SaveData = {
      ...data,
      lastSaved: Date.now(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savePayload));
      setSaveData(savePayload);
      setLastSaveTime(savePayload.lastSaved);
      return true;
    } catch (error) {
      console.error('Failed to save:', error);
      return false;
    }
  }, []);

  // 초기화 함수
  const resetSave = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSaveData(DEFAULT_SAVE);
    setLastSaveTime(0);
  }, []);

  return {
    saveData,
    isLoaded,
    lastSaveTime,
    save,
    resetSave,
    AUTO_SAVE_INTERVAL,
  };
}

// 저장 데이터 유효성 검증
function validateSaveData(data: unknown): data is SaveData {
  if (!data || typeof data !== 'object') return false;
  const d = data as Record<string, unknown>;

  return (
    typeof d.currentLevel === 'number' &&
    typeof d.money === 'number' &&
    Array.isArray(d.unlockedLevels) &&
    d.inventory !== null &&
    typeof d.inventory === 'object' &&
    d.stats !== null &&
    typeof d.stats === 'object' &&
    Array.isArray(d.achievements) &&
    typeof d.tutorialCompleted === 'boolean' &&
    d.upgrades !== null && typeof d.upgrades === 'object' &&
    d.helpers !== null && typeof d.helpers === 'object'
  );
}
