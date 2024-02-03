"use client";

import type {
  HTMLAttributes,
  HTMLInputTypeAttribute,
  KeyboardEvent,
  Ref,
} from "react";
import { forwardRef } from "react";

import { tv } from "tailwind-variants";
import type { FieldContainerProps } from "./field-container";
import { FieldContainer } from "./field-container";
import type { InputMasks } from "./input-masks";
import { inputMasks } from "./input-masks";

type Props = Omit<FieldContainerProps, "children"> & {
  name: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  mask?: InputMasks;
  inputProps?: HTMLAttributes<HTMLInputElement>;
};

const styles = tv({
  base: `
    px-4 h-12 rounded-md w-full text-gray-900 border-2 transition-colors
    bg-gray-50 placeholder:text-gray-500 outline-primary-500
    hover:border-primary-300
    active:border-primary-500 
  `,
  variants: {
    withError: {
      true: "border-red-500 hover:border-red-300",
    },
  },
});

function BaseInput(
  {
    name,
    placeholder,
    mask,
    type = "text",
    inputProps,
    error,
    defaultValue,
    ...rest
  }: Props,
  ref: Ref<HTMLInputElement>,
) {
  function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
    if (!mask) return;

    const formatter = inputMasks[mask];
    formatter?.(event);
    inputProps?.onKeyUp?.(event);
  }

  return (
    <FieldContainer error={error} {...rest}>
      <input
        ref={ref}
        name={name}
        type={type}
        placeholder={placeholder}
        className={styles({
          withError: !!error,
          className: inputProps?.className,
        })}
        defaultValue={defaultValue}
        {...inputProps}
        onKeyUp={handleKeyUp}
      />
    </FieldContainer>
  );
}

export const Input = forwardRef(BaseInput);
