import { ReactNode } from "react";
import Navbar from "./Navbar";
const navItems = [
  { label: "Home", path: "/" },
  { label: "Map", path: "/map" },
  { label: "Festivals", path: "/festivals" },
  { label: "Dashboard", path: "/dashboard" }, // ✅ ADD THIS
];
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      
      {/* ✅ NAVBAR */}
      <Navbar />

      {/* ✅ MAIN CONTENT */}
      <main className="pt-20 flex-1">
        {children}
      </main>

      {/* ✅ FOOTER */}
      <footer className="border-t border-border/50 py-12 px-4">
        <div className="container mx-auto text-center">
          <p className="text-2xl font-display font-bold text-gradient-saffron mb-2">
            MandirXR
          </p>
          <p className="text-muted-foreground text-sm">
            Preserving and celebrating India's cultural heritage — Swadeshi & Atmanirbhar Bharat
          </p>
          <div className="mt-4 h-1 w-32 mx-auto gradient-tricolor rounded-full opacity-60" />
        </div>
      </footer>

    </div>
  );
};

export default Layout;