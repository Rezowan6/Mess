import { useMediaQuery } from "./useMediaQuery";

// Matches Tailwind's default `md` breakpoint (768px)
export const useIsMobile = (): boolean => useMediaQuery("(max-width: 767px)");
