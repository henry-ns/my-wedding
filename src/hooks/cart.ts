"use client";

import { atom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Gift } from "~/types/gift";

const STORAGE_KEY = "jh-cart";

const cartItemsAtom = atomWithStorage<Gift[]>(STORAGE_KEY, []);

const totalCartItemsAtom = atom((get) => {
  return get(cartItemsAtom).length;
});

const addToCartAtom = atom(null, (get, set, payload: Gift) => {
  if (get(cartItemsAtom).some((i) => i.slug === payload.slug)) {
    return;
  }

  set(cartItemsAtom, (card) => [payload, ...card]);
});

const removeFromCartAtom = atom(null, (_, set, slug: string) => {
  set(cartItemsAtom, (card) => card.filter((i) => i.slug !== slug));
});

export function useCart() {
  const items = useAtomValue(cartItemsAtom);
  const totalPrice = items.reduce((acc, i) => acc + i.priceInCents, 0);
  const remove = useSetAtom(removeFromCartAtom);

  return {
    items,
    totalPrice,
    remove,
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
      remove(gift.slug);
    } else {
      add(gift);
    }
  }

  return {
    toggle,
    isOnCard,
  };
}
