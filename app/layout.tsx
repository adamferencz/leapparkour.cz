import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Leap Parkour – Parkour komunita na Vysočině",
    template: "%s | Leap Parkour",
  },
  description:
    "Pořádáme parkourové kroužky a tábory v Havlíčkově Brodě. Připoj se k parkourové komunitě na Vysočině.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="no-js" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.remove('no-js')",
          }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
