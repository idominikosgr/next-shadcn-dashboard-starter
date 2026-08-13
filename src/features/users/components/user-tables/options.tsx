import {
  CheckCircle,
  Clock,
  CreditCard,
  Shield,
  UserCheck,
  UserCog,
  UserPen,
  Users,
  XCircle
} from 'lucide-react';

export const ROLE_OPTIONS = [
  { value: 'Admin', label: 'Admin', icon: Shield },
  { value: 'Editor', label: 'Editor', icon: UserPen },
  { value: 'Author', label: 'Author', icon: UserCog },
  { value: 'Maintainer', label: 'Maintainer', icon: UserCheck },
  { value: 'Subscriber', label: 'Subscriber', icon: Users }
];

export const PLAN_OPTIONS = [
  { value: 'Basic', label: 'Basic', icon: Users },
  { value: 'Professional', label: 'Professional', icon: UserCheck },
  { value: 'Enterprise', label: 'Enterprise', icon: Shield }
];

export const BILLING_OPTIONS = [
  { value: 'UPI', label: 'UPI', icon: CreditCard },
  { value: 'Auto Debit', label: 'Auto Debit', icon: CreditCard },
  { value: 'Paypal', label: 'Paypal', icon: CreditCard },
  { value: 'Credit Card', label: 'Credit Card', icon: CreditCard }
];

export const STATUS_OPTIONS = [
  { value: 'Active', label: 'Active', icon: CheckCircle },
  { value: 'Pending', label: 'Pending', icon: Clock },
  { value: 'Inactive', label: 'Inactive', icon: XCircle },
  { value: 'Suspended', label: 'Suspended', icon: XCircle }
];
