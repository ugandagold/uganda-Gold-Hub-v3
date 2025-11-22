import React from 'react';

const SectionContact: React.FC = () => {
  return (
    <section className="py-24 bg-[#fafaf9]">
      <div className="container mx-auto px-6">
         <div className="max-w-3xl mx-auto bg-stone-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-10">
               <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">Get in Touch</h2>
               <p className="text-stone-400 text-sm">Fill out the form below to reach our team.</p>
            </div>

            <form className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                     <label className="text-amber-500 text-xs font-bold uppercase tracking-widest">Name</label>
                     <input type="text" placeholder="John Doe" className="w-full bg-stone-800 border border-stone-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-amber-500 transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-amber-500 text-xs font-bold uppercase tracking-widest">Company</label>
                     <input type="text" placeholder="Global Mining Ltd." className="w-full bg-stone-800 border border-stone-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-amber-500 transition-colors" />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                     <label className="text-amber-500 text-xs font-bold uppercase tracking-widest">Phone Number</label>
                     <input type="text" placeholder="(+62) 123-456-789" className="w-full bg-stone-800 border border-stone-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-amber-500 transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-amber-500 text-xs font-bold uppercase tracking-widest">Inquiry Type</label>
                     <select className="w-full bg-stone-800 border border-stone-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-amber-500 transition-colors appearance-none">
                        <option>Purchase Gold</option>
                        <option>Sell / Mine Partnership</option>
                        <option>Logistics & Export</option>
                        <option>Investor Relations</option>
                        <option>General Inquiry</option>
                     </select>
                  </div>
               </div>

               <div className="flex flex-col gap-2">
                  <label className="text-amber-500 text-xs font-bold uppercase tracking-widest">Subject</label>
                  <input type="text" placeholder="Subject" className="w-full bg-stone-800 border border-stone-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-amber-500 transition-colors" />
               </div>

               <div className="flex flex-col gap-2">
                  <label className="text-amber-500 text-xs font-bold uppercase tracking-widest">Message</label>
                  <textarea rows={4} placeholder="How can we help you?" className="w-full bg-stone-800 border border-stone-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-amber-500 transition-colors"></textarea>
               </div>

               <button type="submit" className="w-full md:w-auto px-12 py-4 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold text-sm uppercase tracking-widest rounded-xl transition-colors mt-4 shadow-lg hover:shadow-amber-500/20">
                  Submit Request
               </button>
            </form>
         </div>
      </div>
    </section>
  );
};

export default SectionContact;