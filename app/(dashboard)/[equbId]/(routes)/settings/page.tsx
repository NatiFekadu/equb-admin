import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import {SettingsForm} from './components/settings-form';

interface SettingsPageProps {
  params: {
    equbId: string;
  };
}
const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) {
    redirect('/sign-in');
  }
  const equb = await prismadb.equb.findFirst({
    where: {
      id: params.equbId,
      userId,
    },
  });
  if(!equb){
    redirect('/');
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={equb}/>
      </div>
    </div>
  );
};

export default SettingsPage;
