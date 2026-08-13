'use client';

import * as React from 'react';
import {
  type FileItem,
  type Breadcrumb,
  mockFiles,
  getFilesInFolder,
  getStarredFiles,
  getSharedFiles,
  getRecentFiles,
  getBreadcrumbs,
  searchFiles
} from '../lib/file-data';

type ViewType = 'files' | 'starred' | 'shared' | 'recent';

interface UseFileManagerOptions {
  initialFolderId?: string;
  onFileSelect?: (file: FileItem) => void;
  onFileOpen?: (file: FileItem) => void;
}

interface UseFileManagerReturn {
  // State
  files: FileItem[];
  currentFolderId: string;
  selectedFile: FileItem | null;
  viewType: ViewType;
  searchQuery: string;
  breadcrumbs: Breadcrumb[];
  isLoading: boolean;
  error: Error | null;

  // Actions
  navigateToFolder: (folderId: string) => void;
  setViewType: (type: ViewType) => void;
  setSearchQuery: (query: string) => void;
  selectFile: (file: FileItem | null) => void;
  openFile: (file: FileItem) => void;

  // File operations
  createFolder: (name: string, parentId?: string) => Promise<FileItem>;
  uploadFile: (file: File, folderId?: string) => Promise<FileItem>;
  renameFile: (fileId: string, newName: string) => Promise<void>;
  deleteFile: (fileId: string) => Promise<void>;
  moveFile: (fileId: string, targetFolderId: string) => Promise<void>;
  copyFile: (fileId: string, targetFolderId: string) => Promise<FileItem>;
  toggleStar: (fileId: string) => Promise<void>;
  shareFile: (fileId: string, users: string[]) => Promise<void>;
  downloadFile: (fileId: string) => Promise<void>;

  // Refresh
  refresh: () => void;
}

export function useFileManager(
  options: UseFileManagerOptions = {}
): UseFileManagerReturn {
  const { initialFolderId = 'root', onFileSelect, onFileOpen } = options;

  const [files, setFiles] = React.useState<FileItem[]>([]);
  const [currentFolderId, setCurrentFolderId] = React.useState(initialFolderId);
  const [selectedFile, setSelectedFile] = React.useState<FileItem | null>(null);
  const [viewType, setViewType] = React.useState<ViewType>('files');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  // Fetch files based on current state
  const fetchFiles = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 100));

      let result: FileItem[];

      if (searchQuery) {
        result = searchFiles(searchQuery);
      } else {
        switch (viewType) {
          case 'starred':
            result = getStarredFiles();
            break;
          case 'shared':
            result = getSharedFiles();
            break;
          case 'recent':
            result = getRecentFiles();
            break;
          default:
            result = getFilesInFolder(currentFolderId);
        }
      }

      setFiles(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch files'));
    } finally {
      setIsLoading(false);
    }
  }, [currentFolderId, viewType, searchQuery]);

  // Initial fetch and refetch on dependencies change
  React.useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  // Breadcrumbs
  const breadcrumbs = React.useMemo(() => {
    return getBreadcrumbs(currentFolderId);
  }, [currentFolderId]);

  // Navigate to folder
  const navigateToFolder = React.useCallback((folderId: string) => {
    setCurrentFolderId(folderId);
    setViewType('files');
    setSearchQuery('');
    setSelectedFile(null);
  }, []);

  // Select file
  const selectFile = React.useCallback(
    (file: FileItem | null) => {
      setSelectedFile(file);
      if (file) {
        onFileSelect?.(file);
      }
    },
    [onFileSelect]
  );

  // Open file (navigate to folder or open file)
  const openFile = React.useCallback(
    (file: FileItem) => {
      if (file.type === 'folder') {
        navigateToFolder(file.id);
      } else {
        onFileOpen?.(file);
      }
    },
    [navigateToFolder, onFileOpen]
  );

  // File operations - these would be replaced with actual API calls
  const createFolder = React.useCallback(
    async (name: string, parentId?: string): Promise<FileItem> => {
      const newFolder: FileItem = {
        id: `folder-${Date.now()}`,
        name,
        type: 'folder',
        createdAt: new Date(),
        modifiedAt: new Date(),
        parentId: parentId || currentFolderId,
        starred: false,
        shared: false
      };

      // In real implementation: await api.createFolder(name, parentId)
      mockFiles.push(newFolder);
      await fetchFiles();
      return newFolder;
    },
    [currentFolderId, fetchFiles]
  );

  const uploadFile = React.useCallback(
    async (file: File, folderId?: string): Promise<FileItem> => {
      const newFile: FileItem = {
        id: `file-${Date.now()}`,
        name: file.name,
        type: 'file',
        mimeType: file.type,
        size: file.size,
        createdAt: new Date(),
        modifiedAt: new Date(),
        parentId: folderId || currentFolderId,
        starred: false,
        shared: false
      };

      // In real implementation: await api.uploadFile(file, folderId)
      mockFiles.push(newFile);
      await fetchFiles();
      return newFile;
    },
    [currentFolderId, fetchFiles]
  );

  const renameFile = React.useCallback(
    async (fileId: string, newName: string): Promise<void> => {
      // In real implementation: await api.renameFile(fileId, newName)
      const file = mockFiles.find((f) => f.id === fileId);
      if (file) {
        file.name = newName;
        file.modifiedAt = new Date();
      }
      await fetchFiles();
    },
    [fetchFiles]
  );

  const deleteFile = React.useCallback(
    async (fileId: string): Promise<void> => {
      // In real implementation: await api.deleteFile(fileId)
      const index = mockFiles.findIndex((f) => f.id === fileId);
      if (index !== -1) {
        mockFiles.splice(index, 1);
      }
      if (selectedFile?.id === fileId) {
        setSelectedFile(null);
      }
      await fetchFiles();
    },
    [fetchFiles, selectedFile]
  );

  const moveFile = React.useCallback(
    async (fileId: string, targetFolderId: string): Promise<void> => {
      // In real implementation: await api.moveFile(fileId, targetFolderId)
      const file = mockFiles.find((f) => f.id === fileId);
      if (file) {
        file.parentId = targetFolderId;
        file.modifiedAt = new Date();
      }
      await fetchFiles();
    },
    [fetchFiles]
  );

  const copyFile = React.useCallback(
    async (fileId: string, targetFolderId: string): Promise<FileItem> => {
      // In real implementation: await api.copyFile(fileId, targetFolderId)
      const original = mockFiles.find((f) => f.id === fileId);
      if (!original) throw new Error('File not found');

      const copy: FileItem = {
        ...original,
        id: `file-${Date.now()}`,
        name: `${original.name} (copy)`,
        parentId: targetFolderId,
        createdAt: new Date(),
        modifiedAt: new Date()
      };

      mockFiles.push(copy);
      await fetchFiles();
      return copy;
    },
    [fetchFiles]
  );

  const toggleStar = React.useCallback(
    async (fileId: string): Promise<void> => {
      // In real implementation: await api.toggleStar(fileId)
      const file = mockFiles.find((f) => f.id === fileId);
      if (file) {
        file.starred = !file.starred;
      }
      await fetchFiles();
    },
    [fetchFiles]
  );

  const shareFile = React.useCallback(
    async (fileId: string, users: string[]): Promise<void> => {
      // In real implementation: await api.shareFile(fileId, users)
      const file = mockFiles.find((f) => f.id === fileId);
      if (file) {
        file.shared = users.length > 0;
      }
      await fetchFiles();
    },
    [fetchFiles]
  );

  const downloadFile = React.useCallback(
    async (fileId: string): Promise<void> => {
      // In real implementation: await api.getDownloadUrl(fileId)
      const file = mockFiles.find((f) => f.id === fileId);
      if (file) {
        console.log(`Downloading ${file.name}...`);
        // Would trigger actual download
      }
    },
    []
  );

  return {
    files,
    currentFolderId,
    selectedFile,
    viewType,
    searchQuery,
    breadcrumbs,
    isLoading,
    error,
    navigateToFolder,
    setViewType,
    setSearchQuery,
    selectFile,
    openFile,
    createFolder,
    uploadFile,
    renameFile,
    deleteFile,
    moveFile,
    copyFile,
    toggleStar,
    shareFile,
    downloadFile,
    refresh: fetchFiles
  };
}
