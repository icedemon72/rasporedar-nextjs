import ProfileEditForm from "@/components/client/profile/ProfileEditForm";
import PageWrapper from "@/components/wrappers/PageWrapper";
import { getUser } from "@/lib/fetch/server";

export async function generateMetadata() {
  return {
    title: 'Moj profil | Rasporedar'
  }
}

export default async function ProfilePage() {
  const user = await getUser();

  return (
    <PageWrapper 
      title="Uredi profil"
      breadcrumbs={{
        links: [
          { label: 'Panel', url: '/app' },
          { label: 'Moj profil' }
        ]
      }}
    >
      <ProfileEditForm user={user} />
    </PageWrapper>
  );
}