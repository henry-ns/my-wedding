import dynamic from "next/dynamic";
import { Suspense } from "react";
import { LocationSection } from "./components/location";
import { TimerSection } from "./components/timer";
import { HomeSection } from "./home";

const GuestInfo = dynamic(
  () => import("../guest-info").then((mod) => mod.GuestInfo),
  {
    loading: () => (
      <div className="fixed right-2 top-2 w-14 h-14 rounded-full animate-pulse bg-gray-300" />
    ),
  },
);

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-bg text-gray-900">
      <GuestInfo className="fixed right-2 top-2" />

      <div className="absolute right-0 top-0 z-10 min-h-screen w-5 bg-primary-400/50 sm:w-10 md:w-20" />

      <HomeSection />
      <Suspense>
        <TimerSection />
      </Suspense>
      <Suspense>
        <LocationSection />
      </Suspense>
    </main>
  );
}
