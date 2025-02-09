import { AnimatePresence, motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";

import { Envelope } from "../ui/Envelope";

export default function Scene() {
  const [isLetterVisible, setIsLetterVisible] = useState(false);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const [letterPosition, setLetterPosition] = useState({ x: 0, y: 0 });

  const handleEnvelopeClick = () => {
    if (envelopeRef.current) {
      const rect = envelopeRef.current.getBoundingClientRect();
      setLetterPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
      setIsLetterVisible(true);
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* 3D Canvas */}
      <div ref={envelopeRef} className="w-full h-full">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} />
          <pointLight position={[5, -5, -5]} intensity={0.5} />
          <Environment preset="sunset" />
          <Envelope position={[0, 0, 0]} onClick={handleEnvelopeClick} />
          <OrbitControls makeDefault />
        </Canvas>
      </div>

      {/* Letter Animation */}
      <AnimatePresence>
        {isLetterVisible && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsLetterVisible(false)}
            />

            {/* Letter */}
            <motion.div
              className="fixed z-50 bg-cream-50 rounded-lg shadow-xl overflow-hidden"
              initial={{
                x: letterPosition.x,
                y: letterPosition.y,
                width: "100px",
                height: "60px",
                scale: 0.5,
                opacity: 0,
                transformOrigin: "center",
              }}
              animate={{
                x: "50vw",
                y: "50vh",
                width: "600px",
                height: "800px",
                scale: 1,
                opacity: 1,
                transform: "translate(-50%, -50%)",
              }}
              exit={{
                x: letterPosition.x,
                y: letterPosition.y,
                width: "100px",
                height: "60px",
                scale: 0.5,
                opacity: 0,
                transformOrigin: "center",
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 120,
                mass: 0.85,
              }}
            >
              {/* Letter content with fade in */}
              <motion.div
                className="w-full h-full p-12 bg-gradient-to-b from-cream-50 to-cream-100"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                <div className="prose prose-lg max-w-none font-serif">
                  <p className="whitespace-pre-line">{letterContent}</p>
                  {signature && (
                    <p className="mt-8 text-right font-dancing-script text-2xl">
                      {signature}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setIsLetterVisible(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                             text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
