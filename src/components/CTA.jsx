import React from 'react';
import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary to-secondary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl"
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -mr-64 -mt-64 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -ml-64 -mb-64 pointer-events-none"></div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight relative z-10">
            Ready to Make Your <br className="hidden md:block" />
            Community Better?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto relative z-10">
            Join thousands of organizations and citizens who are already using CiviSence to maintain their environments efficiently.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
            <a href="https://civisence.web.app/register" className="w-full sm:w-auto px-8 py-4 bg-white text-primary hover:bg-gray-50 rounded-xl font-bold transition-all shadow-lg text-lg inline-block text-center">
              Get Started
            </a>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-sm rounded-xl font-bold transition-all text-lg">
              Register Organization
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 border border-transparent rounded-xl font-medium transition-all text-lg underline underline-offset-4">
              Book Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
