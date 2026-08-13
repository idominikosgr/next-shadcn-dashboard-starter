// TEMPORARILY DISABLED CLERK AUTH - Uncomment below to re-enable
// import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Page() {
  // TEMPORARILY DISABLED CLERK AUTH
  // const { userId } = await auth();
  // if (!userId) {
  //   return redirect('/auth/sign-in');
  // } else {
  //   redirect('/dashboard/overview');
  // }

  // Bypass auth - redirect directly to dashboard
  redirect('/dashboard/overview');
}
