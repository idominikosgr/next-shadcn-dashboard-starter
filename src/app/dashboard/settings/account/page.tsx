'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { ShieldCheck, Trash2, LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

const passwordFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' }),
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter.'
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter.'
      })
      .regex(/[0-9]/, {
        message: 'Password must contain at least one number.'
      }),
    confirmPassword: z.string()
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export default function AccountPage() {
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  function onPasswordSubmit(data: PasswordFormValues) {
    toast.success('Password updated successfully', {
      description: 'Your password has been changed.'
    });
    console.log('Password data:', data);
    passwordForm.reset();
  }

  function handleDeleteAccount() {
    toast.error('Account deletion requested', {
      description: 'This feature is not yet implemented.'
    });
  }

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormRoot {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
              className='space-y-4'
            >
              <FormField
                control={passwordForm.control}
                name='currentPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='••••••••'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name='newPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='••••••••'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Must be at least 8 characters with uppercase, lowercase,
                      and numbers.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='••••••••'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex justify-end gap-3'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => passwordForm.reset()}
                >
                  Cancel
                </Button>
                <Button type='submit'>Update Password</Button>
              </div>
            </form>
          </FormRoot>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between rounded-lg border p-4'>
            <div className='space-y-0.5'>
              <div className='flex items-center gap-2'>
                <ShieldCheck className='text-muted-foreground h-5 w-5' />
                <div className='font-medium'>Authenticator App</div>
              </div>
              <div className='text-muted-foreground text-sm'>
                Use an authenticator app to generate verification codes.
              </div>
            </div>
            <Switch />
          </div>
          <div className='flex items-center justify-between rounded-lg border p-4'>
            <div className='space-y-0.5'>
              <div className='flex items-center gap-2'>
                <ShieldCheck className='text-muted-foreground h-5 w-5' />
                <div className='font-medium'>SMS Authentication</div>
              </div>
              <div className='text-muted-foreground text-sm'>
                Receive verification codes via SMS.
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Manage devices where you're currently logged in.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between rounded-lg border p-4'>
            <div className='space-y-0.5'>
              <div className='font-medium'>MacBook Pro - San Francisco, US</div>
              <div className='text-muted-foreground text-sm'>
                Last active: 2 minutes ago
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <span className='text-xs font-medium text-green-600'>
                Current
              </span>
            </div>
          </div>
          <div className='flex items-center justify-between rounded-lg border p-4'>
            <div className='space-y-0.5'>
              <div className='font-medium'>iPhone 15 - San Francisco, US</div>
              <div className='text-muted-foreground text-sm'>
                Last active: 1 hour ago
              </div>
            </div>
            <Button variant='ghost' size='sm'>
              <LogOut className='mr-2 h-4 w-4' />
              Sign Out
            </Button>
          </div>
          <div className='flex items-center justify-between rounded-lg border p-4'>
            <div className='space-y-0.5'>
              <div className='font-medium'>Chrome - New York, US</div>
              <div className='text-muted-foreground text-sm'>
                Last active: 3 days ago
              </div>
            </div>
            <Button variant='ghost' size='sm'>
              <LogOut className='mr-2 h-4 w-4' />
              Sign Out
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant='outline' className='w-full'>
            Sign Out All Other Sessions
          </Button>
        </CardFooter>
      </Card>

      <Card className='border-destructive'>
        <CardHeader>
          <CardTitle className='text-destructive'>Danger Zone</CardTitle>
          <CardDescription>
            Irreversible actions that will affect your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className='mb-4' />
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <div className='font-medium'>Delete Account</div>
                <div className='text-muted-foreground text-sm'>
                  Permanently delete your account and all associated data.
                </div>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant='destructive' size='sm'>
                    <Trash2 className='mr-2 h-4 w-4' />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                    >
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
