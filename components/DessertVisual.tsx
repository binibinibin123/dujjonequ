import React, { useState } from 'react';
import { LevelData } from '../types';

interface DessertVisualProps {
  levelData: LevelData;
  onClick: (e: React.MouseEvent) => void;
  isShaking: boolean;
}

const DessertVisual: React.FC<DessertVisualProps> = ({ levelData, onClick, isShaking }) => {
  const [clickScale, setClickScale] = useState(1);
  const [imageError, setImageError] = useState(false);
  const { stage, color, accentColor } = levelData.visualParams;

  const handlePointerDown = (e: React.MouseEvent) => {
    setClickScale(0.95);
    onClick(e);
  };

  const handlePointerUp = () => {
    setClickScale(1);
  };

  const containerBaseStyle: React.CSSProperties = {
    transform: `scale(${clickScale})`,
    transition: 'transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  };

  const renderContent = () => {
    // Priority 1: High-quality Pixel Art Image (Only if it exists and hasn't failed)
    if (levelData.visualParams.image && !imageError) {
      return (
        <div className="relative w-64 h-64 group">
          {/* Circular Mask Container for Square Images */}
          <div className="absolute inset-0 rounded-full overflow-hidden glass border-2 border-white/20 shadow-2xl transition-all duration-300 group-hover:scale-105 active:scale-95">
            <img
              src={levelData.visualParams.image}
              alt={levelData.name}
              className="w-full h-full object-cover scale-110"
              onError={() => setImageError(true)}
            />
          </div>

          {/* Subtle Glow behind the image */}
          <div className="absolute inset-0 rounded-full bg-white/5 blur-xl pointer-events-none -z-10" />
        </div>
      );
    }

    // Priority 2: CSS-based Visuals (Legacy/Fallback)
    return (
      <div className="">
        {(() => {
          switch (stage) {
            case 'KATAIFI':
              return <KataifiVisual color={color} accentColor={accentColor} />;
            case 'PISTACHIO':
              return <PistachioVisual color={color} accentColor={accentColor} />;
            case 'MARSHMALLOW':
              return <MarshmallowVisual color={color} />;
            case 'WRAPPING':
              return <WrappingVisual color={color} innerColor={accentColor} />;
            case 'FINISHED':
              return <FinishedVisual level={levelData.level} color={color} accentColor={accentColor} />;
            default:
              return null;
          }
        })()}
      </div>
    );
  };

  return (
    <div
      className={`relative w-80 h-80 flex items-center justify-center select-none cursor-pointer ${isShaking ? 'animate-shake' : 'animate-float'}`}
      onMouseDown={handlePointerDown}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        handlePointerDown({
          clientX: touch.clientX,
          clientY: touch.clientY,
          preventDefault: () => { },
          stopPropagation: () => { }
        } as unknown as React.MouseEvent);
      }}
      onTouchEnd={handlePointerUp}
    >
      {/* Dynamic Shadow */}
      <div
        className="absolute bottom-2 w-56 h-12 bg-black opacity-40 rounded-[100%] blur-2xl transition-all duration-300 translate-y-32"
        style={{ transform: `translateY(${110 + (clickScale === 1 ? 0 : 5)}px) scale(${clickScale === 1 ? 1 : 0.9})` }}
      />

      <div style={containerBaseStyle} className="relative w-full h-full flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
};

// --- High-Fidelity Sub-components ---

const KataifiVisual = ({ color, accentColor }: { color: string, accentColor?: string }) => (
  <div className="relative w-72 h-72">
    {/* Frying Pan Base */}
    <div className="absolute inset-0 bg-gray-900 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.8),0_10px_20px_rgba(0,0,0,0.5)] border-4 border-gray-700 flex items-center justify-center overflow-hidden">
      {/* Pan texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] opacity-30"></div>

      {/* Hot Butter Pool */}
      <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-yellow-600/40 via-transparent to-transparent animate-pulse-slow"></div>

      {/* Sizzling Bubbles */}
      <div className="absolute w-full h-full">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="absolute bg-yellow-200/50 rounded-full blur-[1px] animate-ping"
            style={{
              width: Math.random() * 10 + 5 + 'px',
              height: Math.random() * 10 + 5 + 'px',
              left: Math.random() * 60 + 20 + '%',
              top: Math.random() * 60 + 20 + '%',
              animationDuration: Math.random() * 1 + 0.5 + 's',
              animationDelay: Math.random() + 's'
            }}
          />
        ))}
      </div>

      {/* The Kataifi Noodles Cluster */}
      <div className="relative w-[80%] h-[80%] animate-spin-slow" style={{ animationDuration: '30s' }}>
        {[...Array(60)].map((_, i) => {
          const isToasted = Math.random() > 0.5;
          return (
            <div
              key={i}
              className={`absolute h-0.5 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.3)] transition-colors duration-1000
                ${isToasted ? 'bg-amber-500' : 'bg-amber-200'}
              `}
              style={{
                width: `${Math.random() * 40 + 10}px`,
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: 0.9
              }}
            />
          );
        })}
      </div>
    </div>
    {/* Handle Hint */}
    <div className="absolute top-1/2 -right-12 w-20 h-6 bg-gray-800 rounded-r-lg transform -translate-y-1/2 -z-10 shadow-xl border-t border-gray-600"></div>
  </div>
);

const PistachioVisual = ({ color, accentColor }: { color: string, accentColor?: string }) => (
  <div className="relative w-64 h-64">
    {/* Glass Bowl Container */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-full border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden ring-1 ring-white/10">

      {/* The Paste Mass */}
      <div className={`relative w-[90%] h-[90%] rounded-full bg-[#AFB42B] shadow-inner overflow-hidden`}>
        {/* Realistic Texture: Noise */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-multiply"></div>

        {/* Swirling Mixture Effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[120%] h-[120%] bg-[conic-gradient(from_0deg,#9E9D24,#CDDC39,#AFB42B,#9E9D24)] opacity-80 blur-xl animate-spin-slow" style={{ animationDuration: '10s' }}></div>
        </div>

        {/* Melted White Chocolate Streaks */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-40 blur-md">
            <path d="M20,50 Q50,20 80,50 T50,80" fill="none" stroke="white" strokeWidth="8" className="animate-pulse-slow" />
            <path d="M50,20 Q80,50 50,80 T20,50" fill="none" stroke="#F0F4C3" strokeWidth="6" />
          </svg>
        </div>

        {/* Crushed Pistachio Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-[#558B2F] rounded-[30%]"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
            }}
          />
        ))}

        {/* Surface Gloss (Wet look) */}
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[20%] bg-gradient-to-b from-white to-transparent opacity-30 rounded-[100%] blur-[2px] transform -rotate-12"></div>
      </div>
    </div>
  </div>
);

const MarshmallowVisual = ({ color }: { color: string }) => (
  <div className="relative w-72 h-72 flex items-center justify-center">
    {/* Dark Pot Background */}
    <div className="absolute inset-0 bg-[#263238] rounded-full shadow-2xl border-4 border-[#37474F] opacity-90"></div>

    {/* Heat/Steam effect */}
    <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent rounded-full opacity-50 animate-pulse"></div>

    {/* Melting Marshmallow Mass */}
    <div className="relative w-[75%] h-[75%] filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
      {/* Base Pool */}
      <div className="absolute inset-0 bg-[#FFF9C4] rounded-full blur-md opacity-80 scale-90"></div>

      {/* Marshmallow 1 */}
      <div className="absolute top-0 left-4 w-28 h-28 bg-gradient-to-br from-white to-gray-200 rounded-[40%] transform rotate-12 shadow-inner"></div>

      {/* Marshmallow 2 (Melting) */}
      <div className="absolute bottom-4 right-4 w-32 h-24 bg-gradient-to-tl from-white to-orange-50 rounded-[50%] transform -rotate-6 shadow-inner flex items-center justify-center">
        <div className="w-full h-full bg-white opacity-50 blur-sm rounded-[50%] animate-pulse-slow"></div>
      </div>

      {/* Marshmallow 3 */}
      <div className="absolute top-8 right-0 w-20 h-20 bg-white rounded-full shadow-lg blur-[1px]"></div>

      {/* Gooey Connection */}
      <div className="absolute top-1/2 left-1/2 w-40 h-20 bg-white rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2 opacity-90"></div>

      {/* Glossy Highlights */}
      <div className="absolute top-6 left-10 w-8 h-4 bg-white blur-[2px] rounded-full opacity-80"></div>
      <div className="absolute bottom-10 right-12 w-10 h-3 bg-white blur-[2px] rounded-full opacity-80"></div>
    </div>
  </div>
);

const WrappingVisual = ({ color, innerColor }: { color: string, innerColor?: string }) => (
  <div className="relative w-64 h-64">
    {/* The Dough Ball */}
    <div className="absolute inset-0 rounded-full bg-[#EFEBE9] shadow-[inset_-20px_-20px_60px_rgba(0,0,0,0.2),10px_20px_40px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden">

      {/* Dough Texture */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/felt.png')] mix-blend-multiply"></div>

      {/* Irregular Shape Mask (make it not perfectly round visually) */}
      <div className="absolute inset-0 border-[16px] border-[#D7CCC8]/20 rounded-full blur-sm"></div>

      {/* The "Pinch" / Opening */}
      <div className="relative w-32 h-32 bg-[#3E2723]/20 rounded-full shadow-[inset_4px_4px_10px_rgba(0,0,0,0.4)] flex items-center justify-center overflow-hidden transform rotate-12">
        {/* The Filling Inside */}
        <div className={`absolute inset-0 ${innerColor || 'bg-[#AFB42B]'} flex items-center justify-center`}>
          {/* Filling Detail: Kataifi strands */}
          <div className="absolute w-full h-full opacity-40 bg-[url('https://www.transparenttextures.com/patterns/fiber.png')] scale-150 mix-blend-overlay"></div>
          <div className="w-full h-full bg-gradient-to-br from-transparent to-black/30"></div>
        </div>

        {/* Dough overlapping the hole slightly */}
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#EFEBE9] rounded-full blur-md"></div>
        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#EFEBE9] rounded-full blur-md"></div>
      </div>
    </div>

    {/* Flour Dusting */}
    <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-20 blur-xl rounded-full pointer-events-none"></div>
  </div>
);

const FinishedVisual = ({ level, color, accentColor }: { level: number, color: string, accentColor?: string }) => {
  const isGold = level >= 7;
  const isMaster = level >= 10;

  return (
    <div className="relative w-72 h-72">
      {/* Main Chocolate Sphere */}
      <div className="absolute inset-0 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_4px_4px_10px_rgba(255,255,255,0.1),inset_-10px_-10px_40px_rgba(0,0,0,0.6)] overflow-hidden bg-[#3E2723]">

        {/* Cocoa Powder Texture (Matte Finish) */}
        <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] mix-blend-soft-light scale-50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#5D4037] to-[#271c19] opacity-90"></div>

        {/* Subtle Surface Imperfections */}
        <div className="absolute top-20 left-10 w-12 h-8 bg-black/10 blur-sm rounded-full transform rotate-12"></div>
      </div>

      {/* The "Bite" / Cross Section - The Hero Element */}
      <div className="absolute inset-0 filter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
        {/* The Cut Shape Container */}
        <div className="absolute top-[15%] right-[10%] w-[60%] h-[60%] overflow-hidden transform rotate-[-5deg]"
          style={{
            clipPath: 'polygon(10% 0%, 100% 0%, 100% 100%, 30% 90%, 0% 50%)',
            borderRadius: '10px'
          }}
        >
          {/* Chocolate Shell Thickness */}
          <div className="absolute inset-0 bg-[#3E2723] border-[6px] border-[#4E342E]"></div>

          {/* THE FILLING: Pistachio Knafeh */}
          <div className="absolute inset-[6px] bg-[#AFB42B] overflow-hidden">
            {/* 1. Deep Green Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#9E9D24] to-[#827717]"></div>

            {/* 2. Kataifi Texture (Crunchy Noodles) */}
            <div className="absolute inset-0 opacity-40 mix-blend-hard-light">
              {[...Array(30)].map((_, i) => (
                <div key={i} className="absolute h-[1px] bg-[#FFF9C4] shadow-sm"
                  style={{
                    width: Math.random() * 30 + 10 + 'px',
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    transform: `rotate(${Math.random() * 360}deg)`
                  }}
                />
              ))}
            </div>

            {/* 3. Creamy Gloss */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/30 via-transparent to-transparent opacity-60"></div>

            {/* 4. Pistachio Chunks */}
            <div className="absolute top-4 left-6 w-3 h-3 bg-[#DCEDC8] rounded-sm blur-[0.5px] rotate-45"></div>
            <div className="absolute bottom-8 right-6 w-2 h-2 bg-[#DCEDC8] rounded-sm blur-[0.5px] rotate-12"></div>
          </div>
        </div>

        {/* Crumbs falling from cut */}
        <div className="absolute top-[75%] right-[30%] w-1 h-1 bg-[#AFB42B] rounded-full animate-pulse"></div>
      </div>

      {/* Gold Leaf Decoration (Level 7+) */}
      {isGold && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {/* Main Gold Leaf */}
          <div className="absolute top-8 left-1/2 w-12 h-10 bg-gradient-to-r from-[#FFD700] to-[#FDB931] opacity-90 blur-[0.5px] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] transform -rotate-12 shadow-[0_2px_10px_rgba(255,215,0,0.6)] border border-[#FFF8E1]"></div>
          {/* Sparkles on Gold */}
          <div className="absolute top-10 left-[55%] w-1 h-1 bg-white rounded-full blur-[0.5px] animate-ping"></div>
        </div>
      )}

      {/* Master Sparkles (Level 10) */}
      {isMaster && (
        <div className="absolute inset-0 pointer-events-none z-30">
          <div className="absolute -top-4 right-0 text-3xl animate-bounce drop-shadow-lg">✨</div>
          <div className="absolute bottom-0 -left-4 text-3xl animate-pulse drop-shadow-lg">💎</div>
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full mix-blend-overlay"></div>
        </div>
      )}
    </div>
  );
};

export default DessertVisual;
