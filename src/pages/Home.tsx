import { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import TrendyPlants from '../components/TrendyPlants';
import TopSelling from '../components/TopSelling';
import CustomerReviews from '../components/CustomerReviews';
import BestO2 from '../components/BestO2';
import { scrollToTop } from '../utils/scrollUtils';

const Home = () => {
  // Scroll to top when the component mounts
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <main className="overflow-y-auto">
      <HeroSection />
      <TrendyPlants />
      <TopSelling />
      <CustomerReviews />
      <BestO2 />
    </main>
  );
};

export default Home; 