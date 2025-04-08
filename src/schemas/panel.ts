import { z } from "zod";

export const panelApiSchema = z.object({
  results: z.array(
    z.object({
      statement_id: z.number(),
      series: z.array(
        z.object({
          name: z.string(),
          columns: z.array(z.string()),
          values: z.array(z.array(z.union([z.string(), z.number(), z.null()]))),
        })
      ),
    })
  ),
});

export type PanelApi = z.infer<typeof panelApiSchema>;
