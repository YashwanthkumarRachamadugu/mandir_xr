import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage, PresentationControls } from "@react-three/drei";
import { Suspense } from "react";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
}

export const Temple3DViewer = ({ modelUrl }: { modelUrl: string }) => {
  return (
    <div className="h-[500px] w-full bg-black rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }}>
        <color attach="background" args={["#0a0a0a"]} />
        <Suspense fallback={null}>
          <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
            <Stage environment="city">
              <Model url={modelUrl} />
            </Stage>
          </PresentationControls>
        </Suspense>
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
};