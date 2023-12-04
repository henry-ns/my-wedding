import { tv, type VariantProps } from "tailwind-variants";

const styles = tv({
  slots: {
    button: "w-full px-6 py-3 transition-all",
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
  },
});

type Props = VariantProps<typeof styles> & {
  children: string;
};

export function Button({ children, color }: Props) {
  const { button, container } = styles({ color });

  return (
    <div className={container()}>
      <button className={button()}>{children}</button>

      <div className="absolute left-0 top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-bg" />

      <div className="button-0 absolute left-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-bg" />

      <div className="absolute left-full top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-bg" />

      <div className="button-0 absolute left-full h-5 w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-bg" />
    </div>
  );
}
