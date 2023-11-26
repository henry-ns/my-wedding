import "~/styles/globals.css";

import { Lato, Libre_Baskerville } from "next/font/google";

const headingFont = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-header",
});

const bodyFont = Lato({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Henrique e Jennifer",
  description: "Henrique e Jennifer vão se casar!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pt-br">
      <body
        className={`font-sans ${bodyFont.variable} ${headingFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
