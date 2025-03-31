let mantras = [
    { id: 1, title: "Gayatri Mantra", duration: "2:30" },
    { id: 2, title: "Mahamrityunjaya Mantra", duration: "3:15" },
  ];
  
  // CRUD Operations
  export const getMantras = () => mantras;
  
  export const addMantra = (mantra) => {
    mantra.id = mantras.length + 1;
    mantras.push(mantra);
  };
  
  export const updateMantra = (id, updatedMantra) => {
    mantras = mantras.map((mantra) =>
      mantra.id === id ? updatedMantra : mantra
    );
  };
  
  export const deleteMantra = (id) => {
    mantras = mantras.filter((mantra) => mantra.id !== id);
  };
  