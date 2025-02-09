import { type Vector3 } from "three";
import * as THREE from "three";
import { animated, useSpring } from "@react-spring/three";
import { useRef, useState } from "react";
import { colors } from "@/app/utils/theme/colors";
import { useFrame } from "@react-three/fiber";
import { type Group } from "three";

interface EnvelopeProps {
  position?: [number, number, number];
  onClick?: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({
  position = [0, 0, 0],
  onClick,
}) => {
  const groupRef = useRef<Group>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLetterAnimating, setIsLetterAnimating] = useState(false);

  // Combined springs for envelope and letter animations
  const [springs, api] = useSpring(() => ({
    flapRotation: Math.PI / 2,
    letterPosition: 0,
    letterRotation: 0,
    letterScale: 1,
    letterY: 0,
    config: {
      mass: 1,
      tension: 120,
      friction: 14,
    },
  }));

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime) * 0.03;
    }
  });

  const geometries = createGeometries();

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsLetterAnimating(true);

      // Animate letter emerging from envelope
      api.start({
        to: async (next) => {
          // Open flap
          await next({
            flapRotation: -Math.PI / 2,
            config: { tension: 120, friction: 14 },
          });

          // Letter emerges and floats up
          await next({
            letterY: 2,
            letterRotation: -Math.PI / 2,
            letterScale: 1.2,
            config: { tension: 80, friction: 10 },
          });

          // Trigger transition to 2D overlay
          onClick?.();
        },
      });
    }
  };

  return (
    <group ref={groupRef} position={position as Vector3}>
      {/* Base envelope */}
      <mesh
        geometry={geometries.envelope}
        onClick={handleClick}
        castShadow
        receiveShadow
        position={[0, 0, -0.01]}
      >
        <meshStandardMaterial
          color={colors.mauve[50]}
          side={THREE.DoubleSide}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Envelope outline */}
      <lineSegments position={[0, 0, -0.01]}>
        <edgesGeometry args={[geometries.envelope]} />
        <lineBasicMaterial color="black" linewidth={2} />
      </lineSegments>

      {/* Diagonal lines */}
      <lineSegments position={[0, 0, 0.01]}>
        <edgesGeometry args={[geometries.bottomDiagonal]} />
        <lineBasicMaterial color="black" opacity={0.3} transparent />
      </lineSegments>
      <lineSegments position={[0, 0, 0.01]}>
        <edgesGeometry args={[geometries.topDiagonal]} />
        <lineBasicMaterial color="black" opacity={0.3} transparent />
      </lineSegments>

      {/* Animated letter inside envelope */}
      <animated.group
        position-y={springs.letterY}
        scale-x={springs.letterScale}
        scale-y={springs.letterScale}
        rotation-x={springs.letterRotation}
      >
        <mesh geometry={geometries.letter}>
          <meshStandardMaterial
            color="#FFFFFF"
            side={THREE.DoubleSide}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[geometries.letter]} />
          <lineBasicMaterial color="black" opacity={0.3} transparent />
        </lineSegments>
      </animated.group>

      {/* Animated flap */}
      <animated.group rotation-x={springs.flapRotation} position={[0, 1, 0.02]}>
        <mesh geometry={geometries.flap} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color={colors.mauve[50]}
            side={THREE.DoubleSide}
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>
        <lineSegments rotation={[Math.PI / 2, 0, 0]}>
          <edgesGeometry args={[geometries.flap]} />
          <lineBasicMaterial color="black" linewidth={2} />
        </lineSegments>
      </animated.group>
    </group>
  );
};

function createGeometries() {
  const extrudeSettings = {
    depth: 0.05,
    bevelEnabled: false,
  };

  // Base envelope shape
  const envelopeShape = new THREE.Shape();
  envelopeShape.moveTo(-1.5, -1);
  envelopeShape.lineTo(1.5, -1);
  envelopeShape.lineTo(1.5, 1);
  envelopeShape.lineTo(-1.5, 1);
  envelopeShape.lineTo(-1.5, -1);

  // Flap shape
  const flapShape = new THREE.Shape();
  flapShape.moveTo(-1.48, 0);
  flapShape.lineTo(0, 1.2);
  flapShape.lineTo(1.48, 0);
  flapShape.lineTo(-1.48, 0);

  // Letter shape (slightly smaller than envelope)
  const letterShape = new THREE.Shape();
  letterShape.moveTo(-1.3, -0.8);
  letterShape.lineTo(1.3, -0.8);
  letterShape.lineTo(1.3, 0.8);
  letterShape.lineTo(-1.3, 0.8);
  letterShape.lineTo(-1.3, -0.8);

  // Diagonal lines
  const bottomDiagonalLinesShape = new THREE.Shape();
  bottomDiagonalLinesShape.moveTo(-1.5, -1);
  bottomDiagonalLinesShape.lineTo(0, 0);
  bottomDiagonalLinesShape.lineTo(1.5, -1);

  const topDiagonalLinesShape = new THREE.Shape();
  topDiagonalLinesShape.moveTo(-1.5, 1);
  topDiagonalLinesShape.lineTo(0, 0);
  topDiagonalLinesShape.lineTo(1.5, 1);

  return {
    envelope: new THREE.ExtrudeGeometry(envelopeShape, extrudeSettings),
    flap: new THREE.ExtrudeGeometry(flapShape, extrudeSettings),
    letter: new THREE.ExtrudeGeometry(letterShape, {
      ...extrudeSettings,
      depth: 0.02,
    }),
    bottomDiagonal: new THREE.ExtrudeGeometry(
      bottomDiagonalLinesShape,
      extrudeSettings
    ),
    topDiagonal: new THREE.ExtrudeGeometry(
      topDiagonalLinesShape,
      extrudeSettings
    ),
  };
}
