export default function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`rounded-xl border border-[#E5E8EE] bg-white shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
