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
        root: "bg-info-200 border-info-300",
        title: "text-info-800",
      },
      warning: {
        root: "bg-warning-200 border-warning-300",
        title: "text-warning-800",
      },
      error: {
        root: "bg-dangerous-200 border-dangerous-300",
        title: "text-dangerous-800",
      },
      positive: {
        root: "bg-positive-200 border-positive-300",
        title: "text-positive-800",
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
          className={`
            m-0 [--viewport-padding:_25px] p-[var(--viewport-padding)]
            fixed bottom-0 right-0
            flex flex-col gap-[10px]
            w-[390px] max-w-[100vw]
            list-none outline-none
            z-50
          `}
        />
      </RadixToast.Provider>
    </toastContext.Provider>
  );
}

export function useToast() {
  return useContext(toastContext);
}
