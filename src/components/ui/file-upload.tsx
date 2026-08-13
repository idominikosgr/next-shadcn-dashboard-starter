'use client';

import * as React from 'react';
import Image from 'next/image';
import Dropzone, {
  type DropzoneProps,
  type FileRejection
} from 'react-dropzone';
import { toast } from 'sonner';
import {
  X,
  Upload,
  FileIcon,
  FileTextIcon,
  FileSpreadsheetIcon,
  FileArchiveIcon,
  FileAudioIcon,
  FileVideoIcon,
  ImageIcon,
  FileCode2Icon
} from 'lucide-react';

import { cn, formatBytes } from '@/lib/utils';
import { useControllableState } from '@/hooks/use-controllable-state';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface FileWithPreview extends File {
  preview?: string;
}

export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: FileWithPreview[];
  onValueChange?: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
  onUpload?: (files: FileWithPreview[]) => Promise<void>;
  progresses?: Record<string, number>;
  accept?: DropzoneProps['accept'];
  maxSize?: DropzoneProps['maxSize'];
  maxFiles?: DropzoneProps['maxFiles'];
  multiple?: boolean;
  disabled?: boolean;
  /** Display mode for uploaded files */
  variant?: 'default' | 'grid' | 'compact';
  /** Show image previews */
  showPreviews?: boolean;
}

const fileTypeIcons: Record<string, React.ReactNode> = {
  'image/': <ImageIcon className='text-chart-1 size-8' />,
  'video/': <FileVideoIcon className='text-chart-2 size-8' />,
  'audio/': <FileAudioIcon className='text-chart-3 size-8' />,
  'application/pdf': <FileTextIcon className='text-destructive size-8' />,
  'application/zip': <FileArchiveIcon className='text-chart-4 size-8' />,
  'application/x-rar': <FileArchiveIcon className='text-chart-4 size-8' />,
  'text/csv': <FileSpreadsheetIcon className='text-chart-2 size-8' />,
  'application/vnd.ms-excel': (
    <FileSpreadsheetIcon className='text-chart-2 size-8' />
  ),
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': (
    <FileSpreadsheetIcon className='text-chart-2 size-8' />
  ),
  'text/': <FileCode2Icon className='text-muted-foreground size-8' />,
  default: <FileIcon className='text-muted-foreground size-8' />
};

function getFileIcon(mimeType: string) {
  for (const [key, icon] of Object.entries(fileTypeIcons)) {
    if (mimeType.startsWith(key)) {
      return icon;
    }
  }
  return fileTypeIcons.default;
}

function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

export function FileUploadAdvanced({
  value: valueProp,
  onValueChange,
  onUpload,
  progresses,
  accept = { 'image/*': [] },
  maxSize = 1024 * 1024 * 10, // 10MB
  maxFiles = 5,
  multiple = true,
  disabled = false,
  variant = 'default',
  showPreviews = true,
  className,
  ...props
}: FileUploadProps) {
  const [files, setFiles] = useControllableState({
    prop: valueProp,
    onChange: onValueChange
  });

  const onDrop = React.useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
        toast.error('Cannot upload more than 1 file at a time');
        return;
      }

      if ((files?.length ?? 0) + acceptedFiles.length > maxFiles) {
        toast.error(`Cannot upload more than ${maxFiles} files`);
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: isImageFile(file) ? URL.createObjectURL(file) : undefined
        })
      ) as FileWithPreview[];

      const updatedFiles = files ? [...files, ...newFiles] : newFiles;
      setFiles(updatedFiles);

      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach(({ file, errors }) => {
          const errorMessages = errors.map((e) => e.message).join(', ');
          toast.error(`${file.name}: ${errorMessages}`);
        });
      }

      if (
        onUpload &&
        updatedFiles.length > 0 &&
        updatedFiles.length <= maxFiles
      ) {
        const target =
          updatedFiles.length > 1 ? `${updatedFiles.length} files` : 'file';
        toast.promise(onUpload(updatedFiles), {
          loading: `Uploading ${target}...`,
          success: () => {
            setFiles([]);
            return `${target} uploaded`;
          },
          error: `Failed to upload ${target}`
        });
      }
    },
    [files, maxFiles, multiple, onUpload, setFiles]
  );

  const onRemove = (index: number) => {
    if (!files) return;
    const fileToRemove = files[index];
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onValueChange?.(newFiles);
  };

  React.useEffect(() => {
    return () => {
      files?.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isDisabled = disabled || (files?.length ?? 0) >= maxFiles;

  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      <Dropzone
        onDrop={onDrop}
        accept={accept}
        maxSize={maxSize}
        maxFiles={maxFiles}
        multiple={maxFiles > 1 || multiple}
        disabled={isDisabled}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={cn(
              'group relative grid h-48 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed px-5 py-2.5 text-center transition-colors',
              'border-muted-foreground/25 hover:bg-muted/25',
              'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
              isDragActive && 'border-primary bg-primary/5',
              isDisabled && 'pointer-events-none opacity-60'
            )}
          >
            <input {...getInputProps()} />
            <div className='flex flex-col items-center justify-center gap-3'>
              <div
                className={cn(
                  'rounded-full border border-dashed p-3 transition-colors',
                  isDragActive && 'border-primary'
                )}
              >
                <Upload
                  className={cn(
                    'text-muted-foreground size-7 transition-colors',
                    isDragActive && 'text-primary'
                  )}
                />
              </div>
              <div className='space-y-1'>
                <p className='text-muted-foreground font-medium'>
                  {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                </p>
                <p className='text-muted-foreground/70 text-sm'>
                  or click to browse
                </p>
              </div>
              <p className='text-muted-foreground/50 text-xs'>
                {maxFiles > 1
                  ? `Up to ${maxFiles} files, ${formatBytes(maxSize)} each`
                  : `Max ${formatBytes(maxSize)}`}
              </p>
            </div>
          </div>
        )}
      </Dropzone>

      {files && files.length > 0 && (
        <ScrollArea className='w-full'>
          <div
            className={cn(
              variant === 'grid' &&
                'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4',
              variant === 'default' && 'flex flex-col gap-3',
              variant === 'compact' && 'flex flex-wrap gap-2'
            )}
          >
            {files.map((file, index) => (
              <FilePreviewCard
                key={`${file.name}-${index}`}
                file={file}
                onRemove={() => onRemove(index)}
                progress={progresses?.[file.name]}
                variant={variant}
                showPreview={showPreviews}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

interface FilePreviewCardProps {
  file: FileWithPreview;
  onRemove: () => void;
  progress?: number;
  variant: 'default' | 'grid' | 'compact';
  showPreview?: boolean;
}

function FilePreviewCard({
  file,
  onRemove,
  progress,
  variant,
  showPreview = true
}: FilePreviewCardProps) {
  const isImage = isImageFile(file);
  const isUploading = progress !== undefined && progress < 100;

  if (variant === 'compact') {
    return (
      <div className='group bg-muted/50 flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs'>
        <span className='max-w-24 truncate'>{file.name}</span>
        <button
          type='button'
          onClick={onRemove}
          disabled={isUploading}
          className='opacity-50 transition-opacity hover:opacity-100 disabled:pointer-events-none'
        >
          <X className='size-3' />
          <span className='sr-only'>Remove</span>
        </button>
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className='group bg-muted/50 relative aspect-square overflow-hidden rounded-lg border'>
        {isImage && file.preview && showPreview ? (
          <Image
            src={file.preview}
            alt={file.name}
            fill
            className='object-cover'
            sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw'
          />
        ) : (
          <div className='flex h-full items-center justify-center'>
            {getFileIcon(file.type)}
          </div>
        )}
        <div className='absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-2'>
          <p className='truncate text-xs text-white'>{file.name}</p>
          <p className='text-xs text-white/70'>{formatBytes(file.size)}</p>
        </div>
        <Button
          type='button'
          variant='destructive'
          size='icon'
          onClick={onRemove}
          disabled={isUploading}
          className='absolute top-1 right-1 size-6 opacity-0 transition-opacity group-hover:opacity-100'
        >
          <X className='size-3' />
          <span className='sr-only'>Remove</span>
        </Button>
        {progress !== undefined && (
          <div className='absolute inset-x-2 bottom-10'>
            <Progress value={progress} className='h-1' />
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className='bg-card flex items-center gap-4 rounded-lg border p-3'>
      <div className='shrink-0'>
        {isImage && file.preview && showPreview ? (
          <div className='relative size-12 overflow-hidden rounded-md'>
            <Image
              src={file.preview}
              alt={file.name}
              fill
              className='object-cover'
              sizes='48px'
            />
          </div>
        ) : (
          <div className='bg-muted flex size-12 items-center justify-center rounded-md'>
            {getFileIcon(file.type)}
          </div>
        )}
      </div>
      <div className='flex min-w-0 flex-1 flex-col gap-1'>
        <p className='truncate text-sm font-medium'>{file.name}</p>
        <p className='text-muted-foreground text-xs'>
          {formatBytes(file.size)}
        </p>
        {progress !== undefined && (
          <Progress value={progress} className='h-1' />
        )}
      </div>
      <Button
        type='button'
        variant='ghost'
        size='icon'
        onClick={onRemove}
        disabled={isUploading}
        className='shrink-0'
      >
        <X className='size-4' />
        <span className='sr-only'>Remove</span>
      </Button>
    </div>
  );
}

// Export with multiple names for backward compatibility
export { FileUploadAdvanced as FileUpload };
export { FileUploadAdvanced as FileUploader };
export type { FileUploadProps as FileUploaderProps };
