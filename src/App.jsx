import React from "react";
import Home from "./pages/Home";
import StatsSection from "./pages/StatsSection";
import ResultSection from "./pages/ResultsSection";
import StrategySection from "./pages/StrategySection";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import ModernFooter from "./components/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <Home />
      <StatsSection />
      <ResultSection />
      <StrategySection />
      <Contact />
      <ModernFooter />
    </div>
  );
};

export default App;
