let scannerList = [
  {
    id: 1,
    code: "QR12345",
    type: "QR Code",
    scannedBy: "User1",
    scannedAt: "2025-02-15 10:00 AM",
  },
  {
    id: 2,
    code: "BAR67890",
    type: "Barcode",
    scannedBy: "User2",
    scannedAt: "2025-02-15 11:00 AM",
  },
];

export const getScannerItems = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(scannerList), 500);
  });
};

export const addScannerItem = async (newItem) => {
  return new Promise((resolve) => {
    const newId = scannerList.length ? scannerList[scannerList.length - 1].id + 1 : 1;
    const itemToAdd = { ...newItem, id: newId };
    scannerList.push(itemToAdd);
    resolve(itemToAdd);
  });
};

export const updateScannerItem = async (updatedItem) => {
  return new Promise((resolve) => {
    scannerList = scannerList.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    resolve(updatedItem);
  });
};

export const deleteScannerItem = async (id) => {
  return new Promise((resolve) => {
    scannerList = scannerList.filter((item) => item.id !== id);
    resolve(id);
  });
};