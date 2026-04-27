import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import AdminConfirmModal from "../components/AdminConfirmModal";
// ─── Inline SVG Icons ─────────────────────────────────────────────────────────
function BookOpenIcon({ size = 18 }) {
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

function GraduationCapIcon({ size = 26 }) {
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
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function ShieldIcon({ size = 26 }) {
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
      <path d="M12 3l7 4v5c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V7l7-4z" />
    </svg>
  );
}

function ArrowRightIcon({ size = 16 }) {
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

function BrainIcon({ size = 14 }) {
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

function TargetIcon({ size = 14 }) {
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

function AwardIcon({ size = 14 }) {
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

function UsersIcon({ size = 14 }) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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

function SettingsIcon({ size = 14 }) {
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
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="m4.93 4.93 2.83 2.83" />
      <path d="m16.24 16.24 2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="m4.93 19.07 2.83-2.83" />
      <path d="m16.24 7.76 2.83-2.83" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function CheckCircle2Icon({ size = 14 }) {
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

// ─── Role Card ────────────────────────────────────────────────────────────────
function RoleCard({ role, isHovered, onHover, onLeave, onClick }) {
  const Icon = role.id === "student" ? GraduationCapIcon : ShieldIcon;

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        position: "relative",
        flex: 1,
        minWidth: "320px",
        maxWidth: "520px",
        cursor: "pointer",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "-8px",
          borderRadius: "30px",
          background: role.glow,
          filter: "blur(24px)",
          opacity: isHovered ? 1 : 0.55,
          transition: "opacity 0.25s ease",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderRadius: "24px",
          overflow: "hidden",
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(10px)",
          border: isHovered
            ? `1.5px solid ${role.borderActive}`
            : "1px solid rgba(226,232,240,0.9)",
          boxShadow: isHovered
            ? "0 22px 50px rgba(15,23,42,0.12)"
            : "0 14px 32px rgba(15,23,42,0.08)",
          transition: "all 0.25s ease",
        }}
      >
        <div
          style={{
            height: "5px",
            background: role.headerGradient,
          }}
        />

        <div
          style={{
            padding: "28px 28px 22px",
            background: role.softBackground,
            borderBottom: "1px solid rgba(226,232,240,0.8)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "16px",
              marginBottom: "18px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "18px",
                background: role.headerGradient,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                boxShadow: role.iconShadow,
                transform: isHovered ? "scale(1.06) rotate(4deg)" : "scale(1)",
                transition: "transform 0.25s ease",
              }}
            >
              <Icon size={30} />
            </div>

            <div
              style={{
                padding: "8px 12px",
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: role.badgeText,
                background: role.badgeBg,
                whiteSpace: "nowrap",
              }}
            >
              {role.tagline}
            </div>
          </div>

          <h2
            style={{
              fontSize: "30px",
              fontWeight: 700,
              color: "#0f172a",
              margin: "0 0 8px 0",
              letterSpacing: "-0.02em",
            }}
          >
            {role.label}
          </h2>

          <p
            style={{
              margin: 0,
              fontSize: "15px",
              lineHeight: 1.7,
              color: "#475569",
              maxWidth: "420px",
            }}
          >
            {role.description}
          </p>
        </div>

        <div style={{ padding: "24px 28px 28px" }}>
          <div style={{ marginBottom: "22px" }}>
            {role.features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 0",
                    borderBottom:
                      index === role.features.length - 1
                        ? "none"
                        : "1px solid #f1f5f9",
                  }}
                >
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "10px",
                      background: feature.bg,
                      color: feature.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <FeatureIcon size={14} />
                  </div>

                  <span
                    style={{
                      fontSize: "14px",
                      color: "#334155",
                      lineHeight: 1.55,
                      fontWeight: 500,
                    }}
                  >
                    {feature.text}
                  </span>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            style={{
              width: "100%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "14px 18px",
              border: "none",
              borderRadius: "14px",
              cursor: "pointer",
              background: role.headerGradient,
              color: "white",
              fontWeight: 600,
              fontSize: "14.5px",
              boxShadow: role.buttonShadow,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              transform: isHovered ? "translateY(-1px)" : "translateY(0)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = role.buttonShadowHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = isHovered
                ? "translateY(-1px)"
                : "translateY(0)";
              e.currentTarget.style.boxShadow = role.buttonShadow;
            }}
          >
            Continue as {role.label}
            <ArrowRightIcon size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main ChooseRoleScreen ────────────────────────────────────────────────────
export default function ChooseRoleScreen() {
  const navigate = useNavigate();
  const [hoveredRole, setHoveredRole] = useState(null);
  
  const { isFirstUse, markAsUsed, activeDataset, isLoading } = useAppContext();
  const [showAdminConfirmModal, setShowAdminConfirmModal] = useState(false);

  const roles = useMemo(
    () => [
      {
        id: "student",
        label: "Student",
        tagline: "Personal Growth",
        description:
          "Access your personalized learning profile, monitor study progress, and receive AI-guided insights to improve your learning strategy.",
        accent: "#059669",
        accent2: "#2563eb",
        borderActive: "rgba(16,185,129,0.45)",
        badgeBg: "#d1fae5",
        badgeText: "#047857",
        softBackground:
          "linear-gradient(135deg, rgba(236,253,245,0.95), rgba(255,255,255,0.92))",
        headerGradient: "linear-gradient(135deg,#10b981,#059669)",
        glow: "radial-gradient(circle, rgba(16,185,129,0.18), rgba(16,185,129,0.02) 70%)",
        iconShadow: "0 10px 24px rgba(16,185,129,0.30)",
        buttonShadow: "0 8px 24px rgba(5,150,105,0.28)",
        buttonShadowHover: "0 12px 28px rgba(5,150,105,0.38)",
        stats: { users: "10,000+", rating: "4.8/5" },
        features: [
          {
            icon: BrainIcon,
            text: "AI-powered learning insights",
            bg: "#ecfdf5",
            color: "#059669",
          },
          {
            icon: TrendingUpIcon,
            text: "Track your progress over time",
            bg: "#eff6ff",
            color: "#2563eb",
          },
          {
            icon: TargetIcon,
            text: "Personalized recommendations",
            bg: "#f5f3ff",
            color: "#7c3aed",
          },
          {
            icon: AwardIcon,
            text: "Achievement and outcome tracking",
            bg: "#fffbeb",
            color: "#d97706",
          },
        ],
      },
      {
        id: "administrator",
        label: "Administrator",
        tagline: "Management Control",
        description:
          "Monitor cohort performance, analyze class-level learning behavior, and manage educational insights with a broader academic view.",
        accent: "#2563eb",
        accent2: "#0891b2",
        borderActive: "rgba(59,130,246,0.45)",
        badgeBg: "#dbeafe",
        badgeText: "#1d4ed8",
        softBackground:
          "linear-gradient(135deg, rgba(239,246,255,0.95), rgba(255,255,255,0.92))",
        headerGradient: "linear-gradient(135deg,#3b82f6,#2563eb)",
        glow: "radial-gradient(circle, rgba(59,130,246,0.18), rgba(59,130,246,0.02) 70%)",
        iconShadow: "0 10px 24px rgba(37,99,235,0.28)",
        buttonShadow: "0 8px 24px rgba(37,99,235,0.25)",
        buttonShadowHover: "0 12px 28px rgba(37,99,235,0.34)",
        stats: { users: "500+", rating: "4.9/5" },
        features: [
          {
            icon: UsersIcon,
            text: "Manage student cohorts",
            bg: "#eff6ff",
            color: "#2563eb",
          },
          {
            icon: BarChart3Icon,
            text: "Class-wide analytics dashboard",
            bg: "#ecfeff",
            color: "#0891b2",
          },
          {
            icon: SettingsIcon,
            text: "Configure learning models",
            bg: "#eef2ff",
            color: "#4f46e5",
          },
          {
            icon: CheckCircle2Icon,
            text: "Performance monitoring workflow",
            bg: "#eff6ff",
            color: "#1d4ed8",
          },
        ],
      },
    ],
    [],
  );

  const handleSelectRole = (role) => {
    if (isLoading) return; // Prevent clicks while initializing

    if (role === "student") {
      navigate("/student/dashboard");
      return;
    }

    // Role is Administrator
    if (isFirstUse) {
      markAsUsed();
      navigate("/data-selection");
    } else {
      setShowAdminConfirmModal(true);
    }
  };

  return (
    <div
      className="h-screen"
      style={{
        background:
          "linear-gradient(150deg,#f0fdf4 0%,#ffffff 55%,#eff6ff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Loading Overlay */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm transition-opacity duration-300 ${
          isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
        <p className="text-slate-600 font-medium tracking-wide animate-pulse">
          Initializing System...
        </p>
      </div>
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
            left: "8%",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(16,185,129,0.08),transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "18%",
            right: "-6%",
            width: "620px",
            height: "620px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(59,130,246,0.06),transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Navbar */}
      <nav
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          position: "relative",
          zIndex: 5,
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

        <button
          type="button"
          onClick={() => navigate("/")}
          style={{
            border: "1px solid rgba(203,213,225,0.9)",
            background: "rgba(255,255,255,0.85)",
            color: "#334155",
            borderRadius: "12px",
            padding: "10px 14px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            backdropFilter: "blur(8px)",
          }}
        >
          Back to Home
        </button>
      </nav>

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "18px 32px 40px",
          height: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "34px" }}>
          <h1
            style={{
              fontSize: "clamp(2.4rem, 4vw, 3.4rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              color: "#0f172a",
              textAlign: "center",
              margin: "0 0 12px 0",
            }}
          >
            <span style={{ display: "block" }}>Choose Your</span>
            <span
              style={{
                display: "block",
                background:
                  "linear-gradient(90deg,#059669,#0d9488 50%,#2563eb)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                paddingBottom: "0.1em",
              }}
            >
              Analytics Workspace
            </span>
          </h1>

          <p
            style={{
              fontSize: "15px",
              color: "#64748b",
              lineHeight: 1.7,
              maxWidth: "660px",
              textAlign: "center",
              margin: "0 auto",
              fontWeight: 400,
            }}
          >
            Continue as a student for personalized learning insights, or enter
            the administrator workspace to monitor broader class performance and
            engagement patterns.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            alignItems: "stretch",
            flexWrap: "wrap",
            marginBottom: "24px",
          }}
        >
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              isHovered={hoveredRole === role.id}
              onHover={() => setHoveredRole(role.id)}
              onLeave={() => setHoveredRole(null)}
              onClick={() => handleSelectRole(role.id)}
            />
          ))}
        </div>
      </div>

      {/* Admin Confirm Modal */}
      <AdminConfirmModal
        isOpen={showAdminConfirmModal}
        onClose={() => setShowAdminConfirmModal(false)}
        activeDataset={activeDataset}
        onContinue={() => navigate("/admin/dashboard")}
        onChangeDataset={() => navigate("/data-selection")}
      />
    </div>
  );
}
