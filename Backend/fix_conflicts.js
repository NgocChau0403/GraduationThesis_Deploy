import fs from 'fs';
import path from 'path';

const basePath = 'c:\\[Graduation_Thesis]Prototype\\Backend';
const files = [
  path.join(basePath, 'src', 'server.js'),
  path.join(basePath, 'src', 'config', 'taskRegistry.json'),
  path.join(basePath, 'package-lock.json')
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const regex = /<<<<<<< Updated upstream[\s\S]*?=======\r?\n([\s\S]*?)>>>>>>> Stashed changes/g;
    
    if (regex.test(content)) {
      content = content.replace(regex, '$1');
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ Fixed conflicts in ${file}`);
    } else {
      console.log(`No conflicts found in ${file}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
});
