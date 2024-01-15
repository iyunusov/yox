import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

import { cookies } from "next/headers";
import { createSessionCookie, getCurrentUser } from "@/lib/firebase/admin";

export async function POST(request: NextRequest) {
  const reqBody = (await request.json()) as { idToken: string };
  const idToken = reqBody.idToken;

  const expiresIn = 60 * 60 * 24 * 2 * 1000; // 2 days

  const sessionCookie = await createSessionCookie(idToken, { expiresIn });

  cookies().set("__session", sessionCookie, { maxAge: expiresIn, httpOnly: true, secure: true });

  //Add user details to Prismas db table.
  const currentUser = await getCurrentUser()
  if (currentUser) {
    const { uid, phoneNumber } = currentUser;
    await addUserToPrisma({ id: uid, phoneNumber: phoneNumber as string })
  }

  return NextResponse.json({ success: true, data: "Signed in successfully." });
}

// POST /api/user
// Required fields in body: name, email
export async function addUserToPrisma({ id, phoneNumber }: { id: string, phoneNumber: string, }) {
  const user = await prisma.user.findUnique({ where: { phoneNumber } })
  if (!user) {
    await prisma.user.create({
      data: {
        id,
        phoneNumber,
      }
    })
  }
}
