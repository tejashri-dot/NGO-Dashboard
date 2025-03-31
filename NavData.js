const NavData = {
  user: {
    name: 'Admin',
    profilePic: '/assets/images/profile-pic.jpg', // Updated folder path for images
  },
  themeOptions: {
    light: 'light',
    dark: 'dark',
  },
  navbar: {
    welcomeMessage: 'Welcome, Admin!',
    searchPlaceholder: 'Search...',
    theme: {
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
    },
    profileName: 'Admin Profile',
  },
  notifications: [
    { id: 1, message: 'New message from admin.' },
    { id: 2, message: 'System update available.' },
    { id: 3, message: 'New user registration.' },
    { id: 4, message: 'New comment on your post.' },
  ],
  searchData: [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Samuel Adams' },
    { id: 4, name: 'Alice Johnson' },
    { id: 5, name: 'Bob Brown' },
  ],
};

export default NavData;
