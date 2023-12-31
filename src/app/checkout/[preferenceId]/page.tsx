import { Payment } from "./payment";

type Props = {
  params: {
    preferenceId: string;
  };
};

export default function SuccessPayment({ params }: Props) {
  return (
    <div>
      <Payment preferenceId={params.preferenceId} />
    </div>
  );
}
