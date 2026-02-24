/* ============================================================
   QR CODE GENERATOR – App Logic
   ============================================================ */
let currentPlatform = { name: 'Instagram', prefix: 'https://instagram.com/', color: '#E1306C' };
let generatedURL = '';

const platformBtns    = document.querySelectorAll('.platform-btn');
const prefixLabel     = document.getElementById('prefixLabel');
const usernameInput   = document.getElementById('usernameInput');
const generateBtn     = document.getElementById('generateBtn');
const outputSection   = document.getElementById('outputSection');
const qrCanvas        = document.getElementById('qrCanvas');
const qrPlatformLabel = document.getElementById('qrPlatformLabel');
const qrUrlLabel      = document.getElementById('qrUrlLabel');
const downloadBtn     = document.getElementById('downloadBtn');
const copyBtn         = document.getElementById('copyBtn');
const toast           = document.getElementById('toast');
const sizeSelect      = document.getElementById('sizeSelect');
const ecSelect        = document.getElementById('ecSelect');

platformBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    platformBtns.forEach(b => { b.classList.remove('active'); b.style.setProperty('--platform-color',''); });
    btn.classList.add('active');
    btn.style.setProperty('--platform-color', btn.dataset.color);
    const isCustom = btn.dataset.platform === 'custom';
    currentPlatform = { name: btn.textContent.trim(), prefix: btn.dataset.prefix, color: btn.dataset.color };
    prefixLabel.textContent     = isCustom ? '🔗 URL: ' : btn.dataset.prefix;
    usernameInput.placeholder   = isCustom ? 'https://example.com' : 'dein_username';
    outputSection.style.display = 'none';
    usernameInput.focus();
  });
});
document.querySelector('.platform-btn.active').style.setProperty('--platform-color','#E1306C');

generateBtn.addEventListener('click', generateQR);
usernameInput.addEventListener('keydown', e => { if (e.key === 'Enter') generateQR(); });

function generateQR() {
  const input = usernameInput.value.trim();
  if (!input) {
    usernameInput.style.outline = '2px solid #f56565';
    usernameInput.focus();
    setTimeout(() => usernameInput.style.outline = '', 1500);
    return;
  }
  generatedURL = currentPlatform.prefix === '' ? input : currentPlatform.prefix + input;
  QRCode.toCanvas(qrCanvas, generatedURL, {
    width: parseInt(sizeSelect.value), margin: 2,
    errorCorrectionLevel: ecSelect.value,
    color: { dark: '#000000', light: '#ffffff' }
  }, err => {
    if (err) return console.error(err);
    qrPlatformLabel.textContent    = currentPlatform.name.trim();
    qrUrlLabel.textContent         = generatedURL;
    outputSection.style.display    = 'flex';
    outputSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

downloadBtn.addEventListener('click', () => {
  const a    = document.createElement('a');
  a.download = `qrcode_${currentPlatform.name.replace(/[^a-zA-Z0-9]/g,'_').toLowerCase()}.png`;
  a.href     = qrCanvas.toDataURL('image/png');
  a.click();
});

copyBtn.addEventListener('click', () => {
  if (!generatedURL) return;
  navigator.clipboard.writeText(generatedURL)
    .then(() => showToast('✅ URL kopiert!'))
    .catch(() => { fallbackCopy(generatedURL); showToast('✅ URL kopiert!'); });
});

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text; document.body.appendChild(ta); ta.select();
  document.execCommand('copy'); document.body.removeChild(ta);
}
function showToast(msg, color = '#22c55e') {
  toast.textContent = msg; toast.style.background = color;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}