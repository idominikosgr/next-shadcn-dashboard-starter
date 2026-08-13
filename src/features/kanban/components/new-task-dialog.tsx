'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTaskStore, Priority } from '../utils/store';
import userData from '@/constants/user-data.json';
import { useState } from 'react';

export default function NewTaskDialog() {
  const addTask = useTaskStore((state) => state.addTask);
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState<Priority>('medium');
  const [assigneeId, setAssigneeId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const { title, description } = Object.fromEntries(formData);

    if (typeof title !== 'string') return;

    const selectedUser = userData.find((u) => u.id.toString() === assigneeId);
    const assignee = selectedUser
      ? { name: selectedUser.name, avatar: selectedUser.avatar }
      : undefined;

    addTask(
      title,
      typeof description === 'string' ? description : undefined,
      priority,
      assignee
    );

    // Reset form
    form.reset();
    setPriority('medium');
    setAssigneeId('');
    setOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary' size='sm'>
          ＋ Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>
            Create a new task in the Todo column.
          </DialogDescription>
        </DialogHeader>
        <form id='todo-form' className='space-y-4' onSubmit={handleSubmit}>
          <div className='space-y-2'>
            <Label htmlFor='title'>Title *</Label>
            <Input
              id='title'
              name='title'
              placeholder='Enter task title...'
              required
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              name='description'
              placeholder='Provide task details...'
              rows={3}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='assignee'>Assignee</Label>
            <Select value={assigneeId} onValueChange={setAssigneeId}>
              <SelectTrigger>
                <SelectValue placeholder='Select assignee' />
              </SelectTrigger>
              <SelectContent>
                {userData.map((user) => (
                  <SelectItem key={user.id} value={user.id.toString()}>
                    <div className='flex items-center gap-2'>
                      <Avatar className='h-5 w-5'>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className='text-[8px]'>
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='priority'>Priority</Label>
            <Select
              value={priority}
              onValueChange={(value: Priority) => setPriority(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select priority' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='low'>Low</SelectItem>
                <SelectItem value='medium'>Medium</SelectItem>
                <SelectItem value='high'>High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
        <DialogFooter className='pt-4'>
          <Button
            type='button'
            variant='outline'
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type='submit' form='todo-form'>
            Create Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
