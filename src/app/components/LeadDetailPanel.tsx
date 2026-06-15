import { useState } from "react";
import { X, Phone, Mail, Calendar, Sparkles, CheckCircle2, ArrowRight, Flame, Megaphone, Plus, MessageCircle, Clock, MessageSquare } from "lucide-react";
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

export function LeadDetailPanel({ lead, onClose }: Props) {
  const [called, setCalled] = useState(false);
  const [converted, setConverted] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "interactions">("overview");
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
            Lịch sử tiếp cận ({lead.interactions.length})
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 p-5 space-y-4 overflow-y-auto">
          {activeTab === "overview" ? (
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
