import {
  PaymentCard,
  PaymentMethods,
  RecentTransactions
} from '@/features/finance';

export default function PaymentsPage() {
  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
      <div className='flex flex-col gap-4 lg:col-span-1'>
        <PaymentCard />
      </div>

      <div className='flex flex-col gap-4 lg:col-span-2'>
        <PaymentMethods />
        <RecentTransactions />
      </div>
    </div>
  );
}
