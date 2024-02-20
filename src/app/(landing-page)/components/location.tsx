import { Button } from "~/components/ui/button";
import { env } from "~/env";
import { LocationShape } from "./location-shape";

export function LocationSection() {
  return (
    <section
      id="location"
      className="relative z-10 overflow-hidden px-10 lg:overflow-visible lg:px-32"
    >
      <div className="mx-auto flex max-w-5xl flex-col space-y-10 md:space-y-20 xl:flex-row xl:items-center xl:space-x-20 xl:space-y-0">
        <div className="z-20 mt-6 flex flex-1 flex-col items-start text-start">
          <div className="relative">
            <h3 className="relative z-20 mb-2 text-3xl font-bold md:mb-4">
              Cerimônia Religiosa
            </h3>
            <div className="absolute -left-4 -top-3 z-10 h-14 w-14 rotate-45 animate-spin bg-gray-300/30" />
          </div>
          <p>
            O matrimônio é o sacramento no qual recebemos a graça de Deus, sendo
            o ponto mais importante desse dia, contamos com sua presença nessa
            celebração que será realizada as <strong>16h</strong> na{" "}
            <strong>{env.NEXT_PUBLIC_CEREMONY_ADDRESS}</strong>
          </p>
          <p className="mt-2">
            Após a cerimônia, vamos nos reunir e confraternizar{" "}
            <strong className="font-bold">
              {env.NEXT_PUBLIC_PARTY_ADDRESS}
            </strong>
          </p>
        </div>

        <div className="relative flex-1 flex flex-col sm:mr-10 md:mr-0">
          <iframe
            title="Mapa do local"
            src={env.NEXT_PUBLIC_GOOGLE_MAP_EMBED_URL}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="relative z-20 h-[300px] w-full border-8 border-secondary-500"
          />

          <a
            target="_blank"
            rel="noopener noreferrer"
            href={env.NEXT_PUBLIC_GOOGLE_MAP_URL}
            className="mt-4 ml-auto z-10"
          >
            <Button variant="secondary">Ver Mapa</Button>
          </a>

          <div
            className={`
              absolute left-[5%] top-[10%] z-0 h-full w-full bg-primary-500/50 
              lg:-right-[8%] lg:left-auto lg:top-1/2 lg:h-[125%] lg:w-[40%] lg:-translate-y-1/2 
            `}
          />
        </div>
      </div>

      <div className="lg:20 h-36 md:h-48" />
      <LocationShape className="absolute bottom-0 left-0 z-10 max-h-96" />
    </section>
  );
}
