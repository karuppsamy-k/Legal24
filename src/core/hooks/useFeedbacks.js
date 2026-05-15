import { useState, useEffect } from 'react';
import { FeedbackRepository } from '../../infrastructure/repositories/FeedbackRepository';

export const useFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FeedbackRepository.getAllFeedbacks();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { feedbacks, loading };
};
