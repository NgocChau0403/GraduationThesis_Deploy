import prisma from './src/lib/prisma.js';

async function checkDb() {
  try {
    const batchCount = await prisma.importBatch.count();
    const latestBatch = await prisma.importBatch.findFirst({
      orderBy: { created_at: 'desc' },
      select: { batch_id: true, batch_name: true, created_at: true }
    });

    console.log(`\n--- DATABASE SUMMARY ---`);
    console.log(`Total Import Batches: ${batchCount}`);
    if (latestBatch) {
      console.log(`Latest Batch: ${latestBatch.batch_name} (${latestBatch.batch_id})`);
      console.log(`Imported at: ${latestBatch.created_at}`);
    }

    console.log(`\n--- ENTITY COUNTS ---`);
    console.log(`Student: ${await prisma.student.count()}`);
    console.log(`Course: ${await prisma.course.count()}`);
    console.log(`Class: ${await prisma.class.count()}`);
    console.log(`Enrollment: ${await prisma.enrollment.count()}`);
    console.log(`Assessment: ${await prisma.assessment.count()}`);
    console.log(`Exam Result: ${await prisma.examResult.count()}`);
    
    // Check flat tables if they exist
    console.log(`\n--- FLAT TABLES (For Dashboard) ---`);
    console.log(`flat_enrollment_master: ${await prisma.flatEnrollmentMaster.count()}`);
    console.log(`flat_assessment_master: ${await prisma.flatAssessmentMaster.count()}`);
    
  } catch (error) {
    console.error("Error connecting to DB:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDb();
