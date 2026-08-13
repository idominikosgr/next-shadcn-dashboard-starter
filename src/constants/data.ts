import { NavItem } from '@/types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  plan: string;
  billing: string;
  status: string;
  joinedDate: string;
  lastLogin: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] // Empty array as there are no child items for Dashboard
  },
  {
    title: 'Default',
    url: '/dashboard/default',
    icon: 'home',
    shortcut: ['d', 'f'],
    isActive: false,
    items: []
  },
  {
    title: 'CRM',
    url: '/dashboard/crm',
    icon: 'crm',
    shortcut: ['c', 'r'],
    isActive: false,
    items: []
  },
  {
    title: 'Finance',
    url: '/dashboard/finance',
    icon: 'finance',
    shortcut: ['f', 'n'],
    isActive: false,
    items: [
      {
        title: 'Overview',
        url: '/dashboard/finance',
        icon: 'dashboard'
      },
      {
        title: 'Payments',
        url: '/dashboard/finance/payments',
        icon: 'billing'
      },
      {
        title: 'Transactions',
        url: '/dashboard/finance/transactions',
        icon: 'product'
      }
    ]
  },
  {
    title: 'Business',
    url: '/dashboard/business',
    icon: 'dashboard',
    shortcut: ['b', 'd'],
    isActive: false,
    items: []
  },
  {
    title: 'Product',
    url: '/dashboard/product',
    icon: 'product',
    shortcut: ['p', 'p'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Users',
    url: '/dashboard/users',
    icon: 'user',
    shortcut: ['u', 'u'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Account',
    url: '#', // Placeholder as there is no direct link for the parent
    icon: 'billing',
    isActive: true,

    items: [
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: 'userPen',
        shortcut: ['m', 'm']
      },
      {
        title: 'Login',
        shortcut: ['l', 'l'],
        url: '/',
        icon: 'login'
      }
    ]
  },
  {
    title: 'Pricing',
    url: '/dashboard/pricing',
    icon: 'billing',
    shortcut: ['p', 'r'],
    isActive: false,
    items: [
      {
        title: 'Column Layout',
        url: '/dashboard/pricing/column',
        icon: 'product'
      },
      {
        title: 'Single Plan',
        url: '/dashboard/pricing/single',
        icon: 'dashboard'
      },
      {
        title: 'Comparison Table',
        url: '/dashboard/pricing/table',
        icon: 'kanban'
      }
    ]
  },
  {
    title: 'Kanban',
    url: '/dashboard/kanban',
    icon: 'kanban',
    shortcut: ['k', 'k'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Tasks',
    url: '/dashboard/tasks',
    icon: 'tasks',
    shortcut: ['t', 's'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Calendar',
    url: '/dashboard/calendar',
    icon: 'calendar',
    shortcut: ['c', 'a'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Inbox',
    url: '/dashboard/inbox',
    icon: 'inbox',
    shortcut: ['i', 'n'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Chats',
    url: '/dashboard/chats',
    icon: 'chats',
    shortcut: ['c', 'h'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Showcase',
    url: '/dashboard/showcase',
    icon: 'showcase',
    shortcut: ['s', 'c'],
    isActive: false,
    items: [] // No child items
  }
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    image: 'https://api.slingacademy.com/public/sample-users/1.png',
    initials: 'OM'
  },
  {
    id: 2,
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/2.png',
    initials: 'JL'
  },
  {
    id: 3,
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    image: 'https://api.slingacademy.com/public/sample-users/3.png',
    initials: 'IN'
  },
  {
    id: 4,
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    image: 'https://api.slingacademy.com/public/sample-users/4.png',
    initials: 'WK'
  },
  {
    id: 5,
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    image: 'https://api.slingacademy.com/public/sample-users/5.png',
    initials: 'SD'
  }
];
