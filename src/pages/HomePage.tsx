import Hero from '../components/Hero';
import ProductCarousel from '../components/ProductCarousel';
import NewArrivals from '../components/NewArrivals';
import Features from '../components/Features';
import MasonryGrid from '../components/MasonryGrid';
import Lookbook from '../components/Lookbook';
import Newsletter from '../components/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductCarousel />
      <NewArrivals />
      <Features />
      <MasonryGrid />
      <Lookbook />
      <Newsletter />
    </>
  );
}
