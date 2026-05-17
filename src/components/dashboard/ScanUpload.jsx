import { Upload, Scan, Leaf } from "lucide-react";
import { COLORS } from "@/dashboard/constants/dashboardConfig";

const ScanUpload = ({ onScan }) => {
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && onScan) onScan(file);
  };

  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        padding: "24px",
        border: "1px solid rgba(77,113,17,0.1)",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
        <Scan size={18} color={COLORS.primary} />
        <h2
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#1a2e0a",
            margin: 0,
          }}
        >
          Scan Waste
        </h2>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${COLORS.lime}`,
          borderRadius: 14,
          padding: "36px 20px",
          textAlign: "center",
          background: COLORS.ecoLime + "55",
          cursor: "pointer",
          transition: "border-color 0.2s, background 0.2s",
        }}
        onClick={() => document.getElementById("scan-file-input")?.click()}
      >
        {/* Hidden file input */}
        <input
          id="scan-file-input"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files?.[0] && onScan) onScan(e.target.files[0]);
          }}
        />

        {/* Upload icon */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${COLORS.primary}22, ${COLORS.lime}44)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 14px",
          }}
        >
          <Upload size={24} color={COLORS.primary} />
        </div>

        <div
          style={{ fontSize: 14, fontWeight: 700, color: "#1a2e0a", marginBottom: 6 }}
        >
          Drop image here
        </div>
        <div style={{ fontSize: 12, color: "#777", marginBottom: 18 }}>
          or click to browse — JPG, PNG, WEBP
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            document.getElementById("scan-file-input")?.click();
          }}
          style={{
            padding: "9px 22px",
            borderRadius: 10,
            border: "none",
            background: COLORS.primary,
            color: "white",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            transition: "opacity 0.15s",
          }}
        >
          <Scan size={14} />
          Start Scanning
        </button>
      </div>

      {/* AI info badge */}
      <div
        style={{
          marginTop: 14,
          padding: "10px 14px",
          background: COLORS.ecoCyan,
          borderRadius: 10,
          fontSize: 12,
          fontWeight: 600,
          color: "#00695C",
          display: "flex",
          alignItems: "center",
          gap: 8,
          border: "1px solid rgba(0,105,92,0.1)",
        }}
      >
        <Leaf size={14} />
        Powered by YOLOv8 + Generative AI
      </div>
    </div>
  );
};

export default ScanUpload;