const palette = {
  "off-plan": "bg-amber-50 text-amber-700 ring-amber-600/20",
  buy: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  rent: "bg-blue-50 text-blue-700 ring-blue-600/20",
  sell: "bg-purple-50 text-purple-700 ring-purple-600/20",
  form: "bg-blue-50 text-blue-700 ring-blue-600/20",
  whatsapp_click: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  call_click: "bg-amber-50 text-amber-700 ring-amber-600/20",
  chatbot: "bg-purple-50 text-purple-700 ring-purple-600/20",
  error: "bg-red-50 text-red-700 ring-red-600/20",
  paused: "bg-slate-100 text-slate-600 ring-slate-500/20",
  default: "bg-[#F0F2F5] text-[#4B5566] ring-[#D7DCE3]",
};

export default function Badge({ children, tone = "default" }) {
  const style = palette[tone] || palette.default;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${style}`}
    >
      {children}
    </span>
  );
}
