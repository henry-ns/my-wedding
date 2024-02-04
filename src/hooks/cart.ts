"use client";

import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { CartItem, Gift } from "~/types/gift";

const cartItemsAtom = atomWithStorage<CartItem[]>("jh-cart-items", []);

const totalCartItemsAtom = atom((get) => {
  return get(cartItemsAtom).reduce((acc, i) => acc + i.selectedAmount, 0);
});

const addToCartAtom = atom(null, (get, set, payload: Gift) => {
  if (get(cartItemsAtom).some((i) => i.slug === payload.slug)) {
    return;
  }

  set(cartItemsAtom, (card) => [
    {
      ...payload,
      selectedAmount: 1,
    },
    ...card,
  ]);
});

type UpdateQuantity = {
  slug: string;
  quantity: number;
};

const updateQuantityAtom = atom(null, (_, set, payload: UpdateQuantity) => {
  set(cartItemsAtom, (card) =>
    card.map((i) => {
      if (i.slug !== payload.slug) {
        return i;
      }

      return {
        ...i,
        selectedAmount: Math.max(1, Math.min(payload.quantity, i.amount)),
      };
    }),
  );
});

const removeFromCartAtom = atom(null, (_, set, slug: string) => {
  set(cartItemsAtom, (card) => card.filter((i) => i.slug !== slug));
});

const cleanCartAtom = atom(null, (_, set) => {
  set(cartItemsAtom, []);
});

export function useCart() {
  const items = useAtomValue(cartItemsAtom);
  const totalPrice = items.reduce(
    (acc, i) => acc + i.priceInCents * i.selectedAmount,
    0,
  );
  const remove = useSetAtom(removeFromCartAtom);
  const clean = useSetAtom(cleanCartAtom);
  const updateQuantity = useSetAtom(updateQuantityAtom);

  return {
    items,
    totalPrice,
    updateQuantity,
    remove,
    clean,
  };
}

export function useTotalCartItems() {
  return useAtomValue(totalCartItemsAtom);
}

export function useCartItem(gift: Gift) {
  const items = useAtomValue(cartItemsAtom);
  const add = useSetAtom(addToCartAtom);
  const remove = useSetAtom(removeFromCartAtom);

  const isOnCard = items.some((i) => i.slug === gift.slug);

  function toggle() {
    if (isOnCard) {
      return remove(gift.slug);
    }

    add(gift);
  }

  return {
    toggle,
    isOnCard,
  };
}
