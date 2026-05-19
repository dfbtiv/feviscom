import Axios from "axios";

// Mengambil URL dari .env
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function detectWaste(image) {
  try {
    const formData = new FormData();
    formData.append("file", image);

    const response = await Axios.post(`${BASE_URL}scan`, formData);

    // 1. UBAH KE allDetections KARENA BACKEND SUDAH DI-UPDATE
    if (
      response.data.status === "success" &&
      response.data.allDetections && 
      response.data.allDetections.length > 0
    ) {
      
      const sortedDetections = response.data.allDetections.sort(
        (a, b) => b.confidence - a.confidence
      );

      // 2. KEMBALIKAN LANGSUNG DATANYA
      // Karena backend udah mengirim 'box', 'label', dkk, 
      // kita tinggal melempar datanya tanpa perlu mapping manual lagi.
      return {
        status: "success",
        totalDetected: response.data.totalDetected, // Ubah ke camelCase sesuai backend
        allDetections: sortedDetections
      };
    }

    throw new Error("Tidak ada sampah yang terdeteksi pada gambar.");
  } catch (error) {
    console.error("Error detecting waste:", error);
    throw error;
  }
}

// Fungsi untuk mendapatkan GenAI Insight
export async function getGenAIInsight(className) {
  try {
    const response = await Axios.post(`${BASE_URL}insight`, {
      detected_classes: [className],
    });
    
    const aiData = response.data.insights || response.data.data || response.data;

    return {
      ringkasan_bahaya: aiData.ringkasan_bahaya || "Informasi tidak tersedia",
      cara_buang: aiData.cara_buang || "Informasi cara buang tidak tersedia",
      ide_daur_ulang: Array.isArray(aiData.ide_daur_ulang)
        ? aiData.ide_daur_ulang
        : [],
      fakta_menarik: aiData.fakta_menarik || "Tidak ada fakta menarik",
      tingkat_bahaya: aiData.tingkat_bahaya || "Unknown",
      dapat_didaur_ulang: aiData.dapat_didaur_ulang || false,
    };
  } catch (error) {
    console.error(
      "❌ Error getting GenAI insight:",
      error.response?.data || error.message,
    );

    return {
      ringkasan_bahaya: `Gagal memuat informasi bahaya. Error: ${error.message}`,
      cara_buang: "Silakan buang ke tempat sampah terdekat.",
      ide_daur_ulang: [
        "Silakan coba lagi nanti",
        "Pastikan koneksi internet stabil",
      ],
      fakta_menarik: "Informasi tidak tersedia saat ini.",
      tingkat_bahaya: "Unknown",
      dapat_didaur_ulang: false,
    };
  }
}