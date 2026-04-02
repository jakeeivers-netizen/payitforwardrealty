import { redirect } from 'next/navigation';

export default function SoldListingsPage() {
  redirect('/listings?status=Sold');
}
