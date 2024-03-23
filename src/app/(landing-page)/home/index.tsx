import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { Suspense } from "react";
import { env } from "~/env";
import { capitalizeString } from "~/utils/capitalize-string";
import { HomeActions } from "./home-actions";

const weddingDate = capitalizeString(
  format(env.NEXT_PUBLIC_WEDDING_DATE, "eeee',' dd 'de' LLLL", {
    locale: ptBR,
  }),
).replace("De", "de");

export function HomeSection() {
  return (
    <section
      id="home"
      className="relative z-20 flex min-h-screen flex-col items-center justify-center overflow-hidden text-center"
    >
      <h3 className="relative z-20 text-2xl text-primary-600 md:text-3xl">
        {weddingDate}
      </h3>

      <div className="a animate-spin border-8 border-primary-300 md:border-[19px] sm:border-[10px]">
        <Image
          alt="O Casal"
          src="/photo.jpg"
          width="286"
          height="286"
          className="-rotate-45 h-auto w-52 animate-spin-reverse rounded-full md:h-[286px] sm:h-56 md:w-[286px] sm:w-56"
          priority
        />
      </div>

      <div className="-ml-2 mb-2 border-b-4 border-b-secondary-300 px-2 md:mb-4 md:px-4">
        <h1 className="relative font-bold font-especial text-3xl text-gray-800 tracking-widest md:text-5xl sm:text-4xl">
          Henrique & Jennifer
        </h1>
      </div>

      <h2 className="relative text-secondary-500 text-xl uppercase tracking-[0.25rem] md:text-2xl">
        Vão Casar!
      </h2>

      <Suspense>
        <HomeActions />
      </Suspense>
    </section>
  );
}
