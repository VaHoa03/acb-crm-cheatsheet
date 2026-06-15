import { List, Plus, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";

const initialTasks = [
  { id: 1, text: "Gọi Trần Văn Bình – tư vấn lãi suất vay nhà", done: false, priority: "high" },
  { id: 2, text: "Gửi email xác nhận lịch hẹn Nguyễn Thị Lan", done: false, priority: "medium" },
  { id: 3, text: "Cập nhật hồ sơ KYC – Phạm Thị Thu", done: true, priority: "high" },
  { id: 4, text: "Nộp báo cáo tháng 5 về hội sở", done: true, priority: "low" },
  { id: 5, text: "Review đề xuất vay doanh nghiệp ABC Corp", done: false, priority: "medium" },
];

const prioColor = {
  high: "#dc2626",
  medium: "#d97706",
  low: "#6b7280",
};

export function QuickListPanel() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");

  const toggle = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: newTask.trim(), done: false, priority: "medium" },
    ]);
    setNewTask("");
  };

  const pending = tasks.filter((t) => !t.done).length;

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
          <List size={13} style={{ color: "var(--primary)" }} />
          <span
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: "var(--muted-foreground)" }}
          >
            Danh Sách Nhanh
          </span>
          <span
            className="text-xs px-1.5 py-0.5 rounded-full"
            style={{ background: "var(--secondary)", color: "var(--primary)" }}
          >
            {pending} việc
          </span>
        </div>
      </div>

      <div className="px-3 py-2 space-y-1">
        {tasks.map((task) => (
          <button
            key={task.id}
            className="w-full flex items-start gap-2 p-1.5 rounded-lg hover:bg-secondary/50 transition-all text-left"
            onClick={() => toggle(task.id)}
          >
            {task.done ? (
              <CheckCircle2 size={14} style={{ color: "var(--primary)", flexShrink: 0, marginTop: 1 }} />
            ) : (
              <Circle size={14} style={{ color: prioColor[task.priority as keyof typeof prioColor], flexShrink: 0, marginTop: 1 }} />
            )}
            <span
              className="text-xs"
              style={{
                color: task.done ? "var(--muted-foreground)" : "var(--foreground)",
                textDecoration: task.done ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
          </button>
        ))}
      </div>

      {/* Add task */}
      <div className="px-3 pb-3 flex gap-1.5">
        <input
          type="text"
          placeholder="Thêm công việc mới..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className="flex-1 px-2.5 py-1.5 rounded-lg text-xs outline-none"
          style={{
            background: "var(--input-background)",
            border: "1px solid var(--border)",
            color: "var(--foreground)",
          }}
        />
        <button
          onClick={addTask}
          className="px-2.5 py-1.5 rounded-lg transition-all hover:opacity-80"
          style={{ background: "var(--primary)", color: "#fff" }}
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  );
}
