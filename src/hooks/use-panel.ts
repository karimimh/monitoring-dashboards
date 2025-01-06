import { useQuery } from "@tanstack/react-query";
import { fetchAllPanels, fetchPanels } from "../services/services";

export const usePanelQueries = (db: string, queries: string[]) => {
  return useQuery({
    queryKey: ["testData", db, queries.join(",")],
    queryFn: () => fetchPanels(db, queries),
  });
};

export const useAllPanelQueries = (db: string, queries: string[][]) => {
  return useQuery({
    queryKey: ["testData", db, queries.join(",")],
    queryFn: () => fetchAllPanels(db, queries),
  });
};
