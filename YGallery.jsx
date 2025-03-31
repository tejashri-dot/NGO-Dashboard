import React, { useState, useEffect } from "react";
import styles from "./YGallery.module.css";
import { IoMdCloudUpload, IoIosArrowForward } from "react-icons/io";
import { BsThreeDotsVertical, BsXCircle } from "react-icons/bs";
import { Menu, MenuItem, IconButton } from "@mui/material";

const YGallery = () => {
  // Constants
  const ITEMS_PER_PAGE = 5;
  const MAX_IMAGES = 3;
  const MAX_STORED_ITEMS = 20;
  const STORAGE_WARNING_LIMIT = 15;

  // Initial data
  const initialData = [
    {
      id: "D001",
      title: "Donation Event",
      subtitle: "Charity Drive 2025",
      description: "Annual donation event",
      image: "https://via.placeholder.com/150"
    },
    {
      id: "D002",
      title: "Community Meet",
      subtitle: "Spring Gathering",
      description: "Local community event",
      image: "https://via.placeholder.com/150"
    }
  ];

  // State management
  const [galleryItems, setGalleryItems] = useState(() => {
    try {
      const savedItems = localStorage.getItem("galleryItems");
      return savedItems ? JSON.parse(savedItems) : initialData;
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return initialData;
    }
  });

  const [newItem, setNewItem] = useState({
    title: "",
    subtitle: "",
    description: "",
    images: []
  });

  const [editItem, setEditItem] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filters, setFilters] = useState({
    srNo: "",
    id: "",
    title: "",
    subtitle: "",
    description: "",
    image: ""
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [storageWarning, setStorageWarning] = useState(false);

  // Filter and pagination logic
  const filteredItems = galleryItems.filter((item, index) => {
    const srNoMatch = filters.srNo ? String(index + 1).includes(filters.srNo) : true;
    const idMatch = filters.id ? item.id.toLowerCase().includes(filters.id.toLowerCase()) : true;
    const titleMatch = filters.title ? item.title.toLowerCase().includes(filters.title.toLowerCase()) : true;
    const subtitleMatch = filters.subtitle ? item.subtitle.toLowerCase().includes(filters.subtitle.toLowerCase()) : true;
    const descriptionMatch = filters.description ? item.description.toLowerCase().includes(filters.description.toLowerCase()) : true;
    const imageMatch = filters.image ? (item.image || "").toLowerCase().includes(filters.image.toLowerCase()) : true;

    return srNoMatch && idMatch && titleMatch && subtitleMatch && descriptionMatch && imageMatch;
  });

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // LocalStorage management
  useEffect(() => {
    const saveToLocalStorage = () => {
      try {
        const itemsToStore = galleryItems.slice(-MAX_STORED_ITEMS);
        
        if (galleryItems.length >= STORAGE_WARNING_LIMIT) {
          setStorageWarning(true);
        } else {
          setStorageWarning(false);
        }

        localStorage.setItem("galleryItems", JSON.stringify(itemsToStore));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
        setNotification("Error saving data. Some items may not persist.");
        setTimeout(() => setNotification(null), 3000);
      }
    };

    saveToLocalStorage();
  }, [galleryItems]);

  // Event handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    const totalImagesAfterSelection = newItem.images.length + files.length;
    if (totalImagesAfterSelection > MAX_IMAGES) {
      setNotification(`You can only upload up to ${MAX_IMAGES} images at once.`);
      setTimeout(() => setNotification(null), 3000);
      e.target.value = null;
      return;
    }

    setUploadProgress(0);
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 5;
      if (progress > 95) {
        clearInterval(progressInterval);
      } else {
        setUploadProgress(progress);
      }
    }, 100);

    const imagePromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then((imageDataUrls) => {
      setNewItem((prev) => ({ 
        ...prev, 
        images: [...prev.images, ...imageDataUrls] 
      }));
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setUploadProgress(0);
        setFileInputKey(Date.now());
      }, 1000);
    });
  };

  const handleRemoveImage = (indexToRemove) => {
    setNewItem((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
    setFileInputKey(Date.now());
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditItem((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (newItem.images.length === 0) {
      setNotification("Please select at least one image to upload.");
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    if (galleryItems.length >= MAX_STORED_ITEMS) {
      setNotification(`Storage limit reached. Only the most recent ${MAX_STORED_ITEMS} items are kept.`);
      setTimeout(() => setNotification(null), 5000);
    }

    const nextId = galleryItems.length > 0 
      ? Math.max(...galleryItems.map(item => parseInt(item.id.substring(1)))) + 1 
      : 1;

    const newGalleryItems = newItem.images.map((image, index) => ({
      id: `D${String(nextId + index).padStart(3, "0")}`,
      title: newItem.title,
      subtitle: newItem.subtitle,
      description: newItem.description,
      image
    }));

    setGalleryItems((prev) => [...prev, ...newGalleryItems].slice(-MAX_STORED_ITEMS));
    setNewItem({ title: "", subtitle: "", description: "", images: [] });
    setShowUploadForm(false);
    setNotification(`Successfully uploaded ${newItem.images.length} image${newItem.images.length > 1 ? "s" : ""}!`);
    setTimeout(() => setNotification(null), 3000);
    setFileInputKey(Date.now());

    const newTotalItems = Math.min(galleryItems.length + newItem.images.length, MAX_STORED_ITEMS);
    const newPage = Math.ceil(newTotalItems / ITEMS_PER_PAGE);
    setCurrentPage(newPage);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setAnchorEl(null);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setGalleryItems((prev) =>
      prev.map((item) => (item.id === editItem.id ? editItem : item))
    );
    setEditItem(null);
    setNotification("Item updated successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = (id) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
    setNotification("Item deleted successfully!");
    setTimeout(() => setNotification(null), 3000);
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
    setAnchorEl(null);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setEditItem(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleMenuOpen = (event, itemId) => {
    setAnchorEl(event.currentTarget);
    setSelectedItemId(itemId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItemId(null);
  };

  const handleCancelUpload = () => {
    setNewItem({ title: "", subtitle: "", description: "", images: [] });
    setShowUploadForm(false);
    setFileInputKey(Date.now());
  };

  const clearStorage = () => {
    localStorage.removeItem("galleryItems");
    setGalleryItems(initialData);
    setNotification("Local storage cleared successfully!");
    setTimeout(() => setNotification(null), 3000);
    setStorageWarning(false);
  };

  const renderImageCell = (item) => {
    const imageSrc = item.image || 'https://via.placeholder.com/100?text=No+Image';
    return (
      <img
        src={imageSrc}
        alt={item.title}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          cursor: "pointer"
        }}
        onClick={() => handleImageClick(imageSrc)}
      />
    );
  };

  return (
    <div className={styles.container}>
      <h1>Gallery Management</h1>

      {storageWarning && (
        <div className={styles.storageWarning}>
          <p>Warning: Approaching storage limit. Only the most recent {MAX_STORED_ITEMS} items will be saved.</p>
          <button onClick={clearStorage} className={styles.clearStorageButton}>
            Clear Storage
          </button>
        </div>
      )}

      {!showUploadForm && (
        <button
          onClick={() => setShowUploadForm(true)}
          className={styles.uploadInfoButton}
        >
          Upload Multiple Images (Max {MAX_IMAGES})
        </button>
      )}

      <div className={styles.filterContainer}>
        <label className={styles.filterLabel}>
          Sr.No:
          <input
            type="text"
            name="srNo"
            value={filters.srNo}
            onChange={handleFilterChange}
            className={styles.filterInput}
          />
        </label>
        <label className={styles.filterLabel}>
          Image ID:
          <input
            type="text"
            name="id"
            value={filters.id}
            onChange={handleFilterChange}
            className={styles.filterInput}
          />
        </label>
        <label className={styles.filterLabel}>
          Title:
          <input
            type="text"
            name="title"
            value={filters.title}
            onChange={handleFilterChange}
            className={styles.filterInput}
          />
        </label>
        <label className={styles.filterLabel}>
          Subtitle:
          <input
            type="text"
            name="subtitle"
            value={filters.subtitle}
            onChange={handleFilterChange}
            className={styles.filterInput}
          />
        </label>
        <label className={styles.filterLabel}>
          Description:
          <input
            type="text"
            name="description"
            value={filters.description}
            onChange={handleFilterChange}
            className={styles.filterInput}
          />
        </label>
        <label className={styles.filterLabel}>
          Image:
          <input
            type="text"
            name="image"
            value={filters.image}
            onChange={handleFilterChange}
            className={styles.filterInput}
          />
        </label>
      </div>

      {showUploadForm && (
        <div className={styles.uploadForm}>
          <h2>Add New Images (Max {MAX_IMAGES})</h2>
          <form onSubmit={handleUpload}>
            <div className={styles.formGroup}>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={newItem.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Subtitle:</label>
              <input
                type="text"
                name="subtitle"
                value={newItem.subtitle}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Description:</label>
              <textarea
                name="description"
                value={newItem.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Images (Max {MAX_IMAGES}):</label>
              <div className={styles.fileUpload}>
                <IoMdCloudUpload style={{ fontSize: "24px" }} />
                <input
                  key={fileInputKey}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  disabled={newItem.images.length >= MAX_IMAGES}
                />
              </div>
              <p className={styles.uploadHint}>
                Selected: {newItem.images.length}/{MAX_IMAGES} images
                {newItem.images.length >= MAX_IMAGES && (
                  <span className={styles.maxReached}> (Maximum reached)</span>
                )}
              </p>
              
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className={styles.progressContainer}>
                  <div 
                    className={styles.progressBar} 
                    style={{width: `${uploadProgress}%`}}
                  ></div>
                  <span>{uploadProgress}%</span>
                </div>
              )}
            </div>

            {newItem.images.length > 0 && (
              <div className={styles.imagePreview}>
                <h3>Selected Images ({newItem.images.length}/{MAX_IMAGES}):</h3>
                <div className={styles.previewContainer}>
                  {newItem.images.map((image, index) => (
                    <div key={index} className={styles.previewItem}>
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover"
                        }}
                      />
                      <button 
                        type="button"
                        className={styles.removeImageBtn}
                        onClick={() => handleRemoveImage(index)}
                        title="Remove image"
                      >
                        <BsXCircle />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.formActions}>
              <button 
                type="submit" 
                className={styles.submitButton} 
                disabled={newItem.images.length === 0}
              >
                Upload {newItem.images.length > 1 ? `${newItem.images.length} Images` : 'Image'}
              </button>
              <button 
                type="button" 
                className={styles.cancelButton}
                onClick={handleCancelUpload}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {editItem && (
        <div className={styles.uploadForm}>
          <h2>Edit Item</h2>
          <form onSubmit={handleUpdate}>
            <div className={styles.formGroup}>
              <label>Image ID:</label>
              <input type="text" value={editItem.id} disabled />
            </div>
            <div className={styles.formGroup}>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={editItem.title}
                onChange={handleEditInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Subtitle:</label>
              <input
                type="text"
                name="subtitle"
                value={editItem.subtitle}
                onChange={handleEditInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Description:</label>
              <textarea
                name="description"
                value={editItem.description}
                onChange={handleEditInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Image (100x100):</label>
              <div className={styles.fileUpload}>
                <IoMdCloudUpload style={{ fontSize: "24px" }} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditFileChange}
                />
              </div>
              <img
                src={editItem.image || 'https://via.placeholder.com/100?text=No+Image'}
                alt="Current"
                style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px" }}
              />
            </div>
            <div className={styles.formActions}>
              <button type="submit" className={styles.submitButton}>
                Update
              </button>
              <button
                type="button"
                onClick={closeModal}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <table className={styles.galleryTable}>
        <thead>
          <tr>
            <th><label>Sr.No</label></th>
            <th><label>Image ID</label></th>
            <th><label>Title</label></th>
            <th><label>Subtitle</label></th>
            <th><label>Description</label></th>
            <th><label>Image</label></th>
            <th><label>Actions</label></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.id}>
              <td>{startIndex + index + 1}</td>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.subtitle}</td>
              <td>{item.description}</td>
              <td>
                {renderImageCell(item)}
              </td>
              <td>
                <IconButton
                  onClick={(e) => handleMenuOpen(e, item.id)}
                  className={styles.actionButton}
                >
                  <BsThreeDotsVertical style={{ color: "#333" }} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedItemId === item.id}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleEdit(item)}>Edit</MenuItem>
                  <MenuItem onClick={() => handleDelete(item.id)}>Delete</MenuItem>
                </Menu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalItems === 0 ? (
        <div className={styles.noResults}>No items match your search criteria</div>
      ) : (
        <div className={styles.pagination}>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={styles.paginationButton}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || totalPages === 0}
            className={styles.paginationButton}
          >
            Next
          </button>
        </div>
      )}

      {notification && (
        <div className={styles.notification}>
          <IoIosArrowForward style={{ marginRight: "10px" }} />
          {notification}
        </div>
      )}

      {selectedImage && !editItem && (
        <div
          className={styles.modal}
          onClick={closeModal}
        >
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Enlarged View"
              style={{
                maxWidth: "90%",
                maxHeight: "80vh",
                objectFit: "contain"
              }}
            />
            <button className={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YGallery;