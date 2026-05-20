import Axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const BASE_URL = "http://127.0.0.1:8000/api/";

export async function detectWaste(image) {
  try {
    const formData = new FormData();
    formData.append("file", image);

    const response = await Axios.post(`${BASE_URL}scan`, formData);



    // 1. JIKA BERHASIL MENDETEKSI OBJEK
    if (
      response.data.status === "success" &&
      response.data.allDetections && 
      response.data.allDetections.length > 0
    ) {
      const sortedDetections = response.data.allDetections.sort(
        (a, b) => b.confidence - a.confidence
      );

      return {
        status: "success",
        totalDetected: response.data.totalDetected,
        allDetections: sortedDetections
      };
    }

    // 2. JIKA API MERESPONS 'NOT FOUND' ATAU ARRAY KOSONG
    if (response.data.status === "not_found" || response.data.allDetections?.length === 0) {
      return {
        status: "not_found",
        message: response.data.message || "Tidak ada sampah plastik yang terdeteksi."
      };
    }

    throw new Error("Respons tidak valid dari server.");
  } catch (error) {
    console.error("Error detecting waste:", error);
    throw error; // Ini murni untuk error jaringan/server (Merah)
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

// Fungsi untuk mengambil data bank sampah dari backend
export async function getBankSampahList() {
  try {
    const response = await Axios.get(`${BASE_URL}bank-sampah`);
    
    if (response.data.status === "success") {
      return response.data.data; // Mengembalikan array dari 5 bank sampah
    }
    return [];
  } catch (error) {
    console.error("❌ Gagal memuat lokasi bank sampah:", error.response?.data || error.message);
    return [];
  }
}