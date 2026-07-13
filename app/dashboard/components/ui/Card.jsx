export default function Card({ className = "", children }) {
  return (
    <div
      className={`rounded-xl border border-[#E5E8EE] bg-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
