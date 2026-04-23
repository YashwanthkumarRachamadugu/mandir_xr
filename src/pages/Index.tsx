import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Map,
  Smartphone,
  Glasses,
  PartyPopper,
  Trophy,
  ShoppingBag,
  BookOpen,
  Heart,
} from "lucide-react";
import FeatureCard from "../components/FeatureCard";
import heroBg from "@/assets/hero-bgkk.jpg";

const features = [
  {
    icon: <Map className="text-primary-foreground" size={24} />,
    title: "Interactive Map",
    description:
      "Explore India state by state — monuments, culture, festivals, and cuisines.",
    path: "/map",
  },
  {
    icon: <Smartphone className="text-primary-foreground" size={24} />,
    title: "AR Experience",
    description:
      "View 3D heritage monuments through augmented reality on your device.",
    path: "/ar",
  },
  {
    icon: <Glasses className="text-primary-foreground" size={24} />,
    title: "VR Experience",
    description:
      "Take immersive 360° virtual tours of India's most iconic landmarks.",
    path: "/vr",
  },
  {
    icon: <PartyPopper className="text-primary-foreground" size={24} />,
    title: "Festivals",
    description:
      "Discover India's vibrant festivals, their stories, and traditions.",
    path: "/festivals",
  },
  {
    icon: <Trophy className="text-primary-foreground" size={24} />,
    title: "Quiz & Rewards",
    description:
      "Test your knowledge of Indian heritage and earn points.",
    path: "/quiz",
  },
  {
    icon: <ShoppingBag className="text-primary-foreground" size={24} />,
    title: "Marketplace",
    description:
      "Support local artisans — handloom, pottery, and tribal art.",
    path: "/marketplace",
  },
  {
    icon: <BookOpen className="text-primary-foreground" size={24} />,
    title: "Blog",
    description: "Share and read travel stories from across India.",
    path: "/blog",
  },
  {
    icon: <Heart className="text-primary-foreground" size={24} />,
    title: "Volunteer",
    description:
      "Join the movement to preserve India's cultural heritage.",
    path: "/volunteer",
  },
];

const Index = () => {
  const scrollToFeatures = () => {
    const element = document.getElementById("features");
    const offset = 100;

    if (element) {
      const y =
        element.getBoundingClientRect().top +
        window.pageYOffset -
        offset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-4 leading-tight">
              <span className="text-gradient-saffron">Preserve.</span>{" "}
              <span className="text-foreground">Celebrate.</span>{" "}
              <span className="text-india-green">Share.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              An immersive journey into Indian culture and heritage — powered by modern technology and timeless traditions.
            </p>

            {/* Button */}
            <button
              onClick={scrollToFeatures}
              className="inline-flex items-center gap-2 gradient-saffron text-primary-foreground font-semibold px-8 py-3.5 rounded-lg text-lg hover:opacity-90 transition-opacity glow-saffron"
            >
              Start Exploring
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="section-padding scroll-mt-24 mb-20 pt-39"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
              Explore{" "}
              <span className="text-gradient-saffron">
                Indian Heritage
              </span>
            </h2>

            <p className="text-muted-foreground max-w-xl mx-auto">
              Eight immersive ways to discover, learn, and preserve India's rich cultural legacy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <Link to={f.path} key={f.title}>
                <FeatureCard
                  icon={f.icon}
                  title={f.title}
                  description={f.description}
                  delay={i * 0.08}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding mt-10 mb-20 pt-40">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 gradient-tricolor" />

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Be Part of the{" "}
              <span className="text-gradient-saffron">Movement</span>
            </h2>

            <p className="text-muted-foreground max-w-lg mx-auto mb-6">
              Join thousands in preserving India's heritage. Volunteer, explore, and share our cultural stories with the world.
            </p>

            <Link
              to="/volunteer"
              className="inline-flex items-center gap-2 gradient-saffron text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Join as Volunteer
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;