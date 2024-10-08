import { z } from "zod";

const myObjectSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  role: z.string().min(1),
  children: z.boolean(),
  countChildren: z.number(),
  mobile: z.any(),
  number: z.any(),
  movie: myObjectSchema
}).superRefine((values, context) => {
    if (
      values.children === true && values.countChildren <= 0
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify correct number of kids",
        path: ["countChildren"],
      });
    } 
  });

export type LoginFormData = {
  email: string;
  password: string;
  role: string;
  children: boolean;
  countChildren: number;
  movie: string;
};
