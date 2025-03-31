import React from "react";
import Styles from "./Donation.module.css";
import withMaterialTable from "../../shared/withMaterialTable";
import {
  getDonations,
  addDonation,
  updateDonation,
  deleteDonation,
} from "../../../Datafiles/DonationData";

const Donation = () => {
  return <div className={Styles.Container}>Donation Management</div>;
};

export default withMaterialTable(Donation, {
  title: "Donation Management",
  columns: [
    { accessorKey: "id", header: "Sr.No." },
    { accessorKey: "donorName", header: "Donor Name" },
    { accessorKey: "amount", header: "Amount" },
    {
      accessorKey: "date",
      header: "Date",
      inputType: "date",
      Cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment Method",
      inputType: "select",
      options: ["UPI", "Cash", "Credit Card", "Debit Card", "Net Banking"],
    },
    { accessorKey: "note", header: "Note" },
  ],
  getData: async ({ page = 0, pageSize = 10 } = {}) => {
    const data = await getDonations(page, pageSize);
    return data;
  },
  addData: async (newData) => await addDonation(newData),
  updateData: async (updatedData) => await updateDonation(updatedData),
  deleteData: async (id) => await deleteDonation(id),
});