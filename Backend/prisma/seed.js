import prisma from "../lib/prisma.js";

async function Seeding() {
  const user = await prisma.user.create({
    data: {
      name: "Khuswant",
      email: "khuswant@example.com",
      password: "password123",
      comments: {
        create: [
          {
            text: "This is the First Comment by khuswant",
            author: "khuswant",
          },
          {
            text: "This is the Second Comment by khuswant",
            author: "khuswant",
            children: {
              create: [
                {
                  text: "This is the first comment Root under Second Comment on khuswant",
                  author: "Krishna",
                },
                {
                  text: "This is the second comment Root under Second Comment on khuswant",
                  author: "Rajat",
                }, 
              ],
            },
          }, 
        ],
      },
    },
    include: { comments: true },
  });
  console.log("Seeded user with comments:", user);
}

Seeding()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
