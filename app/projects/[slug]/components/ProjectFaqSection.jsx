import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export default function ProjectFaqSection({projectId}) {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
  { q: projectId.q1, a: projectId.a1 },
  { q: projectId.q2, a: projectId.a2 },
  { q: projectId.q3, a: projectId.a3 },
  { q: projectId.q4, a: projectId.a4 },
  { q: projectId.q5, a: projectId.a5 },
].filter(item => item.q && item.q.trim() !== "");


  const toggleFAQ = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a || "",
      },
    })),
  };

  return (
    <section className="w-full bg-black py-2 px-4">
      {faqData.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="max-w-[900px] m-auto">
        {projectId.faqTitle && (
          <h2 className="text-white text-center font-semibold mb-8 tracking-wide">
            {projectId.faqTitle}
          </h2>
        )}

        <div className="space-y-4">
          {faqData.map((item, i) => (
            <div
              key={i}
              className="bg-[#111] border border-gray-700 rounded-md p-3 transition-all duration-300 hover:border-white/50 shadow-lg hover:shadow-xl cursor-pointer"
              onClick={() => toggleFAQ(i)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-white font-medium">
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
