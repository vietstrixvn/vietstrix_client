// app/api/revalidate/route.ts
import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { secret, path, tag } = await req.json();

    if (secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (tag) revalidateTag(tag);
    if (path) revalidatePath(path);

    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
