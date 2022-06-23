const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const universities = require("./seeds/universities.json");
async function main() {
  await prisma.university.deleteMany({});
  for (const university of universities) {
    await prisma.university.create({
      data: {
        ...university,
        id: parseInt(university.id),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
