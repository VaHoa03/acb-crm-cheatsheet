import { Phone, Users, CheckSquare, TrendingUp, TrendingDown } from "lucide-react";

const metrics = [
  {
    label: "Cuộc gọi",
    value: 12,
    target: 15,
    icon: Phone,
    color: "#004b9a",
    bg: "#e8f0fb",
    unit: "",
    trend: "+2",
    trendUp: true,
  },
  {
    label: "Gặp KH",
    value: 5,
    target: 8,
    icon: Users,
    color: "#16a34a",
    bg: "#dcfce7",
    unit: "",
    trend: "+1",
    trendUp: true,
  },
  {
    label: "Công việc",
    value: 2.4,
    target: 5,
    icon: CheckSquare,
    color: "#d97706",
    bg: "#fef3c7",
    unit: "",
    trend: "-0.6",
    trendUp: false,
  },
];

function MiniBar({ value, target, color }: { value: number; target: number; color: string }) {
  const pct = Math.min((value / target) * 100, 100);
  return (
    <div className="w-full h-1.5 rounded-full mt-1" style={{ background: "#e5e7eb" }}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}

export function PerformancePanel() {
  return (
    <div
      className="rounded-xl border"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <span
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "var(--muted-foreground)" }}
        >
          Hiệu Suất Hôm Nay
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{ background: "var(--secondary)", color: "var(--primary)" }}
        >
          11/06/2026
        </span>
      </div>

      <div className="grid grid-cols-3 divide-x" style={{ divideColor: "var(--border)" }}>
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="px-3 py-3">
              <div className="flex items-center justify-between mb-1">
                <div
                  className="w-6 h-6 rounded flex items-center justify-center"
                  style={{ background: m.bg }}
                >
                  <Icon size={12} style={{ color: m.color }} />
                </div>
                <div className="flex items-center gap-0.5">
                  {m.trendUp ? (
                    <TrendingUp size={10} style={{ color: "#16a34a" }} />
                  ) : (
                    <TrendingDown size={10} style={{ color: "#dc2626" }} />
                  )}
                  <span
                    className="text-xs"
                    style={{ color: m.trendUp ? "#16a34a" : "#dc2626" }}
                  >
                    {m.trend}
                  </span>
                </div>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-xl font-bold" style={{ color: m.color }}>
                  {m.value}
                </span>
                <span className="text-xs mb-0.5" style={{ color: "var(--muted-foreground)" }}>
                  /{m.target}
                </span>
              </div>
              <MiniBar value={m.value} target={m.target} color={m.color} />
              <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                {m.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
