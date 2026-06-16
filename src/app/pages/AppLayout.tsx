import { Outlet, NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard, Users, TrendingUp, Target,
  Bell, Settings, ChevronDown, Search, LogOut, Bot, Sparkles, Megaphone, ShoppingBag
} from "lucide-react";
import { useState } from "react";
import { CustomerModal, type Customer } from "../components/CustomerModal";
import { CustomerModalContext } from "../context/CustomerModalContext";
import { PipelineContext, type PipelineDeal } from "../context/PipelineContext";

const navItems = [
  { to: "/app/dashboard", icon: LayoutDashboard, label: "Dashboard", badge: null },
  { to: "/app/customers", icon: Users, label: "Khách hàng", badge: "124" },
  { to: "/app/overview", icon: TrendingUp, label: "Tổng quan", badge: null },
  { to: "/app/cohoi", icon: ShoppingBag, label: "Cơ hội bán hàng", badge: "128" },
  { to: "/app/leads", icon: Target, label: "Lead", badge: "8" },
  { to: "/app/campaigns", icon: Megaphone, label: "Chiến dịch", badge: null },
];

export function AppLayout() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [extraDeals, setExtraDeals] = useState<PipelineDeal[]>([]);

  const addDeal = (deal: PipelineDeal) => {
    setExtraDeals((prev) => [deal, ...prev.filter((d) => d.id !== deal.id)]);
  };

  return (
    <CustomerModalContext.Provider value={setSelectedCustomer}>
    <PipelineContext.Provider value={{ deals: extraDeals, addDeal }}>
      <div
        className="flex min-h-screen"
        style={{ background: "#f0f4f9", fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {/* Sidebar */}
        <aside
          className="fixed left-0 top-0 bottom-0 w-[220px] flex flex-col z-30"
          style={{ background: "linear-gradient(180deg, #001a4d 0%, #002d6e 100%)" }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5 px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white flex-shrink-0">
              <span className="font-black text-sm" style={{ color: "#002d6e" }}>ACB</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">ACB CRM</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Sales Platform</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <p className="text-xs px-2 mb-3 font-medium uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
              Tác vụ chính
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm group ${
                      isActive ? "active-nav" : ""
                    }`
                  }
                  style={({ isActive }) => ({
                    background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                    color: isActive ? "#ffffff" : "rgba(255,255,255,0.6)",
                    borderLeft: isActive ? "3px solid #f97316" : "3px solid transparent",
                    fontWeight: isActive ? 600 : 400,
                  })}
                >
                  <Icon size={17} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
                      style={{ background: "#f97316", color: "#fff" }}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}

            <div className="mt-4 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <p className="text-xs px-2 mb-3 font-medium uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
                Tiện ích
              </p>
              <button
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                <Bot size={17} className="text-violet-400" />
                <span>AI Trợ lý</span>
                <span
                  className="ml-auto text-xs px-1.5 py-0.5 rounded-full"
                  style={{ background: "rgba(167,139,250,0.25)", color: "#a78bfa" }}
                >
                  Beta
                </span>
              </button>
              <button
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                <Settings size={17} />
                <span>Cài đặt</span>
              </button>
            </div>
          </nav>

          {/* User footer */}
          <div
            className="mx-3 mb-3 px-3 py-3 rounded-xl cursor-pointer transition-all hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: "#f97316" }}
              >
                N
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">Nguyễn Minh Anh</p>
                <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>RM Senior · Q.1</p>
              </div>
              <button
                onClick={() => navigate("/login")}
                className="p-1 rounded hover:bg-white/20 transition-all"
                title="Đăng xuất"
              >
                <LogOut size={13} style={{ color: "rgba(255,255,255,0.5)" }} />
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 pl-[220px] flex flex-col min-h-screen">
          {/* Topbar */}
          <header
            className="sticky top-0 z-20 flex items-center gap-3 px-5 h-14 border-b"
            style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}
          >
            {/* Search */}
            <div className="flex-1 max-w-sm relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9ca3af" }} />
              <input
                type="text"
                placeholder="Tìm khách hàng, CIF, sản phẩm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg text-xs outline-none transition-all"
                style={{
                  background: "#f0f4f9",
                  border: "1.5px solid transparent",
                  color: "#0d1b2a",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#004b9a")}
                onBlur={(e) => (e.target.style.borderColor = "transparent")}
              />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs" style={{ color: "#9ca3af" }}>T4, 11/06/2026</span>

              {/* AI chip */}
              <div
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-pointer hover:opacity-90 transition-all"
                style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)" }}
              >
                <Sparkles size={12} className="text-violet-300" />
                <span className="text-xs text-white font-medium">AI</span>
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-all">
                <Bell size={16} style={{ color: "#6b7a95" }} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "#dc2626" }} />
              </button>

              {/* Avatar */}
              <div className="flex items-center gap-1.5 pl-1 cursor-pointer">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: "#f97316" }}
                >
                  N
                </div>
                <ChevronDown size={13} style={{ color: "#9ca3af" }} />
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto pb-12">
            <Outlet />
          </main>

          {/* AI bottom bar */}
          <div
            className="fixed bottom-0 left-[220px] right-0 px-5 py-2.5 flex items-center gap-3 z-20"
            style={{
              background: "linear-gradient(90deg, #1e1b4b 0%, #312e81 60%, #004b9a 100%)",
              boxShadow: "0 -2px 12px rgba(0,0,0,0.15)",
            }}
          >
            <div className="flex items-center gap-2">
              <Sparkles size={13} className="text-violet-300" />
              <span className="text-xs text-white font-medium">AI TRỢ LÝ</span>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)" }}>Beta</span>
            </div>
            <p className="text-xs text-white/80 flex-1">
              Bạn có <strong className="text-white">3 cơ hội bán hàng</strong> cần xử lý hôm nay và <strong className="text-white">2 khách hàng</strong> có nguy cơ rời bỏ.
            </p>
            <button
              className="px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-80 transition-all flex-shrink-0"
              style={{ background: "#f97316", color: "#fff" }}
            >
              Xem gợi ý →
            </button>
          </div>
        </div>
      </div>

      {/* Customer modal – available to all child pages */}
      <CustomerModal customer={selectedCustomer} onClose={() => setSelectedCustomer(null)} />
    </PipelineContext.Provider>
    </CustomerModalContext.Provider>
  );
}
