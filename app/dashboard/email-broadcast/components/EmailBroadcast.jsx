"use client";

import { useState } from "react";
import PageHeader from "@/app/dashboard/components/ui/PageHeader";
import CampaignComposer from "./CampaignComposer";
import CampaignHistory from "./CampaignHistory";

export default function EmailBroadcast() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingCampaign, setEditingCampaign] = useState(null);

  return (
    <div>
      <PageHeader
        title="Email Broadcast"
        description="Send a templated email to a bulk list of clients, now or scheduled."
      />
      <CampaignComposer
        editingCampaign={editingCampaign}
        onDoneEditing={() => setEditingCampaign(null)}
        onSent={() => {
          setRefreshKey((k) => k + 1);
          setEditingCampaign(null);
        }}
      />
      <CampaignHistory refreshKey={refreshKey} onResumeDraft={setEditingCampaign} />
    </div>
  );
}
