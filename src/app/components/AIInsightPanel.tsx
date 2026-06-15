import { Bot, Sparkles, ChevronRight, AlertTriangle, TrendingUp, Gift } from "lucide-react";
import { useState } from "react";

const insights = [
  {
    type: "opportunity",
    icon: TrendingUp,
    color: "#16a34a",
    bg: "#dcfce7",
    title: "Cơ hội cross-sell",
    desc: "Trần Văn Bình có tiền gửi đáo hạn 500tr vào ngày 15/06. Đề xuất sản phẩm đầu tư ACB Invest.",
    action: "Xem chi tiết",
    priority: "HIGH",
  },
  {
    type: "alert",
    icon: AlertTriangle,
    color: "#d97706",
    bg: "#fef3c7",
    title: "Cảnh báo churn risk",
    desc: "Nguyễn Thị Lan không phát sinh giao dịch 45 ngày. Khả năng rời bỏ: 72%. Cần liên hệ ngay.",
    action: "Gọi ngay",
    priority: "URGENT",
  },
  {
    type: "birthday",
    icon: Gift,
    color: "#7c3aed",
    bg: "#ede9fe",
    title: "Sinh nhật khách hàng",
    desc: "3 khách hàng có sinh nhật trong tuần này. Gửi lời chúc kèm voucher ưu đãi để tăng loyalty.",
    action: "Gửi chúc mừng",
    priority: "NORMAL",
  },
];

const priorityColor = {
  HIGH: { bg: "#dcfce7", text: "#16a34a" },
  URGENT: { bg: "#fef2f2", text: "#dc2626" },
  NORMAL: { bg: "#e8f0fb", text: "#004b9a" },
};

export function AIInsightPanel() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div
      className="rounded-xl border"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-1.5 px-3 py-2 border-b"
        style={{
          borderColor: "var(--border)",
          background: "linear-gradient(90deg, #1e1b4b 0%, #312e81 100%)",
        }}
      >
        <div className="flex items-center gap-1.5 flex-1">
          <Sparkles size={13} className="text-violet-300" />
          <span className="text-xs font-semibold text-white tracking-wide uppercase">
            AI Insight dành cho bạn
          </span>
        </div>
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)" }}
        >
          3 gợi ý mới
        </span>
      </div>

      <div className="px-3 py-2 space-y-2">
        {insights.map((insight, i) => {
          const Icon = insight.icon;
          const isExpanded = expanded === i;
          const pc = priorityColor[insight.priority as keyof typeof priorityColor];
          return (
            <div
              key={i}
              className="rounded-lg border cursor-pointer transition-all"
              style={{
                borderColor: insight.color + "30",
                background: isExpanded ? insight.bg : "transparent",
              }}
              onClick={() => setExpanded(isExpanded ? null : i)}
            >
              <div className="flex items-center gap-2 px-2.5 py-2">
                <div
                  className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                  style={{ background: insight.bg }}
                >
                  <Icon size={12} style={{ color: insight.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
                      {insight.title}
                    </span>
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-full"
                      style={{ background: pc.bg, color: pc.text }}
                    >
                      {insight.priority}
                    </span>
                  </div>
                  {isExpanded && (
                    <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                      {insight.desc}
                    </p>
                  )}
                </div>
                <ChevronRight
                  size={12}
                  style={{
                    color: "var(--muted-foreground)",
                    transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                />
              </div>
              {isExpanded && (
                <div className="px-2.5 pb-2 flex justify-end">
                  <button
                    className="text-xs px-2.5 py-1 rounded-lg font-medium transition-all hover:opacity-80"
                    style={{ background: insight.color, color: "#fff" }}
                  >
                    {insight.action}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* AI Chat bar */}
      <div
        className="mx-3 mb-3 flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all hover:opacity-90"
        style={{
          background: "linear-gradient(90deg, #1e1b4b 0%, #312e81 100%)",
        }}
      >
        <Bot size={13} className="text-violet-300 flex-shrink-0" />
        <span className="text-xs text-white">Hỏi AI về khách hàng hoặc sản phẩm...</span>
        <ChevronRight size={12} className="text-violet-300 ml-auto" />
      </div>
    </div>
  );
}
