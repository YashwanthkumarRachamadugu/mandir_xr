import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, CheckCircle, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { auth } from "@/integrations/firebase/client";
import { requestRole } from "@/integrations/firebase/userProfile";
import { Link } from "react-router-dom";

const VolunteerPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const [form, setForm] = useState({ role: "tourist", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be signed in to submit a request.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Sends the request to the backend for admin approval
      await requestRole(user.uid, form.role as "tourist" | "volunteer");
      setSubmitted(true);
      toast.success("Request sent successfully! Awaiting Admin approval.");
    } catch (error) {
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="section-padding min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl p-8 text-center max-w-md">
          <ShieldAlert className="mx-auto text-orange-500 mb-4" size={64} />
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">Authentication Required</h2>
          <p className="text-muted-foreground mb-6">You must be registered and signed in to apply for a role.</p>
          <Link to="/signin" className="gradient-saffron text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity">
            Sign In / Sign Up
          </Link>
        </motion.div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="section-padding min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl p-8 sm:p-12 text-center max-w-md">
          <CheckCircle className="mx-auto text-india-green mb-4" size={64} />
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">Request Submitted!</h2>
          <p className="text-muted-foreground mb-4">
            Your request to become a <strong className="capitalize">{form.role}</strong> has been sent to the Admin.
          </p>
          <p className="text-sm text-muted-foreground">Keep an eye on your profile page for tasks once approved.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="section-padding min-h-screen flex items-center justify-center">
      <div className="container mx-auto max-w-lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <Heart className="mx-auto text-primary mb-3" size={40} />
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">Join the Movement</h1>
            <p className="text-muted-foreground text-sm">Help preserve heritage — apply to be a tourist or volunteer</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Account</label>
              <input
                type="text"
                disabled
                value={user.email || user.displayName || "Signed In"}
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm opacity-70 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Requested Role *</label>
              <div className="flex gap-3">
                {["tourist", "volunteer"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setForm({ ...form, role })}
                    className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all capitalize ${
                      form.role === role ? "gradient-saffron text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Why do you want this role? (optional)</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                placeholder="Tell the admin why you're applying..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full gradient-saffron text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit for Admin Approval"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default VolunteerPage;