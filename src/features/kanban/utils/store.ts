import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { persist } from 'zustand/middleware';
import { UniqueIdentifier } from '@dnd-kit/core';
import { Column } from '../components/board-column';

export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type Priority = 'low' | 'medium' | 'high';

const defaultCols = [
  {
    id: 'TODO' as const,
    title: 'Todo'
  }
] satisfies Column[];

export type ColumnId = (typeof defaultCols)[number]['id'];

export type Assignee = {
  name: string;
  avatar?: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority: Priority;
  assignee?: Assignee;
};

export const statusConfig: Record<Status, { label: string; color: string }> = {
  TODO: { label: 'Todo', color: 'bg-slate-500' },
  IN_PROGRESS: { label: 'Progress', color: 'bg-blue-500' },
  DONE: { label: 'Done', color: 'bg-green-500' }
};

export type State = {
  tasks: Task[];
  columns: Column[];
  draggedTask: string | null;
};

const initialTasks: Task[] = [
  {
    id: 'task1',
    status: 'TODO',
    title: 'Project initiation and planning',
    description: 'Define project scope, objectives, and key deliverables',
    priority: 'high',
    assignee: {
      name: 'Alex Morgan',
      avatar: 'https://github.com/shadcn.png'
    }
  },
  {
    id: 'task2',
    status: 'TODO',
    title: 'Gather requirements from stakeholders',
    description:
      'Conduct meetings with stakeholders to gather detailed requirements',
    priority: 'medium',
    assignee: {
      name: 'Jordan Lee',
      avatar: 'https://github.com/leerob.png'
    }
  }
];

export type Actions = {
  addTask: (
    title: string,
    description?: string,
    priority?: Priority,
    assignee?: Assignee
  ) => void;
  addCol: (title: string) => void;
  dragTask: (id: string | null) => void;
  removeTask: (title: string) => void;
  removeCol: (id: UniqueIdentifier) => void;
  setTasks: (updatedTask: Task[]) => void;
  setCols: (cols: Column[]) => void;
  updateCol: (id: UniqueIdentifier, newName: string) => void;
};

export const useTaskStore = create<State & Actions>()(
  persist(
    (set) => ({
      tasks: initialTasks,
      columns: defaultCols,
      draggedTask: null,
      addTask: (
        title: string,
        description?: string,
        priority: Priority = 'medium',
        assignee?: Assignee
      ) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: uuid(),
              title,
              description,
              status: 'TODO',
              priority,
              assignee
            }
          ]
        })),
      updateCol: (id: UniqueIdentifier, newName: string) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === id ? { ...col, title: newName } : col
          )
        })),
      addCol: (title: string) =>
        set((state) => ({
          columns: [
            ...state.columns,
            { title, id: state.columns.length ? title.toUpperCase() : 'TODO' }
          ]
        })),
      dragTask: (id: string | null) => set({ draggedTask: id }),
      removeTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        })),
      removeCol: (id: UniqueIdentifier) =>
        set((state) => ({
          columns: state.columns.filter((col) => col.id !== id)
        })),
      setTasks: (newTasks: Task[]) => set({ tasks: newTasks }),
      setCols: (newCols: Column[]) => set({ columns: newCols })
    }),
    { name: 'task-store', skipHydration: true }
  )
);
