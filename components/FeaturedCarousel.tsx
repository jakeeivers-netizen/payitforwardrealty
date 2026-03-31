'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { Listing } from '@/types/listing';
import ListingCard from './ListingCard';

interface FeaturedCarouselProps {
  listings: Listing[];
}

export default function FeaturedCarousel({ listings }: FeaturedCarouselProps) {
  if (!listings || listings.length === 0) {
    return (
      <p style={{ textAlign: 'center', padding: '48px 0', color: '#aaa', fontFamily: "'Raleway', sans-serif" }}>
        No featured listings available at this time.
      </p>
    );
  }

  return (
    <div className="featured-carousel" style={{ position: 'relative', padding: '0 40px' }}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: '.carousel-next',
          prevEl: '.carousel-prev',
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        style={{ paddingBottom: '48px' }}
      >
        {listings.map((listing) => (
          <SwiperSlide key={listing.id}>
            <ListingCard listing={listing} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Prev arrow */}
      <button
        className="carousel-prev"
        aria-label="Previous"
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-24px)',
          zIndex: 10,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#1a1a1a',
          border: '1px solid #444',
          color: 'white',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        &#8249;
      </button>

      {/* Next arrow */}
      <button
        className="carousel-next"
        aria-label="Next"
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-24px)',
          zIndex: 10,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#1a1a1a',
          border: '1px solid #444',
          color: 'white',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        &#8250;
      </button>

      <style>{`
        .featured-carousel .swiper-button-next,
        .featured-carousel .swiper-button-prev {
          display: none;
        }
        .featured-carousel .swiper-pagination-bullet {
          background: #555;
          opacity: 1;
        }
        .featured-carousel .swiper-pagination-bullet-active {
          background: #58b3e5;
        }
      `}</style>
    </div>
  );
}
