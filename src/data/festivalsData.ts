export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};

export type Festival = {
  name: string;
  month: string;
  state: string;
  religion: string;
  points: number;
  shortDesc: string;
  link: string;
  longDescPath: string;
  // Added to track available languages in the .txt file
  languages: string[]; 
  images: string[];
  quiz: QuizQuestion[];
};

export const festivalsData: Festival[] = [
  // 🟠 JANUARY
  {
    name: "Makar Sankranti",
    month: "January",
    state: "All India",
    religion: "Hindu",
    points: 30,
    shortDesc: "Harvest & Kite Festival",
    longDescPath: "/stories/sankranti.txt",
    languages: ["English", "Hindi", "Marathi"],
    link: "https://en.wikipedia.org/wiki/Makar_Sankranti",
    images: ["/images/sankranti.png"],
    quiz: [
      { question: "Makar Sankranti marks movement of?", options: ["Moon", "Sun", "Stars"], answer: "Sun" },
      { question: "What is popular activity?", options: ["Kite Flying", "Swimming", "Skiing"], answer: "Kite Flying" }
    ]
  },
  {
    name: "Lohri",
    month: "January",
    state: "Punjab",
    religion: "Sikh/Hindu",
    points: 25,
    shortDesc: "Bonfire harvest festival",
    longDescPath: "/stories/lohri.txt",
    languages: ["English", "Punjabi"],
    link: "https://en.wikipedia.org/wiki/Lohri",
    images: ["/images/lohri.png"],
    quiz: [
      { question: "Lohri involves?", options: ["Bonfire", "Rain", "Snow"], answer: "Bonfire" }
    ]
  },
  {
    name: "Pongal",
    month: "January",
    state: "Tamil Nadu",
    religion: "Hindu",
    points: 30,
    shortDesc: "Harvest festival of Tamil Nadu",
    longDescPath: "/stories/pongal.txt",
    languages: ["English", "Tamil"],
    link: "https://en.wikipedia.org/wiki/Pongal_(festival)",
    images: ["/images/pongal.png"],
    quiz: [
      { question: "Pongal is celebrated in?", options: ["Tamil Nadu", "Punjab", "Kerala"], answer: "Tamil Nadu" }
    ]
  },
  // 🟠 FEBRUARY
  {
    name: "Maha Shivaratri",
    month: "February",
    state: "All India",
    religion: "Hindu",
    points: 35,
    shortDesc: "Night of Lord Shiva",
    longDescPath: "/stories/shivaratri.txt",
    languages: ["English", "Hindi", "Sanskrit"],
    link: "https://en.wikipedia.org/wiki/Maha_Shivaratri",
    images: ["/images/shivaratri.png"],
    quiz: [
      { question: "Shivaratri is dedicated to?", options: ["Vishnu", "Shiva", "Brahma"], answer: "Shiva" },
      { question: "What is done at night?", options: ["Sleeping", "Prayer", "Games"], answer: "Prayer" }
    ]
  },
  {
    name: "Vasant Panchami",
    month: "February",
    state: "North India",
    religion: "Hindu",
    points: 25,
    shortDesc: "Festival of knowledge",
    longDescPath: "/stories/vasant.txt",
    languages: ["English", "Hindi", "Bengali"],
    link: "https://en.wikipedia.org/wiki/Vasant_Panchami",
    images: ["/images/vasant.png"],
    quiz: [
      { question: "Which goddess is worshipped?", options: ["Lakshmi", "Saraswati", "Durga"], answer: "Saraswati" }
    ]
  },
  // 🟠 MARCH
  {
    name: "Holi",
    month: "March",
    state: "All India",
    religion: "Hindu",
    points: 50,
    shortDesc: "Festival of Colors",
    longDescPath: "/stories/holi.txt",
    languages: ["English", "Hindi"],
    link: "https://en.wikipedia.org/wiki/Holi",
    images: ["/images/holi.png"],
    quiz: [
      { question: "Holi is known as?", options: ["Festival of Lights", "Festival of Colors", "Harvest Festival"], answer: "Festival of Colors" },
      { question: "What is thrown?", options: ["Water", "Colors", "Both"], answer: "Both" }
    ]
  },
  {
    name: "Hola Mohalla",
    month: "March",
    state: "Punjab",
    religion: "Sikh",
    points: 30,
    shortDesc: "Sikh martial festival",
    longDescPath: "/stories/hola.txt",
    languages: ["English", "Punjabi"],
    link: "https://en.wikipedia.org/wiki/Hola_Mohalla",
    images: ["/images/hola.png"],
    quiz: [
      { question: "Hola Mohalla shows?", options: ["Dance", "Martial Arts", "Cooking"], answer: "Martial Arts" }
    ]
  },
  // 🟠 APRIL
  {
    name: "Ugadi",
    month: "April",
    state: "Andhra Pradesh",
    religion: "Hindu",
    points: 30,
    shortDesc: "Telugu New Year",
    longDescPath: "/stories/ugadi.txt",
    languages: ["English", "Telugu", "Kannada"],
    link: "https://en.wikipedia.org/wiki/Ugadi",
    images: ["/images/ugadi.png"],
    quiz: [
      { question: "Ugadi is New Year of?", options: ["Telugu", "Tamil", "Hindi"], answer: "Telugu" },
      { question: "Pachadi represents?", options: ["Colors", "Life flavors", "Weather"], answer: "Life flavors" }
    ]
  },
  {
    name: "Eid-ul-Fitr",
    month: "April",
    state: "All India",
    religion: "Muslim",
    points: 40,
    shortDesc: "End of Ramadan",
    longDescPath: "/stories/eid.txt",
    languages: ["English", "Urdu", "Arabic"],
    link: "https://en.wikipedia.org/wiki/Eid_al-Fitr",
    images: ["/images/eid.png"],
    quiz: [
      { question: "Eid comes after?", options: ["Ramadan", "Diwali", "Holi"], answer: "Ramadan" },
      { question: "Important value?", options: ["Charity", "War", "Silence"], answer: "Charity" }
    ]
  },
  {
    name: "Baisakhi",
    month: "April",
    state: "Punjab",
    religion: "Sikh",
    points: 30,
    shortDesc: "Sikh New Year",
    longDescPath: "/stories/baisakhi.txt",
    languages: ["English", "Punjabi"],
    link: "https://en.wikipedia.org/wiki/Vaisakhi",
    images: ["/images/baisakhi.png"],
    quiz: [
      { question: "Baisakhi is new year of?", options: ["Sikhs", "Christians", "Muslims"], answer: "Sikhs" }
    ]
  },
  {
    name: "Mahavir Jayanti",
    month: "April",
    state: "All India",
    religion: "Jain",
    points: 30,
    shortDesc: "Birth of Mahavir",
    longDescPath: "/stories/mahavir.txt",
    languages: ["English", "Hindi", "Gujarati"],
    link: "https://en.wikipedia.org/wiki/Mahavir_Janma_Kalyanak",
    images: ["/images/mahavir.png"],
    quiz: [
      { question: "Mahavir belongs to?", options: ["Jainism", "Hinduism", "Islam"], answer: "Jainism" }
    ]
  },
  // 🟠 MAY
  {
    name: "Buddha Purnima",
    month: "May",
    state: "All India",
    religion: "Buddhist",
    points: 35,
    shortDesc: "Birth of Buddha",
    longDescPath: "/stories/buddha.txt",
    languages: ["English", "Hindi", "Pali"],
    link: "https://en.wikipedia.org/wiki/Vesak",
    images: ["/images/buddha.png"],
    quiz: [
      { question: "Buddha taught?", options: ["War", "Peace", "Trade"], answer: "Peace" }
    ]
  },
  // 🟠 JUNE
  {
    name: "Rath Yatra",
    month: "June",
    state: "Odisha",
    religion: "Hindu",
    points: 30,
    shortDesc: "Chariot festival",
    longDescPath: "/stories/rath.txt",
    languages: ["English", "Odia"],
    link: "https://en.wikipedia.org/wiki/Ratha_Yatra",
    images: ["/images/rath.png"],
    quiz: [
      { question: "Rath means?", options: ["Temple", "Chariot", "River"], answer: "Chariot" }
    ]
  },
  // 🟠 JULY
  {
    name: "Guru Purnima",
    month: "July",
    state: "All India",
    religion: "Hindu/Buddhist",
    points: 20,
    shortDesc: "Respect to teachers",
    longDescPath: "/stories/guru.txt",
    languages: ["English", "Hindi", "Sanskrit"],
    link: "https://en.wikipedia.org/wiki/Guru_Purnima",
    images: ["/images/guru.png"],
    quiz: [
      { question: "Guru means?", options: ["Teacher", "King", "Warrior"], answer: "Teacher" }
    ]
  },
  // 🟠 AUGUST
  {
    name: "Raksha Bandhan",
    month: "August",
    state: "All India",
    religion: "Hindu",
    points: 30,
    shortDesc: "Bond of siblings",
    longDescPath: "/stories/rakhi.txt",
    languages: ["English", "Hindi"],
    link: "https://en.wikipedia.org/wiki/Raksha_Bandhan",
    images: ["/images/rakhi.png"],
    quiz: [
      { question: "Who ties Rakhi?", options: ["Brother", "Sister", "Friend"], answer: "Sister" },
      { question: "Rakhi symbolizes?", options: ["War", "Protection", "Food"], answer: "Protection" }
    ]
  },
  {
    name: "Janmashtami",
    month: "August",
    state: "All India",
    religion: "Hindu",
    points: 35,
    shortDesc: "Birth of Krishna",
    longDescPath: "/stories/krishna.txt",
    languages: ["English", "Hindi", "Gujarati"],
    link: "https://en.wikipedia.org/wiki/Krishna_Janmashtami",
    images: ["/images/krishna.png"],
    quiz: [
      { question: "Janmashtami celebrates?", options: ["Krishna", "Rama", "Shiva"], answer: "Krishna" }
    ]
  },
  // 🟠 SEPTEMBER
  {
    name: "Ganesh Chaturthi",
    month: "September",
    state: "Maharashtra",
    religion: "Hindu",
    points: 35,
    shortDesc: "Festival of Ganesha",
    longDescPath: "/stories/ganesh.txt",
    languages: ["English", "Marathi", "Hindi"],
    link: "https://en.wikipedia.org/wiki/Ganesh_Chaturthi",
    images: ["/images/ganesh.png"],
    quiz: [
      { question: "Ganesha is known as?", options: ["Destroyer", "Remover of obstacles", "Creator"], answer: "Remover of obstacles" },
      { question: "Festival ends with?", options: ["Dance", "Immersion", "Fire"], answer: "Immersion" }
    ]
  },
  // 🟠 OCTOBER
  {
    name: "Navratri",
    month: "October",
    state: "Gujarat",
    religion: "Hindu",
    points: 40,
    shortDesc: "Nine nights of dance",
    longDescPath: "/stories/navratri.txt",
    languages: ["English", "Gujarati"],
    link: "https://en.wikipedia.org/wiki/Navaratri",
    images: ["/images/navratri.png"],
    quiz: [
      { question: "Navratri lasts?", options: ["5 days", "9 days", "10 days"], answer: "9 days" },
      { question: "Popular dance?", options: ["Garba", "Ballet", "Hip-hop"], answer: "Garba" }
    ]
  },
  {
    name: "Dussehra",
    month: "October",
    state: "All India",
    religion: "Hindu",
    points: 40,
    shortDesc: "Victory of Rama",
    longDescPath: "/stories/dussehra.txt",
    languages: ["English", "Hindi"],
    link: "https://en.wikipedia.org/wiki/Vijayadashami",
    images: ["/images/dussehra.png"],
    quiz: [
      { question: "Ravana is burned?", options: ["Yes", "No"], answer: "Yes" }
    ]
  },
  // 🟠 NOVEMBER
  {
    name: "Diwali",
    month: "November",
    state: "All India",
    religion: "Hindu",
    points: 50,
    shortDesc: "Festival of Lights",
    longDescPath: "/stories/diwali.txt",
    languages: ["English", "Hindi"],
    link: "https://en.wikipedia.org/wiki/Diwali",
    images: ["/images/diwali.png"],
    quiz: [
      { question: "Diwali symbolizes?", options: ["Darkness", "Light victory", "Rain"], answer: "Light victory" },
      { question: "Which goddess is worshipped?", options: ["Lakshmi", "Durga", "Saraswati"], answer: "Lakshmi" }
    ]
  },
  {
    name: "Chhath Puja",
    month: "November",
    state: "Bihar",
    religion: "Hindu",
    points: 35,
    shortDesc: "Sun worship festival",
    longDescPath: "/stories/chhath.txt",
    languages: ["English", "Hindi", "Bhojpuri"],
    link: "https://en.wikipedia.org/wiki/Chhath",
    images: ["/images/chhath.png"],
    quiz: [
      { question: "Chhath is for?", options: ["Sun", "Moon", "Fire"], answer: "Sun" }
    ]
  },
  // 🟠 DECEMBER
  {
    name: "Christmas",
    month: "December",
    state: "All India",
    religion: "Christian",
    points: 40,
    shortDesc: "Birth of Jesus",
    longDescPath: "/stories/christmas.txt",
    languages: ["English", "Malayalam"],
    link: "https://en.wikipedia.org/wiki/Christmas",
    images: ["/images/christmas.png"],
    quiz: [
      { question: "Christmas celebrates?", options: ["Birth of Jesus", "Harvest", "War"], answer: "Birth of Jesus" },
      { question: "What is decorated?", options: ["Christmas Tree", "Neem Tree", "Rock"], answer: "Christmas Tree" }
    ]
  },
  {
    name: "Karthigai Deepam",
    month: "December",
    state: "Tamil Nadu",
    religion: "Hindu",
    points: 30,
    shortDesc: "Festival of lamps",
    longDescPath: "/stories/deepam.txt",
    languages: ["English", "Tamil"],
    link: "https://en.wikipedia.org/wiki/Karthika_Deepam",
    images: ["/images/deepam.png"],
    quiz: [
      { question: "Deepam means?", options: ["Lamp", "Food", "Water"], answer: "Lamp" }
    ]
  }
];