"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MdMailOutline, MdDelete, MdVisibility, MdEdit, MdPause, MdReplay } from "react-icons/md";
import { useEmailCampaignServices } from "@/services/emailCampaignServices";
import Card from "@/app/dashboard/components/ui/Card";
import Badge from "@/app/dashboard/components/ui/Badge";

const STATUS_TONE = {
  draft: "off-plan",
  pending: "default",
  sending: "form",
  paused: "paused",
  throttled: "call_click",
  sent: "whatsapp_click",
  failed: "error",
};

const STATUS_LABEL = {
  throttled: "waiting (daily limit)",
};

const DELETE_COPY = {
  draft: { title: "Delete this draft?", confirm: "Yes, delete it", successTitle: "Deleted" },
  pending: { title: "Cancel this scheduled broadcast?", confirm: "Yes, cancel it", successTitle: "Cancelled" },
  paused: { title: "Remove this paused broadcast?", confirm: "Yes, remove it", successTitle: "Removed" },
  throttled: { title: "Remove this broadcast?", confirm: "Yes, remove it", successTitle: "Removed" },
  sent: { title: "Remove this from your broadcast history?", confirm: "Yes, remove it", successTitle: "Removed" },
  failed: { title: "Remove this from your broadcast history?", confirm: "Yes, remove it", successTitle: "Removed" },
};

export default function CampaignHistory({ refreshKey, onResumeDraft }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const { getCampaigns, getCampaignById, deleteCampaign, pauseCampaign, resumeCampaign } =
    useEmailCampaignServices();

  const fetchCampaigns = async () => {
    try {
      const response = await getCampaigns();
      if (response.success) setCampaigns(response.data);
    } catch (err) {
      console.error("Failed to fetch campaigns:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  useEffect(() => {
    if (campaigns.some((c) => c.status === "pending" || c.status === "sending")) {
      const interval = setInterval(fetchCampaigns, 5000);
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaigns]);

  const handleViewDetail = async (id) => {
    try {
      const response = await getCampaignById(id);
      if (response.success) setDetail(response.data);
    } catch (err) {
      console.error("Failed to load campaign detail:", err);
    }
  };

  const handleResumeDraft = async (id) => {
    try {
      const response = await getCampaignById(id);
      if (response.success) {
        onResumeDraft?.(response.data);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      Swal.fire("Error", "Failed to load draft.", "error");
    }
  };

  const handlePause = async (id) => {
    try {
      const response = await pauseCampaign(id);
      if (response.success) {
        fetchCampaigns();
      } else {
        Swal.fire("Failed", response.message || "Could not pause this broadcast.", "error");
      }
    } catch (err) {
      Swal.fire("Error", err?.response?.data?.message || "Something went wrong.", "error");
    }
  };

  const handleResendRemaining = async (id) => {
    try {
      const response = await resumeCampaign(id);
      if (response.success) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
        });
        fetchCampaigns();
      } else {
        Swal.fire("Failed", response.message || "Could not resend.", "error");
      }
    } catch (err) {
      Swal.fire("Error", err?.response?.data?.message || "Something went wrong.", "error");
    }
  };

  const handleDelete = async (id, status) => {
    const copy = DELETE_COPY[status] || DELETE_COPY.sent;
    const result = await Swal.fire({
      title: copy.title,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: copy.confirm,
    });
    if (!result.isConfirmed) return;

    try {
      const response = await deleteCampaign(id);
      if (response.success) {
        setCampaigns((prev) => prev.filter((c) => c._id !== id));
        Swal.fire(copy.successTitle, response.message, "success");
      } else {
        Swal.fire("Failed", response.message || "Could not remove this broadcast.", "error");
      }
    } catch (err) {
      Swal.fire("Error", err?.response?.data?.message || "Something went wrong.", "error");
    }
  };

  const th = "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#8791A1]";
  const td = "px-4 py-3 text-sm text-[#33394B]";

  return (
    <Card className="mt-6 overflow-hidden">
      <div className="border-b border-[#E5E8EE] px-5 py-4">
        <h3 className="text-sm font-semibold text-[#1A2233]">Broadcast History</h3>
      </div>

      {loading ? (
        <div className="py-14 text-center text-sm text-[#8791A1]">Loading campaigns...</div>
      ) : campaigns.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-14 text-center">
          <MdMailOutline className="text-3xl text-[#C4CAD4]" />
          <p className="text-sm text-[#8791A1]">No broadcasts sent yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead className="bg-[#F8F9FB]">
              <tr>
                <th className={th}>Subject</th>
                <th className={th}>Recipients</th>
                <th className={th}>Sent / Failed</th>
                <th className={th}>Opened / Clicked</th>
                <th className={th}>Status</th>
                <th className={th}>{"When"}</th>
                <th className={`${th} text-center`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEF0F4]">
              {campaigns.map((c) => {
                const remaining = c.recipientCount - c.sentCount;
                const canResend =
                  remaining > 0 && ["paused", "throttled", "failed", "sent"].includes(c.status);
                return (
                  <tr key={c._id} className="hover:bg-[#F8F9FB]">
                    <td
                      className={`${td} max-w-[200px] truncate font-medium text-[#1A2233]`}
                      title={c.subject}
                    >
                      {c.subject}
                    </td>
                    <td className={td}>{c.recipientCount}</td>
                    <td className={td}>
                      {c.sentCount} / {c.failedCount}
                    </td>
                    <td className={td}>
                      {c.openedCount} / {c.clickedCount}
                    </td>
                    <td className={td}>
                      <Badge tone={STATUS_TONE[c.status] || "default"}>
                        {STATUS_LABEL[c.status] || c.status}
                      </Badge>
                      {c.status === "throttled" && (
                        <p className="mt-0.5 text-[10px] text-[#9AA4B2]">
                          Resumes automatically
                        </p>
                      )}
                    </td>
                    <td className={td}>
                      {c.scheduledAt
                        ? `Scheduled: ${new Date(c.scheduledAt).toLocaleString()}`
                        : new Date(c.createdAt).toLocaleString()}
                    </td>
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-3">
                        {c.status === "draft" && (
                          <button onClick={() => handleResumeDraft(c._id)} title="Resume editing">
                            <MdEdit className="text-lg text-[#0F2C45]/70 hover:text-[#0F2C45]" />
                          </button>
                        )}
                        {c.status === "sending" && (
                          <button onClick={() => handlePause(c._id)} title="Pause sending">
                            <MdPause className="text-lg text-amber-500 hover:text-amber-600" />
                          </button>
                        )}
                        {canResend && (
                          <button
                            onClick={() => handleResendRemaining(c._id)}
                            title={`Resend to ${remaining} remaining recipient(s)`}
                          >
                            <MdReplay className="text-lg text-[#0F2C45]/70 hover:text-[#0F2C45]" />
                          </button>
                        )}
                        <button onClick={() => handleViewDetail(c._id)} title="View details">
                          <MdVisibility className="text-lg text-[#0F2C45]/70 hover:text-[#0F2C45]" />
                        </button>
                        {c.status !== "sending" && (
                          <button onClick={() => handleDelete(c._id, c.status)} title="Remove">
                            <MdDelete className="text-lg text-red-400 hover:text-red-600" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {detail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setDetail(null)}
        >
          <div
            className="max-h-[80vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-1 text-base font-semibold text-[#1A2233]">{detail.subject}</h3>
            <p className="mb-4 text-xs text-[#8791A1]">
              {detail.recipients.length} recipient{detail.recipients.length === 1 ? "" : "s"}
            </p>
            <div className="overflow-hidden rounded-lg border border-[#E5E8EE]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F9FB]">
                  <tr>
                    <th className="px-3 py-2 font-semibold text-[#8791A1]">Name</th>
                    <th className="px-3 py-2 font-semibold text-[#8791A1]">Email</th>
                    <th className="px-3 py-2 font-semibold text-[#8791A1]">Status</th>
                    <th className="px-3 py-2 font-semibold text-[#8791A1]">Opened</th>
                    <th className="px-3 py-2 font-semibold text-[#8791A1]">Clicked</th>
                    <th className="px-3 py-2 font-semibold text-[#8791A1]">Error</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEF0F4]">
                  {detail.recipients.map((r, i) => (
                    <tr key={i}>
                      <td className="px-3 py-1.5 text-[#33394B]">{r.name || "—"}</td>
                      <td className="px-3 py-1.5 text-[#33394B]">{r.email}</td>
                      <td className="px-3 py-1.5">
                        <Badge tone={STATUS_TONE[r.status] || "default"}>{r.status}</Badge>
                      </td>
                      <td className="px-3 py-1.5 text-[#33394B]">
                        {r.openedAt ? new Date(r.openedAt).toLocaleString() : "—"}
                      </td>
                      <td className="px-3 py-1.5 text-[#33394B]">
                        {r.clickedAt ? `${r.clickCount}x` : "—"}
                      </td>
                      <td className="max-w-[140px] truncate px-3 py-1.5 text-red-500" title={r.error}>
                        {r.error || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setDetail(null)}
                className="rounded-lg bg-[#0F2C45] px-4 py-2 text-sm font-medium text-white hover:bg-[#123553]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
