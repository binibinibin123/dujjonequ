import React, { useState, useEffect, useRef } from 'react';
import { Home, ShoppingBag, Grid, Lock, CheckCircle, Zap, TrendingUp, Share2, AlertCircle } from 'lucide-react';
import { LEVELS, MAX_LEVEL, STOCK_REFRESH_TIME_MS, CLICK_REWARD_BASE } from './constants';
import { PlayerState, Tab, FloatingText } from './types';
import DessertVisual from './components/DessertVisual';

// Utility for formatting numbers
const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
};

export default function App() {
  // Game State
  const [activeTab, setActiveTab] = useState<Tab>('GAME');
  const [state, setState] = useState<PlayerState>({
    currentLevel: 1,
    money: 0,
    unlockedLevels: [1],
    inventory: { chocolate: 0, pistachio: 0, goldLeaf: 0 },
  });

  // Global "Stock" Logic (FOMO)
  const [globalStock, setGlobalStock] = useState<number>(50);
  const [nextRestock, setNextRestock] = useState<number>(Date.now() + STOCK_REFRESH_TIME_MS);
  
  // Visual Feedback State
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [isShaking, setIsShaking] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [lastActionTime, setLastActionTime] = useState(0);

  // Refs for animation loops
  const textIdCounter = useRef(0);

  // --- Game Loop / Effects ---
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      if (now >= nextRestock) {
        setGlobalStock(Math.floor(Math.random() * 50) + 10); // Random restock 10-60
        setNextRestock(now + STOCK_REFRESH_TIME_MS);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [nextRestock]);

  // --- Handlers ---

  const handleTapDessert = (e: React.MouseEvent) => {
    // Generate Income
    const levelData = LEVELS.find(l => l.level === state.currentLevel)!;
    const income = Math.ceil(CLICK_REWARD_BASE * (1.5 ** (state.currentLevel - 1)));
    
    setState(prev => ({
      ...prev,
      money: prev.money + income
    }));

    // Floating Text
    const newText: FloatingText = {
      id: textIdCounter.current++,
      x: e.clientX,
      y: e.clientY,
      text: `+${income}`,
      color: 'text-yellow-400'
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
    if (roll <= nextLevelData.successRate) {
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
    } else {
      // Fail
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
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

  const renderGame = () => (
    <div className="flex flex-col items-center justify-between h-full pt-4 pb-24 relative">
      
      {/* Top HUD */}
      <div className="w-full px-6 flex justify-between items-center z-10">
        <div className="flex flex-col">
          <span className="text-gray-400 text-xs tracking-widest uppercase font-bold">품절 주의</span>
          <div className="flex items-center space-x-2">
             <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
               <div 
                  className={`h-full transition-all duration-500 ${globalStock < 10 ? 'bg-red-500' : 'bg-pistachio-500'}`} 
                  style={{ width: `${(globalStock / 60) * 100}%` }}
                />
             </div>
             <span className={`text-sm font-bold ${globalStock < 10 ? 'text-red-400 animate-pulse' : 'text-pistachio-300'}`}>
               {globalStock > 0 ? `${globalStock}개 남음` : '품절'}
             </span>
          </div>
        </div>
        
        {/* Money Display */}
        <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center space-x-2">
          <span className="text-yellow-400 font-serif">₵</span>
          <span className="font-mono font-bold text-lg">{formatNumber(state.money)}</span>
        </div>
      </div>

      {/* DEBUG BUTTON */}
      <button 
        onClick={debugForceLevelUp}
        className="absolute top-20 right-6 z-50 bg-red-500/80 hover:bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border border-white/20 active:scale-95 transition-all"
      >
        🐞 TEST: LEVEL UP
      </button>

      {/* Main Dessert */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 drop-shadow-sm">
            {currentLevelData.name}
          </h2>
          <p className="text-white/60 text-sm mt-1 max-w-[200px]">{currentLevelData.description}</p>
        </div>
        
        <DessertVisual 
          levelData={currentLevelData} 
          onClick={handleTapDessert}
          isShaking={isShaking}
        />

        {/* Level Up Overlay */}
        {showLevelUp && (
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="text-4xl font-black text-white drop-shadow-[0_0_15px_rgba(255,215,0,0.8)] animate-pop">
              대성공!
            </div>
          </div>
        )}
      </div>

      {/* Action Area */}
      <div className="w-full px-6 z-10">
        {nextLevelData ? (
          <button
            onClick={attemptUpgrade}
            disabled={globalStock === 0 || state.money < nextLevelData.baseCost}
            className={`w-full group relative overflow-hidden rounded-xl p-4 transition-all duration-200 active:scale-95
              ${globalStock === 0 
                ? 'bg-gray-800 cursor-not-allowed opacity-70' 
                : state.money < nextLevelData.baseCost
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-chocolate-600 to-chocolate-800 shadow-[0_0_20px_rgba(139,90,43,0.3)] hover:shadow-[0_0_30px_rgba(139,90,43,0.5)]'
              }
            `}
          >
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex flex-col items-start">
                <span className="text-xs uppercase tracking-widest text-white/50 font-bold mb-1">
                  다음: {nextLevelData.name}
                </span>
                <div className="flex items-center space-x-2">
                  <span className={`font-bold text-xl ${state.money < nextLevelData.baseCost ? 'text-red-400' : 'text-white'}`}>
                    {formatNumber(nextLevelData.baseCost)} 부스러기
                  </span>
                  <span className="text-xs bg-black/30 px-2 py-0.5 rounded text-white/70">
                    성공 확률 {Math.round(nextLevelData.successRate * 100)}%
                  </span>
                </div>
              </div>
              
              <div className={`p-3 rounded-full ${state.money >= nextLevelData.baseCost && globalStock > 0 ? 'bg-pistachio-500 text-black' : 'bg-white/10 text-white/30'}`}>
                {globalStock === 0 ? <Lock size={24} /> : <TrendingUp size={24} />}
              </div>
            </div>
            
            {/* Progress Bar Background for Upgrade */}
            {state.money >= nextLevelData.baseCost && globalStock > 0 && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse-slow"></div>
            )}
          </button>
        ) : (
          <div className="w-full bg-gold-500/20 border border-gold-500/50 p-4 rounded-xl text-center">
            <h3 className="text-gold-300 font-bold text-xl mb-1">최종 단계 도달</h3>
            <p className="text-sm text-gold-200/70">궁극의 디저트를 완성했습니다.</p>
          </div>
        )}

        <div className="mt-4 text-center text-xs text-white/30">
          디저트를 눌러 부스러기 획득 • 품절되기 전에 강화하세요
        </div>
      </div>

      {/* Floating Texts Layer */}
      {floatingTexts.map(ft => (
        <div
          key={ft.id}
          className={`fixed pointer-events-none text-2xl font-bold font-serif ${ft.color} animate-float`}
          style={{ 
            left: ft.x, 
            top: ft.y, 
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          {ft.text}
        </div>
      ))}
    </div>
  );

  const renderCollection = () => (
    <div className="p-6 pb-24 h-full overflow-y-auto">
      <h2 className="text-2xl font-serif font-bold mb-6 text-white">두쫀쿠 도감</h2>
      <div className="grid grid-cols-2 gap-4">
        {LEVELS.map((level) => {
          const isUnlocked = state.unlockedLevels.includes(level.level);
          return (
            <div 
              key={level.level}
              className={`aspect-[3/4] rounded-xl p-4 flex flex-col items-center justify-between border 
                ${isUnlocked 
                  ? 'bg-gradient-to-b from-white/5 to-white/10 border-white/10' 
                  : 'bg-black/20 border-white/5 opacity-50'
                }`}
            >
              <div className="w-full flex justify-between items-start">
                <span className={`text-xs font-bold px-2 py-1 rounded ${isUnlocked ? 'bg-pistachio-500/20 text-pistachio-300' : 'bg-white/5'}`}>
                  LVL {level.level}
                </span>
                {isUnlocked && <CheckCircle size={14} className="text-pistachio-500" />}
              </div>
              
              <div className="flex-1 flex items-center justify-center py-4">
                {isUnlocked ? (
                  <div className={`text-4xl filter drop-shadow-lg`}>
                    {level.visualParams.particles}
                  </div>
                ) : (
                  <Lock size={32} className="text-white/20" />
                )}
              </div>

              <div className="text-center w-full">
                <div className="text-sm font-bold truncate text-white/90">{isUnlocked ? level.name : '???'}</div>
                {isUnlocked && <div className="text-[10px] text-white/50 mt-1 line-clamp-2">{level.description}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderShop = () => (
    <div className="p-6 pb-24 h-full flex flex-col items-center justify-center text-center space-y-6">
      <div className="bg-white/5 p-8 rounded-full">
        <ShoppingBag size={48} className="text-white/30" />
      </div>
      <div>
        <h2 className="text-2xl font-serif font-bold text-white mb-2">재료 상점</h2>
        <p className="text-white/50 max-w-xs mx-auto">
          글로벌 물류 대란으로 피스타치오 구하기가 하늘의 별따기입니다.
        </p>
      </div>
      
      <div className="w-full bg-gradient-to-r from-red-900/50 to-red-600/20 border border-red-500/30 p-4 rounded-xl flex items-start space-x-3">
        <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={20} />
        <div className="text-left">
          <h4 className="font-bold text-red-200">품절 임박</h4>
          <p className="text-xs text-red-200/70 mt-1">
            "손님, 두바이 초콜릿 다 나갔어요." - 편의점 알바생
            <br/>재입고까지: {Math.ceil((nextRestock - Date.now()) / 1000)}초
          </p>
        </div>
      </div>

      <button className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-white/50 font-bold text-sm uppercase tracking-wider hover:bg-white/10 transition-colors">
        재입고 알림 받기 (준비중)
      </button>
    </div>
  );

  return (
    <div className="w-full h-screen bg-[#1a1a1a] flex flex-col max-w-md mx-auto relative shadow-2xl overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-chocolate-900/50 to-transparent pointer-events-none"></div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative z-0">
        {activeTab === 'GAME' && renderGame()}
        {activeTab === 'COLLECTION' && renderCollection()}
        {activeTab === 'SHOP' && renderShop()}
      </div>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-6 left-6 right-6 h-16 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-around z-20 shadow-2xl">
        <button 
          onClick={() => setActiveTab('SHOP')}
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${activeTab === 'SHOP' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}
        >
          <ShoppingBag size={20} />
          <span className="text-[9px] mt-1 font-bold tracking-wide">상점</span>
        </button>

        <button 
          onClick={() => setActiveTab('GAME')}
          className={`flex flex-col items-center justify-center w-14 h-14 -mt-6 rounded-full transition-all border-4 border-[#1a1a1a] ${activeTab === 'GAME' ? 'bg-pistachio-500 text-black shadow-[0_0_15px_rgba(156,204,101,0.5)]' : 'bg-gray-700 text-gray-400'}`}
        >
          <Zap size={24} fill={activeTab === 'GAME' ? "currentColor" : "none"} />
        </button>

        <button 
          onClick={() => setActiveTab('COLLECTION')}
          className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${activeTab === 'COLLECTION' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}
        >
          <Grid size={20} />
          <span className="text-[9px] mt-1 font-bold tracking-wide">도감</span>
        </button>
      </nav>
    </div>
  );
}