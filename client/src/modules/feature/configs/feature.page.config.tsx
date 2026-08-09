// src/modules/feature/configs/feature.page.config.tsx

import { BackButton } from "@/shared/components/ui/BackButton";
import { ROUTES } from "@/shared/constants/routes";
import { useRBAC } from "@/shared/hooks/useRBAC";

interface GetFeaturePageConfigProps {
  pathname: string;
  setIsOpen?: (value: boolean) => void;
}

export const getFeaturePageConfig = ({
  pathname,
  setIsOpen,
}: GetFeaturePageConfigProps) => {
  const { can } = useRBAC();

  const pageConfig = {
    [ROUTES.FEATURE]: {
      title: "Feature Management",
      description: "Manage application features and feature availability.",
      action: undefined,
      footer: undefined,
    },

    [`${ROUTES.FEATURE}/create`]: {
      title: "Add Feature",
      description: "Create a new application feature.",
      action: undefined,
      footer: <BackButton />,
    },

    [`${ROUTES.FEATURE}/:id`]: {
      title: "Feature Details",
      description: "View and manage feature details.",
      action: undefined,
      footer: <BackButton />,
    },
  };

  return (
    pageConfig[pathname as keyof typeof pageConfig] ??
    pageConfig[ROUTES.FEATURE]
  );
};
