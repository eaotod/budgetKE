import IntaSend from "intasend-node";

const isProduction = process.env.NODE_ENV === "production";

export const intasend = new IntaSend(
  process.env.INTASEND_PUBLISHABLE_KEY!,
  process.env.INTASEND_SECRET_KEY!,
  isProduction // true for production, false for test
);
