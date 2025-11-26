import React from 'react';
import { ShieldCheck, Users, Globe, Ship, Scale, Landmark } from 'lucide-react';

const SectionAboutDetail: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Intro */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-3">About Uganda Gold Hub</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6 leading-tight">Leaders in gold trading services.</h3>
          <p className="text-lg text-stone-600 leading-relaxed">
            Welcome to Uganda Gold Hub, a premier gold trading platform with a strong legacy of trust and excellence.
            We are a specialized gold trading company, connecting international buyers with responsibly sourced gold across Africa.
            Our commitment to transparency, reliability, and professionalism has positioned us as a trusted leader in the industry.
          </p>
        </div>

        {/* 3 Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-stone-50 p-8 rounded-3xl text-center border border-stone-100 transition-transform hover:-translate-y-2 duration-300">
             <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6"><Users size={28} /></div>
             <h4 className="font-serif text-xl font-bold text-stone-900 mb-3">Experienced Workers</h4>
             <p className="text-sm text-stone-500 leading-relaxed">Backed by extensive industry expertise, our team ensures precision in every trade.</p>
          </div>
          <div className="bg-stone-50 p-8 rounded-3xl text-center border border-stone-100 transition-transform hover:-translate-y-2 duration-300">
             <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6"><ShieldCheck size={28} /></div>
             <h4 className="font-serif text-xl font-bold text-stone-900 mb-3">Client Satisfaction</h4>
             <p className="text-sm text-stone-500 leading-relaxed">We take care of our clients' satisfaction by providing tailored, secure solutions.</p>
          </div>
          <div className="bg-stone-50 p-8 rounded-3xl text-center border border-stone-100 transition-transform hover:-translate-y-2 duration-300">
             <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6"><Globe size={28} /></div>
             <h4 className="font-serif text-xl font-bold text-stone-900 mb-3">Globally Stable Partner</h4>
             <p className="text-sm text-stone-500 leading-relaxed">Connecting Ugandan resources to the world with stability and reliability.</p>
          </div>
        </div>

        {/* Detailed Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
          {/* Column 1 */}
          <div className="space-y-16">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-stone-100 text-amber-600"><Scale size={24} /></div>
                <h4 className="text-2xl font-serif text-stone-900 font-bold">Gold Trading & Export</h4>
              </div>
              <p className="text-stone-600 leading-relaxed pl-3 md:pl-0 border-l-2 border-stone-100 md:border-none">
                We specialize in the sourcing and export of high-quality gold, serving both individuals and businesses worldwide. Our deep understanding of the African gold market enables us to offer competitive prices while maintaining strict adherence to international standards.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-stone-100 text-amber-600"><ShieldCheck size={24} /></div>
                <h4 className="text-2xl font-serif text-stone-900 font-bold">Ethical & Transparent Operations</h4>
              </div>
              <p className="text-stone-600 leading-relaxed pl-3 md:pl-0 border-l-2 border-stone-100 md:border-none">
                Integrity is at the core of our business. Every transaction is conducted with full transparency, ensuring that our clients have complete confidence in the origin, quality, and value of their gold. We are committed to ethical sourcing and responsible business practices that benefit both our partners and local communities.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-stone-100 text-amber-600"><Landmark size={24} /></div>
                <h4 className="text-2xl font-serif text-stone-900 font-bold">Market Expertise & Advisory</h4>
              </div>
              <p className="text-stone-600 leading-relaxed pl-3 md:pl-0 border-l-2 border-stone-100 md:border-none">
                With extensive industry knowledge, our team provides insights and guidance to clients navigating the gold market. Whether you are an investor seeking long-term opportunities or a business expanding into gold trade, we deliver expert support to ensure success.
              </p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-16">
             <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-stone-100 text-amber-600"><Users size={24} /></div>
                <h4 className="text-2xl font-serif text-stone-900 font-bold">Reliable Logistics & Support</h4>
              </div>
              <p className="text-stone-600 leading-relaxed pl-3 md:pl-0 border-l-2 border-stone-100 md:border-none">
                We know that efficiency is key in global trade. Our professional team ensures a seamless experience, from secure handling to timely delivery. Backed by strong networks in Africa and beyond, we make gold trading straightforward and reliable.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-stone-100 text-amber-600"><Globe size={24} /></div>
                <h4 className="text-2xl font-serif text-stone-900 font-bold">Gold Buying</h4>
              </div>
              <p className="text-stone-600 leading-relaxed mb-4 pl-3 md:pl-0 border-l-2 border-stone-100 md:border-none">
                Purchasing gold from Uganda with Uganda Gold Hub is a secure and efficient way to invest in this valuable commodity. As a trusted company specializing in the sourcing, trading, and export of Ugandan gold, we ensure that our clients receive only authentic, certified, and high-quality gold.
              </p>
              <p className="text-stone-600 leading-relaxed pl-3 md:pl-0 border-l-2 border-stone-100 md:border-none">
                 At Uganda Gold Hub, every transaction is conducted legally and transparently, giving buyers complete confidence and peace of mind. When you choose us, you are not just buying gold—you are securing a safe investment with a company built on trust, integrity, and excellence.
              </p>
            </div>

             <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-stone-100 text-amber-600"><Ship size={24} /></div>
                <h4 className="text-2xl font-serif text-stone-900 font-bold">Shipping and Documentation</h4>
              </div>
              <p className="text-stone-600 leading-relaxed mb-4 pl-3 md:pl-0 border-l-2 border-stone-100 md:border-none">
                At Uganda Gold Hub, we take pride in offering reliable and efficient global shipping services for gold. Through our trusted network of professional logistics partners, we ensure that every shipment is handled with the highest level of security and care.
              </p>
              <p className="text-stone-600 leading-relaxed pl-3 md:pl-0 border-l-2 border-stone-100 md:border-none">
                 From export permits to customs clearances, we handle the details so you can focus on your investment. Whether you are a buyer or seller, you can trust Uganda Gold Hub to deliver your gold securely and on time, no matter the destination.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
export default SectionAboutDetail;