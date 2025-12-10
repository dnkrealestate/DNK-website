import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      q: "What makes this project unique?",
      a: "Our project features world‑class amenities, smart‑home technology, high‑end interiors, and a prime location offering both luxury and convenience.",
    },
    {
      q: "Is there any payment plan available?",
      a: "Yes, we offer flexible payment plans tailored to your needs, including post‑handover options depending on availability.",
    },
    {
      q: "How can I schedule a site visit?",
      a: "You can schedule a site visit anytime by requesting a callback or contacting our sales team directly.",
    },
    {
      q: "Are these units freehold?",
      a: "Yes, all properties in this project come with 100% freehold ownership for all nationalities.",
    },
  ];

  const toggleFAQ = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="w-full bg-black py-12 px-4">
      <div className="max-w-[900px] m-auto">
        <h2 className="text-white text-center text-3xl md:text-4xl font-semibold mb-8 tracking-wide">
          Frequently Asked Questions
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
