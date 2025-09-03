import NotFoundContent from "@/components/ui/NotFoundContent";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <NotFoundContent>
      <h2>Ups, izgleda da tražena stranica ne postoji...</h2>
      <Link href="/app">Vrati se na panel?</Link>
    </NotFoundContent>
  );
}