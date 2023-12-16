import { HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { GuestInfo } from "../guest-info";

export function Header() {
  return (
    <header className="w-full sticky top-0 left-0">
      <div className="w-full bg-primary-400 flex items-center justify-between py-3 px-6">
        <Link
          href="/"
          className="-ml-2 hover:bg-gray-200/30 p-1 transition-all hover:scale-110 active:scale-95 rounded-md"
        >
          <HomeIcon className="w-auto h-12 text-white" />
        </Link>

        <GuestInfo />
      </div>

      <div className="h-2 bg-secondary-500 w-full mt-2 mb-10" />
    </header>
  );
}