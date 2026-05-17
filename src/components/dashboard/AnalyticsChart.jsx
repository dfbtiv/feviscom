import { BarChart3, Shield } from "lucide-react";
import { COLORS, WEEKLY_BAR_DATA, WEEK_LABELS } from "@/dashboard/constants/dashboardConfig";

const AnalyticsChart = ({ isLoggedIn }) => {
  const maxVal = Math.max(...WEEKLY_BAR_DATA);

  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        padding: "24px",
        border: "1px solid rgba(77,113,17,0.1)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
        <BarChart3 size={18} color={COLORS.primary} />
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1a2e0a", margin: 0 }}>
          Waste Analytics
        </h2>
        {!isLoggedIn && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: COLORS.primary,
              background: COLORS.ecoLime,
              padding: "2px 9px",
              borderRadius: 20,
              marginLeft: 4,
              border: `1px solid ${COLORS.lime}`,
            }}
          >
            Login Required
          </span>
        )}
      </div>

      {/* Chart body */}
      {isLoggedIn ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 10,
              height: 130,
              padding: "0 4px",
            }}
          >
            {WEEKLY_BAR_DATA.map((val, i) => {
              const heightPct = Math.round((val / maxVal) * 100);
              const isToday = i === 4; // Friday = today (example)
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    height: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    title={`${val} scans`}
                    style={{
                      width: "100%",
                      height: `${heightPct}%`,
                      borderRadius: "6px 6px 0 0",
                      background: isToday
                        ? COLORS.primary
                        : COLORS.ecoLime,
                      border: isToday
                        ? "none"
                        : `1px solid ${COLORS.lime}80`,
                      transition: "height 0.4s ease",
                      cursor: "pointer",
                    }}
                  />
                  <div style={{ fontSize: 10, color: isToday ? COLORS.primary : "#aaa", fontWeight: isToday ? 700 : 400 }}>
                    {WEEK_LABELS[i]}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div
            style={{
              marginTop: 16,
              display: "flex",
              gap: 20,
              fontSize: 11,
              color: "#888",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  borderRadius: 3,
                  background: COLORS.ecoLime,
                  border: `1px solid ${COLORS.lime}`,
                }}
              />
              Weekly scans
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  borderRadius: 3,
                  background: COLORS.primary,
                }}
              />
              Today
            </span>
          </div>
        </>
      ) : (
        /* Locked / blurred placeholder */
        <div
          style={{
            height: 130,
            borderRadius: 10,
            position: "relative",
            overflow: "hidden",
            background:
              "repeating-linear-gradient(90deg, #f0f0f0 0, #f0f0f0 1px, white 1px, white 12%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(3px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <Shield size={28} color="#ccc" />
            <div style={{ fontSize: 13, color: "#aaa", fontWeight: 600 }}>
              Sign in to view analytics
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsChart;