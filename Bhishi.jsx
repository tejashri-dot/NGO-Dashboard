import React from "react";
import Styles from "./Bhishi.module.css";
import withMaterialTable from "../../shared/withMaterialTable";
import {
  getBhishiRecords,
  addBhishiRecord,
  updateBhishiRecord,
  deleteBhishiRecord,
} from "../../../Datafiles/BhishiData";

const Bhishi = () => {
  return <div className={Styles.Container}>Bhishi Management</div>;
};

export default withMaterialTable(Bhishi, {
  title: "Bhishi Management",
  columns: [
    { accessorKey: "id", header: "Sr.No." },
    { accessorKey: "name", header: "Name" },
    {
      accessorKey: "type",
      header: "Type",
      inputType: "select",
      options: ["Donor", "Bhishi Member"],
    },
    {
      accessorKey: "amount",
      header: "Amount",
      Cell: ({ row }) =>
        row.original.type === "Donor" ? row.original.amount || "—" : "N/A",
    },
    {
      accessorKey: "bhishiType",
      header: "Bhishi Type",
      inputType: "select",
      options: ["1k", "2k", "5k", "10k"],
      Cell: ({ row }) =>
        row.original.type === "Bhishi Member" ? row.original.bhishiType || "—" : "N/A",
    },
    {
      accessorKey: "date",
      header: "Date",
      inputType: "date",
      Cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
    },
    { accessorKey: "note", header: "Note" },
  ],
  getData: async ({ page = 0, pageSize = 10 } = {}) => {
    const data = await getBhishiRecords(page, pageSize);
    return data;
  },
  addData: async (newData) => await addBhishiRecord(newData),
  updateData: async (updatedData) => await updateBhishiRecord(updatedData),
  deleteData: async (id) => await deleteBhishiRecord(id),
});