import { z } from "zod";

export const addToLogSchema = z.object({
  amount: z.coerce
    .number({ error: "Enter an amount" })
    .positive("Amount must be greater than 0"),
});

export type AddToLogFormInput = z.input<typeof addToLogSchema>;
export type AddToLogFormValues = z.output<typeof addToLogSchema>;
