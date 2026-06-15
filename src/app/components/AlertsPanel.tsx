import { Bell, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { useState } from "react";

const initialAlerts = [
  {
    id: 1,
    type: "urgent",
    icon: AlertTriangle,
    color: "#dc2626",
    bg: "#fef2f2",
    title: "Khoản vay Trần Văn Bình đến hạn tái ký",
    time: "5 phút trước",
    read: false,
  },
  {
    id: 2,
    type: "success",
    icon: CheckCircle,
    color: "#16a34a",
    bg: "#dcfce7",
    title: "Giao dịch tiết kiệm Nguyễn Thị Lan đã hoàn tất",
    time: "32 phút trước",
    read: false,
  },
  {
    id: 3,
    type: "info",
    icon: Info,
    color: "#0891b2",
    bg: "#e0f2fe",
    title: "Cập nhật lãi suất cho vay mua nhà – áp dụng 12/06",
    time: "2 giờ trước",
    read: false,
  },
  {
    id: 4,
    type: "urgent",
    icon: AlertTriangle,
    color: "#d97706",
    bg: "#fef3c7",
    title: "Phạm Thị Thu chưa nộp hồ sơ – còn 1 ngày",
    time: "3 giờ trước",
    read: true,
  },
];

export function AlertsPanel() {
  const [alerts, setAlerts] = useState(initialAlerts);

  const dismiss = (id: number) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const unread = alerts.filter((a) => !a.read).length;

  return (
    <div
      className="rounded-xl border"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-1.5">
          <Bell size={13} style={{ color: "var(--primary)" }} />
          <span
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: "var(--muted-foreground)" }}
          >
            Cảnh Báo & Thông Báo
          </span>
          {unread > 0 && (
            <span
              className="text-xs px-1.5 py-0.5 rounded-full"
              style={{ background: "var(--destructive)", color: "#fff" }}
            >
              {unread}
            </span>
          )}
        </div>
        <button
          className="text-xs hover:underline"
          style={{ color: "var(--primary)" }}
          onClick={() => setAlerts(alerts.map((a) => ({ ...a, read: true })))}
        >
          Đánh dấu đã đọc
        </button>
      </div>

      <div className="px-3 py-2 space-y-1.5">
        {alerts.length === 0 && (
          <p className="text-xs text-center py-4" style={{ color: "var(--muted-foreground)" }}>
            Không có thông báo mới
          </p>
        )}
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div
              key={alert.id}
              className="flex items-start gap-2 p-2 rounded-lg transition-all"
              style={{
                background: alert.read ? "transparent" : alert.bg,
                border: `1px solid ${alert.read ? "var(--border)" : alert.color + "30"}`,
                opacity: alert.read ? 0.7 : 1,
              }}
            >
              <Icon size={13} style={{ color: alert.color, flexShrink: 0, marginTop: 1 }} />
              <div className="flex-1 min-w-0">
                <p className="text-xs" style={{ color: "var(--foreground)" }}>{alert.title}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                  {alert.time}
                </p>
              </div>
              <button
                className="p-0.5 rounded hover:bg-black/10 transition-colors flex-shrink-0"
                onClick={() => dismiss(alert.id)}
              >
                <X size={11} style={{ color: "var(--muted-foreground)" }} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
