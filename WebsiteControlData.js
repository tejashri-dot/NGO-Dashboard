let websiteSettings = {
    websiteStatus: true, // Online or offline
    contentUpdates: true, // Content update enabled/disabled
    activeUsers: 120, // Current active users count
    analyticsEnabled: true, // Analytics tracking enabled/disabled
  };
  
  // Get Website Control Data
  export const getWebsiteSettings = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(websiteSettings), 500);
    });
  };
  
  // Update Website Control Data
  export const updateWebsiteSettings = async (updatedData) => {
    return new Promise((resolve) => {
      websiteSettings = { ...websiteSettings, ...updatedData }; // Merge the updated data into the settings
      resolve(websiteSettings); // Return the updated settings
    });
  };
  