import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  BarChart, Bar, PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';
import DashboardData from '../../Datafiles/DashboardData';
import styles from './Dashboard.module.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <h1>{DashboardData.header.title}</h1>
      <p>{DashboardData.header.welcomeMessage}</p>

      <div className={styles.mainContainer}>
        <div className={styles.statsAndNotifications}>
          <div className={styles.statsContainer}>
            {Object.keys(DashboardData.stats).map((key, index) => (
              <div className={styles.statCard} key={index}>
                <h3>{DashboardData.statsHeadings[key]}</h3>
                <p>{DashboardData.stats[key]}</p>
              </div>
            ))}
          </div>

          <div className={styles.notifications}>
            <h3>{DashboardData.recentActivityHeading}</h3>
            <ul>
              {DashboardData.recentActivities.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.graphsContainer}>
          <div className={styles.graphCard}>
            <h3>{DashboardData.chartHeadings.chantingOverview}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={DashboardData.chartData.datasets[0].data.map((value, index) => ({
                name: DashboardData.chartData.labels[index],
                value
              }))}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill={DashboardData.chartData.datasets[0].backgroundColor} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.graphCard}>
            <h3>{DashboardData.chartHeadings.chantingTrends}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={DashboardData.chantingTrendsData.datasets[0].data.map((value, index) => ({
                name: DashboardData.chantingTrendsData.labels[index],
                value
              }))}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke={DashboardData.chantingTrendsData.datasets[0].borderColor} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.graphCard}>
            <h3>{DashboardData.chartHeadings.engagementActivities}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={DashboardData.recentActivities.map((activity, index) => ({
                    name: activity,
                    value: index + 1
                  }))}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {DashboardData.recentActivities.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
