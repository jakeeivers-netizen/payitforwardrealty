import { NextRequest } from 'next/server';
import { searchListings } from '@/lib/ddf';
import type { ListingSearchParams } from '@/types/listing';

export const revalidate = 300;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    const params: ListingSearchParams = {
      city: searchParams.get('city') || undefined,
      propertyType: searchParams.get('propertyType') || undefined,
      status: searchParams.get('status') || undefined,
      minPrice: searchParams.get('minPrice')
        ? parseInt(searchParams.get('minPrice')!, 10)
        : undefined,
      maxPrice: searchParams.get('maxPrice')
        ? parseInt(searchParams.get('maxPrice')!, 10)
        : undefined,
      beds: searchParams.get('beds')
        ? parseInt(searchParams.get('beds')!, 10)
        : undefined,
      baths: searchParams.get('baths')
        ? parseInt(searchParams.get('baths')!, 10)
        : undefined,
      limit: searchParams.get('limit')
        ? parseInt(searchParams.get('limit')!, 10)
        : 20,
      offset: searchParams.get('offset')
        ? parseInt(searchParams.get('offset')!, 10)
        : 0,
      officeKey: searchParams.get('officeKey') || undefined,
    };

    const { listings, total } = await searchListings(params);

    return Response.json({ listings, total });
  } catch (error) {
    console.error('Listings API error:', error);
    return Response.json(
      { error: 'Failed to fetch listings', listings: [], total: 0 },
      { status: 500 }
    );
  }
}
