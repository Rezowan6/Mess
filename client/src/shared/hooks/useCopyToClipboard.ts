import { useCallback, useEffect, useRef, useState } from "react";

export const useCopyToClipboard = (resetDelay = 1500) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = useCallback(
    async (value: string | number): Promise<boolean> => {
      try {
        await navigator.clipboard.writeText(String(value));
        setCopied(true);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setCopied(false), resetDelay);

        return true;
      } catch {
        // Clipboard can be blocked (e.g. insecure context)
        return false;
      }
    },
    [resetDelay],
  );

  return { copied, copy };
};
