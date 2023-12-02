import { env } from "../../env";
import { LocationShape } from "./location-shape";

export function LocationSection() {
  return (
    <section
      id="location"
      className="relative z-10 overflow-hidden px-10 lg:overflow-visible lg:px-32"
    >
      <div className="flex flex-col space-y-10 xl:flex-row">
        <div className="z-20 mt-6 flex flex-1 flex-col items-start text-start">
          <div className="relative">
            <h3 className="relative z-20 mb-2 text-3xl font-bold md:mb-4">
              Cerimônia religiosa
            </h3>
            <div className="absolute -left-4 -top-2.5 z-10 h-14 w-14 rotate-45 animate-spin bg-gray-300/30" />
          </div>
          <p>
            O matrimônio é o sacramento no qual recebemos a graça de Deus, sendo
            o ponto mais importante desse dia, contamos com sua presença nessa
            celebração que será realizada na{" "}
            <strong className="font-bold">
              Paróquia Sagrada Família Rua Otávio Batista Cabral, Rocha
              Cavalcante
            </strong>
            .
          </p>
          <p className="mt-2">
            Após a cerimônia, vamos nos reunir e confraternizar{" "}
            <strong className="font-bold">TODO</strong>.
          </p>
        </div>

        <div className="relative flex-1">
          <iframe
            src={env.NEXT_PUBLIC_GOOGLE_MAP_EMBED_URL}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="relative z-20 h-[300px] w-full border-8 border-secondary-500"
          />

          <div
            className={`
              absolute left-[10%] top-[10%] z-0 h-full w-full bg-primary-500/50 
              lg:-right-[5%] lg:left-auto lg:top-1/2 lg:h-[125%] lg:w-[40%] lg:-translate-y-1/2 
            `}
          />
        </div>
      </div>

      <div className="lg:20 h-36 md:h-48" />
      <LocationShape className="absolute bottom-0 left-0 z-10" />
    </section>
  );
}
