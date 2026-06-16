import { useState } from "react";
import {
  Target, Plus, ChevronRight, Users, TrendingUp,
  Megaphone, Search, ChevronDown, BarChart2, Brain, AlertTriangle,
  CheckCircle2, TrendingDown, Lightbulb, RefreshCw, ArrowRight, X,
  Calendar, Sparkles, Building2, MapPin, Layers3, ExternalLink,
  Info, LayoutGrid, List, Activity,
} from "lucide-react";
import {
  campaigns, leads, formatVal, campaignSourceColors, type Lead, type Campaign,
} from "../data/leadsData";
import { LeadDetailPanel } from "../components/LeadDetailPanel";
import { CampaignDetailPanel } from "../components/CampaignDetailPanel";

// ── Types & mock data ──────────────────────────────────────────────────────────
type TableLead = {
  id: number;
  name: string;
  phone: string;
  nguon: string;
  sanPham: string;
  trangThai: "Mới" | "Đang tiếp cận" | "Quan tâm" | "Chốt deal";
  rm: string;
  ngayTao: string;
  avatarBg: string;
  avatar: string;
};

const NGUON_CONFIG: Record<string, { color: string; bg: string }> = {
  "Campaign CASA Q2/2025": { color: "#2563eb", bg: "#dbeafe" },
  "Campaign Vay nhà T6": { color: "#2563eb", bg: "#dbeafe" },
  "Campaign Thẻ TD T5": { color: "#2563eb", bg: "#dbeafe" },
  "HO phân bổ": { color: "#7c3aed", bg: "#ede9fe" },
  "Referral": { color: "#16a34a", bg: "#dcfce7" },
  "Social (Facebook)": { color: "#ec4899", bg: "#fce7f3" },
  "Social (Zalo)": { color: "#06b6d4", bg: "#cffafe" },
  "RM tự tạo": { color: "#d97706", bg: "#fef3c7" },
  "OCR (Danh thiếp)": { color: "#6b7280", bg: "#f1f5f9" },
  "Survey/Form": { color: "#4f46e5", bg: "#eef2ff" },
};

const TRANGTHAI_CONFIG: Record<string, { color: string; bg: string }> = {
  "Mới": { color: "#6b7280", bg: "#f1f5f9" },
  "Đang tiếp cận": { color: "#d97706", bg: "#fef3c7" },
  "Quan tâm": { color: "#0891b2", bg: "#e0f2fe" },
  "Chốt deal": { color: "#16a34a", bg: "#dcfce7" },
};

const TABLE_LEADS: TableLead[] = [
  { id: 1, name: "Nguyễn Văn A", phone: "0988 123 456", nguon: "Campaign CASA Q2/2025", sanPham: "CASA, Thẻ tín dụng", trangThai: "Đang tiếp cận", rm: "Nguyễn Văn A", ngayTao: "20/05/2025", avatarBg: "#004b9a", avatar: "NA" },
  { id: 2, name: "Công ty ABC", phone: "0312 345 678", nguon: "HO phân bổ", sanPham: "Vay tín chấp DN", trangThai: "Quan tâm", rm: "Nguyễn Văn A", ngayTao: "20/05/2025", avatarBg: "#7c3aed", avatar: "CA" },
  { id: 3, name: "Trần Thị B", phone: "0901 234 567", nguon: "Referral", sanPham: "Vay mua nhà", trangThai: "Mới", rm: "Nguyễn Văn A", ngayTao: "19/05/2025", avatarBg: "#16a34a", avatar: "TB" },
  { id: 4, name: "Lê Văn C", phone: "0912 345 678", nguon: "Social (Facebook)", sanPham: "Thẻ tín dụng", trangThai: "Đang tiếp cận", rm: "Nguyễn Văn A", ngayTao: "19/05/2025", avatarBg: "#0891b2", avatar: "LC" },
  { id: 5, name: "Công ty XYZ", phone: "0109 876 543", nguon: "RM tự tạo", sanPham: "CASA, Payroll", trangThai: "Quan tâm", rm: "Nguyễn Văn A", ngayTao: "18/05/2025", avatarBg: "#d97706", avatar: "CX" },
  { id: 6, name: "Phạm Thị D", phone: "0933 456 789", nguon: "OCR (Danh thiếp)", sanPham: "Vay mua nhà", trangThai: "Mới", rm: "Nguyễn Văn A", ngayTao: "18/05/2025", avatarBg: "#dc2626", avatar: "PD" },
  { id: 7, name: "Hoàng Minh E", phone: "0977 321 654", nguon: "Survey/Form", sanPham: "Tiết kiệm Online", trangThai: "Mới", rm: "Lê Thị Hoa", ngayTao: "17/05/2025", avatarBg: "#4f46e5", avatar: "HE" },
  { id: 8, name: "Bùi Thị F", phone: "0856 789 012", nguon: "Campaign Vay nhà T6", sanPham: "Vay mua nhà, BHNT", trangThai: "Đang tiếp cận", rm: "Trần Văn Nam", ngayTao: "17/05/2025", avatarBg: "#0284c7", avatar: "BF" },
  { id: 9, name: "Phan Văn G", phone: "0911 222 333", nguon: "Social (Zalo)", sanPham: "Thẻ tín dụng Visa", trangThai: "Quan tâm", rm: "Nguyễn Văn A", ngayTao: "16/05/2025", avatarBg: "#0d9488", avatar: "PG" },
  { id: 10, name: "Trịnh Thị H", phone: "0908 444 555", nguon: "Referral", sanPham: "CASA, Payroll", trangThai: "Chốt deal", rm: "Lê Thị Hoa", ngayTao: "16/05/2025", avatarBg: "#ca8a04", avatar: "TH" },
  { id: 11, name: "Lý Văn I", phone: "0935 666 777", nguon: "HO phân bổ", sanPham: "Vay tín chấp DN", trangThai: "Đang tiếp cận", rm: "Trần Văn Nam", ngayTao: "15/05/2025", avatarBg: "#9333ea", avatar: "LI" },
  { id: 12, name: "Đỗ Thị K", phone: "0971 888 999", nguon: "Campaign Thẻ TD T5", sanPham: "Thẻ tín dụng", trangThai: "Chốt deal", rm: "Nguyễn Văn A", ngayTao: "15/05/2025", avatarBg: "#be123c", avatar: "DK" },
];

const SUMMARY_STATS = [
  { label: "Tổng cơ hội", value: 128, change: "+15% so với tuần trước", color: "#0d1b2a", border: "rgba(0,75,154,0.15)" },
  { label: "Mới (chưa tiếp cận)", value: 45, change: "", color: "#6b7280", border: "rgba(107,114,128,0.2)" },
  { label: "Đang tiếp cận", value: 58, change: "", color: "#d97706", border: "#fde68a" },
  { label: "Quan tâm", value: 18, change: "", color: "#0891b2", border: "#bae6fd" },
  { label: "Chốt deal", value: 7, change: "", color: "#16a34a", border: "#bbf7d0" },
];

const PAGE_SIZE = 6;
const NGUON_OPTIONS = ["Tất cả nguồn", "Campaign", "HO phân bổ", "Referral", "Social", "RM tự tạo", "OCR", "Survey/Form"];
const TRANGTHAI_OPTIONS = ["Tất cả trạng thái", "Mới", "Đang tiếp cận", "Quan tâm", "Chốt deal"];
const SANPHAM_OPTIONS = ["Tất cả sản phẩm", "Vay mua nhà", "Thẻ tín dụng", "CASA", "Tiết kiệm", "Vay tín chấp DN", "Payroll"];

// ── Source badge (shared) ──────────────────────────────────────────────────────
function SourceBadge({ source }: { source: string }) {
  const color = campaignSourceColors[source] ?? "#6b7280";
  const Icon = source === "Khối" ? Building2 : source === "Vùng" ? MapPin : Layers3;
  return (
    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: color + "18", color }}>
      <Icon size={10} /> {source}
    </span>
  );
}

// ── Dropdown filter component ─────────────────────────────────────────────────
function FilterDropdown({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all hover:border-blue-400"
        style={{ background: "#fff", borderColor: "rgba(0,75,154,0.2)", color: "#374151", minWidth: 130 }}
      >
        <span className="flex-1 text-left">{value}</span>
        <ChevronDown size={12} style={{ color: "#9ca3af" }} />
      </button>
      {open && (
        <div
          className="absolute left-0 top-full mt-1 rounded-xl border shadow-lg overflow-hidden z-20"
          style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)", minWidth: 170 }}
          onMouseLeave={() => setOpen(false)}
        >
          {options.map(opt => (
            <button
              key={opt}
              className="w-full text-left px-3.5 py-2 text-xs transition-colors hover:bg-blue-50"
              style={{ color: opt === value ? "#004b9a" : "#374151", fontWeight: opt === value ? 600 : 400 }}
              onClick={() => { onChange(opt); setOpen(false); }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Tab 1: Cơ hội bán hàng (table view) ───────────────────────────────────────
function LeadsTab() {
  const [nguonFilter, setNguonFilter] = useState("Tất cả nguồn");
  const [trangThaiFilter, setTrangThaiFilter] = useState("Tất cả trạng thái");
  const [sanPhamFilter, setSanPhamFilter] = useState("Tất cả sản phẩm");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<TableLead | null>(null);

  const filtered = TABLE_LEADS.filter(l => {
    const matchNguon = nguonFilter === "Tất cả nguồn" || l.nguon.toLowerCase().includes(nguonFilter.toLowerCase().replace("tất cả nguồn", ""));
    const matchStatus = trangThaiFilter === "Tất cả trạng thái" || l.trangThai === trangThaiFilter;
    const matchProduct = sanPhamFilter === "Tất cả sản phẩm" || l.sanPham.toLowerCase().includes(sanPhamFilter.toLowerCase().replace("tất cả sản phẩm", ""));
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.phone.includes(search) || l.sanPham.toLowerCase().includes(search.toLowerCase());
    return matchNguon && matchStatus && matchProduct && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageLeads = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      {/* Summary stats bar */}
      <div className="grid grid-cols-5 gap-3 mb-5">
        {SUMMARY_STATS.map((s, i) => (
          <div
            key={s.label}
            className="p-3.5 rounded-xl border"
            style={{ background: i === 0 ? "#fff" : (TRANGTHAI_CONFIG[s.label.replace(" (chưa tiếp cận)", "")] || TRANGTHAI_CONFIG["Mới"]).bg + "60", borderColor: s.border }}
          >
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs mt-0.5" style={{ color: "#6b7a95" }}>{s.label}</p>
            {s.change && <p className="text-xs mt-1 font-medium" style={{ color: "#16a34a" }}>{s.change}</p>}
          </div>
        ))}
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <FilterDropdown value={nguonFilter} options={NGUON_OPTIONS} onChange={(v) => { setNguonFilter(v); setPage(1); }} />
        <FilterDropdown value={trangThaiFilter} options={TRANGTHAI_OPTIONS} onChange={(v) => { setTrangThaiFilter(v); setPage(1); }} />
        <FilterDropdown value={sanPhamFilter} options={SANPHAM_OPTIONS} onChange={(v) => { setSanPhamFilter(v); setPage(1); }} />

        {/* Search */}
        <div className="flex-1 relative" style={{ minWidth: 220 }}>
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9ca3af" }} />
          <input
            type="text"
            placeholder="Tìm kiếm khách hàng, SĐT, email..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg text-xs border outline-none"
            style={{ borderColor: "rgba(0,75,154,0.2)", background: "#fff", color: "#0d1b2a" }}
          />
        </div>

        <button
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90 flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #002d6e 0%, #004b9a 100%)", color: "#fff" }}
        >
          <Plus size={13} /> Thêm cơ hội
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border overflow-hidden" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
        {/* Header */}
        <div
          className="grid text-xs font-semibold px-4 py-3"
          style={{
            background: "#f8fafc",
            borderBottom: "1px solid rgba(0,75,154,0.08)",
            color: "#6b7a95",
            gridTemplateColumns: "2fr 1.6fr 1.5fr 1.2fr 1.3fr 1fr 32px",
            gap: "12px",
          }}
        >
          <span>KHÁCH HÀNG</span>
          <span>NGUỒN</span>
          <span>SẢN PHẨM QUAN TẦM</span>
          <span>TRẠNG THÁI</span>
          <span>RM PHỤ TRÁCH</span>
          <span>NGÀY TẠO</span>
          <span />
        </div>

        {/* Rows */}
        <div className="divide-y" style={{ borderColor: "rgba(0,75,154,0.06)" }}>
          {pageLeads.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm" style={{ color: "#9ca3af" }}>Không có cơ hội phù hợp với bộ lọc</p>
            </div>
          ) : pageLeads.map(l => {
            const nguonCfg = NGUON_CONFIG[l.nguon] ?? { color: "#6b7280", bg: "#f1f5f9" };
            const statusCfg = TRANGTHAI_CONFIG[l.trangThai];
            return (
              <div
                key={l.id}
                className="grid items-center px-4 py-3 cursor-pointer hover:bg-blue-50/40 transition-colors"
                style={{ gridTemplateColumns: "2fr 1.6fr 1.5fr 1.2fr 1.3fr 1fr 32px", gap: "12px" }}
                onClick={() => setSelectedRow(l)}
              >
                {/* Khách hàng */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ background: l.avatarBg, fontSize: 11 }}
                  >
                    {l.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: "#0d1b2a" }}>{l.name}</p>
                    <p className="text-xs" style={{ color: "#9ca3af" }}>{l.phone}</p>
                  </div>
                </div>

                {/* Nguồn */}
                <div>
                  <span
                    className="inline-flex items-center text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: nguonCfg.bg, color: nguonCfg.color, maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                  >
                    {l.nguon}
                  </span>
                </div>

                {/* Sản phẩm */}
                <p className="text-xs truncate" style={{ color: "#374151" }}>{l.sanPham}</p>

                {/* Trạng thái */}
                <span
                  className="inline-block text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: statusCfg.bg, color: statusCfg.color }}
                >
                  {l.trangThai}
                </span>

                {/* RM */}
                <p className="text-xs truncate" style={{ color: "#374151" }}>{l.rm}</p>

                {/* Ngày tạo */}
                <p className="text-xs" style={{ color: "#9ca3af" }}>{l.ngayTao}</p>

                <ChevronRight size={14} style={{ color: "#d1d5db" }} />
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div
          className="flex items-center justify-between px-4 py-3 border-t"
          style={{ borderColor: "rgba(0,75,154,0.06)", background: "#fafbfd" }}
        >
          <p className="text-xs" style={{ color: "#9ca3af" }}>
            Hiển thị {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} trong {filtered.length} (tổng 128)
          </p>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className="w-7 h-7 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: page === p ? "#004b9a" : "transparent",
                  color: page === p ? "#fff" : "#6b7a95",
                }}
              >
                {p}
              </button>
            ))}
            {totalPages < 22 && (
              <>
                <span className="text-xs" style={{ color: "#9ca3af" }}>...</span>
                <button className="w-7 h-7 rounded-lg text-xs" style={{ color: "#6b7a95" }}>22</button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Detail slide-out – maps to a real lead for rich panel */}
      {selectedRow && (() => {
        const realLead = leads.find(l => l.name.toLowerCase().includes(selectedRow.name.split(" ").pop()?.toLowerCase() ?? "")) ?? leads[0];
        return (
          <LeadDetailPanel
            key={selectedRow.id}
            lead={{ ...realLead, name: selectedRow.name, phone: selectedRow.phone, product: selectedRow.sanPham }}
            onClose={() => setSelectedRow(null)}
          />
        );
      })()}
    </div>
  );
}

// ── Tab 2: Chiến dịch ─────────────────────────────────────────────────────────
const STATUS_ORDER: Record<string, number> = { "Đang chạy": 0, "Chuẩn bị": 1, "Kết thúc": 2 };

const AI_INSIGHTS = [
  {
    id: 1, icon: AlertTriangle, iconColor: "#d97706", bg: "#fef3c7", border: "#fde68a",
    badge: "Cần xử lý", badgeBg: "#d97706",
    title: "Tỉ lệ convert thấp hơn benchmark",
    body: "CD \"Tiết kiệm Online\" có % Convert 12.7%, thấp hơn benchmark 15%. AI phát hiện 41 leads chưa được tiếp cận lần 2 – nhóm có xác suất đồng ý cao nhất.",
    action: "Phân bổ lại leads", actionColor: "#d97706",
  },
  {
    id: 2, icon: TrendingDown, iconColor: "#0891b2", bg: "#e0f2fe", border: "#bae6fd",
    badge: "Dự báo", badgeBg: "#0891b2",
    title: "Dự báo CD Vay nhà đến 30/06",
    body: "Nếu giữ tốc độ hiện tại, CD \"Vay nhà T6\" dự kiến đạt 14–16% convert – dưới mục tiêu 20%. Cần tăng cường ~50 leads ưu tiên AI Score ≥80.",
    action: "Xem leads phù hợp", actionColor: "#0891b2",
  },
  {
    id: 3, icon: CheckCircle2, iconColor: "#16a34a", bg: "#dcfce7", border: "#bbf7d0",
    badge: "Cơ hội", badgeBg: "#16a34a",
    title: "Nhân rộng strategy từ CD thẻ T5",
    body: "CD \"Cross-sell thẻ T5\" đạt 21.4% convert – cao nhất hệ thống. Tỉ lệ thành công tăng 2.3× khi RM tiếp cận qua Zalo + gọi trong 48h sau SMS.",
    action: "Tạo CD từ template", actionColor: "#16a34a",
  },
  {
    id: 4, icon: Lightbulb, iconColor: "#7c3aed", bg: "#ede9fe", border: "#ddd6fe",
    badge: "Gợi ý", badgeBg: "#7c3aed",
    title: "CD Tái gửi Q2 – cần bổ sung leads",
    body: "CD mới chỉ phân bổ 120/500 KH mục tiêu (24%). AI xác định 3 vùng đang dư leads có thể chuyển 200 KH KHHH phù hợp tiêu chí Diamond/Platinum.",
    action: "Phân bổ ngay", actionColor: "#7c3aed",
  },
];

// ── AI Insights floating button + popup ───────────────────────────────────────
function AiInsightsFloat() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState<number[]>([]);
  const visible = AI_INSIGHTS.filter(i => !dismissed.includes(i.id));

  return (
    <>
      {/* Floating button – fixed top-right inside main area */}
      <div className="fixed z-40" style={{ top: 64, right: 20 }}>
        <button
          onClick={() => setOpen(v => !v)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl shadow-lg transition-all hover:opacity-90 active:scale-95"
          style={{ background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)", color: "#fff" }}
        >
          <Brain size={15} />
          <span className="text-xs font-semibold">AI Phân tích</span>
          {visible.length > 0 && (
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "#fff", color: "#7c3aed", fontSize: 10 }}
            >
              {visible.length}
            </span>
          )}
        </button>

        {/* Popup panel */}
        {open && (
          <div
            className="absolute right-0 mt-2 rounded-2xl shadow-2xl overflow-hidden"
            style={{ width: 360, maxHeight: "calc(100vh - 140px)", border: "1px solid rgba(124,58,237,0.25)", background: "#fff" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
                  <Brain size={13} style={{ color: "#fff" }} />
                </div>
                <span className="text-xs font-semibold text-white">AI Phân tích & Đề xuất</span>
                <span className="text-xs text-white/50">· Cập nhật 14:30</span>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-white/20 transition-colors">
                <X size={13} style={{ color: "rgba(255,255,255,0.8)" }} />
              </button>
            </div>

            {/* Content – scrollable */}
            <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
              {visible.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <CheckCircle2 size={22} style={{ color: "#16a34a", marginBottom: 8 }} />
                  <p className="text-xs" style={{ color: "#6b7a95" }}>Tất cả insights đã được xử lý</p>
                </div>
              ) : (
                <div className="p-3 space-y-2.5">
                  {visible.map(insight => {
                    const Icon = insight.icon;
                    return (
                      <div key={insight.id} className="rounded-xl p-3 border" style={{ background: insight.bg, borderColor: insight.border }}>
                        <div className="flex items-start gap-2.5">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: insight.iconColor + "20" }}>
                            <Icon size={13} style={{ color: insight.iconColor }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                              <span className="text-xs px-1.5 py-0.5 rounded font-semibold" style={{ background: insight.badgeBg, color: "#fff", fontSize: 10 }}>{insight.badge}</span>
                              <span className="text-xs font-semibold" style={{ color: "#0d1b2a" }}>{insight.title}</span>
                            </div>
                            <p className="text-xs leading-relaxed mb-2" style={{ color: "#374151" }}>{insight.body}</p>
                            <div className="flex gap-1.5">
                              <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium" style={{ background: insight.actionColor, color: "#fff" }}>
                                <ArrowRight size={9} /> {insight.action}
                              </button>
                              <button onClick={() => setDismissed(d => [...d, insight.id])} className="px-2.5 py-1.5 rounded-lg text-xs" style={{ color: "#9ca3af" }}>Bỏ qua</button>
                            </div>
                          </div>
                          <button onClick={() => setDismissed(d => [...d, insight.id])} className="p-0.5 rounded hover:bg-black/10 flex-shrink-0">
                            <X size={11} style={{ color: "#9ca3af" }} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {dismissed.length > 0 && (
                <div className="px-3 pb-3">
                  <button onClick={() => setDismissed([])} className="flex items-center gap-1.5 text-xs w-full justify-center py-2 rounded-lg hover:bg-purple-50 transition-colors" style={{ color: "#7c3aed" }}>
                    <RefreshCw size={10} /> Khôi phục {dismissed.length} insight đã ẩn
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Backdrop to close popup when clicking outside */}
      {open && (
        <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
      )}
    </>
  );
}

function CampaignsTab() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [sourceFilter, setSourceFilter] = useState("Tất cả");
  const [dashCollapsed, setDashCollapsed] = useState(false);
  const [campaignView, setCampaignView] = useState<"list" | "byCampaign">("list");

  const runningCount = campaigns.filter(c => c.status === "Đang chạy").length;
  const totalAllocated = campaigns.reduce((a, c) => a + c.leads, 0);
  const avgContact = runningCount > 0 ? Math.round(campaigns.filter(c => c.status === "Đang chạy").reduce((a, c) => a + c.kpiResult.contactRate, 0) / runningCount) : 0;
  const avgConvert = runningCount > 0 ? (campaigns.filter(c => c.status === "Đang chạy").reduce((a, c) => a + c.kpiResult.convertRate, 0) / runningCount).toFixed(1) : "0";
  const filteredCampaigns = [...campaigns].filter(c => sourceFilter === "Tất cả" || c.source === sourceFilter).sort((a, b) => (STATUS_ORDER[a.status] ?? 9) - (STATUS_ORDER[b.status] ?? 9));

  return (
    <div>
      {/* AI Insights floating button */}
      <AiInsightsFloat />

      {/* Campaign summary cards */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[
          { label: "Tổng chiến dịch", value: campaigns.length, icon: Megaphone, color: "#004b9a", bg: "#e8f0fb" },
          { label: "Đang chạy", value: runningCount, icon: TrendingUp, color: "#16a34a", bg: "#dcfce7" },
          { label: "Tổng được phân bổ", value: totalAllocated, icon: Users, color: "#7c3aed", bg: "#ede9fe" },
          { label: "Tổng chốt thành công", value: campaigns.reduce((a, c) => a + c.converted, 0), icon: Target, color: "#d97706", bg: "#fef3c7" },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="p-3 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: s.bg }}>
                <Icon size={15} style={{ color: s.color }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs" style={{ color: "#6b7a95" }}>{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* KPI dashboard summary */}
      <div className="rounded-xl border mb-4 overflow-hidden" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
        <div
          className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-blue-50/30 transition-colors"
          style={{ background: "#f8fafc", borderBottom: dashCollapsed ? "none" : "1px solid rgba(0,75,154,0.08)" }}
          onClick={() => setDashCollapsed(v => !v)}
        >
          <div className="flex items-center gap-2">
            <BarChart2 size={15} style={{ color: "#004b9a" }} />
            <span className="text-sm font-semibold" style={{ color: "#0d1b2a" }}>Tổng quan kết quả chiến dịch</span>
          </div>
          <ChevronDown size={14} style={{ color: "#9ca3af", transform: dashCollapsed ? "rotate(0)" : "rotate(180deg)", transition: "transform 0.2s" }} />
        </div>
        {!dashCollapsed && (
          <div className="p-4">
            <div className="grid grid-cols-4 gap-2 mb-3">
              {[
                { label: "Đang chạy", value: runningCount, color: "#16a34a", bg: "#dcfce7" },
                { label: "Tổng leads phân bổ", value: totalAllocated, color: "#004b9a", bg: "#e8f0fb" },
                { label: "Avg % Tiếp cận", value: `${avgContact}%`, color: "#7c3aed", bg: "#ede9fe" },
                { label: "Avg % Convert", value: `${avgConvert}%`, color: "#d97706", bg: "#fef3c7" },
              ].map(k => (
                <div key={k.label} className="p-2.5 rounded-xl border" style={{ borderColor: "rgba(0,75,154,0.08)", background: k.bg + "60" }}>
                  <p className="text-lg font-bold" style={{ color: k.color }}>{k.value}</p>
                  <p className="text-xs" style={{ color: "#6b7a95" }}>{k.label}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {filteredCampaigns.map(c => (
                <div key={c.id} className="flex items-center gap-2 p-2.5 rounded-xl border" style={{ background: c.status === "Đang chạy" ? "#f0fdf4" : "#f8fafc", borderColor: c.status === "Đang chạy" ? "rgba(22,163,74,0.15)" : "rgba(0,75,154,0.07)" }}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.statusColor }} />
                  <span className="text-xs flex-1 font-medium" style={{ color: "#0d1b2a" }}>{c.name}</span>
                  <SourceBadge source={c.source} />
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: c.statusColor + "18", color: c.statusColor }}>{c.status}</span>
                  <div className="flex items-center gap-1.5 flex-shrink-0" style={{ minWidth: 110 }}>
                    <div className="h-1.5 rounded-full" style={{ background: "#e5e7eb", width: 56 }}>
                      <div className="h-full rounded-full" style={{ width: `${Math.min(c.kpiResult.contactRate, 100)}%`, background: "#7c3aed" }} />
                    </div>
                    <span className="text-xs" style={{ color: "#7c3aed" }}>{c.kpiResult.contactRate.toFixed(0)}%</span>
                  </div>
                  <span className="text-xs font-bold flex-shrink-0" style={{ color: c.kpiResult.convertRate > 15 ? "#16a34a" : c.kpiResult.convertRate > 0 ? "#d97706" : "#9ca3af" }}>
                    {c.kpiResult.convertRate > 0 ? `${c.kpiResult.convertRate}% CV` : "–"}
                  </span>
                  <button onClick={() => setSelectedCampaign(c)} className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium flex-shrink-0" style={{ background: "#004b9a", color: "#fff" }}>
                    <ExternalLink size={10} /> Chi tiết
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* View toggle + source filter */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <div className="flex gap-1.5">
          {[{ k: "list", label: "Danh sách", icon: LayoutGrid }, { k: "byCampaign", label: "Theo leads", icon: List }].map(({ k, label, icon: Icon }) => (
            <button key={k} onClick={() => setCampaignView(k as "list" | "byCampaign")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
              style={{ background: campaignView === k ? "#004b9a" : "#fff", color: campaignView === k ? "#fff" : "#6b7a95", border: `1.5px solid ${campaignView === k ? "#004b9a" : "rgba(0,75,154,0.1)"}` }}>
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5">
          {["Tất cả", "Khối", "Vùng", "3D"].map(src => {
            const color = src === "Tất cả" ? "#6b7280" : campaignSourceColors[src];
            return (
              <button key={src} onClick={() => setSourceFilter(src)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ background: sourceFilter === src ? color : "#fff", color: sourceFilter === src ? "#fff" : color, border: `1px solid ${sourceFilter === src ? "transparent" : color + "40"}` }}>
                {src}{src !== "Tất cả" && ` (${campaigns.filter(c => c.source === src).length})`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Campaign cards */}
      {campaignView === "list" && (
        <div className="space-y-3">
          {filteredCampaigns.map(c => (
            <div key={c.id} onClick={() => setSelectedCampaign(c)} className="p-4 rounded-xl border cursor-pointer hover:shadow-sm transition-all" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#e8f0fb" }}>
                  <Megaphone size={18} style={{ color: "#004b9a" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-sm" style={{ color: "#0d1b2a" }}>{c.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: c.statusColor + "15", color: c.statusColor }}>{c.status}</span>
                    <SourceBadge source={c.source} />
                  </div>
                  <div className="flex items-center gap-3 text-xs" style={{ color: "#9ca3af" }}>
                    <span>{c.type}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Calendar size={10} /> {c.start} – {c.end}</span>
                  </div>
                  {/* KPI strip */}
                  <div className="flex gap-2 mt-2.5 flex-wrap">
                    {[
                      { label: "Phân bổ", value: c.leads.toString(), color: "#004b9a" },
                      { label: "% Tiếp cận", value: `${c.kpiResult.contactRate.toFixed(1)}%`, color: c.kpiResult.contactRate >= 80 ? "#16a34a" : "#d97706" },
                      { label: "% Convert", value: `${c.kpiResult.convertRate.toFixed(1)}%`, color: c.kpiResult.convertRate >= 15 ? "#16a34a" : c.kpiResult.convertRate > 0 ? "#d97706" : "#9ca3af" },
                      { label: "Dư nợ TN", value: formatVal(c.kpiResult.netLoanGrowth), color: "#004b9a" },
                      { label: "CASA TN", value: formatVal(c.kpiResult.netCasaGrowth), color: "#0891b2" },
                    ].map(k => (
                      <div key={k.label} className="text-center px-2.5 py-1.5 rounded-lg flex-shrink-0" style={{ background: "#f8fafc", minWidth: 68 }}>
                        <p className="text-xs font-bold" style={{ color: k.color }}>{k.value || "–"}</p>
                        <p style={{ color: "#9ca3af", fontSize: 10 }}>{k.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: "#d1d5db", flexShrink: 0 }} />
              </div>
              {c.status === "Đang chạy" && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs mb-1" style={{ color: "#9ca3af" }}>
                    <span>Tiến độ</span>
                    <span>Còn {c.daysLeft} ngày</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "#f1f5f9" }}>
                    <div className="h-full rounded-full" style={{ width: `${c.progressPct}%`, background: "#004b9a" }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {campaignView === "byCampaign" && (
        <div className="space-y-4">
          {campaigns.map(c => {
            const cLeads = leads.filter(l => l.campaignId === c.id);
            if (cLeads.length === 0) return null;
            return (
              <div key={c.id} className="rounded-xl border overflow-hidden" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
                <div className="flex items-center gap-3 px-4 py-3 border-b cursor-pointer hover:bg-blue-50/40" style={{ borderColor: "rgba(0,75,154,0.08)", background: "#f8fafc" }} onClick={() => setSelectedCampaign(c)}>
                  <Megaphone size={14} style={{ color: "#004b9a" }} />
                  <span className="text-sm font-semibold flex-1" style={{ color: "#0d1b2a" }}>{c.name}</span>
                  <SourceBadge source={c.source} />
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: c.statusColor + "15", color: c.statusColor }}>{c.status}</span>
                  <span className="text-xs" style={{ color: "#9ca3af" }}>{cLeads.length} lead</span>
                  <ChevronRight size={14} style={{ color: "#9ca3af" }} />
                </div>
                <div className="divide-y" style={{ borderColor: "rgba(0,75,154,0.06)" }}>
                  {cLeads.slice(0, 3).map(l => (
                    <div key={l.id} onClick={() => setSelectedLead(l)} className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-blue-50/50 transition-colors">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ background: l.avatarBg, fontSize: 11 }}>{l.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate" style={{ color: "#0d1b2a" }}>{l.name}</p>
                        <p className="text-xs truncate" style={{ color: "#6b7a95" }}>{l.product}</p>
                      </div>
                      <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: l.aiScore >= 85 ? "#16a34a15" : "#d9770615", color: l.aiScore >= 85 ? "#16a34a" : "#d97706" }}>
                        <Sparkles size={10} /> AI {l.aiScore}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: "#f1f5f9", color: "#6b7a95" }}>{l.stage}</span>
                      <ChevronRight size={14} style={{ color: "#d1d5db" }} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <CampaignDetailPanel campaign={selectedCampaign} onClose={() => setSelectedCampaign(null)} onSelectLead={id => { setSelectedCampaign(null); setSelectedLead(leads.find(l => l.id === id) ?? null); }} />
      <LeadDetailPanel key={selectedLead?.id ?? "none"} lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  );
}

// ── Tab 3: Dashboard hiệu quả ─────────────────────────────────────────────────
const SOURCE_DONUT = [
  { label: "Campaign", pct: 45, color: "#2563eb" },
  { label: "RM tự tạo", pct: 25, color: "#d97706" },
  { label: "Referral", pct: 15, color: "#16a34a" },
  { label: "Social", pct: 10, color: "#ec4899" },
  { label: "OCR", pct: 5, color: "#6b7280" },
];

const GROWTH_DATA = [8.2, 9.1, 10.5, 11.2, 12.8, 14.1, 15.3, 16.8, 18.2, 22.5, 28.1, 32.6];
const MONTHS = ["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12"];

function DonutChart() {
  const cx = 70, cy = 70, r = 44;
  const circ = 2 * Math.PI * r;
  let cumulativeAngle = -90;
  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      {SOURCE_DONUT.map((d, i) => {
        const startAngle = cumulativeAngle;
        const sliceAngle = (d.pct / 100) * 360;
        cumulativeAngle += sliceAngle;
        const dash = (d.pct / 100) * circ;
        return (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={d.color}
            strokeWidth="22"
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeDashoffset={0}
            transform={`rotate(${startAngle}, ${cx}, ${cy})`}
          />
        );
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize="14" fontWeight="700" fill="#0d1b2a">2,340</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fill="#9ca3af">leads mới</text>
    </svg>
  );
}

function LineChart() {
  const W = 280, H = 90;
  const minV = 0, maxV = 36;
  const pts = GROWTH_DATA.map((v, i) => {
    const x = 10 + (i / (GROWTH_DATA.length - 1)) * (W - 20);
    const y = H - 8 - ((v - minV) / (maxV - minV)) * (H - 16);
    return { x, y, v };
  });
  const polyline = pts.map(p => `${p.x},${p.y}`).join(" ");
  const area = `M ${pts[0].x},${H} ` + pts.map(p => `L ${p.x},${p.y}`).join(" ") + ` L ${pts[pts.length-1].x},${H} Z`;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H + 10}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
        const y = 8 + t * (H - 16);
        return <line key={i} x1="10" y1={y} x2={W - 10} y2={y} stroke="rgba(0,75,154,0.06)" strokeWidth="1" />;
      })}
      {/* Area */}
      <path d={area} fill="url(#areaGrad)" />
      {/* Line */}
      <polyline points={polyline} fill="none" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {/* Last point dot */}
      <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="4" fill="#2563eb" />
      <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="7" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeOpacity="0.3" />
    </svg>
  );
}

function DashboardTab() {
  const [subTab, setSubTab] = useState<"overview" | "rm" | "campaign" | "growth">("overview");
  const [dateRange] = useState("01/05/2025 - 31/05/2025");

  const SUB_TABS = [
    { key: "overview", label: "Tổng quan" },
    { key: "rm", label: "Hiệu quả RM" },
    { key: "campaign", label: "Hiệu quả Chiến dịch" },
    { key: "growth", label: "Tăng trưởng" },
  ];

  const KPI_CARDS = [
    { label: "Lead tạo mới", value: "2,340", change: "+18%", up: true, color: "#004b9a" },
    { label: "Tỉ lệ chuyển đổi", value: "12.5%", change: "+2.3%", up: true, color: "#0891b2" },
    { label: "Deal thành công", value: "210", change: "+15%", up: true, color: "#16a34a" },
    { label: "Doanh số (tỷ)", value: "32.6", change: "+20%", up: true, color: "#d97706" },
  ];

  return (
    <div>
      {/* Sub-tabs + date filter */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1.5">
          {SUB_TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setSubTab(t.key as typeof subTab)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all"
              style={{ background: subTab === t.key ? "#004b9a" : "#fff", color: subTab === t.key ? "#fff" : "#6b7a95", border: `1.5px solid ${subTab === t.key ? "#004b9a" : "rgba(0,75,154,0.1)"}` }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border" style={{ borderColor: "rgba(0,75,154,0.2)", color: "#374151" }}>
            Tháng này <ChevronDown size={11} style={{ color: "#9ca3af" }} />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border" style={{ borderColor: "rgba(0,75,154,0.2)", color: "#374151" }}>
            {dateRange} <ChevronDown size={11} style={{ color: "#9ca3af" }} />
          </button>
        </div>
      </div>

      {subTab === "overview" && (
        <>
          {/* KPI cards */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {KPI_CARDS.map(k => (
              <div key={k.label} className="p-4 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
                <p className="text-xs mb-2" style={{ color: "#6b7a95" }}>{k.label}</p>
                <p className="text-2xl font-bold" style={{ color: k.color }}>{k.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp size={11} style={{ color: "#16a34a" }} />
                  <span className="text-xs font-medium" style={{ color: "#16a34a" }}>{k.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Donut: Lead theo nguồn */}
            <div className="p-4 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
              <p className="text-xs font-semibold mb-4" style={{ color: "#0d1b2a" }}>LEAD THEO NGUỒN</p>
              <div className="flex items-center gap-5">
                <DonutChart />
                <div className="space-y-2.5">
                  {SOURCE_DONUT.map(s => (
                    <div key={s.label} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                      <span className="text-xs flex-1" style={{ color: "#374151" }}>{s.label}</span>
                      <span className="text-xs font-semibold" style={{ color: s.color }}>{s.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Line chart: Tăng trưởng doanh số */}
            <div className="p-4 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-semibold" style={{ color: "#0d1b2a" }}>TĂNG TRƯỞNG DOANH SỐ (TỶ)</p>
                <span className="text-xs font-bold" style={{ color: "#2563eb" }}>32.6</span>
              </div>
              <div style={{ height: 100, position: "relative" }}>
                <LineChart />
              </div>
              <div className="flex justify-between mt-1">
                {MONTHS.map(m => (
                  <span key={m} className="text-center" style={{ color: "#9ca3af", fontSize: 9, width: `${100/12}%` }}>{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Breakdown by campaign */}
          <div className="mt-4 p-4 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
            <p className="text-xs font-semibold mb-3" style={{ color: "#0d1b2a" }}>HIỆU QUẢ THEO CHIẾN DỊCH</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(0,75,154,0.08)" }}>
                    {["Tên chiến dịch", "Thời gian", "Mục tiêu", "Lead tạo ra", "Deal", "Hiệu quả"].map(h => (
                      <th key={h} className="pb-2 text-left font-semibold" style={{ color: "#6b7a95", paddingRight: 16 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "rgba(0,75,154,0.06)" }}>
                  {[
                    { name: "CASA Q2/2025", time: "01/04 - 30/06/2025", target: "100 tỷ", leads: 1250, deals: 85, pct: 68 },
                    { name: "Vay mua nhà Summer", time: "01/05 - 31/07/2025", target: "150 tỷ", leads: 980, deals: 62, pct: 72 },
                    { name: "Thẻ tín dụng Visa", time: "15/04 - 15/07/2025", target: "80 tỷ", leads: 1100, deals: 74, pct: 67 },
                    { name: "SME Trade Finance", time: "01/03 - 30/06/2025", target: "200 tỷ", leads: 620, deals: 41, pct: 58 },
                    { name: "Bảo hiểm An tâm", time: "01/04 - 30/06/2025", target: "50 tỷ", leads: 870, deals: 52, pct: 60 },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="py-2.5 font-medium" style={{ color: "#0d1b2a", paddingRight: 16 }}>{row.name}</td>
                      <td className="py-2.5" style={{ color: "#6b7a95", paddingRight: 16 }}>{row.time}</td>
                      <td className="py-2.5" style={{ color: "#6b7a95", paddingRight: 16 }}>{row.target}</td>
                      <td className="py-2.5 font-medium" style={{ color: "#004b9a", paddingRight: 16 }}>{row.leads.toLocaleString("vi-VN")}</td>
                      <td className="py-2.5 font-medium" style={{ color: "#16a34a", paddingRight: 16 }}>{row.deals}</td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 rounded-full" style={{ background: "#e5e7eb", width: 56 }}>
                            <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: row.pct >= 70 ? "#16a34a" : "#d97706" }} />
                          </div>
                          <span className="font-semibold" style={{ color: row.pct >= 70 ? "#16a34a" : "#d97706" }}>{row.pct}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {(subTab === "rm" || subTab === "campaign" || subTab === "growth") && (
        <div className="flex flex-col items-center justify-center py-20 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
          <Activity size={32} style={{ color: "#d1d5db", marginBottom: 12 }} />
          <p className="text-sm font-medium" style={{ color: "#9ca3af" }}>
            {subTab === "rm" ? "Hiệu quả RM" : subTab === "campaign" ? "Hiệu quả Chiến dịch" : "Tăng trưởng"}
          </p>
          <p className="text-xs mt-1" style={{ color: "#d1d5db" }}>Dữ liệu đang được cập nhật</p>
        </div>
      )}
    </div>
  );
}

// ── Main CoHoiBanHangPage ──────────────────────────────────────────────────────
export function CoHoiBanHangPage() {
  const [activeTab, setActiveTab] = useState<"leads" | "campaigns" | "dashboard">("leads");

  const TABS = [
    { key: "leads", label: "Cơ hội bán hàng", icon: Target },
    { key: "campaigns", label: "Chiến dịch", icon: Megaphone },
    { key: "dashboard", label: "Dashboard hiệu quả", icon: BarChart2 },
  ];

  return (
    <div className="p-5 pb-16">
      {/* Page header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold" style={{ color: "#0d1b2a" }}>Cơ hội bán hàng</h1>
          <Info size={15} style={{ color: "#9ca3af" }} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-lg" style={{ background: "#e8f0fb", color: "#004b9a" }}>RM · CN Hà Nội</span>
        </div>
      </div>

      {/* 3 Main tabs */}
      <div className="flex gap-2 mb-5 border-b pb-0" style={{ borderColor: "rgba(0,75,154,0.1)" }}>
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as typeof activeTab)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all relative"
            style={{ color: activeTab === key ? "#004b9a" : "#9ca3af" }}
          >
            <Icon size={15} />
            {label}
            {activeTab === key && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: "#004b9a" }} />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "leads" && <LeadsTab />}
      {activeTab === "campaigns" && <CampaignsTab />}
      {activeTab === "dashboard" && <DashboardTab />}

    </div>
  );
}
