import React, { useState } from 'react';
import { ChevronRight, X, MousePointer, TrendingUp, ShoppingBag } from 'lucide-react';

interface TutorialProps {
    onComplete: () => void;
}

const TUTORIAL_STEPS = [
    {
        title: "두쫀쿠에 오신 것을 환영합니다! 🍫",
        description: "품절 대란의 전설, 두바이 초콜릿 '두쫀쿠'를 만들어보세요!",
        icon: "🍫",
        highlight: null,
    },
    {
        title: "디저트를 탭하세요",
        description: "디저트를 탭하면 '부스러기'를 획득합니다. 부스러기로 디저트를 강화할 수 있어요.",
        icon: "👆",
        highlight: "dessert",
    },
    {
        title: "강화하세요",
        description: "충분한 부스러기가 모이면 하단 버튼을 눌러 다음 단계로 강화하세요. 단, 확률에 따라 실패할 수도 있어요!",
        icon: "⬆️",
        highlight: "upgrade",
    },
    {
        title: "품절에 주의하세요",
        description: "재료 재고가 0이 되면 강화할 수 없어요. 재입고를 기다리거나 빠르게 강화하세요!",
        icon: "⚠️",
        highlight: "stock",
    },
    {
        title: "준비 완료!",
        description: "이제 최고의 두쫀쿠를 만들어보세요. 행운을 빕니다!",
        icon: "🚀",
        highlight: null,
    },
];

const Tutorial: React.FC<TutorialProps> = ({ onComplete }) => {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < TUTORIAL_STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    const handleSkip = () => {
        onComplete();
    };

    const step = TUTORIAL_STEPS[currentStep];
    const isLastStep = currentStep === TUTORIAL_STEPS.length - 1;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            {/* Pixel Art Card */}
            <div className="w-full max-w-sm pixel-box p-6 relative animate-pop shadow-[10px_10px_0_0_rgba(0,0,0,0.5)] bg-[#2d1b2e] border-4 border-black">

                {/* Skip Button (added back for UX) */}
                <button
                    onClick={handleSkip}
                    className="absolute top-2 right-2 text-white/50 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Header Decoration */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#ffcc00] px-4 py-1 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] transform -rotate-2">
                    <span className="text-xs font-black text-black tracking-widest uppercase">QUEST LOG</span>
                </div>

                {/* Content Area */}
                <div className="flex flex-col items-center text-center space-y-6 pt-6">
                    {/* Icon Box */}
                    <div className="w-24 h-24 bg-[#1a1a2e] border-4 border-black flex items-center justify-center text-5xl shadow-inner relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
                        <div className="animate-bounce">{step.icon}</div>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl font-black text-[#ffcc00] tracking-tight drop-shadow-md">
                            {step.title}
                        </h2>
                        <p className="text-sm text-gray-300 leading-relaxed font-bold">
                            {step.description}
                        </p>
                    </div>

                    {/* Progress Dots (Retro Style) */}
                    <div className="flex space-x-3">
                        {TUTORIAL_STEPS.map((_, i) => (
                            <div
                                key={i}
                                className={`w-3 h-3 border-2 border-black transition-all duration-200
                                ${i === currentStep ? 'bg-[#ffcc00] scale-125' : 'bg-[#444]'}`}
                            />
                        ))}
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handleNext}
                        className="w-full py-4 mt-2 bg-[#ffcc00] hover:bg-[#e6b800] text-black font-black border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.8)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
                    >
                        <span>{currentStep < TUTORIAL_STEPS.length - 1 ? "NEXT PAGE" : "START ADVENTURE"}</span>
                        {currentStep < TUTORIAL_STEPS.length - 1 && <ChevronRight size={18} strokeWidth={4} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tutorial;
