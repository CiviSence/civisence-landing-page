import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, Lightbulb, Trash2, Droplets, Zap, 
  Trash, Building, Home, Shield, Wifi, AlertOctagon, Car, 
  Wind, HelpCircle
} from 'lucide-react';

const Categories = () => {
  const categories = [
    { name: 'Road Damage', icon: <AlertTriangle /> },
    { name: 'Street Lights', icon: <Lightbulb /> },
    { name: 'Garbage', icon: <Trash2 /> },
    { name: 'Drainage', icon: <Wind /> },
    { name: 'Water Supply', icon: <Droplets /> },
    { name: 'Electricity', icon: <Zap /> },
    { name: 'Illegal Dumping', icon: <Trash /> },
    { name: 'Campus Maint.', icon: <Building /> },
    { name: 'Hostel Issues', icon: <Home /> },
    { name: 'Security', icon: <Shield /> },
    { name: 'Internet', icon: <Wifi /> },
    { name: 'Public Property', icon: <AlertOctagon /> },
    { name: 'Parking', icon: <Car /> },
    { name: 'Sanitation', icon: <Wind /> },
    { name: 'Others', icon: <HelpCircle /> },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Categories</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Comprehensive Issue Coverage
          </h3>
          <p className="text-gray-600">
            Categorize issues for faster routing and resolution.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100 cursor-pointer group"
            >
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors mb-4 shadow-sm">
                {cat.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 text-center">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
