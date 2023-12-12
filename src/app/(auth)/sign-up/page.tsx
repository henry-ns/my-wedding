import { CredentialSignInForm } from "../credential-sign-in-form";
import { DiscordSignInButton } from "../discord-sign-in-button";
import { GoogleSignInButton } from "../google-sign-in-button";

export default function SignUpPage() {
  return (
    <main className="relative min-h-screen text-gray-900 bg-bg ">
      <DiscordSignInButton />
      <GoogleSignInButton />
      <span>ou</span>
      <CredentialSignInForm />
    </main>
  );
}
