import { X, Calendar, Users, Target, TrendingUp, Wallet, ChevronRight, Flame, Sparkles, Medal, Trophy } from "lucide-react";
import { leads, campaigns, formatVal, type Campaign } from "../data/leadsData";

interface Props {
  campaign: Campaign | null;
  onClose: () => void;
  onSelectLead: (leadId: number) => void;
}

function KpiBlock({
  icon: Icon, label, value, target, color, bg, suffix = "",
}: {
  icon: any; label: string; value: number; target: number; color: string; bg: string; suffix?: string;
}) {
  const pct = Math.min(Math.round((value / target) * 100), 100);
  return (
    <div className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <div className="flex items-center justify-between mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: bg }}>
          <Icon size={14} style={{ color }} />
        </div>
        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{pct}% mục tiêu</span>
      </div>
      <p className="text-lg font-bold" style={{ color }}>
        {value.toLocaleString("vi-VN")}{suffix}
        <span className="text-xs font-normal ml-1" style={{ color: "var(--muted-foreground)" }}>
          / {target.toLocaleString("vi-VN")}{suffix}
        </span>
      </p>
      <p className="text-xs mb-2" style={{ color: "var(--muted-foreground)" }}>{label}</p>
      <div className="h-1.5 rounded-full" style={{ background: "var(--muted)" }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export function CampaignDetailPanel({ campaign, onClose, onSelectLead }: Props) {
  if (!campaign) return null;

  const campaignLeads = leads.filter((l) => l.campaignId === campaign.id);
  const convRate = campaign.leads > 0 ? Math.round((campaign.converted / campaign.leads) * 100) : 0;
  const convTargetRate = campaign.leadsTarget > 0 ? Math.round((campaign.convertedTarget / campaign.leadsTarget) * 100) : 0;
  const budgetPct = campaign.budget > 0 ? Math.round((campaign.spent / campaign.budget) * 100) : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)" }}
      onClick={onClose}
    >
      <div
        className="relative rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{ background: "var(--background)", width: "min(720px, 95vw)", maxHeight: "88vh", border: "1px solid var(--border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-5 pt-5 pb-4"
          style={{ background: `linear-gradient(135deg, var(--acb-sidebar) 0%, var(--acb-blue) 100%)` }}
        >
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>
              <Target size={20} style={{ color: "#fff" }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-white text-base">{campaign.name}</h2>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: campaign.statusColor + "33", color: "#fff", border: `1px solid ${campaign.statusColor}` }}
                >
                  {campaign.status}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-white/70">
                <span>{campaign.type}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Calendar size={11} /> {campaign.start} – {campaign.end}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg transition-all hover:bg-white/20 flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
            >
              <X size={14} />
            </button>
          </div>

          {/* Progress vs time */}
          {campaign.status === "Đang chạy" && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs mb-1 text-white/70">
                <span>Tiến độ thời gian chiến dịch</span>
                <span>còn {campaign.daysLeft} ngày</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }}>
                <div className="h-full rounded-full" style={{ width: `${campaign.progressPct}%`, background: "#f97316" }} />
              </div>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* KPIs vs target */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted-foreground)" }}>
              KPI so với mục tiêu
            </p>
            <div className="grid grid-cols-3 gap-3">
              <KpiBlock icon={Users} label="Tiếp cận" value={campaign.reach} target={campaign.reachTarget} color="#004b9a" bg="#e8f0fb" />
              <KpiBlock icon={Target} label="Lead thu được" value={campaign.leads} target={campaign.leadsTarget} color="#d97706" bg="#fef3c7" />
              <KpiBlock icon={TrendingUp} label="Chốt thành công" value={campaign.converted} target={campaign.convertedTarget} color="#16a34a" bg="#dcfce7" />
            </div>
          </div>

          {/* Conversion + budget */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted-foreground)" }}>
                Tỷ lệ chuyển đổi
              </p>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-xl font-bold" style={{ color: convRate >= convTargetRate ? "#16a34a" : "#d97706" }}>{convRate}%</span>
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>mục tiêu {convTargetRate}%</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: "var(--muted)" }}>
                <div className="h-full rounded-full" style={{ width: `${Math.min(convRate, 100)}%`, background: convRate >= convTargetRate ? "#16a34a" : "#d97706" }} />
              </div>
            </div>
            <div className="rounded-xl p-3 border" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
              <p className="text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1" style={{ color: "var(--muted-foreground)" }}>
                <Wallet size={12} /> Ngân sách đã dùng
              </p>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-xl font-bold" style={{ color: "#004b9a" }}>{formatVal(campaign.spent)}</span>
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>/ {formatVal(campaign.budget)}</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: "var(--muted)" }}>
                <div className="h-full rounded-full" style={{ width: `${Math.min(budgetPct, 100)}%`, background: "#004b9a" }} />
              </div>
            </div>
          </div>

          {/* Campaign ranking vs all campaigns */}
          {(() => {
            const ranked = [...campaigns]
              .filter(c => c.converted > 0 || c.leads > 0)
              .sort((a, b) => b.kpiResult.convertRate - a.kpiResult.convertRate);
            const rankIdx = ranked.findIndex(c => c.id === campaign.id);
            const rankPos = rankIdx + 1;
            const total = ranked.length;
            const topPct = total > 0 ? Math.round((rankPos / total) * 100) : 0;

            const RANK_METRICS = [
              {
                label: "Xếp hạng % Convert",
                rank: rankPos,
                total,
                value: `${campaign.kpiResult.convertRate}%`,
                color: rankPos === 1 ? "#d97706" : rankPos <= 3 ? "#0891b2" : "#6b7280",
              },
              {
                label: "Xếp hạng Leads phân bổ",
                rank: [...campaigns].sort((a, b) => b.leads - a.leads).findIndex(c => c.id === campaign.id) + 1,
                total,
                value: campaign.leads.toLocaleString("vi-VN"),
                color: "#004b9a",
              },
              {
                label: "Xếp hạng Doanh số",
                rank: [...campaigns].sort((a, b) => b.kpiResult.netLoanGrowth - a.kpiResult.netLoanGrowth).findIndex(c => c.id === campaign.id) + 1,
                total,
                value: formatVal(campaign.kpiResult.netLoanGrowth),
                color: "#16a34a",
              },
            ];

            return (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1.5" style={{ color: "var(--muted-foreground)" }}>
                  <Trophy size={12} /> Xếp hạng chiến dịch
                </p>
                <div className="rounded-xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                  {/* Top badge */}
                  <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: "var(--border)", background: rankPos === 1 ? "#fef3c7" : rankPos <= 3 ? "#e0f2fe" : "#f8fafc" }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: rankPos === 1 ? "#d97706" : rankPos <= 3 ? "#0891b2" : "#6b7280", color: "#fff" }}>
                      {rankPos === 1 ? <Trophy size={16} /> : <Medal size={16} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold" style={{ color: rankPos === 1 ? "#92400e" : rankPos <= 3 ? "#0c4a6e" : "#374151" }}>
                        #{rankPos} / {total} chiến dịch
                      </p>
                      <p className="text-xs" style={{ color: "#6b7a95" }}>
                        {rankPos === 1 ? "Dẫn đầu hệ thống về tỉ lệ convert" : rankPos <= 3 ? `Top ${topPct}% toàn hệ thống` : `Hiệu quả ở mức trung bình`}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-lg font-semibold" style={{ background: rankPos <= 3 ? "#16a34a15" : "#f1f5f9", color: rankPos <= 3 ? "#16a34a" : "#9ca3af" }}>
                      Top {topPct}%
                    </span>
                  </div>

                  {/* Rank metrics */}
                  <div className="divide-y" style={{ borderColor: "var(--border)" }}>
                    {RANK_METRICS.map((m, i) => (
                      <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{ background: m.rank === 1 ? "#fef3c7" : "#f1f5f9", color: m.rank === 1 ? "#d97706" : "#6b7280" }}>
                          {m.rank}
                        </div>
                        <span className="flex-1 text-xs" style={{ color: "var(--muted-foreground)" }}>{m.label}</span>
                        <span className="text-xs font-bold" style={{ color: m.color }}>{m.value}</span>
                        <span className="text-xs" style={{ color: "#9ca3af" }}>/ {m.total}</span>
                      </div>
                    ))}
                  </div>

                  {/* Comparison bar vs top performer */}
                  {rankPos > 1 && (() => {
                    const top = ranked[0];
                    const pct = top.kpiResult.convertRate > 0
                      ? Math.round((campaign.kpiResult.convertRate / top.kpiResult.convertRate) * 100)
                      : 0;
                    return (
                      <div className="px-4 py-3 border-t" style={{ borderColor: "var(--border)", background: "#fafbfd" }}>
                        <div className="flex items-center justify-between text-xs mb-1.5" style={{ color: "var(--muted-foreground)" }}>
                          <span>Convert rate so với #{1} ({top.name})</span>
                          <span className="font-semibold" style={{ color: pct >= 80 ? "#16a34a" : "#d97706" }}>{pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full" style={{ background: "#e5e7eb" }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct >= 80 ? "#16a34a" : "#d97706" }} />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            );
          })()}

          {/* Leads in campaign */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted-foreground)" }}>
              Lead từ chiến dịch này ({campaignLeads.length})
            </p>
            {campaignLeads.length === 0 ? (
              <div className="rounded-xl p-4 border text-center" style={{ background: "var(--muted)", borderColor: "var(--border)" }}>
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Chiến dịch chưa phát sinh lead nào</p>
              </div>
            ) : (
              <div className="space-y-2">
                {campaignLeads.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => onSelectLead(l.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all hover:shadow-sm"
                    style={{ background: "var(--card)", borderColor: "var(--border)" }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ background: l.avatarBg, fontSize: "11px" }}>
                      {l.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>{l.name}</span>
                        {l.hot && (
                          <span className="flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-full" style={{ background: "#fef2f2", color: "#dc2626" }}>
                            <Flame size={9} /> HOT
                          </span>
                        )}
                      </div>
                      <p className="text-xs truncate" style={{ color: "var(--muted-foreground)" }}>{l.product}</p>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs flex-shrink-0" style={{ background: "#ede9fe", color: "#7c3aed" }}>
                      <Sparkles size={10} /> {l.aiScore}
                    </div>
                    <ChevronRight size={14} style={{ color: "var(--muted-foreground)" }} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
