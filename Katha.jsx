import React from "react";
import Styles from "./Katha.module.css";
import withMaterialTable from "../shared/withMaterialTable";
import {
  getKathas,
  addKatha,
  updateKatha,
  deleteKatha,
} from "../../api/kathas";

const Katha = () => {
  return (
    <>
      <div className={Styles.Container}>
        Katha Management
      </div>
    </>
  );
};

export default withMaterialTable(Katha, {
  title: "Katha Management",
  columns: [
    { accessorKey: "id", header: "Sr No" },
    { accessorKey: "title", header: "Title" },
    { accessorKey: "audioVersion", header: "Audio Version" },
    { accessorKey: "videoVersion", header: "Video Version" },
    { accessorKey: "description", header: "Description" },
  ],
  getData: async () => {
    const data = await getKathas();
    return data;
  },
  addData: async (newData) => {
    const addedItem = await addKatha(newData);
    return addedItem;
  },
  updateData: async (updatedData) => {
    const updatedItem = await updateKatha(updatedData);
    return updatedItem;
  },
  deleteData: async (id) => {
    await deleteKatha(id);
    return id;
  },
});
