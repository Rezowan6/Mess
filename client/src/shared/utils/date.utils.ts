export const getLocalDate = () => {
  return new Date().toLocaleDateString("en-CA");
};

export const getCurrentlDate = () => {
  return new Date().toISOString().split("T")[0] as string;
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
