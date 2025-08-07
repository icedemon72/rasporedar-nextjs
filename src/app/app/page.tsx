import Link from "next/link";

export async function generateMetadata() {
  return {
    title: 'Rasporedar'
  }
}

export default async function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/app/institutions">Institucije</Link>
      <Link href="/app/institutions/join">Pridruzi se</Link>
      <Link href="/app/institutions/create">Kreiraj novu</Link>
      <Link href="/app/profile">Moj profil</Link>
    </div>
  );
}