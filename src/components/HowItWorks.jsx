import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, FileEdit, LayoutDashboard, SearchCheck, UserCog, BellRing, Wrench, RefreshCw, CheckCircle, Smartphone, MessageSquare } from 'lucide-react';

const steps = [
  { id: 1, title: 'Citizen signs up', icon: <UserPlus />, color: 'bg-blue-50 text-blue-600', border: 'border-blue-200' },
  { id: 2, title: 'Reports issue', desc: 'Title, description, images, GPS, category', icon: <FileEdit />, color: 'bg-indigo-50 text-indigo-600', border: 'border-indigo-200' },
  { id: 3, title: 'Enters Admin Dashboard', icon: <LayoutDashboard />, color: 'bg-purple-50 text-purple-600', border: 'border-purple-200' },
  { id: 4, title: 'Admin verifies issue', icon: <SearchCheck />, color: 'bg-fuchsia-50 text-fuchsia-600', border: 'border-fuchsia-200' },
  { id: 5, title: 'Assigns to Staff', icon: <UserCog />, color: 'bg-pink-50 text-pink-600', border: 'border-pink-200' },
  { id: 6, title: 'Staff notified', icon: <BellRing />, color: 'bg-rose-50 text-rose-600', border: 'border-rose-200' },
  { id: 7, title: 'Staff starts working', icon: <Wrench />, color: 'bg-orange-50 text-orange-600', border: 'border-orange-200' },
  { id: 8, title: 'Real-time updates', icon: <RefreshCw />, color: 'bg-amber-50 text-amber-600', border: 'border-amber-200' },
  { id: 9, title: 'Marked resolved', icon: <CheckCircle />, color: 'bg-green-50 text-green-600', border: 'border-green-200' },
  { id: 10, title: 'Citizen notified', icon: <Smartphone />, color: 'bg-emerald-50 text-emerald-600', border: 'border-emerald-200' },
  { id: 11, title: 'Citizen verifies & gives feedback', icon: <MessageSquare />, color: 'bg-teal-50 text-teal-600', border: 'border-teal-200' },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Workflow</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            How It Works
          </h3>
          <p className="text-lg text-gray-600">
            A seamless, transparent ecosystem connecting citizens, administrators, and field staff.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Main timeline line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-purple-300 to-teal-200 transform -translate-x-1/2 rounded-full opacity-50" />
          
          <div className="space-y-6 md:space-y-0 relative">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center justify-between w-full md:mb-12 ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="hidden md:block w-5/12" />
                  
                  {/* Center node */}
                  <div className="z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full border-4 border-gray-50 shadow-md relative my-4 md:my-0">
                    <div className={`w-full h-full rounded-full flex items-center justify-center ${step.color} bg-opacity-20`}>
                      <span className="text-sm font-bold">{step.id}</span>
                    </div>
                  </div>

                  {/* Card */}
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className={`p-6 bg-white rounded-2xl shadow-sm border ${step.border} hover:shadow-md transition-shadow`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${step.color}`}>
                        {step.icon}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                      {step.desc && <p className="text-gray-600 text-sm">{step.desc}</p>}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
