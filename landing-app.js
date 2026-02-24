/* ============================================================
   LANDING PAGE BUILDER – App Logic + URL Share System
   ============================================================ */

const PLATFORMS = [
  { id:'instagram', label:'Instagram', icon:'fab fa-instagram', color:'#E1306C', prefix:'https://instagram.com/' },
  { id:'facebook',  label:'Facebook',  icon:'fab fa-facebook',  color:'#1877F2', prefix:'https://facebook.com/' },
  { id:'twitter',   label:'X/Twitter', icon:'fab fa-x-twitter', color:'#000',    prefix:'https://x.com/' },
  { id:'tiktok',    label:'TikTok',    icon:'fab fa-tiktok',    color:'#010101', prefix:'https://tiktok.com/@' },
  { id:'youtube',   label:'YouTube',   icon:'fab fa-youtube',   color:'#FF0000', prefix:'https://youtube.com/@' },
  { id:'linkedin',  label:'LinkedIn',  icon:'fab fa-linkedin',  color:'#0A66C2', prefix:'https://linkedin.com/in/' },
  { id:'pinterest', label:'Pinterest', icon:'fab fa-pinterest', color:'#E60023', prefix:'https://pinterest.com/' },
  { id:'snapchat',  label:'Snapchat',  icon:'fab fa-snapchat',  color:'#FFFC00', prefix:'https://snapchat.com/add/' },
  { id:'whatsapp',  label:'WhatsApp',  icon:'fab fa-whatsapp',  color:'#25D366', prefix:'https://wa.me/' },
  { id:'telegram',  label:'Telegram',  icon:'fab fa-telegram',  color:'#229ED9', prefix:'https://t.me/' },
  { id:'github',    label:'GitHub',    icon:'fab fa-github',    color:'#181717', prefix:'https://github.com/' },
  { id:'spotify',   label:'Spotify',   icon:'fab fa-spotify',   color:'#1DB954', prefix:'https://open.spotify.com/user/' },
  { id:'twitch',    label:'Twitch',    icon:'fab fa-twitch',    color:'#9146FF', prefix:'https://twitch.tv/' },
  { id:'discord',   label:'Discord',   icon:'fab fa-discord',   color:'#5865F2', prefix:'https://discord.gg/' },
  { id:'website',   label:'Website',   icon:'fas fa-globe',     color:'#6C63FF', prefix:'' },
  { id:'email',     label:'E-Mail',    icon:'fas fa-envelope',  color:'#38b2ac', prefix:'mailto:' },
  { id:'custom',    label:'Custom',    icon:'fas fa-link',      color:'#718096', prefix:'' },
];

let state = {
  profile: { name:'', bio:'', badge:'', avatarUrl:'', verified:false },
  links:   [],
  design:  { theme:'dark', btnStyle:'rounded', accentColor:'#6C63FF', avatarShape:'circle', animations:true },
  editingLinkIndex: null,
};
let currentShareUrl = '';
let shareQrSize     = 150;

// ── DOM ──
const profileName    = document.getElementById('profileName');
const profileBio     = document.getElementById('profileBio');
const profileBadge   = document.getElementById('profileBadge');
const avatarUrlInp   = document.getElementById('avatarUrl');
const showVerified   = document.getElementById('showVerified');
const bioCount       = document.getElementById('bioCount');
const accentColor    = document.getElementById('accentColor');
const enableAnim     = document.getElementById('enableAnimations');
const linksList      = document.getElementById('linksList');
const addLinkBtn     = document.getElementById('addLinkBtn');
const preview        = document.getElementById('landingPreview');
const deviceFrame    = document.getElementById('deviceFrame');
const toast          = document.getElementById('builderToast');
const modalOverlay   = document.getElementById('modalOverlay');
const modalClose     = document.getElementById('modalClose');
const modalCancel    = document.getElementById('modalCancel');
const modalConfirm   = document.getElementById('modalConfirm');
const modalLabel     = document.getElementById('modalLabel');
const modalUrl       = document.getElementById('modalUrl');
const modalPlatGrid  = document.getElementById('modalPlatformGrid');
const exportHtmlBtn  = document.getElementById('exportHtmlBtn');
const previewOpenBtn = document.getElementById('previewOpenBtn');
const generateShareUrl = document.getElementById('generateShareUrl');
const shareUrlBox      = document.getElementById('shareUrlBox');
const shareUrlDisplay  = document.getElementById('shareUrlDisplay');
const copyShareUrl     = document.getElementById('copyShareUrl');
const openShareUrl     = document.getElementById('openShareUrl');
const shareQrCanvas    = document.getElementById('shareQrCanvas');
const shareQrDownload  = document.getElementById('shareQrDownload');
const nativeShareBtn   = document.getElementById('nativeShareBtn');

// ── Tabs ──
function activateTab(name) {
  document.querySelectorAll('.etab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelector(`.etab[data-tab="${name}"]`)?.classList.add('active');
  document.getElementById('tab-' + name)?.classList.add('active');
}
document.querySelectorAll('.etab').forEach(t => t.addEventListener('click', () => activateTab(t.dataset.tab)));
document.getElementById('goToShareTabBtn')?.addEventListener('click',  () => activateTab('share'));
document.getElementById('goToShareTabBtn2')?.addEventListener('click', () => activateTab('share'));

// ── Profile ──
profileName.addEventListener('input',   () => { state.profile.name      = profileName.value;   render(); });
profileBio.addEventListener('input',    () => { state.profile.bio       = profileBio.value;    bioCount.textContent = `${profileBio.value.length} / 160`; render(); });
profileBadge.addEventListener('input',  () => { state.profile.badge     = profileBadge.value;  render(); });
avatarUrlInp.addEventListener('input',  () => { state.profile.avatarUrl = avatarUrlInp.value;  render(); });
showVerified.addEventListener('change', () => { state.profile.verified  = showVerified.checked; render(); });

// ── Design ──
document.querySelectorAll('.theme-swatch').forEach(s => {
  s.addEventListener('click', () => {
    document.querySelectorAll('.theme-swatch').forEach(x => x.classList.remove('active'));
    s.classList.add('active'); state.design.theme = s.dataset.theme; render();
  });
});
document.querySelectorAll('#btnStyleGrid .bstyle-btn').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('#btnStyleGrid .bstyle-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active'); state.design.btnStyle = b.dataset.style; render();
  });
});
document.querySelectorAll('#avatarShapeGrid .bstyle-btn').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('#avatarShapeGrid .bstyle-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active'); state.design.avatarShape = b.dataset.shape; render();
  });
});
accentColor.addEventListener('input',  () => { state.design.accentColor = accentColor.value; render(); });
enableAnim.addEventListener('change',  () => { state.design.animations  = enableAnim.checked; render(); });

// ── Device Toggle ──
document.querySelectorAll('.device-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    deviceFrame.className = 'device-frame ' + btn.dataset.device;
  });
});

// ── QR Size (Share Tab) ──
document.querySelectorAll('[data-sqrsize]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-sqrsize]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    shareQrSize = parseInt(btn.dataset.sqrsize);
    if (currentShareUrl) generateShareQR(currentShareUrl);
  });
});

// ══════════════════════════════════════════════════════════════
//  URL SHARE SYSTEM
// ══════════════════════════════════════════════════════════════
function buildPageUrl() {
  const payload = { profile: state.profile, links: state.links, design: state.design };
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
  const base    = window.location.href.split('?')[0].replace('landing-builder.html','landing-view.html');
  return `${base}?page=${encoded}`;
}

generateShareUrl.addEventListener('click', () => {
  if (!state.profile.name && state.links.length === 0) {
    showToast('⚠️ Füge zuerst einen Namen oder Links hinzu!', '#f6ad55'); return;
  }
  currentShareUrl               = buildPageUrl();
  shareUrlDisplay.value         = currentShareUrl;
  openShareUrl.href             = currentShareUrl;
  previewOpenBtn.href           = currentShareUrl;
  previewOpenBtn.style.display  = 'flex';
  shareUrlBox.style.display     = 'flex';
  generateShareQR(currentShareUrl);
  window.history.replaceState(null, '', '?config=' + new URL(currentShareUrl).searchParams.get('page'));
  showToast('✅ URL generiert!');
  shareUrlBox.scrollIntoView({ behavior:'smooth', block:'nearest' });
});

function generateShareQR(url) {
  QRCode.toCanvas(shareQrCanvas, url, {
    width: shareQrSize, margin: 2, errorCorrectionLevel: 'M',
    color: { dark:'#000000', light:'#ffffff' }
  }, err => { if (err) console.error(err); });
}

copyShareUrl.addEventListener('click', () => {
  if (!currentShareUrl) return;
  navigator.clipboard.writeText(currentShareUrl)
    .then(() => showToast('✅ URL kopiert!'))
    .catch(() => { fallbackCopy(currentShareUrl); showToast('✅ URL kopiert!'); });
});

shareQrDownload.addEventListener('click', () => {
  const a    = document.createElement('a');
  a.download = `qrcode_${(state.profile.name||'landing').replace(/\s+/g,'-').toLowerCase()}.png`;
  a.href     = shareQrCanvas.toDataURL('image/png');
  a.click(); showToast('✅ QR-Code gespeichert!');
});

// ── Social Share ──
function needUrl() { showToast('⚠️ Klicke zuerst auf "URL generieren"!','#f6ad55'); activateTab('share'); }
document.getElementById('shareWhatsapp').addEventListener('click', () => {
  if (!currentShareUrl) return needUrl();
  window.open(`https://wa.me/?text=${encodeURIComponent(`🔗 ${state.profile.name||'Meine'} – alle Links: ${currentShareUrl}`)}`, '_blank');
});
document.getElementById('shareTelegram').addEventListener('click', () => {
  if (!currentShareUrl) return needUrl();
  window.open(`https://t.me/share/url?url=${encodeURIComponent(currentShareUrl)}&text=${encodeURIComponent(`🔗 ${state.profile.name||'Meine'} – alle Links`)}`, '_blank');
});
document.getElementById('shareTwitter').addEventListener('click', () => {
  if (!currentShareUrl) return needUrl();
  window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(`🔗 ${state.profile.name||'Meine'} – alle Links`)}&url=${encodeURIComponent(currentShareUrl)}`, '_blank');
});
document.getElementById('shareEmail').addEventListener('click', () => {
  if (!currentShareUrl) return needUrl();
  window.open(`mailto:?subject=${encodeURIComponent(`${state.profile.name||'Meine'} Landing Page`)}&body=${encodeURIComponent(`Hier sind alle meine Links:\n\n${currentShareUrl}`)}`, '_blank');
});

// ── Native Share (Mobile) ──
if (navigator.share) {
  nativeShareBtn.style.display = 'flex';
  nativeShareBtn.addEventListener('click', async () => {
    if (!currentShareUrl) return needUrl();
    try { await navigator.share({ title: `${state.profile.name||'Meine'} – Links`, text: state.profile.bio||'Alle meine Links', url: currentShareUrl }); }
    catch(e) {}
  });
}

// ══════════════════════════════════════════════════════════════
//  MODAL
// ══════════════════════════════════════════════════════════════
let selectedPlatform = PLATFORMS[0];
PLATFORMS.forEach((p, idx) => {
  const btn = document.createElement('button');
  btn.className = 'modal-platform-btn' + (idx === 0 ? ' selected' : '');
  btn.innerHTML = `<i class="${p.icon}" style="color:${p.color}"></i>${p.label}`;
  btn.addEventListener('click', () => {
    document.querySelectorAll('.modal-platform-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected'); selectedPlatform = p;
    if (!modalLabel.value) modalLabel.value = p.label + ' folgen';
    if (!modalUrl.value && p.prefix) modalUrl.value = p.prefix;
  });
  modalPlatGrid.appendChild(btn);
});

addLinkBtn.addEventListener('click', () => openModal(null));
function openModal(index) {
  state.editingLinkIndex = index;
  if (index !== null) {
    const link = state.links[index];
    const plat = PLATFORMS.find(p => p.id === link.platformId) || PLATFORMS[PLATFORMS.length-1];
    selectedPlatform = plat;
    document.querySelectorAll('.modal-platform-btn').forEach((b,i) => b.classList.toggle('selected', i === PLATFORMS.indexOf(plat)));
    modalLabel.value = link.label; modalUrl.value = link.url;
    document.getElementById('modalTitle').textContent = 'Link bearbeiten';
    modalConfirm.textContent = 'Speichern';
  } else {
    selectedPlatform = PLATFORMS[0];
    document.querySelectorAll('.modal-platform-btn').forEach((b,i) => b.classList.toggle('selected', i === 0));
    modalLabel.value = ''; modalUrl.value = '';
    document.getElementById('modalTitle').textContent = 'Link hinzufügen';
    modalConfirm.textContent = 'Hinzufügen';
  }
  modalOverlay.classList.add('open');
  setTimeout(() => modalLabel.focus(), 100);
}
function closeModal() { modalOverlay.classList.remove('open'); }
modalClose.addEventListener('click',   closeModal);
modalCancel.addEventListener('click',  closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
modalConfirm.addEventListener('click', () => {
  const label = modalLabel.value.trim(), url = modalUrl.value.trim();
  if (!label || !url) { showToast('⚠️ Bitte Label und URL ausfüllen!','#f56565'); return; }
  const d = { platformId: selectedPlatform.id, label, url };
  if (state.editingLinkIndex !== null) state.links[state.editingLinkIndex] = d;
  else state.links.push(d);
  closeModal(); renderLinksList(); render();
});

// ── Render Links List ──
function renderLinksList() {
  linksList.innerHTML = '';
  state.links.forEach((link, i) => {
    const plat = PLATFORMS.find(p => p.id === link.platformId) || PLATFORMS[PLATFORMS.length-1];
    const item = document.createElement('div');
    item.className = 'link-item';
    item.innerHTML = `
      <span class="link-item-icon"><i class="${plat.icon}" style="color:${plat.color}"></i></span>
      <div class="link-item-info">
        <div class="link-item-label">${escHtml(link.label)}</div>
        <div class="link-item-url">${escHtml(link.url)}</div>
      </div>
      <div class="link-item-actions">
        <button class="link-item-btn edit"   title="Bearbeiten"><i class="fas fa-pen"></i></button>
        <button class="link-item-btn delete" title="Löschen"><i class="fas fa-trash"></i></button>
      </div>`;
    item.querySelector('.edit').addEventListener('click',   () => openModal(i));
    item.querySelector('.delete').addEventListener('click', () => { state.links.splice(i,1); renderLinksList(); render(); });
    linksList.appendChild(item);
  });
}

// ── Render Preview ──
function render() {
  const { profile, links, design } = state;
  const avatarSrc = profile.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name||'You')}&background=6C63FF&color=fff&size=200`;
  const linksHTML = links.map((link, i) => {
    const plat  = PLATFORMS.find(p => p.id === link.platformId) || PLATFORMS[PLATFORMS.length-1];
    const delay = design.animations ? `animation-delay:${i*0.08}s` : '';
    const bg    = design.btnStyle === 'outline'
      ? `background:transparent;color:${design.accentColor};border:2px solid ${design.accentColor};`
      : `background:${design.accentColor};`;
    return `<a href="${escHtml(link.url)}" target="_blank"
      class="lp-link-btn style-${design.btnStyle}" style="${bg}${delay}">
      <i class="${plat.icon} lp-link-icon"></i>
      <span class="lp-link-label">${escHtml(link.label)}</span>
      <i class="fas fa-chevron-right lp-link-arrow"></i>
    </a>`;
  }).join('');
  preview.className = `landing-page theme-${design.theme}`;
  preview.innerHTML = `
    <div class="lp-avatar-wrap">
      <img class="lp-avatar shape-${design.avatarShape}" src="${escHtml(avatarSrc)}" alt="Avatar"
           onerror="this.src='https://ui-avatars.com/api/?name=You&background=6C63FF&color=fff&size=200'"/>
      ${profile.verified ? '<span class="lp-verified"><i class="fas fa-check"></i></span>' : ''}
    </div>
    ${profile.name  ? `<div class="lp-name">${escHtml(profile.name)}</div>` : '<div class="lp-name" style="opacity:0.3">Dein Name</div>'}
    ${profile.badge ? `<span class="lp-badge">${escHtml(profile.badge)}</span>` : ''}
    ${profile.bio   ? `<p class="lp-bio">${escHtml(profile.bio)}</p>` : ''}
    <div class="lp-links ${design.animations ? 'animated' : ''}">
      ${links.length > 0 ? linksHTML : '<p style="opacity:0.3;font-size:0.85rem;text-align:center;padding:1rem">← Füge Links im Editor hinzu</p>'}
    </div>
    <div class="lp-footer">Erstellt mit SocialTools © 2026</div>`;
}

// ── HTML Export ──
exportHtmlBtn.addEventListener('click', () => {
  const blob = new Blob([generateStandaloneHTML()], { type:'text/html' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = `${(state.profile.name||'landing-page').replace(/\s+/g,'-').toLowerCase()}.html`;
  a.click(); URL.revokeObjectURL(url);
  showToast('✅ HTML exportiert!');
});

function generateStandaloneHTML() {
  const { profile, links, design } = state;
  const avatarSrc = profile.avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name||'You')}&background=6C63FF&color=fff&size=200`;
  const ICONS = { instagram:'fab fa-instagram',facebook:'fab fa-facebook',twitter:'fab fa-x-twitter',tiktok:'fab fa-tiktok',youtube:'fab fa-youtube',linkedin:'fab fa-linkedin',pinterest:'fab fa-pinterest',snapchat:'fab fa-snapchat',whatsapp:'fab fa-whatsapp',telegram:'fab fa-telegram',github:'fab fa-github',spotify:'fab fa-spotify',twitch:'fab fa-twitch',discord:'fab fa-discord',website:'fas fa-globe',email:'fas fa-envelope',custom:'fas fa-link' };
  const linksHTML = links.map(l => {
    const icon = ICONS[l.platformId]||'fas fa-link';
    const bg   = design.btnStyle==='outline' ? `background:transparent;color:${design.accentColor};border:2px solid ${design.accentColor};` : `background:${design.accentColor};`;
    return `<a href="${escHtml(l.url)}" target="_blank" class="lp-btn style-${design.btnStyle}" style="${bg}"><i class="${icon}"></i><span>${escHtml(l.label)}</span><i class="fas fa-chevron-right arr"></i></a>`;
  }).join('');
  const themes = { dark:'body{background:linear-gradient(160deg,#1a1a2e,#2d1b3d);color:#fff}',ocean:'body{background:linear-gradient(160deg,#0f2027,#203a43,#2c5364);color:#fff}',forest:'body{background:linear-gradient(160deg,#134e5e,#71b280);color:#fff}',sunset:'body{background:linear-gradient(160deg,#f7971e,#ffd200);color:#1a1a2e}',purple:'body{background:linear-gradient(160deg,#4a00e0,#8e2de2);color:#fff}',rose:'body{background:linear-gradient(160deg,#f953c6,#b91d73);color:#fff}',mint:'body{background:linear-gradient(160deg,#00b09b,#96c93d);color:#1a1a2e}',light:'body{background:linear-gradient(160deg,#f5f7fa,#c3cfe2);color:#1a1a2e}' };
  return `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${escHtml(profile.name||'My Links')}</title><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/><style>*{box-sizing:border-box;margin:0;padding:0}${themes[design.theme]||themes.dark}body{font-family:'Segoe UI',sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem 1rem}.page{display:flex;flex-direction:column;align-items:center;gap:1rem;max-width:420px;width:100%}.av-wrap{position:relative;display:inline-block}.av{width:110px;height:110px;object-fit:cover;border:3px solid rgba(255,255,255,.4);box-shadow:0 8px 30px rgba(0,0,0,.3)}.shape-circle{border-radius:50%}.shape-square{border-radius:14px}.shape-hexagon{clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)}.verified{position:absolute;bottom:4px;right:4px;background:#1d9bf0;color:#fff;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:.75rem;border:2px solid white}.name{font-size:1.6rem;font-weight:800;text-align:center}.badge{font-size:.75rem;font-weight:700;padding:.28rem .85rem;border-radius:20px;background:rgba(255,255,255,.18);text-transform:uppercase;letter-spacing:.07em}.bio{font-size:.92rem;text-align:center;opacity:.8;max-width:320px;line-height:1.6}.links{width:100%;display:flex;flex-direction:column;gap:.75rem}.lp-btn{display:flex;align-items:center;gap:.75rem;width:100%;padding:.9rem 1.3rem;text-decoration:none;font-size:.95rem;font-weight:700;color:#fff;transition:transform .2s,box-shadow .2s,filter .2s}.lp-btn:hover{transform:translateY(-3px);box-shadow:0 12px 28px rgba(0,0,0,.3);filter:brightness(1.1)}.style-rounded{border-radius:14px}.style-pill{border-radius:50px}.style-sharp{border-radius:0}.style-outline{background:transparent!important;border:2px solid currentColor}.lp-btn i{font-size:1.15rem;width:26px;text-align:center}.lp-btn span{flex:1;text-align:center}.arr{font-size:.8rem;opacity:.6}.footer{font-size:.72rem;opacity:.35;margin-top:1rem}</style></head><body><div class="page"><div class="av-wrap"><img class="av shape-${design.avatarShape}" src="${escHtml(avatarSrc)}" alt="Avatar"/>${profile.verified?'<span class="verified"><i class="fas fa-check"></i></span>':''}</div>${profile.name?`<div class="name">${escHtml(profile.name)}</div>`:''} ${profile.badge?`<span class="badge">${escHtml(profile.badge)}</span>`:''} ${profile.bio?`<p class="bio">${escHtml(profile.bio)}</p>`:''}<div class="links">${linksHTML}</div><div class="footer">Erstellt mit SocialTools © 2026</div></div></body></html>`;
}

// ── Load Config from URL ──
(function() {
  const cfg = new URLSearchParams(window.location.search).get('config');
  if (!cfg) return;
  try {
    const parsed = JSON.parse(decodeURIComponent(escape(atob(cfg))));
    state = { ...state, ...parsed };
    profileName.value    = state.profile.name     || '';
    profileBio.value     = state.profile.bio      || '';
    profileBadge.value   = state.profile.badge    || '';
    avatarUrlInp.value   = state.profile.avatarUrl|| '';
    showVerified.checked = !!state.profile.verified;
    bioCount.textContent = `${(state.profile.bio||'').length} / 160`;
    accentColor.value    = state.design.accentColor || '#6C63FF';
    enableAnim.checked   = state.design.animations !== false;
    renderLinksList(); showToast('✅ Konfiguration geladen!');
  } catch(e) { console.warn('Config konnte nicht geladen werden.'); }
})();

// ── Helpers ──
function escHtml(s) { return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fallbackCopy(t) { const ta=document.createElement('textarea'); ta.value=t; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); }
function showToast(msg, color='#22c55e') { toast.textContent=msg; toast.style.background=color; toast.classList.add('show'); setTimeout(()=>toast.classList.remove('show'),2800); }

render();