"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const customRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  productType: z.enum(["template", "advanced_solution"]),
  projectType: z.string().min(1),
  description: z.string().min(20),
  budget: z.string().min(1),
});

export async function submitCustomRequest(
  data: z.infer<typeof customRequestSchema>,
) {
  const validated = customRequestSchema.parse(data);

  const supabase = createAdminClient();

  const { error } = await supabase.from("contact_messages").insert({
    name: validated.name,
    email: validated.email,
    phone: validated.phone,
    subject: `Custom ${validated.productType} Request: ${validated.projectType}`,
    message: `Product Type: ${validated.productType}\nProject Type: ${validated.projectType}\nBudget: ${validated.budget}\n\nDescription:\n${validated.description}`,
    is_read: false,
    is_resolved: false,
  });

  if (error) {
    throw new Error("Failed to submit request. Please try again.");
  }

  revalidatePath("/custom-template");
}
