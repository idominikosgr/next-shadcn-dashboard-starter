import { Metadata } from 'next';
import FormsShowcase from '@/features/forms-showcase/components/forms-showcase';

export const metadata: Metadata = {
  title: 'Forms Showcase',
  description: 'Showcase of all form components and UI elements'
};

export default function FormsShowcasePage() {
  return <FormsShowcase />;
}
