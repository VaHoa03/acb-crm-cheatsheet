import { useState, useEffect } from "react";
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

// ── "Thêm cơ hội" modal form ───────────────────────────────────────────────────
const SANPHAM_MODAL = ["Vay mua nhà", "Thẻ tín dụng", "CASA", "Tiết kiệm Online", "Vay tín chấp DN", "Payroll", "Bảo hiểm nhân thọ", "SME Trade Finance"];
const RM_LIST = ["Nguyễn Văn A", "Lê Thị Hoa", "Trần Văn Nam", "Phạm Thị Thu", "Hoàng Minh Khoa"];

function ThemCoHoiModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    tenKH: "", sdt: "", email: "", nguon: "RM tự tạo",
    sanPham: "Thẻ tín dụng", trangThai: "Mới", rm: "Nguyễn Văn A", ghiChu: "",
  });
  const [saved, setSaved] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  if (saved) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(3px)" }}>
        <div className="rounded-2xl p-8 flex flex-col items-center" style={{ background: "#fff", width: "min(400px,95vw)" }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "#dcfce7" }}>
            <CheckCircle2 size={32} style={{ color: "#16a34a" }} />
          </div>
          <p className="text-base font-bold mb-1" style={{ color: "#0d1b2a" }}>Tạo cơ hội thành công!</p>
          <p className="text-sm text-center mb-4" style={{ color: "#6b7a95" }}>
            <span className="font-semibold">{form.tenKH || "Khách hàng mới"}</span> đã được thêm vào danh sách cơ hội bán hàng.
          </p>
          <div className="w-full p-3 rounded-xl mb-4" style={{ background: "#f0f9ff", border: "1px solid #bae6fd" }}>
            <p className="text-xs" style={{ color: "#0891b2" }}>
              <Sparkles size={11} style={{ display: "inline", marginRight: 4 }} />
              AI gợi ý: Liên hệ trong 24h đầu tăng 3× tỉ lệ chuyển đổi với sản phẩm <strong>{form.sanPham}</strong>.
            </p>
          </div>
          <button onClick={onClose} className="w-full py-2.5 rounded-xl text-sm font-semibold hover:opacity-90" style={{ background: "#004b9a", color: "#fff" }}>
            Đóng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(3px)" }} onClick={onClose}>
      <div className="rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ background: "#fff", width: "min(520px,95vw)", maxHeight: "95vh" }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="px-6 py-4 flex-shrink-0" style={{ background: "linear-gradient(135deg, #001a4d 0%, #004b9a 100%)" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.18)" }}>
                <Plus size={16} style={{ color: "#fff" }} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Thêm cơ hội bán hàng</p>
                <p className="text-xs text-white/60">Điền thông tin để tạo cơ hội mới</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/20" style={{ color: "#fff" }}><X size={15} /></button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* AI gợi ý banner */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl" style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
            <Sparkles size={13} style={{ color: "#d97706", flexShrink: 0, marginTop: 1 }} />
            <p className="text-xs" style={{ color: "#92400e" }}>
              AI nhận diện: Nguồn <strong>RM tự tạo</strong> + sản phẩm <strong>Thẻ tín dụng</strong> có tỉ lệ convert trung bình <strong>18.4%</strong> trong tháng 5/2025.
            </p>
          </div>

          {/* Row 1: Tên KH + SĐT */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#374151" }}>Tên khách hàng <span style={{ color: "#dc2626" }}>*</span></label>
              <input value={form.tenKH} onChange={e => set("tenKH", e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full px-3 py-2 rounded-xl text-sm border outline-none focus:border-blue-500 transition-colors"
                style={{ borderColor: "rgba(0,75,154,0.2)", background: "#f9fbff" }} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#374151" }}>Số điện thoại <span style={{ color: "#dc2626" }}>*</span></label>
              <input value={form.sdt} onChange={e => set("sdt", e.target.value)}
                placeholder="0988 xxx xxx"
                className="w-full px-3 py-2 rounded-xl text-sm border outline-none focus:border-blue-500 transition-colors"
                style={{ borderColor: "rgba(0,75,154,0.2)", background: "#f9fbff" }} />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "#374151" }}>Email</label>
            <input value={form.email} onChange={e => set("email", e.target.value)}
              placeholder="email@example.com"
              className="w-full px-3 py-2 rounded-xl text-sm border outline-none focus:border-blue-500 transition-colors"
              style={{ borderColor: "rgba(0,75,154,0.2)", background: "#f9fbff" }} />
          </div>

          {/* Row: Nguồn + Sản phẩm */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#374151" }}>Nguồn <span style={{ color: "#dc2626" }}>*</span></label>
              <select value={form.nguon} onChange={e => set("nguon", e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-sm border outline-none focus:border-blue-500"
                style={{ borderColor: "rgba(0,75,154,0.2)", background: "#f9fbff" }}>
                {Object.keys(NGUON_CONFIG).map(n => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#374151" }}>Sản phẩm quan tâm <span style={{ color: "#dc2626" }}>*</span></label>
              <select value={form.sanPham} onChange={e => set("sanPham", e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-sm border outline-none focus:border-blue-500"
                style={{ borderColor: "rgba(0,75,154,0.2)", background: "#f9fbff" }}>
                {SANPHAM_MODAL.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Row: Trạng thái + RM */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#374151" }}>Trạng thái</label>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(TRANGTHAI_CONFIG).map(([k, v]) => (
                  <button key={k} onClick={() => set("trangThai", k)}
                    className="px-2.5 py-1 rounded-xl text-xs font-medium transition-all"
                    style={{ background: form.trangThai === k ? v.color : v.bg, color: form.trangThai === k ? "#fff" : v.color, border: `1px solid ${v.color}30` }}>
                    {k}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#374151" }}>RM phụ trách</label>
              <select value={form.rm} onChange={e => set("rm", e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-sm border outline-none focus:border-blue-500"
                style={{ borderColor: "rgba(0,75,154,0.2)", background: "#f9fbff" }}>
                {RM_LIST.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>

          {/* Ghi chú */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "#374151" }}>Ghi chú</label>
            <textarea value={form.ghiChu} onChange={e => set("ghiChu", e.target.value)}
              placeholder="Thêm ghi chú về khách hàng, nhu cầu, timeline..."
              rows={3}
              className="w-full px-3 py-2 rounded-xl text-sm border outline-none resize-none focus:border-blue-500 transition-colors"
              style={{ borderColor: "rgba(0,75,154,0.2)", background: "#f9fbff" }} />
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 flex gap-3 flex-shrink-0" style={{ borderTop: "1px solid rgba(0,75,154,0.1)", background: "#f8fafc" }}>
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm font-medium border hover:bg-gray-50"
            style={{ borderColor: "rgba(0,75,154,0.2)", color: "#374151" }}>
            Hủy
          </button>
          <button
            onClick={() => { if (form.tenKH && form.sdt) setSaved(true); }}
            className="flex-2 px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all flex items-center gap-2"
            style={{ background: form.tenKH && form.sdt ? "linear-gradient(135deg, #002d6e 0%, #004b9a 100%)" : "#e5e7eb", color: form.tenKH && form.sdt ? "#fff" : "#9ca3af", flex: 2 }}>
            <Plus size={14} /> Tạo cơ hội
          </button>
        </div>
      </div>
    </div>
  );
}

// ── AI gợi ý banner (Leads tab) ───────────────────────────────────────────────
const LEADS_AI_TIPS = [
  "3 leads từ Campaign CASA chưa được tiếp cận lần 2 – tỉ lệ convert tăng 2× nếu gọi lại trong 24h.",
  "KH \"Trịnh Thị H\" đã đến giai đoạn Quan tâm – AI đề xuất upsell Payroll vào cuộc họp tiếp theo.",
  "5 leads nguồn Referral có AI Score ≥80 – ưu tiên tiếp cận trước cuối tuần để tối đa tỉ lệ chốt.",
  "Nguồn Social (Zalo) đang có tỉ lệ tiếp cận cao nhất tuần này: 78%. Tăng cường leads kênh này.",
];

function AiLeadsBanner() {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => { setIdx(i => (i + 1) % LEADS_AI_TIPS.length); setFading(false); }, 300);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  if (dismissed) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl mb-4" style={{ background: "linear-gradient(135deg, #78350f 0%, #d97706 100%)", border: "1px solid rgba(217,119,6,0.3)" }}>
      <Sparkles size={13} style={{ color: "#fff", flexShrink: 0 }} />
      <p className="flex-1 text-xs text-white font-medium" style={{ opacity: fading ? 0 : 1, transition: "opacity 0.3s" }}>
        {LEADS_AI_TIPS[idx]}
      </p>
      <div className="flex gap-1 flex-shrink-0">
        {LEADS_AI_TIPS.map((_, i) => (
          <span key={i} className="rounded-full" style={{ width: i === idx ? 14 : 5, height: 5, background: i === idx ? "#fff" : "rgba(255,255,255,0.35)", display: "block", transition: "width 0.3s" }} />
        ))}
      </div>
      <button onClick={() => setDismissed(true)} className="p-1 rounded hover:bg-white/20 flex-shrink-0"><X size={11} style={{ color: "rgba(255,255,255,0.7)" }} /></button>
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
  const [showModal, setShowModal] = useState(false);

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
      {/* AI gợi ý banner – top, same position as Chiến dịch tab */}
      <AiLeadsBanner />

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
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90 flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #002d6e 0%, #004b9a 100%)", color: "#fff" }}
        >
          <Plus size={13} /> Thêm cơ hội
        </button>
      </div>

      {showModal && <ThemCoHoiModal onClose={() => setShowModal(false)} />}

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

// ── AI Insights Ticker (giống CampaignsPage) ─────────────────────────────────
function AiInsightsFloat() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const [dismissed, setDismissed] = useState<number[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const activeInsights = AI_INSIGHTS.filter(i => !dismissed.includes(i.id));

  useEffect(() => {
    if (activeInsights.length <= 1) return;
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrentIdx(prev => (prev + 1) % activeInsights.length);
        setFading(false);
      }, 350);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeInsights.length]);

  if (activeInsights.length === 0) return null;

  const safeIdx = currentIdx % activeInsights.length;
  const insight = activeInsights[safeIdx];
  const expandedInsight = AI_INSIGHTS.find(i => i.id === expandedId);

  return (
    <>
      {/* Compact auto-rotating ticker bar */}
      <div
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl mb-4"
        style={{ background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)", border: "1px solid rgba(124,58,237,0.3)" }}
      >
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.18)" }}>
          <Brain size={13} style={{ color: "#fff" }} />
        </div>

        <div
          className="flex-1 min-w-0 flex items-center gap-2"
          style={{ opacity: fading ? 0 : 1, transition: "opacity 0.35s ease" }}
        >
          <span
            className="text-xs px-1.5 py-0.5 rounded font-bold flex-shrink-0"
            style={{ background: insight.badgeBg, color: "#fff", fontSize: 10 }}
          >
            {insight.badge}
          </span>
          <span className="text-xs font-semibold text-white truncate">{insight.title}</span>
          <span className="text-xs text-white/50 truncate hidden lg:block">
            · {insight.body.substring(0, 65)}…
          </span>
        </div>

        <button
          onClick={() => setExpandedId(insight.id)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium flex-shrink-0 hover:bg-white/30 transition-all"
          style={{ background: "rgba(255,255,255,0.18)", color: "#fff" }}
        >
          Xem <ArrowRight size={10} />
        </button>

        <div className="flex gap-1 flex-shrink-0">
          {activeInsights.map((_, i) => (
            <button
              key={i}
              onClick={() => { setFading(true); setTimeout(() => { setCurrentIdx(i); setFading(false); }, 200); }}
              className="rounded-full transition-all"
              style={{ width: i === safeIdx ? 16 : 6, height: 6, background: i === safeIdx ? "#fff" : "rgba(255,255,255,0.3)" }}
            />
          ))}
        </div>

        <button
          onClick={() => setDismissed(d => [...d, insight.id])}
          className="p-1 rounded hover:bg-white/20 transition-all flex-shrink-0"
        >
          <X size={12} style={{ color: "rgba(255,255,255,0.6)" }} />
        </button>
      </div>

      {/* Expanded detail modal */}
      {expandedInsight && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(3px)" }}
          onClick={() => setExpandedId(null)}
        >
          <div
            className="rounded-2xl shadow-2xl overflow-hidden"
            style={{ background: "#fff", width: "min(440px, 95vw)", border: "1px solid rgba(124,58,237,0.2)" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="px-5 py-4" style={{ background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain size={15} style={{ color: "#fff" }} />
                  <span className="text-sm font-semibold text-white">AI Phân tích</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>AI-powered</span>
                </div>
                <button onClick={() => setExpandedId(null)} className="p-1.5 rounded-lg hover:bg-white/20" style={{ color: "#fff" }}>
                  <X size={14} />
                </button>
              </div>
            </div>
            <div className="p-5">
              {(() => {
                const EIcon = expandedInsight.icon;
                return (
                  <div className="rounded-xl p-4 border" style={{ background: expandedInsight.bg, borderColor: expandedInsight.border }}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: expandedInsight.iconColor + "20" }}>
                        <EIcon size={18} style={{ color: expandedInsight.iconColor }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs px-2 py-0.5 rounded font-bold" style={{ background: expandedInsight.badgeBg, color: "#fff" }}>{expandedInsight.badge}</span>
                          <span className="text-sm font-semibold" style={{ color: "#0d1b2a" }}>{expandedInsight.title}</span>
                        </div>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: "#374151" }}>{expandedInsight.body}</p>
                        <div className="flex gap-2">
                          <button
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium hover:opacity-90"
                            style={{ background: expandedInsight.actionColor, color: "#fff" }}
                          >
                            <ArrowRight size={11} /> {expandedInsight.action}
                          </button>
                          <button
                            onClick={() => { setDismissed(d => [...d, expandedInsight.id]); setExpandedId(null); }}
                            className="px-4 py-2 rounded-xl text-xs border hover:bg-gray-50"
                            style={{ color: "#9ca3af", borderColor: "#e5e7eb" }}
                          >
                            Bỏ qua
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
              <p className="text-xs font-semibold mt-4 mb-2" style={{ color: "#9ca3af" }}>TẤT CẢ PHÂN TÍCH ({activeInsights.length})</p>
              <div className="space-y-2">
                {activeInsights.map(ins => (
                  <button
                    key={ins.id}
                    onClick={() => setExpandedId(ins.id)}
                    className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-all hover:opacity-80"
                    style={{ background: ins.id === expandedInsight.id ? ins.bg : "#f8fafc", border: `1px solid ${ins.id === expandedInsight.id ? ins.border : "transparent"}` }}
                  >
                    <span className="text-xs px-1.5 py-0.5 rounded font-bold flex-shrink-0" style={{ background: ins.badgeBg, color: "#fff", fontSize: 10 }}>{ins.badge}</span>
                    <span className="text-xs font-medium flex-1 truncate" style={{ color: "#0d1b2a" }}>{ins.title}</span>
                  </button>
                ))}
              </div>
              {dismissed.length > 0 && (
                <button onClick={() => setDismissed([])} className="flex items-center gap-1.5 text-xs mt-3 mx-auto hover:opacity-80" style={{ color: "#7c3aed" }}>
                  <RefreshCw size={10} /> Khôi phục {dismissed.length} insight đã ẩn
                </button>
              )}
            </div>
          </div>
        </div>
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

// ── Campaign VUNG detail modal ──────────────────────────────────────────────
const VUNG_BASE = [
  { vung: "VÙNG 1", phatSinh: 22, suyGiam: 2888, duNo: 4810, bl: 768, ttqt: 1636, goiPhi: 78, banGoi: 802, phanBo: 4187, tiepCan: 2179, dongY: 353, convert: 77 },
  { vung: "VÙNG 2", phatSinh: 13, suyGiam: 2489, duNo: 3488, bl: 494, ttqt: 1229, goiPhi: 91, banGoi: 700, phanBo: 1120, tiepCan: 471,  dongY: 57,  convert: 15 },
  { vung: "VÙNG 3", phatSinh: 11, suyGiam: 2179, duNo: 2778, bl: 582, ttqt:  998, goiPhi: 39, banGoi: 576, phanBo: 1210, tiepCan: 713,  dongY: 198, convert: 21 },
  { vung: "VÙNG 4", phatSinh:  3, suyGiam:  421, duNo:  764, bl: 179, ttqt:  106, goiPhi:  0, banGoi:  23, phanBo: 1183, tiepCan: 326,  dongY: 69,  convert:  9 },
  { vung: "VÙNG 5", phatSinh:  4, suyGiam:  750, duNo: 1451, bl: 300, ttqt:  230, goiPhi:  4, banGoi:  82, phanBo: 1581, tiepCan: 630,  dongY: 155, convert: 21 },
  { vung: "VÙNG 6", phatSinh:  6, suyGiam: 1048, duNo: 1592, bl: 499, ttqt:  174, goiPhi:  4, banGoi:  40, phanBo: 2263, tiepCan: 915,  dongY: 268, convert: 27 },
  { vung: "VÙNG 7", phatSinh: 15, suyGiam:  838, duNo: 1314, bl: 300, ttqt:  499, goiPhi: 30, banGoi: 181, phanBo: 2090, tiepCan: 746,  dongY: 133, convert: 18 },
  { vung: "VÙNG 8", phatSinh: 19, suyGiam: 3430, duNo: 2871, bl: 950, ttqt: 1325, goiPhi: 64, banGoi: 815, phanBo: 4386, tiepCan: 1754, dongY: 208, convert: 65 },
];

// Scale multipliers per campaign so the regional data looks distinct
const CAMPAIGN_SCALE: Record<string, number[]> = {
  "CASA Q2/2025":        [1.10, 0.85, 0.92, 0.60, 0.80, 0.95, 0.90, 1.20],
  "Vay mua nhà Summer":  [0.90, 0.75, 1.05, 0.45, 0.70, 1.10, 0.85, 1.15],
  "Thẻ tín dụng Visa":   [1.00, 0.80, 0.88, 0.50, 0.65, 1.00, 0.78, 1.00],
  "Cross-sell Thẻ T5":   [0.70, 0.65, 0.80, 0.40, 0.55, 0.85, 0.70, 0.90],
  "SME Trade Finance":   [0.55, 0.50, 0.60, 0.30, 0.45, 0.65, 0.55, 0.70],
  "Bảo hiểm An tâm Q1": [0.45, 0.40, 0.50, 0.25, 0.38, 0.52, 0.45, 0.55],
  "Tiết kiệm Online Q1": [0.30, 0.28, 0.35, 0.18, 0.25, 0.38, 0.30, 0.40],
  "Tái gửi KHHH Q2":     [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
};

function CampaignVungModal({ name, etlDt, onClose }: { name: string; etlDt: string; onClose: () => void }) {
  const scales = CAMPAIGN_SCALE[name] ?? Array(8).fill(1);
  const rows = VUNG_BASE.map((r, i) => {
    const s = scales[i];
    const sc = (v: number) => Math.round(v * s);
    return { ...r, phatSinh: sc(r.phatSinh), suyGiam: sc(r.suyGiam), duNo: sc(r.duNo), bl: sc(r.bl),
      ttqt: sc(r.ttqt), goiPhi: sc(r.goiPhi), banGoi: sc(r.banGoi),
      phanBo: sc(r.phanBo), tiepCan: sc(r.tiepCan), dongY: sc(r.dongY), convert: sc(r.convert) };
  });
  const tot = (key: keyof typeof rows[0]) => rows.reduce((a, r) => a + (r[key] as number), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(3px)" }} onClick={onClose}>
      <div className="relative rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ background: "#fff", width: "min(1100px, 96vw)", maxHeight: "90vh", border: "1px solid rgba(0,75,154,0.2)" }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 flex-shrink-0" style={{ background: "linear-gradient(135deg, #001a4d 0%, #002d6e 100%)" }}>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm">Chi tiết khu vực — {name}</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>ETL_DT: {etlDt} · TÌNH HÌNH TIẾP CẬN – ĐỒNG Ý – CONVERT theo từng khu vực</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/20 transition-all flex-shrink-0" style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-auto flex-1 p-4">
          <table className="text-xs border-collapse w-full" style={{ minWidth: 900 }}>
            <thead>
              <tr>
                <th rowSpan={2} className="px-3 py-2 text-center font-semibold border-b border-r" style={{ background: "#002d6e", color: "#fff", borderColor: "rgba(255,255,255,0.15)", minWidth: 90, verticalAlign: "middle" }}>ETL_DT</th>
                <th rowSpan={2} className="px-3 py-2 text-left font-semibold border-b border-r" style={{ background: "#002d6e", color: "#fff", borderColor: "rgba(255,255,255,0.15)", minWidth: 80, verticalAlign: "middle" }}>TÊN KHU VỰC</th>
                <th colSpan={7} className="px-3 py-2 text-center font-semibold border-b border-r" style={{ background: "#004b9a", color: "#fff", borderColor: "rgba(255,255,255,0.15)" }}>KHHH</th>
                <th colSpan={5} className="px-3 py-2 text-center font-semibold border-b" style={{ background: "#0369a1", color: "#fff" }}>KH MỚI Q1</th>
              </tr>
              <tr>
                {["SLKH PHÁT SINH PHÍ BL","SLKH SUY GIẢM PHÍ BL","SLKH TIỀM NĂNG DƯ NỢ","SLKH TIỀM NĂNG BL","SLKH TIỀM NĂNG TTQT","SLKH GÓI PHÍ LC","SLKH BĂN GÓI PHÍ TTR"].map((h, i) => (
                  <th key={h} className="px-2 py-1.5 text-center font-semibold border-b border-r" style={{ background: "#1d4ed8", color: "#fff", borderColor: "rgba(255,255,255,0.12)", minWidth: 70, borderRight: i === 6 ? "2px solid rgba(255,255,255,0.3)" : undefined }}>
                    <span style={{ fontSize: 9, lineHeight: 1.3, display: "block" }}>{h}</span>
                  </th>
                ))}
                {["SLKH PHÂN BỔ","SLKH TIẾP CẬN","SLKH ĐỒNG Ý","SLKH CONVERT","TỶ LỆ %"].map((h, i) => (
                  <th key={h} className="px-2 py-1.5 text-center font-semibold border-b" style={{ background: "#0284c7", color: "#fff", minWidth: 68, borderRight: i < 4 ? "1px solid rgba(255,255,255,0.12)" : undefined }}>
                    <span style={{ fontSize: 9, lineHeight: 1.3, display: "block" }}>{h}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => {
                const pct = row.phanBo > 0 && row.convert > 0 ? ((row.convert / row.phanBo) * 100).toFixed(1) : "–";
                const tiepCanPct = row.phanBo > 0 ? Math.min(Math.round(row.tiepCan / row.phanBo * 100), 100) : 0;
                return (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafd" }}>
                    {i === 0 && (
                      <td rowSpan={8} className="px-3 py-2 text-center border-r font-medium" style={{ color: "#0d1b2a", borderColor: "rgba(0,75,154,0.1)", verticalAlign: "middle" }}>{etlDt}</td>
                    )}
                    <td className="px-3 py-2 font-semibold border-r border-b" style={{ color: "#0d1b2a", borderColor: "rgba(0,75,154,0.08)" }}>{row.vung}</td>
                    <td className="px-2 py-2 text-center border-r border-b" style={{ color: "#374151", borderColor: "rgba(0,75,154,0.06)" }}>{row.phatSinh || "–"}</td>
                    <td className="px-2 py-2 text-center border-r border-b" style={{ color: "#374151", borderColor: "rgba(0,75,154,0.06)" }}>{row.suyGiam.toLocaleString("vi-VN") || "–"}</td>
                    <td className="px-2 py-2 text-center border-r border-b" style={{ color: "#374151", borderColor: "rgba(0,75,154,0.06)" }}>{row.duNo.toLocaleString("vi-VN") || "–"}</td>
                    <td className="px-2 py-2 text-center border-r border-b" style={{ color: "#374151", borderColor: "rgba(0,75,154,0.06)" }}>{row.bl.toLocaleString("vi-VN") || "–"}</td>
                    <td className="px-2 py-2 text-center border-r border-b" style={{ color: "#374151", borderColor: "rgba(0,75,154,0.06)" }}>{row.ttqt.toLocaleString("vi-VN") || "–"}</td>
                    <td className="px-2 py-2 text-center border-r border-b" style={{ color: "#374151", borderColor: "rgba(0,75,154,0.06)" }}>{row.goiPhi || "–"}</td>
                    <td className="px-2 py-2 text-center border-r border-b" style={{ color: "#374151", borderColor: "rgba(0,75,154,0.1)", borderRight: "2px solid rgba(0,75,154,0.12)" }}>{row.banGoi.toLocaleString("vi-VN")}</td>
                    <td className="px-2 py-2 text-center border-r border-b font-semibold" style={{ color: "#004b9a", borderColor: "rgba(0,75,154,0.06)" }}>{row.phanBo.toLocaleString("vi-VN")}</td>
                    <td className="px-2 py-2 text-center border-r border-b" style={{ borderColor: "rgba(0,75,154,0.06)" }}>
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="font-medium" style={{ color: "#7c3aed" }}>{row.tiepCan.toLocaleString("vi-VN")}</span>
                        <div className="h-1 rounded-full w-10" style={{ background: "#e5e7eb" }}>
                          <div className="h-full rounded-full" style={{ width: `${tiepCanPct}%`, background: "#7c3aed" }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-2 text-center border-r border-b font-medium" style={{ color: "#0891b2", borderColor: "rgba(0,75,154,0.06)" }}>{row.dongY.toLocaleString("vi-VN")}</td>
                    <td className="px-2 py-2 text-center border-r border-b font-bold" style={{ color: "#16a34a", borderColor: "rgba(0,75,154,0.06)" }}>{row.convert || "–"}</td>
                    <td className="px-2 py-2 text-center border-b" style={{ fontWeight: 600, color: pct !== "–" ? (parseFloat(pct) >= 3 ? "#16a34a" : "#d97706") : "#9ca3af", borderColor: "rgba(0,75,154,0.06)" }}>{pct !== "–" ? `${pct}%` : "–"}</td>
                  </tr>
                );
              })}
              {/* Total */}
              <tr style={{ background: "#002d6e" }}>
                <td colSpan={2} className="px-3 py-2.5 font-bold text-white text-center border-r" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
                  {etlDt} – Tổng
                </td>
                {(["phatSinh","suyGiam","duNo","bl","ttqt","goiPhi","banGoi"] as const).map((k, i) => (
                  <td key={k} className="px-2 py-2.5 text-center font-bold text-white border-r" style={{ borderColor: "rgba(255,255,255,0.15)" }}>{tot(k).toLocaleString("vi-VN") || "–"}</td>
                ))}
                <td className="px-2 py-2.5 text-center font-bold border-r" style={{ color: "#93c5fd", borderColor: "rgba(255,255,255,0.2)" }}>{tot("phanBo").toLocaleString("vi-VN")}</td>
                <td className="px-2 py-2.5 text-center font-bold border-r" style={{ color: "#c4b5fd", borderColor: "rgba(255,255,255,0.2)" }}>{tot("tiepCan").toLocaleString("vi-VN")}</td>
                <td className="px-2 py-2.5 text-center font-bold border-r" style={{ color: "#6ee7b7", borderColor: "rgba(255,255,255,0.2)" }}>{tot("dongY").toLocaleString("vi-VN")}</td>
                <td className="px-2 py-2.5 text-center font-bold border-r" style={{ color: "#86efac", borderColor: "rgba(255,255,255,0.2)" }}>{tot("convert").toLocaleString("vi-VN")}</td>
                <td className="px-2 py-2.5 text-center font-bold" style={{ color: "#fde68a" }}>
                  {tot("phanBo") > 0 ? ((tot("convert") / tot("phanBo")) * 100).toFixed(1) + "%" : "–"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DashboardTab() {
  const [subTab, setSubTab] = useState<"overview" | "rm" | "campaign" | "growth">("overview");
  const [dateRange] = useState("01/05/2025 - 31/05/2025");
  const [vungModal, setVungModal] = useState<string | null>(null);

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

      {/* ── Sub-tab: Hiệu quả RM ── */}
      {subTab === "rm" && (
        <>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "RM đang hoạt động", value: "12", color: "#004b9a", bg: "#e8f0fb" },
              { label: "Lead trung bình / RM", value: "65", color: "#7c3aed", bg: "#ede9fe" },
              { label: "Avg Convert Rate", value: "14.2%", color: "#16a34a", bg: "#dcfce7" },
            ].map(k => (
              <div key={k.label} className="p-4 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: k.bg }}>
                  <Activity size={15} style={{ color: k.color }} />
                </div>
                <p className="text-2xl font-bold" style={{ color: k.color }}>{k.value}</p>
                <p className="text-xs" style={{ color: "#6b7a95" }}>{k.label}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
            <p className="text-xs font-semibold mb-3" style={{ color: "#0d1b2a" }}>BẢNG HIỆU QUẢ RM THÁNG 5/2025</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(0,75,154,0.08)" }}>
                    {["RM", "Leads phụ trách", "Đã tiếp cận", "Chốt deal", "% Convert", "Doanh số (tỷ)", "Xếp hạng"].map(h => (
                      <th key={h} className="pb-2 text-left font-semibold" style={{ color: "#6b7a95", paddingRight: 12 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Nguyễn Văn A", leads: 89, contacted: 72, deals: 18, convert: 20.2, revenue: 8.4, rank: 1 },
                    { name: "Lê Thị Hoa",    leads: 76, contacted: 59, deals: 14, convert: 18.4, revenue: 6.2, rank: 2 },
                    { name: "Trần Văn Nam",  leads: 68, contacted: 48, deals: 11, convert: 16.2, revenue: 5.1, rank: 3 },
                    { name: "Phạm Thị Thu",  leads: 55, contacted: 38, deals:  8, convert: 14.5, revenue: 3.8, rank: 4 },
                    { name: "Hoàng M. Khoa", leads: 50, contacted: 31, deals:  6, convert: 12.0, revenue: 2.8, rank: 5 },
                  ].map((r, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(0,75,154,0.06)" }}>
                      <td className="py-3 font-medium" style={{ color: "#0d1b2a", paddingRight: 12 }}>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0" style={{ background: ["#004b9a","#7c3aed","#0891b2","#16a34a","#d97706"][i] }}>
                            {r.name.split(" ").pop()![0]}
                          </div>
                          {r.name}
                        </div>
                      </td>
                      <td className="py-3" style={{ color: "#374151", paddingRight: 12 }}>{r.leads}</td>
                      <td className="py-3" style={{ paddingRight: 12 }}>
                        <div className="flex items-center gap-1.5">
                          <div className="h-1.5 rounded-full" style={{ background: "#e5e7eb", width: 44 }}>
                            <div className="h-full rounded-full" style={{ width: `${Math.round(r.contacted/r.leads*100)}%`, background: "#7c3aed" }} />
                          </div>
                          <span style={{ color: "#7c3aed" }}>{Math.round(r.contacted/r.leads*100)}%</span>
                        </div>
                      </td>
                      <td className="py-3 font-medium" style={{ color: "#16a34a", paddingRight: 12 }}>{r.deals}</td>
                      <td className="py-3 font-semibold" style={{ color: r.convert >= 18 ? "#16a34a" : "#d97706", paddingRight: 12 }}>{r.convert}%</td>
                      <td className="py-3 font-semibold" style={{ color: "#004b9a", paddingRight: 12 }}>{r.revenue}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: r.rank === 1 ? "#fef3c7" : r.rank === 2 ? "#f1f5f9" : "#f9fafb", color: r.rank === 1 ? "#d97706" : r.rank === 2 ? "#6b7280" : "#9ca3af" }}>
                          #{r.rank}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl border" style={{ background: "#fffbeb", borderColor: "#fde68a" }}>
            <p className="text-xs font-semibold mb-1.5 flex items-center gap-1.5" style={{ color: "#92400e" }}>
              <Sparkles size={12} /> AI nhận định về hiệu quả đội RM
            </p>
            <p className="text-xs" style={{ color: "#78350f" }}>
              RM Nguyễn Văn A dẫn đầu với 20.2% convert. Pattern thành công: tiếp cận qua Zalo &gt; Gọi trong 48h &gt; Gặp mặt tư vấn. Đề xuất chia sẻ playbook này cho toàn đội để nâng avg convert lên 17%.
            </p>
          </div>
        </>
      )}

      {/* ── Sub-tab: Hiệu quả Chiến dịch ── */}
      {subTab === "campaign" && (
        <>
          {/* Compact summary chips */}
          <div className="flex items-center gap-2 flex-wrap mb-4">
            {[
              { label: "Tổng CD", value: "8", color: "#004b9a", bg: "#e8f0fb" },
              { label: "Đang chạy", value: "3", color: "#16a34a", bg: "#dcfce7" },
              { label: "Avg Convert", value: "14.8%", color: "#d97706", bg: "#fef3c7" },
              { label: "Doanh số", value: "32.6 tỷ", color: "#7c3aed", bg: "#ede9fe" },
              { label: "KHHH phân bổ", value: "18,020", color: "#0891b2", bg: "#e0f2fe" },
              { label: "KHHH tiếp cận", value: "7,734", color: "#059669", bg: "#d1fae5" },
              { label: "Đồng ý", value: "1,441", color: "#6366f1", bg: "#eef2ff" },
              { label: "Convert", value: "253", color: "#dc2626", bg: "#fee2e2" },
            ].map(k => (
              <div key={k.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border" style={{ background: k.bg + "80", borderColor: k.color + "30" }}>
                <span className="text-xs font-bold" style={{ color: k.color }}>{k.value}</span>
                <span className="text-xs" style={{ color: "#6b7a95" }}>{k.label}</span>
              </div>
            ))}
          </div>

          {/* Title block */}
          <div className="mb-3">
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: "#0d1b2a" }}>
              1. TÌNH HÌNH TIẾP CẬN – ĐỒNG Ý – CONVERT
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#6b7a95" }}>• DRIVER Q1, Q2, KHHH cus360 — Theo từng loại chiến dịch</p>
          </div>

          {/* KHHH table by campaign */}
          <div className="rounded-xl border overflow-hidden" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.15)" }}>
            <div className="overflow-x-auto">
              <table className="text-xs border-collapse" style={{ minWidth: 960 }}>
                <thead>
                  <tr>
                    <th rowSpan={2} className="px-3 py-2 text-left font-semibold border-b border-r" style={{ background: "#002d6e", color: "#fff", borderColor: "rgba(255,255,255,0.15)", minWidth: 160, verticalAlign: "middle" }}>CHIẾN DỊCH</th>
                    <th rowSpan={2} className="px-2 py-2 text-center font-semibold border-b border-r" style={{ background: "#002d6e", color: "#fff", borderColor: "rgba(255,255,255,0.15)", minWidth: 56, verticalAlign: "middle" }}>NGUỒN</th>
                    <th rowSpan={2} className="px-2 py-2 text-center font-semibold border-b border-r" style={{ background: "#002d6e", color: "#fff", borderColor: "rgba(255,255,255,0.15)", minWidth: 60, verticalAlign: "middle" }}>TRẠNG THÁI</th>
                    <th colSpan={7} className="px-3 py-2 text-center font-semibold border-b border-r" style={{ background: "#004b9a", color: "#fff", borderColor: "rgba(255,255,255,0.15)" }}>KHHH</th>
                    <th colSpan={5} className="px-3 py-2 text-center font-semibold border-b border-r" style={{ background: "#0369a1", color: "#fff", borderColor: "rgba(255,255,255,0.15)" }}>KH MỚI PHÂN BỔ</th>
                    <th rowSpan={2} className="px-2 py-2 text-center font-semibold border-b border-l" style={{ background: "#1e1b4b", color: "#fff", borderColor: "rgba(255,255,255,0.15)", minWidth: 68, verticalAlign: "middle" }}>CHI TIẾT</th>
                  </tr>
                  <tr>
                    {[
                      "PHÁT SINH PHÍ BL","SUY GIẢM PHÍ BL","TIỀM NĂNG DƯ NỢ",
                      "TIỀM NĂNG BL","TIỀM NĂNG TTQT","GÓI PHÍ LC","BĂN GÓI PHÍ TTR",
                    ].map((h, i) => (
                      <th key={h} className="px-2 py-1.5 text-center font-semibold border-b border-r"
                        style={{ background: "#1d4ed8", color: "#fff", borderColor: "rgba(255,255,255,0.12)", minWidth: 68,
                          borderRight: i === 6 ? "2px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.12)" }}>
                        <span style={{ fontSize: 9, lineHeight: 1.3, display: "block" }}>SLKH {h}</span>
                      </th>
                    ))}
                    {["PHÂN BỔ","TIẾP CẬN","ĐỒNG Ý","CONVERT","TỶ LỆ %"].map((h, i) => (
                      <th key={h} className="px-2 py-1.5 text-center font-semibold border-b"
                        style={{ background: "#0284c7", color: "#fff", minWidth: 64,
                          borderRight: i < 4 ? "1px solid rgba(255,255,255,0.12)" : undefined }}>
                        <span style={{ fontSize: 9, lineHeight: 1.3, display: "block" }}>SLKH {h}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {([
                    { name: "CASA Q2/2025",         src: "Khối", status: "Đang chạy",  sc: "#16a34a", phatSinh: 28, suyGiam: 3420, duNo: 5210, bl: 920,  ttqt: 1840, goiPhi: 96,  banGoi: 945,  phanBo: 4187, tiepCan: 2850, dongY: 512, convert: 85 },
                    { name: "Vay mua nhà Summer",   src: "Vùng", status: "Đang chạy",  sc: "#16a34a", phatSinh: 19, suyGiam: 2640, duNo: 3880, bl: 710,  ttqt: 1420, goiPhi: 68,  banGoi: 721,  phanBo: 3210, tiepCan: 2180, dongY: 394, convert: 62 },
                    { name: "Thẻ tín dụng Visa",    src: "3D",   status: "Đang chạy",  sc: "#16a34a", phatSinh: 15, suyGiam: 1980, duNo: 2990, bl: 530,  ttqt: 1100, goiPhi: 52,  banGoi: 583,  phanBo: 2840, tiepCan: 1920, dongY: 320, convert: 74 },
                    { name: "Cross-sell Thẻ T5",    src: "Khối", status: "Kết thúc",   sc: "#9ca3af", phatSinh: 11, suyGiam: 1450, duNo: 2210, bl: 380,  ttqt:  820, goiPhi: 38,  banGoi: 412,  phanBo: 1980, tiepCan: 1540, dongY: 248, convert: 96 },
                    { name: "SME Trade Finance",    src: "Khối", status: "Kết thúc",   sc: "#9ca3af", phatSinh:  9, suyGiam: 1120, duNo: 1680, bl: 290,  ttqt:  610, goiPhi: 29,  banGoi: 318,  phanBo: 1560, tiepCan:  920, dongY: 156, convert: 41 },
                    { name: "Bảo hiểm An tâm Q1",  src: "Vùng", status: "Kết thúc",   sc: "#9ca3af", phatSinh:  7, suyGiam:  890, duNo: 1340, bl: 240,  ttqt:  487, goiPhi: 22,  banGoi: 252,  phanBo: 1240, tiepCan:  720, dongY: 118, convert: 52 },
                    { name: "Tiết kiệm Online Q1",  src: "3D",   status: "Chuẩn bị",  sc: "#d97706", phatSinh:  4, suyGiam:  543, duNo:  958, bl: 160,  ttqt:  320, goiPhi: 15,  banGoi: 170,  phanBo:  803, tiepCan:  410, dongY:  74, convert: 22 },
                    { name: "Tái gửi KHHH Q2",     src: "Vùng", status: "Chuẩn bị",  sc: "#d97706", phatSinh:  0, suyGiam:    0, duNo:    0, bl:   0,  ttqt:    0, goiPhi:  0,  banGoi:   18,  phanBo: 2200, tiepCan:    0, dongY:   0, convert:  0 },
                  ] as const).map((row, i) => {
                    const pct = row.phanBo > 0 && row.convert > 0 ? ((row.convert / row.phanBo) * 100).toFixed(1) : "–";
                    const tiepCanPct = row.phanBo > 0 ? Math.min(Math.round(row.tiepCan / row.phanBo * 100), 100) : 0;
                    const dongYPct = row.tiepCan > 0 ? Math.min(Math.round(row.dongY / row.tiepCan * 100), 100) : 0;
                    return (
                      <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafd" }}>
                        {/* Campaign name */}
                        <td className="px-3 py-2.5 border-r border-b" style={{ borderColor: "rgba(0,75,154,0.08)" }}>
                          <p className="font-semibold" style={{ color: "#0d1b2a", fontSize: 11 }}>{row.name}</p>
                        </td>
                        {/* Nguồn */}
                        <td className="px-2 py-2.5 text-center border-r border-b" style={{ borderColor: "rgba(0,75,154,0.08)" }}>
                          <SourceBadge source={row.src} />
                        </td>
                        {/* Trạng thái */}
                        <td className="px-2 py-2.5 text-center border-r border-b" style={{ borderColor: "rgba(0,75,154,0.08)", borderRight: "2px solid rgba(0,75,154,0.1)" }}>
                          <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ background: row.sc + "18", color: row.sc }}>{row.status}</span>
                        </td>
                        {/* KHHH cols */}
                        <td className="px-2 py-2 text-center border-r border-b" style={{ color: "#374151", borderColor: "rgba(0,75,154,0.06)" }}>{row.phatSinh || "–"}</td>
                        <td className="px-2 py-2 text-center border-r border-b" style={{ color: "#374151", borderColor: "rgba(0,75,154,0.06)" }}>{row.suyGiam.toLocaleString("vi-VN") || "–"}</td>
                        <td className="px-2 py-2 text-center border-r border-b" style={{ color: "#374151", borderColor: "rgba(0,75,154,0.06)" }}>{row.duNo.toLocaleString("vi-VN") || "–"}</td>
                        <td className="px-2 py-2 text-center border-r border-b" style={{ color: "#374151", borderColor: "rgba(0,75,154,0.06)" }}>{row.bl.toLocaleString("vi-VN") || "–"}</td>
                        <td className="px-2 py-2 text-center border-r border-b" style={{ color: "#374151", borderColor: "rgba(0,75,154,0.06)" }}>{row.ttqt.toLocaleString("vi-VN") || "–"}</td>
                        <td className="px-2 py-2 text-center border-r border-b" style={{ color: "#374151", borderColor: "rgba(0,75,154,0.06)" }}>{row.goiPhi || "–"}</td>
                        <td className="px-2 py-2 text-center border-r border-b" style={{ color: "#374151", borderColor: "rgba(0,75,154,0.1)", borderRight: "2px solid rgba(0,75,154,0.12)" }}>{row.banGoi.toLocaleString("vi-VN")}</td>
                        {/* KH MỚI cols */}
                        <td className="px-2 py-2 text-center border-r border-b font-semibold" style={{ color: "#004b9a", borderColor: "rgba(0,75,154,0.06)" }}>{row.phanBo.toLocaleString("vi-VN")}</td>
                        <td className="px-2 py-2 text-center border-r border-b" style={{ borderColor: "rgba(0,75,154,0.06)" }}>
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="font-medium" style={{ color: "#7c3aed", fontSize: 11 }}>{row.tiepCan.toLocaleString("vi-VN")}</span>
                            <div className="h-1 rounded-full" style={{ background: "#e5e7eb", width: 36 }}>
                              <div className="h-full rounded-full" style={{ width: `${tiepCanPct}%`, background: "#7c3aed" }} />
                            </div>
                            <span style={{ color: "#9ca3af", fontSize: 9 }}>{tiepCanPct}%</span>
                          </div>
                        </td>
                        <td className="px-2 py-2 text-center border-r border-b" style={{ borderColor: "rgba(0,75,154,0.06)" }}>
                          <div className="flex flex-col items-center gap-0.5">
                            <span className="font-medium" style={{ color: "#0891b2", fontSize: 11 }}>{row.dongY.toLocaleString("vi-VN")}</span>
                            <div className="h-1 rounded-full" style={{ background: "#e5e7eb", width: 36 }}>
                              <div className="h-full rounded-full" style={{ width: `${dongYPct}%`, background: "#0891b2" }} />
                            </div>
                          </div>
                        </td>
                        <td className="px-2 py-2 text-center border-r border-b font-bold" style={{ color: "#16a34a", borderColor: "rgba(0,75,154,0.06)" }}>{row.convert || "–"}</td>
                        <td className="px-2 py-2 text-center border-b border-r" style={{ fontWeight: 600, borderColor: "rgba(0,75,154,0.06)",
                          color: pct !== "–" ? (parseFloat(pct) >= 3 ? "#16a34a" : "#d97706") : "#9ca3af" }}>
                          {pct !== "–" ? `${pct}%` : "–"}
                        </td>
                        <td className="px-2 py-2 text-center border-b border-l" style={{ borderColor: "rgba(0,75,154,0.06)" }}>
                          <button
                            onClick={() => setVungModal(row.name)}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
                            style={{ background: "#1e1b4b", color: "#fff", letterSpacing: "0.01em" }}
                          >
                            Chi tiết →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {/* Total row */}
                  <tr style={{ background: "#002d6e" }}>
                    <td colSpan={3} className="px-3 py-2.5 font-bold text-white border-r text-center" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
                      TỔNG CỘNG (8 chiến dịch)
                    </td>
                    {[93, "11,043", "18,268", "3,230", "6,597", 320, "3,419"].map((v, i) => (
                      <td key={i} className="px-2 py-2.5 text-center font-bold text-white border-r" style={{ borderColor: "rgba(255,255,255,0.15)" }}>{v}</td>
                    ))}
                    <td className="px-2 py-2.5 text-center font-bold border-r" style={{ color: "#93c5fd", borderColor: "rgba(255,255,255,0.2)" }}>18,020</td>
                    <td className="px-2 py-2.5 text-center font-bold border-r" style={{ color: "#c4b5fd", borderColor: "rgba(255,255,255,0.2)" }}>10,540</td>
                    <td className="px-2 py-2.5 text-center font-bold border-r" style={{ color: "#6ee7b7", borderColor: "rgba(255,255,255,0.2)" }}>1,822</td>
                    <td className="px-2 py-2.5 text-center font-bold border-r" style={{ color: "#86efac", borderColor: "rgba(255,255,255,0.2)" }}>432</td>
                    <td className="px-2 py-2.5 text-center font-bold border-r" style={{ color: "#fde68a", borderColor: "rgba(255,255,255,0.2)" }}>2.4%</td>
                    <td className="px-2 py-2.5 text-center border-l" style={{ borderColor: "rgba(255,255,255,0.1)" }}></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* VUNG detail modal */}
          {vungModal && (
            <CampaignVungModal
              name={vungModal}
              etlDt="30/05/2026"
              onClose={() => setVungModal(null)}
            />
          )}
        </>
      )}

      {/* ── Sub-tab: Tăng trưởng ── */}
      {subTab === "growth" && (
        <>
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: "Leads mới T5/2025", value: "+412", change: "+22% so T4", color: "#004b9a", up: true },
              { label: "Doanh số (tỷ)", value: "32.6", change: "+20% so T4", color: "#16a34a", up: true },
              { label: "Deal chốt", value: "210", change: "+15% so T4", color: "#7c3aed", up: true },
              { label: "Khách hàng mới", value: "186", change: "+18% so T4", color: "#d97706", up: true },
            ].map(k => (
              <div key={k.label} className="p-4 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
                <p className="text-xs mb-2" style={{ color: "#6b7a95" }}>{k.label}</p>
                <p className="text-2xl font-bold" style={{ color: k.color }}>{k.value}</p>
                <p className="text-xs mt-1 font-medium" style={{ color: "#16a34a" }}>↑ {k.change}</p>
              </div>
            ))}
          </div>

          {/* Line charts row */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold" style={{ color: "#0d1b2a" }}>TĂNG TRƯỞNG LEADS MỚI</p>
                <span className="text-xs font-bold" style={{ color: "#004b9a" }}>+22%</span>
              </div>
              <div style={{ height: 100 }}><LineChart /></div>
              <div className="flex justify-between mt-1">
                {MONTHS.map(m => <span key={m} className="text-center" style={{ color: "#9ca3af", fontSize: 9, width: `${100/12}%` }}>{m}</span>)}
              </div>
            </div>
            <div className="p-4 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold" style={{ color: "#0d1b2a" }}>TĂNG TRƯỞNG DOANH SỐ (TỶ)</p>
                <span className="text-xs font-bold" style={{ color: "#16a34a" }}>32.6</span>
              </div>
              <div style={{ height: 100 }}><LineChart /></div>
              <div className="flex justify-between mt-1">
                {MONTHS.map(m => <span key={m} className="text-center" style={{ color: "#9ca3af", fontSize: 9, width: `${100/12}%` }}>{m}</span>)}
              </div>
            </div>
          </div>

          {/* Month-over-month table */}
          <div className="p-4 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
            <p className="text-xs font-semibold mb-3" style={{ color: "#0d1b2a" }}>TĂNG TRƯỞNG THEO THÁNG</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(0,75,154,0.08)" }}>
                    {["Tháng", "Leads mới", "Deal chốt", "% Convert", "Doanh số (tỷ)", "Tăng trưởng"].map(h => (
                      <th key={h} className="pb-2 text-left font-semibold" style={{ color: "#6b7a95", paddingRight: 12 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { month: "T1/2025", leads: 186, deals: 22, convert: 11.8, revenue: 8.2, growth: +5 },
                    { month: "T2/2025", leads: 198, deals: 25, convert: 12.6, revenue: 9.1, growth: +6.5 },
                    { month: "T3/2025", leads: 245, deals: 31, convert: 12.7, revenue: 10.5, growth: +8.2 },
                    { month: "T4/2025", leads: 338, deals: 41, convert: 12.1, revenue: 11.2, growth: +9.4 },
                    { month: "T5/2025", leads: 412, deals: 54, convert: 13.1, revenue: 14.1, growth: +22.0 },
                    { month: "T6/2025 (dự kiến)", leads: 480, deals: 68, convert: 14.2, revenue: 16.8, growth: +16.5 },
                  ].map((r, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(0,75,154,0.06)" }}>
                      <td className="py-2.5 font-medium" style={{ color: i === 5 ? "#7c3aed" : "#0d1b2a", paddingRight: 12 }}>{r.month}</td>
                      <td className="py-2.5" style={{ color: "#004b9a", paddingRight: 12 }}>{r.leads.toLocaleString("vi-VN")}</td>
                      <td className="py-2.5 font-medium" style={{ color: "#16a34a", paddingRight: 12 }}>{r.deals}</td>
                      <td className="py-2.5" style={{ color: "#374151", paddingRight: 12 }}>{r.convert}%</td>
                      <td className="py-2.5 font-semibold" style={{ color: "#d97706", paddingRight: 12 }}>{r.revenue}</td>
                      <td className="py-2.5">
                        <span className="flex items-center gap-1 font-semibold" style={{ color: "#16a34a" }}>
                          <TrendingUp size={10} /> +{r.growth}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl border" style={{ background: "#f0fdf4", borderColor: "#bbf7d0" }}>
            <p className="text-xs font-semibold mb-1.5 flex items-center gap-1.5" style={{ color: "#166534" }}>
              <Sparkles size={12} /> Dự báo AI – Quý 2/2025
            </p>
            <p className="text-xs" style={{ color: "#15803d" }}>
              Dựa trên tốc độ tăng trưởng hiện tại, AI dự báo Q2/2025 sẽ đạt <strong>~1,230 leads</strong> và <strong>~43 tỷ doanh số</strong>. Khuyến nghị tập trung vào nguồn Referral và Campaign vì tỉ lệ convert cao hơn 1.8× so với kênh khác.
            </p>
          </div>
        </>
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
