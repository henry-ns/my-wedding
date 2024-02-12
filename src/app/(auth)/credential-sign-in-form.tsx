"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useTransition } from "react";
import { tv } from "tailwind-variants";
import { Input } from "../../components/ui/input";
import { useToast } from "../../components/ui/toast";

const buttonStyle = tv({
  base: `
    text-white uppercase mt-4 mb-1
    w-full rounded-md p-2 transition-colors
    bg-secondary-500
    hover:bg-secondary-600
    active:bg-secondary-700
  `,
  variants: {
    pending: {
      true: "select-none opacity-50",
    },
  },
});

export function CredentialSignInForm() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const toast = useToast();

  function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
        const response = await signIn("credentials", {
          email: formData.get("email")?.toString(),
          password: formData.get("password")?.toString(),
          redirect: false,
        });

        if (response?.error) {
          throw new Error(response.error);
        }

        localStorage.removeItem("jh-cart-items");
        router.push("/");
        router.refresh();
      } catch (e) {
        console.error(e);
        toast.show({
          status: "error",
          title: "Não foi possível entrar",
          description: "Verifique seus dados ou tente outra conta",
          duration: 3000,
        });
      }
    });
  }

  return (
    <form onSubmit={login} className="flex flex-col w-full">
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="exemplo@email.com"
        className="mb-2"
        isRequired
      />
      <Input
        label="Senha"
        name="password"
        type="password"
        placeholder="******"
        isRequired
      />

      <button type="submit" className={buttonStyle({ pending })}>
        {pending ? "Entrando..." : "Entrar"}
      </button>

      <Link
        href="/sign-up"
        className="w-full text-center text-gray-500 hover:underline"
      >
        Criar conta com email e senha
      </Link>
    </form>
  );
}
