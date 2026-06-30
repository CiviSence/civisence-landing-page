import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    { q: "How do I report an issue?", a: "Simply log into the citizen portal, click 'New Report', select a category, add a description, upload a photo, and submit. Your GPS location is automatically attached." },
    { q: "Can I track my complaint?", a: "Yes, you can track the status of your complaint in real-time from the 'My Reports' section. You'll also receive notifications when the status changes." },
    { q: "Can I upload images?", a: "Absolutely. You can upload multiple images to provide visual proof of the issue, which helps the staff resolve it faster." },
    { q: "How are issues assigned?", a: "Administrators can manually assign issues, or the system can auto-assign them based on the category and the staff member's current workload and location." },
    { q: "Can multiple staff work together?", a: "Yes, complex issues can be assigned to teams, and staff members can collaborate and leave internal notes on the issue." },
    { q: "Is my data secure?", a: "We use enterprise-grade encryption to ensure that all user data and reported issues are securely stored and accessible only to authorized personnel." },
    { q: "Can organizations customize categories?", a: "Yes, administrators have full control over the issue categories and can tailor them to their specific organization's needs." }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-2xl border transition-all duration-300 ${openIndex === idx ? 'border-primary/50 shadow-md' : 'border-gray-200'}`}
            >
              <button
                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
              >
                <span className={`font-semibold text-lg ${openIndex === idx ? 'text-primary' : 'text-gray-900'}`}>
                  {faq.q}
                </span>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === idx ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {openIndex === idx ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-50 mt-2 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
