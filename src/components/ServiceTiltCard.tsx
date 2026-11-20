import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';

interface ServiceTiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function ServiceTiltCard({
  children,
  className = '',
  maxTilt = 5,
}: ServiceTiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tiltEnabled, setTiltEnabled] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sheenX = useMotionValue(50);
  const sheenY = useMotionValue(50);
  const isHovered = useMotionValue(0);

  const springConfig = { stiffness: 260, damping: 22, mass: 0.55 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothHover = useSpring(isHovered, { stiffness: 240, damping: 26 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const glareOpacity = useTransform(smoothHover, [0, 1], [0, 0.14]);
  const glareBackground = useMotionTemplate`radial-gradient(280px circle at ${sheenX}% ${sheenY}%, rgba(234, 4, 0, 0.45), transparent 70%)`;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia?.('(pointer: fine)').matches;
    setTiltEnabled(!reduced && Boolean(finePointer));
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEnabled || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(Math.max(-0.5, Math.min(0.5, normX)));
    mouseY.set(Math.max(-0.5, Math.min(0.5, normY)));
    sheenX.set(((e.clientX - rect.left) / rect.width) * 100);
    sheenY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseEnter = () => {
    if (!tiltEnabled) return;
    isHovered.set(1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    isHovered.set(0);
  };

  return (
    <div style={{ perspective: 950 }} className={className}>
      <motion.div
        ref={cardRef}
        data-testid="service-tilt-card"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={
          tiltEnabled
            ? {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }
            : undefined
        }
        whileHover={tiltEnabled ? { y: -4, scale: 1.012 } : undefined}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="relative h-full will-change-transform rounded-xl"
      >
        {children}
        {tiltEnabled && (
          <motion.div
            aria-hidden="true"
            style={{
              opacity: glareOpacity,
              background: glareBackground,
            }}
            className="pointer-events-none absolute inset-0 rounded-xl"
          />
        )}
      </motion.div>
    </div>
  );
}
