// Firebase-ready Auth Service
// This can be easily swapped with actual Firebase Auth implementation

export const AuthService = {
  login: async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Hardcoded testing credentials
        const testCredentials = {
          'admin@legal24.com': { role: 'admin', name: 'System Admin' },
          'advocate@legal24.com': { role: 'advocate', name: 'Legal Professional' },
          'client@legal24.com': { role: 'client', name: 'Regular User' }
        };

        if (testCredentials[email] && (password === 'password123' || password === 'admin123')) {
          resolve({
            uid: 'mock-uid-' + testCredentials[email].role,
            email,
            name: testCredentials[email].name,
            role: testCredentials[email].role,
            createdAt: new Date().toISOString()
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
        } else {
          resolve({
            uid: 'new-uid-' + Math.random(),
            ...userData,
            createdAt: new Date().toISOString()
          });
        }
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
