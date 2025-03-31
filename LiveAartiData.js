let liveAartis = [
    { id: 1, title: "Morning Aarti", time: "6:00 AM" },
    { id: 2, title: "Evening Aarti", time: "7:00 PM" },
  ];
  
  // CRUD Operations
  export const getLiveAartis = () => liveAartis;
  
  export const addLiveAarti = (liveAarti) => {
    liveAarti.id = liveAartis.length + 1;
    liveAartis.push(liveAarti);
  };
  
  export const updateLiveAarti = (id, updatedLiveAarti) => {
    liveAartis = liveAartis.map((liveAarti) =>
      liveAarti.id === id ? updatedLiveAarti : liveAarti
    );
  };
  
  export const deleteLiveAarti = (id) => {
    liveAartis = liveAartis.filter((liveAarti) => liveAarti.id !== id);
  };
  