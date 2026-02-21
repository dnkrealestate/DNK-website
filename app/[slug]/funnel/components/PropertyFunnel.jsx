"use client";

import { useState, useEffect, useRef } from "react"; 
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";
import FunnelContactForm from "./FunnelContactForm";


const questions = [
  {
    question: "Choose preferred location",
    options: [
      "Dubai Marina",
      "Business Bay",
      "Dubai Creek Harbour",
      "Palm Jumeirah",
      "Downtown Dubai",
      "JBR", 
      "Dubai Hills Estate",
      "Al Barari",
      "JVC",
      "Dubai Silicon Oasis",
      "Dubai Sports City",
      "Dubai Festival City",
      "Dubai South",
      "Dubai Waterfront",
      "Dubai Land",
      "Dubai Studio City",
      "Dubai Motor City",
      "Dubai International City",
      "Al Furjan",
      "Al warsan",
      "Other",
    ],
  },
  {
    question: "Preferable Budget",
    options: [
      "AED 766K - 1M",
      "Below AED 1M",
      "AED 1M - 3M",
      "AED 3M - 5M",
      "Above AED 5M",
    ],
  },
  {
    question: "Number of bedroom preferred",
    options: ["Studio", "1 Bedroom", "2 Bedroom", "3 Bedroom", "4+ Bedroom"],
  },
  {
    question: "Purpose of Investment",
    options: ["Residential purpose", "Capital Appreciation", "Golden Visa Benefits"],
  },
  {
    question: "How soon are you looking to buy?",
    options: ["Immediately", "This month", "Within 1-3 Months", "Just exploring"],
  },
];

export default function PropertyFunnelForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef(null);
  const pathname = usePathname();

  // Scroll on step change
  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const handleOptionClick = (option) => {
    const updatedAnswers = { ...answers, [`question_${step + 1}`]: option };
    setAnswers(updatedAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Last step → Show contact form
      setStep(step + 1);
    }
  };
  const handleFormSubmit = async ({ fullName, email, phoneNumber }) => {
    try {
      const developerName =
    pathname.split("/")[1]?.replace(/-/g, " ") || "-";

      const note = `
        Developer: ${developerName}
        Location: ${answers.question_1 || ""}
        Budget: ${answers.question_2 || ""}
        Bedrooms: ${answers.question_3 || ""}
        Purpose: ${answers.question_4 || ""}
        Timeline: ${answers.question_5 || ""}
        `;

      console.log("Submitting Funnel Data:", {
        fullName,
        email,
        phoneNumber,
        note,
      });

      setSubmitted(true);

      await Swal.fire({
        title: `Thank you <br>${fullName}`,
        html: "<p>Redirecting you to WhatsApp...</p>",
        icon: "success",
        timer: 3000,
        showConfirmButton: false,
      });

      const message = encodeURIComponent(
        `Hello, I just submitted a property inquiry.

        Name: ${fullName}
        Phone: ${phoneNumber}
        Email: ${email}

        ${note}`
      );

      window.location.href =
        `https://wa.me/971555769195?text=${message}`;

    } catch (err) {
      console.error("Error submitting funnel form:", err);
    }
  };

  const progress = ((step + 1) / (questions.length + 1)) * 100; 

  return (
    <section className="funnel-wrapper" ref={sectionRef}>
      <div className="funnel-box">
        {/* Progress */}
        <div className="progress-top">
          {step <= questions.length - 1 ? (
            <p>
              Question {step + 1} of {questions.length}
            </p>
          ) : (
            <p>Preparing personalized results for you</p>
          )}
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Step Content */}
        {step <= questions.length - 1 ? (
          <>
            <h2 className="funnel-question">{questions[step].question}</h2>
            <div className="options-grid">
              {questions[step].options.map((option, index) => (
                <button
                  key={index}
                  className="option-card"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : submitted ? (
          <div className="thankyou">
            <h2>Thank you!</h2>
            <p>Our expert will contact you shortly.</p>
          </div>
        ) : (
          <div>
            <h2 className="">Please fill in your details:</h2>
            <p>Fill in your information to view results and secure exclusive discounts!</p>
            <FunnelContactForm answers={answers} onFormSubmit={handleFormSubmit} />
          </div>
        )}
      </div>
    </section>
  );
}
