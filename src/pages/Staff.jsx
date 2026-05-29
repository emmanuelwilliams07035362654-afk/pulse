import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AddStaffModal from '@/components/Staff/Addstaffmodel';
import StaffCard from '@/components/Staff/Staffcard';

const staffMembers = [
  { name: 'Emeka Adebayo', role: 'Cook', email: 'emeka@pulse.com', phone: '+234 800 123 4567', avatar: '👨‍🍳', status: 'active', hours: 48 },
  { name: 'Fatima Bello', role: 'Cashier', email: 'fatima@pulse.com', phone: '+234 800 987 6543', avatar: '💁‍♀️', status: 'active', hours: 42 },
  { name: 'David Okoye', role: 'Rider', email: 'david@pulse.com', phone: '+234 801 555 1212', avatar: '🏍️', status: 'active', hours: 45 },
  { name: 'Grace Nnamdi', role: 'Waitress', email: 'grace@pulse.com', phone: '+234 802 444 1212', avatar: '👩‍🍳', status: 'active', hours: 40 },
  { name: 'Kunle Adeola', role: 'Manager', email: 'kunle@pulse.com', phone: '+234 803 333 1212', avatar: '🧑‍💼', status: 'active', hours: 52 },
  { name: 'Amina Yusuf', role: 'Cleaner', email: 'amina@pulse.com', phone: '+234 804 222 1212', avatar: '🧹', status: 'active', hours: 38 },
];

const roleFilters = ['all', 'cook', 'cashier', 'rider', 'waitress', 'manager', 'cleaner'];

export default function Staff() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(false);

  const filteredStaff = useMemo(() => {
    return staffMembers.filter((member) => {
      const matchesQuery = query === '' || [member.name, member.role, member.email, member.phone].some((field) => field.toLowerCase().includes(query.toLowerCase()));
      const matchesRole = filter === 'all' || member.role.toLowerCase() === filter;
      return matchesQuery && matchesRole;
    });
  }, [filter, query]);

  return (
    <div className='space-y-8'>
      <div className='rounded-3xl border border-border bg-card p-6 lg:p-8'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div>
            <p className='text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground'>Staff management</p>
            <h1 className='mt-3 text-3xl font-bold text-foreground sm:text-4xl'>Manage your team, schedules and payments.</h1>
            <p className='mt-3 max-w-2xl text-sm text-muted-foreground'>Track every employee profile, keep payroll ready data, and get work status in real time.</p>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <Button onClick={() => setOpen(true)} className='rounded-xl bg-primary hover:bg-primary/90'>Add staff</Button>
            <Button variant='outline' className='rounded-xl'>Export list</Button>
          </div>
        </div>

        <div className='mt-6 grid gap-4 lg:grid-cols-[1fr_auto]'>
          <div className='flex items-center gap-3 rounded-3xl border border-border bg-background p-3'>
            <Search className='w-4 h-4 text-muted-foreground' />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search staff, role or email...'
              className='border-none bg-transparent px-0 py-0 shadow-none'
            />
          </div>
          <div className='flex flex-wrap gap-2'>
            {roleFilters.map((role) => (
              <button
                key={role}
                onClick={() => setFilter(role)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${filter === role ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
              >
                {role === 'all' ? 'All roles' : role}
              </button>
            ))}
          </div>
        </div>

        <div className='mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          <div className='rounded-3xl border border-border bg-background p-5'>
            <p className='text-sm text-muted-foreground'>Total staff</p>
            <p className='mt-3 text-3xl font-semibold text-foreground'>{staffMembers.length}</p>
          </div>
          <div className='rounded-3xl border border-border bg-background p-5'>
            <p className='text-sm text-muted-foreground'>Active roles</p>
            <p className='mt-3 text-3xl font-semibold text-foreground'>6</p>
          </div>
          <div className='rounded-3xl border border-border bg-background p-5'>
            <p className='text-sm text-muted-foreground'>On shift</p>
            <p className='mt-3 text-3xl font-semibold text-foreground'>18</p>
          </div>
          <div className='rounded-3xl border border-border bg-background p-5'>
            <p className='text-sm text-muted-foreground'>Attendance</p>
            <p className='mt-3 text-3xl font-semibold text-foreground'>98%</p>
          </div>
        </div>
      </div>

      <div className='grid gap-5 lg:grid-cols-2 xl:grid-cols-3'>
        {filteredStaff.map((member) => (
          <StaffCard key={member.email} member={member} />
        ))}
      </div>

      <AddStaffModal open={open} onOpenChange={setOpen} />
    </div>
  );
}
