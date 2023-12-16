import { getServerAuthSession } from "../server/auth";
import { Avatar } from "./avatar";

export async function GuestInfo() {
  const session = await getServerAuthSession();

  if (!session) {
    return null;
  }

  return (
    <Avatar
      src={session.user.image ?? "https://api.dicebear.com/7.x/pixel-art/svg"}
      alt={session.user.name ?? "convidado"}
    />
  );
}
