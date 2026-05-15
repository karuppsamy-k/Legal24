import { advocatesMockData } from '../mock/AdditionalMockData';

export const AdvocateRepository = {
  getAllAdvocates: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    return advocatesMockData;
  }
};
