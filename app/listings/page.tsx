import SearchBar from '@/components/SearchBar';
import ListingCard from '@/components/ListingCard';
import Link from 'next/link';
import type { Listing, ListingSearchParams } from '@/types/listing';

interface ListingsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getListings(params: ListingSearchParams): Promise<{ listings: Listing[]; total: number }> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const qs = new URLSearchParams();
    if (params.city) qs.set('city', params.city);
    if (params.propertyType) qs.set('propertyType', params.propertyType);
    if (params.status) qs.set('status', params.status);
    if (params.minPrice) qs.set('minPrice', String(params.minPrice));
    if (params.maxPrice) qs.set('maxPrice', String(params.maxPrice));
    if (params.beds) qs.set('beds', String(params.beds));
    if (params.limit) qs.set('limit', String(params.limit));
    if (params.offset) qs.set('offset', String(params.offset));

    const res = await fetch(`${baseUrl}/api/listings?${qs.toString()}`, {
      cache: 'no-store',
    });
    if (!res.ok) return { listings: [], total: 0 };
    return res.json();
  } catch {
    return { listings: [], total: 0 };
  }
}

const LIMIT = 12;

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const sp = await searchParams;

  const getString = (val: string | string[] | undefined): string | undefined =>
    Array.isArray(val) ? val[0] : val;

  const params: ListingSearchParams = {
    city: getString(sp.city) || 'Brantford',
    propertyType: getString(sp.propertyType),
    status: getString(sp.status),
    minPrice: sp.minPrice ? parseInt(getString(sp.minPrice) || '0', 10) : undefined,
    maxPrice: sp.maxPrice ? parseInt(getString(sp.maxPrice) || '0', 10) : undefined,
    beds: sp.beds ? parseInt(getString(sp.beds) || '0', 10) : undefined,
    limit: LIMIT,
    offset: sp.page ? (parseInt(getString(sp.page) || '1', 10) - 1) * LIMIT : 0,
  };

  const currentPage = sp.page ? parseInt(getString(sp.page) || '1', 10) : 1;

  const { listings, total } = await getListings(params);
  const totalPages = Math.ceil(total / LIMIT);

  const buildPageUrl = (page: number) => {
    const newSp = new URLSearchParams();
    if (params.city) newSp.set('city', params.city);
    if (params.propertyType) newSp.set('propertyType', params.propertyType);
    if (params.status) newSp.set('status', params.status);
    if (params.minPrice) newSp.set('minPrice', String(params.minPrice));
    if (params.maxPrice) newSp.set('maxPrice', String(params.maxPrice));
    if (params.beds) newSp.set('beds', String(params.beds));
    newSp.set('page', String(page));
    return `/listings?${newSp.toString()}`;
  };

  const pageTitle =
    params.status === 'For Rent'
      ? `${params.city || 'Brantford'} Homes For Rent`
      : `${params.city || 'Brantford'} Homes For Sale`;

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Dark header bar */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '24px 0' }}>
        <div style={{ width: '90%', maxWidth: '1280px', margin: '0 auto' }}>
          <h1
            style={{
              fontFamily: "'Oswald', sans-serif",
              color: 'white',
              fontSize: '28px',
              fontWeight: 600,
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}
          >
            {pageTitle}
          </h1>
          {total > 0 && (
            <p
              style={{
                fontFamily: "'Raleway', sans-serif",
                color: '#aaa',
                fontSize: '13px',
              }}
            >
              {total} listing{total !== 1 ? 's' : ''} found
            </p>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ backgroundColor: '#1a1a1a', paddingBottom: '24px' }}>
        <div style={{ width: '90%', maxWidth: '1280px', margin: '0 auto' }}>
          <SearchBar
            initialValues={{
              city: params.city,
              propertyType: params.propertyType,
              status: params.status,
              minPrice: params.minPrice,
              maxPrice: params.maxPrice,
              beds: params.beds,
            }}
          />
        </div>
      </div>

      {/* Results */}
      <div style={{ width: '90%', maxWidth: '1280px', margin: '0 auto', padding: '40px 0' }}>
        {/* Results count */}
        {total > 0 && (
          <p
            style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: '13px',
              color: '#666',
              marginBottom: '20px',
            }}
          >
            Showing{' '}
            <strong>{(currentPage - 1) * LIMIT + 1}</strong>–
            <strong>{Math.min(currentPage * LIMIT, total)}</strong> of{' '}
            <strong>{total}</strong> listings
          </p>
        )}

        {/* Grid: 3 col desktop, 2 tablet, 1 mobile */}
        {listings.length > 0 ? (
          <div
            className="listings-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px',
            }}
          >
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p
              style={{
                fontFamily: "'Raleway', sans-serif",
                color: '#666',
                fontSize: '18px',
                marginBottom: '16px',
              }}
            >
              No listings match your search criteria.
            </p>
            <Link
              href="/listings"
              style={{
                display: 'inline-block',
                backgroundColor: '#1a1a1a',
                color: 'white',
                padding: '10px 24px',
                fontFamily: "'Raleway', sans-serif",
                fontSize: '14px',
                textTransform: 'uppercase',
              }}
            >
              Clear Filters
            </Link>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '40px',
              flexWrap: 'wrap',
            }}
          >
            {currentPage > 1 && (
              <Link
                href={buildPageUrl(currentPage - 1)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #ccc',
                  color: '#333',
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: '13px',
                  backgroundColor: 'white',
                }}
              >
                Previous
              </Link>
            )}
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              const page = i + 1;
              return (
                <Link
                  key={page}
                  href={buildPageUrl(page)}
                  style={{
                    padding: '8px 14px',
                    border: '1px solid #ccc',
                    fontFamily: "'Raleway', sans-serif",
                    fontSize: '13px',
                    backgroundColor: page === currentPage ? '#1a1a1a' : 'white',
                    color: page === currentPage ? 'white' : '#333',
                  }}
                >
                  {page}
                </Link>
              );
            })}
            {currentPage < totalPages && (
              <Link
                href={buildPageUrl(currentPage + 1)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #ccc',
                  color: '#333',
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: '13px',
                  backgroundColor: 'white',
                }}
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .listings-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .listings-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
