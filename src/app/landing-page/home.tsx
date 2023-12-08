import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";

import { env } from "~/env";
import { capitalizeString } from "~/utils/capitalize-string";

import Link from "next/link";
import { Button } from "./button";

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

      <div className="a animate-spin border-8 border-primary-300 sm:border-[10px] md:border-[19px]">
        <Image
          alt="O Casal"
          src="/photo.png"
          width="286"
          height="286"
          className="h-52 w-52 -rotate-45 animate-spin-reverse sm:h-56 sm:w-56 md:h-[286px] md:w-[286px]"
        />
      </div>

      <div className="-ml-2 mb-2 border-b-4 border-b-secondary-300 px-2 md:mb-4 md:px-4">
        <h1 className="relative text-3xl font-bold tracking-widest text-gray-800 sm:text-4xl md:text-5xl">
          Henrique & Jennifer
        </h1>
      </div>

      <h2 className="relative text-xl uppercase tracking-[0.25rem] text-secondary-500 md:text-2xl">
        Vão Casar!
      </h2>

      <div className="mt-10 flex flex-col items-center justify-center space-y-6 md:flex-row md:space-x-8 md:space-y-0">
        <Link href="sign-in">
          <Button color="primary">Confirmar Presença</Button>
        </Link>
        <Button color="secondary">Lista de Presentes</Button>
      </div>
    </section>
  );
}
