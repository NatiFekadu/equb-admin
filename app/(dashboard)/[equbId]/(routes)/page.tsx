import prismadb from '@/lib/prismadb';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface DashboardPageProps {
  params: { equbId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const equb = await prismadb.equb.findFirst({
    where: {
      id: params.equbId,
    },
  });
  return (
    <div>
      Active Equb: {equb?.name}
      <div className='container ml-auto mr-auto flex flex-wrap items-start'>
        {/* <Card>
          <CardHeader>
            <CardTitle>{equb?.name}</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card> */}
      </div>
    </div>
  );
};

export default DashboardPage;
