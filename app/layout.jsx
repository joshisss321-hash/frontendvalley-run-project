import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
      </body>
    </html>
  );
}
