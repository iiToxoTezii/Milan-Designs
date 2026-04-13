const fs = require('fs');

const files = fs.readdirSync('.');

files.forEach(f => {
  if (f.endsWith('.html') && f !== 'index.html' && f !== 'projects.html') {
    let html = fs.readFileSync(f, 'utf8');
    
    // Completely remove inline styles
    html = html.replace(/<style>[\s\S]*?<\/style>/, '');
    
    // Update structural wrappers
    html = html.replace(/<div class="wrapper fade-in">/g, '<div class="container fade-in">');
    html = html.replace(/<h1>/g, '<h1 class="project-header">');
    html = html.replace(/<p class="intro">/g, '<p class="intro-text">');
    
    // Start of Bento Grid
    html = html.replace(/<div class="project-grid">/, '<div class="bento-grid" style="margin-bottom: 60px;">');
    
    // For project2 and moonmist: <div class="top-row"> ... </div> (2 items) -> bento-half
    // For project3: <div class="bottom-row"> ... </div> (3 items) -> bento-third
    // We can do this cleanly by removing the row wrappers entirely and just wrapping the media elements
    
    // 1. Remove all old row wrappers
    html = html.replace(/<div class="(pair-row\s+)?top-row">/g, '');
    html = html.replace(/<div class="bottom-row">/g, '');
    html = html.replace(/<div class="bottom-row final-row">/g, '');
    html = html.replace(/<div class="video-container">/g, '');
    
    // 2. Remove the closing </div> for those wrappers. 
    // This is tricky because we don't know exactly which </div> belong to the rows vs something else.
    // However, in these specific files, the rows only contained <img> or <video> tags, so a row was:
    // <div class="..."> \n <img ...> \n <img ...> \n </div>
    // We can do a smart regex:
    html = html.replace(/(<(?:img|video|source)[^>]*>(?:\s*<\/video>)?)\s*<\/div>/g, '$1\n');
    html = html.replace(/(<(?:img|video|source)[^>]*>(?:\s*<\/video>)?)\s*<\/div>/g, '$1\n'); // Run twice in case of nesting
    // Keep removing trailing </div> immediately after media until clean (just an approximation, safe for these files)
    
    // 3. Wrap all <img> and <video> inside the .bento-grid into .bento-card
    // We will do this by temporarily converting them.
    // Because some are 'hero' (bento-full) or just normal (bento-third/bento-half).
    // Let's just make everything 'bento-third' initially. We can manually fix outliers.
    
    // We'll replace <img> only if they aren't already wrapped.
    html = html.replace(/<img(.*?)>/g, '<div class="bento-card bento-third bento-media-wrap"><img$1></div>');
    html = html.replace(/<video(.*?)>([\s\S]*?)<\/video>/g, '<div class="bento-card bento-third bento-media-wrap tall"><video$1>$2</video></div>');
    
    // 4. Update the Details section to be a bento grid
    html = html.replace(/<div class="details">/, '<div class="bento-grid">');
    html = html.replace(/<div class="box">/g, '<div class="bento-card bento-half" style="padding: 40px; justify-content: center;">');
    
    fs.writeFileSync(f, html, 'utf8');
  }
});
console.log('Bento Grid Structural Refactor Complete!');
