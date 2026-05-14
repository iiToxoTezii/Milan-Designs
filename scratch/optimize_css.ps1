$path = "assets/css/style.css"
$content = Get-Content $path -Raw

# 1. Body Optimization
$oldBody = 'body {
  font-family: ''Inter'', -apple-system, BlinkMacSystemFont, sans-serif;
  background: radial-gradient(circle at top center, #101524 0%, #090b12 50%, #05060a 100%);
  color: #eef2ff;
  overflow-x: hidden;
  min-height: 100vh;
}'
$newBody = 'body {
  font-family: ''Inter'', -apple-system, BlinkMacSystemFont, sans-serif;
  background: radial-gradient(circle at top center, #101524 0%, #090b12 50%, #05060a 100%);
  color: #eef2ff;
  overflow-x: hidden;
  min-height: 100vh;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}'
$content = $content.Replace($oldBody, $newBody)

# 2. Hero Image Optimization
$oldHero = '.hero-image img {
  width: 100%;
  max-width: 480px;
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
  z-index: 2;
  position: relative;
  aspect-ratio: 4/5;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}'
$newHero = '.hero-image img {
  width: 100%;
  max-width: 480px;
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.7);
  z-index: 2;
  position: relative;
  aspect-ratio: 4/5;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  will-change: transform;
}'
$content = $content.Replace($oldHero, $newHero)

# 3. Card Optimization
$oldCard = '  /* Inner rim highlight */
  display: flex;
  flex-direction: column;
}'
$newCard = '  /* Inner rim highlight */
  display: flex;
  flex-direction: column;
  will-change: transform, border-color;
}'
$content = $content.Replace($oldCard, $newCard)

# 4. Mobile Responsiveness
$oldMedia = '@media (max-width: 500px) {
  .bento-grid {
    grid-template-columns: 1fr !important;
  }
}'
$newMedia = '@media (max-width: 500px) {
  .bento-grid {
    grid-template-columns: 1fr !important;
  }
  
  .system-status-bar {
    padding: 8px 12px;
    font-size: 10px;
    gap: 10px;
    justify-content: space-between;
  }
  
  .status-item span {
    display: none;
  }
  
  .status-item#sound-toggle span, 
  .status-item.achievements-trigger span,
  .status-item #live-clock,
  .status-item #achievement-count {
    display: inline;
  }
}'
$content = $content.Replace($oldMedia, $newMedia)

Set-Content $path $content
Write-Host "Optimized style.css for performance and responsiveness."
