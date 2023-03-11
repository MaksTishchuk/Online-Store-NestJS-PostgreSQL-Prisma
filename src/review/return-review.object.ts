import {Prisma} from "@prisma/client";

export const returnReviewObject: Prisma.ReviewSelect = {
  id: true,
  rating: true,
  text: true,
  user: {
    select: {
      id: true,
      email: true,
      name: true,
      avatarPath: true
    }
  },
  createdAt: true
}