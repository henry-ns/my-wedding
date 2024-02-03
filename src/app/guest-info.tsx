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
      src={
        session.user.image ??
        `https://api.dicebear.com/7.x/adventurer/svg?seed=${session.user.name}&backgroundType=gradientLinear&backgroundColor=c3d8c7,ebddde`
      }
      alt={session.user.name ?? "convidado"}
    />
  );
}
