import { ChevronRight, Target, DollarSign, Sparkles } from "lucide-react";
import type { Customer } from "./CustomerModal";
import { usePipeline } from "../context/PipelineContext";

const pipeline = [
  {
    id: 1,
    name: "Trần Văn Bình",
    product: "Vay mua nhà",
    amount: 2500000000,
    stage: "Đàm phán",
    stageColor: "#d97706",
    prob: 75,
    dueDate: "15/06",
    avatar: "T",
    avatarBg: "#7c3aed",
  },
  {
    id: 2,
    name: "Công ty ABC Corp",
    product: "Tín dụng doanh nghiệp",
    amount: 5000000000,
    stage: "Đề xuất",
    stageColor: "#0891b2",
    prob: 50,
    dueDate: "20/06",
    avatar: "A",
    avatarBg: "#0891b2",
  },
  {
    id: 3,
    name: "Nguyễn Thị Lan",
    product: "Tiết kiệm Online",
    amount: 500000000,
    stage: "Chốt",
    stageColor: "#16a34a",
    prob: 90,
    dueDate: "12/06",
    avatar: "N",
    avatarBg: "#16a34a",
  },
  {
    id: 4,
    name: "Lê Hoàng Dũng",
    product: "Thẻ Tín Dụng",
    amount: 50000000,
    stage: "Tiếp cận",
    stageColor: "#6b7280",
    prob: 30,
    dueDate: "18/06",
    avatar: "L",
    avatarBg: "#d97706",
  },
  {
    id: 5,
    name: "Phạm Thị Thu",
    product: "Vay kinh doanh",
    amount: 800000000,
    stage: "Thu hồ sơ",
    stageColor: "#004b9a",
    prob: 60,
    dueDate: "14/06",
    avatar: "P",
    avatarBg: "#16a34a",
  },
];

function formatAmount(n: number) {
  if (n >= 1000000000) return (n / 1000000000).toFixed(1) + " tỷ";
  if (n >= 1000000) return (n / 1000000).toFixed(0) + " tr";
  return n.toLocaleString();
}

const pipelineToCustomer = (p: typeof pipeline[0]): Customer => ({
  id: p.id,
  name: p.name,
  cif: `CIF00${10000 + p.id * 3}`,
  segment: p.prob >= 80 ? "Platinum" : p.prob >= 50 ? "Gold" : "Standard",
  segColor: p.prob >= 80 ? "#0891b2" : p.prob >= 50 ? "#d97706" : "#6b7280",
  product: p.product,
  deadline: p.dueDate,
  urgent: p.prob >= 85,
  task: `Chốt ${p.product}`,
  amount: formatAmount(p.amount),
  avatar: p.avatar,
  avatarBg: p.avatarBg,
});

export function SalesPipelinePanel({ onSelectCustomer }: { onSelectCustomer: (c: Customer) => void }) {
  const { deals: extraDeals } = usePipeline();

  const rows = [
    ...extraDeals.map((d) => ({ ...d, isNew: true, customer: d.customer })),
    ...pipeline.map((p) => ({ ...p, isNew: false, customer: pipelineToCustomer(p) })),
  ];

  const total = rows.reduce((s, p) => s + p.amount * (p.prob / 100), 0);

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
          <Target size={13} style={{ color: "var(--primary)" }} />
          <span
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: "var(--muted-foreground)" }}
          >
            Hoạch Định Đầu Tiên – Top 5
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
            style={{ background: "#dcfce7", color: "#16a34a" }}
          >
            <DollarSign size={10} />
            <span>Dự kiến: {formatAmount(total)}</span>
          </div>
          <button className="text-xs flex items-center gap-0.5" style={{ color: "var(--primary)" }}>
            Xem tất cả <ChevronRight size={11} />
          </button>
        </div>
      </div>

      {/* Table header */}
      <div
        className="grid text-xs px-3 py-1.5 border-b"
        style={{
          gridTemplateColumns: "1fr 130px 80px 70px 60px 70px",
          color: "var(--muted-foreground)",
          borderColor: "var(--border)",
          background: "var(--muted)",
        }}
      >
        <span>Khách hàng</span>
        <span>Sản phẩm</span>
        <span>Giá trị</span>
        <span>Giai đoạn</span>
        <span>Xác suất</span>
        <span>Hạn chốt</span>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {rows.map((p) => (
          <div
            key={p.id}
            className="grid items-center px-3 py-2 hover:bg-secondary/50 cursor-pointer transition-colors text-xs"
            onClick={() => onSelectCustomer(p.customer)}
            style={{ gridTemplateColumns: "1fr 130px 80px 70px 60px 70px" }}
          >
            {/* Name */}
            <div className="flex items-center gap-2 min-w-0">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-white flex-shrink-0"
                style={{ background: p.avatarBg, fontSize: "10px" }}
              >
                {p.avatar}
              </div>
              <span className="truncate" style={{ color: "var(--foreground)" }}>{p.name}</span>
              {p.isNew && (
                <span
                  className="flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: "#ede9fe", color: "#7c3aed" }}
                >
                  <Sparkles size={9} /> Mới từ Lead
                </span>
              )}
            </div>

            {/* Product */}
            <span className="truncate" style={{ color: "var(--muted-foreground)" }}>{p.product}</span>

            {/* Amount */}
            <span className="font-medium" style={{ color: "var(--primary)" }}>
              {formatAmount(p.amount)}
            </span>

            {/* Stage */}
            <span
              className="px-1.5 py-0.5 rounded-full text-center inline-block"
              style={{ background: p.stageColor + "20", color: p.stageColor }}
            >
              {p.stage}
            </span>

            {/* Probability */}
            <div className="flex items-center gap-1">
              <div className="flex-1 h-1.5 rounded-full" style={{ background: "#e5e7eb" }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${p.prob}%`, background: p.stageColor }}
                />
              </div>
              <span style={{ color: p.stageColor }}>{p.prob}%</span>
            </div>

            {/* Due date */}
            <span style={{ color: "var(--muted-foreground)" }}>{p.dueDate}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
