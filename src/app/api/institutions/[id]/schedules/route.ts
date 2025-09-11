import { proxyToExpress } from "@/lib/fetch/express";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  console.log(id);

  const res = await proxyToExpress(req, `/institutions/${id}/schedules`);

  if (res.ok) {
    const refreshToken = req.cookies.get('refresh_token')?.value;

    if (refreshToken) {
      revalidateTag(`schedules-institution-${id}`)
    } else {
      console.warn('No refresh_token cookie found; skipping tag revalidation');
    }
  }

  return res;
}