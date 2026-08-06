import { useEffect, useRef } from "react";
import Typed from "typed.js";

interface Props {
  texts: string[];
  prefix?: string;
  className?: string;
  textClassName?: string;
  typeSpeed?: number;
  backSpeed?: number;
  backDelay?: number;
  smartBackspace?: boolean;
  showCursor?: boolean;
  loop?: boolean;
}

export const TypingText = ({
  texts,
  prefix,
  className,
  textClassName,
  typeSpeed = 100,
  backSpeed = 70,
  backDelay = 1000,
  smartBackspace = false,
  showCursor= true,
  loop = true,
}: Props) => {
  const typingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!typingRef.current) return;

    const typed = new Typed(typingRef.current, {
      strings: texts,
      typeSpeed,
      backSpeed,
      backDelay,
      smartBackspace,
      loop,
      showCursor: true,
    });

    return () => typed.destroy();
  }, [
    texts,
    typeSpeed,
    backSpeed,
    backDelay,
    smartBackspace,
    showCursor,
    loop,
  ]);

  return (
    <div className={className}>
      {prefix && <span>{prefix} </span>}

      <span ref={typingRef} className={textClassName} />
    </div>
  );
};
