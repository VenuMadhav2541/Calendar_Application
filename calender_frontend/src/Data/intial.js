const initialCompanies = [
  { id: 1, name: 'Company A', communications: [
      { type: 'LinkedIn Post', date: '2024-12-01', notes: 'Initial post.' },
      { type: 'Email', date: '2024-12-10', notes: 'Follow-up email.' }
    ],
    nextCommunication: { type: 'Phone Call', date: '2024-12-25' }
  },
  { id: 2, name: 'Company B', communications: [
      { type: 'Email', date: '2024-12-27', notes: 'Sent a message.' }
    ],
    nextCommunication: { type: 'Email', date: '2024-12-30' }
  },
  { id: 3, name: 'Company C', communications: [
    { type: 'LinkedIn post', date: '2024-12-30', notes: 'Sent a message.' }
  ],
  nextCommunication: { type: 'Phone Call', date: '2024-12-26' }
  },
  { id: 4, name: 'Company D', communications: [
    { type: 'LinkedIn Message', date: '2025-01-01', notes: 'Sent a message.' }
  ],
  nextCommunication: { type: 'LinedIn Post', date: '2024-12-27' }
  }

];

export default initialCompanies;