import { HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { CartButton } from "../../components/cart-button";
import { GuestInfo } from "../guest-info";

export function Header() {
  return (
    <header className="w-full sticky top-0 left-0">
      <div className="w-full bg-primary-400">
        <div className="max-w-7xl mx-auto w-ful flex items-center justify-between py-3 px-8">
          <Link
            href="/"
            className="-ml-2 hover:bg-gray-200/30 p-2 transition-all hover:scale-110 active:scale-95 rounded-md"
          >
            <HomeIcon className="w-auto h-8 text-white" />
          </Link>

          <CartButton />
          <GuestInfo />
        </div>
      </div>

      <div className="h-2 bg-secondary-500 w-full mt-2" />
    </header>
  );
}
