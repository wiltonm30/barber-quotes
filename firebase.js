// BarberQuotes — configuración de Firebase
// ⚙️ Pega aquí la configuración de tu proyecto (Consola de Firebase → Configuración del proyecto → Tus apps → Web)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

export const firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'TU_PROYECTO.firebaseapp.com',
  projectId: 'TU_PROYECTO',
  storageBucket: 'TU_PROYECTO.appspot.com',
  messagingSenderId: '000000000000',
  appId: '1:000000000000:web:xxxxxxxxxxxx',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// ---------- Utilidades compartidas ----------
export const TZ = 'America/Santo_Domingo';
export const FS = 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
export const AUTH = 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
export const APP = 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';

export const hoyRD = () => new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date());
export const ahoraMinRD = () => {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: TZ, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
    .formatToParts(new Date()).map((x) => [x.type, x.value]));
  return Number(p.hour) * 60 + Number(p.minute);
};
export const aMin = (h) => { const [H, M] = h.split(':').map(Number); return H * 60 + M; };
export const aHora = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
export const aFecha = (s) => new Date(`${s}T00:00:00Z`);
export const sumarDias = (s, n) => { const d = aFecha(s); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
export const fechaLarga = (s) => new Intl.DateTimeFormat('es-DO', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' }).format(aFecha(s));
export const hora12 = (h) => { const [H, M] = h.split(':').map(Number); return `${H % 12 || 12}:${String(M).padStart(2, '0')} ${H < 12 ? 'a. m.' : 'p. m.'}`; };
export const dinero = (n) => `RD$${Number(n).toLocaleString('es-DO')}`;
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const slotId = (barberoId, fecha, hora) => `${barberoId}_${fecha}_${hora.replace(':', '')}`;

// Bloques de tiempo que ocupa una cita (de "intervalo" en "intervalo" minutos)
export const bloques = (hora, duracion, intervalo) =>
  Array.from({ length: Math.ceil(duracion / intervalo) }, (_, i) => aHora(aMin(hora) + i * intervalo));
