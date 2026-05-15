import { useState, useEffect } from 'react';
import { AdvocateRepository } from '../../infrastructure/repositories/AdvocateRepository';

export const useAdvocates = () => {
  const [advocates, setAdvocates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AdvocateRepository.getAllAdvocates();
        setAdvocates(data);
      } catch (error) {
        console.error("Error fetching advocates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { advocates, loading };
};
