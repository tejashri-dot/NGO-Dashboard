let engagementData = [
    {
      id: 1,
      activity: "Likes",
      count: 150,
      date: "2025-01-01",
    },
    {
      id: 2,
      activity: "Shares",
      count: 45,
      date: "2025-01-01",
    },
    {
      id: 3,
      activity: "Comments",
      count: 30,
      date: "2025-01-01",
    },
  ];
  
  // Get All Engagement Data
  export const getEngagementData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(engagementData), 500);
    });
  };
  
  // Add New Engagement Data
  export const addEngagementData = async (newItem) => {
    return new Promise((resolve) => {
      const newId = engagementData.length
        ? engagementData[engagementData.length - 1].id + 1
        : 1;
      const itemToAdd = { ...newItem, id: newId };
      engagementData.push(itemToAdd);
      resolve(itemToAdd);
    });
  };
  
  // Update Existing Engagement Data
  export const updateEngagementData = async (updatedItem) => {
    return new Promise((resolve) => {
      engagementData = engagementData.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      resolve(updatedItem);
    });
  };
  
  // Delete Engagement Data
  export const deleteEngagementData = async (id) => {
    return new Promise((resolve) => {
      engagementData = engagementData.filter((item) => item.id !== id);
      resolve(id);
    });
  };
  