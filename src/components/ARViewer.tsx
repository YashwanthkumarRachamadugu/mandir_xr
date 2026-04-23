import React from "react";

const ARViewer = ({
  model,
  name,
}: {
  model: string;
  name: string;
}) => {
  return (
    <model-viewer
      src={model}
      alt={name}
      ar
      ar-modes="webxr scene-viewer quick-look"
      camera-controls
      auto-rotate
      shadow-intensity="1"
      exposure="1"
      environment-image="neutral"
      style={{ width: "100%", height: "420px" }}
    >
      <button
        slot="ar-button"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 gradient-saffron text-white px-4 py-2 rounded-lg shadow-lg"
      >
        🕶 View in your space
      </button>
    </model-viewer>
  );
};

export default ARViewer;