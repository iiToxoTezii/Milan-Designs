$path = "index.html"
$content = Get-Content $path -Raw

$old = @'
          <path class="logo-path m-path" d="M20 75 V25 L50 55 L80 25 V75" />
          <path class="logo-path d-path" d="M35 25 H60 C80 25 80 75 60 75 H35" />
          <path class="logo-path logo-frame" d="M5 5 H95 V95 H5 Z" />
'@

$new = @'
          <path class="logo-path m-path" d="M15 75 V25 L50 55 L85 25 V75" />
          <path class="logo-path d-path" d="M30 25 H60 C85 25 85 75 60 75 H30" />
          <path class="logo-path logo-frame" d="M5 5 H95 V95 H5 Z" />
'@

$content = $content.Replace($old, $new)
Set-Content $path $content
Write-Host "Updated SVG paths in index.html for symmetry."
