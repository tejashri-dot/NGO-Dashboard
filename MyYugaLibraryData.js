export const getLibraryItems = async () => {
    return [
      { id: 1, title: "Book 1", author: "Author A", category: "Mythology", publishedYear: "2021", description: "Lorem ipsum..." },
      { id: 2, title: "Book 2", author: "Author B", category: "Spirituality", publishedYear: "2020", description: "Dolor sit amet..." },
      { id: 3, title: "Book 3", author: "Author C", category: "Astrology", publishedYear: "2019", description: "Dolor sit amet..." },
      { id: 4, title: "Book 4", author: "Author D", category: "Mythology", publishedYear: "2018", description: "Dolor sit amet..." }
    ];
  };
  
  export const addLibraryItem = async (newData) => {
    return { id: Date.now(), ...newData };
  };
  
  export const updateLibraryItem = async (updatedData) => {
    return updatedData;
  };
  
  export const deleteLibraryItem = async (id) => {
    return id;
  };
  