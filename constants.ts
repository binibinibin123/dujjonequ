import { LevelData } from './types';

export const MAX_LEVEL = 10;
export const CLICK_REWARD_BASE = 10;

export const LEVELS: LevelData[] = [
  {
    level: 1,
    name: "카다이프 볶기",
    description: "팬에 버터를 두르고 카다이프면을 노릇하게 굽습니다.",
    baseCost: 100,
    successRate: 1.0,
    visualParams: { 
      stage: 'KATAIFI', 
      color: 'bg-amber-100', // Starting raw color
      accentColor: 'bg-amber-400', // Toasted color
      particles: '🔥' 
    }
  },
  {
    level: 2,
    name: "피스타치오 배합",
    description: "녹인 화이트 초콜릿과 피스타치오 스프레드를 섞어 꾸덕하게 만듭니다.",
    baseCost: 300,
    successRate: 0.9,
    visualParams: { 
      stage: 'PISTACHIO', 
      color: 'bg-lime-500', 
      accentColor: 'bg-lime-300',
      particles: '🥜' 
    }
  },
  {
    level: 3,
    name: "마시멜로 중탕",
    description: "버터와 마시멜로를 약불에 녹여 쫀득한 베이스를 만듭니다.",
    baseCost: 700,
    successRate: 0.8,
    visualParams: { 
      stage: 'MARSHMALLOW', 
      color: 'bg-white', 
      accentColor: 'bg-stone-100',
      particles: '☁️' 
    }
  },
  {
    level: 4,
    name: "속재료 감싸기",
    description: "마시멜로 반죽으로 피스타치오 인서트를 얇게 감쌉니다.",
    baseCost: 1500,
    successRate: 0.7,
    visualParams: { 
      stage: 'WRAPPING', 
      color: 'bg-stone-200', 
      accentColor: 'bg-lime-600', // Inner color showing through
      particles: '🥣' 
    }
  },
  {
    level: 5,
    name: "코코아 파우더 코팅",
    description: "겉면에 코코아 가루를 골고루 묻혀 완성합니다.",
    baseCost: 3000,
    successRate: 0.6,
    visualParams: { 
      stage: 'FINISHED', 
      color: 'bg-[#3E2723]', 
      accentColor: 'bg-[#5D4037]',
      particles: '✨' 
    }
  },
  // Extended levels for gameplay depth (Quality enhancements)
  {
    level: 6,
    name: "숙성 및 안정화",
    description: "냉장고에서 쫀득한 식감을 극대화합니다.",
    baseCost: 6000,
    successRate: 0.5,
    visualParams: { 
      stage: 'FINISHED', 
      color: 'bg-[#3E2723]', 
      accentColor: 'bg-[#5D4037]',
      particles: '❄️' 
    }
  },
  {
    level: 7,
    name: "금박 장식",
    description: "식용 금박을 올려 고급스러움을 더합니다.",
    baseCost: 12000,
    successRate: 0.4,
    visualParams: { 
      stage: 'FINISHED', 
      color: 'bg-[#3E2723]', 
      accentColor: 'bg-yellow-400', // Gold
      particles: '👑' 
    }
  },
  {
    level: 8,
    name: "백화점 팝업 에디션",
    description: "한정판 패키지로 포장된 전설의 디저트.",
    baseCost: 25000,
    successRate: 0.3,
    visualParams: { 
      stage: 'FINISHED', 
      color: 'bg-[#281815]', 
      accentColor: 'bg-yellow-400',
      particles: '🎁' 
    }
  },
  {
    level: 9,
    name: "품절 대란의 주역",
    description: "중고 거래 사이트에서 3배 가격에 팔립니다.",
    baseCost: 50000,
    successRate: 0.2,
    visualParams: { 
      stage: 'FINISHED', 
      color: 'bg-[#281815]', 
      accentColor: 'bg-gradient-to-r from-purple-500 to-pink-500', // Mystic aura
      particles: '🔥' 
    }
  },
  {
    level: 10,
    name: "두쫀쿠 마스터피스",
    description: "박물관에 전시해도 될 완벽한 형상.",
    baseCost: 100000,
    successRate: 0.1,
    visualParams: { 
      stage: 'FINISHED', 
      color: 'bg-black', 
      accentColor: 'bg-gold-500',
      particles: '💎' 
    }
  },
];

export const STOCK_REFRESH_TIME_MS = 60000;
