import React from 'react';
import { motion } from 'motion/react';
import { Star, Heart, CheckCircle2, MapPin, Sparkles } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "সামিয়া আফরিন (Samia Afrin)",
    location: "ধানমন্ডি, ঢাকা",
    product: "জেলি চুড়ি সেট (Purple & Green)",
    rating: 5,
    date: "৩ দিন আগে",
    comment: "জেলি চুড়িগুলোর গ্লসি ফিনিশ জাস্ট ওয়াও! ছবিতে যেমন দেখেছি বাস্তবে তার চেয়েও অনেক বেশি গর্জিয়াস লাগছে। সাইজ ২.৬ একদম পারফেক্ট ফিট হয়েছে। ঢাকা সিটিতে ১ দিনের মধ্যেই ডেলিভারি পেয়েছি!"
  },
  {
    id: 2,
    name: "তানজিলা নূর (Tanzila Noor)",
    location: "নাসিরাবাদ, চট্টগ্রাম",
    product: "কাস্টমাইজড লেইস ক্রাঞ্চি বোকে",
    rating: 5,
    date: "১ সপ্তাহ আগে",
    comment: "বেস্টফ্রেন্ডের জন্মদিনে ক্রাঞ্চি লেইস বোকে অর্ডার করেছিলাম। প্যাকেজিং আর রিবন এতো কিউট করে সাজানো ছিল যে ও একদম সারপ্রাইজড হয়ে গেছে! ঢাকার বাইরে চট্টগ্রামে খুব নিরাপদে পৌঁছেছে।"
  },
  {
    id: 3,
    name: "নুসরাত জাহান (Nusrat Jahan)",
    location: "মিরপুর-১০, ঢাকা",
    product: "কাশ্মীরি চুড়ি ৬ ডজন মেগা কম্বো",
    rating: 5,
    date: "২ সপ্তাহ আগে",
    comment: "৬ ডজনের কাশ্মীরি চুড়ির কম্বোটা নিয়েছিলাম। সবচেয়ে ভালো লেগেছে ডেলিভারি চার্জ একদম ফ্রি ছিল এবং সাথে কিউট একটা সিক্রেট গিফটও পেয়েছি! চুড়ির কাজগুলো প্রিমিয়াম কোয়ালিটির।"
  },
  {
    id: 4,
    name: "সাদিয়া ইসলাম (Sadia Islam)",
    location: "জিন্দাবাজার, সিলেট",
    product: "কালারফুল মিনি হেয়ার ব্যান্ড ও সেফটিপিন",
    rating: 5,
    date: "৩ সপ্তাহ আগে",
    comment: "মাত্র ৯৯ টাকায় এতো বড় মিনি হেয়ার ব্যান্ড সেট আর স্টোন সেফটিপিন পাওয়া আসলেই পকেট ফ্রেন্ডলি। ক্যাশ অন ডেলিভারিতে কোনো ঝামেলা ছাড়াই পেয়েছি। প্রিটি পকেটের জন্য শুভকামনা!"
  }
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gradient-to-b from-white via-rose-50/20 to-white">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-rose-500 mb-3 block">
          Customer Love & Trust
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-zinc-900 mb-4 tracking-tight">
          আমাদের সম্মানিত গ্রাহকদের মতামত
        </h2>
        <p className="text-zinc-600 text-sm sm:text-base font-light">
          ঢাকা ও সারা বাংলাদেশের ১,২০০+ হ্যাপি আপু ও ভাইয়াদের মিষ্টি অভিজ্ঞতা ও রিভিউ।
        </p>

        {/* Rating Badge */}
        <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-rose-50 border border-rose-200/80 shadow-sm">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="font-bold text-sm text-zinc-800">৪.৯/৫ রেটিং</span>
          <span className="text-zinc-400">|</span>
          <span className="text-xs text-rose-700 font-medium">১০০% ভেরিফাইড ক্যাশ অন ডেলিভারি</span>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {reviews.map((rev) => (
          <motion.div
            key={rev.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-rose-100/90 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
          >
            <div>
              {/* Top Row: Stars + Date */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] text-zinc-400">{rev.date}</span>
              </div>

              {/* Product Badge */}
              <div className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-medium mb-3 border border-rose-100">
                আইটেম: {rev.product}
              </div>

              {/* Comment */}
              <p className="text-zinc-700 text-sm leading-relaxed font-light mb-6">
                "{rev.comment}"
              </p>
            </div>

            {/* Customer Info */}
            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm text-zinc-900">
                  <span>{rev.name}</span>
                  <CheckCircle2 size={14} className="text-emerald-500 fill-emerald-100" />
                </div>
                <div className="flex items-center gap-1 text-xs text-zinc-400 mt-0.5">
                  <MapPin size={12} className="text-rose-400" />
                  <span>{rev.location}</span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-200 to-amber-200 flex items-center justify-center text-rose-700 text-xs font-bold">
                {rev.name.charAt(0)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Stats Bar */}
      <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-6 rounded-2xl bg-white border border-rose-100">
          <div className="font-serif text-2xl sm:text-3xl font-bold text-rose-600">১,২০০+</div>
          <div className="text-xs text-zinc-500 font-light mt-1">সফল ডেলিভারি</div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-rose-100">
          <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-600">৬৪ জেলা</div>
          <div className="text-xs text-zinc-500 font-light mt-1">দেশজুড়ে কভারেজ</div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-rose-100">
          <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-600">১০০%</div>
          <div className="text-xs text-zinc-500 font-light mt-1">ক্যাশ অন হোম ডেলিভারি</div>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-rose-100">
          <div className="font-serif text-2xl sm:text-3xl font-bold text-purple-600">Under ৳২৯৯</div>
          <div className="text-xs text-zinc-500 font-light mt-1">পকেট ফ্রেন্ডলি প্রাইস</div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
