import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function CheckoutFailurePage() {
  return (
    <div className="flex flex-col items-center border-2 border-dashed border-secondary-500 rounded-lg p-6">
      <h3 className="text-3xl font-sans mb-4 text-secondary-500">
        Não foi possível realizar o pagamento
      </h3>
      <p className="text-lg text-gray-500 mb-8">
        Desculpe, houve um erro ao tenter realizar o pagamento, por favor, tente
        mais tarde ou entre em contato conosco.
      </p>

      <Link href="/checkout">
        <Button>Voltar para o Carrinho</Button>
      </Link>
    </div>
  );
}
