import { UserButton, auth } from '@clerk/nextjs';
import { MainNav } from '@/components/main-nav';
import EqubSwitcher from '@/components/equb-switcher';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import { ThemeToggle } from './theme-toggle';

const Navbar = async () => {
    const {userId}=auth();
    if(!userId){
        redirect('/sign-in');
    }
    const equbs = await prismadb.equb.findMany({
      where:{
        userId,
      },
    })
  return (
    <div className="border-b">
      <div className='flex h-16 items-center px-4'>
        <EqubSwitcher items={equbs}/>
       <MainNav className='mx-6'/>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeToggle/>
            <UserButton afterSignOutUrl='/'/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
