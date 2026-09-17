import { RaceCategory, RegistrationOrder, ShirtSize } from '@/types';

export const INITIAL_CATEGORIES: RaceCategory[] = [
  {
    id: 'nature-walk',
    slug: 'nature-walk',
    name: 'Nature Walk',
    distance: '3 กม.',
    distanceKm: 3,
    elevation: '+45m',
    price: 450,
    quota: 400,
    remaining: 165,
    startTime: '06:30 น.',
    cutoffTime: '08:30 น. (2 ชม.)',
    targetAudience: 'ผู้รักธรรมชาติ มือใหม่ และผู้สูงอายุ',
    challengeLevel: 'ระดับง่าย (Easy)',
    perks: [
      'เสื้อวิ่งที่ระลึกผ้าแห้งไว Recycled Poly',
      'เหรียญรางวัลรักษ์โลก ไม้จากป่าปลูก',
      'อาหารและเครื่องดื่มพื้นถิ่นวังน้ำเขียว',
      'ประกันอุบัติเหตุตลอดกิจกรรม',
      'คู่มือศึกษาธรรมชาติผืนป่าวังหมี'
    ],
    description: 'เส้นทางเดินเท้าชมธรรมชาติเลียบแนวป่าชุมชนวังหมี สัมผัสความอุดมสมบูรณ์และระบบนิเวศ เรียนรู้จุดหากินของกระทิงป่าพร้อมไกด์ท้องถิ่น',
    imageLabel: 'เส้นทางธรรมชาติเลียบผืนป่าวังหมี 3 กม.'
  },
  {
    id: 'family-run',
    slug: 'family-run',
    name: 'Family Run',
    distance: '4.2 กม.',
    distanceKm: 4.2,
    elevation: '+85m',
    price: 650,
    quota: 500,
    remaining: 198,
    startTime: '06:00 น.',
    cutoffTime: '08:00 น. (2 ชม.)',
    targetAudience: 'ครอบครัวและกลุ่มเพื่อน',
    challengeLevel: 'ระดับปานกลาง (Medium)',
    perks: [
      'เสื้อวิ่งดีไซน์พิเศษ Green Edition',
      'เหรียญรางวัล Finisher ลายกระทิงวังหมี',
      'Bib พร้อมชิปจับเวลา (Bib Timing)',
      'ชุดอาหารเช้าสลัดออร์แกนิกวังน้ำเขียว',
      'กิจกรรมเวิร์กชอปเรียนรู้ธรรมชาติครอบครัว',
      'ประกันอุบัติเหตุตลอดงาน'
    ],
    description: 'เส้นทางวิ่งเพื่อการเรียนรู้สำหรับทุกคนในครอบครัว ลัดเลาะผ่านสวนเกษตรอินทรีย์และทุ่งหญ้าธรรมชาติ มีฐานกิจกรรมเชิงนิเวศตลอดเส้นทาง',
    imageLabel: 'ทิวทัศน์และฐานการเรียนรู้ Family Run 4.2 กม.'
  },
  {
    id: 'mini-trail',
    slug: 'mini-trail',
    name: 'Mini Trail',
    distance: '12 กม.',
    distanceKm: 12,
    elevation: '+320m',
    price: 850,
    quota: 300,
    remaining: 74,
    startTime: '05:30 น.',
    cutoffTime: '09:00 น. (3.5 ชม.)',
    targetAudience: 'นักวิ่งเทรลและผู้ต้องการความท้าทาย',
    challengeLevel: 'ระดับท้าทาย (Challenging Trail)',
    perks: [
      'เสื้อ Finisher Technical Trail Shirt',
      'เหรียญรางวัลหล่อโลหะผสมลายเอกลักษณ์',
      'ระบบจับเวลาอิเล็กทรอนิกส์มาตรฐานสากล',
      'จุดบริการน้ำดื่มและเกลือแร่ 3 จุดมาตรฐาน',
      'รถพยาบาลฉุกเฉินและหน่วยกู้ภัยพร้อมตลอดแนวเขา',
      'E-Certificate รับรองผลการแข่งขัน'
    ],
    description: 'เส้นทางเทรลแท้ผ่านสันเขา ป่าไผ่ และแนวเขตห้ามล่าสัตว์ป่า สัมผัสอากาศบริสุทธิ์และวิวมุมสูง 360 องศาของเทือกเขาดงพญาเย็น',
    imageLabel: 'ทางลาดชันและวิวเทือกเขามินิเทรล 12 กม.'
  }
];

export const INITIAL_REGISTRATIONS: RegistrationOrder[] = [
  {
    id: 'reg-001',
    registrationCode: 'RLL-2026-8801',
    bibNumber: 'A-3012',
    categoryId: 'mini-trail',
    categoryName: 'Mini Trail (12 กม.)',
    regType: 'single',
    participants: [
      {
        id: 'p-1',
        fullNameTh: 'นัฐกิตติ์ สุขสวัสดิ์',
        fullNameEn: 'Nattagid Suksawat',
        bibName: 'GIG RUNNER',
        birthDate: '1992-05-14',
        gender: 'male',
        phone: '0812345678',
        email: 'runner.gig@example.com',
        province: 'นครราชสีมา',
        idCardLast4: '4589',
        shirtSize: 'L',
        isPrimary: true
      }
    ],
    medical: {
      hasChronicDisease: 'none',
      hasAllergy: 'none',
      hasPhysicalLimitation: 'none',
      emergencyContactName: 'สมใจ สุขสวัสดิ์',
      emergencyContactRelation: 'พี่สาว',
      emergencyContactPhone: '0899887766'
    },
    kitDelivery: {
      method: 'delivery',
      recipientName: 'นัฐกิตติ์ สุขสวัสดิ์',
      phone: '0812345678',
      address: '123/45 หมู่ 6 ต.วังหมี อ.วังน้ำเขียว',
      subdistrict: 'วังหมี',
      district: 'วังน้ำเขียว',
      province: 'นครราชสีมา',
      postalCode: '30370',
      deliveryFee: 60
    },
    consents: {
      isInfoAccurate: true,
      acceptTerms: true,
      acceptPdpa: true,
      acceptPhotoConsent: true,
      acknowledgeRisks: true
    },
    amount: 910,
    paymentMethod: 'promptpay',
    paymentStatus: 'verified',
    status: 'confirmed',
    createdAt: '2026-09-15T09:30:00Z',
    paidAt: '2026-09-15T09:35:12Z'
  },
  {
    id: 'reg-002',
    registrationCode: 'RLL-2026-8802',
    bibNumber: 'B-4055',
    categoryId: 'family-run',
    categoryName: 'Family Run (4.2 กม.)',
    regType: 'family',
    participants: [
      {
        id: 'p-2',
        fullNameTh: 'พิมลภัส รักษ์ไพร',
        fullNameEn: 'Pimonpat Rakprai',
        bibName: 'PIM',
        birthDate: '1988-11-20',
        gender: 'female',
        phone: '0845551234',
        email: 'pimonpat.r@example.com',
        province: 'กรุงเทพมหานคร',
        idCardLast4: '1124',
        shirtSize: 'M',
        isPrimary: true
      },
      {
        id: 'p-3',
        fullNameTh: 'เด็กชายกวินทร์ รักษ์ไพร',
        fullNameEn: 'Kawin Rakprai',
        bibName: 'KAWIN',
        birthDate: '2016-04-10',
        gender: 'male',
        phone: '0845551234',
        email: 'pimonpat.r@example.com',
        province: 'กรุงเทพมหานคร',
        idCardLast4: '8872',
        shirtSize: 'XS'
      }
    ],
    medical: {
      hasChronicDisease: 'none',
      hasAllergy: 'have',
      allergyDetail: 'แพ้อาหารทะเลชนิดกุ้ง',
      hasPhysicalLimitation: 'none',
      emergencyContactName: 'ธีรเดช รักษ์ไพร',
      emergencyContactRelation: 'สามี',
      emergencyContactPhone: '0823334444'
    },
    kitDelivery: {
      method: 'self',
      deliveryFee: 0
    },
    consents: {
      isInfoAccurate: true,
      acceptTerms: true,
      acceptPdpa: true,
      acceptPhotoConsent: true,
      acknowledgeRisks: true
    },
    amount: 1300,
    paymentMethod: 'promptpay',
    paymentStatus: 'verified',
    status: 'checked_in',
    createdAt: '2026-09-16T11:15:00Z',
    paidAt: '2026-09-16T11:22:00Z',
    checkedInAt: '2026-09-17T06:10:00Z'
  },
  {
    id: 'reg-003',
    registrationCode: 'RLL-2026-8803',
    bibNumber: 'C-2089',
    categoryId: 'nature-walk',
    categoryName: 'Nature Walk (3 กม.)',
    regType: 'single',
    participants: [
      {
        id: 'p-4',
        fullNameTh: 'อรรถพล พิทักษ์ป่า',
        fullNameEn: 'Attapol Pitakpa',
        bibName: 'ATTAPOL',
        birthDate: '1975-02-18',
        gender: 'male',
        phone: '0897778899',
        email: 'attapol.p@example.com',
        province: 'นครนายก',
        idCardLast4: '9034',
        shirtSize: 'XL',
        isPrimary: true
      }
    ],
    medical: {
      hasChronicDisease: 'have',
      chronicDiseaseDetail: 'ความดันโลหิตสูง (ทานยาควบคุมสม่ำเสมอ)',
      hasAllergy: 'none',
      hasPhysicalLimitation: 'none',
      emergencyContactName: 'วาสนา พิทักษ์ป่า',
      emergencyContactRelation: 'ภรรยา',
      emergencyContactPhone: '0814445566'
    },
    kitDelivery: {
      method: 'early',
      deliveryFee: 0
    },
    consents: {
      isInfoAccurate: true,
      acceptTerms: true,
      acceptPdpa: true,
      acceptPhotoConsent: true,
      acknowledgeRisks: true
    },
    amount: 450,
    paymentMethod: 'promptpay',
    paymentStatus: 'pending',
    status: 'pending_payment',
    createdAt: '2026-09-17T07:20:00Z'
  }
];

const STORAGE_KEYS = {
  REGISTRATIONS: 'rll_registrations_v1',
  CATEGORIES: 'rll_categories_v1',
  DRAFT: 'rll_registration_draft_v1',
  MEDIA: 'rll_media_assets_v1',
  RESERVATIONS: 'rll_quota_reservations_v1'
};

// Client-side helper safely checking window
function getStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export const db = {
  getCategories(): RaceCategory[] {
    return getStorage<RaceCategory[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  },

  getCategory(id: string): RaceCategory | undefined {
    const categories = this.getCategories();
    return categories.find(c => c.id === id || c.slug === id);
  },

  reserveQuota(categoryId: string, count: number = 1): { success: boolean; reservationId?: string; message?: string } {
    const categories = this.getCategories();
    const category = categories.find(c => c.id === categoryId);
    if (!category) return { success: false, message: 'ไม่พบประเภทกิจกรรม' };

    if (category.remaining < count) {
      return { success: false, message: 'ขออภัย โควตาเต็มหรือเหลือน้อยกว่าจำนวนที่ต้องการ' };
    }

    // Atomic decrease simulation
    category.remaining -= count;
    setStorage(STORAGE_KEYS.CATEGORIES, categories);

    const reservationId = `RES-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    return { success: true, reservationId };
  },

  saveDraft(draft: Record<string, unknown>): void {
    setStorage(STORAGE_KEYS.DRAFT, {
      ...draft,
      savedAt: new Date().toISOString()
    });
  },

  getDraft(): Record<string, unknown> | null {
    return getStorage<Record<string, unknown> | null>(STORAGE_KEYS.DRAFT, null);
  },

  clearDraft(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_KEYS.DRAFT);
    } catch {
      // ignore
    }
  },

  getRegistrations(): RegistrationOrder[] {
    return getStorage<RegistrationOrder[]>(STORAGE_KEYS.REGISTRATIONS, INITIAL_REGISTRATIONS);
  },

  getRegistration(idOrCode: string): RegistrationOrder | undefined {
    const list = this.getRegistrations();
    const clean = idOrCode.trim().toLowerCase();
    return list.find(r => 
      r.id.toLowerCase() === clean || 
      r.registrationCode.toLowerCase() === clean ||
      r.bibNumber.toLowerCase() === clean ||
      r.participants.some(p => p.phone === clean || p.email.toLowerCase() === clean)
    );
  },

  createRegistration(order: Omit<RegistrationOrder, 'id' | 'registrationCode' | 'bibNumber' | 'createdAt'>): RegistrationOrder {
    const list = this.getRegistrations();
    const codeNum = 8800 + list.length + 1;
    const registrationCode = `RLL-2026-${codeNum}`;

    let prefix = 'A';
    if (order.categoryId === 'family-run') prefix = 'B';
    if (order.categoryId === 'nature-walk') prefix = 'C';
    const bibNumber = `${prefix}-${2000 + list.length + 1}`;

    const newOrder: RegistrationOrder = {
      ...order,
      id: `reg-${Date.now()}`,
      registrationCode,
      bibNumber,
      createdAt: new Date().toISOString()
    };

    const updated = [newOrder, ...list];
    setStorage(STORAGE_KEYS.REGISTRATIONS, updated);
    this.clearDraft();
    return newOrder;
  },

  updateRegistration(id: string, updates: Partial<RegistrationOrder>): RegistrationOrder | null {
    const list = this.getRegistrations();
    const idx = list.findIndex(r => r.id === id);
    if (idx === -1) return null;

    list[idx] = { ...list[idx], ...updates };
    setStorage(STORAGE_KEYS.REGISTRATIONS, list);
    return list[idx];
  },

  checkinParticipant(codeOrBib: string): { success: boolean; registration?: RegistrationOrder; message: string } {
    const reg = this.getRegistration(codeOrBib);
    if (!reg) {
      return { success: false, message: 'ไม่พบข้อมูลเลขที่สมัครหรือเบอร์ Bib ในระบบ' };
    }

    if (reg.paymentStatus !== 'verified') {
      return { success: false, registration: reg, message: 'รายการนี้ยังไม่ได้ชำระเงิน หรือยังรอการตรวจสอบ' };
    }

    if (reg.status === 'checked_in') {
      return { 
        success: false, 
        registration: reg, 
        message: `ผู้สมัครนี้ได้ Check-in ไปแล้วเมื่อ ${new Date(reg.checkedInAt || '').toLocaleTimeString('th-TH')}` 
      };
    }

    const updated = this.updateRegistration(reg.id, {
      status: 'checked_in',
      checkedInAt: new Date().toISOString()
    });

    return { 
      success: true, 
      registration: updated || reg, 
      message: 'เช็กอินนักวิ่งสำเร็จเรียบร้อย พร้อมมอบ Race Kit' 
    };
  },

  getAdminStats() {
    const list = this.getRegistrations();
    const categories = this.getCategories();

    const totalRegistrations = list.length;
    const paidCount = list.filter(r => r.paymentStatus === 'verified').length;
    const pendingPaymentCount = list.filter(r => r.paymentStatus === 'pending').length;
    const checkedInCount = list.filter(r => r.status === 'checked_in').length;
    const totalRevenue = list
      .filter(r => r.paymentStatus === 'verified')
      .reduce((sum, r) => sum + r.amount, 0);

    const shirtCounts: Record<ShirtSize, number> = {
      'XS': 0, 'S': 0, 'M': 0, 'L': 0, 'XL': 0, '2XL': 0, '3XL': 0
    };

    list.forEach(r => {
      r.participants.forEach(p => {
        if (p.shirtSize && shirtCounts[p.shirtSize] !== undefined) {
          shirtCounts[p.shirtSize] += 1;
        }
      });
    });

    return {
      totalRegistrations,
      paidCount,
      pendingPaymentCount,
      checkedInCount,
      totalRevenue,
      categories,
      shirtCounts
    };
  }
};
