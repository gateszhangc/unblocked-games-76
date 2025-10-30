const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const screenshotsDir = path.join(process.cwd(), 'screenshots');
const diffImg = PNG.sync.read(fs.readFileSync(path.join(screenshotsDir, 'diff.png')));

let minX = diffImg.width, minY = diffImg.height;
let maxX = 0, maxY = 0;

for (let y = 0; y < diffImg.height; y++) {
  for (let x = 0; x < diffImg.width; x++) {
    const idx = (diffImg.width * y + x) << 2;
    const r = diffImg.data[idx];
    const g = diffImg.data[idx + 1];
    const b = diffImg.data[idx + 2];
    
    if (r > 0 || g > 0 || b > 0) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

if (maxX > 0 && maxY > 0) {
  console.log(`Bounding box of differences:`);
  console.log(`  Top-left: (${minX}, ${minY})`);
  console.log(`  Bottom-right: (${maxX}, ${maxY})`);
  console.log(`  Width: ${maxX - minX + 1}px`);
  console.log(`  Height: ${maxY - minY + 1}px`);
} else {
  console.log('No differences found');
}
