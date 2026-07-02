/* ============================================================
   aviation.js  –  Shared data, utilities & UI helpers
   OpenWorlds Aviation Community
   ============================================================ */

/* ── HTML escape helper (prevents XSS when inserting user data into innerHTML) ── */
function awEsc(s) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
/* ── Airports ── */
const AW_AIRPORTS = {
  LHR: { name: 'London Heathrow',          city: 'London',       country: 'UK' },
  JFK: { name: 'John F. Kennedy Intl',     city: 'New York',     country: 'USA' },
  LAX: { name: 'Los Angeles Intl',         city: 'Los Angeles',  country: 'USA' },
  DXB: { name: 'Dubai International',      city: 'Dubai',        country: 'UAE' },
  SYD: { name: 'Sydney Kingsford Smith',   city: 'Sydney',       country: 'AUS' },
  CDG: { name: 'Charles de Gaulle',        city: 'Paris',        country: 'France' },
  FRA: { name: 'Frankfurt Airport',        city: 'Frankfurt',    country: 'Germany' },
  ORD: { name: "O'Hare International",     city: 'Chicago',      country: 'USA' },
  SIN: { name: 'Changi Airport',           city: 'Singapore',    country: 'Singapore' },
  HND: { name: 'Tokyo Haneda',             city: 'Tokyo',        country: 'Japan' },
  AMS: { name: 'Amsterdam Schiphol',       city: 'Amsterdam',    country: 'Netherlands' },
  MAD: { name: 'Madrid Barajas',           city: 'Madrid',       country: 'Spain' },
};

/* ── Flights (mock schedule) ── */
const AW_FLIGHTS = [
  { id:'OW101', from:'LHR', to:'JFK', dep:'08:30', arr:'11:45', dur:'7h 15m',
    dates:['2026-07-05','2026-07-07','2026-07-09','2026-07-12'],
    aircraft:'Boeing 777-300ER', status:'On Time',   gate:'A12', terminal:'T3',
    eco:45, biz:8, priceEco:449, priceBiz:1299 },

  { id:'OW102', from:'JFK', to:'LHR', dep:'20:15', arr:'08:00', dur:'7h 45m',
    dates:['2026-07-05','2026-07-07','2026-07-09','2026-07-12'],
    aircraft:'Boeing 777-300ER', status:'On Time',   gate:'B4',  terminal:'T1',
    eco:38, biz:6, priceEco:479, priceBiz:1349 },

  { id:'OW201', from:'LHR', to:'DXB', dep:'10:00', arr:'20:30', dur:'6h 30m',
    dates:['2026-07-05','2026-07-06','2026-07-08','2026-07-10'],
    aircraft:'Airbus A380-800',  status:'On Time',   gate:'C8',  terminal:'T3',
    eco:62, biz:14, priceEco:389, priceBiz:1099 },

  { id:'OW202', from:'DXB', to:'LHR', dep:'03:00', arr:'07:00', dur:'7h 00m',
    dates:['2026-07-05','2026-07-06','2026-07-08','2026-07-10'],
    aircraft:'Airbus A380-800',  status:'Delayed',   gate:'D15', terminal:'T1',
    eco:55, biz:10, priceEco:399, priceBiz:1149 },

  { id:'OW301', from:'LHR', to:'LAX', dep:'11:30', arr:'14:00', dur:'11h 30m',
    dates:['2026-07-06','2026-07-09','2026-07-13'],
    aircraft:'Boeing 787-9',     status:'On Time',   gate:'A3',  terminal:'T3',
    eco:50, biz:12, priceEco:529, priceBiz:1599 },

  { id:'OW302', from:'LAX', to:'LHR', dep:'15:45', arr:'10:00', dur:'10h 15m',
    dates:['2026-07-06','2026-07-09','2026-07-13'],
    aircraft:'Boeing 787-9',     status:'On Time',   gate:'G22', terminal:'TI',
    eco:44, biz:10, priceEco:559, priceBiz:1649 },

  { id:'OW401', from:'LHR', to:'SYD', dep:'21:00', arr:'17:30', dur:'23h 30m',
    dates:['2026-07-06','2026-07-10','2026-07-14'],
    aircraft:'Airbus A380-800',  status:'Boarding',  gate:'B7',  terminal:'T3',
    eco:70, biz:18, priceEco:849, priceBiz:2399 },

  { id:'OW501', from:'LHR', to:'CDG', dep:'06:45', arr:'09:00', dur:'1h 15m',
    dates:['2026-07-05','2026-07-06','2026-07-07','2026-07-08'],
    aircraft:'Airbus A319',      status:'On Time',   gate:'D2',  terminal:'T2',
    eco:80, biz:4, priceEco:99,  priceBiz:299 },

  { id:'OW502', from:'CDG', to:'LHR', dep:'11:30', arr:'11:45', dur:'1h 15m',
    dates:['2026-07-05','2026-07-06','2026-07-07','2026-07-08'],
    aircraft:'Airbus A319',      status:'On Time',   gate:'2F',  terminal:'2E',
    eco:75, biz:4, priceEco:109, priceBiz:289 },

  { id:'OW601', from:'LHR', to:'FRA', dep:'07:15', arr:'10:00', dur:'1h 45m',
    dates:['2026-07-05','2026-07-06','2026-07-07'],
    aircraft:'Airbus A320',      status:'On Time',   gate:'C4',  terminal:'T2',
    eco:68, biz:6, priceEco:119, priceBiz:349 },

  { id:'OW701', from:'LHR', to:'SIN', dep:'23:55', arr:'17:00', dur:'13h 05m',
    dates:['2026-07-07','2026-07-10','2026-07-14'],
    aircraft:'Boeing 787-9',     status:'On Time',   gate:'A18', terminal:'T3',
    eco:42, biz:8, priceEco:699, priceBiz:1999 },

  { id:'OW801', from:'JFK', to:'LAX', dep:'07:00', arr:'10:15', dur:'6h 15m',
    dates:['2026-07-05','2026-07-06','2026-07-07','2026-07-08'],
    aircraft:'Boeing 737-800',   status:'Cancelled', gate:'—',   terminal:'T4',
    eco:110, biz:12, priceEco:189, priceBiz:549 },

  { id:'OW901', from:'LHR', to:'ORD', dep:'10:45', arr:'14:00', dur:'9h 15m',
    dates:['2026-07-05','2026-07-08','2026-07-12'],
    aircraft:'Boeing 777-200LR', status:'On Time',   gate:'B9',  terminal:'T3',
    eco:54, biz:10, priceEco:499, priceBiz:1449 },

  { id:'OW1001', from:'LHR', to:'HND', dep:'12:30', arr:'09:30', dur:'12h 00m',
    dates:['2026-07-06','2026-07-10','2026-07-14'],
    aircraft:'Boeing 787-9',     status:'On Time',   gate:'A22', terminal:'T3',
    eco:46, biz:8, priceEco:749, priceBiz:2199 },

  { id:'OW1101', from:'LHR', to:'AMS', dep:'09:00', arr:'11:15', dur:'1h 15m',
    dates:['2026-07-05','2026-07-06','2026-07-07','2026-07-08'],
    aircraft:'Airbus A320',      status:'Arrived',   gate:'C11', terminal:'T2',
    eco:82, biz:4, priceEco:89,  priceBiz:249 },
];

/* ── Announcements ── */
const AW_ANNOUNCEMENTS = [
  { id:1, type:'info', title:'Schedule Update: July 2026',
    body:'New routes from London Heathrow to Madrid (OW1201) have been added effective 15 July 2026. Check the flights page for booking availability.',
    author:'Operations Team', date:'2026-07-01', pinned:true },

  { id:2, type:'urgent', title:'OW801 JFK–LAX Cancellation Notice',
    body:'Flight OW801 on 7 July 2026 has been cancelled due to operational reasons. Affected passengers will be rebooked on the next available service. We apologise for the inconvenience.',
    author:'Operations Team', date:'2026-07-02', pinned:true },

  { id:3, type:'general', title:'Training Academy: New Modules Released',
    body:'Three new training modules have been added: Advanced Passenger Handling, Emergency Coordination, and Crew Resource Management. All staff are encouraged to complete them.',
    author:'Training Team', date:'2026-06-28', pinned:false },

  { id:4, type:'info', title:'Community Flight Event — 19 July',
    body:'Join us for a special community flight event on 19 July. Multiple routes will operate simultaneously with live ATC commentary. Sign up via the Staff Portal.',
    author:'Community Team', date:'2026-06-25', pinned:false },

  { id:5, type:'general', title:'Welcome to OpenWorlds Aviation',
    body:'Thank you for joining our realistic aviation roleplay community. This is a simulation platform for entertainment only. Explore flights, join as crew, or complete training to get started.',
    author:'Admin', date:'2026-06-01', pinned:false },
];

/* ── Training Courses ── */
const AW_COURSES = [
  { id:'PSI', code:'PSI-001', title:'Passenger Services Induction',
    icon:'🛫', level:'Required', dept:'Passenger Services',
    duration:'45 min', lessons:6, exam:true,
    desc:'The essential first course for all members. Covers community rules, the aviation roleplay framework, passenger journey, and basic terminology.',
    topics:['Community overview & rules','Aviation roleplay framework','Passenger journey stages','Communication standards','Booking system basics','Safety briefing'] },

  { id:'SEP', code:'SEP-002', title:'Safety & Emergency Procedures',
    icon:'🚨', level:'Required', dept:'All Departments',
    duration:'60 min', lessons:8, exam:true,
    desc:'Covers all safety procedures, emergency protocols, evacuation processes, and first-response procedures for all community members.',
    topics:['Emergency response overview','Evacuation procedures','Communication during emergencies','Coordination with other teams','Incident reporting','Post-incident review'] },

  { id:'CBP', code:'CBP-003', title:'Check-in & Boarding Procedures',
    icon:'🎫', level:'Staff', dept:'Ground Crew',
    duration:'50 min', lessons:7, exam:true,
    desc:'Detailed procedures for managing check-in desks, passenger processing, boarding gates, and managing special requests.',
    topics:['Check-in desk management','Document verification simulation','Boarding gate management','Priority boarding rules','Irregular operations handling','Communication with cabin crew'] },

  { id:'CSE', code:'CSE-004', title:'Customer Service Excellence',
    icon:'⭐', level:'Staff', dept:'Passenger Services',
    duration:'40 min', lessons:5, exam:false,
    desc:'Best practices for delivering exceptional passenger experiences, handling complaints, and maintaining professional standards.',
    topics:['Communication best practices','Handling difficult situations','Accessibility support','Service recovery','Cultural awareness','Feedback handling'] },

  { id:'FCO', code:'FCO-005', title:'Flight Crew Operations',
    icon:'✈️', level:'Staff', dept:'Flight Crew',
    duration:'90 min', lessons:10, exam:true,
    desc:'Comprehensive training for flight crew members covering cockpit procedures, crew coordination, and flight management within the simulator.',
    topics:['Crew roles & responsibilities','Pre-flight briefing','Cockpit coordination','Communication protocols','Turbulence & weather handling','Approach & landing procedures','Post-flight duties'] },

  { id:'AOM', code:'AOM-006', title:'Airport Operations Management',
    icon:'🏢', level:'Senior Staff', dept:'Operations',
    duration:'75 min', lessons:9, exam:true,
    desc:'For operations managers and senior staff. Covers scheduling, multi-department coordination, flight disruption management, and leadership.',
    topics:['Operations centre overview','Schedule management','Multi-department coordination','Disruption management','Performance monitoring','Leadership & team management','Reporting standards'] },
];

/* ── Status helpers ── */
function awStatusBadge(status) {
  const map = {
    'On Time':   ['green',  'fa-check-circle',    'On Time'],
    'Delayed':   ['orange', 'fa-clock',           'Delayed'],
    'Boarding':  ['blue',   'fa-door-open',        'Boarding'],
    'Departed':  ['sky',    'fa-plane-departure',  'Departed'],
    'Arrived':   ['gray',   'fa-plane-arrival',    'Arrived'],
    'Cancelled': ['red',    'fa-times-circle',     'Cancelled'],
    'Scheduled': ['purple', 'fa-calendar',         'Scheduled'],
    'Gate Open': ['green',  'fa-door-open',        'Gate Open'],
  };
  const s = map[status] || ['gray','fa-question','Unknown'];
  return `<span class="aw-badge aw-badge-${s[0]}"><i class="fas ${s[1]}"></i> ${s[2]}</span>`;
}

/* ── LocalStorage helpers ── */
const AW_STORE = {
  get(key)         { try { return JSON.parse(localStorage.getItem('aw_'+key)); } catch { return null; } },
  set(key, val)    { localStorage.setItem('aw_'+key, JSON.stringify(val)); },
  remove(key)      { localStorage.removeItem('aw_'+key); },

  getBookings()    { return this.get('bookings') || []; },
  addBooking(b)    { const arr = this.getBookings(); arr.unshift(b); this.set('bookings', arr); },
  cancelBooking(ref){ const arr = this.getBookings().map(b => b.ref===ref ? {...b,status:'Cancelled'} : b); this.set('bookings', arr); },

  getProfile()     { return this.get('profile') || null; },
  setProfile(p)    { this.set('profile', p); },

  getCourseProgress(){ return this.get('courseProgress') || {}; },
  setCourseProgress(data){ this.set('courseProgress', data); },
  updateCourse(id, pct){ const d = this.getCourseProgress(); d[id]=pct; this.setCourseProgress(d); },

  getStaffLogin()  { return this.get('staffLoggedIn') || false; },
  setStaffLogin(v) { this.set('staffLoggedIn', v); },
};

/* ── Toast notifications ── */
function awToast(title, msg, type='info', duration=3500) {
  let wrap = document.querySelector('.aw-toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'aw-toast-wrap';
    document.body.appendChild(wrap);
  }

  const icons = { success:'fa-check-circle', error:'fa-times-circle', warning:'fa-exclamation-triangle', info:'fa-info-circle' };
  const colors = { success:'#27ae60', error:'#e74c3c', warning:'#f39c12', info:'#0066cc' };

  const toast = document.createElement('div');
  toast.className = `aw-toast ${type}`;

  const icon = document.createElement('i');
  icon.className = `fas ${icons[type] || 'fa-info-circle'}`;
  icon.style.cssText = `color:${colors[type] || '#0066cc'};margin-top:1px`;

  const body = document.createElement('div');
  const titleEl = document.createElement('div');
  titleEl.className = 'aw-toast-title';
  titleEl.textContent = title;
  const msgEl = document.createElement('div');
  msgEl.className = 'aw-toast-msg';
  msgEl.textContent = msg;
  body.appendChild(titleEl);
  body.appendChild(msgEl);

  toast.appendChild(icon);
  toast.appendChild(body);
  wrap.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity .4s,transform .4s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

/* ── Mobile hamburger menu ── */
function awInitNav() {
  const burger = document.querySelector('.aw-hamburger');
  const links  = document.querySelector('.aw-nav-links');
  if (!burger || !links) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });

  // close on link click
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      links.classList.remove('open');
    })
  );

  // mark active
  const path = location.pathname.split('/').pop() || 'index.html';
  links.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html') ||
        (href !== 'index.html' && path.startsWith(href.replace('.html','')))) {
      a.classList.add('aw-nav-active');
    }
  });
}

/* ── Scroll-in animations ── */
function awInitAnimations() {
  const els = document.querySelectorAll('.aw-animate');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
}

/* ── Live clock ── */
function awStartClock(el) {
  if (!el) return;
  const tick = () => {
    const now = new Date();
    el.textContent = now.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
  };
  tick();
  setInterval(tick, 1000);
}

/* ── Flight reference generator ── */
function awGenRef() {
  return 'OWB-' + Date.now().toString(36).toUpperCase().slice(-6);
}

/* ── Format date nicely ── */
function awFmtDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
}

/* ── Barcode string ── */
function awBarcode(ref) {
  const chars = 'M3BCNQ7XAVKPZ0R9DWT1HYUFE6JS2GL8IO4';
  let out = '';
  for (let i=0; i<72; i++) out += chars[Math.floor(Math.random()*chars.length)];
  return out.match(/.{1,12}/g).join(' ');
}

/* ── Tabs ── */
function awInitTabs(container) {
  const c = container || document;
  c.querySelectorAll('.aw-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const panel = tab.dataset.tab;
      const parent = tab.closest('[data-tab-group]') || c;
      parent.querySelectorAll('.aw-tab').forEach(t => t.classList.remove('active'));
      parent.querySelectorAll('.aw-tab-pane').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const pane = parent.querySelector(`[data-tab-pane="${panel}"]`);
      if (pane) pane.classList.add('active');
    });
  });
}

/* ── Animated counters ── */
function awCountUp(el, target, duration=1800) {
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function awInitCounters() {
  const els = document.querySelectorAll('[data-count-to]');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        awCountUp(e.target, parseInt(e.target.dataset.countTo));
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  els.forEach(el => io.observe(el));
}

/* ── Init everything ── */
document.addEventListener('DOMContentLoaded', () => {
  awInitNav();
  awInitAnimations();
  awInitTabs();
  awInitCounters();
});
