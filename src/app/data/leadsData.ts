export const stages = ["Tiếp cận", "Quan tâm", "Đề xuất", "Đàm phán", "Chốt"];
export const stageColors = ["#6b7280", "#0891b2", "#7c3aed", "#d97706", "#16a34a"];

// B.3: 4 nhóm Loại Lead theo spec
export const leadTypes = ["Tự tạo", "Chiến dịch", "Assigned", "KH Mới/HH"];
export const leadTypeColors: Record<string, string> = {
  "Tự tạo": "#0d9488",       // teal
  "Chiến dịch": "#6366f1",   // periwinkle
  "Assigned": "#ca8a04",     // yellow
  "KH Mới/HH": "#0284c7",   // sky
};

// C.1: Nguồn chiến dịch – chỉ còn 3 nguồn (bỏ Tự tạo)
export const campaignSources = ["Khối", "Vùng", "3D"];
export const campaignSourceColors: Record<string, string> = {
  "Khối": "#1e3a8a",   // navy
  "Vùng": "#0d9488",   // teal
  "3D": "#0284c7",     // sky
};

export type InteractionResult = "success" | "callback" | "rejected" | "no_answer";
export const interactionResultLabels: Record<InteractionResult, string> = {
  success: "Thành công",
  callback: "KH hẹn lại",
  rejected: "KH từ chối",
  no_answer: "Không liên lạc được",
};
export const interactionResultColors: Record<InteractionResult, string> = {
  success: "#16a34a",
  callback: "#ca8a04",
  rejected: "#dc2626",
  no_answer: "#6b7280",
};

export type LeadInteraction = {
  id: string;
  date: string;
  type: "call" | "zalo" | "email" | "meeting" | "note";
  title: string;
  description: string;
  result?: InteractionResult;
  duration?: number;
  nextSteps?: string;
};

export type Lead = {
  id: number;
  name: string;
  phone: string;
  email: string;
  source: string;
  product: string;
  productSuggestion: string;
  aiReason: string;
  value: number;
  stage: string;
  stageIdx: number;
  assignedDate: string;
  avatar: string;
  avatarBg: string;
  hot: boolean;
  aiScore: number;
  campaignId: number | null;
  leadType: string;
  interactions: LeadInteraction[];
};

export const leads: Lead[] = [
  {
    id: 1,
    name: "Công ty Bình Minh Tech",
    phone: "028 3822 1199",
    email: "ketoan@binhminhtech.vn",
    source: "Giới thiệu",
    product: "Tín dụng doanh nghiệp 5 tỷ",
    productSuggestion: "Hạn mức tín dụng doanh nghiệp 5 tỷ + tài khoản trả lương cho 40 nhân viên",
    aiReason: "Doanh thu tăng 24% so với cùng kỳ, dòng tiền ổn định, đã có 2 lần giải ngân đúng hạn trước đó.",
    value: 5000000000,
    stage: "Đàm phán",
    stageIdx: 3,
    assignedDate: "02/06",
    avatar: "B",
    avatarBg: "#7c3aed",
    hot: true,
    aiScore: 95,
    campaignId: 1,
    leadType: "Chiến dịch",
    interactions: [
      { id: "1-1", date: "2026-06-14", type: "call", title: "Cuộc gọi khám phá", description: "Trao đổi về hạn mức vay và điều kiện ân hạn", result: "callback" },
      { id: "1-2", date: "2026-06-12", type: "email", title: "Gửi quote giá", description: "Gửi quote chi tiết cho gói vay 5 tỷ", result: "success" },
      { id: "1-3", date: "2026-06-10", type: "meeting", title: "Meeting tại văn phòng khách", description: "Trao đổi chi tiết hồ sơ, điều kiện vay", duration: 45, result: "success" },
    ],
  },
  {
    id: 2,
    name: "Nguyễn Văn Phúc",
    phone: "0912 558 234",
    email: "phuc.nguyen88@gmail.com",
    source: "Website ACB",
    product: "Vay mua nhà 3.2 tỷ",
    productSuggestion: "Gói vay mua nhà lãi suất ưu đãi 6.9%/năm cố định 12 tháng đầu",
    aiReason: "Đã điền form tính lãi vay 3 lần trong tuần, thu nhập khai báo phù hợp hạn mức, khu vực BĐS đang có chương trình ưu đãi.",
    value: 3200000000,
    stage: "Đề xuất",
    stageIdx: 2,
    assignedDate: "05/06",
    avatar: "N",
    avatarBg: "#004b9a",
    hot: true,
    aiScore: 91,
    campaignId: 1,
    leadType: "Chiến dịch",
    interactions: [
      { id: "2-1", date: "2026-06-13", type: "email", title: "Gửi hồ sơ yêu cầu", description: "Gửi danh sách giấy tờ cần thiết", result: "success" },
      { id: "2-2", date: "2026-06-11", type: "zalo", title: "Nhắc nhở tính lãi", description: "Gửi Zalo remind về chương trình ưu đãi", result: "callback" },
    ],
  },
  {
    id: 3,
    name: "Trần Thị Mỹ",
    phone: "0978 112 456",
    email: "tranthimy.tk@gmail.com",
    source: "Chiến dịch SMS",
    product: "Tiết kiệm 1 tỷ",
    productSuggestion: "Tiết kiệm Online kỳ hạn 6 tháng, lãi suất 5.8%/năm",
    aiReason: "Khách hàng có số dư nhàn rỗi lớn trong 30 ngày qua, từng gửi tiết kiệm kỳ hạn ngắn 2 lần.",
    value: 1000000000,
    stage: "Quan tâm",
    stageIdx: 1,
    assignedDate: "07/06",
    avatar: "T",
    avatarBg: "#0891b2",
    hot: false,
    aiScore: 67,
    campaignId: 2,
    leadType: "Chiến dịch",
    interactions: [
      { id: "3-1", date: "2026-06-14", type: "note", title: "Ghi chú nội bộ", description: "Chưa liên hệ được, để lại message voice", result: "no_answer" },
    ],
  },
  {
    id: 4,
    name: "Lê Công Danh",
    phone: "0909 887 321",
    email: "danh.le@outlook.com",
    source: "Telesale",
    product: "Thẻ Platinum",
    productSuggestion: "Thẻ tín dụng Visa Platinum, hạn mức 80 triệu, miễn phí năm đầu",
    aiReason: "Chi tiêu thẻ debit trung bình 15tr/tháng, có lịch sử trả nợ tốt với khoản vay tiêu dùng cũ.",
    value: 100000000,
    stage: "Tiếp cận",
    stageIdx: 0,
    assignedDate: "09/06",
    avatar: "L",
    avatarBg: "#d97706",
    hot: false,
    aiScore: 54,
    campaignId: 4,
    leadType: "Assigned",
    interactions: [
      { id: "4-1", date: "2026-06-14", type: "call", title: "Cold call", description: "Gọi giới thiệu sản phẩm thẻ Platinum", result: "callback" },
    ],
  },
  {
    id: 5,
    name: "Đặng Kim Ngân",
    phone: "0933 445 998",
    email: "ngan.dang@gmail.com",
    source: "Giới thiệu",
    product: "Vay kinh doanh 1.5 tỷ",
    productSuggestion: "Vay kinh doanh hộ gia đình 1.5 tỷ, ân hạn gốc 6 tháng đầu",
    aiReason: "Đã chốt deal thành công, hồ sơ pháp lý đầy đủ và giải ngân đúng tiến độ.",
    value: 1500000000,
    stage: "Chốt",
    stageIdx: 4,
    assignedDate: "01/06",
    avatar: "Đ",
    avatarBg: "#16a34a",
    hot: false,
    aiScore: 60,
    campaignId: null,
    leadType: "Tự tạo",
    interactions: [
      { id: "5-1", date: "2026-05-28", type: "meeting", title: "Ký kết hợp đồng", description: "Ký kết hợp đồng vay và giải ngân", duration: 60, result: "success" },
      { id: "5-2", date: "2026-05-20", type: "call", title: "Thảo luận điều khoản", description: "Xác nhận lãi suất và thời hạn", result: "success" },
    ],
  },
  {
    id: 6,
    name: "Phạm Minh Tuấn",
    phone: "0987 234 119",
    email: "tuan.pham.cs@gmail.com",
    source: "Email Campaign",
    product: "Tiết kiệm 500tr",
    productSuggestion: "Tiết kiệm Online kỳ hạn 12 tháng, lãi suất 7.2%/năm",
    aiReason: "Mở email chiến dịch 4 lần, click vào lãi suất tiết kiệm online nhưng chưa điền form.",
    value: 500000000,
    stage: "Quan tâm",
    stageIdx: 1,
    assignedDate: "08/06",
    avatar: "P",
    avatarBg: "#6b7280",
    hot: false,
    aiScore: 72,
    campaignId: 2,
    leadType: "KH Mới/HH",
    interactions: [
      { id: "6-1", date: "2026-06-10", type: "email", title: "Follow up email", description: "Gửi email follow up với link đăng ký", result: "no_answer" },
    ],
  },
  {
    id: 7,
    name: "Vũ Thị Hồng",
    phone: "0944 778 220",
    email: "hong.vu89@gmail.com",
    source: "Zalo OA",
    product: "Tiết kiệm Online 200tr",
    productSuggestion: "Tiết kiệm Online kỳ hạn 6 tháng, ưu đãi tặng thêm 0.3% lãi suất cho KH mới",
    aiReason: "Tương tác với Zalo OA 5 lần trong tuần, đã hỏi về lãi suất tiết kiệm online qua chatbot.",
    value: 200000000,
    stage: "Tiếp cận",
    stageIdx: 0,
    assignedDate: "10/06",
    avatar: "V",
    avatarBg: "#0891b2",
    hot: true,
    aiScore: 88,
    campaignId: 2,
    leadType: "Chiến dịch",
    interactions: [
      { id: "7-1", date: "2026-06-14", type: "zalo", title: "Chat Zalo OA", description: "Khách hỏi về lãi suất via chatbot", result: "callback" },
    ],
  },
  {
    id: 8,
    name: "Đỗ Văn Khải",
    phone: "0938 661 045",
    email: "khai.do.acb@gmail.com",
    source: "SMS Campaign",
    product: "Vay mua nhà 1.8 tỷ",
    productSuggestion: "Gói vay mua nhà lãi suất ưu đãi 6.9%/năm cố định 12 tháng đầu",
    aiReason: "Đã gọi lại số hotline trong SMS 2 lần, thu nhập và vị trí công việc phù hợp hạn mức vay.",
    value: 1800000000,
    stage: "Tiếp cận",
    stageIdx: 0,
    assignedDate: "11/06",
    avatar: "Đ",
    avatarBg: "#d97706",
    hot: true,
    aiScore: 91,
    campaignId: 1,
    leadType: "Chiến dịch",
    interactions: [
      { id: "8-1", date: "2026-06-14", type: "call", title: "Cuộc gọi từ hotline", description: "Khách gọi sau SMS campaign", result: "success" },
      { id: "8-2", date: "2026-06-12", type: "zalo", title: "Zalo follow-up", description: "Gửi Zalo với thông tin chi tiết gói vay", result: "callback" },
    ],
  },
];

// C.2 + D.4: Campaign type với 7 KPI mới
export type CampaignKpiResult = {
  contactRate: number;      // % Tiếp cận
  convertRate: number;      // % Convert
  netLoanGrowth: number;    // Dư nợ tăng ròng (VNĐ)
  netCasaGrowth: number;    // CASA tăng ròng (VNĐ)
  netCkhGrowth: number;     // CKH/CCTG tăng ròng (VNĐ)
  feeBl: number;            // Phí BL (VNĐ)
  feeTtqtFx: number;        // Phí TTQT + FX (VNĐ)
};

export type Campaign = {
  id: number;
  name: string;
  type: string;
  status: string;
  statusColor: string;
  reach: number;
  reachTarget: number;
  leads: number;
  leadsTarget: number;
  converted: number;
  convertedTarget: number;
  start: string;
  end: string;
  budget: number;
  spent: number;
  progressPct: number;
  daysLeft: number;
  source: "Khối" | "Vùng" | "3D";
  kpiResult: CampaignKpiResult;
};

export const campaigns: Campaign[] = [
  {
    id: 1,
    name: "Tháng 6 – Vay nhà lãi suất ưu đãi",
    type: "SMS + Email",
    status: "Đang chạy",
    statusColor: "#16a34a",
    reach: 2400,
    reachTarget: 4000,
    leads: 87,
    leadsTarget: 120,
    converted: 12,
    convertedTarget: 20,
    start: "01/06",
    end: "30/06",
    budget: 50000000,
    spent: 28000000,
    progressPct: 37,
    daysLeft: 19,
    source: "Khối",
    kpiResult: {
      contactRate: 60.0,
      convertRate: 13.8,
      netLoanGrowth: 48000000000,
      netCasaGrowth: 2400000000,
      netCkhGrowth: 5600000000,
      feeBl: 120000000,
      feeTtqtFx: 85000000,
    },
  },
  {
    id: 2,
    name: "Khách hàng mới – Tiết kiệm Online",
    type: "Zalo OA",
    status: "Đang chạy",
    statusColor: "#16a34a",
    reach: 1850,
    reachTarget: 3000,
    leads: 63,
    leadsTarget: 100,
    converted: 8,
    convertedTarget: 15,
    start: "05/06",
    end: "25/06",
    budget: 30000000,
    spent: 18000000,
    progressPct: 30,
    daysLeft: 14,
    source: "Vùng",
    kpiResult: {
      contactRate: 61.7,
      convertRate: 12.7,
      netLoanGrowth: 0,
      netCasaGrowth: 1200000000,
      netCkhGrowth: 8400000000,
      feeBl: 0,
      feeTtqtFx: 45000000,
    },
  },
  {
    id: 3,
    name: "Tái gửi tiết kiệm Q2 – Diamond & Platinum",
    type: "Telesale",
    status: "Chuẩn bị",
    statusColor: "#d97706",
    reach: 120,
    reachTarget: 500,
    leads: 0,
    leadsTarget: 40,
    converted: 0,
    convertedTarget: 10,
    start: "15/06",
    end: "30/06",
    budget: 15000000,
    spent: 0,
    progressPct: 0,
    daysLeft: 19,
    source: "3D",
    kpiResult: {
      contactRate: 0,
      convertRate: 0,
      netLoanGrowth: 0,
      netCasaGrowth: 0,
      netCkhGrowth: 0,
      feeBl: 0,
      feeTtqtFx: 0,
    },
  },
  {
    id: 4,
    name: "Cross-sell thẻ tín dụng T5",
    type: "SMS",
    status: "Kết thúc",
    statusColor: "#6b7280",
    reach: 3100,
    reachTarget: 3000,
    leads: 145,
    leadsTarget: 120,
    converted: 31,
    convertedTarget: 25,
    start: "01/05",
    end: "31/05",
    budget: 40000000,
    spent: 39000000,
    progressPct: 100,
    daysLeft: 0,
    source: "Khối",
    kpiResult: {
      contactRate: 103.3,
      convertRate: 21.4,
      netLoanGrowth: 12000000000,
      netCasaGrowth: 3100000000,
      netCkhGrowth: 0,
      feeBl: 0,
      feeTtqtFx: 320000000,
    },
  },
];

export const funnelData = [
  { stage: "Tiếp cận", count: 120 },
  { stage: "Quan tâm", count: 74 },
  { stage: "Đề xuất", count: 38 },
  { stage: "Đàm phán", count: 21 },
  { stage: "Chốt", count: 9 },
];

export const newLeadsCount = leads.length;

export function formatVal(n: number) {
  if (n >= 1000000000) return (n / 1000000000).toFixed(1) + " tỷ";
  if (n >= 1000000) return (n / 1000000).toFixed(0) + " tr";
  return n.toString();
}

export function getCampaign(id: number | null) {
  if (id === null) return undefined;
  return campaigns.find((c) => c.id === id);
}
