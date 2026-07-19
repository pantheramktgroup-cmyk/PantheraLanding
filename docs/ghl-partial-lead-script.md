# Script de captura progresiva para GoHighLevel

## Cómo instalarlo

1. Abrí el formulario/calendario en GoHighLevel.
2. Agregá un elemento **Custom HTML** al final del formulario.
3. Pegá el código completo que aparece más abajo.
4. **Antes de publicar**, reemplazá `LANDING_ORIGIN` con el dominio real de la landing
   (ej. `https://pantheramktgroup.com`).
5. Verificá los selectores marcados con `⚠️ VERIFICAR`.

---

## Cómo obtener los selectores de campos de GHL

1. Publicá el formulario/calendario y abrilo en Chrome.
2. Abrí DevTools (F12) → tab **Elements**.
3. Hacé click en el ícono de inspección (cursor) y seleccioná el campo que querés capturar.
4. En el HTML resultante buscá los atributos:
   - `name` → ej. `name="firstName"` → selector: `input[name="firstName"]`
   - `id` → ej. `id="field-abc123"` → selector: `#field-abc123`
   - Para campos personalizados de GHL suelen tener la forma: `input[name="custom_values.campo"]`
5. Actualizá las constantes del bloque **CONFIGURACIÓN DE SELECTORES** con los valores reales.

---

## Código para pegar en Custom HTML de GHL

```html
<script>
(function () {
  'use strict';

  // ─── CONFIGURACIÓN ────────────────────────────────────────────────────────
  // Reemplazá con el dominio real de la landing en producción.
  // NO uses '*' en producción.
  var LANDING_ORIGIN = 'https://pantheramktgroup.com'; // ← REEMPLAZAR

  // Debounce en milisegundos antes de enviar el postMessage
  var DEBOUNCE_MS = 2000;

  // ─── SELECTORES DE CAMPOS ─────────────────────────────────────────────────
  // ⚠️ VERIFICAR: inspeccioná el formulario publicado para confirmar estos selectores.
  // GHL puede usar distintos atributos según la versión del widget.
  var SELECTORS = {
    // Nombre (a veces GHL une nombre y apellido en un solo campo)
    firstName:   'input[name="firstName"], input[placeholder*="nombre" i], input[placeholder*="name" i]',
    lastName:    'input[name="lastName"], input[placeholder*="apellido" i], input[placeholder*="last" i]',
    // Si GHL usa un único campo de nombre completo:
    fullName:    'input[name="fullName"], input[name="full_name"]',
    email:       'input[name="email"], input[type="email"]',
    phone:       'input[name="phone"], input[type="tel"], input[name="phone_number"]',
    // ⚠️ VERIFICAR: campos personalizados — pueden variar según tu configuración de GHL
    instagram:   'input[name*="instagram" i], input[placeholder*="instagram" i]',
    role:        'input[name*="rol" i], select[name*="rol" i], input[placeholder*="rol" i]',
    mainProblem: 'textarea[name*="problema" i], input[name*="problema" i]',
    revenue:     'input[name*="facturacion" i], input[name*="revenue" i], select[name*="facturacion" i]',
  };
  // ──────────────────────────────────────────────────────────────────────────

  var _debounceTimer = null;
  var _lastPayloadStr = null;
  var _observer = null;

  function getFieldValue(selector) {
    if (!selector) return '';
    var parts = selector.split(',');
    for (var i = 0; i < parts.length; i++) {
      var el = document.querySelector(parts[i].trim());
      if (el && el.value) return el.value.trim();
    }
    return '';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function buildPayload() {
    var firstName = getFieldValue(SELECTORS.firstName);
    var lastName  = getFieldValue(SELECTORS.lastName);
    // Si existe un campo fullName lo usa directamente; si no, une firstName + lastName
    var fullNameField = getFieldValue(SELECTORS.fullName);
    var fullName = fullNameField || ([firstName, lastName].filter(Boolean).join(' '));

    var email       = getFieldValue(SELECTORS.email);
    var phone       = getFieldValue(SELECTORS.phone);
    var instagram   = getFieldValue(SELECTORS.instagram);
    var role        = getFieldValue(SELECTORS.role);
    var mainProblem = getFieldValue(SELECTORS.mainProblem);
    var revenue     = getFieldValue(SELECTORS.revenue);

    return {
      type:        'ghl-form-progress',
      fullName:    fullName,
      email:       email,
      phone:       phone,
      instagram:   instagram,
      role:        role,
      mainProblem: mainProblem,
      revenue:     revenue,
      answers:     {},      // Extender con campos adicionales si es necesario
      pageUrl:     window.location.href,
      variant:     'B',
      capturedAt:  new Date().toISOString(),
    };
  }

  function tryPostMessage() {
    var payload = buildPayload();
    var fullName = payload.fullName;
    var email    = payload.email;

    // Mínimo requerido: nombre + apellido y email válido
    var nameParts = fullName.split(/\s+/).filter(Boolean);
    if (nameParts.length < 2) return;
    if (!isValidEmail(email)) return;

    // Deduplicación: no enviar si el payload no cambió
    var payloadStr = JSON.stringify({
      fullName:    payload.fullName,
      email:       payload.email,
      phone:       payload.phone,
      instagram:   payload.instagram,
      role:        payload.role,
      mainProblem: payload.mainProblem,
      revenue:     payload.revenue,
    });
    if (payloadStr === _lastPayloadStr) return;

    // Debounce
    clearTimeout(_debounceTimer);
    _debounceTimer = setTimeout(function () {
      _lastPayloadStr = payloadStr;
      try {
        window.parent.postMessage(payload, LANDING_ORIGIN);
      } catch (e) {
        // Silencioso — no interrumpe el formulario
      }
    }, DEBOUNCE_MS);
  }

  function attachListeners() {
    // Escuchamos todos los inputs y changes del documento
    document.addEventListener('input',  tryPostMessage, true);
    document.addEventListener('change', tryPostMessage, true);
  }

  function startObserver() {
    // GHL puede renderizar campos dinámicamente; el observer detecta nuevos campos
    if (!window.MutationObserver) {
      attachListeners();
      return;
    }
    _observer = new MutationObserver(function () {
      attachListeners();
    });
    _observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree:   true,
    });
    attachListeners();
  }

  // Arranque
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startObserver);
  } else {
    startObserver();
  }
})();
</script>
```

---

## Selectores que debés verificar inspeccionando el formulario publicado

| Campo | Selector actual (fallback) | Estado |
|---|---|---|
| Nombre | `input[name="firstName"]` | ⚠️ Verificar |
| Apellido | `input[name="lastName"]` | ⚠️ Verificar |
| Nombre completo (si aplica) | `input[name="fullName"]` | ⚠️ Verificar |
| Email | `input[type="email"]` | ✅ Estable |
| Teléfono | `input[type="tel"]` | ✅ Estable |
| Instagram | `input[name*="instagram"]` | ⚠️ Verificar |
| Rol / cargo | `input[name*="rol"]` | ⚠️ Verificar |
| Problema principal | `textarea[name*="problema"]` | ⚠️ Verificar |
| Facturación | `input[name*="facturacion"]` | ⚠️ Verificar |

---

## Flujo esperado en n8n / GHL

El webhook en n8n recibirá un payload como este:

```json
{
  "fullName": "Juan García",
  "email": "juan@example.com",
  "phone": "+5491155667788",
  "instagram": "juangarcia",
  "role": "Coach de negocios",
  "mainProblem": "No tengo un sistema de ventas predecible",
  "revenue": "10K-20K USD/mes",
  "answers": {},
  "pageUrl": "https://pantheramktgroup.com/landing?variant=B",
  "variant": "B",
  "receivedAt": "2026-07-18T14:00:00.000Z"
}
```

### Lógica recomendada en n8n:

1. **Buscar contacto en GHL** por `email`.
2. **Si no existe** → crear contacto con `fullName`, `email`, `phone`.
3. **Si existe** → actualizar con los nuevos campos disponibles (phone, campos personalizados).
4. **Buscar oportunidad abierta** de ese contacto en el pipeline *Booking*.
5. **Si no existe oportunidad** → crear una en la etapa _"Formulario iniciado / Pendiente de agendar"_.
6. **Si ya existe** → no crear duplicado. Actualizar campos si corresponde.
7. Cuando la persona **reserve la cita** (evento de GHL), mover la oportunidad a _"Cita agendada"_.
8. Opcionalmente, **esperar 10-15 minutos** sin reserva y avisar al setter.

### Clave de deduplicación:
Usar **`email`** como clave principal. Si hay `phone`, usarlo como clave secundaria.

---

## Variable de entorno en Vercel

Configurar en el dashboard de Vercel → Settings → Environment Variables:

| Variable | Descripción |
|---|---|
| `N8N_PARTIAL_LEAD_WEBHOOK_URL` | URL completa del webhook de n8n (nunca exponerla en el frontend) |
| `PARTIAL_LEAD_ALLOWED_ORIGINS` | (Opcional) Dominios permitidos separados por coma. Default: `https://pantheramktgroup.com,https://www.pantheramktgroup.com` |
