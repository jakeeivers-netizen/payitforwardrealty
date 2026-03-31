import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TOUBanner from '@/components/TOUBanner';

export const metadata: Metadata = {
  title: 'Pay It Forward Realty | Brantford Real Estate',
  description:
    'Find your perfect home in Brantford and surrounding areas with Pay It Forward Realty. Expert local agents, hundreds of listings, and a commitment to giving back to the community.',
  metadataBase: new URL('https://payitforwardrealty.ca'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <TOUBanner />
      </body>
    </html>
  );
}
