"use client";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Context = {
  isLoading: boolean;
  navigate: AppRouterInstance;
};

const context = createContext({} as Context);

type Props = {
  children: ReactNode;
};

export function NavigationProvider({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useMemo(
    () =>
      new Proxy(router, {
        get: (target, prop) => {
          setIsLoading(true);
          return target[prop as keyof typeof target];
        },
      }),
    [router],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: when pathname our params changes, a new router is loaded
  useEffect(() => {
    setIsLoading(false);
  }, [pathname, params]);

  return (
    <context.Provider value={{ isLoading, navigate }}>
      {children}
    </context.Provider>
  );
}

export function useNavigation() {
  return useContext(context);
}
