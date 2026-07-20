"use client";
import PageHeader from "./components/ui/PageHeader";
import AnalyticsSummary from "./components/AnalyticsSummary";
import ServerStatus from "./components/ServerStatus";

export const DashboardHome = () => {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Site traffic overview."
      />

      <AnalyticsSummary />
      <ServerStatus />
    </div>
  );
};

export default DashboardHome;
