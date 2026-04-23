import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BOR Analytics Dashboard",
  description: "Board of Reviews Analytics Engine",
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
