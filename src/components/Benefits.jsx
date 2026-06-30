import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Benefits = () => {
  const benefitGroups = [
    {
      title: "For Citizens",
      color: "bg-blue-50 border-blue-100",
      textColor: "text-blue-600",
      items: ["Easy reporting", "Transparency", "Faster resolutions", "Notifications", "Better environment"]
    },
    {
      title: "For Organizations",
      color: "bg-purple-50 border-purple-100",
      textColor: "text-primary",
      items: ["Better maintenance", "Digital workflow", "Reduced paperwork", "Analytics", "Accountability"]
    },
    {
      title: "For Staff",
      color: "bg-emerald-50 border-emerald-100",
      textColor: "text-emerald-600",
      items: ["Organized work", "Easy tracking", "Faster communication", "Task management", "Clear objectives"]
    }
  ];

  return (
    <section id="benefits" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Benefits</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Value for every stakeholder
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefitGroups.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className={`p-8 rounded-3xl border bg-white shadow-sm hover:shadow-lg transition-shadow relative overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-20 ${group.color}`} />
              
              <h4 className={`text-2xl font-bold mb-6 ${group.textColor}`}>{group.title}</h4>
              <ul className="space-y-4">
                {group.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 ${group.textColor}`} />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
