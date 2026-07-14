"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { MdLock } from "react-icons/md";
import { userRoadshowServices } from "@/services/roadshowService";
import Card from "@/app/dashboard/components/ui/Card";
import Button from "@/app/dashboard/components/ui/Button";
import { Input } from "@/app/dashboard/components/ui/Field";

export default function AnnouncementPinUpdate() {
  const [pin, setPin] = useState("");
  const [saving, setSaving] = useState(false);
  const { updateAnnouncementPin } = userRoadshowServices();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{4}$/.test(pin)) {
      Swal.fire("Invalid PIN", "The PIN must be exactly 4 digits.", "warning");
      return;
    }

    setSaving(true);
    try {
      const response = await updateAnnouncementPin(pin);
      if (response?.success) {
        Swal.fire("Success", "Announcement PIN updated.", "success");
        setPin("");
      } else {
        Swal.fire("Failed", "Failed to update the PIN.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-md p-6 sm:p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F2C45]/10 text-[#0F2C45]">
            <MdLock className="text-xl" />
          </div>
          <h3 className="mt-3 text-lg font-semibold text-[#1A2233]">
            Announcement PIN
          </h3>
          <p className="mt-1 text-sm text-[#7A8494]">
            This 4-digit PIN unlocks the &quot;Announce to Live Screen&quot; form on the
            attendance page. Share it only with staff who should be able to broadcast.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="New 4-digit PIN"
            required
            inputMode="numeric"
            maxLength={4}
            placeholder="e.g. 4821"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
            className="text-center text-lg tracking-[0.5em]"
          />

          <Button type="submit" className="w-full" loading={saving}>
            Update PIN
          </Button>
        </form>
      </Card>
    </div>
  );
}
