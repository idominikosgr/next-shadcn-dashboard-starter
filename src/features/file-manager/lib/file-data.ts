export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  mimeType?: string;
  size?: number;
  createdAt: Date;
  modifiedAt: Date;
  parentId: string | null;
  starred: boolean;
  shared: boolean;
  thumbnail?: string;
}

export interface Breadcrumb {
  id: string;
  name: string;
}

// File type icons and colors
export const fileTypeConfig: Record<string, { icon: string; color: string }> = {
  folder: { icon: 'folder', color: 'var(--chart-4)' },
  // Documents
  pdf: { icon: 'file-text', color: 'var(--chart-1)' },
  doc: { icon: 'file-text', color: 'var(--chart-3)' },
  docx: { icon: 'file-text', color: 'var(--chart-3)' },
  txt: { icon: 'file-text', color: 'var(--muted-foreground)' },
  // Spreadsheets
  xls: { icon: 'file-spreadsheet', color: 'var(--chart-2)' },
  xlsx: { icon: 'file-spreadsheet', color: 'var(--chart-2)' },
  csv: { icon: 'file-spreadsheet', color: 'var(--chart-2)' },
  // Images
  jpg: { icon: 'image', color: 'var(--chart-5)' },
  jpeg: { icon: 'image', color: 'var(--chart-5)' },
  png: { icon: 'image', color: 'var(--chart-5)' },
  gif: { icon: 'image', color: 'var(--chart-5)' },
  svg: { icon: 'image', color: 'var(--chart-5)' },
  webp: { icon: 'image', color: 'var(--chart-5)' },
  // Code
  js: { icon: 'file-code', color: 'var(--chart-4)' },
  ts: { icon: 'file-code', color: 'var(--chart-3)' },
  jsx: { icon: 'file-code', color: 'var(--chart-4)' },
  tsx: { icon: 'file-code', color: 'var(--chart-3)' },
  html: { icon: 'file-code', color: 'var(--chart-1)' },
  css: { icon: 'file-code', color: 'var(--chart-3)' },
  json: { icon: 'file-code', color: 'var(--chart-4)' },
  // Archives
  zip: { icon: 'file-archive', color: 'var(--chart-4)' },
  rar: { icon: 'file-archive', color: 'var(--chart-4)' },
  '7z': { icon: 'file-archive', color: 'var(--chart-4)' },
  // Video
  mp4: { icon: 'video', color: 'var(--chart-1)' },
  mov: { icon: 'video', color: 'var(--chart-1)' },
  avi: { icon: 'video', color: 'var(--chart-1)' },
  // Audio
  mp3: { icon: 'audio', color: 'var(--chart-5)' },
  wav: { icon: 'audio', color: 'var(--chart-5)' },
  // Default
  default: { icon: 'file', color: 'var(--muted-foreground)' }
};

export function getFileExtension(filename: string): string {
  const parts = filename.split('.');
  if (parts.length > 1) {
    return parts[parts.length - 1].toLowerCase();
  }
  return '';
}

export function getFileTypeConfig(file: FileItem) {
  if (file.type === 'folder') {
    return fileTypeConfig.folder;
  }
  const ext = getFileExtension(file.name);
  return fileTypeConfig[ext] || fileTypeConfig.default;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(1))} ${sizes[i]}`;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Mock data
export const mockFiles: FileItem[] = [
  {
    id: 'root',
    name: 'My Files',
    type: 'folder',
    createdAt: new Date('2024-01-01'),
    modifiedAt: new Date('2024-01-15'),
    parentId: null,
    starred: false,
    shared: false
  },
  {
    id: 'folder-1',
    name: 'Documents',
    type: 'folder',
    createdAt: new Date('2024-01-05'),
    modifiedAt: new Date('2024-01-20'),
    parentId: 'root',
    starred: true,
    shared: false
  },
  {
    id: 'folder-2',
    name: 'Images',
    type: 'folder',
    createdAt: new Date('2024-01-06'),
    modifiedAt: new Date('2024-01-18'),
    parentId: 'root',
    starred: false,
    shared: true
  },
  {
    id: 'folder-3',
    name: 'Projects',
    type: 'folder',
    createdAt: new Date('2024-01-07'),
    modifiedAt: new Date('2024-01-25'),
    parentId: 'root',
    starred: true,
    shared: false
  },
  {
    id: 'file-1',
    name: 'Budget_2024.xlsx',
    type: 'file',
    mimeType:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    size: 245000,
    createdAt: new Date('2024-01-10'),
    modifiedAt: new Date('2024-01-22'),
    parentId: 'folder-1',
    starred: false,
    shared: false
  },
  {
    id: 'file-2',
    name: 'Report_Q1.pdf',
    type: 'file',
    mimeType: 'application/pdf',
    size: 1250000,
    createdAt: new Date('2024-01-12'),
    modifiedAt: new Date('2024-01-23'),
    parentId: 'folder-1',
    starred: true,
    shared: true
  },
  {
    id: 'file-3',
    name: 'Meeting_Notes.docx',
    type: 'file',
    mimeType:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 45000,
    createdAt: new Date('2024-01-14'),
    modifiedAt: new Date('2024-01-24'),
    parentId: 'folder-1',
    starred: false,
    shared: false
  },
  {
    id: 'file-4',
    name: 'Profile_Photo.jpg',
    type: 'file',
    mimeType: 'image/jpeg',
    size: 850000,
    createdAt: new Date('2024-01-08'),
    modifiedAt: new Date('2024-01-08'),
    parentId: 'folder-2',
    starred: false,
    shared: false,
    thumbnail:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  },
  {
    id: 'file-5',
    name: 'Banner_Design.png',
    type: 'file',
    mimeType: 'image/png',
    size: 2400000,
    createdAt: new Date('2024-01-09'),
    modifiedAt: new Date('2024-01-19'),
    parentId: 'folder-2',
    starred: true,
    shared: true,
    thumbnail:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&h=100&fit=crop'
  },
  {
    id: 'file-6',
    name: 'Logo_Final.svg',
    type: 'file',
    mimeType: 'image/svg+xml',
    size: 15000,
    createdAt: new Date('2024-01-11'),
    modifiedAt: new Date('2024-01-21'),
    parentId: 'folder-2',
    starred: false,
    shared: false
  },
  {
    id: 'file-7',
    name: 'app.tsx',
    type: 'file',
    mimeType: 'text/typescript',
    size: 8500,
    createdAt: new Date('2024-01-13'),
    modifiedAt: new Date('2024-01-26'),
    parentId: 'folder-3',
    starred: false,
    shared: false
  },
  {
    id: 'file-8',
    name: 'styles.css',
    type: 'file',
    mimeType: 'text/css',
    size: 3200,
    createdAt: new Date('2024-01-15'),
    modifiedAt: new Date('2024-01-27'),
    parentId: 'folder-3',
    starred: false,
    shared: true
  },
  {
    id: 'file-9',
    name: 'README.md',
    type: 'file',
    mimeType: 'text/markdown',
    size: 4500,
    createdAt: new Date('2024-01-16'),
    modifiedAt: new Date('2024-01-28'),
    parentId: 'root',
    starred: false,
    shared: false
  },
  {
    id: 'file-10',
    name: 'archive.zip',
    type: 'file',
    mimeType: 'application/zip',
    size: 15000000,
    createdAt: new Date('2024-01-17'),
    modifiedAt: new Date('2024-01-17'),
    parentId: 'root',
    starred: false,
    shared: false
  }
];

export function getFilesInFolder(folderId: string): FileItem[] {
  return mockFiles.filter((file) => file.parentId === folderId);
}

export function getStarredFiles(): FileItem[] {
  return mockFiles.filter((file) => file.starred);
}

export function getSharedFiles(): FileItem[] {
  return mockFiles.filter((file) => file.shared);
}

export function getRecentFiles(limit: number = 10): FileItem[] {
  return [...mockFiles]
    .filter((file) => file.type === 'file')
    .sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime())
    .slice(0, limit);
}

export function getBreadcrumbs(folderId: string): Breadcrumb[] {
  const breadcrumbs: Breadcrumb[] = [];
  let currentId: string | null = folderId;

  while (currentId) {
    const folder = mockFiles.find((f) => f.id === currentId);
    if (folder) {
      breadcrumbs.unshift({ id: folder.id, name: folder.name });
      currentId = folder.parentId;
    } else {
      break;
    }
  }

  return breadcrumbs;
}

export function searchFiles(query: string): FileItem[] {
  const lowerQuery = query.toLowerCase();
  return mockFiles.filter((file) =>
    file.name.toLowerCase().includes(lowerQuery)
  );
}
