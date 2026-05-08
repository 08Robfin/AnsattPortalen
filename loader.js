/* loader.js - henter content.json og populerer siden */

const ICONS = {
  clock: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M9 5v4l2.5 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  money: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="5" width="14" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="9.5" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M5 5V4M13 5V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  calendar: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="12" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M6 2v3M12 2v3M2 8h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  lock: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="4" y="8" width="10" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M6 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  warning: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L2 14.5h14L9 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 8v3M9 13v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  printer: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="6" width="12" height="8" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M5 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" stroke="currentColor" stroke-width="1.5"/><rect x="5" y="10" width="8" height="1.5" rx="0.75" fill="currentColor"/></svg>`,
  network: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 9a3.5 3.5 0 0 1 7 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="12.5" r="1" fill="currentColor"/></svg>`,
  mail: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M2 6l7 4 7-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  arrow: `<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};

const STATUS_LABELS = { ok: 'Operativ', warn: 'Begrenset', error: 'Nede' };
const STATUS_PRIORITY_LABELS = { Kritisk: 'kritisk', Hoy: 'hoy', Normal: 'normal', Lav: 'lav' };

async function loadContent() {
  try {
    const resp = await fetch('content.json');
    if (!resp.ok) throw new Error('Kunne ikke laste innhold');
    return await resp.json();
  } catch (e) {
    console.error('Feil ved lasting av content.json:', e);
    return null;
  }
}

function renderAnnouncement(data, el) {
  if (!el || !data.announcement) return;
  const a = data.announcement;
  el.innerHTML = `&#9888; ${a.text} <a href="${a.linkHref}">${a.linkText}</a>`;
}

function renderStatusStrip(data, el) {
  if (!el) return;
  const label = `<span class="status-strip-label">Status:</span>`;
  const items = data.systemStatus.map(s => `
    <div class="status-item">
      <span class="status-dot status-dot--${s.status}"></span>
      <strong>${s.name}</strong> ${STATUS_LABELS[s.status] || s.status}
    </div>`).join('');
  el.innerHTML = label + items;
}

function renderQuickActions(data, el) {
  if (!el) return;
  el.innerHTML = data.quickActions.map(q => `
    <a href="${q.link}" class="qa-card" role="listitem">
      <div class="qa-icon" aria-hidden="true">${ICONS[q.icon] || ''}</div>
      <span>${q.title}</span>
      <p>${q.desc}</p>
    </a>`).join('');
}

function renderNews(data, el) {
  if (!el) return;
  el.innerHTML = data.news.map(n => `
    <div class="news-item">
      <span class="news-date">${n.date}</span>
      <div>
        <strong class="news-title">${n.title}</strong>
        <p>${n.text}</p>
      </div>
    </div>`).join('');
}

function renderTopIssues(data, el) {
  if (!el) return;
  el.innerHTML = data.topIssues.map((item, i) => `
    <li class="problem-item">
      <span class="problem-num">${i + 1}</span>
      <a href="${item.link}">${item.title}</a>
      <span class="tag">${item.tag}</span>
    </li>`).join('');
}

function renderHmsTiles(data, el) {
  if (!el) return;
  el.innerHTML = data.hmsTiles.map(t => `
    <a href="${t.link}" class="hms-tile">
      <div class="hms-title">${t.title}</div>
      <p>${t.desc}</p>
    </a>`).join('');
}

function renderUsefulLinks(data, el) {
  if (!el) return;
  el.innerHTML = data.usefulLinks.map(l => `
    <li>
      <a href="${l.link}">
        <span>${l.title}</span>
        ${ICONS.arrow}
      </a>
    </li>`).join('');
}

function renderSlaTable(data, el) {
  if (!el) return;
  const rows = data.sla.map(s => `
    <tr>
      <td>${s.type}</td>
      <td>${s.respons}</td>
      <td>${s.losning}</td>
      <td><span class="sla-badge sla-badge--${STATUS_PRIORITY_LABELS[s.prioritet] || 'normal'}">${s.prioritet}</span></td>
    </tr>`).join('');
  el.innerHTML = `
    <table class="sla-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Responstid</th>
          <th>Løsning</th>
          <th>Prioritet</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function renderAccordion(categories, el) {
  if (!el) return;
  el.innerHTML = categories.map(cat => `
    <section class="content-section" id="${cat.id}" aria-labelledby="h-${cat.id}">
      <h2 class="section-title" id="h-${cat.id}">${cat.title}</h2>
      <div class="accordion">
        ${cat.items.map((item, i) => `
          <div class="accordion-item">
            <button class="accordion-btn" aria-expanded="false" aria-controls="acc-${cat.id}-${i}">
              ${item.question}
              <svg class="acc-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="accordion-body" id="acc-${cat.id}-${i}" hidden>
              <p>${item.answer}</p>
            </div>
          </div>`).join('')}
      </div>
    </section>`).join('');

  el.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      const body = btn.nextElementSibling;
      body.classList.toggle('open', !open);
      body.hidden = open;
    });
  });
}

function renderSystems(data, el) {
  if (!el) return;
  el.innerHTML = data.systems.map(sys => `
    <section class="content-section" id="${sys.id}" aria-labelledby="h-${sys.id}">
      <h2 class="section-title" id="h-${sys.id}">${sys.name}</h2>
      <div class="system-card">
        <p class="system-desc">${sys.desc}</p>
        <div class="system-meta">
          <div class="system-meta-item">
            <span class="meta-label">Tilgang</span>
            <span>${sys.access}</span>
          </div>
          <div class="system-meta-item">
            <span class="meta-label">Merk</span>
            <span>${sys.notes}</span>
          </div>
        </div>
      </div>
    </section>`).join('');
}

function renderSidebarNav(categories, el) {
  if (!el) return;
  el.innerHTML = categories.map(cat => `
    <li><a href="#${cat.id}">${cat.title}</a></li>`).join('');
}

document.addEventListener('DOMContentLoaded', async () => {
  const data = await loadContent();
  if (!data) return;

  const page = document.body.dataset.page;

  renderAnnouncement(data, document.getElementById('cms-announcement'));
  renderStatusStrip(data, document.getElementById('cms-status-strip'));

  if (page === 'home') {
    renderQuickActions(data, document.getElementById('cms-quick-actions'));
    renderNews(data, document.getElementById('cms-news'));
    renderTopIssues(data, document.getElementById('cms-top-issues'));
    renderHmsTiles(data, document.getElementById('cms-hms-tiles'));
    renderUsefulLinks(data, document.getElementById('cms-useful-links'));

    const alertEl = document.getElementById('cms-sidebar-alert');
    if (alertEl) {
      const warn = data.systemStatus.find(s => s.status === 'warn' || s.status === 'error');
      if (warn) {
        alertEl.hidden = false;
        alertEl.querySelector('span').textContent = `${warn.name} er for oyeblikket ${STATUS_LABELS[warn.status].toLowerCase()}. IT jobber med saken.`;
      }
    }

    const driftEl = document.getElementById('cms-driftsstatus');
    if (driftEl) {
      driftEl.innerHTML = data.systemStatus.map(s => `
        <li>
          <a href="rutiner.html">
            <span>${s.name}</span>
            <span class="status-badge status-badge--${s.status === 'ok' ? 'ok' : 'warning'}" style="font-size:0.7rem;">${STATUS_LABELS[s.status]}</span>
          </a>
        </li>`).join('');
    }
  }

  if (page === 'it-support') {
    renderSlaTable(data, document.getElementById('cms-sla-table'));
    renderAccordion(data.itSupport.categories, document.getElementById('cms-accordion'));
    renderSidebarNav(data.itSupport.categories, document.getElementById('cms-sidebar-nav'));
  }

  if (page === 'systems') {
    renderAccordion(data.systemsInfo.categories, document.getElementById('cms-accordion'));
    renderSidebarNav(data.systemsInfo.categories, document.getElementById('cms-sidebar-nav'));
  }

  if (page === 'hms') {
    renderAccordion(data.hms.sections, document.getElementById('cms-accordion'));
    renderSidebarNav(data.hms.sections, document.getElementById('cms-sidebar-nav'));
  }

  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }

  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }
});
