$files = Get-ChildItem -Filter *.html

$newHead = @"
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Milan Jain | Futuristic Graphic Designer</title>

  <meta name="description" content="Explore the Anti Gravity archives. A premium portfolio showcasing futuristic brand identities and digital experiences by Milan Jain.">
  <link rel="icon" type="image/png" href="assets/images/favicon.png">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://milanjain.design/">
  <meta property="og:title" content="Milan Jain | Futuristic Graphic Designer">
  <meta property="og:description" content="Explore the Anti Gravity archives. High-end branding and cinematic digital experiences.">
  <meta property="og:image" content="assets/images/social-preview.png">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://milanjain.design/">
  <meta property="twitter:title" content="Milan Jain | Futuristic Graphic Designer">
  <meta property="twitter:description" content="Explore the Anti Gravity archives. High-end branding and cinematic digital experiences.">
  <meta property="twitter:image" content="assets/images/social-preview.png">
"@

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace everything from <meta charset to before the first <link or <style
    # This cleans up old/redundant meta tags
    $content = [regex]::Replace($content, '(?s)<meta charset="UTF-8" />.*?<link', "$newHead`n  <link")

    Set-Content $file.FullName $content
    Write-Host "Perfected SEO and Meta Tags for $($file.Name)"
}
