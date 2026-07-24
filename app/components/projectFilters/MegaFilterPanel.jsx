"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { MdFilterList, MdClose, MdExpandMore, MdExpandLess } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

export const EMPTY_FILTERS = {
  locations: [],
  minPrice: null,
  maxPrice: null,
  unitTypes: [],
  bedrooms: [],
  handoverYears: [],
};

function countActiveFilters(filters) {
  return (
    filters.locations.length +
    filters.unitTypes.length +
    filters.bedrooms.length +
    filters.handoverYears.length +
    (filters.minPrice != null ? 1 : 0) +
    (filters.maxPrice != null ? 1 : 0)
  );
}

function toggleValue(list, value) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function formatPriceShort(value) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1)}M`;
  if (value >= 1_000) return `${Math.round(value / 1_000)}K`;
  return String(value);
}

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/10 py-4 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-white text-sm font-semibold"
      >
        {title}
        {open ? <MdExpandLess className="text-white/50" /> : <MdExpandMore className="text-white/50" />}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

function Pill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
        active
          ? "bg-[#FFC700] border-[#FFC700] text-black font-semibold"
          : "border-white/25 text-white/80 hover:border-white/50"
      }`}
    >
      {children}
    </button>
  );
}

const EMPTY_OPTIONS = { locations: [], bedrooms: [], unitTypes: [], handoverYears: [] };

export default function MegaFilterPanel({ filterOptions, filters, onChange, resultCount }) {
  const [isOpen, setIsOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const options = filterOptions || EMPTY_OPTIONS;
  const locationOptions = options.locations;
  const bedroomOptions = options.bedrooms;
  const unitTypeOptions = options.unitTypes;
  const handoverOptions = options.handoverYears;

  const visibleLocationOptions = useMemo(() => {
    if (!locationSearch.trim()) return locationOptions;
    const term = locationSearch.trim().toLowerCase();
    return locationOptions.filter((opt) => opt.label.toLowerCase().includes(term));
  }, [locationOptions, locationSearch]);

  const activeCount = countActiveFilters(filters);

  const update = (patch) => onChange({ ...filters, ...patch });
  const clearAll = () => onChange(EMPTY_FILTERS);

  return (
    <div className="relative w-full md:w-fit" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className={`flex items-center justify-center gap-2 w-full md:w-fit border p-[10px] rounded transition-colors ${
          activeCount > 0
            ? "border-[#FFC700] text-[#FFC700] bg-[#FFC700]/10"
            : "border-[#ffffff] text-white bg-black hover:bg-white/5"
        }`}
      >
        <MdFilterList className="text-[1.1rem]" />
        <span className="text-sm">Filters</span>
        {activeCount > 0 && (
          <span className="bg-[#FFC700] text-black rounded-full min-w-[18px] h-[18px] flex items-center justify-center text-[11px] font-bold px-1">
            {activeCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <div
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          <div
            className="fixed inset-x-3 bottom-3 top-20 z-50 flex flex-col rounded-xl border border-white/15 bg-[#0d0d10] shadow-2xl
                       md:absolute md:inset-auto md:top-[calc(100%+8px)] md:left-0 md:bottom-auto md:w-[720px] md:max-h-[75vh]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 shrink-0">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <MdFilterList className="text-[#FFC700]" /> Filter Projects
              </h3>
              <button type="button" onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white">
                <MdClose className="text-lg" />
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-1 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                {/* Location */}
                <Section title={`Location${filters.locations.length ? ` (${filters.locations.length})` : ""}`}>
                  <div className="flex items-center border border-white/25 rounded px-2 py-1.5 mb-2">
                    <IoSearch className="text-white/50 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search location..."
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      className="w-full bg-transparent text-white text-xs px-2 outline-none"
                    />
                  </div>
                  <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                    {visibleLocationOptions.length === 0 ? (
                      <p className="text-white/40 text-xs">No matching locations</p>
                    ) : (
                      visibleLocationOptions.map((opt) => (
                        <label key={opt.key} className="flex items-center gap-2 text-xs text-white/85 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.locations.includes(opt.key)}
                            onChange={() => update({ locations: toggleValue(filters.locations, opt.key) })}
                            className="accent-[#FFC700]"
                          />
                          <span className="line-clamp-1">{opt.label}</span>
                          <span className="text-white/40 ml-auto shrink-0">({opt.count})</span>
                        </label>
                      ))
                    )}
                  </div>
                </Section>

                {/* Price */}
                <Section title="Price (AED)">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice ?? ""}
                      onChange={(e) => update({ minPrice: e.target.value === "" ? null : Number(e.target.value) })}
                      className="w-1/2 bg-transparent border border-white/25 rounded px-2 py-1.5 text-xs text-white outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice ?? ""}
                      onChange={(e) => update({ maxPrice: e.target.value === "" ? null : Number(e.target.value) })}
                      className="w-1/2 bg-transparent border border-white/25 rounded px-2 py-1.5 text-xs text-white outline-none"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {[500_000, 1_000_000, 2_000_000, 5_000_000, 10_000_000].map((preset) => (
                      <Pill
                        key={preset}
                        active={filters.minPrice === preset}
                        onClick={() => update({ minPrice: filters.minPrice === preset ? null : preset })}
                      >
                        {formatPriceShort(preset)}+
                      </Pill>
                    ))}
                  </div>
                </Section>

                {/* Unit type */}
                <Section title={`Unit Type${filters.unitTypes.length ? ` (${filters.unitTypes.length})` : ""}`}>
                  <div className="flex flex-wrap gap-1.5">
                    {unitTypeOptions.map((opt) => (
                      <Pill
                        key={opt.key}
                        active={filters.unitTypes.includes(opt.key)}
                        onClick={() => update({ unitTypes: toggleValue(filters.unitTypes, opt.key) })}
                      >
                        {opt.label} ({opt.count})
                      </Pill>
                    ))}
                  </div>
                </Section>

                {/* Bedrooms */}
                <Section title={`Bedrooms${filters.bedrooms.length ? ` (${filters.bedrooms.length})` : ""}`}>
                  <div className="flex flex-wrap gap-1.5">
                    {bedroomOptions.map((opt) => (
                      <Pill
                        key={opt.value}
                        active={filters.bedrooms.includes(opt.value)}
                        onClick={() => update({ bedrooms: toggleValue(filters.bedrooms, opt.value) })}
                      >
                        {opt.value === "Studio" ? "Studio" : `${opt.value} BR`}
                      </Pill>
                    ))}
                  </div>
                </Section>

                {/* Handover */}
                <Section title={`Handover${filters.handoverYears.length ? ` (${filters.handoverYears.length})` : ""}`} defaultOpen={false}>
                  <div className="flex flex-wrap gap-1.5">
                    {handoverOptions.map((opt) => (
                      <Pill
                        key={opt.value}
                        active={filters.handoverYears.includes(opt.value)}
                        onClick={() => update({ handoverYears: toggleValue(filters.handoverYears, opt.value) })}
                      >
                        {opt.value} ({opt.count})
                      </Pill>
                    ))}
                  </div>
                </Section>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 shrink-0">
              <button
                type="button"
                onClick={clearAll}
                disabled={activeCount === 0}
                className="text-white/60 hover:text-white text-sm disabled:opacity-30 disabled:hover:text-white/60"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-[#FFC700] text-black font-semibold text-sm px-5 py-2 rounded"
              >
                Show {resultCount != null ? resultCount : ""} results
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
