import prisma from '../lib/prisma.js';
import { SAMPLE_BATCHES } from '../config/sampleBatches.js';

// This is a mock function for runSampleImportPipeline for the seeder
// In a real implementation this would likely trigger a full pipeline
// Since the prompt instructs to just check exists and create rows, we'll upsert here.
async function runSampleImportPipeline(meta) {
  await prisma.importBatch.upsert({
    where: { batch_id: meta.batch_id },
    update: {
      status: 'seeded',
      is_sample: true,
      learning_mode: meta.learning_mode
    },
    create: {
      batch_id: meta.batch_id,
      batch_name: meta.batch_name,
      source_dataset: meta.batch_id.includes('OULAD') ? 'OULAD' : 'UCI',
      learning_mode: meta.learning_mode,
      imported_at: new Date(),
      is_active: false,
      is_sample: true,
      row_count: 0,
      status: 'seeded'
    }
  });
}

export async function seedSampleDatasets() {
  for (const [key, meta] of Object.entries(SAMPLE_BATCHES)) {
    const exists = await prisma.importBatch.findUnique({ where: { batch_id: meta.batch_id } });
    if (exists?.status === 'seeded') { 
      console.log(`[Seeder] ${meta.batch_name} skipped.`); 
      continue; 
    }
    await runSampleImportPipeline(meta);
    console.log(`[Seeder] ${meta.batch_name} seeded.`); 
  }
  
  // Upsert AppState (singleton)
  const appState = await prisma.appState.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 }
  });
  
  if (!appState?.active_dataset_id) {
    await prisma.appState.update({ 
      where: { id: 1 }, 
      data: {
        active_dataset_id: SAMPLE_BATCHES.OULAD.batch_id,
        active_dataset_name: SAMPLE_BATCHES.OULAD.batch_name,
        active_dataset_type: "sample",
        active_dataset_source: "OULAD",
        active_dataset_set_at: new Date(),
        is_first_use: false
      } 
    });
    console.log(`[Seeder] Default active dataset set to ${SAMPLE_BATCHES.OULAD.batch_id}.`);
  }
}
