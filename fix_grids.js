const fs = require('fs');

const files = fs.readdirSync('.');

files.forEach(file => {
  if (file.endsWith('.html') && file !== 'index.html' && file !== 'projects.html') {
    let content = fs.readFileSync(file, 'utf8');

    // Fix the missing closing div for the first bento-grid
    // It's always right before `<div class="bento-grid">` that contains `<h2>What I Did</h2>`
    content = content.replace(/(?<!<\/div>\s*)\n(\s*)<div class="bento-grid">\s*<div class="bento-card bento-half"/g, '\n$1</div>\n\n$1<div class="bento-grid">\n$1  <div class="bento-card bento-half"');
    content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<div class="bento-grid">/g, '</div>\n\n    <div class="bento-grid">'); // Cleanup potential double divs by the above replace

    if (file === 'project2.html') {
      content = content.replace(/<div class="bento-card bento-third bento-media-wrap"><img class="hero"/g, '<div class="bento-card bento-twothirds bento-media-wrap"><img class="hero"');
    }

    if (file === 'project3.html') {
      // 10 items.
      // We know there are instances of bento-third. Let's find specific image wrappers and replace.
      // image 1= twothirds
      content = content.replace(/"assets\/images\/project3-1\.jpg"/, '"assets/images/project3-1.jpg"');
      content = content.replace(/<div class="bento-card bento-third bento-media-wrap"><img src="assets\/images\/project3-1\.jpg"/, '<div class="bento-card bento-twothirds bento-media-wrap"><img src="assets/images/project3-1.jpg"');
      
      // images 4 and 5 are half (which are project3-4 and project3-5) No wait, project3-3 is image 3.
      // Row 1: 3-1, 3-video (twothirds + third)
      // Row 2: 3-2, 3-3, 3-4 (third + third + third) -> wait, there are 10 items.
      // items: 3-1, 3-video, 3-2, 3-3, 3-4, 3-5, 3-6, 3-7, 3-8, 3-9.
      content = content.replace(/<div class="bento-card bento-third bento-media-wrap"><img src="assets\/images\/project3-5\.jpg"/, '<div class="bento-card bento-half bento-media-wrap"><img src="assets/images/project3-5.jpg"');
      content = content.replace(/<div class="bento-card bento-third bento-media-wrap"><img src="assets\/images\/project3-6\.jpg"/, '<div class="bento-card bento-half bento-media-wrap"><img src="assets/images/project3-6.jpg"');
    }

    if (file === 'project4.html' || file === 'project5.html') {
      content = content.replace(/bento-third/g, 'bento-center-video');
      content = content.replace(/tall/g, 'vertical-video');
    }

    if (file === 'project6.html' || file === 'project7.html') {
      content = content.replace(/bento-third/g, 'bento-center-video');
      content = content.replace(/tall/g, 'vertical-video');
      // For watch btn fix maybe? The watch-btn is already outside which is okay.
      // Make sure the modal video class is also updated though it's bento-center-video, we can just leave it since it's hidden or we can use another class. 
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed', file);
  }
});
