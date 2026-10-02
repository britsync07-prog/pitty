import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collection from './components/Collection';
import Featured from './components/Featured';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Admin from './components/Admin';
import ProductDetail from './components/ProductDetail';

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Simple Router
  const normalizedPath = path.replace(/\/$/, '');
  
  if (normalizedPath === '/admin') {
    return <Admin />;
  }

  if (normalizedPath.startsWith('/product/')) {
    const id = normalizedPath.split('/').pop() || '';
    return <ProductDetail id={id} />;
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-rose-100 selection:text-rose-900">
      <Navbar />
      <main>
        <Hero />
        <Collection />
        <Featured />
        <Reviews />
        <FAQ />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
