import { Provider } from "jotai";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getServerAuthSession } from "~/server/auth";
import { Header } from "./header";

type Props = {
  children: ReactNode;
};

export default async function ShoppingLayout({ children }: Props) {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <Provider>
      <div className="flex flex-col overflow-hidden">
        <Header />
        <main className="mx-auto w-full max-w-7xl p-8">{children}</main>
      </div>
    </Provider>
  );
}
