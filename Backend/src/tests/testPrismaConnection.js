import prisma from "../lib/prisma.js";

async function main() {
  await prisma.$connect();
  console.log("✅ Prisma connected successfully");

  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error("❌ Prisma connection failed:");
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});