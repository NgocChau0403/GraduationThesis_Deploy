/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";

// ─── Inline SVG Icons (Figma → lucide-react equivalents) ─────────────────────
function BookOpenIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function ZapIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function ArrowRightIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function SparklesIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M5 3l.9 2.4L8.3 6.3l-2.4.9L5 9.7l-.9-2.4L1.7 6.3l2.4-.9z" />
      <path d="M19 15l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9z" />
    </svg>
  );
}

function TargetIcon({ size = 12 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function AwardIcon({ size = 12 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function ClockIcon({ size = 12 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function CheckCircle2Icon({ size = 12 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function BarChart3Icon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
}

function ActivityIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function TrendingUpIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function BrainIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
      <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
      <path d="M6 18a4 4 0 0 1-1.967-.516" />
      <path d="M19.967 17.484A4 4 0 0 1 18 18" />
    </svg>
  );
}

// ─── Mini Donut Chart ─────────────────────────────────────────────────────────
function DonutChart({ value, color, label }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-16 h-16">
        <svg viewBox="0 0 72 72" className="w-full h-full -rotate-90">
          <circle
            cx="36"
            cy="36"
            r={r}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <circle
            cx="36"
            cy="36"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${dash} ${circ - dash}`}
            strokeLinecap="round"
          />
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-xs font-bold"
          style={{ color }}
        >
          {value}%
        </span>
      </div>
      <span className="text-[10px] text-gray-500 text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

// ─── Mini Bar Chart ───────────────────────────────────────────────────────────
function MiniBarChart() {
  const bars = [
    { day: "M", h: 55, color: "#10b981" },
    { day: "T", h: 75, color: "#10b981" },
    { day: "W", h: 40, color: "#10b981" },
    { day: "T", h: 85, color: "#059669" },
    { day: "F", h: 65, color: "#10b981" },
    { day: "S", h: 30, color: "#d1fae5" },
    { day: "S", h: 20, color: "#d1fae5" },
  ];
  // h-14 = 56px; use pixel heights so bars render correctly inside flex
  const maxH = 56;
  return (
    <div className="flex items-end gap-1" style={{ height: `${maxH}px` }}>
      {bars.map((b, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-end gap-0.5 flex-1"
        >
          <div
            className="w-full rounded-sm"
            style={{
              height: `${Math.round((b.h / 100) * maxH)}px`,
              background: b.color,
            }}
          />
          <span className="text-[8px] text-gray-400">{b.day}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Grade Indicator ──────────────────────────────────────────────────────────
function GradeIndicator({ grade, label }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
      <span className="text-[11px] text-gray-600 truncate pr-2">{label}</span>
      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex-shrink-0">
        {grade}
      </span>
    </div>
  );
}

// ─── 3D Browser Mockup ────────────────────────────────────────────────────────
function BrowserMockup() {
  const stats = [
    {
      label: "Effort Score",
      value: "75%",
      trend: "+5%",
      Icon: TargetIcon,
      colorClass: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Outcome Score",
      value: "85%",
      trend: "+12%",
      Icon: AwardIcon,
      colorClass: "text-blue-600 bg-blue-50",
    },
    {
      label: "Weekly Hours",
      value: "18h",
      trend: "+2h",
      Icon: ClockIcon,
      colorClass: "text-purple-600 bg-purple-50",
    },
    {
      label: "Completion",
      value: "92%",
      trend: "+8%",
      Icon: CheckCircle2Icon,
      colorClass: "text-amber-600 bg-amber-50",
    },
  ];

  return (
    <div
      className="relative w-full max-w-4xl mx-auto"
      style={{ perspective: "1200px" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 rounded-3xl blur-3xl -z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(52,211,153,0.2), rgba(96,165,250,0.2))",
          transform: "scale(0.95)",
        }}
      />

      {/* Browser frame */}
      <div
        className="rounded-2xl overflow-hidden border border-gray-200/80 bg-white"
        style={{
          transform: "rotateX(3deg) rotateY(-1deg)",
          transformStyle: "preserve-3d",
          boxShadow:
            "0 40px 80px -20px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)",
        }}
      >
        {/* Browser chrome */}
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white border border-gray-300 rounded-md px-4 py-1 text-[11px] text-gray-400 flex items-center gap-2 w-72">
              <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
              app.learninganalytics.io/dashboard
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gray-300/60" />
            <div className="w-4 h-4 rounded bg-gray-300/60" />
          </div>
        </div>

        {/* Dashboard content */}
        <div className="bg-gray-50 p-5">
          {/* Inner navbar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                style={{
                  background: "linear-gradient(135deg,#10b981,#059669)",
                }}
              >
                <SparklesIcon size={14} />
              </div>
              <span className="text-sm font-semibold text-gray-800">
                Learning Analytics
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-emerald-600 text-white text-[11px] rounded-lg">
                Dashboard
              </div>
              <div
                className="w-7 h-7 rounded-full"
                style={{
                  background: "linear-gradient(135deg,#10b981,#3b82f6)",
                }}
              />
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {stats.map(({ label, value, trend, Icon, colorClass }) => (
              <div
                key={label}
                className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <div className={`p-1 rounded-md ${colorClass}`}>
                    <Icon size={12} />
                  </div>
                  <span className="text-[10px] text-gray-500">{label}</span>
                </div>
                <div className="text-lg font-bold text-gray-900">{value}</div>
                <div className="text-[10px] text-emerald-600 font-medium">
                  {trend}
                </div>
              </div>
            ))}
          </div>

          {/* Charts grid */}
          <div className="grid grid-cols-12 gap-3">
            {/* Bar chart – col 5 */}
            <div className="col-span-5 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-gray-700">
                  Weekly Study Hours
                </span>
                <BarChart3Icon />
              </div>
              <MiniBarChart />
            </div>

            {/* Donut charts – col 4 */}
            <div className="col-span-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-gray-700">
                  Time Allocation
                </span>
                <ActivityIcon />
              </div>
              <div className="flex items-center justify-around">
                <DonutChart value={75} color="#10b981" label="Active Study" />
                <DonutChart value={58} color="#3b82f6" label="Review" />
              </div>
            </div>

            {/* Predicted grades – col 3 */}
            <div className="col-span-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-gray-700">
                  Predicted Grades
                </span>
                <span className="text-emerald-500">
                  <TrendingUpIcon />
                </span>
              </div>
              <GradeIndicator grade="A+" label="Mathematics" />
              <GradeIndicator grade="B+" label="Physics" />
              <GradeIndicator grade="A" label="CompSci" />
              <GradeIndicator grade="B" label="History" />
            </div>
          </div>

          {/* AI Insight bar */}
          <div
            className="mt-3 flex items-center gap-3 rounded-xl p-3 border border-emerald-100"
            style={{
              background: "linear-gradient(to right, #ecfdf5, #eff6ff)",
            }}
          >
            <div
              className="p-2 rounded-lg text-white"
              style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}
            >
              <BrainIcon size={16} />
            </div>
            <div className="flex-1">
              <div className="text-[11px] font-semibold text-gray-800">
                AI Insight · HIGH EFFORT / HIGH OUTCOME
              </div>
              <div className="text-[10px] text-gray-500">
                Your strategy is working — maintain consistency and optimize
                review cycles
              </div>
            </div>
            <div className="px-2 py-1 bg-emerald-600 text-white text-[10px] rounded-lg font-medium cursor-default">
              View Report
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main HomePage ────────────────────────────────────────────────────────────
export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(150deg,#f0fdf4 0%,#ffffff 55%,#eff6ff 100%)",
        position: "relative",
      }}
    >
      {/* Ambient glow orbs */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(16,185,129,0.08),transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "-5%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(59,130,246,0.06),transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* ── NAVBAR ── */}
      <nav
        style={{
          flexShrink: 0,
          height: "64px",
          display: "flex",
          alignItems: "center",
          padding: "0 48px",
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg,#10b981,#059669)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(16,185,129,0.3)",
              color: "white",
            }}
          >
            <BookOpenIcon size={18} />
          </div>
          <div>
            <div
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "#1f2937",
                textTransform: "uppercase",
                lineHeight: 1.3,
              }}
            >
              Learning Analytics Dashboard
            </div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 500,
                color: "#059669",
                letterSpacing: "0.04em",
              }}
            >
              AI-Assisted Data Analysis
            </div>
          </div>
        </div>
      </nav>

      {/* ── MAIN VERTICAL CONTENT ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "8px",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.025em",
            color: "#0f172a",
            textAlign: "center",
            margin: "0 0 12px 0",
          }}
        >
          <span style={{ display: "block" }}>Master Your</span>
          <span
            style={{
              display: "block",
              background: "linear-gradient(90deg,#059669,#0d9488 50%,#2563eb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              paddingBottom: "0.1em",
            }}
          >
            Study Flow
          </span>
          <span style={{ display: "block" }}>with AI Insights</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "15px",
            color: "#64748b",
            lineHeight: 1.6,
            maxWidth: "560px",
            textAlign: "center",
            margin: "0 0 20px 0",
            fontWeight: 400,
          }}
        >
          Unlock your learning potential with powerful analytics. Analyze your
          study habits based on real data to optimize your path to graduation.
        </p>

        {/* CTA button */}
        <div style={{ marginBottom: "24px" }}>
          <button
            id="start-analysis-btn"
            onClick={() => navigate("/choose-role")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              background: "linear-gradient(135deg,#059669,#047857)",
              color: "white",
              fontWeight: 600,
              fontSize: "14.5px",
              boxShadow: "0 6px 20px rgba(5,150,105,0.35)",
              transition: "transform 0.2s,box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 10px 28px rgba(5,150,105,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(5,150,105,0.35)";
            }}
          >
            <ZapIcon size={16} />
            Start Your Analysis
            <ArrowRightIcon size={16} />
          </button>
        </div>

        {/* Browser Mockup Container - Scaled to fit partially */}
        <div
          style={{
            position: "relative",
            width: "900px",
            maxWidth: "90%",
            margin: "0 auto",
            transform: "scale(0.85)",
            transformOrigin: "top center",
          }}
        >
          <BrowserMockup />

          {/* Floating badges overlapping bottom edge */}
          <div
            style={{
              position: "relative",
              marginTop: "-24px",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 16px",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "10px 16px",
                border: "1px solid rgba(16,185,129,0.15)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                animation: "bounce 1.5s infinite",
              }}
            >
              <CheckCircle2Icon size={16} color="#059669" />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#374151",
                }}
              >
                Personalized Insights
              </span>
            </div>

            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "10px 16px",
                border: "1px solid rgba(59,130,246,0.15)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                animation: "bounce 1.5s infinite",
                animationDelay: "0.4s",
              }}
            >
              <BrainIcon size={16} color="#2563eb" />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#374151",
                }}
              >
                AI-Powered Analysis
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
