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
    <section
      id="home"
      className="z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden text-center"
    >
      <h3 className="relative z-10 text-3xl text-primary-600">{weddingDate}</h3>

      <div className="a animate-spin border-[19px] border-primary-300">
        <Image
          alt="O Casal"
          src="/photo.png"
          width="286"
          height="286"
          className="-rotate-45 animate-spin-reverse"
        />
      </div>

      <div className="-ml-2 mb-4 border-b-4 border-b-secondary-300 px-4">
        <h1 className="relative text-5xl font-bold tracking-widest text-gray-800">
          Henrique & Jennifer
        </h1>
      </div>

      <h2 className="relative text-2xl uppercase tracking-[0.25rem] text-secondary-500">
        Vão se Casar!
      </h2>
    </section>
  );
}
