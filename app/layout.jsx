export const dynamic = "force-dynamic";

import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// ✅ ADD THESE
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ?ref=CODE ko yaad rakhta hai taaki checkout par apne aap lag jaye
import ReferralCapture from "./components/ReferralCapture";

// ?via=CODE aur utm_* — influencer/marketing ki ginti. Ye upar wale
// se alag cheez hai: ?ref= discount deta hai, ?via= sirf ginta hai.
import AttributionCapture from "./components/AttributionCapture";

// Har page par support chatbot
import ChatBot from "./components/ChatBot";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">

        <ReferralCapture />
        <AttributionCapture />

        <Navbar />

        {/* Navbar height offset */}
        <main className="pt-20 min-h-screen">
          {children}
        </main>

        <Footer />

        <ChatBot />

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