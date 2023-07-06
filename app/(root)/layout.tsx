import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const equb = await prismadb.equb.findFirst({
    where: {
      userId,
    },
  });
  if (equb) {
    redirect(`/${equb.id}`);
  }
  return <>{children}</>;
}
