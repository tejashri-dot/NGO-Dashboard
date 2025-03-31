let galleryList = [
    {
      id: 1,
      title: 'Hanuman Image 1',
      url: 'https://example.com/image1.jpg',
      type: 'Image',
      description: 'An image of Lord Hanuman',
    },
    {
      id: 2,
      title: 'Hanuman Video 1',
      url: 'https://example.com/video1.mp4',
      type: 'Video',
      description: 'A video of Hanuman Chalisa',
    },
  ];
  
  // Get All Gallery Items
  export const getGalleryItems = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(galleryList), 500);
    });
  };
  
  // Add New Gallery Item
  export const addGalleryItem = async (newItem) => {
    return new Promise((resolve) => {
      const newId = galleryList.length ? galleryList[galleryList.length - 1].id + 1 : 1;
      const itemToAdd = { ...newItem, id: newId };
      galleryList.push(itemToAdd);
      resolve(itemToAdd);
    });
  };
  
  // Update Existing Gallery Item
  export const updateGalleryItem = async (updatedItem) => {
    return new Promise((resolve) => {
      galleryList = galleryList.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      );
      resolve(updatedItem);
    });
  };
  
  // Delete Gallery Item
  export const deleteGalleryItem = async (id) => {
    return new Promise((resolve) => {
      galleryList = galleryList.filter((item) => item.id !== id);
      resolve(id);
    });
  };
  