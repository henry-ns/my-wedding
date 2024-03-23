import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { CredentialSignInForm } from "../credential-sign-in-form";

export default async function SignInPage() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-bg p-4 text-gray-900">
      <div className="flex w-full max-w-md flex-col items-center rounded-lg bg-primary-100 p-8 shadow-sm">
        <Image
          src="/logo.svg"
          alt="logo"
          width="100"
          height="100"
          priority={false}
        />
        <h1 className="mt-2 mb-8 font-sans text-2xl text-gray-600">
          Fazer login
        </h1>

        {/* <DiscordSignInButton className="mb-2" />
        <GoogleSignInButton />

        <div className="w-full flex items-center space-x-4 my-6">
          <div className="flex-1 h-0.5 rounded-sm bg-primary-500 opacity-30" />
          <span className="uppercase text-sm font-light text-gray-500">ou</span>
          <div className="flex-1 h-0.5 rounded-sm bg-primary-500 opacity-30" />
        </div> */}

        <CredentialSignInForm />
      </div>
    </main>
  );
}
