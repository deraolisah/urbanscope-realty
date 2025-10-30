import React, { useState } from 'react';

const Contact = () => {
  const [interests, setInterests] = useState([]);

  const options = [
    {
      title: 'Property Acquisition',
      description: 'Invest in residential, commercial, or mixed-use properties'
    },
    {
      title: 'Real Estate Funds',
      description: 'Launch or manage pooled investment vehicles for real estate'
    },
    {
      title: 'REIT Partnerships',
      description: 'Collaborate on publicly or privately traded real estate trusts'
    },
    {
      title: 'Development Projects',
      description: 'Finance or co-manage new construction and urban renewal'
    },
    {
      title: 'Property Management',
      description: 'End-to-end solutions for tenant, maintenance, and compliance'
    },
    {
      title: 'Real Estate Analytics',
      description: 'Access market insights, asset performance, and forecasting'
    }
  ];

  const toggleInterest = (title) => {
    setInterests((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Content */}
        <div className=''>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Talk to an expert <br className="hidden md:block" /> in real estate
          </h2>
          <p className="md:max-w-lg mb-4 text-lg">
            UrbanScope manages ₦17B+ in real estate assets across Nigeria and beyond, serving a diverse network of property-focused investors including:
          </p>
          <ul className="list-disc list-inside mb-10 md:mb-16 space-y-1.5">
            <li>Established real estate investment firms</li>
            <li>Independent property developers</li>
            <li>Emerging fund managers</li>
            <li>Institutional investors and REIT partners</li>
          </ul>
          <p className="mb-2 font-bold">Join 25,000+ top funds and investors</p>
          <small className="text-gray-500">Looking for tools for startups? Explore Rollups</small>
        </div>

        {/* Right Form */}
        <div>
          <form className="bg-dark text-white p-6 md:p-8 rounded-md space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1"> First name * </label>
                <input type="text" className="w-full px-4 py-2 rounded bg-light/5 border border-light/10 focus:outline-none focus:ring-2 focus:ring-light/15" />
              </div>
              <div>
                <label className="block text-sm mb-1"> Last name * </label>
                <input type="text" className="w-full px-4 py-2 rounded bg-light/5 border border-light/10 focus:outline-none focus:ring-2 focus:ring-light/15" />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1"> Email address * </label>
              <input type="email" className="w-full px-4 py-2 rounded bg-light/5 border border-light/10 focus:outline-none focus:ring-2 focus:ring-light/15" />
            </div>

            <div>
              <label className="block text-sm mb-1"> Company name <span className='text-light/60'> (optional) </span> </label>
              <input type="text" className="w-full px-4 py-2 rounded bg-light/5 border border-light/10 focus:outline-none focus:ring-2 focus:ring-light/15" />
            </div>

            <div>
              <label className="block text-sm mb-2">What are you interested in?</label>
              <div className="space-y-0 border border-light/10 rounded-md">
                {options.map(({ title, description }, idx) => {
                  const selected = interests.includes(title);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleInterest(title)}
                      className={`cursor-pointer border rounded p-4 transition-all ${
                        selected
                          ? 'border-light/60 bg-light/5'
                          : 'border-light/10 hover:border-light/30 hover:bg-light/5'
                      }`}
                    >
                      <div className="w-full flex items-center justify-between gap-1">
                        <div className='w-full'>
                          <h4 className="font-semibold">{title}</h4>
                          <p className="text-sm text-gray-400">{description}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 ${
                            selected ? 'bg-dark border-4 border-light' : 'border-light/30'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-sm text-light/60">
              Please note that this is not an application to seek funding or other services for a new venture or business.
            </p>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-light hover:bg-light/80 rounded text-dark font-semibold transition"
            >
              Contact Sales
            </button>
            <small className='text-light/60 text-xs'>
                By clicking "Contact Sales" you agree to UrbanScope’s Privacy Policy.
              </small>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;