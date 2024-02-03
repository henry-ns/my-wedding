export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="relative h-auto w-52 sm:h-56 sm:w-56 md:h-[286px] md:w-[286px]">
        <div className="absolute top-0 left-0 animate-spin border-8 border-primary-300 sm:border-[10px] md:border-[19px] h-full w-full" />
        <div className="absolute top-0 left-0 animate-spin-reverse border-8 border-secondary-300 sm:border-[10px] md:border-[19px] h-full w-full" />
      </div>
    </main>
  );
}
