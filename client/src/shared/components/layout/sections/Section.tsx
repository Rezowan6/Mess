import clsx from "clsx";
import type { ReactNode } from "react";

interface Props {
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;

  id?: string;

  className?: string;
  containerClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
}

export const Section = ({
  title,
  description,
  children,
  id,
  className,
  containerClassName,
  contentClassName,
  headerClassName,
}: Props) => {
  return (
    <section id={id} className={clsx("px-6 py-20 scroll-mt-20", className)}>
      <div className={clsx("container mx-auto", containerClassName)}>
        {(title || description) && (
          <div
            className={clsx(
              "mx-auto mb-12 max-w-2xl text-center",
              headerClassName,
            )}
          >
            {title && (
              <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
            )}

            {description && (
              <p className="mt-4 text-base-content/70">{description}</p>
            )}
          </div>
        )}

        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  );
};
