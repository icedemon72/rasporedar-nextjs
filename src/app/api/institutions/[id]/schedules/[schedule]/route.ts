import { proxyToExpress } from "@/lib/fetch/express";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string, schedule: string }> }) {
  const { id, schedule } = await params;
  const res = await proxyToExpress(req, `/institutions/${id}/schedules/${schedule}`);

  if (res.ok) {
    revalidateTag(`schedules-institution-${id}`);
  }

  return res;
}