import React, { useState, useContext, createContext,useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import HanumanChalisaPage from './pages/HanumanChalisapage';
import WebsiteControlPage from './pages/WebsiteControlPage';
import AllTemplePage from './pages/AllTemplePages';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import KathaPage from './pages/KathaPage';
import EngagementPage from './pages/EngagementPage';
import Donation from './components/services/donation/Donation';
import YGallery from './components/services/yGallery/YGallery';
import YStory from './components/services/yStory/YStory';
import MyYugaLibrary from './components/services/myYugaLibrary/MyYugaLibrary';
import Testimony from './components/services/testimony/Testimony';
import Scanner from './components/services/scanner/Scanner';
import LearnHanumanChalisa from './components/services/learnHanumanChalisa/LearnHanumanChalisa';
// import Bhajan from './components/facilities/bhajan/Bhajan';
// import Mantra from './components/facilities/mantra/Mantra';
// import LiveAarti from './components/facilities/liveAarti/LiveAarti';
// import Jaap from './components/facilities/jaap/Jaap';
import Bhishi from './components/services/bhishi/Bhishi'


import './App.css';


const NameContext = createContext();

function App() {
  const [name, setName] = useState("");
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) setName(storedName);
  }, []);
  

  // State to toggle Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Function to toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  // Save name to localStorage
  const handleSave = () => {
    localStorage.setItem("name", name);
  };

  return (
      <ThemeProvider>
        <div className="app-container">
          <button className="toggle-button" onClick={toggleSidebar}>
            {isSidebarOpen ? '◀' : '▶'}
          </button>
          <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>

            <Sidebar />
          </aside>

          <main className="main-content">
            <div className="NavContainer">
              <Navbar />
            </div>
            <Routes>

              <Route
                path="/"
                element={
                    <DashboardPage />
                }
              />
              <Route
                path="/users"
                element={
                    <UsersPage />
                }
              />
              <Route
                path="/hanuman-chalisa"
                element={
                    <HanumanChalisaPage />
                }
              />

              <Route
                path="/services/donation"
                element={
                    <Donation />
                }
              />
              <Route path="/services/bhishi" element={<Bhishi />} />
              <Route
                path="/services/y-gallery"
                element={
                    <YGallery />
                }
              />
              <Route
                path="/services/y-story"
                element={
                   <YStory />
                }
              />
              <Route
                path="/services/my-yuga-library"
                element={
                   <MyYugaLibrary />
                }
              />
              <Route
                path="/services/testimony"
                element={
                    <Testimony />
                }
              />
              <Route
                path="/services/scanner"
                element={
                    <Scanner />
                }
              />
              <Route
                path="/services/learn-hanuman-chalisa"
                element={
                    <LearnHanumanChalisa />
                }
              />

              {/* <Route
                path="/facilities/bhajan"
                element={
                    <Bhajan />
                }
              />
              <Route
                path="/facilities/mantra"
                element={
                    <Mantra />
                }
              />
              <Route
                path="/facilities/live-aarti"
                element={
                    <LiveAarti />
                }
              />
              <Route
                path="/facilities/jaap"
                element={
                    <Jaap />
                }
              /> */}

              <Route
                path="/website-control"
                element={
                    <WebsiteControlPage />
                }
              />
              <Route
                path="/katha"
                element={
                    <KathaPage />
                }
              />
              <Route
                path="/all-temples"
                element={
                    <AllTemplePage />
                }
              />
              <Route
                path="/analytics"
                element={
                    <AnalyticsPage />
                }
              />
              <Route
                path="/engagements"
                element={
                    <EngagementPage />
                }
              />
              <Route
                path="/settings"
                element={
                    <SettingsPage />
                }
              />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
  );
}

export default App;
