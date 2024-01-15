import prisma from "./prisma"

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