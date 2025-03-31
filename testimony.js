import axios from "axios";

const BASE_URL = "http://localhost:3011/api/testimony";

// Fetch all testimonies : Successfully fetch data from the server
export const getTestimonies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data.map((item) => ({
      ...item,
      id: item._id, // Map _id to id
    }));
  } catch (error) {
    console.error("Error fetching testimonies:", error);
    throw error;
  }
};


// Add a new testimony : Successfully add data from the server
export const addTestimony = async (newData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add`, newData);
    return response.data;
  } catch (error) {
    console.error("Error adding testimony:", error);
    throw error;
  }
};

export const updateTestimony = async (id, updatedData) => {
  try {
    if (!id) {
      throw new Error("Testimony ID is required for update.");
    }
    const response = await axios.patch(`${BASE_URL}/update/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating testimony:", error);
    throw error;
  }
};




// Delete a testimony
export const deleteTestimony = async (_id) => {
  try {
    if (!_id) {
      throw new Error("Testimony ID is required for deletion.");
    }
    await axios.delete(`${BASE_URL}/delete/${_id}`);
    return _id;
  } catch (error) {
    console.error("Error deleting testimony:", error);
    throw error;
  }
};
