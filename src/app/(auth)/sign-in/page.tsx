import Image from "next/image";

import { redirect } from "next/navigation";
import { getServerAuthSession } from "../../../server/auth";
import { CredentialSignInForm } from "../credential-sign-in-form";
import { DiscordSignInButton } from "../discord-sign-in-button";
import { GoogleSignInButton } from "../google-sign-in-button";

export default async function SignInPage() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/");
  }

  return (
    <main className="relative min-h-screen text-gray-900 bg-bg flex items-center justify-center">
      <div className="bg-primary-100 p-8 shadow-sm rounded-lg flex flex-col items-center">
        <Image src="/logo.svg" alt="logo" width="100" height="100" />
        <h1 className="text-2xl font-sans mb-8 text-gray-600 mt-2">
          Fazer login
        </h1>

        <DiscordSignInButton className="mb-2" />
        <GoogleSignInButton />

        <div className="w-full flex items-center space-x-4 my-6">
          <div className="flex-1 w-40 h-0.5 rounded-sm bg-primary-500 opacity-30" />
          <span className="uppercase text-sm font-light text-gray-500">ou</span>
          <div className="flex-1 w-40 h-0.5 rounded-sm bg-primary-500 opacity-30" />
        </div>

        <CredentialSignInForm />
      </div>
    </main>
  );
}
