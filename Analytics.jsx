import React from "react";
import Styles from "./Analytics.module.css";
import withMaterialTable from "../shared/withMaterialTable";
import {
  getAnalyticsData,
  addAnalyticsData,
  updateAnalyticsData,
  deleteAnalyticsData,
} from "../../Datafiles/AnalyticsData";

const Analytics = () => {
  return (
    <>
      <div className={Styles.Container}>
        Analytics
      </div>
    </>
  );
};

export default withMaterialTable(Analytics, {
  title: "Analytics Dashboard",
  columns: [
    { accessorKey: "id", header: "Sr No" },
    { accessorKey: "metric", header: "Metric" },
    { accessorKey: "value", header: "Value" },
    { accessorKey: "date", header: "Date" },
  ],
  getData: async () => {
    const data = await getAnalyticsData();
    return data;
  },
  addData: async (newData) => {
    const addedItem = await addAnalyticsData(newData);
    return addedItem;
  },
  updateData: async (updatedData) => {
    const updatedItem = await updateAnalyticsData(updatedData);
    return updatedItem;
  },
  deleteData: async (id) => {
    await deleteAnalyticsData(id);
    return id;
  },
});
