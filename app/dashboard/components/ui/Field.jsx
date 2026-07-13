"use client";

const baseInput =
  "w-full rounded-lg border border-[#D7DCE3] bg-white px-3.5 py-2.5 text-sm text-[#1A2233] placeholder:text-[#9AA4B2] transition-colors focus:border-[#0F2C45] focus:outline-none focus:ring-2 focus:ring-[#0F2C45]/10";

export function FieldWrapper({ label, required, hint, children }) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-[#33394B]">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}
      {children}
      {hint && <p className="mt-1 text-xs text-[#8791A1]">{hint}</p>}
    </div>
  );
}

export function Input({ label, required, hint, className = "", ...props }) {
  return (
    <FieldWrapper label={label} required={required} hint={hint}>
      <input className={`${baseInput} ${className}`} {...props} />
    </FieldWrapper>
  );
}

export function Textarea({ label, required, hint, className = "", ...props }) {
  return (
    <FieldWrapper label={label} required={required} hint={hint}>
      <textarea className={`${baseInput} resize-y ${className}`} {...props} />
    </FieldWrapper>
  );
}

export function Select({
  label,
  required,
  hint,
  className = "",
  children,
  ...props
}) {
  return (
    <FieldWrapper label={label} required={required} hint={hint}>
      <select className={`${baseInput} ${className}`} {...props}>
        {children}
      </select>
    </FieldWrapper>
  );
}
