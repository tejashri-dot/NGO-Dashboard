import React from 'react';
import useAuth from '../../hooks/useAuth';
import styles from './Dashboard.module.css';

const AdminDashboard = () => {
  const { logout } = useAuth();
  return (
    <div className={styles.DashboardContainer}>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
 
export default AdminDashboard;
