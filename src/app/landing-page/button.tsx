import { UpdateIcon } from "@radix-ui/react-icons";
import { tv, type VariantProps } from "tailwind-variants";

const styles = tv({
  slots: {
    button: "flex w-full items-center justify-center px-6 py-3 transition-all",
    container:
      "relative w-full overflow-hidden transition-all hover:scale-105 active:scale-95 md:w-auto",
  },
  variants: {
    color: {
      primary: {
        button: "bg-primary-300 hover:bg-primary-400 active:bg-primary-500",
      },
      secondary: {
        button:
          "bg-secondary-300 hover:bg-secondary-400 active:bg-secondary-500",
      },
    },
    isLoading: {
      true: {
        container: "pointer-events-none",
        button: "opacity-70",
      },
    },
  },
});

type Props = VariantProps<typeof styles> & {
  children: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  loadingText?: string;
};

export function Button({
  children,
  color,
  onClick,
  isLoading,
  loadingText,
}: Props) {
  const { button, container } = styles({ color, isLoading });

  return (
    <div className={container()}>
      <button type="button" className={button()} onClick={onClick}>
        {isLoading && (
          <UpdateIcon className="mr-2 animate-[spin_1s_linear_infinite]" />
        )}
        {isLoading && loadingText ? loadingText : children}
      </button>

      <div className="absolute left-0 top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-bg" />
      <div className="button-0 absolute left-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-bg" />
      <div className="absolute left-full top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-bg" />
      <div className="button-0 absolute left-full h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-bg" />
    </div>
  );
}
