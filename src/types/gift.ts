export type Gift = {
  slug: string;
  name: string;
  priceInCents: number;
  available: boolean;
  amount: number;
  images: Array<{
    fields: {
      title: string;
      file: {
        url: string;
      };
    };
  }>;
};

export type CartItem = Gift & {
  selectedAmount: number;
};
