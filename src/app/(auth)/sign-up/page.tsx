import { DiscordSignInButton } from "../discord-sign-in-button";
import { GoogleSignInButton } from "../google-sign-in-button";
import { RegisterForm } from "./register-form";

export default function SignUpPage() {
  return (
    <main className="relative min-h-screen text-gray-900 bg-bg flex items-center justify-center">
      <div className="bg-primary-100 p-8 shadow-sm rounded-lg flex flex-col items-center">
        <h1 className="text-2xl font-sans mb-4">Cadastrar</h1>

        <DiscordSignInButton className="mb-2" />
        <GoogleSignInButton />

        <div className="w-full flex items-center space-x-4 my-6">
          <div className="flex-1 w-40 h-0.5 rounded-sm bg-primary-500 opacity-30" />
          <span className="uppercase text-sm font-light text-gray-500">ou</span>
          <div className="flex-1 w-40 h-0.5 rounded-sm bg-primary-500 opacity-30" />
        </div>

        <RegisterForm />
      </div>
    </main>
  );
}
