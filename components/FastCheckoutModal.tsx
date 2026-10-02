import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Truck, CheckCircle2, MessageCircle, Sparkles, MapPin, User, Phone } from 'lucide-react';
import { Product } from '../types';
import { STORE_INFO } from '../constants';

interface FastCheckoutModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const FastCheckoutModal: React.FC<FastCheckoutModalProps> = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [deliveryArea, setDeliveryArea] = useState<'dhaka' | 'outside'>('dhaka');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isOpen || !product) return null;

  const itemPrice = product.numericPrice || 0;
  const subtotal = itemPrice * quantity;

  // Free delivery logic: 6-dozen combo or subtotal >= 1000
  const isFreeDelivery = subtotal >= 1000 || product.name.toLowerCase().includes('6-dozen') || product.name.toLowerCase().includes('mega combo');
  const deliveryCharge = isFreeDelivery ? 0 : (deliveryArea === 'dhaka' ? 70 : 130);
  const grandTotal = subtotal + deliveryCharge;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert("অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর এবং সম্পূর্ণ ঠিকানা প্রদান করুন।");
      return;
    }

    const orderText = `🌸 নতুন ক্যাশ অন ডেলিভারি অর্ডার — Pretty Pocket 🌸\n` +
      `----------------------------------------\n` +
      `🛍️ পণ্য: ${product.name}\n` +
      (selectedVariant ? `🎨 সাইজ/কালার অপশন: ${selectedVariant}\n` : '') +
      `🔢 পরিমাণ: ${quantity} টি\n` +
      `💰 পণ্যের মূল্য: ৳${subtotal}\n` +
      `🚚 ডেলিভারি চার্জ: ${isFreeDelivery ? 'ফ্রি (FREE)' : `৳${deliveryCharge} (${deliveryArea === 'dhaka' ? 'ঢাকার ভেতরে' : 'ঢাকার বাইরে'})`}\n` +
      `💵 সর্বমোট ক্যাশ অন ডেলিভারি: ৳${grandTotal}\n` +
      `----------------------------------------\n` +
      `👤 গ্রাহকের নাম: ${customerName}\n` +
      `📞 মোবাইল নম্বর: ${customerPhone}\n` +
      `📍 সম্পূর্ণ ঠিকানা: ${customerAddress}\n` +
      `----------------------------------------\n` +
      `পণ্যটি দ্রুত পাঠিয়ে দেওয়ার অনুরোধ জানাচ্ছি। ধন্যবাদ!`;

    // Direct WhatsApp link
    const whatsappUrl = `${STORE_INFO.whatsappLink}?text=${encodeURIComponent(orderText)}`;
    
    setOrderPlaced(true);
    // Optionally open WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1200);
  };

  const handleResetAndClose = () => {
    setOrderPlaced(false);
    setQuantity(1);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative border border-rose-100 max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-5 border-b border-rose-100 bg-rose-50/50 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                <Truck size={18} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-zinc-900">দ্রুত ক্যাশ অন ডেলিভারি অর্ডার (1-Step COD)</h3>
                <p className="text-xs text-rose-600 font-medium">পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন</p>
              </div>
            </div>
            <button
              onClick={handleResetAndClose}
              className="p-1.5 rounded-full hover:bg-white text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto space-y-6">
            {orderPlaced ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="font-serif text-2xl font-bold text-zinc-900">অর্ডার সফলভাবে গ্রহণ করা হয়েছে! 🌸</h4>
                <p className="text-xs text-zinc-600 max-w-md mx-auto leading-relaxed">
                  ধন্যবাদ, <strong>{customerName}</strong>! আপনার অর্ডারটি নিশ্চিত করতে আমাদের প্রতিনিধি অতি দ্রুত হোয়াটসঅ্যাপে বা ফোনে আপনার সাথে যোগাযোগ করবেন।
                </p>
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 max-w-sm mx-auto text-left text-xs space-y-1">
                  <div><strong>পণ্য:</strong> {product.name} ({quantity} টি)</div>
                  <div><strong>সর্বমোট প্রদেয়:</strong> <span className="font-bold text-rose-600">৳{grandTotal}</span> (Cash on Delivery)</div>
                  <div><strong>ঠিকানা:</strong> {customerAddress}</div>
                </div>
                <div className="pt-4">
                  <button
                    onClick={handleResetAndClose}
                    className="px-8 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    আরও কেনাকাটা করুন
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmitOrder} className="space-y-5">
                {/* Product Summary Row */}
                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-rose-50/40 border border-rose-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-16 h-16 rounded-xl object-cover border border-rose-200"
                  />
                  <div className="flex-1">
                    <h4 className="font-serif text-sm font-semibold text-zinc-900 line-clamp-1">{product.name}</h4>
                    <span className="font-bold text-rose-600 text-sm font-serif">{product.price}</span>
                  </div>

                  {/* Quantity Counter */}
                  <div className="flex items-center border border-zinc-200 rounded-lg bg-white overflow-hidden">
                    <button 
                      type="button" 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-2.5 py-1 text-zinc-500 hover:bg-zinc-100"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-zinc-900">{quantity}</span>
                    <button 
                      type="button" 
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-2.5 py-1 text-zinc-500 hover:bg-zinc-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Variants if any */}
                {product.variants && product.variants.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                      সাইজ বা কালার অপশন বেছে নিন (যদি থাকে):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedVariant(v)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            selectedVariant === v
                              ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                              : 'bg-white text-zinc-700 border-zinc-200 hover:border-rose-300'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Delivery Area Selection */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                    ডেলিভারি এলাকা নির্বাচন করুন:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label 
                      className={`p-3 rounded-xl border flex flex-col cursor-pointer transition-all ${
                        deliveryArea === 'dhaka' 
                          ? 'border-rose-500 bg-rose-50/60 shadow-sm' 
                          : 'border-zinc-200 bg-white hover:border-rose-200'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="delivery" 
                        value="dhaka" 
                        checked={deliveryArea === 'dhaka'} 
                        onChange={() => setDeliveryArea('dhaka')} 
                        className="sr-only" 
                      />
                      <span className="font-bold text-xs text-zinc-900">ঢাকার ভেতরে</span>
                      <span className="text-[11px] text-zinc-500 mt-0.5">
                        {isFreeDelivery ? 'ফ্রি ডেলিভারি 🎁' : 'চার্জ ৳৭০ (২৪-৪৮ ঘণ্টা)'}
                      </span>
                    </label>

                    <label 
                      className={`p-3 rounded-xl border flex flex-col cursor-pointer transition-all ${
                        deliveryArea === 'outside' 
                          ? 'border-rose-500 bg-rose-50/60 shadow-sm' 
                          : 'border-zinc-200 bg-white hover:border-rose-200'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="delivery" 
                        value="outside" 
                        checked={deliveryArea === 'outside'} 
                        onChange={() => setDeliveryArea('outside')} 
                        className="sr-only" 
                      />
                      <span className="font-bold text-xs text-zinc-900">ঢাকার বাইরে (সারা দেশ)</span>
                      <span className="text-[11px] text-zinc-500 mt-0.5">
                        {isFreeDelivery ? 'ফ্রি ডেলিভারি 🎁' : 'চার্জ ৳১৩০ (২-৪ দিন)'}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Customer Information Inputs */}
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-medium text-zinc-600 mb-1 flex items-center gap-1">
                      <User size={13} className="text-rose-500" />
                      <span>আপনার নাম *</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="যেমন: ইশিকা আহমেদ"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-rose-500 text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-600 mb-1 flex items-center gap-1">
                      <Phone size={13} className="text-rose-500" />
                      <span>মোবাইল নম্বর (সচল নম্বর দিন) *</span>
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="যেমন: 017XXXXXXXX"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 focus:outline-none focus:border-rose-500 text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-600 mb-1 flex items-center gap-1">
                      <MapPin size={13} className="text-rose-500" />
                      <span>সম্পূর্ণ ডেলিভারি ঠিকানা (বাসা/রোড/এলাকা/থানা/জেলা) *</span>
                    </label>
                    <textarea 
                      required
                      placeholder="যেমন: বাসা নং ১২, রোড ৩, ধানমন্ডি, ঢাকা"
                      rows={2}
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:border-rose-500 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                {/* Total Summary Breakdown */}
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-xs space-y-1.5">
                  <div className="flex justify-between text-zinc-600">
                    <span>পণ্যের উপ-মোট:</span>
                    <span>৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>ডেলিভারি চার্জ:</span>
                    <span>{isFreeDelivery ? <strong className="text-emerald-600">FREE</strong> : `৳${deliveryCharge}`}</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-200 flex justify-between items-center text-sm font-bold text-zinc-900">
                    <span>ক্যাশ অন ডেলিভারিতে মোট:</span>
                    <span className="text-rose-600 font-serif text-base">৳{grandTotal}</span>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.01]"
                >
                  <CheckCircle2 size={18} />
                  <span>অর্ডার কনফার্ম করুন (৳{grandTotal} Cash on Delivery)</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FastCheckoutModal;
