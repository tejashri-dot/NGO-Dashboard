let testimonyList = [
  {
    id: 1,
    userId: 'U001',
    name: 'John Doe',
    content: 'Great Experience!',
    videoUrl: 'https://example.com/video1',
    createdAt: '2023-01-01',
    rating: 5,
    feedback: 'Awesome!',
  },
  {
    id: 2,
    userId: 'U002',
    name: 'Jane Smith',
    content: 'Loved the service.',
    videoUrl: 'https://example.com/video2',
    createdAt: '2023-02-15',
    rating: 4,
    feedback: 'Awesome!',
  },
  {
    id: 3,
    userId: 'U003',
    name: 'Michael Brown',
    content: 'Good but can improve.',
    videoUrl: 'https://example.com/video3',
    createdAt: '2023-03-10',
    rating: 3,
    feedback: 'Awesome!',
  },
];

// Get All Testimonies
export const getTestimonies = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(testimonyList), 500);
  });
};

// Add New Testimony
export const addTestimony = async (newTestimony) => {
  return new Promise((resolve) => {
    const newId = testimonyList.length ? testimonyList[testimonyList.length - 1].id + 1 : 1;
    const testimonyToAdd = { ...newTestimony, id: newId };
    testimonyList.push(testimonyToAdd);
    resolve(testimonyToAdd);
  });
};

// Update Existing Testimony
export const updateTestimony = async (updatedTestimony) => {
  return new Promise((resolve) => {
    testimonyList = testimonyList.map((testimony) =>
      testimony.id === updatedTestimony.id ? updatedTestimony : testimony
    );
    resolve(updatedTestimony);
  });
};

// Delete Testimony
export const deleteTestimony = async (id) => {
  return new Promise((resolve) => {
    testimonyList = testimonyList.filter((testimony) => testimony.id !== id);
    resolve(id);
  });
};
