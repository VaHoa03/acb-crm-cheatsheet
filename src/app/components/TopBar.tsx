import { Search, Bell, Settings, ChevronDown, Star } from "lucide-react";
import { useState } from "react";

export function TopBar() {
  const [search, setSearch] = useState("");

  return (
    <header
      className="fixed top-0 left-[200px] right-0 h-12 flex items-center px-4 gap-3 z-20 border-b"
      style={{ background: "#ffffff", borderColor: "var(--border)" }}
    >
      {/* Greeting */}
      <div className="flex items-center gap-2 mr-2">
        <div>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Chào buổi sáng,</p>
          <div className="flex items-center gap-1">
            <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              Nguyễn Minh Anh
            </p>
            <Star size={13} fill="#f59e0b" stroke="#f59e0b" />
          </div>
        </div>
      </div>

      <div className="h-5 w-px mx-1" style={{ background: "var(--border)" }} />

      {/* Search */}
      <div className="flex-1 max-w-xs relative">
        <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "var(--muted-foreground)" }} />
        <input
          type="text"
          placeholder="Tìm kiếm khách hàng, CIF, sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs outline-none transition-all"
          style={{
            background: "var(--input-background)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
          }}
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Date */}
        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          Thứ 4, 11/06/2026
        </span>

        {/* Notifications */}
        <button className="relative p-1.5 rounded-lg hover:bg-gray-100 transition-all">
          <Bell size={15} style={{ color: "var(--muted-foreground)" }} />
          <span
            className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full"
            style={{ background: "var(--destructive)" }}
          />
        </button>

        {/* Settings */}
        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-all">
          <Settings size={15} style={{ color: "var(--muted-foreground)" }} />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-1.5 pl-2 cursor-pointer">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: "var(--acb-gold)" }}
          >
            N
          </div>
          <ChevronDown size={12} style={{ color: "var(--muted-foreground)" }} />
        </div>
      </div>
    </header>
  );
}
