import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./AxiosSecure";

const useFetchData = (queryKey, url) => {
  const axiosSecure = useAxiosSecure();

  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await axiosSecure.get(url);
      return response.data || []; // Default to an empty array if no data
    },
  });

  return { data, isLoading, error, refetch };
};

export default useFetchData;
