import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, useGLTF } from "@react-three/drei";
import { Suspense, useEffect } from "react";

interface Props {
  modelPath: string;
}

function Model({ modelPath }: Props) {
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={1} />;
}

export default function ModelViewer({ modelPath }: Props) {
  return (
    <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />

      <Suspense fallback={null}>
        <Model modelPath={modelPath} />
        <Environment preset="sunset" />
        <ContactShadows opacity={0.4} blur={2} scale={20} />
      </Suspense>

      <OrbitControls enablePan enableZoom enableRotate />
    </Canvas>
  );
}