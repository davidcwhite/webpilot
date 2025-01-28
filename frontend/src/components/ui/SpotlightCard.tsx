'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  gradient?: string;
}

export function SpotlightCard({ 
  children, 
  className,
  spotlightColor = "rgba(59, 130, 246, 0.1)",
  gradient = "from-blue-500/20 to-teal-500/20"
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-zinc-800",
        "bg-gradient-to-b from-zinc-900 to-zinc-900/50",
        "backdrop-blur-xl",
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -inset-px opacity-0 transition duration-300",
          "bg-gradient-to-r",
          gradient
        )}
        style={{ opacity }}
      />
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {children}
    </motion.div>
  );
} 