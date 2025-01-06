import { useQuery } from "@tanstack/react-query";
import { fetchPanel } from "../services/services";

export const useQueryPanel = (db: string, query: string) => {
  return useQuery({
    queryKey: ["testData", db, query],
    queryFn: () => fetchPanel(db, query),
  });
};
