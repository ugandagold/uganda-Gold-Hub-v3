import React, { useState } from 'react';
import { Phone, MessageCircle, Mail } from 'lucide-react';

const SectionContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    inquiryType: 'Purchase Gold',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Uganda Gold Hub,%0A%0AI would like to submit a request:%0A%0A*Name:* ${formData.name}%0A*Company:* ${formData.company}%0A*Phone:* ${formData.phone}%0A*Inquiry:* ${formData.inquiryType}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;
    window.open(`https://wa.me/256761389093?text=${text}`, '_blank');
  };

  return (
    <section className="py-24 bg-[#fafaf9]">
      <div className="container mx-auto px-6">
         <div className="max-w-3xl mx-auto bg-stone-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-10 flex flex-col items-center gap-4">
               <div>
                  <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">Get in Touch</h2>
                  <p className="text-stone-400 text-sm">Fill out the form below to reach our team.</p>
               </div>
               
               <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center mt-2">
                  <a href="tel:+256761389093" className="inline-flex items-center gap-2 text-xl md:text-2xl font-serif text-amber-500 hover:text-amber-400 transition-colors">
                     <Phone size={24} />
                     <span>+256 761 389 093</span>
                  </a>
                  <a href="mailto:ugandagoldhub@gmail.com" className="inline-flex items-center gap-2 text-xl md:text-2xl font-serif text-amber-500 hover:text-amber-400 transition-colors">
                     <Mail size={24} />
                     <span>ugandagoldhub@gmail.com</span>
                  </a>
               </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                     <label className="text-amber-500 text-xs font-bold uppercase tracking-widest">Name</label>
                     <input 
                       type="text" 
                       name="name"
                       value={formData.name}
                       onChange={handleChange}
                       placeholder="John Doe" 
                       className="w-full bg-stone-800 border border-stone-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-amber-500 transition-colors" 
                       required
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-amber-500 text-xs font-bold uppercase tracking-widest">Company</label>
                     <input 
                       type="text" 
                       name="company"
                       value={formData.company}
                       onChange={handleChange}
                       placeholder="Global Mining Ltd." 
                       className="w-full bg-stone-800 border border-stone-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-amber-500 transition-colors" 
                     />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                     <label className="text-amber-500 text-xs font-bold uppercase tracking-widest">Phone Number</label>
                     <input 
                       type="text" 
                       name="phone"
                       value={formData.phone}
                       onChange={handleChange}
                       placeholder="(+256) 761 389 093" 
                       className="w-full bg-stone-800 border border-stone-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-amber-500 transition-colors" 
                     />
                  </div>
                  <div className="flex flex-col gap-2">
                     <label className="text-amber-500 text-xs font-bold uppercase tracking-widest">Inquiry Type</label>
                     <select 
                       name="inquiryType"
                       value={formData.inquiryType}
                       onChange={handleChange}
                       className="w-full bg-stone-800 border border-stone-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-amber-500 transition-colors appearance-none"
                     >
                        <option value="Purchase Gold">Purchase Gold</option>
                        <option value="Sell / Mine Partnership">Sell / Mine Partnership</option>
                        <option value="Logistics & Export">Logistics & Export</option>
                        <option value="Investor Relations">Investor Relations</option>
                        <option value="General Inquiry">General Inquiry</option>
                     </select>
                  </div>
               </div>

               <div className="flex flex-col gap-2">
                  <label className="text-amber-500 text-xs font-bold uppercase tracking-widest">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject" 
                    className="w-full bg-stone-800 border border-stone-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-amber-500 transition-colors" 
                  />
               </div>

               <div className="flex flex-col gap-2">
                  <label className="text-amber-500 text-xs font-bold uppercase tracking-widest">Message</label>
                  <textarea 
                    rows={4} 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?" 
                    className="w-full bg-stone-800 border border-stone-700 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-amber-500 transition-colors"
                  ></textarea>
               </div>

               <button type="submit" className="w-full md:w-auto px-12 py-4 bg-green-600 hover:bg-green-500 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-colors mt-4 shadow-lg hover:shadow-green-500/20 flex items-center justify-center gap-2">
                  <MessageCircle size={20} />
                  Submit Request via WhatsApp
               </button>
            </form>
         </div>
      </div>
    </section>
  );
};

export default SectionContact;