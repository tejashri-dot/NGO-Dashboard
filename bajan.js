import axios from "axios";

const API_URL = "http://localhost:3003/api/bhajan"; // Ensure this is correct

// ✅ Fetch all Bhajans : Fetch Data from API
export const getBhajans = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching bhajans:", error);
    return [];
  }
};

// ✅ Add a new Bhajan with FormData : 
export const addBhajan = async (newData) => {
  try {
    const formData = new FormData();
    formData.append("title", newData.title);
    formData.append("lyrics", newData.lyrics);
    formData.append("language", newData.language);
    if (newData.audioVersion) formData.append("audioVersion", newData.audioVersion);
    if (newData.videoVersion) formData.append("videoVersion", newData.videoVersion);

    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding bhajan:", error);
    throw error;
  }
};

// ✅ Update an existing Bhajan with FormData
export const updateBhajan = async (updatedData) => {
  try {
    const formData = new FormData();
    formData.append("title", updatedData.title);
    formData.append("lyrics", updatedData.lyrics);
    formData.append("language", updatedData.language);
    
    if (updatedData.audioVersion) formData.append("audioVersion", updatedData.audioVersion);
    if (updatedData.videoVersion) formData.append("videoVersion", updatedData.videoVersion);

    const response = await axios.put(`${API_URL}/update/${updatedData._id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Bhajan updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating bhajan:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Delete a Bhajan
export const deleteBhajan = async (id) => {
  if (!id) {
    console.error("Error: Missing ID for deletion.");
    return;
  }

  try {
    await axios.delete(`${API_URL}/delete/${id}`);
    console.log("Bhajan deleted successfully:", id);
    return id;
  } catch (error) {
    console.error("Error deleting bhajan:", error.response?.data || error.message);
    throw error;
  }
};
