import JoinInstitutionForm from "@/components/client/institutions/create/JoinInstitutionForm";

export async function generateMetadata() {
  return {
    title: `Pridruži se grupi | ${process.env.NEXT_PUBLIC_APP_NAME}`
  }
}

export default async function InstitutionsJoinPage() {
  
  return (
    <JoinInstitutionForm />
  );
}
