import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://admin.vietstrix.com',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  try {
    const { secret, path, paths, tag } = await req.json();

    console.log('Revalidate called:', { tag, path, paths });

    if (secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: CORS_HEADERS }
      );
    }

    if (tag) revalidateTag(tag);

    if (path) {
      revalidatePath(`/vi${path}`, 'page');
      revalidatePath(`/${path}`, 'page');
    }

    if (paths) {
      paths.forEach((p: string) => {
        revalidatePath(`/vi${p}`, 'page');
        revalidatePath(`/${p}`, 'page');
      });
    }

    return NextResponse.json(
      { revalidated: true, tag, path, paths },
      { headers: CORS_HEADERS }
    );
  } catch (e) {
    console.error('Error:', e);
    return NextResponse.json(
      { error: 'Failed' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
