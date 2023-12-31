export type Gift = {
  slug: string;
  name: string;
  priceInCents: number;
  available: boolean;
  images: Array<{
    fields: {
      title: string;
      file: {
        url: string;
      };
    };
  }>;
};
