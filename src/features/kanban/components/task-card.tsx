import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Task, statusConfig } from '../utils/store';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';
import { IconGripVertical } from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

// export interface Task {
//   id: UniqueIdentifier;
//   columnId: ColumnId;
//   content: string;
// }

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = 'Task';

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task
    } satisfies TaskDragData,
    attributes: {
      roleDescription: 'Task'
    }
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  };

  const variants = cva('mb-2', {
    variants: {
      dragging: {
        over: 'ring-2 opacity-30',
        overlay: 'ring-2 ring-primary'
      }
    }
  });

  const status = statusConfig[task.status];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        'cursor-grab shadow-elevation-1 transition-shadow hover:shadow-elevation-2',
        variants({
          dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined
        })
      )}
    >
      <CardContent className='space-y-3 px-3 py-3'>
        <div className='flex items-start justify-between gap-2'>
          <h4 className='flex-1 text-sm leading-tight font-medium'>
            {task.title}
          </h4>
          <Button
            variant={'ghost'}
            {...attributes}
            {...listeners}
            className='text-muted-foreground hover:text-foreground -mr-2 h-auto shrink-0 cursor-grab touch-none p-1'
          >
            <span className='sr-only'>Move task</span>
            <IconGripVertical className='h-4 w-4' />
          </Button>
        </div>

        {task.description && (
          <p className='text-muted-foreground line-clamp-2 text-xs'>
            {task.description}
          </p>
        )}

        <div className='flex items-center justify-between pt-1'>
          <div className='flex items-center gap-2'>
            {task.assignee && (
              <Avatar className='h-6 w-6'>
                <AvatarImage
                  src={task.assignee.avatar}
                  alt={task.assignee.name}
                />
                <AvatarFallback className='text-[10px]'>
                  {getInitials(task.assignee.name)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>

          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1.5'>
              <div className={cn('h-2 w-2 rounded-full', status.color)} />
              <span className='text-muted-foreground text-xs'>
                {status.label}
              </span>
            </div>

            <Badge variant='outline' className='text-[10px] capitalize'>
              {task.priority}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
