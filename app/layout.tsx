import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
