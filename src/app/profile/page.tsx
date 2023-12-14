import { requireAuthentication } from "~/server/auth";

export default async function ProfilePage() {
  await requireAuthentication("profile");

  return <main>TODO</main>;
}
