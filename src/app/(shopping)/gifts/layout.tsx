import { GiftFilter } from "./components/gift-filter";

type Props = {
  children: React.ReactNode;
};

export default function GiftListLayout({ children }: Props) {
  return (
    <>
      <GiftFilter />
      {children}
    </>
  );
}
