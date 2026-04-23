export interface Temple {
  name: string;
  location: string;
  deity: string;
  built: string;
  architecturalStyle: string;
  significance: string;
  description: string;

  // 🔥 ADD THESE (fixes your errors)
  arId?: string;     // for routing (/ar/:id)
  model?: string;    // for AR 3D model
}

export interface StateInfo {
  name: string;
  capital: string;
  culture: string;
  monuments: string[];
  festivals: string[];
  food: string[];
  temples: Temple[];
}

const statesData: Record<string, StateInfo> = {

"Andhra Pradesh": {
  name: "Andhra Pradesh",
  capital: "Amaravati",
  culture: "Sacred Tirumala hills and rich Telugu heritage.",
  monuments: ["Lepakshi Temple", "Borra Caves"],
  festivals: ["Ugadi", "Sankranti"],
  food: ["Pulihora", "Gongura Pachadi"],
temples: [
  {
    name: "Tirupati Balaji Temple",
    location: "Tirumala",
    deity: "Lord Venkateswara",
    built: "Ancient",
    architecturalStyle: "Dravidian",
    significance: "One of the richest and most visited temples in the world.",
    description: "Located in Tirumala hills attracting millions yearly."
  },
  {
    name: "Srisailam Mallikarjuna Temple",
    location: "Srisailam",
    deity: "Lord Shiva",
    built: "Ancient",
    architecturalStyle: "Dravidian",
    significance: "One of the 12 Jyotirlingas.",
    description: "Situated on Nallamala hills."
  },
  {
    name: "Kanaka Durga Temple",
    location: "Vijayawada",
    deity: "Goddess Durga",
    built: "Ancient",
    architecturalStyle: "South Indian",
    significance: "Major Shakti temple.",
    description: "Located on Indrakeeladri hill."
  }
]
},

"Arunachal Pradesh": {
  name: "Arunachal Pradesh",
  capital: "Itanagar",
  culture: "Buddhist monasteries and tribal traditions.",
  monuments: ["Tawang Monastery Complex"],
  festivals: ["Losar"],
  food: ["Thukpa", "Momos"],
temples: [
  {
    name: "Tawang Monastery",
    location: "Tawang",
    deity: "Buddha",
    built: "1680",
    architecturalStyle: "Tibetan",
    significance: "Largest monastery in India.",
    description: "Major Mahayana Buddhist center."
  },
  {
    name: "Urgyelling Monastery",
    location: "Tawang",
    deity: "Buddha",
    built: "17th century",
    architecturalStyle: "Tibetan",
    significance: "Birthplace of 6th Dalai Lama.",
    description: "Sacred monastery site."
  }
]
},

"Assam": {
  name: "Assam",
  capital: "Dispur",
  culture: "Kamakhya tradition and Bihu culture.",
  monuments: ["Rang Ghar"],
  festivals: ["Bihu"],
  food: ["Pitha", "Assam Laksa"],
temples: [
  {
    name: "Kamakhya Temple",
    location: "Guwahati",
    deity: "Goddess Kamakhya",
    built: "8th century",
    architecturalStyle: "Nagara",
    significance: "One of 51 Shakti Peethas.",
    description: "Famous for Ambubachi Mela."
  },
  {
    name: "Umananda Temple",
    location: "Peacock Island",
    deity: "Lord Shiva",
    built: "17th century",
    architecturalStyle: "Nagara",
    significance: "Smallest river island temple.",
    description: "Located on Brahmaputra river."
  }
]
},

"Bihar": {
  name: "Bihar",
  capital: "Patna",
  culture: "Land of enlightenment.",
  monuments: ["Nalanda University Ruins"],
  festivals: ["Chhath Puja"],
  food: ["Litti Chokha"],
temples: [
  {
    name: "Mahabodhi Temple",
    location: "Bodh Gaya",
    deity: "Buddha",
    built: "3rd century BCE",
    architecturalStyle: "Brick Temple",
    significance: "UNESCO World Heritage Site.",
    description: "Place where Buddha attained enlightenment."
  },
  {
    name: "Vishnupad Temple",
    location: "Gaya",
    deity: "Lord Vishnu",
    built: "18th century",
    architecturalStyle: "Nagara",
    significance: "Sacred footprint of Vishnu.",
    description: "Major pilgrimage site."
  }
]
},

"Chhattisgarh": {
  name: "Chhattisgarh",
  capital: "Raipur",
  culture: "Tribal traditions.",
  monuments: ["Sirpur Temple Complex"],
  festivals: ["Bastar Dussehra"],
  food: ["Chila"],
temples: [
  {
    name: "Bhoramdeo Temple",
    location: "Kawardha",
    deity: "Lord Shiva",
    built: "11th century",
    architecturalStyle: "Nagara",
    significance: "Khajuraho of Chhattisgarh.",
    description: "Known for carvings."
  },
  {
    name: "Danteshwari Temple",
    location: "Dantewada",
    deity: "Goddess Danteshwari",
    built: "14th century",
    architecturalStyle: "South Indian",
    significance: "One of 52 Shakti Peethas.",
    description: "Important tribal shrine."
  }
]
},

"Goa": {
  name: "Goa",
  capital: "Panaji",
  culture: "Blend of Hindu and Portuguese heritage.",
  monuments: ["Basilica of Bom Jesus"],
  festivals: ["Carnival"],
  food: ["Fish Curry"],
temples: [
  {
    name: "Mangueshi Temple",
    location: "Ponda",
    deity: "Lord Shiva",
    built: "1560",
    architecturalStyle: "Goan",
    significance: "Most famous temple in Goa.",
    description: "Dedicated to Lord Manguesh."
  },
  {
    name: "Shanta Durga Temple",
    location: "Ponda",
    deity: "Goddess Durga",
    built: "18th century",
    architecturalStyle: "Goan",
    significance: "Major goddess temple.",
    description: "Unique Goan architecture."
  }
]
},

"Gujarat": {
  name: "Gujarat",
  capital: "Gandhinagar",
  culture: "Land of Dwarka and Somnath.",
  monuments: ["Statue of Unity"],
  festivals: ["Navratri"],
  food: ["Dhokla"],
temples: [
  {
    name: "Somnath Temple",
    location: "Prabhas Patan",
    deity: "Lord Shiva",
    built: "1951",
    architecturalStyle: "Chalukya",
    significance: "First Jyotirlinga.",
    description: "Rebuilt multiple times."
  },
  {
    name: "Dwarkadhish Temple",
    location: "Dwarka",
    deity: "Lord Krishna",
    built: "15th century",
    architecturalStyle: "Nagara",
    significance: "Part of Char Dham.",
    description: "Krishna’s kingdom temple."
  }
]
},



"Haryana": {
  name: "Haryana",
  capital: "Chandigarh",
  culture: "Mahabharata heritage.",
  monuments: ["Kurukshetra"],
  festivals: ["Holi"],
  food: ["Bajra Khichdi"],
temples: [
  {
    name: "Brahma Sarovar Temple",
    location: "Kurukshetra",
    deity: "Lord Brahma",
    built: "Ancient",
    architecturalStyle: "North Indian",
    significance: "Associated with Mahabharata.",
    description: "Sacred pilgrimage site."
  },
  {
    name: "Jyotisar Temple",
    location: "Kurukshetra",
    deity: "Lord Krishna",
    built: "Ancient",
    architecturalStyle: "North Indian",
    significance: "Place where Bhagavad Gita was delivered.",
    description: "Spiritual center of Mahabharata history."
  },
  {
    name: "Sheetla Mata Temple",
    location: "Gurgaon",
    deity: "Goddess Sheetla",
    built: "18th century",
    architecturalStyle: "North Indian",
    significance: "Famous healing goddess temple.",
    description: "Visited widely during Navratri."
  }
]
},

"Himachal Pradesh": {
  name: "Himachal Pradesh",
  capital: "Shimla",
  culture: "Himalayan temples.",
  monuments: ["Kangra Fort"],
  festivals: ["Kullu Dussehra"],
  food: ["Siddu"],
temples: [
  {
    name: "Hadimba Temple",
    location: "Manali",
    deity: "Hadimba Devi",
    built: "1553",
    architecturalStyle: "Pagoda",
    significance: "Unique wooden architecture.",
    description: "Located in cedar forest."
  },
  {
    name: "Jwala Ji Temple",
    location: "Kangra",
    deity: "Goddess Jwala",
    built: "Ancient",
    architecturalStyle: "North Indian",
    significance: "One of the 51 Shakti Peethas.",
    description: "Flame emerges naturally from rock."
  },
  {
    name: "Chintpurni Temple",
    location: "Una",
    deity: "Goddess Chintpurni",
    built: "Ancient",
    architecturalStyle: "North Indian",
    significance: "Major Shakti Peetha.",
    description: "Devotees pray to remove worries."
  }
]
},

"Jharkhand": {
  name: "Jharkhand",
  capital: "Ranchi",
  culture: "Tribal spiritual traditions.",
  monuments: ["Dassam Falls"],
  festivals: ["Sarhul"],
  food: ["Thekua"],
temples: [
  {
    name: "Baidhyanath Temple",
    location: "Deoghar",
    deity: "Lord Shiva",
    built: "Ancient",
    architecturalStyle: "Nagara",
    significance: "One of 12 Jyotirlingas.",
    description: "Important Shiva shrine."
  },
  {
    name: "Rajrappa Temple",
    location: "Ramgarh",
    deity: "Goddess Chhinnamasta",
    built: "Ancient",
    architecturalStyle: "Tantric style",
    significance: "Important Shakti Peetha.",
    description: "Located at Damodar river confluence."
  },
  {
    name: "Parasnath Hill Temple",
    location: "Giridih",
    deity: "Jain Tirthankaras",
    built: "Ancient",
    architecturalStyle: "Jain temple style",
    significance: "Holiest Jain pilgrimage site.",
    description: "Sacred hill for Jain devotees."
  }
]
},

"Karnataka": {
  name: "Karnataka",
  capital: "Bengaluru",
  culture: "Hoysala and Vijayanagara heritage.",
  monuments: ["Hampi"],
  festivals: ["Mysore Dasara"],
  food: ["Bisi Bele Bath"],
temples: [
  {
    name: "Padmanabhaswamy Temple",
    location: "Thiruvananthapuram",
    deity: "Lord Vishnu",
    built: "16th century",
    architecturalStyle: "Dravidian",
    significance: "Richest temple.",
    description: "Famous vaults."
  },
  {
    name: "Guruvayur Temple",
    location: "Guruvayur",
    deity: "Lord Krishna",
    built: "Ancient",
    architecturalStyle: "Kerala style",
    significance: "Dwarka of South India.",
    description: "Major Krishna temple."
  }
]
},

// Kerala → West Bengal (same clean format)

"Kerala": {
  name: "Kerala",
  capital: "Thiruvananthapuram",
  culture: "Temple arts and Kathakali.",
  monuments: ["Bekal Fort"],
  festivals: ["Onam"],
  food: ["Sadya"],
temples: [
  {
    name: "Padmanabhaswamy Temple",
    location: "Thiruvananthapuram",
    deity: "Lord Vishnu",
    built: "16th century",
    architecturalStyle: "Dravidian",
    significance: "Richest temple.",
    description: "Famous vaults."
  },
  {
    name: "Guruvayur Temple",
    location: "Guruvayur",
    deity: "Lord Krishna",
    built: "Ancient",
    architecturalStyle: "Kerala style",
    significance: "Dwarka of South India.",
    description: "Major Krishna temple."
  }
]
},

"Madhya Pradesh": {
  name: "Madhya Pradesh",
  capital: "Bhopal",
  culture: "Heart of India with rich temple architecture.",
  monuments: ["Khajuraho Group of Monuments", "Sanchi Stupa"],
  festivals: ["Khajuraho Dance Festival"],
  food: ["Poha", "Bhutte Ka Kees"],
  temples: [{
    name: "Khajuraho Temple",
    location: "Khajuraho",
    deity: "Shiva & Vishnu",
    built: "950 AD",
    architecturalStyle: "Nagara",
    significance: "UNESCO World Heritage Site.",
    description: "Famous for detailed and artistic carvings."
  },
{
  name: "Mahakaleshwar Temple",
  location: "Ujjain",
  deity: "Lord Shiva",
  built: "Ancient",
  architecturalStyle: "Bhumija",
  significance: "One of the 12 Jyotirlingas.",
  description: "Famous for Bhasma Aarti ritual."
},
{
  name: "Omkareshwar Temple",
  location: "Omkareshwar",
  deity: "Lord Shiva",
  built: "Ancient",
  architecturalStyle: "Nagara",
  significance: "Sacred Jyotirlinga on Narmada river.",
  description: "Located on Mandhata island shaped like Om."
}]
},

"Maharashtra": {
  name: "Maharashtra",
  capital: "Mumbai",
  culture: "Bhakti tradition and Maratha heritage.",
  monuments: ["Ajanta Caves", "Gateway of India"],
  festivals: ["Ganesh Chaturthi"],
  food: ["Puran Poli", "Vada Pav"],
  temples: [{
    name: "Shirdi Sai Baba Temple",
    location: "Shirdi",
    deity: "Sai Baba",
    built: "1922",
    architecturalStyle: "Modern",
    significance: "Major pilgrimage center.",
    description: "Visited by millions every year."
  },
{
  name: "Siddhivinayak Temple",
  location: "Mumbai",
  deity: "Lord Ganesha",
  built: "1801",
  architecturalStyle: "Modern",
  significance: "One of India’s richest temples.",
  description: "Famous Ganpati temple in Mumbai."
},
{
  name: "Trimbakeshwar Temple",
  location: "Nashik",
  deity: "Lord Shiva",
  built: "18th century",
  architecturalStyle: "Nagara",
  significance: "One of 12 Jyotirlingas.",
  description: "Source of the Godavari river."
}]
},

"Manipur": {
  name: "Manipur",
  capital: "Imphal",
  culture: "Vaishnavite spiritual culture.",
  monuments: ["Kangla Fort"],
  festivals: ["Yaoshang"],
  food: ["Eromba"],
  temples: [{
    name: "Shree Govindajee Temple",
    location: "Imphal",
    deity: "Lord Krishna",
    built: "1846",
    architecturalStyle: "Vaishnav",
    significance: "Main Krishna temple of Manipur.",
    description: "Spiritual center of the state."
  },{
  name: "ISKCON Temple Imphal",
  location: "Imphal",
  deity: "Lord Krishna",
  built: "20th century",
  architecturalStyle: "Modern Vaishnav",
  significance: "Major ISKCON center in Northeast.",
  description: "Promotes Krishna Bhakti."
}]
},

"Meghalaya": {
  name: "Meghalaya",
  capital: "Shillong",
  culture: "Sacred hills and tribal beliefs.",
  monuments: ["Living Root Bridges"],
  festivals: ["Wangala Festival"],
  food: ["Jadoh"],
  temples: [{
    name: "Nartiang Durga Temple",
    location: "Jaintia Hills",
    deity: "Goddess Durga",
    built: "16th century",
    architecturalStyle: "Hill Hindu style",
    significance: "One of the 51 Shakti Peethas.",
    description: "Ancient Durga shrine in Northeast India."
  },
{
  name: "Mawjymbuin Cave Temple",
  location: "Mawsynram",
  deity: "Lord Shiva",
  built: "Natural formation",
  architecturalStyle: "Natural cave shrine",
  significance: "Naturally formed Shiva Lingam.",
  description: "Sacred cave temple."
}]
},

"Mizoram": {
  name: "Mizoram",
  capital: "Aizawl",
  culture: "Christian-majority tribal culture.",
  monuments: ["Solomon's Temple"],
  festivals: ["Chapchar Kut"],
  food: ["Bai"],
  temples: [{
    name: "Solomon's Temple",
    location: "Aizawl",
    deity: "Christian Church",
    built: "2017",
    architecturalStyle: "Modern White Structure",
    significance: "Largest church in Mizoram.",
    description: "Symbol of Christian faith in the state."
  },
{
  name: "Hanuman Temple Aizawl",
  location: "Aizawl",
  deity: "Lord Hanuman",
  built: "20th century",
  architecturalStyle: "North Indian",
  significance: "Major Hindu temple in Mizoram.",
  description: "Important for Hindu minority community."
}]
},

"Nagaland": {
  name: "Nagaland",
  capital: "Kohima",
  culture: "Tribal Christian traditions.",
  monuments: ["Kohima War Cemetery"],
  festivals: ["Hornbill Festival"],
  food: ["Smoked Pork"],
  temples: [{
    name: "Dimapur Kalibari Temple",
    location: "Dimapur",
    deity: "Goddess Kali",
    built: "20th century",
    architecturalStyle: "Bengal style",
    significance: "Important Hindu temple in Nagaland.",
    description: "Serves Hindu community of the region."
  },
{
  name: "Shiv Mandir Dimapur",
  location: "Dimapur",
  deity: "Lord Shiva",
  built: "20th century",
  architecturalStyle: "Simple Hindu style",
  significance: "Important Shiva temple.",
  description: "Serves local Hindu devotees."
}]
},

"Odisha": {
  name: "Odisha",
  capital: "Bhubaneswar",
  culture: "Jagannath spiritual tradition.",
  monuments: ["Konark Sun Temple"],
  festivals: ["Rath Yatra"],
  food: ["Dalma"],
  temples: [{
    name: "Jagannath Temple",
    location: "Puri",
    deity: "Lord Jagannath",
    built: "12th century",
    architecturalStyle: "Kalinga",
    significance: "Part of Char Dham Yatra.",
    description: "Famous for annual Rath Yatra festival."
  },
{
  name: "Lingaraj Temple",
  location: "Bhubaneswar",
  deity: "Lord Shiva",
  built: "11th century",
  architecturalStyle: "Kalinga",
  significance: "One of oldest temples in Odisha.",
  description: "Masterpiece of Kalinga architecture."
},
{
  name: "Konark Sun Temple",
  location: "Konark",
  deity: "Surya (Sun God)",
  built: "13th century",
  architecturalStyle: "Kalinga",
  significance: "UNESCO World Heritage Site.",
  description: "Temple shaped like a chariot."
}]
},

"Punjab": {
  name: "Punjab",
  capital: "Chandigarh",
  culture: "Sikh and Hindu spiritual traditions.",
  monuments: ["Golden Temple"],
  festivals: ["Baisakhi"],
  food: ["Makki Di Roti", "Sarson Da Saag"],
  temples: [{
    name: "Durgiana Temple",
    location: "Amritsar",
    deity: "Goddess Durga",
    built: "1921",
    architecturalStyle: "Golden Temple style",
    significance: "Major Hindu pilgrimage site.",
    description: "Architecturally similar to Golden Temple."
  },
{
  name: "Shiv Mandir Patiala",
  location: "Patiala",
  deity: "Lord Shiva",
  built: "19th century",
  architecturalStyle: "North Indian",
  significance: "Historic royal temple.",
  description: "Built by Patiala royal family."
}]
},

"Rajasthan": {
  name: "Rajasthan",
  capital: "Jaipur",
  culture: "Rajput and desert heritage.",
  monuments: ["Hawa Mahal", "Amber Fort"],
  festivals: ["Desert Festival"],
  food: ["Dal Baati Churma"],
  temples: [{
    name: "Eklingji Temple",
    location: "Udaipur",
    deity: "Lord Shiva",
    built: "8th century",
    architecturalStyle: "Nagara",
    significance: "Royal deity of Mewar rulers.",
    description: "Sacred Shiva temple complex."
  },
{
  name: "Brahma Temple",
  location: "Pushkar",
  deity: "Lord Brahma",
  built: "14th century",
  architecturalStyle: "Nagara",
  significance: "One of the few Brahma temples in world.",
  description: "Sacred Pushkar pilgrimage site."
},
{
  name: "Karni Mata Temple",
  location: "Deshnok",
  deity: "Karni Mata",
  built: "15th century",
  architecturalStyle: "Rajput",
  significance: "Famous Rat Temple.",
  description: "Home to sacred rats called 'Kabbas'."
}]
},

"Sikkim": {
  name: "Sikkim",
  capital: "Gangtok",
  culture: "Buddhist monasteries.",
  monuments: ["Rumtek Monastery"],
  festivals: ["Saga Dawa"],
  food: ["Momos"],
  temples: [{
    name: "Rumtek Monastery",
    location: "Gangtok",
    deity: "Buddha",
    built: "1960",
    architecturalStyle: "Tibetan",
    significance: "Major Buddhist monastery.",
    description: "Seat of Karma Kagyu lineage."
  },
{
  name: "Enchey Monastery",
  location: "Gangtok",
  deity: "Buddha",
  built: "1909",
  architecturalStyle: "Tibetan",
  significance: "200-year-old monastery.",
  description: "Sacred Buddhist site."
},
{
  name: "Golden Temple",
  location: "Amritsar",
  deity: "Waheguru",
  built: "1909",
  architecturalStyle: "Tibetan",
  significance: "16 th centuary old monastery.",
  description: "holy scriptureof sikhism."
}]
},

"Tamil Nadu": {
  name: "Tamil Nadu",
  capital: "Chennai",
  culture: "Dravidian temple architecture.",
  monuments: ["Brihadeeswarar Temple"],
  festivals: ["Pongal"],
  food: ["Idli", "Dosa"],
  temples: [{
    name: "Meenakshi Temple",
    location: "Madurai",
    deity: "Goddess Meenakshi",
    built: "17th century",
    architecturalStyle: "Dravidian",
    significance: "Iconic Tamil temple.",
    description: "Famous for colorful gopurams."
  },
{
  name: "Brihadeeswarar Temple",
  location: "Thanjavur",
  deity: "Lord Shiva",
  built: "1010 AD",
  architecturalStyle: "Dravidian",
  significance: "UNESCO World Heritage Site.",
  description: "Built by Raja Raja Chola I."
},
{
  name: "Ramanathaswamy Temple",
  location: "Rameswaram",
  deity: "Lord Shiva",
  built: "12th century",
  architecturalStyle: "Dravidian",
  significance: "Part of Char Dham Yatra.",
  description: "Longest temple corridor in India."
}]
},

"Telangana": {
  name: "Telangana",
  capital: "Hyderabad",
  culture: "Deccan temple heritage.",
  monuments: ["Charminar"],
  festivals: ["Bathukamma"],
  food: ["Hyderabadi Biryani"],
temples: [
  {
    name: "Birla Mandir",
    location: "Hyderabad",
    deity: "Lord Venkateswara",
    built: "1976",
    architecturalStyle: "White Marble",
    significance: "Famous hilltop temple.",
    description: "Overlooks Hussain Sagar Lake.",

    // 🔥 NEW (IMPORTANT)
    arId: "birla-mandir",
    model: "/models/BirlaMandir.glb"
  },
  {
    name: "Yadadri Temple",
    location: "Yadagirigutta",
    deity: "Lakshmi Narasimha",
    built: "Ancient",
    architecturalStyle: "Dravidian",
    significance: "Major Telangana temple.",
    description: "Recently renovated grand temple.",

    arId: "yadadri-temple",
    model: "/models/Yadadri.glb" // optional
  }
]
},

"Tripura": {
  name: "Tripura",
  capital: "Agartala",
  culture: "Royal Hindu traditions.",
  monuments: ["Ujjayanta Palace"],
  festivals: ["Kharchi Puja"],
  food: ["Mui Borok"],
  temples: [{
    name: "Tripura Sundari Temple",
    location: "Udaipur",
    deity: "Goddess Tripura Sundari",
    built: "1501",
    architecturalStyle: "Bengal style",
    significance: "One of 51 Shakti Peethas.",
    description: "Important eastern India pilgrimage."
  },
{
  name: "Chaturdasha Temple",
  location: "Agartala",
  deity: "14 Hindu Deities",
  built: "18th century",
  architecturalStyle: "Tripuri",
  significance: "Famous Kharchi Puja temple.",
  description: "Important royal temple."
}]
},

"Uttar Pradesh": {
  name: "Uttar Pradesh",
  capital: "Lucknow",
  culture: "Spiritual heartland of India.",
  monuments: ["Taj Mahal"],
  festivals: ["Kumbh Mela"],
  food: ["Tunday Kebab"],
  temples: [{
    name: "Kashi Vishwanath Temple",
    location: "Varanasi",
    deity: "Lord Shiva",
    built: "1780",
    architecturalStyle: "Nagara",
    significance: "One of 12 Jyotirlingas.",
    description: "Sacred temple on the banks of Ganga."
  },

{
  name: "Ram Mandir",
  location: "Ayodhya",
  deity: "Lord Rama",
  built: "2024 (Consecration: January 22, 2024)",
  architecturalStyle: "Nagara (North Indian Temple Architecture)",
  significance: "Built at the believed birthplace of Lord Ram. One of the most historically and spiritually significant temples in India.",
  description: "The grand Ram Mandir in Ayodhya was inaugurated in 2024 after decades of legal and cultural history. Constructed in traditional pink sandstone with intricate carvings, the temple represents faith, heritage, and devotion. It is expected to become one of the largest pilgrimage centers in the world.",
  arId: "ram-mandir",
  model: "/models/RamMandir.glb"
},
{
  name: "Banke Bihari Temple",
  location: "Vrindavan",
  deity: "Lord Krishna",
  built: "1864",
  architecturalStyle: "Rajasthani",
  significance: "Major Krishna temple.",
  description: "Famous for unique darshan rituals."
}]
},

"Uttarakhand": {
  name: "Uttarakhand",
  capital: "Dehradun",
  culture: "Dev Bhoomi (Land of Gods).",
  monuments: ["Valley of Flowers"],
  festivals: ["Char Dham Yatra"],
  food: ["Kafuli"],
  temples: [{
    name: "Kedarnath Temple",
    location: "Kedarnath",
    deity: "Lord Shiva",
    built: "8th century",
    architecturalStyle: "Himalayan stone",
    significance: "Part of Char Dham.",
    description: "Sacred Jyotirlinga in Himalayas."
  },

{
  name: "Banke Bihari Temple",
  location: "Vrindavan",
  deity: "Lord Krishna",
  built: "1864",
  architecturalStyle: "Rajasthani",
  significance: "Major Krishna temple.",
  description: "Famous for unique darshan rituals."
}]
},

"West Bengal": {
  name: "West Bengal",
  capital: "Kolkata",
  culture: "Durga worship and Bengal architecture.",
  monuments: ["Victoria Memorial"],
  festivals: ["Durga Puja"],
  food: ["Rasgulla"],
  temples: [{
    name: "Dakshineswar Temple",
    location: "Kolkata",
    deity: "Goddess Kali",
    built: "1855",
    architecturalStyle: "Navaratna",
    significance: "Associated with Ramakrishna.",
    description: "Important Kali temple in Bengal."
  },
{
  name: "Kalighat Temple",
  location: "Kolkata",
  deity: "Goddess Kali",
  built: "19th century",
  architecturalStyle: "Bengal",
  significance: "One of 51 Shakti Peethas.",
  description: "Major Kali worship center."
}]
}

};

export default statesData;