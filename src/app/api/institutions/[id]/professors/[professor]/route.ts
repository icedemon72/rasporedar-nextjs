import { proxyToExpress } from "@/lib/fetch/express";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string, professor: string }> }) {
  const { id, professor } = await params;
  const res = await proxyToExpress(req, `/institutions/${id}/professors/${professor}`);

  if (res.ok) {
    revalidateTag(`professors-institution-${id}`);
  }

  return res;
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string, professor: string }> }) {
  const { id, professor } = await params;
  const res = await proxyToExpress(req, `/institutions/${id}/professors/${professor}`);

  if (res.ok) {
    revalidateTag(`professors-institution-${id}`);
  }

  return res;
}