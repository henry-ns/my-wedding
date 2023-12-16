export type Gift = {
  slug: string;
  name: string;
  priceInCents: number;
  buyerId?: string;
  images: Array<{
    fields: {
      title: string;
      file: {
        url: string;
      };
    };
  }>;
};
