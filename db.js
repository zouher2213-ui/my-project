// ============================================================================
// Firebase V10 Modular SDK Imports (ES Modules via CDN)
// ============================================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  addDoc, 
  onSnapshot, 
  serverTimestamp, 
  query, 
  orderBy 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

/**
 * AL-ENTEJ WMS - LocalStorage Database Engine (v6.0)
 * Upgrades:
 * - Custom Permit Number (رقم الفسح) support on creation & editing.
 * - Comprehensive Multi-Field Search (Permit #, Buyer Name, Showroom, Rep, Phone, Date, Day, Order #).
 * - Universal CRUD: Full Edit and Delete across Items, Leftovers, Reservations, and Permits.
 * - 100% Arabic, English, and Bengali data models.
 * - Dynamic customizable Sales Reps & Showroom shortcuts.
 * - Seamless Firebase V10 (Auth State Observer & Firestore Realtime) Integration.
 */

(function () {
  'use strict';

  const DB_KEYS = {
    ITEMS: 'wms_items_v6',
    LEFTOVERS: 'wms_leftovers_v6',
    RESERVATIONS: 'wms_reservations_v6',
    WOOD_ORDERS: 'wms_wood_orders_v6',
    MARBLE_ORDERS: 'wms_marble_orders_v6',
    FIELD_SERVICES: 'wms_field_services_v6',
    TECHNICIANS: 'wms_technicians_v6',
    PRESETS: 'wms_presets_v6',
    SETTINGS: 'wms_settings_v6',
    AUTH_USER: 'wms_auth_user_v6'
  };

  // Seed Data
  const INITIAL_PRESETS = {
    reps_ar: ['طارق منصور', 'عدنان زيد', 'سامي حسن', 'كريم نبيل', 'محمد فوزي'],
    reps_en: ['Tariq Mansoor', 'Adnan Zaid', 'Sami Hassan', 'Karim Nabil', 'Mohamed Fawzy'],
    reps_bn: ['তারিক মনসুর', 'আদনান জায়েদ', 'সামি হাসান', 'করিম নাবিল', 'মোহাম্মদ ফওজি'],
    showrooms_ar: ['معرض الرويال الكبير', 'معرض الحرمين الفاخر', 'جاليري النخبة للتصميم', 'إمبوريوم برستيج للأحجار', 'مركز دبي للبلاط والسيراميك'],
    showrooms_en: ['Grand Royal Showroom', 'Al-Haramain Luxury Gallery', 'Elite Design Gallery', 'Prestige Stone Emporium', 'Dubai Tile & Ceramic Center'],
    showrooms_bn: ['গ্র্যান্ড রয়্যাল শোরুম', 'আল-হারামাইন লাক্সারি গ্যালারি', 'এলিট ডিজাইন গ্যালারি', 'প্রেস্টিজ স্টোন এম্পোরিয়াম', 'দুবাই টাইল সেন্টার'],
    wood_job_types_ar: ['تصنيع وتركيب أبواب', 'مطابخ وخزائن خشبية', 'ديكورات وتكسيات جدارية', 'أثاث وغرف نوم مخصصة', 'باركية وأرضيات'],
    wood_job_types_en: ['Door Manufacturing & Install', 'Kitchens & Cabinets', 'Wall Paneling & Cladding', 'Custom Furniture & Bedroom', 'Parquet & Flooring'],
    wood_job_types_bn: ['দরজা তৈরি ও স্থাপন', 'রান্নাঘর ও ক্যাবিনেট', 'ওয়াল প্যানেলিং ও ক্ল্যাডিং', 'কাস্টম আসবাবপত্র ও বেডরুম', 'পার্কে ও মেঝে']
  };

  const INITIAL_ITEMS = [
    {
      id: 'itm-por-001',
      sku: 'POR-STA-320',
      name: 'Calacatta Statuario Supreme Porcelain Slab',
      nameAr: 'ألواح بورسلان كلكتا ستاتوريو الملكي الفاخر',
      nameBn: 'ক্যালাকাট্টা স্ট্যাচুয়ারিও চীনামাটির স্ল্যাব',
      category: 'porcelain',
      dimensions: '160x320 cm',
      thickness: '12 mm',
      finish: 'Polished',
      finishAr: 'ملمع عالي النقاء',
      location: 'Bay A-01',
      locationAr: 'المستودع الرئيسي - قسم أ-01',
      totalQty: 85,
      reservedQty: 10,
      minThreshold: 15,
      unitPrice: 290,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
      createdAt: '2026-08-01T10:00:00Z'
    },
    {
      id: 'itm-por-002',
      sku: 'POR-NER-300',
      name: 'Nero Marquina Black Gold Porcelain Slab',
      nameAr: 'ألواح بورسلان نيرو ماركينا أسود ذهبي',
      nameBn: 'নিরো মারকিনা কালো সোনা চীনামাটির স্ল্যাব',
      category: 'porcelain',
      dimensions: '150x300 cm',
      thickness: '9 mm',
      finish: 'Silk Matte',
      finishAr: 'حريري مطفي مضاد للبصمات',
      location: 'Bay A-04',
      locationAr: 'المستودع الرئيسي - قسم أ-04',
      totalQty: 60,
      reservedQty: 5,
      minThreshold: 10,
      unitPrice: 240,
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80',
      createdAt: '2026-08-02T11:30:00Z'
    },
    {
      id: 'itm-mar-001',
      sku: 'MAR-CAR-290',
      name: 'Italian White Carrara Classic Marble Slab',
      nameAr: 'ألواح رخام كرارة إيطالي كلاسيك نخب أول',
      nameBn: 'ইতালীয় সাদা কারার ক্লাসিক মার্বেল স্ল্যাব',
      category: 'marble',
      origin: 'Carrara, Italy',
      originAr: 'إيطاليا - مقالع كرارة الفاخرة',
      dimensions: '320x75 cm',
      thickness: '12 mm',
      finish: 'Polished Mirror',
      finishAr: 'ملمع مرآة فاخر',
      location: 'Yard East-01',
      locationAr: 'ساحة الرخام الخارجية - قطاع E-01',
      totalQty: 42,
      reservedQty: 8,
      minThreshold: 8,
      unitPrice: 420,
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400&q=80',
      createdAt: '2026-08-03T09:15:00Z'
    },
    {
      id: 'itm-mar-002',
      sku: 'MAR-VOL-280',
      name: 'Greek Volakas Pure White Marble Slab',
      nameAr: 'ألواح رخام فولاكاس يوناني أبيض ناصع',
      nameBn: 'গ্রীক ভোলাকাস খাঁটি সাদা মার্বেল স্ল্যাব',
      category: 'marble',
      origin: 'Drama, Greece',
      originAr: 'اليونان - جبال فولاكاس',
      dimensions: '320x75 cm',
      thickness: '12 mm',
      finish: 'Honed',
      finishAr: 'معالج ملمس ناعم',
      location: 'Yard East-03',
      locationAr: 'ساحة الرخام الخارجية - قطاع E-03',
      totalQty: 30,
      reservedQty: 4,
      minThreshold: 6,
      unitPrice: 380,
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80',
      createdAt: '2026-08-04T14:20:00Z'
    }
  ];

  const INITIAL_LEFTOVERS = [
    {
      id: 'lft-001',
      code: 'OFF-POR-901',
      materialType: 'porcelain',
      originalSku: 'POR-STA-320',
      name: 'Offcut Statuario Corner Slab',
      nameAr: 'قطعة هالك مقصوصة زاوية ستاتوريو',
      dimensions: '140x60 cm',
      thickness: '12 mm',
      slabsQty: 1.0,
      location: 'Remnant Bay 1',
      locationAr: 'رف تخزين الهوالك 1',
      date: '2026-08-10T12:00:00Z'
    },
    {
      id: 'lft-002',
      code: 'OFF-MAR-802',
      materialType: 'marble',
      originalSku: 'MAR-CAR-290',
      name: 'Offcut Carrara Island Top Piece',
      nameAr: 'قطعة هالك صالحة لكونتر مطبخ كرارة',
      dimensions: '180x75 cm',
      thickness: '20 mm',
      slabsQty: 1.0,
      location: 'Remnant Bay 2',
      locationAr: 'رف تخزين الهوالك 2',
      date: '2026-08-11T15:30:00Z'
    }
  ];

  const INITIAL_RESERVATIONS = [
    {
      id: 'res-001',
      itemId: 'itm-por-001',
      category: 'porcelain',
      sku: 'POR-STA-320',
      itemName: 'Calacatta Statuario Supreme Porcelain Slab',
      itemNameAr: 'ألواح بورسلان كلكتا ستاتوريو الملكي الفاخر',
      reservedQty: 10,
      repName: 'Tariq Mansoor',
      repNameAr: 'طارق منصور',
      showroomName: 'Grand Royal Showroom',
      showroomNameAr: 'معرض الرويال الكبير',
      clientName: 'Dr. Faisal Al-Sabah',
      clientNameAr: 'د. فيصل الصباح',
      projectRef: 'PRJ-VILLA-99',
      date: '2026-08-12T09:00:00Z'
    },
    {
      id: 'res-002',
      itemId: 'itm-mar-001',
      category: 'marble',
      sku: 'MAR-CAR-290',
      itemName: 'Italian White Carrara Classic Marble Slab',
      itemNameAr: 'ألواح رخام كرارة إيطالي كلاسيك نخب أول',
      reservedQty: 8,
      repName: 'Sami Hassan',
      repNameAr: 'سامي حسن',
      showroomName: 'Elite Design Gallery',
      showroomNameAr: 'جاليري النخبة للتصميم',
      clientName: 'Al-Qimma Contracting Co.',
      clientNameAr: 'شركة القمة للمقاولات',
      projectRef: 'PRJ-TOWER-44',
      date: '2026-08-13T11:00:00Z'
    }
  ];

  const INITIAL_WOOD_ORDERS = [
    {
      id: 'wod-001',
      permitNo: 'FSH-WOD-2026-01',
      orderNo: 'WOD-101',
      repName: 'Tariq Mansoor',
      repNameAr: 'طارق منصور',
      repNameBn: 'তারিক মনসুর',
      clientName: 'Grand Royal Showroom',
      clientNameAr: 'معرض الرويال الكبير',
      clientNameBn: 'গ্র্যান্ড রয়্যাল শোরুম',
      buyerName: 'Eng. Khaled Al-Sabah',
      buyerNameAr: 'م. خالد الصباح',
      buyerNameBn: 'ইঞ্জিনিয়ার খালেদ আল-সাবাহ',
      workType: 'Door Manufacturing & Install',
      workTypeAr: 'تصنيع وتركيب أبواب فاخرة',
      workTypeBn: 'দরজা তৈরি ও স্থাপন',
      phone: '+971 50 882 1944',
      expectedDate: '2026-08-20',
      dayOfWeek: 'الخميس',
      status: 'Scheduled',
      createdAt: '2026-08-14T08:00:00Z'
    },
    {
      id: 'wod-002',
      permitNo: 'FSH-WOD-2026-02',
      orderNo: 'WOD-102',
      repName: 'Sami Hassan',
      repNameAr: 'سامي حسن',
      repNameBn: 'সামি হাসান',
      clientName: 'Elite Design Gallery',
      clientNameAr: 'جاليري النخبة للتصميم',
      clientNameBn: 'এলিট ডিজাইন গ্যালারি',
      buyerName: 'Al-Qimma Contracting',
      buyerNameAr: 'شركة القمة للمقاولات',
      buyerNameBn: 'আল-কিম্মা কনট্রাক্টিং',
      workType: 'Kitchens & Cabinets',
      workTypeAr: 'مطابخ وخزائن خشبية',
      workTypeBn: 'রান্নাঘর ও ক্যাবিনেট',
      phone: '+971 55 432 9988',
      expectedDate: '2026-08-18',
      dayOfWeek: 'الثلاثاء',
      status: 'Scheduled',
      createdAt: '2026-08-14T09:30:00Z'
    }
  ];

  const INITIAL_MARBLE_ORDERS = [
    {
      id: 'mod-001',
      permitNo: 'FSH-MAR-2026-01',
      orderNo: 'MOD-201',
      repName: 'Adnan Zaid',
      repNameAr: 'عدنان زيد',
      repNameBn: 'আদনান জায়েদ',
      clientName: 'Al-Haramain Luxury Gallery',
      clientNameAr: 'معرض الحرمين الفاخر',
      clientNameBn: 'আল-হারামাইন লাক্সারি গ্যালারি',
      buyerName: 'Sheikh Mansour Palace Project',
      buyerNameAr: 'مشروع قصر الشيخ منصور',
      buyerNameBn: 'শেখ মনসুর প্রাসাদ প্রকল্প',
      phone: '+971 52 900 1122',
      expectedDate: '2026-08-19',
      dayOfWeek: 'الأربعاء',
      status: 'Scheduled',
      createdAt: '2026-08-14T10:00:00Z'
    }
  ];

  const INITIAL_TECHNICIANS = [
    {
      id: 'tech-001',
      name: 'عمران الفاروق',
      nameEn: 'Imran Al-Farooq',
      nameBn: 'ইমরান আল-ফারুক',
      specialty: 'تركيب رخام وتكسيات جدارية فاخرة',
      specialtyEn: 'Marble & Luxury Wall Cladding',
      specialtyBn: 'মার্বেল ও লাক্সারি ক্ল্যাডিং',
      phone: '+971 50 111 2233',
      status: 'Available',
      avgRating: 4.9,
      ratingsCount: 38,
      totalJobs: 42,
      avatar: '👷‍♂️',
      createdAt: '2026-07-01T08:00:00Z'
    },
    {
      id: 'tech-002',
      name: 'يوسف النجار',
      nameEn: 'Youssef Al-Najjar',
      nameBn: 'ইউসুফ আল-নাজ্জার',
      specialty: 'تركيب مطابخ وأبواب وخزائن خشبية',
      specialtyEn: 'Wood Kitchens & Custom Doors',
      specialtyBn: 'কাঠের রান্নাঘর ও কাস্টম দরজা',
      phone: '+971 55 222 3344',
      status: 'On Site',
      avgRating: 4.8,
      ratingsCount: 50,
      totalJobs: 56,
      avatar: '🪵',
      createdAt: '2026-07-05T08:00:00Z'
    },
    {
      id: 'tech-003',
      name: 'بلال أنور',
      nameEn: 'Bilal Anwar',
      nameBn: 'বিলাল আনোয়ার',
      specialty: 'ألواح بورسلان كبير وتصميم أرضيات',
      specialtyEn: 'Large Format Porcelain & Flooring',
      specialtyBn: 'চীনামাটির স্ল্যাব ও ফ্লোরিং',
      phone: '+971 52 333 4455',
      status: 'En Route',
      avgRating: 4.95,
      ratingsCount: 59,
      totalJobs: 65,
      avatar: '🏺',
      createdAt: '2026-07-10T08:00:00Z'
    },
    {
      id: 'tech-004',
      name: 'خالد الدوسري',
      nameEn: 'Khalid Al-Dawsari',
      nameBn: 'খালেদ আল-দাওসারী',
      specialty: 'معالجة وقص وتركيب رخام طبيعي',
      specialtyEn: 'Natural Stone Processing & Fitting',
      specialtyBn: 'প্রাকৃতিক পাথর প্রসেসিং ও ফিটিং',
      phone: '+971 54 444 5566',
      status: 'Available',
      avgRating: 4.7,
      ratingsCount: 26,
      totalJobs: 30,
      avatar: '💎',
      createdAt: '2026-07-15T08:00:00Z'
    }
  ];

  const INITIAL_FIELD_SERVICES = [
    {
      id: 'fs-001',
      permitNo: 'FSH-WD-2026-01',
      orderType: 'wood',
      orderTypeAr: 'فسح خشب',
      clientName: 'معرض الرويال الكبير',
      buyerName: 'فيلا الأندلس - الشيخ زايد',
      phone: '+971 50 334 5566',
      showroom: 'معرض الرويال الكبير',
      repName: 'طارق منصور',
      technicianId: 'tech-002',
      technicianName: 'يوسف النجار',
      scheduledDate: new Date().toISOString().split('T')[0],
      dayOfWeek: 'اليوم',
      timeSlot: 'morning',
      timeSlotTextAr: 'صباحي (08:00 ص - 01:00 م)',
      status: 'In Progress',
      workType: 'تركيب مطبخ خشب سنديان وخزائن',
      address: 'دبي - تلال الإمارات - مجمع الزمرد فيلا 44',
      mapsUrl: 'https://maps.google.com/?q=25.0754,55.1568',
      houseUrl: 'https://maps.google.com/?q=25.0754,55.1568',
      buildingPhoto: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%231e293b"/><path d="M50 220 L200 80 L350 220 Z" fill="%234338ca"/><rect x="80" y="180" width="240" height="100" fill="%23334155"/><rect x="160" y="200" width="80" height="80" fill="%236366f1"/><rect x="100" y="195" width="40" height="40" fill="%23facc15"/><rect x="260" y="195" width="40" height="40" fill="%23facc15"/><text x="200" y="50" fill="%23ffffff" font-family="sans-serif" font-size="18" text-anchor="middle" font-weight="bold">Luxury Villa - Exterior</text></svg>',
      notes: 'العميل يطلب الدقة في ضبط زوايا الأبواب الرئيسية والمطبخ',
      returnReason: null,
      returnNotes: null,
      returnTimestamp: null,
      rating: null,
      createdAt: '2026-08-15T09:00:00Z'
    },
    {
      id: 'fs-002',
      permitNo: 'FSH-MAR-2026-01',
      orderType: 'marble',
      orderTypeAr: 'فسح رخام',
      clientName: 'معرض الحرمين الفاخر',
      buyerName: 'مشروع قصر الشيخ منصور',
      phone: '+971 52 900 1122',
      showroom: 'معرض الحرمين الفاخر',
      repName: 'عدنان زيد',
      technicianId: 'tech-001',
      technicianName: 'عمران الفاروق',
      scheduledDate: new Date().toISOString().split('T')[0],
      dayOfWeek: 'اليوم',
      timeSlot: 'afternoon',
      timeSlotTextAr: 'مسائي (02:00 م - 07:00 م)',
      status: 'Scheduled',
      workType: 'تركيب مغاسل ورخام كرارة إيطالي كلاسيك للمدخل',
      address: 'دبي - نخلة جميرا - بوابة القصور 12',
      mapsUrl: 'https://maps.google.com/?q=25.1124,55.1390',
      houseUrl: 'https://maps.google.com/?q=25.1124,55.1390',
      buildingPhoto: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%230f172a"/><polygon points="200,40 380,140 20,140" fill="%23b45309"/><rect x="60" y="140" width="280" height="140" fill="%231e293b"/><rect x="170" y="180" width="60" height="100" fill="%23f59e0b"/><text x="200" y="270" fill="%23ffffff" font-family="sans-serif" font-size="14" text-anchor="middle">Royal Palace Gate</text></svg>',
      notes: 'تأكيد موعد الوصول مع العميل قبل ساعة',
      returnReason: null,
      returnNotes: null,
      returnTimestamp: null,
      rating: null,
      createdAt: '2026-08-15T09:30:00Z'
    },
    {
      id: 'fs-003',
      permitNo: 'MAR-2026-881',
      orderType: 'marble',
      orderTypeAr: 'فسح رخام',
      clientName: 'جاليري النخبة للتصميم',
      buyerName: 'برج مارينا سكاي فيوز - شقة 1804',
      phone: '+971 52 444 8899',
      showroom: 'جاليري النخبة للتصميم',
      repName: 'سامي حسن',
      technicianId: 'tech-004',
      technicianName: 'خالد الدوسري',
      scheduledDate: '2026-08-15',
      dayOfWeek: 'السبت',
      timeSlot: 'morning',
      timeSlotTextAr: 'صباحي (08:00 ص - 01:00 م)',
      status: 'Returned',
      workType: 'ألواح رخام فولاكاس يوناني',
      address: 'دبي - مارينا دبي - برج سكاي فيوز',
      notes: 'تسليم ومطابقة عينات الرخام بالموقع',
      returnReason: 'customer_no_answer',
      returnReasonTextAr: 'الزبون لم يرد على الهاتف بعد محاولات متكررة ووصول الفني للموقع',
      returnNotes: 'تم الاتصال 4 مرات ورسالة واتساب بدون رد. تم إرجاع الأوردر للجدولة لاحقاً.',
      returnTimestamp: '2026-08-15T11:20:00Z',
      rating: null,
      createdAt: '2026-08-14T14:00:00Z'
    },
    {
      id: 'fs-004',
      permitNo: 'FSH-WD-2026-02',
      orderType: 'wood',
      orderTypeAr: 'فسح خشب',
      clientName: 'معرض الرويال الكبير',
      buyerName: 'فيلا السعديات الملكية',
      phone: '+971 55 889 0011',
      showroom: 'معرض الرويال الكبير',
      repName: 'كريم نبيل',
      technicianId: 'tech-003',
      technicianName: 'بلال أنور',
      scheduledDate: '2026-08-14',
      dayOfWeek: 'الجمعة',
      timeSlot: 'morning',
      timeSlotTextAr: 'صباحي (08:00 ص - 01:00 م)',
      status: 'Completed',
      workType: 'مطابخ وخزائن خشبية فاخرة',
      address: 'أبوظبي - جزيرة السعديات - فيلا 9',
      notes: 'تم استلام الموقع والتوقيع على نموذج الإنجاز',
      returnReason: null,
      returnNotes: null,
      returnTimestamp: null,
      rating: {
        score: 5,
        punctualityScore: 5,
        feedback: 'فني ممتاز ومحترف جداً والتزام كامل بالمواعيد ونظافة تامة للموقع',
        createdAt: '2026-08-14T15:30:00Z'
      },
      createdAt: '2026-08-13T10:00:00Z'
    }
  ];

  // ==========================================================================
  // HELPER STORAGE FUNCTIONS
  // ==========================================================================
  function getStored(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.error('Error reading localStorage key:', key, e);
      return fallback;
    }
  }

  function setStored(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error('Error writing localStorage key:', key, e);
    }
    // Broadcast cloud sync for warehouse data
    if (!window._isApplyingCloudSync && typeof window._triggerCloudSyncPush === 'function') {
      window._triggerCloudSyncPush(key, val);
    }
  }

  // Initialize DB if empty
  function initDB() {
    if (!localStorage.getItem(DB_KEYS.ITEMS)) {
      setStored(DB_KEYS.ITEMS, INITIAL_ITEMS);
    }
    if (!localStorage.getItem(DB_KEYS.LEFTOVERS)) {
      setStored(DB_KEYS.LEFTOVERS, INITIAL_LEFTOVERS);
    }
    if (!localStorage.getItem(DB_KEYS.RESERVATIONS)) {
      setStored(DB_KEYS.RESERVATIONS, INITIAL_RESERVATIONS);
    }
    if (!localStorage.getItem(DB_KEYS.WOOD_ORDERS)) {
      setStored(DB_KEYS.WOOD_ORDERS, INITIAL_WOOD_ORDERS);
    }
    if (!localStorage.getItem(DB_KEYS.MARBLE_ORDERS)) {
      setStored(DB_KEYS.MARBLE_ORDERS, INITIAL_MARBLE_ORDERS);
    }
    if (!localStorage.getItem(DB_KEYS.FIELD_SERVICES)) {
      setStored(DB_KEYS.FIELD_SERVICES, INITIAL_FIELD_SERVICES);
    }
    if (!localStorage.getItem(DB_KEYS.TECHNICIANS)) {
      setStored(DB_KEYS.TECHNICIANS, INITIAL_TECHNICIANS);
    }
    if (!localStorage.getItem(DB_KEYS.PRESETS)) {
      setStored(DB_KEYS.PRESETS, INITIAL_PRESETS);
    }
    if (!localStorage.getItem(DB_KEYS.SETTINGS)) {
      setStored(DB_KEYS.SETTINGS, { lang: 'ar', theme: 'dark', currency: '$' });
    }
  }

  initDB();

  // ==========================================================================
  // PUBLIC DATABASE ENGINE (WMS_DB)
  // ==========================================================================
  window.WMS_DB = {
    // Auth
    login(username, password) {
      const uLower = (username || '').toLowerCase().trim();
      const isOwner = (uLower === 's@gmail.com');
      const isAdmin = ((uLower === 'admin' && password === '123456') || uLower === 'demo');

      if (isAdmin || isOwner) {
        const user = { 
          username: username || (isOwner ? 's@gmail.com' : 'admin'), 
          email: isOwner ? 's@gmail.com' : (uLower === 'admin' ? 'admin@warehouse.local' : `${username}@warehouse.local`),
          role: isOwner ? 'Owner' : 'Super Admin', 
          name: isOwner ? 'المالك / Owner (s@gmail.com)' : 'المدير العام للمستودع (كامل الصلاحيات)',
          roleTitleAr: isOwner ? 'المالك / صاحب المنشأة' : 'المدير العام للمستودع',
          roleTitleEn: isOwner ? 'Owner & Primary Administrator' : 'Super Admin',
          roleTitleBn: isOwner ? 'মালিক (Owner)' : 'সুপার অ্যাডমিন',
          fullAccess: true,
          permissions: ['*'],
          isOwner: isOwner
        };
        setStored(DB_KEYS.AUTH_USER, user);
        return user;
      }
      throw new Error('بيانات الدخول غير صحيحة! يرجى استخدام admin / 123456 أو حساب المالك s@gmail.com');
    },

    logout() {
      localStorage.removeItem(DB_KEYS.AUTH_USER);
    },

    getAuthUser() {
      return getStored(DB_KEYS.AUTH_USER, null);
    },

    setAuthUser(user) {
      setStored(DB_KEYS.AUTH_USER, user);
      return user;
    },

    setStored(key, value) {
      setStored(key, value);
      return value;
    },

    getStored(key, fallback) {
      return getStored(key, fallback);
    },

    // Settings
    getSettings() {
      return getStored(DB_KEYS.SETTINGS, { lang: 'ar', theme: 'dark', currency: '$' });
    },

    saveSettings(newSettings) {
      const current = this.getSettings();
      const merged = { ...current, ...newSettings };
      setStored(DB_KEYS.SETTINGS, merged);
      return merged;
    },

    // Presets (Sales Reps, Showrooms & Wood Work Types)
    getPresets(lang = 'ar') {
      const presets = getStored(DB_KEYS.PRESETS, INITIAL_PRESETS) || {};
      const repsKey = lang === 'en' ? 'reps_en' : lang === 'bn' ? 'reps_bn' : 'reps_ar';
      const showKey = lang === 'en' ? 'showrooms_en' : lang === 'bn' ? 'showrooms_bn' : 'showrooms_ar';
      const jobKey = lang === 'en' ? 'wood_job_types_en' : lang === 'bn' ? 'wood_job_types_bn' : 'wood_job_types_ar';

      const reps = (Array.isArray(presets[repsKey]) && presets[repsKey].length > 0)
        ? presets[repsKey]
        : (INITIAL_PRESETS[repsKey] || ['طارق منصور', 'عدنان زيد', 'سامي حسن']);
      const showrooms = (Array.isArray(presets[showKey]) && presets[showKey].length > 0)
        ? presets[showKey]
        : (INITIAL_PRESETS[showKey] || ['معرض الرويال الكبير', 'معرض الحرمين الفاخر']);
      const woodJobTypes = (Array.isArray(presets[jobKey]) && presets[jobKey].length > 0)
        ? presets[jobKey]
        : (INITIAL_PRESETS[jobKey] || ['تصنيع وتركيب أبواب', 'مطابخ وخزائن خشبية', 'ديكورات وتكسيات جدارية']);

      return {
        reps,
        showrooms,
        woodJobTypes
      };
    },

    addPresetRep(name, lang = 'ar') {
      if (!name || !name.trim()) return;
      const presets = getStored(DB_KEYS.PRESETS, { ...INITIAL_PRESETS });
      const key = lang === 'en' ? 'reps_en' : lang === 'bn' ? 'reps_bn' : 'reps_ar';
      if (!Array.isArray(presets[key])) {
        presets[key] = INITIAL_PRESETS[key] ? [...INITIAL_PRESETS[key]] : [];
      }
      if (!presets[key].includes(name.trim())) {
        presets[key].push(name.trim());
        setStored(DB_KEYS.PRESETS, presets);
      }
    },

    deletePresetRep(name, lang = 'ar') {
      const presets = getStored(DB_KEYS.PRESETS, { ...INITIAL_PRESETS });
      const key = lang === 'en' ? 'reps_en' : lang === 'bn' ? 'reps_bn' : 'reps_ar';
      if (Array.isArray(presets[key])) {
        presets[key] = presets[key].filter(r => r !== name);
        setStored(DB_KEYS.PRESETS, presets);
      }
    },

    addPresetShowroom(name, lang = 'ar') {
      if (!name || !name.trim()) return;
      const presets = getStored(DB_KEYS.PRESETS, { ...INITIAL_PRESETS });
      const key = lang === 'en' ? 'showrooms_en' : lang === 'bn' ? 'showrooms_bn' : 'showrooms_ar';
      if (!Array.isArray(presets[key])) {
        presets[key] = INITIAL_PRESETS[key] ? [...INITIAL_PRESETS[key]] : [];
      }
      if (!presets[key].includes(name.trim())) {
        presets[key].push(name.trim());
        setStored(DB_KEYS.PRESETS, presets);
      }
    },

    deletePresetShowroom(name, lang = 'ar') {
      const presets = getStored(DB_KEYS.PRESETS, { ...INITIAL_PRESETS });
      const key = lang === 'en' ? 'showrooms_en' : lang === 'bn' ? 'showrooms_bn' : 'showrooms_ar';
      if (Array.isArray(presets[key])) {
        presets[key] = presets[key].filter(s => s !== name);
        setStored(DB_KEYS.PRESETS, presets);
      }
    },

    addPresetWoodJobType(name, lang = 'ar') {
      if (!name || !name.trim()) return;
      const presets = getStored(DB_KEYS.PRESETS, { ...INITIAL_PRESETS });
      const key = lang === 'en' ? 'wood_job_types_en' : lang === 'bn' ? 'wood_job_types_bn' : 'wood_job_types_ar';
      if (!Array.isArray(presets[key])) {
        presets[key] = INITIAL_PRESETS[key] ? [...INITIAL_PRESETS[key]] : [];
      }
      if (!presets[key].includes(name.trim())) {
        presets[key].push(name.trim());
        setStored(DB_KEYS.PRESETS, presets);
      }
    },

    deletePresetWoodJobType(name, lang = 'ar') {
      const presets = getStored(DB_KEYS.PRESETS, { ...INITIAL_PRESETS });
      const key = lang === 'en' ? 'wood_job_types_en' : lang === 'bn' ? 'wood_job_types_bn' : 'wood_job_types_ar';
      if (Array.isArray(presets[key])) {
        presets[key] = presets[key].filter(j => j !== name);
        setStored(DB_KEYS.PRESETS, presets);
      }
    },

    // Items CRUD (Porcelain & Marble)
    getItems(filter = {}) {
      let items = getStored(DB_KEYS.ITEMS, INITIAL_ITEMS);

      if (filter.category) {
        items = items.filter(it => it.category === filter.category);
      }

      if (filter.search) {
        const q = filter.search.toLowerCase().trim();
        items = items.filter(it =>
          it.sku.toLowerCase().includes(q) ||
          (it.name && it.name.toLowerCase().includes(q)) ||
          (it.nameAr && it.nameAr.toLowerCase().includes(q)) ||
          (it.nameBn && it.nameBn.toLowerCase().includes(q)) ||
          (it.location && it.location.toLowerCase().includes(q)) ||
          (it.locationAr && it.locationAr.toLowerCase().includes(q))
        );
      }

      if (filter.stockStatus) {
        if (filter.stockStatus === 'low') {
          items = items.filter(it => (it.totalQty - (it.reservedQty || 0)) <= it.minThreshold);
        } else if (filter.stockStatus === 'reserved') {
          items = items.filter(it => (it.reservedQty || 0) > 0);
        } else if (filter.stockStatus === 'normal') {
          items = items.filter(it => (it.totalQty - (it.reservedQty || 0)) > it.minThreshold);
        }
      }

      return items.map(it => {
        const total = Number(it.totalQty || 0);
        const res = Number(it.reservedQty || 0);
        const avail = Math.max(0, total - res);
        const unitPrice = Number(it.unitPrice || 0);

        let displayName = it.nameAr || it.name;
        if (filter.lang === 'en') displayName = it.name;
        if (filter.lang === 'bn') displayName = it.nameBn || it.name;

        let displayLocation = it.locationAr || it.location;
        if (filter.lang === 'en') displayLocation = it.location;

        return {
          ...it,
          totalQty: total,
          reservedQty: res,
          availableQty: avail,
          totalValuation: total * unitPrice,
          displayName,
          displayLocation
        };
      });
    },

    getItemById(id) {
      const items = this.getItems();
      return items.find(it => it.id === id) || null;
    },

    addItem(itemData) {
      const items = getStored(DB_KEYS.ITEMS, INITIAL_ITEMS);
      const newItem = {
        id: `itm-${Date.now()}`,
        sku: itemData.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        name: itemData.name,
        nameAr: itemData.name,
        category: itemData.category || 'porcelain',
        dimensions: itemData.dimensions || '160x320 cm',
        thickness: itemData.thickness || '12 mm',
        finish: itemData.finish || 'Polished',
        finishAr: itemData.finish || 'ملمع',
        location: itemData.location || 'Bay A-01',
        locationAr: itemData.location || 'المستودع أ-01',
        totalQty: Number(itemData.quantity || 0),
        reservedQty: 0,
        minThreshold: Number(itemData.minThreshold || 5),
        unitPrice: Number(itemData.unitPrice || 0),
        image: itemData.image || '',
        createdAt: new Date().toISOString()
      };
      items.unshift(newItem);
      setStored(DB_KEYS.ITEMS, items);
      return newItem;
    },

    updateItem(id, updates) {
      const items = getStored(DB_KEYS.ITEMS, INITIAL_ITEMS);
      const index = items.findIndex(it => it.id === id);
      if (index !== -1) {
        items[index] = {
          ...items[index],
          ...updates,
          totalQty: updates.quantity !== undefined ? Number(updates.quantity) : items[index].totalQty,
          nameAr: updates.name || items[index].nameAr,
          locationAr: updates.location || items[index].locationAr
        };
        setStored(DB_KEYS.ITEMS, items);
        return items[index];
      }
      throw new Error('Item not found');
    },

    deleteItem(id) {
      let items = getStored(DB_KEYS.ITEMS, INITIAL_ITEMS);
      items = items.filter(it => it.id !== id);
      setStored(DB_KEYS.ITEMS, items);

      // Clean related reservations
      let reservations = getStored(DB_KEYS.RESERVATIONS, INITIAL_RESERVATIONS);
      reservations = reservations.filter(r => r.itemId !== id);
      setStored(DB_KEYS.RESERVATIONS, reservations);
      return true;
    },

    adjustStock(id, delta) {
      const items = getStored(DB_KEYS.ITEMS, INITIAL_ITEMS);
      const item = items.find(it => it.id === id);
      if (!item) throw new Error('Item not found');

      const current = Number(item.totalQty || 0);
      const next = current + Number(delta);
      const reserved = Number(item.reservedQty || 0);

      if (next < reserved) {
        throw new Error(`لا يمكن إنقاص المخزون لأقل من الكمية المحجوزة (${reserved} لوح)`);
      }
      if (next < 0) {
        throw new Error('لا يمكن أن تكون كمية الألواح سالبة');
      }

      item.totalQty = Math.round(next * 10) / 10;
      setStored(DB_KEYS.ITEMS, items);
      return { id: item.id, sku: item.sku, quantity: item.totalQty };
    },

    generateNextSKU(category = 'porcelain') {
      const items = getStored(DB_KEYS.ITEMS, INITIAL_ITEMS);
      const count = items.filter(it => it.category === category).length + 1;
      const prefix = category === 'porcelain' ? 'POR' : 'MAR';
      return `${prefix}-SLB-${String(count).padStart(3, '0')}`;
    },

    // Leftovers CRUD
    getLeftovers(category = 'all') {
      let leftovers = getStored(DB_KEYS.LEFTOVERS, INITIAL_LEFTOVERS);
      if (category !== 'all') {
        leftovers = leftovers.filter(l => l.materialType === category);
      }
      return leftovers;
    },

    getLeftoverById(id) {
      const leftovers = getStored(DB_KEYS.LEFTOVERS, INITIAL_LEFTOVERS);
      return leftovers.find(l => l.id === id) || null;
    },

    addLeftover(data) {
      const leftovers = getStored(DB_KEYS.LEFTOVERS, INITIAL_LEFTOVERS);
      const prefix = data.materialType === 'porcelain' ? 'OFF-POR' : 'OFF-MAR';
      const code = `${prefix}-${Math.floor(100 + Math.random() * 900)}`;

      const newCut = {
        id: `lft-${Date.now()}`,
        code,
        materialType: data.materialType || 'porcelain',
        originalSku: data.originalSku || 'CUSTOM',
        name: data.name,
        nameAr: data.name,
        dimensions: data.dimensions,
        thickness: data.thickness,
        slabsQty: Number(data.slabsQty || 0.5),
        location: data.location,
        locationAr: data.location,
        date: new Date().toISOString()
      };
      leftovers.unshift(newCut);
      setStored(DB_KEYS.LEFTOVERS, leftovers);
      return newCut;
    },

    updateLeftover(id, updates) {
      const leftovers = getStored(DB_KEYS.LEFTOVERS, INITIAL_LEFTOVERS);
      const idx = leftovers.findIndex(l => l.id === id);
      if (idx !== -1) {
        leftovers[idx] = {
          ...leftovers[idx],
          ...updates,
          nameAr: updates.name || leftovers[idx].nameAr,
          locationAr: updates.location || leftovers[idx].locationAr,
          slabsQty: Number(updates.slabsQty || leftovers[idx].slabsQty)
        };
        setStored(DB_KEYS.LEFTOVERS, leftovers);
        return leftovers[idx];
      }
      throw new Error('Leftover not found');
    },

    deleteLeftover(id) {
      let leftovers = getStored(DB_KEYS.LEFTOVERS, INITIAL_LEFTOVERS);
      leftovers = leftovers.filter(l => l.id !== id);
      setStored(DB_KEYS.LEFTOVERS, leftovers);
      return true;
    },

    // Reservations CRUD
    getReservations(category = 'all') {
      let res = getStored(DB_KEYS.RESERVATIONS, INITIAL_RESERVATIONS);
      if (category !== 'all') {
        res = res.filter(r => r.category === category);
      }
      return res;
    },

    getReservationById(id) {
      const res = getStored(DB_KEYS.RESERVATIONS, INITIAL_RESERVATIONS);
      return res.find(r => r.id === id) || null;
    },

    reserveMaterial(itemId, qty, repName, showroomName, clientName, projectRef) {
      const items = getStored(DB_KEYS.ITEMS, INITIAL_ITEMS);
      const item = items.find(it => it.id === itemId);
      if (!item) throw new Error('Item not found');

      const available = (item.totalQty || 0) - (item.reservedQty || 0);
      const reqQty = Number(qty);
      if (reqQty <= 0) throw new Error('يجب تحديد كمية صالحة للحجز');
      if (reqQty > available) {
        throw new Error(`الكمية المتاحة للبيع (${available} لوح) أقل من الكمية المطلوبة للحجز (${reqQty} لوح)`);
      }

      item.reservedQty = Math.round(((item.reservedQty || 0) + reqQty) * 10) / 10;
      setStored(DB_KEYS.ITEMS, items);

      const reservations = getStored(DB_KEYS.RESERVATIONS, INITIAL_RESERVATIONS);
      const newRes = {
        id: `res-${Date.now()}`,
        itemId: item.id,
        category: item.category,
        sku: item.sku,
        itemName: item.name,
        itemNameAr: item.nameAr || item.name,
        reservedQty: reqQty,
        repName: repName,
        repNameAr: repName,
        showroomName: showroomName,
        showroomNameAr: showroomName,
        clientName: clientName,
        clientNameAr: clientName,
        projectRef: projectRef || `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString()
      };
      reservations.unshift(newRes);
      setStored(DB_KEYS.RESERVATIONS, reservations);

      return newRes;
    },

    updateReservation(id, updates) {
      const reservations = getStored(DB_KEYS.RESERVATIONS, INITIAL_RESERVATIONS);
      const res = reservations.find(r => r.id === id);
      if (!res) throw new Error('Reservation not found');

      const items = getStored(DB_KEYS.ITEMS, INITIAL_ITEMS);
      const item = items.find(it => it.id === res.itemId);

      if (updates.reservedQty !== undefined && item) {
        const newQty = Number(updates.reservedQty);
        const oldQty = Number(res.reservedQty);
        const diff = newQty - oldQty;
        const available = (item.totalQty || 0) - (item.reservedQty || 0);

        if (diff > available) {
          throw new Error(`الرصيد المتبقي لا يكفي لزيادة الحجز (${available} لوح فقط متاح)`);
        }
        item.reservedQty = Math.round(((item.reservedQty || 0) + diff) * 10) / 10;
        setStored(DB_KEYS.ITEMS, items);
        res.reservedQty = newQty;
      }

      if (updates.repName) { res.repName = updates.repName; res.repNameAr = updates.repName; }
      if (updates.showroomName) { res.showroomName = updates.showroomName; res.showroomNameAr = updates.showroomName; }
      if (updates.clientName) { res.clientName = updates.clientName; res.clientNameAr = updates.clientName; }
      if (updates.projectRef) { res.projectRef = updates.projectRef; }

      setStored(DB_KEYS.RESERVATIONS, reservations);
      return res;
    },

    cancelReservation(resId) {
      let reservations = getStored(DB_KEYS.RESERVATIONS, INITIAL_RESERVATIONS);
      const res = reservations.find(r => r.id === resId);
      if (!res) return false;

      const items = getStored(DB_KEYS.ITEMS, INITIAL_ITEMS);
      const item = items.find(it => it.id === res.itemId);
      if (item) {
        item.reservedQty = Math.max(0, Math.round(((item.reservedQty || 0) - (res.reservedQty || 0)) * 10) / 10);
        setStored(DB_KEYS.ITEMS, items);
      }

      reservations = reservations.filter(r => r.id !== resId);
      setStored(DB_KEYS.RESERVATIONS, reservations);
      return true;
    },

    // ========================================================================
    // PERMITS & DELIVERY MANIFESTS (WOOD & MARBLE) WITH UNIVERSAL SEARCH
    // ========================================================================
    generateNextPermitNo(type = 'wood') {
      const year = new Date().getFullYear();
      if (type === 'wood') {
        const orders = getStored(DB_KEYS.WOOD_ORDERS, INITIAL_WOOD_ORDERS);
        return `FSH-WOD-${year}-${String(orders.length + 1).padStart(2, '0')}`;
      } else {
        const orders = getStored(DB_KEYS.MARBLE_ORDERS, INITIAL_MARBLE_ORDERS);
        return `FSH-MAR-${year}-${String(orders.length + 1).padStart(2, '0')}`;
      }
    },

    getWoodOrders(filter = {}) {
      let orders = getStored(DB_KEYS.WOOD_ORDERS, INITIAL_WOOD_ORDERS);
      const defaultJobTypes = [
        'خزانة خشبية',
        'تصنيع وتركيب أبواب',
        'مطابخ وخزائن',
        'ديكورات وتكسيات',
        'أثاث مخصص'
      ];

      let updated = false;
      orders.forEach((o, i) => {
        if (!o.workType || o.workType === 'General Woodwork' || o.workType === 'أعمال خشبية عامة' || o.workTypeAr === 'أعمال خشبية عامة' || o.workType === 'أعمال خشبية' || o.workTypeAr === 'أعمال خشبية') {
          const sampleType = defaultJobTypes[i % defaultJobTypes.length];
          o.workType = sampleType;
          o.workTypeAr = sampleType;
          updated = true;
        }
      });
      if (updated) {
        setStored(DB_KEYS.WOOD_ORDERS, orders);
      }

      if (filter.status && filter.status !== 'all') {
        orders = orders.filter(o => o.status === filter.status);
      }

      if (filter.search) {
        const s = filter.search.toLowerCase().trim();
        orders = orders.filter(o =>
          (o.permitNo && o.permitNo.toLowerCase().includes(s)) ||
          (o.orderNo && o.orderNo.toLowerCase().includes(s)) ||
          (o.buyerName && o.buyerName.toLowerCase().includes(s)) ||
          (o.buyerNameAr && o.buyerNameAr.toLowerCase().includes(s)) ||
          (o.clientName && o.clientName.toLowerCase().includes(s)) ||
          (o.clientNameAr && o.clientNameAr.toLowerCase().includes(s)) ||
          (o.workType && o.workType.toLowerCase().includes(s)) ||
          (o.workTypeAr && o.workTypeAr.toLowerCase().includes(s)) ||
          (o.repName && o.repName.toLowerCase().includes(s)) ||
          (o.repNameAr && o.repNameAr.toLowerCase().includes(s)) ||
          (o.phone && o.phone.toLowerCase().includes(s)) ||
          (o.expectedDate && o.expectedDate.includes(s)) ||
          (o.dayOfWeek && o.dayOfWeek.toLowerCase().includes(s))
        );
      }

      return orders;
    },

    getWoodOrderById(id) {
      const orders = getStored(DB_KEYS.WOOD_ORDERS, INITIAL_WOOD_ORDERS);
      return orders.find(o => o.id === id) || null;
    },

    addWoodOrder(data) {
      const orders = getStored(DB_KEYS.WOOD_ORDERS, INITIAL_WOOD_ORDERS);
      const count = orders.length + 1;
      const permitNo = data.permitNo && data.permitNo.trim()
        ? data.permitNo.trim()
        : this.generateNextPermitNo('wood');

      const workType = data.workType && data.workType.trim() ? data.workType.trim() : 'خزانة';

      const newOrder = {
        id: `wod-${Date.now()}`,
        permitNo,
        orderNo: `WOD-${100 + count}`,
        repName: data.repName,
        repNameAr: data.repName,
        clientName: data.clientName,
        clientNameAr: data.clientName,
        buyerName: data.buyerName,
        buyerNameAr: data.buyerName,
        workType: workType,
        workTypeAr: workType,
        phone: data.phone,
        expectedDate: data.expectedDate,
        dayOfWeek: data.dayOfWeek || '',
        status: 'Scheduled',
        createdAt: new Date().toISOString()
      };
      orders.unshift(newOrder);
      setStored(DB_KEYS.WOOD_ORDERS, orders);
      return newOrder;
    },

    updateWoodOrder(id, updates) {
      const orders = getStored(DB_KEYS.WOOD_ORDERS, INITIAL_WOOD_ORDERS);
      const idx = orders.findIndex(o => o.id === id);
      if (idx !== -1) {
        orders[idx] = {
          ...orders[idx],
          ...updates,
          repNameAr: updates.repName || orders[idx].repNameAr,
          clientNameAr: updates.clientName || orders[idx].clientNameAr,
          buyerNameAr: updates.buyerName || orders[idx].buyerNameAr,
          workType: updates.workType || orders[idx].workType,
          workTypeAr: updates.workType || orders[idx].workTypeAr
        };
        setStored(DB_KEYS.WOOD_ORDERS, orders);
        return orders[idx];
      }
      throw new Error('Wood order not found');
    },

    deleteWoodOrder(id) {
      let orders = getStored(DB_KEYS.WOOD_ORDERS, INITIAL_WOOD_ORDERS);
      orders = orders.filter(o => o.id !== id);
      setStored(DB_KEYS.WOOD_ORDERS, orders);
      return true;
    },

    getMarbleOrders(filter = {}) {
      let orders = getStored(DB_KEYS.MARBLE_ORDERS, INITIAL_MARBLE_ORDERS);

      if (filter.status && filter.status !== 'all') {
        orders = orders.filter(o => o.status === filter.status);
      }

      if (filter.search) {
        const s = filter.search.toLowerCase().trim();
        orders = orders.filter(o =>
          (o.permitNo && o.permitNo.toLowerCase().includes(s)) ||
          (o.orderNo && o.orderNo.toLowerCase().includes(s)) ||
          (o.buyerName && o.buyerName.toLowerCase().includes(s)) ||
          (o.buyerNameAr && o.buyerNameAr.toLowerCase().includes(s)) ||
          (o.clientName && o.clientName.toLowerCase().includes(s)) ||
          (o.clientNameAr && o.clientNameAr.toLowerCase().includes(s)) ||
          (o.repName && o.repName.toLowerCase().includes(s)) ||
          (o.repNameAr && o.repNameAr.toLowerCase().includes(s)) ||
          (o.phone && o.phone.toLowerCase().includes(s)) ||
          (o.expectedDate && o.expectedDate.includes(s)) ||
          (o.dayOfWeek && o.dayOfWeek.toLowerCase().includes(s))
        );
      }

      return orders;
    },

    getMarbleOrderById(id) {
      const orders = getStored(DB_KEYS.MARBLE_ORDERS, INITIAL_MARBLE_ORDERS);
      return orders.find(o => o.id === id) || null;
    },

    addMarbleOrder(data) {
      const orders = getStored(DB_KEYS.MARBLE_ORDERS, INITIAL_MARBLE_ORDERS);
      const count = orders.length + 1;
      const permitNo = data.permitNo && data.permitNo.trim()
        ? data.permitNo.trim()
        : this.generateNextPermitNo('marble');

      const newOrder = {
        id: `mod-${Date.now()}`,
        permitNo,
        orderNo: `MOD-${200 + count}`,
        repName: data.repName,
        repNameAr: data.repName,
        clientName: data.clientName,
        clientNameAr: data.clientName,
        buyerName: data.buyerName,
        buyerNameAr: data.buyerName,
        phone: data.phone,
        expectedDate: data.expectedDate,
        dayOfWeek: data.dayOfWeek || '',
        status: 'Scheduled',
        createdAt: new Date().toISOString()
      };
      orders.unshift(newOrder);
      setStored(DB_KEYS.MARBLE_ORDERS, orders);
      return newOrder;
    },

    updateMarbleOrder(id, updates) {
      const orders = getStored(DB_KEYS.MARBLE_ORDERS, INITIAL_MARBLE_ORDERS);
      const idx = orders.findIndex(o => o.id === id);
      if (idx !== -1) {
        orders[idx] = {
          ...orders[idx],
          ...updates,
          repNameAr: updates.repName || orders[idx].repNameAr,
          clientNameAr: updates.clientName || orders[idx].clientNameAr,
          buyerNameAr: updates.buyerName || orders[idx].buyerNameAr
        };
        setStored(DB_KEYS.MARBLE_ORDERS, orders);
        return orders[idx];
      }
      throw new Error('Marble order not found');
    },

    deleteMarbleOrder(id) {
      let orders = getStored(DB_KEYS.MARBLE_ORDERS, INITIAL_MARBLE_ORDERS);
      orders = orders.filter(o => o.id !== id);
      setStored(DB_KEYS.MARBLE_ORDERS, orders);
      return true;
    },

    // ========================================================================
    // FIELD SERVICE & INSTALLATION MODULE
    // ========================================================================
    getFieldServices(filters = {}) {
      let list = getStored(DB_KEYS.FIELD_SERVICES, INITIAL_FIELD_SERVICES);
      const { status, technicianId, search, date } = filters;

      if (status && status !== 'all') {
        list = list.filter(item => item.status === status);
      }
      if (technicianId && technicianId !== 'all') {
        list = list.filter(item => item.technicianId === technicianId);
      }
      if (date) {
        list = list.filter(item => item.scheduledDate === date);
      }
      if (search && search.trim()) {
        const q = search.trim().toLowerCase();
        list = list.filter(item => 
          (item.permitNo && item.permitNo.toLowerCase().includes(q)) ||
          (item.clientName && item.clientName.toLowerCase().includes(q)) ||
          (item.buyerName && item.buyerName.toLowerCase().includes(q)) ||
          (item.technicianName && item.technicianName.toLowerCase().includes(q)) ||
          (item.phone && item.phone.toLowerCase().includes(q)) ||
          (item.workType && item.workType.toLowerCase().includes(q)) ||
          (item.address && item.address.toLowerCase().includes(q)) ||
          (item.notes && item.notes.toLowerCase().includes(q)) ||
          (item.returnReasonTextAr && item.returnReasonTextAr.toLowerCase().includes(q))
        );
      }
      return list;
    },

    getFieldServiceById(id) {
      const list = getStored(DB_KEYS.FIELD_SERVICES, INITIAL_FIELD_SERVICES);
      return list.find(item => item.id === id) || null;
    },

    fetchOrderByPermitNo(permitNo) {
      if (!permitNo || !permitNo.trim()) return null;
      const q = permitNo.trim().toLowerCase();

      // Search wood orders
      const woodOrders = getStored(DB_KEYS.WOOD_ORDERS, INITIAL_WOOD_ORDERS);
      const matchedWood = woodOrders.find(o => 
        (o.permitNo && o.permitNo.toLowerCase() === q) || 
        (o.orderNo && o.orderNo.toLowerCase() === q) ||
        (o.permitNo && o.permitNo.toLowerCase().includes(q))
      );
      if (matchedWood) {
        return {
          found: true,
          permitNo: matchedWood.permitNo || matchedWood.orderNo,
          orderType: 'wood',
          orderTypeAr: 'فسح خشب',
          clientName: matchedWood.clientNameAr || matchedWood.clientName,
          buyerName: matchedWood.buyerNameAr || matchedWood.buyerName || matchedWood.clientNameAr,
          showroom: matchedWood.clientNameAr || matchedWood.clientName,
          repName: matchedWood.repNameAr || matchedWood.repName,
          phone: matchedWood.phone || '',
          workType: matchedWood.workTypeAr || matchedWood.workType || 'أعمال وتكسيات خشبية',
          expectedDate: matchedWood.expectedDate,
          rawOrder: matchedWood
        };
      }

      // Search marble orders
      const marbleOrders = getStored(DB_KEYS.MARBLE_ORDERS, INITIAL_MARBLE_ORDERS);
      const matchedMarble = marbleOrders.find(o => 
        (o.permitNo && o.permitNo.toLowerCase() === q) || 
        (o.orderNo && o.orderNo.toLowerCase() === q) ||
        (o.permitNo && o.permitNo.toLowerCase().includes(q))
      );
      if (matchedMarble) {
        return {
          found: true,
          permitNo: matchedMarble.permitNo || matchedMarble.orderNo,
          orderType: 'marble',
          orderTypeAr: 'فسح رخام',
          clientName: matchedMarble.clientNameAr || matchedMarble.clientName,
          buyerName: matchedMarble.buyerNameAr || matchedMarble.buyerName || matchedMarble.clientNameAr,
          showroom: matchedMarble.clientNameAr || matchedMarble.clientName,
          repName: matchedMarble.repNameAr || matchedMarble.repName,
          phone: matchedMarble.phone || '',
          workType: matchedMarble.notes || 'توريد وتركيب رخام طبيعي',
          expectedDate: matchedMarble.expectedDate,
          rawOrder: matchedMarble
        };
      }

      return { found: false };
    },

    addFieldService(data) {
      const list = getStored(DB_KEYS.FIELD_SERVICES, INITIAL_FIELD_SERVICES);
      const newService = {
        id: `fs-${Date.now()}`,
        permitNo: (data.permitNo || `FSH-${Date.now().toString().slice(-4)}`).trim(),
        orderType: data.orderType || 'wood',
        orderTypeAr: data.orderType === 'marble' ? 'فسح رخام' : data.orderType === 'porcelain' ? 'فسح بورسلان' : 'فسح خشب',
        clientName: data.clientName || '',
        buyerName: data.buyerName || data.clientName || '',
        phone: data.phone || '',
        showroom: data.showroom || data.clientName || '',
        repName: data.repName || '',
        technicianId: data.technicianId || '',
        technicianName: data.technicianName || '',
        scheduledDate: data.scheduledDate || new Date().toISOString().split('T')[0],
        dayOfWeek: data.dayOfWeek || '',
        timeSlot: data.timeSlot || 'مرن / غير محدد',
        timeSlotTextAr: data.timeSlotTextAr || data.timeSlot || 'مرن / بحسب التنسيق',
        status: data.status || 'Scheduled',
        workType: data.workType || 'تركيب وتسليم ميداني',
        address: data.address || '',
        mapsUrl: data.mapsUrl || (data.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}` : ''),
        houseUrl: data.houseUrl || '',
        buildingPhoto: data.buildingPhoto || '',
        notes: data.notes || '',
        returnReason: null,
        returnNotes: null,
        returnTimestamp: null,
        rating: null,
        createdAt: new Date().toISOString()
      };
      list.unshift(newService);
      setStored(DB_KEYS.FIELD_SERVICES, list);
      return newService;
    },

    updateFieldService(id, updates) {
      const list = getStored(DB_KEYS.FIELD_SERVICES, INITIAL_FIELD_SERVICES);
      const idx = list.findIndex(item => item.id === id);
      if (idx !== -1) {
        list[idx] = {
          ...list[idx],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        setStored(DB_KEYS.FIELD_SERVICES, list);
        return list[idx];
      }
      throw new Error('Field service appointment not found');
    },

    deleteFieldService(id) {
      let list = getStored(DB_KEYS.FIELD_SERVICES, INITIAL_FIELD_SERVICES);
      list = list.filter(item => item.id !== id);
      setStored(DB_KEYS.FIELD_SERVICES, list);
      return true;
    },

    processOrderReturn(id, returnData) {
      const list = getStored(DB_KEYS.FIELD_SERVICES, INITIAL_FIELD_SERVICES);
      const idx = list.findIndex(item => item.id === id);
      if (idx !== -1) {
        const item = list[idx];
        const reason = returnData.reason || 'other';
        const reasonMap = {
          customer_no_answer: 'الزبون لم يرد على الهاتف بعد عدة محاولات',
          measurement_error: 'أخطاء في القياسات أو المقاسات غير مطابقة للموقع',
          site_not_ready: 'الموقع غير جاهز للتركيب (أعمال مدنية غير مكتملة)',
          material_defect: 'ملاحظة عيب فني أو كسر في المواد أثناء التسليم',
          client_rejection: 'طلب تعديل أو رفض استلام من العميل',
          client_postponed: 'تأجيل الموعد بناءً على طلب العميل المباشر',
          other: returnData.reasonTextAr || 'أسباب أخرى'
        };

        list[idx] = {
          ...item,
          status: 'Returned',
          returnReason: reason,
          returnReasonTextAr: reasonMap[reason] || returnData.reasonTextAr || reason,
          returnNotes: returnData.notes || '',
          rescheduledDate: returnData.rescheduledDate || null,
          returnTimestamp: new Date().toISOString()
        };
        setStored(DB_KEYS.FIELD_SERVICES, list);
        return list[idx];
      }
      throw new Error('Appointment not found for return processing');
    },

    // Technicians
    getTechnicians() {
      return getStored(DB_KEYS.TECHNICIANS, INITIAL_TECHNICIANS);
    },

    getTechnicianById(id) {
      const list = getStored(DB_KEYS.TECHNICIANS, INITIAL_TECHNICIANS);
      return list.find(t => t.id === id) || null;
    },

    addTechnician(data) {
      const list = getStored(DB_KEYS.TECHNICIANS, INITIAL_TECHNICIANS);
      const newTech = {
        id: `tech-${Date.now().toString().slice(-4)}`,
        name: data.name || 'فني تركيب جديد',
        nameEn: data.nameEn || data.name || 'Installation Tech',
        nameBn: data.nameBn || data.name || '',
        specialty: data.specialty || 'تركيب رخام وخشب وبورسلان',
        specialtyEn: data.specialtyEn || data.specialty || '',
        specialtyBn: data.specialtyBn || '',
        phone: data.phone || '',
        status: data.status || 'Available',
        avgRating: 5.0,
        ratingsCount: 0,
        totalJobs: 0,
        avatar: data.avatar || '👷‍♂️',
        createdAt: new Date().toISOString()
      };
      list.push(newTech);
      setStored(DB_KEYS.TECHNICIANS, list);
      return newTech;
    },

    updateTechnician(id, updates) {
      const list = getStored(DB_KEYS.TECHNICIANS, INITIAL_TECHNICIANS);
      const idx = list.findIndex(t => t.id === id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...updates };
        setStored(DB_KEYS.TECHNICIANS, list);
        return list[idx];
      }
      throw new Error('Technician not found');
    },

    rateTechnician(appointmentId, ratingData) {
      const services = getStored(DB_KEYS.FIELD_SERVICES, INITIAL_FIELD_SERVICES);
      const sIdx = services.findIndex(s => s.id === appointmentId);
      
      const score = Math.max(1, Math.min(5, Number(ratingData.score) || 5));
      const punctuality = Math.max(1, Math.min(5, Number(ratingData.punctualityScore) || score));

      const ratingObj = {
        score: score,
        punctualityScore: punctuality,
        feedback: ratingData.feedback || '',
        clientName: ratingData.clientName || '',
        createdAt: new Date().toISOString()
      };

      if (sIdx !== -1) {
        services[sIdx].rating = ratingObj;
        services[sIdx].status = 'Completed';
        setStored(DB_KEYS.FIELD_SERVICES, services);
      }

      // Update technician aggregate rating
      const techId = ratingData.technicianId || (sIdx !== -1 ? services[sIdx].technicianId : null);
      if (techId) {
        const techs = getStored(DB_KEYS.TECHNICIANS, INITIAL_TECHNICIANS);
        const tIdx = techs.findIndex(t => t.id === techId);
        if (tIdx !== -1) {
          const prevCount = techs[tIdx].ratingsCount || 0;
          const prevAvg = techs[tIdx].avgRating || 5;
          const newCount = prevCount + 1;
          const newAvg = Number(((prevAvg * prevCount + score) / newCount).toFixed(2));

          techs[tIdx].ratingsCount = newCount;
          techs[tIdx].avgRating = newAvg;
          techs[tIdx].totalJobs = (techs[tIdx].totalJobs || 0) + 1;
          setStored(DB_KEYS.TECHNICIANS, techs);
        }
      }

      return ratingObj;
    },

    // ========================================================================
    // USER ROLES & PERMISSIONS MANAGEMENT (OWNER CONTROL)
    // ========================================================================
    getUserRolesList() {
      const defaultRoles = [
        { email: 's@gmail.com', name: 'مهندس الإنتاج / المالك', role: 'production_engineer', isOwner: true, updatedAt: new Date().toISOString() },
        { email: 'admin@warehouse.local', name: 'المدير العام للمستودع', role: 'production_engineer', isOwner: false, updatedAt: new Date().toISOString() },
        { email: 'porcelain.sup@warehouse.local', name: 'مشرف مستودع البورسلان', role: 'supervisor_porcelain', isOwner: false, updatedAt: new Date().toISOString() },
        { email: 'marble.sup@warehouse.local', name: 'مشرف مستودع الرخام', role: 'supervisor_marble', isOwner: false, updatedAt: new Date().toISOString() },
        { email: 'field.sup@warehouse.local', name: 'مشرف الخدمات الميدانية', role: 'supervisor_field', isOwner: false, updatedAt: new Date().toISOString() },
        { email: 'tech.omran@warehouse.local', name: 'عمران الفاروق (فني تركيب)', role: 'technician', isOwner: false, updatedAt: new Date().toISOString() }
      ];
      return getStored('wms_user_roles_v6', defaultRoles);
    },

    setUserRole(email, role) {
      if (!email || !email.trim()) return;
      const cleanEmail = email.trim().toLowerCase();
      const list = this.getUserRolesList();
      const isOwner = (cleanEmail === 's@gmail.com');
      const finalRole = isOwner ? 'production_engineer' : role;
      
      const idx = list.findIndex(u => u.email.toLowerCase() === cleanEmail);
      if (idx !== -1) {
        list[idx].role = finalRole;
        list[idx].updatedAt = new Date().toISOString();
      } else {
        list.push({
          email: cleanEmail,
          name: cleanEmail.split('@')[0],
          role: finalRole,
          isOwner: isOwner,
          updatedAt: new Date().toISOString()
        });
      }
      setStored('wms_user_roles_v6', list);
      return list;
    },

    deleteUserRole(email) {
      if (!email) return;
      const cleanEmail = email.trim().toLowerCase();
      if (cleanEmail === 's@gmail.com') return;
      let list = this.getUserRolesList();
      list = list.filter(u => u.email.toLowerCase() !== cleanEmail);
      setStored('wms_user_roles_v6', list);
      return list;
    }
  };

  window.WMS_DB = WMS_DB;
})();

// ============================================================================
// Firebase V10 Modular SDK Initialization & Auth State Observer
// ============================================================================
const firebaseConfig = {
  apiKey: "AIzaSyDD2DDMeqTh9mfC2kbCIeo7BGCi37Kalso",
  authDomain: "my-project-4a10e.firebaseapp.com",
  projectId: "my-project-4a10e",
  storageBucket: "my-project-4a10e.firebasestorage.app",
  messagingSenderId: "342485426366",
  appId: "1:342485426366:web:e229f708a86ee04d86feef",
  measurementId: "G-HS3G0B2XTF"
};

// Initialize Firebase App, Auth, Firestore & Analytics
const app = initializeApp(firebaseConfig);

let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (err) {
  console.warn("Firebase Analytics could not be initialized:", err);
}

const auth = getAuth(app);
const firestoreDb = getFirestore(app);

// State flags for auth mode and signup redirect flow
let isSigningUp = false;
let currentAuthMode = 'login'; // 'login' or 'signup'

// Warehouse Business Roles Definition (3 Role Levels: viewer, admin, owner)
const WMS_ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  VIEWER: 'viewer',
  PRODUCTION_ENGINEER: 'owner',
  SUPERVISOR_PORCELAIN: 'admin',
  SUPERVISOR_MARBLE: 'admin',
  SUPERVISOR_FIELD: 'admin',
  TECHNICIAN: 'viewer'
};

// Helper: Standardized User Object Creator with Warehouse Role-Based Permissions
function createAuthUser(email, displayName, customRole = null) {
  const isOwnerEmail = email && (email.toLowerCase().trim() === 's@gmail.com');
  const isHardAdmin = email && (email.toLowerCase().trim() === 'admin');
  
  let role = 'viewer';
  if (isOwnerEmail) {
    role = 'owner';
  } else if (isHardAdmin) {
    role = 'admin';
  } else if (customRole) {
    role = customRole.toLowerCase();
    if (role === 'production_engineer') role = 'owner';
  }

  const isOwner = (role === 'owner' || isOwnerEmail);
  const isAdmin = (role === 'admin' || isHardAdmin);
  const isViewer = (role === 'viewer');

  let roleTitleAr = 'مشاهد (قراءة فقط)';
  let roleTitleEn = 'Viewer (Read Only)';
  let roleTitleBn = 'দর্শক (শুধুমাত্র দেখার অনুমতি)';

  if (isOwner) {
    roleTitleAr = 'المالك / صاحب المنشأة (Owner)';
    roleTitleEn = 'Owner (Full Access & Role Management)';
    roleTitleBn = 'মালিক (Owner)';
  } else if (isAdmin) {
    roleTitleAr = 'المدير العام (Admin)';
    roleTitleEn = 'Administrator (Full Access & Broadcasts)';
    roleTitleBn = 'অ্যাডমিন (Admin)';
  }

  return { 
    username: email, 
    email: email,
    name: displayName || (isOwner ? 'المالك (Owner)' : (isAdmin ? 'المدير (Admin)' : (email ? email.split('@')[0] : 'viewer'))),
    role: isOwner ? 'owner' : (isAdmin ? 'admin' : 'viewer'),
    roleTitleAr: roleTitleAr,
    roleTitleEn: roleTitleEn,
    roleTitleBn: roleTitleBn,
    allowedModules: ['*'],
    fullAccess: isOwner || isAdmin,
    canAdjustStock: isOwner || isAdmin,
    canEditAll: isOwner || isAdmin,
    canWrite: !isViewer,
    canRead: true,
    isOwner: isOwner
  };
}

// Role-Based Access Control: Fetch role from Firestore users collection & Owner local assignments
async function fetchUserRole(user) {
  if (!user) return 'viewer';
  const isOwner = user.email && (user.email.toLowerCase().trim() === 's@gmail.com');
  if (isOwner) return 'owner';
  if (user.email && user.email.toLowerCase().trim() === 'admin') return 'admin';

  // 1. Check Owner Assigned User Roles in WMS_DB
  if (window.WMS_DB && user.email && typeof window.WMS_DB.getUserRolesList === 'function') {
    const rolesList = window.WMS_DB.getUserRolesList();
    const matched = rolesList.find(u => u.email.toLowerCase() === user.email.toLowerCase().trim());
    if (matched && matched.role) {
      console.log(`👑 Found Owner Assigned Role for [${user.email}]: ${matched.role}`);
      let role = matched.role.toLowerCase();
      if (role === 'production_engineer') role = 'owner';
      if (!['viewer', 'admin', 'owner'].includes(role)) role = 'viewer';
      return role;
    }
  }

  if (!user.uid) return 'viewer';

  // 2. Fetch specific document from 'users' collection in Firestore
  try {
    if (firestoreDb) {
      const userDocRef = doc(firestoreDb, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        let role = (userData.role || 'viewer').toLowerCase();
        if (role === 'production_engineer') role = 'owner';
        if (!['viewer', 'admin', 'owner'].includes(role)) role = 'viewer';
        console.log(`👤 Fetched role from Firestore for [${user.email}]: ${role}`);
        return role;
      } else {
        // Document does not exist yet; create with default role
        const defaultRole = isOwner ? 'owner' : 'viewer';
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          role: defaultRole,
          createdAt: new Date().toISOString()
        }, { merge: true });
        console.log(`👤 Created default user document for [${user.email}] with role: ${defaultRole}`);
        return defaultRole;
      }
    }
  } catch (err) {
    console.warn("Could not fetch user role from Firestore:", err);
  }
  return isOwner ? 'owner' : 'viewer';
}

// UI Permissions Engine: Controls HUD cards, Admin Dashboard and Messages based on warehouse role
function applyRolePermissions(role) {
  let normRole = (role || 'viewer').toLowerCase();
  if (normRole === 'production_engineer') normRole = 'owner';

  const isOwner = (normRole === 'owner');
  const isAdmin = (normRole === 'admin');
  const isViewer = (normRole === 'viewer');

  // 1. Set root attribute and classes
  document.documentElement.setAttribute('data-role', normRole);
  document.documentElement.classList.remove('is-admin-role', 'is-owner-role', 'is-viewer-role');

  if (isOwner) {
    document.documentElement.classList.add('is-owner-role', 'is-admin-role');
  } else if (isAdmin) {
    document.documentElement.classList.add('is-admin-role');
  } else {
    document.documentElement.classList.add('is-viewer-role');
  }

  // 2. Control Admin Dashboard UI (Visible ONLY for 'owner')
  const adminDashboardEl = document.getElementById("admin-dashboard");
  if (adminDashboardEl) {
    if (isOwner) {
      adminDashboardEl.style.display = "block";
      loadAdminDashboardUsers();
    } else {
      adminDashboardEl.style.display = "none";
    }
  }

  // 3. Control Messages Section & Input Visibility
  const messagesSectionEl = document.getElementById("messages-section");
  const messageInputEl = document.getElementById("message-input");
  const btnSendMessageEl = document.getElementById("btn-send-message");
  const messageFormEl = document.getElementById("message-form");

  if (messagesSectionEl) {
    messagesSectionEl.style.display = "block";
  }

  if (isViewer) {
    // Viewer: Read-only messages list (hide input and send button)
    if (messageInputEl) messageInputEl.style.display = "none";
    if (btnSendMessageEl) btnSendMessageEl.style.display = "none";
    if (messageFormEl) messageFormEl.style.display = "none";
  } else {
    // Admin or Owner: Full access to read and write messages
    if (messageInputEl) messageInputEl.style.display = "";
    if (btnSendMessageEl) btnSendMessageEl.style.display = "";
    if (messageFormEl) messageFormEl.style.display = "flex";
  }

  // 4. Control HUD Cards visibility (Accessible for all authenticated roles)
  const cardPorcelain = document.querySelector('.card-porcelain');
  const cardMarble = document.querySelector('.card-marble');
  const cardWoodDel = document.querySelector('.card-wood-del');
  const cardMarbleDel = document.querySelector('.card-marble-del');
  const cardFieldService = document.querySelector('.card-field-service');

  if (cardPorcelain) cardPorcelain.style.display = '';
  if (cardMarble) cardMarble.style.display = '';
  if (cardWoodDel) cardWoodDel.style.display = '';
  if (cardMarbleDel) cardMarbleDel.style.display = '';
  if (cardFieldService) cardFieldService.style.display = '';

  // 5. Update Mobile Dock tabs if mobile controller exists
  if (window.WMS_MOBILE && typeof window.WMS_MOBILE.updateRoleDock === 'function') {
    window.WMS_MOBILE.updateRoleDock(normRole);
  }

  console.log(`🔒 Role Permissions Applied: [${normRole}] (Owner: ${isOwner}, Admin: ${isAdmin}, Viewer: ${isViewer})`);
}

// Admin Dashboard: Fetch all documents from 'users' collection in Firestore
async function loadAdminDashboardUsers() {
  const tbody = document.getElementById("admin-dashboard-users-tbody");
  if (!tbody) return;

  try {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 1.25rem;">جاري جلب بيانات المستخدمين من Firestore...</td></tr>`;

    let users = [];

    if (firestoreDb) {
      try {
        const usersSnapshot = await getDocs(collection(firestoreDb, "users"));
        usersSnapshot.forEach(docSnap => {
          users.push({
            uid: docSnap.id,
            ...docSnap.data()
          });
        });
      } catch (err) {
        console.warn("Could not fetch users from Firestore:", err);
      }
    }

    // Fallback to local stored user roles if Firestore is empty or offline
    if (users.length === 0) {
      if (window.WMS_DB && typeof window.WMS_DB.getUserRolesList === 'function') {
        const localList = window.WMS_DB.getUserRolesList();
        users = localList.map((u, i) => ({
          uid: u.uid || `user-${i + 1}-${u.email.split('@')[0]}`,
          email: u.email,
          role: u.role
        }));
      }
    }

    if (users.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">لا يوجد مستخدمين مسجلين بعد في قاعدة البيانات.</td></tr>`;
      return;
    }

    tbody.innerHTML = users.map(user => {
      const userUid = user.uid || user.id || user.email;
      const userEmail = user.email || user.username || userUid;
      let currentRole = (user.role || 'viewer').toLowerCase();
      if (currentRole === 'production_engineer') currentRole = 'owner';
      if (!['viewer', 'admin', 'owner'].includes(currentRole)) currentRole = 'viewer';

      const isOwnerUser = (userEmail.toLowerCase().trim() === 's@gmail.com');

      let roleBadge = '<span style="color:#94a3b8; font-weight:700; background:rgba(148,163,184,0.15); padding:0.25rem 0.6rem; border-radius:4px;">👁️ viewer</span>';
      if (currentRole === 'owner') {
        roleBadge = '<span style="color:#fbbf24; font-weight:800; background:rgba(245,158,11,0.15); padding:0.25rem 0.6rem; border-radius:4px;">👑 owner</span>';
      } else if (currentRole === 'admin') {
        roleBadge = '<span style="color:#38bdf8; font-weight:800; background:rgba(56,189,248,0.15); padding:0.25rem 0.6rem; border-radius:4px;">🛡️ admin</span>';
      }

      return `
        <tr>
          <td>
            <strong style="color: var(--text-primary); font-size: 0.92rem;">${escapeHtml(userEmail)}</strong>
            ${isOwnerUser ? '<span style="background: rgba(245,158,11,0.2); color: #fbbf24; padding: 0.15rem 0.45rem; border-radius: 4px; font-size: 0.72rem; margin-right: 0.35rem; font-weight: 800;">المالك الأساسي</span>' : ''}
          </td>
          <td style="font-family: monospace; font-size: 0.8rem; color: var(--text-muted);">${escapeHtml(userUid)}</td>
          <td>${roleBadge}</td>
          <td>
            <select class="form-select" style="padding: 0.35rem 0.75rem; font-size: 0.85rem; width: auto; background: var(--bg-input); border-color: rgba(255,255,255,0.15);" onchange="handleAdminChangeUserRole('${escapeHtml(userUid)}', '${escapeHtml(userEmail)}', this.value)">
              <option value="viewer" ${currentRole === 'viewer' ? 'selected' : ''}>👁️ viewer (مشاهد)</option>
              <option value="admin" ${currentRole === 'admin' ? 'selected' : ''}>🛡️ admin (مدير)</option>
              <option value="owner" ${currentRole === 'owner' ? 'selected' : ''}>👑 owner (مالك)</option>
            </select>
          </td>
        </tr>
      `;
    }).join('');
  } catch (e) {
    console.error("Error in loadAdminDashboardUsers:", e);
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-danger); padding: 1rem;">خطأ في تحميل المستخدمين: ${e.message}</td></tr>`;
  }
}

// Change user role directly in Firestore 'users' collection
async function handleAdminChangeUserRole(uid, email, newRole) {
  try {
    if (firestoreDb && uid) {
      const userDocRef = doc(firestoreDb, "users", uid);
      await setDoc(userDocRef, {
        uid: uid,
        email: email,
        role: newRole,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      console.log(`👤 Updated user role in Firestore: [${email}] (${uid}) -> ${newRole}`);
    }

    if (window.WMS_DB && typeof window.WMS_DB.setUserRole === 'function') {
      window.WMS_DB.setUserRole(email, newRole);
    }

    if (window.showToast) {
      window.showToast(`تم تغيير دور [${email}] إلى [${newRole}] في Firestore بنجاح! 👑`, 'success');
    }

    loadAdminDashboardUsers();
  } catch (error) {
    console.error("Error updating user role in Firestore:", error);
    if (window.showToast) {
      window.showToast(`فشل تحديث الصلاحية: ${error.message}`, 'danger');
    }
  }
}

window.WMS_ROLES = WMS_ROLES;
window.fetchUserRole = fetchUserRole;
window.applyRolePermissions = applyRolePermissions;
window.loadAdminDashboardUsers = loadAdminDashboardUsers;
window.handleAdminChangeUserRole = handleAdminChangeUserRole;

// Helper: Show custom HUD alert inside the Login Card
function showAuthHUDMessage(message, type = 'info') {
  const alertBox = document.getElementById("auth-hud-alert");
  if (!alertBox) {
    if (window.showToast) window.showToast(message, type === 'danger' ? 'danger' : 'info');
    return;
  }

  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'danger') icon = '⚠️';
  if (type === 'warning') icon = '⚡';

  alertBox.className = `auth-hud-alert alert-${type}`;
  alertBox.innerHTML = `
    <div class="auth-hud-alert-inner">
      <span class="auth-hud-alert-icon">${icon}</span>
      <span class="auth-hud-alert-text">${message.replace(/\n/g, '<br>')}</span>
      <button type="button" class="auth-hud-alert-close" onclick="this.parentElement.parentElement.style.display='none'">✕</button>
    </div>
  `;
  alertBox.style.display = 'block';
  alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Helper: Switch Auth Mode (Login / Sign Up)
function switchAuthMode(mode) {
  currentAuthMode = mode === 'signup' ? 'signup' : 'login';
  const loginTab = document.getElementById('auth-tab-login');
  const signupTab = document.getElementById('auth-tab-signup');
  const confirmPwdGroup = document.getElementById('auth-confirm-password-group');
  const loginOptions = document.getElementById('auth-login-options');
  const btnLogin = document.getElementById('btn-login');
  const btnOwnerLogin = document.getElementById('btn-owner-login');
  const btnSignup = document.getElementById('btn-signup');
  const signupNote = document.getElementById('auth-signup-note');
  const alertBox = document.getElementById('auth-hud-alert');

  if (alertBox) alertBox.style.display = 'none';

  if (currentAuthMode === 'signup') {
    if (loginTab) loginTab.classList.remove('active');
    if (signupTab) signupTab.classList.add('active');
    if (confirmPwdGroup) confirmPwdGroup.style.display = 'block';
    if (loginOptions) loginOptions.style.display = 'none';
    if (btnLogin) btnLogin.style.display = 'none';
    if (btnOwnerLogin) btnOwnerLogin.style.display = 'none';
    if (btnSignup) btnSignup.style.display = 'flex';
    if (signupNote) signupNote.style.display = 'block';
  } else {
    if (signupTab) signupTab.classList.remove('active');
    if (loginTab) loginTab.classList.add('active');
    if (confirmPwdGroup) confirmPwdGroup.style.display = 'none';
    if (loginOptions) loginOptions.style.display = 'flex';
    if (btnLogin) btnLogin.style.display = 'flex';
    if (btnOwnerLogin) btnOwnerLogin.style.display = 'flex';
    if (btnSignup) btnSignup.style.display = 'none';
    if (signupNote) signupNote.style.display = 'none';
  }
}

// Helper: Toggle Password Visibility (Eye icon)
function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🔒';
    btn.title = 'إخفاء كلمة المرور';
  } else {
    input.type = 'password';
    btn.textContent = '👁';
    btn.title = 'إظهار كلمة المرور';
  }
}

// Helper: Loading Button State
function setAuthLoading(isLoading, text = "") {
  const btnLogin = document.getElementById("btn-login");
  const btnSignup = document.getElementById("btn-signup");
  const activeBtn = (btnLogin && btnLogin.style.display !== "none") ? btnLogin : btnSignup;

  if (activeBtn) {
    if (isLoading) {
      activeBtn.disabled = true;
      if (!activeBtn.dataset.originalHtml) {
        activeBtn.dataset.originalHtml = activeBtn.innerHTML;
      }
      activeBtn.innerHTML = `<span class="auth-spinner"></span> <span>${text || 'جاري المعالجة...'}</span>`;
    } else {
      activeBtn.disabled = false;
      if (activeBtn.dataset.originalHtml) {
        activeBtn.innerHTML = activeBtn.dataset.originalHtml;
      }
    }
  }
}

// Synchronize auth state immediately on script load to prevent flicker/kick back
(function syncInitialAuthState() {
  try {
    const localUser = window.WMS_DB ? window.WMS_DB.getAuthUser() : JSON.parse(localStorage.getItem('wms_auth_user_v6') || 'null');
    const authSection = document.getElementById("auth-section");
    const appSection = document.getElementById("app-section");
    if (localUser) {
      if (document.documentElement) document.documentElement.classList.add('is-authenticated');
      if (authSection) authSection.style.display = "none";
      if (appSection) appSection.style.display = "block";
    }
  } catch (e) {}
})();

// Authentication: Sign Up
async function handleSignUp(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();

  const emailInput = document.getElementById("auth-email");
  const passwordInput = document.getElementById("auth-password");
  const confirmPasswordInput = document.getElementById("auth-password-confirm");

  const email = emailInput ? emailInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value : "";
  const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : "";

  if (!email || !password) {
    showAuthHUDMessage("يرجى إدخال البريد الإلكتروني وكلمة المرور للمتابعة!", "warning");
    return;
  }

  if (password.length < 6) {
    showAuthHUDMessage("تنبيه: يجب ألا تقل كلمة المرور عن 6 خانات (شروط Firebase).", "warning");
    if (passwordInput) passwordInput.focus();
    return;
  }

  if (confirmPasswordInput && password !== confirmPassword) {
    showAuthHUDMessage("كلمتا المرور غير متطابقتين! يرجى التأكد من كتابة كلمة المرور وتأكيدها بدقة.", "danger");
    if (confirmPasswordInput) confirmPasswordInput.focus();
    return;
  }

  try {
    isSigningUp = true;
    setAuthLoading(true, "جاري إنشاء الحساب الجديد...");

    // Create user in Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const registeredEmail = user ? user.email : email;

    // Determine default role: s@gmail.com is owner, otherwise default to 'viewer'
    const isOwner = (registeredEmail.toLowerCase().trim() === 's@gmail.com');
    const defaultRole = isOwner ? 'owner' : 'viewer';

    // Automatically create a document for them in the 'users' collection with user.uid as document ID
    if (firestoreDb && user && user.uid) {
      try {
        await setDoc(doc(firestoreDb, "users", user.uid), {
          uid: user.uid,
          email: registeredEmail,
          role: defaultRole,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        }, { merge: true });
        console.log(`👤 Created user profile in Firestore for [${user.uid}] with default role: ${defaultRole}`);
      } catch (errDoc) {
        console.warn("Could not save user document to Firestore:", errDoc);
      }
    }

    // IMPORTANT: Sign out immediately so user is NOT logged in automatically
    await signOut(auth);
    isSigningUp = false;

    // Reset local database storage user state
    if (window.WMS_DB) {
      window.WMS_DB.setAuthUser(null);
    }
    if (document.documentElement) {
      document.documentElement.classList.remove('is-authenticated');
    }

    // Switch back to Login Tab view
    switchAuthMode('login');

    // Fill the registered email, clear passwords, and focus password input
    if (emailInput) emailInput.value = registeredEmail;
    if (passwordInput) {
      passwordInput.value = "";
      passwordInput.focus();
    }
    if (confirmPasswordInput) confirmPasswordInput.value = "";

    // Show prominent success notification requesting explicit login
    const successMsg = `تم إنشاء الحساب بنجاح (${registeredEmail})! 🎉\nيرجى إدخال كلمة المرور الآن لتسجيل الدخول والمتابعة.`;
    showAuthHUDMessage(successMsg, "success");

    if (window.showToast) {
      window.showToast("تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول.", "success");
    }
  } catch (error) {
    isSigningUp = false;
    console.error("Sign Up Error:", error);
    let msg = error.message;
    if (error.code === 'auth/operation-not-allowed') {
      msg = "تنبيه مهم: يرجى تفعيل طريقة الدخول 'Email/Password' من لوحة تحكم Firebase:\nFirebase Console -> Authentication -> Sign-in method -> Email/Password -> Enable.";
    } else if (error.code === 'auth/email-already-in-use') {
      msg = "هذا البريد الإلكتروني مسجل بالفعل! اضغط على تبويب 'تسجيل الدخول' وسجل دخولك مباشرة.";
    } else if (error.code === 'auth/invalid-email') {
      msg = "صيغة البريد الإلكتروني المدخل غير صحيحة.";
    } else if (error.code === 'auth/weak-password') {
      msg = "كلمة المرور ضعيفة، يرجى اختيار كلمة مرور أكثر أماناً.";
    } else {
      msg = `فشل إنشاء الحساب: ${error.message} (${error.code || ''})`;
    }
    showAuthHUDMessage(msg, "danger");
    if (window.showToast) window.showToast(msg, "danger");
  } finally {
    setAuthLoading(false);
  }
}

// Realtime Cloud Database Sync Engine (Firestore multi-device synchronization)
// Ensures orders, materials, leftovers, and reservations update instantly across all devices
let unsubscribeCloudSync = null;
let cloudPushDebounceTimer = null;

window._triggerCloudSyncPush = function(key, val) {
  if (cloudPushDebounceTimer) clearTimeout(cloudPushDebounceTimer);
  cloudPushDebounceTimer = setTimeout(async () => {
    try {
      if (!firestoreDb || !window.WMS_DB) return;
      const storeRef = doc(firestoreDb, "wms_cloud_data", "main_store");
      
      const payload = {
        items: window.WMS_DB.getStored("wms_items_v6", []),
        leftovers: window.WMS_DB.getStored("wms_leftovers_v6", []),
        reservations: window.WMS_DB.getStored("wms_reservations_v6", []),
        woodOrders: window.WMS_DB.getStored("wms_wood_orders_v6", []),
        marbleOrders: window.WMS_DB.getStored("wms_marble_orders_v6", []),
        fieldServices: window.WMS_DB.getStored("wms_field_services_v6", []),
        technicians: window.WMS_DB.getStored("wms_technicians_v6", []),
        presets: window.WMS_DB.getStored("wms_presets_v6", {}),
        lastSyncTimestamp: Date.now()
      };
      
      await setDoc(storeRef, payload, { merge: true });
      console.log("☁️ Realtime Cloud Sync: successfully synced changes to Firestore.");
    } catch (err) {
      console.warn("Cloud push note:", err);
    }
  }, 40);
};

function initCloudDatabaseListener() {
  if (unsubscribeCloudSync || !firestoreDb) return;

  try {
    const storeRef = doc(firestoreDb, "wms_cloud_data", "main_store");
    
    unsubscribeCloudSync = onSnapshot(storeRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        window._isApplyingCloudSync = true;
        
        let changed = false;
        if (Array.isArray(data.items) && window.WMS_DB) {
          window.WMS_DB.setStored("wms_items_v6", data.items);
          changed = true;
        }
        if (Array.isArray(data.leftovers) && window.WMS_DB) {
          window.WMS_DB.setStored("wms_leftovers_v6", data.leftovers);
          changed = true;
        }
        if (Array.isArray(data.reservations) && window.WMS_DB) {
          window.WMS_DB.setStored("wms_reservations_v6", data.reservations);
          changed = true;
        }
        if (Array.isArray(data.woodOrders) && window.WMS_DB) {
          window.WMS_DB.setStored("wms_wood_orders_v6", data.woodOrders);
          changed = true;
        }
        if (Array.isArray(data.marbleOrders) && window.WMS_DB) {
          window.WMS_DB.setStored("wms_marble_orders_v6", data.marbleOrders);
          changed = true;
        }
        if (Array.isArray(data.fieldServices) && window.WMS_DB) {
          window.WMS_DB.setStored("wms_field_services_v6", data.fieldServices);
          changed = true;
        }
        if (Array.isArray(data.technicians) && window.WMS_DB) {
          window.WMS_DB.setStored("wms_technicians_v6", data.technicians);
          changed = true;
        }
        if (data.presets && typeof data.presets === 'object' && window.WMS_DB) {
          window.WMS_DB.setStored("wms_presets_v6", data.presets);
          changed = true;
        }
        
        window._isApplyingCloudSync = false;

        if (changed && window.WMS_APP) {
          if (typeof window.WMS_APP.onCloudDataReceived === 'function') {
            window.WMS_APP.onCloudDataReceived();
          }
        }
      } else {
        // Initial sync push to seed cloud on new project
        window._triggerCloudSyncPush();
      }
    }, (err) => {
      console.warn("Cloud realtime sync listener notice:", err);
    });
  } catch (e) {
    console.warn("Cloud listener init notice:", e);
  }
}

// Start cloud sync immediately
initCloudDatabaseListener();

// Authentication: Log In
async function handleLogIn(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();

  const emailInput = document.getElementById("auth-email");
  const passwordInput = document.getElementById("auth-password");

  const email = emailInput ? emailInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value : "";

  if (!email) {
    showAuthHUDMessage("يرجى إدخال البريد الإلكتروني للمتابعة!", "warning");
    if (emailInput) emailInput.focus();
    return;
  }

  const isOwner = (email.toLowerCase().trim() === 's@gmail.com');
  const isAdmin = (email.toLowerCase().trim() === 'admin');

  try {
    setAuthLoading(true, "جاري التحقق وتسجيل الدخول...");
    
    let fbUser = null;

    // 1. Try Firebase Authentication if password is provided
    if (password && !isAdmin) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        fbUser = userCredential.user;
      } catch (fbErr) {
        console.warn("Firebase sign in note:", fbErr.code);
        // If account is s@gmail.com and not registered on Firebase yet, attempt auto-create
        if (isOwner && (fbErr.code === 'auth/user-not-found' || fbErr.code === 'auth/invalid-credential')) {
          try {
            const newCred = await createUserWithEmailAndPassword(auth, email, password);
            fbUser = newCred.user;
          } catch (createErr) {
            console.warn("Auto create notice:", createErr);
          }
        }
      }
    }

    // 2. Fetch role and set authenticated session in WMS engine
    let userRole = 'viewer';
    if (isOwner) {
      userRole = 'owner';
    } else if (isAdmin) {
      userRole = 'admin';
    } else if (fbUser) {
      userRole = await fetchUserRole(fbUser);
    }

    const authUser = createAuthUser(email, fbUser ? fbUser.displayName : '', userRole);
    if (window.WMS_DB) {
      window.WMS_DB.setAuthUser(authUser);
    }

    if (document.documentElement) {
      document.documentElement.classList.add('is-authenticated');
    }

    const authSection = document.getElementById("auth-section");
    const appSection = document.getElementById("app-section");
    if (authSection) authSection.style.display = "none";
    if (appSection) appSection.style.display = "block";

    if (passwordInput) passwordInput.value = "";

    // Apply role-based UI permissions (hide inputs for viewer, show for admin)
    applyRolePermissions(userRole);

    if (window.WMS_APP) {
      if (typeof window.WMS_APP.updateUserHeader === 'function') {
        window.WMS_APP.updateUserHeader();
      }
      window.WMS_APP.navigate('hud');
    }

    // Ensure cloud sync is listening
    initCloudDatabaseListener();

    if (window.showToast) {
      const welcomeMsg = isOwner 
        ? `مرحباً بك يا صاحب المنشأة! تم تسجيل الدخول بصلاحيات المالك الكاملة (${authUser.email}) 👑`
        : (userRole === 'admin' 
          ? `تم تسجيل الدخول بنجاح كمدير عام (${authUser.email}) 🛡️` 
          : `تم تسجيل الدخول بصلاحية مشاهد (${authUser.email}) 👁️`);
      window.showToast(welcomeMsg, "success");
    }
  } catch (error) {
    console.error("Log In Error:", error);
    showAuthHUDMessage(`فشل تسجيل الدخول: ${error.message}`, "danger");
  } finally {
    setAuthLoading(false);
  }
}

// Quick Login: مهندس الإنتاج / صاحب المنشأة (Full Access)
function handleOwnerQuickLogin(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();

  if (window.WMS_DB) {
    const authUser = createAuthUser('s@gmail.com', 'مهندس الإنتاج (s@gmail.com)', WMS_ROLES.PRODUCTION_ENGINEER);
    window.WMS_DB.setAuthUser(authUser);

    if (document.documentElement) {
      document.documentElement.classList.add('is-authenticated');
    }
    const authSection = document.getElementById("auth-section");
    const appSection = document.getElementById("app-section");
    if (authSection) authSection.style.display = "none";
    if (appSection) appSection.style.display = "block";

    applyRolePermissions(WMS_ROLES.PRODUCTION_ENGINEER);

    if (window.WMS_APP) {
      if (typeof window.WMS_APP.updateUserHeader === 'function') {
        window.WMS_APP.updateUserHeader();
      }
      window.WMS_APP.navigate('hud');
      if (window.showToast) {
        window.showToast('مرحباً بك يا مهندس الإنتاج! تم تسجيل الدخول بصلاحيات المالك الكاملة لجميع الأقسام 👑', 'success');
      }
    }

    initCloudDatabaseListener();
  }
}

// Quick Login: مشرف مستودع البورسلان (Porcelain Only)
function handlePorcelainSupervisorLogin(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();

  if (window.WMS_DB) {
    const authUser = createAuthUser('porcelain.sup@warehouse.local', 'مشرف مستودع البورسلان', WMS_ROLES.SUPERVISOR_PORCELAIN);
    window.WMS_DB.setAuthUser(authUser);

    if (document.documentElement) {
      document.documentElement.classList.add('is-authenticated');
    }
    const authSection = document.getElementById("auth-section");
    const appSection = document.getElementById("app-section");
    if (authSection) authSection.style.display = "none";
    if (appSection) appSection.style.display = "block";

    applyRolePermissions(WMS_ROLES.SUPERVISOR_PORCELAIN);

    if (window.WMS_APP) {
      if (typeof window.WMS_APP.updateUserHeader === 'function') {
        window.WMS_APP.updateUserHeader();
      }
      // Navigate directly to Porcelain module
      window.WMS_APP.navigate('porcelain');
      if (window.showToast) {
        window.showToast('مرحباً! تم تسجيل الدخول كمشرف مستودع البورسلان (حركات البورسلان فقط) 🏛️', 'info');
      }
    }

    initCloudDatabaseListener();
  }
}

// Quick Login: مشرف مستودع الرخام (Marble Only)
function handleMarbleSupervisorLogin(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();

  if (window.WMS_DB) {
    const authUser = createAuthUser('marble.sup@warehouse.local', 'مشرف مستودع الرخام', WMS_ROLES.SUPERVISOR_MARBLE);
    window.WMS_DB.setAuthUser(authUser);

    if (document.documentElement) {
      document.documentElement.classList.add('is-authenticated');
    }
    const authSection = document.getElementById("auth-section");
    const appSection = document.getElementById("app-section");
    if (authSection) authSection.style.display = "none";
    if (appSection) appSection.style.display = "block";

    applyRolePermissions(WMS_ROLES.SUPERVISOR_MARBLE);

    if (window.WMS_APP) {
      if (typeof window.WMS_APP.updateUserHeader === 'function') {
        window.WMS_APP.updateUserHeader();
      }
      // Navigate directly to Marble module
      window.WMS_APP.navigate('marble');
      if (window.showToast) {
        window.showToast('مرحباً! تم تسجيل الدخول كمشرف مستودع الرخام (حركات الرخام فقط) 💎', 'info');
      }
    }

    initCloudDatabaseListener();
  }
}

// Quick Login: مشرف الفسوحات والخدمات الميدانية (Field Service Supervisor)
function handleFieldSupervisorLogin(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();

  if (window.WMS_DB) {
    const authUser = createAuthUser('field.sup@warehouse.local', 'مشرف الفسوحات والميدان', WMS_ROLES.SUPERVISOR_FIELD);
    window.WMS_DB.setAuthUser(authUser);

    if (document.documentElement) {
      document.documentElement.classList.add('is-authenticated');
    }
    const authSection = document.getElementById("auth-section");
    const appSection = document.getElementById("app-section");
    if (authSection) authSection.style.display = "none";
    if (appSection) appSection.style.display = "block";

    applyRolePermissions(WMS_ROLES.SUPERVISOR_FIELD);

    if (window.WMS_APP) {
      if (typeof window.WMS_APP.updateUserHeader === 'function') {
        window.WMS_APP.updateUserHeader();
      }
      window.WMS_APP.navigate('field-service');
      if (window.showToast) {
        window.showToast('تم تسجيل الدخول كمشرف الفسوحات والخدمات الميدانية 🛠️', 'info');
      }
    }

    initCloudDatabaseListener();
  }
}

// Quick Login: فني التركيب الميداني (Technician)
function handleTechnicianLogin(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();

  if (window.WMS_DB) {
    const authUser = createAuthUser('tech.omran@warehouse.local', 'عمران الفاروق (فني تركيب)', WMS_ROLES.TECHNICIAN);
    window.WMS_DB.setAuthUser(authUser);

    if (document.documentElement) {
      document.documentElement.classList.add('is-authenticated');
    }
    const authSection = document.getElementById("auth-section");
    const appSection = document.getElementById("app-section");
    if (authSection) authSection.style.display = "none";
    if (appSection) appSection.style.display = "block";

    applyRolePermissions(WMS_ROLES.TECHNICIAN);

    if (window.WMS_APP) {
      if (typeof window.WMS_APP.updateUserHeader === 'function') {
        window.WMS_APP.updateUserHeader();
      }
      window.WMS_APP.navigate('field-service');
      if (window.showToast) {
        window.showToast('مرحباً بك يا فني التركيب! يمكنك استعراض مهامك وروابط مواقع الخرائط 👷‍♂️📍', 'info');
      }
    }

    initCloudDatabaseListener();
  }
}

window.handleOwnerQuickLogin = handleOwnerQuickLogin;
window.handlePorcelainSupervisorLogin = handlePorcelainSupervisorLogin;
window.handleMarbleSupervisorLogin = handleMarbleSupervisorLogin;
window.handleFieldSupervisorLogin = handleFieldSupervisorLogin;
window.handleTechnicianLogin = handleTechnicianLogin;

// Forgot Password (Send Reset Email)
async function handleForgotPassword(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();

  const emailInput = document.getElementById("auth-email");
  const email = emailInput ? emailInput.value.trim() : "";

  if (!email) {
    showAuthHUDMessage("يرجى كتابة بريدك الإلكتروني أولاً في خانة البريد، ثم الضغط على 'نسيت كلمة المرور' لإرسال رابط الاستعادة.", "warning");
    if (emailInput) emailInput.focus();
    return;
  }

  try {
    setAuthLoading(true, "جاري إرسال رابط استعادة كلمة المرور...");
    await sendPasswordResetEmail(auth, email);
    showAuthHUDMessage(`تم إرسال رابط إعادة تعيين كلمة المرور بنجاح إلى: ${email}\nيرجى تفقد صندوق الوارد ومجلد الرسائل غير المرغوب فيها (Spam).`, "success");
    if (window.showToast) window.showToast("تم إرسال رابط استعادة كلمة المرور لبريدك.", "success");
  } catch (error) {
    console.error("Password reset error:", error);
    let msg = error.message;
    if (error.code === 'auth/user-not-found') {
      msg = "هذا البريد الإلكتروني غير مسجل في النظام. يرجى إنشاء حساب جديد أولاً.";
    } else if (error.code === 'auth/invalid-email') {
      msg = "صيغة البريد الإلكتروني غير صحيحة.";
    } else {
      msg = `تعذر إرسال الرابط: ${error.message}`;
    }
    showAuthHUDMessage(msg, "danger");
  } finally {
    setAuthLoading(false);
  }
}

// Authentication: Log Out
async function handleLogOut(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();

  try {
    if (window.WMS_DB) {
      window.WMS_DB.logout();
    }
    localStorage.removeItem("wms_auth_user_v6");
    if (document.documentElement) {
      document.documentElement.classList.remove('is-authenticated');
    }
    const authSection = document.getElementById("auth-section");
    const appSection = document.getElementById("app-section");
    if (authSection) authSection.style.display = "flex";
    if (appSection) appSection.style.display = "none";

    try {
      await signOut(auth);
    } catch (err) {
      console.warn("Firebase signout warn:", err);
    }

    if (window.showToast) {
      window.showToast("تم تسجيل الخروج بنجاح.", "info");
    }
  } catch (error) {
    console.error("Logout Error:", error);
    if (window.showToast) {
      window.showToast(`خطأ في تسجيل الخروج: ${error.message}`, "danger");
    }
  }
}

// ============================================================================
// Auth State Observer (onAuthStateChanged)
// Controls visibility of auth-section and app-section & realtime listener
// ============================================================================
onAuthStateChanged(auth, async (user) => {
  // If user is undergoing registration flow, ignore auto login navigation
  if (isSigningUp) {
    return;
  }

  const authSection = document.getElementById("auth-section");
  const appSection = document.getElementById("app-section");

  if (user) {
    // 1. Fetch user's specific role from Firestore 'users' collection
    const userRole = await fetchUserRole(user);

    // User is logged in via Firebase
    if (document.documentElement) document.documentElement.classList.add('is-authenticated');
    if (authSection) authSection.style.display = "none";
    if (appSection) appSection.style.display = "block";

    if (window.WMS_DB) {
      const authUser = createAuthUser(user.email, user.displayName, userRole);
      window.WMS_DB.setAuthUser(authUser);
    }

    // 2. Apply UI permissions (hide inputs/send button for viewer, show for admin)
    applyRolePermissions(userRole);

    if (window.WMS_APP && typeof window.WMS_APP.updateUserHeader === 'function') {
      window.WMS_APP.updateUserHeader();
    }
  } else {
    // Check if WMS_DB has any active session (local demo or stored user)
    const localUser = window.WMS_DB ? window.WMS_DB.getAuthUser() : null;
    if (localUser) {
      if (document.documentElement) document.documentElement.classList.add('is-authenticated');
      if (authSection) authSection.style.display = "none";
      if (appSection) appSection.style.display = "block";
      applyRolePermissions(localUser.role || 'viewer');
      if (window.WMS_APP && typeof window.WMS_APP.updateUserHeader === 'function') {
        window.WMS_APP.updateUserHeader();
      }
    } else {
      // Truly logged out
      if (document.documentElement) document.documentElement.classList.remove('is-authenticated');
      if (authSection) authSection.style.display = "flex";
      if (appSection) appSection.style.display = "none";
    }
  }
});

// Broadcast & Announcement Message Sender
function handleSendBroadcastMessage(e) {
  if (e && typeof e.preventDefault === 'function') e.preventDefault();

  const user = window.WMS_DB ? window.WMS_DB.getAuthUser() : null;
  const isViewer = user && (user.role === 'viewer');

  if (isViewer) {
    if (window.showToast) window.showToast('عذراً! حسابك بصلاحية "مشاهد" (قراءة فقط)، لا يمكنك كتابة أو إرسال الرسائل.', 'warning');
    return;
  }

  const input = document.getElementById('message-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  const msgList = document.getElementById('messages-list');
  if (msgList) {
    const timeStr = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
    const isOwner = user && (user.isOwner || user.role === 'owner');
    const senderName = isOwner ? '👑 صاحب المنشأة (Owner)' : `🛡️ ${user ? (user.name || user.email) : 'المدير العام (Admin)'}`;
    
    const newMsgEl = document.createElement('div');
    newMsgEl.className = 'msg-item';
    newMsgEl.style.cssText = 'background: var(--bg-input); padding: 0.85rem 1rem; border-radius: var(--radius-md); border-left: 3px solid #10b981; animation: fadeIn 0.3s ease; margin-bottom: 0.5rem;';
    newMsgEl.innerHTML = `
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
        <strong style="color: #34d399; font-size: 0.88rem;">${senderName}</strong>
        <span style="font-size: 0.75rem; color: var(--text-muted);">اليوم ${timeStr}</span>
      </div>
      <p style="margin: 0; font-size: 0.88rem; color: var(--text-primary);">${text}</p>
    `;
    msgList.prepend(newMsgEl);
    input.value = '';
    if (window.showToast) window.showToast('تم إرسال ونشر التعميم الإداري بنجاح! 📢', 'success');
  }
}

// Export functions globally so inline onclick handlers and console work 100%
window.handleSignUp = handleSignUp;
window.handleLogIn = handleLogIn;
window.handleLogOut = handleLogOut;
window.handleOwnerQuickLogin = handleOwnerQuickLogin;
window.handleQuickDemoLogin = handleQuickDemoLogin;
window.handleQuickViewerLogin = handleQuickViewerLogin;
window.handleForgotPassword = handleForgotPassword;
window.handleSendBroadcastMessage = handleSendBroadcastMessage;
window.switchAuthMode = switchAuthMode;
window.togglePasswordVisibility = togglePasswordVisibility;
window.showAuthHUDMessage = showAuthHUDMessage;
window.initCloudDatabaseListener = initCloudDatabaseListener;

// Attach Event Listeners immediately or on DOM ready
function attachFirebaseEvents() {
  const btnSignUp = document.getElementById("btn-signup");
  const btnLogIn = document.getElementById("btn-login");
  const btnLogOut = document.getElementById("btn-logout");
  const btnOwnerLogin = document.getElementById("btn-owner-login");
  const btnRolePorcelain = document.getElementById("btn-role-porcelain");
  const btnRoleMarble = document.getElementById("btn-role-marble");
  const btnRoleField = document.getElementById("btn-role-field");
  const btnRoleTech = document.getElementById("btn-role-tech");
  const authFormEl = document.getElementById("auth-form-el");

  if (authFormEl) {
    authFormEl.onsubmit = (e) => {
      e.preventDefault();
      if (currentAuthMode === "signup") {
        handleSignUp(e);
      } else {
        handleLogIn(e);
      }
    };
  }

  if (btnSignUp) btnSignUp.onclick = (e) => { e.preventDefault(); handleSignUp(e); };
  if (btnLogIn) btnLogIn.onclick = (e) => { e.preventDefault(); handleLogIn(e); };
  if (btnLogOut) btnLogOut.onclick = (e) => { e.preventDefault(); handleLogOut(e); };
  if (btnOwnerLogin) btnOwnerLogin.onclick = (e) => { e.preventDefault(); handleOwnerQuickLogin(e); };
  if (btnRolePorcelain) btnRolePorcelain.onclick = (e) => { e.preventDefault(); handlePorcelainSupervisorLogin(e); };
  if (btnRoleMarble) btnRoleMarble.onclick = (e) => { e.preventDefault(); handleMarbleSupervisorLogin(e); };
  if (btnRoleField) btnRoleField.onclick = (e) => { e.preventDefault(); handleFieldSupervisorLogin(e); };
  if (btnRoleTech) btnRoleTech.onclick = (e) => { e.preventDefault(); handleTechnicianLogin(e); };

  // Keyboard shortcut: Press Enter to submit active form action
  const authInputs = document.querySelectorAll("#auth-email, #auth-password, #auth-password-confirm");
  authInputs.forEach(input => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (currentAuthMode === "signup") {
          handleSignUp(e);
        } else {
          handleLogIn(e);
        }
      }
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", attachFirebaseEvents);
} else {
  attachFirebaseEvents();
}

