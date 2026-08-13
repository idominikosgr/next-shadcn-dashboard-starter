import { User } from '@/features/users/utils/schema';
import { fakeUsers } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { UserTable } from './user-tables';
import { columns } from './user-tables/columns';

export default async function UserListingPage() {
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const role = searchParamsCache.get('role');
  const status = searchParamsCache.get('status');
  const plan = searchParamsCache.get('plan');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(role && { role }),
    ...(status && { status }),
    ...(plan && { plan })
  };

  const data = await fakeUsers.getUsers(filters);
  const totalUsers = data.total_users;
  const users: User[] = data.users;

  return <UserTable data={users} totalItems={totalUsers} columns={columns} />;
}
