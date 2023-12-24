"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { tv } from "tailwind-variants";

import { useDebouncedCallback } from "~/hooks/debounce";

const styles = tv({
  slots: {
    container: [
      "relative flex items-center space-x-4 px-4 py-2 mb-8",
      "border-4 rounded-xl stroke-gray-400",
      "transition-colors duration-200",
      "hover:border-primary-500 hover:stroke-primary-500",
    ],
    icon: "w-7 h-auto duration-100",
    input: "w-full h-10 outline-none font-bold capitalize text-lg",
  },
  variants: {
    hasSearch: {
      true: {
        container: "stroke-gray-700",
      },
    },
  },
});

const s = styles();

export function GiftFilter() {
  const params = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const search = useDebouncedCallback(() => formRef.current?.submit(), 800);

  return (
    <form ref={formRef} method="GET">
      <div className={s.container({ hasSearch: params.has("search") })}>
        <MagnifyingGlassIcon className={s.icon()} />
        <input
          name="search"
          placeholder="Buscar..."
          className={s.input()}
          onChange={search}
          defaultValue={params.get("search")?.toString()}
        />
      </div>
    </form>
  );
}
