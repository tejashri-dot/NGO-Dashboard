import React, { useState, useEffect } from "react";
import Styles from "./Scanner.module.css";
import withMaterialTable from "../../shared/withMaterialTable";
import {
  getScannerItems,
  addScannerItem,
  updateScannerItem,
  deleteScannerItem,
} from "../../../Datafiles/ScannerData";

const Scanner = () => {
  const [showUpi, setShowUpi] = useState(false);
  const [socialLinks, setSocialLinks] = useState({
    whatsapp: "https://whatsapp.com/channel/YOUR_WHATSAPP_CHANNEL_LINK",
    telegram: "https://t.me/YOUR_TELEGRAM_CHANNEL_LINK",
  });

  // Fetch WhatsApp and Telegram links
  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        // Simulated API response (replace with real fetch if available)
        const simulatedLinks = {
          whatsapp: "https://whatsapp.com/channel/0029VaEXAMPLE", // Replace with real link
          telegram: "https://t.me/ExampleChannel", // Replace with real link
        };
        console.log("Fetched social links:", simulatedLinks); // Debug log
        setSocialLinks(simulatedLinks);
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };

    fetchSocialLinks();
  }, []);

  const handleAddData = async (newData) => {
    const addedItem = await addScannerItem(newData);
    console.log("Item added:", addedItem); // Debug log
    setShowUpi(true);
    setTimeout(() => setShowUpi(false), 5000);
    return addedItem;
  };

  const handleScanCodeClick = () => {
    console.log("Scan Code to Pay clicked"); // Debug log
    setShowUpi(true);
    setTimeout(() => setShowUpi(false), 5000); // Optional: auto-hide after 5 seconds
  };

  console.log("Rendering with socialLinks:", socialLinks); // Debug log
  console.log("Show UPI:", showUpi); // Debug log

  return (
    <div className={Styles.Container}>
      <h1>Scanner Management</h1>

      {/* Social Media Links */}
      <div className={Styles.socialLinks}>
        <a
          href={socialLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={Styles.socialButton}
        >
          Join our WhatsApp Channel
        </a>
        <a
          href={socialLinks.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className={Styles.socialButton}
        >
          Join our Telegram Channel
        </a>
      </div>

      {/* Scan Code Button */}
      <button onClick={handleScanCodeClick} className={Styles.scanButton}>
        Scan Code to Pay
      </button>

      {/* UPI Payment Option */}
      {showUpi && (
        <div className={Styles.upiContainer}>
          <h3>Support Us via UPI</h3>
          <p>Scan with PhonePe or any UPI app:</p>
          <img
            src="https://example.com/phonepe-upi-qr-code.png" // Replace with your actual UPI QR code URL
            alt="PhonePe UPI QR Code"
            className={Styles.upiQrCode}
          />
          <p>Or use UPI ID: yourupiid@upi</p> {/* Replace with your actual UPI ID */}
          <a
            href="upi://pay?pa=yourupiid@upi&pn=YourName&cu=INR"
            className={Styles.upiLink}
          >
            Open UPI App
          </a>
          <button
            onClick={() => setShowUpi(false)}
            className={Styles.closeUpiButton}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default withMaterialTable(Scanner, {
  title: "Scanner Management",
  columns: [
    { accessorKey: "id", header: "Sr No" },
    { accessorKey: "code", header: "Code" },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "scannedBy", header: "Scanned By" },
    { accessorKey: "scannedAt", header: "Scanned At" },
  ],
  getData: async () => {
    const data = await getScannerItems();
    console.log("Fetched scanner items:", data); // Debug log
    return data; // Assuming getScannerItems returns an array
  },
  addData: async (newData) => {
    const addedItem = await addScannerItem(newData);
    return addedItem;
  },
  updateData: async (updatedData) => {
    const updatedItem = await updateScannerItem(updatedData);
    return updatedItem;
  },
  deleteData: async (id) => {
    await deleteScannerItem(id);
    return id;
  },
});