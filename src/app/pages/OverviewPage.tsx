import { TrendingUp, TrendingDown, Award, Target, DollarSign, Users, Phone, Calendar } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, PieChart, Pie, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis
} from "recharts";

const monthlyData = [
  { month: "T1", actual: 4.2, target: 5.0, customers: 18 },
  { month: "T2", actual: 4.8, target: 5.0, customers: 21 },
  { month: "T3", actual: 5.3, target: 5.0, customers: 24 },
  { month: "T4", actual: 4.1, target: 5.0, customers: 19 },
  { month: "T5", actual: 5.7, target: 5.5, customers: 27 },
  { month: "T6", actual: 3.2, target: 5.5, customers: 14 },
];

const productMix = [
  { name: "Vay nhà ở", value: 38, color: "#004b9a" },
  { name: "Tiết kiệm", value: 27, color: "#0891b2" },
  { name: "Vay kinh doanh", value: 20, color: "#16a34a" },
  { name: "Thẻ tín dụng", value: 15, color: "#f97316" },
];

const kpiRadar = [
  { subject: "Cuộc gọi", A: 80, fullMark: 100 },
  { subject: "Gặp KH", A: 62, fullMark: 100 },
  { subject: "Hồ sơ", A: 75, fullMark: 100 },
  { subject: "Doanh số", A: 58, fullMark: 100 },
  { subject: "Giữ chân KH", A: 88, fullMark: 100 },
  { subject: "Cross-sell", A: 45, fullMark: 100 },
];

const ranking = [
  { rank: 1, name: "Nguyễn Minh Anh", branch: "CN Q.1", revenue: 27.3, trend: "+8%" },
  { rank: 2, name: "Trần Thị Bích", branch: "CN Q.3", revenue: 25.1, trend: "+5%" },
  { rank: 3, name: "Lê Văn Cường", branch: "CN Bình Thạnh", revenue: 23.8, trend: "+12%" },
  { rank: 4, name: "Võ Minh Đức", branch: "CN Q.7", revenue: 21.2, trend: "-2%" },
  { rank: 5, name: "Đỗ Thị Em", branch: "CN Tân Bình", revenue: 19.7, trend: "+3%" },
];

const kpiCards = [
  { label: "Doanh số YTD", value: "27.3 tỷ", sub: "↑ 8% vs 2025", color: "#004b9a", bg: "#e8f0fb", icon: DollarSign },
  { label: "Khách hàng mới", value: "23", sub: "+5 so với T5", color: "#16a34a", bg: "#dcfce7", icon: Users },
  { label: "Cuộc gọi tháng 6", value: "68", sub: "Mục tiêu: 120", color: "#0891b2", bg: "#e0f2fe", icon: Phone },
  { label: "Tỷ lệ chốt deal", value: "34%", sub: "TB ngành: 28%", color: "#d97706", bg: "#fef3c7", icon: Target },
  { label: "NPS khách hàng", value: "72", sub: "↑ 4 điểm", color: "#7c3aed", bg: "#ede9fe", icon: Award },
  { label: "Lịch hẹn tháng 6", value: "18", sub: "Hoàn thành: 12", color: "#dc2626", bg: "#fef2f2", icon: Calendar },
];

export function OverviewPage() {
  return (
    <div className="p-5 pb-16">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-lg flex items-center gap-2" style={{ color: "#0d1b2a" }}>
          <TrendingUp size={20} style={{ color: "#004b9a" }} />
          Tổng quan
        </h1>
        <p className="text-xs mt-0.5" style={{ color: "#6b7a95" }}>
          Hiệu suất bán hàng · Tháng 6/2026 · RM: Nguyễn Minh Anh
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {kpiCards.map((k) => {
          const Icon = k.icon;
          return (
            <div
              key={k.label}
              className="p-4 rounded-xl border transition-all hover:shadow-sm"
              style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: k.bg }}>
                  <Icon size={17} style={{ color: k.color }} />
                </div>
                <span className="text-xs" style={{ color: "#9ca3af" }}>{k.sub}</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: k.color }}>{k.value}</p>
              <p className="text-xs mt-0.5" style={{ color: "#6b7a95" }}>{k.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts row 1 */}
      <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: "1.8fr 1fr" }}>
        {/* Revenue vs Target */}
        <div className="p-4 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold" style={{ color: "#0d1b2a" }}>Doanh số so với mục tiêu</p>
              <p className="text-xs" style={{ color: "#6b7a95" }}>Đơn vị: tỷ đồng</p>
            </div>
            <div className="flex gap-3">
              {[{ color: "#004b9a", label: "Thực tế" }, { color: "#e5e7eb", label: "Mục tiêu" }].map((l) => (
                <div key={l.label} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                  <span className="text-xs" style={{ color: "#6b7a95" }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthlyData} barGap={3} margin={{ top: 0, right: 0, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,75,154,0.06)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ fontSize: 11, borderRadius: 10, border: "1px solid #e2e8f0" }}
                formatter={(v: any, name: string) => [v + " tỷ", name === "actual" ? "Thực tế" : "Mục tiêu"]}
              />
              <Bar dataKey="target" fill="#f1f5f9" radius={[3, 3, 0, 0]} barSize={20} />
              <Bar dataKey="actual" radius={[3, 3, 0, 0]} barSize={20}>
                {monthlyData.map((d, i) => (
                  <Cell key={i} fill={i === monthlyData.length - 1 ? "#f97316" : d.actual >= d.target ? "#16a34a" : "#004b9a"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Product mix */}
        <div className="p-4 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
          <p className="text-sm font-semibold mb-1" style={{ color: "#0d1b2a" }}>Cơ cấu sản phẩm</p>
          <p className="text-xs mb-3" style={{ color: "#6b7a95" }}>Tháng 6/2026</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={productMix}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                dataKey="value"
              >
                {productMix.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any) => [v + "%", ""]} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {productMix.map((p) => (
              <div key={p.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                  <span className="text-xs" style={{ color: "#6b7a95" }}>{p.name}</span>
                </div>
                <span className="text-xs font-medium" style={{ color: p.color }}>{p.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1.4fr" }}>
        {/* Radar KPI */}
        <div className="p-4 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
          <p className="text-sm font-semibold mb-1" style={{ color: "#0d1b2a" }}>Chỉ số KPI đa chiều</p>
          <p className="text-xs mb-2" style={{ color: "#6b7a95" }}>Tháng 6 (% đạt mục tiêu)</p>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={kpiRadar}>
              <PolarGrid stroke="rgba(0,75,154,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#6b7a95" }} />
              <Radar name="KPI" dataKey="A" stroke="#004b9a" fill="#004b9a" fillOpacity={0.15} strokeWidth={2} />
              <Tooltip formatter={(v: any) => [v + "%", "Đạt"]} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Ranking */}
        <div className="p-4 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
          <p className="text-sm font-semibold mb-1" style={{ color: "#0d1b2a" }}>Bảng xếp hạng RM</p>
          <p className="text-xs mb-4" style={{ color: "#6b7a95" }}>Top 5 doanh số YTD 2026 (tỷ đồng)</p>
          <div className="space-y-2.5">
            {ranking.map((r) => (
              <div key={r.rank} className="flex items-center gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{
                    background: r.rank === 1 ? "#fbbf24" : r.rank === 2 ? "#d1d5db" : r.rank === 3 ? "#f59e0b" : "#e8f0fb",
                    color: r.rank <= 3 ? "#fff" : "#004b9a",
                  }}
                >
                  {r.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-medium"
                      style={{ color: r.name === "Nguyễn Minh Anh" ? "#004b9a" : "#374151" }}
                    >
                      {r.name} {r.name === "Nguyễn Minh Anh" && "(Bạn)"}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold" style={{ color: "#004b9a" }}>{r.revenue}</span>
                      <span
                        className="text-xs"
                        style={{ color: r.trend.startsWith("+") ? "#16a34a" : "#dc2626" }}
                      >
                        {r.trend.startsWith("+") ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: "#f1f5f9" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(r.revenue / 30) * 100}%`,
                          background: r.rank === 1 ? "#004b9a" : "#cbd5e1",
                        }}
                      />
                    </div>
                    <span className="text-xs" style={{ color: "#9ca3af" }}>{r.branch}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
