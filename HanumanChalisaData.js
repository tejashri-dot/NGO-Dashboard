// Sample Data with More Verses
let hanumanChalisaItems = [
  {
    id: 1,
    verse: "श्रीगुरु चरन सरोज रज, निज मन मुकुरु सुधारि।",
    maleVersion: "Male Audio URL 1",
    femaleVersion: "Female Audio URL 1",
    childVersion: "Child Audio URL 1",
  },
  {
    id: 2,
    verse: "बुद्धिहीन तनु जानिके, सुमिरौं पवन-कुमार।",
    maleVersion: "Male Audio URL 2",
    femaleVersion: "Female Audio URL 2",
    childVersion: "Child Audio URL 2",
  },
  {
    id: 3,
    verse: "जय हनुमान ज्ञान गुन सागर।",
    maleVersion: "Male Audio URL 3",
    femaleVersion: "Female Audio URL 3",
    childVersion: "Child Audio URL 3",
  },
  {
    id: 4,
    verse: "जय कपीस तिहुँ लोक उजागर॥",
    maleVersion: "Male Audio URL 4",
    femaleVersion: "Female Audio URL 4",
    childVersion: "Child Audio URL 4",
  },
  {
    id: 5,
    verse: "रामदूत अतुलित बल धामा।",
    maleVersion: "Male Audio URL 5",
    femaleVersion: "Female Audio URL 5",
    childVersion: "Child Audio URL 5",
  },
  {
    id: 6,
    verse: "अंजनि-पुत्र पवनसुत नामा॥",
    maleVersion: "Male Audio URL 6",
    femaleVersion: "Female Audio URL 6",
    childVersion: "Child Audio URL 6",
  },
  {
    id: 7,
    verse: "महाबीर विक्रम बजरंगी।",
    maleVersion: "Male Audio URL 7",
    femaleVersion: "Female Audio URL 7",
    childVersion: "Child Audio URL 7",
  },
  {
    id: 8,
    verse: "कुमति निवार सुमति के संगी॥",
    maleVersion: "Male Audio URL 8",
    femaleVersion: "Female Audio URL 8",
    childVersion: "Child Audio URL 8",
  },
  {
    id: 9,
    verse: "कंचन वरण विराज सुबेसा।",
    maleVersion: "Male Audio URL 9",
    femaleVersion: "Female Audio URL 9",
    childVersion: "Child Audio URL 9",
  },
  {
    id: 10,
    verse: "कानन कुंडल कुंचित केसा॥",
    maleVersion: "Male Audio URL 10",
    femaleVersion: "Female Audio URL 10",
    childVersion: "Child Audio URL 10",
  },
  {
    id: 11,
    verse: "हाथ वज्र और ध्वजा विराजै।",
    maleVersion: "Male Audio URL 11",
    femaleVersion: "Female Audio URL 11",
    childVersion: "Child Audio URL 11",
  },
  {
    id: 12,
    verse: "काँधे मूँज जनेऊ साजै॥",
    maleVersion: "Male Audio URL 12",
    femaleVersion: "Female Audio URL 12",
    childVersion: "Child Audio URL 12",
  },
  {
    id: 13,
    verse: "शंकर सुवन केसरी नंदन।",
    maleVersion: "Male Audio URL 13",
    femaleVersion: "Female Audio URL 13",
    childVersion: "Child Audio URL 13",
  },
  {
    id: 14,
    verse: "तेज प्रताप महा जग वंदन॥",
    maleVersion: "Male Audio URL 14",
    femaleVersion: "Female Audio URL 14",
    childVersion: "Child Audio URL 14",
  },
  {
    id: 15,
    verse: "विद्यावान गुणी अति चातुर।",
    maleVersion: "Male Audio URL 15",
    femaleVersion: "Female Audio URL 15",
    childVersion: "Child Audio URL 15",
  },
  {
    id: 16,
    verse: "राम काज करिबे को आतुर॥",
    maleVersion: "Male Audio URL 16",
    femaleVersion: "Female Audio URL 16",
    childVersion: "Child Audio URL 16",
  },
];

// Get Items
export const getItems = () => {
  return [...hanumanChalisaItems];
};

// Add Item
export const addItem = (newItem) => {
  const maxId = hanumanChalisaItems.length > 0 ? Math.max(...hanumanChalisaItems.map(item => item.id)) : 0;
  newItem.id = maxId + 1;
  hanumanChalisaItems = [...hanumanChalisaItems, newItem];
};

// Update Item
export const updateItem = (id, updatedItem) => {
  hanumanChalisaItems = hanumanChalisaItems.map((item) =>
    item.id === id ? { ...item, ...updatedItem } : item
  );
};

// Delete Item
export const deleteItem = (id) => {
  hanumanChalisaItems = hanumanChalisaItems.filter((item) => item.id !== id);
};
