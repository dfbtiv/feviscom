import Axios from "axios";

// Jika API dan GenAI berada di server/port yang sama, cukup gunakan satu base URL
const BASE_URL = "http://localhost:8000/api/";

export async function detectWaste(image) {
  try {
    const formData = new FormData();
    formData.append("file", image);

    const response = await Axios.post(`${BASE_URL}scan`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Validasi respons sukses dan ada deteksi
    if (
      response.data.status === "success" &&
      response.data.detections.length > 0
    ) {
      // Ambil deteksi pertama dengan confidence tertinggi
      const detections = response.data.detections.sort(
        (a, b) => b.confidence - a.confidence,
      );
      const primaryDetection = detections[0];

      // Mapping langsung dari respons Backend
      // (Backend HARUS mengirimkan data ini di dalam object detection)
      return {
        status: "success",
        label: primaryDetection.nama_sampah || primaryDetection.class_name,
        className: primaryDetection.class_name,
        confidence: primaryDetection.confidence,
        category: primaryDetection.kategori || "Unknown",
        action: primaryDetection.cara_buang || "Panduan tidak tersedia",
        impact: primaryDetection.dampak || "Sedang menganalisis...",
        totalDetected: response.data.total_detected,
        detections: response.data.detections,
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
    console.log("🤖 Requesting GenAI insight for:", className);

    const response = await Axios.post(`${BASE_URL}insight`, {
      detected_classes: [className],
    });

    console.log("📊 GenAI Response:", response.data);

    // Map snake_case dari backend ke camelCase untuk frontend
    return {
      ringkasanBahaya:
        response.data.ringkasan_bahaya || "Informasi tidak tersedia",
      ideRecycling: Array.isArray(response.data.ide_daur_ulang)
        ? response.data.ide_daur_ulang
        : [],
      faktaMenarik: response.data.fakta_menarik || "Tidak ada fakta menarik",
    };
  } catch (error) {
    console.error(
      "❌ Error getting GenAI insight:",
      error.response?.data || error.message,
    );

    // Return fallback dengan pesan error yang jelas
    return {
      ringkasanBahaya: `Gagal memuat informasi bahaya. Error: ${error.message}`,
      ideRecycling: [
        "Silakan coba lagi nanti",
        "Pastikan koneksi internet stabil",
      ],
      faktaMenarik: "Informasi tidak tersedia saat ini.",
    };
  }
}
