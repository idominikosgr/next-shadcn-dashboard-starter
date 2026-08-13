// TEMPORARILY DISABLED CLERK AUTH - Uncomment below to re-enable
// import { UserProfile } from '@clerk/nextjs';

export default function ProfileViewPage() {
  return (
    <div className='flex w-full flex-col p-4'>
      {/* TEMPORARILY DISABLED CLERK AUTH - Uncomment below to re-enable */}
      {/* <UserProfile /> */}
      <div className='rounded-lg border p-8 text-center'>
        <h2 className='text-xl font-semibold'>Profile Page</h2>
        <p className='text-muted-foreground mt-2'>
          Clerk auth is temporarily disabled for preview.
        </p>
      </div>
    </div>
  );
}
