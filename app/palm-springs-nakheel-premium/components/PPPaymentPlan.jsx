"use client";

import React from "react";
import { motion } from "framer-motion";
import { IoTimeOutline, IoNotificationsOutline, IoShieldCheckmarkOutline } from "react-icons/io5";

const POINTS = [
  {
    icon: IoTimeOutline,
    title: "Not Yet Released",
    text: "Nakheel has not published the Palm Springs payment plan or instalment structure at this time.",
  },
  {
    icon: IoNotificationsOutline,
    title: "Register to Be Notified",
    text: "Submit your details once and we will send you the confirmed structure the moment it's announced.",
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: "No Guesswork",
    text: "We only share figures and milestones confirmed directly by Nakheel — never estimated or assumed percentages.",
  },
];

export default function PPPaymentPlan({ onOpenEnquiry }) {
  return (
    <section id="payment-plan" className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14 scroll-mt-28">
      <div className="rounded-[1.75rem] sm:rounded-[2rem] bg-[#F5F8FB] border border-[#102B46]/8 p-8 sm:p-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
          <div>
            <p className="text-[#367BA8] text-xs font-bold tracking-[0.25em] uppercase mb-4">
              Payment Plan
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[#102B46] text-3xl sm:text-4xl font-semibold leading-tight max-w-[560px]">
              A Transparent Approach to the Payment Structure
            </h2>
          </div>
          <button
            onClick={() =>
              onOpenEnquiry({
                eyebrow: "Payment Plan",
                title: "Request the Payment Plan",
                interest: "Payment Plan",
                ctaLabel: "Request the Payment Plan",
              })
            }
            className="bg-[#102B46] hover:bg-[#174A73] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-colors self-start lg:self-auto whitespace-nowrap"
          >
            Request the Payment Plan
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {POINTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-[1.5rem] bg-white border border-[#102B46]/8 p-6"
            >
              <p.icon className="text-[#367BA8] text-2xl mb-3" />
              <h3 className="font-[family-name:var(--font-display)] text-[#102B46] text-base font-semibold mb-2">
                {p.title}
              </h3>
              <p className="text-[#252D36]/55 text-sm leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
