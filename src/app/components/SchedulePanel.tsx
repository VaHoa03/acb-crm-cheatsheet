import { Calendar, Clock, MapPin, Video, Phone } from "lucide-react";

const scheduleItems = [
  {
    time: "08:30",
    end: "09:00",
    title: "Gọi tư vấn – Trần Văn Bình",
    type: "call",
    location: null,
    color: "#004b9a",
    bg: "#e8f0fb",
    status: "upcoming",
  },
  {
    time: "10:00",
    end: "11:00",
    title: "Gặp KH – Nguyễn Thị Lan",
    type: "meeting",
    location: "Phòng họp 3A, Hội sở",
    color: "#16a34a",
    bg: "#dcfce7",
    status: "upcoming",
  },
  {
    time: "13:00",
    end: "13:30",
    title: "Review KPI tháng 6",
    type: "internal",
    location: "Online – Teams",
    color: "#7c3aed",
    bg: "#ede9fe",
    status: "upcoming",
  },
  {
    time: "14:30",
    end: "15:30",
    title: "Tư vấn vay – Lê Hoàng Dũng",
    type: "call",
    location: null,
    color: "#004b9a",
    bg: "#e8f0fb",
    status: "upcoming",
  },
  {
    time: "16:00",
    end: "17:00",
    title: "Họp team RM – Tháng 6",
    type: "internal",
    location: "Phòng lớn tầng 4",
    color: "#d97706",
    bg: "#fef3c7",
    status: "upcoming",
  },
];

const typeIcon = {
  call: Phone,
  meeting: MapPin,
  internal: Video,
};

export function SchedulePanel() {
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;

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
          <Calendar size={13} style={{ color: "var(--primary)" }} />
          <span
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: "var(--muted-foreground)" }}
          >
            Lịch Làm Việc Hôm Nay
          </span>
        </div>
        <button
          className="text-xs hover:underline"
          style={{ color: "var(--primary)" }}
        >
          Xem đầy đủ →
        </button>
      </div>

      <div className="px-3 py-2 space-y-1.5">
        {scheduleItems.map((item, i) => {
          const Icon = typeIcon[item.type as keyof typeof typeIcon] || Calendar;
          return (
            <div
              key={i}
              className="flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-all hover:shadow-sm"
              style={{ background: item.bg, border: `1px solid ${item.color}20` }}
            >
              <div
                className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: item.color + "20" }}
              >
                <Icon size={11} style={{ color: item.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate" style={{ color: "#0d1b2a" }}>
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex items-center gap-1">
                    <Clock size={9} style={{ color: item.color }} />
                    <span className="text-xs" style={{ color: item.color }}>
                      {item.time} – {item.end}
                    </span>
                  </div>
                  {item.location && (
                    <span className="text-xs truncate" style={{ color: "#6b7a95" }}>
                      · {item.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
