import { LocationShape } from "./location-shape";

export function LocationSection() {
  return (
    <section id="location" className="relative z-10 px-32">
      <div className="z-10 mb-32 flex items-center justify-center space-x-20 text-center">
        <div className=" flex flex-1 flex-col items-start text-start">
          <div className="relative">
            <h3 className="relative z-20 mb-4 text-3xl font-bold">
              Onde vai ser?
            </h3>
            <div className="absolute left-0 top-0 z-10 h-14 w-14 -translate-x-4 -translate-y-3 rotate-45 bg-gray-300/30" />
          </div>
          <p>
            Descrição do local junto com o endereço da igreja e festa. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. In in massa nisi.
            Vestibulum tempor neque non est feugiat imperdiet. Vivamus lorem
            sem, ultrices non nisi quis, bibendum iaculis tortor.
          </p>
        </div>

        <div className="relative flex-1">
          <div className="relative z-10 h-52 border-8 border-secondary-500 bg-gray-300" />
          <div className="absolute right-0 top-1/2 z-0 h-[150%] w-40 -translate-y-1/2 translate-x-1/2 bg-primary-500/50" />
        </div>
      </div>

      <div className="h-20" />

      <LocationShape className="absolute bottom-0 left-0" />
    </section>
  );
}
