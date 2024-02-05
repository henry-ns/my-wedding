"use client";

import { Payment } from "@mercadopago/sdk-react";
import { IPaymentFormData } from "@mercadopago/sdk-react/bricks/payment/type";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState, useTransition } from "react";
import { SkeletonCard } from "~/components/ui/skeletons/skeleton-card";
import { useToast } from "~/components/ui/toast";
import { getPreferenceId } from "~/server/services/preference";
import { CartItem } from "~/types/gift";
import { processPayment } from "./actions/process-payment";

type Props = {
  items: CartItem[];
  totalPrice: number;
  onSuccess: () => void;
};

export const PayButton = memo(({ items, totalPrice, onSuccess }: Props) => {
  const [preferenceId, setPreferenceId] = useState<string>();
  const [loadingPreference, startLoading] = useTransition();
  const session = useSession();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    let mounted = true;

    startLoading(async () => {
      const id = await getPreferenceId({ items });
      if (mounted) {
        setPreferenceId(id);
      }
    });

    return () => {
      mounted = false;
    };
  }, [items]);

  async function onSubmit(paymentData: IPaymentFormData) {
    if (!session.data) return;

    try {
      const paymentId = await processPayment({
        items,
        paymentData,
        userId: session.data.user.id,
      });

      onSuccess();
      router.push(`/checkout/${paymentId}`);
    } catch (e) {
      console.error(e);
      toast.show({
        status: "error",
        title: "Erro Inesperado",
        description: "Não foi possível prosseguir com o pagamento",
      });
    }
  }

  if (loadingPreference) {
    return (
      <div className="p-6 flex flex-col gap-4">
        <SkeletonCard className="h-12 flex-auto rounded-lg" />
        <SkeletonCard className="h-12 flex-auto rounded-lg" />
      </div>
    );
  }

  return (
    <div className="px-3">
      <Payment
        locale="pt-BR"
        onSubmit={onSubmit}
        customization={{
          paymentMethods: {
            creditCard: "all",
            debitCard: "all",
            bankTransfer: ["pix"],
          },
          visual: {
            hideFormTitle: true,
            font: "Lato",
            style: {
              theme: "flat",
              customVariables: {
                formPadding: "12px",
                formBackgroundColor: "transparent",
                baseColor: "#5e8967",
                borderRadiusLarge: "8px",
                borderRadiusMedium: "8px",
                borderRadiusSmall: "8px",
              },
            },
          },
        }}
        initialization={{
          preferenceId,
          amount: totalPrice / 100,
        }}
      />
    </div>
  );
});
