import { Metadata } from 'next';
import TablePricing from '@/features/pricing/components/table-pricing';

export const metadata: Metadata = {
  title: 'Pricing - Comparison Table',
  description: 'Compare all plans side-by-side to find the perfect fit'
};

export default function TablePricingPage() {
  return (
    <div className='p-6'>
      <TablePricing />
    </div>
  );
}
