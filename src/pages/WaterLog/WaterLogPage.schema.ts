import { z } from "zod";

export const logWaterSchema = z.object({
  amountMl: z.coerce
    .number({ error: "Enter an amount" })
    .positive("Amount must be greater than 0"),
});

export type LogWaterFormInput = z.input<typeof logWaterSchema>;
export type LogWaterFormValues = z.output<typeof logWaterSchema>;
