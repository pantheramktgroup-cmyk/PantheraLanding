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
    urgency:     'input[name*="urgencia" i], select[name*="urgencia" i], input[name*="urgency" i], select[name*="urgency" i]',
    investment:  'input[name*="inversion" i], select[name*="inversion" i], input[name*="investment" i], select[name*="investment" i]',
  };
  // ──────────────────────────────────────────────────────────────────────────

  var _debounceTimer = null;
  var _lastPayloadStr = null;
  var _observer = null;
  var _hasInitiallyCaptured = false;

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

  function normalizeEventType(value) {
    return value === 'update' ? 'update' : 'initial';
  }

  function getInternationalPhone() {
    var input = document.querySelector('input[name="phone"], input[type="tel"]');

    if (!input) return '';

    try {
      var instance = null;

      if (
        window.intlTelInputGlobals &&
        typeof window.intlTelInputGlobals.getInstance === 'function'
      ) {
        instance = window.intlTelInputGlobals.getInstance(input);
      }

      if (
        !instance &&
        window.intlTelInput &&
        typeof window.intlTelInput.getInstance === 'function'
      ) {
        instance = window.intlTelInput.getInstance(input);
      }

      if (instance) {
        var number = String(instance.getNumber() || '').trim();

        if (number) return number;

        var country =
          typeof instance.getSelectedCountryData === 'function'
            ? instance.getSelectedCountryData()
            : null;

        var nationalNumber = String(input.value || '').replace(/\D/g, '');

        if (country && country.dialCode && nationalNumber) {
          return '+' + country.dialCode + nationalNumber;
        }
      }
    } catch (e) {
      // La captura nunca debe interrumpir el calendario.
    }

    return String(input.value || '').trim();
  }

  function buildAnswers() {
    return {
      urgency: getFieldValue(SELECTORS.urgency),
      investment: getFieldValue(SELECTORS.investment),
    };
  }

  function buildPayload() {
    var firstName = getFieldValue(SELECTORS.firstName);
    var lastName  = getFieldValue(SELECTORS.lastName);
    // Si existe un campo fullName lo usa directamente; si no, une firstName + lastName
    var fullNameField = getFieldValue(SELECTORS.fullName);
    var fullName = fullNameField || ([firstName, lastName].filter(Boolean).join(' '));

    var email       = getFieldValue(SELECTORS.email);
    var phone       = getInternationalPhone();
    var instagram   = getFieldValue(SELECTORS.instagram);
    var role        = getFieldValue(SELECTORS.role);
    var mainProblem = getFieldValue(SELECTORS.mainProblem);
    var revenue     = getFieldValue(SELECTORS.revenue);
    var urgency     = getFieldValue(SELECTORS.urgency);
    var investment  = getFieldValue(SELECTORS.investment);
    var answers     = buildAnswers();

    // Determinar eventType: "initial" si es la primera captura, "update" si es subsecuente
    var eventType = normalizeEventType(_hasInitiallyCaptured ? 'update' : 'initial');

    return {
      type:        'ghl-form-progress',
      eventType:   eventType,
      fullName:    fullName,
      email:       email,
      phone:       phone,
      instagram:   instagram,
      role:        role,
      mainProblem: mainProblem,
      revenue:     revenue,
      urgency:     urgency,
      investment:  investment,
      answers:     answers,
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

    // Deduplicación: incluir eventType y answers en la huella
    var payloadStr = JSON.stringify({
      fullName:    payload.fullName,
      email:       payload.email,
      phone:       payload.phone,
      instagram:   payload.instagram,
      role:        payload.role,
      mainProblem: payload.mainProblem,
      revenue:     payload.revenue,
      urgency:     payload.urgency,
      investment:  payload.investment,
      eventType:   payload.eventType,
      answers:     payload.answers,
    });
    if (payloadStr === _lastPayloadStr) return;

    // Debounce
    clearTimeout(_debounceTimer);
    _debounceTimer = setTimeout(function () {
      _lastPayloadStr = payloadStr;
      _hasInitiallyCaptured = true;  // Marcar que ya hizo captura inicial
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
| Urgencia | `input[name*="urgencia"], select[name*="urgency"]` | ⚠️ Verificar |
| Inversión | `input[name*="inversion"], select[name*="investment"]` | ⚠️ Verificar |

---

## Flujo esperado en n8n / GHL

El webhook en n8n recibirá un payload como este:

```json
{
  "eventType": "initial",
  "fullName": "Juan García",
  "email": "juan@example.com",
  "phone": "+5491155667788",
  "instagram": "juangarcia",
  "role": "Coach de negocios",
  "mainProblem": "No tengo un sistema de ventas predecible",
  "revenue": "10K-20K USD/mes",
  "urgency": "Quiero implementarlo este mes",
  "investment": "3K-5K USD",
  "answers": {},
  "pageUrl": "https://pantheramktgroup.com/landing?variant=B",
  "variant": "B",
  "capturedAt": "2026-07-18T14:00:00.000Z"
}
```

### Campos importantes:

- **eventType**: `"initial"` en la primera captura, `"update"` en cambios posteriores
- **answers**: Objeto vacío o con datos adicionales de respuestas del formulario
- **capturedAt**: Timestamp en ISO de cuando se capturó el registro
- **variant**: Siempre `"B"` para esta captura progresiva

### Lógica recomendada en n8n:

1. **Recibir webhook** con los datos: `eventType`, `email`, `fullName`, `phone`, `answers`, etc.
2. **Buscar contacto en GHL** por `email`.
3. **Si no existe** → crear contacto con `fullName`, `email`, `phone`.
4. **Si existe** → actualizar con los nuevos campos disponibles (phone, campos personalizados).
5. **Buscar oportunidad abierta** de ese contacto en el pipeline *Booking*.
6. **Si eventType es "initial"** y no existe oportunidad → crear una en la etapa _"Formulario iniciado / Pendiente de agendar"_.
7. **Si eventType es "update"** y existe oportunidad → actualizar los campos de la oportunidad sin crear duplicados.
8. Cuando la persona **reserve la cita** (evento de GHL), mover la oportunidad a _"Cita agendada"_.
9. Opcionalmente, **esperar 10-15 minutos** sin reserva y avisar al setter.

### Manejo de eventType:

- `"initial"`: Primera captura válida del formulario. Crear contacto y oportunidad si no existen.
- `"update"`: Cambios posteriores en los campos del formulario. Actualizar sin duplicar.

### Clave de deduplicación:
Usar **`email`** como clave principal. Si hay `phone`, usarlo como clave secundaria.

---

## Variable de entorno en Vercel

Configurar en el dashboard de Vercel → Settings → Environment Variables:

| Variable | Descripción |
|---|---|
| `N8N_PARTIAL_LEAD_WEBHOOK_URL` | URL completa del webhook de n8n (nunca exponerla en el frontend) |
| `PARTIAL_LEAD_WEBHOOK_SECRET` | Token/secreto de autenticación para validar requests en n8n |
| `PARTIAL_LEAD_ALLOWED_ORIGINS` | (Opcional) Dominios permitidos separados por coma. Default: `https://pantheramktgroup.com,https://www.pantheramktgroup.com` |
