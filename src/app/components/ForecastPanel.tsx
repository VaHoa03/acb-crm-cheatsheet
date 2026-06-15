import { BarChart2, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { month: "T1", actual: 4.2, target: 5.0 },
  { month: "T2", actual: 4.8, target: 5.0 },
  { month: "T3", actual: 5.3, target: 5.0 },
  { month: "T4", actual: 4.1, target: 5.0 },
  { month: "T5", actual: 5.7, target: 5.5 },
  { month: "T6", actual: 3.2, target: 5.5, current: true },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="text-xs p-2 rounded-lg shadow-lg border"
        style={{ background: "#fff", borderColor: "var(--border)" }}
      >
        <p className="font-medium mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name === "actual" ? "Thực tế" : "Mục tiêu"}: {p.value} tỷ
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ForecastPanel() {
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
          <BarChart2 size={13} style={{ color: "var(--primary)" }} />
          <span
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: "var(--muted-foreground)" }}
          >
            Dự Báo Bán
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: "#004b9a" }} />
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Thực tế</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ background: "#e5e7eb" }} />
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Mục tiêu</span>
          </div>
        </div>
      </div>

      <div className="p-3">
        {/* KPI row */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { label: "Tháng này", value: "3.2 tỷ", sub: "/ 5.5 tỷ", color: "#d97706" },
            { label: "Dự kiến đạt", value: "4.8 tỷ", sub: "↑ 87%", color: "#16a34a" },
            { label: "YTD", value: "27.3 tỷ", sub: "↑ 8% vs 2025", color: "#004b9a" },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-lg p-2 text-center"
              style={{ background: "var(--muted)" }}
            >
              <p className="text-xs font-semibold" style={{ color: kpi.color }}>
                {kpi.value}
              </p>
              <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{kpi.sub}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{kpi.label}</p>
            </div>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={data} barGap={2} margin={{ top: 2, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,75,154,0.05)" }} />
            <Bar dataKey="target" fill="#e5e7eb" radius={[2, 2, 0, 0]} barSize={8} />
            <Bar dataKey="actual" radius={[2, 2, 0, 0]} barSize={8}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.current ? "#f97316" : "#004b9a"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
