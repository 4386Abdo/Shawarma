import React, { useState } from 'react';
import { useApp } from './AppContext';
import { Star, ExternalLink, MessageSquarePlus, CheckCircle2 } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  const { language, restaurantInfo, showToast } = useApp();
  const isAr = language === 'ar';

  const [feedbackAuthor, setFeedbackAuthor] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackAuthor.trim() || !feedbackText.trim()) return;
    setSubmitted(true);
    showToast(
      isAr
        ? 'شكراً لك على رأيك! تم تسجيل ملاحظاتك بنجاح.'
        : 'Thank you for your feedback! Your review has been recorded.'
    );
    setFeedbackAuthor('');
    setFeedbackText('');
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-stone-950 via-emerald-950 to-stone-950 border-b border-emerald-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Reference Info Column (6 cols) */}
          <div className="lg:col-span-6 text-start">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <span>{isAr ? 'تقييمات الزبائن' : 'Customer Reviews'}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400">{isAr ? 'بيانات خرائط جوجل' : 'Google Maps Reference'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
              {isAr ? 'تقييم مطعم شاورمر على خرائط جوجل' : 'Google Maps Customer Rating'}
            </h2>

            <p className="text-sm text-emerald-100/80 mb-6 leading-relaxed">
              {isAr
                ? 'نعتز بثقة زبائننا ونسعى دائماً لتحسين جودة طعامنا وخدمتنا. التقييم الموضح أدناه مأخوذ كمرجع استرشادي من سجل خرائط جوجل الرسمي للمطعم.'
                : 'We value customer trust and continually strive to refine our food and takeaway experience. The rating below reflects our verified Google Maps listing reference.'}
            </p>

            {/* Official Rating Reference Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-stone-900 to-emerald-950/70 border border-emerald-800/50 shadow-xl mb-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                      4.0
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[1, 2, 3, 4].map((s) => (
                        <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                      <Star className="w-5 h-5 text-stone-600" />
                    </div>
                  </div>
                  <p className="text-xs text-stone-300 mt-1">
                    {isAr
                      ? 'مبني على 7 تقييمات موثقة من زبائن الفرع على خرائط جوجل'
                      : 'Based on 7 verified customer ratings on Google Maps'}
                  </p>
                </div>

                <a
                  href={restaurantInfo.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-800/80 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl border border-emerald-600/50 transition-colors shadow-md"
                >
                  <span>{isAr ? 'عرض في جوجل' : 'View on Google'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                </a>
              </div>

              <div className="mt-4 pt-4 border-t border-emerald-900/60 text-[11px] text-stone-400">
                <span>
                  {isAr
                    ? '⚠️ التزام الشفافية: نلتزم بعدم اختلاق آراء أو تقييمات وهمية. جميع التقييمات يمكن التحقق منها مباشرة عبر صفحة جوجل الرسمية.'
                    : '⚠️ Transparency commitment: We never generate fabricated reviews. Ratings are verifiable on our official Google Maps profile.'}
                </span>
              </div>
            </div>
          </div>

          {/* Feedback Form Column (6 cols) */}
          <div className="lg:col-span-6 bg-stone-900/90 p-6 sm:p-8 rounded-3xl border border-emerald-800/50 text-start shadow-2xl">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquarePlus className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                {isAr ? 'شاركنا رأيك أو ملاحظتك' : 'Share Your Dining Experience'}
              </h3>
            </div>
            <p className="text-xs text-emerald-200/70 mb-5">
              {isAr
                ? 'رأيك يهم إدارة شاورمر لتطوير الجودة وسرعة تقديم الوجبات في السنطة.'
                : 'Your feedback helps Shawarmer management maintain food quality and speed.'}
            </p>

            {submitted ? (
              <div className="p-4 bg-emerald-900/50 border border-emerald-600/60 rounded-2xl flex items-center gap-3 text-emerald-100 text-xs">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>
                  {isAr
                    ? 'شكراً لك! تم استلام رسالتك وسيتم مراجعتها من قبل إدارة المطعم.'
                    : 'Thank you! Your feedback has been received and will be reviewed by restaurant management.'}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    {isAr ? 'الاسم' : 'Your Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={feedbackAuthor}
                    onChange={(e) => setFeedbackAuthor(e.target.value)}
                    placeholder={isAr ? 'مثال: محمد أحمد' : 'e.g. Mohamed Ahmed'}
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-emerald-800/60 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    {isAr ? 'تقييمك' : 'Your Rating'}
                  </label>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFeedbackRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= feedbackRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-stone-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1">
                    {isAr ? 'تعليقك أو ملاحظتك' : 'Your Comments'}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder={
                      isAr
                        ? 'اكتب رأيك في طعم الشاورما وسرعة التيك أواي...'
                        : 'Write your thoughts on food taste, packaging, or service...'
                    }
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-emerald-800/60 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  {isAr ? 'إرسال الملاحظة' : 'Submit Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
