"use client";

const variants = {
  primary:
    "bg-[#0F2C45] text-white hover:bg-[#123553] focus-visible:ring-[#0F2C45]/40",
  danger:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600/40",
  secondary:
    "bg-white text-[#0F2C45] border border-[#D7DCE3] hover:bg-[#F3F5F8] focus-visible:ring-[#0F2C45]/20",
  ghost:
    "bg-transparent text-[#4B5566] hover:bg-[#F3F5F8] focus-visible:ring-[#0F2C45]/10",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  disabled = false,
  children,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {children}
    </button>
  );
}
