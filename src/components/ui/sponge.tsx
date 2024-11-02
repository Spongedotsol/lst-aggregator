import React from 'react';

interface SpongeBubbleProps {
  color: string;
  size: string;
  top: number;
  left: number;
}

const SpongeBubble = ({ color, size, top, left }: SpongeBubbleProps) => (
  <div
    className={`absolute rounded-full ${size} ${color} opacity-30 animate-float`}
    style={{ top: `${top}%`, left: `${left}%` }}
  />
);

const SpongeBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <SpongeBubble color="bg-yellow-600" size="w-24 h-24" top={10} left={5} />
    <SpongeBubble color="bg-blue-600" size="w-32 h-32" top={30} left={80} />
    <SpongeBubble color="bg-purple-600" size="w-40 h-40" top={60} left={20} />
    <SpongeBubble color="bg-pink-600" size="w-28 h-28" top={80} left={70} />
    <SpongeBubble color="bg-orange-600" size="w-36 h-36" top={40} left={40} />
  </div>
);

export default SpongeBackground;
