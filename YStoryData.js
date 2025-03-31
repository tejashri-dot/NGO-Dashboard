export const getStoryItems = async () => {
    return [
      { id: 1, title: "Story 1", author: "John Doe", content: "Lorem ipsum...", publishedDate: "2024-02-13" },
      { id: 2, title: "Story 2", author: "Jane Smith", content: "Dolor sit amet...", publishedDate: "2024-02-14" },
      { id: 3, title: "Story 3", author: "Sahil", content: "Dolor sit amet...", publishedDate: "2024-02-15" },
      { id: 4, title: "Story 4", author: "Priti", content: "Dolor sit amet...", publishedDate: "2024-02-16" }
    ];
  };
  
  export const addStoryItem = async (newData) => {
    return { id: Date.now(), ...newData };
  };
  
  export const updateStoryItem = async (updatedData) => {
    return updatedData;
  };
  
  export const deleteStoryItem = async (id) => {
    return id;
  };
  