// src/Datafiles/UsersData.js

let userData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    address: "123 Main St",
    city: "New York",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    address: "456 Maple Ave",
    city: "Los Angeles",
  },
  {
    id: 3,
    firstName: "Sam",
    lastName: "Wilson",
    email: "sam.wilson@example.com",
    address: "789 Oak Rd",
    city: "Chicago",
  },
];

// Function to get users
export const getUsers = async () => {
  return userData;
};

// Function to add a user
export const addUser = async (newData) => {
  const newUser = { id: Date.now(), ...newData };
  userData.push(newUser);
  return newUser;
};

// Function to update a user
export const updateUser = async (updatedData) => {
  const index = userData.findIndex((user) => user.id === updatedData.id);
  if (index !== -1) {
    userData[index] = updatedData;
  }
  return updatedData;
};

// Function to delete a user
export const deleteUser = async (id) => {
  userData = userData.filter((user) => user.id !== id);
  return id;
};
