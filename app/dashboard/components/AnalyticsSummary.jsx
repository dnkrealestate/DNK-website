"use client";

import { useCallback, useState } from "react";
import { MdVisibility, MdPeople, MdTrendingUp, MdCircle } from "react-icons/md";
import { useAnalyticsServices } from "@/services/analyticsServices";
import Card from "./ui/Card";
import LiveIndicator from "./ui/LiveIndicator";
import DateRangeSelect from "./ui/DateRangeSelect";
import DeltaBadge from "./ui/DeltaBadge";
import { usePolling } from "../hooks/usePolling";
import { bucketDailySeries, formatBucketLabel } from "../utils/timeSeries";

const POLL_INTERVAL_MS = 20000;

function StatTile({ icon: Icon, label, value, current, previous, extra }) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0F2C45]/10 text-[#0F2C45]">
        <Icon className="text-xl" />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-2xl font-semibold text-[#1A2233]">{value}</p>
          {current !== undefined && <DeltaBadge current={current} previous={previous} />}
        </div>
        <p className="truncate text-xs text-[#8791A1]">{label}</p>
      </div>
      {extra}
    </Card>
  );
}

function BreakdownCard({ title, items = [] }) {
  const max = Math.max(...items.map((i) => i.count), 1);
  return (
    <Card className="p-5">
      <h3 className="mb-4 text-sm font-semibold text-[#1A2233]">{title}</h3>
      {items.length === 0 ? (
        <p className="text-sm text-[#8791A1]">No data yet.</p>
      ) : (
        <ul className="space-y-2.5">
          {items.map((item) => (
            <li key={item.value}>
              <div className="mb-1 flex items-center justify-between gap-2 text-xs">
                <span className="truncate text-[#4B5566]" title={item.value}>
                  {item.value}
                </span>
                <span className="shrink-0 font-medium text-[#1A2233]">
                  {item.count.toLocaleString()}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F0F2F5]">
                <div
                  className="h-full rounded-full bg-[#18A4A0]"
                  style={{ width: `${(item.count / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

export default function AnalyticsSummary() {
  const { getAnalyticsSummary, getAllPageViews } = useAnalyticsServices();
  const [days, setDays] = useState(30);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);
  const [allPages, setAllPages] = useState(null);
  const [loadingAllPages, setLoadingAllPages] = useState(false);
  const [showAllPages, setShowAllPages] = useState(false);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await getAnalyticsSummary(days);
      if (response.success) {
        setSummary(response.data);
      }
    } catch (err) {
      console.error("Failed to load analytics summary:", err);
    } finally {
      setLoading(false);
    }
  }, [days]);

  const { lastUpdated, refreshing, refresh } = usePolling(fetchSummary, {
    intervalMs: POLL_INTERVAL_MS,
    deps: [days],
  });

  const handleRangeChange = (value) => {
    setDays(value);
    setLoading(true);
    setShowAllPages(false);
  };

  const handleToggleAllPages = async () => {
    if (showAllPages) {
      setShowAllPages(false);
      return;
    }
    setShowAllPages(true);
    if (!allPages) {
      setLoadingAllPages(true);
      try {
        const response = await getAllPageViews(days);
        if (response.success) setAllPages(response.data);
      } catch (err) {
        console.error("Failed to load full page list:", err);
      } finally {
        setLoadingAllPages(false);
      }
    }
  };

  if (loading) {
    return (
      <Card className="flex items-center justify-center py-16 text-sm text-[#8791A1]">
        Loading analytics...
      </Card>
    );
  }

  if (!summary || summary.totalViews === 0) {
    return (
      <div className="mb-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <DateRangeSelect value={days} onChange={handleRangeChange} />
          <LiveIndicator lastUpdated={lastUpdated} refreshing={refreshing} onRefresh={refresh} />
        </div>
        <Card className="flex flex-col items-center justify-center gap-2 py-14 text-center">
          <MdTrendingUp className="text-3xl text-[#C4CAD4]" />
          <p className="text-sm text-[#8791A1]">
            No site traffic recorded for this period yet.
          </p>
        </Card>
      </div>
    );
  }

  const { series, granularity } = bucketDailySeries(summary.dailyViews, days, "views");
  const maxViews = Math.max(...series.map((d) => d.views), 1);
  const maxPageViews = Math.max(...summary.topPages.map((p) => p.views), 1);
  const pageList = showAllPages ? allPages || [] : summary.topPages;

  return (
    <div className="mb-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <DateRangeSelect value={days} onChange={handleRangeChange} />
        <LiveIndicator lastUpdated={lastUpdated} refreshing={refreshing} onRefresh={refresh} />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatTile
          icon={MdVisibility}
          label="Page views"
          value={summary.totalViews.toLocaleString()}
          current={summary.totalViews}
          previous={summary.previousTotalViews}
        />
        <StatTile
          icon={MdPeople}
          label="Unique visitors"
          value={summary.totalVisitors.toLocaleString()}
          current={summary.totalVisitors}
          previous={summary.previousTotalVisitors}
        />
        <StatTile
          icon={MdCircle}
          label="Online right now"
          value={summary.online.toLocaleString()}
          extra={
            summary.online > 0 && (
              <span className="ml-auto h-2.5 w-2.5 shrink-0 animate-pulse rounded-full bg-emerald-500" />
            )
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-[#1A2233]">Views over time</h3>
          <div className="flex h-40 items-end gap-[3px]">
            {series.map((d) => {
              const heightPct = Math.max((d.views / maxViews) * 100, d.views > 0 ? 4 : 2);
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
                      {formatBucketLabel(d, granularity)}: {d.views} view{d.views === 1 ? "" : "s"}
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
            <span>{series[series.length - 1] && formatBucketLabel(series[series.length - 1], granularity)}</span>
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#1A2233]">
              {showAllPages ? "All pages" : "Most visited pages"}
            </h3>
            <button
              onClick={handleToggleAllPages}
              className="text-xs font-medium text-[#0F2C45] hover:underline"
            >
              {showAllPages ? "Top 10" : "View all"}
            </button>
          </div>
          {loadingAllPages ? (
            <p className="text-sm text-[#8791A1]">Loading...</p>
          ) : pageList.length === 0 ? (
            <p className="text-sm text-[#8791A1]">No page data yet.</p>
          ) : (
            <ul className={`space-y-3 ${showAllPages ? "max-h-[280px] overflow-y-auto pr-1" : ""}`}>
              {pageList.map((p) => (
                <li key={p.path}>
                  <div className="mb-1 flex items-center justify-between gap-2 text-xs">
                    <span className="truncate text-[#4B5566]" title={p.path}>
                      {p.path === "/" ? "Home" : p.path}
                    </span>
                    <span className="shrink-0 font-medium text-[#1A2233]">
                      {p.views.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F0F2F5]">
                    <div
                      className="h-full rounded-full bg-[#18A4A0]"
                      style={{ width: `${(p.views / maxPageViews) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <BreakdownCard title="Countries" items={summary.breakdowns?.country} />
        <BreakdownCard title="Devices" items={summary.breakdowns?.device} />
        <BreakdownCard title="Browsers" items={summary.breakdowns?.browser} />
        <BreakdownCard title="Operating Systems" items={summary.breakdowns?.os} />
        <BreakdownCard title="Referrers" items={summary.breakdowns?.referrer} />
      </div>
    </div>
  );
}
