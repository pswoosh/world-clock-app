function getTimeIn(timezone) {
  return new Date().toLocaleTimeString('en-GB', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function formatWithBlinkingColons(timeStr) {
  return timeStr.replace(/:/g, '<span class="colon">:</span>');
}

function updateClocks() {
  document.getElementById('capetown-time').innerHTML = formatWithBlinkingColons(getTimeIn('Africa/Johannesburg'));
  document.getElementById('ottawa-time').innerHTML = formatWithBlinkingColons(getTimeIn('America/Toronto'));
}

updateClocks();
setInterval(updateClocks, 1000);

// Spray paint splatter on click
const sprayColors = ['#ff206e', '#00ff88', '#ffd60a', '#00b4d8', '#ff6b6b', '#c77dff'];

document.addEventListener('click', (e) => {
  // Don't spray on the cards
  if (e.target.closest('.clock-card')) return;

  const count = Math.floor(Math.random() * 8) + 6;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    const size = Math.random() * 14 + 4;
    const color = sprayColors[Math.floor(Math.random() * sprayColors.length)];
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 60;
    const x = e.clientX + Math.cos(angle) * dist;
    const y = e.clientY + Math.sin(angle) * dist;

    dot.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${color};
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      z-index: 5;
      opacity: 0.85;
      box-shadow: 0 0 ${size}px ${color}66;
      transition: opacity 3s ease-out, transform 2s ease-out;
    `;
    document.body.appendChild(dot);

    // Drip down effect for some dots
    const shouldDrip = Math.random() > 0.5;
    requestAnimationFrame(() => {
      dot.style.opacity = '0.2';
      if (shouldDrip) {
        dot.style.transform = `translateY(${Math.random() * 60 + 20}px) scaleY(${Math.random() * 2 + 1.5})`;
      }
    });

    setTimeout(() => dot.remove(), 4000);
  }

  // Spray sound effect via CSS animation on spray can
  const can = document.querySelector('.spray-can');
  if (can) {
    can.style.transform = 'scale(1.3) rotate(-20deg)';
    setTimeout(() => can.style.transform = '', 200);
  }
});
