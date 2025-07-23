import Image from "next/image";

export default function Home() {
  return (
    <section id="hero" className="w-full min-h-[280px] h-[calc(100vh-76px)] bg-home-day dark:bg-home-night bg-cover relative">
				<div className="absolute w-full h-full bg-black/70 flex flex-col gap-2 justify-center items-center">
					<h1 className="font-bold text-3xl text-white uppercase">Rasporedar</h1>
					<p className="font-semibold text-xl text-white">Redar rasporeda časova</p>
					<div className="flex justify-center gap-2">
          </div>
        </div>
      </section>
  );
}
