import React from "react";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaLinkedin } from "react-icons/fa";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
import { WHATSAPP_NUMBER } from "../../palm-springs-nakheel-premium/constants";
import { WHATSAPP_TEXT_AR } from "../arLabels";

const LINKS = [
  { name: "نظرة عامة", id: "overview" },
  { name: "الوحدات السكنية", id: "residences" },
  { name: "نمط الحياة", id: "lifestyle" },
  { name: "معرض الصور", id: "gallery" },
  { name: "الموقع", id: "location" },
  { name: "الاستثمار", id: "investment" },
];

export default function ArFooter() {
  return (
    <footer className="bg-[#102B46] text-white px-4 sm:px-6 lg:px-10 py-14 sm:py-16">
      <div className="grid sm:grid-cols-3 gap-10 mb-12">
        <div>
          <Image
            src="/assets/palm-springs-nakheel/logos/palm-springs-logo.webp"
            alt="بالم سبرينغز من نخيل"
            width={1317}
            height={324}
            className="h-9 w-auto mb-4 brightness-0 invert"
          />
          <p className="text-white/45 text-sm leading-relaxed max-w-[280px]">
            عرض تسويقي خاص لمشروع بالم سبرينغز من نخيل.
          </p>
        </div>

        <div>
          <p className="text-white/40 text-xs font-semibold tracking-[0.15em] uppercase mb-4">روابط سريعة</p>
          <ul className="space-y-2.5">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-white/65 hover:text-[#8DB6D3] text-sm transition-colors">
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white/40 text-xs font-semibold tracking-[0.15em] uppercase mb-4">تواصل معنا</p>
          <ul className="space-y-3">
            <li>
              <a href="tel:+971555769195" className="flex items-center gap-2 text-white/65 hover:text-[#8DB6D3] text-sm transition-colors">
                <IoCallOutline /> <span dir="ltr">+971 55 576 9195</span>
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodeURIComponent(WHATSAPP_TEXT_AR)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/65 hover:text-[#8DB6D3] text-sm transition-colors"
              >
                <FaWhatsapp /> واتساب
              </a>
            </li>
            <li>
              <a href="mailto:info@dnkre.com" className="flex items-center gap-2 text-white/65 hover:text-[#8DB6D3] text-sm transition-colors">
                <IoMailOutline /> info@dnkre.com
              </a>
            </li>
          </ul>
          <div className="flex items-center gap-3 mt-5">
            <a href="https://www.instagram.com/dnk_re/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/50 hover:text-[#8DB6D3] transition-colors">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/dnkrealestate1/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/50 hover:text-[#8DB6D3] transition-colors">
              <FaFacebookF />
            </a>
            <a href="https://www.linkedin.com/company/dnkrealestate/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/50 hover:text-[#8DB6D3] transition-colors">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10">
        <p className="text-white/35 text-xs leading-relaxed max-w-[760px]">
          هذا عرض تسويقي مستقل للترويج لمشروع بالم سبرينغز من نخيل، وهو
          مشروع سكني معلن في دبي. هذا الموقع ليس الموقع الرسمي لنخيل.
          الأسعار المعروضة بالدولار الأمريكي هي تحويل تقريبي من الأرقام
          المعلنة بالدرهم الإماراتي، وهي للاطلاع فقط. تفاصيل المشروع
          والأسعار والتوافر والمواصفات تبقى خاضعة لتأكيد نخيل أو ممثل
          معتمد عنها.
        </p>
        <p className="text-white/25 text-xs mt-4">
          &copy; {new Date().getFullYear()} DNK Real Estate L L C. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
