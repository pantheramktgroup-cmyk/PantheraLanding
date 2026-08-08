const normalizedOpportunity = $('Normalize Opportunity1').first().json;
const cfg = $('Config Cliente').first().json.config || {};
const calendarsConfig = cfg.calendars || {};
const customFieldIdsConfig = cfg.custom_field_ids || {};
const stageAliasesConfig = cfg.stage_aliases || {};
const opportunityResponse = $('Get GHL Opportunity Details').first().json || {};
const contactResponse = $('Get GHL Contact Details').first().json || {};
const notesResponse = $('Get GHL Contact Notes').first().json || {};
const appointmentsResponse = $input.first().json;

function firstValue(...values) {
  return values.find(
    value =>
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ''
  ) || '';
}

function normalizeText(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function stripHtml(html) {
  return String(html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatDateTime(value) {
  if (!value) return '';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function getNested(obj, path) {
  return path.split('.').reduce((acc, key) => {
    if (
      acc &&
      acc[key] !== undefined &&
      acc[key] !== null
    ) {
      return acc[key];
    }

    return undefined;
  }, obj);
}

function getQueryParam(url, key) {
  try {
    if (!url) return '';

    const parsed = new URL(String(url));
    return parsed.searchParams.get(key) || '';
  } catch (e) {
    try {
      const regex = new RegExp(
        '[?&]' + key + '=([^&#]*)',
        'i'
      );

      const match = String(url || '').match(regex);

      return match
        ? decodeURIComponent(
            match[1].replace(/\+/g, ' ')
          )
        : '';
    } catch (err) {
      return '';
    }
  }
}

function asArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (Array.isArray(value.events)) return value.events;
  if (Array.isArray(value.appointments)) return value.appointments;
  if (Array.isArray(value.data)) return value.data;
  if (Array.isArray(value.calendarEvents)) return value.calendarEvents;
  if (Array.isArray(value.notes)) return value.notes;

  return [];
}

const ghlOpportunity =
  opportunityResponse.opportunity ||
  opportunityResponse.data ||
  opportunityResponse ||
  {};

function resolveUserNameFromConfig(id, email, name) {
  const userMap = cfg.user_map || {};
  const emailMap = cfg.user_email_map || {};

  const cleanId = String(id || '').trim();
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanName = String(name || '').trim();

  if (cleanId && userMap[cleanId]) {
    return {
      id: cleanId,
      name: userMap[cleanId],
      source: 'opportunity.assignedTo:user_map'
    };
  }

  if (cleanEmail && emailMap[cleanEmail]) {
    return {
      id: cleanId,
      name: emailMap[cleanEmail],
      source: 'opportunity.email:user_email_map'
    };
  }

  if (cleanName) {
    return {
      id: cleanId,
      name: cleanName,
      source: 'name_fallback'
    };
  }

  return {
    id: cleanId,
    name: '',
    source: 'not_resolved'
  };
}

const contact =
  contactResponse.contact ||
  contactResponse ||
  {};

function getCustomFieldValue(obj, possibleNames) {
  const fields =
    obj.customFields ||
    obj.customField ||
    obj.custom_fields ||
    obj.customData ||
    [];

  if (!Array.isArray(fields)) return '';

  const normalizedNames = possibleNames.map(name =>
    normalizeText(name)
  );

  for (const field of fields) {
    const name = normalizeText(
      field.name ||
      field.fieldName ||
      field.key ||
      field.label ||
      field.id ||
      ''
    );

    if (normalizedNames.includes(name)) {
      return firstValue(
        field.value,
        field.fieldValue,
        field.field_value
      );
    }
  }

  return '';
}

function getCustomFieldById(obj, ids) {
  const fields =
    obj.customFields ||
    obj.customField ||
    obj.custom_fields ||
    obj.customData ||
    [];

  if (!Array.isArray(fields)) return '';

  const validIds = Array.isArray(ids)
    ? ids.filter(Boolean)
    : [ids].filter(Boolean);

  for (const field of fields) {
    if (validIds.includes(field.id)) {
      return firstValue(
        field.fieldValue,
        field.value,
        field.field_value
      );
    }
  }

  return '';
}

// =============================================================================
// CUSTOM FIELDS
// =============================================================================

const GHL_FIELD_ID_FUENTE_ORIGEN =
  customFieldIdsConfig.fuente_origen || '';

const GHL_FIELD_ID_DIAS_RECONTACTO =
  customFieldIdsConfig.dias_recontacto || '';

const GHL_FIELD_ID_MOTIVO_PERDIDA =
  customFieldIdsConfig.motivo_perdida || '';

const GHL_FIELD_ID_FECHA_RENOVACION_UPSELL =
  customFieldIdsConfig.fecha_renovacion_upsell || '';

const GHL_FIELD_ID_FECHA_INICIO_ONBOARDING =
  customFieldIdsConfig.fecha_inicio_onboarding || '';

const GHL_FIELD_ID_FECHA_PROYECTO_FINALIZADO =
  customFieldIdsConfig.fecha_proyecto_finalizado || '';

const GHL_FIELD_IDS_EMPRESA =
  customFieldIdsConfig.empresa || [];

const GHL_FIELD_IDS_EMAIL =
  customFieldIdsConfig.email || [];

const GHL_FIELD_IDS_PHONE =
  customFieldIdsConfig.phone || [];

const rawCustom =
  normalizedOpportunity.raw?.customData || {};

const opportunityFuenteOrigen = firstValue(
  getCustomFieldById(
    ghlOpportunity,
    [GHL_FIELD_ID_FUENTE_ORIGEN]
  ),
  normalizedOpportunity.custom?.fuente_origen,
  normalizedOpportunity.custom?.lead_source,
  normalizedOpportunity.lead_source,
  ghlOpportunity.source,
  normalizedOpportunity.raw?.source,
  normalizedOpportunity.raw?.opportunity_source
);

const diasParaRecontacto = firstValue(
  getCustomFieldById(
    ghlOpportunity,
    [GHL_FIELD_ID_DIAS_RECONTACTO]
  ),
  normalizedOpportunity.custom?.dias_para_recontacto,
  normalizedOpportunity.custom?.dias_recontacto,
  normalizedOpportunity.custom?.dias_para_recontactar,
  rawCustom.dias_para_recontacto,
  rawCustom.dias_recontacto,
  rawCustom.dias_para_recontactar
);

const motivoPerdida = firstValue(
  normalizedOpportunity.custom?.motivo_perdida,
  rawCustom.motivo_perdida,
  getCustomFieldById(
    ghlOpportunity,
    [GHL_FIELD_ID_MOTIVO_PERDIDA]
  )
);

const fechaInicioOnboarding = firstValue(
  normalizedOpportunity.custom?.fecha_inicio_onboarding,
  rawCustom.fecha_inicio_onboarding,
  getCustomFieldById(
    ghlOpportunity,
    [GHL_FIELD_ID_FECHA_INICIO_ONBOARDING]
  )
);

const fechaProyectoFinalizado = firstValue(
  normalizedOpportunity.custom?.fecha_proyecto_finalizado,
  rawCustom.fecha_proyecto_finalizado,
  getCustomFieldById(
    ghlOpportunity,
    [GHL_FIELD_ID_FECHA_PROYECTO_FINALIZADO]
  )
);

const fechaRenovacionUpsell = firstValue(
  normalizedOpportunity.custom?.fecha_renovacion_upsell,
  rawCustom.fecha_renovacion_upsell,
  getCustomFieldById(
    ghlOpportunity,
    [GHL_FIELD_ID_FECHA_RENOVACION_UPSELL]
  )
);

const contactEmail = firstValue(
  normalizedOpportunity.email,
  normalizedOpportunity.custom?.contact_email,
  getCustomFieldById(
    ghlOpportunity,
    GHL_FIELD_IDS_EMAIL
  ),
  getCustomFieldById(
    contact,
    GHL_FIELD_IDS_EMAIL
  ),
  ghlOpportunity.contact?.email,
  contact.email,
  contact.contactEmail
);

const contactPhone = firstValue(
  normalizedOpportunity.phone,
  normalizedOpportunity.custom?.contact_phone,
  getCustomFieldById(
    ghlOpportunity,
    GHL_FIELD_IDS_PHONE
  ),
  getCustomFieldById(
    contact,
    GHL_FIELD_IDS_PHONE
  ),
  ghlOpportunity.contact?.phone,
  contact.phone,
  contact.contactPhone
);

const opportunityCompany = firstValue(
  normalizedOpportunity.company_name,
  normalizedOpportunity.custom?.business_name,

  getCustomFieldById(
    ghlOpportunity,
    GHL_FIELD_IDS_EMPRESA
  ),

  getCustomFieldById(
    contact,
    GHL_FIELD_IDS_EMPRESA
  ),

  ghlOpportunity.companyName,
  ghlOpportunity.company_name,
  ghlOpportunity.businessName,
  ghlOpportunity.business_name,
  ghlOpportunity.company,
  ghlOpportunity.business,
  ghlOpportunity.contact?.companyName,
  ghlOpportunity.contact?.company_name,

  contact.companyName,
  contact.company_name,
  contact.businessName,
  contact.business_name,

  getCustomFieldValue(ghlOpportunity, [
    'Nombre del negocio',
    'Nombre de negocio',
    'Empresa',
    'Empresa / Marca',
    'Company Name',
    'Business Name'
  ]),

  getCustomFieldValue(contact, [
    'Nombre del negocio',
    'Nombre de negocio',
    'Empresa',
    'Empresa / Marca',
    'Company Name',
    'Business Name'
  ])
);

// =============================================================================
// ATRIBUCIÃƒâ€œN / UTMs / META ADS
// =============================================================================

const attributionCandidates = [
  contact.lastAttributionSource,
  contact.attributionSource,

  getNested(
    contactResponse,
    'contact.lastAttributionSource'
  ),

  getNested(
    contactResponse,
    'contact.attributionSource'
  ),

  getNested(
    opportunityResponse,
    'opportunity.contact.lastAttributionSource'
  ),

  getNested(
    opportunityResponse,
    'opportunity.contact.attributionSource'
  ),

  getNested(
    normalizedOpportunity,
    'raw.contact.lastAttributionSource'
  ),

  getNested(
    normalizedOpportunity,
    'raw.contact.attributionSource'
  ),

  getNested(
    normalizedOpportunity,
    'raw.lastAttributionSource'
  ),

  getNested(
    normalizedOpportunity,
    'raw.attributionSource'
  ),

  getNested(
    normalizedOpportunity,
    'raw.contact_details.contact.lastAttributionSource'
  ),

  getNested(
    normalizedOpportunity,
    'raw.contact_details.contact.attributionSource'
  )
].filter(Boolean);

function getAttributionValue(...keys) {
  for (const source of attributionCandidates) {
    for (const key of keys) {
      const value = source[key];

      if (
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ''
      ) {
        return value;
      }
    }
  }

  return '';
}

const attributionUrl = firstValue(
  getAttributionValue(
    'url',
    'landingUrl',
    'landing_url',
    'pageUrl',
    'page_url'
  ),
  normalizedOpportunity.raw?.url,
  normalizedOpportunity.raw?.page_url,
  normalizedOpportunity.raw?.landing_url
);

const utmSource = firstValue(
  getAttributionValue(
    'utmSource',
    'utm_source'
  ),
  getQueryParam(
    attributionUrl,
    'utm_source'
  )
);

const utmMedium = firstValue(
  getAttributionValue(
    'utmMedium',
    'utm_medium'
  ),
  getQueryParam(
    attributionUrl,
    'utm_medium'
  ),
  getAttributionValue('medium')
);

const utmCampaign = firstValue(
  getAttributionValue(
    'utmCampaign',
    'utm_campaign',
    'campaign'
  ),
  getQueryParam(
    attributionUrl,
    'utm_campaign'
  )
);

const utmContent = firstValue(
  getAttributionValue(
    'utmContent',
    'utm_content'
  ),
  getQueryParam(
    attributionUrl,
    'utm_content'
  )
);

const utmTerm = firstValue(
  getAttributionValue(
    'utmTerm',
    'utm_term'
  ),
  getQueryParam(
    attributionUrl,
    'utm_term'
  )
);

const utmKeyword = firstValue(
  getAttributionValue(
    'utmKeyword',
    'utm_keyword'
  ),
  getQueryParam(
    attributionUrl,
    'utm_keyword'
  )
);

const utmMatchtype = firstValue(
  getAttributionValue(
    'utmMatchtype',
    'utm_matchtype'
  ),
  getQueryParam(
    attributionUrl,
    'utm_matchtype'
  )
);

const metaCampaignId = firstValue(
  getAttributionValue(
    'campaignId',
    'campaign_id',
    'campaignID'
  ),
  getQueryParam(
    attributionUrl,
    'campaign_id'
  ),
  getQueryParam(
    attributionUrl,
    'utm_campaign_id'
  ),
  getQueryParam(
    attributionUrl,
    'meta_campaign_id'
  )
);

const metaCampaignName = firstValue(
  getAttributionValue(
    'campaignName',
    'campaign_name'
  ),
  getQueryParam(
    attributionUrl,
    'campaign_name'
  ),
  getQueryParam(
    attributionUrl,
    'utm_campaign_name'
  ),
  utmCampaign
);

const metaAdsetId = firstValue(
  getAttributionValue(
    'adsetId',
    'adset_id',
    'adSetId',
    'adGroupId',
    'ad_group_id',
    'adgroup_id'
  ),
  getQueryParam(
    attributionUrl,
    'adset_id'
  ),
  getQueryParam(
    attributionUrl,
    'utm_adset_id'
  ),
  getQueryParam(
    attributionUrl,
    'adgroup_id'
  ),
  getQueryParam(
    attributionUrl,
    'ad_group_id'
  ),
  getQueryParam(
    attributionUrl,
    'meta_adset_id'
  )
);

const metaAdsetName = firstValue(
  getAttributionValue(
    'adsetName',
    'adset_name',
    'adSetName',
    'adGroupName',
    'ad_group_name'
  ),
  getQueryParam(
    attributionUrl,
    'adset_name'
  ),
  getQueryParam(
    attributionUrl,
    'utm_adset_name'
  ),
  getQueryParam(
    attributionUrl,
    'adgroup_name'
  ),
  getQueryParam(
    attributionUrl,
    'ad_group_name'
  ),
  utmTerm
);

const metaAdId = firstValue(
  getAttributionValue(
    'adId',
    'ad_id',
    'adID'
  ),
  getQueryParam(
    attributionUrl,
    'ad_id'
  ),
  getQueryParam(
    attributionUrl,
    'utm_ad_id'
  ),
  getQueryParam(
    attributionUrl,
    'meta_ad_id'
  )
);

const metaAdName = firstValue(
  getAttributionValue(
    'adName',
    'ad_name'
  ),
  getQueryParam(
    attributionUrl,
    'ad_name'
  ),
  getQueryParam(
    attributionUrl,
    'utm_ad_name'
  ),
  utmContent
);

const fbclid = firstValue(
  getAttributionValue('fbclid'),
  getQueryParam(
    attributionUrl,
    'fbclid'
  )
);

const gclid = firstValue(
  getAttributionValue('gclid'),
  getQueryParam(
    attributionUrl,
    'gclid'
  )
);

const attributionData = {
  utm_source: utmSource,
  utm_medium: utmMedium,
  utm_campaign: utmCampaign,
  utm_content: utmContent,
  utm_term: utmTerm,
  utm_keyword: utmKeyword,
  utm_matchtype: utmMatchtype,

  attribution_url: attributionUrl,
  attribution_referrer:
    getAttributionValue('referrer'),

  attribution_session_source:
    getAttributionValue('sessionSource'),

  attribution_medium:
    getAttributionValue('medium'),

  attribution_medium_id:
    getAttributionValue('mediumId'),

  meta_campaign_id: metaCampaignId,
  meta_campaign_name: metaCampaignName,
  meta_adset_id: metaAdsetId,
  meta_adset_name: metaAdsetName,
  meta_ad_id: metaAdId,
  meta_ad_name: metaAdName,

  fbclid,
  gclid,

  gbraid:
    getAttributionValue('gbraid'),

  wbraid:
    getAttributionValue('wbraid'),

  ga_client_id:
    getAttributionValue('gaClientId'),

  ga_session_id:
    getAttributionValue('gaSessionId')
};

// =============================================================================
// NOTAS
// =============================================================================

function buildNotesText() {
  const notes = asArray(notesResponse);

  if (!notes.length) return '';

  const opportunityId =
    normalizedOpportunity.opportunity_id;

  const contactId =
    normalizedOpportunity.contact_id;

  const relevantNotes = notes.filter(note => {
    const relations = note.relations || [];

    if (!relations.length) return true;

    return relations.some(relation =>
      relation.recordId === opportunityId ||
      relation.recordId === contactId
    );
  });

  return relevantNotes
    .sort(
      (a, b) =>
        new Date(a.dateAdded || 0) -
        new Date(b.dateAdded || 0)
    )
    .map(note => {
      const text = firstValue(
        note.bodyText,
        stripHtml(note.body),
        note.title
      );

      if (!text) return '';

      const dateText =
        formatDateTime(note.dateAdded);

      return dateText
        ? `[${dateText}] ${text}`
        : text;
    })
    .filter(Boolean)
    .join('\n');
}

const notesText = buildNotesText();

// =============================================================================
// RESOLUCIÃƒâ€œN DE IDENTIFICADORES
// =============================================================================

function findOpportunityIdInAppointments(value) {
  for (const appointment of asArray(value)) {
    const id = firstValue(
      appointment.opportunityId,
      appointment.opportunity_id,
      appointment.opportunity?.id,
      appointment.meta?.opportunityId,
      appointment.meta?.opportunity_id
    );

    if (id) return id;
  }

  return '';
}

const resolvedOpportunityId = firstValue(
  normalizedOpportunity.opportunity_id,
  normalizedOpportunity.id,

  normalizedOpportunity.raw?.opportunity_id,
  normalizedOpportunity.raw?.opportunityId,
  normalizedOpportunity.raw?.id,

  ghlOpportunity.id,
  ghlOpportunity.opportunityId,

  opportunityResponse.opportunity?.id,
  opportunityResponse.data?.id,

  findOpportunityIdInAppointments(
    appointmentsResponse
  )
);

const resolvedContactId = firstValue(
  normalizedOpportunity.contact_id,
  normalizedOpportunity.raw?.contact_id,
  normalizedOpportunity.raw?.contactId,
  ghlOpportunity.contactId,
  ghlOpportunity.contact?.id,
  contact.id
);

const resolvedPipelineId = firstValue(
  normalizedOpportunity.pipeline_id,
  normalizedOpportunity.raw?.pipeline_id,
  normalizedOpportunity.raw?.pipelineId,
  ghlOpportunity.pipelineId
);

const resolvedStageActual = firstValue(
  normalizedOpportunity.stage_actual,
  normalizedOpportunity.pipeline_stage,
  normalizedOpportunity.pipleline_stage,
  normalizedOpportunity.raw?.stage_actual,
  normalizedOpportunity.raw?.pipeline_stage,
  normalizedOpportunity.raw?.pipleline_stage
);

// Por defecto evita enviar un evento ghl_opportunity incompleto.
// Puede desactivarse desde Config Cliente con:
// suppress_incomplete_opportunity_events: false
const suppressIncompleteOpportunityEvents =
  cfg.suppress_incomplete_opportunity_events !== false;

if (
  suppressIncompleteOpportunityEvents &&
  normalizeText(
    normalizedOpportunity.event_type
  ) === 'ghl_opportunity' &&
  !resolvedOpportunityId
) {
  console.log(
    '[Detect Commercial Appointments] ' +
    'Evento omitido: ghl_opportunity sin opportunity_id. ' +
    `contact_id=${resolvedContactId || ''}`
  );

  return [];
}

// =============================================================================
// OBJETO PRINCIPAL
// =============================================================================

const opportunity = {
  ...normalizedOpportunity,

  opportunity_id:
    resolvedOpportunityId,

  id:
    resolvedOpportunityId ||
    normalizedOpportunity.id ||
    '',

  contact_id:
    resolvedContactId,

  pipeline_id:
    resolvedPipelineId,

  stage_actual:
    resolvedStageActual,

  ...attributionData,

  email:
    contactEmail,

  phone:
    contactPhone,

  company_name:
    opportunityCompany,

  lead_source:
    opportunityFuenteOrigen,

  notes_text:
    notesText,

  custom: {
    ...(normalizedOpportunity.custom || {}),

    fuente_origen:
      opportunityFuenteOrigen,

    lead_source:
      opportunityFuenteOrigen,

    contact_email:
      contactEmail,

    contact_phone:
      contactPhone,

    business_name:
      opportunityCompany,

    ...attributionData,

    dias_para_recontacto:
      diasParaRecontacto,

    dias_recontacto:
      diasParaRecontacto,

    dias_para_recontactar:
      diasParaRecontacto,

    motivo_perdida:
      motivoPerdida,

    fecha_inicio_onboarding:
      fechaInicioOnboarding,

    fecha_proyecto_finalizado:
      fechaProyectoFinalizado,

    fecha_renovacion_upsell:
      fechaRenovacionUpsell,

    proximo_seguimiento_ventas:
      normalizedOpportunity.custom
        ?.proximo_seguimiento_ventas || ''
  },

  raw: {
    ...(normalizedOpportunity.raw || {}),

    opportunity_details:
      opportunityResponse,

    contact_details:
      contactResponse,

    notes_details:
      notesResponse,

    attribution_debug:
      attributionCandidates,

    opportunity_resolution: {
      opportunity_id:
        resolvedOpportunityId,

      contact_id:
        resolvedContactId,

      pipeline_id:
        resolvedPipelineId,

      stage_actual:
        resolvedStageActual
    }
  }
};

const fixedSetterName = firstValue(
  cfg.fixed_setter_name,
  cfg.fixedSetterName,
  cfg.client_name,
  'Gaston Hendlin'
);

const opportunityOwnerId = firstValue(
  ghlOpportunity.assignedTo,
  ghlOpportunity.assignedUserId,
  ghlOpportunity.ownerId,
  normalizedOpportunity.raw?.opportunity_details?.opportunity?.assignedTo,
  normalizedOpportunity.raw?.opportunity_details?.opportunity?.assignedUserId,
  normalizedOpportunity.raw?.opportunity_details?.opportunity?.ownerId
);

const opportunityOwnerEmail = firstValue(
  ghlOpportunity.assignedUser?.email,
  ghlOpportunity.owner?.email,
  normalizedOpportunity.assigned_user_email
);

const opportunityOwnerName = firstValue(
  (cfg.user_map || {})[opportunityOwnerId],
  ghlOpportunity.assignedUser?.name,
  ghlOpportunity.owner?.name,
  normalizedOpportunity.assigned_user_name
);

const resolvedCloserOwner = resolveUserNameFromConfig(
  opportunityOwnerId,
  opportunityOwnerEmail,
  opportunityOwnerName
);

// Regla GastÃ³n: Setter fijo, Closer desde propietario real de la oportunidad.
opportunity.setter = fixedSetterName;
opportunity.fixed_setter_name = fixedSetterName;
opportunity.custom = opportunity.custom || {};
opportunity.custom.agendado_por = fixedSetterName;

if (resolvedCloserOwner.name) {
  opportunity.assigned_user_id = resolvedCloserOwner.id || opportunity.assigned_user_id || '';
  opportunity.owner_id = resolvedCloserOwner.id || opportunity.owner_id || '';
  opportunity.assigned_user_name = resolvedCloserOwner.name;
  opportunity.owner = resolvedCloserOwner.name;
}

opportunity.raw = opportunity.raw || {};
opportunity.raw.owner_resolution_debug = {
  rule: 'gaston_setter_fixed_closer_opportunity_owner',
  fixed_setter_name: fixedSetterName,
  opportunity_assignedTo: opportunityOwnerId,
  opportunity_owner_email: opportunityOwnerEmail,
  opportunity_owner_name_candidate: opportunityOwnerName,
  resolved_closer: resolvedCloserOwner.name,
  resolved_source: resolvedCloserOwner.source,
  ignored_contact_assignedTo: firstValue(
    normalizedOpportunity.raw?.opportunity_details?.opportunity?.contact?.assignedTo,
    normalizedOpportunity.raw?.contact_details?.contact?.assignedTo
  )
};

console.log('[GHL OWNER RESOLUTION]', JSON.stringify(opportunity.raw.owner_resolution_debug));

const now = new Date();

// =============================================================================
// HELPERS DE CITAS
// =============================================================================

function getAppointmentId(appointment) {
  return firstValue(
    appointment?.appointmentId,
    appointment?.appointment_id,
    appointment?.eventId,
    appointment?.event_id,
    appointment?.appointment?.id,
    appointment?.id
  );
}

function getAppointmentRecordId(appointment) {
  return firstValue(
    appointment?.appointmentRecordId,
    appointment?.appointment_record_id,
    appointment?.recordId,
    appointment?.record_id,
    getAppointmentId(appointment)
  );
}

function getCalendarId(appointment) {
  return firstValue(
    appointment?.calendarId,
    appointment?.calendar_id,
    appointment?.calendar?.calendarId,
    appointment?.calendar?.calendar_id,
    appointment?.calendar?.id
  );
}

function getTitle(appointment) {
  return (
    appointment?.title ||
    appointment?.calendar_title ||
    appointment?.calendar?.title ||
    ''
  );
}

function getCalendarName(appointment) {
  return (
    appointment?.calendarName ||
    appointment?.calendar_name ||
    appointment?.calendar?.calendarName ||
    appointment?.calendar?.calendar_name ||
    appointment?.calendar?.name ||
    ''
  );
}

function getStart(appointment) {
  return (
    appointment?.startTime ||
    appointment?.start_time ||
    appointment?.start ||
    appointment?.calendar?.startTime ||
    ''
  );
}

function getEnd(appointment) {
  return (
    appointment?.endTime ||
    appointment?.end_time ||
    appointment?.end ||
    appointment?.calendar?.endTime ||
    ''
  );
}

function getStatus(appointment) {
  return (
    appointment?.appointmentStatus ||
    appointment?.appoinmentStatus ||
    appointment?.appointment_status ||
    appointment?.status ||
    appointment?.calendar?.appointmentStatus ||
    appointment?.calendar?.appoinmentStatus ||
    ''
  );
}

function getMeetingUrl(appointment) {
  return (
    appointment?.address ||
    appointment?.meeting_url ||
    appointment?.meetingUrl ||
    appointment?.calendar?.address ||
    ''
  );
}

function getAppointmentContactId(appointment) {
  return firstValue(
    appointment?.contactId,
    appointment?.contact_id,
    appointment?.contact?.id,
    resolvedContactId
  );
}

function getAppointmentOpportunityId(appointment) {
  return firstValue(
    appointment?.opportunityId,
    appointment?.opportunity_id,
    appointment?.opportunity?.id,
    resolvedOpportunityId
  );
}

function isDeleted(appointment) {
  return (
    appointment?.deleted === true ||
    appointment?.appointmentMeta?.deleted === true
  );
}

function isCancelled(appointment) {
  const status = normalizeText(getStatus(appointment));

  return [
    'cancelled',
    'canceled'
  ].includes(status);
}

function isScheduledStatus(appointment) {
  const status =
    normalizeText(
      getStatus(appointment)
    );

  return [
    'confirmed',
    'new',
    'booked',
    'scheduled'
  ].includes(status);
}

function isTerminalStatus(appointment) {
  const status =
    normalizeText(
      getStatus(appointment)
    );

  return [
    'showed',
    'completed',
    'no_show',
    'noshow',
    'absent',
    'cancelled',
    'canceled'
  ].includes(status);
}

// =============================================================================
// NORMALIZACIÃƒâ€œN DE LA CITA DEL WEBHOOK ORIGINAL
// =============================================================================

function buildAppointmentFromRawCalendar(calendar) {
  if (!calendar) return null;

  /*
   * En el payload original de GHL:
   *
   * calendar.appointmentId = ID de la cita
   * calendar.id            = ID del calendario
   *
   * El cÃƒÂ³digo anterior usaba calendar.id como fallback
   * de appointmentId. Eso confundÃƒÂ­a el ID del calendario
   * con el ID de la cita.
   */

  const appointmentId = firstValue(
    calendar.appointmentId,
    calendar.appointment_id,
    calendar.eventId,
    calendar.event_id
  );

  const calendarId = firstValue(
    calendar.calendarId,
    calendar.calendar_id,
    calendar.id
  );

  return {
    appointmentId,
    appointment_id:
      appointmentId,

    id:
      appointmentId,

    appointmentRecordId:
      appointmentId,

    appointment_record_id:
      appointmentId,

    calendarId,
    calendar_id:
      calendarId,

    calendarName:
      firstValue(
        calendar.calendarName,
        calendar.calendar_name,
        calendar.name
      ),

    calendar_name:
      firstValue(
        calendar.calendarName,
        calendar.calendar_name,
        calendar.name
      ),

    title:
      calendar.title || '',

    startTime:
      firstValue(
        calendar.startTime,
        calendar.start_time
      ),

    endTime:
      firstValue(
        calendar.endTime,
        calendar.end_time
      ),

    appointmentStatus:
      firstValue(
        calendar.appointmentStatus,
        calendar.appoinmentStatus,
        calendar.appointment_status,
        calendar.status
      ),

    appoinmentStatus:
      firstValue(
        calendar.appoinmentStatus,
        calendar.appointmentStatus,
        calendar.appointment_status,
        calendar.status
      ),

    address:
      firstValue(
        calendar.address,
        calendar.meeting_url,
        calendar.meetingUrl
      ),

    contactId:
      firstValue(
        calendar.contactId,
        calendar.contact_id,
        resolvedContactId
      ),

    opportunityId:
      firstValue(
        calendar.opportunityId,
        calendar.opportunity_id,
        resolvedOpportunityId
      ),

    deleted:
      false,

    appointmentMeta: {
      deleted: false
    },

    _source:
      'raw_calendar',

    _sourcePriority:
      100
  };
}

function normalizeApiAppointment(appointment) {
  if (!appointment) return null;

  return {
    ...appointment,

    _source:
      appointment._source ||
      'appointments_api',

    _sourcePriority:
      Number(
        appointment._sourcePriority || 50
      )
  };
}

// =============================================================================
// MERGE / DEDUPE DE CITAS
// =============================================================================

function appointmentMergeKey(appointment) {
  const appointmentId =
    getAppointmentId(appointment);

  if (appointmentId) {
    return `appt|${appointmentId}`;
  }

  const contactId =
    getAppointmentContactId(appointment);

  const start =
    getStart(appointment);

  if (contactId && start) {
    return `contact_start|${contactId}|${start}`;
  }

  const calendarId =
    getCalendarId(appointment);

  const title =
    normalizeText(
      getTitle(appointment)
    );

  if (calendarId && start) {
    return `calendar_start|${calendarId}|${start}`;
  }

  if (title && start) {
    return `title_start|${title}|${start}`;
  }

  return '';
}

function mergeAppointmentRecords(base, incoming) {
  if (!base) return incoming;
  if (!incoming) return base;

  const basePriority =
    Number(base._sourcePriority || 0);

  const incomingPriority =
    Number(incoming._sourcePriority || 0);

  const preferred =
    incomingPriority >= basePriority
      ? incoming
      : base;

  const fallback =
    preferred === incoming
      ? base
      : incoming;

  const appointmentId = firstValue(
    getAppointmentId(preferred),
    getAppointmentId(fallback)
  );

  const calendarId = firstValue(
    getCalendarId(preferred),
    getCalendarId(fallback)
  );

  const calendarName = firstValue(
    getCalendarName(preferred),
    getCalendarName(fallback)
  );

  return {
    ...fallback,
    ...preferred,

    appointmentId,
    appointment_id:
      appointmentId,

    id:
      appointmentId,

    appointmentRecordId:
      firstValue(
        getAppointmentRecordId(preferred),
        getAppointmentRecordId(fallback),
        appointmentId
      ),

    appointment_record_id:
      firstValue(
        getAppointmentRecordId(preferred),
        getAppointmentRecordId(fallback),
        appointmentId
      ),

    calendarId,
    calendar_id:
      calendarId,

    calendarName,
    calendar_name:
      calendarName,

    title:
      firstValue(
        getTitle(preferred),
        getTitle(fallback)
      ),

    startTime:
      firstValue(
        getStart(preferred),
        getStart(fallback)
      ),

    endTime:
      firstValue(
        getEnd(preferred),
        getEnd(fallback)
      ),

    appointmentStatus:
      firstValue(
        getStatus(preferred),
        getStatus(fallback)
      ),

    appoinmentStatus:
      firstValue(
        getStatus(preferred),
        getStatus(fallback)
      ),

    address:
      firstValue(
        getMeetingUrl(preferred),
        getMeetingUrl(fallback)
      ),

    contactId:
      firstValue(
        getAppointmentContactId(preferred),
        getAppointmentContactId(fallback)
      ),

    opportunityId:
      firstValue(
        getAppointmentOpportunityId(preferred),
        getAppointmentOpportunityId(fallback)
      ),

    deleted:
      preferred.deleted === true ||
      fallback.deleted === true,

    appointmentMeta: {
      ...(fallback.appointmentMeta || {}),
      ...(preferred.appointmentMeta || {}),

      deleted:
        preferred.appointmentMeta?.deleted === true ||
        fallback.appointmentMeta?.deleted === true
    },

    _source:
      [
        base._source,
        incoming._source
      ]
        .filter(Boolean)
        .join('+'),

    _sourcePriority:
      Math.max(
        basePriority,
        incomingPriority
      )
  };
}

function uniqueAppointments(list) {
  const byKey = new Map();
  const withoutKey = [];

  for (const appointment of list) {
    if (!appointment) continue;

    const key =
      appointmentMergeKey(appointment);

    if (!key) {
      withoutKey.push(appointment);
      continue;
    }

    if (!byKey.has(key)) {
      byKey.set(
        key,
        appointment
      );
    } else {
      byKey.set(
        key,
        mergeAppointmentRecords(
          byKey.get(key),
          appointment
        )
      );
    }
  }

  return [
    ...byKey.values(),
    ...withoutKey
  ];
}

const rawCalendarAppointment =
  buildAppointmentFromRawCalendar(
    normalizedOpportunity.raw?.calendar
  );

const appointments = uniqueAppointments([
  ...asArray(appointmentsResponse)
    .map(normalizeApiAppointment)
    .filter(Boolean),

  rawCalendarAppointment
]);

// =============================================================================
// CONFIGURACIÃƒâ€œN DE CALENDARIOS
// =============================================================================

function canonicalAppointmentType(key, route) {
  const candidate = normalizeText(
    firstValue(
      route?.type,
      route?.appointment_type,
      route?.appointmentType,
      key
    )
  );

  if (
    candidate === 'r1' ||
    candidate.includes('r1')
  ) {
    return 'r1';
  }

  if (
    candidate === 'r2' ||
    candidate.includes('r2')
  ) {
    return 'r2';
  }

  if (
    candidate === 'r3' ||
    candidate.includes('r3')
  ) {
    return 'r3';
  }

  if (
    candidate.includes('onboarding')
  ) {
    return 'onboarding';
  }

  return candidate;
}

function toFlatArray(...values) {
  const result = [];

  for (const value of values) {
    if (Array.isArray(value)) {
      for (const nested of value) {
        if (
          nested !== undefined &&
          nested !== null &&
          String(nested).trim() !== ''
        ) {
          result.push(
            String(nested).trim()
          );
        }
      }
    } else if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ''
    ) {
      result.push(
        String(value).trim()
      );
    }
  }

  return result;
}

function getCalendarRoutes() {
  return Object.keys(calendarsConfig)
    .map(key => {
      const route =
        calendarsConfig[key] || {};

      if (route.enabled === false) {
        return null;
      }

      return {
        key,

        type:
          canonicalAppointmentType(
            key,
            route
          ),

        route,

        calendarIds:
          toFlatArray(
            route.calendar_id,
            route.calendarId,
            route.id,
            route.calendar_ids,
            route.ids
          ),

        exactNames:
          toFlatArray(
            route.canonical_name,
            route.calendar_name,
            route.calendarName,
            route.name,
            route.exact_names
          ),

        terms:
          toFlatArray(
            route.match_terms,
            route.match,
            route.terms
          )
      };
    })
    .filter(route =>
      route &&
      [
        'r1',
        'r2',
        'r3',
        'onboarding'
      ].includes(route.type)
    );
}

const calendarRoutes =
  getCalendarRoutes();

// =============================================================================
// DETECCIÃƒâ€œN DE TIPO DE CITA
// =============================================================================

function appointmentTypeDetailed(appointment) {
  const calendarId =
    String(
      getCalendarId(appointment) || ''
    ).trim();

  const calendarName =
    normalizeText(
      getCalendarName(appointment)
    );

  const title =
    normalizeText(
      getTitle(appointment)
    );

  // 1. MÃƒÂ¡xima prioridad: calendar_id exacto.
  if (calendarId) {
    for (const route of calendarRoutes) {
      const matchesId =
        route.calendarIds.some(
          id =>
            String(id).trim() ===
            calendarId
        );

      if (matchesId) {
        return {
          type:
            route.type,

          reason:
            'calendar_id',

          score:
            10000,

          matchedValue:
            calendarId
        };
      }
    }
  }

  // 2. Nombre exacto del calendario.
  if (calendarName) {
    for (const route of calendarRoutes) {
      const matchesExactName =
        route.exactNames.some(
          name =>
            normalizeText(name) ===
            calendarName
        );

      if (matchesExactName) {
        return {
          type:
            route.type,

          reason:
            'calendar_name_exact',

          score:
            9000,

          matchedValue:
            getCalendarName(appointment)
        };
      }
    }
  }

  /*
   * 3. Coincidencia ponderada:
   *
   * - calendar_name pesa mÃƒÂ¡s que title
   * - gana el tÃƒÂ©rmino mÃƒÂ¡s especÃƒÂ­fico
   * - ya no gana simplemente la primera ruta
   *   del objeto de configuraciÃƒÂ³n
   */

  const candidates = [];

  for (const route of calendarRoutes) {
    const allTerms = [
      ...route.exactNames,
      ...route.terms
    ]
      .map(normalizeText)
      .filter(Boolean);

    for (const term of allTerms) {
      if (
        calendarName &&
        calendarName.includes(term)
      ) {
        candidates.push({
          type:
            route.type,

          reason:
            'calendar_name_term',

          score:
            5000 + term.length,

          matchedValue:
            term
        });
      }

      if (
        title &&
        title.includes(term)
      ) {
        candidates.push({
          type:
            route.type,

          reason:
            'title_term',

          score:
            1000 + term.length,

          matchedValue:
            term
        });
      }
    }
  }

  if (candidates.length) {
    candidates.sort(
      (a, b) =>
        b.score - a.score
    );

    const best =
      candidates[0];

    const tiedOtherType =
      candidates.find(candidate =>
        candidate.score === best.score &&
        candidate.type !== best.type
      );

    if (!tiedOtherType) {
      return best;
    }
  }

  /*
   * 4. ÃƒÅ¡ltimo fallback: stage.
   *
   * Nunca puede sobrescribir:
   * - calendar_id
   * - calendar_name exacto
   * - coincidencia vÃƒÂ¡lida del calendario
   */

  const stage =
    normalizeText(
      opportunity.stage_actual
    );

  if (/\br1\b/.test(stage)) {
    return {
      type:
        'r1',

      reason:
        'stage_fallback',

      score:
        100,

      matchedValue:
        stage
    };
  }

  if (/\br2\b/.test(stage)) {
    return {
      type:
        'r2',

      reason:
        'stage_fallback',

      score:
        100,

      matchedValue:
        stage
    };
  }

  if (/\br3\b/.test(stage)) {
    return {
      type:
        'r3',

      reason:
        'stage_fallback',

      score:
        100,

      matchedValue:
        stage
    };
  }

  if (
    stage.includes('onboarding')
  ) {
    return {
      type:
        'onboarding',

      reason:
        'stage_fallback',

      score:
        100,

      matchedValue:
        stage
    };
  }

  return {
    type:
      '',

    reason:
      candidates.length
        ? 'ambiguous_match'
        : 'not_detected',

    score:
      0,

    matchedValue:
      ''
  };
}

// =============================================================================
// CONSTRUCCIÃƒâ€œN DEL APPOINTMENT NORMALIZADO
// =============================================================================

function inferCalendarName(appointment, type) {
  const current =
    getCalendarName(appointment);

  if (current) return current;

  const routeEntry =
    calendarRoutes.find(
      route =>
        route.type === type
    );

  if (routeEntry) {
    const configuredName =
      firstValue(
        routeEntry.route.canonical_name,
        routeEntry.route.calendar_name,
        routeEntry.route.calendarName,
        routeEntry.route.name
      );

    if (configuredName) {
      return configuredName;
    }
  }

  if (type === 'r1') {
    return 'Llamada de DiagnÃƒÂ³stico R1';
  }

  if (type === 'r2') {
    return 'Llamada de TÃƒÂ©cnica R2';
  }

  if (type === 'r3') {
    return 'Llamada de Cierre R3';
  }

  if (type === 'onboarding') {
    return 'Calendario de Onboarding';
  }

  return '';
}

function buildAppointment(
  appointment,
  type,
  detection
) {
  return {
    appointment_id:
      getAppointmentId(appointment),

    appointment_record_id:
      getAppointmentRecordId(appointment),

    calendar_id:
      getCalendarId(appointment),

    calendar_name:
      inferCalendarName(
        appointment,
        type
      ),

    calendar_title:
      getTitle(appointment),

    start_time:
      getStart(appointment),

    end_time:
      getEnd(appointment),

    appointment_status:
      getStatus(appointment),

    meeting_url:
      getMeetingUrl(appointment),

    assigned_user_name:
      opportunity.assigned_user_name,

    assigned_user_email:
      opportunity.assigned_user_email,

    detected_type:
      type,

    detected_by:
      detection?.reason || '',

    detected_value:
      detection?.matchedValue || '',

    source:
      appointment?._source || ''
  };
}

function appointmentSelectionRank(item) {
  const appointment = item.appointment;
  const status = normalizeText(getStatus(appointment));
  const start = new Date(getStart(appointment));
  const startMs = start.getTime();
  const isFuture = !Number.isNaN(startMs) && start >= now;

  const cancelled = [
    'cancelled',
    'canceled'
  ].includes(status);

  const noShow = [
    'no_show',
    'noshow',
    'absent'
  ].includes(status);

  const positiveTerminal = [
    'showed',
    'completed'
  ].includes(status);

  const scheduled = isScheduledStatus(appointment);

  /*
   * Prioridad de selecciÃ³n:
   * 1) Citas activas futuras: prÃ³xima fecha real.
   * 2) Citas activas recientes ya pasadas: evita que una no-show vieja tape una reagenda del mismo dÃ­a.
   * 3) Citas realizadas/completadas.
   * 4) Citas sin estado terminal explÃ­cito.
   * 5) No-show/absent: sÃ³lo si no existe una cita activa mÃ¡s nueva.
   * 6) Canceladas: Ãºltimo recurso.
   */
  let group = 0;

  if (scheduled && isFuture) {
    group = 600;
  } else if (scheduled) {
    group = 500;
  } else if (positiveTerminal) {
    group = 400;
  } else if (!status || !isTerminalStatus(appointment)) {
    group = isFuture ? 350 : 300;
  } else if (noShow) {
    group = 200;
  } else if (cancelled) {
    group = 100;
  }

  return {
    group,
    startMs: Number.isNaN(startMs) ? 0 : startMs,
    detectionScore: item.detection?.score || 0
  };
}

function compareAppointmentCandidates(a, b) {
  const rankA = appointmentSelectionRank(a);
  const rankB = appointmentSelectionRank(b);

  if (rankA.group !== rankB.group) {
    return rankB.group - rankA.group;
  }

  /*
   * Para citas futuras activas conviene tomar la prÃ³xima.
   * Para el resto, conviene tomar la mÃ¡s reciente.
   */
  if (rankA.group === 600) {
    return rankA.startMs - rankB.startMs;
  }

  if (rankA.startMs !== rankB.startMs) {
    return rankB.startMs - rankA.startMs;
  }

  return rankB.detectionScore - rankA.detectionScore;
}

function selectAppointment(type) {
  const candidates = appointments
    .map(appointment => ({
      appointment,

      detection:
        appointmentTypeDetailed(
          appointment
        )
    }))
    .filter(item =>
      item.detection.type === type
    )
    .filter(item =>
      getStart(item.appointment)
    )
    .filter(item =>
      !isDeleted(item.appointment)
    )
    .sort(compareAppointmentCandidates);

  const selected =
    candidates[0] ||
    null;

  if (selected) {
    const rank = appointmentSelectionRank(selected);

    console.log(
      '[Detect Commercial Appointments] selected_' + type,
      JSON.stringify({
        appointment_id: getAppointmentId(selected.appointment),
        calendar_id: getCalendarId(selected.appointment),
        start_time: getStart(selected.appointment),
        appointment_status: getStatus(selected.appointment),
        detected_by: selected.detection?.reason || '',
        detected_value: selected.detection?.matchedValue || '',
        rank_group: rank.group
      })
    );
  }

  return selected
    ? buildAppointment(
        selected.appointment,
        type,
        selected.detection
      )
    : null;
}

// =============================================================================
// RESULTADOS
// =============================================================================

opportunity.appointment_r1 =
  selectAppointment('r1');

opportunity.appointment_r2 =
  selectAppointment('r2');

opportunity.appointment_r3 =
  selectAppointment('r3');

opportunity.appointment_onboarding =
  selectAppointment('onboarding');

const selectedAppointments = [
  opportunity.appointment_r1,
  opportunity.appointment_r2,
  opportunity.appointment_r3,
  opportunity.appointment_onboarding
].filter(Boolean);

const primaryAppointmentId = firstValue(
  ...selectedAppointments.map(
    appointment =>
      appointment.appointment_id
  )
);

/*
 * Esta clave no evita por sÃƒÂ­ sola dos ejecuciones distintas
 * del workflow, pero permite que Apps Script implemente
 * idempotencia y omita un payload repetido.
 */
opportunity.idempotency_key = [
  normalizeText(
    opportunity.event_type
  ),

  opportunity.opportunity_id ||
    `contact:${opportunity.contact_id || ''}`,

  normalizeText(
    opportunity.stage_actual
  ),

  primaryAppointmentId || ''
].join('|');

// DiagnÃƒÂ³stico de detecciÃƒÂ³n de calendarios.
opportunity.raw.appointment_detection_debug =
  appointments.map(appointment => {
    const detection =
      appointmentTypeDetailed(
        appointment
      );

    return {
      appointment_id:
        getAppointmentId(appointment),

      calendar_id:
        getCalendarId(appointment),

      calendar_name:
        getCalendarName(appointment),

      calendar_title:
        getTitle(appointment),

      start_time:
        getStart(appointment),

      detected_type:
        detection.type,

      detected_by:
        detection.reason,

      detected_value:
        detection.matchedValue,

      appointment_status:
        getStatus(appointment),

      selection_rank:
        appointmentSelectionRank({ appointment, detection }),

      source:
        appointment._source || ''
    };
  });

return [{ json: opportunity }];
