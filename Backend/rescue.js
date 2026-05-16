import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log("🚀 Bắt đầu chiến dịch giải cứu code Phase 2...");

const cwdOptions = { encoding: 'utf8', cwd: 'c:\\[Graduation_Thesis]Prototype' };

try {
  // Get all files from the Phase 2 branch
  const output = execSync('git ls-tree -r origin/BE---Phase-2 --name-only', cwdOptions);
  const phase2Files = output.split('\n').map(f => f.trim()).filter(f => f.length > 0);
  
  let restoredCount = 0;
  
  for (const file of phase2Files) {
    // Only care about files in Backend or Docs
    if (!file.startsWith('Backend/') && !file.startsWith('Docs/')) continue;
    
    // Absolute path to check
    const absPath = path.join('c:\\[Graduation_Thesis]Prototype', file);
    
    // Check if the file is missing locally
    if (!fs.existsSync(absPath)) {
      console.log(`⚠️ Phát hiện file bị mất: ${file}`);
      try {
        execSync(`git checkout origin/BE---Phase-2 -- "${file}"`, cwdOptions);
        console.log(`✅ Đã phục hồi: ${file}`);
        restoredCount++;
      } catch (err) {
        console.error(`❌ Lỗi khi phục hồi ${file}: ${err.message}`);
      }
    }
  }
  
  console.log(`\n🎉 Hoàn tất! Đã phục hồi thành công ${restoredCount} file bị mất.`);
} catch (error) {
  console.error("Lỗi khi chạy git:", error.message);
}
