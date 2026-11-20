import { Readable } from "node:stream";
import { isDbConfigured } from "@/lib/db/config";
import { openPhoto } from "@/lib/db/media";
import { toObjectId } from "@/lib/db/mongo";

/** Sert une photo stockée dans MongoDB (GridFS) : /media/<id> */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const fileId = toObjectId(id);
  if (!isDbConfigured || !fileId) return new Response("Not found", { status: 404 });

  const photo = await openPhoto(fileId);
  if (!photo) return new Response("Not found", { status: 404 });

  return new Response(Readable.toWeb(photo.stream) as ReadableStream, {
    headers: {
      "Content-Type": photo.contentType,
      "Content-Length": String(photo.length),
      // Une photo ne change jamais pour un même identifiant.
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
