const defaultMethods = [
    {
      name: 'Email',
      description: 'Communication via email',
      sequence: 1,
      mandatory: true
    },
    {
      name: 'Phone Call',
      description: 'Communication via phone call',
      sequence: 2,
      mandatory: false
    },
    {
      name: 'SMS',
      description: 'Communication via text message',
      sequence: 3,
      mandatory: false
    },
    {
      name: 'LinkedIn Post',
      description: 'Communication via video call',
      sequence: 4,
      mandatory: true
    }
  ];
  
  export default defaultMethods;
  