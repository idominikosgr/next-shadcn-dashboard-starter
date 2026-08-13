import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Error | Nexus Dashboard',
  description: 'An error occurred'
};

export default function ErrorLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className='bg-background min-h-screen'>{children}</div>;
}
