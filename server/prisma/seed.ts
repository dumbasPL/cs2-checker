import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const defaultTags = {
  "good trust": "#00CC00",
  "bad trust": "#CC0000",
  "example tag": "#FF3399"
}

async function main() {
  await prisma.$transaction(
    Object.entries(defaultTags).map(([name, color]) => {
      return prisma.tag.create({data: {name, color}});
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })