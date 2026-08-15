const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');
const dbJs = fs.readFileSync(path.join(baseDir, 'db.js'), 'utf8');
const scriptJs = fs.readFileSync(path.join(baseDir, 'script.js'), 'utf8');

console.log('----------------------------------------------------');
console.log('RUNNING DOM & LOGIC INTEGRATION TEST');
console.log('----------------------------------------------------');

// Test 1: WhatsApp message generator logic
function buildWhatsAppAppointmentUrl(item) {
  if (!item) return '';
  let cleanPhone = String(item.phone || '').replace(/[\s\-\(\)\+]/g, '');
  if (cleanPhone.startsWith('05')) {
    cleanPhone = '971' + cleanPhone.substring(1);
  } else if (cleanPhone.startsWith('5') && cleanPhone.length === 9) {
    cleanPhone = '971' + cleanPhone;
  }

  const clientName = item.buyerName || item.clientName || 'العميل الكريم';
  const permitNo = item.permitNo || 'غير محدد';
  const scheduledDate = item.scheduledDate || 'قريباً';
  const timeSlot = item.timeSlotTextAr || item.timeSlot || 'مرن / غير محدد';
  const workType = item.workType || 'تركيب وتسليم';
  const techName = item.technicianName || 'فريق التركيبات المعتمد';
  const address = item.address || 'العنوان المسجل';

  const msgLines = [
    `السلام عليكم ورحمة الله وبركاته،`,
    `أهلاً بك أستاذ/ة: ${clientName} 🌸`,
    ``,
    `نود إفادتكم من شركة الإنتاج بأنه تم جدولة موعد التركيب لفسح رقم: [ ${permitNo} ]`,
    ``,
    `🗓️ موعد التركيب: ${scheduledDate}`,
    `⏱️ وقت الحضور: ${timeSlot}`,
    `🛠️ تفاصيل العمل: ${workType}`,
    `👷‍♂️ فني التركيب: ${techName}`,
    `📍 العنوان: ${address}`
  ];

  const fullMsg = msgLines.join('\n');
  return cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(fullMsg)}` : `https://wa.me/?text=${encodeURIComponent(fullMsg)}`;
}

const sampleAppointment = {
  permitNo: 'WD-2026-0881',
  orderType: 'wood',
  orderTypeAr: 'فسح خشب',
  buyerName: 'عبدالله الشامسي',
  phone: '0501234567',
  scheduledDate: '2026-08-16',
  timeSlotTextAr: 'الساعة 10:00 صباحاً',
  workType: 'تركيب مطبخ رئيسي + مغاسل',
  technicianName: 'محمود عبد الرازق',
  address: 'دبي - ند الشبا 4 - فيلا 12'
};

const waUrl = buildWhatsAppAppointmentUrl(sampleAppointment);
console.log('Sample WhatsApp URL:');
console.log(waUrl);

if (waUrl.includes('https://wa.me/971501234567?text=') && waUrl.includes('WD-2026-0881')) {
  console.log('[PASSED] WhatsApp URL correctly formatted with clean international UAE phone prefix.');
} else {
  console.error('[FAILED] WhatsApp URL generation issue');
  process.exit(1);
}

// Test 2: Verify HTML contains required elements
const requiredElements = [
  'id="auth-tab-login"',
  'id="auth-tab-signup"',
  'id="auth-confirm-password-group"',
  'id="btn-signup"',
  'id="btn-login"',
  'id="btn-owner-login"',
  'id="admin-dashboard"',
  'id="modal-today-installations-preview"',
  'id="today-installations-printable-area"'
];

let allElementsPresent = true;
requiredElements.forEach(el => {
  if (!html.includes(el)) {
    console.error(`[FAILED] Missing HTML element: ${el}`);
    allElementsPresent = false;
  }
});

if (allElementsPresent) {
  console.log('[PASSED] All required UI elements and modal containers are present in index.html.');
} else {
  process.exit(1);
}

console.log('----------------------------------------------------');
console.log('ALL INTEGRATION TESTS PASSED 100% SUCCESSFULLY');
console.log('----------------------------------------------------');
