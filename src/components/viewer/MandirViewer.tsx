import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";

interface Hotspot {
  position: string;
  label: string;
  info: string;
}

interface Props {
  modelPath: string;
  templeName?: string;
  description?: string;
  hotspots?: Hotspot[];
}

function ModelViewer({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
}

export default function MandirViewer({ modelPath, templeName, description }: Props) {
  return (
    <div className="h-full w-full flex flex-col">
      {templeName || description ? (
        <div className="p-3 bg-black/40 text-white text-sm">
          {templeName && <div className="font-semibold">{templeName}</div>}
          {description && <div className="text-xs mt-1 opacity-80">{description}</div>}
        </div>
      ) : null}

      <div className="flex-1">
        <Canvas camera={{ position: [6, 6, 6] }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} />

          <Environment preset="sunset" />
          <ContactShadows opacity={0.4} blur={2} scale={10} />

          <ModelViewer modelPath={modelPath} />

          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
}