import Axios from "axios";

// Jika API dan GenAI berada di server/port yang sama, cukup gunakan satu base URL
const BASE_URL = "http://localhost:8000/api/";

export async function detectWaste(image) {
  try {
    const formData = new FormData();
    // Pastikan 'image' ini benar-benar objek File atau Blob ya
    formData.append("file", image);

    // KITA HAPUS HEADERS-NYA! Biarkan Axios yang atur otomatis
    const response = await Axios.post(`${BASE_URL}scan`, formData);

    // Validasi respons sukses dan ada deteksi
    if (
      response.data.status === "success" &&
      response.data.detections.length > 0
    ) {
      // Urutkan dari confidence tertinggi ke terendah
      const sortedDetections = response.data.detections.sort(
        (a, b) => b.confidence - a.confidence
      );

      // KEMBALIKAN SEMUA DETEKSI DALAM BENTUK ARRAY
      return {
        status: "success",
        totalDetected: response.data.total_detected,
        allDetections: sortedDetections.map(det => ({
          label: det.nama_sampah || det.class_name,
          className: det.class_name,
          confidence: det.confidence,
          category: det.kategori || "Unknown",
          action: det.cara_buang || "Panduan tidak tersedia",
          impact: det.dampak || "Sedang menganalisis..."
        }))
      };
    }

    throw new Error("Tidak ada sampah yang terdeteksi pada gambar.");
  } catch (error) {
    console.error("Error detecting waste:", error);
    throw error;
  }
}

// Fungsi untuk mendapatkan GenAI Insight
// Fungsi untuk mendapatkan GenAI Insight
export async function getGenAIInsight(className) {
  try {
    console.log("🤖 Requesting GenAI insight for:", className);

    const response = await Axios.post(`${BASE_URL}insight`, {
      detected_classes: [className],
    });

    console.log("📊 GenAI Response:", response.data);

    // 🔥 JURUS SAPU JAGAT HARUS ADA DI SINI
    const aiData = response.data.insights || response.data.data || response.data;

    // KEMBALIKAN DALAM FORMAT SNAKE_CASE MENGGUNAKAN aiData
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

    // Return fallback dengan format snake_case juga
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