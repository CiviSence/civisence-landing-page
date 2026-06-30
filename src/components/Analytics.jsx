import React from 'react';
import { motion } from 'framer-motion';

const Analytics = () => {
  const stats = [
    { value: "15,000+", label: "Issues Reported" },
    { value: "98%", label: "Resolution Rate" },
    { value: "4 Hours", label: "Average Assignment Time" },
    { value: "92%", label: "Citizen Satisfaction" },
    { value: "120+", label: "Organizations" },
    { value: "45+", label: "Active Staff" }
  ];

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-40"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-white/80 font-semibold tracking-wide uppercase text-sm mb-3">Analytics</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Impact in Numbers
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-6 lg:p-8 rounded-3xl text-center hover:bg-white/20 transition-colors"
            >
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-white/80 font-medium text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Analytics;
