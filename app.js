function getTimeIn(timezone) {
  return new Date().toLocaleTimeString('en-GB', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function updateClocks() {
  document.getElementById('capetown-time').textContent = getTimeIn('Africa/Johannesburg');
  document.getElementById('ottawa-time').textContent = getTimeIn('America/Toronto');
}

updateClocks();
setInterval(updateClocks, 1000);
