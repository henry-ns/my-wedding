import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function CheckoutFailurePage() {
  return (
    <div className="flex flex-col items-center rounded-lg border-2 border-secondary-500 border-dashed p-6">
      <h3 className="mb-4 font-sans text-3xl text-secondary-500">
        Não foi possível realizar o pagamento
      </h3>
      <p className="mb-8 text-gray-500 text-lg">
        Desculpe, houve um erro ao tenter realizar o pagamento, por favor, tente
        mais tarde ou entre em contato conosco.
      </p>

      <Link href="/checkout">
        <Button>Voltar para o Carrinho</Button>
      </Link>
    </div>
  );
}
