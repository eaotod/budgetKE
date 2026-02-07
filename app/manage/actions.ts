"use server";

import { assertAdmin } from "@/lib/auth/admin";

/** Reserved for future manage actions (e.g. order status, review moderation). */
export async function _assertAdmin() {
  return assertAdmin();
}
