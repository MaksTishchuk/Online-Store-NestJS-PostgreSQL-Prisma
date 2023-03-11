import {Prisma} from "@prisma/client";

export const returnUserPartialObject: Prisma.UserSelect = {
  id: true,
  email: true,
  role: true,
  name: true,
  phone: true
}

export const returnUserObject: Prisma.UserSelect = {
  ...returnUserPartialObject,
  avatarPath: true,
  password: true
}