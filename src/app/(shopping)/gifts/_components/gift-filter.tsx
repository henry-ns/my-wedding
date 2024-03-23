"use client";

import { ChevronDownIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import { usePathname, useSearchParams } from "next/navigation";
import type { ChangeEvent } from "react";
import { tv } from "tailwind-variants";
import { useDebouncedCallback } from "~/hooks/debounce";
import { useNavigation } from "~/hooks/navigation";

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
  const pathname = usePathname();
  const { navigate } = useNavigation();

  const searchParam = params.get("search")?.toString();
  const order = params.get("order")?.toString();

  const search = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const query = new URLSearchParams(params);
      query.set("page", "1");

      if (value) {
        query.set("search", value);
      } else {
        query.delete("search");
      }

      navigate.push(`${pathname}?${query.toString()}`);
    },
    400,
  );

  function selectOrder(value: string) {
    const query = new URLSearchParams(params);
    query.set("page", "1");
    query.set("order", value);
    navigate.push(`${pathname}?${query.toString()}`);
  }

  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row">
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

      <Select.Root
        name="order"
        defaultValue={order}
        onValueChange={selectOrder}
      >
        <Select.Trigger
          aria-label="ordem"
          className={s.container({
            className:
              "flex justify-between font-bold outline-none data-[placeholder]:text-gray-400",
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
            className="overflow-hidden rounded-lg border-4 bg-white p-2 shadow"
          >
            <Select.Viewport className="space-y-1">
              {orderOptions.map((i) => (
                <Select.Item
                  key={i.value}
                  value={i.value}
                  className="cursor-pointer rounded-md px-3 py-2 outline-none transition-colors data-[state=checked]:bg-primary-500 hover:bg-gray-200 data-[state=checked]:text-white"
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
    </div>
  );
}
