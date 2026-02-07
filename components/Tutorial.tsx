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
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Skip Button */}
            <button
                onClick={handleSkip}
                className="absolute top-6 right-6 z-10 text-white/50 hover:text-white transition-colors flex items-center space-x-1"
            >
                <span className="text-sm">건너뛰기</span>
                <X size={16} />
            </button>

            {/* Tutorial Card */}
            <div className="relative z-10 w-[90%] max-w-sm bg-gradient-to-b from-chocolate-800 to-chocolate-900 rounded-3xl p-6 shadow-2xl border border-white/10">
                {/* Progress Dots */}
                <div className="flex justify-center space-x-2 mb-6">
                    {TUTORIAL_STEPS.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-all ${idx === currentStep
                                    ? 'bg-pistachio-500 w-6'
                                    : idx < currentStep
                                        ? 'bg-pistachio-500/50'
                                        : 'bg-white/20'
                                }`}
                        />
                    ))}
                </div>

                {/* Icon */}
                <div className="text-6xl text-center mb-4 animate-bounce">
                    {step.icon}
                </div>

                {/* Content */}
                <h2 className="text-xl font-bold text-white text-center mb-3">
                    {step.title}
                </h2>
                <p className="text-white/70 text-center text-sm leading-relaxed mb-8">
                    {step.description}
                </p>

                {/* Action Button */}
                <button
                    onClick={handleNext}
                    className="w-full py-4 bg-pistachio-500 hover:bg-pistachio-300 text-black font-bold rounded-xl transition-all active:scale-95 flex items-center justify-center space-x-2"
                >
                    <span>{isLastStep ? '시작하기' : '다음'}</span>
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Tutorial;
