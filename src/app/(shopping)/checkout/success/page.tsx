"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { SkeletonCard } from "~/components/ui/skeletons/skeleton-card";
import { useCart } from "~/hooks/cart";

export default function CheckoutSuccessPage() {
  const _cart = useCart();
  const _session = useSession();
  const [isBuying, _setIsBuying] = useState(true);
  const _done = useRef(false);

  if (isBuying) {
    return (
      <div className="flex w-full flex-col items-center rounded-lg border-2 border-primary-500 border-dashed p-6">
        <SkeletonCard className="mb-4 h-10 w-1/2 flex-auto rounded-sm" />
        <SkeletonCard className="h-6 w-2/3 flex-auto rounded-sm" />
        <SkeletonCard className="mt-1 h-6 w-1/3 flex-auto rounded-sm" />

        <SkeletonCard className="mt-8 h-10 flex-auto rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center rounded-lg border-2 border-primary-500 border-dashed p-6">
      <h3 className="mb-4 font-sans text-3xl text-primary-500">
        Obrigado pelo presente :)
      </h3>
      <p className="mb-8 text-gray-500 text-lg">
        O pagamento foi efetuado com sucesso, você pode ver os detalhes no seu
        perfil
      </p>

      <Link href="/profile" prefetch>
        <Button>Meu Perfil</Button>
      </Link>
    </div>
  );
}
