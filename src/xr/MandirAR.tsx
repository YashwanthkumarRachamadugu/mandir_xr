import { useEffect, useState } from "react";

interface Props {
  modelPath: string;
  templeName: string;
  description: string;
}

const MandirAR = ({ modelPath, templeName, description }: Props) => {
  const [showInfo, setShowInfo] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en-IN");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const handleListen = () => {
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(description);
    utterance.lang = selectedLang;

    // Match correct voice
    const matchedVoice = voices.find(v => v.lang === selectedLang);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => setIsSpeaking(false);

    setIsSpeaking(true);
    speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="relative w-full h-full">

      {/* AR Scene */}
      <a-scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false;"
      >
        <a-marker preset="hiro">
          <a-entity
            gltf-model={`url(${modelPath})`}
            scale="0.5 0.5 0.5"
            position="0 0 0"
          ></a-entity>
        </a-marker>

        <a-entity camera></a-entity>
      </a-scene>
      <a-scene embedded arjs>
        <a-marker preset="hiro">
          <a-entity gltf-model={modelPath} scale="0.5 0.5 0.5"></a-entity>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
      {/* Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex flex-wrap justify-center gap-3">

        <button
          onClick={() => setShowInfo(!showInfo)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg"
        >
          ℹ Info
        </button>

        {showInfo && (
          <>
            {/* Language Selector */}
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className="px-3 py-2 rounded-lg"
            >
              <option value="en-IN">English</option>
              <option value="hi-IN">Hindi</option>
              <option value="te-IN">Telugu</option>
              <option value="ta-IN">Tamil</option>
            </select>

            <button
              onClick={handleListen}
              disabled={isSpeaking}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              🎙️ Listen
            </button>

            <button
              onClick={handleStop}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              ⏹ Stop
            </button>
          </>
        )}
      </div>

      {/* Info Panel */}
      {showInfo && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-11/12 max-w-md bg-black/80 text-white p-4 rounded-xl">
          <h2 className="text-lg font-bold mb-2">{templeName}</h2>
          <p className="text-sm">{description}</p>
        </div>
      )}
    </div>
  );
};

export default MandirAR;