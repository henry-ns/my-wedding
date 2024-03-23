import { Provider } from "jotai";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { Header } from "../../(shopping)/header";

type Props = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: Props) {
  const session = await getServerAuthSession();

  if (session?.user.email !== "enrque.ns@gmail.com") {
    redirect("/");
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
