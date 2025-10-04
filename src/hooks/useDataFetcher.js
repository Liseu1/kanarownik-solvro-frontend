import { useEffect, useState } from "react";

import prData from "../assets/pr.json";
import tasksData from "../assets/tasks.json";
import usersData from "../assets/users.json";

const DATA_MAP = {
  "api/pr": prData,
  "api/tasks": tasksData,
  "api/users": usersData,
};

const useDataFetcher = (dataKey, intervalTime) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      console.log(`FETCHING DATA FOR: ${dataKey}...`);

      try {
        if (!DATA_MAP[dataKey]) {
          throw new Error(`Resource '${dataKey}' not found in DATA_MAP.`);
        }

        await new Promise((resolve) => setTimeout(resolve, 1500));

        const result = DATA_MAP[dataKey];

        setData(result);
      } catch (error) {
        console.error(`Data Fetch Error:`, error);
        setError(error.message || "An unknown error occured");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, intervalTime);
    return () => clearInterval(intervalId);
  }, [dataKey, intervalTime]);

  return { data, isLoading, error };
};

export default useDataFetcher;
