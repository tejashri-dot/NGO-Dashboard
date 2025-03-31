let analyticsData = [
    {
      id: 1,
      metric: "Total Visitors",
      value: 1200,
      date: "2025-01-01",
    },
    {
      id: 2,
      metric: "Active Users",
      value: 300,
      date: "2025-01-01",
    },
    {
      id: 3,
      metric: "Completed Lectures",
      value: 75,
      date: "2025-01-01",
    },
  ];
  
  // Get All Analytics Data
  export const getAnalyticsData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(analyticsData), 500);
    });
  };
  
  // Add New Analytics Data
  export const addAnalyticsData = async (newItem) => {
    return new Promise((resolve) => {
      const newId = analyticsData.length
        ? analyticsData[analyticsData.length - 1].id + 1
        : 1;
      const itemToAdd = { ...newItem, id: newId };
      analyticsData.push(itemToAdd);
      resolve(itemToAdd);
    });
  };
  
  // Update Existing Analytics Data
  export const updateAnalyticsData = async (updatedItem) => {
    return new Promise((resolve) => {
      analyticsData = analyticsData.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      resolve(updatedItem);
    });
  };
  
  // Delete Analytics Data
  export const deleteAnalyticsData = async (id) => {
    return new Promise((resolve) => {
      analyticsData = analyticsData.filter((item) => item.id !== id);
      resolve(id);
    });
  };
  