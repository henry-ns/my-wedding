import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { env } from "~/env";
import { capitalizeString } from "../../utils/capitalize-string";

const weddingDate = capitalizeString(
  format(env.NEXT_PUBLIC_WEDDING_DATE, "eeee',' dd 'de' LLLL", {
    locale: ptBR,
  }),
).replace("De", "de");

export function HomeSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center text-center">
      <h3 className="text-primary-600 relative z-10 text-3xl">{weddingDate}</h3>

      <div className="border-primary-300 rotate-45 border-[19px]">
        <Image
          alt="O Casal"
          src="/photo.png"
          width="286"
          height="286"
          className="-rotate-45"
        />
      </div>

      <div className="border-b-secondary-300 -ml-2 mb-4 border-b-4 px-4">
        <h1 className="relative text-5xl font-bold tracking-widest text-gray-800">
          Henrique & Jennifer
        </h1>
      </div>

      <h2 className="text-secondary-500 relative text-2xl uppercase tracking-[0.25rem]">
        Vão se Casar!
      </h2>
    </section>
  );
}
