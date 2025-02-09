"use client";

import { useEffect, useState } from "react";

import { HeartIcon } from "../svgs/Heart";
import { motion } from "framer-motion";

interface Heart {
  id: number;
  startX: number;
  scale: number;
  duration: number;
  delay: number;
  color: string;
}

const COLORS = [
  "rgb(255, 105, 180)", // hot pink
  "rgb(255, 20, 147)", // deep pink
];

const random = (min: number, max: number) => Math.random() * (max - min) + min;

const generateHearts = (): Heart[] => {
  const items: Heart[] = [];
  const columns = 12;
  const heartsPerColumn = 15;

  for (let col = 0; col < columns; col++) {
    const baseX = (col * 100) / columns;

    for (let i = 0; i < heartsPerColumn; i++) {
      const startX = baseX + random(-5, 5);
      items.push({
        id: col * heartsPerColumn + i,
        startX,
        scale: random(3, 3.5),
        duration: random(1, 2),
        delay: random(2, 3),
        color: COLORS[Math.floor(random(0, COLORS.length))],
      });
    }
  }
  return items;
};

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    setHearts(generateHearts());
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{
            x: `${heart.startX}vw`,
            y: "110vh",
            scale: heart.scale,
            opacity: 1,
          }}
          animate={{
            y: "-10vh",
            opacity: [1, 1, 1, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "easeOut",
            times: [0, 0.1, 0.9, 1],
          }}
          className="absolute w-16 h-16"
          style={{ zIndex: Math.floor(heart.scale * 10) }}
        >
          <div className="w-full h-full">
            <HeartIcon
              className="w-full h-full filter blur-[0.5px]"
              fill={heart.color}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
