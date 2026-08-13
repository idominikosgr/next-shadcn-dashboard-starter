'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  FormRoot,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(50, { message: 'Name must be less than 50 characters.' }),
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters.' })
    .max(20, { message: 'Username must be less than 20 characters.' })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        'Username can only contain letters, numbers, hyphens and underscores.'
    }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  bio: z
    .string()
    .max(200, { message: 'Bio must be less than 200 characters.' })
    .optional(),
  location: z.string().max(50).optional(),
  website: z
    .string()
    .url({ message: 'Please enter a valid URL.' })
    .or(z.literal(''))
    .optional()
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  name: 'John Doe',
  username: 'johndoe',
  email: 'john.doe@example.com',
  bio: 'Product designer and developer. Building tools for creators.',
  location: 'San Francisco, CA',
  website: 'https://johndoe.com'
};

export default function ProfilePage() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange'
  });

  function onSubmit(data: ProfileFormValues) {
    toast.success('Profile updated successfully', {
      description: 'Your profile information has been saved.'
    });
    console.log('Profile data:', data);
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal information and public profile details.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='flex items-center gap-6'>
            <Avatar className='h-24 w-24'>
              <AvatarImage
                src='https://avatar.vercel.sh/johndoe'
                alt='Profile'
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className='space-y-2'>
              <Button variant='outline' size='sm'>
                Change Avatar
              </Button>
              <p className='text-muted-foreground text-xs'>
                JPG, GIF or PNG. Max size of 2MB.
              </p>
            </div>
          </div>

          <FormRoot {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className='grid gap-4 sm:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder='John Doe' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder='johndoe' {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='john.doe@example.com'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      We'll never share your email with anyone else.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='bio'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Tell us a little bit about yourself'
                        className='resize-none'
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Brief description for your profile.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid gap-4 sm:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='location'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder='San Francisco, CA' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='website'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input
                          type='url'
                          placeholder='https://example.com'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex justify-end gap-3'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
                <Button type='submit'>Save Changes</Button>
              </div>
            </form>
          </FormRoot>
        </CardContent>
      </Card>
    </div>
  );
}
