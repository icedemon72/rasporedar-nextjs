import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="size-full flex flex-col items-center justify-center">
       <div className="w-full max-w-md">
        <Image
          src="/assets/icons/not-found.svg"
          alt="404 Not Found"
          width={500}
          height={500}
          className="w-full h-auto"
          priority
        />
      </div>
      <div className="text-center">
        <h2>Ups, izgleda da tražena stranica ne postoji...</h2>
        <Link href="/">Vrati se na početnu?</Link>
      </div>
    </div>
  );
}