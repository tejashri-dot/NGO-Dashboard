import React from "react";
import Styles from "./YStory.module.css";
import withMaterialTable from "../../shared/withMaterialTable";
import {
  getStoryItems,
  addStoryItem,
  updateStoryItem,
  deleteStoryItem,
} from "../../../Datafiles/YStoryData";

const YStory = () => {
  return (
    <>
      <div className={Styles.Container}>
      </div>
    </>
  );
};

export default withMaterialTable(YStory, {
  title: "Story Management",
  columns: [
    { accessorKey: "id", header: "Sr No" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "author", header: "Author" },
    { accessorKey: "content", header: "Content" },
    { accessorKey: "publishedDate", header: "Published Date" },
  ],
  getData: async () => {
    const data = await getStoryItems();
    return data;
  },
  addData: async (newData) => {
    const addedItem = await addStoryItem(newData);
    return addedItem;
  },
  updateData: async (updatedData) => {
    const updatedItem = await updateStoryItem(updatedData);
    return updatedItem;
  },
  deleteData: async (id) => {
    await deleteStoryItem(id);
    return id;
  },
});
