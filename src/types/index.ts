export type RegType = 'single' | 'family' | 'group';

export type ShirtSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';

export type DeliveryMethod = 'self' | 'early' | 'delivery' | 'proxy';

export type RegistrationStatus = 
  | 'draft' 
  | 'pending_payment' 
  | 'payment_review' 
  | 'confirmed' 
  | 'kit_ready' 
  | 'checked_in' 
  | 'finished' 
  | 'cancelled';

export interface RaceCategory {
  id: string;
  slug: string;
  name: string;
  distance: string;
  distanceKm: number;
  elevation: string;
  price: number;
  quota: number;
  remaining: number;
  startTime: string;
  cutoffTime: string;
  targetAudience: string;
  challengeLevel: string;
  perks: string[];
  description: string;
  imageLabel: string;
}

export interface ParticipantInfo {
  id: string;
  fullNameTh: string;
  fullNameEn: string;
  bibName: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email: string;
  province: string;
  idCardLast4: string;
  shirtSize: ShirtSize;
  isPrimary?: boolean;
}

export interface MedicalInfo {
  hasChronicDisease: 'none' | 'have' | 'unsure';
  chronicDiseaseDetail?: string;
  hasAllergy: 'none' | 'have' | 'unsure';
  allergyDetail?: string;
  currentMedications?: string;
  hasPhysicalLimitation: 'none' | 'have' | 'unsure';
  physicalLimitationDetail?: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
  emergencyContactAltPhone?: string;
}

export interface RaceKitDelivery {
  method: DeliveryMethod;
  recipientName?: string;
  phone?: string;
  address?: string;
  subdistrict?: string;
  district?: string;
  province?: string;
  postalCode?: string;
  deliveryFee: number;
  proxyAuthorizedPerson?: string;
}

export interface ConsentInfo {
  isInfoAccurate: boolean;
  acceptTerms: boolean;
  acceptPdpa: boolean;
  acceptPhotoConsent: boolean;
  acknowledgeRisks: boolean;
}

export interface RegistrationOrder {
  id: string;
  registrationCode: string;
  bibNumber: string;
  categoryId: string;
  categoryName: string;
  regType: RegType;
  participants: ParticipantInfo[];
  medical: MedicalInfo;
  kitDelivery: RaceKitDelivery;
  consents: ConsentInfo;
  amount: number;
  paymentMethod: 'promptpay' | 'credit_card';
  paymentStatus: 'pending' | 'verified' | 'failed';
  status: RegistrationStatus;
  createdAt: string;
  paidAt?: string;
  checkedInAt?: string;
  slipUrl?: string;
  notes?: string;
}
