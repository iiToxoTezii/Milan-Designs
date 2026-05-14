$path = "assets/css/style.css"
$content = Get-Content $path -Raw

$old = @'
.splash-logo {
  font-family: 'Orbitron', sans-serif;
  font-size: 64px;
  font-weight: 800;
  letter-spacing: 12px;
  color: #ffffff;
  margin-bottom: 40px;
  text-shadow: 0 0 30px rgba(124, 236, 255, 0.6);
  animation: logoPulse 2s ease-in-out infinite;
}

@keyframes logoPulse {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}
'@

$new = @'
.splash-logo {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(80px, 15vw, 140px);
  font-weight: 900;
  color: #fff;
  letter-spacing: 20px;
  position: relative;
  margin-bottom: 50px;
  text-shadow: 0 0 40px rgba(124, 236, 255, 0.4);
  animation: logoReveal 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  will-change: transform, opacity, letter-spacing;
}

.splash-logo::before,
.splash-logo::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  pointer-events: none;
}

.splash-logo::before {
  color: #ff00c1;
  z-index: -1;
  animation: logoGlitch 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
}

.splash-logo::after {
  color: #00fff9;
  z-index: -2;
  animation: logoGlitch 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
}

@keyframes logoReveal {
  0% {
    opacity: 0;
    transform: scale(0.7) translateY(30px);
    letter-spacing: 60px;
    filter: blur(20px);
  }
  30% {
    opacity: 1;
    filter: blur(0px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
    letter-spacing: 20px;
  }
}

@keyframes logoGlitch {
  0% { transform: translate(0); }
  20% { transform: translate(-4px, 2px); }
  40% { transform: translate(-4px, -2px); }
  60% { transform: translate(4px, 2px); }
  80% { transform: translate(4px, -2px); }
  100% { transform: translate(0); }
}
'@

$content = $content.Replace($old, $new)
Set-Content $path $content
Write-Host "Updated splash logo animation in style.css"
