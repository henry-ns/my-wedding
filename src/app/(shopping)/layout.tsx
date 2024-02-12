import { Provider } from "jotai";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
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

        <main className="p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </Provider>
  );
}
