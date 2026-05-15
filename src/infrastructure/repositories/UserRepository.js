import { usersMockData } from '../mock/UserMockData';

export const UserRepository = {
  getUsers: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    return usersMockData;
  },
  addUser: async (user) => {
    // Mock adding user
    console.log('Adding user:', user);
    return { ...user, id: Math.random() };
  }
};
