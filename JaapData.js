let jaapList = [
    { id: 1, title: "Gayatri Mantra", count: 108 },
    { id: 2, title: "Mahamrityunjaya Mantra", count: 1008 },
  ];
  
  // Get All Jaaps
  export const getJaaps = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(jaapList), 500);
    });
  };
  
  // Add New Jaap
  export const addJaap = async (newJaap) => {
    return new Promise((resolve) => {
      const newId = jaapList.length ? jaapList[jaapList.length - 1].id + 1 : 1;
      const jaapToAdd = { ...newJaap, id: newId };
      jaapList.push(jaapToAdd);
      resolve(jaapToAdd);
    });
  };
  
  // Update Existing Jaap
  export const updateJaap = async (updatedJaap) => {
    return new Promise((resolve) => {
      jaapList = jaapList.map((jaap) =>
        jaap.id === updatedJaap.id ? updatedJaap : jaap
      );
      resolve(updatedJaap);
    });
  };
  
  // Delete Jaap
  export const deleteJaap = async (id) => {
    return new Promise((resolve) => {
      jaapList = jaapList.filter((jaap) => jaap.id !== id);
      resolve(id);
    });
  };
  