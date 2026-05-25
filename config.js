/* config.js — Origin AG · selector de entorno (staging / producción)
 *
 * Un solo código fuente sirve a los dos entornos. El entorno se elige por hostname O por path
 * (GitHub Pages de proyecto comparten el hostname jrojas10110.github.io, así que distinguimos
 * staging vs prod por el slug del path, ej: /origin-ag-staging/ vs /origin-ag-dashboard/):
 *   - file://, localhost, 127.0.0.1, o "staging" en el hostname o en el path  -> STAGING
 *   - cualquier otra cosa (el sitio de producción)                            -> PRODUCCIÓN
 * Forzar manualmente: agregá ?env=staging o ?env=prod a la URL.
 *
 * La clave anon es segura en el frontend SOLO mientras RLS esté activo en TODAS las tablas.
 * Tanto la anon de prod como la de staging son públicas por diseño; por eso este archivo
 * se puede commitear. Nunca pongas acá la service_role key.
 */
(function () {
  var ENVS = {
    prod: {
      url:  'https://cxssesechiugplplpyve.supabase.co',
      anon: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4c3Nlc2VjaGl1Z3BscGxweXZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNDM1MDksImV4cCI6MjA5NDgxOTUwOX0.oFbdo--8e5YeVDx_RRAfABZqDhH5XoURqmW8MJAMIPU'
    },
    staging: {
      url:  'https://sqmvmhibuoeujrqcrzyf.supabase.co',
      anon: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxbXZtaGlidW9ldWpycWNyenlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MDUxMDMsImV4cCI6MjA5NTE4MTEwM30.GW2ipLJmVIoUAQq2sOHNoAsFDYJgXl206kkCQU_L-Qs'
    }
  };

  var forced = new URLSearchParams(location.search).get('env');
  var host   = location.hostname; // '' cuando se abre como file://
  var path   = location.pathname; // ej: /origin-ag-staging/ingreso_datos.html

  var isStaging =
    forced === 'staging' ||
    (forced !== 'prod' &&
      (host === '' || host === 'localhost' || host === '127.0.0.1'
        || /staging/i.test(host) || /staging/i.test(path)));

  var env = isStaging ? 'staging' : 'prod';
  var cfg = ENVS[env];

  window.ORIGIN_AG = { env: env, SBURL: cfg.url, SBANON: cfg.anon };
  try { console.info('[Origin AG] entorno =', env, '· Supabase =', cfg.url); } catch (e) {}
})();
