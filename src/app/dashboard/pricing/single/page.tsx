import { Metadata } from 'next';
import SinglePricing from '@/features/pricing/components/single-pricing';

export const metadata: Metadata = {
  title: 'Pricing - Single Plan',
  description: 'Discover Nexus Pro - everything you need to grow your business'
};

export default function SinglePricingPage() {
  return (
    <div className='p-6'>
      <SinglePricing />
    </div>
  );
}
