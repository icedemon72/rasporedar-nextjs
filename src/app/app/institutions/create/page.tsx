import CreateInstitutionForm from "@/components/client/institutions/create/CreateInstitutionForm";

export async function generateMetadata() {
  return {
    title: `Napravi novu instituciju | ${process.env.NEXT_PUBLIC_APP_NAME}`,
    robots: 'noindex,nofollow'
  }
}

export default async function InstitutionCreatePage() {
  return (
    <CreateInstitutionForm />
  );
}
