import {
    History,
  LayoutDashboard,
  Scan,
  Settings,
} from "lucide-react";

export const COLORS = {
  primary: "#4D7111",
  lime: "#C3E956",
  ecoLime: "#E2F9CC",
  ecoCyan: "#E0FEF4",
  white: "#FFFFFF",
};

// 1. NAVIGASI SUPER SIMPEL (Cukup 3 Menu Utama)
export const NAV_ITEMS = [
  {
    group: "Main Menu",
    items: [
      // Overview merangkum: Statistik, Grafik Analytics, dan Recent History
      { id: "overview", label: "Overview", icon: LayoutDashboard },
      { id: "scan-history", label: "Scan History", icon: History },
      { id: "katalog", label: "Katalog Sampah", icon: Scan, requiresAuth: true },
    ],
  },
  {
    group: "Account",
    items: [
      { id: "settings", label: "Pengaturan", icon: Settings },
    ],
  },
];

// 2. STAT CARDS (Tanpa requiresAuth karena sudah pasti login)
export const STAT_CARDS = [
  {
    label: "Total Scan",
    value: "142",
    sub: "+12 minggu ini",
    icon: "Scan",
    color: "#4D7111",
    bg: "#EBF2E0",
  },
  {
    label: "Poin Eco",
    value: "2,340",
    sub: "Top 15% pengguna",
    icon: "TrendingUp",
    color: "#2E7D32",
    bg: "#E2F9CC",
  },
  {
    label: "Plastik Terdeteksi",
    value: "89",
    sub: "Berhasil diidentifikasi",
    icon: "Recycle",
    color: "#00695C",
    bg: "#E0FEF4",
  },
  {
    label: "Aksi Beruntun",
    value: "14 Hari",
    sub: "Pertahankan! 🔥",
    icon: "Clock",
    color: "#5D4037",
    bg: "#FFF3E0",
  },
];

// 3. DATA MOCKUP UNTUK DITAMPILKAN DI OVERVIEW
export const RECENT_SCANS = [
  { id: 1, type: "Botol Plastik",    confidence: 97, time: "2 mnt lalu",  status: "Recyclable" },
  { id: 2, type: "Gelas Plastik",    confidence: 91, time: "1 jam lalu",  status: "Recyclable" },
  { id: 3, type: "Kantong Kresek",   confidence: 85, time: "3 jam lalu",  status: "Low-Value" },
  { id: 4, type: "Tutup Botol",      confidence: 93, time: "Kemarin",     status: "Hazard" },
];

export const WEEKLY_BAR_DATA = [65, 80, 45, 90, 70, 55, 85];
export const WEEK_LABELS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];