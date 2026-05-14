$files = Get-ChildItem -Filter *.html

$metaTags = @"
  <!-- SEO & SOCIAL PREVIEW -->
  <title>Vilen Jain | Futuristic Graphic Designer</title>
  <meta name="description" content="Explore the Anti Gravity archives. A premium portfolio showcasing futuristic brand identities and digital experiences.">
  <link rel="icon" type="image/png" href="assets/images/favicon.png">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://milanjain.design/">
  <meta property="og:title" content="Vilen Jain | Futuristic Graphic Designer">
  <meta property="og:description" content="Explore the Anti Gravity archives. High-end branding and digital experiences.">
  <meta property="og:image" content="assets/images/social-preview.png">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://milanjain.design/">
  <meta property="twitter:title" content="Vilen Jain | Futuristic Graphic Designer">
  <meta property="twitter:description" content="Explore the Anti Gravity archives. High-end branding and digital experiences.">
  <meta property="twitter:image" content="assets/images/social-preview.png">
"@

$navLogo = @"
    <div class="logo" style="display: flex; align-items: center; gap: 10px; cursor: pointer;" onclick="window.location.href='index.html'">
      <svg viewBox="0 0 100 100" style="width: 32px; height: 32px; filter: drop-shadow(0 0 8px rgba(124, 236, 255, 0.5));">
        <path fill="none" stroke="#fff" stroke-width="8" d="M20 75 V25 L50 55 L80 25 V75" />
        <path fill="none" stroke="#7cecff" stroke-width="8" d="M35 25 H60 C80 25 80 75 60 75 H35" />
      </svg>
      <span style="font-size: 18px; letter-spacing: 2px;">MD</span>
    </div>
"@

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # 1. Inject Meta Tags into <head>
    if ($content -notmatch "og:image") {
        $content = $content -replace '<head>', "<head>`n$metaTags"
    }
    
    # 2. Update Nav Logo
    $content = $content -replace '<div class="logo">MD</div>', $navLogo
    $content = $content -replace '<div class="logo">MD// STUDIO</div>', $navLogo
    $content = $content -replace '<div class="logo">MD // STUDIO</div>', $navLogo

    Set-Content $file.FullName $content
    Write-Host "Updated SEO and Branding for $($file.Name)"
}
