const DashboardData = {
    header: {
      title: 'Hanuman Chalisa Admin Dashboard',
      welcomeMessage: 'Welcome to the Hanuman Chalisa Management Dashboard'
    },
    statsHeadings: {
      totalChants: 'Total Chants',
      chantsToday: 'Chants Today',
      pendingSubmissions: 'Pending Submissions',
      registeredUsers: 'Registered Users'
    },
    stats: {
      totalChants: 1200,
      chantsToday: 150,
      pendingSubmissions: 8,
      registeredUsers: 300
    },
    recentActivityHeading: 'Recent Activities',
    recentActivities: [
      'User A completed a chant',
      'User B submitted a new chant',
      'User C registered',
      'User D completed a chant'
    ],
    chartHeadings: {
      chantingOverview: 'Chanting Overview',
      chantingTrends: 'Chanting Trends',
      engagementActivities: 'Engagement Activities'
    },
    chartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Chants',
          data: [100, 200, 150, 300, 250],
          backgroundColor: '#8884d8'
        }
      ]
    },
    chantingTrendsData: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [
        {
          label: 'Chants',
          data: [50, 70, 60, 90, 80],
          borderColor: '#82ca9d'
        }
      ]
    } 
  };
  
  export default DashboardData;
  