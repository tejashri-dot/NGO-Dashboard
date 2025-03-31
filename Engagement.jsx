import React from "react";
import Styles from "./Engagement.module.css";
import withMaterialTable from "../shared/withMaterialTable";
import {
  getEngagementData,
  addEngagementData,
  updateEngagementData,
  deleteEngagementData,
} from "../../Datafiles/EngagementData";

const Engagement = () => {
  return (
    <>
      <div className={Styles.Container}>
        Engagement
      </div>
    </>
  );
};

export default withMaterialTable(Engagement, {
  title: "User Engagement",
  columns: [
    { accessorKey: "id", header: "Sr No" },
    { accessorKey: "activity", header: "Activity" },
    { accessorKey: "count", header: "Count" },
    { accessorKey: "date", header: "Date" },
  ],
  getData: async () => {
    const data = await getEngagementData();
    return data;
  },
  addData: async (newData) => {
    const addedItem = await addEngagementData(newData);
    return addedItem;
  },
  updateData: async (updatedData) => {
    const updatedItem = await updateEngagementData(updatedData);
    return updatedItem;
  },
  deleteData: async (id) => {
    await deleteEngagementData(id);
    return id;
  },
});
