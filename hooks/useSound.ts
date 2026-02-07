import { useCallback, useRef } from 'react';

// Web Audio API 기반 사운드 생성
export function useSound() {
    const audioContextRef = useRef<AudioContext | null>(null);

    const getAudioContext = useCallback(() => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return audioContextRef.current;
    }, []);

    // 클릭 효과음 (짧은 팝 사운드)
    const playClick = useCallback(() => {
        try {
            const ctx = getAudioContext();
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(800, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);

            gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.1);
        } catch (e) {
            console.warn('Sound playback failed:', e);
        }
    }, [getAudioContext]);

    // 레벨업 성공 효과음 (상승하는 멜로디)
    const playSuccess = useCallback(() => {
        try {
            const ctx = getAudioContext();
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

            notes.forEach((freq, i) => {
                const oscillator = ctx.createOscillator();
                const gainNode = ctx.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(ctx.destination);

                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(freq, ctx.currentTime);

                const startTime = ctx.currentTime + i * 0.1;
                gainNode.gain.setValueAtTime(0, startTime);
                gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
                gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

                oscillator.start(startTime);
                oscillator.stop(startTime + 0.2);
            });
        } catch (e) {
            console.warn('Sound playback failed:', e);
        }
    }, [getAudioContext]);

    // 레벨업 실패 효과음 (하락하는 톤)
    const playFail = useCallback(() => {
        try {
            const ctx = getAudioContext();
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(300, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);

            gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.3);
        } catch (e) {
            console.warn('Sound playback failed:', e);
        }
    }, [getAudioContext]);

    // 코인 획득 효과음
    const playCoin = useCallback(() => {
        try {
            const ctx = getAudioContext();
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
            oscillator.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.05); // E6

            gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.1);
        } catch (e) {
            console.warn('Sound playback failed:', e);
        }
    }, [getAudioContext]);

    // 햅틱 피드백 (진동)
    const vibrateLight = useCallback(() => {
        if ('vibrate' in navigator) {
            navigator.vibrate(10);
        }
    }, []);

    const vibrateSuccess = useCallback(() => {
        if ('vibrate' in navigator) {
            navigator.vibrate([50, 30, 100]);
        }
    }, []);

    const vibrateFail = useCallback(() => {
        if ('vibrate' in navigator) {
            navigator.vibrate([100, 50, 100]);
        }
    }, []);

    return {
        playClick,
        playSuccess,
        playFail,
        playCoin,
        vibrateLight,
        vibrateSuccess,
        vibrateFail,
    };
}
