import { PanelApi } from "@/schemas/panel";
import { Variable } from "@/schemas/variable";
import { executeDatabaseQuery } from "@/services/services";
import { useQueries } from "@tanstack/react-query";

type UseDatabaseQueriesResult = {
  data: (PanelApi | null)[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
}[];

export const useDatabaseQueries = (
  db: string,
  query: string[][],
  variables: Variable[]
): UseDatabaseQueriesResult => {
  const replaceQueryVariables = (
    query: string,
    variables: Variable[]
  ): string => {
    // replace variable in query. they start with $ and end with space or )
    return variables.reduce((acc, { name, query: value }) => {
      return acc.replace(new RegExp(`\\$${name}(\\s|\\))`, "g"), value + "$1");
    }, query);
  };

  const results = useQueries({
    queries: query.map((queryList) => ({
      queryKey: ["databaseQuery", db, queryList],
      queryFn: async () => {
        const results = await Promise.allSettled(
          queryList.map((query) =>
            executeDatabaseQuery(db, replaceQueryVariables(query, variables))
          )
        );

        return results.map((result) =>
          result.status === "fulfilled" ? result.value : null
        );
      },
    })),
  });

  return results.map((result) => ({
    data: result.data,
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
  }));
};
