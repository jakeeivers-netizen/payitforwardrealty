import { redirect } from 'next/navigation';

export default function NewListingsPage() {
  redirect('/listings?status=Active&officeKey=280719');
}
