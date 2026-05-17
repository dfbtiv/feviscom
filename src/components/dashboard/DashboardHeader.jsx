import { useState } from "react";
import { Leaf, Bell, LogIn, Menu, X } from "lucide-react";
import { COLORS } from "@/dashboard/constants/dashboardConfig";

const DashboardHeader = ({ user, isLoggedIn, onLogin, onMenuToggle, menuOpen }) => {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 64,
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(77,113,17,0.12)",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        gap: 14,
      }}
    >
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuToggle}
        className="dashboard-hamburger"
        aria-label="Toggle menu"
        style={{
          display: "none",          /* overridden by media query in DashboardLayout */
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          borderRadius: 10,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          color: COLORS.primary,
          flexShrink: 0,
        }}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: "auto" }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: COLORS.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Leaf size={18} color={COLORS.lime} />
        </div>
        <span
          style={{
            fontWeight: 800,
            fontSize: 17,
            color: COLORS.primary,
            letterSpacing: "-0.3px",
          }}
        >
          EcoVision
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: COLORS.primary,
            background: COLORS.ecoLime,
            padding: "2px 9px",
            borderRadius: 20,
            border: `1px solid ${COLORS.lime}`,
            letterSpacing: "0.2px",
          }}
        >
          Dashboard
        </span>
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Notification bell — logged in only */}
        {isLoggedIn && (
          <button
            aria-label="Notifications"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: "1px solid rgba(77,113,17,0.15)",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: COLORS.primary,
              position: "relative",
            }}
          >
            <Bell size={17} />
            {/* Unread dot */}
            <span
              style={{
                position: "absolute",
                top: 7,
                right: 7,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#EF5350",
                border: "1.5px solid white",
              }}
            />
          </button>
        )}

        {/* User avatar / sign-in button */}
        {isLoggedIn ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${COLORS.primary}, #8BC34A)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {user.avatar}
            </div>
            <div style={{ lineHeight: 1.3 }} className="dashboard-username">
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2e0a" }}>
                {user.name.split(" ")[0]}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: COLORS.primary,
                  fontWeight: 700,
                  background: COLORS.ecoLime,
                  padding: "1px 6px",
                  borderRadius: 10,
                  display: "inline-block",
                }}
              >
                {user.plan}
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={onLogin}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              borderRadius: 10,
              border: "none",
              background: COLORS.primary,
              color: "white",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            <LogIn size={15} />
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;