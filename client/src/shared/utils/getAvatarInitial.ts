export const getAvatarInitial = (name: string): string => {
  const words = name.trim().split(/\s+/);

  if (!words.length || !words[0]) {
    return "";
  }

  if (words[0].toLowerCase() === "md" && words[1]) {
    return words[1].charAt(0).toUpperCase();
  }

  return words[0].charAt(0).toUpperCase();
};
