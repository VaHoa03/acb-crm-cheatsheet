import { X, Phone, Mail, MapPin, Calendar, CreditCard, TrendingUp, FileText, Clock, Target, CheckCircle2, Circle, ChevronRight, Star, Shield, Download } from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export type Customer = {
  id: number;
  name: string;
  cif: string;
  segment: string;
  segColor: string;
  product: string;
  deadline: string;
  urgent: boolean;
  task: string;
  amount: string;
  avatar: string;
  avatarBg: string;
  // Optional extra context for customers freshly converted from a Lead
  phone?: string;
  email?: string;
  source?: string;
  campaignName?: string;
  aiScore?: number;
  aiReason?: string;
  productSuggestion?: string;
  assignedDate?: string;
};

function buildLeadCustomerDetail(c: Customer) {
  return {
    phone: c.phone ?? "Chưa cập nhật",
    email: c.email ?? "Chưa cập nhật",
    address: "Chưa cập nhật",
    dob: "—",
    job: "Khách hàng mới (từ Lead)",
    income: "Chưa cập nhật",
    rmNote: c.aiReason
      ? `Vừa chuyển đổi từ Lead${c.campaignName ? ` – chiến dịch "${c.campaignName}"` : ""} (AI Score ${c.aiScore}). ${c.aiReason}`
      : "Khách hàng mới vừa chuyển đổi từ Lead, cần bổ sung thông tin định danh.",
    products: [
      { name: c.product, amount: c.amount, status: "Đang xử lý", color: "#d97706" },
    ],
    txnData: [
      { month: "T1", val: 0 }, { month: "T2", val: 0 }, { month: "T3", val: 0 },
      { month: "T4", val: 0 }, { month: "T5", val: 0 }, { month: "T6", val: 0 },
    ],
    totalBalance: "0",
    loyaltyScore: c.aiScore ?? 50,
    churnRisk: "Chưa đánh giá",
    churnColor: "#6b7280",
    history: [
      { date: c.assignedDate ?? "Hôm nay", action: `Tiếp nhận Lead từ ${c.source ?? "kênh online"}`, by: "Hệ thống" },
      { date: "Hôm nay", action: "Gọi tư vấn lần đầu và chuyển đổi thành khách hàng", by: "Nguyễn Minh Anh" },
    ],
    tasks: [
      { text: c.productSuggestion ? `Tư vấn: ${c.productSuggestion}` : `Hoàn thiện hồ sơ ${c.product}`, done: false },
      { text: "Thu thập đầy đủ thông tin định danh khách hàng", done: false },
    ],
  };
}

const customerDetails: Record<number, any> = {
  1: {
    phone: "0912 345 678",
    email: "tran.vanbinh@gmail.com",
    address: "123 Nguyễn Huệ, Q.1, TP.HCM",
    dob: "15/03/1978",
    job: "Giám đốc – Công ty TNHH Bình Minh",
    income: "120.000.000 đ/tháng",
    rmNote: "KH VIP, ưu tiên liên hệ buổi sáng. Quan tâm lãi suất fix 5 năm đầu.",
    products: [
      { name: "Vay mua nhà", amount: "2.500.000.000", status: "Đang xử lý", color: "#d97706" },
      { name: "Tiết kiệm Online", amount: "300.000.000", status: "Hoạt động", color: "#16a34a" },
      { name: "Thẻ Visa Platinum", amount: "100.000.000", status: "Hoạt động", color: "#16a34a" },
    ],
    txnData: [
      { month: "T1", val: 45 }, { month: "T2", val: 62 }, { month: "T3", val: 38 },
      { month: "T4", val: 71 }, { month: "T5", val: 55 }, { month: "T6", val: 48 },
    ],
    totalBalance: "3.200.000.000",
    loyaltyScore: 92,
    churnRisk: "Thấp",
    churnColor: "#16a34a",
    history: [
      { date: "10/06", action: "Gọi tư vấn lãi suất vay nhà", by: "Nguyễn Minh Anh" },
      { date: "05/06", action: "Gửi email hồ sơ yêu cầu", by: "Hệ thống" },
      { date: "01/06", action: "KH đến chi nhánh tư vấn", by: "Nguyễn Minh Anh" },
    ],
    tasks: [
      { text: "Gọi xác nhận lãi suất ưu đãi 6.9%/năm", done: false },
      { text: "Thu bộ hồ sơ pháp lý BĐS", done: false },
      { text: "Gửi đề xuất phê duyệt nội bộ", done: true },
    ],
  },
  2: {
    phone: "0908 234 567",
    email: "nguyen.thilan@acb.com.vn",
    address: "45 Đinh Tiên Hoàng, Q.Bình Thạnh, TP.HCM",
    dob: "22/07/1985",
    job: "Kế toán trưởng – Tập đoàn Thành Công",
    income: "45.000.000 đ/tháng",
    rmNote: "KH tiết kiệm thường xuyên, có xu hướng chuyển sang ngân hàng khác. Cần giữ chân bằng ưu đãi.",
    products: [
      { name: "Tiết kiệm Online 12T", amount: "500.000.000", status: "Đáo hạn 20/06", color: "#d97706" },
      { name: "Thẻ Debit ACB", amount: "—", status: "Hoạt động", color: "#16a34a" },
    ],
    txnData: [
      { month: "T1", val: 12 }, { month: "T2", val: 8 }, { month: "T3", val: 15 },
      { month: "T4", val: 5 }, { month: "T5", val: 3 }, { month: "T6", val: 0 },
    ],
    totalBalance: "520.000.000",
    loyaltyScore: 58,
    churnRisk: "Cao",
    churnColor: "#dc2626",
    history: [
      { date: "01/06", action: "Không phát sinh giao dịch – cảnh báo AI", by: "Hệ thống" },
      { date: "18/05", action: "Gọi hỏi thăm – không bắt máy", by: "Nguyễn Minh Anh" },
      { date: "10/05", action: "Rút tiết kiệm 200tr", by: "KH tự thực hiện" },
    ],
    tasks: [
      { text: "Gọi mời tái gửi kỳ hạn 12T lãi 7.2%", done: false },
      { text: "Gửi offer ưu đãi đặc biệt qua SMS", done: false },
    ],
  },
  3: {
    phone: "0977 654 321",
    email: "lehoangdung@gmail.com",
    address: "89 Lê Văn Lương, Q.7, TP.HCM",
    dob: "05/11/1990",
    job: "Chuyên viên IT – FPT Software",
    income: "35.000.000 đ/tháng",
    rmNote: "KH trẻ, thích dịch vụ số. Có tiềm năng mở rộng sang sản phẩm đầu tư.",
    products: [
      { name: "Thẻ Tín Dụng Platinum", amount: "50.000.000", status: "Hoạt động", color: "#16a34a" },
      { name: "ACB ONE", amount: "—", status: "Hoạt động", color: "#16a34a" },
    ],
    txnData: [
      { month: "T1", val: 22 }, { month: "T2", val: 28 }, { month: "T3", val: 31 },
      { month: "T4", val: 25 }, { month: "T5", val: 38 }, { month: "T6", val: 29 },
    ],
    totalBalance: "85.000.000",
    loyaltyScore: 74,
    churnRisk: "Thấp",
    churnColor: "#16a34a",
    history: [
      { date: "08/06", action: "Duyệt tăng hạn mức thẻ lên 80tr", by: "Hệ thống" },
      { date: "25/05", action: "KH yêu cầu gói bảo hiểm du lịch", by: "KH tự thực hiện" },
    ],
    tasks: [
      { text: "Upsell gói bảo hiểm du lịch ACB x Bảo Việt", done: false },
      { text: "Giới thiệu sản phẩm ACB Invest", done: false },
    ],
  },
  4: {
    phone: "0933 112 233",
    email: "pham.thithu@gmail.com",
    address: "12 Trần Não, TP. Thủ Đức, TP.HCM",
    dob: "30/09/1983",
    job: "Chủ chuỗi cửa hàng thời trang",
    income: "80.000.000 đ/tháng",
    rmNote: "KH kinh doanh, cần hỗ trợ nhanh hồ sơ pháp lý. Tiềm năng vay cao.",
    products: [
      { name: "Vay kinh doanh", amount: "800.000.000", status: "Đang thu hồ sơ", color: "#004b9a" },
      { name: "Tài khoản thanh toán", amount: "—", status: "Hoạt động", color: "#16a34a" },
    ],
    txnData: [
      { month: "T1", val: 55 }, { month: "T2", val: 60 }, { month: "T3", val: 72 },
      { month: "T4", val: 68 }, { month: "T5", val: 80 }, { month: "T6", val: 52 },
    ],
    totalBalance: "150.000.000",
    loyaltyScore: 81,
    churnRisk: "Thấp",
    churnColor: "#16a34a",
    history: [
      { date: "09/06", action: "Nhận hồ sơ đăng ký kinh doanh", by: "Nguyễn Minh Anh" },
      { date: "03/06", action: "Tư vấn lãi suất vay kinh doanh", by: "Nguyễn Minh Anh" },
    ],
    tasks: [
      { text: "Nhắc KH nộp sổ đỏ và GPKD", done: false },
      { text: "Hoàn thiện hồ sơ định giá tài sản", done: false },
      { text: "Tạo hồ sơ tín dụng nội bộ", done: true },
    ],
  },
  5: {
    phone: "0945 876 543",
    email: "lamphuocbao@gmail.com",
    address: "77 Hoàng Diệu 2, TP. Thủ Đức, TP.HCM",
    dob: "14/02/1995",
    job: "Nhân viên – Samsung Display Vietnam",
    income: "18.000.000 đ/tháng",
    rmNote: "KH mới, tiềm năng lâu dài. Cần onboard ACB ONE và giới thiệu sản phẩm tiết kiệm.",
    products: [
      { name: "TK Thanh Toán", amount: "—", status: "Mới mở", color: "#0891b2" },
    ],
    txnData: [
      { month: "T1", val: 0 }, { month: "T2", val: 0 }, { month: "T3", val: 0 },
      { month: "T4", val: 0 }, { month: "T5", val: 0 }, { month: "T6", val: 2 },
    ],
    totalBalance: "5.000.000",
    loyaltyScore: 30,
    churnRisk: "Trung bình",
    churnColor: "#d97706",
    history: [
      { date: "11/06", action: "Mở tài khoản thanh toán tại chi nhánh", by: "Nguyễn Minh Anh" },
    ],
    tasks: [
      { text: "Kích hoạt dịch vụ ACB ONE", done: false },
      { text: "Giới thiệu tiết kiệm kỳ hạn ngắn", done: false },
    ],
  },
};

const tabs = ["Tổng quan", "Sản phẩm", "Giao dịch", "Lịch sử", "Công việc"];

interface Props {
  customer: Customer | null;
  onClose: () => void;
}

export function CustomerModal({ customer, onClose }: Props) {
  const [activeTab, setActiveTab] = useState("Tổng quan");
  const [tasks, setTasks] = useState<Record<number, any[]>>({});

  if (!customer) return null;

  const detail = customerDetails[customer.id] || buildLeadCustomerDetail(customer);
  const customerTasks = tasks[customer.id] ?? detail.tasks;

  const toggleTask = (i: number) => {
    const updated = customerTasks.map((t: any, idx: number) =>
      idx === i ? { ...t, done: !t.done } : t
    );
    setTasks((prev) => ({ ...prev, [customer.id]: updated }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)" }}
      onClick={onClose}
    >
      <div
        className="relative rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{
          background: "var(--background)",
          width: "min(820px, 95vw)",
          maxHeight: "88vh",
          border: "1px solid var(--border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header banner */}
        <div
          className="px-5 pt-5 pb-4 flex items-start gap-4"
          style={{
            background: `linear-gradient(135deg, var(--acb-sidebar) 0%, var(--acb-blue) 100%)`,
          }}
        >
          {/* Avatar */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0 border-2 border-white/30"
            style={{ background: customer.avatarBg }}
          >
            {customer.avatar}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-white">{customer.name}</h2>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: customer.segColor + "33", color: "#fff", border: `1px solid ${customer.segColor}` }}
              >
                {customer.segment}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}
              >
                CIF: {customer.cif}
              </span>
            </div>
            <p className="text-white/70 text-xs mt-0.5">{detail.job}</p>

            {/* Quick stats */}
            <div className="flex items-center gap-4 mt-3">
              {[
                { label: "Tổng số dư", value: detail.totalBalance + " đ" },
                { label: "Điểm Loyalty", value: detail.loyaltyScore + "/100" },
                { label: "Rủi ro rời bỏ", value: detail.churnRisk },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-white/50 text-xs">{s.label}</p>
                  <p
                    className="text-xs font-semibold mt-0.5"
                    style={{
                      color: s.label === "Rủi ro rời bỏ" ? detail.churnColor : "white",
                    }}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-shrink-0">
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
              style={{ background: "var(--acb-gold)", color: "#fff" }}
            >
              <Phone size={12} /> Gọi ngay
            </button>
            <button
              className="p-1.5 rounded-lg transition-all hover:bg-white/20"
              style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
            >
              <Download size={14} />
            </button>
            <button
              className="p-1.5 rounded-lg transition-all hover:bg-white/20"
              style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
              onClick={onClose}
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex border-b px-5"
          style={{ borderColor: "var(--border)", background: "var(--card)" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-3 py-2.5 text-xs font-medium transition-all border-b-2 -mb-px"
              style={{
                borderColor: activeTab === tab ? "var(--acb-blue)" : "transparent",
                color: activeTab === tab ? "var(--primary)" : "var(--muted-foreground)",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-5" style={{ background: "var(--background)" }}>

          {/* TỔNG QUAN */}
          {activeTab === "Tổng quan" && (
            <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {/* Contact info */}
              <div
                className="rounded-xl p-4 border"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>
                  Thông tin liên hệ
                </p>
                {[
                  { icon: Phone, label: detail.phone },
                  { icon: Mail, label: detail.email },
                  { icon: MapPin, label: detail.address },
                  { icon: Calendar, label: "Sinh ngày: " + detail.dob },
                  { icon: CreditCard, label: "Thu nhập: " + detail.income },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-start gap-2 mb-2">
                    <Icon size={13} className="flex-shrink-0 mt-0.5" style={{ color: "var(--primary)" }} />
                    <span className="text-xs" style={{ color: "var(--foreground)" }}>{label}</span>
                  </div>
                ))}
              </div>

              {/* Transaction chart */}
              <div
                className="rounded-xl p-4 border"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>
                  Giao dịch 6 tháng (triệu đ)
                </p>
                <ResponsiveContainer width="100%" height={100}>
                  <BarChart data={detail.txnData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid var(--border)" }}
                      formatter={(v: any) => [v + " tr", "Giao dịch"]}
                    />
                    <Bar dataKey="val" radius={[3, 3, 0, 0]} barSize={14}>
                      {detail.txnData.map((_: any, i: number) => (
                        <Cell key={i} fill={i === detail.txnData.length - 1 ? "#f97316" : "#004b9a"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>

                {/* Loyalty score bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Điểm Loyalty</span>
                    <span className="text-xs font-semibold" style={{ color: "var(--primary)" }}>
                      {detail.loyaltyScore}/100
                    </span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: "var(--muted)" }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${detail.loyaltyScore}%`,
                        background: detail.loyaltyScore >= 70 ? "#16a34a" : detail.loyaltyScore >= 50 ? "#d97706" : "#dc2626",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* RM Note */}
              <div
                className="rounded-xl p-4 border col-span-2"
                style={{ background: "#fffbeb", borderColor: "#fde68a" }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <Star size={13} fill="#f59e0b" stroke="#f59e0b" />
                  <p className="text-xs font-semibold" style={{ color: "#92400e" }}>Ghi chú RM</p>
                </div>
                <p className="text-xs" style={{ color: "#78350f" }}>{detail.rmNote}</p>
              </div>
            </div>
          )}

          {/* SẢN PHẨM */}
          {activeTab === "Sản phẩm" && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>
                Sản phẩm đang sử dụng ({detail.products.length})
              </p>
              {detail.products.map((p: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all hover:shadow-sm"
                  style={{ background: "var(--card)", borderColor: "var(--border)" }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: p.color + "15" }}
                  >
                    <CreditCard size={16} style={{ color: p.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium" style={{ color: "var(--foreground)" }}>{p.name}</p>
                    <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{p.amount} đ</p>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: p.color + "15", color: p.color }}
                  >
                    {p.status}
                  </span>
                  <ChevronRight size={14} style={{ color: "var(--muted-foreground)" }} />
                </div>
              ))}

              <button
                className="w-full mt-2 py-2 rounded-xl border-2 border-dashed text-xs transition-all hover:border-solid"
                style={{ borderColor: "var(--primary)", color: "var(--primary)" }}
              >
                + Thêm sản phẩm mới
              </button>
            </div>
          )}

          {/* GIAO DỊCH */}
          {activeTab === "Giao dịch" && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>
                Biểu đồ giao dịch 6 tháng
              </p>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={detail.txnData} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 8 }}
                    formatter={(v: any) => [v + " triệu đ", "Tổng GD"]}
                  />
                  <Bar dataKey="val" radius={[4, 4, 0, 0]} barSize={28}>
                    {detail.txnData.map((_: any, i: number) => (
                      <Cell key={i} fill={i === detail.txnData.length - 1 ? "#f97316" : "#004b9a"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <div
                className="mt-4 rounded-xl p-3 border text-center"
                style={{ background: "var(--muted)", borderColor: "var(--border)" }}
              >
                <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  Dữ liệu giao dịch chi tiết được tải từ hệ thống core banking
                </p>
                <button
                  className="mt-2 text-xs px-3 py-1.5 rounded-lg"
                  style={{ background: "var(--primary)", color: "#fff" }}
                >
                  Xem lịch sử giao dịch đầy đủ
                </button>
              </div>
            </div>
          )}

          {/* LỊCH SỬ */}
          {activeTab === "Lịch sử" && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--muted-foreground)" }}>
                Lịch sử tương tác
              </p>
              <div className="relative pl-4">
                {detail.history.map((h: any, i: number) => (
                  <div key={i} className="relative pb-4">
                    {i < detail.history.length - 1 && (
                      <div
                        className="absolute left-[-9px] top-2 bottom-0 w-px"
                        style={{ background: "var(--border)" }}
                      />
                    )}
                    <div
                      className="absolute left-[-13px] top-1.5 w-2 h-2 rounded-full border-2"
                      style={{ background: "var(--primary)", borderColor: "white" }}
                    />
                    <div
                      className="rounded-xl p-3 border"
                      style={{ background: "var(--card)", borderColor: "var(--border)" }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium" style={{ color: "var(--foreground)" }}>{h.action}</span>
                        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{h.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center text-white"
                          style={{ background: "var(--primary)", fontSize: "9px" }}
                        >
                          {h.by.charAt(0)}
                        </div>
                        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{h.by}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CÔNG VIỆC */}
          {activeTab === "Công việc" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>
                  Công việc liên quan
                </p>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "var(--secondary)", color: "var(--primary)" }}
                >
                  {customerTasks.filter((t: any) => !t.done).length} chưa xong
                </span>
              </div>
              <div className="space-y-2">
                {customerTasks.map((t: any, i: number) => (
                  <button
                    key={i}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all hover:shadow-sm"
                    style={{
                      background: t.done ? "var(--muted)" : "var(--card)",
                      borderColor: "var(--border)",
                    }}
                    onClick={() => toggleTask(i)}
                  >
                    {t.done ? (
                      <CheckCircle2 size={16} style={{ color: "var(--primary)" }} />
                    ) : (
                      <Circle size={16} style={{ color: "var(--muted-foreground)" }} />
                    )}
                    <span
                      className="text-xs"
                      style={{
                        color: t.done ? "var(--muted-foreground)" : "var(--foreground)",
                        textDecoration: t.done ? "line-through" : "none",
                      }}
                    >
                      {t.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
