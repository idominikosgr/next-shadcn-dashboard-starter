'use client';

import * as React from 'react';
import {
  ChevronRight,
  Clock,
  Download,
  File,
  FileArchive,
  FileCode,
  FileSpreadsheet,
  FileText,
  Folder,
  FolderPlus,
  Grid3X3,
  HardDrive,
  Image,
  Info,
  LayoutList,
  MoreHorizontal,
  Music,
  Pencil,
  Search,
  Share2,
  Star,
  StarOff,
  Trash2,
  Upload,
  Users,
  Video
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from '@/components/ui/context-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { EmptyState } from '@/components/ui/empty-state';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

import {
  type FileItem,
  formatFileSize,
  formatDate,
  getFileExtension,
  getFileTypeConfig,
  getFilesInFolder,
  getBreadcrumbs,
  getStarredFiles,
  getSharedFiles,
  getRecentFiles,
  searchFiles
} from '../lib/file-data';

const iconMap: Record<string, React.ReactNode> = {
  folder: <Folder className='size-5' />,
  'file-text': <FileText className='size-5' />,
  'file-spreadsheet': <FileSpreadsheet className='size-5' />,
  'file-code': <FileCode className='size-5' />,
  'file-archive': <FileArchive className='size-5' />,
  image: <Image className='size-5' />,
  video: <Video className='size-5' />,
  audio: <Music className='size-5' />,
  file: <File className='size-5' />
};

type ViewMode = 'grid' | 'list';
type SidebarView = 'files' | 'starred' | 'shared' | 'recent';

interface FileManagerProps {
  className?: string;
}

export function FileManager({ className }: FileManagerProps) {
  const [currentFolderId, setCurrentFolderId] = React.useState('root');
  const [viewMode, setViewMode] = React.useState<ViewMode>('grid');
  const [sidebarView, setSidebarView] = React.useState<SidebarView>('files');
  const [selectedFile, setSelectedFile] = React.useState<FileItem | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Get files based on current view
  const files = React.useMemo(() => {
    if (searchQuery) {
      return searchFiles(searchQuery);
    }

    switch (sidebarView) {
      case 'starred':
        return getStarredFiles();
      case 'shared':
        return getSharedFiles();
      case 'recent':
        return getRecentFiles();
      default:
        return getFilesInFolder(currentFolderId);
    }
  }, [currentFolderId, sidebarView, searchQuery]);

  // Sort: folders first, then files
  const sortedFiles = [...files].sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name);
  });

  const breadcrumbs = getBreadcrumbs(currentFolderId);

  const handleFileClick = (file: FileItem) => {
    if (file.type === 'folder') {
      setCurrentFolderId(file.id);
      setSidebarView('files');
      setSearchQuery('');
    } else {
      setSelectedFile(file);
    }
  };

  const handleBreadcrumbClick = (folderId: string) => {
    setCurrentFolderId(folderId);
    setSidebarView('files');
    setSearchQuery('');
  };

  const handleSidebarClick = (view: SidebarView) => {
    setSidebarView(view);
    if (view === 'files') {
      setCurrentFolderId('root');
    }
    setSearchQuery('');
  };

  return (
    <div
      className={cn(
        'bg-card flex h-[calc(100vh-8rem)] rounded-lg border',
        className
      )}
    >
      {/* Sidebar */}
      <div className='w-56 shrink-0 border-r'>
        <div className='p-4'>
          <Button className='w-full'>
            <Upload className='mr-2 size-4' />
            Upload
          </Button>
        </div>
        <nav className='space-y-1 px-2'>
          <SidebarButton
            icon={<HardDrive className='size-4' />}
            label='My Files'
            active={sidebarView === 'files'}
            onClick={() => handleSidebarClick('files')}
          />
          <SidebarButton
            icon={<Star className='size-4' />}
            label='Starred'
            active={sidebarView === 'starred'}
            onClick={() => handleSidebarClick('starred')}
          />
          <SidebarButton
            icon={<Users className='size-4' />}
            label='Shared with me'
            active={sidebarView === 'shared'}
            onClick={() => handleSidebarClick('shared')}
          />
          <SidebarButton
            icon={<Clock className='size-4' />}
            label='Recent'
            active={sidebarView === 'recent'}
            onClick={() => handleSidebarClick('recent')}
          />
        </nav>
        {/* Storage info */}
        <div className='mt-auto border-t p-4'>
          <div className='text-muted-foreground mb-2 flex justify-between text-xs'>
            <span>Storage used</span>
            <span>2.4 GB / 15 GB</span>
          </div>
          <div className='bg-muted h-2 rounded-full'>
            <div
              className='bg-primary h-full rounded-full'
              style={{ width: '16%' }}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className='flex flex-1 flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between border-b px-4 py-3'>
          <div className='flex items-center gap-4'>
            {sidebarView === 'files' && (
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb.id}>
                      {index > 0 && <BreadcrumbSeparator />}
                      <BreadcrumbItem>
                        {index === breadcrumbs.length - 1 ? (
                          <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink
                            href='#'
                            onClick={(e) => {
                              e.preventDefault();
                              handleBreadcrumbClick(crumb.id);
                            }}
                          >
                            {crumb.name}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            )}
            {sidebarView !== 'files' && (
              <h2 className='font-semibold capitalize'>{sidebarView}</h2>
            )}
          </div>
          <div className='flex items-center gap-2'>
            <div className='relative'>
              <Search className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
              <Input
                placeholder='Search files...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-64 pl-9'
              />
            </div>
            <div className='flex rounded-lg border p-1'>
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size='icon'
                className='size-8'
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className='size-4' />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size='icon'
                className='size-8'
                onClick={() => setViewMode('list')}
              >
                <LayoutList className='size-4' />
              </Button>
            </div>
            <Button variant='outline' size='icon'>
              <FolderPlus className='size-4' />
            </Button>
          </div>
        </div>

        {/* File grid/list */}
        <ScrollArea className='flex-1 p-4'>
          {sortedFiles.length === 0 ? (
            <EmptyState
              icon={<Folder className='size-8' />}
              title={searchQuery ? 'No files found' : 'This folder is empty'}
              description={
                searchQuery
                  ? 'Try a different search term'
                  : 'Upload files or create a new folder to get started'
              }
              action={
                !searchQuery
                  ? {
                      label: 'Upload files',
                      onClick: () => {}
                    }
                  : undefined
              }
            />
          ) : viewMode === 'grid' ? (
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
              {sortedFiles.map((file) => (
                <FileGridItem
                  key={file.id}
                  file={file}
                  onClick={() => handleFileClick(file)}
                />
              ))}
            </div>
          ) : (
            <div className='space-y-1'>
              {sortedFiles.map((file) => (
                <FileListItem
                  key={file.id}
                  file={file}
                  onClick={() => handleFileClick(file)}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Details panel */}
      {selectedFile && (
        <FileDetailsPanel
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </div>
  );
}

interface SidebarButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function SidebarButton({ icon, label, active, onClick }: SidebarButtonProps) {
  return (
    <button
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
        active
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      )}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}

interface FileGridItemProps {
  file: FileItem;
  onClick: () => void;
}

function FileGridItem({ file, onClick }: FileGridItemProps) {
  const config = getFileTypeConfig(file);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className='group hover:bg-muted/50 cursor-pointer rounded-lg border p-3 transition-colors'
          onClick={onClick}
        >
          {/* Preview/Icon */}
          <div
            className='bg-muted mb-3 flex aspect-square items-center justify-center rounded-lg'
            style={{ color: config.color }}
          >
            {file.thumbnail ? (
              <img
                src={file.thumbnail}
                alt={file.name}
                className='size-full rounded-lg object-cover'
              />
            ) : (
              <div className='scale-150'>{iconMap[config.icon]}</div>
            )}
          </div>
          {/* Name */}
          <div className='flex items-start justify-between gap-1'>
            <p className='truncate text-sm font-medium'>{file.name}</p>
            {file.starred && (
              <Star className='fill-chart-4 text-chart-4 size-3.5 shrink-0' />
            )}
          </div>
          {/* Meta */}
          <div className='text-muted-foreground mt-1 flex items-center gap-2 text-xs'>
            {file.size !== undefined && (
              <span>{formatFileSize(file.size)}</span>
            )}
            {file.shared && (
              <Badge variant='outline' className='text-[10px]'>
                Shared
              </Badge>
            )}
          </div>
        </div>
      </ContextMenuTrigger>
      <FileContextMenu file={file} />
    </ContextMenu>
  );
}

interface FileListItemProps {
  file: FileItem;
  onClick: () => void;
}

function FileListItem({ file, onClick }: FileListItemProps) {
  const config = getFileTypeConfig(file);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className='group hover:bg-muted/50 flex cursor-pointer items-center gap-4 rounded-lg px-4 py-2 transition-colors'
          onClick={onClick}
        >
          {/* Icon */}
          <div
            className='bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg'
            style={{ color: config.color }}
          >
            {file.thumbnail ? (
              <img
                src={file.thumbnail}
                alt={file.name}
                className='size-full rounded-lg object-cover'
              />
            ) : (
              iconMap[config.icon]
            )}
          </div>
          {/* Name */}
          <div className='min-w-0 flex-1'>
            <div className='flex items-center gap-2'>
              <p className='truncate text-sm font-medium'>{file.name}</p>
              {file.starred && (
                <Star className='fill-chart-4 text-chart-4 size-3.5 shrink-0' />
              )}
              {file.shared && (
                <Badge variant='outline' className='text-[10px]'>
                  Shared
                </Badge>
              )}
            </div>
          </div>
          {/* Size */}
          <span className='text-muted-foreground w-24 shrink-0 text-sm'>
            {file.size !== undefined ? formatFileSize(file.size) : '-'}
          </span>
          {/* Modified */}
          <span className='text-muted-foreground w-32 shrink-0 text-sm'>
            {formatDate(file.modifiedAt)}
          </span>
          {/* Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='size-8 opacity-0 group-hover:opacity-100'
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className='size-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>
                <Download className='mr-2 size-4' />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className='mr-2 size-4' />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil className='mr-2 size-4' />
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem>
                {file.starred ? (
                  <>
                    <StarOff className='mr-2 size-4' />
                    Remove star
                  </>
                ) : (
                  <>
                    <Star className='mr-2 size-4' />
                    Add star
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='text-destructive'>
                <Trash2 className='mr-2 size-4' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </ContextMenuTrigger>
      <FileContextMenu file={file} />
    </ContextMenu>
  );
}

function FileContextMenu({ file }: { file: FileItem }) {
  return (
    <ContextMenuContent>
      {file.type === 'folder' ? (
        <ContextMenuItem>
          <Folder className='mr-2 size-4' />
          Open
        </ContextMenuItem>
      ) : (
        <ContextMenuItem>
          <Download className='mr-2 size-4' />
          Download
        </ContextMenuItem>
      )}
      <ContextMenuItem>
        <Share2 className='mr-2 size-4' />
        Share
      </ContextMenuItem>
      <ContextMenuItem>
        <Pencil className='mr-2 size-4' />
        Rename
      </ContextMenuItem>
      <ContextMenuItem>
        {file.starred ? (
          <>
            <StarOff className='mr-2 size-4' />
            Remove star
          </>
        ) : (
          <>
            <Star className='mr-2 size-4' />
            Add star
          </>
        )}
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem>
        <Info className='mr-2 size-4' />
        File info
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem className='text-destructive'>
        <Trash2 className='mr-2 size-4' />
        Delete
      </ContextMenuItem>
    </ContextMenuContent>
  );
}

interface FileDetailsPanelProps {
  file: FileItem;
  onClose: () => void;
}

function FileDetailsPanel({ file, onClose }: FileDetailsPanelProps) {
  const config = getFileTypeConfig(file);

  return (
    <div className='w-72 shrink-0 border-l'>
      <div className='flex items-center justify-between border-b p-4'>
        <h3 className='font-semibold'>File Details</h3>
        <Button
          variant='ghost'
          size='icon'
          className='size-8'
          onClick={onClose}
        >
          <ChevronRight className='size-4' />
        </Button>
      </div>
      <div className='p-4'>
        {/* Preview */}
        <div
          className='bg-muted mb-4 flex aspect-square items-center justify-center rounded-lg'
          style={{ color: config.color }}
        >
          {file.thumbnail ? (
            <img
              src={file.thumbnail}
              alt={file.name}
              className='size-full rounded-lg object-cover'
            />
          ) : (
            <div className='scale-[2]'>{iconMap[config.icon]}</div>
          )}
        </div>

        {/* Name */}
        <h4 className='mb-4 truncate font-medium'>{file.name}</h4>

        {/* Actions */}
        <div className='mb-4 flex gap-2'>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline' size='icon' className='size-9'>
                <Download className='size-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Download</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline' size='icon' className='size-9'>
                <Share2 className='size-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant='outline' size='icon' className='size-9'>
                {file.starred ? (
                  <Star className='fill-chart-4 text-chart-4 size-4' />
                ) : (
                  <Star className='size-4' />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {file.starred ? 'Remove star' : 'Add star'}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='text-destructive size-9'
              >
                <Trash2 className='size-4' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </div>

        {/* Details */}
        <div className='space-y-3 text-sm'>
          <DetailRow
            label='Type'
            value={
              file.type === 'folder'
                ? 'Folder'
                : getFileExtension(file.name).toUpperCase() || 'File'
            }
          />
          {file.size !== undefined && (
            <DetailRow label='Size' value={formatFileSize(file.size)} />
          )}
          <DetailRow label='Created' value={formatDate(file.createdAt)} />
          <DetailRow label='Modified' value={formatDate(file.modifiedAt)} />
          {file.shared && <DetailRow label='Sharing' value='Shared' />}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex justify-between'>
      <span className='text-muted-foreground'>{label}</span>
      <span className='font-medium'>{value}</span>
    </div>
  );
}
