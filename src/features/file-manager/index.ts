// Components
export { FileManager } from './components/file-manager';

// Hooks
export { useFileManager } from './hooks/use-file-manager';

// Types and utilities
export type { FileItem, Breadcrumb } from './lib/file-data';
export {
  fileTypeConfig,
  getFileExtension,
  getFileTypeConfig,
  formatFileSize,
  formatDate,
  getFilesInFolder,
  getStarredFiles,
  getSharedFiles,
  getRecentFiles,
  getBreadcrumbs,
  searchFiles
} from './lib/file-data';
