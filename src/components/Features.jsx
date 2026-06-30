import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, MapPin, Bell, MessageCircle, BarChart3, Users, Settings, ClipboardList, Camera, CheckCircle2 } from 'lucide-react';

const Features = () => {
  const citizenFeatures = [
    { icon: <Smartphone />, title: 'Report Issues', desc: 'Easily submit issues from any device.' },
    { icon: <Camera />, title: 'Upload Multiple Images', desc: 'Attach photos as visual proof.' },
    { icon: <MapPin />, title: 'GPS Location', desc: 'Pinpoint exact location automatically.' },
    { icon: <Activity />, title: 'Track Status', desc: 'Real-time updates on your report.' },
    { icon: <Bell />, title: 'Notifications', desc: 'Instant alerts on progress.' },
    { icon: <MessageCircle />, title: 'Comment', desc: 'Communicate directly with authorities.' },
  ];

  const adminFeatures = [
    { icon: <BarChart3 />, title: 'Dashboard Analytics', desc: 'Comprehensive data and insights.' },
    { icon: <CheckCircle2 />, title: 'Issue Verification', desc: 'Filter and approve valid reports.' },
    { icon: <Users />, title: 'Staff Assignment', desc: 'Smart routing to the right team.' },
    { icon: <Settings />, title: 'Category Management', desc: 'Customize issue types.' },
  ];

  const staffFeatures = [
    { icon: <ClipboardList />, title: 'Assigned Tasks', desc: 'Clear view of daily responsibilities.' },
    { icon: <Activity />, title: 'Progress Updates', desc: 'Update status with a single tap.' },
    { icon: <Camera />, title: 'Upload Work Photos', desc: 'Proof of resolution.' },
  ];

  const renderFeatureList = (title, features, colorClass, bgClass) => (
    <div className="glass p-8 rounded-3xl border border-white/50 h-full">
      <h3 className={`text-2xl font-bold mb-8 ${colorClass}`}>{title}</h3>
      <div className="space-y-6">
        {features.map((f, i) => (
          <div key={i} className="flex gap-4">
            <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${bgClass} ${colorClass}`}>
              {f.icon}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{f.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-white">
      <div className="absolute top-0 w-full h-full bg-gradient-to-b from-gray-50/50 to-white -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Features</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Everything you need to manage civic issues
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            {renderFeatureList('Citizen Features', citizenFeatures, 'text-blue-600', 'bg-blue-50')}
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            {renderFeatureList('Admin Features', adminFeatures, 'text-primary', 'bg-primary/10')}
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            {renderFeatureList('Staff Features', staffFeatures, 'text-emerald-600', 'bg-emerald-50')}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Temp workaround for missing lucide icon in this file scope if not exported above
function Activity(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  );
}

export default Features;
