import { useState } from "react";
import { X, Phone, Mail, Calendar, Sparkles, CheckCircle2, ArrowRight, Flame, Megaphone, Plus, MessageCircle, Clock, MessageSquare, Star, ShieldCheck, TrendingUp, Banknote, CreditCard, Home, PiggyBank } from "lucide-react";
import {
  stages, stageColors, formatVal, getCampaign, type Lead, leadTypeColors,
  type InteractionResult, interactionResultLabels, interactionResultColors,
} from "../data/leadsData";
import { useCustomerModal } from "../context/CustomerModalContext";
import { usePipeline, type PipelineDeal } from "../context/PipelineContext";
import type { Customer } from "./CustomerModal";

interface Props {
  lead: Lead | null;
  onClose: () => void;
}

function scoreColor(score: number) {
  if (score >= 85) return "#16a34a";
  if (score >= 60) return "#d97706";
  return "#6b7280";
}

function leadToCustomer(lead: Lead): Customer {
  const campaign = getCampaign(lead.campaignId);
  return {
    id: 1000 + lead.id,
    name: lead.name,
    cif: `CIF0${50000 + lead.id}`,
    segment: lead.aiScore >= 90 ? "Platinum" : lead.aiScore >= 75 ? "Gold" : "Standard",
    segColor: lead.aiScore >= 90 ? "#0891b2" : lead.aiScore >= 75 ? "#d97706" : "#6b7280",
    product: lead.product,
    deadline: "Hôm nay",
    urgent: lead.aiScore >= 85,
    task: `Hoàn thiện hồ sơ ${lead.product}`,
    amount: lead.value.toLocaleString("vi-VN"),
    avatar: lead.avatar,
    avatarBg: lead.avatarBg,
    phone: lead.phone,
    email: lead.email,
    source: lead.source,
    campaignName: campaign?.name,
    aiScore: lead.aiScore,
    aiReason: lead.aiReason,
    productSuggestion: lead.productSuggestion,
    assignedDate: lead.assignedDate,
  };
}

function leadToDeal(lead: Lead): PipelineDeal {
  return {
    id: 1000 + lead.id,
    name: lead.name,
    product: lead.product,
    amount: lead.value,
    stage: stages[0],
    stageColor: stageColors[0],
    prob: Math.min(40, Math.round(lead.aiScore * 0.4)),
    dueDate: "Mới",
    avatar: lead.avatar,
    avatarBg: lead.avatarBg,
    customer: leadToCustomer(lead),
  };
}

function getInteractionIcon(type: string) {
  switch (type) {
    case "call": return <Phone size={12} />;
    case "zalo": return <MessageSquare size={12} />;
    case "email": return <Mail size={12} />;
    case "meeting": return <Clock size={12} />;
    case "note": return <Sparkles size={12} />;
    default: return <Calendar size={12} />;
  }
}

function getInteractionColor(type: string) {
  switch (type) {
    case "call": return "#0891b2";
    case "zalo": return "#06a94d";
    case "email": return "#004b9a";
    case "meeting": return "#16a34a";
    case "note": return "#7c3aed";
    default: return "#6b7280";
  }
}

function getInteractionLabel(type: string) {
  switch (type) {
    case "call": return "Gọi điện";
    case "zalo": return "Zalo";
    case "email": return "Email";
    case "meeting": return "Gặp mặt";
    case "note": return "Ghi chú";
    default: return type;
  }
}

// ── Tab: Sản phẩm gợi ý & Giao dịch ─────────────────────────────────────────
const PRODUCT_SUGGESTIONS = [
  { icon: CreditCard, color: "#7c3aed", bg: "#ede9fe", name: "Thẻ tín dụng Visa Platinum", match: 94, reason: "KH có thu nhập ổn định, chi tiêu online cao, phù hợp ưu đãi hoàn tiền 5%." },
  { icon: Home, color: "#0891b2", bg: "#e0f2fe", name: "Vay mua nhà ưu đãi 7.5%/năm", match: 82, reason: "Khả năng trả nợ tốt, tài sản đảm bảo đủ điều kiện vay tối đa 80% giá trị." },
  { icon: PiggyBank, color: "#16a34a", bg: "#dcfce7", name: "Tiết kiệm Online 6.8%/năm", match: 71, reason: "KH có lịch sử gửi tiết kiệm đều đặn, phù hợp kỳ hạn 12 tháng." },
  { icon: Banknote, color: "#d97706", bg: "#fef3c7", name: "Bảo hiểm An Sinh Toàn Diện", match: 65, reason: "Nhóm tuổi 30-45, chưa có bảo hiểm nhân thọ – rủi ro thiếu bảo vệ tài chính." },
];

const MOCK_TRANSACTIONS = [
  { date: "12/06/2025", type: "Chuyển khoản", amount: -2500000, balance: 48200000, status: "Thành công" },
  { date: "10/06/2025", type: "Tiết kiệm tự động", amount: -5000000, balance: 50700000, status: "Thành công" },
  { date: "08/06/2025", type: "Nhận lương", amount: 25000000, balance: 55700000, status: "Thành công" },
  { date: "05/06/2025", type: "Thanh toán thẻ", amount: -1800000, balance: 30700000, status: "Thành công" },
  { date: "01/06/2025", type: "Phí dịch vụ", amount: -50000, balance: 32500000, status: "Thành công" },
];

function ProductsTab({ lead }: { lead: Lead }) {
  return (
    <div className="space-y-4">
      {/* AI gợi ý sản phẩm */}
      <div className="rounded-xl p-4 border" style={{ background: "linear-gradient(135deg, #fffbeb 0%, #fef9ec 100%)", borderColor: "#fde68a" }}>
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles size={13} style={{ color: "#92400e" }} />
          <p className="text-xs font-semibold" style={{ color: "#92400e" }}>AI gợi ý sản phẩm phù hợp nhất</p>
          <span className="ml-auto text-xs px-1.5 py-0.5 rounded" style={{ background: "#92400e20", color: "#92400e" }}>AI Score {lead.aiScore}</span>
        </div>
        <p className="text-sm font-semibold mb-1" style={{ color: "#78350f" }}>{lead.productSuggestion}</p>
        <p className="text-xs leading-relaxed" style={{ color: "#92400e" }}>{lead.aiReason}</p>
      </div>

      {/* Danh sách gợi ý */}
      <div className="space-y-2.5">
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Sản phẩm phù hợp ({PRODUCT_SUGGESTIONS.length})</p>
        {PRODUCT_SUGGESTIONS.map((p, i) => {
          const Icon = p.icon;
          return (
            <div key={i} className="rounded-xl p-3.5 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: p.bg }}>
                  <Icon size={16} style={{ color: p.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>{p.name}</p>
                    <span className="text-xs font-bold flex-shrink-0" style={{ color: p.match >= 85 ? "#16a34a" : p.match >= 70 ? "#d97706" : "#6b7280" }}>
                      {p.match}% phù hợp
                    </span>
                  </div>
                  {/* Match bar */}
                  <div className="h-1 rounded-full mb-2" style={{ background: "#e5e7eb" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${p.match}%`, background: p.match >= 85 ? "#16a34a" : p.match >= 70 ? "#d97706" : "#9ca3af" }} />
                  </div>
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{p.reason}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 py-1.5 rounded-lg text-xs font-medium hover:opacity-90" style={{ background: p.color, color: "#fff" }}>
                  Tư vấn ngay
                </button>
                <button className="px-3 py-1.5 rounded-lg text-xs border hover:bg-gray-50" style={{ color: p.color, borderColor: p.color + "40" }}>
                  Xem chi tiết
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lịch sử giao dịch */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide mb-2.5" style={{ color: "var(--muted-foreground)" }}>Giao dịch gần đây</p>
        <div className="rounded-xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
          {MOCK_TRANSACTIONS.map((tx, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: i < MOCK_TRANSACTIONS.length - 1 ? "1px solid var(--border)" : "none" }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: tx.amount > 0 ? "#dcfce7" : "#f1f5f9" }}
              >
                {tx.amount > 0
                  ? <TrendingUp size={13} style={{ color: "#16a34a" }} />
                  : <Banknote size={13} style={{ color: "#6b7280" }} />
                }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>{tx.type}</p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{tx.date}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs font-semibold" style={{ color: tx.amount > 0 ? "#16a34a" : "#0d1b2a" }}>
                  {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString("vi-VN")}đ
                </p>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  Số dư: {tx.balance.toLocaleString("vi-VN")}đ
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Tab: Đánh giá (dual rating) ────────────────────────────────────────────────
const SYSTEM_CRITERIA = [
  { label: "Tiềm năng tài chính", score: 88, color: "#16a34a" },
  { label: "Mức độ tương tác", score: 72, color: "#0891b2" },
  { label: "Ý định mua hàng", score: 85, color: "#7c3aed" },
  { label: "Rủi ro tín dụng", score: 91, color: "#16a34a" },
  { label: "Độ trung thành", score: 65, color: "#d97706" },
];

function RatingTab({ lead }: { lead: Lead }) {
  const [customerStars, setCustomerStars] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [customerNote, setCustomerNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const systemAvg = Math.round(SYSTEM_CRITERIA.reduce((a, c) => a + c.score, 0) / SYSTEM_CRITERIA.length);

  return (
    <div className="space-y-4">
      {/* System score */}
      <div className="rounded-xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#e8f0fb" }}>
            <ShieldCheck size={14} style={{ color: "#004b9a" }} />
          </div>
          <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>Điểm hệ thống AI</p>
          <span className="ml-auto text-2xl font-black" style={{ color: systemAvg >= 85 ? "#16a34a" : systemAvg >= 65 ? "#d97706" : "#dc2626" }}>{lead.aiScore}</span>
        </div>
        <div className="space-y-3">
          {SYSTEM_CRITERIA.map((c) => (
            <div key={c.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{c.label}</span>
                <span className="text-xs font-semibold" style={{ color: c.color }}>{c.score}/100</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: "#e5e7eb" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${c.score}%`, background: c.color }} />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs mt-3 px-3 py-2 rounded-lg" style={{ background: "#f0f9ff", color: "#0891b2" }}>
          <Sparkles size={10} style={{ display: "inline", marginRight: 4 }} />
          AI nhận định: {lead.aiScore >= 85 ? "Lead chất lượng cao, ưu tiên xử lý ngay" : lead.aiScore >= 70 ? "Lead tiềm năng tốt, cần nuôi dưỡng thêm" : "Cần thêm thông tin để đánh giá chính xác"}
        </p>
      </div>

      {/* Customer self-rating */}
      <div className="rounded-xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: "#fef3c7" }}>
            <Star size={13} style={{ color: "#d97706" }} />
          </div>
          <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>KH tự chấm điểm trải nghiệm</p>
        </div>

        {!submitted ? (
          <>
            <p className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>Ghi nhận mức độ hài lòng của khách hàng với dịch vụ tư vấn:</p>
            {/* Stars */}
            <div className="flex items-center gap-2 mb-3">
              {[1, 2, 3, 4, 5].map(s => (
                <button
                  key={s}
                  onMouseEnter={() => setHoverStar(s)}
                  onMouseLeave={() => setHoverStar(0)}
                  onClick={() => setCustomerStars(s)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={28}
                    fill={(hoverStar || customerStars) >= s ? "#f59e0b" : "none"}
                    style={{ color: (hoverStar || customerStars) >= s ? "#f59e0b" : "#d1d5db" }}
                  />
                </button>
              ))}
              {customerStars > 0 && (
                <span className="text-xs ml-1 font-medium" style={{ color: "#d97706" }}>
                  {["", "Rất kém", "Kém", "Trung bình", "Tốt", "Xuất sắc"][customerStars]}
                </span>
              )}
            </div>
            {/* Feedback note */}
            <textarea
              placeholder="Ghi nhận phản hồi của khách hàng..."
              value={customerNote}
              onChange={e => setCustomerNote(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-lg text-xs border resize-none mb-2"
              style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}
            />
            <button
              onClick={() => { if (customerStars > 0) setSubmitted(true); }}
              disabled={customerStars === 0}
              className="w-full py-2 rounded-xl text-xs font-medium transition-all hover:opacity-90 disabled:opacity-40"
              style={{ background: "#004b9a", color: "#fff" }}
            >
              Lưu đánh giá KH
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center py-4">
            <CheckCircle2 size={28} style={{ color: "#16a34a", marginBottom: 8 }} />
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} size={18} fill={customerStars >= s ? "#f59e0b" : "none"} style={{ color: customerStars >= s ? "#f59e0b" : "#d1d5db" }} />
              ))}
            </div>
            <p className="text-xs font-semibold" style={{ color: "#16a34a" }}>Đã lưu đánh giá {customerStars}/5 sao</p>
            {customerNote && <p className="text-xs mt-1 text-center" style={{ color: "var(--muted-foreground)" }}>"{customerNote}"</p>}
            <button onClick={() => setSubmitted(false)} className="mt-2 text-xs" style={{ color: "var(--primary)" }}>Chỉnh sửa</button>
          </div>
        )}
      </div>

      {/* Rating comparison */}
      <div className="rounded-xl p-4 border" style={{ background: "#f8fafc", borderColor: "rgba(0,75,154,0.1)" }}>
        <p className="text-xs font-semibold mb-3" style={{ color: "var(--foreground)" }}>So sánh đánh giá</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Hệ thống AI", value: lead.aiScore, max: 100, unit: "điểm", color: "#004b9a" },
            { label: "KH tự chấm", value: customerStars * 20, max: 100, unit: `${customerStars || "–"}/5 sao`, color: "#d97706" },
          ].map(item => (
            <div key={item.label} className="p-3 rounded-xl" style={{ background: "#fff", border: "1px solid rgba(0,75,154,0.1)" }}>
              <p className="text-xs mb-1" style={{ color: "var(--muted-foreground)" }}>{item.label}</p>
              <p className="text-xl font-black" style={{ color: item.color }}>{item.unit}</p>
              <div className="h-1.5 rounded-full mt-2" style={{ background: "#e5e7eb" }}>
                <div className="h-full rounded-full" style={{ width: `${item.value}%`, background: item.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LeadDetailPanel({ lead, onClose }: Props) {
  const [called, setCalled] = useState(false);
  const [converted, setConverted] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "interactions" | "products" | "rating">("overview");
  const [newInteractionType, setNewInteractionType] = useState("call");
  const [newInteractionNote, setNewInteractionNote] = useState("");
  const [newInteractionResult, setNewInteractionResult] = useState<InteractionResult>("success");
  const openCustomer = useCustomerModal();
  const { addDeal } = usePipeline();

  if (!lead) return null;

  const campaign = getCampaign(lead.campaignId);

  const handleConvert = () => {
    setConverted(true);
    addDeal(leadToDeal(lead));
    openCustomer(leadToCustomer(lead));
  };

  const handleAddInteraction = () => {
    if (newInteractionNote.trim()) {
      setNewInteractionNote("");
      setNewInteractionResult("success");
      setNewInteractionType("call");
      alert("Thêm tiếp cận thành công!");
    }
  };

  const sortedInteractions = [...lead.interactions].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)" }}
      onClick={onClose}
    >
      <div
        className="h-full overflow-y-auto shadow-2xl flex flex-col"
        style={{ width: "min(420px, 95vw)", background: "var(--background)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header banner */}
        <div
          className="px-5 pt-5 pb-4 flex-shrink-0"
          style={{ background: `linear-gradient(135deg, var(--acb-sidebar) 0%, var(--acb-blue) 100%)` }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0 border-2 border-white/30"
              style={{ background: lead.avatarBg }}
            >
              {lead.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-white text-base">{lead.name}</h2>
                {lead.hot && (
                  <span className="flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-full" style={{ background: "rgba(220,38,38,0.25)", color: "#fecaca" }}>
                    <Flame size={10} /> HOT
                  </span>
                )}
              </div>
              <p className="text-white/70 text-xs mt-0.5">
                {lead.source}{campaign ? ` · ${campaign.name}` : ""}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg transition-all hover:bg-white/20 flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
            >
              <X size={14} />
            </button>
          </div>

          {/* AI Score */}
          <div className="mt-4 flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div
              className="w-14 h-14 rounded-full flex flex-col items-center justify-center flex-shrink-0 border-2"
              style={{ borderColor: scoreColor(lead.aiScore) }}
            >
              <span className="text-lg font-bold text-white leading-none">{lead.aiScore}</span>
            </div>
            <div className="flex-1">
              <p className="text-white text-xs font-semibold flex items-center gap-1">
                <Sparkles size={11} className="text-violet-300" /> AI Lead Score
              </p>
              <p className="text-white/60 text-xs mt-0.5">
                {lead.aiScore >= 85 ? "Khả năng chuyển đổi rất cao" : lead.aiScore >= 60 ? "Khả năng chuyển đổi trung bình" : "Cần nuôi dưỡng thêm"}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 px-5 pt-3 flex-shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
          <button
            onClick={() => setActiveTab("overview")}
            className="px-4 py-2.5 text-xs font-medium transition-all"
            style={{
              color: activeTab === "overview" ? "var(--primary)" : "var(--muted-foreground)",
              borderBottom: activeTab === "overview" ? "2px solid var(--primary)" : "none",
              marginBottom: "-1px",
            }}
          >
            Thông tin
          </button>
          <button
            onClick={() => setActiveTab("interactions")}
            className="px-4 py-2.5 text-xs font-medium transition-all flex items-center gap-1"
            style={{
              color: activeTab === "interactions" ? "var(--primary)" : "var(--muted-foreground)",
              borderBottom: activeTab === "interactions" ? "2px solid var(--primary)" : "none",
              marginBottom: "-1px",
            }}
          >
            <Clock size={11} />
            Lịch sử ({lead.interactions.length})
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className="px-4 py-2.5 text-xs font-medium transition-all flex items-center gap-1"
            style={{
              color: activeTab === "products" ? "var(--primary)" : "var(--muted-foreground)",
              borderBottom: activeTab === "products" ? "2px solid var(--primary)" : "none",
              marginBottom: "-1px",
            }}
          >
            <Sparkles size={11} />
            Sản phẩm & GD
          </button>
          <button
            onClick={() => setActiveTab("rating")}
            className="px-4 py-2.5 text-xs font-medium transition-all flex items-center gap-1"
            style={{
              color: activeTab === "rating" ? "var(--primary)" : "var(--muted-foreground)",
              borderBottom: activeTab === "rating" ? "2px solid var(--primary)" : "none",
              marginBottom: "-1px",
            }}
          >
            <Star size={11} />
            Đánh giá
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          {activeTab === "products" ? (
            <ProductsTab lead={lead} />
          ) : activeTab === "rating" ? (
            <RatingTab lead={lead} />
          ) : activeTab === "overview" ? (
            <>
              {/* AI suggestion */}
              <div className="rounded-xl p-4 border" style={{ background: "#fffbeb", borderColor: "#fde68a" }}>
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles size={13} style={{ color: "#92400e" }} />
                  <p className="text-xs font-semibold" style={{ color: "#92400e" }}>AI gợi ý sản phẩm</p>
                </div>
                <p className="text-sm font-medium mb-1" style={{ color: "#78350f" }}>{lead.productSuggestion}</p>
                <p className="text-xs" style={{ color: "#92400e" }}>{lead.aiReason}</p>
              </div>

              {/* Lead type */}
              <div className="rounded-xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted-foreground)" }}>
                  Loại Lead
                </p>
                <span
                  className="inline-block text-xs px-2 py-1 rounded-lg font-medium"
                  style={{ background: leadTypeColors[lead.leadType] + "15", color: leadTypeColors[lead.leadType] }}
                >
                  {lead.leadType}
                </span>
              </div>

              {/* Contact info */}
              <div className="rounded-xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>
                  Thông tin liên hệ
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone size={13} style={{ color: "var(--primary)" }} />
                    <span className="text-xs" style={{ color: "var(--foreground)" }}>{lead.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={13} style={{ color: "var(--primary)" }} />
                    <span className="text-xs" style={{ color: "var(--foreground)" }}>{lead.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={13} style={{ color: "var(--primary)" }} />
                    <span className="text-xs" style={{ color: "var(--foreground)" }}>Tiếp nhận ngày {lead.assignedDate}</span>
                  </div>
                  {campaign && (
                    <div className="flex items-center gap-2">
                      <Megaphone size={13} style={{ color: "var(--primary)" }} />
                      <span className="text-xs" style={{ color: "var(--foreground)" }}>Từ chiến dịch: {campaign.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Deal info */}
              <div className="rounded-xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>
                    Thông tin deal
                  </p>
                  <span className="text-sm font-bold" style={{ color: "#d97706" }}>{formatVal(lead.value)}</span>
                </div>
                <p className="text-xs mb-3" style={{ color: "#004b9a" }}>{lead.product}</p>
                <div className="flex items-center gap-1 mb-2">
                  {stages.map((s, i) => (
                    <div
                      key={s}
                      className="flex-1 h-1.5 rounded-full transition-all"
                      style={{ background: i <= lead.stageIdx ? stageColors[lead.stageIdx] : "#e5e7eb" }}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs" style={{ color: "var(--muted-foreground)" }}>
                  <span>{lead.stage}</span>
                  <span>Bước {lead.stageIdx + 1}/{stages.length}</span>
                </div>
              </div>

              {/* Convert success */}
              {converted && (
                <div className="rounded-xl p-4 border flex items-start gap-2" style={{ background: "#dcfce7", borderColor: "#bbf7d0" }}>
                  <CheckCircle2 size={16} style={{ color: "#16a34a", flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "#16a34a" }}>Đã chuyển thành khách hàng</p>
                    <p className="text-xs mt-0.5" style={{ color: "#15803d" }}>
                      Deal mới đã được tạo tại giai đoạn "Tiếp cận" trong Sales Pipeline.
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Timeline - B.4 Lịch sử tiếp cận */}
              <div className="space-y-3">
                {sortedInteractions.length > 0 ? (
                  sortedInteractions.map((interaction, idx) => (
                    <div key={interaction.id} className="relative">
                      {idx < sortedInteractions.length - 1 && (
                        <div className="absolute left-5 top-9 w-0.5 h-6" style={{ background: "#e5e7eb" }} />
                      )}
                      <div className="flex gap-3">
                        <div className="flex flex-col items-center flex-shrink-0 pt-0.5">
                          <div
                            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-white"
                            style={{ background: getInteractionColor(interaction.type), color: "#fff" }}
                          >
                            {getInteractionIcon(interaction.type)}
                          </div>
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="rounded-xl p-3" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className="text-xs px-1.5 py-0.5 rounded font-medium"
                                  style={{ background: getInteractionColor(interaction.type) + "15", color: getInteractionColor(interaction.type) }}
                                >
                                  {getInteractionLabel(interaction.type)}
                                </span>
                                <p className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
                                  {interaction.title}
                                </p>
                              </div>
                              <span className="text-xs flex-shrink-0" style={{ color: "var(--muted-foreground)" }}>
                                {new Date(interaction.date).toLocaleDateString("vi-VN")}
                              </span>
                            </div>
                            <p className="text-xs mb-2" style={{ color: "var(--muted-foreground)" }}>
                              {interaction.description}
                            </p>
                            {interaction.result && (
                              <span
                                className="text-xs px-2 py-0.5 rounded-full font-medium"
                                style={{
                                  background: interactionResultColors[interaction.result] + "15",
                                  color: interactionResultColors[interaction.result],
                                }}
                              >
                                {interactionResultLabels[interaction.result]}
                              </span>
                            )}
                            {interaction.duration && (
                              <p className="text-xs mt-1" style={{ color: getInteractionColor(interaction.type) }}>
                                Thời lượng: {interaction.duration} phút
                              </p>
                            )}
                            {interaction.nextSteps && (
                              <div className="mt-2 p-2 rounded-lg" style={{ background: "#f1f5f9" }}>
                                <p className="text-xs font-semibold mb-1" style={{ color: "var(--foreground)" }}>Bước tiếp theo:</p>
                                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{interaction.nextSteps}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <MessageCircle size={24} style={{ color: "#d1d5db", margin: "0 auto 8px" }} />
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Chưa có lịch sử tiếp cận</p>
                  </div>
                )}
              </div>

              {/* B.4: Add interaction form */}
              <div className="rounded-xl p-4 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>
                  + Thêm tiếp cận
                </p>
                <div className="space-y-2">
                  {/* Loại tiếp cận */}
                  <div className="flex gap-1.5 flex-wrap">
                    {[
                      { value: "call", label: "Gọi", color: "#0891b2" },
                      { value: "zalo", label: "Zalo", color: "#06a94d" },
                      { value: "meeting", label: "Gặp", color: "#16a34a" },
                      { value: "email", label: "Email", color: "#004b9a" },
                    ].map((t) => (
                      <button
                        key={t.value}
                        onClick={() => setNewInteractionType(t.value)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={{
                          background: newInteractionType === t.value ? t.color : t.color + "10",
                          color: newInteractionType === t.value ? "#fff" : t.color,
                          border: `1px solid ${t.color}30`,
                        }}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {/* Kết quả tiếp cận */}
                  <select
                    value={newInteractionResult}
                    onChange={(e) => setNewInteractionResult(e.target.value as InteractionResult)}
                    className="w-full px-3 py-1.5 rounded-lg text-xs border"
                    style={{ background: "var(--background)", borderColor: "var(--border)", color: interactionResultColors[newInteractionResult] }}
                  >
                    <option value="success">✓ Thành công – KH quan tâm, hẹn gặp</option>
                    <option value="callback">↩ KH hẹn lại – bận, hẹn lại sau</option>
                    <option value="rejected">✕ KH từ chối – không quan tâm</option>
                    <option value="no_answer">– Không liên lạc được</option>
                  </select>

                  {/* Ghi chú */}
                  <textarea
                    placeholder="Ghi chú nội dung tiếp cận..."
                    value={newInteractionNote}
                    onChange={(e) => setNewInteractionNote(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-1.5 rounded-lg text-xs border resize-none"
                    style={{ background: "var(--background)", borderColor: "var(--border)" }}
                  />
                  <button
                    onClick={handleAddInteraction}
                    className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all hover:opacity-90"
                    style={{ background: "#004b9a", color: "#fff" }}
                  >
                    <Plus size={12} /> Lưu tiếp cận
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        {activeTab === "overview" && (
          <div className="p-5 pt-0 space-y-2 flex-shrink-0">
            <button
              onClick={() => setCalled(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90"
              style={{
                background: called ? "#dcfce7" : "linear-gradient(135deg, #92400e 0%, #d97706 100%)",
                color: called ? "#16a34a" : "#fff",
              }}
            >
              <Phone size={14} /> {called ? "Đã gọi cho khách hàng" : "Gọi ngay"}
            </button>
            {called && !converted && (
              <button
                onClick={handleConvert}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #002d6e 0%, #004b9a 100%)", color: "#fff" }}
              >
                <ArrowRight size={14} /> Chuyển thành khách hàng
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
