import axios from "axios";
const API_URL = "http://localhost:3002/api/chalisa";

export const getItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addItem = async (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("language", data.language);
  formData.append("lyrics", data.lyrics || "");
  formData.append("repetition", JSON.stringify(data.repetition || [1, 11, 21, 108]));
  formData.append("isFeatured", data.isFeatured || false);
  if (data.thumbnail) formData.append("thumbnail", data.thumbnail);

  if (data.audio) {
    if (data.audio.male) formData.append("audioMale", data.audio.male);
    if (data.audio.female) formData.append("audioFemale", data.audio.female);
    if (data.audio.child) formData.append("audioChild", data.audio.child);
  }

  if (data.video) {
    if (data.video.male) formData.append("videoMale", data.video.male);
    if (data.video.female) formData.append("videoFemale", data.video.female);
    if (data.video.child) formData.append("videoChild", data.video.child);
  }

  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const updateItem = async (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("language", data.language);
  formData.append("lyrics", data.lyrics || "");
  formData.append("repetition", JSON.stringify(data.repetition || [1, 11, 21, 108]));
  formData.append("isFeatured", data.isFeatured || false);
  if (data.thumbnail) formData.append("thumbnail", data.thumbnail);

  if (data.audio) {
    if (data.audio.male) formData.append("audioMale", data.audio.male);
    if (data.audio.female) formData.append("audioFemale", data.audio.female);
    if (data.audio.child) formData.append("audioChild", data.audio.child);
  }

  if (data.video) {
    if (data.video.male) formData.append("videoMale", data.video.male);
    if (data.video.female) formData.append("videoFemale", data.video.female);
    if (data.video.child) formData.append("videoChild", data.video.child);
  }

  const response = await axios.put(`${API_URL}/update/${data._id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const deleteItem = async (id) => {
  await axios.delete(`${API_URL}/delete/${id}`);
  return id;
};
