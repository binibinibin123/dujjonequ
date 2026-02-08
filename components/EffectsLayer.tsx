import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface EffectsLayerProps {
    levelColor: string;
    trigger: number;
}

export default function EffectsLayer({ levelColor, trigger }: EffectsLayerProps) {
    const prevTrigger = useRef(trigger);

    useEffect(() => {
        // Only fire when trigger actually changes (and not on first render with 0)
        if (trigger === prevTrigger.current || trigger === 0) {
            prevTrigger.current = trigger;
            return;
        }
        prevTrigger.current = trigger;

        // Get level color in hex format for confetti
        const colors = [levelColor, '#fbbf24', '#ec4899', '#8b5cf6', '#10b981', '#ffffff'];

        // Fire multiple bursts for a spectacular effect

        // Center burst - main explosion
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: colors,
            startVelocity: 45,
            gravity: 1.2,
            scalar: 1.2,
            ticks: 200
        });

        // Side cannons for extra flair
        setTimeout(() => {
            // Left side
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors,
                startVelocity: 55,
            });
            // Right side
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors,
                startVelocity: 55,
            });
        }, 100);

        // Firework-style stars
        setTimeout(() => {
            confetti({
                particleCount: 30,
                spread: 360,
                origin: { x: 0.5, y: 0.4 },
                colors: ['#FFD700', '#FFA500', '#ffffff'],
                startVelocity: 30,
                scalar: 0.8,
                shapes: ['star'],
                gravity: 0.8,
            });
        }, 200);

        // Final shower
        setTimeout(() => {
            confetti({
                particleCount: 80,
                angle: 90,
                spread: 120,
                origin: { x: 0.5, y: 0 },
                colors: colors,
                startVelocity: 25,
                gravity: 1.5,
                ticks: 300
            });
        }, 400);

    }, [trigger, levelColor]);

    // This component doesn't render anything visible - confetti creates its own canvas
    return null;
}
