import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff, Lock, User, Shield } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ thông tin đăng nhập.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/welcome");
    }, 1200);
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Left panel – branding */}
      <div
        className="hidden lg:flex lg:w-[55%] flex-col justify-between p-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #001a4d 0%, #002d6e 40%, #004b9a 100%)",
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 -left-16 w-72 h-72 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-1/2 right-0 w-48 h-48 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "#ffffff" }}
            >
              <span className="font-black text-lg" style={{ color: "#002d6e" }}>ACB</span>
            </div>
            <div>
              <p className="text-white font-bold text-xl tracking-wide">ACB CRM</p>
              <p className="text-white/50 text-xs">Sales Management System</p>
            </div>
          </div>
        </div>

        {/* Center content */}
        <div className="relative z-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs"
            style={{ background: "rgba(249,115,22,0.2)", color: "#fdba74", border: "1px solid rgba(249,115,22,0.3)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
            Phiên bản 2026 · Cập nhật mới nhất
          </div>

          <h1 className="text-white mb-4" style={{ fontSize: "2.2rem", lineHeight: 1.2, fontWeight: 700 }}>
            Quản lý bán hàng<br />
            <span style={{ color: "#fdba74" }}>thông minh hơn</span><br />
            với AI
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-sm">
            Nền tảng CRM chuyên biệt dành cho Relationship Manager ngân hàng ACB.
            Tối ưu hoá quy trình bán hàng, quản lý khách hàng và đạt KPI nhanh hơn.
          </p>

          {/* Features */}
          <div className="mt-8 space-y-3">
            {[
              "Gợi ý bán chéo thông minh từ AI",
              "Theo dõi pipeline real-time",
              "Cảnh báo churn risk tự động",
            ].map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(249,115,22,0.25)" }}
                >
                  <span className="text-orange-400 text-xs">✓</span>
                </div>
                <span className="text-white/70 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10 flex items-center gap-2">
          <Shield size={13} className="text-white/40" />
          <span className="text-white/40 text-xs">Bảo mật chuẩn ISO 27001 · Mã hoá AES-256</span>
        </div>
      </div>

      {/* Right panel – form */}
      <div
        className="flex-1 flex items-center justify-center p-8"
        style={{ background: "#f0f4f9" }}
      >
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "#002d6e" }}
            >
              <span className="font-black text-sm text-white">ACB</span>
            </div>
            <span className="font-bold text-lg" style={{ color: "#002d6e" }}>ACB CRM</span>
          </div>

          <h2 className="mb-1" style={{ color: "#0d1b2a", fontSize: "1.6rem", fontWeight: 700 }}>
            Đăng nhập
          </h2>
          <p className="text-sm mb-8" style={{ color: "#6b7a95" }}>
            Chào mừng trở lại! Nhập thông tin để tiếp tục.
          </p>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#0d1b2a" }}>
              Tên đăng nhập / Mã nhân viên
            </label>
            <div className="relative">
              <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#6b7a95" }} />
              <input
                type="text"
                placeholder="VD: NMA12345"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "#fff",
                  border: `1.5px solid ${username ? "#004b9a" : "#e2e8f0"}`,
                  color: "#0d1b2a",
                  boxShadow: username ? "0 0 0 3px rgba(0,75,154,0.08)" : "none",
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-xs font-medium mb-1.5" style={{ color: "#0d1b2a" }}>
              Mật khẩu
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#6b7a95" }} />
              <input
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full pl-10 pr-10 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "#fff",
                  border: `1.5px solid ${password ? "#004b9a" : "#e2e8f0"}`,
                  color: "#0d1b2a",
                  boxShadow: password ? "0 0 0 3px rgba(0,75,154,0.08)" : "none",
                }}
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5"
                onClick={() => setShowPw(!showPw)}
              >
                {showPw ? (
                  <EyeOff size={15} style={{ color: "#6b7a95" }} />
                ) : (
                  <Eye size={15} style={{ color: "#6b7a95" }} />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end mb-5">
            <button className="text-xs hover:underline" style={{ color: "#004b9a" }}>
              Quên mật khẩu?
            </button>
          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-4 px-3 py-2.5 rounded-lg text-xs"
              style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.99] disabled:opacity-70"
            style={{
              background: loading
                ? "#6b7a95"
                : "linear-gradient(135deg, #002d6e 0%, #004b9a 100%)",
              color: "#fff",
              boxShadow: "0 4px 14px rgba(0,75,154,0.35)",
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span
                  className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                  style={{ display: "inline-block" }}
                />
                Đang xác thực...
              </span>
            ) : (
              "Đăng nhập"
            )}
          </button>

          {/* Demo hint */}
          <div
            className="mt-6 p-3 rounded-xl text-xs text-center"
            style={{ background: "#e8f0fb", color: "#004b9a", border: "1px solid #bfd4f5" }}
          >
            <strong>Demo:</strong> Nhập bất kỳ thông tin nào để tiếp tục
          </div>

          <p className="text-center text-xs mt-6" style={{ color: "#a0aec0" }}>
            © 2026 Ngân hàng TMCP Á Châu (ACB). Bảo lưu mọi quyền.
          </p>
        </div>
      </div>
    </div>
  );
}
