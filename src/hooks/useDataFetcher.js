import { useEffect, useState } from "react";

const API_BASE_URL = "";

const useDataFetcher = (dataKey, intervalTime) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      let endpoint;
      switch (dataKey) {
        case "api/pr":
          endpoint = "/pull-request";
          break;
        case "api/tasks":
          endpoint = "/task";
          break;
        case "api/users":
          endpoint = "/user";
          break;
        default:
          setError(`Unknown data key: ${dataKey}`);
          setIsLoading(false);
          return;
      }

      console.log(`FETCHING DATA FROM API: ${API_BASE_URL}${endpoint}...`);

      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);

        if (!response.ok) {
          throw new Error(
            `HTTP Error ${response.status}: ${response.statusText}`,
          );
        }

        const result = await response.json();

        setData(result);
      } catch (error) {
        console.error(`Data Fetch Error:`, error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred.",
        );
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
