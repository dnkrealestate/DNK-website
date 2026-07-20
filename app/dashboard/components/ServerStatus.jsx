"use client";

import { useCallback, useState } from "react";
import { MdDns, MdStorage, MdCheckCircle, MdErrorOutline, MdWarningAmber } from "react-icons/md";
import { useSystemService } from "@/services/systemService";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import LiveIndicator from "./ui/LiveIndicator";
import { usePolling } from "../hooks/usePolling";

const POLL_INTERVAL_MS = 10000;

function formatUptime(seconds) {
  if (!seconds && seconds !== 0) return "—";
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
}

function StatusTile({ icon: Icon, label, ok, okLabel, badLabel, sub }) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
          ok ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
        }`}
      >
        <Icon className="text-xl" />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Badge tone={ok ? "whatsapp_click" : "error"}>{ok ? okLabel : badLabel}</Badge>
        </div>
        <p className="mt-1 truncate text-xs text-[#8791A1] mb-0">{label}</p>
        {sub && <p className="mt-0.5 text-xs text-[#9AA4B2]">{sub}</p>}
      </div>
    </Card>
  );
}

export default function ServerStatus() {
  const { getSystemStatus } = useSystemService();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unreachable, setUnreachable] = useState(false);

  const fetchStatus = useCallback(async () => {
    try {
      const response = await getSystemStatus();
      if (response.success) {
        setStatus(response.data);
        setUnreachable(false);
      }
    } catch (err) {
      // The backend itself didn't respond — that IS the status.
      console.error("Failed to fetch server status:", err);
      setUnreachable(true);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { lastUpdated, refreshing, refresh } = usePolling(fetchStatus, {
    intervalMs: POLL_INTERVAL_MS,
  });

  const errors = status?.recentErrors || [];

  return (
    <div className="mt-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-[#1A2233]">Server Status</h2>
        <LiveIndicator lastUpdated={lastUpdated} refreshing={refreshing} onRefresh={refresh} />
      </div>

      {loading ? (
        <Card className="p-5 text-sm text-[#8791A1]">Checking server status...</Card>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <StatusTile
              icon={MdDns}
              ok={!unreachable && status?.serverUp}
              okLabel="Online"
              badLabel="Unreachable"
              label="Backend Server"
              sub={
                !unreachable && status
                  ? `Up for ${formatUptime(status.uptimeSeconds)}`
                  : "Could not reach the backend at all"
              }
            />
            <StatusTile
              icon={MdStorage}
              ok={!unreachable && status?.mongoStatus === "connected"}
              okLabel="Connected"
              badLabel={status?.mongoStatus || "Disconnected"}
              label="MongoDB"
              sub={
                !unreachable && status?.mongoStatus === "connected"
                  ? "Database reachable"
                  : "Forms and admin pages may fail while this is down"
              }
            />
          </div>

          <Card className="mt-4 overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#E5E8EE] px-5 py-3.5">
              <h3 className="text-sm font-semibold text-[#1A2233]">Recent Errors</h3>
              {errors.length > 0 && (
                <span className="flex items-center gap-1 text-xs text-amber-600">
                  <MdWarningAmber /> {errors.length} recorded
                </span>
              )}
            </div>

            {unreachable ? (
              <div className="flex flex-col items-center gap-2 py-10 text-center">
                <MdErrorOutline className="text-2xl text-red-400" />
                <p className="text-sm text-[#8791A1]">
                  Can't reach the backend server right now.
                </p>
              </div>
            ) : errors.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-10 text-center">
                <MdCheckCircle className="text-2xl text-emerald-400" />
                <p className="text-sm text-[#8791A1]">
                  No errors recorded since the server last started.
                </p>
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto">
                <table className="w-full border-collapse">
                  <thead className="sticky top-0 bg-[#F8F9FB]">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-[#8791A1]">
                        When
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-[#8791A1]">
                        Source
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-[#8791A1]">
                        Message
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EEF0F4]">
                    {errors.map((err, i) => (
                      <tr key={i}>
                        <td className="whitespace-nowrap px-4 py-2 text-xs text-[#8791A1]">
                          {new Date(err.at).toLocaleString()}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <Badge tone="error">{err.source}</Badge>
                        </td>
                        <td className="px-4 py-2 text-xs text-[#4B5566]">{err.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
