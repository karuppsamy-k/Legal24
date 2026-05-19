export const AuthService = {
  login: async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Hardcoded testing credentials
        const testCredentials = {
          'admin@legal24.com': { role: 'admin', name: 'System Admin' },
          'advocate@legal24.com': { role: 'advocate', name: 'Legal Professional', status: 'approved' },
          'client@legal24.com': { role: 'client', name: 'Regular User' }
        };

        if (testCredentials[email] && (password === 'password123' || password === 'admin123')) {
          resolve({
            uid: 'mock-uid-' + testCredentials[email].role,
            email,
            name: testCredentials[email].name,
            role: testCredentials[email].role,
            status: testCredentials[email].status || 'approved',
            createdAt: new Date().toISOString()
          });
          return;
        }

        // Check local storage registered users
        const registeredUsers = JSON.parse(localStorage.getItem('legal24_users') || '[]');
        const user = registeredUsers.find(u => u.email === email && u.password === password);

        if (user) {
          let status = 'approved';
          let advocateDetails = null;

          if (user.role === 'advocate') {
            const advocatesList = JSON.parse(localStorage.getItem('legal24_advocates') || '[]');
            advocateDetails = advocatesList.find(a => a.email === email);
            status = advocateDetails ? advocateDetails.status : 'pending';
          }

          resolve({
            uid: user.uid,
            email: user.email,
            name: user.name,
            role: user.role,
            status: status,
            barCouncilId: user.barCouncilId,
            specialization: user.specialization,
            experience: user.experience,
            practiceCourts: user.practiceCourts,
            createdAt: user.createdAt
          });
        } else {
          reject(new Error('Invalid email or password. Use: admin@legal24.com, advocate@legal24.com, or client@legal24.com with password123'));
        }
      }, 1000);
    });
  },

  signup: async (userData) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.role === 'admin') {
          reject(new Error('Public admin registration is not allowed'));
          return;
        }

        const registeredUsers = JSON.parse(localStorage.getItem('legal24_users') || '[]');
        if (registeredUsers.some(u => u.email === userData.email)) {
          reject(new Error('User with this email already exists'));
          return;
        }

        const newUid = 'uid-' + Math.random().toString(36).substr(2, 9);
        const newUser = {
          uid: newUid,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          password: userData.password,
          role: userData.role,
          createdAt: new Date().toISOString()
        };

        if (userData.role === 'advocate') {
          newUser.barCouncilId = userData.barCouncilId;
          newUser.specialization = userData.specialization;
          newUser.experience = userData.experience;
          newUser.practiceCourts = userData.practiceCourts;
          newUser.status = 'pending';

          const advocatesList = JSON.parse(localStorage.getItem('legal24_advocates') || '[]');
          advocatesList.push({
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            barCouncilId: userData.barCouncilId,
            specialization: userData.specialization,
            experience: userData.experience + ' years',
            practiceCourts: userData.practiceCourts,
            status: 'pending',
            date: new Date().toLocaleDateString('en-GB')
          });
          localStorage.setItem('legal24_advocates', JSON.stringify(advocatesList));
        }

        registeredUsers.push(newUser);
        localStorage.setItem('legal24_users', JSON.stringify(registeredUsers));

        resolve({
          uid: newUser.uid,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          status: newUser.status || 'approved',
          createdAt: newUser.createdAt
        });
      }, 1500);
    });
  },

  resetPassword: async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Password reset link sent to ${email}`);
      }, 800);
    });
  }
};
