import { Phone, Target, ChevronRight, Crown, AlertCircle, Clock } from "lucide-react";
import { useState } from "react";
import type { Customer } from "./CustomerModal";

const priorityCustomers = [
  {
    id: 1,
    name: "Trần Văn Bình",
    cif: "CIF0023847",
    segment: "Diamond",
    segColor: "#7c3aed",
    product: "Vay mua nhà 2.5 tỷ",
    deadline: "Hôm nay 14:00",
    urgent: true,
    task: "Gọi tư vấn lãi suất ưu đãi",
    amount: "2.500.000.000",
    avatar: "T",
    avatarBg: "#7c3aed",
  },
  {
    id: 2,
    name: "Nguyễn Thị Lan",
    cif: "CIF0019234",
    segment: "Platinum",
    segColor: "#0891b2",
    product: "Tiết kiệm Online 500tr",
    deadline: "Hôm nay 16:30",
    urgent: true,
    task: "Mời tái gửi kỳ hạn 12 tháng",
    amount: "500.000.000",
    avatar: "N",
    avatarBg: "#0891b2",
  },
  {
    id: 3,
    name: "Lê Hoàng Dũng",
    cif: "CIF0031029",
    segment: "Gold",
    segColor: "#d97706",
    product: "Thẻ Tín Dụng Platinum",
    deadline: "11/06 EOD",
    urgent: false,
    task: "Upsell gói bảo hiểm du lịch",
    amount: "50.000.000",
    avatar: "L",
    avatarBg: "#d97706",
  },
  {
    id: 4,
    name: "Phạm Thị Thu",
    cif: "CIF0028811",
    segment: "Gold",
    segColor: "#d97706",
    product: "Vay kinh doanh 800tr",
    deadline: "12/06",
    urgent: false,
    task: "Thu thập hồ sơ pháp lý",
    amount: "800.000.000",
    avatar: "P",
    avatarBg: "#16a34a",
  },
  {
    id: 5,
    name: "Lâm Phước Bảo",
    cif: "CIF0044512",
    segment: "Standard",
    segColor: "#6b7280",
    product: "Mở TK thanh toán",
    deadline: "13/06",
    urgent: false,
    task: "Kích hoạt dịch vụ ACB ONE",
    amount: "—",
    avatar: "L",
    avatarBg: "#6b7280",
  },
];

export function PriorityCenter({ onSelectCustomer }: { onSelectCustomer: (c: Customer) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className="rounded-xl border"
      style={{ background: "var(--card)", borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-3 py-2 border-b rounded-t-xl"
        style={{
          borderColor: "var(--border)",
          background: "linear-gradient(90deg, #002d6e 0%, #004b9a 100%)",
        }}
      >
        <div className="flex items-center gap-1.5">
          <Crown size={13} className="text-yellow-400" />
          <span className="text-xs font-semibold text-white tracking-wide uppercase">
            Priority Center
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>
            5 khách hàng
          </span>
          <button className="text-xs text-blue-300 hover:text-white flex items-center gap-0.5 transition-colors">
            Xem tất cả <ChevronRight size={11} />
          </button>
        </div>
      </div>

      {/* Customer list */}
      <div className="divide-y" style={{ divideColor: "var(--border)" }}>
        {priorityCustomers.map((c) => (
          <div
            key={c.id}
            className="px-3 py-2 flex items-center gap-3 cursor-pointer transition-all"
            style={{
              background: hovered === c.id ? "var(--secondary)" : "transparent",
              borderLeft: c.urgent ? "3px solid var(--destructive)" : "3px solid transparent",
            }}
            onMouseEnter={() => setHovered(c.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelectCustomer(c)}
          >
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: c.avatarBg }}
            >
              {c.avatar}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>
                  {c.name}
                </span>
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full"
                  style={{ background: c.segColor + "20", color: c.segColor }}
                >
                  {c.segment}
                </span>
                {c.urgent && (
                  <AlertCircle size={11} style={{ color: "var(--destructive)" }} />
                )}
              </div>
              <p className="text-xs truncate" style={{ color: "var(--muted-foreground)" }}>
                {c.task}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs" style={{ color: "var(--primary)" }}>{c.product}</span>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <div className="flex items-center gap-1">
                <Clock size={10} style={{ color: c.urgent ? "var(--destructive)" : "var(--muted-foreground)" }} />
                <span
                  className="text-xs"
                  style={{ color: c.urgent ? "var(--destructive)" : "var(--muted-foreground)" }}
                >
                  {c.deadline}
                </span>
              </div>
              <div className="flex gap-1">
                <button
                  className="p-1 rounded transition-all hover:scale-110"
                  style={{ background: "var(--acb-blue-light)", color: "var(--primary)" }}
                  title="Gọi điện"
                >
                  <Phone size={11} />
                </button>
                <button
                  className="p-1 rounded transition-all hover:scale-110"
                  style={{ background: "#fef3c7", color: "#d97706" }}
                  title="Tạo cơ hội"
                >
                  <Target size={11} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
