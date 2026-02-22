import "./globals.css";
import type { Metadata } from "next";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Khula NPC | Camp Registration",
  description: "Khula NPC Camp Registration Portal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}