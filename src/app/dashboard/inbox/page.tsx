import { Inbox } from '@/features/inbox/components/inbox';

export default function InboxPage() {
  return (
    <div className='container py-6'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold tracking-tight'>Inbox</h1>
        <p className='text-muted-foreground'>
          Manage your conversations and messages
        </p>
      </div>
      <Inbox />
    </div>
  );
}
