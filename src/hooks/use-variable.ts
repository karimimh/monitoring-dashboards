import { Variable } from "@/schemas/variable";
import { executeVariableQuery } from "@/services/services";
import { useQueries } from "@tanstack/react-query";

type UseVariablesResult = {
  data: (string | null)[] | undefined;
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
