import { z } from "zod";
import { MEAL_TYPES } from "@/constants/mealTypes.ts";

export const editLoggedFoodSchema = z.object({
  amount: z.coerce
    .number({ error: "Enter an amount" })
    .positive("Amount must be greater than 0"),
  mealType: z.enum(MEAL_TYPES),
  loggedDate: z.string().min(1, "Select a date"),
});

export type EditLoggedFoodFormInput = z.input<typeof editLoggedFoodSchema>;
export type EditLoggedFoodFormValues = z.output<typeof editLoggedFoodSchema>;
