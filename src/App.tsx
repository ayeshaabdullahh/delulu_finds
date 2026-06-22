import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ProductPage from './pages/ProductPage';
import SearchPage from './pages/SearchPage';
import SavedPage from './pages/SavedPage';
import AdminPage from './pages/AdminPage';

function RedirectToProduct() {
  const { slug } = useParams();
  return <Navigate to={`/product/${slug}`} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-cream-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/products/:slug" element={<RedirectToProduct />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;