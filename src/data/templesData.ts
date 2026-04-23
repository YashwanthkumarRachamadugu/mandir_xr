export interface TempleData {
  id: string;
  name: string;
  state: string;
  region: "North" | "South" | "East" | "West" | "Central" | "Northeast";
  location: string;
  image: string;
  model: string;
  restoration: {
    before: string;
    after: string;
    beforeYear: string;
    afterYear: string;
    text: string;
    beforeLabel: string;
    afterLabel: string;
    details: string[];
  };
}

export const templesData: Record<string, TempleData> = {
  // --- NORTH INDIA ---
  ram: {
    id: "ram",
    name: "Ram Mandir",
    state: "Uttar Pradesh",
    region: "North",
    location: "Ayodhya",
    image: "/images/restoration/ram-after.png",
    model: "/models/ram.glb",
    restoration: {
      before: "/images/restoration/ram-before.png",
      after: "/images/restoration/ram-after.png",
      beforeYear: "1992",
      afterYear: "2026",
      text: "Restoration of the Nagara-style architecture.",
      beforeLabel: "History",
      afterLabel: "Present",
      details: ["Material: Pink Sandstone", "Style: Nagara", "Built: 2024(New)"]
    }
  },
  kashi_vishwanath: {
    id: "kashi_vishwanath",
    name: "Kashi Vishwanath Temple",
    state: "Uttar Pradesh",
    region: "North",
    location: "Varanasi",
    image: "/images/restoration/kashi-corridor.png",
    model: "/models/kashi.glb",
    restoration: {
      before: "/images/restoration/kashi-old.png",
      after: "/images/restoration/kashi-corridor.png",
      beforeYear: "1925",
      afterYear: "2026",
      text: "The massive corridor expansion connecting the temple to the Ganga Ghats.",
      beforeLabel: "History",
      afterLabel: "Present",
      details: ["Area: 5 Lakh sq.ft", "Opened: 2021", "Significance: Jyotirlinga"]
    }
  },
  kedarnath: {
    id: "kedarnath",
    name: "Kedarnath Temple",
    state: "Uttarakhand",
    region: "North",
    location: "Rudraprayag",
    image: "/images/restoration/kedarnath-now.png",
    model: "/models/kedarnath.glb",
    restoration: {
      before: "/images/restoration/kedarnath-2013.png",
      after: "/images/restoration/kedarnath-now.png",
      beforeYear: "2012",
      afterYear: "2026",
      text: "Surviving the 2013 floods and the subsequent precinct redevelopment.",
      beforeLabel: "Post-Flood",
      afterLabel: "Restored Plaza",
      details: ["Altitude: 3583m", "Material: Massive Stone Slabs", "Era: 8th Century"]
    }
  },

  // --- SOUTH INDIA ---
  tirupati_balaji: {
    id: "tirupati_balaji",
    name: "Tirupati Balaji Temple",
    state: "Andhra Pradesh",
    region: "South",
    location: "Tirumala",
    image: "/images/restoration/tirupati-gold.png",
    model: "/models/tirupati.glb",
    restoration: {
      before: "/images/restoration/tirupati-old.jpeg",
      after: "/images/restoration/tirupati-gold.png",
      beforeYear: "1938",
      afterYear: "2026",
      text: "Preservation of the Ananda Nilayam (Golden Gilded Dome).",
      beforeLabel: "Traditional Dome",
      afterLabel: "Gold Gilded",
      details: ["Style: Dravidian", "Richest Temple in World", "Deity: Lord Venkateswara"]
    }
  },
  meenakshi: {
    id: "meenakshi",
    name: "Meenakshi Amman Temple",
    state: "Tamil Nadu",
    region: "South",
    location: "Madurai",
    image: "/images/restoration/meenakshi-bright.png",
    model: "/models/meenakshi.glb",
    restoration: {
      before: "/images/restoration/meenakshi-faded.png",
      after: "/images/restoration/meenakshi-bright.png",
      beforeYear: "1890",
      afterYear: "2026",
      text: "Vibrant restoration of the 14 iconic multi-colored Gopurams.",
      beforeLabel: "Faded Sculptures",
      afterLabel: "Polychrome Finish",
      details: ["Sculptures: 33,000+", "Gopurams: 14", "River: Vaigai"]
    }
  },
  padmanabhaswamy: {
    id: "padmanabhaswamy",
    name: "Padmanabhaswamy Temple",
    state: "Kerala",
    region: "South",
    location: "Thiruvananthapuram",
    image: "/images/restoration/padmanabha-clean.png",
    model: "/models/padmanabha.glb",
    restoration: {
      before: "/images/restoration/padmanabha-old.png",
      after: "/images/restoration/padmanabha-clean.png",
      beforeYear: "1924",
      afterYear: "2026",
      text: "Preservation of the 7-tier Gopuram and the world's most valuable vaults.",
      beforeLabel: "Weathered Stone",
      afterLabel: "Pristine Facade",
      details: ["Style: Chera/Dravidian", "Deity: Lord Vishnu", "Richest Vaults"]
    }
  },

  // --- WEST INDIA ---
  somnath: {
    id: "somnath",
    name: "Somnath Mandir",
    state: "Gujarat",
    region: "West",
    location: "Prabhas Patan",
    image:"/images/restoration/somnath-final.png",
    model: "/models/somnath.glb",
    restoration: {
      before: "/images/restoration/somnath-ruins.png",
      after: "/images/restoration/somnath-final.png",
      beforeYear: "1895",
      afterYear: "2026",
      text: "The final post-independence reconstruction in the Solanki style.",
      beforeLabel: "History",
      afterLabel: "Rebuilt Glory",
      details: ["First Jyotirlinga", "Style: Maru-Gurjara", "Location: Arabian Sea Front"]
    }
  },
  shirdi_sai: {
    id: "shirdi_sai",
    name: "Shirdi Sai Baba Temple",
    state: "Maharashtra",
    region: "West",
    location: "Shirdi",
    image: "/images/restoration/shirdi-gold.png",
    model: "/models/shirdi.glb",
    restoration: {
      before: "/images/restoration/shirdi-samadhi-old.png",
      after: "/images/restoration/shirdi-gold.png",
      beforeYear: "1915",
      afterYear: "2026",
      text: "Modernization of the Samadhi Mandir with gold-gilded interiors.",
      beforeLabel: "Simple Mandir",
      afterLabel: "Gold Throne",
      details: ["Deity: Sai Baba", "Visit: 25,000+ daily", "Material: Gold and Marble"]
    }
  },

  // --- EAST INDIA ---
  jagannath: {
    id: "jagannath",
    name: "Jagannath Temple",
    state: "Odisha",
    region: "East",
    location: "Puri",
    image: "/images/restoration/jagannath-exposed.png",
    model: "/models/jagannath.glb",
    restoration: {
      before: "/images/restoration/jagannath-plastered.png",
      after: "/images/restoration/jagannath-exposed.png",
      beforeYear: "1857",
      afterYear: "2026",
      text: "Removal of centuries-old lime plaster to reveal original stone carvings.",
      beforeLabel: "Plastered Surface",
      afterLabel: "Exposed Stone",
      details: ["Era: 12th Century", "Event: Rath Yatra", "Feature: Nilachakra"]
    }
  },
  dakshineswar: {
    id: "dakshineswar",
    name: "Dakshineswar Kali Temple",
    state: "West Bengal",
    region: "East",
    location: "Kolkata",
    image: "/images/restoration/dakshineswar-thumb.jpg",
    model: "/models/dakshineswar.glb",
    restoration: {
      before: "/images/restoration/dakshineswar-old.jpg",
      after: "/images/restoration/dakshineswar-skywalk.jpg",
      beforeYear: "2015",
      afterYear: "2018",
      text: "Construction of the modern Skywalk for crowd management.",
      beforeLabel: "Congested Path",
      afterLabel: "Modern Skywalk",
      details: ["Style: Nava-ratna", "Founder: Rani Rashmoni", "River: Hooghly"]
    }
  },

  // --- NORTHEAST INDIA ---
  tawang: {
    id: "tawang",
    name: "Tawang Monastery",
    state: "Arunachal Pradesh",
    region: "Northeast",
    location: "Tawang",
    image: "/images/restoration/tawang-thumb.jpg",
    model: "/models/tawang.glb",
    restoration: {
      before: "/images/restoration/tawang-original.jpg",
      after: "/images/restoration/tawang-restored.jpg",
      beforeYear: "1960",
      afterYear: "2024",
      text: "Renovation of the 18-foot Buddha statue and the Assembly Hall.",
      beforeLabel: "Faded Murals",
      afterLabel: "Gold Leaf Finish",
      details: ["Altitude: 10,000ft", "Founded: 1680", "Capacity: 450 Monks"]
    }
    },
  goldenTemple: {
  id: "golden-temple",
  name: "Golden Temple",
  state: "Punjab",
  region: "North",
  location: "Amritsar",
  image: "/images/restoration/golden-temple-thumb.jpg",
  model: "/models/golden-temple.glb",
  restoration: {
    before: "/images/restoration/golden-temple-original.jpg",
    after: "/images/restoration/golden-temple-restored.jpg",
    beforeYear: "1800s",
    afterYear: "2024",
    text: "Restoration and re-gilding of the sanctum with gold plating and marble maintenance.",
    beforeLabel: "Worn Gold Layer",
    afterLabel: "Refined Gold Plating",
    details: ["Founded: 1581", "Founder: Guru Arjan Dev Ji", "Material: Gold-plated Copper & Marble"]
  }
    
},
  kamakhya: {
    id: "kamakhya",
    name: "Kamakhya Temple",
    state: "Assam",
    region: "Northeast",
    location: "Guwahati",
    image: "/images/restoration/kamakhya-thumb.jpg",
    model: "/models/kamakhya.glb",
    restoration: {
      before: "/images/restoration/kamakhya-dome-old.jpg",
      after: "/images/restoration/kamakhya-gold.jpg",
      beforeYear: "2010",
      afterYear: "2020",
      text: "The plating of the temple domes with gold.",
      beforeLabel: "Stone Domes",
      afterLabel: "Gold-Plated Domes",
      details: ["Shakti Peeth", "Style: Nilachal", "Event: Ambubachi Mela"]
    }
  },

  // --- CENTRAL INDIA ---
  khajuraho: {
    id: "khajuraho",
    name: "Kandariya Mahadeva",
    state: "Madhya Pradesh",
    region: "Central",
    location: "Khajuraho",
    image: "/images/restoration/khajuraho-thumb.jpg",
    model: "/models/khajuraho.glb",
    restoration: {
      before: "/images/restoration/khajuraho-weathered.jpg",
      after: "/images/restoration/khajuraho-cleaned.jpg",
      beforeYear: "1900",
      afterYear: "2024",
      text: "Preservation of the sandstone carvings through chemical cleaning.",
      beforeLabel: "Eroded Surface",
      afterLabel: "Preserved Detail",
      details: ["Era: Chandela Dynasty", "UNESCO Site", "Theme: Nagara Architecture"]
    }
  }
};