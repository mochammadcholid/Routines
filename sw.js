// Konfigurasi pemetaan gaya ke nilai CSS
const SHAPE_BORDER_CONFIG = {
  border: {
    none:   { style: 'none',   width: '0px',   label: 'Polos' },
    dashed: { style: 'dashed', width: '1.5px', label: 'Putus-putus' },
    solid:  { style: 'solid',  width: '1.5px', label: 'Solid' }
  },
  cardRadius: {
    circle:  { value: '36px', label: 'Melingkar' },
    rounded: { value: '22px', label: 'Agak Kotak' },
    square:  { value: '4px',  label: 'Kotak Tajam' }
  },
  iconRadius: {
    circle:  { value: '50%',  label: 'Melingkar' },
    rounded: { value: '13px', label: 'Agak Kotak' },
    square:  { value: '4px',  label: 'Kotak Tajam' }
  }
};

// Pastikan properti default tersedia di appState.appearance
function ensureCardIconStyleState() {
  if (!appState.appearance) appState.appearance = {};
  appState.appearance.cardBorderStyle = appState.appearance.cardBorderStyle || 'solid';
  appState.appearance.cardShape       = appState.appearance.cardShape || 'rounded';
  appState.appearance.iconBorderStyle = appState.appearance.iconBorderStyle || 'dashed';
  appState.appearance.iconShape       = appState.appearance.iconShape || 'circle';
}

// Terapkan gaya ke seluruh Kartu & Ikon via CSS Variables
function applyCardAndIconStyles() {
  ensureCardIconStyleState();
  const ap = appState.appearance;
  const root = document.documentElement;

  const cBorder = SHAPE_BORDER_CONFIG.border[ap.cardBorderStyle] || SHAPE_BORDER_CONFIG.border.solid;
  const cShape  = SHAPE_BORDER_CONFIG.cardRadius[ap.cardShape]    || SHAPE_BORDER_CONFIG.cardRadius.rounded;

  const iBorder = SHAPE_BORDER_CONFIG.border[ap.iconBorderStyle] || SHAPE_BORDER_CONFIG.border.dashed;
  const iShape  = SHAPE_BORDER_CONFIG.iconRadius[ap.iconShape]    || SHAPE_BORDER_CONFIG.iconRadius.circle;

  // Set CSS Custom Properties pada :root
  root.style.setProperty('--card-border-style', cBorder.style);
  root.style.setProperty('--card-border-width', cBorder.width);
  root.style.setProperty('--card-radius', cShape.value);

  root.style.setProperty('--icon-border-style', iBorder.style);
  root.style.setProperty('--icon-border-width', iBorder.width);
  root.style.setProperty('--icon-radius', iShape.value);

  // Perbarui kotak pratinjau langsung (jika modal pengaturan sedang terbuka)
  updateLivePreviewBox(cBorder, cShape, iBorder, iShape);
  syncCardIconButtonsUI();
}

// Fungsi handler saat pengguna memilih opsi di UI
function setCardBorderStyle(styleId) {
  appState.appearance.cardBorderStyle = styleId;
  saveState();
  applyCardAndIconStyles();
}

function setCardShape(shapeId) {
  appState.appearance.cardShape = shapeId;
  saveState();
  applyCardAndIconStyles();
}

function setIconBorderStyle(styleId) {
  appState.appearance.iconBorderStyle = styleId;
  saveState();
  applyCardAndIconStyles();
}

function setIconShape(shapeId) {
  appState.appearance.iconShape = shapeId;
  saveState();
  applyCardAndIconStyles();
}

// Sinkronisasi status tombol aktif (class .active)
function syncCardIconButtonsUI() {
  const ap = appState.appearance;
  document.querySelectorAll('[data-card-border]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cardBorder === ap.cardBorderStyle);
  });
  document.querySelectorAll('[data-card-shape]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cardShape === ap.cardShape);
  });
  document.querySelectorAll('[data-icon-border]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.iconBorder === ap.iconBorderStyle);
  });
  document.querySelectorAll('[data-icon-shape]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.iconShape === ap.iconShape);
  });
}

// Update elemen Live Preview di dalam modal pengaturan
function updateLivePreviewBox(cBorder, cShape, iBorder, iShape) {
  const previewCard = document.getElementById('preview-style-card');
  const previewIcon = document.getElementById('preview-style-icon');
  if (previewCard) {
    previewCard.style.borderStyle = cBorder.style;
    previewCard.style.borderWidth = cBorder.width;
    previewCard.style.borderRadius = cShape.value;
  }
  if (previewIcon) {
    previewIcon.style.borderStyle = iBorder.style;
    previewIcon.style.borderWidth = iBorder.width;
    previewIcon.style.borderRadius = iShape.value;
  }
}
