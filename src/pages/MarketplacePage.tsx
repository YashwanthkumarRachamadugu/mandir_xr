import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Plus, Star, Filter, MapPin, Search } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { db } from "@/lib/firebase.ts";
import { collection, addDoc } from "firebase/firestore";
import { useEffect } from "react";
// Add query, where, and onSnapshot to this list
import { query, where, onSnapshot } from "firebase/firestore";


const products = [
  // --- TEXTILES & HANDLOOM ---
  { id: 1, name: "Banarasi Silk Saree", category: "Textiles", price: 4500, rating: 4.8, state: "Uttar Pradesh", description: "Hand-woven silk with gold zari.", image: "https://vastrang.in/cdn/shop/files/IMG_4177_360x.jpg?v=1704276315" },
  { id: 4, name: "Pashmina Shawl", category: "Textiles", price: 6000, rating: 4.9, state: "Jammu & Kashmir", description: "Pure hand-embroidered Sozni work.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNjB7pwka1mP4BOXSbhRKZ-SyZXBsg1-101g&s" },
  { id: 7, name: "Pochampally Ikat", category: "Textiles", price: 2200, rating: 4.7, state: "Telangana", description: "Double ikat geometric patterns.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-uHmR9ujwOwvZjqM54NHTKxIfqX3-zIb4GQ&s" },
  { id: 9, name: "Muga Silk Mekhela", category: "Textiles", price: 5500, rating: 4.8, state: "Assam", description: "Golden silk unique to the Brahmaputra valley.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ56EIihIOYRRIJF2nI-9aB_R0Ui5glkaaXOA&s" },
  { id: 10, name: "Sambalpuri Saree", category: "Textiles", price: 3200, rating: 4.6, state: "Odisha", description: "Traditional ikat weave with shell motifs.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXaGwti3RlC7eoDWCh8wWPLH16WXCZvEFupg&s" },
  { id: 11, name: "Phulkari Dupatta", category: "Textiles", price: 1200, rating: 4.5, state: "Punjab", description: "Floral embroidery handmade by rural artisans.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXabs2FvT7zPv2GOfxTYCSZgndAtBmq8F0zA&s" },
  { id: 12, name: "Kanjeevaram Silk", category: "Textiles", price: 8000, rating: 4.9, state: "Tamil Nadu", description: "Rich silk known for its heavy gold border." ,image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIMyP6QMCLeIsLpyAFzOpWGmm-dt1L7ngpNlIt5HmEdg&s" },

  // --- POTTERY & CERAMICS ---
  { id: 2, name: "Blue Pottery Vase", category: "Pottery", price: 1200, rating: 4.5, state: "Rajasthan", description: "Traditional blue pottery floral motifs.",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXlQNkDlapTM5z4A9Sg_3rIoPwbfpFF-wVGHWHS-iDWg&s" },
  { id: 6, name: "Terracotta Horse", category: "Pottery", price: 950, rating: 4.4, state: "West Bengal", description: "Iconic Bankura terracotta craft." ,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBB4RmmJ5hVz0DDBwQsntLDuqwMq2YiQOJmg&s"},
  { id: 13, name: "Longpi Black Pottery", category: "Pottery", price: 1800, rating: 4.7, state: "Manipur", description: "Stone and clay pottery polished with leaves." ,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwUhuAnBdlmDFTDgi8hbOfSaotLPkpu-YH3A&s"},
  { id: 14, name: "Khurja Ceramic Pot", category: "Pottery", price: 600, rating: 4.3, state: "Uttar Pradesh", description: "Glazed ceramic with vibrant hand-painting.",image :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv9BPd6ZSunLlHCQ0e3lw2HbmvkSGZicep-w&s" },

  // --- HOME DECOR & ART ---
  { id: 3, name: "Warli Art Frame", category: "Home Decor", price: 800, rating: 4.7, state: "Maharashtra", description: "Authentic tribal village life art.",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXlNnqwHy2N13ooyt0RBPYqrf5BnRa_kYEBg&s" },
  { id: 5, name: "Madhubani Painting", category: "Home Decor", price: 1500, rating: 4.6, state: "Bihar", description: "Natural dyes on handmade paper." ,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4VgwNAcaf0jdvwmI6-1KLRD1NgoZy95sEEA&s"},
  { id: 15, name: "Pattachitra Scroll", category: "Home Decor", price: 2500, rating: 4.8, state: "Odisha", description: "Cloth-based scroll painting of deities." ,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF9wooOaDu0GEZBVKMiioTG5-FKgk6b9G4QA&s"},
  { id: 16, name: "Kondapalli Toys", category: "Home Decor", price: 500, rating: 4.5, state: "Andhra Pradesh", description: "Softwood figurines depicting rural life." ,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxoATjPgV2PGq72N-qHIY-q5M0Xp4vTQNTqw&s"},
  { id: 17, name: "Bastariya Iron Craft", category: "Home Decor", price: 1400, rating: 4.6, state: "Chhattisgarh", description: "Hand-beaten wrought iron tribal figures.",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD4Pmp6a00zpsC-jxfz2Er39JZEI6xrFQy3A&s" },
  { id: 18, name: "Nirmal Paintings", category: "Home Decor", price: 3000, rating: 4.7, state: "Telangana", description: "Gold lacquer paintings on wood.",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3D6h4w9PEQw03H4LQxF8mtKO1aNldriTR-g&s" },

  // --- JEWELRY & ACCESSORIES ---
  { id: 8, name: "Dokra Necklace", category: "Jewelry", price: 1800, rating: 4.8, state: "Chhattisgarh", description: "Lost-wax cast brass jewelry." ,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB9KTWWcHmQxMfebel7FJJqJOgjkpMyTQ_dA&s"},
  { id: 19, name: "Bidriware Bangle", category: "Jewelry", price: 2100, rating: 4.7, state: "Karnataka", description: "Silver inlay work on black metal.",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNGYnDG5nX2w_oGtYM5oGQSZo31_8MlRL9tQ&s" },
  { id: 20, name: "Silver Filigree Ring", category: "Jewelry", price: 1100, rating: 4.6, state: "Himachal Pradesh", description: "Intricate silver wire craftsmanship." ,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUbzw7ytnzJ9-yz1xtYDRAXCWba1aca1TA9g&s"},
  { id: 21, name: "Lac Bangles", category: "Jewelry", price: 400, rating: 4.4, state: "Rajasthan", description: "Hand-set resin bangles with glass beads." ,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3e15pgTiD7RfDJHH8kZrTmofUMo0jyb6tXg&s"},
  { id: 27, name: "₹1/- product", category: "Jewelry", price: 1, rating: 5.0, state: "Telangana", description: "Surprize Goods by MandirXR Team." ,image:"https://img.freepik.com/free-vector/opened-surprise-gift-box_3446-340.jpg?semt=ais_incoming&w=740&q=80"},
  // --- MISC / WOODWORK ---
  { id: 22, name: "Channapatna Toys", category: "Home Decor", price: 750, rating: 4.8, state: "Karnataka", description: "Lacquered wood toys with natural dyes." ,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcsTxv7NUWBqnkc1BXS4jTsYR8LaCSEMJMog&s"},
  { id: 23, name: "Walnut Wood Box", category: "Home Decor", price: 2800, rating: 4.9, state: "Jammu & Kashmir", description: "Carved walnut wood from the valley.",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT-1i8wv10lGTavN3U1lug5xUikOXPlMGH8A&s" },
  { id: 24, name: "Sankheda Swing", category: "Home Decor", price: 15000, rating: 4.9, state: "Gujarat", description: "Traditional lacquer-painted teak furniture." ,image :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuB2PWGy9GPxqksM1Mff1ZMqbDNhguMKGexA&s"},
  { id: 25, name: "Sholapith Craft", category: "Home Decor", price: 600, rating: 4.5, state: "West Bengal", description: "Ornate sponge-wood carvings." ,image:"https://orumindicus.com/wp-content/uploads/2023/02/60.png"},
  { id: 26, name: "Coffee Wood Carving", category: "Home Decor", price: 2200, rating: 4.4, state: "Kerala", description: "Statues carved from old coffee roots.", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQI86caLjd19B0gibj4201HJSrkSFPXSMxFw&s" }
];

const categories = ["All", "Textiles", "Pottery", "Home Decor", "Jewelry"];
const states = ["All", ...Array.from(new Set(products.map(p => p.state))).sort()];

const MarketplacePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedState, setSelectedState] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(15000);
  const [cartCount, setCartCount] = useState(0);

const userId = useMemo(() => {
    const existingId = localStorage.getItem("mandir_user_id");
    if (existingId) return existingId;
    const newId = `user_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("mandir_user_id", newId);
    return newId;
  }, []);

  // Sync cart count in real-time for the specific user
  useEffect(() => {
    const q = query(collection(db, "cart"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCartCount(snapshot.size);
    });
    return () => unsubscribe();
  }, [userId]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch = selectedCategory === "All" || p.category === selectedCategory;
      const stateMatch = selectedState === "All" || p.state === selectedState;
      const priceMatch = p.price <= maxPrice;
      const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && stateMatch && priceMatch && searchMatch;
    });
  }, [selectedCategory, selectedState, maxPrice, searchQuery]);

  

  const addToFirebaseCart = async (product: any) => {
    try {
      await addDoc(collection(db, "cart"), { 
        ...product, 
        userId, 
        addedAt: new Date() 
      });
      toast.success(`${product.name} added to cart!`, { icon: <ShoppingBag size={16} /> });
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="section-padding min-h-screen bg-background">
      <div className="container mx-auto">
        
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-5xl font-display font-bold mb-4">
            Artisan <span className="text-gradient-saffron">Marketplace</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
            Preserving India's Heritage. Shop directly from regional artisans across 28 states.
          </p>
          <Link to="/cart" className="relative inline-flex items-center gap-3 px-8 py-3 rounded-full gradient-saffron text-white font-bold shadow-xl hover:scale-105 transition-transform">
            <ShoppingBag size={22} />
            <span>View My Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-primary text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-md">
                {cartCount}
              </span>
            )}
          </Link>
        </motion.div>

        {/* Search & Filters Grid */}
        <div className="glass p-8 rounded-3xl mb-12 shadow-inner">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Search Bar */}
            <div className="relative">
              <label className="text-[10px] uppercase font-bold text-primary mb-2 block">Search Products</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  type="text" placeholder="Search sarees, art..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-primary transition-all"
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="text-[10px] uppercase font-bold text-primary mb-2 block">Category</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-primary"
                value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
              </select>
            </div>

            {/* State Dropdown */}
            <div>
              <label className="text-[10px] uppercase font-bold text-primary mb-2 block">Origin State</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 outline-none focus:border-primary"
                value={selectedState} onChange={(e) => setSelectedState(e.target.value)}
              >
                {states.map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
              </select>
            </div>

            {/* Price Range */}
            {/* Price Filter */}
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">
                Max Price: <span className="text-primary font-bold">₹{maxPrice}</span>
              </label>
              <input 
                type="range" min="500" max="15000" step="100" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

          </div>
        </div>

        {/* Product Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
  <AnimatePresence mode="popLayout">
    {filteredProducts.map((product) => (
      <motion.div
        key={product.id}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass rounded-2xl overflow-hidden group border border-white/5 hover:border-primary/30 transition-all flex flex-col"
      >
        {/* --- MODIFIED IMAGE SECTION START --- */}
       <div className="h-64 relative overflow-hidden bg-muted">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-1 glass px-3 py-1 rounded-full text-[10px] font-bold shadow-sm">
                    <MapPin size={10} className="text-primary" /> {product.state}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold text-primary tracking-widest uppercase">{product.category}</span>
                    <div className="flex items-center gap-1 text-xs text-yellow-500">
                      <Star size={12} fill="currentColor" /> {product.rating}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-2 italic">"{product.description}"</p>
                  <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-2xl font-black text-gradient-saffron">₹{product.price.toLocaleString()}</span>
                    <button onClick={() => addToFirebaseCart(product)} className="p-3 rounded-xl gradient-saffron text-white shadow-lg active:scale-95 transition-all">
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
    ))}
  </AnimatePresence>
</div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-32">
            <h3 className="text-2xl font-bold text-muted-foreground">No masterpieces found...</h3>
            <p className="mb-6 text-sm">Try adjusting your filters or search keywords.</p>
            <button 
              onClick={() => {setSelectedCategory("All"); setSelectedState("All"); setSearchQuery(""); setMaxPrice(15000);}}
              className="text-primary font-bold hover:underline"
            >
              Reset all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;