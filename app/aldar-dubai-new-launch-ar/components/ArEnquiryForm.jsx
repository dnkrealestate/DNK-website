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

const PROPERTY_OPTIONS = ["تاون هاوس", "فيلا", "لم أقرر بعد"];
const CONTACT_OPTIONS = ["واتساب", "هاتف", "بريد إلكتروني"];
const BUDGET_OPTIONS = [
  "AED 2.8M – 3.5M",
  "AED 3.5M – 4.5M",
  "AED 4.5M+",
  "غير متأكد بعد",
];

const WHATSAPP_BASE =
  "مرحباً، أنا مهتم بالإطلاق السكني الجديد من ألدار في دبي. يرجى إرسال آخر تفاصيل المشروع والأسعار والمخططات وخطة الدفع.";

export default function ArEnquiryForm({
  defaultDocument = "",
  defaultProperty = "لم أقرر بعد",
  heading = "طلب معلومات",
  compact = false,
  onSuccess,
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(true);
  const [property, setProperty] = useState(defaultProperty);
  const [budget, setBudget] = useState("");
  const [contactMethod, setContactMethod] = useState("واتساب");
  const [documentRequested, setDocumentRequested] = useState(defaultDocument);
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
    if (property && property !== "لم أقرر بعد") parts.push(`Preferred Property: ${property}`);
    if (budget) parts.push(`Budget Range: ${budget}`);
    if (contactMethod) parts.push(`Preferred Contact Method: ${contactMethod}`);
    if (documentRequested) parts.push(`Document Requested: ${documentRequested}`);
    if (message) parts.push(`Message: ${message}`);
    return parts;
  };

  const addLeadToBitrix = async (extraFields) => {
    try {
      const commentParts = [
        ...extraFields,
        "Source: Aldar new launch Dubai landing page (Arabic) (project name unconfirmed)",
        ...(gclid ? [`GCLID: ${gclid}`] : []),
      ];

      await fetch(
        "https://crm.dnkre.com/rest/1/tu18jyuvffebb7mc/crm.lead.add.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: {
              TITLE: "Aldar Dubai New Launch (AR) - Website Lead",
              NAME: fullName,
              PHONE: [{ VALUE: phoneNumber, VALUE_TYPE: "WORK" }],
              EMAIL: [{ VALUE: email, VALUE_TYPE: "WORK" }],
              ADDRESS_CITY: extraFields.length ? extraFields.join(" | ") : "General Enquiry",
              COMMENTS: commentParts.join(" | "),
            },
          }),
        }
      );
    } catch (err) {
      console.error("Bitrix24 error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    track("Aldar Dubai New Launch AR Lead Submitted", {
      name: fullName,
      phone: phoneNumber,
      email,
      property,
      documentRequested,
    });

    const extraFields = buildExtraFieldsSummary();

    // Fired independently of our own backend call below, so a Bitrix24 lead
    // is still created even if contactData() fails.
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
          form_name: "Aldar Dubai New Launch AR Lead Form",
          user_name: fullName,
          user_email: email,
          property_preference: property,
          document_requested: documentRequested || "none",
        });
      }

      Swal.fire({
        title: `شكراً لك، ${fullName}!`,
        html: `<p>تم استلام طلبك.${
          documentRequested
            ? ` سيرسل لك أحد مستشاري DNK العقارية ${documentRequested} قريباً.`
            : " سيتواصل معك أحد مستشاري DNK العقارية قريباً بآخر المعلومات المتوفرة عن المشروع."
        } هذا استفسار، وليس دفعة أو حجزاً.</p>`,
        icon: "success",
        confirmButtonColor: "#C6A46A",
      });

      setFullName("");
      setEmail("");
      setPhoneNumber("");
      setProperty(defaultProperty);
      setBudget("");
      setContactMethod("واتساب");
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
    "w-full bg-white/5 border border-white/15 p-3 rounded-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#C6A46A] transition-colors text-sm";
  const selectCls =
    "w-full bg-[#0D1520] border border-white/15 p-3 rounded-sm text-white focus:outline-none focus:border-[#C6A46A] transition-colors text-sm";

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      <input type="hidden" name="gclid" value={gclid} />
      <div>
        <label className="text-white/60 text-xs font-medium mb-1.5 block">الاسم الكامل *</label>
        <input
          placeholder="الاسم الكامل"
          type="text"
          className={inputCls}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-white/60 text-xs font-medium mb-1.5 block">البريد الإلكتروني *</label>
          <input
            placeholder="البريد الإلكتروني"
            type="email"
            className={inputCls}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="text-white/60 text-xs font-medium mb-1.5 block">رقم الهاتف *</label>
          <div className="phoneInput" dir="ltr">
            <PhoneInput
              enableSearch
              placeholder="رقم الهاتف"
              country="ae"
              value={phoneNumber}
              onChange={handleChangePhone}
              enableAreaCodeStretch
              inputProps={{ required: true }}
              className="w-full bg-transparent border border-white/15 p-[5px] pr-0 rounded-sm text-white"
            />
          </div>
          {errors.phoneNumber ? (
            <p className="text-red-400 text-xs mt-1">{errors.phoneNumber}</p>
          ) : phoneNumber ? (
            valid ? (
              <p className="text-green-400 text-xs mt-1">يبدو جيداً</p>
            ) : (
              <p className="text-red-400 text-xs mt-1">{getPhoneValidationMessage(phoneNumber)}</p>
            )
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-white/60 text-xs font-medium mb-1.5 block">نوع العقار المفضل</label>
          <select className={selectCls} value={property} onChange={(e) => setProperty(e.target.value)}>
            {PROPERTY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-white/60 text-xs font-medium mb-1.5 block">نطاق الميزانية</label>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-white/60 text-xs font-medium mb-1.5 block">طريقة التواصل المفضلة</label>
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
        <div>
          <label className="text-white/60 text-xs font-medium mb-1.5 block">المستند المطلوب</label>
          <select
            className={selectCls}
            value={documentRequested}
            onChange={(e) => setDocumentRequested(e.target.value)}
          >
            <option value="">بدون</option>
            <option value="Brochure">الكتيب</option>
            <option value="Floor Plans">المخططات</option>
            <option value="Master Plan">المخطط الرئيسي</option>
            <option value="Payment Plan">خطة الدفع</option>
          </select>
        </div>
      </div>

      {!compact && (
        <div>
          <label className="text-white/60 text-xs font-medium mb-1.5 block">رسالة (اختياري)</label>
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
        className="w-full bg-gradient-to-r from-[#C6A46A] to-[#A9874F] hover:brightness-110 text-[#071321] font-bold py-3.5 rounded-sm transition-all duration-300 flex items-center justify-center text-sm tracking-wide"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-[#071321]/40 border-t-transparent rounded-full animate-spin" />
        ) : (
          heading
        )}
      </button>

      <div className="flex items-center justify-center gap-2 pt-1">
        <span className="text-white/40 text-xs">أو تواصل معنا عبر</span>
        <a
          href={`https://wa.me/+971555769195?text=${encodeURIComponent(WHATSAPP_BASE)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[#25D366] hover:text-[#1aad53] transition-colors text-xs font-semibold"
        >
          <FaWhatsapp className="text-sm" />
          واتساب
        </a>
      </div>
    </form>
  );
}
