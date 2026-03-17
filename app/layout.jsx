export const dynamic = "force-dynamic";

import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ✅ ADD THESE
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">

        <Navbar />

        {/* Navbar height offset */}
        <main className="pt-20 min-h-screen">
          {children}
        </main>

        <Footer />

        {/* 🔥 IMPORTANT (Toast UI) */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          theme="colored"
        />

      </body>
    </html>
  );
}