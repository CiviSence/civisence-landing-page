import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Users, Shield, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">About CiviSence</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Empowering communities to build better environments
          </h3>
          <p className="text-lg text-gray-600">
            Traditional complaint systems are broken. They rely on paper, lack transparency, and leave citizens in the dark. CiviSence bridges the gap between citizens, administrators, and staff.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
                  <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-4">
                    <Target className="text-primary w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Our Mission</h4>
                  <p className="text-sm text-gray-600">To provide a seamless, digital workflow for managing civic issues efficiently.</p>
                </div>
                <div className="bg-secondary/5 p-6 rounded-3xl border border-secondary/10">
                  <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-4">
                    <Eye className="text-secondary w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Our Vision</h4>
                  <p className="text-sm text-gray-600">A world where communities and authorities collaborate with complete transparency.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                  <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-4">
                    <Shield className="text-blue-500 w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Accountability</h4>
                  <p className="text-sm text-gray-600">Every issue is tracked, assigned, and monitored until resolved.</p>
                </div>
                <div className="bg-green-50 p-6 rounded-3xl border border-green-100">
                  <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-4">
                    <Users className="text-green-500 w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Participation</h4>
                  <p className="text-sm text-gray-600">Encouraging citizens to take an active role in their community's upkeep.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 flex flex-col justify-between border border-gray-700">
              {/* Abstract decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <h4 className="text-2xl font-bold text-white mb-4">Why we built this</h4>
                <p className="text-gray-300 mb-6">
                  We noticed a recurring problem in local communities, college campuses, and residential societies: people notice issues but don't report them because the process is tedious, and even when reported, they never know if it's being addressed.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Eliminate paper complaints', 'Provide real-time updates', 'Optimize staff routing'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="relative z-10">
                <a href="#" className="inline-flex items-center gap-2 text-white font-medium hover:text-primary-light transition-colors">
                  Learn more about our story <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
