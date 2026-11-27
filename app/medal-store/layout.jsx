import CartBar from "./CartBar";

/* Medal Store ke har page ke neeche cart ki patti.

   Layout mein isliye, har page mein alag-alag nahi: warna ek page
   par lagana bhool jaate aur cart wahan gayab ho jaata. Patti khud
   faisla karti hai ki dikhni hai ya nahi (cart khali, ya cart/
   checkout page khula ho to nahi dikhti). */

export const metadata = {
  title: "Medal Store · Valley Run",
  description:
    "Real medals from past Valley Run challenges. Keep one, or send it to someone as a gift.",
};

export default function MedalStoreLayout({ children }) {
  return (
    <>
      {children}
      <CartBar />
    </>
  );
}
