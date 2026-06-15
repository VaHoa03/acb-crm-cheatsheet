import { useState } from "react";
import { Search, Filter, Plus, Phone, Mail, MoreHorizontal, ChevronDown, Users, Crown, Star } from "lucide-react";
import { useCustomerModal } from "../context/CustomerModalContext";
import type { Customer } from "../components/CustomerModal";

const segments = ["Tất cả", "Diamond", "Platinum", "Gold", "Standard"];
const statuses = ["Tất cả", "Hoạt động", "Không tương tác", "Rủi ro cao"];

const allCustomers: Customer[] = [
  { id: 1, name: "Trần Văn Bình", cif: "CIF0023847", segment: "Diamond", segColor: "#7c3aed", product: "Vay mua nhà 2.5 tỷ", deadline: "Hôm nay 14:00", urgent: true, task: "Gọi tư vấn lãi suất ưu đãi", amount: "2.500.000.000", avatar: "T", avatarBg: "#7c3aed" },
  { id: 2, name: "Nguyễn Thị Lan", cif: "CIF0019234", segment: "Platinum", segColor: "#0891b2", product: "Tiết kiệm Online 500tr", deadline: "Hôm nay 16:30", urgent: true, task: "Mời tái gửi kỳ hạn 12 tháng", amount: "500.000.000", avatar: "N", avatarBg: "#0891b2" },
  { id: 3, name: "Lê Hoàng Dũng", cif: "CIF0031029", segment: "Gold", segColor: "#d97706", product: "Thẻ Tín Dụng Platinum", deadline: "11/06 EOD", urgent: false, task: "Upsell gói bảo hiểm du lịch", amount: "50.000.000", avatar: "L", avatarBg: "#d97706" },
  { id: 4, name: "Phạm Thị Thu", cif: "CIF0028811", segment: "Gold", segColor: "#d97706", product: "Vay kinh doanh 800tr", deadline: "12/06", urgent: false, task: "Thu thập hồ sơ pháp lý", amount: "800.000.000", avatar: "P", avatarBg: "#16a34a" },
  { id: 5, name: "Lâm Phước Bảo", cif: "CIF0044512", segment: "Standard", segColor: "#6b7280", product: "Mở TK thanh toán", deadline: "13/06", urgent: false, task: "Kích hoạt dịch vụ ACB ONE", amount: "—", avatar: "L", avatarBg: "#6b7280" },
  { id: 6, name: "Hoàng Minh Tuấn", cif: "CIF0011234", segment: "Platinum", segColor: "#0891b2", product: "Vay mua xe 600tr", deadline: "14/06", urgent: false, task: "Xét duyệt hồ sơ", amount: "600.000.000", avatar: "H", avatarBg: "#0891b2" },
  { id: 7, name: "Võ Thị Hoa", cif: "CIF0038821", segment: "Gold", segColor: "#d97706", product: "Tiết kiệm 1 tỷ", deadline: "15/06", urgent: false, task: "Tư vấn gia tăng tiết kiệm", amount: "1.000.000.000", avatar: "V", avatarBg: "#16a34a" },
  { id: 8, name: "Đặng Quốc Hùng", cif: "CIF0022098", segment: "Standard", segColor: "#6b7280", product: "Thẻ Debit", deadline: "—", urgent: false, task: "Upsell thẻ tín dụng", amount: "—", avatar: "Đ", avatarBg: "#6b7280" },
];

const statusOf = (c: Customer) => {
  if (c.urgent) return { label: "Rủi ro cao", color: "#dc2626", bg: "#fef2f2" };
  if (c.deadline === "—") return { label: "Không tương tác", color: "#d97706", bg: "#fef3c7" };
  return { label: "Hoạt động", color: "#16a34a", bg: "#dcfce7" };
};

export function CustomersPage() {
  const openCustomer = useCustomerModal();
  const [search, setSearch] = useState("");
  const [activeSeg, setActiveSeg] = useState("Tất cả");
  const [activeStatus, setActiveStatus] = useState("Tất cả");
  const [view, setView] = useState<"table" | "card">("table");

  const filtered = allCustomers.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.cif.includes(search);
    const matchSeg = activeSeg === "Tất cả" || c.segment === activeSeg;
    const matchStatus = activeStatus === "Tất cả" || statusOf(c).label === activeStatus;
    return matchSearch && matchSeg && matchStatus;
  });

  return (
    <div className="p-5 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-lg flex items-center gap-2" style={{ color: "#0d1b2a" }}>
            <Users size={20} style={{ color: "#004b9a" }} />
            Khách hàng
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "#6b7a95" }}>
            Quản lý danh mục {allCustomers.length} khách hàng được giao
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #002d6e 0%, #004b9a 100%)", color: "#fff" }}
        >
          <Plus size={15} />
          Thêm khách hàng
        </button>
      </div>

      {/* Segment stats */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: "Diamond", count: 1, icon: Crown, color: "#7c3aed", bg: "#ede9fe" },
          { label: "Platinum", count: 2, icon: Star, color: "#0891b2", bg: "#e0f2fe" },
          { label: "Gold", count: 3, icon: Star, color: "#d97706", bg: "#fef3c7" },
          { label: "Standard", count: 2, icon: Users, color: "#6b7280", bg: "#f3f4f6" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.label}
              onClick={() => setActiveSeg(activeSeg === s.label ? "Tất cả" : s.label)}
              className="flex items-center gap-3 p-3 rounded-xl border transition-all hover:shadow-sm"
              style={{
                background: activeSeg === s.label ? s.bg : "#fff",
                borderColor: activeSeg === s.label ? s.color + "60" : "rgba(0,75,154,0.1)",
              }}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: s.bg }}>
                <Icon size={16} style={{ color: s.color }} />
              </div>
              <div className="text-left">
                <p className="text-xl font-bold" style={{ color: s.color }}>{s.count}</p>
                <p className="text-xs" style={{ color: "#6b7a95" }}>{s.label}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Filters row */}
      <div
        className="flex items-center gap-3 mb-4 p-3 rounded-xl border"
        style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}
      >
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9ca3af" }} />
          <input
            type="text"
            placeholder="Tìm theo tên, CIF..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-lg text-xs outline-none"
            style={{ background: "#f0f4f9", color: "#0d1b2a", border: "1.5px solid transparent" }}
            onFocus={(e) => (e.target.style.borderColor = "#004b9a")}
            onBlur={(e) => (e.target.style.borderColor = "transparent")}
          />
        </div>

        {/* Segment filter */}
        <div className="flex gap-1">
          {segments.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSeg(s)}
              className="px-2.5 py-1.5 rounded-lg text-xs transition-all"
              style={{
                background: activeSeg === s ? "#004b9a" : "#f0f4f9",
                color: activeSeg === s ? "#fff" : "#6b7a95",
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="ml-auto flex gap-2">
          {/* Status */}
          <div className="relative">
            <select
              value={activeStatus}
              onChange={(e) => setActiveStatus(e.target.value)}
              className="appearance-none pl-3 pr-7 py-2 rounded-lg text-xs outline-none cursor-pointer"
              style={{ background: "#f0f4f9", color: "#6b7a95", border: "none" }}
            >
              {statuses.map((s) => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9ca3af" }} />
          </div>

          {/* View toggle */}
          <div className="flex rounded-lg overflow-hidden" style={{ border: "1.5px solid #e2e8f0" }}>
            {(["table", "card"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="px-3 py-1.5 text-xs transition-all"
                style={{
                  background: view === v ? "#004b9a" : "transparent",
                  color: view === v ? "#fff" : "#6b7a95",
                }}
              >
                {v === "table" ? "Bảng" : "Thẻ"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Customer list */}
      {view === "table" ? (
        <div className="rounded-xl border overflow-hidden" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
          {/* Table head */}
          <div
            className="grid text-xs px-4 py-3 border-b"
            style={{
              gridTemplateColumns: "2fr 130px 1fr 140px 100px 90px",
              color: "#6b7a95",
              background: "#f8fafc",
              borderColor: "rgba(0,75,154,0.08)",
            }}
          >
            <span>Khách hàng</span>
            <span>Phân khúc</span>
            <span>Sản phẩm</span>
            <span>Công việc tiếp theo</span>
            <span>Trạng thái</span>
            <span>Hành động</span>
          </div>

          <div>
            {filtered.map((c) => {
              const st = statusOf(c);
              return (
                <div
                  key={c.id}
                  className="grid items-center px-4 py-3 border-b text-xs hover:bg-blue-50/50 transition-colors"
                  style={{
                    gridTemplateColumns: "2fr 130px 1fr 140px 100px 90px",
                    borderColor: "rgba(0,75,154,0.06)",
                    borderLeft: c.urgent ? "3px solid #dc2626" : "3px solid transparent",
                  }}
                >
                  {/* Name */}
                  <button
                    className="flex items-center gap-2.5 text-left"
                    onClick={() => openCustomer(c)}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                      style={{ background: c.avatarBg, fontSize: "11px" }}
                    >
                      {c.avatar}
                    </div>
                    <div>
                      <p className="font-semibold hover:underline cursor-pointer" style={{ color: "#004b9a" }}>
                        {c.name}
                      </p>
                      <p style={{ color: "#9ca3af" }}>{c.cif}</p>
                    </div>
                  </button>

                  {/* Segment */}
                  <span
                    className="px-2 py-1 rounded-full inline-block text-center"
                    style={{ background: c.segColor + "18", color: c.segColor }}
                  >
                    {c.segment}
                  </span>

                  {/* Product */}
                  <span style={{ color: "#374151" }} className="truncate">{c.product}</span>

                  {/* Task */}
                  <span style={{ color: "#6b7a95" }} className="truncate">{c.task}</span>

                  {/* Status */}
                  <span
                    className="px-2 py-1 rounded-full inline-block text-center"
                    style={{ background: st.bg, color: st.color }}
                  >
                    {st.label}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      className="p-1.5 rounded-lg transition-all hover:scale-110"
                      style={{ background: "#e8f0fb", color: "#004b9a" }}
                    >
                      <Phone size={12} />
                    </button>
                    <button
                      className="p-1.5 rounded-lg transition-all hover:scale-110"
                      style={{ background: "#fef3c7", color: "#d97706" }}
                    >
                      <Mail size={12} />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-all">
                      <MoreHorizontal size={12} style={{ color: "#9ca3af" }} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-sm" style={{ color: "#9ca3af" }}>Không tìm thấy khách hàng phù hợp</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((c) => {
            const st = statusOf(c);
            return (
              <div
                key={c.id}
                className="p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}
                onClick={() => openCustomer(c)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: c.avatarBg }}
                  >
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm" style={{ color: "#004b9a" }}>{c.name}</p>
                      <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: c.segColor + "18", color: c.segColor }}>
                        {c.segment}
                      </span>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>{c.cif}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full" style={{ background: st.bg, color: st.color }}>
                    {st.label}
                  </span>
                </div>
                <p className="text-xs mb-1" style={{ color: "#6b7a95" }}>{c.product}</p>
                <p className="text-xs" style={{ color: "#374151" }}>{c.task}</p>
                <div className="flex gap-2 mt-3">
                  <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs transition-all" style={{ background: "#e8f0fb", color: "#004b9a" }}>
                    <Phone size={11} /> Gọi
                  </button>
                  <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs transition-all" style={{ background: "#fef3c7", color: "#d97706" }}>
                    <Mail size={11} /> Email
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
