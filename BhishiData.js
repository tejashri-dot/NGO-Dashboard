// src/Datafiles/BhishiData.js
let bhishiList = [
    { id: 1, name: "Ramesh Patel", type: "Donor", amount: 5000, date: "2023-01-15", note: "Donated for temple" },
    { id: 2, name: "Suresh Kumar", type: "Bhishi Member", bhishiType: "5k", date: "2023-02-20", note: "Monthly Bhishi contribution" },
  ];
  
  export const getBhishiRecords = async (page = 0, limit = 10) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const startIndex = page * limit;
        const endIndex = startIndex + limit;
        const paginatedData = bhishiList.slice(startIndex, endIndex);
        const totalItems = bhishiList.length;
        resolve({
          data: paginatedData,
          total: totalItems,
          page,
          totalPages: Math.ceil(totalItems / limit),
        });
      }, 500);
    });
  };
  
  export const addBhishiRecord = async (newRecord) => {
    return new Promise((resolve) => {
      const newId = bhishiList.length ? bhishiList[bhishiList.length - 1].id + 1 : 1;
      const recordToAdd = { ...newRecord, id: newId };
      bhishiList.push(recordToAdd);
      resolve(recordToAdd);
    });
  };
  
  export const updateBhishiRecord = async (updatedRecord) => {
    return new Promise((resolve) => {
      bhishiList = bhishiList.map((record) =>
        record.id === updatedRecord.id ? updatedRecord : record
      );
      resolve(updatedRecord);
    });
  };
  
  export const deleteBhishiRecord = async (id) => {
    return new Promise((resolve) => {
      bhishiList = bhishiList.filter((record) => record.id !== id);
      resolve(id);
    });
  };