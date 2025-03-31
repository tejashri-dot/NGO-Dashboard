let kathaList = [
    {
      id: 1,
      title: 'Sundar Kand',
      audioVersion: 'https://example.com/sundar-kand.mp3',
      videoVersion: 'https://example.com/sundar-kand.mp4',
      description: 'Sundar Kand from Ramayana',
    },
    {
      id: 2,
      title: 'Hanuman Janam Katha',
      audioVersion: 'https://example.com/hanuman-janam.mp3',
      videoVersion: 'https://example.com/hanuman-janam.mp4',
      description: 'Story of Lord Hanuman’s birth',
    },
  ];
  
  // Get All Kathas
  export const getKathas = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(kathaList), 500);
    });
  };
  
  // Add New Katha
  export const addKatha = async (newKatha) => {
    return new Promise((resolve) => {
      const newId = kathaList.length ? kathaList[kathaList.length - 1].id + 1 : 1;
      const kathaToAdd = { ...newKatha, id: newId };
      kathaList.push(kathaToAdd);
      resolve(kathaToAdd);
    });
  };
  
  // Update Existing Katha
  export const updateKatha = async (updatedKatha) => {
    return new Promise((resolve) => {
      kathaList = kathaList.map((katha) =>
        katha.id === updatedKatha.id ? updatedKatha : katha
      );
      resolve(updatedKatha);
    });
  };
  
  // Delete Katha
  export const deleteKatha = async (id) => {
    return new Promise((resolve) => {
      kathaList = kathaList.filter((katha) => katha.id !== id);
      resolve(id);
    });
  };
  