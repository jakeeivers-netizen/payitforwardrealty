export interface Listing {
  id: string;
  mlsNum: string;
  address: string;
  streetNumber: string;
  streetName: string;
  city: string;
  province: string;
  postalCode: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  propertyType: string;
  status: 'For Sale' | 'For Rent' | 'Sold';
  description: string;
  images: string[];
  lat?: number;
  lng?: number;
  yearBuilt?: number;
  garageType?: string;
  listDate?: string;
}

export interface ListingSearchParams {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  propertyType?: string;
  status?: string;
  limit?: number;
  offset?: number;
}
