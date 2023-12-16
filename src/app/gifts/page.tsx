import { getGifts } from "./get-gifts";

export default async function GiftsPage() {
  const gifts = await getGifts({ page: 1, limit: 10 });

  return (
    <main className="p-8 flex flex-col overflow-hidden">
      {gifts.items.map((g) => (
        <div key={g.slug}>
          <p>{g.name}</p>
          <p>{g.priceInCents}</p>
          <p>{g.slug}</p>

          {g.images.map((i) => (
            <img alt={i.fields.title} src={i.fields.file.url} />
          ))}
        </div>
      ))}
    </main>
  );
}
