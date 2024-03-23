import dynamic from "next/dynamic";
import { Suspense } from "react";
import { LocationSection } from "./components/location";
import { TimerSection } from "./components/timer";
import { HomeSection } from "./home";

const GuestInfo = dynamic(
  () => import("../guest-info").then((mod) => mod.GuestInfo),
  {
    loading: () => (
      <div className="fixed top-2 right-2 h-14 w-14 animate-pulse rounded-full bg-gray-300" />
    ),
  },
);

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-bg text-gray-900">
      <GuestInfo className="fixed top-2 right-2" />

      <div className="absolute top-0 right-0 z-10 min-h-screen w-5 bg-primary-400/50 md:w-20 sm:w-10" />

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
