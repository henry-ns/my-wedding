import { tv } from "tailwind-variants";

type Props = {
  value: number;
  label: string;
  className?: string;
};

const styles = tv({
  base: [
    "z-10 h-32 w-32 rotate-45 overflow-hidden",
    "flex items-center justify-center",
    "border-8 border-primary-400/50",
    "lg:h-40 lg:w-40",
  ],
});

export function TimerUnit({ value, label, className }: Props) {
  return (
    <div className={styles({ className })}>
      <div className="flex -rotate-45 flex-col items-center justify-center">
        <span className="font-header  text-4xl text-primary-800 lg:text-6xl">
          {value}
        </span>
        <span className="-mt-2 text-base font-bold uppercase text-secondary-500">
          {label}
        </span>
      </div>
    </div>
  );
}
