import { Variable } from "@/schemas/variable";
import { executeVariableQuery } from "@/services/query-services";
import { useQueries } from "@tanstack/react-query";

export type UseVariablesResult = {
  data:
    | {
        results?: {
          series: {
            name: string;
            columns: {
              key: string;
              value: string;
            }[];
            values: (string | number | null)[][];
          }[];
          statement_id: number;
        }[];
      }
    | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
}[];

export const useVariables = (
  db: string,
  variables: Variable[]
): UseVariablesResult => {
  return useQueries({
    queries: variables.map((variable) => ({
      queryKey: ["variableQuery", db, variable.query],
      queryFn: async () => {
        const result = await executeVariableQuery(db, variable.query);
        return result;
      },
    })),
  });
};
