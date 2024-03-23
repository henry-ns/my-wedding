import { DashboardIcon, HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { CartButton } from "../../components/cart-button";
import { GuestInfo } from "../guest-info";
import { ShoppingBag } from "react-feather";
import { getServerAuthSession } from "~/server/auth";

const admins = ["enrque.ns@gmail.com", "jenniferregina.csilva@gmail.com"];

export async function Header() {
  const session = await getServerAuthSession();
  const isAdmin = admins.includes(session?.user.email || "");

  return (
    <header className="sticky top-0 left-0 w-full">
      <div className="w-full bg-primary-400">
        <div className="mx-auto flex w-ful max-w-7xl items-center justify-between gap-4 px-8 py-3">
          <Link
            href="/"
            className="-ml-2 rounded-md p-2 transition-all active:scale-95 hover:scale-110 hover:bg-gray-200/30"
          >
            <HomeIcon className="h-8 w-auto text-white" />
          </Link>
          <Link
            href="/gifts"
            className="rounded-md p-2 transition-all active:scale-95 hover:scale-110 hover:bg-gray-200/30"
          >
            <ShoppingBag className="h-8 w-auto text-white" />
          </Link>

          {isAdmin && (
            <Link
              href="/dashboard"
              className="rounded-md p-2 transition-all active:scale-95 hover:scale-110 hover:bg-gray-200/30"
            >
              <DashboardIcon className="h-8 w-auto text-white" />
            </Link>
          )}

          <CartButton />
          <GuestInfo />
        </div>
      </div>

      <div className="mt-2 h-2 w-full bg-secondary-500" />
    </header>
  );
}
