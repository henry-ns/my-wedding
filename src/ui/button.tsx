import type { IconProps } from "@radix-ui/react-icons/dist/types";
import type { ButtonHTMLAttributes, Ref } from "react";
import { forwardRef } from "react";
import { VariantProps, tv } from "tailwind-variants";

import { Spinner } from "./spinner";

const styles = tv({
  base: [
    "px-4 h-10",
    "rounded-full",
    "text-md text-white",
    "transition-colors duration-300",
    "flex items-center justify-center space-x-2",
  ],
  variants: {
    variant: {
      outline: [
        "border-2 border-gray-300",
        "text-gray-800",
        "hover:border-primary-500 hover:text-primary-500",
        "active:border-primary-500 active:bg-primary-500 active:text-white",
      ],
      primary: [
        "bg-primary-500",
        "hover:bg-primary-600",
        "active:bg-primary-700",
      ],
      dangerous: [
        "bg-dangerous-500",
        "hover:bg-dangerous-600",
        "active:bg-dangerous-700",
      ],
      positive: [
        "bg-positive-500",
        "hover:bg-positive-600",
        "active:bg-positive-700",
      ],
    },
    fullWidth: {
      true: "w-full",
    },
    isDisabled: {
      true: [
        "bg-gray-400 cursor-not-allowed",
        "hover:bg-gray-400",
        "active:bg-gray-400",
      ],
    },
  },
  defaultVariants: {
    variant: "primary",
    fullWidth: false,
  },
});

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof styles> & {
    isLoading?: boolean;
    loadingText?: string;
    icon?: React.ForwardRefExoticComponent<
      IconProps & React.RefAttributes<SVGSVGElement>
    >;
  };

function BaseButton(
  {
    children,
    className,
    variant,
    fullWidth,
    isDisabled,
    isLoading,
    loadingText,
    icon: Icon,
    ...rest
  }: ButtonProps,
  ref: Ref<HTMLButtonElement>,
) {
  const childrenContent =
    typeof children === "string" ? <span>{children}</span> : children;

  const loadingContent = (
    <>
      <Spinner size="sm" color="gray" />
      {loadingText ? (
        <span className="text-gray-100">{loadingText}</span>
      ) : (
        childrenContent
      )}
    </>
  );

  return (
    <button
      type="button"
      ref={ref}
      className={styles({ variant, fullWidth, isDisabled, className })}
      {...rest}
    >
      {isLoading ? (
        loadingContent
      ) : (
        <>
          {Icon && <Icon className="h-4 w-4" />}
          {childrenContent}
        </>
      )}
    </button>
  );
}

export const Button = forwardRef(BaseButton);
