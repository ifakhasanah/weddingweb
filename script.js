const cover = document.getElementById('cover');
const invitation = document.getElementById('invitation');
const openButton = document.getElementById('openInvitation');
const musicToggle = document.getElementById('musicToggle');
const audio = document.getElementById('backgroundMusic');

// Optional URL parameter: ?to=Nama%20Tamu
const params = new URLSearchParams(window.location.search);
const guest = params.get('to');
if (guest) {
  document.getElementById('guestName').textContent = guest;
  document.title = `Undangan untuk ${guest} — Alya & Raka`;
}

openButton.addEventListener('click', () => {
  cover.classList.add('is-hidden');
  invitation.classList.remove('is-hidden');
  musicToggle.classList.remove('is-hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Change this date to your actual wedding date/time. Month index is zero-based.
const weddingDate = new Date(2026, 10, 21, 9, 0, 0).getTime();
function updateCountdown() {
  const remaining = Math.max(0, weddingDate - Date.now());
  const values = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000)
  };
  Object.entries(values).forEach(([id, value]) => {
    document.getElementById(id).textContent = String(value).padStart(2, '0');
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Add your own music file URL to the audio source in index.html to enable playback.
musicToggle.addEventListener('click', async () => {
  if (!audio.querySelector('source').src) {
    alert('Tambahkan file musik MP3 ke elemen audio di index.html untuk mengaktifkan musik.');
    return;
  }
  try {
    if (audio.paused) {
      await audio.play();
      musicToggle.classList.add('playing');
    } else {
      audio.pause();
      musicToggle.classList.remove('playing');
    }
  } catch (error) {
    alert('Musik belum dapat diputar. Periksa file audio yang digunakan.');
  }
});

const form = document.getElementById('rsvpForm');
const success = document.getElementById('formSuccess');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  // Demo only: no data is uploaded or stored on a server.
  try { sessionStorage.setItem('ourweds-rsvp-demo', JSON.stringify(data)); } catch (_) {}
  form.classList.add('is-hidden');
  success.classList.remove('is-hidden');
});
document.getElementById('editRsvp').addEventListener('click', () => {
  success.classList.add('is-hidden');
  form.classList.remove('is-hidden');
});
