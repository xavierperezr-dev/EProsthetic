import { DentalCase, RestorationType, CaseStatus, N1Type, ConnectionType } from './types';

// FIX: Added 'caseNumber' to each case object to satisfy the DentalCase interface and fix compilation errors.
export const MOCK_CASES: DentalCase[] = [
  {
    id: "EXO024",
    caseNumber: 1,
    patientName: {
      en: "Procera Esthetic Zirconia Implant Bridge",
      es: "Puente sobre implantes Procera Zirconia estética",
      pt: "Ponte sobre implantes Procera Zircónia estética",
      fr: "Bridge sur implants Procera Zircone esthétique",
      sv: "Bro på implantat Procera Esthetic Zirconia"
    },
    restorationType: [RestorationType.Multiple],
    connectionType: ConnectionType.MultiUnit,
    compatibleConnections: [ConnectionType.CC, ConnectionType.Branemark, ConnectionType.TriChannel, ConnectionType.MultiUnit],
    status: CaseStatus.Procera,
    reference: "REF-2024-10-30",
    imageUrls: [
      "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9maWxlXC9ZVkpNZHhqRnRFdmhRQmhSVHU1Qy5wbmcifQ:nobelbiocare:Ew0ZvAunJ3t8QHNcKxRBnNTsT3PzI9PU3lt8npMVK2Y?width=2400",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQayRVojtUBmx1rlYa1JLJ4kw50M68HDAbCIBAETQTyYsi7GFYSF9auLjHfkYvnjKDK0Zw&usqp=CAU",
      "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9maWxlXC9YU3FWcWlqc0xBdmloOWhRbTg1Vi5wbmcifQ:nobelbiocare:SyXEFyqxTRgc8c-6akXKBYIrMhKy9o4gJqnq0QJC2ow?width=2400",
      "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9maWxlXC9rVEtKYU1KVkVXaHllbWpHa3NESC5wbmcifQ:nobelbiocare:plT9WjkSPV4hxsGpITJnn0-La1b_H1DMWN7V1mCvCEU?width=2400"
    ],
    notes: "tornillo clínico incluido",
    baseCementada: false,
    angulacion: true,
    torque: 35,
  },
  {
    id: "EXO025",
    caseNumber: 2,
    patientName: {
      en: "Procera Zirconia Implant Bridge",
      es: "Puente sobre implantes Procera Zirconia",
      pt: "Ponte sobre implantes Procera Zircónia",
      fr: "Bridge sur implants Procera Zircone",
      sv: "Bro på implantat Procera Zirconia"
    },
    restorationType: [RestorationType.Multiple],
    connectionType: ConnectionType.MultiUnit,
    compatibleConnections: [ConnectionType.CC, ConnectionType.Branemark, ConnectionType.TriChannel, ConnectionType.MultiUnit],
    status: CaseStatus.Procera,
    reference: "REF-2024-11-05",
    imageUrls: ["https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9hY2NvdW50c1wvZTdcLzQwMDAzOTVcL3Byb2plY3RzXC8xOVwvYXNzZXRzXC8zYVwvMjY4NlwvODk0ZGIxN2EyMjc1NjNjYWViZjNjODRjYTI5MWJiNDgtMTU3NDk0ODc1NC5wbmcifQ:nobelbiocare:Qo3WqeSGrZ9ZyLx1kdFlNDT9jpmVAs1_5xB0H4b25ag?width=2400", "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9maWxlXC9rVEtKYU1KVkVXaHllbWpHa3NESC5wbmcifQ:nobelbiocare:plT9WjkSPV4hxsGpITJnn0-La1b_H1DMWN7V1mCvCEU?width=2400", "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9hY2NvdW50c1wvZTdcLzQwMDAzOTVcL3Byb2plY3RzXC8xOVwvYXNzZXRzXC9kOFwvNDQ5NVwvYmE3Nzk1YWI1MzNjYWU0N2ZhNzgzMzIxYWFkZjgzY2EtMTYxNDY4OTc1OC5wbmcifQ:nobelbiocare:pEaKlkv_KA1AuWpQewPUhk7ACSCnQbB_sd2MWZlv-Sk?width=2400"],
    notes: "tornillo clínico incluido",
    baseCementada: false,
    angulacion: true,
    torque: 35,
  },
  {
    id: "EXO026",
    caseNumber: 3,
    patientName: {
      en: "Procera FCZ Implant Crown",
      es: "Procera FCZ Implant Crown",
      pt: "Coroa de Implante Procera FCZ",
      fr: "Couronne implantaire Procera FCZ",
      sv: "Procera FCZ Implantatkrona"
    },
    restorationType: [RestorationType.Unitaria],
    connectionType: ConnectionType.CC,
    status: CaseStatus.Procera,
    reference: "REF-2024-11-10",
    imageUrls: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQarOiIjJggTXuc7zQ5d7p2jYtH5yevU9RD6g&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC0L_v1Q20Yd04pAaewb3s3Q5bekPetQ_uyQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDEeYSEDuw_oR5V-4cn6P3pjWgtZh2l2qdTA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTclaOzYaBnbqBM2AHux0tWqy8-x52IwV-G89i19L0T9_s_8b9qzBRoARtQIdDyJQkDG_0&usqp=CAU",
      "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9hY2NvdW50c1wvZTdcLzQwMDAzOTVcL3Byb2plY3RzXC8xOVwvYXNzZXRzXC8xYlwvNDAwMFwvYjBjNWU2YjAyZmFkZmE3ZDM0MDFmMGMyMjZkM2MyNjMtMTU5NDkwMTIwNC5wbmcifQ:nobelbiocare:gVG8P_BR-ZyME5FuXku7GVtOCvJ4PPaNjR32ccDQFzM?width=2400"
    ],
    notes: "tornillo clínico incluido",
    baseCementada: false,
    angulacion: true,
    torque: 35,
  },
  {
    id: "EXO028",
    caseNumber: 4,
    patientName: {
      en: "Procera Titanium Abutment ASC",
      es: "Pilar Procera de Titanio ASC",
      pt: "Pilar Procera de Titânio ASC",
      fr: "Pilier Procera en Titane ASC",
      sv: "Procera Distans i Titan ASC"
    },
    restorationType: [RestorationType.Unitaria],
    connectionType: ConnectionType.CC,
    compatibleConnections: [ConnectionType.CC, ConnectionType.TriChannel],
    status: CaseStatus.Procera,
    reference: "REF-2024-11-20",
    imageUrls: [
      "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9maWxlXC9aNEhNSFQzR0xKTTg4S2JnM1BCTi5wbmcifQ:nobelbiocare:-KmvRaNNExJhsgyAcBUKLzepmNJZcl3C1hL67HQrGC4?width=2400",
      "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9maWxlXC9jM3h1eWRpTDhmTWpUN3EzZGQyWS5wbmcifQ:nobelbiocare:2j09f00qBer-SRjrUOTuROm5xmc2GWzFGFZ6MsGtRGA?width=2400",
      "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9maWxlXC9mZENRMmV4ejZHOWpNUFZVVUREdC5wbmcifQ:nobelbiocare:aZPh5r0TGp0eU-sAH0_MQ3B3OeyAwit9DZ7BAaVdWt0?width=2400",
      "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9maWxlXC83NXRkVE1KbUY4NUxjeDV6bWlBQy5wbmcifQ:nobelbiocare:cf3WdEYPHPd4vxvl8t_Xt92TctDJiGWxvWy6PEr2igo?width=2400",
      "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9maWxlXC9ZZHVSZFRaS0RwcnRUOGtndXZheC5wbmcifQ:nobelbiocare:delWcPwjA18N8oFW3IOx1o8BEueHRhwrmen1MXFBYkU?width=2400"
    ],
    notes: "tornillo clínico incluido",
    baseCementada: false,
    angulacion: true,
    torque: 35,
  },
  {
    id: "EXO027",
    caseNumber: 5,
    patientName: {
      en: "Procera Titanium Abutment",
      es: "Pilar Procera de Titanio",
      pt: "Pilar Procera de Titânio",
      fr: "Pilier Procera en Titane",
      sv: "Procera Distans i Titan"
    },
    restorationType: [RestorationType.Unitaria],
    connectionType: ConnectionType.CC,
    compatibleConnections: [ConnectionType.CC, ConnectionType.Branemark, ConnectionType.TriChannel],
    status: CaseStatus.Procera,
    reference: "REF-2024-11-15",
    imageUrls: [
      "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9maWxlXC9FMW9LOWpWMVdvTnR4VXhGOFFBRS5wbmcifQ:nobelbiocare:mVJePDiR8qIbfm-9b27n3_xH3pwVH1FDjRkJQB1pPYU?width=2400",
      "https://c2-preview.prosites.com/148681/wy/images/products/nobel/abutment/nobelprocera-titanium-abutments.jpg"
    ],
    notes: "tornillo clínico incluido",
    baseCementada: false,
    angulacion: false,
    torque: 35,
  },
  {
    id: "EXO030",
    caseNumber: 6,
    patientName: {
      en: "Procera Zirconia Abutment",
      es: "Pilar Procera de Zirconia",
      pt: "Pilar Procera de Zircónia",
      fr: "Pilier Procera en Zircone",
      sv: "Procera Distans i Zirconia"
    },
    restorationType: [RestorationType.Unitaria],
    connectionType: ConnectionType.CC,
    compatibleConnections: [ConnectionType.CC, ConnectionType.Branemark, ConnectionType.TriChannel],
    status: CaseStatus.Procera,
    reference: "REF-2024-11-30",
    imageUrls: ["https://c2-preview.prosites.com/148681/wy/images/products/nobel/abutment/nobelprocera-zirconia-abutments.jpg"],
    notes: "tornillo clínico incluido",
    baseCementada: false,
    angulacion: false,
    torque: 35,
  },
  {
    id: "EXO029",
    caseNumber: 7,
    patientName: {
      en: "Procera Titanium Implant Bridge",
      es: "Puente sobre implantes Procera de Titanio",
      pt: "Ponte sobre implantes Procera de Titânio",
      fr: "Bridge sur implants Procera en Titane",
      sv: "Bro på implantat Procera i Titan"
    },
    restorationType: [RestorationType.Multiple],
    connectionType: ConnectionType.MultiUnit,
    compatibleConnections: [ConnectionType.CC, ConnectionType.Branemark, ConnectionType.TriChannel, ConnectionType.MultiUnit],
    status: CaseStatus.Procera,
    reference: "REF-2024-11-25",
    imageUrls: [
      "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9hY2NvdW50c1wvZTdcLzQwMDAzOTVcL3Byb2plY3RzXC8xOVwvYXNzZXRzXC9hOFwvMjY3NVwvNDg2MTIzYzczYzdmZjhmODJjNzMzYjdjYTFjNjU2NTAtMTU3NDk0ODc1NC5wbmcifQ:nobelbiocare:tIN-EFbmW1GZme3wcGNbIlpqXJqCxcywx_Cyuhf4eQE?width=2400",
      "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9maWxlXC90Y1lWTFpERkFLR2JIOXJRR0o4aC5wbmcifQ:nobelbiocare:hFyalG0mVPkDhA7H3rZ8A5yWu4mfDP2nnjkrgk_NhG8?width=2400"
    ],
    notes: "tornillo clínico incluido",
    baseCementada: false,
    angulacion: false,
    torque: 35,
  },
  {
    id: "EXO031",
    caseNumber: 8,
    patientName: {
      en: "Procera Cement-Retained Crowns and Bridges",
      es: "Coronas y puentes Procera cementados",
      pt: "Coroas e pontes Procera cimentadas",
      fr: "Couronnes et bridges Procera cimentés",
      sv: "Procera cementerade kronor och broar"
    },
    restorationType: [RestorationType.Unitaria, RestorationType.Multiple],
    connectionType: ConnectionType.CC,
    status: CaseStatus.Procera,
    reference: "REF-2024-12-05",
    imageUrls: [
      "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9hY2NvdW50c1wvZTdcLzQwMDAzOTVcL3Byb2plY3RzXC8xOVwvYXNzZXRzXC84NlwvNDIwMFwvNWIwODI5YzlhNjA2ZDkyZDc2OGVjZGM1MjYxYzQ2MWMtMTYwNzUyNjQ1NS5wbmcifQ:nobelbiocare:Kj6iHX-efm5sxPvUHv1xuZjUmelYq8YB-W9ORAhYfiA?width=2400",
      "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9hY2NvdW50c1wvZTdcLzQwMDAzOTVcL3Byb2plY3RzXC8xOVwvYXNzZXRzXC8yYlwvNDE5N1wvODg0MTE4YTc1ZjI2YjY2ZGI1NmZmNGJlMjRjNWQ2ZGYtMTYwNzUyNjQ1NS5wbmcifQ:nobelbiocare:1XFhqlbhkWHwQ2P1Inp7JpCIb0iaAWM_Rg_gY45KBls?width=2400",
      "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9hY2NvdW50c1wvZTdcLzQwMDAzOTVcL3Byb2plY3RzXC8xOVwvYXNzZXRzXC8wYlwvNDE5OFwvY2M1M2M4OWI5NzExNTVhMjQ1ODg3Zjk2NTQwYWM2ZGUtMTYwNzUyNjQ1NS5wbmcifQ:nobelbiocare:cUBN1yFss-gEahuFZczV5rswWV2TggMaoQJ3SLarGVU?width=2400"
    ],
    baseCementada: false,
    angulacion: 'N/A',
    observaciones: "Para pilares personalizados o dientes naturales",
  },
  {
    id: "EXO032",
    caseNumber: 9,
    patientName: {
      en: "NobelProcera Titanium Bars",
      es: "Barras de titanio NobelProcera",
      pt: "Barras de titânio NobelProcera",
      fr: "Barres en titane NobelProcera",
      sv: "NobelProcera bar i titan"
    },
    restorationType: [RestorationType.Multiple],
    connectionType: ConnectionType.MultiUnit,
    compatibleConnections: [ConnectionType.CC, ConnectionType.Branemark, ConnectionType.TriChannel, ConnectionType.MultiUnit],
    status: CaseStatus.Procera,
    reference: "REF-2024-12-10",
    imageUrls: [
      "https://res.cloudinary.com/broadcastmed/image/fetch/f_jpg,q_auto,c_fill,g_faces:center,h_480,w_480/https://insidedentistry.net/media/f1rfczqu/38964.jpg?v=1db398f335f9410",
      "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9hY2NvdW50c1wvZTdcLzQwMDAzOTVcL3Byb2plY3RzXC8xOVwvYXNzZXRzXC9mOFwvMjY3MVwvYjEyMzk0Yzk0YjJiZTg2YTBlYjI5ZjJmYmNkYzZiZmYtMTU3NDk0ODc1NC5wbmcifQ:nobelbiocare:3k6x5WWJxrpmeK-mC82SgNhtEW7aLKlfBx6RGZ_gvec?width=2400",
      "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9hY2NvdW50c1wvZTdcLzQwMDAzOTVcL3Byb2plY3RzXC8xOVwvYXNzZXRzXC9hOFwvMjY3NFwvODcyODgwYzUxMmFiZjE3Mjc4YWFkMDc5OTNmMzdkOGItMTU3NDk0ODc1NC5wbmcifQ:nobelbiocare:Fxoem44noBJgpoVoCSyhP8JLKCkqptCy0uMmbPbGvzA?width=2400",
      "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9hY2NvdW50c1wvZTdcLzQwMDAzOTVcL3Byb2plY3RzXC8xOVwvYXNzZXRzXC84OFwvMjY3M1wvZDQwYWViNjU1ZmNhODZkZWI1ODlkODI4OGFmYzk5ZjEtMTU3NDk0ODc1NC5wbmcifQ:nobelbiocare:o2j5VBcqjckMY08Hw26C7Na9ezhjCfB9a3WQHW4Jnsw?width=2400"
    ],
    notes: "tornillo clínico incluido",
    baseCementada: false,
    angulacion: false,
    torque: 35,
  },
  {
    id: "EXO021",
    caseNumber: 10,
    patientName: {
      en: "Universal Base Non-engaging",
      es: "Base Universal No rotatoria",
      pt: "Base Universal Não rotatória",
      fr: "Base Universelle non rotative",
      sv: "Universal Base Icke-roterande"
    },
    restorationType: [RestorationType.Unitaria],
    connectionType: ConnectionType.CC,
    compatibleConnections: [ConnectionType.CC, ConnectionType.Branemark, ConnectionType.TriChannel],
    status: CaseStatus.Local,
    reference: "REF-2024-10-15",
    imageUrls: ["https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/301363_universal_base_non_engaging_s_cc_rp_2887.png"],
    notes: "tornillo clínico incluido",
    torque: 35,
  },
  {
    id: "EXO022",
    caseNumber: 11,
    patientName: {
      en: "Nobel Biocare® - Universal Base Engaging",
      es: "Nobel Biocare® - Base Universal Rotatoria",
      pt: "Nobel Biocare® - Base Universal Rotatória",
      fr: "Nobel Biocare® - Base Universelle Rotative",
      sv: "Nobel Biocare® - Universal Base Roterande"
    },
    restorationType: [RestorationType.Multiple],
    connectionType: ConnectionType.MultiUnit,
    compatibleConnections: [ConnectionType.CC, ConnectionType.Branemark, ConnectionType.TriChannel, ConnectionType.MultiUnit],
    status: CaseStatus.Local,
    reference: "REF-2024-10-20",
    imageUrls: [
      "https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/301363_universal_base_non_engaging_s_cc_rp_2887.png",
      "https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoibm9iZWxiaW9jYXJlXC9maWxlXC9qOXlLMlR1eEE5M1dQc1pHMWRmNS5wbmcifQ:nobelbiocare:q9qCSkH5OX9qPJqctQ6fKvkISyYKjmuLKeXcc3RcCHg?width=2400",
      "https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/301241_d390.png",
      "https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/301236_6cf1.png"
    ],
    notes: "tornillo clínico incluido",
    torque: 15,
  },
  {
    id: "EXO013",
    caseNumber: 12,
    patientName: {
      en: "Universal Base on N1 Base",
      es: "Base Universal sobre base N1",
      pt: "Base Universal sobre base N1",
      fr: "Base Universelle sur base N1",
      sv: "Universal Base på N1 bas"
    },
    restorationType: [RestorationType.Unitaria, RestorationType.Multiple],
    connectionType: ConnectionType.N1Base,
    status: CaseStatus.Local,
    reference: "REF-2024-09-05",
    imageUrls: [
      "https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/301006_26b3.png",
      "https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/301010_48b1.png"
    ],
    notes: "tornillo clínico incluido",
    baseCementada: true,
    torque: 20,
  },
  {
    id: "EXO006",
    caseNumber: 13,
    patientName: {
      en: "Universal Base on N1 TCC",
      es: "Base Universal sobre N1 TCC",
      pt: "Base Universal sobre N1 TCC",
      fr: "Base Universelle sur N1 TCC",
      sv: "Universal Base på N1 TCC"
    },
    restorationType: [RestorationType.Unitaria],
    connectionType: ConnectionType.N1,
    n1Type: N1Type.TCC,
    status: CaseStatus.Local,
    reference: "REF-2024-08-25",
    imageUrls: ["https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/300946_2d94.png"],
    baseCementada: true,
    angulacion: false,
    observaciones: "Diámetro NP no apto para molares",
    notes: "tornillo clínico incluido",
    torque: 20,
  },
  {
    id: "EXO014",
    caseNumber: 14,
    patientName: {
      en: "Standard Abutment",
      es: "Pilar Standard",
      pt: "Pilar Padrão",
      fr: "Pilier Standard",
      sv: "Standarddistans"
    },
    restorationType: [RestorationType.Unitaria],
    connectionType: ConnectionType.N1,
    compatibleConnections: [ConnectionType.CC, ConnectionType.N1, ConnectionType.N1Base, ConnectionType.On1, ConnectionType.Branemark, ConnectionType.TriChannel],
    n1Type: N1Type.BaseASC,
    status: CaseStatus.Standard,
    reference: "REF-2024-09-10",
    imageUrls: [
      "https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/6/36665_00_f358.png",
      "https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/300943_4788.png",
      "https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/2/32373_01_7e4b.png"
    ],
    notes: "tornillo clínico incluido",
    baseCementada: false,
    angulacion: true,
    torque: 35,
  },
  {
    id: "EXO019",
    caseNumber: 15,
    patientName: {
      en: "On1 Universal Base",
      es: "Base Universal On1",
      pt: "Base Universal On1",
      fr: "Base Universelle On1",
      sv: "Universal Base On1"
    },
    restorationType: [RestorationType.Unitaria, RestorationType.Multiple],
    connectionType: ConnectionType.On1,
    status: CaseStatus.Local,
    reference: "REF-2024-10-05",
    imageUrls: [
      "https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/8/38709_1_ab1b.png",
      "https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/8/38710_1_a644.png"
    ],
    notes: "tornillo clínico incluido",
    torque: 15,
  },
  {
    id: "EXO020",
    caseNumber: 16,
    patientName: {
      en: "NobelPearl Abutment",
      es: "Pilar NobelPearl",
      pt: "Pilar NobelPearl",
      fr: "Pilier NobelPearl",
      sv: "NobelPearl Distans"
    },
    restorationType: [RestorationType.Unitaria, RestorationType.Multiple],
    connectionType: ConnectionType.Pearl,
    status: CaseStatus.Local,
    reference: "REF-2024-10-10",
    imageUrls: [
      "https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/301263_nobelpearl_ceramic_base_engaging_inter_x_np_1_1b65.png",
      "https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/301286_nobelpearl_ceramic_base_non_engaging_inter_x_rp_1_24df.png"
    ],
    notes: "tornillo clínico incluido",
    baseCementada: false,
    torque: 35,
  },
  {
    id: "EXO023",
    caseNumber: 17,
    patientName: {
      en: "Provisional from DTX Clinic planning",
      es: "Provisional a partir de planificación en DTX Clinic",
      pt: "Provisório a partir do planejamento na DTX Clinic",
      fr: "Provisoire à partir de la planification dans DTX Clinic",
      sv: "Provisorisk från planering i DTX Clinic"
    },
    restorationType: [RestorationType.Multiple],
    connectionType: ConnectionType.MultiUnit,
    status: CaseStatus.Otros,
    reference: "REF-2024-10-25",
    imageUrls: ["https://dexis.com/sites/g/files/wdvifx221/files/styles/optimized/public/DTX_Product_hero2.png.webp?itok=0Xfhaf9L"],
  },
  {
    id: "EXO033",
    caseNumber: 18,
    patientName: {
      en: "Temporary Screw for MUA in printed restorations",
      es: "Tornillo Temporal para MUA en restauraciones impresas",
      pt: "Parafuso Temporário para MUA em restaurações impressas",
      fr: "Vis temporaire pour MUA dans les restaurations imprimées",
      sv: "Temporär skruv för MUA i tryckta restaurationer"
    },
    restorationType: [RestorationType.Multiple],
    connectionType: ConnectionType.MultiUnit,
    status: CaseStatus.Otros,
    reference: "REF-2024-12-15",
    imageUrls: [
      "https://www.ganarnobelbiocare.com/nobeldesign/E-Prosthetic/Images/Temp%20Screw.png"
    ],
    baseCementada: false,
    angulacion: false,
    torque: 15,
  },
  {
    id: "EXO016",
    caseNumber: 19,
    patientName: {
      en: "Pre-milled blank",
      es: "Pre-milled blank",
      pt: "Pilar pré-fabricado",
      fr: "Pilier pré-usiné",
      sv: "Förfräst ämne"
    },
    restorationType: [RestorationType.Unitaria],
    connectionType: ConnectionType.CC,
    compatibleConnections: [ConnectionType.CC, ConnectionType.Branemark, ConnectionType.TriChannel, ConnectionType.N1],
    status: CaseStatus.Local,
    reference: "REF-2024-09-20",
    imageUrls: [
      "https://store.nobelbiocare.com/dk/en/media/catalog/product/cache/04d236b1062a66fda28e671d2b02aa59/t/r/trm60.003_d357.png"
    ],
    notes: "tornillo clínico incluido",
    torque: 35,
  },
  {
    id: "EXO034",
    caseNumber: 20,
    patientName: {
      en: "Standard Multi-unit Transepithelial Abutment",
      es: "Pilar transepitelial Standard Multi-unit",
      pt: "Pilar transepithelial Standard Multi-unit",
      fr: "Pilier transépithélial Standard Multi-unit",
      sv: "Standard Multi-unit transepithelialt distans"
    },
    restorationType: [RestorationType.Multiple],
    connectionType: ConnectionType.MultiUnit,
    compatibleConnections: [ConnectionType.CC, ConnectionType.N1, ConnectionType.Branemark, ConnectionType.TriChannel],
    status: CaseStatus.Standard,
    reference: "REF-STD-MUA-20",
    imageUrls: [
      "https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/300171_1_78ee.png",
      "https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/300182_1_10a8.png",
      "https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/301052_b3ba.png",
      "https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/2/9/29235_00_2275.png",
      "https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/2/9/29177_00_4cdd.png",
      "https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/2/9/29187_00_6640.png"
    ],
    notes: "tornillo clínico incluido",
    baseCementada: false,
    angulacion: true,
    torque: 35,
  },
  {
    id: "TEST001",
    caseNumber: 21,
    patientName: {
      en: "TEST",
      es: "TEST",
      pt: "TESTE",
      fr: "TEST",
      sv: "TEST"
    },
    restorationType: [RestorationType.Unitaria, RestorationType.Multiple],
    connectionType: ConnectionType.CC,
    status: CaseStatus.Otros,
    reference: "REF-TEST-001",
    imageUrls: ["https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1280&auto=format&fit=crop"],
    notes: "This is a test case.",
    baseCementada: true,
    angulacion: false,
    observaciones: "Distinctive color for testing purposes.",
  },
];

export const N1_TCC_CASE_DATA: DentalCase = {
  id: "EXO015",
  caseNumber: 19,
  patientName: {
    en: "Pre-milled blank N1 TCC",
    es: "Pre-milled blank N1 TCC",
    pt: "Pilar pré-fabricado N1 TCC",
    fr: "Pilier pré-usiné N1 TCC",
    sv: "Förfräst ämne N1 TCC"
  },
  restorationType: [RestorationType.Unitaria],
  connectionType: ConnectionType.N1,
  n1Type: N1Type.TCC,
  status: CaseStatus.Local,
  reference: "REF-2024-09-15",
  imageUrls: ["https://store.nobelbiocare.com/be/fr/media/catalog/product/cache/01519524b37e045881a889c24245/3/0/301512_0558.png"],
  notes: "tornillo clínico incluido",
  torque: 15,
};

export const UNIVERSAL_BASE_NON_ROTATING_DATA = [
  { rowKey: 'neckRef1_5', cc: { np: '38213', rp: '38214', wp: '38215' }, externalHex: { np: '38227', rp: '38228', wp: '38229' }, triChannel: { np: '38171', rp: '38172', wp: '38173' } },
  { rowKey: 'neckRef3_0', cc: { np: '38216', rp: '38217', wp: '38218' }, externalHex: { np: '38230', rp: '38231', wp: '38232' }, triChannel: { np: '38174', rp: '38225', wp: '38226' } },
  { rowKey: 'posteriorHeight', cc: { np: '4.0 mm', rp: '4.0 mm', wp: '4.0 mm' }, externalHex: { np: '4.0 mm', rp: '4.0 mm', wp: '4.0 mm' }, triChannel: { np: '4.0 mm', rp: '4.0 mm', wp: '4.0 mm' } },
  { rowKey: 'screw', cc: { np: '37891', rp: '37892', wp: '37892' }, externalHex: { np: '29282', rp: '29283', wp: '29284' }, triChannel: { np: '36818', rp: '29475', wp: '29475' } },
  { rowKey: 'screwdriver', cc: { np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' }, externalHex: { np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' }, triChannel: { np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' } },
  { rowKey: 'labScrew', cc: { np: '37894', rp: '37895*', wp: '37895*' }, externalHex: { np: '37894', rp: '37895*', wp: '31169' }, triChannel: { np: '31170', rp: '29293', wp: '29293' } },
  { rowKey: 'positionLocator', cc: { np: 'IO 2B-A SA', rp: 'IO 2B-B SA', wp: 'IO 2B-C SA' }, externalHex: { np: 'IO 6A-A', rp: 'IO 6A-B', wp: 'IO 6A-C' }, triChannel: { np: 'IO 2A-A', rp: 'IO 2A-B', wp: 'IO 2A-C' } },
  { rowKey: 'positionLocatorKit', cc: { kit: 'IO 2B SA Kit' }, externalHex: { kit: 'IO 6A Kit' }, triChannel: { kit: 'IO 2A Kit' } },
  { rowKey: 'replicaIOS', cc: { np: 'PMA-NBA35-1', rp: 'PMA-NBA43-1', wp: 'PMA-NBA60-1' }, externalHex: { np: 'PMA-BRA35-1', rp: 'PMA-BRA41-1', wp: 'PMA-BRAS1-1' }, triChannel: { np: 'PMA-NBR35-1', rp: 'PMA-NBR43-1', wp: 'PMA-NBR50-1' } },
  { rowKey: 'scanbodyDTX', cc: { np: '300457', rp: '300458', wp: '300459' }, externalHex: { np: '300460', rp: '300461', wp: '300462' }, triChannel: { np: '300452', rp: '300453', wp: '300454' } },
  { rowKey: 'implantAnalog', cc: { np: '36697', rp: '36698', wp: '37879' }, externalHex: { np: '31158', rp: '31159', wp: '31160' }, triChannel: { np: '29498', rp: '29500', wp: '29502' } },
];

export const UNIVERSAL_BASE_NON_ROTATING_CC_DATA = UNIVERSAL_BASE_NON_ROTATING_DATA.map(row => ({ rowKey: row.rowKey, ...row.cc }));
export const UNIVERSAL_BASE_NON_ROTATING_BRANEMARK_DATA = UNIVERSAL_BASE_NON_ROTATING_DATA.map(row => ({ rowKey: row.rowKey, ...row.externalHex }));
export const UNIVERSAL_BASE_NON_ROTATING_TRICHANNEL_DATA = UNIVERSAL_BASE_NON_ROTATING_DATA.map(row => ({ rowKey: row.rowKey, ...row.triChannel }));

export const UNIVERSAL_BASE_ROTATING_DATA = [
  { rowKey: 'reference', cc: { np: '301235', rp: '301236', wp: '301237' }, externalHex: { np: '301240', rp: '301241', wp: '301242' }, triChannel: { np: '301243', rp: '301244', wp: '301245' } },
  { rowKey: 'neckHeight', cc: { np: '1.8 mm', rp: '1.0 mm', wp: '1.0 mm' }, externalHex: { np: '1.5 mm', rp: '1.0 mm', wp: '0.8 mm' }, triChannel: { np: '1.0 mm', rp: '0.6 mm', wp: '0.6 mm' } },
  { rowKey: 'posteriorHeight', cc: { np: '4.1 mm', rp: '4.1 mm', wp: '4.1 mm' }, externalHex: { np: '4.1 mm', rp: '4.1 mm', wp: '4.1 mm' }, triChannel: { np: '4.1 mm', rp: '4.1 mm', wp: '4.1 mm' } },
  { rowKey: 'diameter', cc: { np: 'Ø 5.0 mm', rp: 'Ø 5.0 mm', wp: 'Ø 5.7 mm' }, externalHex: { np: 'Ø 5.0 mm', rp: 'Ø 5.0 mm', wp: 'Ø 6.0 mm' }, triChannel: { np: 'Ø 5.0 mm', rp: 'Ø 5.0 mm', wp: 'Ø 5.7 mm' } },
  { rowKey: 'screw', cc: { np: '37891', rp: '37892', wp: '37892' }, externalHex: { np: '29282', rp: '29283', wp: '29284' }, triChannel: { np: '36818', rp: '29475', wp: '29475' } },
  { rowKey: 'screwdriver', cc: { np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' }, externalHex: { np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' }, triChannel: { np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' } },
  { rowKey: 'labScrew', cc: { np: '37894', rp: '37895*', wp: '37895*' }, externalHex: { np: '37894', rp: '37895*', wp: '31169' }, triChannel: { np: '31170', rp: '29293', wp: '29293' } },
  { rowKey: 'positionLocator', cc: { np: 'IO 2B-A', rp: 'IO 2B-B', wp: 'IO 2B-C' }, externalHex: { np: 'IO 6A-A', rp: 'IO 6A-B', wp: 'IO 6A-C' }, triChannel: { np: 'IO 2A-A', rp: 'IO 2A-B', wp: 'IO 2A-C' } },
  { rowKey: 'positionLocatorKit', cc: { kit: 'IO 2B Kit' }, externalHex: { kit: 'IO 6A Kit' }, triChannel: { kit: 'IO 2A Kit' } },
  { rowKey: 'replicaIOS', cc: { np: 'PMA-NBA35-1', rp: 'PMA-NBA43-1', wp: 'PMA-NBA60-1' }, externalHex: { np: 'PMA-BRA35-1', rp: 'PMA-BRA41-1', wp: 'PMA-BRAS1-1' }, triChannel: { np: 'PMA-NBR35-1', rp: 'PMA-NBR43-1', wp: 'PMA-NBR50-1' } },
  { rowKey: 'scanbodyDTX', cc: { np: '300470', rp: '300471', wp: '300472' }, externalHex: { np: '300463', rp: '300464', wp: '300465' }, triChannel: { np: '300466', rp: '300467', wp: '300468' } },
  { rowKey: 'implantAnalog', cc: { np: '36697', rp: '36698', wp: '37879' }, externalHex: { np: '31158', rp: '31159', wp: '31160' }, triChannel: { np: '29498', rp: '29500', wp: '29502' } },
];

export const UNIVERSAL_BASE_ROTATING_CONICO_CC_DATA = [
  { rowKey: 'reference', np: '301235', rp: '301236', wp: '301237' },
  { rowKey: 'neckHeight', np: '1.8 mm', rp: '1.0 mm', wp: '1.0 mm' },
  { rowKey: 'posteriorHeight', np: '4.1 mm', rp: '4.1 mm', wp: '4.1 mm' },
  { rowKey: 'diameter', np: 'Ø 5.0 mm', rp: 'Ø 5.0 mm', wp: 'Ø 5.7 mm' },
  { rowKey: 'screw', np: '37891', rp: '37892', wp: '37892' },
  { rowKey: 'screwdriver', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' },
  { rowKey: 'labScrew', np: '37894', rp: '37895*', wp: '37895*' },
  { rowKey: 'positionLocator', np: 'IO 2B-A', rp: 'IO 2B-B', wp: 'IO 2B-C' },
  { rowKey: 'positionLocatorKit', np: '', rp: 'IO 2B Kit', wp: '' },
  { rowKey: 'replicaIOSAnalog', np: 'PMA-NBA35', rp: 'PMA-NBA43', wp: 'PMA-NBA60' },
  { rowKey: 'scanbodyDTX', np: '300470', rp: '300471', wp: '300472' },
];

export const UNIVERSAL_BASE_ROTATING_CC_DATA = [
  { rowKey: 'reference', np: '301362', rp: '301363', wp: '301364' },
  { rowKey: 'neckHeight', np: '1.5 mm', rp: '1.5 mm', wp: '1.5 mm' },
  { rowKey: 'posteriorHeight', np: '4.0 mm', rp: '4.0 mm', wp: '4.0 mm' },
  { rowKey: 'diameter', np: 'Ø 3.6 mm', rp: 'Ø 4.2 mm', wp: 'Ø 5.1 mm' },
  { rowKey: 'screw', np: '37367', rp: '37606', wp: '37606' },
  { rowKey: 'screwdriver', np: 'Omnigrip', rp: 'Omnigrip', wp: 'Omnigrip' },
  { rowKey: 'labScrew', np: '37374', rp: '37607', wp: '37607' },
  { rowKey: 'positionLocator', np: 'IO 2B-A', rp: 'IO 2B-B', wp: 'IO 2B-C' },
  { rowKey: 'positionLocatorKit', kit: 'IO 2B Kit' },
  { rowKey: 'replicaIOS', np: 'PMA-NBA35', rp: 'PMA-NBA43', wp: 'PMA-NBA60' },
  { rowKey: 'scanbodyDTX', np: '300470', rp: '300471', wp: '300472' },
];

export const UNIVERSAL_BASE_ROTATING_BRANEMARK_DATA = [
  { rowKey: 'reference', np: '301367', rp: '301368', wp: '301369' },
  { rowKey: 'neckHeight', np: '1.5 mm', rp: '1.5 mm', wp: '1.5 mm' },
  { rowKey: 'posteriorHeight', np: '4.0 mm', rp: '4.0 mm', wp: '4.0 mm' },
  { rowKey: 'diameter', np: 'Ø 3.9 mm', rp: 'Ø 4.4 mm', wp: 'Ø 5.4 mm' },
  { rowKey: 'screw', np: '29282', rp: '29283', wp: '29284' },
  { rowKey: 'screwdriver', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' },
  { rowKey: 'labScrew', np: '37894', rp: '37895*', wp: '31169' },
  { rowKey: 'positionLocator', np: 'IO 6A-A', rp: 'IO 6A-B', wp: 'IO 6A-C' },
  { rowKey: 'positionLocatorKit', kit: 'IO 6A Kit' },
  { rowKey: 'replicaIOS', np: 'PMA-BRA35-1', rp: 'PMA-BRA41-1', wp: 'PMA-BRA51-1' },
  { rowKey: 'scanbodyDTX', np: '300463', rp: '300464', wp: '300465' },
];

export const UNIVERSAL_BASE_ROTATING_CONICO_BRANEMARK_DATA = [
  { rowKey: 'reference', np: '301240', rp: '301241', wp: '301242' },
  { rowKey: 'neckHeight', np: '1.5 mm', rp: '1.0 mm', wp: '0.8 mm' },
  { rowKey: 'posteriorHeight', np: '4.1 mm', rp: '4.1 mm', wp: '4.1 mm' },
  { rowKey: 'diameter', np: 'Ø 5.0 mm', rp: 'Ø 5.0 mm', wp: 'Ø 6.0 mm' },
  { rowKey: 'screw', np: '29282', rp: '29283', wp: '29284' },
  { rowKey: 'screwdriver', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' },
  { rowKey: 'labScrew', np: '37894', rp: '37895*', wp: '31169' },
  { rowKey: 'positionLocator', np: 'IO 6A-A', rp: 'IO 6A-B', wp: 'IO 6A-C' },
  { rowKey: 'positionLocatorKit', np: '', rp: 'IO 6A Kit', wp: '' },
  { rowKey: 'replicaIOSAnalog', np: 'PMA-BRA35-1', rp: 'PMA-BRA41-1', wp: 'PMA-BRA51-1' },
  { rowKey: 'scanbodyDTX', np: '300463', rp: '300464', wp: '300465' },
];

export const UNIVERSAL_BASE_ROTATING_TRICHANNEL_DATA = [
  { rowKey: 'reference', np: '301370', rp: '301371', wp: '301372' },
  { rowKey: 'neckHeight', np: '1.5 mm', rp: '1.5 mm', wp: '1.5 mm' },
  { rowKey: 'posteriorHeight', np: '4.0 mm', rp: '4.0 mm', wp: '4.0 mm' },
  { rowKey: 'diameter', np: 'Ø 3.7 mm', rp: 'Ø 4.5 mm', wp: 'Ø 5.1 mm' },
  { rowKey: 'screw', np: '36818', rp: '29475', wp: '29475' },
  { rowKey: 'screwdriver', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' },
  { rowKey: 'labScrew', np: '31170', rp: '29293', wp: '29293' },
  { rowKey: 'positionLocator', np: 'IO 2A-A', rp: 'IO 2A-B', wp: 'IO 2A-C' },
  { rowKey: 'positionLocatorKit', kit: 'IO 2A Kit' },
  { rowKey: 'replicaIOS', np: 'PMA-NBR35-1', rp: 'PMA-NBR43-1', wp: 'PMA-NBR50-1' },
  { rowKey: 'scanbodyDTX', np: '300466', rp: '300467', wp: '300468' },
];

export const UNIVERSAL_BASE_ROTATING_CONICO_TRICHANNEL_DATA = [
  { rowKey: 'reference', np: '301243', rp: '301244', wp: '301245' },
  { rowKey: 'neckHeight', np: '1.0 mm', rp: '0.6 mm', wp: '0.6 mm' },
  { rowKey: 'posteriorHeight', np: '4.1 mm', rp: '4.1 mm', wp: '4.1 mm' },
  { rowKey: 'diameter', np: 'Ø 5.0 mm', rp: 'Ø 5.0 mm', wp: 'Ø 5.7 mm' },
  { rowKey: 'screw', np: '36818', rp: '29475', wp: '29475' },
  { rowKey: 'screwdriver', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' },
  { rowKey: 'labScrew', np: '31170', rp: '29293', wp: '29293' },
  { rowKey: 'positionLocator', np: 'IO 2A-A', rp: 'IO 2A-B', wp: 'IO 2A-C' },
  { rowKey: 'positionLocatorKit', np: '', rp: 'IO 2A Kit', wp: '' },
  { rowKey: 'replicaIOSAnalog', np: 'PMA-NBR35-1', rp: 'PMA-NBR43-1', wp: 'PMA-NBR50-1' },
  { rowKey: 'scanbodyDTX', np: '300466', rp: '300467', wp: '300468' },
];

export const PRE_MILLED_BLANKS_DATA = [
  { rowKey: 'diameter10', cc: { np: 'TRM60.041', rp: 'TRM60.042', wp: 'TRM60.069' }, externalHex: { np: 'TRM60.001', rp: 'TRM60.002', wp: 'TRM60.003' }, triChannel: { np: 'TRM60.004', rp: 'TRM60.005', wp: 'TRM60.006' } },
  { rowKey: 'diameter14', cc: { np: 'TRM64.041', rp: 'TRM64.042', wp: 'TRM64.069' }, externalHex: { np: '-', rp: '-', wp: '-' }, triChannel: { np: '-', rp: 'TRM64.005', wp: 'TRM64.006' } },
  { rowKey: 'screw', cc: { np: '37891', rp: '37892', wp: '37892' }, externalHex: { np: '29282', rp: '29283', wp: '29284' }, triChannel: { np: '36818', rp: '29475', wp: '29475' } },
  { rowKey: 'screwdriver', cc: { np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' }, externalHex: { np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' }, triChannel: { np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' } },
  { rowKey: 'labScrew', cc: { np: '37894', rp: '37895*', wp: '37895*' }, externalHex: { np: '37894', rp: '37895*', wp: '31169' }, triChannel: { np: '31170', rp: '29293*', wp: '29293*' } },
  { rowKey: 'scanbodies', cc: { np: 'IO 2B-A SA', rp: 'IO 2B-B SA', wp: 'IO 2B-C SA' }, externalHex: { np: 'IO 6A-A', rp: 'IO 6A-B', wp: 'IO 6A-C' }, triChannel: { np: 'IO 2A-A', rp: 'IO 2A-B', wp: 'IO 2A-C' } },
  { rowKey: 'scanbodiesKit', cc: { kit: 'IO 2B SA Kit' }, externalHex: { kit: 'IO 6A Kit' }, triChannel: { kit: 'IO 2A Kit' } },
  { rowKey: 'replicaAccurate', cc: { np: 'PMA-NBA35-1', rp: 'PMA-NBA43-1', wp: 'PMA-NBA60-1' }, externalHex: { np: 'PMA-BRA35-1', rp: 'PMA-BRA41-1', wp: 'PMA-BRA51-1' }, triChannel: { np: 'PMA-NBR35-1', rp: 'PMA-NBR43-1', wp: 'PMA-NBR50-1' } },
  { rowKey: 'replicaBiocare', cc: { np: '38189', rp: '38190', wp: '38191' }, externalHex: { np: '-', rp: '-', wp: '-' }, triChannel: { np: '-', rp: '-', wp: '-' } },
  { rowKey: 'plasterAnalog', cc: { np: '36697', rp: '36698', wp: '37879' }, externalHex: { np: '31158', rp: '31159', wp: '31160' }, triChannel: { np: '29498', rp: '29500', wp: '29502' } },
  { rowKey: 'protectionAnalog', cc: { np: '38855*', rp: '38856*', wp: '38857*' }, externalHex: { np: '29116*', rp: '29117*', wp: '29118*' }, triChannel: { np: '29119*', rp: '29120*', wp: '29121*' } },
];

export const PRE_MILLED_BLANKS_N1_TCC_DATA = [
  { rowKey: 'diameter10', np: '301512', rp: '301513' },
  { rowKey: 'diameter14', np: '301514', rp: '301515' },
  { rowKey: 'screw', np: '300968', rp: '300969' },
  { rowKey: 'screwdriver', np: 'Omnigrip Mini', rp: 'Omnigrip Mini' },
  { rowKey: 'labScrew', np: '300972', rp: '300973' },
  { rowKey: 'scanbodies', np: '300976', rp: '300977' },
  { rowKey: 'replicaAccurate', np: '300964', rp: '300965' },
  { rowKey: 'plasterAnalog', np: '300964', rp: '300965' },
];

export const PRE_MILLED_DESCRIPTIONS: { [key: string]: string } = {
  'TRM60.068': 'Pilar de titanio premecanizado Nobel Biocare CC 3.0',
  'TRM60.041': 'Pilar de titanio premecanizado Nobel Biocare CC NP',
  'TRM60.042': 'Pilar de titanio premecanizado Nobel Biocare CC RP',
  'TRM60.069': 'Pilar de titanio premecanizado Nobel Biocare CC WP',
  'TRM60.001': 'Pilar de titanio premecanizado Nobel Biocare Brånemark System® NP',
  'TRM60.002': 'Pilar de titanio premecanizado Nobel Biocare Brånemark System® RP',
  'TRM60.003': 'Pilar de titanio premecanizado Nobel Biocare Brånemark System® WP',
  'TRM60.004': 'Pilar de titanio premecanizado Nobel Biocare NobelReplace® NP',
  'TRM60.005': 'Pilar de titanio premecanizado Nobel Biocare NobelReplace® RP',
  'TRM60.006': 'Pilar de titanio premecanizado Nobel Biocare NobelReplace® WP',
  'TRM64.041': 'Pilar de titanio premecanizado Nobel Biocare CC NP Ø 14 mm',
  'TRM64.042': 'Pilar de titanio premecanizado Nobel Biocare CC RP Ø 14 mm',
  'TRM64.069': 'Pilar de titanio premecanizado Nobel Biocare CC WP Ø 14 mm',
  'TRM64.005': 'Pilar de titanio premecanizado Nobel Biocare NobelReplace® RP Ø 14 mm',
  'TRM64.006': 'Pilar de titanio premecanizado Nobel Biocare NobelReplace® WP Ø 14 mm',
};

export const UNIVERSAL_MULTI_UNIT_RECTO_DATA = [
  { rowKey: 'reference', np_rp: '301365', wp: '301366' },
  { rowKey: 'neckHeight', np_rp: '0.3 mm', wp: '0.3 mm' },
  { rowKey: 'posteriorHeight', np_rp: '4.5 mm', wp: '4.5 mm' },
  { rowKey: 'diameter', np_rp: 'Ø 5.0 mm', wp: 'Ø 5.9 mm' },
  { rowKey: 'screw', np_rp: '301203', wp: '301200' },
  { rowKey: 'screwdriver', np_rp: 'Omnigrip Mini', wp: 'Omnigrip Mini' },
  { rowKey: 'labScrew', np_rp: '301201', wp: '301202' },
  { rowKey: 'positionLocator', np_rp: 'IO 2C-A', wp: 'IO 2C-B' },
  { rowKey: 'positionLocatorKit', np_rp: 'IO 2C Kit', wp: 'IO 2C Kit' },
  { rowKey: 'replicaIOS', np_rp: 'PMA-MUA45-1', wp: 'PMA-MUA60-1' },
  { rowKey: 'scanbodyDTX', np_rp: '300473', wp: '300474' },
  { rowKey: 'implantAnalog', np_rp: '38918', wp: '31162' },
];

export const UNIVERSAL_MULTI_UNIT_CONICO_DATA = [
  { rowKey: 'reference', np_rp: '301238', wp: '301239' },
  { rowKey: 'neckHeight', np_rp: '0.9 mm', wp: '1.2 mm' },
  { rowKey: 'posteriorHeight', np_rp: '4.1 mm', wp: '4.1 mm' },
  { rowKey: 'diameter', np_rp: 'Ø 5.0 mm', wp: 'Ø 5.7 mm' },
  { rowKey: 'screw', np_rp: '29285', wp: '29286' },
  { rowKey: 'screwdriver', np_rp: 'Unigrip', wp: 'Unigrip' },
  { rowKey: 'labScrew', np_rp: '29287*', wp: '31163' },
  { rowKey: 'positionLocator', np_rp: 'IO 2C-A', wp: 'IO 2C-B' },
  { rowKey: 'positionLocatorKit', np_rp: 'IO 2C Kit', wp: 'IO 2C Kit' },
  { rowKey: 'replicaIOS', np_rp: 'PMA-MUA45', wp: 'PMA-MUA60-1' },
  { rowKey: 'scanbodyDTX', np_rp: '300473', wp: '300474' },
];

export const MULTI_UNIT_CONNECTION_DATA = [
  { rowKey: 'clinicalScrew', np_rp: '301203', wp: '301200' },
  { rowKey: 'screwdriver', np_rp: 'Unigrip', wp: 'Unigrip' },
  { rowKey: 'labScrew', np_rp: '301200', wp: '301202' },
  { rowKey: 'positionLocator', np_rp: 'IO 2C-A', wp: 'IO 2C-B' },
  { rowKey: 'positionLocatorKit', kit: 'IO 2C Kit' },
  { rowKey: 'replicaIOSAnalog', np_rp: 'PMA-MUA45-1', wp: 'PMA-MUA60-1' },
  { rowKey: 'scanbodyDTX', np_rp: '300473', wp: '300474' },
];

export const PILAR_UNIVERSAL_ON1_NO_ROTATORIO_DATA = [
  { rowKey: 'refCuello0_3', np: '38707', rp: '38709', wp: '38711' },
  { rowKey: 'refCuello1_25', np: '38708', rp: '38710', wp: '38712' },
  { rowKey: 'alturaPosterior', np: '3.98 mm', rp: '3.98 mm', wp: '3.98 mm' },
  { rowKey: 'diametro', np: 'Ø 4.775 mm', rp: 'Ø 4.775 mm', wp: 'Ø 4.775 mm' },
  { rowKey: 'screw', np: '38750', rp: '38750', wp: '38750' },
  { rowKey: 'destornillador', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' },
  { rowKey: 'labScrew', np: '38751', rp: '38751', wp: '38751' },
  { rowKey: 'iosScanbody4_5', np: '38735', rp: '38737', wp: '38739' },
  { rowKey: 'iosScanbody5_0', np: '-', rp: '-', wp: '38738' },
  { rowKey: 'iosScanbody6_0', np: '38734', rp: '38736', wp: '-' },
  { rowKey: 'iosAnalog', np: '38740', rp: '38741', wp: '38742' },
  { rowKey: 'insertionTool', np: '38201', rp: '38203', wp: '38204' },
  { rowKey: 'scanbodyDTX', np: '300437', rp: '300437', wp: '300437' },
];

export const PILAR_UNIVERSAL_ON1_ROTATORIO_DATA = [
  { rowKey: 'refCuello0_3', np: '300361', rp: '300363', wp: '300365' },
  { rowKey: 'refCuello1_25', np: '300362', rp: '300364', wp: '300366' },
  { rowKey: 'alturaPosterior', np: '3.98 mm', rp: '3.98 mm', wp: '3.98 mm' },
  { rowKey: 'diametro', np: 'Ø 4.775 mm', rp: 'Ø 5.3 mm', wp: 'Ø 6.515 mm' },
  { rowKey: 'screw', np: '38750', rp: '38750', wp: '38750' },
  { rowKey: 'destornillador', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' },
  { rowKey: 'labScrew', np: '38751', rp: '38751', wp: '38751' },
  { rowKey: 'iosScanbody4_5', np: '38735', rp: '38737', wp: '38739' },
  { rowKey: 'iosScanbody5_0', np: '-', rp: '-', wp: '38738' },
  { rowKey: 'iosScanbody6_0', np: '38734', rp: '38736', wp: '-' },
  { rowKey: 'iosAnalog', np: '38740', rp: '38741', wp: '38742' },
  { rowKey: 'insertionTool', np: '38201', rp: '38203', wp: '38204' },
  { rowKey: 'scanbodyDTX', np: '300437', rp: '300437', wp: '300437' },
];

export const N1_BASE_UNITARIA_NO_ROTATORIO_DATA = [
  { rowKey: 'reference', np: '301006', rp: '301007' },
  { rowKey: 'posteriorHeight', np: '4.0 mm', rp: '4.0 mm' },
  { rowKey: 'screw', np: '301029', rp: '301030' },
  { rowKey: 'screwdriver', np: 'Omnigrip Mini', rp: 'Omnigrip Mini' },
  { rowKey: 'labScrew', np: '301033', rp: '301034' },
  { rowKey: 'iosScanbody', np: '301039', rp: '301040' },
  { rowKey: 'iosScanbodyHealingCap', np: '300991', rp: '300992' },
  { rowKey: 'iosAnalog', np: '301024', rp: '301025' },
  { rowKey: 'iosInsertionTool', np: '300966', rp: '300966' },
  { rowKey: 'scanbodyDTX', np: '301039', rp: '301040' },
];

export const N1_BASE_PUENTE_ROTATORIO_DATA = [
  { rowKey: 'reference', np: '301009', rp: '301010' },
  { rowKey: 'posteriorHeight', np: '4.0 mm', rp: '4.0 mm' },
  { rowKey: 'screw', np: '301029', rp: '301030' },
  { rowKey: 'screwdriver', np: 'Omnigrip Mini', rp: 'Omnigrip Mini' },
  { rowKey: 'labScrew', np: '301033', rp: '301034' },
  { rowKey: 'iosScanbody', np: '301039', rp: '301040' },
  { rowKey: 'iosScanbodyHealingCap', np: '300991', rp: '300992' },
  { rowKey: 'iosAnalog', np: '301024', rp: '301025' },
  { rowKey: 'iosInsertionTool', np: '300966', rp: '300966' },
  { rowKey: 'scanbodyDTX', np: '301039', rp: '301040' },
];

export const N1_TCC_UNITARIA_NO_ROTATORIA_DATA = [
  { rowKey: 'refCuello1_5', np: '300946', rp: '300948' },
  { rowKey: 'refCuello3_0', np: '300947', rp: '300949' },
  { rowKey: 'posteriorHeight', np: '4.05 mm', rp: '4.05 mm' },
  { rowKey: 'screw', np: '300968', rp: '300969' },
  { rowKey: 'screwdriver', np: 'Omnigrip Mini', rp: 'Omnigrip Mini' },
  { rowKey: 'labScrew', np: '300972', rp: '300973' },
  { rowKey: 'iosScanbody', np: '300976', rp: '300977' },
  { rowKey: 'iosAnalog', np: '300964', rp: '300965' },
  { rowKey: 'iosInsertionTool', np: '300966', rp: '300966' },
  { rowKey: 'scanbodyDTX', np: '300976', rp: '300977' },
];

export const ZIRCONIA_BRIDGE_DATA = [
  { 
    rowKey: 'screw', 
    cc: { np: '37367', rp: '37606', wp: '37606' }, 
    branemark: { np: '311171', rp: '28815', wp: '28844' }, 
    triChannel: { np: '28837', rp: '28816', wp: '28816', '6': '28816' } 
  },
  { 
    rowKey: 'screwdriver', 
    cc: { np: 'Omnigrip', rp: 'Omnigrip', wp: 'Omnigrip' }, 
    branemark: { np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' }, 
    triChannel: { np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip', '6': 'Unigrip' } 
  },
  { 
    rowKey: 'labScrew', 
    cc: { np: '37374', rp: '37607', wp: '37607' }, 
    branemark: { np: '37894', rp: '37895', wp: '' }, 
    triChannel: { np: '', rp: '', wp: '', '6': '' } 
  },
  { 
    rowKey: 'elosScanbody', 
    cc: { np: 'IO 2B-A SA', rp: 'IO 2B-B SA', wp: 'IO 2B-C SA' }, 
    branemark: { np: 'IO 6A-A', rp: 'IO 6A-B', wp: 'IO 6A-C' }, 
    triChannel: { np: 'IO 2A-A', rp: 'IO 2A-B', wp: 'IO 2A-C', '6': 'IO 2A-D' } 
  },
  { 
    rowKey: 'elosScanbodyKit', 
    cc: { kit: 'IO 2B SA Kit' }, 
    branemark: { kit: 'IO 6A Kit' }, 
    triChannel: { kit: 'IO 2A Kit' } 
  },
  { 
    rowKey: 'replicaIOS', 
    cc: { np: 'PMA-NBA35-1', rp: 'PMA-NBA43-1', wp: 'PMA-NBA60-1' }, 
    branemark: { np: 'PMA-BRA35-1', rp: 'PMA-BRA41-1', wp: 'PMA-BRA51-1' }, 
    triChannel: { np: 'PMA-NBR35-1', rp: 'PMA-NBR43-1', wp: 'PMA-NBR50-1', '6': 'PMA-NBR60-1' } 
  },
  { 
    rowKey: 'desktopScanbody', 
    cc: { np: '300457', rp: '300458', wp: '300459' }, 
    branemark: { np: '300460', rp: '300461', wp: '300462' }, 
    triChannel: { np: '300452', rp: '300453', wp: '300454', '6': '300469' } 
  },
];

export const ZIRCONIA_BRIDGE_CC_DATA = [
  { rowKey: 'conexion', type: 'header' },
  { rowKey: 'screw', np: '37367', rp: '37606', wp: '37606' },
  { rowKey: 'screwdriver', np: 'Omnigrip', rp: 'Omnigrip', wp: 'Omnigrip' },
  { rowKey: 'labScrew', np: '37374', rp: '37607', wp: '37607' },
  { rowKey: 'elosScanbody', np: 'IO 2B-A', rp: 'IO 2B-B', wp: 'IO 2B-C' },
  { rowKey: 'elosScanbodyKit', kit: 'IO 2B Kit' },
  { rowKey: 'replicaIOS', np: 'PMA-NBA35-1', rp: 'PMA-NBA43-1', wp: 'PMA-NBA60-1' },
  { rowKey: 'desktopScanbody', np: '300470', rp: '300471', wp: '300472' },
];

export const ZIRCONIA_BRIDGE_BRANEMARK_DATA = [
  { rowKey: 'screw', np: '31171', rp: '28815', wp: '28844' },
  { rowKey: 'screwdriver', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' },
  { rowKey: 'labScrew', np: '37894', rp: '37895', wp: '' },
  { rowKey: 'elosScanbody', np: 'IO 6A-A', rp: 'IO 6A-B', wp: 'IO 6A-C' },
  { rowKey: 'elosScanbodyKit', kit: 'IO 6A Kit' },
  { rowKey: 'replicaIOS', np: 'PMA-BRA35-1', rp: 'PMA-BRA41-1', wp: 'PMA-BRA51-1' },
  { rowKey: 'desktopScanbody', np: '300460', rp: '300461', wp: '300462' },
];

export const ZIRCONIA_BRIDGE_TRICHANNEL_DATA = [
  { rowKey: 'screw', np: '28837', rp: '28816', wp: '28816', '6': '28816' },
  { rowKey: 'screwdriver', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip', '6': 'Unigrip' },
  { rowKey: 'labScrew', np: '', rp: '', wp: '', '6': '' },
  { rowKey: 'elosScanbody', np: 'IO 2A-A', rp: 'IO 2A-B', wp: 'IO 2A-C', '6': 'IO 2A-D' },
  { rowKey: 'elosScanbodyKit', kit: 'IO 2A Kit' },
  { rowKey: 'replicaIOS', np: 'PMA-NBR35-1', rp: 'PMA-NBR43-1', wp: 'PMA-NBR50-1', '6': 'PMA-NBR60-1' },
  { rowKey: 'desktopScanbody', np: '300452', rp: '300453', wp: '300454', '6': '300469' },
];

export const PROCERA_FCZ_IMPLANT_CROWN_DATA = [
  { rowKey: 'screw', np: '37367', rp: '37606', wp: '37606' },
  { rowKey: 'screwdriver', np: 'Omnigrip', rp: 'Omnigrip', wp: 'Omnigrip' },
  { rowKey: 'labScrew', np: '37374', rp: '37607', wp: '37607' },
  { rowKey: 'elosScanbody', np: 'IO 2B-A SA', rp: 'IO 2B-B SA', wp: 'IO 2B-C SA' },
  { rowKey: 'elosScanbodyKit', np: '', rp: 'IO 2B Kit SA', wp: '' },
  { rowKey: 'replicaIOS', np: 'PMA-NBA35-1', rp: 'PMA-NBA43-1', wp: 'PMA-NBA60-1' },
  { rowKey: 'desktopScanbody', np: '300457', rp: '300458', wp: '300459' },
];

export const PROCERA_TITANIUM_CC_DATA = [
  { rowKey: 'screw', '3.0': '37890', np: '37891', rp: '37892', wp: '37892' },
  { rowKey: 'screwdriver', '3.0': 'Unigrip', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' },
  { rowKey: 'labScrew', '3.0': '36805', np: '37894', rp: '37895', wp: '37895' },
  { rowKey: 'elosScanbody', '3.0': 'IO 2B-D SA', np: 'IO 2B-A SA', rp: 'IO 2B-B SA', wp: 'IO 2B-C SA' },
  { rowKey: 'elosScanbodyKit', '3.0': '', np: '', rp: 'IO 2B SA Kit', wp: '' },
  { rowKey: 'replicaIOS', '3.0': 'PMA-NBA30-1', np: 'PMA-NBA35-1', rp: 'PMA-NBA43-1', wp: 'PMA-NBA60-1' },
  { rowKey: 'desktopScanbody', '3.0': '300456', np: '300457', rp: '300458', wp: '300459' },
];

export const PROCERA_TITANIUM_BRANEMARK_DATA = [
  { rowKey: 'screw', np: '29282', rp: '29283', wp: '29284' },
  { rowKey: 'screwdriver', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' },
  { rowKey: 'labScrew', np: '37894', rp: '38417', wp: '31169' },
  { rowKey: 'elosScanbody', np: 'IO 6A-A', rp: 'IO 6A-B', wp: 'IO 6A-C' },
  { rowKey: 'elosScanbodyKit', np: '', rp: 'IO 6A Kit', wp: '' },
  { rowKey: 'replicaIOS', np: 'PMA-BRA35-1', rp: 'PMA-BRA41-1', wp: 'PMA-BRA51-1' },
  { rowKey: 'desktopScanbody', np: '300460', rp: '300461', wp: '300462' },
];

export const PROCERA_TITANIUM_TRICHANNEL_DATA = [
  { rowKey: 'screw', np: '36818', rp: '29475', wp: '29475', '6': '29475' },
  { rowKey: 'screwdriver', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip', '6': 'Unigrip' },
  { rowKey: 'labScrew', np: '31170', rp: '29293', wp: '29293', '6': '29293' },
  { rowKey: 'elosScanbody', np: 'IO 2A-A', rp: 'IO 2A-B', wp: 'IO 2A-C', '6': 'IO 2A-D' },
  { rowKey: 'elosScanbodyKit', kit: 'IO 2A Kit' },
  { rowKey: 'replicaIOS', np: 'PMA-NBR35-1', rp: 'PMA-NBR43-1', wp: 'PMA-NBR50-1', '6': 'PMA-NBR60-1' },
  { rowKey: 'desktopScanbody', np: '300452', rp: '300453', wp: '300454', '6': '300455' },
];

export const PROCERA_ZIRCONIA_CC_DATA = [
  { rowKey: 'screw', np: '37367', rp: '37606', wp: '37606' },
  { rowKey: 'screwdriver', np: 'Omnigrip', rp: 'Omnigrip', wp: 'Omnigrip' },
  { rowKey: 'labScrew', np: '37374', rp: '37607', wp: '37607' },
  { rowKey: 'elosScanbody', np: 'IO 2B-A SA', rp: 'IO 2B-B SA', wp: 'IO 2B-C SA' },
  { rowKey: 'elosScanbodyKit', kit: 'IO 2B SA Kit' },
  { rowKey: 'replicaIOS', np: 'PMA-NBA35-1', rp: 'PMA-NBA43-1', wp: 'PMA-NBA60-1' },
  { rowKey: 'desktopScanbody', np: '300457', rp: '300458', wp: '300459' },
];

export const PROCERA_ZIRCONIA_BRANEMARK_DATA = [
    { rowKey: 'screw', np: '31171', rp: '28815', wp: '28844' },
    { rowKey: 'screwdriver', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' },
    { rowKey: 'labScrew', np: '37894', rp: '37895', wp: '' },
    { rowKey: 'elosScanbody', np: 'IO 6A-A', rp: 'IO 6A-B', wp: 'IO 6A-C' },
    { rowKey: 'elosScanbodyKit', kit: 'IO 6A Kit' },
    { rowKey: 'replicaIOS', np: 'PMA-BRA35-1', rp: 'PMA-BRA41-1', wp: 'PMA-BRA51-1' },
    { rowKey: 'desktopScanbody', np: '300460', rp: '300461', wp: '300462' },
];

export const PROCERA_ZIRCONIA_TRICHANNEL_DATA = [
    { rowKey: 'screw', np: '28837', rp: '28816', wp: '28816', '6': '28816' },
    { rowKey: 'screwdriver', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip', '6': 'Unigrip' },
    { rowKey: 'labScrew', np: '', rp: '', wp: '', '6': '' },
    { rowKey: 'elosScanbody', np: 'IO 2A-A', rp: 'IO 2A-B', wp: 'IO 2A-C', '6': 'IO 2A-D' },
    { rowKey: 'elosScanbodyKit', kit: 'IO 2A Kit' },
    { rowKey: 'replicaIOS', np: 'PMA-NBR35-1', rp: 'PMA-NBR43-1', wp: 'PMA-NBR50-1', '6': 'PMA-NBR60-1' },
    { rowKey: 'desktopScanbody', np: '300452', rp: '300453', wp: '300454', '6': '300455' },
];

export const PROCERA_TITANIUM_BRIDGE_CC_DATA = [
  { rowKey: 'screw', np: '37891', rp: '37892', wp: '37892' },
  { rowKey: 'screwdriver', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' },
  { rowKey: 'labScrew', np: '37894', rp: '37895', wp: '37895' },
  { rowKey: 'elosScanbody', np: 'IO 2B-A SA', rp: 'IO 2B-B SA', wp: 'IO 2B-C SA' },
  { rowKey: 'elosScanbodyKit', kit: 'IO 2B SA Kit' },
  { rowKey: 'replicaIOS', np: 'PMA-NBA35-1', rp: 'PMA-NBA43-1', wp: 'PMA-NBA60-1' },
  { rowKey: 'desktopScanbody', np: '300457', rp: '300458', wp: '300459' },
];

export const PROCERA_TITANIUM_BRIDGE_BRANEMARK_DATA = [
    { rowKey: 'screw', np: '29282', rp: '29283', wp: '29284' },
    { rowKey: 'screwdriver', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' },
    { rowKey: 'labScrew', np: '37894', rp: '38417', wp: '31169' },
    { rowKey: 'elosScanbody', np: 'IO 6A-A', rp: 'IO 6A-B', wp: 'IO 6A-C' },
    { rowKey: 'elosScanbodyKit', kit: 'IO 6A Kit' },
    { rowKey: 'replicaIOS', np: 'PMA-BRA35-1', rp: 'PMA-BRA41-1', wp: 'PMA-BRA51-1' },
    { rowKey: 'desktopScanbody', np: '300460', rp: '300461', wp: '300462' },
];

export const PROCERA_TITANIUM_BRIDGE_TRICHANNEL_UPDATED_DATA = [
  { rowKey: 'screw', np: '36818', rp: '29475', wp: '29475', '6': '29475' },
  { rowKey: 'screwdriver', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip', '6': 'Unigrip' },
  { rowKey: 'labScrew', np: '31170', rp: '38419 / 29293', wp: '38419 / 29293', '6': '38419 / 29293' },
  { rowKey: 'positionLocator', np: 'IO 2A-A', rp: 'IO 2A-B', wp: 'IO 2A-C', '6': '-' },
  { rowKey: 'positionLocatorKit', kit: 'IO 2A Kit' },
  { rowKey: 'replicaIOS', np: 'PMA-NBR35-1', rp: 'PMA-NBR43-1', wp: 'PMA-NBR50-1', '6': '-' },
  { rowKey: 'desktopScanbody', np: '300452', rp: '300453', wp: '300454', '6': '-' },
];

export const PROCERA_TITANIUM_ASC_CC_DATA = [
  { rowKey: 'screw', np: '301721', rp: '301723', wp: '301723' },
  { rowKey: 'screwdriver', np: 'Omnigrip', rp: 'Omnigrip', wp: 'Omnigrip' },
  { rowKey: 'labScrew', np: '301722', rp: '301724', wp: '301724' },
  { rowKey: 'elosScanbody', np: 'IO 2B-A SA', rp: 'IO 2B-B SA', wp: 'IO 2B-C SA' },
  { rowKey: 'elosScanbodyKit', kit: 'IO 2B SA Kit' },
  { rowKey: 'replicaIOS', np: 'PMA-NBA35-1', rp: 'PMA-NBA43-1', wp: 'PMA-NBA60-1' },
  { rowKey: 'desktopScanbody', np: '300457', rp: '300458', wp: '300459' },
];

export const PROCERA_TITANIUM_ASC_TRICHANNEL_DATA = [
  { rowKey: 'screw', np: '301725', rp: '301727', wp: '301727', '6': '301727' },
  { rowKey: 'screwdriver', np: 'Omnigrip', rp: 'Omnigrip', wp: 'Omnigrip', '6': 'Omnigrip' },
  { rowKey: 'labScrew', np: '301726', rp: '301728', wp: '301728', '6': '301728' },
  { rowKey: 'elosScanbody', np: 'IO 2A-A', rp: 'IO 2A-B', wp: 'IO 2A-C', '6': 'IO 2A-D' },
  { rowKey: 'elosScanbodyKit', kit: 'IO 2A Kit' },
  { rowKey: 'replicaIOS', np: 'PMA-NBR35-1', rp: 'PMA-NBR43-1', wp: 'PMA-NBR50-1', '6': 'PMA-NBR60-1' },
  { rowKey: 'desktopScanbody', np: '300452', rp: '300453', wp: '300454', '6': '300455' },
];

export const NOBELPROCERA_TITANIUM_BAR_CC_DATA = [
  { rowKey: 'screw', np: '37891', rp: '37892', wp: '37892' },
  { rowKey: 'screwdriver', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' },
  { rowKey: 'labScrew', np: '37894', rp: '37895', wp: '37895' },
  { rowKey: 'positionLocator', np: 'IO 2B-A SA', rp: 'IO 2B-B SA', wp: 'IO 2B-C SA' },
  { rowKey: 'positionLocatorKit', kit: 'IO 2B SA Kit' },
  { rowKey: 'replicaIOS', np: 'PMA-NBA35-1', rp: 'PMA-NBA43-1', wp: 'PMA-NBA60-1' },
  { rowKey: 'scanbodyDTX', np: '300457', rp: '300458', wp: '300459' },
];

export const NOBELPROCERA_TITANIUM_BAR_BRANEMARK_DATA = [
  { rowKey: 'screw', np: '29282', rp: '29283', wp: '29284' },
  { rowKey: 'screwdriver', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip' },
  { rowKey: 'labScrew', np: '37894', rp: '38417', wp: '31169' },
  { rowKey: 'positionLocator', np: 'IO 6A-A', rp: 'IO 6A-B', wp: 'IO 6A-C' },
  { rowKey: 'positionLocatorKit', kit: 'IO 6A Kit' },
  { rowKey: 'replicaIOS', np: 'PMA-BRA35-1', rp: 'PMA-BRA41-1', wp: 'PMA-BRA51-1' },
  { rowKey: 'scanbodyDTX', np: '300460', rp: '300461', wp: '300462' },
];

export const NOBELPROCERA_TITANIUM_BAR_TRICHANNEL_DATA = [
  { rowKey: 'screw', np: '36818', rp: '29475', wp: '29475', '6': '29475' },
  { rowKey: 'screwdriver', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip', '6': 'Unigrip' },
  { rowKey: 'labScrew', np: '31170', rp: '38419 / 29293', wp: '38419 / 29293', '6': '38419 / 29293' },
  { rowKey: 'positionLocator', np: 'IO 2A-A', rp: 'IO 2A-B', wp: 'IO 2A-C', '6': '-' },
  // FIX: The error "An object literal cannot have multiple properties with the same name" was reported for line 613, which was likely incorrect.
  // The object below (originally on line 664) was inconsistent with other similar data structures (e.g., NOBELPROCERA_TITANIUM_BAR_CC_DATA), which use a single 'kit' property.
  // Refactored to use 'kit' for consistency and correctness.
  { rowKey: 'positionLocatorKit', kit: 'IO 2A Kit' },
  { rowKey: 'replicaIOS', np: 'PMA-NBR35-1', rp: 'PMA-NBR43-1', wp: 'PMA-NBR50-1', '6': 'PMA-NBR60-1' },
  { rowKey: 'scanbodyDTX', np: '300452', rp: '300453', wp: '300454', '6': '300455' },
];

export const NOBEL_PEARL_COMPONENTS_DATA = [
  { rowKey: 'pilarUnitaria', np: '301263', rp: '301264', wp: '301265' },
  { rowKey: 'pilarMultiple', np: '301285', rp: '301286', wp: '301287' },
  { rowKey: 'tornilloClinica', np: '300691', rp: '300691', wp: '300691' },
  { rowKey: 'destornillador', np: '300661 (19mm)', rp: '300678 (23mm)', wp: '300681 (28mm)' },
  { rowKey: 'tornilloLaboratorio', np: '300695', rp: '300695', wp: '300695' },
  { rowKey: 'tornilloProvisional', np: '300693', rp: '300693', wp: '300693' },
  { rowKey: 'iosPositionLocator', np: '301246', rp: '301247', wp: '301248' },
  { rowKey: 'replicaIOS', np: '301249', rp: '301250', wp: '301251' },
];

export const MUA_XEAL_CC_RECTO_DATA = [
    { rowKey: 'np', '1.5': '300171', '2.5': '300174', '3.5': '300177', '4.5': '—' },
    { rowKey: 'rp', '1.5': '300172', '2.5': '300175', '3.5': '300178', '4.5': '300180' },
    { rowKey: 'wp', '1.5': '300173', '2.5': '300176', '3.5': '300179', '4.5': '—' },
];

export const MUA_XEAL_CC_ANGULADO_DATA = [
    { rowKey: 'np_17', angle: '17°', '2.5': '300181', '3.5': '300184', '4.5': '—' },
    { rowKey: 'np_30', angle: '30°', '2.5': '—', '3.5': '300187', '4.5': '300189' },
    { rowKey: 'rp_17', angle: '17°', '2.5': '300182', '3.5': '300185', '4.5': '—' },
    { rowKey: 'rp_30', angle: '30°', '2.5': '—', '3.5': '300188', '4.5': '300190' },
    { rowKey: 'wp_17', angle: '17°', '2.5': '300183', '3.5': '300186', '4.5': '—' },
];

export const MUA_XEAL_N1_TCC_RECTO_DATA = [
    { rowKey: 'np', '1.5': '301044', '2.5': '301045', '3.5': '301046', '4.5': '—' },
    { rowKey: 'rp', '1.5': '301047', '2.5': '301048', '3.5': '301049', '4.5': '301050' },
];

export const MUA_XEAL_N1_TCC_ANGULADO_DATA = [
    { rowKey: 'np_17', angle: '17°', '2.5': '301051', '3.5': '301052', '4.5': '—' },
    { rowKey: 'np_30', angle: '30°', '2.5': '—', '3.5': '301055', '4.5': '301056' },
    { rowKey: 'rp_17', angle: '17°', '2.5': '301053', '3.5': '301054', '4.5': '—' },
    { rowKey: 'rp_30', angle: '30°', '2.5': '—', '3.5': '301055', '4.5': '301056' },
];

export const MUA_BRANEMARK_RECTO_DATA = [
    { rowKey: 'np', '1': '29176', '2': '29177', '3': '29178', '4': '—', '5': '—' },
    { rowKey: 'rp', '1': '29179', '2': '29180', '3': '29181', '4': '29182', '5': '29183' },
    { rowKey: 'wp', '1': '29184', '2': '29185', '3': '29186', '4': '—', '5': '—' },
];

export const MUA_BRANEMARK_ANGULADO_DATA = [
    { rowKey: 'np_17', angle: '17°', '2': '29187', '3': '29188', '4': '—', '5': '—' },
    { rowKey: 'rp_17', angle: '17°', '2': '29189', '3': '29190', '4': '29191', '5': '—' },
    { rowKey: 'wp_30', angle: '30°', '2': '—', '3': '—', '4': '29192', '5': '29193' },
];

export const MUA_TRICHANNEL_RECTO_DATA = [
    { rowKey: 'np', '1': '29196', '2': '29197', '3': '29198', '4': '—', '5': '—' },
    { rowKey: 'rp', '1': '29199', '2': '29200', '3': '29201', '4': '29202', '5': '29203' },
    { rowKey: 'wp', '1': '29204', '2': '29205', '3': '29206', '4': '—', '5': '—' },
];

export const MUA_TRICHANNEL_ANGULADO_DATA = [
    { rowKey: 'np_17', angle: '17°', '2': '29235', '3': '29236', '4': '—', '5': '—' },
    { rowKey: 'rp_17', angle: '17°', '2': '29237', '3': '29238', '4': '29239', '5': '—' },
    { rowKey: 'wp_30', angle: '30°', '2': '—', '3': '—', '4': '29240', '5': '29241' },
];


export const REFERENCE_IMAGE_MAP: { [key: string]: string } = {
  // CC
  '37367': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/3/7/37367_1_785e.png',
  '37606': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/3/7/37606_1_864f.png',
  '37374': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/3/7/37374_b6c4.png',
  '37607': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/3/7/37607_1_0209.png',
  '300457': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/3/0/300457_94e3.png',
  '300458': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/3/0/300458_b62c.png',
  '300459': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/3/0/300459_48b7.png',

  // Branemark
  '31171': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/3/1/31171_1_2595.png',
  '28815': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/2/8/28815_1_b32e.png',
  '28844': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/2/8/28844_1_3a1d.png',
  '37894': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/3/7/37894_1_0192.png',
  '37895': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/3/7/37895_1_2f1d.png',
  '300460': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/3/0/300460_d086.png',
  '300461': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/3/0/300461_f9c8.png',
  '300462': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/3/0/300462_75a6.png',

  // Tri-channel
  '28837': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/2/8/28837_1_1821.png',
  '28816': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/2/8/28816_1_8f17.png',
  '300452': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/3/0/300452_b765.png',
  '300453': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/3/0/300453_e6a3.png',
  '300454': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/3/0/300454_0664.png',
  '300455': 'https://store.nobelbiocare.com/international/en/media/catalog/product/cache/43e7a0282b01518f921935c754a95574/3/0/300469_b25e.png',
};

export const ELOS_TOOLS_DATA = [
    { name: 'elos_driver', reference: '300500', imageUrl: 'https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/300500_elos-accurate-driver-1-25mm_1_1200x1200_4463.png' },
    { name: 'elos_screwdriver', reference: '300501', imageUrl: 'https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/300501_1_2_1500x1500_3_1_1200x1200_1854.png' },
    { name: 'elos_manual_driver', reference: '300502', imageUrl: 'https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/300502_elos-accurate-manual-driver-1-25mm_1_1200x1200_1_f50d.png' },
    { name: 'elos_torque_wrench', reference: '300503', imageUrl: 'https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/300503_elos-accurate-torque-wrench-prosthetic_1_1200x1200_1_2117.png' },
    { name: 'elos_adapter', reference: '300504', imageUrl: 'https://store.nobelbiocare.com/es/es/media/catalog/product/cache/8b702e05dee6f1504d8f77fa0603bd46/3/0/300504_elos-accurate-adapter-torq-wrench_1_1200x1200_1_4bf1.png' },
];

export const TRI_CHANNEL_TABLE_DATA = [
  { rowKey: 'tornilloClinico', np: '36818', rp: '29475', wp: '29475', '6': '29475' },
  { rowKey: 'destornillador', np: 'Unigrip', rp: 'Unigrip', wp: 'Unigrip', '6': 'Unigrip' },
  { rowKey: 'tornilloLaboratorio', np: '31170', rp: '29293*', wp: '29293*', '6': '29293*' },
  { rowKey: 'elosAccuratePositionLocator', np: 'IO 2A-A', rp: 'IO 2A-B', wp: 'IO 2A-C', '6': '—' },
  { rowKey: 'elosAccuratePositionLocatorKit', kit: 'IO 2A Kit' },
  { rowKey: 'replicaForIOS', np: 'PMA-NBR35-1', rp: 'PMA-NBR43-1', wp: 'PMA-NBR50-1', '6': '—' },
  { rowKey: 'desktopScanbodyDTX', np: '300452', rp: '300453', wp: '300454', '6': '—' },
];