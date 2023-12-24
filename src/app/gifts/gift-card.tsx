import { CheckIcon } from "@radix-ui/react-icons";

import { Gift } from "~/types/gift";
import { Button } from "~/ui/button";
import { formatCentsToCurrency } from "~/utils/format-currency";

type Props = {
  gift: Gift;
  onSelect: (g: Gift) => void;
};

export function GiftCard({ gift, onSelect }: Props) {
  const [image] = gift.images;

  return (
    <button
      type="button"
      key={gift.slug}
      className="grow flex-1 group border-4 p-4 rounded-xl min-w-[220px] max-w-lg border-gray-200 w-full hover:border-primary-500 transition-all"
      onClick={() => onSelect(gift)}
    >
      <img
        alt={image?.fields.title}
        src={image?.fields.file.url}
        className="w-full h-32 object-cover rounded-lg mb-4 transition-all group-hover:-translate-y-6 group-hover:scale-y-[130%]"
      />

      <span className="text-lg block">{gift.name}</span>
      <div className="flex w-full items-center justify-between">
        <span className="font-bold text-2xl text-primary-500">
          {formatCentsToCurrency(gift.priceInCents)}
        </span>
        <Button className="bg-primary-500 text-white rounded-lg w-10 p-0">
          <CheckIcon className="stroke-white w-8 h-8 p-1.5" />
        </Button>
      </div>
    </button>
  );
}
