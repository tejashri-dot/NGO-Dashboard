let donationList = [
  {
    id: 1,
    donorName: "John Doe",
    amount: 1000,
    date: "2023-01-01",
    paymentMethod: "Credit Card",
    note: "For temple maintenance",
  },
  {
    id: 2,
    donorName: "Jane Smith",
    amount: 500,
    date: "2023-02-15",
    paymentMethod: "UPI",
    note: "General donation",
  },
  {
    id: 3,
    donorName: "Alice Johnson",
    amount: 200,
    date: "2023-03-10",
    paymentMethod: "Cash",
    note: "For charity",
  },
  {
    id: 4,
    donorName: "Bob Brown",
    amount: 1500,
    date: "2023-04-01",
    paymentMethod: "Debit Card",
    note: "Event support",
  },
  {
    id: 5,
    donorName: "Charlie Davis",
    amount: 300,
    date: "2023-05-05",
    paymentMethod: "Net Banking",
    note: "Community aid",
  },
  {
    id: 6,
    donorName: "Diana Evans",
    amount: 700,
    date: "2023-06-10",
    paymentMethod: "Cash",
    note: "Temple repair",
  },
  {
    id: 7,
    donorName: "Eve Foster",
    amount: 1200,
    date: "2023-07-15",
    paymentMethod: "Credit Card",
    note: "Festival fund",
  },
  {
    id: 8,
    donorName: "Frank Green",
    amount: 400,
    date: "2023-08-20",
    paymentMethod: "UPI",
    note: "General support",
  },
  {
    id: 9,
    donorName: "Grace Hill",
    amount: 900,
    date: "2023-09-25",
    paymentMethod: "Net Banking",
    note: "Charity drive",
  },
  {
    id: 10,
    donorName: "Hank Ives",
    amount: 600,
    date: "2023-10-30",
    paymentMethod: "Debit Card",
    note: "Event contribution",
  },
  {
    id: 11,
    donorName: "Ivy Jones",
    amount: 800,
    date: "2023-11-05",
    paymentMethod: "UPI",
    note: "Temple upkeep",
  },
];

// Get All Donations with Pagination
export const getDonations = async (page = 0, limit = 10) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = page * limit; // 0-based page index
      const endIndex = startIndex + limit;
      const paginatedData = donationList.slice(startIndex, endIndex);
      const totalItems = donationList.length;
      resolve({
        data: paginatedData,
        total: totalItems, // Total number of items for pagination
        page, // Current page
        totalPages: Math.ceil(totalItems / limit), // Total pages
      });
    }, 500);
  });
};

// Add New Donation
export const addDonation = async (newDonation) => {
  return new Promise((resolve) => {
    const newId = donationList.length ? donationList[donationList.length - 1].id + 1 : 1;
    const donationToAdd = { ...newDonation, id: newId };
    donationList.push(donationToAdd);
    resolve(donationToAdd);
  });
};

// Update Existing Donation
export const updateDonation = async (updatedDonation) => {
  return new Promise((resolve) => {
    donationList = donationList.map((donation) =>
      donation.id === updatedDonation.id ? updatedDonation : donation
    );
    resolve(updatedDonation);
  });
};

// Delete Donation
export const deleteDonation = async (id) => {
  return new Promise((resolve) => {
    donationList = donationList.filter((donation) => donation.id !== id);
    resolve(id);
  });
};