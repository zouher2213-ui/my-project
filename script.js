/**
 * AL-ENTEJ WMS - Master Application Controller (v6.0 - 100% Multi-Lingual Reactive Everywhere)
 * Upgrades:
 * - 100% Dynamic Tri-Lingual Support (Arabic, English, Bengali) across ALL 12 Modals, Form Labels, Placeholders & Defaults.
 * - Instant, lag-free modal opening and closing with zero stutter.
 * - Custom Permit Number (رقم الفسح) input & display for Wood & Marble orders.
 * - Comprehensive Multi-Field Search (Permit #, Buyer Name, Showroom, Rep, Phone, Date, Day, Order #).
 * - Half-Slab Support (إمكانية إضافة وخصم نصف لوح ±0.5 وكسور الألواح).
 * - Interactive Slab Photo Zoom Lightbox (تكبير صورة اللوح عند الضغط).
 * - Universal Edit and Delete across Items, Leftovers, Reservations, and Permits.
 * - Dedicated Full-Page Inventory Preview Views with "← Back" Navigation.
 * - Live KPI Summary Metric Cards for Slabs & Valuations.
 * - Concise status pill: "متوفر" (Available).
 */

(function () {
  'use strict';

  // ==========================================================================
  // COMPLETE TRI-LINGUAL DICTIONARY (ARABIC, ENGLISH, BENGALI)
  // ==========================================================================
  const I18N = {
    ar: {
      appTitle: 'مستودع الإنتاج',
      appSubtitle: 'نظام إدارة المخازن واللوجستيات المتقدم',
      loginTitle: 'مستودع الإنتاج الذكي',
      loginSubtitle: 'منظومة إدارة وحركات المخازن واللوجستيات المتقدمة',
      loginTab: 'تسجيل الدخول',
      signupTab: 'إنشاء حساب جديد',
      emailLabel: 'البريد الإلكتروني',
      passwordLabel: 'كلمة المرور',
      confirmPasswordLabel: 'تأكيد كلمة المرور',
      pwdMinHint: '💡 يجب ألا تقل كلمة المرور عن 6 خانات.',
      rememberMe: 'تذكر بياناتي',
      forgotPwd: 'نسيت كلمة المرور؟',
      signInBtn: 'تسجيل الدخول للنظام',
      createAccountBtn: 'إنشاء الحساب والمتابعة',
      demoLogin: 'دخول تجريبي سريع (Admin)',
      signupNotice: 'ℹ️ ملاحظة: بعد إنشاء الحساب بنجاح، سيتم توجيهك مباشرة لشاشة تسجيل الدخول لإدخال بياناتك والمتابعة.',
      cloudStatus: 'السحابة متصلة ونشطة (Firebase V10)',
      featureSync: 'مزامنة سحابية فورية',
      featureSecure: 'مصادقة آمنة ومشفرة',
      featureMaterials: 'رخام • بورسلان • خشب',
      fullAccess: 'كامل الصلاحيات (كل الأقسام)',
      unrestrictedAccess: 'جميع الأقسام والعمليات المخزنية مفتوحة ومتاحة لك بالكامل',
      username: 'اسم المستخدم',
      password: 'كلمة المرور',
      logoutBtn: 'تسجيل الخروج',
      backToHud: '← العودة للوحة الرئيسية',
      backToPorcelain: '← العودة لحركة البورسلان',
      backToMarble: '← العودة لحركة الرخام',

      // HUD Hub
      hudTitle: 'لوحة التحكم والعمليات الرئيسية',
      hudSubtitle: 'اختر القسم المخزني لإدارة الحركات، الحجوزات، الهوالك وإذونات التسليم',
      hudPorcelainTitle: 'حركة مخزون البورسلان',
      hudPorcelainDesc: 'حركة ألواح البورسلان (باللوح ونصف اللوح)، الحجوزات للمعارض، الرصيد المتاح، هوالك القص والجرد.',
      hudMarbleTitle: 'حركة مخزون الرخام',
      hudMarbleDesc: 'حركة ألواح الرخام الطبيعي، بلد المنشأ، حجز الألواح وأنصاف الألواح، هوالك وقص الألواح وطباعة الجرد.',
      hudWoodDeliveryTitle: 'تسليم طلبيات الخشب',
      hudWoodDeliveryDesc: 'فسوحات خروج الخشب، مندوب المعرض، بيانات العميل ومواعيد التركيب.',
      hudMarbleDeliveryTitle: 'تسليم طلبيات الرخام',
      hudMarbleDeliveryDesc: 'فسوحات خروج الرخام، توثيق المعرض والمشتري ومواعيد التوصيل والتركيب.',
      enterModule: 'فتح القسم ←',

      // Actions
      addItem: '+ إضافة صنف / لوح',
      previewInventoryBtn: '👁 معاينة الجرد',
      printInventoryBtn: '🖨 طباعة الجرد',
      reserveMaterial: '🏷 حجز',
      recordLeftover: '✂ تسجيل هوالك وقص',
      exportExcel: '📊 تصدير Excel منسق',
      printLabelBtn: '🏷 طباعة الملصق',
      addWoodPermitBtn: '+ إضافة فسح خشب',
      addMarblePermitBtn: '+ إضافة فسح رخام',
      editBtn: '✏ تعديل',
      deleteBtn: '🗑 حذف',

      // Subtitles
      porcelainSubtitle: 'ألواح البورسلان (باللوح ونصف اللوح)، حجوزات المعارض، أزرار الحركات، وسجل الهوالك',
      porcelainPreviewTitle: 'معاينة الجرد والتثمين المالي لألواح البورسلان',
      porcelainPreviewSubtitle: 'عرض تفصيلي متكامل لأرصدة الألواح والتقييم المالي الشامل',
      marbleSubtitle: 'ألواح الرخام الطبيعي، بلد المنشأ، حجوزات المعارض، وأزرار الحركات والجرد',
      marblePreviewTitle: 'معاينة الجرد والتثمين المالي لألواح الرخام الطبيعي',
      marblePreviewSubtitle: 'عرض تفصيلي متكامل لأرصدة الألواح والتقييم المالي لساحات الرخام',
      woodDeliverySubtitle: 'إدارة فسوحات خروج الخشب، المندوب، المعرض، العميل ومواعيد التركيب',
      marbleDeliverySubtitle: 'إدارة فسوحات خروج ألواح الرخام، المندوب، المعرض، العميل ومواعيد التركيب',

      // KPI Metric Titles
      kpiTotalSlabs: 'إجمالي الألواح بالمستودع',
      kpiAvailableSlabs: 'الألواح المتاحة',
      kpiReservedSlabs: 'الألواح المحجوزة للمعارض',
      kpiTotalValuation: 'القيمة المالية الإجمالية للمخزون',

      // Days of the Week
      days: {
        0: 'الأحد',
        1: 'الإثنين',
        2: 'الثلاثاء',
        3: 'الأربعاء',
        4: 'الخميس',
        5: 'الجمعة',
        6: 'السبت'
      },

      // Table Headers
      thSku: 'رمز الصنف / الكود',
      thImage: 'صورة اللوح',
      thName: 'بيان الصنف والنوع (اضغط الصورة للتكبير)',
      thMarbleOrigin: 'نوع الرخام والمنشأ (اضغط الصورة للتكبير)',
      thNameImage: 'بيان الصنف وصورة اللوح',
      thSpecs: 'المواصفات والأبعاد',
      thLocation: 'موقع التخزين',
      thTotalQty: 'إجمالي الألواح (±1 / ±½)',
      thReservedQty: 'الألواح المحجوزة',
      thAvailableQty: 'الألواح المتاحة',
      thPrice: 'سعر اللوح ($)',
      thValuation: 'القيمة الإجمالية ($)',
      thStatus: 'الحالة',
      thActions: 'الإجراءات',
      thLabelCode: 'كود الملصق',
      thPieceName: 'بيان القطعة',
      thOrigSku: 'الكود الأصلي',
      thDimensionsThickness: 'الأبعاد والسماكة',
      thQtySlabs: 'الكمية باللوح',
      thStorageLocation: 'موقع التخزين',
      thMaterialName: 'اسم المادة',
      thReservedSlabs: 'الألواح المحجوزة',

      // Permit & Delivery Headers
      thPermitNo: 'رقم الفسح',
      thOrderCode: 'كود الطلبية',
      thRepName: 'اسم المندوب',
      thShowroom: 'اسم المعرض',
      thWorkType: 'نوع العمل',
      thClientBuyer: 'اسم المشتري (عميل المعرض)',
      thExpectedDate: 'تاريخ التوصيل / التركيب',
      thDay: 'اليوم',
      thProjectRef: 'مرجع المشروع',

      // Modal Form Labels (100% Multi-Lingual)
      lblSku: 'رمز الصنف / الكود',
      lblLocation: 'موقع التخزين بالمستودع',
      lblName: 'اسم وبيان الصنف والنوع',
      lblImage: 'صورة اللوح',
      lblImageOptional: 'صورة اللوح (اختياري)',
      lblDimensions: 'الأبعاد (سم)',
      lblThickness: 'السماكة',
      lblFinish: 'نوع السطح',
      lblTotalQty: 'إجمالي عدد الألواح (يقبل كسور 0.5)',
      lblUnitPrice: 'سعر اللوح ($)',
      lblPhone: 'رقم هاتف المشتري',
      lblPermitNo: 'رقم الفسح',
      lblRepName: 'اسم مندوب المبيعات',
      lblShowroom: 'اسم العميل (المعرض)',
      lblWorkType: 'نوع العمل',
      lblBuyerName: 'اسم المشتري (عميل المعرض)',
      lblExpectedDate: 'تاريخ التركيب أو التوصيل المتوقع',
      lblOrigSku: 'رمز الصنف الأصلي',
      lblPieceName: 'بيان القطعة المقصوصة',
      lblCutDimensions: 'الأبعاد المقصوصة (سم)',
      lblCutThickness: 'السماكة',
      lblCutSlabsQty: 'عدد الألواح (يقبل 0.5)',
      lblCutLocation: 'موقع تخزين الهالك',
      lblOrigSlabInfo: 'بيانات اللوح الأصلي:',
      lblRemainingDimensions: '📐 المقاسات الباقية للوح (سم)',
      lblReservedQtySlabs: 'الكمية المحجوزة (باللوح أو بنصف اللوح 0.5)',
      lblProjectRef: 'كود مرجع المشروع',
      lblSelectedMaterial: 'المادة المحددة للحجز:',
      lblAvailableToSell: 'الألواح المتاحة:',

      // Modal Titles & Headers
      modalAddWoodPermit: 'إضافة فسح خشب',
      modalAddMarblePermit: 'إضافة فسح رخام',
      modalReserveTitle: 'حجز ألواح لعميل معرض',
      modalLeftoverTitle: 'تسجيل قص الهدر وتوليد ملصق اللوح',
      modalAddMaterialTitle: 'إضافة لوح مادة جديدة للمخزن',
      modalEditMaterialTitle: 'تعديل بيانات لوح المادة',
      modalEditLeftoverTitle: 'تعديل بيانات قطعة الهالك',
      modalEditReservationTitle: 'تعديل بيانات الحجز',
      modalEditWoodPermitTitle: 'تعديل بيانات فسح الخشب',
      modalEditMarblePermitTitle: 'تعديل بيانات فسح الرخام',
      modalZoomTitle: 'معاينة صورة اللوح بالحجم الكامل',
      modalInventoryA4Title: 'مستند الجرد الفعلي للمستودع (A4)',

      // Modal Buttons
      cancelBtn: 'إلغاء',
      closeBtn: 'إغلاق',
      saveBtn: 'حفظ البيانات',
      confirmBtn: 'تأكيد الإجراء',
      addBtn: '+ إضافة',
      generateBarcodeBtn: 'توليد كود الباركود',
      generateStickerBtn: '🏷️ توليد ملصق اللوح',
      confirmReserveBtn: 'تأكيد الحجز',
      savePermitBtn: 'حفظ الفسح',
      saveMaterialBtn: 'حفظ المادة',
      saveChangesBtn: 'حفظ التعديلات',
      printOfficialDocBtn: '🖨 طباعة المستند الرسمي',
      printStickerBtn: '🖨 طباعة الملصق',

      // Modal Input Placeholders
      addNewRepPlaceholder: 'إضافة اسم مندوب جديد للقائمة...',
      addNewShowroomPlaceholder: 'إضافة اسم معرض جديد للقائمة...',
      addNewWorkTypePlaceholder: 'إضافة نوع عمل جديد للقائمة...',
      plhWorkTypeEx: 'مثال: خزانة، أبواب، مطبخ...',
      plhSkuPlaceholder: 'مثال: MAR-101 أو POR-201',
      plhCutRemainingEx: 'مثال: 140x60 سم أو 210x75 سم',
      plhMaterialNameEx: 'مثال: ألواح بورسلان ستاتوريو الملكي',
      plhPhoneEx: 'مثال: 0501234567',
      plhBuyerEx: 'مثال: م. خالد الصباح',
      plhMarbleBuyerEx: 'مثال: مشروع قصر الشيخ منصور',
      plhPermitNoEx: 'مثال: FSH-WOD-2026-01',
      plhCutPieceEx: 'مثال: قطعة هالك مقصوصة زاوية',

      // Filters & Dropdowns
      filterAllStatus: 'كافة الحالات',
      filterScheduled: 'مجدول للتسليم',
      filterInDelivery: 'جاري التوصيل',
      filterDelivered: 'تم التركيب / التسليم',
      filterAllStock: 'كافة الأصناف',
      filterAvailable: 'المتوفر',
      filterReserved: 'المحجوز',
      filterLowStock: 'المخزون المنخفض',

      // Search Placeholders
      searchPorcelainPlaceholder: 'بحث في ألواح البورسلان (الاسم، الكود، الموقع)...',
      searchMarblePlaceholder: 'بحث في ألواح الرخام (الاسم، الكود، المنشأ)...',
      searchDeliveryPlaceholder: 'بحث برقم الفسح، اسم الزبون، المعرض، المندوب، الهاتف أو كود الطلبية...',
      searchPreviewPlaceholder: 'بحث فوري في أصناف الجرد...',

      // Empty State Messages
      noPorcelainFound: 'لا توجد أصناف بورسلان مطابقة',
      noMarbleFound: 'لا توجد أصناف رخام مطابقة',
      noWoodPermitsFound: 'لا توجد فسوحات خشب مطابقة لنتائج البحث',
      noMarblePermitsFound: 'لا توجد فسوحات رخام مطابقة لنتائج البحث',
      noLeftoversFound: 'لا توجد قطع هوالك مسجلة',
      noReservationsFound: 'لا توجد حجوزات نشطة',
      noImageSelected: 'لم يتم اختيار صورة',

      // Status & Units
      statusAvailable: 'متوفر',
      statusReserved: 'محجوز',
      statusDepleted: 'نفد المخزون',
      unitSlab: 'لوح',
      unitPermit: 'فسح',

      // Tabs
      catalogTab: 'المخزون والحركات',
      leftoversTab: 'سجل قطع وقص الهوالك',
      reservationsTab: 'قائمة الحجوزات النشطة',

      // Toasts
      toastLoginSuccess: 'تم تسجيل الدخول بنجاح. أهلاً بك!',
      toastStockUpdated: 'تم تحديث رصيد الألواح بنجاح.',
      toastReservedSuccess: 'تم حجز الألواح المحددة للعميل بنجاح.',
      toastLeftoverSaved: 'تم تسجيل القطعة وتوليد كود الملصق بنجاح.',
      toastPermitSaved: 'تم تسجيل الفسح بنجاح! رقم الفسح: ',
      toastExcelExported: 'تم تصدير ملف Excel منسق بنجاح.',
      toastPresetAdded: 'تمت إضافة الاختصار الجديد بنجاح.',
      toastItemUpdated: 'تم تعديل البيانات بنجاح.',
      toastItemDeleted: 'تم الحذف بنجاح.'
    },

    en: {
      appTitle: 'AL-ENTEJ WMS',
      appSubtitle: 'Global Warehouse Logistics Hub',
      loginTitle: 'Smart Production Warehouse',
      loginSubtitle: 'Advanced Warehouse & Logistics Operations Platform',
      loginTab: 'Sign In',
      signupTab: 'Create New Account',
      emailLabel: 'Email Address',
      passwordLabel: 'Password',
      confirmPasswordLabel: 'Confirm Password',
      pwdMinHint: '💡 Password must be at least 6 characters.',
      rememberMe: 'Remember Me',
      forgotPwd: 'Forgot Password?',
      signInBtn: 'Sign In to System',
      createAccountBtn: 'Create Account & Continue',
      demoLogin: 'Quick Demo Sign In (Admin)',
      signupNotice: 'ℹ️ Note: After account creation, you will be redirected to sign in to verify credentials.',
      cloudStatus: 'Cloud Live & Active (Firebase V10)',
      featureSync: 'Realtime Cloud Sync',
      featureSecure: 'Encrypted Secure Auth',
      featureMaterials: 'Marble • Porcelain • Wood',
      fullAccess: 'Full Access (All Modules)',
      unrestrictedAccess: 'All warehouse sections & operations are fully unlocked for you',
      username: 'Username',
      password: 'Password',
      logoutBtn: 'Logout',
      backToHud: '← Back to Main Hub',
      backToPorcelain: '← Back to Porcelain Movement',
      backToMarble: '← Back to Marble Movement',

      // HUD Hub
      hudTitle: 'Operational Management Hub',
      hudSubtitle: 'Select a warehouse operations module to manage inventory, dispatches, and remnants',
      hudPorcelainTitle: 'Porcelain Inventory Movement',
      hudPorcelainDesc: 'Porcelain slabs movements (full & half-slabs), showroom reservations, available slabs, cut leftovers & manifests.',
      hudMarbleTitle: 'Marble Inventory Movement',
      hudMarbleDesc: 'Natural marble slabs, quarry origin, slab reservations, offcut remnants & yard inventory.',
      hudWoodDeliveryTitle: 'Wood Order Delivery',
      hudWoodDeliveryDesc: 'Wood permits, showroom representatives, client delivery tracking, and installation schedule.',
      hudMarbleDeliveryTitle: 'Marble Order Delivery',
      hudMarbleDeliveryDesc: 'Marble slab permits, showroom client tracking, and installation date manifests.',
      enterModule: 'Open Module →',

      // Actions
      addItem: '+ Add Material',
      previewInventoryBtn: '👁 Preview Inventory',
      printInventoryBtn: '🖨 Print Inventory',
      reserveMaterial: '🏷 Reserve',
      recordLeftover: '✂ Record Cut Leftovers',
      exportExcel: '📊 Export Excel',
      printLabelBtn: '🏷 Print Label',
      addWoodPermitBtn: '+ Add Wood Permit',
      addMarblePermitBtn: '+ Add Marble Permit',
      editBtn: '✏ Edit',
      deleteBtn: '🗑 Delete',

      // Subtitles
      porcelainSubtitle: 'Porcelain slabs (full & half-slabs), showroom reservations, stock movements, and cut remnants',
      porcelainPreviewTitle: 'Porcelain Slabs Financial Inventory Preview',
      porcelainPreviewSubtitle: 'Comprehensive breakdown of slab inventory and financial valuation',
      marbleSubtitle: 'Natural marble slabs, quarry origin, showroom reservations, stock movements, and manifests',
      marblePreviewTitle: 'Natural Marble Financial Inventory Preview',
      marblePreviewSubtitle: 'Comprehensive breakdown of marble yard slab inventory and valuation',
      woodDeliverySubtitle: 'Wood dispatch permits, representatives, showrooms, client deliveries, and installation manifests',
      marbleDeliverySubtitle: 'Marble slab dispatch permits, representatives, showrooms, client deliveries, and installation manifests',

      // KPI Metric Titles
      kpiTotalSlabs: 'Total Stock Slabs',
      kpiAvailableSlabs: 'Available Slabs for Sale',
      kpiReservedSlabs: 'Reserved Showroom Slabs',
      kpiTotalValuation: 'Total Warehouse Valuation',

      // Days of the Week
      days: {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
      },

      // Table Headers
      thSku: 'SKU / Code',
      thImage: 'Photo',
      thName: 'Material Description & Type (Click photo to zoom)',
      thMarbleOrigin: 'Marble Type & Origin (Click photo to zoom)',
      thNameImage: 'Material Name & Slab Photo',
      thSpecs: 'Specifications & Dimensions',
      thLocation: 'Storage Location',
      thTotalQty: 'Total Slabs (±1 / ±½)',
      thReservedQty: 'Reserved Slabs',
      thAvailableQty: 'Available Slabs for Sale',
      thPrice: 'Price / Slab ($)',
      thValuation: 'Total Value ($)',
      thStatus: 'Status',
      thActions: 'Actions',
      thLabelCode: 'Tag Code',
      thPieceName: 'Piece Description',
      thOrigSku: 'Original SKU',
      thDimensionsThickness: 'Dimensions & Thickness',
      thQtySlabs: 'Quantity (Slabs)',
      thStorageLocation: 'Storage Bay',
      thMaterialName: 'Material Name',
      thReservedSlabs: 'Reserved Slabs',

      // Permit & Delivery Headers
      thPermitNo: 'Permit #',
      thOrderCode: 'Order Code',
      thRepName: 'Sales Representative',
      thShowroom: 'Showroom',
      thWorkType: 'Work Type',
      thClientBuyer: 'Buyer / Client Name',
      thExpectedDate: 'Delivery / Installation Date',
      thDay: 'Day',
      thProjectRef: 'Project Ref',

      // Modal Form Labels (100% Multi-Lingual)
      lblSku: 'SKU / Code',
      lblLocation: 'Warehouse Storage Location',
      lblName: 'Material Name & Specification',
      lblImage: 'Slab Photo',
      lblImageOptional: 'Slab Photo (Optional)',
      lblDimensions: 'Dimensions (cm)',
      lblThickness: 'Thickness',
      lblFinish: 'Surface Finish',
      lblTotalQty: 'Total Number of Slabs (supports 0.5)',
      lblUnitPrice: 'Price / Slab ($)',
      lblPhone: 'Buyer Phone Number',
      lblPermitNo: 'Permit #',
      lblRepName: 'Sales Representative',
      lblShowroom: 'Showroom Name',
      lblWorkType: 'Work Type / Job Nature',
      lblBuyerName: 'Buyer / Client Name',
      lblExpectedDate: 'Expected Delivery / Installation Date',
      lblOrigSku: 'Original SKU Code',
      lblPieceName: 'Cut Piece Description',
      lblCutDimensions: 'Cut Dimensions (cm)',
      lblCutThickness: 'Thickness',
      lblCutSlabsQty: 'Number of Slabs (supports 0.5)',
      lblCutLocation: 'Remnant Storage Location',
      lblOrigSlabInfo: 'Original Slab Info:',
      lblRemainingDimensions: '📐 Remaining Slab Dimensions (cm)',
      lblReservedQtySlabs: 'Reserved Quantity (Full or Half Slab 0.5)',
      lblProjectRef: 'Project Reference Code',
      lblSelectedMaterial: 'Selected Material for Reservation:',
      lblAvailableToSell: 'Available Balance for Sale:',

      // Modal Titles & Headers
      modalAddWoodPermit: 'Add Wood Permit',
      modalAddMarblePermit: 'Add Marble Permit',
      modalReserveTitle: 'Reserve Slabs for Showroom Client',
      modalLeftoverTitle: 'Record Cut Remnant & Generate Slab Sticker',
      modalAddMaterialTitle: 'Add Slab Material to Catalog',
      modalEditMaterialTitle: 'Edit Slab Material',
      modalEditLeftoverTitle: 'Edit Cut Remnant',
      modalEditReservationTitle: 'Edit Reservation',
      modalEditWoodPermitTitle: 'Edit Wood Permit',
      modalEditMarblePermitTitle: 'Edit Marble Permit',
      modalZoomTitle: 'Slab Photo Full Zoom',
      modalInventoryA4Title: 'Physical Warehouse Inventory Document (A4)',

      // Modal Buttons
      cancelBtn: 'Cancel',
      closeBtn: 'Close',
      saveBtn: 'Save Entry',
      confirmBtn: 'Confirm Action',
      addBtn: '+ Add',
      generateBarcodeBtn: 'Generate Barcode & Save',
      generateStickerBtn: '🏷️ Generate Slab Sticker',
      confirmReserveBtn: 'Confirm Reservation',
      savePermitBtn: 'Save Permit',
      saveMaterialBtn: 'Save Material',
      saveChangesBtn: 'Save Changes',
      printOfficialDocBtn: '🖨 Print Official Audit Document',
      printStickerBtn: '🖨 Print Barcode Label',

      // Modal Input Placeholders
      addNewRepPlaceholder: 'Add new sales rep name...',
      addNewShowroomPlaceholder: 'Add new showroom name...',
      addNewWorkTypePlaceholder: 'Add new work type shortcut...',
      plhWorkTypeEx: 'e.g. Door Manufacturing & Install...',
      plhSkuPlaceholder: 'e.g. MAR-101 or POR-201',
      plhCutRemainingEx: 'e.g. 140x60 cm or 210x75 cm',
      plhMaterialNameEx: 'e.g. Calacatta Statuario Supreme Porcelain Slab',
      plhPhoneEx: 'e.g. +971 50 123 4567',
      plhBuyerEx: 'e.g. Eng. Khaled Al-Sabah',
      plhMarbleBuyerEx: 'e.g. Sheikh Mansour Palace Project',
      plhPermitNoEx: 'e.g. FSH-WOD-2026-01',
      plhCutPieceEx: 'e.g. Offcut Corner Slab Piece',

      // Filters & Dropdowns
      filterAllStatus: 'All Statuses',
      filterScheduled: 'Scheduled for Delivery',
      filterInDelivery: 'In Delivery',
      filterDelivered: 'Delivered / Installed',
      filterAllStock: 'All Materials',
      filterAvailable: 'Available',
      filterReserved: 'Reserved',
      filterLowStock: 'Low Stock Alert',

      // Search Placeholders
      searchPorcelainPlaceholder: 'Search porcelain slabs (name, SKU, location)...',
      searchMarblePlaceholder: 'Search marble slabs (name, SKU, origin)...',
      searchDeliveryPlaceholder: 'Search by permit #, buyer name, showroom, rep, phone, order code...',
      searchPreviewPlaceholder: 'Instant search in inventory manifest...',

      // Empty State Messages
      noPorcelainFound: 'No porcelain items found',
      noMarbleFound: 'No marble items found',
      noWoodPermitsFound: 'No matching wood permits found',
      noMarblePermitsFound: 'No matching marble permits found',
      noLeftoversFound: 'No remnants recorded',
      noReservationsFound: 'No active reservations found',
      noImageSelected: 'No image selected',

      // Status & Units
      statusAvailable: 'Available',
      statusReserved: 'Reserved',
      statusDepleted: 'Out of Stock',
      unitSlab: 'Slabs',
      unitPermit: 'Permits',

      // Tabs
      catalogTab: 'Movements & Stock',
      leftoversTab: 'Cut Remnants / Leftovers Register',
      reservationsTab: 'Active Showroom Reservations',

      // Toasts
      toastLoginSuccess: 'Signed in successfully. Welcome!',
      toastStockUpdated: 'Stock level updated successfully.',
      toastReservedSuccess: 'Slabs reserved successfully for showroom client.',
      toastLeftoverSaved: 'Cut remnant registered & barcode label generated.',
      toastPermitSaved: 'Permit created successfully! Permit #: ',
      toastExcelExported: 'Formatted Excel spreadsheet generated.',
      toastPresetAdded: 'New custom shortcut added successfully.',
      toastItemUpdated: 'Changes saved successfully.',
      toastItemDeleted: 'Item deleted successfully.'
    },

    bn: {
      appTitle: 'আল-ইনতেজ ডব্লিউএমএস',
      appSubtitle: 'ওয়্যারহাউস ম্যানেজমেন্ট এবং লজিস্টিকস',
      loginTitle: 'স্মার্ট প্রোডাকশন ওয়্যারহাউস',
      loginSubtitle: 'উন্নত ওয়্যারহাউস এবং লজিস্টিকস প্ল্যাটফর্ম',
      loginTab: 'লগইন করুন',
      signupTab: 'নতুন একাউন্ট খুলুন',
      emailLabel: 'ইমেইল অ্যাড্রেস',
      passwordLabel: 'পাসওয়ার্ড',
      confirmPasswordLabel: 'পাসওয়ার্ড নিশ্চিত করুন',
      pwdMinHint: '💡 পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।',
      rememberMe: 'আমাকে মনে রাখুন',
      forgotPwd: 'পাসওয়ার্ড ভুলে গেছেন?',
      signInBtn: 'সিস্টেমে লগইন করুন',
      createAccountBtn: 'একাউন্ট তৈরি করুন এবং এগিয়ে যান',
      demoLogin: 'দ্রুত ডেমো লগইন (Admin)',
      signupNotice: 'ℹ️ বিজ্ঞপ্তি: অ্যাকাউন্ট তৈরির পরে, আপনি লগইন করার জন্য পুনর্নির্দেশিত হবেন।',
      cloudStatus: 'ক্লাউড সক্রিয় (Firebase V10)',
      featureSync: 'রিয়েলটাইম সিঙ্ক',
      featureSecure: 'সুরক্ষিত লগইন',
      featureMaterials: 'মার্বেল • চীনামাটি • কাঠ',
      username: 'ব্যবহারকারীর নাম',
      password: 'পাসওয়ার্ড',
      logoutBtn: 'লগআউট',
      backToHud: '← মূল মেনুতে ফিরে যান',
      backToPorcelain: '← চীনামাটির বিভাগে ফিরে যান',
      backToMarble: '← মার্বেল বিভাগে ফিরে যান',

      // HUD Hub
      hudTitle: 'ওয়্যারহাউস অপারেশন হাব',
      hudSubtitle: 'জায় চলাচল, রিজার্ভেশন এবং ডেলিভারি পরিচালনা করতে মডিউল নির্বাচন করুন',
      hudPorcelainTitle: 'চীনামাটির বাসন জায় চলাচল',
      hudPorcelainDesc: 'চীনামাটির স্ল্যাব চলাচল (পূর্ণ ও অর্ধেক স্ল্যাব), শোরুম রিজার্ভেশন, উপলব্ধ স্ল্যাব এবং অবশিষ্ট ট্যাগিং।',
      hudMarbleTitle: 'মার্বেল জায় চলাচল',
      hudMarbleDesc: 'মার্বেল স্ল্যাব চলাচল, উৎস ট্র্যাকিং, স্ল্যাব রিজার্ভেশন এবং অবশিষ্ট ট্যাগিং।',
      hudWoodDeliveryTitle: 'কাঠের অর্ডার ডেলিভারি',
      hudWoodDeliveryDesc: 'কাঠের পারমিট, শোরুম প্রতিনিধি, ক্লায়েন্ট ডেলিভারি ট্র্যাকিং এবং ইনস্টলেশন সময়সূচী।',
      hudMarbleDeliveryTitle: 'মার্বেল অর্ডার ডেলিভারি',
      hudMarbleDeliveryDesc: 'মার্বেল স্ল্যাব পারমিট, শোরুম ক্লায়েন্ট ট্র্যাকিং এবং ইনস্টলেশন তারিখ।',
      enterModule: 'প্রবেশ করুন →',

      // Actions
      addItem: '+ নতুন স্ল্যাব যোগ করুন',
      previewInventoryBtn: '👁 ইনভেন্টরি প্রিভিউ',
      printInventoryBtn: '🖨 প্রিন্ট A4',
      reserveMaterial: '🏷 রিজার্ভ',
      recordLeftover: '✂ কাটিং অবশিষ্ট রেকর্ড করুন',
      exportExcel: '📊 ফরম্যাট করা এক্সেল',
      printLabelBtn: '🏷 লেবেল প্রিন্ট',
      addWoodPermitBtn: '+ কাঠের পারমিট যোগ করুন',
      addMarblePermitBtn: '+ মার্বেল পারমিট যোগ করুন',
      editBtn: '✏ এডিট',
      deleteBtn: '🗑 ডিলিট',

      // Subtitles
      porcelainSubtitle: 'চীনামাটির স্ল্যাব (পূর্ণ ও অর্ধেক স্ল্যাব), শোরুম রিজার্ভেশন, চলাচল ও অবশিষ্ট রেজিস্টার',
      porcelainPreviewTitle: 'চীনামাটির স্ল্যাব ইনভেন্টরি প্রিভিউ',
      porcelainPreviewSubtitle: 'স্ল্যাব জায় ও আর্থিক মূল্যায়নের বিস্তারিত বিবরণ',
      marbleSubtitle: 'প্রাকৃতিক মার্বেল স্ল্যাব, উৎস, শোরুম রিজার্ভেশন, চলাচল ও ইনভেন্টরি',
      marblePreviewTitle: 'প্রাকৃতিক মার্বেল ইনভেন্টরি প্রিভিউ',
      marblePreviewSubtitle: 'মার্বেল ইয়ার্ডের স্টক ও আর্থিক মূল্যায়ন',
      woodDeliverySubtitle: 'কাঠের পারমিট, প্রতিনিধি, শোরুম, ক্লায়েন্ট ডেলিভারি ও ইনস্টলেশন সময়সূচী',
      marbleDeliverySubtitle: 'মার্বেল পারমিট, প্রতিনিধি, শোরুম, ক্লায়েন্ট ডেলিভারি ও ইনস্টলেশন সময়সূচী',

      // KPI Metric Titles
      kpiTotalSlabs: 'মোট স্ল্যাব স্টক',
      kpiAvailableSlabs: 'বিক্রির জন্য উপলব্ধ স্ল্যাব',
      kpiReservedSlabs: 'সংরক্ষিত স্ল্যাব',
      kpiTotalValuation: 'মোট ইনভেন্টরি মূল্যায়ন',

      // Days of the Week
      days: {
        0: 'রবিবার',
        1: 'সোমবার',
        2: 'মঙ্গলবার',
        3: 'বুধবার',
        4: 'বৃহস্পতিবার',
        5: 'শুক্রবার',
        6: 'শনিবার'
      },

      // Table Headers
      thSku: 'এসকেইউ / কোড',
      thImage: 'ছবি',
      thName: 'উপাদানের নাম ও ধরন (জুম করতে ক্লিক করুন)',
      thMarbleOrigin: 'মার্বেলের ধরন ও উৎস (জুম করতে ক্লিক করুন)',
      thNameImage: 'উপাদানের নাম ও স্ল্যাব ছবি',
      thSpecs: 'স্পেসিফিকেশন ও মাত্রা',
      thLocation: 'অবস্থান',
      thTotalQty: 'মোট স্ল্যাব (±১ / ±½)',
      thReservedQty: 'সংরক্ষিত স্ল্যাব',
      thAvailableQty: 'উপলব্ধ স্ল্যাব',
      thPrice: 'প্রতি স্ল্যাব মূল্য ($)',
      thValuation: 'মোট মূল্য ($)',
      thStatus: 'অবস্থা',
      thActions: 'পদক্ষেপ',
      thLabelCode: 'ট্যাগ কোড',
      thPieceName: 'টুকরার বিবরণ',
      thOrigSku: 'মূল এসকেইউ',
      thDimensionsThickness: 'মাত্রা এবং বেধ',
      thQtySlabs: 'স্ল্যাব পরিমাণ',
      thStorageLocation: 'স্টোরেজ অবস্থান',
      thMaterialName: 'উপাদানের নাম',
      thReservedSlabs: 'সংরক্ষিত স্ল্যাব',

      // Permit & Delivery Headers
      thPermitNo: 'পারমিট নং',
      thOrderCode: 'অর্ডার কোড',
      thRepName: 'বিক্রয় প্রতিনিধি',
      thShowroom: 'শোরুম',
      thWorkType: 'কাজের ধরন',
      thClientBuyer: 'ক্রেতার নাম (শোরুম ক্লায়েন্ট)',
      thExpectedDate: 'ডেলিভারি / ইনস্টলেশন তারিখ',
      thDay: 'দিন',
      thProjectRef: 'প্রকল্প রেফারেন্স',

      // Modal Form Labels (100% Multi-Lingual)
      lblSku: 'এসকেইউ / কোড',
      lblLocation: 'ওয়্যারহাউস স্টোরেজ অবস্থান',
      lblName: 'উপাদানের নাম ও স্পেসিফিকেশন',
      lblImage: 'স্ল্যাব ছবি',
      lblImageOptional: 'স্ল্যাব ছবি (ঐচ্ছিক)',
      lblDimensions: 'মাত্রা (সেমি)',
      lblThickness: 'বেধ',
      lblFinish: 'পৃষ্ঠের ফিনিশ',
      lblTotalQty: 'মোট স্ল্যাব সংখ্যা (০.৫ সমর্থন করে)',
      lblUnitPrice: 'প্রতি স্ল্যাব মূল্য ($)',
      lblPhone: 'ক্রেতার ফোন নম্বর',
      lblPermitNo: 'পারমিট নং',
      lblRepName: 'বিক্রয় প্রতিনিধি',
      lblShowroom: 'শোরুমের নাম',
      lblWorkType: 'কাজের ধরন',
      lblBuyerName: 'ক্রেতার নাম (শোরুম ক্লায়েন্ট)',
      lblExpectedDate: 'প্রত্যাশিত ডেলিভারি / ইনস্টলেশন তারিখ',
      lblOrigSku: 'মূল এসকেইউ কোড',
      lblPieceName: 'কাটিং টুকরার বিবরণ',
      lblCutDimensions: 'কাটিং মাত্রা (সেমি)',
      lblCutThickness: 'বেধ',
      lblCutSlabsQty: 'স্ল্যাব পরিমাণ (০.৫ সহ)',
      lblCutLocation: 'অবশিষ্টাংশ স্টোরেজ অবস্থান',
      lblOrigSlabInfo: 'মূল স্ল্যাব তথ্য:',
      lblRemainingDimensions: '📐 অবশিষ্ট স্ল্যাব মাত্রা (সেমি)',
      lblReservedQtySlabs: 'সংরক্ষিত পরিমাণ (পূর্ণ বা অর্ধেক স্ল্যাব ০.৫)',
      lblProjectRef: 'প্রকল্প রেফারেন্স কোড',
      lblSelectedMaterial: 'রিজার্ভেশনের জন্য নির্বাচিত উপাদান:',
      lblAvailableToSell: 'বিক্রির জন্য উপলব্ধ ব্যালেন্স:',

      // Modal Titles & Headers
      modalAddWoodPermit: 'কাঠের পারমিট যোগ করুন',
      modalAddMarblePermit: 'মার্বেল পারমিট যোগ করুন',
      modalReserveTitle: 'শোরুম ক্লায়েন্টের জন্য স্ল্যাব রিজার্ভ করুন',
      modalLeftoverTitle: 'কাটিং অবশিষ্ট রেকর্ড ও স্ল্যাব স্টিকার তৈরি',
      modalAddMaterialTitle: 'ক্যাটালগে নতুন স্ল্যাব উপাদান যোগ করুন',
      modalEditMaterialTitle: 'স্ল্যাব উপাদান সম্পাদনা করুন',
      modalEditLeftoverTitle: 'কাটিং অবশিষ্ট সম্পাদনা করুন',
      modalEditReservationTitle: 'রিজার্ভেশন সম্পাদনা করুন',
      modalEditWoodPermitTitle: 'কাঠের পারমিট সম্পাদনা করুন',
      modalEditMarblePermitTitle: 'মার্বেল পারমিট সম্পাদনা করুন',
      modalZoomTitle: 'ছবি জুম প্রিভিউ',
      modalInventoryA4Title: 'ওয়্যারহাউস ইনভেন্টরি নথি (A4)',

      // Modal Buttons
      cancelBtn: 'বাতিল',
      closeBtn: 'বন্ধ করুন',
      saveBtn: 'সংরক্ষণ করুন',
      confirmBtn: 'নিশ্চিত করুন',
      addBtn: '+ যোগ করুন',
      generateBarcodeBtn: 'বারকোড তৈরি ও সংরক্ষণ',
      generateStickerBtn: '🏷️ স্ল্যাব লেবেল তৈরি করুন',
      confirmReserveBtn: 'রিজার্ভেশন নিশ্চিত করুন',
      savePermitBtn: 'পারমিট সংরক্ষণ করুন',
      saveMaterialBtn: 'উপাদান সংরক্ষণ করুন',
      saveChangesBtn: 'পরিবর্তন সংরক্ষণ করুন',
      printOfficialDocBtn: '🖨 অফিসিয়াল নথি প্রিন্ট করুন',
      printStickerBtn: '🖨 বারকোড লেবেল প্রিন্ট করুন',

      // Modal Input Placeholders
      addNewRepPlaceholder: 'নতুন বিক্রয় প্রতিনিধির নাম...',
      addNewShowroomPlaceholder: 'নতুন শোরুমের নাম...',
      addNewWorkTypePlaceholder: 'নতুন কাজের ধরন যোগ করুন...',
      plhWorkTypeEx: 'যেমন: দরজা তৈরি ও স্থাপন...',
      plhSkuPlaceholder: 'যেমন: MAR-101 বা POR-201',
      plhCutRemainingEx: 'যেমন: ১৪০x৬০ সেমি',
      plhMaterialNameEx: 'যেমন: ক্যালাকাট্টা স্ট্যাচুয়ারিও চীনামাটির স্ল্যাব',
      plhPhoneEx: 'যেমন: +৯৭১ ৫০ ১২৩৪৫৬৭',
      plhBuyerEx: 'যেমন: ইঞ্জিনিয়ার খালেদ আল-সাবাহ',
      plhMarbleBuyerEx: 'যেমন: শেখ মনসুর প্রাসাদ প্রকল্প',
      plhPermitNoEx: 'যেমন: FSH-WOD-2026-01',
      plhCutPieceEx: 'যেমন: কোণার কাটিং টুকরা',

      // Filters & Dropdowns
      filterAllStatus: 'সকল অবস্থা',
      filterScheduled: 'ডেলিভারির জন্য নির্ধারিত',
      filterInDelivery: 'ডেলিভারি চলছে',
      filterDelivered: 'ইনস্টল / ডেলিভারি সম্পন্ন',
      filterAllStock: 'সকল উপাদান',
      filterAvailable: 'উপলব্ধ',
      filterReserved: 'সংরক্ষিত',
      filterLowStock: 'স্বল্প স্টক সতর্কতা',

      // Search Placeholders
      searchPorcelainPlaceholder: 'চীনামাটির স্ল্যাব খুঁজুন (নাম, কোড, অবস্থান)...',
      searchMarblePlaceholder: 'মার্বেল স্ল্যাব খুঁজুন (নাম, কোড, উৎস)...',
      searchDeliveryPlaceholder: 'পারমিট নং, ক্রেতার নাম, শোরুম, প্রতিনিধি, ফোন দিয়ে খুঁজুন...',
      searchPreviewPlaceholder: 'ইনভেন্টরি তালিকায় অনুসন্ধান করুন...',

      // Empty State Messages
      noPorcelainFound: 'কোনো চীনামাটির স্ল্যাব পাওয়া যায়নি',
      noMarbleFound: 'কোনো মার্বেল স্ল্যাব পাওয়া যায়নি',
      noWoodPermitsFound: 'কোনো কাঠের পারমিট পাওয়া যায়নি',
      noMarblePermitsFound: 'কোনো মার্বেল পারমিট পাওয়া যায়নি',
      noLeftoversFound: 'কোনো কাটিং অবশিষ্ট রেকর্ড নেই',
      noReservationsFound: 'কোনো সক্রিয় রিজার্ভেশন নেই',
      noImageSelected: 'কোনো ছবি নির্বাচন করা হয়নি',

      // Status & Units
      statusAvailable: 'উপলব্ধ',
      statusReserved: 'সংরক্ষিত',
      statusDepleted: 'স্টক শেষ',
      unitSlab: 'স্ল্যাব',
      unitPermit: 'পারমিট',

      // Tabs
      catalogTab: 'চলাচল ও স্টক',
      leftoversTab: 'কাটিং অবশিষ্ট রেজিস্টার',
      reservationsTab: 'সক্রিয় রিজার্ভেশন তালিকা',

      // Toasts
      toastLoginSuccess: 'সফলভাবে লগইন হয়েছে!',
      toastStockUpdated: 'স্ল্যাব স্টক সফলভাবে আপডেট হয়েছে।',
      toastReservedSuccess: 'স্ল্যাব সফলভাবে সংরক্ষিত হয়েছে।',
      toastLeftoverSaved: 'অবশিষ্টাংশ রেকর্ড ও বারকোড ট্যাগ তৈরি হয়েছে।',
      toastPermitSaved: 'পারমিট তৈরি হয়েছে! পারমিট নং: ',
      toastExcelExported: 'এক্সেল স্প্রেডশীট সফলভাবে এক্সপোর্ট হয়েছে।',
      toastPresetAdded: 'নতুন শর্টকাট সফলভাবে যোগ হয়েছে।',
      toastItemUpdated: 'সফলভাবে পরিবর্তন সংরক্ষিত হয়েছে।',
      toastItemDeleted: 'সফলভাবে মুছে ফেলা হয়েছে।'
    }
  };

  // State
  const APP = {
    currentRoute: 'hud',
    lang: 'ar',
    theme: 'dark',
    porcelainTab: 'catalog',
    marbleTab: 'catalog',
    currentUploadedImage: '',
    editUploadedImage: ''
  };

  function t(key) {
    const l = APP.lang;
    return (I18N[l] && I18N[l][key]) || (I18N['ar'] && I18N['ar'][key]) || (I18N['en'] && I18N['en'][key]) || key;
  }

  function getDayName(dateString) {
    if (!dateString) return '-';
    try {
      const d = new Date(dateString + 'T00:00:00');
      const dayNum = d.getDay();
      return (I18N[APP.lang].days && I18N[APP.lang].days[dayNum]) || I18N['ar'].days[dayNum];
    } catch (e) {
      return '-';
    }
  }

  function formatNum(num) {
    const n = Number(num || 0);
    return n % 1 === 0 ? n.toString() : n.toFixed(1);
  }

  function formatCurrency(num) {
    const curr = WMS_DB.getSettings().currency || '$';
    return `${curr} ${Number(num || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  function formatDate(isoStr) {
    if (!isoStr) return '-';
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString(APP.lang === 'ar' ? 'ar-EG' : APP.lang === 'bn' ? 'bn-BD' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return isoStr;
    }
  }

  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${type === 'success' ? '✓' : type === 'danger' ? '✕' : 'ℹ'}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ==========================================================================
  // FAST MODAL CONTROLLER
  // ==========================================================================
  function openModal(id) {
    const m = document.getElementById(id);
    if (m) {
      m.classList.add('open');
      const firstInput = m.querySelector('input:not([type="hidden"]), select, textarea');
      if (firstInput) {
        requestAnimationFrame(() => firstInput.focus());
      }
    }
  }

  function closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('open');
  }

  // Modals are static and will only close via explicit buttons (Save, Cancel, or Close)

  // ==========================================================================
  // AUTH & ROUTER
  // ==========================================================================
  function checkAuth() {
    const user = WMS_DB ? WMS_DB.getAuthUser() : null;
    const loginSection = document.getElementById('auth-section') || document.getElementById('view-login');
    const appShell = document.getElementById('app-section') || document.getElementById('app-shell');

    if (!user) {
      if (loginSection) loginSection.style.display = 'flex';
      if (appShell) appShell.style.display = 'none';
      return false;
    } else {
      if (loginSection) loginSection.style.display = 'none';
      if (appShell) appShell.style.display = 'block';
      return true;
    }
  }

  function navigateTo(route) {
    if (!checkAuth()) return;

    const validRoutes = ['hud', 'porcelain', 'marble', 'wood-delivery', 'marble-delivery', 'porcelain-preview', 'marble-preview'];
    const targetRoute = validRoutes.includes(route) ? route : 'hud';
    APP.currentRoute = targetRoute;
    window.location.hash = `#${targetRoute}`;

    document.querySelectorAll('.module-view').forEach(v => {
      if (v.id === `view-${targetRoute}`) {
        v.classList.add('active');
      } else {
        v.classList.remove('active');
      }
    });

    renderCurrentView();
  }

  function renderCurrentView() {
    updateHudBadges();
    switch (APP.currentRoute) {
      case 'hud':
        break;
      case 'porcelain':
        renderPorcelainView();
        break;
      case 'marble':
        renderMarbleView();
        break;
      case 'wood-delivery':
        renderWoodDeliveryView();
        break;
      case 'marble-delivery':
        renderMarbleDeliveryView();
        break;
      case 'porcelain-preview':
        renderPorcelainPreviewView();
        break;
      case 'marble-preview':
        renderMarblePreviewView();
        break;
    }
  }

  function updateHudBadges() {
    const porItems = WMS_DB.getItems({ category: 'porcelain' });
    const marItems = WMS_DB.getItems({ category: 'marble' });
    const woodOrders = WMS_DB.getWoodOrders();
    const marOrders = WMS_DB.getMarbleOrders();

    const porBadge = document.getElementById('hud-badge-porcelain');
    const marBadge = document.getElementById('hud-badge-marble');
    const woodBadge = document.getElementById('hud-badge-wood-del');
    const marDelBadge = document.getElementById('hud-badge-mar-del');

    const slabWord = t('unitSlab');
    const permitWord = t('unitPermit');

    if (porBadge) porBadge.textContent = `${porItems.length} ${slabWord}`;
    if (marBadge) marBadge.textContent = `${marItems.length} ${slabWord}`;
    if (woodBadge) woodBadge.textContent = `${woodOrders.length} ${permitWord}`;
    if (marDelBadge) marDelBadge.textContent = `${marOrders.length} ${permitWord}`;
  }

  // ==========================================================================
  // IMAGE ZOOM LIGHTBOX MODAL
  // ==========================================================================
  function openImageLightbox(imageUrl, title, sku) {
    if (!imageUrl) return;
    const imgEl = document.getElementById('lightbox-preview-img');
    const titleEl = document.getElementById('lightbox-preview-title');
    const skuEl = document.getElementById('lightbox-preview-sku');

    if (imgEl) imgEl.src = imageUrl;
    if (titleEl) titleEl.textContent = title || '-';
    if (skuEl) skuEl.textContent = sku || '';

    openModal('modal-image-lightbox');
  }

  // ==========================================================================
  // PORCELAIN VIEW CONTROLLER (WITH HALF-SLAB STEPPER ±0.5, ZOOM, EDIT & DELETE)
  // ==========================================================================
  function renderPorcelainView() {
    const filter = (document.getElementById('porcelain-stock-filter') || {}).value || 'all';
    const search = (document.getElementById('porcelain-search-input') || {}).value || '';
    const items = WMS_DB.getItems({ category: 'porcelain', search, stockStatus: filter, lang: APP.lang });
    const leftovers = WMS_DB.getLeftovers('porcelain');
    const reservations = WMS_DB.getReservations('porcelain');

    const tbody = document.getElementById('porcelain-items-tbody');
    if (tbody) {
      if (items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:2rem; color:var(--text-muted);">${t('noPorcelainFound')}</td></tr>`;
      } else {
        tbody.innerHTML = items.map(it => {
          const statusClass = it.availableQty <= 0 ? 'pill-depleted' : it.availableQty <= it.minThreshold ? 'pill-reserved' : 'pill-available';
          const statusText = it.availableQty <= 0 ? t('statusDepleted') : it.availableQty <= it.minThreshold ? `${t('statusReserved')}` : t('statusAvailable');
          
          const imgHtml = it.image 
            ? `<img src="${it.image}" class="slab-thumb zoomable" title="🔍" onclick="WMS_APP.openImageLightbox('${it.image}', '${escapeHtml(it.displayName)}', '${escapeHtml(it.sku)}')" alt="Slab">` 
            : `<div class="slab-thumb">🏛</div>`;
            
          const slabUnit = t('unitSlab');

          return `
            <tr>
              <td><span class="sku-code">${escapeHtml(it.sku)}</span></td>
              <td>
                <div class="slab-cell">
                  ${imgHtml}
                  <div>
                    <div style="font-weight:800; color:var(--text-primary); font-size:1.02rem;">${escapeHtml(it.displayName)}</div>
                    <div style="font-size:0.82rem; color:var(--text-muted);">${escapeHtml(it.dimensions)} | ${escapeHtml(it.thickness)} | ${escapeHtml(it.finishAr || it.finish)}</div>
                  </div>
                </div>
              </td>
              <td><span class="badge-location">${escapeHtml(it.displayLocation)}</span></td>
              <td>
                <div class="stepper-box">
                  <button class="stepper-btn" onclick="WMS_APP.stepStock('${it.id}', -1)" title="-1">-1</button>
                  <button class="stepper-btn stepper-btn-half" onclick="WMS_APP.stepStock('${it.id}', -0.5)" title="-½">-½</button>
                  <strong style="min-width:42px; text-align:center; font-size:1.05rem;">${formatNum(it.totalQty)}</strong>
                  <button class="stepper-btn stepper-btn-half" onclick="WMS_APP.stepStock('${it.id}', 0.5)" title="+½">+½</button>
                  <button class="stepper-btn" onclick="WMS_APP.stepStock('${it.id}', 1)" title="+1">+1</button>
                </div>
                <small style="color:var(--text-muted); margin-left:4px;">${slabUnit}</small>
              </td>
              <td><strong style="color:var(--warning); font-size:1.05rem;">${formatNum(it.reservedQty)}</strong> ${slabUnit}</td>
              <td><strong style="color:${it.availableQty > 0 ? 'var(--success)' : 'var(--danger)'}; font-size:1.15rem;">${formatNum(it.availableQty)}</strong> ${slabUnit}</td>
              <td><span class="status-pill ${statusClass}">${statusText}</span></td>
              <td>
                <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">
                  <button class="btn-secondary btn-sm" onclick="WMS_APP.openReserveModal('${it.id}')" title="حجز">🏷 ${t('reserveMaterial')}</button>
                  <button class="btn-secondary btn-sm" onclick="WMS_APP.openLeftoverModal('porcelain', '${it.sku}')" title="قص">✂</button>
                  <button class="btn-secondary btn-sm" onclick="WMS_APP.openEditMaterialModal('${it.id}')" title="تعديل">✏ ${t('editBtn')}</button>
                  <button class="btn-danger btn-sm" onclick="WMS_APP.deleteItem('${it.id}')" title="حذف">🗑</button>
                </div>
              </td>
            </tr>
          `;
        }).join('');
      }
    }

    const leftoverTbody = document.getElementById('porcelain-leftovers-tbody');
    if (leftoverTbody) {
      if (leftovers.length === 0) {
        leftoverTbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">${t('noLeftoversFound')}</td></tr>`;
      } else {
        leftoverTbody.innerHTML = leftovers.map(l => `
          <tr>
            <td><strong style="font-family:monospace; color:var(--accent-porcelain);">${escapeHtml(l.code)}</strong></td>
            <td><strong>${escapeHtml(APP.lang === 'ar' ? (l.nameAr || l.name) : l.name)}</strong></td>
            <td><span class="sku-code">${escapeHtml(l.originalSku)}</span></td>
            <td><strong>${escapeHtml(l.dimensions)}</strong> (${escapeHtml(l.thickness)})</td>
            <td><strong style="color:var(--accent-wood); font-size:1.05rem;">${formatNum(l.slabsQty)} ${t('unitSlab')}</strong></td>
            <td><span class="badge-location">${escapeHtml(APP.lang === 'ar' ? (l.locationAr || l.location) : l.location)}</span></td>
            <td>
              <div style="display:flex; gap:0.35rem;">
                <button class="btn-primary btn-sm" onclick="WMS_APP.openPrintStickerModal('${l.id}')">🏷 ${t('printLabelBtn')}</button>
                <button class="btn-secondary btn-sm" onclick="WMS_APP.openEditLeftoverModal('${l.id}')">✏</button>
                <button class="btn-danger btn-sm" onclick="WMS_APP.deleteLeftover('${l.id}')">🗑</button>
              </div>
            </td>
          </tr>
        `).join('');
      }
    }

    const resTbody = document.getElementById('porcelain-reservations-tbody');
    if (resTbody) {
      if (reservations.length === 0) {
        resTbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">${t('noReservationsFound')}</td></tr>`;
      } else {
        resTbody.innerHTML = reservations.map(r => `
          <tr>
            <td><span class="sku-code">${escapeHtml(r.sku)}</span></td>
            <td><strong>${escapeHtml(APP.lang === 'ar' ? (r.itemNameAr || r.itemName) : r.itemName)}</strong></td>
            <td><strong style="color:var(--warning); font-size:1.05rem;">${formatNum(r.reservedQty)} ${t('unitSlab')}</strong></td>
            <td><strong>${escapeHtml(APP.lang === 'ar' ? (r.repNameAr || r.repName) : r.repName)}</strong></td>
            <td><span class="badge-location">${escapeHtml(APP.lang === 'ar' ? (r.showroomNameAr || r.showroomName) : r.showroomName)}</span></td>
            <td>
              <strong>${escapeHtml(APP.lang === 'ar' ? (r.clientNameAr || r.clientName) : r.clientName)}</strong>
              <div style="font-size:0.8rem; color:var(--text-muted);">Ref: ${escapeHtml(r.projectRef)}</div>
            </td>
            <td>
              <div style="display:flex; gap:0.35rem;">
                <button class="btn-secondary btn-sm" onclick="WMS_APP.openEditReservationModal('${r.id}')">✏ ${t('editBtn')}</button>
                <button class="btn-danger btn-sm" onclick="WMS_APP.cancelReservation('${r.id}')">${APP.lang === 'ar' ? 'إلغاء' : APP.lang === 'bn' ? 'বাতিল' : 'Release'}</button>
              </div>
            </td>
          </tr>
        `).join('');
      }
    }
  }

  // ==========================================================================
  // MARBLE VIEW CONTROLLER (WITH HALF-SLAB STEPPER ±0.5, ZOOM, EDIT & DELETE)
  // ==========================================================================
  function renderMarbleView() {
    const filter = (document.getElementById('marble-stock-filter') || {}).value || 'all';
    const search = (document.getElementById('marble-search-input') || {}).value || '';
    const items = WMS_DB.getItems({ category: 'marble', search, stockStatus: filter, lang: APP.lang });
    const leftovers = WMS_DB.getLeftovers('marble');
    const reservations = WMS_DB.getReservations('marble');

    const tbody = document.getElementById('marble-items-tbody');
    if (tbody) {
      if (items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:2rem; color:var(--text-muted);">${t('noMarbleFound')}</td></tr>`;
      } else {
        tbody.innerHTML = items.map(it => {
          const statusClass = it.availableQty <= 0 ? 'pill-depleted' : it.availableQty <= it.minThreshold ? 'pill-reserved' : 'pill-available';
          const statusText = it.availableQty <= 0 ? t('statusDepleted') : it.availableQty <= it.minThreshold ? `${t('statusReserved')}` : t('statusAvailable');
          
          const imgHtml = it.image 
            ? `<img src="${it.image}" class="slab-thumb zoomable" title="🔍" onclick="WMS_APP.openImageLightbox('${it.image}', '${escapeHtml(it.displayName)}', '${escapeHtml(it.sku)}')" alt="Slab">` 
            : `<div class="slab-thumb">💎</div>`;
            
          const slabUnit = t('unitSlab');

          return `
            <tr>
              <td><span class="sku-code">${escapeHtml(it.sku)}</span></td>
              <td>
                <div class="slab-cell">
                  ${imgHtml}
                  <div>
                    <div style="font-weight:800; color:var(--text-primary); font-size:1.02rem;">${escapeHtml(it.displayName)}</div>
                    <div style="font-size:0.82rem; color:var(--text-muted);">${escapeHtml(it.originAr || it.origin)} | ${escapeHtml(it.dimensions)} | ${escapeHtml(it.finishAr || it.finish)}</div>
                  </div>
                </div>
              </td>
              <td><span class="badge-location">${escapeHtml(it.displayLocation)}</span></td>
              <td>
                <div class="stepper-box">
                  <button class="stepper-btn" onclick="WMS_APP.stepStock('${it.id}', -1)" title="-1">-1</button>
                  <button class="stepper-btn stepper-btn-half" onclick="WMS_APP.stepStock('${it.id}', -0.5)" title="-½">-½</button>
                  <strong style="min-width:42px; text-align:center; font-size:1.05rem;">${formatNum(it.totalQty)}</strong>
                  <button class="stepper-btn stepper-btn-half" onclick="WMS_APP.stepStock('${it.id}', 0.5)" title="+½">+½</button>
                  <button class="stepper-btn" onclick="WMS_APP.stepStock('${it.id}', 1)" title="+1">+1</button>
                </div>
                <small style="color:var(--text-muted); margin-left:4px;">${slabUnit}</small>
              </td>
              <td><strong style="color:var(--warning); font-size:1.05rem;">${formatNum(it.reservedQty)}</strong> ${slabUnit}</td>
              <td><strong style="color:${it.availableQty > 0 ? 'var(--success)' : 'var(--danger)'}; font-size:1.15rem;">${formatNum(it.availableQty)}</strong> ${slabUnit}</td>
              <td><span class="status-pill ${statusClass}">${statusText}</span></td>
              <td>
                <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">
                  <button class="btn-secondary btn-sm" onclick="WMS_APP.openReserveModal('${it.id}')" title="حجز">🏷 ${t('reserveMaterial')}</button>
                  <button class="btn-secondary btn-sm" onclick="WMS_APP.openLeftoverModal('marble', '${it.sku}')" title="قص">✂</button>
                  <button class="btn-secondary btn-sm" onclick="WMS_APP.openEditMaterialModal('${it.id}')" title="تعديل">✏ ${t('editBtn')}</button>
                  <button class="btn-danger btn-sm" onclick="WMS_APP.deleteItem('${it.id}')" title="حذف">🗑</button>
                </div>
              </td>
            </tr>
          `;
        }).join('');
      }
    }

    const leftoverTbody = document.getElementById('marble-leftovers-tbody');
    if (leftoverTbody) {
      if (leftovers.length === 0) {
        leftoverTbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">${t('noLeftoversFound')}</td></tr>`;
      } else {
        leftoverTbody.innerHTML = leftovers.map(l => `
          <tr>
            <td><strong style="font-family:monospace; color:var(--accent-marble);">${escapeHtml(l.code)}</strong></td>
            <td><strong>${escapeHtml(APP.lang === 'ar' ? (l.nameAr || l.name) : l.name)}</strong></td>
            <td><span class="sku-code">${escapeHtml(l.originalSku)}</span></td>
            <td><strong>${escapeHtml(l.dimensions)}</strong> (${escapeHtml(l.thickness)})</td>
            <td><strong style="color:var(--accent-marble); font-size:1.05rem;">${formatNum(l.slabsQty)} ${t('unitSlab')}</strong></td>
            <td><span class="badge-location">${escapeHtml(APP.lang === 'ar' ? (l.locationAr || l.location) : l.location)}</span></td>
            <td>
              <div style="display:flex; gap:0.35rem;">
                <button class="btn-primary btn-sm" onclick="WMS_APP.openPrintStickerModal('${l.id}')">🏷 ${t('printLabelBtn')}</button>
                <button class="btn-secondary btn-sm" onclick="WMS_APP.openEditLeftoverModal('${l.id}')">✏</button>
                <button class="btn-danger btn-sm" onclick="WMS_APP.deleteLeftover('${l.id}')">🗑</button>
              </div>
            </td>
          </tr>
        `).join('');
      }
    }

    const resTbody = document.getElementById('marble-reservations-tbody');
    if (resTbody) {
      if (reservations.length === 0) {
        resTbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">${t('noReservationsFound')}</td></tr>`;
      } else {
        resTbody.innerHTML = reservations.map(r => `
          <tr>
            <td><span class="sku-code">${escapeHtml(r.sku)}</span></td>
            <td><strong>${escapeHtml(APP.lang === 'ar' ? (r.itemNameAr || r.itemName) : r.itemName)}</strong></td>
            <td><strong style="color:var(--warning); font-size:1.05rem;">${formatNum(r.reservedQty)} ${t('unitSlab')}</strong></td>
            <td><strong>${escapeHtml(APP.lang === 'ar' ? (r.repNameAr || r.repName) : r.repName)}</strong></td>
            <td><span class="badge-location">${escapeHtml(APP.lang === 'ar' ? (r.showroomNameAr || r.showroomName) : r.showroomName)}</span></td>
            <td>
              <strong>${escapeHtml(APP.lang === 'ar' ? (r.clientNameAr || r.clientName) : r.clientName)}</strong>
              <div style="font-size:0.8rem; color:var(--text-muted);">Ref: ${escapeHtml(r.projectRef)}</div>
            </td>
            <td>
              <div style="display:flex; gap:0.35rem;">
                <button class="btn-secondary btn-sm" onclick="WMS_APP.openEditReservationModal('${r.id}')">✏ ${t('editBtn')}</button>
                <button class="btn-danger btn-sm" onclick="WMS_APP.cancelReservation('${r.id}')">${APP.lang === 'ar' ? 'إلغاء' : APP.lang === 'bn' ? 'বাতিল' : 'Release'}</button>
              </div>
            </td>
          </tr>
        `).join('');
      }
    }
  }

  // ==========================================================================
  // DEDICATED FULL-PAGE INVENTORY PREVIEWS (WITH IMAGE ZOOM)
  // ==========================================================================
  function renderPorcelainPreviewView() {
    const search = (document.getElementById('porcelain-prev-search-input') || {}).value || '';
    const items = WMS_DB.getItems({ category: 'porcelain', search, lang: APP.lang });

    let totalSlabs = 0;
    let availableSlabs = 0;
    let reservedSlabs = 0;
    let totalVal = 0;

    items.forEach(it => {
      totalSlabs += it.totalQty;
      availableSlabs += it.availableQty;
      reservedSlabs += it.reservedQty;
      totalVal += it.totalValuation;
    });

    const kpiTotalEl = document.getElementById('porcelain-kpi-total');
    const kpiAvailEl = document.getElementById('porcelain-kpi-avail');
    const kpiResEl = document.getElementById('porcelain-kpi-res');
    const kpiValEl = document.getElementById('porcelain-kpi-val');

    const slabWord = t('unitSlab');
    if (kpiTotalEl) kpiTotalEl.textContent = `${formatNum(totalSlabs)} ${slabWord}`;
    if (kpiAvailEl) kpiAvailEl.textContent = `${formatNum(availableSlabs)} ${slabWord}`;
    if (kpiResEl) kpiResEl.textContent = `${formatNum(reservedSlabs)} ${slabWord}`;
    if (kpiValEl) kpiValEl.textContent = formatCurrency(totalVal);

    const tbody = document.getElementById('porcelain-preview-table-tbody');
    if (tbody) {
      if (items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:2rem; color:var(--text-muted);">${t('noPorcelainFound')}</td></tr>`;
      } else {
        tbody.innerHTML = items.map(it => {
          const imgHtml = it.image 
            ? `<img src="${it.image}" class="slab-thumb zoomable" title="🔍" onclick="WMS_APP.openImageLightbox('${it.image}', '${escapeHtml(it.displayName)}', '${escapeHtml(it.sku)}')" alt="Slab">` 
            : `<div class="slab-thumb">🏛</div>`;

          return `
            <tr>
              <td><span class="sku-code">${escapeHtml(it.sku)}</span></td>
              <td>
                <div class="slab-cell">
                  ${imgHtml}
                  <div>
                    <div style="font-weight:800; color:var(--text-primary); font-size:1.02rem;">${escapeHtml(it.displayName)}</div>
                    <div style="font-size:0.82rem; color:var(--text-muted);">${escapeHtml(it.dimensions)} | ${escapeHtml(it.thickness)} | ${escapeHtml(it.finishAr || it.finish)}</div>
                  </div>
                </div>
              </td>
              <td><span class="badge-location">${escapeHtml(it.displayLocation)}</span></td>
              <td><strong style="color:var(--primary); font-size:1.05rem;">${formatNum(it.totalQty)}</strong> ${slabWord}</td>
              <td><strong style="color:var(--warning); font-size:1.05rem;">${formatNum(it.reservedQty)}</strong> ${slabWord}</td>
              <td><strong style="color:var(--success); font-size:1.15rem;">${formatNum(it.availableQty)}</strong> ${slabWord}</td>
              <td>${formatCurrency(it.unitPrice)}</td>
              <td><strong style="color:var(--text-primary); font-size:1.05rem;">${formatCurrency(it.totalValuation)}</strong></td>
            </tr>
          `;
        }).join('');
      }
    }
  }

  function renderMarblePreviewView() {
    const search = (document.getElementById('marble-prev-search-input') || {}).value || '';
    const items = WMS_DB.getItems({ category: 'marble', search, lang: APP.lang });

    let totalSlabs = 0;
    let availableSlabs = 0;
    let reservedSlabs = 0;
    let totalVal = 0;

    items.forEach(it => {
      totalSlabs += it.totalQty;
      availableSlabs += it.availableQty;
      reservedSlabs += it.reservedQty;
      totalVal += it.totalValuation;
    });

    const kpiTotalEl = document.getElementById('marble-kpi-total');
    const kpiAvailEl = document.getElementById('marble-kpi-avail');
    const kpiResEl = document.getElementById('marble-kpi-res');
    const kpiValEl = document.getElementById('marble-kpi-val');

    const slabWord = t('unitSlab');
    if (kpiTotalEl) kpiTotalEl.textContent = `${formatNum(totalSlabs)} ${slabWord}`;
    if (kpiAvailEl) kpiAvailEl.textContent = `${formatNum(availableSlabs)} ${slabWord}`;
    if (kpiResEl) kpiResEl.textContent = `${formatNum(reservedSlabs)} ${slabWord}`;
    if (kpiValEl) kpiValEl.textContent = formatCurrency(totalVal);

    const tbody = document.getElementById('marble-preview-table-tbody');
    if (tbody) {
      if (items.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:2rem; color:var(--text-muted);">${t('noMarbleFound')}</td></tr>`;
      } else {
        tbody.innerHTML = items.map(it => {
          const imgHtml = it.image 
            ? `<img src="${it.image}" class="slab-thumb zoomable" title="🔍" onclick="WMS_APP.openImageLightbox('${it.image}', '${escapeHtml(it.displayName)}', '${escapeHtml(it.sku)}')" alt="Slab">` 
            : `<div class="slab-thumb">💎</div>`;

          return `
            <tr>
              <td><span class="sku-code">${escapeHtml(it.sku)}</span></td>
              <td>
                <div class="slab-cell">
                  ${imgHtml}
                  <div>
                    <div style="font-weight:800; color:var(--text-primary); font-size:1.02rem;">${escapeHtml(it.displayName)}</div>
                    <div style="font-size:0.82rem; color:var(--text-muted);">${escapeHtml(it.originAr || it.origin)} | ${escapeHtml(it.dimensions)} | ${escapeHtml(it.finishAr || it.finish)}</div>
                  </div>
                </div>
              </td>
              <td><span class="badge-location">${escapeHtml(it.displayLocation)}</span></td>
              <td><strong style="color:var(--primary); font-size:1.05rem;">${formatNum(it.totalQty)}</strong> ${slabWord}</td>
              <td><strong style="color:var(--warning); font-size:1.05rem;">${formatNum(it.reservedQty)}</strong> ${slabWord}</td>
              <td><strong style="color:var(--success); font-size:1.15rem;">${formatNum(it.availableQty)}</strong> ${slabWord}</td>
              <td>${formatCurrency(it.unitPrice)}</td>
              <td><strong style="color:var(--text-primary); font-size:1.05rem;">${formatCurrency(it.totalValuation)}</strong></td>
            </tr>
          `;
        }).join('');
      }
    }
  }

  // ==========================================================================
  // WOOD ORDERS (WITH 100% MULTI-LINGUAL SUPPORT, PERMIT NO & UNIVERSAL SEARCH)
  // ==========================================================================
  function renderWoodDeliveryView() {
    const status = (document.getElementById('wood-del-status-filter') || {}).value || 'all';
    const search = (document.getElementById('wood-del-search-input') || {}).value || '';
    const orders = WMS_DB.getWoodOrders({ status, search });

    const tbody = document.getElementById('wood-orders-tbody');
    if (tbody) {
      if (orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:2.5rem; color:var(--text-muted);">${t('noWoodPermitsFound')}</td></tr>`;
      } else {
        tbody.innerHTML = orders.map(o => {
          const dayName = getDayName(o.expectedDate);
          const repName = APP.lang === 'ar' ? (o.repNameAr || o.repName) : APP.lang === 'bn' ? (o.repNameBn || o.repName) : o.repName;
          const clientName = APP.lang === 'ar' ? (o.clientNameAr || o.clientName) : APP.lang === 'bn' ? (o.clientNameBn || o.clientName) : o.clientName;
          const workType = APP.lang === 'ar' ? (o.workTypeAr || o.workType || 'أعمال خشبية') : APP.lang === 'bn' ? (o.workTypeBn || o.workType || 'কাঠের কাজ') : (o.workType || 'Woodwork');
          const buyerName = APP.lang === 'ar' ? (o.buyerNameAr || o.buyerName) : APP.lang === 'bn' ? (o.buyerNameBn || o.buyerName) : o.buyerName;
          const statusText = t('filterScheduled');

          return `
            <tr>
              <td><span class="permit-no-badge">${escapeHtml(o.permitNo || o.orderNo)}</span></td>
              <td><strong style="color:var(--accent-wood); font-family:monospace; font-size:1rem;">${escapeHtml(o.orderNo)}</strong></td>
              <td><strong>${escapeHtml(repName)}</strong></td>
              <td><span class="badge-location">${escapeHtml(clientName)}</span></td>
              <td><span class="badge-wood-work">${escapeHtml(workType)}</span></td>
              <td>
                <div style="font-weight:800; font-size:0.98rem;">${escapeHtml(buyerName)}</div>
                <div style="font-size:0.82rem; color:var(--text-muted);">📞 ${escapeHtml(o.phone)}</div>
              </td>
              <td><strong style="color:var(--primary); font-size:1rem;">${escapeHtml(o.expectedDate || '-')}</strong></td>
              <td><strong style="color:var(--info); font-size:0.98rem;">${dayName}</strong></td>
              <td><span class="status-pill pill-available">${statusText}</span></td>
              <td>
                <div style="display:flex; gap:0.35rem;">
                  <button class="btn-secondary btn-sm" onclick="WMS_APP.openEditWoodPermitModal('${o.id}')" title="تعديل">✏</button>
                  <button class="btn-danger btn-sm" onclick="WMS_APP.deleteWoodOrder('${o.id}')" title="حذف">🗑</button>
                </div>
              </td>
            </tr>
          `;
        }).join('');
      }
    }
  }

  // ==========================================================================
  // MARBLE ORDERS (WITH 100% MULTI-LINGUAL SUPPORT, PERMIT NO & UNIVERSAL SEARCH)
  // ==========================================================================
  function renderMarbleDeliveryView() {
    const status = (document.getElementById('marble-del-status-filter') || {}).value || 'all';
    const search = (document.getElementById('marble-del-search-input') || {}).value || '';
    const orders = WMS_DB.getMarbleOrders({ status, search });

    const tbody = document.getElementById('marble-orders-tbody');
    if (tbody) {
      if (orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:2.5rem; color:var(--text-muted);">${t('noMarblePermitsFound')}</td></tr>`;
      } else {
        tbody.innerHTML = orders.map(o => {
          const dayName = getDayName(o.expectedDate);
          const repName = APP.lang === 'ar' ? (o.repNameAr || o.repName) : APP.lang === 'bn' ? (o.repNameBn || o.repName) : o.repName;
          const clientName = APP.lang === 'ar' ? (o.clientNameAr || o.clientName) : APP.lang === 'bn' ? (o.clientNameBn || o.clientName) : o.clientName;
          const buyerName = APP.lang === 'ar' ? (o.buyerNameAr || o.buyerName) : APP.lang === 'bn' ? (o.buyerNameBn || o.buyerName) : o.buyerName;
          const statusText = t('filterScheduled');

          return `
            <tr>
              <td><span class="permit-no-badge">${escapeHtml(o.permitNo || o.orderNo)}</span></td>
              <td><strong style="color:var(--accent-marble); font-family:monospace; font-size:1rem;">${escapeHtml(o.orderNo)}</strong></td>
              <td><strong>${escapeHtml(repName)}</strong></td>
              <td><span class="badge-location">${escapeHtml(clientName)}</span></td>
              <td>
                <div style="font-weight:800; font-size:0.98rem;">${escapeHtml(buyerName)}</div>
                <div style="font-size:0.82rem; color:var(--text-muted);">📞 ${escapeHtml(o.phone)}</div>
              </td>
              <td><strong style="color:var(--primary); font-size:1rem;">${escapeHtml(o.expectedDate || '-')}</strong></td>
              <td><strong style="color:var(--info); font-size:0.98rem;">${dayName}</strong></td>
              <td><span class="status-pill pill-available">${statusText}</span></td>
              <td>
                <div style="display:flex; gap:0.35rem;">
                  <button class="btn-secondary btn-sm" onclick="WMS_APP.openEditMarblePermitModal('${o.id}')" title="تعديل">✏</button>
                  <button class="btn-danger btn-sm" onclick="WMS_APP.deleteMarbleOrder('${o.id}')" title="حذف">🗑</button>
                </div>
              </td>
            </tr>
          `;
        }).join('');
      }
    }
  }

  // ==========================================================================
  // DIRECT A4 PRINT & EXCEL ENGINES
  // ==========================================================================
  function printInventoryDirect(category = 'porcelain') {
    const items = WMS_DB.getItems({ category, lang: APP.lang });
    const container = document.getElementById('a4-print-content-box');
    if (!container) return;

    const title = category === 'porcelain' 
      ? (APP.lang === 'ar' ? 'تقرير الجرد الرسمي لألواح البورسلان والسيراميك' : APP.lang === 'bn' ? 'চীনামাটির স্ল্যাব ইনভেন্টরি অডিট রিপোর্ট' : 'PORCELAIN SLABS INVENTORY AUDIT MANIFEST') 
      : (APP.lang === 'ar' ? 'تقرير الجرد الرسمي لألواح الرخام الطبيعي' : APP.lang === 'bn' ? 'মার্বেল স্ল্যাব ইনভেন্টরি অডিট রিপোর্ট' : 'NATURAL MARBLE SLABS INVENTORY AUDIT MANIFEST');

    const dateStr = new Date().toLocaleDateString(APP.lang === 'ar' ? 'ar-EG' : APP.lang === 'bn' ? 'bn-BD' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    let totalSlabs = 0;
    let totalVal = 0;
    items.forEach(it => {
      totalSlabs += it.totalQty;
      totalVal += it.totalValuation;
    });

    container.innerHTML = `
      <div style="text-align:center; border-bottom:2px solid #000; padding-bottom:12px; margin-bottom:16px;">
        <h2 style="font-size:1.45rem; font-weight:900; margin:0;">${t('appTitle')}</h2>
        <h3 style="font-size:1.1rem; font-weight:800; margin:4px 0;">${title}</h3>
        <p style="font-size:0.85rem; color:#444; margin:0;">${APP.lang === 'ar' ? 'المستند الرسمي للجرد الفعلي | تاريخ الجرد:' : APP.lang === 'bn' ? 'অফিসিয়াল ইনভেন্টরি অডিট নথি | তারিখ:' : 'Official Physical Slabs Audit Manifest | Date:'} ${dateStr}</p>
      </div>

      <table style="width:100%; border-collapse:collapse; font-size:9.5pt; margin-bottom:15px;" border="1">
        <thead>
          <tr style="background:#eee;">
            <th style="padding:7px;">${t('thSku')}</th>
            <th style="padding:7px;">${t('thName')}</th>
            <th style="padding:7px;">${t('thLocation')}</th>
            <th style="padding:7px; text-align:right;">${t('thTotalQty')}</th>
            <th style="padding:7px; text-align:right;">${t('thReservedQty')}</th>
            <th style="padding:7px; text-align:right;">${t('thAvailableQty')}</th>
            <th style="padding:7px; text-align:right;">${t('thValuation')}</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(it => `
            <tr>
              <td style="padding:6px; font-family:monospace; font-weight:bold;">${it.sku}</td>
              <td style="padding:6px; font-weight:bold;">${it.displayName}</td>
              <td style="padding:6px;">${it.displayLocation}</td>
              <td style="padding:6px; text-align:right; font-weight:bold;">${formatNum(it.totalQty)}</td>
              <td style="padding:6px; text-align:right; color:#b45309;">${formatNum(it.reservedQty)}</td>
              <td style="padding:6px; text-align:right; font-weight:bold; color:#15803d;">${formatNum(it.availableQty)}</td>
              <td style="padding:6px; text-align:right;">${formatCurrency(it.totalValuation)}</td>
            </tr>
          `).join('')}
          <tr style="background:#f8fafc; font-weight:bold;">
            <td colspan="3" style="padding:7px; text-align:${APP.lang === 'ar' ? 'right' : 'left'};">${APP.lang === 'ar' ? 'الإجمالي الكلي للألواح:' : APP.lang === 'bn' ? 'সর্বমোট স্ল্যাব:' : 'GRAND TOTAL:'}</td>
            <td style="padding:7px; text-align:right;">${formatNum(totalSlabs)}</td>
            <td colspan="2"></td>
            <td style="padding:7px; text-align:right;">${formatCurrency(totalVal)}</td>
          </tr>
        </tbody>
      </table>

      <div style="display:flex; justify-content:space-between; margin-top:35px; padding-top:12px; border-top:1px dashed #666; font-size:9pt;">
        <div>${APP.lang === 'ar' ? 'أمين المستودع: _________________' : APP.lang === 'bn' ? 'স্টোরকিপার: _________________' : 'Storekeeper: _________________'}</div>
        <div>${APP.lang === 'ar' ? 'مدير العمليات: _________________' : APP.lang === 'bn' ? 'অপারেশন ম্যানেজার: _________________' : 'Operations Manager: _________________'}</div>
        <div>${APP.lang === 'ar' ? 'الختم الرسمي' : APP.lang === 'bn' ? 'অফিসিয়াল সিল' : 'Official Seal'}</div>
      </div>
    `;

    openModal('modal-inventory-a4');
  }

  function openLeftoverModal(category = 'porcelain', originalSku = '') {
    const items = WMS_DB.getItems({ category, lang: APP.lang });
    let matchedItem = items.find(i => i.sku === originalSku);
    if (!matchedItem && items.length > 0) {
      matchedItem = items[0];
      originalSku = matchedItem.sku;
    }

    const titleEl = document.getElementById('cut-orig-item-title');
    const specsEl = document.getElementById('cut-orig-item-specs');
    
    if (matchedItem) {
      const origName = APP.lang === 'ar' ? (matchedItem.nameAr || matchedItem.name) : APP.lang === 'bn' ? (matchedItem.nameBn || matchedItem.name) : matchedItem.name;
      if (titleEl) titleEl.textContent = `[${matchedItem.sku}] ${origName}`;
      if (specsEl) specsEl.textContent = `${APP.lang === 'ar' ? 'المقاسات الأصلية' : 'Original'}: ${matchedItem.dimensions} | ${APP.lang === 'ar' ? 'السماكة' : 'Thickness'}: ${matchedItem.thickness} | ${APP.lang === 'ar' ? 'الموقع' : 'Location'}: ${matchedItem.displayLocation}`;
      document.getElementById('cut-orig-sku').value = matchedItem.sku;
      document.getElementById('cut-name').value = `${APP.lang === 'ar' ? 'هالك مقصوص من' : 'Cut remnant of'} ${origName}`;
      document.getElementById('cut-thickness').value = matchedItem.thickness || '12 mm';
      document.getElementById('cut-location').value = matchedItem.location || (APP.lang === 'ar' ? 'رف الهوالك 1' : 'Offcut Bay 1');
    } else {
      if (titleEl) titleEl.textContent = originalSku || (category === 'porcelain' ? 'POR-SLAB' : 'MAR-SLAB');
      if (specsEl) specsEl.textContent = '-';
      document.getElementById('cut-orig-sku').value = originalSku;
      document.getElementById('cut-name').value = APP.lang === 'ar' ? 'قطعة هالك مقصوصة' : 'Cut Remnant Slab';
      document.getElementById('cut-thickness').value = '12 mm';
      document.getElementById('cut-location').value = APP.lang === 'ar' ? 'رف الهوالك 1' : 'Offcut Bay 1';
    }

    document.getElementById('cut-material-type').value = category;
    document.getElementById('cut-dimensions').value = '';
    const qtyInput = document.getElementById('cut-slabs-qty');
    if (qtyInput) qtyInput.value = '0.5';

    openModal('modal-cut-leftover');
  }

  function exportFormattedExcel(category = 'porcelain') {
    const items = WMS_DB.getItems({ category, lang: APP.lang });
    const title = category === 'porcelain' 
      ? (APP.lang === 'ar' ? 'جرد ألواح البورسلان' : APP.lang === 'bn' ? 'চীনামাটির স্ল্যাব ইনভেন্টরি' : 'Porcelain Slabs Inventory')
      : (APP.lang === 'ar' ? 'جرد ألواح الرخام' : APP.lang === 'bn' ? 'মার্বেল স্ল্যাব ইনভেন্টরি' : 'Marble Slabs Inventory');
    const dateStr = new Date().toLocaleDateString();

    let rows = items.map((it, idx) => `
      <tr style="background-color: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
        <td style="border: 1px solid #cbd5e1; padding: 8px 12px; font-family: monospace; font-weight: bold; color: #4338ca;">${it.sku}</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 12px; font-weight: bold;">${it.displayName}</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 12px;">${it.displayLocation}</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 12px; text-align: right; font-weight: bold;">${formatNum(it.totalQty)}</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 12px; text-align: right; color: #d97706;">${formatNum(it.reservedQty)}</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 12px; text-align: right; font-weight: bold; color: #15803d;">${formatNum(it.availableQty)}</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 12px; text-align: right;">$ ${it.unitPrice}</td>
        <td style="border: 1px solid #cbd5e1; padding: 8px 12px; text-align: right; font-weight: bold;">$ ${it.totalValuation.toFixed(2)}</td>
      </tr>
    `).join('');

    const template = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
        <style>
          body { font-family: 'Cairo', 'Segoe UI', Calibri, Arial, sans-serif; font-size: 11pt; color: #1e293b; direction: ${APP.lang === 'ar' ? 'rtl' : 'ltr'}; }
          .header-box { background-color: #1e293b; color: #ffffff; padding: 14px; font-size: 16pt; font-weight: bold; }
          th { background-color: #334155; color: #ffffff; font-weight: bold; border: 1px solid #1e293b; padding: 10px; text-align: ${APP.lang === 'ar' ? 'right' : 'left'}; }
        </style>
      </head>
      <body>
        <div class="header-box">${t('appTitle')} — ${title}</div>
        <p>${t('thExpectedDate')}: ${dateStr}</p>
        <table border="1" cellpadding="6" cellspacing="0">
          <thead>
            <tr>
              <th>${t('thSku')}</th>
              <th>${t('thName')}</th>
              <th>${t('thLocation')}</th>
              <th>${t('thTotalQty')}</th>
              <th>${t('thReservedQty')}</th>
              <th>${t('thAvailableQty')}</th>
              <th>${t('thPrice')}</th>
              <th>${t('thValuation')}</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([template], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `WMS_${category}_${new Date().toISOString().slice(0, 10)}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(t('toastExcelExported'), 'success');
  }

  function openPrintStickerModal(cutId) {
    const leftovers = WMS_DB.getLeftovers('all');
    const cut = leftovers.find(c => c.id === cutId);
    if (!cut) return;

    const container = document.getElementById('sticker-tag-render-box');
    if (!container) return;

    const matType = cut.materialType === 'porcelain' 
      ? (APP.lang === 'ar' ? 'بورسلان' : APP.lang === 'bn' ? 'চীনামাটি' : 'Porcelain')
      : (APP.lang === 'ar' ? 'رخام' : APP.lang === 'bn' ? 'মার্বেল' : 'Marble');

    container.innerHTML = `
      <div class="remnant-tag-preview" id="printable-slab-sticker">
        <div class="tag-header">
          <h4>${t('appTitle')} — ${APP.lang === 'ar' ? 'ملصق تعريف اللوح' : APP.lang === 'bn' ? 'স্ল্যাব পরিচয় স্টিকার' : 'Slab Identification Sticker'}</h4>
          <p style="font-size:0.75rem; color:#475569; margin:0.2rem 0 0;">AL-ENTEJ WMS — WAREHOUSE PHYSICAL SLAB LABEL</p>
        </div>

        <div class="tag-barcode">*${cut.code}*</div>
        <div class="tag-code-text">${cut.code}</div>

        <!-- الصندوق البارز للمقاسات الباقية على اللوح -->
        <div class="tag-highlight-box">
          <div class="tag-highlight-title">${APP.lang === 'ar' ? 'المقاسات الباقية للوح' : APP.lang === 'bn' ? 'অবশিষ্ট স্ল্যাব মাত্রা' : 'REMAINING SLAB DIMENSIONS'}</div>
          <div class="tag-highlight-dims">📐 ${escapeHtml(cut.dimensions)}</div>
        </div>

        <div class="tag-specs-grid">
          <div><strong>${APP.lang === 'ar' ? 'نوع المادة' : 'Material'}:</strong> ${matType}</div>
          <div><strong>${APP.lang === 'ar' ? 'الكود الأصلي' : 'Orig SKU'}:</strong> ${escapeHtml(cut.originalSku)}</div>
          <div><strong>${APP.lang === 'ar' ? 'السماكة' : 'Thickness'}:</strong> ${escapeHtml(cut.thickness)}</div>
          <div><strong>${APP.lang === 'ar' ? 'موقع التخزين' : 'Location'}:</strong> ${escapeHtml(cut.locationAr || cut.location)}</div>
        </div>

        <div style="font-size:0.86rem; font-weight:800; color:#0f172a; margin-top:0.4rem;">${escapeHtml(cut.nameAr || cut.name)}</div>
        <div style="font-size:0.75rem; color:#64748b; margin-top:0.2rem;">${t('thExpectedDate')}: ${formatDate(cut.date)}</div>
      </div>
    `;

    openModal('modal-print-sticker');
  }

  function printStickerOnly() {
    const sticker = document.getElementById('sticker-tag-render-box');
    if (!sticker) return;

    const isRtl = APP.lang === 'ar';
    const printWin = window.open('', '_blank', 'width=520,height=600');
    if (!printWin) {
      window.print();
      return;
    }

    printWin.document.write(`
      <!DOCTYPE html>
      <html lang="${APP.lang}" dir="${isRtl ? 'rtl' : 'ltr'}">
      <head>
        <meta charset="UTF-8">
        <title>Slab Sticker - ${t('appTitle')}</title>
        <style>
          @page {
            size: auto;
            margin: 3mm;
          }
          body {
            margin: 0;
            padding: 3mm;
            font-family: 'Cairo', system-ui, -apple-system, sans-serif;
            background: #ffffff;
            color: #000000;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .remnant-tag-preview {
            width: 100%;
            max-width: 95mm;
            border: 3px solid #000000;
            border-radius: 6px;
            padding: 10px;
            text-align: center;
            box-sizing: border-box;
          }
          .tag-header {
            border-bottom: 2px solid #000000;
            padding-bottom: 4px;
            margin-bottom: 6px;
          }
          .tag-header h4 {
            margin: 0;
            font-size: 13pt;
            font-weight: 900;
            color: #000;
          }
          .tag-barcode {
            font-family: 'Libre Barcode 39', monospace, cursive;
            font-size: 38pt;
            line-height: 1;
            margin: 4px 0 2px;
            letter-spacing: 2px;
          }
          .tag-code-text {
            font-family: monospace;
            font-size: 11pt;
            font-weight: 900;
            letter-spacing: 2px;
            margin-bottom: 6px;
          }
          .tag-highlight-box {
            background: #fff;
            border: 2px dashed #000;
            border-radius: 4px;
            padding: 5px;
            margin-bottom: 6px;
            text-align: center;
          }
          .tag-highlight-title {
            font-size: 8pt;
            font-weight: 800;
            text-transform: uppercase;
          }
          .tag-highlight-dims {
            font-size: 16pt;
            font-weight: 900;
            letter-spacing: -0.01em;
          }
          .tag-specs-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3px 6px;
            text-align: ${isRtl ? 'right' : 'left'};
            font-size: 8.5pt;
            border: 1px solid #777;
            border-radius: 4px;
            padding: 5px 7px;
            margin-bottom: 5px;
          }
        </style>
      </head>
      <body>
        ${sticker.innerHTML}
        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() { window.close(); }, 500);
          };
        <\/script>
      </body>
      </html>
    `);
    printWin.document.close();
  }

  // ==========================================================================
  // SHORTCUT CHIP RENDERERS
  // ==========================================================================
  function renderChipsWithCreator(chipsContainerId, inputId, items, onDeleteCallback) {
    const container = document.getElementById(chipsContainerId);
    if (!container) return;

    if (!Array.isArray(items)) {
      items = [];
    }

    const chipsHtml = items.map(item => `
      <span class="quick-chip" onclick="document.getElementById('${inputId}').value='${item}'; document.getElementById('${inputId}').focus();">
        ${item}
        <span class="chip-del-btn" title="حذف" onclick="event.stopPropagation(); WMS_APP.${onDeleteCallback}('${item}')">×</span>
      </span>
    `).join('');

    container.innerHTML = chipsHtml;
  }

  function openReserveModal(itemId) {
    const item = WMS_DB.getItemById(itemId);
    if (!item) return;

    document.getElementById('res-item-id').value = item.id;
    document.getElementById('res-item-title').textContent = `${item.sku} - ${item.displayName}`;
    document.getElementById('res-available-qty').textContent = `${formatNum(item.availableQty)} ${t('unitSlab')}`;
    document.getElementById('res-qty-input').value = Math.min(5, Math.max(0.5, item.availableQty));
    document.getElementById('res-qty-input').max = item.availableQty;
    document.getElementById('res-qty-input').step = '0.5';
    document.getElementById('res-rep-input').value = '';
    document.getElementById('res-showroom-input').value = '';
    document.getElementById('res-client-input').value = '';
    document.getElementById('res-project-input').value = `PRJ-${Math.floor(1000 + Math.random() * 9000)}`;

    renderReserveChips();
    openModal('modal-reserve-material');
  }

  function renderReserveChips() {
    const presets = WMS_DB.getPresets(APP.lang);
    renderChipsWithCreator('res-rep-chips', 'res-rep-input', presets.reps, 'deleteRepPreset');
    renderChipsWithCreator('res-showroom-chips', 'res-showroom-input', presets.showrooms, 'deleteShowroomPreset');
  }

  // ==========================================================================
  // WMS_APP EXPORT
  // ==========================================================================
  const WMS_APP = {
    init() {
      const settings = WMS_DB.getSettings();
      this.setLanguage(settings.lang || 'ar');
      this.setTheme(settings.theme || 'dark');
      this.updateUserHeader();

      if (checkAuth()) {
        const hash = window.location.hash ? window.location.hash.replace('#', '') : 'hud';
        navigateTo(hash);
      }

      window.addEventListener('hashchange', () => {
        if (checkAuth()) {
          const hash = window.location.hash ? window.location.hash.replace('#', '') : 'hud';
          navigateTo(hash);
        }
      });
    },

    submitLogin(e) {
      e.preventDefault();
      try {
        WMS_DB.login(document.getElementById('login-username').value, document.getElementById('login-password').value);
        checkAuth();
        navigateTo('hud');
        showToast(t('toastLoginSuccess'), 'success');
      } catch (err) {
        showToast(err.message, 'danger');
      }
    },

    quickDemoLogin() {
      WMS_DB.login('admin', '123456');
      checkAuth();
      navigateTo('hud');
      showToast(t('toastLoginSuccess'), 'success');
    },

    logout() {
      WMS_DB.logout();
      checkAuth();
    },

    navigate(route) {
      navigateTo(route);
    },

    setLanguage(lang) {
      APP.lang = ['en', 'ar', 'bn'].includes(lang) ? lang : 'ar';
      document.documentElement.setAttribute('dir', APP.lang === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', APP.lang);
      WMS_DB.saveSettings({ lang: APP.lang });

      // 1. Translate all text elements and options
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.getAttribute('data-i18n');
        if (k && I18N[APP.lang] && I18N[APP.lang][k]) {
          el.textContent = I18N[APP.lang][k];
        }
      });

      // 2. Translate all input placeholders
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const k = el.getAttribute('data-i18n-placeholder');
        if (k && I18N[APP.lang] && I18N[APP.lang][k]) {
          el.setAttribute('placeholder', I18N[APP.lang][k]);
        }
      });

      // 3. Highlight language button
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === APP.lang);
      });

      renderReserveChips();
      renderWoodPermitChips();
      renderMarblePermitChips();
      this.updateUserHeader();
      renderCurrentView();
    },

    updateUserHeader() {
      const user = WMS_DB ? WMS_DB.getAuthUser() : null;
      const emailEl = document.getElementById('header-user-email');
      if (emailEl && user) {
        emailEl.textContent = user.email || user.username || 'admin@warehouse.local';
      }
    },

    setTheme(theme) {
      APP.theme = theme === 'light' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', APP.theme);
      WMS_DB.saveSettings({ theme: APP.theme });
      const btn = document.getElementById('theme-toggle-btn');
      if (btn) btn.textContent = APP.theme === 'light' ? '🌙' : '☀️';
    },

    toggleTheme() {
      this.setTheme(APP.theme === 'light' ? 'dark' : 'light');
    },

    stepStock(itemId, delta) {
      try {
        const updated = WMS_DB.adjustStock(itemId, delta);
        renderCurrentView();
        const slabWord = t('unitSlab');
        showToast(`${updated.sku}: ${t('toastStockUpdated')} (${formatNum(updated.quantity)} ${slabWord})`, 'info');
      } catch (err) {
        showToast(err.message, 'danger');
      }
    },

    openImageLightbox,
    openModal,
    closeModal,

    // ------------------------------------------------------------------------
    // EDIT & DELETE MATERIAL (PORCELAIN & MARBLE)
    // ------------------------------------------------------------------------
    openEditMaterialModal(itemId) {
      const item = WMS_DB.getItemById(itemId);
      if (!item) return;

      APP.editUploadedImage = item.image || '';
      document.getElementById('edit-item-id').value = item.id;
      document.getElementById('edit-item-sku').value = item.sku;
      document.getElementById('edit-item-name').value = item.displayName;
      document.getElementById('edit-item-dim').value = item.dimensions;
      document.getElementById('edit-item-thick').value = item.thickness;
      document.getElementById('edit-item-finish').value = item.finishAr || item.finish;
      document.getElementById('edit-item-loc').value = item.displayLocation;
      document.getElementById('edit-item-qty').value = item.totalQty;
      document.getElementById('edit-item-qty').step = '0.5';
      document.getElementById('edit-item-price').value = item.unitPrice;

      const preview = document.getElementById('edit-item-img-preview');
      if (preview) {
        preview.innerHTML = item.image 
          ? `<img src="${item.image}" style="width:100%; height:80px; object-fit:cover; border-radius:var(--radius-sm);" alt="Preview">`
          : `<span style="color:var(--text-muted); font-size:0.85rem;">${t('noImageSelected')}</span>`;
      }

      openModal('modal-edit-material');
    },

    handleEditImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (e) {
        APP.editUploadedImage = e.target.result;
        const preview = document.getElementById('edit-item-img-preview');
        if (preview) {
          preview.innerHTML = `<img src="${e.target.result}" style="width:100%; height:80px; object-fit:cover; border-radius:var(--radius-sm);" alt="Preview">`;
        }
      };
      reader.readAsDataURL(file);
    },

    submitEditMaterial(e) {
      e.preventDefault();
      try {
        const id = document.getElementById('edit-item-id').value;
        const updates = {
          sku: document.getElementById('edit-item-sku').value,
          name: document.getElementById('edit-item-name').value,
          dimensions: document.getElementById('edit-item-dim').value,
          thickness: document.getElementById('edit-item-thick').value,
          finish: document.getElementById('edit-item-finish').value,
          location: document.getElementById('edit-item-loc').value,
          quantity: parseFloat(document.getElementById('edit-item-qty').value) || 0,
          unitPrice: parseFloat(document.getElementById('edit-item-price').value) || 0,
          image: APP.editUploadedImage
        };

        WMS_DB.updateItem(id, updates);
        closeModal('modal-edit-material');
        renderCurrentView();
        showToast(t('toastItemUpdated'), 'success');
      } catch (err) {
        showToast(err.message, 'danger');
      }
    },

    deleteItem(itemId) {
      if (confirm(APP.lang === 'ar' ? 'هل أنت متأكد من حذف هذا الصنف وجميع سجلاته؟' : 'Delete this item permanently?')) {
        WMS_DB.deleteItem(itemId);
        renderCurrentView();
        showToast(t('toastItemDeleted'), 'info');
      }
    },

    // ------------------------------------------------------------------------
    // EDIT & DELETE LEFTOVERS
    // ------------------------------------------------------------------------
    openEditLeftoverModal(cutId) {
      const cut = WMS_DB.getLeftoverById(cutId);
      if (!cut) return;

      document.getElementById('edit-cut-id').value = cut.id;
      document.getElementById('edit-cut-name').value = cut.nameAr || cut.name;
      document.getElementById('edit-cut-dim').value = cut.dimensions;
      document.getElementById('edit-cut-thick').value = cut.thickness;
      document.getElementById('edit-cut-qty').value = cut.slabsQty;
      document.getElementById('edit-cut-qty').step = '0.5';
      document.getElementById('edit-cut-loc').value = cut.locationAr || cut.location;

      openModal('modal-edit-leftover');
    },

    submitEditLeftover(e) {
      e.preventDefault();
      try {
        const id = document.getElementById('edit-cut-id').value;
        const updates = {
          name: document.getElementById('edit-cut-name').value,
          dimensions: document.getElementById('edit-cut-dim').value,
          thickness: document.getElementById('edit-cut-thick').value,
          slabsQty: parseFloat(document.getElementById('edit-cut-qty').value) || 0.5,
          location: document.getElementById('edit-cut-loc').value
        };

        WMS_DB.updateLeftover(id, updates);
        closeModal('modal-edit-leftover');
        renderCurrentView();
        showToast(t('toastItemUpdated'), 'success');
      } catch (err) {
        showToast(err.message, 'danger');
      }
    },

    deleteLeftover(cutId) {
      if (confirm(APP.lang === 'ar' ? 'هل تريد حذف سجل قطعة الهالك؟' : 'Delete this remnant record?')) {
        WMS_DB.deleteLeftover(cutId);
        renderCurrentView();
        showToast(t('toastItemDeleted'), 'info');
      }
    },

    // ------------------------------------------------------------------------
    // EDIT & DELETE RESERVATIONS
    // ------------------------------------------------------------------------
    openEditReservationModal(resId) {
      const res = WMS_DB.getReservationById(resId);
      if (!res) return;

      document.getElementById('edit-res-id').value = res.id;
      document.getElementById('edit-res-qty').value = res.reservedQty;
      document.getElementById('edit-res-qty').step = '0.5';
      document.getElementById('edit-res-rep').value = res.repNameAr || res.repName;
      document.getElementById('edit-res-showroom').value = res.showroomNameAr || res.showroomName;
      document.getElementById('edit-res-client').value = res.clientNameAr || res.clientName;
      document.getElementById('edit-res-project').value = res.projectRef;

      openModal('modal-edit-reservation');
    },

    submitEditReservation(e) {
      e.preventDefault();
      try {
        const id = document.getElementById('edit-res-id').value;
        const updates = {
          reservedQty: parseFloat(document.getElementById('edit-res-qty').value) || 0.5,
          repName: document.getElementById('edit-res-rep').value,
          showroomName: document.getElementById('edit-res-showroom').value,
          clientName: document.getElementById('edit-res-client').value,
          projectRef: document.getElementById('edit-res-project').value
        };

        WMS_DB.updateReservation(id, updates);
        closeModal('modal-edit-reservation');
        renderCurrentView();
        showToast(t('toastItemUpdated'), 'success');
      } catch (err) {
        showToast(err.message, 'danger');
      }
    },

    // ------------------------------------------------------------------------
    // EDIT WOOD & MARBLE PERMITS (WITH PERMIT NO EDITING)
    // ------------------------------------------------------------------------
    openEditWoodPermitModal(orderId) {
      const order = WMS_DB.getWoodOrderById(orderId);
      if (!order) return;

      document.getElementById('edit-wood-id').value = order.id;
      document.getElementById('edit-wood-permit-no').value = order.permitNo || order.orderNo;
      document.getElementById('edit-wood-rep').value = order.repNameAr || order.repName;
      document.getElementById('edit-wood-showroom').value = order.clientNameAr || order.clientName;
      document.getElementById('edit-wood-work-type').value = order.workTypeAr || order.workType || '';
      document.getElementById('edit-wood-buyer').value = order.buyerNameAr || order.buyerName;
      document.getElementById('edit-wood-phone').value = order.phone;
      document.getElementById('edit-wood-date').value = order.expectedDate;
      this.updateDateDayBadge('edit-wood-date', 'edit-wood-day-badge');

      openModal('modal-edit-wood-permit');
    },

    submitEditWoodPermit(e) {
      e.preventDefault();
      try {
        const id = document.getElementById('edit-wood-id').value;
        const dateVal = document.getElementById('edit-wood-date').value;
        const updates = {
          permitNo: document.getElementById('edit-wood-permit-no').value.trim(),
          repName: document.getElementById('edit-wood-rep').value,
          clientName: document.getElementById('edit-wood-showroom').value,
          workType: document.getElementById('edit-wood-work-type').value,
          buyerName: document.getElementById('edit-wood-buyer').value,
          phone: document.getElementById('edit-wood-phone').value,
          expectedDate: dateVal,
          dayOfWeek: getDayName(dateVal)
        };

        WMS_DB.updateWoodOrder(id, updates);
        closeModal('modal-edit-wood-permit');
        renderCurrentView();
        showToast(t('toastItemUpdated'), 'success');
      } catch (err) {
        showToast(err.message, 'danger');
      }
    },

    openEditMarblePermitModal(orderId) {
      const order = WMS_DB.getMarbleOrderById(orderId);
      if (!order) return;

      document.getElementById('edit-mar-id').value = order.id;
      document.getElementById('edit-mar-permit-no').value = order.permitNo || order.orderNo;
      document.getElementById('edit-mar-rep').value = order.repNameAr || order.repName;
      document.getElementById('edit-mar-showroom').value = order.clientNameAr || order.clientName;
      document.getElementById('edit-mar-buyer').value = order.buyerNameAr || order.buyerName;
      document.getElementById('edit-mar-phone').value = order.phone;
      document.getElementById('edit-mar-date').value = order.expectedDate;
      this.updateDateDayBadge('edit-mar-date', 'edit-mar-day-badge');

      openModal('modal-edit-marble-permit');
    },

    submitEditMarblePermit(e) {
      e.preventDefault();
      try {
        const id = document.getElementById('edit-mar-id').value;
        const dateVal = document.getElementById('edit-mar-date').value;
        const updates = {
          permitNo: document.getElementById('edit-mar-permit-no').value.trim(),
          repName: document.getElementById('edit-mar-rep').value,
          clientName: document.getElementById('edit-mar-showroom').value,
          buyerName: document.getElementById('edit-mar-buyer').value,
          phone: document.getElementById('edit-mar-phone').value,
          expectedDate: dateVal,
          dayOfWeek: getDayName(dateVal)
        };

        WMS_DB.updateMarbleOrder(id, updates);
        closeModal('modal-edit-marble-permit');
        renderCurrentView();
        showToast(t('toastItemUpdated'), 'success');
      } catch (err) {
        showToast(err.message, 'danger');
      }
    },

    // Dynamic Shortcut Preset Creators
    addNewRepPreset(customInputId, targetFieldId, chipsContainerId) {
      const val = (document.getElementById(customInputId) || {}).value;
      if (!val || !val.trim()) return;
      WMS_DB.addPresetRep(val, APP.lang);
      document.getElementById(customInputId).value = '';
      if (document.getElementById(targetFieldId)) document.getElementById(targetFieldId).value = val.trim();
      const presets = WMS_DB.getPresets(APP.lang);
      renderChipsWithCreator(chipsContainerId, targetFieldId, presets.reps, 'deleteRepPreset');
      showToast(t('toastPresetAdded'), 'success');
    },

    deleteRepPreset(name) {
      WMS_DB.deletePresetRep(name, APP.lang);
      renderReserveChips();
      renderWoodPermitChips();
      renderMarblePermitChips();
    },

    addNewShowroomPreset(customInputId, targetFieldId, chipsContainerId) {
      const val = (document.getElementById(customInputId) || {}).value;
      if (!val || !val.trim()) return;
      WMS_DB.addPresetShowroom(val, APP.lang);
      document.getElementById(customInputId).value = '';
      if (document.getElementById(targetFieldId)) document.getElementById(targetFieldId).value = val.trim();
      const presets = WMS_DB.getPresets(APP.lang);
      renderChipsWithCreator(chipsContainerId, targetFieldId, presets.showrooms, 'deleteShowroomPreset');
      showToast(t('toastPresetAdded'), 'success');
    },

    deleteShowroomPreset(name) {
      WMS_DB.deletePresetShowroom(name, APP.lang);
      renderReserveChips();
      renderWoodPermitChips();
      renderMarblePermitChips();
    },

    addNewWoodJobTypePreset(customInputId, targetFieldId, chipsContainerId) {
      const val = (document.getElementById(customInputId) || {}).value;
      if (!val || !val.trim()) return;
      WMS_DB.addPresetWoodJobType(val, APP.lang);
      document.getElementById(customInputId).value = '';
      if (document.getElementById(targetFieldId)) document.getElementById(targetFieldId).value = val.trim();
      const presets = WMS_DB.getPresets(APP.lang);
      renderChipsWithCreator(chipsContainerId, targetFieldId, presets.woodJobTypes, 'deleteWoodJobTypePreset');
      showToast(t('toastPresetAdded'), 'success');
    },

    deleteWoodJobTypePreset(name) {
      WMS_DB.deletePresetWoodJobType(name, APP.lang);
      renderWoodPermitChips();
    },

    // Reservation Handlers
    openReserveModal,
    submitReserve(e) {
      e.preventDefault();
      try {
        const id = document.getElementById('res-item-id').value;
        const qty = parseFloat(document.getElementById('res-qty-input').value);
        const rep = document.getElementById('res-rep-input').value;
        const showroom = document.getElementById('res-showroom-input').value;
        const client = document.getElementById('res-client-input').value;
        const project = document.getElementById('res-project-input').value;

        WMS_DB.reserveMaterial(id, qty, rep, showroom, client, project);
        closeModal('modal-reserve-material');
        renderCurrentView();
        showToast(t('toastReservedSuccess'), 'success');
      } catch (err) {
        showToast(err.message, 'danger');
      }
    },

    cancelReservation(resId) {
      if (confirm(APP.lang === 'ar' ? 'هل أنت متأكد من إلغاء الحجز وإعادة الألواح للرصيد المتاح؟' : 'Release reserved slabs?')) {
        WMS_DB.cancelReservation(resId);
        renderCurrentView();
        showToast(APP.lang === 'ar' ? 'تم إلغاء الحجز وإعادة الألواح.' : 'Reservation released.', 'info');
      }
    },

    // Leftover Handlers
    openLeftoverModal,
    openPrintStickerModal,
    submitLeftover(e) {
      e.preventDefault();
      try {
        const data = {
          materialType: document.getElementById('cut-material-type').value,
          originalSku: document.getElementById('cut-orig-sku').value,
          name: document.getElementById('cut-name').value,
          dimensions: document.getElementById('cut-dimensions').value,
          thickness: document.getElementById('cut-thickness').value,
          slabsQty: parseFloat(document.getElementById('cut-slabs-qty').value) || 0.5,
          location: document.getElementById('cut-location').value
        };
        const cut = WMS_DB.addLeftover(data);
        closeModal('modal-cut-leftover');
        renderCurrentView();
        showToast(t('toastLeftoverSaved'), 'success');
        openPrintStickerModal(cut.id);
      } catch (err) {
        showToast(err.message, 'danger');
      }
    },

    // Wood Permit Handlers (Instant & Ultra Fast)
    openAddWoodPermitModal() {
      const permitInput = document.getElementById('wood-permit-no');
      if (permitInput) permitInput.value = WMS_DB.generateNextPermitNo('wood');
      
      const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
      setVal('wood-rep-name', '');
      setVal('wood-client-name', '');
      setVal('wood-work-type', '');
      setVal('wood-buyer-name', '');
      setVal('wood-phone', '');

      const today = new Date().toISOString().split('T')[0];
      setVal('wood-date', today);
      this.updateDateDayBadge('wood-date', 'wood-day-badge');

      renderWoodPermitChips();
      openModal('modal-wood-permit');
    },

    submitWoodPermit(e) {
      e.preventDefault();
      try {
        const dateVal = (document.getElementById('wood-date') || {}).value || new Date().toISOString().split('T')[0];
        const permitNo = ((document.getElementById('wood-permit-no') || {}).value || '').trim();
        const customWorkType = ((document.getElementById('wood-work-type') || {}).value || '').trim();
        const data = {
          permitNo: permitNo,
          repName: ((document.getElementById('wood-rep-name') || {}).value || '').trim(),
          clientName: ((document.getElementById('wood-client-name') || {}).value || '').trim(),
          workType: customWorkType || 'خزانة',
          buyerName: ((document.getElementById('wood-buyer-name') || {}).value || '').trim(),
          phone: ((document.getElementById('wood-phone') || {}).value || '').trim(),
          expectedDate: dateVal,
          dayOfWeek: getDayName(dateVal)
        };
        const newPermit = WMS_DB.addWoodOrder(data);
        closeModal('modal-wood-permit');
        renderCurrentView();
        const msg = `${t('toastPermitSaved')} [ ${newPermit.permitNo || newPermit.orderNo} ]`;
        showToast(msg, 'success');
      } catch (err) {
        showToast(err.message, 'danger');
      }
    },

    deleteWoodOrder(id) {
      if (confirm(APP.lang === 'ar' ? 'هل تريد حذف هذا الفسح؟' : 'Delete this permit?')) {
        WMS_DB.deleteWoodOrder(id);
        renderCurrentView();
        showToast(t('toastItemDeleted'), 'info');
      }
    },

    // Marble Permit Handlers (Instant & Ultra Fast)
    openAddMarblePermitModal() {
      const permitInput = document.getElementById('mar-permit-no');
      if (permitInput) permitInput.value = WMS_DB.generateNextPermitNo('marble');

      const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
      setVal('mar-rep-name', '');
      setVal('mar-client-name', '');
      setVal('mar-buyer-name', '');
      setVal('mar-phone', '');

      const today = new Date().toISOString().split('T')[0];
      setVal('mar-date', today);
      this.updateDateDayBadge('mar-date', 'mar-day-badge');

      renderMarblePermitChips();
      openModal('modal-marble-permit');
    },

    submitMarblePermit(e) {
      e.preventDefault();
      try {
        const dateVal = (document.getElementById('mar-date') || {}).value || new Date().toISOString().split('T')[0];
        const permitNo = ((document.getElementById('mar-permit-no') || {}).value || '').trim();
        const data = {
          permitNo: permitNo,
          repName: ((document.getElementById('mar-rep-name') || {}).value || '').trim(),
          clientName: ((document.getElementById('mar-client-name') || {}).value || '').trim(),
          buyerName: ((document.getElementById('mar-buyer-name') || {}).value || '').trim(),
          phone: ((document.getElementById('mar-phone') || {}).value || '').trim(),
          expectedDate: dateVal,
          dayOfWeek: getDayName(dateVal)
        };
        const newPermit = WMS_DB.addMarbleOrder(data);
        closeModal('modal-marble-permit');
        renderCurrentView();
        const msg = `${t('toastPermitSaved')} [ ${newPermit.permitNo || newPermit.orderNo} ]`;
        showToast(msg, 'success');
      } catch (err) {
        showToast(err.message, 'danger');
      }
    },

    deleteMarbleOrder(id) {
      if (confirm(APP.lang === 'ar' ? 'هل تريد حذف هذا الفسح؟' : 'Delete this permit?')) {
        WMS_DB.deleteMarbleOrder(id);
        renderCurrentView();
        showToast(t('toastItemDeleted'), 'info');
      }
    },

    updateDateDayBadge(dateInputId, badgeId) {
      const input = document.getElementById(dateInputId);
      const badge = document.getElementById(badgeId);
      if (input && badge) {
        const day = getDayName(input.value);
        badge.textContent = `📅 ${day}`;
      }
    },

    // Add Material & Image Upload (With 0.5 step & 100% dynamic localized defaults)
    openAddMaterialModal(category) {
      APP.currentUploadedImage = '';
      const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
      setVal('new-item-category', category);
      setVal('new-item-sku', ''); // Blank as requested by user
      setVal('new-item-name', '');
      setVal('new-item-dim', category === 'porcelain' ? '160x320 cm' : '320x75 cm');
      setVal('new-item-thick', '12 mm');
      
      // Dynamic localized default finish
      setVal('new-item-finish', APP.lang === 'ar' ? 'ملمع' : APP.lang === 'bn' ? 'পালিশ' : 'Polished');
      
      // Dynamic localized default location
      if (category === 'porcelain') {
        setVal('new-item-loc', APP.lang === 'ar' ? 'المستودع أ-01' : APP.lang === 'bn' ? 'বে এ-০১' : 'Bay A-01');
      } else {
        setVal('new-item-loc', APP.lang === 'ar' ? 'الساحة الشرقية 01' : APP.lang === 'bn' ? 'ইয়ার্ড পূর্ব-০১' : 'Yard East-01');
      }
      
      setVal('new-item-qty', '20');
      const qtyEl = document.getElementById('new-item-qty');
      if (qtyEl) qtyEl.step = '0.5';
      setVal('new-item-price', category === 'porcelain' ? '280' : '420');

      const preview = document.getElementById('new-item-img-preview');
      if (preview) preview.innerHTML = `<span style="color:var(--text-muted); font-size:0.85rem;">${t('noImageSelected')}</span>`;

      openModal('modal-add-material');
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (e) {
        APP.currentUploadedImage = e.target.result;
        const preview = document.getElementById('new-item-img-preview');
        if (preview) {
          preview.innerHTML = `<img src="${e.target.result}" style="width:100%; height:80px; object-fit:cover; border-radius:var(--radius-sm);" alt="Preview">`;
        }
      };
      reader.readAsDataURL(file);
    },

    submitAddMaterial(e) {
      e.preventDefault();
      try {
        const cat = document.getElementById('new-item-category').value;
        const item = {
          sku: document.getElementById('new-item-sku').value,
          name: document.getElementById('new-item-name').value,
          category: cat,
          dimensions: document.getElementById('new-item-dim').value,
          thickness: document.getElementById('new-item-thick').value,
          finish: document.getElementById('new-item-finish').value,
          location: document.getElementById('new-item-loc').value,
          quantity: parseFloat(document.getElementById('new-item-qty').value) || 0,
          unitPrice: parseFloat(document.getElementById('new-item-price').value) || 0,
          image: APP.currentUploadedImage || ''
        };

        WMS_DB.addItem(item);
        closeModal('modal-add-material');
        renderCurrentView();
        showToast(APP.lang === 'ar' ? 'تمت إضافة لوح المادة بنجاح.' : 'Material slab added.', 'success');
      } catch (err) {
        showToast(err.message, 'danger');
      }
    },

    previewInventory(category = 'porcelain') {
      navigateTo(category === 'porcelain' ? 'porcelain-preview' : 'marble-preview');
    },

    exportFormattedExcel,
    printInventoryDirect,
    printStickerOnly,
    switchTab(category, tabName) {
      if (category === 'porcelain') {
        APP.porcelainTab = tabName;
        document.querySelectorAll('.porcelain-tab-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === tabName));
        document.querySelectorAll('.porcelain-tab-content').forEach(c => c.style.display = c.id === `porcelain-tab-${tabName}` ? 'block' : 'none');
      } else if (category === 'marble') {
        APP.marbleTab = tabName;
        document.querySelectorAll('.marble-tab-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === tabName));
        document.querySelectorAll('.marble-tab-content').forEach(c => c.style.display = c.id === `marble-tab-${tabName}` ? 'block' : 'none');
      }
    },
    filterRoute() {
      renderCurrentView();
    }
  };

  function renderWoodPermitChips() {
    const presets = WMS_DB.getPresets(APP.lang);
    renderChipsWithCreator('wood-rep-chips', 'wood-rep-name', presets.reps, 'deleteRepPreset');
    renderChipsWithCreator('wood-showroom-chips', 'wood-client-name', presets.showrooms, 'deleteShowroomPreset');
    renderChipsWithCreator('wood-work-type-chips', 'wood-work-type', presets.woodJobTypes, 'deleteWoodJobTypePreset');
  }

  function renderMarblePermitChips() {
    const presets = WMS_DB.getPresets(APP.lang);
    renderChipsWithCreator('mar-rep-chips', 'mar-rep-name', presets.reps, 'deleteRepPreset');
    renderChipsWithCreator('mar-showroom-chips', 'mar-client-name', presets.showrooms, 'deleteShowroomPreset');
  }

  window.WMS_APP = WMS_APP;
  window.showToast = showToast;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => WMS_APP.init());
  } else {
    WMS_APP.init();
  }
})();
