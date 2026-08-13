import { FileManager } from '@/features/file-manager/components/file-manager';

export default function FileManagerPage() {
  return (
    <div className='container py-6'>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold tracking-tight'>File Manager</h1>
        <p className='text-muted-foreground'>
          Manage and organize your files and folders
        </p>
      </div>
      <FileManager />
    </div>
  );
}
