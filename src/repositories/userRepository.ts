import { UserData } from "../services/userService.js";
import { prisma } from "./../config/database.js";

async function findByEmail(email:string) {
  return await prisma.user.findFirst({
    where: { email }
  });
}

async function findById(id:number) {
    return await prisma.user.findFirst({
      where: { id }
    });
  }

async function insert(data: UserData) {
  await prisma.user.create({
    data
  });
}

export const userRepository={
  findByEmail,findById,
  insert
};
