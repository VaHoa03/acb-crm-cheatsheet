import { useState, useRef, useEffect } from "react";
import {
  Target, Plus, ChevronRight, Calendar, Flame, CheckCircle, Users,
  TrendingUp, Mail, Phone, Sparkles, Bell, X, Upload, ChevronDown, Megaphone, Filter,
} from "lucide-react";
import {
  stages, stageColors, leads, formatVal, newLeadsCount,
  leadTypes, leadTypeColors, campaigns, type Lead,
} from "../data/leadsData";
import { LeadDetailPanel } from "../components/LeadDetailPanel";

function scoreColor(score: number) {
  if (score >= 85) return "#16a34a";
  if (score >= 60) return "#d97706";
  return "#6b7280";
}

// ── B.1 Modal Tự tạo ──────────────────────────────────────────────────────────
function ModalTuTao({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", product: "", source: "", leadType: "Tự tạo" });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div className="w-full max-w-md rounded-2xl shadow-2xl p-6" style={{ background: "#fff" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold" style={{ color: "#0d1b2a" }}>Tạo Lead thủ công</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100"><X size={15} /></button>
        </div>
        <div className="space-y-3">
          {[
            { key: "name", label: "Tên khách hàng / doanh nghiệp", placeholder: "Nhập tên..." },
            { key: "phone", label: "Số điện thoại", placeholder: "09xx..." },
            { key: "email", label: "Email", placeholder: "email@..." },
            { key: "product", label: "Sản phẩm quan tâm", placeholder: "Vay nhà, Tiết kiệm..." },
            { key: "source", label: "Nguồn", placeholder: "Giới thiệu, Website..." },
          ].map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="text-xs font-medium mb-1 block" style={{ color: "#6b7a95" }}>{label}</label>
              <input
                className="w-full px-3 py-2 rounded-lg text-xs border outline-none"
                style={{ borderColor: "rgba(0,75,154,0.2)", background: "#f8fafc" }}
                placeholder={placeholder}
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              />
            </div>
          ))}
          <div>
            <label className="text-xs font-medium mb-1 block" style={{ color: "#6b7a95" }}>Loại Lead</label>
            <select
              className="w-full px-3 py-2 rounded-lg text-xs border outline-none"
              style={{ borderColor: "rgba(0,75,154,0.2)", background: "#f8fafc" }}
              value={form.leadType}
              onChange={(e) => setForm((f) => ({ ...f, leadType: e.target.value }))}
            >
              {leadTypes.map((lt) => <option key={lt} value={lt}>{lt}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 py-2 rounded-xl text-xs border" style={{ color: "#6b7a95" }}>Hủy</button>
          <button
            onClick={() => { alert("Lead đã được tạo!"); onClose(); }}
            className="flex-1 py-2 rounded-xl text-xs font-medium text-white"
            style={{ background: "linear-gradient(135deg, #92400e 0%, #d97706 100%)" }}
          >
            Tạo Lead
          </button>
        </div>
      </div>
    </div>
  );
}

// ── B.1 Modal Import ───────────────────────────────────────────────────────────
function ModalImport({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"upload" | "preview">("upload");
  const fileRef = useRef<HTMLInputElement>(null);
  const previewRows = [
    { name: "Nguyễn Văn A", phone: "0912345678", email: "a@gmail.com", product: "Vay nhà" },
    { name: "Trần Thị B", phone: "0987654321", email: "b@gmail.com", product: "Tiết kiệm" },
    { name: "Lê Văn C", phone: "0909090909", email: "c@gmail.com", product: "Thẻ TD" },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl shadow-2xl p-6" style={{ background: "#fff" }} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold" style={{ color: "#0d1b2a" }}>Import Leads từ file</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100"><X size={15} /></button>
        </div>
        {step === "upload" ? (
          <>
            <div
              className="flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl py-10 cursor-pointer hover:bg-blue-50 transition-colors"
              style={{ borderColor: "#93c5fd" }}
              onClick={() => fileRef.current?.click()}
            >
              <Upload size={28} style={{ color: "#004b9a" }} />
              <p className="text-sm font-medium" style={{ color: "#004b9a" }}>Kéo thả file hoặc click để chọn</p>
              <p className="text-xs" style={{ color: "#9ca3af" }}>Hỗ trợ .xlsx và .csv (tối đa 5MB)</p>
              <input ref={fileRef} type="file" accept=".xlsx,.csv" className="hidden" onChange={() => setStep("preview")} />
            </div>
            <p className="text-xs mt-3 text-center" style={{ color: "#9ca3af" }}>File mẫu: Tên | SĐT | Email | Sản phẩm | Nguồn</p>
          </>
        ) : (
          <>
            <div className="mb-3 flex items-center gap-2 p-2.5 rounded-lg" style={{ background: "#dcfce7" }}>
              <CheckCircle size={14} style={{ color: "#16a34a" }} />
              <p className="text-xs" style={{ color: "#15803d" }}>Đọc được 3 dòng. Vui lòng kiểm tra và xác nhận.</p>
            </div>
            <div className="overflow-auto rounded-xl border mb-4" style={{ borderColor: "rgba(0,75,154,0.1)" }}>
              <table className="w-full text-xs">
                <thead style={{ background: "#f8fafc" }}>
                  <tr>{["Tên", "SĐT", "Email", "Sản phẩm"].map((h) => (
                    <th key={h} className="px-3 py-2 text-left font-medium" style={{ color: "#6b7a95" }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {previewRows.map((r, i) => (
                    <tr key={i} style={{ borderTop: "1px solid rgba(0,75,154,0.06)" }}>
                      <td className="px-3 py-2" style={{ color: "#0d1b2a" }}>{r.name}</td>
                      <td className="px-3 py-2" style={{ color: "#6b7a95" }}>{r.phone}</td>
                      <td className="px-3 py-2" style={{ color: "#6b7a95" }}>{r.email}</td>
                      <td className="px-3 py-2" style={{ color: "#6b7a95" }}>{r.product}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg mb-4" style={{ background: "#fef3c7" }}>
              <Bell size={13} style={{ color: "#92400e" }} />
              <p className="text-xs" style={{ color: "#92400e" }}>Hệ thống sẽ kiểm tra trùng SĐT/MST trước khi import.</p>
            </div>
          </>
        )}
        <div className="flex gap-2 mt-2">
          <button onClick={onClose} className="flex-1 py-2 rounded-xl text-xs border" style={{ color: "#6b7a95" }}>Hủy</button>
          {step === "preview" && (
            <button
              onClick={() => { alert("✅ Import thành công: 3 leads được thêm, 0 trùng."); onClose(); }}
              className="flex-1 py-2 rounded-xl text-xs font-medium text-white"
              style={{ background: "linear-gradient(135deg, #002d6e 0%, #004b9a 100%)" }}
            >
              Xác nhận Import
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── B.2 Tab Theo Chiến dịch ────────────────────────────────────────────────────
function TabTheoCampaign({ onSelectLead }: { onSelectLead: (lead: Lead) => void }) {
  const [expanded, setExpanded] = useState<number[]>([1]);
  return (
    <div className="space-y-3">
      {campaigns.map((c) => {
        const campaignLeads = leads.filter((l) => l.campaignId === c.id);
        if (campaignLeads.length === 0) return null;
        const isExpanded = expanded.includes(c.id);
        const convertCount = campaignLeads.filter(l => l.stage === "Chốt").length;
        const convertRate = campaignLeads.length > 0 ? Math.round((convertCount / campaignLeads.length) * 100) : 0;
        return (
          <div key={c.id} className="rounded-xl border overflow-hidden" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
            <div
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-blue-50/40 transition-colors"
              style={{ background: "#f8fafc", borderBottom: isExpanded ? "1px solid rgba(0,75,154,0.08)" : "none" }}
              onClick={() => setExpanded((prev) => isExpanded ? prev.filter((id) => id !== c.id) : [...prev, c.id])}
            >
              <Megaphone size={14} style={{ color: "#004b9a" }} />
              <span className="text-sm font-semibold flex-1" style={{ color: "#0d1b2a" }}>{c.name}</span>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: c.statusColor + "15", color: c.statusColor }}>{c.status}</span>
              <span className="text-xs font-medium" style={{ color: "#004b9a" }}>{campaignLeads.length} lead</span>
              <div className="w-20 h-1.5 rounded-full" style={{ background: "#e5e7eb" }}>
                <div className="h-full rounded-full" style={{ width: `${convertRate}%`, background: "#16a34a" }} />
              </div>
              <span className="text-xs" style={{ color: "#16a34a" }}>{convertRate}%</span>
              <ChevronDown size={14} style={{ color: "#9ca3af", transform: isExpanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
            </div>
            {isExpanded && (
              <div className="divide-y" style={{ borderColor: "rgba(0,75,154,0.06)" }}>
                {campaignLeads.map((l) => (
                  <div key={l.id} onClick={() => onSelectLead(l)} className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-blue-50/50 transition-colors">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ background: l.avatarBg, fontSize: "11px" }}>{l.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-sm font-semibold" style={{ color: "#0d1b2a" }}>{l.name}</span>
                        {l.hot && <span className="flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-full" style={{ background: "#fef2f2", color: "#dc2626" }}><Flame size={9} /> HOT</span>}
                        <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ background: leadTypeColors[l.leadType] + "15", color: leadTypeColors[l.leadType] }}>{l.leadType}</span>
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
            )}
          </div>
        );
      })}
      {(() => {
        const noCamp = leads.filter((l) => l.campaignId === null);
        if (noCamp.length === 0) return null;
        const isExp = expanded.includes(0);
        return (
          <div className="rounded-xl border overflow-hidden" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
            <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-blue-50/40 transition-colors" style={{ background: "#f8fafc", borderBottom: isExp ? "1px solid rgba(0,75,154,0.08)" : "none" }}
              onClick={() => setExpanded((prev) => isExp ? prev.filter((id) => id !== 0) : [...prev, 0])}>
              <Target size={14} style={{ color: "#6b7a95" }} />
              <span className="text-sm font-semibold flex-1" style={{ color: "#0d1b2a" }}>Không thuộc chiến dịch</span>
              <span className="text-xs font-medium" style={{ color: "#6b7a95" }}>{noCamp.length} lead</span>
              <ChevronDown size={14} style={{ color: "#9ca3af", transform: isExp ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
            </div>
            {isExp && (
              <div className="divide-y" style={{ borderColor: "rgba(0,75,154,0.06)" }}>
                {noCamp.map((l) => (
                  <div key={l.id} onClick={() => onSelectLead(l)} className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-blue-50/50 transition-colors">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" style={{ background: l.avatarBg, fontSize: "11px" }}>{l.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-semibold" style={{ color: "#0d1b2a" }}>{l.name}</span>
                      <p className="text-xs truncate" style={{ color: "#6b7a95" }}>{l.product}</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#f1f5f9", color: "#6b7a95" }}>{l.stage}</span>
                    <ChevronRight size={14} style={{ color: "#d1d5db" }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}

// ── Main LeadsPage ─────────────────────────────────────────────────────────────
export function LeadsPage() {
  const [mainTab, setMainTab] = useState<"all" | "byCampaign">("all");
  const [stageFilter, setStageFilter] = useState("Tất cả");
  const [leadTypeFilter, setLeadTypeFilter] = useState("Tất cả");
  const [hotFilter, setHotFilter] = useState(false);
  const [showAlert, setShowAlert] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showModalTuTao, setShowModalTuTao] = useState(false);
  const [showModalImport, setShowModalImport] = useState(false);
  const addMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (addMenuRef.current && !addMenuRef.current.contains(e.target as Node)) setShowAddMenu(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredLeads = leads.filter((l) => {
    const matchStage = stageFilter === "Tất cả" || l.stage === stageFilter;
    const matchLeadType = leadTypeFilter === "Tất cả" || l.leadType === leadTypeFilter;
    const matchHot = !hotFilter || l.aiScore >= 85;
    return matchStage && matchLeadType && matchHot;
  });

  const hotLeadsCount = leads.filter((l) => l.aiScore >= 85).length;
  const convertedLeads = leads.filter(l => l.stage === "Chốt");
  const convertRate = Math.round((convertedLeads.length / leads.length) * 100);
  const closedValue = convertedLeads.reduce((acc, l) => acc + l.value, 0);
  const negotiationLeads = leads.filter(l => l.stageIdx >= 3);
  const negotiationValue = negotiationLeads.reduce((acc, l) => acc + l.value, 0);

  return (
    <div className="p-5 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-lg flex items-center gap-2" style={{ color: "#0d1b2a" }}>
            <Target size={20} style={{ color: "#d97706" }} />
            Lead
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "#6b7a95" }}>Quản lý pipeline xử lý lead theo AI Score</p>
        </div>

        {/* B.1: Dropdown Thêm Lead */}
        <div className="relative" ref={addMenuRef}>
          <button
            onClick={() => setShowAddMenu((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #92400e 0%, #d97706 100%)", color: "#fff" }}
          >
            <Plus size={15} /> Thêm Lead <ChevronDown size={13} />
          </button>
          {showAddMenu && (
            <div className="absolute right-0 top-full mt-1.5 rounded-xl border shadow-lg overflow-hidden z-20" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)", minWidth: 160 }}>
              <button className="flex items-center gap-2 w-full px-4 py-2.5 text-xs hover:bg-blue-50 transition-colors" style={{ color: "#0d1b2a" }}
                onClick={() => { setShowAddMenu(false); setShowModalTuTao(true); }}>
                <Plus size={13} style={{ color: "#d97706" }} /> Tự tạo
              </button>
              <div style={{ height: 1, background: "rgba(0,75,154,0.06)" }} />
              <button className="flex items-center gap-2 w-full px-4 py-2.5 text-xs hover:bg-blue-50 transition-colors" style={{ color: "#0d1b2a" }}
                onClick={() => { setShowAddMenu(false); setShowModalImport(true); }}>
                <Upload size={13} style={{ color: "#004b9a" }} /> Import file
              </button>
            </div>
          )}
        </div>
      </div>

      {/* New leads alert */}
      {showAlert && (
        <div className="flex items-center gap-3 mb-5 p-3.5 rounded-xl border" style={{ background: "#fef3c7", borderColor: "#fde68a" }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#fde68a" }}>
            <Bell size={16} style={{ color: "#92400e" }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold" style={{ color: "#92400e" }}>{newLeadsCount} leads mới được giao cho bạn</p>
            <p className="text-xs" style={{ color: "#92400e" }}>Trong đó có {hotLeadsCount} lead AI Score ≥85 cần ưu tiên xử lý hôm nay</p>
          </div>
          <button onClick={() => { setHotFilter(true); setStageFilter("Tất cả"); setMainTab("all"); }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-90 flex-shrink-0" style={{ background: "#92400e", color: "#fff" }}>
            Xem ngay
          </button>
          <button onClick={() => setShowAlert(false)} className="p-1 rounded hover:bg-black/10 transition-colors flex-shrink-0">
            <X size={13} style={{ color: "#92400e" }} />
          </button>
        </div>
      )}

      {/* 4 Summary cards – enhanced với conversion info */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {/* Card 1: Tổng Lead + tỉ lệ convert */}
        <div className="p-3 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#e8f0fb" }}>
              <Users size={15} style={{ color: "#004b9a" }} />
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "#e8f0fb", color: "#004b9a" }}>
              CV {convertRate}%
            </span>
          </div>
          <p className="text-2xl font-bold" style={{ color: "#004b9a" }}>{leads.length}</p>
          <p className="text-xs" style={{ color: "#6b7a95" }}>Tổng Lead</p>
          <p className="text-xs mt-1 font-medium" style={{ color: "#16a34a" }}>
            {convertedLeads.length} đã convert
          </p>
        </div>

        {/* Card 2: Lead Hot */}
        <div className="p-3 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#fef2f2" }}>
              <Flame size={15} style={{ color: "#dc2626" }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: "#dc2626" }}>{hotLeadsCount}</p>
          <p className="text-xs" style={{ color: "#6b7a95" }}>Lead Hot (AI ≥85)</p>
          <p className="text-xs mt-1 font-medium" style={{ color: "#dc2626" }}>Cần xử lý hôm nay</p>
        </div>

        {/* Card 3: Đang đàm phán + giá trị */}
        <div className="p-3 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#fef3c7" }}>
              <TrendingUp size={15} style={{ color: "#d97706" }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: "#d97706" }}>{negotiationLeads.length}</p>
          <p className="text-xs" style={{ color: "#6b7a95" }}>Đang đàm phán</p>
          <p className="text-xs mt-1 font-medium" style={{ color: "#d97706" }}>{formatVal(negotiationValue)}</p>
        </div>

        {/* Card 4: Đã chốt + doanh số */}
        <div className="p-3 rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#dcfce7" }}>
              <CheckCircle size={15} style={{ color: "#16a34a" }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: "#16a34a" }}>{convertedLeads.length}</p>
          <p className="text-xs" style={{ color: "#6b7a95" }}>Đã chốt tháng 6</p>
          <p className="text-xs mt-1 font-medium" style={{ color: "#16a34a" }}>DS: {formatVal(closedValue)}</p>
        </div>
      </div>

      {/* Breakdown convert theo Loại Lead – chỉ hiển thị số convert */}
      <div className="grid grid-cols-4 gap-2 mb-5">
        {leadTypes.map((lt) => {
          const convertCount = leads.filter(l => l.leadType === lt && l.stage === "Chốt").length;
          return (
            <div
              key={lt}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl border"
              style={{ borderColor: leadTypeColors[lt] + "30", background: leadTypeColors[lt] + "08" }}
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: leadTypeColors[lt] + "20" }}>
                <span className="text-sm font-bold" style={{ color: leadTypeColors[lt] }}>{convertCount}</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold leading-tight" style={{ color: leadTypeColors[lt] }}>convert</p>
                <p className="text-xs truncate" style={{ color: leadTypeColors[lt] + "99", fontSize: 10 }}>{lt}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* B.2 Main Tabs */}
      <div className="flex gap-2 mb-4">
        {[{ key: "all", label: "Tất cả Leads" }, { key: "byCampaign", label: "Theo Chiến dịch" }].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setMainTab(key as "all" | "byCampaign")}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: mainTab === key ? "#d97706" : "#fff",
              color: mainTab === key ? "#fff" : "#6b7a95",
              border: `1.5px solid ${mainTab === key ? "#d97706" : "rgba(0,75,154,0.1)"}`,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab: Tất cả Leads – full width (no sidebar) */}
      {mainTab === "all" && (
        <div>
          {/* B.3: Filters */}
          <div className="flex gap-2 mb-3 flex-wrap items-center">
            <span className="flex items-center gap-1 text-xs" style={{ color: "#9ca3af" }}><Filter size={11} /> Giai đoạn:</span>
            {["Tất cả", ...stages].map((s, i) => (
              <button
                key={s}
                onClick={() => setStageFilter(s)}
                className="px-3 py-1.5 rounded-lg text-xs transition-all"
                style={{
                  background: stageFilter === s ? (i === 0 ? "#004b9a" : stageColors[i - 1]) : "#fff",
                  color: stageFilter === s ? "#fff" : "#6b7a95",
                  border: `1px solid ${stageFilter === s ? "transparent" : "rgba(0,75,154,0.1)"}`,
                }}
              >
                {s}{s !== "Tất cả" && <span className="ml-1.5 opacity-70">({leads.filter(l => l.stage === s).length})</span>}
              </button>
            ))}

            <div className="w-px h-5 mx-1" style={{ background: "rgba(0,75,154,0.1)" }} />
            <span className="text-xs" style={{ color: "#9ca3af" }}>Loại:</span>

            {["Tất cả", ...leadTypes].map((lt) => (
              <button
                key={lt}
                onClick={() => setLeadTypeFilter(lt)}
                className="px-3 py-1.5 rounded-lg text-xs transition-all"
                style={{
                  background: leadTypeFilter === lt ? (lt === "Tất cả" ? "#6b7280" : leadTypeColors[lt]) : "#fff",
                  color: leadTypeFilter === lt ? "#fff" : (lt === "Tất cả" ? "#6b7280" : leadTypeColors[lt]),
                  border: `1px solid ${leadTypeFilter === lt ? "transparent" : (lt === "Tất cả" ? "rgba(107,114,128,0.2)" : leadTypeColors[lt] + "30")}`,
                }}
              >
                {lt}{lt !== "Tất cả" && <span className="ml-1.5 opacity-70">({leads.filter(l => l.leadType === lt).length})</span>}
              </button>
            ))}

            <div className="w-px h-5 mx-1" style={{ background: "rgba(0,75,154,0.1)" }} />
            <button
              onClick={() => setHotFilter((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
              style={{ background: hotFilter ? "#dc2626" : "#fff", color: hotFilter ? "#fff" : "#dc2626", border: `1px solid ${hotFilter ? "transparent" : "#fecaca"}` }}
            >
              <Flame size={12} /> Hot · AI Score ≥85 <span className="opacity-70">({hotLeadsCount})</span>
            </button>
          </div>

          {/* Stage header */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
            {stages.map((s, i) => {
              const count = leads.filter(l => l.stage === s).length;
              const val = leads.filter(l => l.stage === s).reduce((acc, l) => acc + l.value, 0);
              return (
                <div key={s} className="flex-1 min-w-[100px] p-2.5 rounded-xl border text-center" style={{ background: stageColors[i] + "10", borderColor: stageColors[i] + "30" }}>
                  <p className="text-xs font-medium" style={{ color: stageColors[i] }}>{s}</p>
                  <p className="text-lg font-bold mt-0.5" style={{ color: stageColors[i] }}>{count}</p>
                  <p className="text-xs" style={{ color: "#9ca3af" }}>{formatVal(val)}</p>
                </div>
              );
            })}
          </div>

          {/* Lead cards – full width */}
          <div className="space-y-2.5">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className="p-3.5 rounded-xl border transition-all hover:shadow-md cursor-pointer"
                style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)", borderLeft: `4px solid ${stageColors[lead.stageIdx]}` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: lead.avatarBg }}>
                    {lead.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <span className="text-sm font-semibold" style={{ color: "#0d1b2a" }}>{lead.name}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ background: leadTypeColors[lead.leadType] + "18", color: leadTypeColors[lead.leadType] }}>
                        {lead.leadType}
                      </span>
                      {lead.hot && (
                        <span className="flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-full" style={{ background: "#fef2f2", color: "#dc2626" }}>
                          <Flame size={10} /> HOT
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full" style={{ background: scoreColor(lead.aiScore) + "15", color: scoreColor(lead.aiScore) }}>
                        <Sparkles size={10} /> AI {lead.aiScore}
                      </span>
                      <span className="ml-auto text-xs px-2 py-0.5 rounded-full" style={{ background: stageColors[lead.stageIdx] + "15", color: stageColors[lead.stageIdx] }}>
                        {lead.stage}
                      </span>
                    </div>
                    <p className="text-xs mb-1" style={{ color: "#004b9a" }}>{lead.product}</p>
                    <div className="flex items-center gap-3 text-xs" style={{ color: "#9ca3af" }}>
                      <span>Nguồn: {lead.source}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Calendar size={10} /> {lead.assignedDate}</span>
                      <span>·</span>
                      <span className="font-medium" style={{ color: "#d97706" }}>{formatVal(lead.value)}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button onClick={(e) => e.stopPropagation()} className="p-1.5 rounded-lg" style={{ background: "#e8f0fb", color: "#004b9a" }}><Phone size={12} /></button>
                    <button onClick={(e) => e.stopPropagation()} className="p-1.5 rounded-lg" style={{ background: "#fef3c7", color: "#d97706" }}><Mail size={12} /></button>
                    <button className="p-1.5 rounded-lg" style={{ background: "#f1f5f9", color: "#9ca3af" }}><ChevronRight size={12} /></button>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  {stages.map((s, i) => (
                    <div key={s} className="flex-1 h-1 rounded-full transition-all" style={{ background: i <= lead.stageIdx ? stageColors[lead.stageIdx] : "#e5e7eb" }} />
                  ))}
                </div>
              </div>
            ))}
            {filteredLeads.length === 0 && (
              <div className="py-12 text-center rounded-xl border" style={{ background: "#fff", borderColor: "rgba(0,75,154,0.1)" }}>
                <p className="text-sm" style={{ color: "#9ca3af" }}>Không có lead phù hợp với bộ lọc</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* B.2 Tab: Theo Chiến dịch */}
      {mainTab === "byCampaign" && <TabTheoCampaign onSelectLead={setSelectedLead} />}

      {/* Modals */}
      {showModalTuTao && <ModalTuTao onClose={() => setShowModalTuTao(false)} />}
      {showModalImport && <ModalImport onClose={() => setShowModalImport(false)} />}

      <LeadDetailPanel key={selectedLead?.id ?? "none"} lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  );
}
