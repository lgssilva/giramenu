import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { LangProvider } from "@/components/LangProvider";
import "./globals.css";

const serif = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], weight: ["500", "600"] });
const sans = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "Tasca do Mar · Menu",
  description: "Menu digital com vídeo dos pratos. Menu & video by Gira Menu.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#131413",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-PT" className={`${serif.variable} ${sans.variable} antialiased`}>
      <body className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
