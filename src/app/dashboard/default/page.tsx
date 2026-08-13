import {
  ChartAreaInteractive,
  DataTable,
  SectionCards,
  dashboardData
} from '@/features/dashboard';

export default function Page() {
  return (
    <div className='@container/main flex flex-col gap-4 md:gap-6'>
      <SectionCards />
      <ChartAreaInteractive />
      <DataTable data={dashboardData} />
    </div>
  );
}
