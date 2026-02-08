import { LevelData } from './types';

export const MAX_LEVEL = 50;
export const CLICK_REWARD_BASE = 10;
export const CLICK_REWARD_EXPONENT = 1.65; // Balanced for 50 levels expansion

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
      particles: '🔥',
      image: '/assets/desserts/1.png'
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
      particles: '🥜',
      image: '/assets/desserts/2.png'
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
      particles: '☁️',
      image: '/assets/desserts/3.png'
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
      particles: '🥣',
      image: '/assets/desserts/4.png'
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
      particles: '✨',
      image: '/assets/desserts/5.png'
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
      particles: '❄️',
      image: '/assets/desserts/6.png'
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
      particles: '👑',
      image: '/assets/desserts/7.png'
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
      particles: '🎁',
      image: '/assets/desserts/8.png'
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
      particles: '🔥',
      image: '/assets/desserts/9.png'
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
      particles: '💎',
      image: '/assets/desserts/10.png'
    }
  },
  {
    level: 11,
    name: "글로벌 미식 평판",
    description: "미슐랭 가이드에서 주목하기 시작했습니다.",
    baseCost: 250000,
    successRate: 0.09,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-black',
      accentColor: 'bg-blue-400',
      particles: '🌍',
      image: '/assets/desserts/11.png'
    }
  },
  {
    level: 12,
    name: "유니버스 에디션",
    description: "우주 정거장으로 배달되는 첫 번째 디저트.",
    baseCost: 500000,
    successRate: 0.08,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-[#000033]',
      accentColor: 'bg-indigo-300',
      particles: '🚀',
      image: '/assets/desserts/12.png'
    }
  },
  {
    level: 13,
    name: "사이언티픽 정밀 배합",
    description: "분자 요리 기법으로 맛의 입자를 재구성합니다.",
    baseCost: 1000000,
    successRate: 0.07,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-gray-900',
      accentColor: 'bg-cyan-400',
      particles: '🧪',
      image: '/assets/desserts/13.png'
    }
  },
  {
    level: 14,
    name: "고대 레시피의 부활",
    description: "천 년 전 전설 속의 달콤함을 재현했습니다.",
    baseCost: 2500000,
    successRate: 0.06,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-[#3E2723]',
      accentColor: 'bg-amber-700',
      particles: '📜',
      image: '/assets/desserts/14.png'
    }
  },
  {
    level: 15,
    name: "드래곤 스케일 코팅",
    description: "전설의 생물처럼 단단하고 빛나는 껍질.",
    baseCost: 5000000,
    successRate: 0.05,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-[#1a2e1a]',
      accentColor: 'bg-emerald-400',
      particles: '🐉',
      image: '/assets/desserts/15.png'
    }
  },
  {
    level: 16,
    name: "클라우드 템테이션",
    description: "입에 닿는 순간 구름처럼 사라지는 환상의 식감.",
    baseCost: 10000000,
    successRate: 0.04,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-sky-50',
      accentColor: 'bg-white',
      particles: '🎐',
      image: '/assets/desserts/16.png'
    }
  },
  {
    level: 17,
    name: "블랙홀 솔리튜드",
    description: "모든 미각을 빨아들이는 압도적인 풍미.",
    baseCost: 25000000,
    successRate: 0.03,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-[#050505]',
      accentColor: 'bg-purple-900',
      particles: '🌌',
      image: '/assets/desserts/17.png'
    }
  },
  {
    level: 18,
    name: "시간을 넘는 향기",
    description: "과거와 미래의 기억을 깨우는 향긋함.",
    baseCost: 50000000,
    successRate: 0.02,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-[#ffebf0]',
      accentColor: 'bg-pink-300',
      particles: '⏳',
      image: '/assets/desserts/18.png'
    }
  },
  {
    level: 19,
    name: "신의 장난",
    description: "필멸자가 즐길 수 있는 최고의 사치.",
    baseCost: 100000000,
    successRate: 0.015,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-white',
      accentColor: 'bg-yellow-200',
      particles: '⚡',
      image: '/assets/desserts/19.png'
    }
  },
  {
    level: 20,
    name: "인피니티 두쫀쿠",
    description: "영원히 반복되는 극상의 달콤함, 그 끝.",
    baseCost: 250000000,
    successRate: 0.01,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
      accentColor: 'bg-white',
      particles: '♾️',
      image: '/assets/desserts/20.png'
    }
  },
  {
    level: 21,
    name: "오로라 글레이징",
    description: "극지방의 밤하늘을 옮겨놓은 듯한 신비로운 광택.",
    baseCost: 500000000,
    successRate: 0.009,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-[#001f3f]',
      accentColor: 'bg-teal-300',
      particles: '🌌',
      image: '/assets/desserts/21.png'
    }
  },
  {
    level: 22,
    name: "다이아몬드 더스트",
    description: "초미세 다이아몬드 분말로 눈부신 광채를 구현했습니다.",
    baseCost: 1000000000,
    successRate: 0.008,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-white',
      accentColor: 'bg-blue-100',
      particles: '💎',
      image: '/assets/desserts/22.png'
    }
  },
  {
    level: 23,
    name: "피닉스의 깃털 설탕",
    description: "결코 식지 않는 온기를 품은 전설적인 당분.",
    baseCost: 2500000000,
    successRate: 0.007,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-[#ff4500]',
      accentColor: 'bg-yellow-500',
      particles: '🔥',
      image: '/assets/desserts/23.png'
    }
  },
  {
    level: 24,
    name: "심해의 진주 초콜릿",
    description: "수천 년의 수압을 견뎌낸 깊고 진한 맛의 정수.",
    baseCost: 5000000000,
    successRate: 0.006,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-[#002b36]',
      accentColor: 'bg-cyan-200',
      particles: '🐚',
      image: '/assets/desserts/24.png'
    }
  },
  {
    level: 25,
    name: "드림 캐처 인서트",
    description: "잠든 미각의 모든 감각을 깨우는 환상적인 조합.",
    baseCost: 10000000000,
    successRate: 0.005,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-[#4b0082]',
      accentColor: 'bg-pink-400',
      particles: '🌙',
      image: '/assets/desserts/25.png'
    }
  },
  {
    level: 26,
    name: "스타라이트 너겟",
    description: "별의 파편을 그대로 구워낸듯한 바삭한 식감.",
    baseCost: 25000000000,
    successRate: 0.004,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-gray-800',
      accentColor: 'bg-yellow-200',
      particles: '⭐',
      image: '/assets/desserts/26.png'
    }
  },
  {
    level: 27,
    name: "플라티나 오감 만족",
    description: "금보단 귀하고 은보다 맑은, 백금의 맛.",
    baseCost: 50000000000,
    successRate: 0.003,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-[#e5e4e2]',
      accentColor: 'bg-white',
      particles: '✨',
      image: '/assets/desserts/27.png'
    }
  },
  {
    level: 28,
    name: "엠퍼러즈 셀렉션",
    description: "오직 제국의 주인만이 허락받은 극상의 피스.",
    baseCost: 100000000000,
    successRate: 0.002,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-black',
      accentColor: 'bg-red-600',
      particles: '👑',
      image: '/assets/desserts/28.png'
    }
  },
  {
    level: 29,
    name: "시크릿 오브 에덴",
    description: "금단의 열매보다 더 달콤한 유혹의 끝.",
    baseCost: 250000000000,
    successRate: 0.0015,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-[#1b4d3e]',
      accentColor: 'bg-lime-400',
      particles: '🍏',
      image: '/assets/desserts/29.png'
    }
  },
  {
    level: 30,
    name: "더 골든 두쫀쿠",
    description: "존재 자체로 신화가 된 황금빛 절대 디저트.",
    baseCost: 500000000000,
    successRate: 0.001,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-gradient-to-br from-yellow-400 via-amber-600 to-yellow-300',
      accentColor: 'bg-white',
      particles: '⚜️',
      image: '/assets/desserts/30.png'
    }
  },
  {
    level: 31,
    name: "성운의 솜사탕",
    description: "갓 태어난 별들의 가스를 모아 만든 폭신한 식감.",
    baseCost: 1000000000000,
    successRate: 0.0009,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-[#ff00ff]',
      accentColor: 'bg-cyan-300',
      particles: '☁️',
      image: '/assets/desserts/31.png'
    }
  },
  {
    level: 32,
    name: "밀키웨이 리플",
    description: "은하수의 흐름을 따라 소용돌이치는 부드러운 크림.",
    baseCost: 2500000000000,
    successRate: 0.0008,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-[#191970]',
      accentColor: 'bg-white',
      particles: '🌌',
      image: '/assets/desserts/32.png'
    }
  },
  {
    level: 33,
    name: "다크매터 가나슈",
    description: "우주의 무게를 담은 듯 묵직하고 신비로운 초콜릿.",
    baseCost: 5000000000000,
    successRate: 0.0007,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-black',
      accentColor: 'bg-purple-900',
      particles: '🌑',
      image: '/assets/desserts/33.png'
    }
  },
  {
    level: 34,
    name: "슈퍼노바 크리스피",
    description: "초신성 폭발의 에너지를 담은 폭발적인 바삭함.",
    baseCost: 10000000000000,
    successRate: 0.0006,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-[#ffdf00]',
      accentColor: 'bg-orange-500',
      particles: '💥',
      image: '/assets/desserts/34.png'
    }
  },
  {
    level: 35,
    name: "쿼크 프리즘 당면",
    description: "가장 작은 입자 단위까지 정밀하게 계산된 맛의 조각.",
    baseCost: 25000000000000,
    successRate: 0.0005,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-white/10',
      accentColor: 'bg-rainbow',
      particles: '🌈',
      image: '/assets/desserts/35.png'
    }
  },
  {
    level: 36,
    name: "중력 렌즈 시럽",
    description: "빛 마저 구부리는 진한 맛의 밀도.",
    baseCost: 50000000000000,
    successRate: 0.0004,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-[#0a0a0a]',
      accentColor: 'bg-blue-600',
      particles: '🌀',
      image: '/assets/desserts/36.png'
    }
  },
  {
    level: 37,
    name: "안드로메다 앰브로시아",
    description: "다른 은하계에서 전해져 내려온 신들의 음식.",
    baseCost: 100000000000000,
    successRate: 0.0003,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-[#ff007f]',
      accentColor: 'bg-indigo-200',
      particles: '🛸',
      image: '/assets/desserts/37.png'
    }
  },
  {
    level: 38,
    name: "스타더스트 크런치",
    description: "부서진 별들의 가루로 만든 영롱한 겉면.",
    baseCost: 250000000000000,
    successRate: 0.0002,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-[#483d8b]',
      accentColor: 'bg-yellow-100',
      particles: '✨',
      image: '/assets/desserts/38.png'
    }
  },
  {
    level: 39,
    name: "보이드 젤리",
    description: "무(無)의 공간을 형상화한 듯 투명하고 깊은 향.",
    baseCost: 500000000000000,
    successRate: 0.00015,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-black/80',
      accentColor: 'bg-gray-500',
      particles: '🌫️',
      image: '/assets/desserts/39.png'
    }
  },
  {
    level: 40,
    name: "이벤트 호라이즌",
    description: "한번 맛보면 결코 빠져나올 수 없는 궁극의 지점.",
    baseCost: 1000000000000000,
    successRate: 0.0001,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-black',
      accentColor: 'bg-orange-700',
      particles: '🕳️',
      image: '/assets/desserts/40.png'
    }
  },
  {
    level: 41,
    name: "제우수의 번개 캔디",
    description: "신들의 왕이 하사한 짜릿하고 강렬한 전율.",
    baseCost: 2500000000000000,
    successRate: 0.00009,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-blue-100',
      accentColor: 'bg-yellow-300',
      particles: '⚡',
      image: '/assets/desserts/41.png'
    }
  },
  {
    level: 42,
    name: "발할라의 연회 푸딩",
    description: "영광스러운 전사들만이 누릴 수 있는 영원한 풍요.",
    baseCost: 5000000000000000,
    successRate: 0.00008,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-amber-100',
      accentColor: 'bg-amber-600',
      particles: '🍖',
      image: '/assets/desserts/42.png'
    }
  },
  {
    level: 43,
    name: "유그드라실의 수액 젤리",
    description: "세계수에서 흘러나온 생명의 근원적인 달콤함.",
    baseCost: 10000000000000000,
    successRate: 0.00007,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-green-900',
      accentColor: 'bg-green-400',
      particles: '🌳',
      image: '/assets/desserts/43.png'
    }
  },
  {
    level: 44,
    name: "포세이돈의 파도 마카롱",
    description: "깊은 바다의 신비와 시원함을 머금은 완벽한 원형.",
    baseCost: 25000000000000000,
    successRate: 0.00006,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-blue-500',
      accentColor: 'bg-white',
      particles: '🔱',
      image: '/assets/desserts/44.png'
    }
  },
  {
    level: 45,
    name: "시간의 신 크로노스 트러플",
    description: "과거와 현재, 미래의 맛이 공존하는 초월적 미각.",
    baseCost: 50000000000000000,
    successRate: 0.00005,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-zinc-800',
      accentColor: 'bg-zinc-400',
      particles: '⌛',
      image: '/assets/desserts/45.png'
    }
  },
  {
    level: 46,
    name: "엔트로피 리버설 마시멜로",
    description: "무질서 속에서 찾아낸 궁극의 질서와 조화.",
    baseCost: 100000000000000000,
    successRate: 0.00004,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-gray-100',
      accentColor: 'bg-gray-300',
      particles: '⚛️',
      image: '/assets/desserts/46.png'
    }
  },
  {
    level: 47,
    name: "멀티버스 크로스워크",
    description: "수많은 평행 우주의 맛이 하나로 교차하는 기적.",
    baseCost: 250000000000000000,
    successRate: 0.00003,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-gradient-to-r from-blue-500 via-purple-500 to-red-500',
      accentColor: 'bg-white',
      particles: '🔀',
      image: '/assets/desserts/47.png'
    }
  },
  {
    level: 48,
    name: "운명의 실타래 엿",
    description: "끊어지지 않는 인생의 모든 인연과 달콤함.",
    baseCost: 500000000000000000,
    successRate: 0.00002,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-red-50/50',
      accentColor: 'bg-red-600',
      particles: '🧵',
      image: '/assets/desserts/48.png'
    }
  },
  {
    level: 49,
    name: "창세기 에센스",
    description: "태초의 빛과 어둠이 섞여 탄생한 최초의 단맛.",
    baseCost: 1000000000000000000, // 1 Quintillion
    successRate: 0.000015,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-white',
      accentColor: 'bg-black',
      particles: '☯️',
      image: '/assets/desserts/49.png'
    }
  },
  {
    level: 50,
    name: "두쫀쿠: 더 파이널 원",
    description: "모든 디저트의 시작이자 끝, 영원한 성배.",
    baseCost: 2500000000000000000,
    successRate: 0.00001,
    visualParams: {
      stage: 'FINISHED',
      color: 'bg-gradient-to-br from-gold-300 via-white to-gold-300',
      accentColor: 'bg-amber-200',
      particles: '✨🏆✨',
      image: '/assets/desserts/50.png'
    }
  },
];

export const ACHIEVEMENTS = [
  // --- Click Achievements ---
  {
    id: 'CLICK_10',
    name: "초보 조리사",
    description: "디저트를 10번 탭했습니다.",
    icon: "👨‍🍳",
    requirement: (stats: any) => stats.totalClicks >= 10,
  },
  {
    id: 'CLICK_100',
    name: "정성 가득",
    description: "디저트를 100번 탭했습니다.",
    icon: "🤲",
    requirement: (stats: any) => stats.totalClicks >= 100,
  },
  {
    id: 'CLICK_1000',
    name: "근성 가이",
    description: "디저트를 1,000번 탭했습니다.",
    icon: "💪",
    requirement: (stats: any) => stats.totalClicks >= 1000,
  },
  {
    id: 'CLICK_10000',
    name: "강철의 손가락",
    description: "디저트를 10,000번 탭했습니다.",
    icon: "🤞",
    requirement: (stats: any) => stats.totalClicks >= 10000,
  },
  {
    id: 'CLICK_50000',
    name: "탭의 지배자",
    description: "디저트를 50,000번 탭했습니다.",
    icon: "⚡",
    requirement: (stats: any) => stats.totalClicks >= 50000,
  },

  // --- Money Achievements ---
  {
    id: 'MONEY_1000',
    name: "첫 매출",
    description: "총 1,000 부스러기를 벌었습니다.",
    icon: "💰",
    requirement: (stats: any) => stats.totalMoneyEarned >= 1000,
  },
  {
    id: 'MONEY_100K',
    name: "동네 맛집",
    description: "총 100,000 부스러기를 벌었습니다.",
    icon: "🏠",
    requirement: (stats: any) => stats.totalMoneyEarned >= 100000,
  },
  {
    id: 'MONEY_1M',
    name: "수입 정산",
    description: "총 1,000,000 부스러기를 벌었습니다.",
    icon: "💸",
    requirement: (stats: any) => stats.totalMoneyEarned >= 1000000,
  },
  {
    id: 'MONEY_100M',
    name: "백만장자 파티시에",
    description: "총 100,000,000 부스러기를 벌었습니다.",
    icon: "💎",
    requirement: (stats: any) => stats.totalMoneyEarned >= 100000000,
  },
  {
    id: 'MONEY_1B',
    name: "부의 끝판왕",
    description: "총 1,000,000,000 부스러기를 벌었습니다.",
    icon: "🏛️",
    requirement: (stats: any) => stats.totalMoneyEarned >= 1000000000,
  },
  {
    id: 'MONEY_1T',
    name: "재벌 3세",
    description: "총 1,000,000,000,000 부스러기를 벌었습니다.",
    icon: "🌌",
    requirement: (stats: any) => stats.totalMoneyEarned >= 1000000000000,
  },

  // --- Level Achievements ---
  {
    id: 'LEVEL_5',
    name: "중급 파티시에",
    description: "레벨 5에 도달했습니다.",
    icon: "🏆",
    requirement: (stats: any, level: number) => level >= 5,
  },
  {
    id: 'LEVEL_10',
    name: "두쫀쿠 장인",
    description: "레벨 10에 도달했습니다.",
    icon: "👑",
    requirement: (stats: any, level: number) => level >= 10,
  },
  {
    id: 'LEVEL_25',
    name: "명예 셰프",
    description: "레벨 25에 도달했습니다.",
    icon: "🎖️",
    requirement: (stats: any, level: number) => level >= 25,
  },
  {
    id: 'LEVEL_50',
    name: "초월한 존재",
    description: "최종 단계인 레벨 50에 도달했습니다.",
    icon: "🏆✨",
    requirement: (stats: any, level: number) => level >= 50,
  },

  // --- Prestige Achievements ---
  {
    id: 'PRESTIGE_1',
    name: "새로운 시작",
    description: "처음으로 환생을 진행했습니다.",
    icon: "♻️",
    requirement: (stats: any, level: number, prestige: number) => prestige >= 1,
  },
  {
    id: 'PRESTIGE_10',
    name: "반복되는 신화",
    description: "총 10개 이상의 전설의 티켓을 보유했습니다.",
    icon: "🎫",
    requirement: (stats: any, level: number, prestige: number) => prestige >= 10,
  },
  {
    id: 'PRESTIGE_100',
    name: "티켓 부자",
    description: "총 100개 이상의 전설의 티켓을 보유했습니다.",
    icon: "🎰",
    requirement: (stats: any, level: number, prestige: number) => prestige >= 100,
  },
  {
    id: 'PRESTIGE_1000',
    name: "제국의 매각왕",
    description: "총 1,000개 이상의 전설의 티켓을 보유했습니다.",
    icon: "🏯",
    requirement: (stats: any, level: number, prestige: number) => prestige >= 1000,
  },

  // --- Mastery Achievements ---
  {
    id: 'MASTERY_1',
    name: "완벽주의자",
    description: "처음으로 레시피 마스터리 별을 획득했습니다.",
    icon: "⭐",
    requirement: (stats: any, level: number, prestige: number, mastery: any) => Object.values(mastery).some((v: any) => v >= 1),
  },
  {
    id: 'MASTERY_10',
    name: "별 수집가",
    description: "총 10개 이상의 마스터리 별을 획득했습니다.",
    icon: "🌟",
    requirement: (stats: any, level: number, prestige: number, mastery: any) => (Object.values(mastery) as number[]).reduce((a, b) => a + b, 0) >= 10,
  },
  {
    id: 'MASTERY_30',
    name: "그랜드 마스터",
    description: "총 30개 이상의 마스터리 별을 획득했습니다.",
    icon: "✨",
    requirement: (stats: any, level: number, prestige: number, mastery: any) => (Object.values(mastery) as number[]).reduce((a, b) => a + b, 0) >= 30,
  },
  {
    id: 'MASTERY_100',
    name: "마스터리의 화신",
    description: "총 100개 이상의 마스터리 별을 획득했습니다.",
    icon: "🔮",
    requirement: (stats: any, level: number, prestige: number, mastery: any) => (Object.values(mastery) as number[]).reduce((a, b) => a + b, 0) >= 100,
  },

  // --- Misc & Challenge ---
  {
    id: 'FAIL_1',
    name: "실패는 성공의 어머니",
    description: "처음으로 강화에 실패했습니다.",
    icon: "🥚",
    requirement: (stats: any) => stats.failedUpgrades >= 1,
  },
  {
    id: 'FAIL_10',
    name: "운이 나쁜 건 아닐거야",
    description: "강화에 총 10번 실패했습니다.",
    icon: "🌩️",
    requirement: (stats: any) => stats.failedUpgrades >= 10,
  },
  {
    id: 'FAIL_50',
    name: "불운의 끝",
    description: "강화에 총 50번 실패했습니다.",
    icon: "🌪️",
    requirement: (stats: any) => stats.failedUpgrades >= 50,
  },
  {
    id: 'STOCK_OUT',
    name: "완판 신화",
    description: "재고를 0으로 만들었습니다.",
    icon: "📦",
    requirement: (stats: any, level: number, prestige: number, mastery: any, currentStock: number) => currentStock <= 0,
  },
  {
    id: 'FEVER_TIME',
    name: "흥이 난다!",
    description: "처음으로 피버 모드를 발동했습니다.",
    icon: "🏮",
    requirement: (stats: any, level: number, prestige: number, mastery: any, currentStock: number, isFever: boolean) => isFever === true,
  },
  {
    id: 'ALL_UNLOCKED',
    name: "백과사전의 완성",
    description: "모든 레시피(50단계)를 해금했습니다.",
    icon: "📚",
    requirement: (stats: any, level: number) => level >= 50,
  },
  {
    id: 'ULTIMATE_GOAL',
    name: "두쫀쿠의 끝",
    description: "마지막 별까지 모두 모은 진정한 장인.",
    icon: "🛸",
    requirement: (stats: any, level: number, prestige: number, mastery: any) => (Object.values(mastery) as number[]).reduce((a, b) => a + b, 0) >= 150,
  }
];

export const STOCK_REFRESH_TIME_MS = 60000;
export const FEVER_DURATION_MS = 10000;
export const FEVER_GAUGE_CHARGE_PER_CLICK = 2; // Increase 2% per click
export const FEVER_MULTIPLIER = 10;

import { Upgrade, Helper } from './types';

export const UPGRADES: Upgrade[] = [
  {
    id: 'CLICK_POWER',
    name: "강력한 악력",
    description: "탭 한 번당 획득하는 부스러기가 레벨당 50% 증가합니다.",
    baseCost: 200,
    costMultiplier: 1.8,
    maxLevel: 50,
    icon: "💪",
    type: 'CLICK_POWER',
  },
  {
    id: 'CHANCE_BOOST',
    name: "황금 손재주",
    description: "강화 성공 확률이 영구적으로 레벨당 1% 증가합니다.",
    baseCost: 1000,
    costMultiplier: 2.5,
    maxLevel: 10,
    icon: "🍀",
    type: 'CHANCE',
  },
  {
    id: 'STOCK_CAPACITY',
    name: "대형 냉장고",
    description: "최대 재고량이 레벨당 50만큼 증가합니다.",
    baseCost: 500,
    costMultiplier: 2.0,
    maxLevel: 20,
    icon: "🧊",
    type: 'STOCK_MAX',
  },
  {
    id: 'STOCK_SPEED',
    name: "당일 배송",
    description: "재고 재입고 주기가 레벨당 5초 단축됩니다.",
    baseCost: 1500,
    costMultiplier: 2.2,
    maxLevel: 10,
    icon: "🚚",
    type: 'STOCK_SPEED',
  },
];

export const HELPERS: Helper[] = [
  {
    id: 'PART_TIMER',
    name: "성실한 조리 알바",
    description: "초당 1회의 자동 탭 효과를 제공합니다.",
    baseCost: 500,
    costMultiplier: 1.2,
    baseCPS: 1,
    icon: "👩‍🍳",
  },
  {
    id: 'MANAGER',
    name: "프로 매니저",
    description: "초당 5회의 자동 탭 효과를 제공합니다.",
    baseCost: 5000,
    costMultiplier: 1.3,
    baseCPS: 5,
    icon: "👔",
  },
  {
    id: 'CHEF',
    name: "수석 셰프",
    description: "초당 25회의 자동 탭 효과를 제공합니다.",
    baseCost: 50000,
    costMultiplier: 1.4,
    baseCPS: 25,
    icon: "⭐",
  },
];
