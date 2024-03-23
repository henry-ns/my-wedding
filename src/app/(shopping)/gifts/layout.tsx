import { NavigationProvider } from "~/hooks/navigation";
import { GiftFilter } from "./_components/gift-filter";

type Props = {
  children: React.ReactNode;
};

export default function GiftListLayout({ children }: Props) {
  return (
    <NavigationProvider>
      <GiftFilter />
      {children}
    </NavigationProvider>
  );
}
