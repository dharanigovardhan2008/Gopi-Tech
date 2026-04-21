import HeroSection from '../components/HeroSection';
import ServicesGrid from '../components/ServicesGrid';
import WhyChooseUs from '../components/WhyChooseUs';
import WorksPreview from '../components/WorksPreview';
import CTASection from '../components/CTASection';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesGrid />
      <WhyChooseUs />
      <WorksPreview />
      <CTASection />
    </div>
  );
};

export default Home;
