import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Home, ShoppingBag, Grid, Lock, CheckCircle, Zap, TrendingUp, Share2, AlertCircle, Save } from 'lucide-react';
import { LEVELS, MAX_LEVEL, STOCK_REFRESH_TIME_MS, CLICK_REWARD_BASE, CLICK_REWARD_EXPONENT, ACHIEVEMENTS, UPGRADES, HELPERS, FEVER_DURATION_MS, FEVER_GAUGE_CHARGE_PER_CLICK, FEVER_MULTIPLIER } from './constants';
import { PlayerState, Tab, FloatingText, Upgrade, Helper } from './types';
import DessertVisual from './components/DessertVisual';
import Tutorial from './components/Tutorial';
import { useSaveGame } from './hooks/useSaveGame';
import { useSound } from './hooks/useSound';
import { Trophy, ArrowUpCircle, Users } from 'lucide-react';

// Utility for formatting numbers
const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
};

export default function App() {
  // Save System
  const { saveData, isLoaded, lastSaveTime, save, AUTO_SAVE_INTERVAL } = useSaveGame();
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);

  // Sound System
  const { playClick, playSuccess, playFail, playCoin, vibrateLight, vibrateSuccess, vibrateFail } = useSound();

  // Game State
  const [activeTab, setActiveTab] = useState<Tab>('GAME');
  const [state, setState] = useState<PlayerState>({
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
    tutorialCompleted: false,
    upgrades: {},
    helpers: {},
    feverGauge: 0,
    prestigeTickets: 0,
    mastery: {},
  });


  const [isFeverMode, setIsFeverMode] = useState(false);


  // Derived Stats
  const getUpgradeLevel = (id: string) => state.upgrades[id] || 0;
  const getHelperCount = (id: string) => state.helpers[id] || 0;

  const totalCPS = HELPERS.reduce((total, helper) => {
    return total + (helper.baseCPS * getHelperCount(helper.id));
  }, 0);

  const prestigeMultiplier = 1 + (state.prestigeTickets * 0.2); // 20% bonus per ticket

  const totalMasteryBonus = (Object.values(state.mastery) as number[]).reduce((a: number, b: number) => a + b, 0) * 0.01; // 1% per star

  const clickMultiplier = 1 + (getUpgradeLevel('CLICK_POWER') * 0.5) + totalMasteryBonus;
  const successChanceBonus = getUpgradeLevel('CHANCE_BOOST') * 0.01;
  const maxStockBonus = getUpgradeLevel('STOCK_CAPACITY') * 50;
  const stockSpeedReduction = getUpgradeLevel('STOCK_SPEED') * 5000; // 5 seconds per level

  // Global "Stock" Logic (FOMO)
  const currentMaxStock = 50 + maxStockBonus;
  const [globalStock, setGlobalStock] = useState<number>(currentMaxStock);
  const [nextRestock, setNextRestock] = useState<number>(Date.now() + (STOCK_REFRESH_TIME_MS - stockSpeedReduction));

  // Loading state tracking
  const hasLoadedRef = useRef(false);

  // Visual Feedback State
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [isShaking, setIsShaking] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [lastActionTime, setLastActionTime] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [activeAchievement, setActiveAchievement] = useState<any>(null);

  // Refs for animation loops
  const textIdCounter = useRef(0);

  // Save on important actions (level up, etc.)
  const saveNow = useCallback(() => {
    save(state);
    setShowSaveIndicator(true);
    setTimeout(() => setShowSaveIndicator(false), 1500);
  }, [save, state]);

  // --- Load saved game ---
  useEffect(() => {
    if (isLoaded && saveData && !hasLoadedRef.current) {
      setState({
        currentLevel: saveData.currentLevel || 1,
        money: saveData.money || 0,
        unlockedLevels: saveData.unlockedLevels || [1],
        inventory: saveData.inventory || { chocolate: 0, pistachio: 0, goldLeaf: 0 },
        stats: saveData.stats || {
          totalClicks: 0,
          totalMoneyEarned: 0,
          failedUpgrades: 0,
        },
        achievements: saveData.achievements || [],
        tutorialCompleted: saveData.tutorialCompleted || false,
        upgrades: saveData.upgrades || {},
        helpers: saveData.helpers || {},
        feverGauge: saveData.feverGauge || 0,
        prestigeTickets: saveData.prestigeTickets || 0,
        mastery: saveData.mastery || {},
      });



      // Show tutorial if not completed
      if (!saveData.tutorialCompleted) {
        setShowTutorial(true);
      }
      hasLoadedRef.current = true;
    }
  }, [isLoaded, saveData]);

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    setState(prev => ({ ...prev, tutorialCompleted: true }));
    // Immediate save
    setTimeout(() => saveNow(), 100);
  };

  // --- Achievements Logic ---
  useEffect(() => {
    if (!isLoaded || !hasLoadedRef.current) return;

    const newlyUnlockedIds: string[] = [];
    let lastAchievement: any = null;

    ACHIEVEMENTS.forEach(achievement => {
      if (!state.achievements.includes(achievement.id)) {
        if (achievement.requirement(
          state.stats,
          state.currentLevel,
          state.prestigeTickets,
          state.mastery,
          globalStock,
          isFeverMode
        )) {
          newlyUnlockedIds.push(achievement.id);
          lastAchievement = achievement;
        }
      }
    });

    if (newlyUnlockedIds.length > 0) {
      setState(prev => ({
        ...prev,
        achievements: [...prev.achievements, ...newlyUnlockedIds]
      }));

      if (lastAchievement) {
        setActiveAchievement(lastAchievement);
        playSuccess(); // Play sound ONCE per batch
        setTimeout(() => setActiveAchievement(null), 4000);
      }

      // Auto save on achievement
      setTimeout(() => saveNow(), 500);
    }
  }, [
    state.stats,
    state.currentLevel,
    state.prestigeTickets,
    state.mastery,
    globalStock,
    isFeverMode,
    state.achievements,
    isLoaded,
    playSuccess,
    saveNow
  ]);

  // --- Auto Save ---
  useEffect(() => {
    if (!isLoaded) return;

    const saveTimer = setInterval(() => {
      save(state);
      setShowSaveIndicator(true);
      setTimeout(() => setShowSaveIndicator(false), 1500);
    }, AUTO_SAVE_INTERVAL);

    return () => clearInterval(saveTimer);
  }, [isLoaded, state, save, AUTO_SAVE_INTERVAL]);

  // Fever Mode Effect
  useEffect(() => {
    if (isFeverMode) {
      const timer = setTimeout(() => {
        setIsFeverMode(false);
      }, FEVER_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [isFeverMode]);


  // --- Game Loop / Effects ---

  // CPS Income Engine
  useEffect(() => {
    if (totalCPS <= 0) return;

    const interval = 1000;
    const timer = setInterval(() => {
      // Calculate reward for 1 tap at current level (matched with manual tap logic)
      const feverMult = isFeverMode ? FEVER_MULTIPLIER : 1;
      const levelMult = Math.pow(CLICK_REWARD_EXPONENT, state.currentLevel - 1);
      const incomePerTap = Math.ceil(CLICK_REWARD_BASE * levelMult * clickMultiplier * prestigeMultiplier * feverMult);

      const totalIncome = totalCPS * incomePerTap;

      setState(prev => ({
        ...prev,
        money: prev.money + totalIncome,
        stats: {
          ...prev.stats,
          totalMoneyEarned: prev.stats.totalMoneyEarned + totalIncome
        }
      }));
    }, interval);

    return () => clearInterval(timer);
  }, [totalCPS, state.currentLevel, prestigeMultiplier, clickMultiplier, isFeverMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      if (now >= nextRestock) {
        setGlobalStock(Math.floor(Math.random() * 50) + (currentMaxStock - 50 + 10));
        setNextRestock(now + (STOCK_REFRESH_TIME_MS - stockSpeedReduction));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [nextRestock, currentMaxStock, stockSpeedReduction]);

  // --- Handlers ---

  const handleTapDessert = (e: React.MouseEvent) => {
    const feverMult = isFeverMode ? FEVER_MULTIPLIER : 1;
    // Generate Income
    const income = Math.ceil(CLICK_REWARD_BASE * (Math.pow(CLICK_REWARD_EXPONENT, state.currentLevel - 1)) * clickMultiplier * feverMult * prestigeMultiplier);

    setState(prev => {
      let newFeverGauge = prev.feverGauge;
      let triggerFever = false;

      if (!isFeverMode) {
        newFeverGauge += FEVER_GAUGE_CHARGE_PER_CLICK;
        if (newFeverGauge >= 100) {
          newFeverGauge = 0;
          triggerFever = true;
        }
      }

      const newState = {
        ...prev,
        money: prev.money + income,
        feverGauge: newFeverGauge,
        stats: {
          ...prev.stats,
          totalClicks: prev.stats.totalClicks + 1,
          totalMoneyEarned: prev.stats.totalMoneyEarned + income
        }
      };

      if (triggerFever) {
        setIsFeverMode(true);
      }

      return newState;
    });

    // Sound effect
    if (isFeverMode) {
      playSuccess(); // Extra feedback
    } else {
      playCoin();
    }
    vibrateLight();

    // Floating Text
    const newText: FloatingText = {
      id: textIdCounter.current++,
      x: e.clientX,
      y: e.clientY,
      text: `+${income}`,
      color: isFeverMode ? 'text-amber-300 scale-125 font-black' : 'text-yellow-400 font-bold'
    };
    setFloatingTexts(prev => [...prev, newText]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== newText.id));
    }, 1000);
  };

  const attemptUpgrade = () => {
    const nextLevelIdx = state.currentLevel; // Index in array matches level since array is 0-indexed but level starts at 1, so nextLevelData is at index `currentLevel`
    if (nextLevelIdx >= MAX_LEVEL) return;

    const nextLevelData = LEVELS[nextLevelIdx];
    const cost = nextLevelData.baseCost;

    if (state.money < cost) {
      // Not enough money animation?
      return;
    }

    if (globalStock <= 0) {
      alert("품절되었습니다! 재입고를 기다려주세요.");
      return;
    }

    // Deduct cost and stock
    setGlobalStock(prev => Math.max(0, prev - 1));
    setState(prev => ({ ...prev, money: prev.money - cost }));

    // Calculate Success
    const roll = Math.random();
    const finalSuccessRate = Math.min(0.95, nextLevelData.successRate + successChanceBonus);

    if (roll <= finalSuccessRate) {
      // Success
      setState(prev => ({
        ...prev,
        currentLevel: prev.currentLevel + 1,
        unlockedLevels: prev.unlockedLevels.includes(prev.currentLevel + 1)
          ? prev.unlockedLevels
          : [...prev.unlockedLevels, prev.currentLevel + 1]
      }));
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 2000);
      // Sound & Save after level up
      playSuccess();
      vibrateSuccess();
      setTimeout(() => saveNow(), 100);
    } else {
      // Fail
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      // Sound & Save after attempt
      playFail();
      vibrateFail();

      setState(prev => ({
        ...prev,
        stats: {
          ...prev.stats,
          failedUpgrades: prev.stats.failedUpgrades + 1
        }
      }));
      setTimeout(() => saveNow(), 100);
    }
  };

  const buyUpgrade = (upgrade: Upgrade) => {
    const currentLevel = getUpgradeLevel(upgrade.id);
    if (currentLevel >= upgrade.maxLevel) return;

    const cost = Math.floor(upgrade.baseCost * (upgrade.costMultiplier ** currentLevel));
    if (state.money < cost) return;

    setState(prev => ({
      ...prev,
      money: prev.money - cost,
      upgrades: {
        ...prev.upgrades,
        [upgrade.id]: currentLevel + 1
      }
    }));
    playSuccess();
    saveNow();
  };

  const buyHelper = (helper: Helper) => {
    const currentCount = getHelperCount(helper.id);
    const cost = Math.floor(helper.baseCost * (helper.costMultiplier ** currentCount));
    if (state.money < cost) return;

    setState(prev => ({
      ...prev,
      money: prev.money - cost,
      helpers: {
        ...prev.helpers,
        [helper.id]: currentCount + 1
      }
    }));
    playSuccess();
    saveNow();
  };

  const calculatePrestigeReward = () => {
    // 1 ticket per 500k total earned (sqrt scaling)
    const reward = Math.floor(Math.sqrt(state.stats.totalMoneyEarned / 500000));
    return Math.max(0, reward - state.prestigeTickets);
  };

  const handlePrestige = () => {
    const reward = calculatePrestigeReward();
    if (reward <= 0) {
      alert("아직 환생할 준비가 되지 않았습니다! (최소 500k 이상의 총 실적이 필요합니다)");
      return;
    }

    if (!confirm(`제국을 매각하고 전설의 티켓 ${reward}개를 받으시겠습니까?\n\n(돈, 레벨, 일반 업그레이드, 알바생이 초기화되지만, 전체 수익이 영구적으로 대폭 상승합니다!)`)) {
      return;
    }

    setState(prev => ({
      ...prev,
      money: 0,
      currentLevel: 1,
      unlockedLevels: [1],
      upgrades: {},
      helpers: {},
      feverGauge: 0,
      prestigeTickets: prev.prestigeTickets + reward,
    }));

    playSuccess();
    vibrateSuccess();
    setActiveTab('GAME');
    setTimeout(() => saveNow(), 400); // Wait for state to settle
  };

  const upgradeMastery = (level: number) => {
    const cost = (LEVELS.find(l => l.level === level)?.baseCost || 0) * 2;
    if (state.money < cost) return;

    setState(prev => ({
      ...prev,
      mastery: {
        ...prev.mastery,
        [level]: (prev.mastery[level] || 0) + 1
      },
      money: prev.money - cost
    }));

    playSuccess();
    vibrateLight();
    saveNow();
  };

  const debugForceLevelUp = () => {
    setState(prev => {
      if (prev.currentLevel >= MAX_LEVEL) return prev;
      const nextLvl = prev.currentLevel + 1;
      return {
        ...prev,
        currentLevel: nextLvl,
        unlockedLevels: prev.unlockedLevels.includes(nextLvl)
          ? prev.unlockedLevels
          : [...prev.unlockedLevels, nextLvl]
      };
    });
  };

  // --- Renders ---

  const currentLevelData = LEVELS.find(l => l.level === state.currentLevel)!;
  const nextLevelData = LEVELS[state.currentLevel] || null;

  const renderActionView = () => (
    <div className="flex flex-col items-center p-4 space-y-4">
      <div className="w-full flex justify-between items-center px-2">
        <div className="flex flex-col">
          <span className="text-gray-400 text-[10px] tracking-widest uppercase font-black opacity-60">진행도</span>
          <div className="flex items-center space-x-2">
            <div className="h-1.5 w-20 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${globalStock < 10 ? 'bg-red-500' : 'bg-pistachio-500'}`}
                style={{ width: `${(globalStock / (50 + maxStockBonus)) * 100}%` }}
              />
            </div>
            <span className={`text-[11px] font-bold ${globalStock < 10 ? 'text-red-400 animate-pulse' : 'text-pistachio-300'}`}>
              {globalStock > 0 ? `${globalStock}개` : '품절'}
            </span>
          </div>

          {/* Fever Gauge */}
          <div className="mt-2">
            <div className="h-1 w-20 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${isFeverMode ? 'bg-gradient-to-r from-orange-500 to-yellow-400 animate-pulse' : 'bg-amber-500'}`}
                style={{ width: `${isFeverMode ? 100 : state.feverGauge}%` }}
              />
            </div>
            <div className="flex justify-between mt-0.5">
              <span className={`text-[7px] font-black uppercase tracking-tighter ${isFeverMode ? 'text-amber-400 animate-pulse' : 'text-white/30'}`}>
                {isFeverMode ? 'FEVER TIME' : 'FEVER'}
              </span>
              {!isFeverMode && <span className="text-[7px] font-bold text-white/20">{state.feverGauge}%</span>}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="glass px-4 py-2 rounded-2xl flex items-center space-x-2 shadow-inner">
            <span className="text-yellow-400 font-serif text-sm">₵</span>
            <span className="font-mono font-bold text-lg tracking-tight">{formatNumber(state.money)}</span>
          </div>
          {totalCPS > 0 && (
            <span className="text-[9px] text-pistachio-400 font-black mt-0.5 tracking-tighter">
              +{formatNumber(totalCPS)}/s
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center relative py-2">
        <h2 className="text-xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 mb-4">
          {currentLevelData.name}
        </h2>

        <div className="scale-75 -my-8 relative">
          <DessertVisual
            levelData={currentLevelData}
            onClick={handleTapDessert}
            isShaking={isShaking}
          />
          {isFeverMode && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded-full animate-bounce shadow-lg shadow-amber-500/50">
              FEVER! x10
            </div>
          )}
        </div>

        {showLevelUp && (
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="text-4xl font-black text-white drop-shadow-[0_0_20px_rgba(255,215,0,0.9)] animate-pop">
              대성공!
            </div>
          </div>
        )}
      </div>

      <div className="w-full">
        {nextLevelData ? (
          <button
            onClick={attemptUpgrade}
            disabled={globalStock === 0 || state.money < nextLevelData.baseCost}
            className={`w-full group relative overflow-hidden rounded-xl p-3 transition-all duration-200 active:scale-95 shadow-lg
              ${globalStock === 0
                ? 'bg-gray-800 cursor-not-allowed opacity-70'
                : state.money < nextLevelData.baseCost
                  ? 'bg-gray-700/50 cursor-not-allowed border border-white/5'
                  : 'bg-gradient-to-r from-chocolate-600 to-chocolate-800 hover:from-chocolate-500 hover:to-chocolate-700 active:ring-2 active:ring-chocolate-400/50'
              }
            `}
          >
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex flex-col items-start text-left">
                <span className="text-[9px] uppercase tracking-widest text-white/40 font-black">
                  다음 단계 도약 ({Math.round((nextLevelData.successRate + successChanceBonus) * 100)}%)
                </span>
                <span className={`font-bold text-sm ${state.money < nextLevelData.baseCost ? 'text-red-400' : 'text-white'}`}>
                  {formatNumber(nextLevelData.baseCost)} 부스러기 필요
                </span>
              </div>
              <div className={`p-2 rounded-lg transition-colors ${state.money >= nextLevelData.baseCost && globalStock > 0 ? 'bg-pistachio-500 text-black shadow-lg shadow-pistachio-500/30' : 'bg-white/5 text-white/20'}`}>
                <ArrowUpCircle size={18} />
              </div>
            </div>
          </button>
        ) : (
          <div className="w-full bg-gold-500/10 border border-gold-500/30 p-2 rounded-xl text-center backdrop-blur-sm">
            <span className="text-gold-300 font-black text-xs uppercase tracking-widest">✨ 궁극의 마스터 도달 ✨</span>
          </div>
        )}
      </div>

      {floatingTexts.map(ft => (
        <div
          key={ft.id}
          className={`fixed pointer-events-none text-2xl font-black font-serif ${ft.color} float-up z-[100]`}
          style={{ left: ft.x, top: ft.y, textShadow: '0 4px 12px rgba(0,0,0,0.6)' }}
        >
          {ft.text}
        </div>
      ))}
    </div>
  );

  const [subTab, setSubTab] = useState<'RECIPE' | 'ACHIEVEMENT'>('RECIPE');

  const renderCollection = () => (
    <div className="p-6 pb-24 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-white">두쫀쿠 {subTab === 'RECIPE' ? '도감' : '업적'}</h2>
        <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
          <button
            onClick={() => setSubTab('RECIPE')}
            className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${subTab === 'RECIPE' ? 'bg-pistachio-500 text-black shadow-lg' : 'text-white/40'}`}
          >
            도감
          </button>
          <button
            onClick={() => setSubTab('ACHIEVEMENT')}
            className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${subTab === 'ACHIEVEMENT' ? 'bg-pistachio-500 text-black shadow-lg' : 'text-white/40'}`}
          >
            업적
          </button>
        </div>
      </div>

      {subTab === 'RECIPE' ? (
        <div className="space-y-4">
          {LEVELS.map((level) => {
            const isUnlocked = state.unlockedLevels.includes(level.level);
            return (
              <div
                key={level.level}
                className={`rounded-2xl p-4 flex items-center space-x-4 transition-all duration-300
                  ${isUnlocked
                    ? 'glass border-white/10 shadow-lg'
                    : 'bg-black/40 border border-white/5 opacity-50'
                  }`}
              >
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl
                   ${isUnlocked ? 'bg-white/5 shadow-inner' : 'bg-black/40'}`}>
                  {isUnlocked ? level.visualParams.particles : <Lock size={20} className="text-white/20" />}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-white text-sm">{level.name}</h4>
                      <p className="text-[10px] text-white/40 mt-0.5">{level.description}</p>
                    </div>
                    {isUnlocked ? (
                      <div className="flex space-x-0.5">
                        {[1, 2, 3].map(starIdx => (
                          <span key={starIdx} className={`text-xs ${starIdx <= (state.mastery[level.level] || 0) ? 'text-amber-400' : 'text-white/10'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="text-[10px] font-black text-white/20 uppercase tracking-tighter">Locked</div>
                    )}
                  </div>

                  {isUnlocked && (state.mastery[level.level] || 0) < 3 && (
                    <button
                      onClick={() => upgradeMastery(level.level)}
                      disabled={state.money < level.baseCost * 2}
                      className={`mt-2 px-3 py-1 rounded-lg text-[10px] font-black transition-all
                        ${state.money >= level.baseCost * 2 ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30 hover:bg-amber-500/30' : 'bg-white/5 text-white/10 cursor-not-allowed'}`}
                    >
                      마스터리 강화 (₵{formatNumber(level.baseCost * 2)})
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {ACHIEVEMENTS.map((achievement) => {
            const isUnlocked = state.achievements.includes(achievement.id);
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl border flex items-center space-x-4 transition-all
                  ${isUnlocked
                    ? 'bg-gradient-to-r from-gold-900/40 to-black/40 border-gold-500/30 ring-1 ring-gold-500/10'
                    : 'bg-black/20 border-white/5 opacity-40'
                  }`}
              >
                <div className={`text-3xl filter drop-shadow-md ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold text-sm ${isUnlocked ? 'text-gold-200' : 'text-white/40'}`}>
                    {achievement.name}
                  </h4>
                  <p className="text-[10px] text-white/40 mt-0.5">{achievement.description}</p>
                </div>
                {isUnlocked && <Trophy size={16} className="text-gold-500 animate-pulse" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderShopContent = () => (
    <div className="p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-serif font-bold text-white flex items-center space-x-2">
          <ShoppingBag size={18} className="text-pistachio-400" />
          <span>성장 상점</span>
        </h3>
        {state.prestigeTickets > 0 && (
          <div className="flex items-center space-x-2 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/30">
            <Trophy size={14} className="text-amber-500" />
            <span className="text-[10px] font-black text-amber-200">x{prestigeMultiplier.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Upgrades Section */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3 opacity-60">
          <ArrowUpCircle size={14} className="text-pistachio-400" />
          <h4 className="text-[10px] font-black uppercase tracking-widest text-white">상시 강화</h4>
        </div>
        <div className="space-y-2">
          {UPGRADES.map((upgrade) => {
            const level = getUpgradeLevel(upgrade.id);
            const cost = Math.floor(upgrade.baseCost * (upgrade.costMultiplier ** level));
            const canAfford = state.money >= cost;
            const isMax = level >= upgrade.maxLevel;

            return (
              <button
                key={upgrade.id}
                onClick={() => buyUpgrade(upgrade)}
                disabled={!canAfford || isMax}
                className={`w-full p-3 rounded-2xl flex items-center space-x-3 transition-all active:scale-[0.98]
                  ${canAfford && !isMax ? 'glass border-white/10 hover:bg-white/10' : 'bg-black/40 border-white/5 opacity-50 cursor-not-allowed'}`}
              >
                <div className="text-xl bg-white/5 p-2 rounded-lg">{upgrade.icon}</div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center">
                    <h5 className="font-bold text-xs text-white">{upgrade.name}</h5>
                    <span className="text-[9px] font-black text-pistachio-500">LV {level}</span>
                  </div>
                  <p className="text-[9px] text-white/40 mt-0.5">{upgrade.description}</p>
                  {!isMax ? (
                    <div className={`text-[10px] font-black mt-1 ${canAfford ? 'text-yellow-400' : 'text-red-400'}`}>
                      🪙 {formatNumber(cost)}
                    </div>
                  ) : (
                    <div className="text-[8px] font-black text-white/30 mt-1 uppercase">MAX</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Helpers Section */}
      <div>
        <div className="flex items-center space-x-2 mb-3 opacity-60">
          <Users size={14} className="text-pistachio-400" />
          <h4 className="text-[10px] font-black uppercase tracking-widest text-white">자동화 알바</h4>
        </div>
        <div className="space-y-2">
          {HELPERS.map((helper) => {
            const count = getHelperCount(helper.id);
            const cost = Math.floor(helper.baseCost * (helper.costMultiplier ** count));
            const canAfford = state.money >= cost;

            return (
              <button
                key={helper.id}
                onClick={() => buyHelper(helper)}
                disabled={!canAfford}
                className={`w-full p-3 rounded-2xl flex items-center space-x-3 transition-all active:scale-[0.98]
                  ${canAfford ? 'glass border-white/10 hover:bg-white/10' : 'bg-black/40 border-white/5 opacity-50 cursor-not-allowed'}`}
              >
                <div className="text-xl bg-white/5 p-2 rounded-lg">{helper.icon}</div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-center">
                    <h5 className="font-bold text-xs text-white">{helper.name}</h5>
                    <span className="text-[9px] font-black text-pistachio-500">보유 {count}</span>
                  </div>
                  <p className="text-[9px] text-white/40 mt-0.5">{helper.description}</p>
                  <div className={`text-[10px] font-black mt-1 ${canAfford ? 'text-yellow-400' : 'text-red-400'}`}>
                    🪙 {formatNumber(cost)}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Prestige Section */}
      <div className="mt-10 pt-6 border-t border-white/10">
        <div className="flex items-center space-x-2 mb-3 opacity-60">
          <Trophy size={14} className="text-amber-500" />
          <h4 className="text-[10px] font-black uppercase tracking-widest text-white">전설의 매각 (환생)</h4>
        </div>

        <div className="bg-gradient-to-br from-amber-500/5 to-transparent p-4 rounded-2xl border border-amber-500/20">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h5 className="text-sm font-bold text-amber-200">제국 매각하기</h5>
              <p className="text-[10px] text-white/40 mt-1 leading-relaxed">
                현재까지의 모든 성과를 정리하고 전설의 티켓을 얻습니다.<br />
                티켓 하나당 모든 수익이 <span className="text-amber-400 font-bold">20% 영구 상승</span>합니다.
              </p>
            </div>
            <div className="text-right">
              <span className="text-[8px] text-white/30 uppercase font-black">획득 가능</span>
              <div className="text-lg font-black text-amber-400">🎫 {calculatePrestigeReward()}</div>
            </div>
          </div>

          <button
            onClick={handlePrestige}
            disabled={calculatePrestigeReward() <= 0}
            className={`w-full py-3 rounded-xl font-black text-xs transition-all active:scale-[0.98]
              ${calculatePrestigeReward() > 0
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400'
                : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
          >
            전설의 티켓 받고 환생하기
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`w-full h-screen flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden transition-all duration-700
      ${isFeverMode ? 'bg-[#0f172a] fever-glow' : 'bg-[#0f172a]'}`}>

      {/* Fever Pulse Overlay */}
      {isFeverMode && (
        <div className="absolute inset-0 pointer-events-none animate-fever-pulse z-0 opacity-40" />
      )}
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-chocolate-900/50 to-transparent pointer-events-none"></div>

      {/* Tutorial Overlay */}
      {showTutorial && <Tutorial onComplete={handleTutorialComplete} />}

      {/* Achievement Popup */}
      {activeAchievement && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[110] w-[85%] max-w-xs bg-gradient-to-r from-gold-700 to-amber-600 rounded-2xl p-4 shadow-[0_10px_40px_rgba(255,193,7,0.4)] border-2 border-white/20 flex items-center space-x-4 animate-bounce">
          <div className="bg-white/20 p-2 rounded-xl text-2xl">
            {activeAchievement.icon}
          </div>
          <div className="flex-1">
            <div className="text-[10px] uppercase font-black text-white/60 tracking-tighter">업적 달성!</div>
            <div className="text-sm font-bold text-white">{activeAchievement.name}</div>
            <div className="text-[10px] text-white/80 line-clamp-1">{activeAchievement.description}</div>
          </div>
        </div>
      )}

      {/* Save Indicator */}
      {showSaveIndicator && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-2 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 animate-pulse">
          <Save size={14} className="text-pistachio-500" />
          <span className="text-xs text-white/80">저장됨</span>
        </div>
      )}

      {/* Loading Screen */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 bg-[#1a1a1a] flex flex-col items-center justify-center">
          <div className="text-4xl animate-bounce mb-4">🍫</div>
          <div className="text-white/60 text-sm">불러오는 중...</div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-hidden relative z-0">
        {activeTab === 'GAME' && (
          <div className="h-full flex flex-col overflow-hidden">
            {/* Top: Action Area */}
            <div className={`flex-none bg-[#111111] z-10 border-b border-white/5 shadow-2xl relative transition-all duration-500 ${isFeverMode ? 'shadow-[0_0_60px_rgba(245,158,11,0.3)] ring-1 ring-amber-500/30' : ''}`}>
              {renderActionView()}
            </div>
            {/* Bottom: Scrollable Shop */}
            <div className="flex-1 overflow-y-auto bg-black/60 custom-scrollbar pb-32">
              {renderShopContent()}
            </div>
          </div>
        )}
        {activeTab === 'COLLECTION' && renderCollection()}
      </div>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 w-52 h-14 glass rounded-2xl flex items-center justify-around z-50">
        <button
          onClick={() => setActiveTab('GAME')}
          className={`flex flex-col items-center justify-center w-12 h-10 rounded-xl transition-all ${activeTab === 'GAME' ? 'text-pistachio-400' : 'text-white/40 hover:text-white/70'}`}
        >
          <Zap size={20} fill={activeTab === 'GAME' ? "currentColor" : "none"} />
          <span className="text-[9px] mt-0.5 font-bold">플레이</span>
        </button>

        <div className="w-px h-6 bg-white/10"></div>

        <button
          onClick={() => setActiveTab('COLLECTION')}
          className={`flex flex-col items-center justify-center w-12 h-10 rounded-xl transition-all ${activeTab === 'COLLECTION' ? 'text-pistachio-400' : 'text-white/40 hover:text-white/70'}`}
        >
          <Grid size={20} />
          <span className="text-[9px] mt-0.5 font-bold">도감</span>
        </button>
      </nav>
    </div>
  );
}