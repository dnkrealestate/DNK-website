"use client";

import { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import FunnelContactForm from "./FunnelContactForm";
import Image from "next/image";
import { WWURL } from "@/url/axios";

const questions = [
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

export default function ProjectFunnel({ initialProjectData }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  // Already fetched server-side (see page.js) — used directly so the first
  // paint already has the real project instead of a blank div.
  const projectData = initialProjectData;
  const sectionRef = useRef(null);

  // Scroll to top on step change
  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const handleOptionClick = (option) => {
    const updatedAnswers = { ...answers, [`question_${step + 1}`]: option };
    setAnswers(updatedAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(step + 1); // show contact form
    }
  };

  const handleFormSubmit = async ({ fullName, email, phoneNumber }) => {
    try {
      const developerName = projectData?.developer.replace(/-/g, " ")
  .replace(/\b\w/g, (char) => char.toUpperCase()) || "-";
      const projectName = projectData?.projectname || "-";
      const location = projectData?.locationname || "-";

      const note = `
Developer: ${developerName}
Project: ${projectName}
Location: ${location}
Budget: ${answers.question_1 || ""}
Bedrooms: ${answers.question_2 || ""}
Purpose: ${answers.question_3 || ""}
Timeline: ${answers.question_4 || ""}
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

      window.location.href = `https://wa.me/971555769195?text=${message}`;
    } catch (err) {
      console.error("Error submitting funnel form:", err);
    }
  };

  const progress = ((step + 1) / (questions.length + 1)) * 100; 

  // Optional: show loading if projectData not ready
  if (!projectData) {
    return (
      <section className="funnel-wrapper" ref={sectionRef}>
        <div className="funnel-box">
          <h1 className="text-center"></h1>
        </div>
      </section>
    );
  }

   const developerLogo = projectData?.developerlogo
    ? `${WWURL}${projectData.developerlogo}`
    : "/default-bg.jpg";

  return (
    <section className="funnel-wrapper" ref={sectionRef}>
      <div className="funnel-box">
        {/* Developer Image */}
        
          <div className="developer-image-wrapper mb-4 text-center">
            <Image
              src={developerLogo}
              alt={projectData?.developer}
            width={180}
            height={80}
            priority
            className="object-cover"
            style={{ height: "auto" }}
            />
          </div>


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
            <FunnelContactForm answers={answers} onFormSubmit={handleFormSubmit} projectData={projectData}  />
          </div>
        )}
      </div>
    </section>
  );
}