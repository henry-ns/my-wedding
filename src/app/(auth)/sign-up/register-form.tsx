"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { tv } from "tailwind-variants";

import { useToast } from "~/components/ui/toast";
import { Input } from "../../../components/ui/input";
import { signUp } from "./actions";

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

export function RegisterForm() {
  const [state, formAction] = useFormState(signUp, {});
  const { pending } = useFormStatus();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (state.success) {
      router.back();
      toast.show({
        status: "positive",
        title: "Conta criada com sucesso",
        description: "Agora só entrar com os dados cadastrados",
      });
      return;
    }

    if (state.success === false) {
      toast.show({
        status: "error",
        title: "Não foi possível criar sua conta",
        description: "Verifique seus dados e tente novamente",
      });
    }
  }, [toast, router, state]);

  return (
    <form action={formAction} className="flex flex-col w-full">
      <Input
        label="Nome"
        name="name"
        placeholder="Seu nome completo"
        className="mb-2"
        mask="Capitalize"
        isRequired
      />
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
        href="/sign-in"
        className="w-full text-center text-gray-500 hover:underline"
      >
        Voltar
      </Link>
    </form>
  );
}
