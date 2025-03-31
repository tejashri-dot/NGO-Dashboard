import axios from "axios";

const API_URL = "http://localhost:3004/api/mantra"; // adjust port/URL if needed

// ✅ Fetch all Mantras
export const getMantras = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching mantras:", error);
    return [];
  }
};

// ✅ Add a new Mantra (with file support via FormData)
export const addMantra = async (newData) => {
  try {
    const formData = new FormData();

    formData.append("title", newData.title);
    formData.append("deity", newData.deity);
    formData.append("category", newData.category);
    formData.append("language", newData.language || "Sanskrit");
    formData.append("mantraText", newData.mantraText);
    formData.append("transliteration", newData.transliteration || "");
    formData.append("meaning", newData.meaning || "");
    formData.append("duration", newData.duration);

    // Benefits: array → JSON string
    if (newData.benefits) {
      formData.append("benefits", JSON.stringify(newData.benefits));
    }

    // Repetition: array → JSON string
    if (newData.repetition) {
      formData.append("repetition", JSON.stringify(newData.repetition));
    }

    if (newData.audio) formData.append("audio", newData.audio);
    if (newData.video) formData.append("video", newData.video);

    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding mantra:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Update existing Mantra
export const updateMantra = async (updatedData) => {
  try {
    const formData = new FormData();

    formData.append("title", updatedData.title);
    formData.append("deity", updatedData.deity);
    formData.append("category", updatedData.category);
    formData.append("language", updatedData.language || "Sanskrit");
    formData.append("mantraText", updatedData.mantraText);
    formData.append("transliteration", updatedData.transliteration || "");
    formData.append("meaning", updatedData.meaning || "");
    formData.append("duration", updatedData.duration);

    if (updatedData.benefits) {
      formData.append("benefits", JSON.stringify(updatedData.benefits));
    }

    if (updatedData.repetition) {
      formData.append("repetition", JSON.stringify(updatedData.repetition));
    }

    if (updatedData.audio) formData.append("audio", updatedData.audio);
    if (updatedData.video) formData.append("video", updatedData.video);

    const response = await axios.put(`${API_URL}/update/${updatedData._id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating mantra:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Delete Mantra
export const deleteMantra = async (id) => {
  if (!id) {
    console.error("Error: Missing ID for deletion.");
    return;
  }

  try {
    await axios.delete(`${API_URL}/delete/${id}`);
    return id;
  } catch (error) {
    console.error("Error deleting mantra:", error.response?.data || error.message);
    throw error;
  }
};
