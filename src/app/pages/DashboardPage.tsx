import { PriorityCenter } from "../components/PriorityCenter";
import { PerformancePanel } from "../components/PerformancePanel";
import { SchedulePanel } from "../components/SchedulePanel";
import { AIInsightPanel } from "../components/AIInsightPanel";
import { SalesPipelinePanel } from "../components/SalesPipelinePanel";
import { ForecastPanel } from "../components/ForecastPanel";
import { AlertsPanel } from "../components/AlertsPanel";
import { CampaignPerformancePanel } from "../components/CampaignPerformancePanel";
import { QuickListPanel } from "../components/QuickListPanel";
import { useCustomerModal } from "../context/CustomerModalContext";

export function DashboardPage() {
  const openCustomer = useCustomerModal();

  return (
    <div className="p-5 pb-16">
      {/* Page header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-lg" style={{ color: "#0d1b2a" }}>Dashboard</h1>
          <p className="text-xs mt-0.5" style={{ color: "#6b7a95" }}>
            Tổng quan hoạt động bán hàng hôm nay · Thứ 4, 11/06/2026
          </p>
        </div>
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
          style={{ background: "#dcfce7", color: "#16a34a", border: "1px solid #bbf7d0" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
          Đang trực tuyến
        </div>
      </div>

      {/* Row 1: 3 columns */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
        <PriorityCenter onSelectCustomer={openCustomer} />
        <div className="flex flex-col gap-4">
          <PerformancePanel />
          <SchedulePanel />
        </div>
        <div className="flex flex-col gap-4">
          <AIInsightPanel />
          <QuickListPanel />
        </div>
      </div>

      {/* Row 2: Pipeline */}
      <div className="mt-4">
        <SalesPipelinePanel onSelectCustomer={openCustomer} />
      </div>

      {/* Row 3: Forecast + Campaign performance + Alerts */}
      <div className="mt-4 grid gap-4" style={{ gridTemplateColumns: "1.3fr 1fr 1fr" }}>
        <ForecastPanel />
        <CampaignPerformancePanel />
        <AlertsPanel />
      </div>
    </div>
  );
}
