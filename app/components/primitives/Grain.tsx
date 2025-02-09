export const NoiseFilter = () => {
  return (
    <>
      <svg className="pointer-events-none fixed inset-0 h-full w-full">
        <filter id="grainy">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.70"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainy)" opacity="0.15" />
      </svg>
    </>
  );
};
