import Image from "next/image";

export default function MedalShowcase() {
  const medals = ["/medal1.jpg", "/medal2.jpg", "/medal1.jpg"];

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
      {medals.map((medal, i) => (
        <div
          key={i}
          className="bg-neutral-900 rounded-2xl p-6 flex justify-center"
        >
          <Image
            src={medal}
            alt="Medal"
            width={220}
            height={220}
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}
