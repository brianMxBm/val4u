import React from "react";

interface LetterProps {
  content: string;
  signature?: string;
}

export const Letter: React.FC<LetterProps> = ({ content, signature }) => {
  return (
    <div className="font-serif space-y-6">
      <div className="text-lg leading-relaxed">{content}</div>
      {signature && (
        <div className="mt-8 text-right font-dancing-script text-xl">
          {signature}
        </div>
      )}
    </div>
  );
};
