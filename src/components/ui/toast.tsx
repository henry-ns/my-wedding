"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import * as RadixToast from "@radix-ui/react-toast";
import { nanoid } from "nanoid";
import { createContext, useCallback, useContext, useState } from "react";
import { tv } from "tailwind-variants";

const styles = tv({
  slots: {
    root: [
      "bg-white border-2 rounded-md p-3 shadow",
      "grid items-center",
      "[grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-2",
      "data-[state=open]:animate-slideIn",
      "data-[state=closed]:animate-hide",
      "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
      "data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out]",
      "data-[swipe=end]:animate-swipeOut",
    ],
    title: "[grid-area:_title] font-bold mb-1 leading-none",
    description: "[grid-area:_description] text-sm text-neutral-900",
    action: "[grid-area:_action] mb-auto",
    closeButton: [
      "text-gray-900 p-1 -m-1 rounded",
      "hover:bg-white/40 transition-colors",
    ],
    closeIcon: "stroke-gray-800",
  },
  variants: {
    status: {
      info: {
        root: "bg-blue-200 border-blue-300",
        title: "text-blue-800",
      },
      warning: {
        root: "bg-orange-200 border-orange-300",
        title: "text-orange-800",
      },
      error: {
        root: "bg-red-200 border-red-300",
        title: "text-red-800",
      },
      positive: {
        root: "bg-green-200 border-green-300",
        title: "text-green-800",
      },
    },
  },
  defaultVariants: {
    status: "info",
  },
});

type ToastStatus = "positive" | "info" | "warning" | "error";

type NewToast = {
  title: string;
  description?: string;
  duration?: number;
  status: ToastStatus;
};

type ToastData = {
  id: string;
  title: string;
  description?: string;
  duration?: number;
  status: ToastStatus;
};

type ToastProps = ToastData & {
  onClose: (id: string) => void;
};

function Toast({
  id,
  title,
  description,
  status,
  duration,
  onClose,
}: ToastProps) {
  const [open, setOpen] = useState(true);
  const s = styles({ status });

  function changeVisibility(visibility: boolean) {
    setOpen(visibility);

    if (!visibility) {
      setTimeout(() => onClose(id), 400);
    }
  }

  return (
    <RadixToast.Root
      open={open}
      duration={duration}
      onOpenChange={changeVisibility}
      className={s.root()}
    >
      <RadixToast.Title className={s.title()}>{title}</RadixToast.Title>

      <RadixToast.Description asChild>
        <span className={s.description()}>{description}</span>
      </RadixToast.Description>

      <RadixToast.Action className={s.action()} altText="Fechar" asChild>
        <button type="button" className={s.closeButton()}>
          <Cross1Icon className={s.closeIcon()} />
        </button>
      </RadixToast.Action>
    </RadixToast.Root>
  );
}

type ProviderProps = {
  children: React.ReactNode;
};

type Context = {
  show: (payload: NewToast) => string;
  remove: (toastId: string) => void;
};

const toastContext = createContext({} as Context);

export function ToastProvider({ children }: ProviderProps) {
  const [toastList, setToastList] = useState<ToastData[]>([]);

  const show = useCallback((payload: NewToast) => {
    const id = nanoid();
    setToastList((t) => [...t, { ...payload, id }]);

    return id;
  }, []);

  const remove = useCallback((toastId: string) => {
    setToastList((t) => t.filter((t) => t.id !== toastId));
  }, []);

  return (
    <toastContext.Provider value={{ show, remove }}>
      <RadixToast.Provider>
        {children}

        {toastList.map((t) => (
          <Toast key={t.id} onClose={remove} {...t} />
        ))}

        <RadixToast.Viewport
          className={
            "fixed right-0 bottom-0 z-50 m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]"
          }
        />
      </RadixToast.Provider>
    </toastContext.Provider>
  );
}

export function useToast() {
  return useContext(toastContext);
}
