const fs = require('fs');
const file = 'c:/[Graduation_Thesis]Prototype/Backend/src/services/mappingValidation.service.js';
let content = fs.readFileSync(file, 'utf8');

// Fix the mangled block around line 518-524
const badBlock = `    // ---- status consistency by mode\r\n    if (mode === "strict" && ["suggested", "needs_review"].includes(item.status)) {\r\n      pushUniqueMessage(\r\n    if (item.status === "confirmed") {\r\n      confirmedCanonicalFields.add(item.canonical_field);\r\n    }\r\n  }`;

const goodBlock = `    // ---- status consistency by mode
    if (mode === "strict" && ["suggested", "needs_review"].includes(item.status)) {
      pushUniqueMessage(
        errors,
        \`\${itemPath}.status must not be "\${item.status}" in strict mode.\`
      );
    }

    if (item.status === "confirmed" && item.confidence < 0.7) {
      reportIssue({
        mode,
        severity: "warning",
        message: \`\${itemPath}: confirmed with low AI confidence (\${item.confidence}). This may be a manual human override — verify the mapping is intentional.\`,
        errors,
        warnings
      });
    }

    // ---- usage tracking
    const previousCanonicalCount = canonicalFieldUsage.get(item.canonical_field) || 0;
    canonicalFieldUsage.set(item.canonical_field, previousCanonicalCount + 1);

    if (item.status === "confirmed") {
      confirmedCanonicalFields.add(item.canonical_field);
    }
  }`;

if (content.includes(badBlock)) {
  content = content.replace(badBlock, goodBlock);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Success');
} else {
  // Try with \n instead of \r\n
  const badBlockLF = badBlock.replace(/\r\n/g, '\n');
  if (content.includes(badBlockLF)) {
    content = content.replace(badBlockLF, goodBlock);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Success (LF)');
  } else {
    console.log('Block not found');
    // Print the actual lines around 518-525 for debugging
    const lines = content.split('\n');
    for (let i = 514; i < 528; i++) {
      console.log(i+1 + ': ' + JSON.stringify(lines[i]));
    }
  }
}
