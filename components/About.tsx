import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-32 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1 }}
        >
          <h2 className="text-sm tracking-[0.3em] text-zinc-400 uppercase mb-8">{t('about.label')}</h2>
          <p className="text-3xl md:text-5xl font-serif text-zinc-900 leading-tight md:leading-snug">
            {t('about.quote')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
