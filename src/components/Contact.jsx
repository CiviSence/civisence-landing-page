import React from "react";
import { MapPin, Mail, Phone, MessageSquare } from "lucide-react";
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
  const [state, handleSubmit] = useForm("mrewaowg");

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              Get in touch
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Have questions about implementing CiviSence in your organization?
              Our team is ready to help.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <MapPin />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Office</h4>
                  <p className="text-gray-600 mt-1">
                    SPNREC Araria, Simaraha
                    <br />
                    Bihar, India 854318
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Mail />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Email</h4>
                  <p className="text-gray-600 mt-1">
                    civisence@gmail.com
                    <br />
                    civisence@zohomail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a message
            </h3>

            {state.succeeded ? (
              <div className="relative z-10 bg-green-50 text-green-700 p-6 rounded-2xl border border-green-200 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-bold text-lg mb-2">Message Sent Successfully!</h4>
                <p>Thank you for reaching out. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="John"
                    />
                    <ValidationError prefix="First Name" field="firstName" errors={state.errors} className="text-red-500 text-sm mt-1 block" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      placeholder="Doe"
                    />
                    <ValidationError prefix="Last Name" field="lastName" errors={state.errors} className="text-red-500 text-sm mt-1 block" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="john@example.com"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1 block" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    name="message"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1 block" />
                </div>
                <button 
                  type="submit" 
                  disabled={state.submitting}
                  className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-4 rounded-xl transition-colors shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}

            <div className="mt-6 flex justify-center">
              <button className="flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors">
                <MessageSquare size={20} />
                Start Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
