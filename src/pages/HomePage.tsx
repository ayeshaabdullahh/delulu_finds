import Hero from '../components/Hero';
import TrendingHashtags from '../components/TrendingHashtags';
import ProductCarousel from '../components/ProductCarousel';
import NewArrivals from '../components/NewArrivals';
import Features from '../components/Features';
import MasonryGrid from '../components/MasonryGrid';
import Lookbook from '../components/Lookbook';
import Newsletter from '../components/Newsletter';
import JournalSection from '../components/JournalSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrendingHashtags />
      <ProductCarousel />
      <NewArrivals />
      <Features />
      <MasonryGrid />
      <Lookbook />
      <JournalSection />
      <Newsletter />
    </>
  );
}
