import { feedbacksMockData } from '../mock/FeedbackMockData';

export const FeedbackRepository = {
  getAllFeedbacks: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return feedbacksMockData;
  }
};
