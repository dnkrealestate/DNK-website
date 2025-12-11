import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function FaqSection({promotionData}) {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
  { q: promotionData.q1, a: promotionData.a1 },
  { q: promotionData.q2, a: promotionData.a2 },
  { q: promotionData.q3, a: promotionData.a3 },
  { q: promotionData.q4, a: promotionData.a4 },
  { q: promotionData.q5, a: promotionData.a5 },
].filter(item => item.q && item.q.trim() !== "");


  const toggleFAQ = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="w-full bg-black py-12 px-4">
      <div className="max-w-[900px] m-auto">
        <h2 className="text-white text-center text-3xl md:text-4xl font-semibold mb-8 tracking-wide">
          { promotionData.faqTitle ? promotionData.faqTitle : 'Frequently Asked Questions' }
        </h2>

        <div className="space-y-4">
          {faqData.map((item, i) => (
            <div
              key={i}
              className="bg-[#111] border border-gray-700 rounded-md p-3 transition-all duration-300 hover:border-white/50 shadow-lg hover:shadow-xl cursor-pointer"
              onClick={() => toggleFAQ(i)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-white text-lg md:text-xl font-medium">
                  {item.q}
                </h3>
                {openIndex === i ? (
                  <FiChevronUp className="text-white" />
                ) : (
                  <FiChevronDown className="text-white" />)
                }
              </div>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-300 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
