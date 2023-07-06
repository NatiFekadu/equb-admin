import prismadb from '@/lib/prismadb';
interface DashboardPageProps {
  params: { equbId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const equb = await prismadb.equb.findFirst({
    where: {
      id: params.equbId,
    },
  });
  return <div>Active Equb: {equb?.name}</div>;
};

export default DashboardPage;
