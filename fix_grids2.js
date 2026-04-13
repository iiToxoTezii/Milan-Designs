const fs = require('fs');
const files = fs.readdirSync('.');

files.forEach(f => {
  if (f.endsWith('.html') && f !== 'index.html' && f !== 'projects.html') {
    let c = fs.readFileSync(f, 'utf8');
    
    // Add the missing </div>
    const target = '    <div class="bento-grid">\r?\n      <div class="bento-card bento-half" style="padding: 40px; justify-content: center;">\r?\n        <h2>What I Did</h2>';
    const regex = new RegExp(target, 'g');
    
    if (c.match(regex)) {
        if (!c.includes('</div>\r\n\r\n    <div class="bento-grid">\r\n      <div class="bento-card bento-half" style="padding: 40px; justify-content: center;">') && 
            !c.includes('</div>\n\n    <div class="bento-grid">\n      <div class="bento-card bento-half" style="padding: 40px; justify-content: center;">')) {
           c = c.replace(regex, '    </div>\n\n    <div class="bento-grid">\n      <div class="bento-card bento-half" style="padding: 40px; justify-content: center;">\n        <h2>What I Did</h2>');
           fs.writeFileSync(f, c);
           console.log('Fixed div in', f);
        }
    }
  }
});
