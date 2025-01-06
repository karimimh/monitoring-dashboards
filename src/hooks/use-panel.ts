import { useQuery } from "@tanstack/react-query";
import { fetchPanel } from "../services/services";

export const usePanel = () => {
  return useQuery({ queryKey: ["testData"], queryFn: fetchPanel });
};
