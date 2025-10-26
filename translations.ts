import { RestorationType, CaseStatus, N1Type, ConnectionType } from './types';

const enTranslations = {
  header: {
    title: "E-Prosthetic Overview",
    support_button: "Technical Support",
    customer_service_button: "Customer Service",
    download_center_button: "Download Center",
  },
  intro_modal: {
    title: "Welcome to the E-Prosthetic Overview",
    language_section_title: "1. Select your language",
    online_store_country_section_title: "2. Online Store Country",
    confirm_button: "Confirm Selection"
  },
  chatbot: {
    title: "Virtual Assistant",
    welcome_message: "Welcome. I am the virtual assistant. How can I help you find information about the prosthetic solutions available in this catalog?",
    input_placeholder: "Ask about a product...",
    error_message: "I apologize, but I am currently unable to process your request. Please try again later.",
    sources_title: "Sources",
  },
  filterBar: {
    title: "Filters",
    search_placeholder: "Search by ID, name, item...",
    connection_type_label: "Connection Type",
    software_type_label: "Software Type",
    production_label: "Production",
    restoration_type_label: "Restoration Type",
    angulated_access_label: "Angulated Screw Channel",
    reset_button: "Reset Filters",
    hide_filters: "Hide filters",
    show_filters: "Show filters",
    filters_active_tooltip: "Filters are active",
    options: {
      all: "All",
      yes: "Yes",
      no: "No",
      [CaseStatus.Local]: "Local",
      [CaseStatus.Procera]: "Procera",
      [CaseStatus.Standard]: "Standard Abutment",
      [CaseStatus.Otros]: "Others",
      [RestorationType.Unitaria]: "Unitary",
      [RestorationType.Multiple]: "Multiple",
      [ConnectionType.Pearl]: "Inter-X Pearl",
    }
  },
  caseGrid: {
    no_cases_title: "No cases found",
    no_cases_description: "Try adjusting your search filters.",
  },
  caseCard: {
    no_image: "No image",
    references: "Info:",
    view: "View",
    download: "Download",
    tables: "Tables",
    exos_analysis_button: "EXOS",
    exos_analysis_tooltip: "UI Analysis",
    status: {
      [CaseStatus.Local]: "Local Production",
      [CaseStatus.Procera]: "Procera Production",
      [CaseStatus.Standard]: "Standard",
      [CaseStatus.Otros]: "Others",
    },
    status_short: {
      [CaseStatus.Local]: "Local",
      [CaseStatus.Procera]: "Procera",
      [CaseStatus.Standard]: "Standard",
      [CaseStatus.Otros]: "Others",
    },
    procera_warranty: "10 years",
    warranty_tooltip: "Nobel Biocare Warranty",
    restoration_type_label: "Restoration Type",
    platform_label: "Platform",
    angulation_label: "Angulation",
    torque_label: "Torque",
    software_label: "Compatible Soft.",
    screw_label: "Screw",
    image_label: "Image",
    image_alt: "Design for",
    aria_view_refs_cc_for: "View CC references for",
    aria_view_refs_branemark_for: "View Branemark references for",
    aria_view_refs_tri_for: "View Tri-channel references for",
    aria_view_refs_mua_for: "View Multi-Unit references for",
    aria_view_refs_n1tcc_for: "View N1 TCC references for",
    aria_view_refs_for: "View references for",
    aria_download_for: "Download for",
    generate_description_label: "Generate AI description",
    view_details_label: "View details",
    generating_description_tooltip: "Generating description...",
    generate_description_tooltip: "Click to generate AI description",
    description_error: "Could not generate description.",
    aria_view_details_for: "View details for",
    text_to_speech_label: "Read description aloud",
    stop_speech_label: "Stop reading",
    product_link_label: "View Product",
    copy_id_label: "Copy ID",
    ai_summary_web_title: "Web Summary",
    ai_summary_app_title: "App Summary",
  },
  footer: {
    socialTitle: 'SOCIAL MEDIA',
    social: {
        facebook: "https://www.facebook.com/nobelbiocare/",
        instagram: "https://www.instagram.com/nobelbiocare/",
        youtube: "https://www.youtube.com/user/nobelbiocare",
        linkedin: "https://www.linkedin.com/company/nobel-biocare",
        x: "https://twitter.com/nobelbiocare"
    }
  },
  modal: {
    close_aria_label: "Close modal",
    back_button: "Back",
    descargas_procera_modal_title: "Library Download",
    selec_pro_local_title: "Select Workflow",
    tables_modal_title: "User Interface Information",
    botones_modal_title: "Button Gallery",
    customer_service_title: "Customer Service",
    download_center_title: "Download Center",
    exos_modal_title: "Interface Analysis (EXOS)",
    no_components_description: "No specific components for this selection.",
    reference_label: "Reference:",
    iconography_details_title: "Details",
    connection_selector_label: "Select Connection",
    resources_title: "Additional Resources",
    resource1_label_procera: "Download Libraries",
    design_services_button: "Design services",
    procera_tracking_button: "NobelProcera shipment tracking",
    support_modal_whatsapp_title: "WhatsApp",
    support_modal_intro: "Scan the QR code to contact Technical Support via WhatsApp.",
    support_modal_manual: "Or add manually:",
    support_modal_contact_name: "Nobel Biocare Technical Support",
    support_modal_whatsapp_only: "WhatsApp only",
    support_modal_book_title: "Schedule a Session",
    support_modal_book_intro: "Book a 30-minute session with a technical specialist.",
    support_modal_book_link: "Open booking calendar",
    support_modal_email_title: "Email",
    support_modal_email_intro: "Send your query by email.",
    support_modal_email_link: "Send an email",
    support_modal_email_address_text: "Or copy the address:",
    support_modal_phone_title: "Customer service phone",
    support_modal_phone_schedule: "Monday to Friday\n9:00 AM - 6:00 PM",
    support_modal_phone_cta: "Call now",
    support_modal_phone_number_copy: "+1 800-993-8994",
    support_modal_phone_tel: "+18009938994",
    descargas_procera_modal_text: "Downloading and installing libraries can be complex, even for expert users. We'd love to help you get everything working perfectly. Please request a day and time, and we'll call you at your convenience.",
    descargas_procera_modal_salir_button: "Exit",
    descargas_procera_modal_hacerlo_button: "I prefer to do it myself",
    descargas_other_procera_modal_text: "To download these libraries, please contact your sales representative or customer service.",
    contact_us_title: "Contact Us",
    contact_us_link: "Visit contact page",
    selec_pro_local_description: "Select the workflow type to access the corresponding library download page.",
    download_procera_button: "Libraries for Procera Production",
    download_local_button: "Libraries for Local Production",
    customer_service_intro: "For general inquiries, please contact our customer service through their website.",
    customer_service_link: "Go to Customer Service",
    copy_email_aria_label: "Copy email",
    copy_phone_aria_label: "Copy phone",
    tables_modal: {
      windows_title: "Main Windows and Components",
      windows_col_component: "Component",
      windows_col_purpose: "Purpose",
      windows_data: {
        App: "Root component, manages global state and renders the main structure.",
        Header: "Top navigation bar with title, language switcher, and support button.",
        FilterBar: "Side panel for filtering cases by different criteria.",
        CaseGrid: "Displays the grid of filtered case cards.",
        CaseCard: "Individual card summarizing a case's information.",
        Modal: "Generic container for displaying content in a popup window.",
        PreMilledBlanksPage: "Details page for pre-milled components.",
        DevDebugPage: "Debug page for developers with information and tools.",
        DownloadLibraries: "Component to display library download links.",
        SupportModal: "Content for the technical support modal.",
        TablesModalContent: "Content for the UI information modal (this very table)."
      },
      buttons_title: "Buttons and Actions",
      buttons_col_label: "Label / Icon",
      buttons_col_location: "Location",
      buttons_col_action: "Action",
       buttons_data: {
        support: "Opens the Technical Support modal.",
        language: "Changes the interface language.",
        toggle_filters: "Shows or hides the filter panel.",
        reset_filters: "Clears all active filters.",
        filter_segment: "Selects an option to filter the cases.",
        image_nav: "Navigates between a case's images.",
        image_dots: "Navigates to a specific case image.",
        reference: "Opens the modal with case component details.",
        download_help: "Opens the download help modal (test case only).",
        ui_tables: "Opens the modal with UI information tables (test case only).",
      },
      modals_title: "Modals and Popup Content",
      modals_col_trigger: "Trigger Action",
      modals_col_components: "Content / Components",
      modals_data: {
          support_trigger: "Click on 'Technical Support'",
          support_content: "Modal with contact options: WhatsApp, Calendar, Email, Phone. Component: SupportModal.",
          components_trigger: "Click on 'View' or a specific connection on a case card",
          components_content: "Modal showing detailed component tables for the selected case. Content is dynamic based on the case. Components: PreMilledBlanksPage, ZirconiaBridgeSubTable, etc.",
          download_trigger: "Click on 'Download Libraries' in a case modal",
          download_content: "Modal with options to download libraries. Components: DescargasProceraModalContent, DescargasOtherProcera, SelecProLocal.",
          debug_trigger: "Click on 'Tables' in the test case card (TEST001)",
          debug_content: "Debug modal for developers. Component: DevDebugPage.",
          ui_info_trigger: "Click on 'UI Info' in the test case card (TEST001)",
          ui_info_content: "Modal with tables describing the UI structure and functionality. Component: TablesModalContent."
      },
    },
  },
  exos_modal: {
    table1_title: "Case - Modal Content Relationship",
    table1_col_case_title: "Case Title",
    table1_col_case_id: "Case ID",
    table1_col_modal_content: "Modal Content Type",
    table2_title: "Modal Window Analysis",
    table2_col_modal_name: "Modal Name",
    table2_col_description: "Description",
    table2_col_sections: "Internal Sections & Buttons",
  },
  universalBaseTable: {
    title: "Universal Base Non-Engaging Components",
    cc: "Conical Connection",
    externalHex: "Brånemark System® (External Hex)",
    triChannel: "NobelReplace® (Tri-channel)",
    neckRef1_5: "Reference neck 1.5mm",
    neckRef3_0: "Reference neck 3.0mm",
    posteriorHeight: "Posterior height",
    screw: "Clinical screw",
    screwdriver: "Screwdriver",
    labScrew: "Laboratory screw",
    positionLocator: "Elos Accurate® Position Locator for IOS",
    positionLocatorKit: "Elos Accurate® Position Locator Kit for IOS",
    replicaIOS: "Elos Accurate® Replica for IOS",
    scanbodyDTX: "Scanbody for DTX Studio™",
    implantAnalog: "Plaster implant analog",
    footer: "*5 Pkg"
  },
  universalBaseRotatingTable: {
    reference: "Reference",
    neckHeight: "Neck height",
    posteriorHeight: "Posterior height",
    diameter: "Diameter",
    screw: "Clinical screw",
    screwdriver: "Screwdriver",
    labScrew: "Laboratory screw",
    positionLocator: "Elos Accurate® Position Locator for IOS",
    positionLocatorKit: "Elos Accurate® Position Locator Kit for IOS",
    replicaIOSAnalog: "Elos Accurate® Replica for IOS (analog)",
    scanbodyDTX: "Scanbody for DTX Studio™",
    replicaIOS: "Elos Accurate® Replica for IOS",
    footer: "*5 Pkg",
  },
  universalBaseRotatingCCTable: {
    title: "Universal Base Engaging CC - Straight Design"
  },
  universalBaseRotatingConicoCCTable: {
    title: "Universal Base Engaging Conical CC – Conical Design"
  },
  universalBaseRotatingBranemarkTable: {
    title: "Universal Base Engaging Branemark – Straight Design"
  },
  universalBaseRotatingConicoBranemarkTable: {
    title: "Universal Base Engaging Branemark – Conical Design"
  },
  universalBaseRotatingTriChannelTable: {
    title: "Universal Base Engaging Tri-channel – Straight Design"
  },
  universalBaseRotatingConicoTriChannelTable: {
    title: "Universal Base Engaging Tri-channel – Conical Design"
  },
  universalMultiUnitTable: {
    rectoTitle: "Universal Multi-unit Base – Straight Design",
    conicoTitle: "Universal Multi-unit Base – Conical Design",
    connectionTitle: "Multi-unit Connection Components",
    footerRecto: "¹NP/RP ²WP",
    np_rp: "NP/RP",
    wp: "WP",
    reference: "Reference",
    neckHeight: "Neck height",
    posteriorHeight: "Posterior height",
    diameter: "Diameter",
    screw: "Clinical screw",
    screwdriver: "Screwdriver",
    labScrew: "Laboratory screw",
    positionLocator: "Elos Accurate® Position Locator for IOS",
    positionLocatorKit: "Elos Accurate® Position Locator Kit for IOS",
    replicaIOS: "Elos Accurate® Replica for IOS",
    scanbodyDTX: "Scanbody for DTX Studio™",
    implantAnalog: "Plaster implant analog",
    clinicalScrew: "Clinical screw",
    replicaIOSAnalog: "Elos Accurate® Replica for IOS (analog)",
  },
  pilarUniversalOn1Table: {
    title: "On1 Universal Abutment Components",
    noRotatorioTitle: "On1 Universal Base Non-Engaging",
    rotatorioTitle: "On1 Universal Base Engaging",
    refCuello0_3: "Reference neck 0.3mm",
    refCuello1_25: "Reference neck 1.25mm",
    alturaPosterior: "Posterior height",
    diametro: "Diameter",
    screw: "Clinical screw",
    destornillador: "Screwdriver",
    labScrew: "Laboratory screw",
    iosScanbody4_5: "IOS Scanbody (4.5mm)",
    iosScanbody5_0: "IOS Scanbody (5.0mm)",
    iosScanbody6_0: "IOS Scanbody (6.0mm)",
    iosAnalog: "Analog for IOS",
    insertionTool: "Insertion tool",
    scanbodyDTX: "Scanbody for DTX Studio™",
    footer: "Use Unigrip screwdriver"
  },
  n1BaseUniversalTable: {
    title: "N1 Universal Base Components",
    unitariaTitle: "N1 Base Unitary (Non-engaging)",
    puenteTitle: "N1 Base Bridge (Engaging)",
    reference: "Reference",
    posteriorHeight: "Posterior height",
    screw: "Screw",
    screwdriver: "Screwdriver",
    labScrew: "Laboratory screw",
    iosScanbody: "IOS Scanbody",
    iosScanbodyHealingCap: "IOS Scanbody/Healing cap",
    iosAnalog: "Analog for IOS",
    iosInsertionTool: "IOS Insertion Tool",
    scanbodyDTX: "Scanbody for DTX Studio™",
  },
  n1TccUnitariaTable: {
    title: "N1 TCC Universal Base Components (Non-engaging)",
    refCuello1_5: "Reference neck 1.5mm",
    refCuello3_0: "Reference neck 3.0mm",
    posteriorHeight: "Posterior height",
    screw: "Screw",
    screwdriver: "Screwdriver",
    labScrew: "Laboratory screw",
    iosScanbody: "IOS Scanbody",
    iosAnalog: "Analog for IOS",
    iosInsertionTool: "IOS Insertion Tool",
    scanbodyDTX: "Scanbody for DTX Studio™",
    footer: "NP diameter not suitable for molars"
  },
  zirconiaBridgeCCTable: {
    title: "Zirconia Bridge - Conical Connection"
  },
  zirconiaBridgeBranemarkTable: {
    title: "Zirconia Bridge - Brånemark System®"
  },
  zirconiaBridgeTriChannelTable: {
    title: "Zirconia Bridge - NobelReplace® (Tri-channel)"
  },
  proceraFCZImplantCrownTable: {
    title: "Components for Procera FCZ Implant Crown",
    conexion: "Connection",
    screw: "Clinical screw",
    screwdriver: "Screwdriver",
    labScrew: "Laboratory screw",
    elosScanbody: "Elos Accurate® Position Locator for IOS",
    elosScanbodyKit: "Elos Accurate® Position Locator Kit for IOS",
    replicaIOS: "Elos Accurate® Replica for IOS",
    desktopScanbody: "Scanbody for DTX Studio™",
  },
  proceraTitaniumPillarTable: {
    ccTitle: "Procera Titanium Abutment - Conical Connection",
    branemarkTitle: "Procera Titanium Abutment - Brånemark System®",
    triChannelTitle: "Procera Titanium Abutment - NobelReplace® (Tri-channel)",
  },
  proceraTitaniumAscPillarTable: {
    ccTitle: "Procera Titanium ASC Abutment - Conical Connection",
    triChannelTitle: "Procera Titanium ASC Abutment - NobelReplace® (Tri-channel)",
    ccFooter: "Omnigrip screw and screwdriver included.",
    triChannelFooter: "Omnigrip screw and screwdriver included.",
  },
  proceraZirconiaPillarTable: {
    ccTitle: "Procera Zirconia Abutment - Conical Connection",
    branemarkTitle: "Procera Zirconia Abutment - Brånemark System®",
    triChannelTitle: "Procera Zirconia Abutment - NobelReplace® (Tri-channel)",
    triChannelFooter: "*5 Pkg",
  },
  nobelProceraTitaniumBarTable: {
    ccTitle: "NobelProcera Titanium Bar - Conical Connection",
    branemarkTitle: "NobelProcera Titanium Bar - Brånemark System®",
    triChannelTitle: "NobelProcera Titanium Bar - NobelReplace® (Tri-channel)",
    positionLocator: "Elos Accurate® Position Locator for IOS",
    positionLocatorKit: "Elos Accurate® Position Locator Kit for IOS",
    replicaIOS: "Elos Accurate® Replica for IOS",
    scanbodyDTX: "Scanbody for DTX Studio™",
    screw: "Clinical screw",
    screwdriver: "Screwdriver",
    labScrew: "Laboratory screw",
  },
  nobelPearlTable: {
    title: "Components for NobelPearl Abutment",
    pilarUnitaria: "Unitary Abutment",
    pilarMultiple: "Multiple Abutment",
    tornilloClinica: "Clinical screw",
    destornillador: "Screwdriver",
    tornilloLaboratorio: "Laboratory screw",
    tornilloProvisional: "Temporary screw",
    iosPositionLocator: "IOS Position Locator",
    replicaIOS: "Replica for IOS",
    footer: "Torque 35Ncm",
  },
  multiUnitAbutmentsTable: {
    platformHeader: "Platform",
    ccRectoTitle: "Standard Multi-unit Straight Abutment - Conical Connection",
    ccAnguladoTitle: "Standard Multi-unit Angled Abutment - Conical Connection",
    n1TccRectoTitle: "Standard Multi-unit Straight Abutment - N1 TCC",
    n1TccAnguladoTitle: "Standard Multi-unit Angled Abutment - N1 TCC",
    branemarkRectoTitle: "Standard Multi-unit Straight Abutment - Brånemark System®",
    branemarkAnguladoTitle: "Standard Multi-unit Angled Abutment - Brånemark System®",
    triChannelRectoTitle: "Standard Multi-unit Straight Abutment - NobelReplace® (Tri-channel)",
    triChannelAnguladoTitle: "Standard Multi-unit Angled Abutment - NobelReplace® (Tri-channel)",
  },
  preMilledBlanksTable: {
    component_header: "Component",
    diameter10: "Ø 10 mm Abutment",
    diameter14: "Ø 14 mm Abutment",
    screw: "Clinical screw",
    screwdriver: "Screwdriver",
    labScrew: "Laboratory screw",
    scanbodies: "Scanbodies",
    scanbodiesKit: "Scanbody Kit",
    replicaAccurate: "Elos Accurate® Replica",
    replicaBiocare: "Nobel Biocare® Replica",
    plasterAnalog: "Plaster analog",
    protectionAnalog: "Protection analog",
    footer: "* Laboratory screw 37895 is included with the abutment. Others are ordered separately.",
    notes: "** Laboratory screw 29293 is included with the abutment.",
    download_libraries_title: "Download libraries",
    download_libraries_title_procera: "Access Procera libraries",
    download_libraries_link_text: "Libraries for Exocad®",
    download_libraries_3shape_link_text: "Libraries for 3Shape®",
    download_libraries_dentalwings_link_text: "Libraries for Dental Wings®",
    download_libraries_see_all_link_text: "See all libraries",
    support_button_text: "I need help"
  },
  preMilledBlanksN1TCCTable: {
    title: "Pre-milled Abutment N1 TCC",
    diameter10: "Ø 10 mm Abutment",
    diameter14: "Ø 14 mm Abutment",
    screw: "Clinical screw",
    screwdriver: "Screwdriver",
    labScrew: "Laboratory screw",
    scanbodies: "Scanbodies",
    replicaAccurate: "Elos Accurate® Replica",
    plasterAnalog: "Plaster analog",
  },
  triChannelTestTable: {
    title: "Components for Titanium Bridge - NobelReplace® (Tri-channel)",
    conexionHeader: "Connection",
    tornilloClinico: "Clinical screw",
    destornillador: "Screwdriver",
    tornilloLaboratorio: "Laboratory screw",
    elosAccuratePositionLocator: "Elos Accurate® Position Locator for IOS",
    elosAccuratePositionLocatorKit: "Elos Accurate® Position Locator Kit for IOS",
    replicaForIOS: "Replica for IOS",
    desktopScanbodyDTX: "Desktop Scanbody for DTX Studio™",
    footer: "*5 Pkg"
  },
  devDebugPage: {
    title: "Testing and Debugging Section",
    description: "This section is for testing components and functionalities under development.",
    example_buttons_title: "Example Buttons",
    primary_button: "Primary Button",
    secondary_button: "Secondary Button",
    botones_button: "Button Gallery",
    example_icons_title: "Example Icons",
    colorPaletteTitle: "Card Color Palette",
    colors: {
      raspberry: "Raspberry",
      salmon: "Salmon",
      yellow: "Yellow",
      teal: "Teal",
      blue: "Blue",
      cornflower: "Cornflower",
    },
    iconGridTitle: "Application Icon Grid",
    referenceTableTitle: "Analysis of Modal Windows and Floating Components",
    modalIdHeader: "Component ID",
    modalTriggerHeader: "Trigger Action",
    modalPurposeHeader: "Purpose and Content",
    linkTooltip: "This link is an anchor to the modal component's ID. It will not open the modal directly.",
    modal_titles: {
      references: "Components/References",
      help_espt: "Library Download (EN/ES/PT)",
      help_frsv: "Library Download (FR/SV)",
      workflow_selector: "Select Workflow",
      ui_tables: "User Interface Information",
      test_table: "Test Table (Tri-channel)",
      customer_service: "Customer Service",
      button_gallery: "Button Gallery",
      download_center: "Download Center",
      exos_analysis: "Interface Analysis (EXOS)",
      intro: "Language/Country Selection",
      chatbot: "Virtual Assistant"
    },
    modal_triggers: {
      references: "Click 'View' or a specific connection on a case card.",
      help_espt: "Click 'Download Libraries' (EN/ES/PT).",
      help_frsv: "Click 'Download Libraries' (FR/SV).",
      workflow_selector: "Click 'I prefer to do it myself' in the download help modal.",
      ui_tables: "Click 'Tables' on the TEST001 case card.",
      test_table: "Click the table icon on the TEST001 case card.",
      customer_service: "Click 'Customer Service' in the header (FR/SV).",
      button_gallery: "Click 'Button Gallery' on the debug page.",
      download_center: "Click 'Download Center' in the header.",
      exos_analysis: "Click 'EXOS' on the TEST001 case card.",
      intro: "On application load or by clicking the globe icon in the header.",
      chatbot: "Click the floating chatbot button."
    },
    modal_purposes: {
      references: "Shows detailed component tables for a case. Content is dynamic based on the case and selected connection.",
      help_espt: "Guides the user for library download, offering to schedule a help session.",
      help_frsv: "Informs the user on how to obtain libraries, directing them to customer service.",
      workflow_selector: "Allows the user to choose between Procera and Local Production workflows to access the correct libraries.",
      ui_tables: "Provides meta-information about the application's own structure and functionality (components, buttons, modals).",
      test_table: "Displays a static test table (Tri-channel Components).",
      customer_service: "Provides an access point to customer service (QR and link).",
      button_gallery: "Showcases a collection of all available button styles for development purposes.",
      download_center: "Offers centralized access to documents (Overviews) and the library download flow.",
      exos_analysis: "Displays a UI analysis, including the relationship between cases and their modals, and a breakdown of each modal.",
      intro: "Allows the user to set the language and online store country at startup.",
      chatbot: "Floating component to converse with an AI virtual assistant about the products."
    },
    testSection: {
      title: "Testing and Debugging Section",
      description: "This section is for testing components and functionalities under development.",
      example_buttons_title: "Example Buttons",
      primary_button: "Primary Button",
      secondary_button: "Secondary Button",
      botones_button: "Button Gallery",
      example_icons_title: "Example Icons",
    }
  },
  tooltip: {
    filters_active_label: "Filters applied:",
    remove_filters_link: "Remove filters"
  },
  notes: {
    "tornillo clínico incluido": "Clinical screw included",
    "This is a test case.": "This is a test case."
  }
};

const esTranslations = {
  header: {
    title: "E-Prosthetic Overview",
    support_button: "Soporte Técnico",
    customer_service_button: "Atención al cliente",
    download_center_button: "Centro de descargas",
  },
  intro_modal: {
    title: "Bienvenido al E-Prosthetic Overview",
    language_section_title: "1. Seleccione su idioma",
    online_store_country_section_title: "2. País de la Tienda Online",
    confirm_button: "Confirmar Selección"
  },
  chatbot: {
    title: "Asistente Virtual",
    welcome_message: "Bienvenido. Soy el asistente virtual. ¿Cómo puedo ayudarle a encontrar información sobre las soluciones protésicas disponibles en este catálogo?",
    input_placeholder: "Pregunte por un producto...",
    error_message: "Disculpe, actualmente no puedo procesar su solicitud. Por favor, inténtelo de nuevo más tarde.",
    sources_title: "Fuentes",
  },
  filterBar: {
    title: "Filtros",
    search_placeholder: "Buscar por ID, nombre, artículo...",
    connection_type_label: "Tipo de Conexión",
    software_type_label: "Tipo de Software",
    production_label: "Producción",
    restoration_type_label: "Tipo de Restauración",
    angulated_access_label: "Restauración con Acceso angulado",
    reset_button: "Quitar Filtros",
    hide_filters: "Ocultar filtros",
    show_filters: "Mostrar filtros",
    filters_active_tooltip: "Hay filtros activos",
    options: {
      all: "Todos",
      yes: "Sí",
      no: "No",
      [CaseStatus.Local]: "Local",
      [CaseStatus.Procera]: "Procera",
      [CaseStatus.Standard]: "Pilar estándar",
      [CaseStatus.Otros]: "Otros",
      [RestorationType.Unitaria]: "Unitaria",
      [RestorationType.Multiple]: "Múltiple",
      [ConnectionType.Pearl]: "Inter-X Pearl",
    }
  },
  caseGrid: {
    no_cases_title: "No se encontraron casos",
    no_cases_description: "Intenta ajustar los filtros de búsqueda.",
  },
  caseCard: {
    no_image: "Sin imagen",
    references: "Info:",
    view: "Ver",
    download: "Descarga",
    tables: "Tablas",
    exos_analysis_button: "EXOS",
    exos_analysis_tooltip: "Análisis de UI",
    status: {
      [CaseStatus.Local]: "Producción Local",
      [CaseStatus.Procera]: "Producción Procera",
      [CaseStatus.Standard]: "Standard",
      [CaseStatus.Otros]: "Otros",
    },
    status_short: {
      [CaseStatus.Local]: "Local",
      [CaseStatus.Procera]: "Procera",
      [CaseStatus.Standard]: "Standard",
      [CaseStatus.Otros]: "Otros",
    },
    procera_warranty: "10 años",
    warranty_tooltip: "Garantía Nobel Biocare",
    restoration_type_label: "Tipo Restauración",
    platform_label: "Plataforma",
    angulation_label: "Angulación",
    torque_label: "Torque",
    software_label: "Soft. Compatible",
    screw_label: "Tornillo",
    image_label: "Imagen",
    image_alt: "Diseño para",
    aria_view_refs_cc_for: "Ver referencias CC para",
    aria_view_refs_branemark_for: "Ver referencias Branemark para",
    aria_view_refs_tri_for: "Ver referencias Tri-channel para",
    aria_view_refs_mua_for: "Ver referencias Multi-Unit para",
    aria_view_refs_n1tcc_for: "Ver referencias N1 TCC",
    aria_view_refs_for: "Ver referencias para",
    aria_download_for: "Descargar para",
    generate_description_label: "Generar descripción con IA",
    view_details_label: "Ver detalles",
    generating_description_tooltip: "Generando descripción...",
    generate_description_tooltip: "Clic para generar descripción con IA",
    description_error: "No se pudo generar la descripción.",
    aria_view_details_for: "Ver detalles de",
    text_to_speech_label: "Leer descripción en voz alta",
    stop_speech_label: "Dejar de leer",
    product_link_label: "Ver Producto",
    copy_id_label: "Copiar ID",
    ai_summary_web_title: "Resumen Web",
    ai_summary_app_title: "Resumen de la App",
  },
  footer: {
    socialTitle: 'REDES SOCIALES',
    social: {
        facebook: "https://www.facebook.com/nobelbiocare/",
        instagram: "https://www.instagram.com/nobelbiocare/",
        youtube: "https://www.youtube.com/user/nobelbiocare",
        linkedin: "https://www.linkedin.com/company/nobel-biocare",
        x: "https://twitter.com/nobelbiocare"
    }
  },
  modal: {
    close_aria_label: "Cerrar modal",
    back_button: "Atrás",
    descargas_procera_modal_title: "Descarga de Librerías",
    selec_pro_local_title: "Seleccionar Flujo de Trabajo",
    tables_modal_title: "Información de la Interfaz de Usuario",
    botones_modal_title: "Galería de Botones",
    customer_service_title: "Atención al Cliente",
    download_center_title: "Centro de descargas",
    exos_modal_title: "Análisis de la Interfaz (EXOS)",
    no_components_description: "No hay componentes específicos para esta selección.",
    reference_label: "Referencia:",
    iconography_details_title: "Detalles",
    connection_selector_label: "Seleccionar Conexión",
    resources_title: "Recursos Adicionales",
    resource1_label_procera: "Descargar Librerías",
    design_services_button: "Servicios de diseño",
    procera_tracking_button: "Seguimiento envíos NobelProcera",
    support_modal_whatsapp_title: "WhatsApp",
    support_modal_intro: "Escanee el código QR para contactar con Soporte Técnico por WhatsApp.",
    support_modal_manual: "O añada manually:",
    support_modal_contact_name: "Soporte Técnico Nobel Biocare",
    support_modal_whatsapp_only: "Solo WhatsApp",
    support_modal_book_title: "Agendar Sesión",
    support_modal_book_intro: "Reserve una sesión de 30 minutos con un especialista técnico.",
    support_modal_book_link: "Abrir calendario de reservas",
    support_modal_email_title: "Email",
    support_modal_email_intro: "Envíe su consulta por correo electrónico.",
    support_modal_email_link: "Enviar un email",
    support_modal_email_address_text: "O copie la dirección:",
    support_modal_phone_title: "Teléfono atención al cliente",
    support_modal_phone_schedule: "Lunes a Viernes\n9:00 - 18:00",
    support_modal_phone_cta: "Llamar ahora",
    support_modal_phone_number_copy: "935 088 829",
    support_modal_phone_tel: "935088829",
    descargas_procera_modal_text: "La descarga e instalación de librerías puede ser compleja, incluso para usuarios expertos. Nos encantaría ayudarte para que todo funcione perfectamente. Por favor solicita dia y hora y te llamaremos según tu conveniencia.",
    descargas_procera_modal_salir_button: "Salir",
    descargas_procera_modal_hacerlo_button: "Prefiero hacerlo yo mismo",
    descargas_other_procera_modal_text: "Para descargar estas librerías, por favor contacte con su comercial o con atención al cliente.",
    contact_us_title: "Contáctenos",
    contact_us_link: "Visitar página de contacto",
    selec_pro_local_description: "Seleccione el tipo de flujo de trabajo para acceder a la página de descarga de librerías correspondiente.",
    download_procera_button: "Librerías para Producción Procera",
    download_local_button: "Librerías para Producción Local",
    customer_service_intro: "Para consultas generales, por favor contacte con nuestro servicio de atención al cliente a través de su página web.",
    customer_service_link: "Ir a Atención al Cliente",
    copy_email_aria_label: "Copiar email",
    copy_phone_aria_label: "Copiar teléfono",
    tables_modal: {
      windows_title: "Ventanas y Componentes Principales",
      windows_col_component: "Componente",
      windows_col_purpose: "Propósito",
      windows_data: {
        App: "Componente raíz, gestiona estado global y renderiza la estructura principal.",
        Header: "Barra de navegación superior con título, cambio de idioma y botón de soporte.",
        FilterBar: "Panel lateral para filtrar casos por diferentes criterios.",
        CaseGrid: "Muestra la cuadrícula de tarjetas de casos filtrados.",
        CaseCard: "Tarjeta individual que resume la información de un caso.",
        Modal: "Contenedor genérico para mostrar contenido en una ventana emergente.",
        PreMilledBlanksPage: "Página de detalles para componentes premecanizados.",
        DevDebugPage: "Página de depuración para desarrolladores con información y herramientas.",
        DownloadLibraries: "Componente para mostrar enlaces de descarga de librerías.",
        SupportModal: "Contenido del modal de soporte técnico.",
        TablesModalContent: "Contenido del modal de información de la UI (esta misma tabla)."
      },
      buttons_title: "Botones y Acciones",
      buttons_col_label: "Etiqueta / Icono",
      buttons_col_location: "Ubicación",
      buttons_col_action: "Acción",
       buttons_data: {
        support: "Abre el modal de Soporte Técnico.",
        language: "Cambia el idioma de la interfaz.",
        toggle_filters: "Muestra u oculta el panel de filtros.",
        reset_filters: "Limpia todos los filtros activos.",
        filter_segment: "Selecciona una opción para filtrar los casos.",
        image_nav: "Navega entre las imágenes de un caso.",
        image_dots: "Navega a una imagen específica de un caso.",
        reference: "Abre el modal con los detalles de componentes del caso.",
        download_help: "Abre el modal de ayuda para descargas (solo en caso de prueba).",
        ui_tables: "Abre el modal con tablas de información sobre la UI (solo en caso de prueba).",
      },
      modals_title: "Modales y Contenido Emergente",
      modals_col_trigger: "Acción Desencadenante",
      modals_col_components: "Contenido / Componentes",
      modals_data: {
          support_trigger: "Clic en 'Soporte Técnico'",
          support_content: "Modal con opciones de contacto: WhatsApp, Calendario, Email, Teléfono. Componente: SupportModal.",
          components_trigger: "Clic en 'Ver' o en una conexión específica en una tarjeta de caso",
          components_content: "Modal que muestra tablas de componentes detallados para el caso seleccionado. El contenido es dinámico según el caso. Componentes: PreMilledBlanksPage, ZirconiaBridgeSubTable, etc.",
          download_trigger: "Clic en 'Descargar Librerías' en el modal de un caso",
          download_content: "Modal con opciones para descargar librerías. Componentes: DescargasProceraModalContent, DescargasOtherProcera, SelecProLocal.",
          debug_trigger: "Clic en 'Tablas' en la tarjeta del caso de prueba (TEST001)",
          debug_content: "Modal de depuración para desarrolladores. Componente: DevDebugPage.",
          ui_info_trigger: "Clic en 'UI Info' en la tarjeta del caso de prueba (TEST001)",
          ui_info_content: "Modal con tablas que describen la estructura y funcionalidad de la UI. Componente: TablesModalContent."
      },
    },
  },
  exos_modal: {
    table1_title: "Relación Caso - Contenido Modal",
    table1_col_case_title: "Título del Caso",
    table1_col_case_id: "ID del Caso",
    table1_col_modal_content: "Tipo de Contenido Modal",
    table2_title: "Análisis de Ventanas Modales",
    table2_col_modal_name: "Nombre del Modal",
    table2_col_description: "Descripción",
    table2_col_sections: "Secciones y Botones Internos",
  },
  universalBaseTable: {
    title: "Componentes Base Universal No Rotatoria",
    cc: "Conical Connection",
    externalHex: "Brånemark System® (Hexágono Externo)",
    triChannel: "NobelReplace® (Tri-channel)",
    neckRef1_5: "Referencia cuello 1,5mm",
    neckRef3_0: "Referencia cuello 3,0mm",
    posteriorHeight: "Altura posterior",
    screw: "Tornillo clínico",
    screwdriver: "Destornillador",
    labScrew: "Tornillo de laboratorio",
    positionLocator: "Elos Accurate® Position Locator para IOS",
    positionLocatorKit: "Elos Accurate® Position Locator Kit para IOS",
    replicaIOS: "Elos Accurate® Réplica para IOS",
    scanbodyDTX: "Scanbody para DTX Studio™",
    implantAnalog: "Análogo de implante de yeso",
    footer: "*5 Pkg"
  },
  universalBaseRotatingTable: {
    reference: "Referencia",
    neckHeight: "Altura del cuello",
    posteriorHeight: "Altura posterior",
    diameter: "Diámetro",
    screw: "Tornillo clínico",
    screwdriver: "Destornillador",
    labScrew: "Tornillo de laboratorio",
    positionLocator: "Elos Accurate® Position Locator para IOS",
    positionLocatorKit: "Elos Accurate® Position Locator Kit para IOS",
    replicaIOSAnalog: "Elos Accurate® Réplica para IOS (análogo)",
    scanbodyDTX: "Scanbody para DTX Studio™",
    replicaIOS: "Elos Accurate® Réplica para IOS",
    footer: "*5 Pkg",
  },
  universalBaseRotatingCCTable: {
    title: "Base Universal Rotatoria CC - Diseño Recto"
  },
  universalBaseRotatingConicoCCTable: {
    title: "Base Universal Rotatoria Cónica CC – Diseño Cónico"
  },
  universalBaseRotatingBranemarkTable: {
    title: "Base Universal Rotatoria Branemark – Diseño Recto"
  },
  universalBaseRotatingConicoBranemarkTable: {
    title: "Base Universal Rotatoria Branemark – Diseño Cónico"
  },
  universalBaseRotatingTriChannelTable: {
    title: "Base Universal Rotatoria Tri-channel – Diseño Recto"
  },
  universalBaseRotatingConicoTriChannelTable: {
    title: "Base Universal Rotatoria Tri-channel – Diseño Cónico"
  },
  universalMultiUnitTable: {
    rectoTitle: "Base Universal Multi-unit – Diseño Recto",
    conicoTitle: "Base Universal Multi-unit – Diseño Cónico",
    connectionTitle: "Componentes de Conexión Multi-unit",
    footerRecto: "¹NP/RP ²WP",
    np_rp: "NP/RP",
    wp: "WP",
    reference: "Referencia",
    neckHeight: "Altura del cuello",
    posteriorHeight: "Altura posterior",
    diameter: "Diámetro",
    screw: "Tornillo clínico",
    screwdriver: "Destornillador",
    labScrew: "Tornillo de laboratorio",
    positionLocator: "Elos Accurate® Position Locator para IOS",
    positionLocatorKit: "Elos Accurate® Position Locator Kit para IOS",
    replicaIOS: "Elos Accurate® Réplica para IOS",
    scanbodyDTX: "Scanbody para DTX Studio™",
    implantAnalog: "Análogo de implante de yeso",
    clinicalScrew: "Tornillo clínico",
    replicaIOSAnalog: "Elos Accurate® Réplica para IOS (análogo)",
  },
  pilarUniversalOn1Table: {
    title: "Componentes Pilar Universal On1",
    noRotatorioTitle: "Pilar Universal On1 No Rotatorio",
    rotatorioTitle: "Pilar Universal On1 Rotatorio",
    refCuello0_3: "Referencia cuello 0.3mm",
    refCuello1_25: "Referencia cuello 1.25mm",
    alturaPosterior: "Altura posterior",
    diametro: "Diámetro",
    screw: "Tornillo clínico",
    destornillador: "Destornillador",
    labScrew: "Tornillo de laboratorio",
    iosScanbody4_5: "IOS Scanbody (4.5mm)",
    iosScanbody5_0: "IOS Scanbody (5.0mm)",
    iosScanbody6_0: "IOS Scanbody (6.0mm)",
    iosAnalog: "Análogo para IOS",
    insertionTool: "Herramienta de inserción",
    scanbodyDTX: "Scanbody para DTX Studio™",
    footer: "Utilizar destornillador Unigrip"
  },
  n1BaseUniversalTable: {
    title: "Componentes Base Universal N1",
    unitariaTitle: "Base N1 Unitaria (No rotatoria)",
    puenteTitle: "Base N1 Puente (Rotatoria)",
    reference: "Referencia",
    posteriorHeight: "Altura posterior",
    screw: "Tornillo",
    screwdriver: "Destornillador",
    labScrew: "Tornillo de laboratorio",
    iosScanbody: "IOS Scanbody",
    iosScanbodyHealingCap: "IOS Scanbody/Tapón de cicatrización",
    iosAnalog: "Análogo para IOS",
    iosInsertionTool: "Herramienta de inserción IOS",
    scanbodyDTX: "Scanbody para DTX Studio™",
  },
  n1TccUnitariaTable: {
    title: "Componentes Base Universal N1 TCC (No rotatoria)",
    refCuello1_5: "Referencia cuello 1.5mm",
    refCuello3_0: "Referencia cuello 3.0mm",
    posteriorHeight: "Altura posterior",
    screw: "Tornillo",
    screwdriver: "Destornillador",
    labScrew: "Tornillo de laboratorio",
    iosScanbody: "IOS Scanbody",
    iosAnalog: "Análogo para IOS",
    iosInsertionTool: "Herramienta de inserción IOS",
    scanbodyDTX: "Scanbody para DTX Studio™",
    footer: "Diámetro NP no apto para molares"
  },
  zirconiaBridgeCCTable: {
    title: "Puente de Zirconia - Conical Connection"
  },
  zirconiaBridgeBranemarkTable: {
    title: "Puente de Zirconia - Brånemark System®"
  },
  zirconiaBridgeTriChannelTable: {
    title: "Puente de Zirconia - NobelReplace® (Tri-channel)"
  },
  proceraFCZImplantCrownTable: {
    title: "Componentes para Corona sobre Implante Procera FCZ",
    conexion: "Conexión",
    screw: "Tornillo clínico",
    screwdriver: "Destornillador",
    labScrew: "Tornillo de laboratorio",
    elosScanbody: "Elos Accurate® Position Locator para IOS",
    elosScanbodyKit: "Elos Accurate® Position Locator Kit para IOS",
    replicaIOS: "Elos Accurate® Réplica para IOS",
    desktopScanbody: "Scanbody para DTX Studio™",
  },
  proceraTitaniumPillarTable: {
    ccTitle: "Pilar de Titanio Procera - Conical Connection",
    branemarkTitle: "Pilar de Titanio Procera - Brånemark System®",
    triChannelTitle: "Pilar de Titanio Procera - NobelReplace® (Tri-channel)",
  },
  proceraTitaniumAscPillarTable: {
    ccTitle: "Pilar de Titanio ASC Procera - Conical Connection",
    triChannelTitle: "Pilar de Titanio ASC Procera - NobelReplace® (Tri-channel)",
    ccFooter: "Tornillo y destornillador Omnigrip incluidos.",
    triChannelFooter: "Tornillo y destornillador Omnigrip incluidos.",
  },
  proceraZirconiaPillarTable: {
    ccTitle: "Pilar de Zirconia Procera - Conical Connection",
    branemarkTitle: "Pilar de Zirconia Procera - Brånemark System®",
    triChannelTitle: "Pilar de Zirconia Procera - NobelReplace® (Tri-channel)",
    triChannelFooter: "*5 Pkg",
  },
  nobelProceraTitaniumBarTable: {
    ccTitle: "Barra de Titanio NobelProcera - Conical Connection",
    branemarkTitle: "Barra de Titanio NobelProcera - Brånemark System®",
    triChannelTitle: "Barra de Titanio NobelProcera - NobelReplace® (Tri-channel)",
    positionLocator: "Elos Accurate® Position Locator para IOS",
    positionLocatorKit: "Elos Accurate® Position Locator Kit para IOS",
    replicaIOS: "Elos Accurate® Réplica para IOS",
    scanbodyDTX: "Scanbody para DTX Studio™",
    screw: "Tornillo clínico",
    screwdriver: "Destornillador",
    labScrew: "Tornillo de laboratorio",
  },
  nobelPearlTable: {
    title: "Componentes para Pilar NobelPearl",
    pilarUnitaria: "Pilar Unitaria",
    pilarMultiple: "Pilar Múltiple",
    tornilloClinica: "Tornillo de clínica",
    destornillador: "Destornillador",
    tornilloLaboratorio: "Tornillo de laboratorio",
    tornilloProvisional: "Tornillo provisional",
    iosPositionLocator: "IOS Position Locator",
    replicaIOS: "Réplica para IOS",
    footer: "Torque 35Ncm",
  },
  multiUnitAbutmentsTable: {
    platformHeader: "Plataforma",
    ccRectoTitle: "Pilar Transepitelial Standard Multi-unit Recto - Conical Connection",
    ccAnguladoTitle: "Pilar Transepitelial Standard Multi-unit Angulado - Conical Connection",
    n1TccRectoTitle: "Pilar Transepitelial Standard Multi-unit Recto - N1 TCC",
    n1TccAnguladoTitle: "Pilar Transepitelial Standard Multi-unit Angulado - N1 TCC",
    branemarkRectoTitle: "Pilar Transepitelial Standard Multi-unit Recto - Brånemark System®",
    branemarkAnguladoTitle: "Pilar Transepitelial Standard Multi-unit Angulado - Brånemark System®",
    triChannelRectoTitle: "Pilar Transepitelial Standard Multi-unit Recto - NobelReplace® (Tri-channel)",
    triChannelAnguladoTitle: "Pilar Transepitelial Standard Multi-unit Angulado - NobelReplace® (Tri-channel)",
  },
  preMilledBlanksTable: {
    component_header: "Componente",
    diameter10: "Pilar de Ø 10 mm",
    diameter14: "Pilar de Ø 14 mm",
    screw: "Tornillo clínico",
    screwdriver: "Destornillador",
    labScrew: "Tornillo de laboratorio",
    scanbodies: "Scanbodies",
    scanbodiesKit: "Kit de Scanbodies",
    replicaAccurate: "Réplica Elos Accurate®",
    replicaBiocare: "Réplica Nobel Biocare®",
    plasterAnalog: "Análogo de yeso",
    protectionAnalog: "Análogo de protección",
    footer: "* El tornillo de laboratorio 37895 está incluido en el pilar. Los demás se piden por separado.",
    notes: "** El tornillo de laboratorio 29293 está incluido en el pilar.",
    download_libraries_title: "Descargar librerías",
    download_libraries_title_procera: "Acceder a librerías de Procera",
    download_libraries_link_text: "Librerías para Exocad®",
    download_libraries_3shape_link_text: "Librerías para 3Shape®",
    download_libraries_dentalwings_link_text: "Librerías para Dental Wings®",
    download_libraries_see_all_link_text: "Ver todas las librerías",
    support_button_text: "Necesito ayuda"
  },
  preMilledBlanksN1TCCTable: {
    title: "Pilar Premecanizado N1 TCC",
    diameter10: "Pilar de Ø 10 mm",
    diameter14: "Pilar de Ø 14 mm",
    screw: "Tornillo clínico",
    screwdriver: "Destornillador",
    labScrew: "Tornillo de laboratorio",
    scanbodies: "Scanbodies",
    replicaAccurate: "Réplica Elos Accurate®",
    plasterAnalog: "Análogo de yeso",
  },
  triChannelTestTable: {
    title: "Componentes para Puente de Titanio - NobelReplace® (Tri-channel)",
    conexionHeader: "Conexión",
    tornilloClinico: "Tornillo clínico",
    destornillador: "Destornillador",
    tornilloLaboratorio: "Tornillo de laboratorio",
    elosAccuratePositionLocator: "Elos Accurate® Position Locator para IOS",
    elosAccuratePositionLocatorKit: "Elos Accurate® Position Locator Kit para IOS",
    replicaForIOS: "Réplica para IOS",
    desktopScanbodyDTX: "Desktop Scanbody para DTX Studio™",
    footer: "*5 Pkg"
  },
  devDebugPage: {
    title: "Sección de Pruebas y Depuración",
    description: "Esta sección es para probar componentes y funcionalidades en desarrollo.",
    example_buttons_title: "Ejemplos de Botones",
    primary_button: "Botón Primario",
    secondary_button: "Botón Secundario",
    botones_button: "Galería de Botones",
    example_icons_title: "Ejemplos de Iconos",
    colorPaletteTitle: "Paleta de Colores de Tarjetas",
    colors: {
      raspberry: "Frambuesa",
      salmon: "Salmón",
      yellow: "Amarillo",
      teal: "Turquesa",
      blue: "Azul",
      cornflower: "Aciano",
    },
    iconGridTitle: "Rejilla de Iconos de la Aplicación",
    referenceTableTitle: "Análisis de Ventanas Modales y Componentes Flotantes",
    modalIdHeader: "ID de Componente",
    modalTriggerHeader: "Acción Desencadenante",
    modalPurposeHeader: "Propósito y Contenido",
    linkTooltip: "Este enlace es un ancla al ID del componente modal. No abrirá el modal directamente.",
    modal_titles: {
      references: "Componentes/Referencias",
      help_espt: "Descarga de Librerías (ES/PT)",
      help_frsv: "Descarga de Librerías (FR/SV)",
      workflow_selector: "Seleccionar Flujo de Trabajo",
      ui_tables: "Información de la Interfaz",
      test_table: "Tabla de Test (Tri-channel)",
      customer_service: "Atención al Cliente",
      button_gallery: "Galería de Botones",
      download_center: "Centro de Descargas",
      exos_analysis: "Análisis de Interfaz (EXOS)",
      intro: "Selección de Idioma/País",
      chatbot: "Asistente Virtual"
    },
    modal_triggers: {
      references: "Clic en 'Ver' o conexión en una tarjeta de caso.",
      help_espt: "Clic en 'Descargar Librerías' (ES/PT).",
      help_frsv: "Clic en 'Descargar Librerías' (FR/SV).",
      workflow_selector: "Clic en 'Prefiero hacerlo yo mismo' en el modal de ayuda de descarga.",
      ui_tables: "Clic en 'Tablas' en la tarjeta de caso TEST001.",
      test_table: "Clic en el icono de tabla en la tarjeta de caso TEST001.",
      customer_service: "Clic en 'Atención al Cliente' en la cabecera (FR/SV).",
      button_gallery: "Clic en 'Galería de Botones' en la página de depuración.",
      download_center: "Clic en 'Centro de Descargas' en la cabecera.",
      exos_analysis: "Clic en 'EXOS' en la tarjeta de caso TEST001.",
      intro: "Al cargar la aplicación o al hacer clic en el globo terráqueo en la cabecera.",
      chatbot: "Clic en el botón flotante del chatbot."
    },
    modal_purposes: {
      references: "Muestra tablas detalladas de componentes para un caso. El contenido es dinámico.",
      help_espt: "Guía al usuario para la descarga de librerías, ofreciendo agendar una sesión de ayuda.",
      help_frsv: "Informa al usuario sobre cómo obtener librerías, dirigiendo a atención al cliente.",
      workflow_selector: "Permite al usuario elegir entre flujos de trabajo de Procera o de Producción Local para acceder a las librerías.",
      ui_tables: "Proporciona metainformación sobre la estructura y funcionalidad de la propia aplicación (componentes, botones, modales).",
      test_table: "Muestra una tabla de prueba estática (Componentes Tri-channel).",
      customer_service: "Proporciona un punto de acceso al servicio de atención al cliente (QR y enlace).",
      button_gallery: "Muestra una colección de todos los estilos de botones para desarrollo.",
      download_center: "Ofrece acceso centralizado a documentos (Overviews) y al flujo de descarga de librerías.",
      exos_analysis: "Muestra un análisis de la UI, incluyendo la relación entre casos y sus modales, y un desglose de cada modal.",
      intro: "Permite al usuario configurar el idioma y el país de la tienda online al inicio.",
      chatbot: "Componente flotante para conversar con un asistente virtual de IA sobre los productos."
    },
    testSection: {
      title: "Sección de Pruebas y Depuración",
      description: "Esta sección es para probar componentes y funcionalidades en desarrollo.",
      example_buttons_title: "Ejemplos de Botones",
      primary_button: "Botón Primario",
      secondary_button: "Botón Secundario",
      botones_button: "Galería de Botones",
      example_icons_title: "Ejemplos de Iconos",
    }
  },
  tooltip: {
    filters_active_label: "Filtros aplicados:",
    remove_filters_link: "Quitar filtros"
  },
  notes: {
    "tornillo clínico incluido": "Tornillo clínico incluido",
    "This is a test case.": "Este es un caso de prueba."
  }
};

const ptTranslations = JSON.parse(JSON.stringify(esTranslations));
ptTranslations.header.title = "Visão Geral E-Prosthetic";
ptTranslations.header.support_button = "Suporte Técnico";
ptTranslations.header.download_center_button = "Centro de Downloads";
ptTranslations.intro_modal = {
  title: "Bem-vindo ao E-Prosthetic Overview",
  language_section_title: "1. Selecione o seu idioma",
  online_store_country_section_title: "2. País da Loja Online",
  confirm_button: "Confirmar Seleção"
};
ptTranslations.chatbot = {
    title: "Assistente Virtual",
    welcome_message: "Bem-vindo. Sou o assistente virtual. Como posso ajudá-lo a encontrar informações sobre as soluções protéticas disponíveis neste catálogo?",
    input_placeholder: "Pergunte sobre um produto...",
    error_message: "Peço desculpa, mas de momento não consigo processar o seu pedido. Por favor, tente novamente mais tarde.",
    sources_title: "Fontes",
};
ptTranslations.caseCard.status = {
    [CaseStatus.Local]: "Produção Local",
    [CaseStatus.Procera]: "Produção Procera",
    [CaseStatus.Standard]: "Padrão",
    [CaseStatus.Otros]: "Outros",
};
ptTranslations.caseCard.status_short = {
    [CaseStatus.Local]: "Local",
    [CaseStatus.Procera]: "Procera",
    [CaseStatus.Standard]: "Padrão",
    [CaseStatus.Otros]: "Outros",
};
ptTranslations.caseCard.generate_description_label = "Gerar descrição com IA";
ptTranslations.caseCard.view_details_label = "Ver detalhes";
ptTranslations.caseCard.generating_description_tooltip = "Gerando descrição...";
ptTranslations.caseCard.generate_description_tooltip = "Clique para gerar descrição com IA";
ptTranslations.caseCard.description_error = "Não foi possível gerar a descrição.";
ptTranslations.caseCard.aria_view_details_for = "Ver detalhes de";
ptTranslations.caseCard.text_to_speech_label = "Ler descrição em voz alta";
ptTranslations.caseCard.stop_speech_label = "Parar de ler";
ptTranslations.caseCard.product_link_label = "Ver Produto";
ptTranslations.caseCard.copy_id_label = "Copiar ID";
ptTranslations.caseCard.ai_summary_web_title = "Resumo da Web";
ptTranslations.caseCard.ai_summary_app_title = "Resumo da App";
ptTranslations.footer = {
    socialTitle: 'REDES SOCIAIS',
    social: {
        facebook: "https://www.facebook.com/nobelbiocare/",
        instagram: "https://www.instagram.com/nobelbiocare/",
        youtube: "https://www.youtube.com/user/nobelbiocare",
        linkedin: "https://www.linkedin.com/company/nobel-biocare",
        x: "https://twitter.com/nobelbiocare"
    }
};
ptTranslations.modal.download_center_title = "Centro de Downloads";
ptTranslations.modal.design_services_button = "Serviços de design";
ptTranslations.modal.procera_tracking_button = "Acompanhamento de envios NobelProcera";
ptTranslations.filterBar.title = "Filtros";
ptTranslations.filterBar.search_placeholder = "Pesquisar por ID, nome, artigo...";
ptTranslations.filterBar.reset_button = "Remover Filtros";
ptTranslations.filterBar.connection_type_label = "Tipo de Conexão";
ptTranslations.filterBar.software_type_label = "Tipo de Software";
ptTranslations.filterBar.production_label = "Produção";
ptTranslations.filterBar.restoration_type_label = "Tipo de Restauração";
ptTranslations.filterBar.angulated_access_label = "Restauração com Acesso Angulado";
ptTranslations.filterBar.hide_filters = "Ocultar filtros";
ptTranslations.filterBar.show_filters = "Mostrar filtros";
ptTranslations.filterBar.filters_active_tooltip = "Filtros ativos";
ptTranslations.filterBar.options.all = "Todos";
ptTranslations.filterBar.options.yes = "Sim";
ptTranslations.filterBar.options.no = "Não";
ptTranslations.filterBar.options[CaseStatus.Local] = "Local";
ptTranslations.filterBar.options[CaseStatus.Procera] = "Procera";
ptTranslations.filterBar.options[CaseStatus.Standard] = "Pilar Padrão";
ptTranslations.filterBar.options[CaseStatus.Otros] = "Outros";
ptTranslations.filterBar.options[RestorationType.Unitaria] = "Unitária";
ptTranslations.filterBar.options[RestorationType.Multiple] = "Múltipla";
ptTranslations.filterBar.options[ConnectionType.Pearl] = "Inter-X Pearl";
ptTranslations.tooltip = {
  filters_active_label: "Filtros ativos:",
  remove_filters_link: "Remover filtros"
};
ptTranslations.notes["tornillo clínico incluido"] = "Parafuso clínico incluído";
ptTranslations.notes["This is a test case."] = "Este é um caso de teste.";
ptTranslations.modal.iconography_details_title = "Detalhes";

ptTranslations.modal.support_modal_phone_title = "Telefone de Atendimento ao Cliente";
ptTranslations.modal.support_modal_phone_number_copy = "935 088 829";
ptTranslations.modal.support_modal_phone_tel = "935088829";
ptTranslations.modal.customer_service_intro = "Para consultas gerais, entre em contato com nosso serviço de atendimento ao cliente através do site.";
ptTranslations.modal.customer_service_link = "Ir para Atendimento ao Cliente";

ptTranslations.devDebugPage.referenceTableTitle = "Análise de Janelas Modais e Componentes Flottants";
ptTranslations.devDebugPage.modalIdHeader = "ID do Componente";
ptTranslations.devDebugPage.modalTriggerHeader = "Ação de Ativação";
ptTranslations.devDebugPage.modalPurposeHeader = "Propósito e Conteúdo";
ptTranslations.devDebugPage.linkTooltip = "Este link é uma âncora para o ID do componente modal. Não abrirá o modal diretamente.";
ptTranslations.devDebugPage.modal_titles.references = "Componentes/Referências";
ptTranslations.devDebugPage.modal_titles.help_espt = "Download de Bibliotecas (PT)";
ptTranslations.devDebugPage.modal_triggers.references = "Clique em 'Ver' ou conexão específica em um cartão de caso.";
ptTranslations.devDebugPage.modal_purposes.references = "Mostra tabelas detalhadas de componentes para um caso. O conteúdo é dinâmico.";
ptTranslations.devDebugPage.modal_purposes.help_espt = "Guia o usuário para o download de bibliotecas, oferecendo agendamento de uma sessão de ajuda.";

ptTranslations.universalBaseRotatingCCTable.title = "Base Universal Rotatória CC - Design Reto";
ptTranslations.universalBaseRotatingConicoCCTable.title = "Base Universal Rotatória Cônica CC – Design Cônico";
ptTranslations.universalBaseRotatingBranemarkTable.title = "Base Universal Rotatória Branemark – Design Reto";
ptTranslations.universalBaseRotatingConicoBranemarkTable.title = "Base Universal Rotatória Cônica Branemark – Design Cônico";
ptTranslations.universalBaseRotatingTriChannelTable.title = "Base Universal Rotatória Tri-channel – Design Reto";
ptTranslations.universalBaseRotatingConicoTriChannelTable.title = "Base Universal Rotatória Cônica Tri-channel – Design Cônico";
ptTranslations.universalMultiUnitTable.rectoTitle = "Base Universal Multi-unit – Design Reto";
ptTranslations.universalMultiUnitTable.conicoTitle = "Base Universal Multi-unit – Design Cônico";

ptTranslations.universalBaseTable.screwdriver = "Chave de fenda";
ptTranslations.universalBaseRotatingTable.screwdriver = "Chave de fenda";
ptTranslations.pilarUniversalOn1Table.destornillador = "Chave de fenda";
ptTranslations.n1BaseUniversalTable.screwdriver = "Chave de fenda";
ptTranslations.n1TccUnitariaTable.screwdriver = "Chave de fenda";
ptTranslations.proceraFCZImplantCrownTable.screwdriver = "Chave de fenda";
ptTranslations.nobelProceraTitaniumBarTable.screwdriver = "Chave de fenda";
ptTranslations.nobelPearlTable.destornillador = "Chave de fenda";
ptTranslations.preMilledBlanksTable.screwdriver = "Chave de fenda";
ptTranslations.preMilledBlanksN1TCCTable.screwdriver = "Chave de fenda";
ptTranslations.triChannelTestTable.destornillador = "Chave de fenda";

const frTranslations = JSON.parse(JSON.stringify(esTranslations));
frTranslations.header.title = "Aperçu E-Prosthetic";
frTranslations.header.support_button = "Support Technique";
frTranslations.header.customer_service_button = "Service client";
frTranslations.header.download_center_button = "Centre de téléchargement";
frTranslations.intro_modal = {
  title: "Bienvenue à l'E-Prosthetic Overview",
  language_section_title: "1. Sélectionnez votre langue",
  online_store_country_section_title: "2. Pays de la Boutique en Ligne",
  confirm_button: "Confirmer la Sélection"
};
frTranslations.chatbot = {
    title: "Assistant Virtuel",
    welcome_message: "Bienvenue. Je suis l'assistant virtuel. Comment puis-je vous aider à trouver des informations sur les solutions prothétiques disponibles dans ce catalogue ?",
    input_placeholder: "Posez une question sur un produit...",
    error_message: "Je m'excuse, mais je ne peux pas traiter votre demande pour le moment. Veuillez réessayer plus tard.",
    sources_title: "Sources",
};
frTranslations.caseCard.status = {
    [CaseStatus.Local]: "Production Locale",
    [CaseStatus.Procera]: "Production Procera",
    [CaseStatus.Standard]: "Standard",
    [CaseStatus.Otros]: "Autres",
};
frTranslations.caseCard.status_short = {
    [CaseStatus.Local]: "Locale",
    [CaseStatus.Procera]: "Procera",
    [CaseStatus.Standard]: "Standard",
    [CaseStatus.Otros]: "Autres",
};
frTranslations.caseCard.generate_description_label = "Générer une description par IA";
frTranslations.caseCard.view_details_label = "Voir les détails";
frTranslations.caseCard.generating_description_tooltip = "Génération de la description...";
frTranslations.caseCard.generate_description_tooltip = "Cliquez pour générer une description par IA";
frTranslations.caseCard.description_error = "Impossible de générer la description.";
frTranslations.caseCard.aria_view_details_for = "Voir les détails de";
frTranslations.caseCard.text_to_speech_label = "Lire la description à voix haute";
frTranslations.caseCard.stop_speech_label = "Arrêter la lecture";
frTranslations.caseCard.product_link_label = "Voir le produit";
frTranslations.caseCard.copy_id_label = "Copier l'ID";
frTranslations.caseCard.ai_summary_web_title = "Résumé Web";
frTranslations.caseCard.ai_summary_app_title = "Résumé de l'App";
frTranslations.footer = {
    socialTitle: 'MÉDIAS SOCIAUX',
    social: {
        facebook: "https://www.facebook.com/nobelbiocare/",
        instagram: "https://www.instagram.com/nobelbiocare/",
        youtube: "https://www.youtube.com/user/nobelbiocare",
        linkedin: "https://www.linkedin.com/company/nobel-biocare",
        x: "https://twitter.com/nobelbiocare"
    }
};
frTranslations.modal.download_center_title = "Centre de téléchargement";
frTranslations.modal.design_services_button = "Services de conception";
frTranslations.modal.procera_tracking_button = "Suivi des envois NobelProcera";
frTranslations.filterBar.title = "Filtres";
frTranslations.filterBar.search_placeholder = "Rechercher par ID, nom, article...";
frTranslations.filterBar.reset_button = "Effacer les filtres";
frTranslations.filterBar.connection_type_label = "Type de Connexion";
frTranslations.filterBar.software_type_label = "Type de Logiciel";
frTranslations.filterBar.production_label = "Production";
frTranslations.filterBar.restoration_type_label = "Type de Restauration";
frTranslations.filterBar.angulated_access_label = "Restauration avec Accès Angulé";
frTranslations.filterBar.hide_filters = "Masquer les filtres";
frTranslations.filterBar.show_filters = "Afficher les filtres";
frTranslations.filterBar.filters_active_tooltip = "Filtres actifs";
frTranslations.filterBar.options.all = "Tous";
frTranslations.filterBar.options.yes = "Oui";
frTranslations.filterBar.options.no = "Non";
frTranslations.filterBar.options[CaseStatus.Local] = "Locale";
frTranslations.filterBar.options[CaseStatus.Procera] = "Procera";
frTranslations.filterBar.options[CaseStatus.Standard] = "Pilier Standard";
frTranslations.filterBar.options[CaseStatus.Otros] = "Autres";
frTranslations.filterBar.options[RestorationType.Unitaria] = "Unitaire";
frTranslations.filterBar.options[RestorationType.Multiple] = "Multiple";
frTranslations.filterBar.options[ConnectionType.Pearl] = "Inter-X Pearl";
frTranslations.tooltip = {
  filters_active_label: "Filtres actifs:",
  remove_filters_link: "Effacer les filtres"
};
frTranslations.notes["tornillo clínico incluido"] = "Vis clinique incluse";
frTranslations.notes["This is a test case."] = "Ceci est un cas de test.";
frTranslations.modal.iconography_details_title = "Détails";

frTranslations.modal.support_modal_phone_title = "Téléphone du Service Client";
frTranslations.modal.support_modal_phone_number_copy = "935 088 829";
frTranslations.modal.support_modal_phone_tel = "935088829";
frTranslations.modal.customer_service_intro = "Pour les demandes générales, veuillez contacter notre service client via leur site web.";
frTranslations.modal.customer_service_link = "Aller au Service Client";

frTranslations.devDebugPage.referenceTableTitle = "Analyse des Fenêtres Modales et Composants Flottants";
frTranslations.devDebugPage.modalIdHeader = "ID du Composant";
frTranslations.devDebugPage.modalTriggerHeader = "Action de Déclenchement";
frTranslations.devDebugPage.modalPurposeHeader = "Objectif et Contenu";
frTranslations.devDebugPage.linkTooltip = "Ce lien est une ancre vers l'ID du composant modal. Il n'ouvrira pas le modal directement.";
frTranslations.devDebugPage.modal_titles.references = "Composants/Références";
frTranslations.devDebugPage.modal_titles.help_frsv = "Téléchargement de Bibliothèques (FR/SV)";
frTranslations.devDebugPage.modal_triggers.references = "Cliquer sur 'Voir' ou une connexion spécifique sur une carte de cas.";
frTranslations.devDebugPage.modal_purposes.references = "Affiche des tableaux détaillés de composants pour un cas. Le contenu est dynamique.";
frTranslations.devDebugPage.modal_purposes.help_frsv = "Informe l'utilisateur sur la manière d'obtenir des bibliothèques, en le dirigeant vers le service client.";

frTranslations.universalBaseRotatingCCTable.title = "Base Universelle Rotative CC - Design Droit";
frTranslations.universalBaseRotatingConicoCCTable.title = "Base Universelle Rotative Conique CC – Design Conique";
frTranslations.universalBaseRotatingBranemarkTable.title = "Base Universelle Rotative Branemark – Design Droit";
frTranslations.universalBaseRotatingConicoBranemarkTable.title = "Base Universelle Rotative Conique Branemark – Design Conique";
frTranslations.universalBaseRotatingTriChannelTable.title = "Base Universelle Rotative Tri-channel – Design Droit";
frTranslations.universalBaseRotatingConicoTriChannelTable.title = "Base Universelle Rotative Conique Tri-channel – Design Conique";
frTranslations.universalMultiUnitTable.rectoTitle = "Base Universelle Multi-unit – Design Droit";
frTranslations.universalMultiUnitTable.conicoTitle = "Base Universelle Multi-unit – Design Conique";

frTranslations.universalBaseTable.screwdriver = "Tournevis";
frTranslations.universalBaseRotatingTable.screwdriver = "Tournevis";
frTranslations.pilarUniversalOn1Table.destornillador = "Tournevis";
frTranslations.n1BaseUniversalTable.screwdriver = "Tournevis";
frTranslations.n1TccUnitariaTable.screwdriver = "Tournevis";
frTranslations.proceraFCZImplantCrownTable.screwdriver = "Tournevis";
frTranslations.nobelProceraTitaniumBarTable.screwdriver = "Tournevis";
frTranslations.nobelPearlTable.destornillador = "Tournevis";
frTranslations.preMilledBlanksTable.screwdriver = "Tournevis";
frTranslations.preMilledBlanksN1TCCTable.screwdriver = "Tournevis";
frTranslations.triChannelTestTable.destornillador = "Tournevis";

const svTranslations = JSON.parse(JSON.stringify(esTranslations));
svTranslations.header.title = "E-Prosthetic Översikt";
svTranslations.header.support_button = "Teknisk support";
svTranslations.header.customer_service_button = "Kundservice";
svTranslations.header.download_center_button = "Nedladdningscenter";
svTranslations.intro_modal = {
  title: "Välkommen till E-Prosthetic Overview",
  language_section_title: "1. Välj ditt språk",
  online_store_country_section_title: "2. Land för Onlinebutik",
  confirm_button: "Bekräfta Val"
};
svTranslations.chatbot = {
    title: "Virtuell Assistent",
    welcome_message: "Välkommen. Jag är den virtuella assistenten. Hur kan jag hjälpa dig att hitta information om de protetiska lösningar som finns i denna katalog?",
    input_placeholder: "Fråga om en produkt...",
    error_message: "Jag ber om ursäkt, men jag kan för närvarande inte behandla din förfrågan. Försök igen senare.",
    sources_title: "Källor",
};
svTranslations.caseCard.status = {
    [CaseStatus.Local]: "Lokal Produktion",
    [CaseStatus.Procera]: "Procera Produktion",
    [CaseStatus.Standard]: "Standard",
    [CaseStatus.Otros]: "Övriga",
};
svTranslations.caseCard.status_short = {
    [CaseStatus.Local]: "Lokal",
    [CaseStatus.Procera]: "Procera",
    [CaseStatus.Standard]: "Standard",
    [CaseStatus.Otros]: "Övriga",
};
svTranslations.caseCard.generate_description_label = "Generera AI-beskrivning";
svTranslations.caseCard.view_details_label = "Visa detaljer";
svTranslations.caseCard.generating_description_tooltip = "Genererar beskrivning...";
svTranslations.caseCard.generate_description_tooltip = "Klicka för att generera AI-beskrivning";
svTranslations.caseCard.description_error = "Kunde inte generera beskrivning.";
svTranslations.caseCard.aria_view_details_for = "Visa detaljer för";
svTranslations.caseCard.text_to_speech_label = "Läs beskrivningen högt";
svTranslations.caseCard.stop_speech_label = "Sluta läsa";
svTranslations.caseCard.product_link_label = "Visa produkt";
svTranslations.caseCard.copy_id_label = "Kopiera ID";
svTranslations.caseCard.ai_summary_web_title = "Webbsammanfattning";
svTranslations.caseCard.ai_summary_app_title = "Appsammanfattning";
svTranslations.footer = {
    socialTitle: 'SOCIAL MEDIA',
    social: {
        facebook: "https://www.facebook.com/nobelbiocare/",
        instagram: "https://www.instagram.com/nobelbiocare/",
        youtube: "https://www.youtube.com/user/nobelbiocare",
        linkedin: "https://www.linkedin.com/company/nobel-biocare",
        x: "https://twitter.com/nobelbiocare"
    }
};
svTranslations.modal.download_center_title = "Nedladdningscenter";
svTranslations.modal.design_services_button = "Designtjänster";
svTranslations.modal.procera_tracking_button = "Spåra NobelProcera-försändelser";
svTranslations.filterBar.title = "Filter";
svTranslations.filterBar.search_placeholder = "Sök med ID, namn, artikel...";
svTranslations.filterBar.reset_button = "Ta bort filter";
svTranslations.filterBar.connection_type_label = "Anslutningstyp";
svTranslations.filterBar.software_type_label = "Programvarutyp";
svTranslations.filterBar.production_label = "Produktion";
svTranslations.filterBar.restoration_type_label = "Restaureringstyp";
svTranslations.filterBar.angulated_access_label = "Restaurering med Vinklad Åtkomst";
svTranslations.filterBar.hide_filters = "Dölj filter";
svTranslations.filterBar.show_filters = "Visa filter";
svTranslations.filterBar.filters_active_tooltip = "Filter aktiva";
svTranslations.filterBar.options.all = "Alla";
svTranslations.filterBar.options.yes = "Ja";
svTranslations.filterBar.options.no = "Nej";
svTranslations.filterBar.options[CaseStatus.Local] = "Lokal";
svTranslations.filterBar.options[CaseStatus.Procera] = "Procera";
svTranslations.filterBar.options[CaseStatus.Standard] = "Standarddistans";
svTranslations.filterBar.options[CaseStatus.Otros] = "Övriga";
svTranslations.filterBar.options[RestorationType.Unitaria] = "Singel";
svTranslations.filterBar.options[RestorationType.Multiple] = "Flerledad";
svTranslations.filterBar.options[ConnectionType.Pearl] = "Inter-X Pearl";
svTranslations.tooltip = {
  filters_active_label: "Aktiva filter:",
  remove_filters_link: "Ta bort filter"
};
svTranslations.notes["tornillo clínico incluido"] = "Klinisk skruv ingår";
svTranslations.notes["This is a test case."] = "Detta är ett testfall.";
svTranslations.modal.iconography_details_title = "Detaljer";

svTranslations.modal.support_modal_phone_title = "Kundtjänsttelefon";
svTranslations.modal.support_modal_phone_number_copy = "935 088 829";
svTranslations.modal.support_modal_phone_tel = "935088829";
svTranslations.modal.customer_service_intro = "För allmänna förfrågningar, vänligen kontakta vår kundtjänst via deras webbplats.";
svTranslations.modal.customer_service_link = "Gå till Kundservice";

svTranslations.devDebugPage.referenceTableTitle = "Analys av Modalfönster och Flytande Komponenter";
svTranslations.devDebugPage.modalIdHeader = "Komponent-ID";
svTranslations.devDebugPage.modalTriggerHeader = "Utlösande Åtgärd";
svTranslations.devDebugPage.modalPurposeHeader = "Syfte och Innehåll";
svTranslations.devDebugPage.linkTooltip = "Denna länk är en ankare till modalkomponentens ID. Den öppnar inte modalen direkt.";
svTranslations.devDebugPage.modal_titles.references = "Komponenter/Referenser";
svTranslations.devDebugPage.modal_titles.help_frsv = "Biblioteksnedladdning (FR/SV)";
svTranslations.devDebugPage.modal_triggers.references = "Klicka på 'Visa' eller en specifik anslutning på ett fallkort.";
svTranslations.devDebugPage.modal_purposes.references = "Visar detaljerade komponenttabeller för ett fall. Innehållet är dynamiskt.";
svTranslations.devDebugPage.modal_purposes.help_frsv = "Informerar användaren om hur man får bibliotek och hänvisar till kundtjänst.";

svTranslations.universalBaseRotatingCCTable.title = "Universal Base Roterande CC - Rak Design";
svTranslations.universalBaseRotatingConicoCCTable.title = "Universal Base Konisk Roterande CC – Konisk Design";
svTranslations.universalBaseRotatingBranemarkTable.title = "Universal Base Roterande Branemark – Rak Design";
svTranslations.universalBaseRotatingConicoBranemarkTable.title = "Universal Base Konisk Roterande Branemark – Konisk Design";
svTranslations.universalBaseRotatingTriChannelTable.title = "Universal Base Roterande Tri-channel – Rak Design";
svTranslations.universalBaseRotatingConicoTriChannelTable.title = "Universal Base Konisk Roterande Tri-channel – Konisk Design";
svTranslations.universalMultiUnitTable.rectoTitle = "Universal Base Multi-unit – Rak Design";
svTranslations.universalMultiUnitTable.conicoTitle = "Universal Base Multi-unit – Konisk Design";

svTranslations.universalBaseTable.screwdriver = "Skruvmejsel";
svTranslations.universalBaseRotatingTable.screwdriver = "Skruvmejsel";
svTranslations.pilarUniversalOn1Table.destornillador = "Skruvmejsel";
svTranslations.n1BaseUniversalTable.screwdriver = "Skruvmejsel";
svTranslations.n1TccUnitariaTable.screwdriver = "Skruvmejsel";
svTranslations.proceraFCZImplantCrownTable.screwdriver = "Skruvmejsel";
svTranslations.nobelProceraTitaniumBarTable.screwdriver = "Skruvmejsel";
svTranslations.nobelPearlTable.destornillador = "Skruvmejsel";
svTranslations.preMilledBlanksTable.screwdriver = "Skruvmejsel";
svTranslations.preMilledBlanksN1TCCTable.screwdriver = "Skruvmejsel";
svTranslations.triChannelTestTable.destornillador = "Skruvmejsel";

// FIX: Added missing export for the 'translations' object. This resolves import errors in App.tsx and other components.
export const translations = {
  en: enTranslations,
  es: esTranslations,
  pt: ptTranslations,
  fr: frTranslations,
  sv: svTranslations
};