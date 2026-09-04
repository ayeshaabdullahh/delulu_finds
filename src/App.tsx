import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { SavedItemsProvider } from './context/SavedItemsContext';
import { useCanonical } from './hooks/useCanonical';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ProductPage from './pages/ProductPage';

const SearchPage = lazy(() => import('./pages/SearchPage'));
const SavedPage = lazy(() => import('./pages/SavedPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const DisclosurePage = lazy(() => import('./pages/DisclosurePage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function RedirectToProduct() {
  const { slug } = useParams();
  return <Navigate to={`/product/${slug}`} replace />;
}

function RouteFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-mauve border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function AppRoutes() {
  useCanonical();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/product/:slug" element={<ProductPage />} />
      <Route path="/products/:slug" element={<RedirectToProduct />} />
      <Route path="/search" element={<Suspense fallback={<RouteFallback />}><SearchPage /></Suspense>} />
      <Route path="/saved" element={<Suspense fallback={<RouteFallback />}><SavedPage /></Suspense>} />
      <Route path="/admin" element={<Suspense fallback={<RouteFallback />}><AdminPage /></Suspense>} />
      <Route path="/blog" element={<Suspense fallback={<RouteFallback />}><BlogPage /></Suspense>} />
      <Route path="/blog/:slug" element={<Suspense fallback={<RouteFallback />}><BlogPostPage /></Suspense>} />
      <Route path="/about" element={<Suspense fallback={<RouteFallback />}><AboutPage /></Suspense>} />
      <Route path="/disclosure" element={<Suspense fallback={<RouteFallback />}><DisclosurePage /></Suspense>} />
      <Route path="/privacy" element={<Suspense fallback={<RouteFallback />}><PrivacyPage /></Suspense>} />
      <Route path="/contact" element={<Suspense fallback={<RouteFallback />}><ContactPage /></Suspense>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <SavedItemsProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-mauve focus:text-white focus:rounded-full focus:text-sm font-body"
          >
            Skip to main content
          </a>
          <main id="main">
            <div className="min-h-screen bg-cream-100">
              <Navbar />
              <AppRoutes />
              <Footer />
            </div>
          </main>
        </SavedItemsProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
