import crypto from "crypto";

export const generateSlug = (text: string): string => {
  const baseSlug = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")   // remove special chars
    .replace(/\s+/g, "-")           // spaces → hyphen
    .replace(/-+/g, "-")            // multiple hyphen → single
    .replace(/^-+|-+$/g, "");       // trim hyphens

  const random = crypto.randomBytes(3).toString("hex"); // 6 char unique suffix

  return `${baseSlug}-${random}`;
};