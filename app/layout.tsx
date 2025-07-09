import type { Metadata } from "next";
import "./globals.css";
import { ABeeZee } from "next/font/google";

const abeezee = ABeeZee({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MeetUsAR",
  description: "Step into the shopping metaverse with MeetUsAR",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={abeezee.className}>
      <body>{children}</body>
    </html>
  );
}
