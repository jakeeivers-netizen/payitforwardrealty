import { NextRequest } from 'next/server';
import { getListing } from '@/lib/ddf';

export const revalidate = 300;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const listing = await getListing(id);

    if (!listing) {
      return Response.json({ error: 'Listing not found' }, { status: 404 });
    }

    return Response.json({ listing });
  } catch (error) {
    console.error('Single listing API error:', error);
    return Response.json({ error: 'Failed to fetch listing' }, { status: 500 });
  }
}
