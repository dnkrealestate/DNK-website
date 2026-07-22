"use client";

import { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { RiChatSmileAiFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import logo from "@/public/assets/logo/dnklogo_1.webp";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { usePathname } from "next/navigation";

const CHAT_KEY = "dnk_chat_history";
const CHAT_TIME_KEY = "dnk_chat_time";
const REQUIREMENT_KEY = "dnk_chat_requirement";
const ONE_DAY = 24 * 60 * 60 * 1000;

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState([
    { role: "bot", content: "👋 Hi! May I know your name?" },
  ]);
  const [text, setText] = useState("");
  const [name, setName] = useState(null);
  const [hasPhone, setHasPhone] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [requirement, setRequirement] = useState({});
  const messagesEndRef = useRef(null);
  const pathname = usePathname();

  /* ---------------- LOAD CHAT (24 HOURS) ---------------- */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedChat = localStorage.getItem(CHAT_KEY);
    const savedTime = localStorage.getItem(CHAT_TIME_KEY);

    if (savedChat && savedTime) {
      const isExpired = Date.now() - Number(savedTime) > ONE_DAY;

      if (isExpired) {
        localStorage.removeItem(CHAT_KEY);
        localStorage.removeItem(CHAT_TIME_KEY);
      } else {
        setMessages(JSON.parse(savedChat));
      }
    }
  }, []);

  /* ---------------- SAVE CHAT ---------------- */
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_KEY, JSON.stringify(messages));
      localStorage.setItem(CHAT_TIME_KEY, Date.now().toString());
    }
  }, [messages]);

  /* ---------- LOAD NAME FROM LOCAL STORAGE ---------- */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("chat_user_name");
      const savedPhone = localStorage.getItem("chat_phone");
      // Only replace the greeting with a name-aware one when there's no
      // restored conversation to preserve — otherwise this silently wipes
      // the chat history the effect above just loaded.
      const hasRestoredChat = !!localStorage.getItem(CHAT_KEY);

      if (storedName) {
        setName(storedName);
        if (!hasRestoredChat) {
          setMessages([{ role: "bot", content: `👋 Hi ${storedName}! How can I help you today?` }]);
        }
      }

      if (savedPhone) {
        setHasPhone(true);
      }

      const savedRequirement = localStorage.getItem(REQUIREMENT_KEY);
      if (savedRequirement) {
        try {
          setRequirement(JSON.parse(savedRequirement));
        } catch {
          // ignore malformed cache
        }
      }
    }
  }, []);

  /* ---------------- VERCEL TRACKING (ONCE) ---------------- */
  useEffect(() => {
    const storedName = localStorage.getItem("chat_user_name");
    const storedPhone = localStorage.getItem("chat_phone");
    const alreadyTracked = localStorage.getItem("chat_tracked");

    if (storedName && storedPhone && !alreadyTracked) {
      track(`Chat bot Contact form submitted ${window.location.pathname}`, {
        name: storedName,
        phone: storedPhone,
        page: window.location.pathname,
        source: "AI Chatbot",
        chatHistory: messages
      });

      localStorage.setItem("chat_tracked", "true");
    }
  }, []);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const userMessage = text;
    setText("");
    setMessages((m) => [...m, { role: "user", content: userMessage }]);

    // Show typing indicator
    setIsTyping(true);

    try {
      const hasPhone = !!localStorage.getItem("chat_phone");
      const name = localStorage.getItem("chat_user_name") || "";

      // Load last project if still valid
      let lastProject = null;
      const lastProjectRaw = localStorage.getItem("chat_last_project");
      if (lastProjectRaw) {
        const parsed = JSON.parse(lastProjectRaw);
        if (Date.now() - parsed.timestamp <= ONE_DAY) {
          lastProject = parsed.data;
        }
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          page: window.location.pathname,
          hasName: !!name,
          hasPhone,
          name,
          history: messages,
          requirement,
        }),
      });

      const data = await res.json();

      // Save name if bot asks to
      if (data.saveName && !name) {
        setName(data.saveName);
        localStorage.setItem("chat_user_name", data.saveName);
      }

      // Save phone if bot asks to
      if (data.savePhone && !hasPhone) {
        setHasPhone(true);
        localStorage.setItem("chat_phone", data.savePhone);
      }

      // Track lead qualification progress (leadId, stage, bedroom/location/
      // developer/budget) across turns so the AI knows where it left off.
      if (data.requirement) {
        setRequirement(data.requirement);
        localStorage.setItem(REQUIREMENT_KEY, JSON.stringify(data.requirement));
      }

      // Progressive streaming for human-like typing
      if (data.reply) {
        setMessages((m) => [...m, { role: "bot", content: "" }]);
        let accumulated = "";
        for (let i = 0; i < data.reply.length; i++) {
          accumulated += data.reply[i];
          setMessages((m) => [
            ...m.slice(0, -1),
            { role: "bot", content: accumulated }
          ]);
          await new Promise(r => setTimeout(r, 15)); // 15ms per character
        }
      }

      setIsTyping(false);
    } catch {
      setIsTyping(false);
      setMessages((m) => [...m, { role: "bot", content: "⚠️ Something went wrong." }]);
    }
  };

  const handleButtonClick = () => {
    setOpen(!open);
    setShowTooltip(false);

    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "chatbot_open",
        event_category: "Engagement",
        event_label: "Chatbot Widget",
        page_path: pathname,
      });
    }

    // Track button click event
    track('chatbot_button_click', {
      open: !open
    });
  };

  const handleClose = () => setOpen(false);

  function parseBold(text) {
    return text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  }

  return (
    <>
      {/* Floating Button + Tooltip */}
      <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end">
        <div className="flex items-center">
          {showTooltip && !open && (
            <div className="animate-shake mb-2 px-3 py-1 bg-white text-black text-xs rounded-lg rounded-br-none m-1 shadow-md animate-fadeIn">
              Here’s your Dubai property guide
            </div>
          )}

          <button
            onClick={handleButtonClick}
            className="bg-[#18A436] text-white p-3 rounded-full shadow-lg cursor-pointer group hover:bg-[#54ff79] hover:text-[#000]"
          >
            {open ? (
              <IoClose className="text-[2rem]" />
            ) : (
              <RiChatSmileAiFill className="text-[2rem]" />
            )}
          </button>
        </div>
      </div>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-24 md:right-6 w-full md:w-80 h-[420px] bg-white rounded-xl shadow-xl flex flex-col z-50 overflow-hidden">
          
          {/* Header */}
          <div className="bg-[#18A436] flex items-center text-white p-3 font-semibold shrink-0">
            <div className="bg-black p-2 rounded-full w-[40px] h-[40px] flex justify-center items-center">
              <Image className="m-auto" src={logo} alt="DNK Logo" width={30} height={30} />
            </div>
            <p className="pl-2 mb-0 text-[#fff]">DNK Real Estate</p>
          </div>

          {/* Messages */}
          <div className="flex-1 px-3 py-2 space-y-2 overflow-y-auto bg-[#ECE5DD]">
            {messages.map((m, i) => (
              <div key={i} className={`flex mb-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`px-3 py-2 rounded-lg max-w-[75%] text-sm break-words ${
                    m.role === "user"
                      ? "bg-[#18A436] text-white rounded-br-none"
                      : "bg-white text-black rounded-bl-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: parseBold(m.content) }}
                />
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex mb-2 justify-start">
                <div className="px-3 py-2 rounded-lg max-w-[25%] text-sm break-words bg-white text-black rounded-bl-none flex items-center space-x-1">
                  <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                  <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce delay-400"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex items-center p-2 border-t bg-white shrink-0">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message"
              className="flex-1 p-2 md:text-sm outline-none text-black text-[16px]"
            />
            <button onClick={sendMessage} className="text-[#18A436] p-2">
              <IoSend size={22} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}