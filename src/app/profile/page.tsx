import { requireAuthentication } from "~/server/auth";
import { SignOutButton } from "./sign-out-button";

export default async function ProfilePage() {
  const session = await requireAuthentication("profile");

  return (
    <main className="p-8 flex flex-col overflow-hidden">
      <div>
        <h5>Nome</h5>
        <p>{session.user?.name}</p>
      </div>
      <div>
        <h5>Email</h5>
        <p>{session.user.email}</p>
      </div>
      <SignOutButton />
    </main>
  );
}
