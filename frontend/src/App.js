import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Products from './components/Products';
import Subscriptions from './components/Subscriptions';
import Footer from './components/Footer';
import Timeline from './components/Timeline';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Timeline />
        {/* <HowItWorks /> */}
        <Subscriptions />
        <Products />
        {/* <Timeline /> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;