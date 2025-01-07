import { PanelApi } from "@/schemas/panel";
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
  queries: string[][]
): UseDatabaseQueriesResult => {
  const results = useQueries({
    queries: queries.map((queryList) => ({
      queryKey: ["databaseQuery", db, queryList],
      queryFn: async () => {
        const results = await Promise.allSettled(
          queryList.map((query) => executeDatabaseQuery(db, query))
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
