import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Lato, Libre_Baskerville } from "next/font/google";
import { ToastProvider } from "~/components/ui/toast";
import "~/styles/globals.css";

const headingFont = Libre_Baskerville({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-especial",
});

const bodyFont = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Henrique e Jennifer",
  description: "Henrique e Jennifer vão casar!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pt">
      <body
        className={`bg-bg${bodyFont.variable}${headingFont.variable}font-sans`}
      >
        <ToastProvider>{children}</ToastProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
