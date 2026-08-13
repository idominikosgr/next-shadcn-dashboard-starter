import {
  AccountOverview,
  CurrencyExchange,
  ExpenseSummary,
  FinancialOverview
} from '@/features/finance';

export default function Page() {
  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
      <div className='flex flex-col gap-4 lg:col-span-1'>
        <AccountOverview />
      </div>

      <div className='flex flex-col gap-4 lg:col-span-2'>
        <div className='flex-1'>
          <FinancialOverview />
        </div>
        <div className='grid flex-1 grid-cols-1 gap-4 *:data-[slot=card]:shadow-elevation-1 md:grid-cols-2'>
          <ExpenseSummary />
          <CurrencyExchange />
        </div>
      </div>
    </div>
  );
}
