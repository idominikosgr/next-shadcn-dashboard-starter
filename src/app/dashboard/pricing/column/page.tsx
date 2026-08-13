import { Metadata } from 'next';
import ColumnPricing from '@/features/pricing/components/column-pricing';

export const metadata: Metadata = {
  title: 'Pricing - Column Layout',
  description:
    'Choose the perfect plan for your needs with our column pricing layout'
};

export default function ColumnPricingPage() {
  return (
    <div className='p-6'>
      <ColumnPricing />
    </div>
  );
}
