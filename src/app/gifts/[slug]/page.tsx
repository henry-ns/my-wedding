import { getGiftBySlug } from "../get-gift-by-slug";

type Props = {
  params: {
    slug: string;
  };
};

export default async function GiftsPage({ params }: Props) {
  const gift = await getGiftBySlug(params.slug);

  console.log({ gift });

  if (!gift) {
    return <main>NOT FOUND</main>;
  }

  return (
    <main className="p-8 flex flex-col overflow-hidden">
      <div key={gift.slug}>
        <p>{gift.name}</p>
        <p>{gift.priceInCents}</p>
        <p>{gift.slug}</p>

        {gift.images.map((i) => (
          <img alt={i.fields.title} src={i.fields.file.url} />
        ))}
      </div>
    </main>
  );
}
