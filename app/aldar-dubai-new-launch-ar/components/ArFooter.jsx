import React from "react";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const WHATSAPP_TEXT =
  "مرحباً، أنا مهتم بالإطلاق السكني الجديد من ألدار في دبي";

const SOCIALS = [
  { icon: FaInstagram, url: "https://www.instagram.com/dnk_re/", label: "Instagram" },
  { icon: FaFacebookF, url: "https://www.facebook.com/dnkrealestate1/", label: "Facebook" },
  { icon: FaLinkedinIn, url: "https://www.linkedin.com/company/dnkrealestate/", label: "LinkedIn" },
  { icon: FaYoutube, url: "https://www.youtube.com/channel/UCKH7d3Sx2dkfb4pEXXaMpFA", label: "YouTube" },
];

export default function ArFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#050B13] pt-14 pb-28 sm:pb-8 px-5 sm:px-8">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-10 pb-10 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/assets/aldar-dubai-launch/logos/logo-aldar-ink.svg"
                alt="ألدار"
                width={461}
                height={461}
                className="h-9 w-auto brightness-0 invert"
              />
              <span className="flex flex-col leading-none border-r border-white/20 pr-3">
                <span className="font-[family-name:var(--font-display)] text-white text-base font-semibold tracking-wide">
                  ألدار
                </span>
                <span className="text-[#B7B0A5] text-[0.6rem] tracking-[0.25em] uppercase">
                  إطلاق جديد &middot; دبي
                </span>
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-[360px] mb-5">
              تمنحك DNK العقارية وصولاً مبكرًا إلى إطلاق ألدار الجديد
              والمنتظر بشدة في دبي. سجّل اهتمامك الآن، وأخبرنا بالوحدة
              التي تفضلها، وكن أول من يحصل على الأسعار والتوافر وعروض
              الإطلاق فور تأكيدها.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#C6A46A] flex items-center justify-center text-white/60 hover:text-[#071321] transition-all"
                >
                  <s.icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#C6A46A] mt-1 flex-shrink-0" />
                <span className="text-white/50 text-sm">
                  مكتب رقم 603، بناية ساما، البرشاء 1، دبي، الإمارات العربية المتحدة
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#C6A46A] flex-shrink-0" />
                <a href="tel:+971555769195" className="text-white/50 hover:text-white text-sm transition-colors">
                  +971 55 576 9195
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-[#C6A46A] flex-shrink-0" />
                <a href="mailto:info@dnkre.com" className="text-white/50 hover:text-white text-sm transition-colors">
                  info@dnkre.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-[#25D366] flex-shrink-0" />
                <a
                  href={`https://wa.me/+971555769195?text=${encodeURIComponent(WHATSAPP_TEXT)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  تواصل عبر واتساب
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 space-y-3">
          <p className="text-white/35 text-xs leading-relaxed max-w-[900px]">
            يحظى إطلاق ألدار الجديد في دبي باهتمام مبكر قوي. ومع تأكيد
            التفاصيل النهائية للمشروع، يحرص فريقنا على إبقاء كل مسجل على
            اطلاع أولاً بأول &mdash; سجّل اهتمامك اليوم لتكون في الصدارة
            قبل الإطلاق الرسمي.
          </p>
          <p className="text-white/25 text-xs">&copy; {year} DNK العقارية. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
