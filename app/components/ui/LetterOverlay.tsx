// LetterOverlay.tsx

import { AnimatePresence, motion } from "framer-motion";

import React from "react";

interface LetterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position: { x: number; y: number };
}

export const LetterOverlay: React.FC<LetterOverlayProps> = ({
  isOpen,
  onClose,
  children,
  position,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Letter content */}
          <motion.div
            className="fixed z-50 bg-cream-50 shadow-xl rounded-lg overflow-hidden"
            initial={{
              opacity: 0,
              x: position.x,
              y: position.y,
              scale: 0.1,
              rotate: 0,
            }}
            animate={{
              opacity: 1,
              x: "50%",
              y: "50%",
              scale: 1,
              rotate: 0,
              transform: "translate(-50%, -50%)",
            }}
            exit={{
              opacity: 0,
              x: position.x,
              y: position.y,
              scale: 0.1,
              rotate: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            <div className="relative w-[600px] min-h-[400px] p-8 bg-gradient-to-b from-cream-50 to-cream-100">
              {children}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
