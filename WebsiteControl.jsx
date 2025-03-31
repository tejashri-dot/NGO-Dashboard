import React, { useState } from 'react';
import { updateWebsiteSettings } from '../../Datafiles/WebsiteControlData'; // Assuming you have a function to update the data
import Styles from './WebsiteControl.module.css';

const WebsiteControl = () => {
  const [websiteStatus, setWebsiteStatus] = useState(true); // Online/Offline toggle
  const [contentUpdates, setContentUpdates] = useState(true); // Content toggle
  const [activeUsers, setActiveUsers] = useState(120); // Active users
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true); // Analytics toggle

  // Handle Website Status Toggle
  const handleWebsiteStatus = () => {
    setWebsiteStatus(!websiteStatus);
    updateWebsiteSettings({ websiteStatus: !websiteStatus });
  };

  // Handle Content Updates Toggle
  const handleContentUpdates = () => {
    setContentUpdates(!contentUpdates);
    updateWebsiteSettings({ contentUpdates: !contentUpdates });
  };

  // Handle Analytics Tracking Toggle
  const handleAnalyticsTracking = () => {
    setAnalyticsEnabled(!analyticsEnabled);
    updateWebsiteSettings({ analyticsEnabled: !analyticsEnabled });
  };

  return (
    <div className={Styles.Container}>
      <h2>Website Control</h2>

      {/* Website Status Control */}
      <div className={Styles.controlOption}>
        <h3>Website Status</h3>
        <div>Status: {websiteStatus ? 'Online' : 'Offline'}</div>
        <button onClick={handleWebsiteStatus}>
          {websiteStatus ? 'Disable Website' : 'Enable Website'}
        </button>
      </div>

      {/* Content Updates Control */}
      <div className={Styles.controlOption}>
        <h3>Content Updates</h3>
        <div>Updates: {contentUpdates ? 'Enabled' : 'Disabled'}</div>
        <button onClick={handleContentUpdates}>
          {contentUpdates ? 'Disable Updates' : 'Enable Updates'}
        </button>
      </div>

      {/* Active Users Control */}
      <div className={Styles.controlOption}>
        <h3>Active Users</h3>
        <div>Current Active Users: {activeUsers}</div>
        <button onClick={() => setActiveUsers(activeUsers + 1)}>Add User</button>
        <button onClick={() => setActiveUsers(activeUsers - 1)}>Remove User</button>
      </div>

      {/* Analytics Control */}
      <div className={Styles.controlOption}>
        <h3>Analytics Tracking</h3>
        <div>Status: {analyticsEnabled ? 'Enabled' : 'Disabled'}</div>
        <button onClick={handleAnalyticsTracking}>
          {analyticsEnabled ? 'Disable Analytics' : 'Enable Analytics'}
        </button>
      </div>
    </div>
  );
};

export default WebsiteControl;
