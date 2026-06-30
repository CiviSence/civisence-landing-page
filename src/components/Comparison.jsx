import React from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import Logo from './Logo';

const Comparison = () => {
  const traditional = [
    "Paper complaints",
    "No tracking",
    "Delayed updates",
    "No transparency",
    "Lost complaints",
    "Manual assignment"
  ];

  const civisence = [
    "Online reporting",
    "Live tracking",
    "Instant notifications",
    "Complete accountability",
    "Data analytics",
    "Smart assignment"
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Why Choose CiviSence?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Traditional */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm"
          >
            <h3 className="text-xl font-bold text-gray-500 mb-8 pb-4 border-b border-gray-100 text-center">
              Traditional System
            </h3>
            <ul className="space-y-6">
              {traditional.map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <X className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CiviSence */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-b from-primary to-secondary rounded-3xl p-8 shadow-2xl relative overflow-hidden text-white"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            
            <h3 className="text-xl font-bold mb-8 pb-4 border-b border-white/20 text-center flex items-center justify-center gap-2">
              <Logo className="w-6 h-6 text-white" />
              CiviSence
            </h3>
            <ul className="space-y-6 relative z-10">
              {civisence.map((item, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
