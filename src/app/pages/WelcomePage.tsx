import { useNavigate } from "react-router";
import { ArrowRight, TrendingUp, Users, Target, BarChart2, Sparkles, Bell, Megaphone } from "lucide-react";
import { useEffect, useState } from "react";

const tips = [
  "Hôm nay bạn có 3 khách hàng cần liên hệ trong Priority Center.",
  "AI phát hiện 2 cơ hội cross-sell tiềm năng với KH Platinum.",
  "Pipeline tháng 6 đang ở 58% — cần tăng tốc trong 20 ngày tới.",
];

const modules = [
  {
    path: "/app/dashboard",
    icon: BarChart2,
    label: "Dashboard",
    desc: "Tổng quan hoạt động hôm nay",
    color: "#004b9a",
    bg: "#e8f0fb",
    badge: null,
  },
  {
    path: "/app/customers",
    icon: Users,
    label: "Khách hàng",
    desc: "Quản lý danh mục KH",
    color: "#0891b2",
    bg: "#e0f2fe",
    badge: "124",
  },
  {
    path: "/app/overview",
    icon: TrendingUp,
    label: "Tổng quan",
    desc: "Hiệu suất & báo cáo",
    color: "#16a34a",
    bg: "#dcfce7",
    badge: null,
  },
  {
    path: "/app/leads",
    icon: Target,
    label: "Lead",
    desc: "Pipeline xử lý lead theo AI Score",
    color: "#d97706",
    bg: "#fef3c7",
    badge: "8",
  },
  {
    path: "/app/campaigns",
    icon: Megaphone,
    label: "Chiến dịch",
    desc: "KPI và lead theo chiến dịch",
    color: "#7c3aed",
    bg: "#ede9fe",
    badge: null,
  },
];

export function WelcomePage() {
  const navigate = useNavigate();
  const [tipIdx, setTipIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setTipIdx((i) => (i + 1) % tips.length);
        setVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#f0f4f9", fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Top bar */}
      <header
        className="flex items-center justify-between px-8 py-4 border-b"
        style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: "#002d6e" }}
          >
            <span className="font-black text-sm text-white">ACB</span>
          </div>
          <span className="font-semibold" style={{ color: "#002d6e" }}>ACB CRM</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg hover:bg-gray-100">
            <Bell size={16} style={{ color: "#6b7a95" }} />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ background: "#dc2626" }}
            />
          </button>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "#f97316" }}
            >
              N
            </div>
            <div>
              <p className="text-xs font-semibold" style={{ color: "#0d1b2a" }}>Nguyễn Minh Anh</p>
              <p className="text-xs" style={{ color: "#6b7a95" }}>RM Senior · CN Quận 1</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div
        className="px-8 py-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #001a4d 0%, #002d6e 50%, #004b9a 100%)",
        }}
      >
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

        <div className="relative z-10 max-w-2xl">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5 text-xs"
            style={{ background: "rgba(249,115,22,0.2)", color: "#fdba74", border: "1px solid rgba(249,115,22,0.3)" }}
          >
            <Sparkles size={11} />
            Thứ 4, ngày 11 tháng 6 năm 2026
          </div>

          <h1 className="text-white mb-2" style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1.3 }}>
            Chào buổi sáng,{" "}
            <span style={{ color: "#fbbf24" }}>Nguyễn Minh Anh</span> 👋
          </h1>
          <p className="text-white/60 text-sm mb-8">
            Hôm nay bạn có <strong className="text-white">5 nhiệm vụ ưu tiên</strong> và{" "}
            <strong className="text-white">3 lịch hẹn</strong>. Bắt đầu ngày làm việc hiệu quả!
          </p>

          {/* Quick stats */}
          <div className="flex items-center gap-6 flex-wrap">
            {[
              { label: "KPI tháng 6", value: "58%", color: "#fbbf24" },
              { label: "KH ưu tiên", value: "5", color: "#34d399" },
              { label: "Deal đang mở", value: "12", color: "#60a5fa" },
              { label: "Cơ hội AI", value: "3", color: "#f472b6" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-8 py-8 max-w-4xl w-full mx-auto">
        {/* AI tip */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl mb-8 transition-opacity duration-300"
          style={{
            background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
            opacity: visible ? 1 : 0,
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <Sparkles size={13} className="text-violet-300" />
          </div>
          <p className="text-sm text-white/80 flex-1">{tips[tipIdx]}</p>
          <div className="flex gap-1">
            {tips.map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{ background: i === tipIdx ? "#a78bfa" : "rgba(255,255,255,0.2)" }}
              />
            ))}
          </div>
        </div>

        {/* Modules grid */}
        <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#6b7a95" }}>
          Truy cập nhanh
        </p>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.path}
                onClick={() => navigate(mod.path)}
                className="group flex items-center gap-4 p-5 rounded-2xl border text-left transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
                style={{
                  background: "#fff",
                  borderColor: "rgba(0,75,154,0.1)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: mod.bg }}
                >
                  <Icon size={22} style={{ color: mod.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm" style={{ color: "#0d1b2a" }}>
                      {mod.label}
                    </span>
                    {mod.badge && (
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                        style={{ background: mod.color + "18", color: mod.color }}
                      >
                        {mod.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "#6b7a95" }}>{mod.desc}</p>
                </div>
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                  style={{ color: mod.color }}
                />
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/app/dashboard")}
          className="w-full py-4 rounded-2xl font-semibold text-sm transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #002d6e 0%, #004b9a 100%)",
            color: "#fff",
            boxShadow: "0 8px 20px rgba(0,75,154,0.3)",
          }}
        >
          Bắt đầu làm việc
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
