import axios from "axios";

const API_URL = "http://localhost:3008/api/story"; // Ensure this is correct

// ✅ Fetch all Kathas
export const getKathas = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching kathas:", error);
    return { error: "Failed to fetch kathas." };
  }
};

// ✅ Add a new Katha with error handling
export const addKatha = async (newData) => {
  try {
    const formData = new FormData();
    formData.append("title", newData.title);
    formData.append("description", newData.description);
    if (newData.audioVersion) formData.append("audioVersion", newData.audioVersion);
    if (newData.videoVersion) formData.append("videoVersion", newData.videoVersion);

    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding katha:", error.response?.data || error.message);
    return { error: error.response?.data || "Failed to add katha." };
  }
};

// ✅ Update an existing Katha with error handling (Changed PATCH → PUT)
export const updateKatha = async (updatedData) => {
  try {
    const formData = new FormData();
    formData.append("title", updatedData.title);
    formData.append("description", updatedData.description);
    if (updatedData.audioVersion) formData.append("audioVersion", updatedData.audioVersion);
    if (updatedData.videoVersion) formData.append("videoVersion", updatedData.videoVersion);

    const response = await axios.put(`${API_URL}/update/${updatedData.id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating katha:", error.response?.data || error.message);
    return { error: error.response?.data || "Failed to update katha." };
  }
};

// ✅ Delete a Katha with error handling (Fixed URL)
export const deleteKatha = async (id) => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`);
    return { success: true, id };
  } catch (error) {
    console.error("Error deleting katha:", error.response?.data || error.message);
    return { error: error.response?.data || "Failed to delete katha." };
  }
};
