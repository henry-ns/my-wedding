import type { KeyboardEvent } from "react";

import { capitalizeString } from "~/utils/capitalize-string";

function addCapitalizeMask(event: KeyboardEvent<HTMLInputElement>) {
  event.currentTarget.value = capitalizeString(event.currentTarget.value);
}

export type InputMasks = "Capitalize";

export const inputMasks: Record<
  InputMasks,
  (event: KeyboardEvent<HTMLInputElement>) => void
> = {
  Capitalize: addCapitalizeMask,
};
