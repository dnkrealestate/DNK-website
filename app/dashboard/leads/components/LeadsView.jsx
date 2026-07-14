"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  MdContactMail,
  MdCall,
  MdSmartToy,
  MdPeopleAlt,
} from "react-icons/md";
import { RiWhatsappFill } from "react-icons/ri";
import Swal from "sweetalert2";
import { useLeadServices } from "@/services/leadServices";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import LiveIndicator from "../../components/ui/LiveIndicator";
import DateRangeSelect from "../../components/ui/DateRangeSelect";
import DeltaBadge from "../../components/ui/DeltaBadge";
import { usePolling } from "../../hooks/usePolling";
import { bucketDailySeries, formatBucketLabel } from "../../utils/timeSeries";

const POLL_INTERVAL_MS = 15000;

const TYPE_META = {
  form: { label: "Form Submissions", icon: MdContactMail },
  whatsapp_click: { label: "WhatsApp Clicks", icon: RiWhatsappFill },
  call_click: { label: "Call Clicks", icon: MdCall },
  chatbot: { label: "Chatbot Leads", icon: MdSmartToy },
};

const FILTERS = [
  { value: "", label: "All" },
  { value: "form", label: "Forms" },
  { value: "whatsapp_click", label: "WhatsApp" },
  { value: "call_click", label: "Calls" },
  { value: "chatbot", label: "Chatbot" },
];

function StatTile({ icon: Icon, label, value, current, previous }) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0F2C45]/10 text-[#0F2C45]">
        <Icon className="text-lg" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold text-[#1A2233]">{value}</p>
          {current !== undefined && <DeltaBadge current={current} previous={previous} />}
        </div>
        <p className="text-xs text-[#8791A1]">{label}</p>
      </div>
    </Card>
  );
}

export default function LeadsView() {
  const { getLeads, getLeadsSummary } = useLeadServices();
  const [days, setDays] = useState(30);
  const [summary, setSummary] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [typeFilter, setTypeFilter] = useState("");
  const [hovered, setHovered] = useState(null);
  const [newLeadIds, setNewLeadIds] = useState(new Set());
  const knownIdsRef = useRef(null);
  const highlightTimerRef = useRef(null);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await getLeadsSummary(days);
      if (response.success) setSummary(response.data);
    } catch (err) {
      console.error("Failed to load leads summary:", err);
    } finally {
      setLoadingSummary(false);
    }
  }, [days]);

  const fetchLeads = useCallback(async () => {
    try {
      const response = await getLeads({ type: typeFilter || undefined, days });
      if (response.success) {
        const freshLeads = response.data;

        if (knownIdsRef.current) {
          const newOnes = freshLeads.filter((l) => !knownIdsRef.current.has(l._id));
          if (newOnes.length > 0) {
            setNewLeadIds(new Set(newOnes.map((l) => l._id)));
            newOnes.forEach((lead) => {
              Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "New lead",
                text: `${TYPE_META[lead.type]?.label || lead.type} — ${lead.source || "Unknown source"}`,
                showConfirmButton: false,
                timer: 6000,
                timerProgressBar: true,
              });
            });
            clearTimeout(highlightTimerRef.current);
            highlightTimerRef.current = setTimeout(() => setNewLeadIds(new Set()), 8000);
          }
        }
        knownIdsRef.current = new Set(freshLeads.map((l) => l._id));
        setLeads(freshLeads);
      }
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setLoadingLeads(false);
    }
  }, [typeFilter, days]);

  // Switching the filter tab starts a fresh "known leads" baseline so the
  // reshuffled list doesn't get misread as a wave of new leads arriving.
  const handleFilterChange = (value) => {
    knownIdsRef.current = null;
    setLoadingLeads(true);
    setTypeFilter(value);
  };

  const handleRangeChange = (value) => {
    knownIdsRef.current = null;
    setLoadingSummary(true);
    setLoadingLeads(true);
    setDays(value);
  };

  const { lastUpdated: summaryUpdated } = usePolling(fetchSummary, {
    intervalMs: POLL_INTERVAL_MS,
    deps: [days],
  });
  const { lastUpdated, refreshing, refresh } = usePolling(fetchLeads, {
    intervalMs: POLL_INTERVAL_MS,
    deps: [typeFilter, days],
  });

  const countByType = useMemo(() => {
    const map = { form: 0, whatsapp_click: 0, call_click: 0, chatbot: 0 };
    (summary?.byType || []).forEach((t) => {
      if (map[t.type] !== undefined) map[t.type] = t.count;
    });
    return map;
  }, [summary]);

  const { series, granularity } = summary
    ? bucketDailySeries(summary.dailyCounts, days, "count")
    : { series: [], granularity: "day" };
  const maxCount = Math.max(...series.map((d) => d.count), 1);

  return (
    <div>
      <PageHeader
        title="Leads"
        description="All website form submissions, WhatsApp clicks, calls, and chatbot leads."
        actions={
          <LiveIndicator
            lastUpdated={lastUpdated || summaryUpdated}
            refreshing={refreshing}
            onRefresh={refresh}
          />
        }
      />

      <div className="mb-4">
        <DateRangeSelect value={days} onChange={handleRangeChange} />
      </div>

      {loadingSummary ? (
        <Card className="mb-6 flex items-center justify-center py-14 text-sm text-[#8791A1]">
          Loading leads summary...
        </Card>
      ) : (
        <>
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <StatTile
              icon={MdPeopleAlt}
              label="Total leads"
              value={summary?.total ?? 0}
              current={summary?.total ?? 0}
              previous={summary?.previousTotal ?? 0}
            />
            {Object.entries(TYPE_META).map(([key, meta]) => (
              <StatTile
                key={key}
                icon={meta.icon}
                label={meta.label}
                value={countByType[key]}
              />
            ))}
          </div>

          <Card className="mb-6 p-5">
            <h3 className="mb-4 text-sm font-semibold text-[#1A2233]">Leads over time</h3>
            <div className="flex h-40 items-end gap-[3px]">
              {series.map((d) => {
                const heightPct = Math.max((d.count / maxCount) * 100, d.count > 0 ? 4 : 2);
                const isHovered = hovered?.date === d.date;
                return (
                  <div
                    key={d.date}
                    className="group relative flex-1"
                    onMouseEnter={() => setHovered(d)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {isHovered && (
                      <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#1A2233] px-2 py-1 text-xs text-white shadow-lg">
                        {formatBucketLabel(d, granularity)}: {d.count} lead{d.count === 1 ? "" : "s"}
                      </div>
                    )}
                    <div
                      className={`w-full rounded-t-[4px] transition-colors ${
                        isHovered ? "bg-[#0F2C45]" : "bg-[#18A4A0]"
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-[#9AA4B2]">
              <span>{series[0] && formatBucketLabel(series[0], granularity)}</span>
              <span>
                {series[series.length - 1] &&
                  formatBucketLabel(series[series.length - 1], granularity)}
              </span>
            </div>
          </Card>
        </>
      )}

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E8EE] px-5 py-3">
          <h3 className="text-sm font-semibold text-[#1A2233]">Recent leads</h3>
          <div className="inline-flex flex-wrap gap-1 rounded-lg bg-[#E9ECF1] p-1">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => handleFilterChange(f.value)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  typeFilter === f.value
                    ? "bg-white text-[#0F2C45] shadow-sm"
                    : "text-[#5B6472] hover:text-[#0F2C45]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E5E8EE] text-xs font-semibold uppercase tracking-wide text-[#8791A1]">
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Source</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Phone</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Page</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFF1F5]">
              {loadingLeads ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-[#8791A1]">
                    Loading leads...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-[#8791A1]">
                    No leads found for this filter.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => {
                  const isNew = newLeadIds.has(lead._id);
                  return (
                    <tr
                      key={lead._id}
                      className={`text-[#1A2233] transition-colors duration-1000 hover:bg-[#F8F9FB] ${
                        isNew ? "bg-[#E9FBF5]" : ""
                      }`}
                    >
                      <td className="whitespace-nowrap px-5 py-3 text-[#4B5566]">
                        <div className="flex items-center gap-2">
                          {isNew && (
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#18A4A0]" />
                          )}
                          {new Date(lead.createdAt).toLocaleString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <Badge tone={lead.type}>
                          {TYPE_META[lead.type]?.label.replace(/s$/, "") || lead.type}
                        </Badge>
                      </td>
                      <td className="px-5 py-3 font-medium text-[#1A2233]">{lead.source || "—"}</td>
                      <td className="px-5 py-3">{lead.name || "—"}</td>
                      <td className="px-5 py-3">{lead.phone || "—"}</td>
                      <td className="px-5 py-3">{lead.email || "—"}</td>
                      <td className="max-w-[160px] truncate px-5 py-3 text-[#4B5566]" title={lead.page}>
                        {lead.page || "—"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
