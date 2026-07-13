"use client";
import PageHeader from "./components/ui/PageHeader";
import AnalyticsSummary from "./components/AnalyticsSummary";

export const DashboardHome = () => {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Site traffic overview."
      />

      <AnalyticsSummary />
    </div>
  );
};

export default DashboardHome;
