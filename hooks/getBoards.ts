import useSWR from "swr";
import Fetcher from "../lib/fetcher";

const useGetItems = () => {
  const { data, error } = useSWR("/getBoards", Fetcher);

  return { boards: data, error: error, loading: !data && !error };
};

export default useGetItems;
