import React from 'react';
import { motion } from 'motion/react';

const About = () => {
  return (
    <section id="about" className="py-32 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1 }}
        >
          <h2 className="text-sm tracking-[0.3em] text-zinc-400 uppercase mb-8">About Pretty Pocket</h2>
          <p className="text-3xl md:text-5xl font-serif text-zinc-900 leading-tight md:leading-snug">
            Your daily dose of glam, without breaking the bank! Quality guaranteed, pocket-friendly prices, and trending collections.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
