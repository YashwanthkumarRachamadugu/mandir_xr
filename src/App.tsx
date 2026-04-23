import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import ChatWidget from "./components/ChatWidget";
import IntroAnimation from "./components/IntroAnimation";

// Pages
import FestivalDetailPage from "./pages/FestivalDetailPage";
import Index from "./pages/Index";
import MapPage from "./pages/MapPage";
import ARPage from "./pages/ARPage";
import VRPage from "./pages/VRPage";
import FestivalsPage from "./pages/FestivalsPage";
import QuizPage from "./pages/QuizPage";
import MarketplacePage from "./pages/MarketplacePage";
import BlogPage from "./pages/BlogPage";
import VolunteerPage from "./pages/VolunteerPage";
import SignInPage from "./pages/SignInPage";
import NotFound from "./pages/NotFound";
import CartPage from "./pages/cartpage";
import ProfilePage from "./pages/ProfilePage";
import RestorationPage from "./pages/RestorationPage";

const queryClient = new QueryClient();

const App = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {/* 🔥 Intro Animation */}
      {showIntro && <IntroAnimation onFinish={() => setShowIntro(false)} />}

      {/* 🌐 Main App */}
      {!showIntro && (
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />

            <BrowserRouter>
              <ScrollToTop />
              <Layout>
                <Routes>
                  {/* MAIN */}
                  <Route path="/" element={<Index />} />
                  <Route path="/map" element={<MapPage />} />
                  <Route path="/profile" element={<ProfilePage />} />

                  {/* CULTURE */}
                  <Route path="/festivals" element={<FestivalsPage />} />
                  <Route path="/festival/:name" element={<FestivalDetailPage />} />

                  {/* XR */}
                  <Route path="/ar" element={<ARPage />} />
                  <Route path="/ar/:id" element={<ARPage />} />
                  <Route path="/vr" element={<VRPage />} />

                  {/* RESTORATION */}
                  <Route path="/restoration" element={<RestorationPage />} />
                  <Route path="/restoration/:id" element={<RestorationPage />} />

                  {/* COMMUNITY */}
                  <Route path="/quiz" element={<QuizPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/volunteer" element={<VolunteerPage />} />

                  {/* SHOP */}
                  <Route path="/marketplace" element={<MarketplacePage />} />
                  <Route path="/cart" element={<CartPage />} />

                  {/* AUTH */}
                  <Route path="/signin" element={<SignInPage />} />

                  {/* NOT FOUND */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>

              <ChatWidget />
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      )}
    </>
  );
};

export default App;