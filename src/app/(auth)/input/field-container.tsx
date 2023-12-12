import type { HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

export type FieldContainerProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
  isRequired?: boolean;
  error?: string;
  children: React.ReactNode;
};

const styles = tv({
  base: "flex flex-col space-y-1 w-full",
});

export function FieldContainer({
  label,
  error,
  children,
  isRequired,
  className,
  ...rest
}: FieldContainerProps) {
  return (
    <div className={styles({ className })} {...rest}>
      {label && (
        <span className="ml-3 text-md text-gray-800">
          {label}
          {isRequired && <strong className="text-red-600 ml-1">*</strong>}
        </span>
      )}

      {children}

      {error && <span className="ml-3 text-dangerous-500">{error}</span>}
    </div>
  );
}
