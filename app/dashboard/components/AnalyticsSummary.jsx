"use client";

import { useCallback, useState } from "react";
import { MdVisibility, MdPeople, MdTrendingUp } from "react-icons/md";
import { useAnalyticsServices } from "@/services/analyticsServices";
import Card from "./ui/Card";
import LiveIndicator from "./ui/LiveIndicator";
import { usePolling } from "../hooks/usePolling";

const RANGE_DAYS = 30;
const POLL_INTERVAL_MS = 20000;

function buildDailySeries(dailyViews, days) {
  const map = new Map(dailyViews.map((d) => [d.date, d.views]));
  const series = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    series.push({ date: key, views: map.get(key) || 0 });
  }
  return series;
}

function StatTile({ icon: Icon, label, value }) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0F2C45]/10 text-[#0F2C45]">
        <Icon className="text-xl" />
      </div>
      <div>
        <p className="text-2xl font-semibold text-[#1A2233]">{value}</p>
        <p className="text-xs text-[#8791A1]">{label}</p>
      </div>
    </Card>
  );
}

export default function AnalyticsSummary() {
  const { getAnalyticsSummary } = useAnalyticsServices();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(null);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await getAnalyticsSummary(RANGE_DAYS);
      if (response.success) {
        setSummary(response.data);
      }
    } catch (err) {
      console.error("Failed to load analytics summary:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const { lastUpdated, refreshing, refresh } = usePolling(fetchSummary, {
    intervalMs: POLL_INTERVAL_MS,
  });

  if (loading) {
    return (
      <Card className="flex items-center justify-center py-16 text-sm text-[#8791A1]">
        Loading analytics...
      </Card>
    );
  }

  if (!summary || summary.totalViews === 0) {
    return (
      <Card className="flex flex-col items-center justify-center gap-2 py-14 text-center">
        <MdTrendingUp className="text-3xl text-[#C4CAD4]" />
        <p className="text-sm text-[#8791A1]">
          No site traffic recorded yet. Data will appear here once visitors start
          browsing the site.
        </p>
        <LiveIndicator lastUpdated={lastUpdated} refreshing={refreshing} onRefresh={refresh} />
      </Card>
    );
  }

  const series = buildDailySeries(summary.dailyViews, RANGE_DAYS);
  const maxViews = Math.max(...series.map((d) => d.views), 1);
  const maxPageViews = Math.max(...summary.topPages.map((p) => p.views), 1);

  return (
    <div className="mb-6">
      <div className="mb-3 flex justify-end">
        <LiveIndicator lastUpdated={lastUpdated} refreshing={refreshing} onRefresh={refresh} />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatTile
          icon={MdVisibility}
          label={`Page views (last ${RANGE_DAYS} days)`}
          value={summary.totalViews.toLocaleString()}
        />
        <StatTile
          icon={MdPeople}
          label={`Unique visitors (last ${RANGE_DAYS} days)`}
          value={summary.totalVisitors.toLocaleString()}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-[#1A2233]">
            Daily views
          </h3>
          <div className="flex h-40 items-end gap-[3px]" aria-hidden={false}>
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
                      {new Date(d.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                      : {d.views} view{d.views === 1 ? "" : "s"}
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
            <span>
              {new Date(series[0].date).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
            <span>
              {new Date(series[series.length - 1].date).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold text-[#1A2233]">
            Most visited pages
          </h3>
          {summary.topPages.length === 0 ? (
            <p className="text-sm text-[#8791A1]">No page data yet.</p>
          ) : (
            <ul className="space-y-3">
              {summary.topPages.map((p) => (
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
    </div>
  );
}
