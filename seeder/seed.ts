import { PrismaClient, Product } from '@prisma/client'
import * as shortId from 'shortid'
import * as dotenv from 'dotenv'
import {faker} from "@faker-js/faker";
import slugify from "slugify";

dotenv.config()
const prisma = new PrismaClient()

const createProducts = async (quantity: number) => {
  const products: Product[] = []

  for (let i = 0; i < quantity; i++) {
    const productName = faker.commerce.productName()
    const categoryName = faker.commerce.department()

    const product = await prisma.product.create({
      data: {
        name: productName,
        slug: (slugify(productName, { lower: true }) + '-' + shortId.generate()),
        description: faker.commerce.productDescription(),
        price: +faker.commerce.price(10, 999, 0),
        images: Array.from({length: 4}).map(() => faker.image.imageUrl()),
        category: {
          create: {
            name: categoryName,
            slug: (slugify(categoryName, { lower: true }) + '-' + shortId.generate())
          }
        },
        reviews: {
          create: [
            {
              rating: faker.datatype.number({min: 1, max: 5}),
              text: faker.lorem.paragraph(),
              user: {
                connect: {
                  id: 1
                }
              }
            },
            {
              rating: faker.datatype.number({min: 1, max: 5}),
              text: faker.lorem.paragraph(),
              user: {
                connect: {
                  id: 1
                }
              }
            },
            {
              rating: faker.datatype.number({min: 1, max: 5}),
              text: faker.lorem.paragraph(),
              user: {
                connect: {
                  id: 1
                }
              }
            },
          ]

        }
      }
    })
    products.push(product)
  }

  console.log(`Created ${products.length} products!`)
}

async function main() {
  console.log('Start seeding...')
  await createProducts(10)
}

main()
  .catch(e => console.log(e))
  .finally(async () => {
    await prisma.$disconnect()
  })