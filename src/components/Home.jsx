import React from 'react';
import Hero from './Hero';
import About from './About';
import Menu from './Menu';
import Testimonials from './Testimonials';
import Gallery from './Gallery';
import Contact from './Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Menu />
      <Testimonials />
      <Gallery />
      <Contact />
    </>
  );
}
