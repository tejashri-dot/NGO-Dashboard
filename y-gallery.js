import axios from "axios";

const API_URL = "http://localhost:3005/api/gallery";

// ✅ Get all gallery items
export const getGalleryItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    throw error; // Let the frontend handle the error
  }
};

// ✅ Add a new gallery item
export const addGalleryItem = async (newData) => {
  try {
    const formData = new FormData();
    formData.append("title", newData.title);
    formData.append("category", newData.category);
    formData.append("description", newData.description || "");

    // Handle tags: send as array or string based on backend needs
    if (newData.tags) {
      formData.append("tags", Array.isArray(newData.tags) ? JSON.stringify(newData.tags) : newData.tags);
    }

    // Append thumbnail if it’s a File object
    if (newData.thumbnail instanceof File) {
      formData.append("thumbnail", newData.thumbnail);
    }

    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data; // Should return the saved item with _id, thumbnail URL, etc.
  } catch (error) {
    console.error("Error adding gallery item:", error);
    throw error;
  }
};

// ✅ Update a gallery item
export const updateGalleryItem = async (updatedData) => {
  try {
    const formData = new FormData();
    formData.append("title", updatedData.title);
    formData.append("category", updatedData.category);
    formData.append("description", updatedData.description || "");

    // Handle tags
    if (updatedData.tags) {
      formData.append("tags", Array.isArray(updatedData.tags) ? JSON.stringify(updatedData.tags) : updatedData.tags);
    }

    // Only append thumbnail if a new file is provided
    if (updatedData.thumbnail instanceof File) {
      formData.append("thumbnail", updatedData.thumbnail);
    }

    const response = await axios.put(
      `${API_URL}/update/${updatedData._id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data; // Should return the updated item
  } catch (error) {
    console.error("Error updating gallery item:", error);
    throw error;
  }
};

// ✅ Delete a gallery item
export const deleteGalleryItem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data; // Return backend response (e.g., success message)
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    throw error;
  }
};