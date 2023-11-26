import { tv } from "tailwind-variants";

type Props = {
  value: number;
  label: string;
  className?: string;
};

const styles = tv({
  base: [
    "z-10 h-20 w-20 rotate-45 overflow-hidden",
    "flex items-center justify-center",
    "border-8 border-primary-400/50",
  ],
});

export function TimerUnit({ value, label, className }: Props) {
  return (
    <div className={styles({ className })}>
      <div className="flex -rotate-45 flex-col items-center justify-center">
        <span className="font-header text-2xl text-primary-800">{value}</span>
        <span className="-mt-2 text-[0.65rem] font-bold uppercase text-secondary-500">
          {label}
        </span>
      </div>
    </div>
  );
}
