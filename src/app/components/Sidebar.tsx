import { useState } from "react";
import {
  Users, TrendingUp, Calendar, Package, BarChart2,
  Zap, Bot, ChevronUp, Star
} from "lucide-react";

const navItems = [
  { icon: Users, label: "Khách hàng", badge: null, active: false },
  { icon: TrendingUp, label: "Cơ hội bán", badge: "8", active: false },
  { icon: Calendar, label: "Lịch & Công việc", badge: "3", active: false },
  { icon: Package, label: "Sản phẩm", badge: null, active: false },
  { icon: BarChart2, label: "Báo cáo", badge: null, active: false },
];

export function Sidebar({ activePage, onNavigate }: { activePage: string; onNavigate: (page: string) => void }) {
  return (
    <aside
      className="fixed left-0 top-0 bottom-0 w-[200px] flex flex-col z-30"
      style={{ background: "var(--acb-sidebar)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <div className="flex items-center gap-1">
          <div
            className="w-8 h-8 rounded flex items-center justify-center"
            style={{ background: "#ffffff" }}
          >
            <span className="text-xs font-bold" style={{ color: "var(--acb-blue)" }}>ACB</span>
          </div>
          <span className="text-white text-sm font-semibold tracking-wide ml-1">CRM</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.label;
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.label)}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all duration-150 group"
              style={{
                background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.7)",
                borderLeft: isActive ? "3px solid #f97316" : "3px solid transparent",
              }}
            >
              <Icon size={16} />
              <span className="text-xs">{item.label}</span>
              {item.badge && (
                <span
                  className="ml-auto text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center"
                  style={{ background: "var(--acb-gold)", color: "#fff" }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="mt-2 mx-3 h-px" style={{ background: "rgba(255,255,255,0.1)" }} />

        {/* Upgrade */}
        <button
          className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all"
          style={{ color: "rgba(255,255,255,0.6)" }}
          onClick={() => onNavigate("Nâng cấp")}
        >
          <Zap size={16} className="text-yellow-400" />
          <span className="text-xs">Nâng cấp</span>
          <span
            className="ml-auto text-xs px-1.5 py-0.5 rounded"
            style={{ background: "#f59e0b", color: "#000" }}
          >PRO</span>
        </button>

        {/* AI Trợ lý */}
        <button
          className="w-full flex items-center gap-3 px-4 py-2.5 text-left"
          style={{ color: "rgba(255,255,255,0.7)" }}
          onClick={() => onNavigate("AI Trợ lý")}
        >
          <Bot size={16} className="text-blue-300" />
          <span className="text-xs">AI Trợ lý</span>
        </button>
      </nav>

      {/* User */}
      <div
        className="px-3 py-3 border-t flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-all"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: "var(--acb-gold)" }}
        >
          N
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs truncate">Nguyễn Minh Anh</p>
          <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.5)" }}>RM Senior</p>
        </div>
        <ChevronUp size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
      </div>
    </aside>
  );
}
