const fs = require('fs');
const path = require('path');

const dataDir = path.join(process.cwd(), 'data');
const publicDir = path.join(process.cwd(), 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

try {
  const head = fs.readFileSync(path.join(dataDir, 'home-head.html'), 'utf8');
  const body = fs.readFileSync(path.join(dataDir, 'home-body.html'), 'utf8');
  
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
${head}
</head>
<body>
${body}
</body>
</html>`;

  fs.writeFileSync(path.join(publicDir, 'original.html'), fullHtml);
  console.log('✓ Generated public/original.html');
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
