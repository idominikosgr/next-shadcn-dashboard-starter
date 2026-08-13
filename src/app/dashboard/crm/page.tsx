import {
  InsightCards,
  OperationalCards,
  OverviewCards,
  TableCards
} from '@/features/crm';

export default function Page() {
  return (
    <div className='flex flex-col gap-4 md:gap-6'>
      <OverviewCards />
      <InsightCards />
      <OperationalCards />
      <TableCards />
    </div>
  );
}
