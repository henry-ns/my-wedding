import { GuestInfo } from "./guest-info";
import { HomeSection } from "./landing-page/home";
import { LocationSection } from "./landing-page/location";
import { TimerSection } from "./landing-page/timer";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-bg text-gray-900">
      <GuestInfo />
      <div className="absolute right-0 top-0 z-10 min-h-screen w-5 bg-primary-400/50 sm:w-10 md:w-20" />
      <HomeSection />
      <TimerSection />
      <LocationSection />
    </main>
  );
}
