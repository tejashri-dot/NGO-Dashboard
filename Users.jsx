import React from "react";
import withMaterialTable from "../shared/withMaterialTable";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../../Datafiles/UsersData";

const Users = () => {
  return <></>;
};

export default withMaterialTable(Users, {
  title: "User Management",
  columns: [
    { accessorKey: "id", header: "Sr No" },
    { accessorKey: "firstName", header: "First Name" },
    { accessorKey: "lastName", header: "Last Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "address", header: "Address" },
    { accessorKey: "city", header: "City" },
  ],
  getData: async () => {
    const data = await getUsers();
    return data;
  },
  addData: async (newData) => {
    const addedItem = await addUser(newData);
    return addedItem;
  },
  updateData: async (updatedData) => {
    const updatedItem = await updateUser(updatedData);
    return updatedItem;
  },
  deleteData: async (id) => {
    await deleteUser(id);
    return id;
  },
});
