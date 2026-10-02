import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../constants';

const faqs = [
  {
    id: 1,
    question: "ডেলিভারি চার্জ কত এবং কতদিনে ডেলিভারি পাব?",
    englishQ: "What are the delivery charges and delivery timeframe?",
    answer: "ঢাকা সিটির ভেতরে ডেলিভারি চার্জ মাত্র ৳৭০ এবং ২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডেলিভারি সম্পন্ন হয়। ঢাকার বাইরে সারা বাংলাদেশে ডেলিভারি চার্জ ৳১৩০ এবং ২ থেকে ৪ দিনের মধ্যে হোম ডেলিভারি পৌঁছে দেওয়া হয়। (স্পেশাল অফার: ৬ ডজন কাশ্মীরি চুড়ি অথবা ৳১০০০ এর বেশি অর্ডারে সারা দেশে ডেলিভারি একদম ফ্রি!)"
  },
  {
    id: 2,
    question: "সারা বাংলাদেশে কি ক্যাশ অন হোম ডেলিভারি পাওয়া যাবে?",
    englishQ: "Is Cash on Delivery (COD) available nationwide across Bangladesh?",
    answer: "হ্যাঁ, সম্পূর্ণ ক্যাশ অন ডেলিভারি সুবিধা রয়েছে! ঢাকা শহরসহ বাংলাদেশের সকল জেলা ও থানায় পণ্য হাতে পেয়ে দেখে ডেলিভারিম্যানকে মূল্য পরিশোধ করার সুবিধা পাবেন।"
  },
  {
    id: 3,
    question: "লেইস বা কিন্ডারজয় বোকে কি নিজের পছন্দমত কাস্টমাইজ করা যায়?",
    englishQ: "Can I customize the Lays or chocolate bouquets for birthdays & anniversaries?",
    answer: "অবশ্যই! আপনার বা প্রিয়জনের পছন্দের যেকোনো ফ্লেভারের চিপস, ফেভারিট চকোলেট এবং বিশেষ ভালোবাসার চিরকুট/মেসেজ কার্ড দিয়ে আকর্ষণীয় বোকে ডিজাইন করে দেওয়া হয়।"
  },
  {
    id: 4,
    question: "চুড়ির সঠিক সাইজ কীভাবে বাছাই করব?",
    englishQ: "How do I choose the correct bangle size (2.4, 2.6, 2.8)?",
    answer: "আমাদের কালেকশনে মূলত ৩টি সাইজ থাকে: ২.৪ (স্মল - চিকন কব্জি), ২.৬ (মিডিয়াম - স্ট্যান্ডার্ড বাংলাদেশি সাইজ), এবং ২.৮ (লার্জ - চওড়া কব্জি)। আপনি আপনার ঘরে থাকা যেকোনো রেগুলার চুড়ির ভেতরের ব্যাস স্কেল দিয়ে মেপে আমাদের সাইজ চার্টের সাথে মিলিয়ে নিতে পারেন।"
  },
  {
    id: 5,
    question: "কীভাবে সহজে অর্ডার করব?",
    englishQ: "How can I easily place an order?",
    answer: "অর্ডার করার সবচেয়ে সহজ ২টি উপায় রয়েছে: ১) যেকোনো পণ্যের নিচে 'অর্ডার করুন' বাটনে ক্লিক করে নাম ও ঠিকানা লিখে ৩০ সেকেন্ডে অর্ডার কনফার্ম করতে পারেন, অথবা ২) সরাসরি আমাদের অফিসিয়াল হোয়াটসঅ্যাপ (+880 1314-671743) বা ইনস্টাগ্রামে (@prettypoket) মেসেজ দিতে পারেন।"
  },
  {
    id: 6,
    question: "ড্যামেজ বা ভুল পণ্য পেলে কি এক্সচেঞ্জ সম্ভব?",
    englishQ: "What is your replacement or return policy?",
    answer: "গ্রাহকের সন্তুষ্টিই আমাদের অগ্রাধিকার। ডেলিভারি গ্রহণের সময় একটি আনবক্সিং ভিডিও রাখবেন। পণ্য ক্ষতিগ্রস্ত বা ভুল সাইজ হলে ডেলিভারির ২৪ ঘণ্টার মধ্যে আমাদের হোয়াটসঅ্যাপে যোগাযোগ করলে দ্রুত সমাধান বা এক্সচেঞ্জ করে দেওয়া হবে।"
  }
];

const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId(prev => prev === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto bg-white">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-rose-500 mb-3 block">
          Got Questions? We Have Answers
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-zinc-900 mb-4 tracking-tight">
          সাধারণ জিজ্ঞাসা (FAQ)
        </h2>
        <p className="text-zinc-600 text-sm sm:text-base font-light">
          ডেলিভারি, ক্যাশ অন ডেলিভারি, চুড়ির সাইজ ও কাস্টমাইজেশন সম্পর্কিত তথ্য জেনে নিন।
        </p>
      </div>

      {/* Accordion Container */}
      <div className="space-y-4">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div 
              key={faq.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen 
                  ? 'border-rose-300 bg-rose-50/20 shadow-sm' 
                  : 'border-zinc-200/80 bg-white hover:border-rose-200'
              }`}
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full py-5 px-6 flex justify-between items-center text-left gap-4"
                aria-expanded={isOpen}
              >
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-zinc-900">
                    {faq.question}
                  </h3>
                  <span className="text-xs text-zinc-400 font-light hidden sm:inline">
                    {faq.englishQ}
                  </span>
                </div>

                <div className={`p-1.5 rounded-full transition-transform duration-300 flex-shrink-0 ${
                  isOpen ? 'bg-rose-500 text-white rotate-180' : 'bg-zinc-100 text-zinc-500'
                }`}>
                  <ChevronDown size={18} />
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-6 pb-6 pt-1 text-sm text-zinc-600 font-light leading-relaxed border-t border-rose-100/60">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Need More Help Footer */}
      <div className="mt-12 p-6 rounded-3xl bg-rose-50/60 border border-rose-100 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h4 className="font-serif text-base font-bold text-zinc-900 flex items-center gap-1.5">
            <Sparkles size={16} className="text-amber-500" />
            <span>অন্য কোনো তথ্য জানতে চান?</span>
          </h4>
          <p className="text-xs text-zinc-500 font-light mt-0.5">
            আমাদের কাস্টমার সাপোর্ট টিম আপনাকে সরাসরি হোয়াটসঅ্যাপে সাহায্য করতে প্রস্তুত।
          </p>
        </div>

        <a
          href={`${STORE_INFO.whatsappLink}?text=${encodeURIComponent("Hi Pretty Pocket! I have an inquiry.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold tracking-wider transition-all shadow-md hover:shadow-emerald-600/30 whitespace-nowrap"
        >
          <MessageCircle size={16} />
          <span>হোয়াটসঅ্যাপে প্রশ্ন করুন</span>
        </a>
      </div>
    </section>
  );
};

export default FAQ;
