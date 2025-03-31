let settingsData = {
  profile: {
    name: "Admin",
    email: "admin@example.com",
    password: "********",
    profilePicture: "", // Path or URL to profile picture (optional)
  },
  theme: {
    mode: "light", // Options: light, dark, custom
  },
  notifications: {
    email: true,
    inApp: false,
  },
  general: {
    language: "en", // Language code (e.g., "en", "hi", etc.)
    dateFormat: "MM/DD/YYYY", // Default date format
    timeZone: "Asia/Kolkata", // Timezone (for server-side use, might be stored as an offset or code)
  },
  security: {
    twoFactorAuth: false, // Toggle 2FA status
    sessionTimeout: 30, // Session timeout in minutes
  },
};

// Get Settings Data (simulating API call with delay)
export const getSettingsData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(settingsData), 500);
  });
};

// Update Settings Data (simulate update and return the updated data)
export const updateSettingsData = async (updatedData) => {
  return new Promise((resolve, reject) => {
    try {
      settingsData = { ...settingsData, ...updatedData };
      resolve(settingsData); // Resolve with the updated settings data
    } catch (error) {
      reject(new Error("Error updating settings data"));
    }
  });
};
