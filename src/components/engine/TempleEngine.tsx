import { useMemo } from "react";
import * as THREE from "three";

interface Props {
  style: "Dravidian" | "Nagara";
  baseWidth: number;
  shikharaLevels: number;
  position?: [number, number, number];
}

export function TempleEngine({
  style,
  baseWidth,
  shikharaLevels,
  position = [0, 0, 0],
}: Props) {
  const temple = useMemo(() => {
    const group = new THREE.Group();

    const material = new THREE.MeshStandardMaterial({
      color: "#bfa76f",
      roughness: 0.9,
    });

    if (style === "Dravidian") {
      for (let i = 0; i < shikharaLevels; i++) {
        const scale = 1 - i * 0.1;

        const geometry = new THREE.BoxGeometry(
          baseWidth * scale,
          1,
          baseWidth * scale
        );

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = i;
        group.add(mesh);
      }
    }

    if (style === "Nagara") {
      for (let i = 0; i < shikharaLevels; i++) {
        const heightFactor = i / shikharaLevels;
        const radius = baseWidth * (1 - heightFactor * heightFactor);

        const geometry = new THREE.ConeGeometry(radius, 1, 32);

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = i;
        group.add(mesh);
      }
    }

    return group;
  }, [style, baseWidth, shikharaLevels]);

  return <primitive object={temple} position={position} />;
}