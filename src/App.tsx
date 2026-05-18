import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ProductPage from './pages/ProductPage';
import SearchPage from './pages/SearchPage';
import SavedPage from './pages/SavedPage';
import AdminPage from './pages/AdminPage';

function ScrollToTop() {
  const { pathname } = window.location;
  return null;
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
