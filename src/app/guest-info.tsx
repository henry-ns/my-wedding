import { getServerAuthSession } from "../server/auth";
import { Avatar } from "./avatar";

type Props = {
  className?: string;
};

export async function GuestInfo({ className }: Props) {
  const session = await getServerAuthSession();

  if (!session) {
    return null;
  }

  return (
    <Avatar
      className={className}
      src={session.user.image ?? "https://api.dicebear.com/7.x/pixel-art/svg"}
      alt={session.user.name ?? "convidado"}
    />
  );
}
