import { useState } from "react";
import {
  Megaphone, ChevronRight, Calendar, Users, Target, TrendingUp,
  Flame, Sparkles, List, LayoutGrid, ChevronDown, ChevronUp, BarChart2,
  Building2, MapPin, Layers3, X, ExternalLink, Brain, AlertTriangle,
  CheckCircle2, TrendingDown, Lightbulb, RefreshCw, ArrowRight,
} from "lucide-react";
import {
  campaigns, leads, formatVal, campaignSourceColors, type Lead, type Campaign,
} from "../data/leadsData";
import { CampaignDetailPanel } from "../components/CampaignDetailPanel";
import { LeadDetailPanel } from "../components/LeadDetailPanel";

function scoreColor(score: number) {
  if (score >= 85) return "#16a34a";
  if (score >= 60) return "#d97706";
  return "#6b7280";
}

// C.1: Source badge
function SourceBadge({ source }: { source: string }) {
  const color = campaignSourceColors[source] ?? "#6b7280";
  const Icon = source === "Khối" ? Building2 : source === "Vùng" ? MapPin : Layers3;
  return (
    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: color + "18", color }}>
      <Icon size={10} /> {source}
    </span>
  );
}

// Status sort order
const STATUS_ORDER: Record<string, number> = { "Đang chạy": 0, "Chuẩn bị": 1, "Kết thúc": 2 };

// ── Mock data cho Campaign Tracking Table ─────────────────────────────────────
type TrackingRow = {
  region: string;
  khhh: { phatSinhBl: number; suyGiamBl: number; tiemNangDuNo: number; tiemNangBl: number; tiemNangTtqt: number; goiPhiLc: number; banGoiPhiTtr: number };
  khMoi: { phanBo: number; tiepCan: number; dongY: number; convert: number };
};

const TRACKING_DATA: Record<number, TrackingRow[]> = {
  1: [
    { region: "VÙNG 1", khhh: { phatSinhBl: 22, suyGiamBl: 2888, tiemNangDuNo: 4810, tiemNangBl: 768, tiemNangTtqt: 1636, goiPhiLc: 78, banGoiPhiTtr: 802 }, khMoi: { phanBo: 4187, tiepCan: 2179, dongY: 353, convert: 77 } },
    { region: "VÙNG 2", khhh: { phatSinhBl: 13, suyGiamBl: 2489, tiemNangDuNo: 3488, tiemNangBl: 494, tiemNangTtqt: 1229, goiPhiLc: 91, banGoiPhiTtr: 700 }, khMoi: { phanBo: 1120, tiepCan: 471, dongY: 57, convert: 15 } },
    { region: "VÙNG 3", khhh: { phatSinhBl: 11, suyGiamBl: 2179, tiemNangDuNo: 2778, tiemNangBl: 582, tiemNangTtqt: 998, goiPhiLc: 39, banGoiPhiTtr: 576 }, khMoi: { phanBo: 1210, tiepCan: 713, dongY: 198, convert: 21 } },
    { region: "VÙNG 4", khhh: { phatSinhBl: 3, suyGiamBl: 421, tiemNangDuNo: 764, tiemNangBl: 179, tiemNangTtqt: 106, goiPhiLc: 0, banGoiPhiTtr: 23 }, khMoi: { phanBo: 1183, tiepCan: 326, dongY: 69, convert: 9 } },
    { region: "VÙNG 5", khhh: { phatSinhBl: 4, suyGiamBl: 750, tiemNangDuNo: 1451, tiemNangBl: 300, tiemNangTtqt: 230, goiPhiLc: 4, banGoiPhiTtr: 82 }, khMoi: { phanBo: 1581, tiepCan: 630, dongY: 155, convert: 21 } },
    { region: "VÙNG 6", khhh: { phatSinhBl: 6, suyGiamBl: 1048, tiemNangDuNo: 1592, tiemNangBl: 499, tiemNangTtqt: 174, goiPhiLc: 4, banGoiPhiTtr: 40 }, khMoi: { phanBo: 2263, tiepCan: 915, dongY: 268, convert: 27 } },
    { region: "VÙNG 7", khhh: { phatSinhBl: 15, suyGiamBl: 838, tiemNangDuNo: 1314, tiemNangBl: 300, tiemNangTtqt: 499, goiPhiLc: 30, banGoiPhiTtr: 181 }, khMoi: { phanBo: 2090, tiepCan: 746, dongY: 133, convert: 18 } },
    { region: "VÙNG 8", khhh: { phatSinhBl: 19, suyGiamBl: 3430, tiemNangDuNo: 2871, tiemNangBl: 950, tiemNangTtqt: 1325, goiPhiLc: 64, banGoiPhiTtr: 815 }, khMoi: { phanBo: 4386, tiepCan: 1754, dongY: 208, convert: 65 } },
  ],
  2: [
    { region: "VÙNG 1", khhh: { phatSinhBl: 8, suyGiamBl: 1240, tiemNangDuNo: 2100, tiemNangBl: 380, tiemNangTtqt: 740, goiPhiLc: 22, banGoiPhiTtr: 310 }, khMoi: { phanBo: 1820, tiepCan: 920, dongY: 142, convert: 18 } },
    { region: "VÙNG 2", khhh: { phatSinhBl: 5, suyGiamBl: 890, tiemNangDuNo: 1450, tiemNangBl: 210, tiemNangTtqt: 560, goiPhiLc: 31, banGoiPhiTtr: 280 }, khMoi: { phanBo: 980, tiepCan: 412, dongY: 51, convert: 8 } },
    { region: "VÙNG 3", khhh: { phatSinhBl: 3, suyGiamBl: 720, tiemNangDuNo: 1120, tiemNangBl: 190, tiemNangTtqt: 390, goiPhiLc: 12, banGoiPhiTtr: 190 }, khMoi: { phanBo: 650, tiepCan: 280, dongY: 72, convert: 10 } },
    { region: "VÙNG 4", khhh: { phatSinhBl: 2, suyGiamBl: 310, tiemNangDuNo: 490, tiemNangBl: 80, tiemNangTtqt: 44, goiPhiLc: 0, banGoiPhiTtr: 12 }, khMoi: { phanBo: 420, tiepCan: 144, dongY: 29, convert: 4 } },
    { region: "VÙNG 5", khhh: { phatSinhBl: 1, suyGiamBl: 480, tiemNangDuNo: 680, tiemNangBl: 120, tiemNangTtqt: 95, goiPhiLc: 2, banGoiPhiTtr: 35 }, khMoi: { phanBo: 700, tiepCan: 290, dongY: 68, convert: 9 } },
  ],
  4: [
    { region: "VÙNG 1", khhh: { phatSinhBl: 35, suyGiamBl: 4200, tiemNangDuNo: 6100, tiemNangBl: 980, tiemNangTtqt: 2100, goiPhiLc: 110, banGoiPhiTtr: 940 }, khMoi: { phanBo: 5200, tiepCan: 3100, dongY: 520, convert: 110 } },
    { region: "VÙNG 2", khhh: { phatSinhBl: 18, suyGiamBl: 3100, tiemNangDuNo: 4200, tiemNangBl: 640, tiemNangTtqt: 1680, goiPhiLc: 120, banGoiPhiTtr: 820 }, khMoi: { phanBo: 2400, tiepCan: 1010, dongY: 120, convert: 32 } },
    { region: "VÙNG 3", khhh: { phatSinhBl: 14, suyGiamBl: 2800, tiemNangDuNo: 3600, tiemNangBl: 750, tiemNangTtqt: 1200, goiPhiLc: 52, banGoiPhiTtr: 690 }, khMoi: { phanBo: 1900, tiepCan: 1100, dongY: 310, convert: 42 } },
    { region: "VÙNG 4", khhh: { phatSinhBl: 4, suyGiamBl: 580, tiemNangDuNo: 920, tiemNangBl: 230, tiemNangTtqt: 140, goiPhiLc: 0, banGoiPhiTtr: 30 }, khMoi: { phanBo: 1500, tiepCan: 450, dongY: 90, convert: 14 } },
  ],
};

// ── Campaign Tracking Modal ────────────────────────────────────────────────────
function CampaignTrackingModal({ campaign, onClose }: { campaign: Campaign; onClose: () => void }) {
  const rows = TRACKING_DATA[campaign.id] ?? [];
  const total = rows.reduce(
    (acc, r) => ({
      khhh: {
        phatSinhBl: acc.khhh.phatSinhBl + r.khhh.phatSinhBl,
        suyGiamBl: acc.khhh.suyGiamBl + r.khhh.suyGiamBl,
        tiemNangDuNo: acc.khhh.tiemNangDuNo + r.khhh.tiemNangDuNo,
        tiemNangBl: acc.khhh.tiemNangBl + r.khhh.tiemNangBl,
        tiemNangTtqt: acc.khhh.tiemNangTtqt + r.khhh.tiemNangTtqt,
        goiPhiLc: acc.khhh.goiPhiLc + r.khhh.goiPhiLc,
        banGoiPhiTtr: acc.khhh.banGoiPhiTtr + r.khhh.banGoiPhiTtr,
      },
      khMoi: {
        phanBo: acc.khMoi.phanBo + r.khMoi.phanBo,
        tiepCan: acc.khMoi.tiepCan + r.khMoi.tiepCan,
        dongY: acc.khMoi.dongY + r.khMoi.dongY,
        convert: acc.khMoi.convert + r.khMoi.convert,
      },
    }),
    { khhh: { phatSinhBl: 0, suyGiamBl: 0, tiemNangDuNo: 0, tiemNangBl: 0, tiemNangTtqt: 0, goiPhiLc: 0, banGoiPhiTtr: 0 }, khMoi: { phanBo: 0, tiepCan: 0, dongY: 0, convert: 0 } }
  );
  const fmt = (n: number) => n === 0 ? "-" : n.toLocaleString("vi-VN");
  const pct = (a: number, b: number) => b > 0 ? `${((a / b) * 100).toFixed(1)}%` : "-";
  const thStyle: React.CSSProperties = { padding: "6px 10px", fontSize: 10, fontWeight: 600, color: "#fff", textAlign: "center", whiteSpace: "nowrap", border: "1px solid rgba(255,255,255,0.15)" };
  const tdStyle: React.CSSProperties = { padding: "5px 10px", fontSize: 11, textAlign: "center", border: "1px solid rgba(0,75,154,0.08)", color: "#374151" };
  const tdTotalStyle: React.CSSProperties = { ...tdStyle, fontWeight: 700, background: "#dbeafe", color: "#1e3a8a" };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)" }} onClick={onClose}>
      <div className="rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ background: "#fff", width: "min(95vw, 1080px)", maxHeight: "90vh", border: "1px solid rgba(0,75,154,0.15)" }} onClick={(e) => e.stopPropagation()}>
        <div className="px-5 py-4 flex items-center justify-between flex-shrink-0" style={{ background: "linear-gradient(135deg, #002d6e 0%, #004b9a 100%)" }}>
          <div>
            <p className="text-xs text-white/60 mb-0.5">Tình hình tiếp cận – Đồng ý – Convert</p>
            <h3 className="text-white text-sm font-semibold">{campaign.name}</h3>
            <div className="flex items-center gap-3 mt-1">
              <SourceBadge source={campaign.source} />
              <span className="text-xs text-white/60">{campaign.start} – {campaign.end}</span>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: campaign.statusColor + "33", color: "#fff", border: `1px solid ${campaign.statusColor}` }}>{campaign.status}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/20 transition-colors" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}><X size={14} /></button>
        </div>
        <div className="px-5 py-2 flex-shrink-0" style={{ background: "#eff6ff", borderBottom: "1px solid rgba(0,75,154,0.1)" }}>
          <p className="text-xs font-semibold" style={{ color: "#1e40af" }}>DRIVER Q1, Q2, KHHH cus360</p>
        </div>
        <div className="overflow-auto flex-1">
          {rows.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <p className="text-sm" style={{ color: "#9ca3af" }}>Chưa có dữ liệu theo dõi cho chiến dịch này</p>
            </div>
          ) : (
            <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 900 }}>
              <thead>
                <tr>
                  <th rowSpan={2} style={{ ...thStyle, background: "#1e3a8a", width: 90 }}>ETL_DT</th>
                  <th rowSpan={2} style={{ ...thStyle, background: "#1e3a8a", width: 100 }}>TÊN KHU VỰC</th>
                  <th colSpan={7} style={{ ...thStyle, background: "#1d4ed8" }}>KHHH</th>
                  <th colSpan={5} style={{ ...thStyle, background: "#0891b2" }}>KH MỚI Q1</th>
                </tr>
                <tr>
                  {["SLKH PHÁT SINH PHÍ BL", "SLKH SUY GIẢM PHÍ BL", "SLKH TIỀM NĂNG DƯ NỢ", "SLKH TIỀM NĂNG BL", "SLKH TIỀM NĂNG TTQT", "SLKH GÓI PHÍ LC", "SLKH BÁN GÓI PHÍ TTR"].map((h) => (
                    <th key={h} style={{ ...thStyle, background: "#2563eb", fontWeight: 500 }}>{h}</th>
                  ))}
                  {["SLKH PHÂN BỔ", "SLKH TIẾP CẬN", "SLKH ĐỒNG Ý", "SLKH CONVERT", "TỶ LỆ"].map((h) => (
                    <th key={h} style={{ ...thStyle, background: "#06b6d4", fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.region} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                    {i === 0 && <td rowSpan={rows.length} style={{ ...tdStyle, fontWeight: 600, color: "#1e3a8a", background: "#eff6ff", verticalAlign: "middle" }}>{campaign.start}/2026</td>}
                    <td style={{ ...tdStyle, fontWeight: 600, textAlign: "left", paddingLeft: 14 }}>{row.region}</td>
                    <td style={tdStyle}>{fmt(row.khhh.phatSinhBl)}</td>
                    <td style={tdStyle}>{fmt(row.khhh.suyGiamBl)}</td>
                    <td style={tdStyle}>{fmt(row.khhh.tiemNangDuNo)}</td>
                    <td style={tdStyle}>{fmt(row.khhh.tiemNangBl)}</td>
                    <td style={tdStyle}>{fmt(row.khhh.tiemNangTtqt)}</td>
                    <td style={tdStyle}>{fmt(row.khhh.goiPhiLc)}</td>
                    <td style={tdStyle}>{fmt(row.khhh.banGoiPhiTtr)}</td>
                    <td style={tdStyle}>{fmt(row.khMoi.phanBo)}</td>
                    <td style={tdStyle}>{fmt(row.khMoi.tiepCan)}</td>
                    <td style={tdStyle}>{fmt(row.khMoi.dongY)}</td>
                    <td style={{ ...tdStyle, fontWeight: 700, color: "#16a34a" }}>{fmt(row.khMoi.convert)}</td>
                    <td style={{ ...tdStyle, fontWeight: 600, color: "#d97706" }}>{pct(row.khMoi.convert, row.khMoi.phanBo)}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ ...tdTotalStyle, textAlign: "left", paddingLeft: 14 }}>{campaign.start}/2026 – Total</td>
                  <td style={tdTotalStyle}>{fmt(total.khhh.phatSinhBl)}</td>
                  <td style={tdTotalStyle}>{fmt(total.khhh.suyGiamBl)}</td>
                  <td style={tdTotalStyle}>{fmt(total.khhh.tiemNangDuNo)}</td>
                  <td style={tdTotalStyle}>{fmt(total.khhh.tiemNangBl)}</td>
                  <td style={tdTotalStyle}>{fmt(total.khhh.tiemNangTtqt)}</td>
                  <td style={tdTotalStyle}>{fmt(total.khhh.goiPhiLc)}</td>
                  <td style={tdTotalStyle}>{fmt(total.khhh.banGoiPhiTtr)}</td>
                  <td style={tdTotalStyle}>{fmt(total.khMoi.phanBo)}</td>
                  <td style={tdTotalStyle}>{fmt(total.khMoi.tiepCan)}</td>
                  <td style={tdTotalStyle}>{fmt(total.khMoi.dongY)}</td>
                  <td style={{ ...tdTotalStyle, color: "#16a34a" }}>{fmt(total.khMoi.convert)}</td>
                  <td style={{ ...tdTotalStyle, color: "#d97706" }}>{pct(total.khMoi.convert, total.khMoi.phanBo)}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// ── AI Insights Panel ─────────────────────────────────────────────────────────
const AI_INSIGHTS = [
  {
    id: 1,
    level: "warning",
    icon: AlertTriangle,
    iconColor: "#d97706",
    bg: "#fef3c7",
    border: "#fde68a",
    badge: "Cần xử lý",
    badgeBg: "#d97706",
    campaignId: 2,
    title: "Tỉ lệ convert thấp hơn benchmark",
    body: "CD \"Tiết kiệm Online\" có % Convert 12.7%, thấp hơn benchmark 15%. AI phát hiện 41 leads chưa được tiếp cận lần 2 – đây là nhóm có xác suất đồng ý cao nhất (dựa trên lịch sử tương tự Q1).",
    action: "Phân bổ lại leads",
    actionColor: "#d97706",
  },
  {
    id: 2,
    level: "forecast",
    icon: TrendingDown,
    iconColor: "#0891b2",
    bg: "#e0f2fe",
    border: "#bae6fd",
    badge: "Dự báo",
    badgeBg: "#0891b2",
    campaignId: 1,
    title: "Dự báo CD Vay nhà đến 30/06",
    body: "Nếu giữ tốc độ tiếp cận hiện tại (60%), CD \"Vay nhà T6\" dự kiến đạt 14–16% convert vào cuối tháng – dưới mục tiêu 20%. Cần tăng cường ~50 leads ưu tiên AI Score ≥80 để đạt KPI.",
    action: "Xem leads phù hợp",
    actionColor: "#0891b2",
  },
  {
    id: 3,
    level: "success",
    icon: CheckCircle2,
    iconColor: "#16a34a",
    bg: "#dcfce7",
    border: "#bbf7d0",
    badge: "Cơ hội",
    badgeBg: "#16a34a",
    campaignId: 4,
    title: "Nhân rộng strategy từ CD thẻ T5",
    body: "CD \"Cross-sell thẻ T5\" kết thúc với 21.4% convert – cao nhất hệ thống. AI nhận diện pattern: tỉ lệ thành công tăng 2.3× khi RM tiếp cận qua Zalo + gọi trong 48h sau SMS. Đề xuất áp dụng cho CD Q3.",
    action: "Tạo CD từ template",
    actionColor: "#16a34a",
  },
  {
    id: 4,
    level: "alert",
    icon: Lightbulb,
    iconColor: "#7c3aed",
    bg: "#ede9fe",
    border: "#ddd6fe",
    badge: "Gợi ý",
    badgeBg: "#7c3aed",
    campaignId: 3,
    title: "CD Tái gửi Q2 – cần bổ sung leads",
    body: "CD mới chỉ phân bổ 120/500 KH mục tiêu (24%). Còn 19 ngày thực thi. AI xác định 3 vùng đang dư leads (Vùng 1, 6, 8) có thể chuyển 200 KH KHHH phù hợp tiêu chí Diamond/Platinum.",
    action: "Phân bổ ngay",
    actionColor: "#7c3aed",
  },
];

function AiInsightsPanel() {
  const [dismissed, setDismissed] = useState<number[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const visible = AI_INSIGHTS.filter(i => !dismissed.includes(i.id));

  return (
    <div className="rounded-xl border mb-4 overflow-hidden" style={{ background: "#fff", borderColor: "rgba(124,58,237,0.2)" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:opacity-90 transition-opacity"
        style={{ background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 100%)", borderBottom: collapsed ? "none" : "1px solid rgba(124,58,237,0.15)" }}
        onClick={() => setCollapsed(v => !v)}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
            <Brain size={14} style={{ color: "#fff" }} />
          </div>
          <div>
            <span className="text-sm font-semibold text-white">AI Phân tích & Đề xuất quyết định</span>
            <span className="ml-2 text-xs text-white/60">Cập nhật 14:30 · {visible.length} insight</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>
            AI-powered
          </span>
          {collapsed ? <ChevronDown size={14} style={{ color: "rgba(255,255,255,0.7)" }} /> : <ChevronUp size={14} style={{ color: "rgba(255,255,255,0.7)" }} />}
        </div>
      </div>

      {!collapsed && (
        <div className="p-4">
          {visible.length === 0 ? (
            <div className="text-center py-4">
              <CheckCircle2 size={20} style={{ color: "#16a34a", margin: "0 auto 6px" }} />
              <p className="text-xs" style={{ color: "#6b7a95" }}>Tất cả insights đã được xử lý</p>
            </div>
          ) : (
            <div className="space-y-3">
              {visible.map((insight) => {
                const Icon = insight.icon;
                return (
                  <div
                    key={insight.id}
                    className="rounded-xl p-3.5 border"
                    style={{ background: insight.bg, borderColor: insight.border }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: insight.iconColor + "20" }}>
                        <Icon size={15} style={{ color: insight.iconColor }} />
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Title row */}
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span
                            className="text-xs px-1.5 py-0.5 rounded font-semibold"
                            style={{ background: insight.badgeBg, color: "#fff", fontSize: 10 }}
                          >
                            {insight.badge}
                          </span>
                          <span className="text-xs font-semibold" style={{ color: "#0d1b2a" }}>{insight.title}</span>
                        </div>

                        {/* Body */}
                        <p className="text-xs leading-relaxed mb-2.5" style={{ color: "#374151" }}>{insight.body}</p>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                            style={{ background: insight.actionColor, color: "#fff" }}
                          >
                            <ArrowRight size={10} /> {insight.action}
                          </button>
                          <button
                            onClick={() => setDismissed(d => [...d, insight.id])}
                            className="px-3 py-1.5 rounded-lg text-xs transition-all hover:bg-black/5"
                            style={{ color: "#9ca3af" }}
                          >
                            Bỏ qua
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => setDismissed(d => [...d, insight.id])}
                        className="p-1 rounded hover:bg-black/10 transition-colors flex-shrink-0"
                      >
                        <X size={12} style={{ color: "#9ca3af" }} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {dismissed.length > 0 && (
                <button
                  onClick={() => setDismissed([])}
                  className="flex items-center gap-1.5 text-xs mx-auto transition-colors hover:opacity-80"
                  style={{ color: "#7c3aed" }}
                >
                  <RefreshCw size={10} /> Khôi phục {dismissed.length} insight đã ẩn
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── C.3: Collapsible Campaign Dashboard ───────────────────────────────────────
function CampaignDashboard({ onShowTracking }: { onShowTracking: (c: Campaign) => void }) {
  const [collapsed, setCollapsed] = useState(false);

  const running = campaigns.filter(c => c.status === "Đang chạy");
  const totalAllocated = campaigns.reduce((acc, c) => acc + c.leads, 0);
  const avgContact = running.length > 0
    ? Math.round(running.reduce((acc, c) => acc + c.kpiResult.contactRate, 0) / running.length)
    : 0;
  const avgConvert = running.length > 0
    ? (running.reduce((acc, c) => acc + c.kpiResult.convertRate, 0) / running.length).toFixed(1)
    : 0;

  // Sorted: Đang chạy → Chuẩn bị → Kết thúc, then by convertRate desc within same status
  const sortedCampaigns = [...campaigns].sort((a, b) => {
    const statusDiff = (STATUS_ORDER[a.status] ?? 99) - (STATUS_ORDER[b.status] ?? 99);
    if (statusDiff !== 0) return statusDiff;
    return b.kpiResult.convertRate - a.kpiResult.convertRate;
  });

  const totalLoanGrowth = campaigns.reduce((acc, c) => acc + c.kpiResult.netLoanGrowth, 0);
  const totalCasa = campaigns.reduce((acc, c) => acc + c.kpiResult.netCasaGrowth, 0);
  const totalCkh = campaigns.reduce((acc, c) => acc + c.kpiResult.netCkhGrowth, 0);
  const totalFeeBl = campaigns.reduce((acc, c) => acc + c.kpiResult.feeBl, 0);
  const totalFeeT = campaigns.reduce((acc, c) => acc + c.kpiResult.feeTtqtFx, 0);

  return (
    <div className="rounded-xl border mb-4 overflow-hidden" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-blue-50/30 transition-colors"
        style={{ background: "#f8fafc", borderBottom: collapsed ? "none" : "1px solid rgba(0,75,154,0.08)" }}
        onClick={() => setCollapsed((v) => !v)}
      >
        <div className="flex items-center gap-2">
          <BarChart2 size={15} style={{ color: "#004b9a" }} />
          <span className="text-sm font-semibold" style={{ color: "#0d1b2a" }}>Tổng quan kết quả chiến dịch</span>
        </div>
        {collapsed ? <ChevronDown size={14} style={{ color: "#9ca3af" }} /> : <ChevronUp size={14} style={{ color: "#9ca3af" }} />}
      </div>

      {!collapsed && (
        <div className="p-4 space-y-4">
          {/* KPI Strip */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Tổng CD đang chạy", value: running.length, color: "#16a34a", bg: "#dcfce7" },
              { label: "Tổng leads phân bổ", value: totalAllocated, color: "#004b9a", bg: "#e8f0fb" },
              { label: "Avg % Tiếp cận", value: `${avgContact}%`, color: "#7c3aed", bg: "#ede9fe" },
              { label: "Avg % Convert", value: `${avgConvert}%`, color: "#d97706", bg: "#fef3c7" },
            ].map((kpi) => (
              <div key={kpi.label} className="p-2.5 rounded-xl border" style={{ borderColor: "rgba(0,75,154,0.08)", background: kpi.bg + "60" }}>
                <p className="text-lg font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
                <p className="text-xs" style={{ color: "#6b7a95" }}>{kpi.label}</p>
              </div>
            ))}
          </div>

          {/* ① Tổng hợp KPI – ĐƯA LÊN TRÊN */}
          <div>
            <p className="text-xs font-semibold mb-2" style={{ color: "#6b7a95" }}>Tổng hợp KPI – Tất cả chiến dịch</p>
            <div className="grid grid-cols-5 gap-2">
              {[
                { label: "Dư nợ tăng ròng", value: formatVal(totalLoanGrowth), color: "#004b9a" },
                { label: "CASA tăng ròng", value: formatVal(totalCasa), color: "#0891b2" },
                { label: "CKH/CCTG tăng", value: formatVal(totalCkh), color: "#7c3aed" },
                { label: "Phí BL", value: formatVal(totalFeeBl), color: "#d97706" },
                { label: "Phí TTQT + FX", value: formatVal(totalFeeT), color: "#16a34a" },
              ].map((agg) => (
                <div key={agg.label} className="text-center p-2.5 rounded-xl border" style={{ background: agg.color + "08", borderColor: agg.color + "20" }}>
                  <p className="text-sm font-bold" style={{ color: agg.color }}>{agg.value}</p>
                  <p className="text-xs" style={{ color: "#9ca3af" }}>{agg.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ② Danh sách chiến dịch theo thứ tự ưu tiên trạng thái */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-xs font-semibold" style={{ color: "#6b7a95" }}>Chiến dịch theo trạng thái</p>
              <span className="text-xs" style={{ color: "#9ca3af" }}>Đang chạy → Chuẩn bị → Kết thúc</span>
            </div>
            <div className="space-y-2">
              {sortedCampaigns.map((c) => {
                const isRunning = c.status === "Đang chạy";
                return (
                  <div
                    key={c.id}
                    className="flex items-center gap-2 p-2.5 rounded-xl"
                    style={{
                      background: isRunning ? "#f0fdf4" : "#f8fafc",
                      border: `1px solid ${isRunning ? "rgba(22,163,74,0.15)" : "rgba(0,75,154,0.07)"}`,
                    }}
                  >
                    {/* Status dot */}
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.statusColor }} />

                    <span className="text-xs flex-1 font-medium" style={{ color: "#0d1b2a" }}>{c.name}</span>
                    <SourceBadge source={c.source} />

                    {/* Status badge */}
                    <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: c.statusColor + "18", color: c.statusColor }}>
                      {c.status}
                    </span>

                    {/* Progress % tiếp cận */}
                    <div className="flex items-center gap-1.5 flex-shrink-0" style={{ minWidth: 120 }}>
                      <div className="h-1.5 rounded-full" style={{ background: "#e5e7eb", width: 60 }}>
                        <div className="h-full rounded-full" style={{ width: `${Math.min(c.kpiResult.contactRate, 100)}%`, background: "#7c3aed" }} />
                      </div>
                      <span className="text-xs" style={{ color: "#7c3aed" }}>{c.kpiResult.contactRate.toFixed(0)}% TC</span>
                    </div>

                    <span
                      className="text-xs font-bold flex-shrink-0 min-w-[52px] text-right"
                      style={{ color: c.kpiResult.convertRate > 15 ? "#16a34a" : c.kpiResult.convertRate > 0 ? "#d97706" : "#9ca3af" }}
                    >
                      {c.kpiResult.convertRate > 0 ? `${c.kpiResult.convertRate}% CV` : "–"}
                    </span>

                    <button
                      onClick={(e) => { e.stopPropagation(); onShowTracking(c); }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all hover:opacity-80 flex-shrink-0"
                      style={{ background: "#004b9a", color: "#fff" }}
                    >
                      <ExternalLink size={10} /> Chi tiết
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── C.2: 7 KPI columns row ─────────────────────────────────────────────────────
function KpiRow({ c }: { c: Campaign }) {
  const kpis = [
    { label: "Được phân bổ", value: c.leads.toString(), color: "#004b9a" },
    { label: "% Tiếp cận", value: `${c.kpiResult.contactRate.toFixed(1)}%`, color: c.kpiResult.contactRate >= 80 ? "#16a34a" : "#d97706" },
    { label: "% Convert", value: `${c.kpiResult.convertRate.toFixed(1)}%`, color: c.kpiResult.convertRate >= 15 ? "#16a34a" : c.kpiResult.convertRate > 0 ? "#d97706" : "#9ca3af" },
    { label: "Dư nợ TN", value: formatVal(c.kpiResult.netLoanGrowth), color: "#004b9a" },
    { label: "CASA TN", value: formatVal(c.kpiResult.netCasaGrowth), color: "#0891b2" },
    { label: "CKH TN", value: formatVal(c.kpiResult.netCkhGrowth), color: "#7c3aed" },
    { label: "Phí BL", value: formatVal(c.kpiResult.feeBl), color: "#d97706" },
    { label: "TTQT+FX", value: formatVal(c.kpiResult.feeTtqtFx), color: "#16a34a" },
  ];
  return (
    <div className="flex gap-2 mt-3 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }}>
      {kpis.map((k) => (
        <div key={k.label} className="flex-shrink-0 text-center px-2.5 py-1.5 rounded-lg" style={{ background: "#f8fafc", minWidth: 72 }}>
          <p className="text-xs font-bold" style={{ color: k.color }}>{k.value || "–"}</p>
          <p style={{ color: "#9ca3af", fontSize: 10 }}>{k.label}</p>
        </div>
      ))}
    </div>
  );
}

// ── Main CampaignsPage ─────────────────────────────────────────────────────────
export function CampaignsPage() {
  const [activeTab, setActiveTab] = useState<"campaigns" | "leadsByCampaign">("campaigns");
  const [sourceFilter, setSourceFilter] = useState<string>("Tất cả");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [trackingCampaign, setTrackingCampaign] = useState<Campaign | null>(null);

  const totalAllocated = campaigns.reduce((acc, c) => acc + c.leads, 0);
  const runningCount = campaigns.filter((c) => c.status === "Đang chạy").length;
  const filteredCampaigns = campaigns.filter((c) => sourceFilter === "Tất cả" || c.source === sourceFilter);

  const openLeadById = (leadId: number) => {
    const lead = leads.find((l) => l.id === leadId) ?? null;
    setSelectedCampaign(null);
    setSelectedLead(lead);
  };

  return (
    <div className="p-5 pb-16">
      {/* Header – đã bỏ nút Tạo chiến dịch mới */}
      <div className="mb-5">
        <h1 className="text-lg flex items-center gap-2" style={{ color: "#0d1b2a" }}>
          <Megaphone size={20} style={{ color: "#004b9a" }} />
          Chiến dịch
        </h1>
        <p className="text-xs mt-0.5" style={{ color: "#6b7a95" }}>
          Theo dõi tiến độ KPI và lead phát sinh từ các chiến dịch marketing
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: "Tổng chiến dịch", value: campaigns.length, icon: Megaphone, color: "#004b9a", bg: "#e8f0fb" },
          { label: "Đang chạy", value: runningCount, icon: TrendingUp, color: "#16a34a", bg: "#dcfce7" },
          { label: "Tổng được phân bổ", value: totalAllocated, icon: Users, color: "#7c3aed", bg: "#ede9fe" },
          { label: "Tổng chốt thành công", value: campaigns.reduce((a, c) => a + c.converted, 0), icon: Target, color: "#d97706", bg: "#fef3c7" },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="p-3 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: s.bg }}>
                  <Icon size={15} style={{ color: s.color }} />
                </div>
              </div>
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs" style={{ color: "#6b7a95" }}>{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {[
          { key: "campaigns", label: "Danh sách chiến dịch", icon: LayoutGrid },
          { key: "leadsByCampaign", label: "Leads theo chiến dịch", icon: List },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as "campaigns" | "leadsByCampaign")}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: activeTab === key ? "#004b9a" : "#fff",
              color: activeTab === key ? "#fff" : "#6b7a95",
              border: `1.5px solid ${activeTab === key ? "#004b9a" : "rgba(0,75,154,0.1)"}`,
            }}
          >
            <span className="flex items-center gap-1.5"><Icon size={14} /> {label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Campaign list */}
      {activeTab === "campaigns" && (
        <>
          {/* AI Insights Panel */}
          <AiInsightsPanel />

          {/* C.3: Collapsible Dashboard */}
          <CampaignDashboard onShowTracking={setTrackingCampaign} />

          {/* C.1: Source filter chips */}
          <div className="flex gap-2 mb-3 flex-wrap">
            {["Tất cả", "Khối", "Vùng", "3D"].map((src) => {
              const color = src === "Tất cả" ? "#6b7280" : campaignSourceColors[src];
              const isActive = sourceFilter === src;
              return (
                <button
                  key={src}
                  onClick={() => setSourceFilter(src)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background: isActive ? color : "#fff",
                    color: isActive ? "#fff" : color,
                    border: `1px solid ${isActive ? "transparent" : color + "40"}`,
                  }}
                >
                  {src}
                  {src !== "Tất cả" && <span className="ml-1.5 opacity-70">({campaigns.filter(c => c.source === src).length})</span>}
                </button>
              );
            })}
          </div>

          {/* Campaign cards */}
          <div className="space-y-3">
            {filteredCampaigns.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCampaign(c)}
                className="p-4 rounded-xl border transition-all hover:shadow-sm cursor-pointer"
                style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}
              >
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
                  </div>
                  <ChevronRight size={16} style={{ color: "#d1d5db", flexShrink: 0 }} />
                </div>
                <KpiRow c={c} />
                {c.status === "Đang chạy" && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1" style={{ color: "#9ca3af" }}>
                      <span>Tiến độ chiến dịch</span>
                      <span>{c.start} – còn {c.daysLeft} ngày</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: "#f1f5f9" }}>
                      <div className="h-full rounded-full" style={{ width: `${c.progressPct}%`, background: "#004b9a" }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Tab 2: Leads by campaign */}
      {activeTab === "leadsByCampaign" && (
        <div className="space-y-4">
          {campaigns.map((c) => {
            const campaignLeads = leads.filter((l) => l.campaignId === c.id);
            if (campaignLeads.length === 0) return null;
            return (
              <div key={c.id} className="rounded-xl border overflow-hidden" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
                <div
                  className="flex items-center gap-3 px-4 py-3 border-b cursor-pointer hover:bg-blue-50/40 transition-colors"
                  style={{ borderColor: "rgba(0,75,154,0.08)", background: "#f8fafc" }}
                  onClick={() => setSelectedCampaign(c)}
                >
                  <Megaphone size={14} style={{ color: "#004b9a" }} />
                  <span className="text-sm font-semibold flex-1" style={{ color: "#0d1b2a" }}>{c.name}</span>
                  <SourceBadge source={c.source} />
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: c.statusColor + "15", color: c.statusColor }}>{c.status}</span>
                  <span className="text-xs" style={{ color: "#9ca3af" }}>{campaignLeads.length} lead</span>
                  <ChevronRight size={14} style={{ color: "#9ca3af" }} />
                </div>
                <div className="divide-y" style={{ borderColor: "rgba(0,75,154,0.06)" }}>
                  {campaignLeads.map((l) => (
                    <div key={l.id} onClick={() => setSelectedLead(l)} className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-blue-50/50 transition-colors">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ background: l.avatarBg, fontSize: "11px" }}>{l.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-sm font-semibold" style={{ color: "#0d1b2a" }}>{l.name}</span>
                          {l.hot && <span className="flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-full" style={{ background: "#fef2f2", color: "#dc2626" }}><Flame size={9} /> HOT</span>}
                        </div>
                        <p className="text-xs truncate" style={{ color: "#6b7a95" }}>{l.product}</p>
                      </div>
                      <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: scoreColor(l.aiScore) + "15", color: scoreColor(l.aiScore) }}><Sparkles size={10} /> AI {l.aiScore}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: "#f1f5f9", color: "#6b7a95" }}>{l.stage}</span>
                      <span className="text-xs font-medium flex-shrink-0" style={{ color: "#d97706" }}>{formatVal(l.value)}</span>
                      <ChevronRight size={14} style={{ color: "#d1d5db", flexShrink: 0 }} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {(() => {
            const noCampaignLeads = leads.filter((l) => l.campaignId === null);
            if (noCampaignLeads.length === 0) return null;
            return (
              <div className="rounded-xl border overflow-hidden" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
                <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "rgba(0,75,154,0.08)", background: "#f8fafc" }}>
                  <Target size={14} style={{ color: "#6b7a95" }} />
                  <span className="text-sm font-semibold flex-1" style={{ color: "#0d1b2a" }}>Không thuộc chiến dịch</span>
                  <span className="text-xs" style={{ color: "#9ca3af" }}>{noCampaignLeads.length} lead</span>
                </div>
                <div className="divide-y" style={{ borderColor: "rgba(0,75,154,0.06)" }}>
                  {noCampaignLeads.map((l) => (
                    <div key={l.id} onClick={() => setSelectedLead(l)} className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-blue-50/50 transition-colors">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ background: l.avatarBg, fontSize: "11px" }}>{l.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold" style={{ color: "#0d1b2a" }}>{l.name}</span>
                        <p className="text-xs truncate" style={{ color: "#6b7a95" }}>{l.product}</p>
                      </div>
                      <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: scoreColor(l.aiScore) + "15", color: scoreColor(l.aiScore) }}><Sparkles size={10} /> AI {l.aiScore}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: "#f1f5f9", color: "#6b7a95" }}>{l.stage}</span>
                      <span className="text-xs font-medium flex-shrink-0" style={{ color: "#d97706" }}>{formatVal(l.value)}</span>
                      <ChevronRight size={14} style={{ color: "#d1d5db", flexShrink: 0 }} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Panels */}
      <CampaignDetailPanel campaign={selectedCampaign} onClose={() => setSelectedCampaign(null)} onSelectLead={openLeadById} />
      <LeadDetailPanel key={selectedLead?.id ?? "none"} lead={selectedLead} onClose={() => setSelectedLead(null)} />
      {trackingCampaign && <CampaignTrackingModal campaign={trackingCampaign} onClose={() => setTrackingCampaign(null)} />}
    </div>
  );
}
