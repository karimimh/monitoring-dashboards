import { PanelApi } from "@/schemas/panel";
import { Variable } from "@/schemas/variable";
import { executeDatabaseQuery } from "@/services/query-services";
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
  variableValues: {
    name: string;
    values: (string | number | null)[];
  }[],
  selectedVariableValues: {
    name: string;
    values: string | number | null;
  }[]
): UseDatabaseQueriesResult => {
  const replaceQueryVariables = (query: string): string => {
    if (variableValues.length === 0) return query;
    // replace variable in query.
    /*
    variableValues will be used in the query like this: 
    SELECT mean(load5) FROM system WHERE host =~ /^$server$/
    ( server is a variable name )
    Select mean(load5) FROM system WHERE host =~ /^host1$/ # if user selects host1
    */

    return variableValues.reduce((updatedQuery, variable) => {
      const variablePlaceholder = new RegExp(`\\$${variable.name}\\$`, "g");
      return updatedQuery.replace(
        variablePlaceholder,
        selectedVariableValues
          .find((item) => item.name === variable.name)
          ?.toString() ??
          variable.values.at(0)?.toString() ??
          ""
      );
    }, query);
  };

  const results = useQueries({
    queries: query.map((queryList) => ({
      queryKey: ["databaseQuery", db, queryList],
      queryFn: async () => {
        const results = await Promise.allSettled(
          queryList.map((query) =>
            executeDatabaseQuery(db, replaceQueryVariables(query))
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
