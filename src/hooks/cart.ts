"use client";

import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Gift } from "~/types/gift";

type PreferenceAtom = {
  state: "loaded" | "outdated" | "loading" | "error";
  preferenceId?: string;
};

const cartItemsAtom = atomWithStorage<Gift[]>("jh-cart-items", []);

const preferenceIdAtom = atomWithStorage<PreferenceAtom>("jh-cart-preference", {
  state: "loading",
});

const totalCartItemsAtom = atom((get) => {
  return get(cartItemsAtom).length;
});

const addToCartAtom = atom(null, (get, set, payload: Gift) => {
  if (get(cartItemsAtom).some((i) => i.slug === payload.slug)) {
    return;
  }

  set(cartItemsAtom, (card) => [payload, ...card]);
  set(preferenceIdAtom, { state: "outdated" });
});

const removeFromCartAtom = atom(null, (_, set, slug: string) => {
  set(cartItemsAtom, (card) => card.filter((i) => i.slug !== slug));
  set(preferenceIdAtom, { state: "outdated" });
});

const cleanCartAtom = atom(null, (_, set) => {
  set(cartItemsAtom, []);
  set(preferenceIdAtom, { state: "outdated" });
});

export function useCart() {
  const items = useAtomValue(cartItemsAtom);
  const totalPrice = items.reduce((acc, i) => acc + i.priceInCents, 0);
  const remove = useSetAtom(removeFromCartAtom);
  const clean = useSetAtom(cleanCartAtom);

  return {
    items,
    totalPrice,
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

export function usePreferenceId() {
  return useAtom(preferenceIdAtom);
}
