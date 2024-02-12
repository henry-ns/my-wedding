"use client";

import { ChevronDownIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { tv } from "tailwind-variants";
import { useDebouncedCallback } from "~/hooks/debounce";

const styles = tv({
  slots: {
    container: [
      "relative flex items-center space-x-4 px-4 py-1 h-14",
      "border-4 rounded-xl stroke-gray-400",
      "transition-colors duration-200",
      "hover:border-primary-500 hover:stroke-primary-500",
    ],
    icon: "w-7 h-auto duration-100",
    input: "w-full h-10 outline-none font-bold capitalize text-lg",
  },
  variants: {
    full: {
      true: {
        container: "flex-1",
      },
    },
    hasSearch: {
      true: {
        container: "stroke-gray-700",
      },
    },
  },
});

const s = styles();

const orderOptions = [
  {
    label: "Nome",
    value: "name",
  },
  { label: "Preço crescente", value: "price-asc" },
  { label: "Preço decrescente", value: "price-desc" },
  { label: "Quantidade crescente", value: "quantity-asc" },
  { label: "Quantidade decrescente", value: "quantity-desc" },
];

export function GiftFilter() {
  const params = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const search = useDebouncedCallback(() => formRef.current?.submit(), 500);

  const searchParam = params.get("search")?.toString();
  const [order, setOrder] = useState(params.get("order")?.toString());

  function selectOrder(value: string) {
    setOrder(value);
    formRef.current?.submit();
  }

  return (
    <form
      ref={formRef}
      method="GET"
      className="flex gap-4 flex-col mb-8 md:flex-row"
    >
      <div className={s.container({ full: true, hasSearch: !!searchParam })}>
        <MagnifyingGlassIcon className={s.icon()} />
        <input
          name="search"
          placeholder="Buscar..."
          className={s.input()}
          onChange={search}
          defaultValue={searchParam}
        />
      </div>

      <Select.Root name="order" value={order} onValueChange={selectOrder}>
        <Select.Trigger
          aria-label="ordem"
          className={s.container({
            className:
              "font-bold data-[placeholder]:text-gray-400 outline-none flex justify-between",
          })}
        >
          <Select.Value placeholder="Ordem" className="select-none" />
          <Select.Icon>
            <ChevronDownIcon className="h-6 w-fit" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            sideOffset={4}
            position="popper"
            className="bg-white shadow border-4 p-2 rounded-lg overflow-hidden"
          >
            <Select.Viewport className="space-y-1">
              {orderOptions.map((i) => (
                <Select.Item
                  key={i.value}
                  value={i.value}
                  className="cursor-pointer py-2 px-3 rounded-md data-[state=checked]:bg-primary-500 data-[state=checked]:text-white hover:bg-gray-200 transition-colors outline-none"
                >
                  <Select.ItemText className="font-bold text-gray-700">
                    {i.label}
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </form>
  );
}
