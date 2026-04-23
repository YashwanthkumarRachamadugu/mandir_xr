export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

export type Scene = {
  id: number;
  textEnglish: string;
  textTelugu: string;
  animation: string;
  modelPath: string;
  scale: string;
  position: string;
};

export type CulturalEntry = {
  id: string; // Used for routing and TTS tracking
  name: string;
  month: string;
  state: string;
  religion: string;
  points: number;
  shortDesc: string;
  shortDescTelugu: string; // Fixed: Matches your error log requirement
  link: string;
  longDescPath: string;
  languages: string[]; 
  images: string[];
  quiz: QuizQuestion[];
  scenes?: Scene[]; 
};

export const culturalContext: CulturalEntry[] = [
  {
    id: "janmashtami",
    name: "Janmashtami",
    month: "August",
    state: "All India",
    religion: "Hindu",
    points: 35,
    shortDesc: "Birth of Lord Krishna",
    shortDescTelugu: "శ్రీకృష్ణ జన్మాష్టమి",
    longDescPath: "/stories/krishna.txt",
    languages: ["English", "Hindi", "Telugu"],
    link: "https://en.wikipedia.org/wiki/Krishna_Janmashtami",
    images: ["/images/krishna.png"],
    quiz: [
      { question: "Janmashtami celebrates?", options: ["Krishna", "Rama", "Shiva"], answer: "Krishna" }
    ],
    scenes: [
      {
        id: 1,
        textEnglish: "Little Krishna loved butter more than anything.",
        textTelugu: "చిన్ని కృష్ణుడు వెన్నను అమితంగా ఇష్టపడేవాడు.",
        animation: "eating",
        modelPath: "/models/little_krishna.glb",
        scale: "2.2 2.2 2.2",
        position: "0 0.5 -3"
      }
    ]
  },
  {
    id: "ugadi",
    name: "Ugadi",
    month: "April",
    state: "Andhra Pradesh",
    religion: "Hindu",
    points: 30,
    shortDesc: "Telugu New Year",
    shortDescTelugu: "ఉగాది పండుగ",
    longDescPath: "/stories/ugadi.txt",
    languages: ["English", "Telugu"],
    link: "https://en.wikipedia.org/wiki/Ugadi",
    images: ["/images/ugadi.png"],
    quiz: [{ question: "Ugadi is New Year of?", options: ["Telugu", "Tamil"], answer: "Telugu" }]
  }
];