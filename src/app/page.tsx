import { HomeSection } from "./landing-page/home";
import { TimerSection } from "./landing-page/timer";

export default function LandingPage() {
  return (
    <main className="bg-bg min-h-screen text-gray-900">
      <TimerSection />
      <HomeSection />
    </main>
  );
}
