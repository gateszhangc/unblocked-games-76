const https = require('https');
const fs = require('fs');
const path = require('path');

const url = 'https://poki.ee';

https.get(url, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    // Save full HTML
    fs.writeFileSync('poki_home.html', data);
    console.log('✓ Downloaded HTML');
    
    // Extract head
    const headMatch = data.match(/<head>([\s\S]*?)<\/head>/i);
    if (headMatch) {
      if (!fs.existsSync('data')) {
        fs.mkdirSync('data');
      }
      fs.writeFileSync(path.join('data', 'home-head.html'), headMatch[1].trim());
      console.log('✓ Extracted head');
    }
    
    // Extract body
    const bodyMatch = data.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
      if (!fs.existsSync('data')) {
        fs.mkdirSync('data');
      }
      fs.writeFileSync(path.join('data', 'home-body.html'), bodyMatch[1].trim());
      console.log('✓ Extracted body');
    }
    
    console.log('\nNext steps:');
    console.log('1. Run: node scripts/updateOriginalHtml.js');
    console.log('2. Run: npm run dev');
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
