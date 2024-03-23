export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="relative h-auto w-52 md:h-[286px] sm:h-56 md:w-[286px] sm:w-56">
        <div className="absolute top-0 left-0 h-full w-full animate-spin border-8 border-primary-300 md:border-[19px] sm:border-[10px]" />
        <div className="absolute top-0 left-0 h-full w-full animate-spin-reverse border-8 border-secondary-300 md:border-[19px] sm:border-[10px]" />
      </div>
    </main>
  );
}
