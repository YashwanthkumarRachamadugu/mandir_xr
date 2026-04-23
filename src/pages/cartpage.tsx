import { useEffect, useState } from "react";
import { db } from "@/lib/firebase.ts";
import { collection, query, where, onSnapshot, deleteDoc, doc,addDoc, writeBatch } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, CreditCard, ChevronLeft, MapPin, ShoppingBag, Loader2, X, CheckCircle2, Mail, User, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const CartPage = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  
  // Checkout States: 'idle' | 'details' | 'qr' | 'success'
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'details' | 'qr' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: "", email: "" });

  const userId = localStorage.getItem("mandir_user_id") || "guest_default";

  useEffect(() => {
    const q = query(collection(db, "cart"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cartData = snapshot.docs.map(document => ({
        ...document.data(),
        cartItemId: document.id,
      }));
      setItems(cartData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [userId]);

  const subtotal = items.reduce((acc, item) => acc + (Number(item.price) || 0), 0);

  const removeItem = async (firebaseDocId: string) => {
    setIsDeleting(firebaseDocId);
    try {
      await deleteDoc(doc(db, "cart", firebaseDocId));
      toast.success("Removed from cart");
    } catch (error) {
      toast.error("Error removing item");
    } finally {
      setIsDeleting(null);
    }
  };

  const handlePaymentSuccess = async () => {
  try {
    // 1. Prepare the Order Data
    const orderData = {
      customerName: formData.name,
      customerEmail: formData.email,
      userId: userId,
      items: items.map(item => ({
        name: item.name,
        price: item.price,
        category: item.category,
        state: item.state
      })),
      totalAmount: subtotal,
      orderDate: new Date(),
      status: "Paid"
    };

    // 2. Save to "orders" collection
    await addDoc(collection(db, "orders"), orderData);

    // 3. Clear the cart using a Batch (Atomic operation)
    const batch = writeBatch(db);
    items.forEach((item) => {
      const docRef = doc(db, "cart", item.cartItemId);
      batch.delete(docRef);
    });
    
    await batch.commit();

    // 4. Update UI
    setCheckoutStep('success');
    toast.success("Order confirmed and saved!");

  } catch (error) {
    console.error("Order Error:", error);
    toast.error("Payment verified, but failed to save order. Contact support.");
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="min-h-screen section-padding bg-background relative">
      <div className="container mx-auto">
        <Link to="/marketplace" className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-primary transition-all group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1" />
          <span className="font-medium">Return to Marketplace</span>
        </Link>

        <h1 className="text-4xl font-display font-bold mb-10 text-foreground">
          Your <span className="text-gradient-saffron">Heritage Cart</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {items.length === 0 && checkoutStep !== 'success' ? (
                <motion.div className="glass p-16 rounded-3xl text-center border-dashed border-white/10">
                  <ShoppingBag size={64} className="mx-auto text-muted-foreground mb-6 opacity-10" />
                  <p className="text-muted-foreground text-xl">Your cart is empty.</p>
                </motion.div>
              ) : (
                items.map((item) => (
                  <motion.div key={item.cartItemId} layout exit={{ opacity: 0, scale: 0.95 }} className="glass p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-6 border border-white/5">
                    <div className="flex items-center gap-6 w-full">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-bold text-foreground">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.state}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="text-xl font-bold text-gradient-saffron">₹{item.price?.toLocaleString()}</span>
                      <button onClick={() => removeItem(item.cartItemId)} className="text-red-500/60 hover:text-red-500 transition-colors">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
          <div className="space-y-6">
            <motion.div className="glass p-8 rounded-3xl h-fit border border-primary/10 shadow-2xl">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-muted-foreground font-medium">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between text-2xl font-black">
                  <span>Total</span>
                  <span className="text-gradient-saffron">₹{subtotal.toLocaleString()}</span>
                </div>
              </div>
              <button 
                onClick={() => setCheckoutStep('details')}
                disabled={items.length === 0} 
                className="w-full py-4 gradient-saffron rounded-2xl font-bold flex items-center justify-center gap-3 text-white shadow-lg active:scale-95 transition-all disabled:opacity-30"
              >
                <CreditCard size={22} /> Confirm & Pay
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- CHECKOUT OVERLAY --- */}
      <AnimatePresence>
        {checkoutStep !== 'idle' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="glass p-8 rounded-3xl max-w-md w-full border border-white/10 relative overflow-hidden"
            >
              {checkoutStep !== 'success' && (
                <button 
                  onClick={() => setCheckoutStep('idle')} 
                  className="absolute top-4 right-4 text-muted-foreground hover:text-white"
                >
                  <X size={24} />
                </button>
              )}

              {/* STEP 1: Name & Email */}
              {checkoutStep === 'details' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-center">Customer Details</h2>
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={18} />
                      <input 
                        type="text" placeholder="Full Name" required
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-primary"
                        value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={18} />
                      <input 
                        type="email" placeholder="Email Address" required
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 outline-none focus:border-primary"
                        value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <button 
                    disabled={!formData.name || !formData.email}
                    onClick={() => setCheckoutStep('qr')}
                    className="w-full py-4 gradient-saffron rounded-2xl font-bold shadow-lg disabled:opacity-50"
                  >
                    Generate Payment QR
                  </button>
                </div>
              )}

              {/* STEP 2: QR Code */}
{checkoutStep === 'qr' && (
  <div className="text-center space-y-6">
    <h2 className="text-2xl font-bold">Scan to Pay</h2>
    <div className="bg-white p-4 rounded-2xl inline-block shadow-inner">
      {/* Replace YOURUPIID@okaxis with your actual UPI ID */}
      <img 
        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=gayathrikota0208@okaxis%26pn=MandirXR%26am=${subtotal}%26cu=INR`}
        alt="Payment QR Code"
        className="w-48 h-48"
      />
    </div>
    <p className="text-sm text-muted-foreground px-4">
      Paying <span className="text-foreground font-bold text-lg">₹{subtotal.toLocaleString()}</span> 
      <br /> to <span className="text-primary font-medium">MandirXR Artisans</span>
    </p>
    <div className="flex gap-4">
      <button onClick={() => setCheckoutStep('details')} className="flex-1 py-3 bg-white/5 rounded-xl text-sm font-medium">Back</button>
      <button onClick={handlePaymentSuccess} className="flex-1 py-3 px-6 gradient-saffron rounded-xl font-bold text-sm shadow-lg">Verify Payment</button>
    </div>
  </div>
)}

              {/* STEP 3: Success Message */}
              {checkoutStep === 'success' && (
                <div className="text-center space-y-6 py-4">
                  <CheckCircle2 size={80} className="mx-auto text-green-500 mb-2" />
                  <h2 className="text-3xl font-bold">Payment Success!</h2>
                  <div className="space-y-2 text-muted-foreground">
                    <p className="text-lg">Thank you, <span className="text-foreground font-bold">{formData.name}</span>!</p>
                    <p>Order details will be sent shortly to <br/> <span className="text-primary font-medium">{formData.email}</span></p>
                  </div>
                  <button 
                    onClick={() => window.location.href = '/marketplace'} 
                    className="w-full py-4 bg-white/10 border border-white/20 rounded-2xl font-bold hover:bg-white/20 transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartPage;