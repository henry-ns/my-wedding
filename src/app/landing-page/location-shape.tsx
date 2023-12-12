import { type SVGProps } from "react";

type Props = Omit<SVGProps<SVGSVGElement>, "children">;

export function LocationShape(props: Props) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg
      fill="none"
      viewBox="0 0 1280 769"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 0L162 545.5L1280 769H0V0Z" className="fill-primary-300" />
    </svg>
  );
}
