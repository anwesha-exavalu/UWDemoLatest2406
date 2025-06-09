// dummyData.js
export const dashboardData = {
  myteamscases: [
    { 
      id: 'CP1001', 
      client: 'Fleet Solutions', 
      lob: 'Commercial Property', 
      status: 'Clearance UW', 
      limit: '$500,000', 
      date: '20-08-2024', 
      broker: 'Marsh', 
      priority: 'Medium' 
    },
    { 
      id: 'CP1002', 
      client: 'Skyline Residences', 
      lob: 'Commercial Property', 
      status: 'Clearance UW', 
      limit: '$250,000', 
      date: '18-08-2024', 
      broker: 'Marsh', 
      priority: 'Medium' 
    }
  ],
  myassignedcases: [
    { 
      id: 'CP1003', 
      client: 'Skyline Property Inc.', 
      lob: 'Commercial Property', 
      status: 'Awaiting Client Response', 
      limit: '$900,000', 
      date: '10-15-2024', 
      broker: 'Marsh', 
      priority: 'Medium' 
    },
    { 
      id: 'CP1001', 
      client: 'Fleet Solutions', 
      lob: 'Commercial Property', 
      status: 'Clearance UW', 
      limit: '$500,000', 
      date: '20-08-2024', 
      broker: 'Marsh', 
      priority: 'Medium' 
    },
    { 
      id: 'CP1006', 
      client: 'Uptown Commercial Spaces', 
      lob: 'Commercial Property', 
      status: 'Broker Review', 
      limit: '$450,000', 
      date: '17-08-2024', 
      broker: 'Marsh', 
      priority: 'Medium' 
    }
  ],
  senttobroker: [
    { 
      id: 'CP1006', 
      client: 'Uptown Commercial Spaces', 
      lob: 'Commercial Property', 
      status: 'Broker Review', 
      limit: '$450,000', 
      date: '17-08-2024', 
      broker: 'Marsh', 
      priority: 'Medium' 
    },
    { 
      id: 'CP1007', 
      client: 'Client F', 
      lob: 'Commercial Property', 
      status: 'Broker Review', 
      limit: '$100,000', 
      date: '09-08-2024', 
      broker: 'Marsh', 
      priority: 'High' 
    }
  ],
  close: [
    { 
      id: 'CP1009', 
      client: 'Client F', 
      lob: 'Commercial Property', 
      status: 'Approved', 
      limit: '$700,000', 
      date: '10-08-2024', 
      broker: 'Marsh', 
      priority: 'Low' 
    },
    { 
      id: 'CP1010', 
      client: 'Client I', 
      lob: 'Commercial Property', 
      status: 'Rejected', 
      limit: '$300,000', 
      date: '11-08-2024', 
      broker: 'Marsh', 
      priority: 'High' 
    }
  ]
};

export const chartData = {
  policiesIssued: {
    labels: ['Commercial Property', 'General Liability'],
    data: [30, 25],
    colors: ['#204FC2', '#E9EDF7']
  },
  submissionsInProgress: {
    labels: ['Commercial Property', 'General Liability'],
    data: [40, 35],
    colors: ['#204FC2', '#E9EDF7']
  },
  newBusinessRenewal: {
    labels: ['Acquisition', 'Purchase', 'Retention'],
    data: [40, 35, 25],
    colors: ['#204FC2', '#D2DAF2', '#97A5EB']
  }
};

export const legendConfig = {
  policiesIssued: [
    { color: '#204FC2', label: 'Commercial Property' },
    { color: '#E9EDF7', label: 'General Liability' }
  ],
  submissionsInProgress: [
    { color: '#204FC2', label: 'Commercial Property' },
    { color: '#E9EDF7', label: 'General Liability' }
  ],
  newBusinessRenewal: [
    { color: '#204FC2', label: 'Acquisition' },
    { color: '#D2DAF2', label: 'Purchase' },
    { color: '#97A5EB', label: 'Retention' }
  ]
};