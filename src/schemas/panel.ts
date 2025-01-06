import { z } from "zod";

export const panelSchema = z.object({
  results: z.array(
    z.object({
      statement_id: z.number(),
      series: z.array(
        z.object({
          name: z.string(),
          columns: z.array(z.string()),
          values: z.array(
            z.tuple([z.string().datetime(), z.number().nullable()])
          ),
        })
      ),
    })
  ),
});

export type PanelType = z.infer<typeof panelSchema>;
