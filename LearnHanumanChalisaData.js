let hanumanChalisaList = [
    {
      id: 1,
      verse: "Jai Hanuman gyan gun sagar",
      meaning: "Hail Hanuman, the ocean of wisdom and virtue",
      maleVersion: "maleVersion1.mp3",
      femaleVersion: "femaleVersion1.mp3",
      childVersion: "childVersion1.mp3",
    },
    {
      id: 2,
      verse: "Jai Kapis tihun lok ujagar",
      meaning: "Hail the Monkey God who is luminous across the three worlds",
      maleVersion: "maleVersion2.mp3",
      femaleVersion: "femaleVersion2.mp3",
      childVersion: "childVersion2.mp3",
    },
  ];
  
  // Get All Hanuman Chalisa Items
  export const getHanumanChalisaItems = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(hanumanChalisaList), 500);
    });
  };
  
  // Add New Hanuman Chalisa Item
  export const addHanumanChalisaItem = async (newItem) => {
    return new Promise((resolve) => {
      const newId = hanumanChalisaList.length
        ? hanumanChalisaList[hanumanChalisaList.length - 1].id + 1
        : 1;
      const itemToAdd = { ...newItem, id: newId };
      hanumanChalisaList.push(itemToAdd);
      resolve(itemToAdd);
    });
  };
  
  // Update Existing Hanuman Chalisa Item
  export const updateHanumanChalisaItem = async (updatedItem) => {
    return new Promise((resolve) => {
      hanumanChalisaList = hanumanChalisaList.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      resolve(updatedItem);
    });
  };
  
  // Delete Hanuman Chalisa Item
  export const deleteHanumanChalisaItem = async (id) => {
    return new Promise((resolve) => {
      hanumanChalisaList = hanumanChalisaList.filter((item) => item.id !== id);
      resolve(id);
    });
  };
  