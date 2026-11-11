"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { userUserServices } from "@/services/userServices";
import Swal from "sweetalert2";
import { track } from "@vercel/analytics";
import { isValidPhoneNumber, getPhoneValidationMessage } from "@/utils/validatePhone";
import { useGclid } from "@/app/hooks/useGclid";
import { BITRIX_LEAD_URL, WHATSAPP_NUMBER } from "../../palm-springs-nakheel-premium/constants";
import { WHATSAPP_TEXT_AR } from "../arLabels";

const PURPOSE_OPTIONS = ["استثمار", "سكن شخصي", "منزل ثانٍ", "دخل إيجاري"];
const CONTACT_OPTIONS = ["واتساب", "هاتف", "بريد إلكتروني"];
const PROPERTY_TYPE_OPTIONS = ["كلاهما", "تاون هاوس (3 و4 غرف)", "فيلات (4 و5 غرف)"];
const BUDGET_OPTIONS = ["$1M - $1.5M", "$1.5M - $2M", "$2M - $2.5M+"];

export default function ArEnquiryForm({
  defaultInterest = "",
  heading = "طلب استشارة خاصة",
  compact = false,
  extended = false,
  onSuccess,
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const [interest, setInterest] = useState(defaultInterest);
  const [contactMethod, setContactMethod] = useState("واتساب");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { contactData } = userUserServices();
  const gclid = useGclid();

  const validateForm = () => {
    const formErrors = {};
    if (!fullName) formErrors.fullName = "الاسم الكامل مطلوب.";
    if (!email) {
      formErrors.email = "البريد الإلكتروني مطلوب.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formErrors.email = "صيغة البريد الإلكتروني غير صحيحة.";
    }
    if (!phoneNumber) {
      formErrors.phoneNumber = "رقم الهاتف مطلوب.";
    } else if (!isValidPhoneNumber(phoneNumber)) {
      formErrors.phoneNumber = "يرجى إدخال رقم هاتف صحيح.";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleChangePhone = (value) => {
    setPhoneNumber(value);
    setValid(isValidPhoneNumber(value));
  };

  const buildExtraFieldsSummary = () => {
    const parts = [];
    if (interest) parts.push(`Purpose: ${interest}`);
    if (propertyType) parts.push(`Preferred Property Type: ${propertyType}`);
    if (budget) parts.push(`Budget: ${budget}`);
    if (contactMethod) parts.push(`Preferred Contact Method: ${contactMethod}`);
    if (message) parts.push(`Message: ${message}`);
    return parts;
  };

  const addLeadToBitrix = async (extraFields) => {
    try {
      const commentParts = [
        ...extraFields,
        "Source: Palm Springs by Nakheel premium presentation (Arabic) (project details unconfirmed)",
        ...(gclid ? [`GCLID: ${gclid}`] : []),
      ];

      await fetch(BITRIX_LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            TITLE: "Palm Springs by Nakheel (Premium AR) - Website Lead",
            NAME: fullName,
            PHONE: [{ VALUE: phoneNumber, VALUE_TYPE: "WORK" }],
            EMAIL: [{ VALUE: email, VALUE_TYPE: "WORK" }],
            ADDRESS_CITY: extraFields.length ? extraFields.join(" | ") : "General Enquiry",
            COMMENTS: commentParts.join(" | "),
          },
        }),
      });
    } catch (err) {
      console.error("Bitrix24 error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    track("Palm Springs Nakheel Premium AR Lead Submitted", {
      name: fullName,
      phone: phoneNumber,
      email,
      interest,
    });

    const extraFields = buildExtraFieldsSummary();
    addLeadToBitrix(extraFields);

    try {
      await contactData({
        fullName,
        email,
        phoneNumber,
        city: extraFields.length ? extraFields.join(" | ") : "General Enquiry",
        gclid,
      });

      if (typeof window !== "undefined" && window.snaptr) {
        window.snaptr("track", "SIGN_UP", {
          user_email: email,
          user_phone_number: phoneNumber,
          firstname: fullName,
        });
      }

      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "contact_form_submitted",
          form_name: "Palm Springs Nakheel Premium AR Lead Form",
          user_name: fullName,
          user_email: email,
          interest: interest || "none",
        });
        try {
          window.localStorage.setItem("pp_lead_registered", "true");
        } catch {}
        window.dispatchEvent(new Event("pp-lead-registered"));
      }

      Swal.fire({
        title: `شكراً لك، ${fullName}!`,
        html: `<p>تم استلام طلبك. سيتواصل فريقنا معك قريباً بآخر المعلومات المتوفرة عن المشروع. هذا استفسار، وليس دفعة أو حجزاً.</p>`,
        icon: "success",
        confirmButtonColor: "#343B32",
      });

      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setInterest(defaultInterest);
      setContactMethod("واتساب");
      setPropertyType("");
      setBudget("");
      setMessage("");
      setErrors({});
      onSuccess?.();
    } catch (err) {
      Swal.fire("خطأ", "يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.", "error");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-[#F5F8FB] border border-[#102B46]/15 p-3 rounded-xl text-[#102B46] placeholder:text-[#102B46]/35 focus:outline-none focus:border-[#367BA8] transition-colors text-sm";
  const selectCls =
    "w-full bg-[#F5F8FB] border border-[#102B46]/15 p-3 rounded-xl text-[#102B46] focus:outline-none focus:border-[#367BA8] transition-colors text-sm";

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      <input type="hidden" name="gclid" value={gclid} />
      <div>
        <label className="text-[#102B46]/60 text-xs font-medium mb-1.5 block">الاسم الكامل *</label>
        <input
          placeholder="الاسم الكامل"
          type="text"
          className={inputCls}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        {errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="min-w-0">
          <label className="text-[#102B46]/60 text-xs font-medium mb-1.5 block">البريد الإلكتروني *</label>
          <input
            placeholder="البريد الإلكتروني"
            type="email"
            className={inputCls}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="min-w-0">
          <label className="text-[#102B46]/60 text-xs font-medium mb-1.5 block">رقم الهاتف *</label>
          <div className="phoneInput max-w-full overflow-hidden" dir="ltr">
            <PhoneInput
              enableSearch
              placeholder="رقم الهاتف"
              country="ae"
              value={phoneNumber}
              onChange={handleChangePhone}
              enableAreaCodeStretch
              inputProps={{ required: true }}
              containerClass="w-full max-w-full"
              className="w-full max-w-full bg-transparent border border-[#102B46]/15 p-[5px] pr-0 rounded-xl text-[#102B46]"
            />
          </div>
          {errors.phoneNumber ? (
            <p className="text-red-600 text-xs mt-1">{errors.phoneNumber}</p>
          ) : phoneNumber ? (
            valid ? (
              <p className="text-green-700 text-xs mt-1">يبدو جيداً</p>
            ) : (
              <p className="text-red-600 text-xs mt-1">{getPhoneValidationMessage(phoneNumber)}</p>
            )
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="min-w-0">
          <label className="text-[#102B46]/60 text-xs font-medium mb-1.5 block">الغرض</label>
          <select className={selectCls} value={interest} onChange={(e) => setInterest(e.target.value)}>
            <option value="">اختر</option>
            {PURPOSE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-0">
          <label className="text-[#102B46]/60 text-xs font-medium mb-1.5 block">طريقة التواصل المفضلة</label>
          <select
            className={selectCls}
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value)}
          >
            {CONTACT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {extended && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="min-w-0">
            <label className="text-[#102B46]/60 text-xs font-medium mb-1.5 block">نوع العقار المفضل</label>
            <select className={selectCls} value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
              <option value="">اختر</option>
              {PROPERTY_TYPE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-0">
            <label className="text-[#102B46]/60 text-xs font-medium mb-1.5 block">الميزانية (دولار أمريكي)</label>
            <select className={selectCls} value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option value="">اختر النطاق</option>
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {!compact && (
        <div>
          <label className="text-[#102B46]/60 text-xs font-medium mb-1.5 block">رسالة (اختياري)</label>
          <textarea
            placeholder="أخبرنا بأي شيء آخر يجب أن نعرفه"
            rows={3}
            className={inputCls}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#102B46] hover:bg-[#174A73] text-white font-bold py-3.5 rounded-full transition-all duration-300 flex items-center justify-center text-sm tracking-wide"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/40 border-t-transparent rounded-full animate-spin" />
        ) : (
          heading
        )}
      </button>

      <div className="flex items-center justify-center gap-2 pt-1">
        <span className="text-[#102B46]/40 text-xs">أو تواصل معنا عبر</span>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodeURIComponent(WHATSAPP_TEXT_AR)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[#1f7a4d] hover:text-[#15603b] transition-colors text-xs font-semibold"
        >
          <FaWhatsapp className="text-sm" />
          واتساب
        </a>
      </div>
    </form>
  );
}
