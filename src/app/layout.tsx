import "./globals.css";
import type { Metadata } from "next";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Khula Camp | Building Character One Truth at a Time",
  description: "Khula Camp registration and sponsorship platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#f8f5ef] text-gray-900 antialiased">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}