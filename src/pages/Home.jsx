import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Tryit from '../components/Tryit';
import Learn from '../components/Learn';
import Footer from '../components/Footer';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
  if (hash) {
    const targetId = hash.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const timer = setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 200);
      return () => clearTimeout(timer);
    }
  } else {
    window.scrollTo(0, 0);
  }
}, [hash]);

  return (
    <main>
      <section id="home">
        <Hero />
      </section>
      
      <section id="how-it-works">
        <HowItWorks />
      </section>

      <section id="try-it">
        <Tryit />
      </section>

      <section id="learn">
        <Learn />
      </section>
      
      <Footer />    
    </main>
  );
};

export default Home;