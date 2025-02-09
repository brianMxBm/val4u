// EnvelopeContainer.tsx

import React, { useRef, useState } from "react";

import { Envelope } from "./Envelope";
import { Letter } from "./Letter";
import { LetterOverlay } from "./LetterOverlay";

type EnvelopeContainerProps = {
  letterContent: string;
  signature?: string;
};

export const EnvelopeContainer: React.FC<EnvelopeContainerProps> = ({
  letterContent,
  signature,
}) => {
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [envelopePosition, setEnvelopePosition] = useState({ x: 0, y: 0 });
  const envelopeRef = useRef<HTMLDivElement>(null);

  const handleEnvelopeOpen = () => {
    if (envelopeRef.current) {
      const rect = envelopeRef.current.getBoundingClientRect();
      setEnvelopePosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
      setIsLetterOpen(true);
    }
  };

  return (
    <>
      <div ref={envelopeRef}>
        <Envelope onClick={handleEnvelopeOpen} />
      </div>

      <LetterOverlay
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
        position={envelopePosition}
      >
        <Letter content={letterContent} signature={signature} />
      </LetterOverlay>
    </>
  );
};
