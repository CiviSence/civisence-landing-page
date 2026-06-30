import React from 'react';

const Organizations = () => {
  const orgs = [
    "Schools", "Colleges", "Hostels", 
    "Residential Societies", "Municipal Bodies", 
    "NGOs", "Corporate Campuses"
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-8">
          Trusted by organizations across all sectors
        </p>
        
        {/* Marquee effect */}
        <div className="relative flex overflow-x-hidden">
          <div className="py-4 animate-marquee whitespace-nowrap flex items-center gap-12 md:gap-24">
            {orgs.map((org, i) => (
              <span key={i} className="text-xl md:text-2xl font-bold text-gray-300">
                {org}
              </span>
            ))}
            {/* Repeat for seamless loop */}
            {orgs.map((org, i) => (
              <span key={`dup-${i}`} className="text-xl md:text-2xl font-bold text-gray-300">
                {org}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Add marquee animation to global css or via tailwind config, but inline style here for quick implementation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Organizations;
