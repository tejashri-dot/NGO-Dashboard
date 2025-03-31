let bhajans = [
    {
      id: 1,
      title: "Bhajan 1",
      lyrics: "Lyrics of Bhajan 1",
      language: "Hindi",
    },
    {
      id: 2,
      title: "Bhajan 2",
      lyrics: "Lyrics of Bhajan 2",
      language: "Marathi",
    },
  ];
  
  export const getBhajans = () => {
    return bhajans;
  };
  
  export const addBhajan = (newBhajan) => {
    newBhajan.id = bhajans.length + 1;
    bhajans.push(newBhajan);
  };
  
  export const updateBhajan = (id, updatedBhajan) => {
    bhajans = bhajans.map((bhajan) =>
      bhajan.id === id ? { ...bhajan, ...updatedBhajan } : bhajan
    );
  };
  
  export const deleteBhajan = (id) => {
    bhajans = bhajans.filter((bhajan) => bhajan.id !== id);
  };
  