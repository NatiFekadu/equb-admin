import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { equbId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;
    const { desc } = body;
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }
    if (!name) {
      return new NextResponse('Name is Required', { status: 400 });
    }
    if (!desc) {
      return new NextResponse('Description  is Required', { status: 400 });
    }

    if (!params.equbId) {
      return new NextResponse('Equb Id is Required', { status: 400 });
    }
    const equb = await prismadb.equb.updateMany({
      where: {
        id: params.equbId,
        userId,
      },
      data: {
        name,
        desc,
      },
    });
    return NextResponse.json(equb);
  } catch (error) {
    console.log('EQUBS_PATCH', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
   req: Request,
  { params }: { params: { equbId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!params.equbId) {
      return new NextResponse('Equb Id is Required', { status: 400 });
    }
    const equb = await prismadb.equb.deleteMany({
      where: {
        id: params.equbId,
        userId,
      },
    });
    return NextResponse.json(equb);
  } catch (error) {
    console.log('EQUBS_DELETE', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
