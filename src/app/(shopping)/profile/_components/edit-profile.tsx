"use client";

import { Cross2Icon, Pencil2Icon } from "@radix-ui/react-icons";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState, useTransition } from "react";
import { tv } from "tailwind-variants";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/toast";
import { updateUser } from "~/server/services/user";

const styles = tv({
  slots: {
    root: "hidden fixed bg-gray-200/40 top-0 left-0 w-full h-full p-2 pb-0",
    content:
      "flex flex-col items-stretch p-2 bg-white rounded-lg w-1/2 xl:w-1/3 min-w-fit max-w-lg shadow max-h-[80%]",
    header: "w-full flex items-center justify-between p-4",
    title: "font-sans text-2xl",
    body: "px-4 pb-4",
  },
  variants: {
    isOpen: {
      true: {
        root: "flex items-center justify-center",
      },
    },
  },
});

function EditProfileForm() {
  const toast = useToast();
  const session = useSession();
  const router = useRouter();

  const [isUpdating, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const s = styles({ isOpen });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransition(async () => {
      try {
        const form = new FormData(event.currentTarget);
        const payload = z
          .object({
            id: z.string(),
            name: z.string().trim().min(3),
          })
          .safeParse({
            id: session.data?.user.id,

            name: form.get("name")?.toString(),
          });

        if (!payload.success) {
          toast.show({
            status: "error",
            title: "O nome é obrigatório",
          });
          return;
        }

        await updateUser(payload.data);
        await session.update(payload.data);

        setIsOpen(false);

        toast.show({
          status: "positive",
          title: "Perfil atualizado com sucesso",
        });

        router.refresh();
      } catch (_e) {
        toast.show({
          status: "error",
          title: "Erro ao atualizar seus dados",
        });
      }
    });
  }

  return (
    <>
      <Button
        variant="primary"
        className="ml-auto"
        icon={Pencil2Icon}
        onClick={() => setIsOpen(true)}
      >
        Editar
      </Button>

      <div className={s.root()}>
        <div className={s.content()}>
          <div className={s.header()}>
            <h2 className={s.title()}>Editar Perfil</h2>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="-mr-1 rounded p-1 transition-colors hover:bg-gray-200"
            >
              <Cross2Icon className="h-auto w-6" />
            </button>
          </div>

          <form className={s.body()} onSubmit={submit}>
            <Input
              label="Nome"
              name="name"
              mask="Capitalize"
              defaultValue={session.data?.user.name ?? undefined}
            />

            <Button
              type="submit"
              className="mt-6 ml-auto"
              isLoading={isUpdating}
              loadingText="Salvando..."
            >
              Salvar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export function EditProfile() {
  return (
    <SessionProvider>
      <EditProfileForm />
    </SessionProvider>
  );
}
