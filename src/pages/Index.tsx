
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FundingSection from "@/components/FundingSection";
import ScheduleSection from "@/components/ScheduleSection";
import TalentSection from "@/components/TalentSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FundingSection />
        <ScheduleSection />
        <TalentSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
