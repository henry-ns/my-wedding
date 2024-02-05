"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { tv } from "tailwind-variants";

import { z } from "zod";
import { useToast } from "~/components/ui/toast";
import { FormErrors, parseFormErrors } from "~/utils/parse-form-errors";
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

const schema = z.object({
  password: z
    .string({ required_error: "A senha é obrigatória" })
    .min(1, "A senha é obrigatória")
    .min(3, "Deve ter pelo menos 3 caracteres"),
  name: z
    .string({ required_error: "O nome é obrigatório" })
    .min(1, "O nome é obrigatório")
    .min(3, "Deve ter pelo menos 3 caracteres"),
  email: z
    .string({ required_error: "A senha é obrigatória" })
    .email({ message: "Deve ser um email valido" }),
});

export function RegisterForm() {
  const router = useRouter();
  const toast = useToast();

  const [formError, setFormError] = useState<FormErrors>();
  const [pending, startSubmitting] = useTransition();

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    startSubmitting(async () => {
      setFormError(undefined);
      const formData = new FormData(e.currentTarget);
      const validate = await schema.safeParseAsync({
        email: formData.get("email"),
        name: formData.get("name"),
        password: formData.get("password"),
      });

      if (!validate.success) {
        const formError = parseFormErrors(validate.error);
        setFormError(formError);
        return;
      }

      try {
        await signUp(validate.data);

        router.back();
        toast.show({
          status: "positive",
          title: "Conta criada com sucesso",
          description: "Agora só entrar com os dados cadastrados",
        });
      } catch {
        toast.show({
          status: "error",
          title: "Não foi possível criar sua conta",
          description: "Verifique seus dados e tente novamente",
        });
      }
    });
  }

  return (
    <form onSubmit={submit} className="flex flex-col w-full">
      <Input
        label="Nome"
        name="name"
        placeholder="Seu nome completo"
        className="mb-2"
        mask="Capitalize"
        error={formError?.name}
        isRequired
      />
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="exemplo@email.com"
        className="mb-2"
        error={formError?.email}
        isRequired
      />
      <Input
        label="Senha"
        name="password"
        type="password"
        placeholder="******"
        error={formError?.password}
        isRequired
      />

      <button type="submit" className={buttonStyle({ pending })}>
        {pending ? "Cadastrando..." : "Cadastrar"}
      </button>

      <Link
        href="/sign-in"
        className="w-full text-center text-gray-500 hover:underline overflow-"
      >
        Voltar
      </Link>
    </form>
  );
}
