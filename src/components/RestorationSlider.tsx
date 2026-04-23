import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface RestorationSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  description?: string;
}

const RestorationSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = "1920 (Before)",
  afterLabel = "2024 (After)",
  description = "Restoration using traditional techniques.",
}: RestorationSliderProps) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const relativeX = x - rect.left;
    const percentage = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));
    setSliderPos(percentage);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 bg-[#FDF8F1] rounded-3xl">
      <div
        ref={containerRef}
        className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-ew-resize shadow-xl border-4 border-white select-none"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {/* Before Image */}
        <img
          src={beforeImage}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-md text-xs backdrop-blur-sm z-20">
          {beforeLabel}
        </div>

        {/* After Image (Overlay) */}
        <div
          className="absolute inset-0 w-full h-full z-10"
          style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
        >
          <img
            src={afterImage}
            alt="After"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 bg-orange-800/80 text-white px-3 py-1 rounded-md text-xs backdrop-blur-sm">
            {afterLabel}
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-30"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-orange-800">
            <div className="flex gap-0.5 text-orange-800">
              <ChevronLeft size={14} />
              <ChevronRight size={14} />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-gray-700 font-medium text-sm italic">
        {description}
      </p>
    </div>
  );
};

export default RestorationSlider;