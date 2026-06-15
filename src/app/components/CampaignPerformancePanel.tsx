import { Megaphone, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { campaigns } from "../data/leadsData";

const chartData = campaigns.map((c) => ({
  name: c.name.length > 14 ? c.name.slice(0, 14) + "…" : c.name,
  leads: c.leads,
  converted: c.converted,
}));

export function CampaignPerformancePanel() {
  const navigate = useNavigate();

  return (
    <div
      className="rounded-xl border"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-1.5">
          <Megaphone size={13} style={{ color: "var(--primary)" }} />
          <span
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: "var(--muted-foreground)" }}
          >
            Hiệu Suất Chiến Dịch
          </span>
        </div>
        <button
          onClick={() => navigate("/app/campaigns")}
          className="text-xs flex items-center gap-0.5"
          style={{ color: "var(--primary)" }}
        >
          Xem tất cả <ChevronRight size={11} />
        </button>
      </div>

      <div className="p-3">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: "#d97706" }} />
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Lead</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: "#16a34a" }} />
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Chốt</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
            <XAxis type="number" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
            <Bar dataKey="leads" fill="#d97706" radius={[0, 4, 4, 0]} barSize={8} />
            <Bar dataKey="converted" fill="#16a34a" radius={[0, 4, 4, 0]} barSize={8} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
