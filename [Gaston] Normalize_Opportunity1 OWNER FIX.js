const input = $input.first().json;
const body = input.body || input;
const cfg = input.config || {};
const pipelinesConfig = cfg.pipelines || {};
const calendarsConfig = cfg.calendars || {};
const stageAliasesConfig = cfg.stage_aliases || {};

function firstValue(...values) {
  return values.find(v => v !== undefined && v !== null && String(v).trim() !== '') || '';
}

function normalizeText(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function normalizeStageAlias(stageName) {
  const clean = String(stageName || '').trim();
  return stageAliasesConfig[clean] || clean;
}

function calendarRoute(calendar) {
  const text = normalizeText(`${calendar?.calendarName || ''} ${calendar?.title || ''}`);

  for (const key of Object.keys(calendarsConfig)) {
    const route = calendarsConfig[key] || {};
    if (route.enabled === false) continue;

    const terms = route.match_terms || route.match || [];

    if (terms.some(term => text.includes(normalizeText(term)))) {
      const pipeline = pipelinesConfig[route.target_pipeline_key] || {};

      return {
        pipeline_id: pipeline.id || '',
        pipeline_name: pipeline.name || '',
        stage_actual: route.target_stage || ''
      };
    }
  }

  return {
    pipeline_id: '',
    pipeline_name: '',
    stage_actual: ''
  };
}

function pipelineNameFromId(pipelineId) {
  const id = String(pipelineId || '').trim();

  for (const key of Object.keys(pipelinesConfig)) {
    const pipeline = pipelinesConfig[key] || {};
    if (pipeline.id === id) return pipeline.name || '';
  }

  return '';
}

let custom = {};
if (Array.isArray(body.customData)) {
  body.customData.forEach(field => {
    if (field.id && field.fieldValue !== undefined) {
      custom[field.id] = field.fieldValue;
    }
  });
} else if (body.customData && typeof body.customData === 'object') {
  custom = body.customData;
}

const calendar = body.calendar || null;
const routeFromCalendar = calendarRoute(calendar);

const stage = normalizeStageAlias(firstValue(
  body.pipleline_stage,
  body.pipeline_stage,
  body.stage_actual,
  body.stage,
  body.stageName,
  routeFromCalendar.stage_actual
));

const pipelineId = firstValue(
  body.pipeline_id,
  body.pipelineId,
  routeFromCalendar.pipeline_id
);

const pipelineName = firstValue(
  body.pipeline_name,
  body.pipelineName,
  pipelineNameFromId(pipelineId),
  routeFromCalendar.pipeline_name
);

const assignedUserName = body.user
  ? `${body.user.firstName || ''} ${body.user.lastName || ''}`.trim()
  : firstValue(body.assigned_user, body.assignedTo, body.owner);

const assignedUserEmail = firstValue(
  body.user?.email,
  body.assigned_user_email,
  body.assignedUserEmail
);

const fixedSetterName = firstValue(
  cfg.fixed_setter_name,
  cfg.fixedSetterName,
  cfg.client_name,
  'Gaston Hendlin'
);

const leadSource = firstValue(
  custom.fuente_origen,
  custom.lead_source,
  custom.fuente_cliente_potencial,
  custom.fuente_del_cliente_potencial,

  body.lead_source,
  body.source,
  body.opportunity_source,

  body.contact?.lastAttributionSource?.utmSource,
  body.contact?.lastAttributionSource?.sessionSource,
  body.contact?.lastAttributionSource?.medium,

  body.contact?.attributionSource?.utmSource,
  body.contact?.attributionSource?.sessionSource,
  body.contact?.attributionSource?.medium,

  body.attributionSource?.utmSource,
  body.attributionSource?.sessionSource,
  body.attributionSource?.medium,

  body.contact_source
);

const companyName = firstValue(
  body.company_name,
  body.companyName,
  body.business_name,
  body.businessName,
  body.contact?.companyName,
  body.contact?.company_name,
  custom.business_name,
  custom.nombre_negocio,
  custom.nombre_del_negocio,
  custom.empresa,
  custom.empresa_marca
);

const email = firstValue(
  body.email,
  body.contact_email,
  body.contactEmail,
  body.contact?.email,
  custom.contact_email,
  custom.email
);

const phone = firstValue(
  body.phone,
  body.contact_phone,
  body.contactPhone,
  body.contact?.phone,
  custom.contact_phone,
  custom.telefono,
  custom.whatsapp
);

const firstName = firstValue(
  body.first_name,
  body.firstName,
  body.contact?.firstName,
  body.contact?.first_name
);

const lastName = firstValue(
  body.last_name,
  body.lastName,
  body.contact?.lastName,
  body.contact?.last_name
);

const fullName = firstValue(
  body.full_name,
  body.name,
  body.contact?.name,
  `${firstName || ''} ${lastName || ''}`.trim()
);

const status = firstValue(
  body.status,
  calendar ? 'open' : ''
);

const opportunityId = firstValue(
  body.id,
  body.opportunity_id,
  body.opportunityId
);

return [{
  json: {
    secret: cfg.crm_secret || '',
    event_type: 'ghl_opportunity',
    source: 'ghl',

    contact_id: firstValue(body.contact_id, body.contactId, body.contact?.id),
    opportunity_id: opportunityId,

    pipeline_id: pipelineId,
    pipeline_name: pipelineName,
    stage_actual: stage,
    status: status,

    lead_value: firstValue(body.lead_value, body.monetary_value, 0),

    first_name: firstName,
    last_name: lastName,
    full_name: fullName,

    email: email,
    phone: phone,
    country: body.country || '',
    company_name: companyName,

    owner: body.owner || assignedUserName,
    assigned_user_name: assignedUserName,
    assigned_user_email: assignedUserEmail,

    setter: fixedSetterName,
    fixed_setter_name: fixedSetterName,

    date_created: firstValue(body.date_created, body.createdAt, calendar?.date_created, new Date().toISOString()),

    lead_source: leadSource,

    custom: {
      ...custom,

      fuente_origen: firstValue(custom.fuente_origen, leadSource),
      lead_source: leadSource,

      business_name: firstValue(custom.business_name, companyName),
      contact_email: email,
      contact_phone: phone,

      temperatura_lead: custom.temperatura_lead || '',
      sin_datos_contacto: custom.sin_datos_contacto || '',

      agendado_por: fixedSetterName,
      confirmo_asistencia_r1: custom.confirmo_asistencia_r1 || '',

      seguimiento_ventas: custom.seguimiento_ventas || '',
      proximo_seguimiento_ventas: custom.proximo_seguimiento_ventas || '',

      asistio_r1: custom.asistio_r1 || '',
      fecha_r1_realizada: custom.fecha_r1_realizada || '',

      confirmo_r2: custom.confirmo_r2 || '',
      asistio_r2: custom.asistio_r2 || '',
      fecha_r2_realizada: custom.fecha_r2_realizada || '',

      confirmo_r3: custom.confirmo_r3 || '',
      asistio_r3: custom.asistio_r3 || '',
      fecha_r3_realizada: custom.fecha_r3_realizada || '',

      link_llamada: custom.link_llamada || '',

      producto_vendido: custom.producto_vendido || '',
      cerrado_por: custom.cerrado_por || '',
      fecha_cierre: custom.fecha_cierre || '',
      tipo_moneda: custom.tipo_moneda || '',

      cantidad_cuotas: custom.cantidad_cuotas || '',
      frecuencia_cuotas: custom.frecuencia_cuotas || '',
      monto_por_cuota: custom.monto_por_cuota || '',

      fecha_cuota_1: custom.fecha_cuota_1 || '',
      estado_cuota_1: custom.estado_cuota_1 || '',

      fecha_cuota_2: custom.fecha_cuota_2 || '',
      estado_cuota_2: custom.estado_cuota_2 || '',

      fecha_cuota_3: custom.fecha_cuota_3 || '',
      estado_cuota_3: custom.estado_cuota_3 || '',

      motivo_perdida: custom.motivo_perdida || ''
    },

    appointment_r1: null,
    appointment_r2: null,
    appointment_r3: null,
    appointment_onboarding: null,

    raw: body
  }
}];
