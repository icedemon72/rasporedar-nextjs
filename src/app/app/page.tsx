import PageWrapper from "@/components/wrappers/PageWrapper";
import Link from "next/link";
import {
  Users,
  UserPlus,
  PlusCircle,
  Settings,
  LayoutDashboard,
  BookOpenText,
  ArrowRight,
} from "lucide-react";
import DashboardCard from "@/components/ui/dashboard/DashboardCard";
import { getBlogs } from "@/lib/payloadcms/payloadcms";
import BlogList from "@/components/ui/blog/BlogList";

export async function generateMetadata() {
  return {
    title: "Panel | Rasporedar",
  };
}



export default async function DashboardPage() {
  const blogs = await getBlogs(9, 1, {
     where: { 
      status: 'published'
    },
    depth: 1
  });


  return (
    <PageWrapper
      title="Rasporedar Panel"
      breadcrumbs={{
        links: [{ label: "Panel" }],
      }}
    >
      <div className="space-y-6">

        {/* Grupe Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Grupe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard
              href="/app/institutions"
              title="Moje grupe"
              description="Pregledaj i upravljaj grupama kojima pripadaš."
              icon={<Users className="w-6 h-6" />}
            />
            <DashboardCard
              href="/app/institutions/join"
              title="Pridruži se"
              description="Unesi kod za pridruživanje postojećoj grupi."
              icon={<UserPlus className="w-6 h-6" />}
            />
            <DashboardCard
              href="/app/institutions/create"
              title="Napravi novu"
              description="Pokreni novu grupu i pozovi druge korisnike."
              icon={<PlusCircle className="w-6 h-6" />}
            />
          </div>
        </div>

        {/* Podešavanja Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Podešavanja</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardCard
              href="/app/profile"
              title="Moj profil"
              description="Uredi svoje korisničke podatke i lozinku."
              icon={<Settings className="w-6 h-6" />}
            />
          </div>
        </div>

        {/* Blog Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <BookOpenText className="w-5 h-5" />
              Najnoviji blogovi
            </h2>
            <Link className="flex items-center gap-2 group btn-outline text-sm" href="/blogs">
              Vidi sve
              <ArrowRight size={14} className="transition group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="p-4">
            <BlogList initialBlogs={blogs.docs} totalPages={1} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}