import { ReactNode } from "react";

import { Header } from "./header";

type Props = {
  children: ReactNode;
};

export default async function ShoppingLayout({ children }: Props) {
  return (
    <div className="flex flex-col overflow-hidden">
      <Header />

      <main className="p-8 max-w-7xl w-full mx-auto">{children}</main>
    </div>
  );
}
