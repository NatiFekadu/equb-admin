import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;
    const { desc } = body;
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }
    if (!desc) {
      return new NextResponse('Description is required', { status: 400 });
    }
    const equb = await prismadb.equb.create({
      data: {
        name,
        desc,
        userId,
      },
    });

    return NextResponse.json(equb);
  } catch (error) {
    console.log('EQUBS_POST', error);
    return new NextResponse('internal Error', { status: 500 });
  }
}
