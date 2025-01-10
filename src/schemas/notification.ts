import { z } from "zod";

export const notificationEndpointSchema = z.object({
  links: z.any(),
  notificationEndpoints: z.array(
    z.object({
      // createdAt: z.string().datetime(),
      description: z.string(),
      id: z.string(),
      // labels: z.array(
      //   z.object({
      //     id: z.string(),
      //     name: z.string(),
      //     orgID: z.string(),
      //     properties: z.object({
      //       color: z.string(),
      //       description: z.string(),
      //     }),
      //   })
      // ),
      // links: z.object({
      //   labels: z.string(),
      //   members: z.string(),
      //   owners: z.string(),
      //   self: z.string(),
      // }),
      name: z.string(),
      // orgID: z.string(),
      // status: z.string(),
      // type: z.string(),
      // updatedAt: z.string().datetime(),
      // userID: z.string(),
      // token: z.string(),
      url: z.string(),
    })
  ),
});

export type NotificationEndpointApi = z.infer<typeof notificationEndpointSchema>;
