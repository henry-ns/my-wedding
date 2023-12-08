import { DiscordSignInButton } from "./discord-sign-in-button";
import { GoogleSignInButton } from "./google-sign-in-button";

export default function SignInPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-bg text-gray-900">
      <GoogleSignInButton />
      <DiscordSignInButton />
    </main>
  );
}
