import {
  CustomerInsights,
  MetricsOverview,
  RecentTransactions,
  RevenueBreakdown,
  SalesChart,
  TopProducts
} from '@/features/business-dashboard';

export default function BusinessDashboardPage() {
  return (
    <div className='@container/main space-y-6'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold tracking-tight'>
          Business Dashboard
        </h1>
        <p className='text-muted-foreground'>
          Monitor your business performance and key metrics in real-time
        </p>
      </div>

      <MetricsOverview />

      <div className='grid grid-cols-1 gap-6 @5xl:grid-cols-2'>
        <SalesChart />
        <RevenueBreakdown />
      </div>

      <div className='grid grid-cols-1 gap-6 @5xl:grid-cols-2'>
        <RecentTransactions />
        <TopProducts />
      </div>

      <CustomerInsights />
    </div>
  );
}
