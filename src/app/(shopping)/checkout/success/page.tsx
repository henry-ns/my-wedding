"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { SkeletonCard } from "~/components/ui/skeletons/skeleton-card";
import { useCart } from "~/hooks/cart";
import { buyGifts } from "~/server/services/gifts";

export default function CheckoutSuccessPage() {
  const cart = useCart();
  const session = useSession();
  const [isBuying, setIsBuying] = useState(true);

  useEffect(() => {
    buyGifts({
      items: cart.items,
      userId: session.data?.user.id || "",
    })
      .then(() => cart.clean())
      .finally(() => setIsBuying(false));
  }, [cart.items, cart.clean, session.data?.user.id]);

  if (isBuying) {
    return (
      <div className="w-full flex flex-col items-center border-2 border-dashed border-primary-500 rounded-lg p-6">
        <SkeletonCard className="flex-auto h-10 rounded-sm w-1/2 mb-4" />
        <SkeletonCard className="flex-auto h-6 rounded-sm w-2/3" />
        <SkeletonCard className="flex-auto h-6 rounded-sm w-1/3 mt-1" />

        <SkeletonCard className="flex-auto h-10 rounded-full mt-8" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center border-2 border-dashed border-primary-500 rounded-lg p-6">
      <h3 className="text-3xl font-sans mb-4 text-primary-500">
        Obrigado pelo presente :)
      </h3>
      <p className="text-lg text-gray-500 mb-8">
        O pagamento foi efetuado com sucesso, você pode ver os detalhes no seu
        perfil
      </p>

      <Link href="/profile" prefetch>
        <Button>Meu Perfil</Button>
      </Link>
    </div>
  );
}
