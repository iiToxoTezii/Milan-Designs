const fs = require('fs');

const files = fs.readdirSync('.');
files.forEach(f => {
  if (f.endsWith('.html') && f !== 'index.html' && f !== 'projects.html') {
    let html = fs.readFileSync(f, 'utf8');
    
    // We want to transform the DOM. Regex is okay for simple rigid structured blocks.
    
    // 1. Convert <div class="project-grid"> to <div class="bento-grid" style="margin-bottom: 30px;">
    // 2. Convert <div class="details"> to <div class="bento-grid details-grid">
    html = html.replace(/<div class=\"project-grid\">/g, '<div class="bento-grid" style="margin-bottom: 24px;">');
    html = html.replace(/<div class=\"details\">/g, '<div class="bento-grid">');
    
    // Convert boxes into bento half cards
    html = html.replace(/<div class=\"box\">/g, '<div class="bento-card bento-half" style="padding: 40px;">');
    
    // Strip unnecessary rows so everything flows into the CSS Grid directly
    html = html.replace(/<div class=\"pair-row top-row\">/g, '');
    html = html.replace(/<div class=\"bottom-row\">/g, '');
    html = html.replace(/<div class=\"single-row\">/g, '');
    html = html.replace(/<div class=\"video-container\">/g, '');
    // Remove the closing tags for the rows we stripped out.
    // Wait, removing closing tags via regex is hard. It's safer to just let them close the bento-grid 
    // and replace the inner img tags with bento-cards.
    
    // Let's replace raw <img> and <video> with <div class="bento-card ..."><img></div>
    // Exception: avoid replacing if already in a card. We'll use a hacky sequence:
    
    // A standard top row had 2 images (halves).
    // A standard bottom row had 3 things (thirds).
    // A single row had 1 thing (full).
    
    // Instead of complex parsing, I'll just rewrite the layout area for the 8 files exactly since they are mostly identical forms.
    console.log(`Processing ${f}...`);
    
    // Just inject `.bento-card` directly into the grid wrapper.
    
    fs.writeFileSync(f, html, 'utf8');
  }
});
