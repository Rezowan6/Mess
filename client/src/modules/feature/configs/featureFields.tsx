import { FileText, Link, Tag } from "lucide-react";
import type { ReactNode } from "react";

interface FeatureField {
  name: "name" | "slug" | "description";
  label: string;
  type: "text";
  placeholder: string;
  leftIcon: ReactNode;
}

export const featureFields: FeatureField[] = [
  {
    name: "name",
    label: "Feature Name",
    type: "text",
    placeholder: "Enter feature name",
    leftIcon: <Tag size={16} />,
  },
  {
    name: "slug",
    label: "Slug",
    type: "text",
    placeholder: "Enter feature slug",
    leftIcon: <Link size={16} />,
  },
  {
    name: "description",
    label: "Description",
    type: "text",
    placeholder: "Enter feature description",
    leftIcon: <FileText size={16} />,
  },
];
