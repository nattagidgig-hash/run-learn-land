"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { db, INITIAL_CATEGORIES } from "@/lib/db";
import {
  RaceCategory,
  RegType,
  ShirtSize,
  DeliveryMethod,
  ParticipantInfo,
  MedicalInfo,
  RaceKitDelivery,
  ConsentInfo
} from "@/types";
import {
  IconRoute,
  IconUserEdit,
  IconHeartbeat,
  IconShirt,
  IconShieldCheck,
  IconCreditCard,
  IconCircleCheck,
  IconArrowLeft,
  IconArrowRight,
  IconPlus,
  IconTrash,
  IconInfoCircle,
  IconQrcode,
  IconCheck,
  IconDownload,
  IconPrinter
} from "@tabler/icons-react";
import { QRCodeSVG } from "qrcode.react";
import confetti from "canvas-confetti";

const SHIRT_SIZES: { size: ShirtSize; chest: string; length: string }[] = [
  { size: "XS", chest: '34"', length: '25"' },
  { size: "S", chest: '36"', length: '26"' },
  { size: "M", chest: '38"', length: '27"' },
  { size: "L", chest: '40"', length: '28"' },
  { size: "XL", chest: '42"', length: '29"' },
  { size: "2XL", chest: '44"', length: '30"' },
  { size: "3XL", chest: '46"', length: '31"' },
];

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Current Step: 1 to 6 (or 7 for success)
  const [step, setStep] = useState<number>(1);

  // Categories
  const categories = INITIAL_CATEGORIES;
  const initialCat = searchParams?.get("category") || "family-run";
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialCat);
  const selectedCategory = categories.find((c) => c.id === selectedCategoryId) || categories[0];

  // Registration Type
  const [regType, setRegType] = useState<RegType>("single");

  // Participants
  const [participants, setParticipants] = useState<ParticipantInfo[]>([
    {
      id: "p-primary",
      fullNameTh: "",
      fullNameEn: "",
      bibName: "",
      birthDate: "",
      gender: "male",
      phone: "",
      email: "",
      province: "นครราชสีมา",
      idCardLast4: "",
      shirtSize: "L",
      isPrimary: true,
    },
  ]);

  // Medical and Emergency
  const [medical, setMedical] = useState<MedicalInfo>({
    hasChronicDisease: "none",
    chronicDiseaseDetail: "",
    hasAllergy: "none",
    allergyDetail: "",
    currentMedications: "",
    hasPhysicalLimitation: "none",
    physicalLimitationDetail: "",
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactPhone: "",
    emergencyContactAltPhone: "",
  });

  // Kit Delivery
  const [delivery, setDelivery] = useState<RaceKitDelivery>({
    method: "self",
    recipientName: "",
    phone: "",
    address: "",
    subdistrict: "",
    district: "",
    province: "",
    postalCode: "",
    deliveryFee: 0,
    proxyAuthorizedPerson: "",
  });

  // Consents
  const [consents, setConsents] = useState<ConsentInfo>({
    isInfoAccurate: false,
    acceptTerms: false,
    acceptPdpa: false,
    acceptPhotoConsent: false,
    acknowledgeRisks: false,
  });

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<"promptpay" | "credit_card">("promptpay");
  const [slipUploaded, setSlipUploaded] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Success Result
  const [successOrder, setSuccessOrder] = useState<any>(null);

  // Size chart modal
  const [showSizeModal, setShowSizeModal] = useState(false);

  // Error validation states
  const [validationError, setValidationError] = useState<string>("");

  // Load draft on mount
  useEffect(() => {
    const draft = db.getDraft();
    if (draft) {
      if (draft.selectedCategoryId) setSelectedCategoryId(draft.selectedCategoryId as string);
      if (draft.regType) setRegType(draft.regType as RegType);
      if (draft.participants) setParticipants(draft.participants as ParticipantInfo[]);
      if (draft.medical) setMedical(draft.medical as MedicalInfo);
      if (draft.delivery) setDelivery(draft.delivery as RaceKitDelivery);
      if (draft.step && typeof draft.step === "number" && draft.step < 7) {
        setStep(draft.step);
      }
    }
  }, []);

  // Auto-save draft on changes
  useEffect(() => {
    if (step < 7) {
      db.saveDraft({
        step,
        selectedCategoryId,
        regType,
        participants,
        medical,
        delivery,
      });
    }
  }, [step, selectedCategoryId, regType, participants, medical, delivery]);

  // Calculations
  const basePricePerPerson = selectedCategory.price;
  const participantCount = participants.length;
  const deliveryFee = delivery.method === "delivery" ? 60 : 0;
  const totalAmount = basePricePerPerson * participantCount + deliveryFee;

  // Participant Handlers
  const addParticipant = () => {
    if (participants.length >= 6) {
      alert("รับสมัครสูงสุด 6 คนต่อหนึ่งรายการ");
      return;
    }
    const newP: ParticipantInfo = {
      id: `p-${Date.now()}`,
      fullNameTh: "",
      fullNameEn: "",
      bibName: "",
      birthDate: "",
      gender: "male",
      phone: participants[0].phone || "",
      email: participants[0].email || "",
      province: participants[0].province || "นครราชสีมา",
      idCardLast4: "",
      shirtSize: "M",
    };
    setParticipants([...participants, newP]);
  };

  const removeParticipant = (index: number) => {
    if (participants.length <= 1) return;
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const updateParticipant = (index: number, field: keyof ParticipantInfo, value: any) => {
    const updated = [...participants];
    updated[index] = { ...updated[index], [field]: value };
    setParticipants(updated);
  };

  // Step Validation & Navigation
  const validateStep = (currentStep: number): boolean => {
    setValidationError("");

    if (currentStep === 1) {
      if (!selectedCategoryId) {
        setValidationError("กรุณาเลือกประเภทกิจกรรมที่ต้องการสมัคร");
        return false;
      }
      return true;
    }

    if (currentStep === 2) {
      for (let i = 0; i < participants.length; i++) {
        const p = participants[i];
        if (!p.fullNameTh.trim()) {
          setValidationError(`กรุณากรอกชื่อ–นามสกุลภาษาไทย ของผู้สมัครคนที่ ${i + 1}`);
          return false;
        }
        if (!p.bibName.trim()) {
          setValidationError(`กรุณากรอกชื่อบน Bib ของผู้สมัครคนที่ ${i + 1}`);
          return false;
        }
        if (!p.birthDate) {
          setValidationError(`กรุณาระบุวันเดือนปีเกิด ของผู้สมัครคนที่ ${i + 1}`);
          return false;
        }
        if (!p.phone || p.phone.length < 9) {
          setValidationError(`กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง ของผู้สมัครคนที่ ${i + 1}`);
          return false;
        }
      }
      return true;
    }

    if (currentStep === 3) {
      if (!medical.emergencyContactName.trim()) {
        setValidationError("กรุณากรอกชื่อ–นามสกุล ผู้ติดต่อฉุกเฉิน");
        return false;
      }
      if (!medical.emergencyContactRelation.trim()) {
        setValidationError("กรุณาระบุความสัมพันธ์กับผู้ติดต่อฉุกเฉิน");
        return false;
      }
      if (!medical.emergencyContactPhone || medical.emergencyContactPhone.length < 9) {
        setValidationError("กรุณากรอกเบอร์โทรศัพท์ผู้ติดต่อฉุกเฉิน");
        return false;
      }
      return true;
    }

    if (currentStep === 4) {
      if (delivery.method === "delivery") {
        if (!delivery.recipientName?.trim()) {
          setValidationError("กรุณาระบุชื่อผู้รับพัสดุสำหรับจัดส่ง Race Kit");
          return false;
        }
        if (!delivery.address?.trim() || !delivery.postalCode?.trim()) {
          setValidationError("กรุณากรอกที่อยู่และรหัสไปรษณีย์สำหรับจัดส่งให้ครบถ้วน");
          return false;
        }
      }
      return true;
    }

    if (currentStep === 5) {
      if (
        !consents.isInfoAccurate ||
        !consents.acceptTerms ||
        !consents.acceptPdpa ||
        !consents.acceptPhotoConsent ||
        !consents.acknowledgeRisks
      ) {
        setValidationError("กรุณาทำเครื่องหมายยินยอมและยอมรับเงื่อนไขให้ครบทุกข้อก่อนดำเนินการต่อ");
        return false;
      }
      return true;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 6));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setValidationError("");
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Final Submit / Payment Confirmation
  const handleConfirmPayment = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      // Create actual registration in db
      const newOrder = db.createRegistration({
        categoryId: selectedCategory.id,
        categoryName: `${selectedCategory.name} (${selectedCategory.distance})`,
        regType,
        participants,
        medical,
        kitDelivery: {
          ...delivery,
          deliveryFee,
        },
        consents,
        amount: totalAmount,
        paymentMethod,
        paymentStatus: "verified",
        status: "confirmed",
        slipUrl: slipUploaded ? "/mock-slip.jpg" : undefined,
      });

      setIsProcessingPayment(false);
      setSuccessOrder(newOrder);
      setStep(7); // Success Screen
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  // Steps Definition for Stepper Bar
  const stepsList = [
    { num: 1, label: "เลือกกิจกรรม", icon: IconRoute },
    { num: 2, label: "ผู้สมัคร", icon: IconUserEdit },
    { num: 3, label: "สุขภาพและฉุกเฉิน", icon: IconHeartbeat },
    { num: 4, label: "เสื้อ & Kit", icon: IconShirt },
    { num: 5, label: "ตรวจสอบ & PDPA", icon: IconShieldCheck },
    { num: 6, label: "ชำระเงิน", icon: IconCreditCard },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-canvas-cream text-ink-dark">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {step <= 6 ? (
          <div>
            {/* STEPPER HEADER (Mobile & Desktop) */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent-orange">
                    ขั้นตอนการสมัคร
                  </span>
                  <h1 className="text-xl sm:text-2xl font-bold text-ink-dark">
                    ขั้นตอนที่ {step}: {stepsList[step - 1].label}
                  </h1>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-soft-olive text-ink-dark border border-border-subtle">
                  สเต็ป {step} จาก 6
                </span>
              </div>

              {/* Progress bar line */}
              <div className="w-full h-2 bg-border-subtle/50 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-accent-orange transition-all duration-300 rounded-full"
                  style={{ width: `${(step / 6) * 100}%` }}
                />
              </div>

              {/* Stepper items */}
              <div className="hidden md:grid grid-cols-6 gap-2">
                {stepsList.map((s) => {
                  const isCurrent = s.num === step;
                  const isPast = s.num < step;
                  return (
                    <div
                      key={s.num}
                      className={`p-3 rounded-[16px] border text-left transition-all ${
                        isCurrent
                          ? "bg-surface-white border-accent-orange shadow-xs"
                          : isPast
                          ? "bg-soft-olive/40 border-border-subtle"
                          : "bg-transparent border-border-subtle/40 opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono font-bold text-muted-green">0{s.num}</span>
                        {isPast ? (
                          <IconCircleCheck size={16} className="text-status-success" />
                        ) : (
                          <s.icon size={16} className={isCurrent ? "text-accent-orange" : "text-muted-green"} />
                        )}
                      </div>
                      <p className={`text-xs font-semibold truncate ${isCurrent ? "text-ink-dark font-bold" : "text-muted-green"}`}>
                        {s.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Validation Error Alert */}
            {validationError && (
              <div className="mb-6 p-4 rounded-[16px] bg-status-error/10 border border-status-error/30 text-status-error text-sm flex items-center gap-3">
                <IconInfoCircle size={20} className="shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* DESKTOP SPLIT LAYOUT (Left 35% Summary, Right 65% Form per Spec 7) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT SUMMARY PANEL (Desktop 4 cols / 35%) */}
              <div className="hidden lg:block lg:col-span-4 sticky top-28 space-y-6">
                <div className="rounded-[24px] bg-surface-white border border-border-subtle p-6 shadow-xs space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                    <span className="text-xs font-semibold uppercase text-muted-green">สรุปกิจกรรม</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-soft-olive text-ink-dark">
                      {selectedCategory.distance}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-ink-dark">{selectedCategory.name}</h3>
                    <p className="text-xs text-accent-orange font-medium mt-0.5">
                      ความชัน {selectedCategory.elevation} • ปล่อยตัว {selectedCategory.startTime}
                    </p>
                  </div>

                  <ImageSlot
                    ratio="16:9"
                    label={selectedCategory.imageLabel}
                    sublabel="พื้นที่กิจกรรมที่เลือก"
                    className="rounded-[18px]"
                  />

                  {/* Summary Pricing */}
                  <div className="p-4 rounded-[16px] bg-canvas-cream border border-border-subtle space-y-2 text-xs">
                    <div className="flex justify-between text-muted-green">
                      <span>ค่าสมัคร ({participantCount} ท่าน)</span>
                      <span className="font-semibold text-ink-dark">฿{basePricePerPerson * participantCount}</span>
                    </div>
                    {deliveryFee > 0 && (
                      <div className="flex justify-between text-muted-green">
                        <span>ค่าจัดส่ง Race Kit</span>
                        <span className="font-semibold text-ink-dark">฿{deliveryFee}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-border-subtle flex justify-between text-sm font-bold text-ink-dark">
                      <span>ยอดชำระรวม</span>
                      <span className="text-base text-accent-orange">฿{totalAmount}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-muted-green space-y-1">
                    <p>• รายได้หลังหักค่าใช้จ่ายมอบกองทุนพิทักษ์ป่าวังหมี</p>
                    <p>• มีระบบประกันอุบัติเหตุคุ้มครองตลอดงาน</p>
                  </div>
                </div>
              </div>

              {/* RIGHT FORM CONTAINER (Desktop 8 cols / 65%) */}
              <div className="lg:col-span-8 rounded-[24px] bg-surface-white border border-border-subtle p-6 sm:p-8 shadow-xs">
                
                {/* STEP 1: CHOOSE ACTIVITY */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-ink-dark mb-1">เลือกระยะกิจกรรมที่ต้องการวิ่ง</h2>
                      <p className="text-sm text-muted-green">
                        ระบบจองสิทธิ์ล่วงหน้า (Temporary Reservation) มีผล 10 นาทีเพื่อให้ท่านกรอกข้อมูลอย่างสบายใจ
                      </p>
                    </div>

                    <div className="space-y-4">
                      {categories.map((cat) => {
                        const isSelected = selectedCategoryId === cat.id;
                        return (
                          <div
                            key={cat.id}
                            onClick={() => setSelectedCategoryId(cat.id)}
                            className={`p-5 rounded-[20px] border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                              isSelected
                                ? "border-accent-orange bg-soft-olive/20 ring-2 ring-accent-orange/20"
                                : "border-border-subtle bg-canvas-cream/50 hover:bg-canvas-cream"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div
                                className={`w-6 h-6 rounded-full border-2 mt-1 flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? "border-accent-orange bg-accent-orange text-white"
                                    : "border-border-subtle bg-white"
                                }`}
                              >
                                {isSelected && <IconCheck size={14} stroke={3} />}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-base font-bold text-ink-dark">{cat.name}</span>
                                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-soft-olive text-ink-dark">
                                    {cat.distance}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-green mb-1">{cat.description}</p>
                                <div className="flex items-center gap-3 text-xs text-ink-dark/80">
                                  <span>ปล่อยตัว {cat.startTime}</span>
                                  <span>•</span>
                                  <span className="text-status-success font-medium">คงเหลือ {cat.remaining} สิทธิ์</span>
                                </div>
                              </div>
                            </div>

                            <div className="text-right shrink-0 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0">
                              <span className="text-xl font-bold text-ink-dark">฿{cat.price}</span>
                              <span className="text-xs text-muted-green block">/คน</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 2: PARTICIPANTS INFORMATION */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-ink-dark mb-1">ข้อมูลผู้สมัคร</h2>
                      <p className="text-sm text-muted-green">
                        เลือกลักษณะการสมัคร และระบุข้อมูลเพื่อจัดทำ Bib และประกันอุบัติเหตุ
                      </p>
                    </div>

                    {/* Registration Type Switcher */}
                    <div>
                      <label className="text-xs font-semibold text-muted-green uppercase tracking-wider block mb-2">
                        รูปแบบการสมัคร
                      </label>
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {[
                          { id: "single", label: "สมัครคนเดียว" },
                          { id: "family", label: "ครอบครัว (ผู้ปกครอง+เด็ก)" },
                          { id: "group", label: "กลุ่ม / องค์กร" },
                        ].map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => {
                              setRegType(t.id as RegType);
                              if (t.id === "single" && participants.length > 1) {
                                setParticipants([participants[0]]);
                              }
                            }}
                            className={`p-3 rounded-[14px] text-xs sm:text-sm font-semibold border transition-all ${
                              regType === t.id
                                ? "bg-ink-dark text-surface-white border-ink-dark"
                                : "bg-canvas-cream text-ink-dark border-border-subtle hover:bg-soft-olive"
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Participant Cards */}
                    <div className="space-y-6">
                      {participants.map((p, index) => (
                        <div
                          key={p.id}
                          className="p-5 rounded-[20px] bg-canvas-cream/60 border border-border-subtle space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-ink-dark flex items-center gap-2">
                              <span>ผู้สมัครคนที่ {index + 1}</span>
                              {index === 0 && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] bg-accent-orange text-white font-semibold">
                                  ผู้สมัครหลัก
                                </span>
                              )}
                            </span>
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() => removeParticipant(index)}
                                className="text-xs text-status-error hover:underline flex items-center gap-1"
                              >
                                <IconTrash size={14} />
                                <span>ลบผู้สมัครนี้</span>
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div>
                              <label className="text-xs font-medium text-ink-dark block mb-1">
                                ชื่อ–นามสกุล (ภาษาไทย) *
                              </label>
                              <input
                                type="text"
                                value={p.fullNameTh}
                                onChange={(e) => updateParticipant(index, "fullNameTh", e.target.value)}
                                placeholder="เช่น นัฐกิตติ์ สุขสวัสดิ์"
                                className="w-full px-3.5 py-2.5 rounded-[14px] bg-white border border-border-subtle text-sm focus:outline-hidden focus:ring-2 focus:ring-accent-orange"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-medium text-ink-dark block mb-1">
                                ชื่อบน Bib (พิมพ์ลงเบอร์วิ่ง) *
                              </label>
                              <input
                                type="text"
                                value={p.bibName}
                                onChange={(e) => updateParticipant(index, "bibName", e.target.value.toUpperCase())}
                                placeholder="เช่น GIG, NATT, RUNNER"
                                maxLength={12}
                                className="w-full px-3.5 py-2.5 rounded-[14px] bg-white border border-border-subtle text-sm focus:outline-hidden focus:ring-2 focus:ring-accent-orange uppercase"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-medium text-ink-dark block mb-1">
                                ชื่อ–นามสกุล (ภาษาอังกฤษ)
                              </label>
                              <input
                                type="text"
                                value={p.fullNameEn}
                                onChange={(e) => updateParticipant(index, "fullNameEn", e.target.value)}
                                placeholder="เช่น Nattagid Suksawat"
                                className="w-full px-3.5 py-2.5 rounded-[14px] bg-white border border-border-subtle text-sm focus:outline-hidden focus:ring-2 focus:ring-accent-orange"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-medium text-ink-dark block mb-1">
                                วันเดือนปีเกิด *
                              </label>
                              <input
                                type="date"
                                value={p.birthDate}
                                onChange={(e) => updateParticipant(index, "birthDate", e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-[14px] bg-white border border-border-subtle text-sm focus:outline-hidden focus:ring-2 focus:ring-accent-orange"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-medium text-ink-dark block mb-1">
                                เบอร์โทรศัพท์มือถือ *
                              </label>
                              <input
                                type="tel"
                                value={p.phone}
                                onChange={(e) => updateParticipant(index, "phone", e.target.value)}
                                placeholder="08XXXXXXXX"
                                className="w-full px-3.5 py-2.5 rounded-[14px] bg-white border border-border-subtle text-sm focus:outline-hidden focus:ring-2 focus:ring-accent-orange"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-medium text-ink-dark block mb-1">
                                อีเมล (สำหรับรับ E-Ticket)
                              </label>
                              <input
                                type="email"
                                value={p.email}
                                onChange={(e) => updateParticipant(index, "email", e.target.value)}
                                placeholder="runner@example.com"
                                className="w-full px-3.5 py-2.5 rounded-[14px] bg-white border border-border-subtle text-sm focus:outline-hidden focus:ring-2 focus:ring-accent-orange"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-medium text-ink-dark block mb-1">
                                จังหวัดที่พักอาศัย
                              </label>
                              <input
                                type="text"
                                value={p.province}
                                onChange={(e) => updateParticipant(index, "province", e.target.value)}
                                placeholder="เช่น นครราชสีมา, กรุงเทพฯ"
                                className="w-full px-3.5 py-2.5 rounded-[14px] bg-white border border-border-subtle text-sm focus:outline-hidden focus:ring-2 focus:ring-accent-orange"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-medium text-ink-dark block mb-1">
                                เลขท้าย 4 หลักบัตรประชาชน (ยืนยันรับบิบ)
                              </label>
                              <input
                                type="text"
                                maxLength={4}
                                value={p.idCardLast4}
                                onChange={(e) => updateParticipant(index, "idCardLast4", e.target.value)}
                                placeholder="เช่น 4589"
                                className="w-full px-3.5 py-2.5 rounded-[14px] bg-white border border-border-subtle text-sm focus:outline-hidden focus:ring-2 focus:ring-accent-orange"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Add Family Member Button */}
                      {(regType === "family" || regType === "group") && (
                        <button
                          type="button"
                          onClick={addParticipant}
                          className="w-full py-3 rounded-[16px] border-2 border-dashed border-border-subtle text-sm font-semibold text-ink-dark hover:border-accent-orange hover:bg-soft-olive/30 flex items-center justify-center gap-2 transition-colors"
                        >
                          <IconPlus size={16} />
                          <span>เพิ่มผู้เข้าร่วมอีกคน (สามารถใช้ข้อมูลติดต่อร่วมกันได้)</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 3: MEDICAL & EMERGENCY */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-ink-dark mb-1">ข้อมูลสุขภาพและผู้ติดต่อฉุกเฉิน</h2>
                      <p className="text-sm text-muted-green">
                        ข้อมูลนี้สำคัญอย่างยิ่งสำหรับการดูแลทางการแพทย์ฉุกเฉิน และจะถูกเก็บเป็นความลับตามสิทธิ์เฉพาะฝ่ายแพทย์เท่านั้น
                      </p>
                    </div>

                    {/* Medical Questions */}
                    <div className="space-y-4">
                      {/* Chronic Disease */}
                      <div className="p-4 rounded-[16px] bg-canvas-cream border border-border-subtle space-y-2">
                        <label className="text-xs font-bold text-ink-dark block">
                          1. มีโรคประจำตัวหรือไม่ (เช่น โรคหัวใจ ความดัน หอบหืด เบาหวาน)
                        </label>
                        <div className="flex items-center gap-4">
                          {(["none", "have", "unsure"] as const).map((val) => (
                            <label key={val} className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                              <input
                                type="radio"
                                name="hasChronicDisease"
                                checked={medical.hasChronicDisease === val}
                                onChange={() => setMedical({ ...medical, hasChronicDisease: val })}
                                className="text-accent-orange focus:ring-accent-orange"
                              />
                              <span>{val === "none" ? "ไม่มี" : val === "have" ? "มี" : "ไม่แน่ใจ"}</span>
                            </label>
                          ))}
                        </div>
                        {medical.hasChronicDisease === "have" && (
                          <input
                            type="text"
                            placeholder="ระบุรายละเอียดโรคประจำตัว..."
                            value={medical.chronicDiseaseDetail}
                            onChange={(e) => setMedical({ ...medical, chronicDiseaseDetail: e.target.value })}
                            className="w-full mt-2 px-3 py-2 rounded-[12px] bg-white border border-border-subtle text-xs"
                          />
                        )}
                      </div>

                      {/* Allergies */}
                      <div className="p-4 rounded-[16px] bg-canvas-cream border border-border-subtle space-y-2">
                        <label className="text-xs font-bold text-ink-dark block">
                          2. มีประวัติแพ้ยา หรือแพ้อาหารรุนแรงหรือไม่
                        </label>
                        <div className="flex items-center gap-4">
                          {(["none", "have", "unsure"] as const).map((val) => (
                            <label key={val} className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                              <input
                                type="radio"
                                name="hasAllergy"
                                checked={medical.hasAllergy === val}
                                onChange={() => setMedical({ ...medical, hasAllergy: val })}
                                className="text-accent-orange focus:ring-accent-orange"
                              />
                              <span>{val === "none" ? "ไม่มี" : val === "have" ? "มี" : "ไม่แน่ใจ"}</span>
                            </label>
                          ))}
                        </div>
                        {medical.hasAllergy === "have" && (
                          <input
                            type="text"
                            placeholder="ระบุชื่อยาหรืออาหารที่แพ้..."
                            value={medical.allergyDetail}
                            onChange={(e) => setMedical({ ...medical, allergyDetail: e.target.value })}
                            className="w-full mt-2 px-3 py-2 rounded-[12px] bg-white border border-border-subtle text-xs"
                          />
                        )}
                      </div>

                      {/* Physical Limitations */}
                      <div className="p-4 rounded-[16px] bg-canvas-cream border border-border-subtle space-y-2">
                        <label className="text-xs font-bold text-ink-dark block">
                          3. ข้อจำกัดในการเดินหรือวิ่ง (เช่น เคยผ่าตัดข้อเข่า บาดเจ็บกล้ามเนื้อ)
                        </label>
                        <div className="flex items-center gap-4">
                          {(["none", "have", "unsure"] as const).map((val) => (
                            <label key={val} className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                              <input
                                type="radio"
                                name="hasPhysicalLimitation"
                                checked={medical.hasPhysicalLimitation === val}
                                onChange={() => setMedical({ ...medical, hasPhysicalLimitation: val })}
                                className="text-accent-orange focus:ring-accent-orange"
                              />
                              <span>{val === "none" ? "ไม่มี" : val === "have" ? "มี" : "ไม่แน่ใจ"}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="pt-4 border-t border-border-subtle space-y-4">
                      <h3 className="text-sm font-bold text-ink-dark uppercase tracking-wider">
                        ผู้ติดต่อกรณีฉุกเฉิน (Emergency Contact) *
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="text-xs font-medium text-ink-dark block mb-1">
                            ชื่อ–นามสกุล ผู้ติดต่อฉุกเฉิน *
                          </label>
                          <input
                            type="text"
                            placeholder="เช่น สมใจ สุขสวัสดิ์"
                            value={medical.emergencyContactName}
                            onChange={(e) => setMedical({ ...medical, emergencyContactName: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-[14px] bg-white border border-border-subtle text-sm focus:outline-hidden focus:ring-2 focus:ring-accent-orange"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-medium text-ink-dark block mb-1">
                            ความสัมพันธ์ (เช่น บิดา มารดา คู่สมรส พี่น้อง) *
                          </label>
                          <input
                            type="text"
                            placeholder="เช่น พี่สาว, ภรรยา"
                            value={medical.emergencyContactRelation}
                            onChange={(e) => setMedical({ ...medical, emergencyContactRelation: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-[14px] bg-white border border-border-subtle text-sm focus:outline-hidden focus:ring-2 focus:ring-accent-orange"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-medium text-ink-dark block mb-1">
                            เบอร์โทรศัพท์ติดต่อฉุกเฉิน *
                          </label>
                          <input
                            type="tel"
                            placeholder="08XXXXXXXX"
                            value={medical.emergencyContactPhone}
                            onChange={(e) => setMedical({ ...medical, emergencyContactPhone: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-[14px] bg-white border border-border-subtle text-sm focus:outline-hidden focus:ring-2 focus:ring-accent-orange"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-medium text-ink-dark block mb-1">
                            เบอร์โทรศัพท์สำรอง (ถ้ามี)
                          </label>
                          <input
                            type="tel"
                            placeholder="02XXXXXXX หรือเบอร์ญาติ"
                            value={medical.emergencyContactAltPhone}
                            onChange={(e) => setMedical({ ...medical, emergencyContactAltPhone: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-[14px] bg-white border border-border-subtle text-sm focus:outline-hidden focus:ring-2 focus:ring-accent-orange"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: SHIRT & RACE KIT FULFILLMENT */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-ink-dark mb-1">เสื้อและวิธีรับ Race Kit</h2>
                        <p className="text-sm text-muted-green">
                          เลือกขนาดเสื้อสำหรับผู้สมัคร และช่องทางการรับอุปกรณ์วิ่ง
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowSizeModal(true)}
                        className="text-xs font-semibold text-accent-orange hover:underline flex items-center gap-1"
                      >
                        <IconInfoCircle size={15} />
                        <span>ตารางขนาดเสื้อ</span>
                      </button>
                    </div>

                    {/* Shirt Sizes for each participant */}
                    <div className="space-y-4">
                      {participants.map((p, idx) => (
                        <div key={p.id} className="p-4 rounded-[18px] bg-canvas-cream border border-border-subtle">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-ink-dark">
                              ขนาดเสื้อ: {p.fullNameTh || `ผู้สมัครคนที่ ${idx + 1}`}
                            </span>
                            <span className="text-xs text-muted-green">ไซส์ปัจจุบัน: {p.shirtSize}</span>
                          </div>

                          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                            {SHIRT_SIZES.map((s) => (
                              <button
                                key={s.size}
                                type="button"
                                onClick={() => updateParticipant(idx, "shirtSize", s.size)}
                                className={`py-2 px-1 rounded-[12px] text-xs font-bold border transition-all ${
                                  p.shirtSize === s.size
                                    ? "bg-accent-orange text-white border-accent-orange shadow-xs"
                                    : "bg-white text-ink-dark border-border-subtle hover:bg-soft-olive"
                                }`}
                              >
                                <div>{s.size}</div>
                                <div className="text-[10px] font-normal opacity-80">{s.chest}</div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Method Selector */}
                    <div className="pt-4 border-t border-border-subtle space-y-4">
                      <h3 className="text-sm font-bold text-ink-dark uppercase tracking-wider">
                        วิธีรับ Race Kit (เบอร์วิ่งและเสื้อ)
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { id: "self", title: "รับด้วยตนเองวันงาน", desc: "ณ จุดลงทะเบียน 05:00 น. วันที่ 8 พ.ย.", fee: 0 },
                          { id: "early", title: "รับล่วงหน้า 1 วัน", desc: "ณ ลานชุมชนวังหมี วันที่ 7 พ.ย. 13:00-18:00 น.", fee: 0 },
                          { id: "delivery", title: "จัดส่งทางพัสดุไปรษณีย์", desc: "ส่งถึงบ้านก่อนวันงาน 10 วัน (+60 บาท)", fee: 60 },
                          { id: "proxy", title: "มอบอำนาจผู้อื่นรับแทน", desc: "นำสำเนาและ QR E-Ticket มารับแทน", fee: 0 },
                        ].map((m) => (
                          <div
                            key={m.id}
                            onClick={() => setDelivery({ ...delivery, method: m.id as DeliveryMethod, deliveryFee: m.fee })}
                            className={`p-4 rounded-[16px] border cursor-pointer transition-all ${
                              delivery.method === m.id
                                ? "border-accent-orange bg-soft-olive/20 ring-1 ring-accent-orange"
                                : "border-border-subtle bg-canvas-cream hover:bg-soft-olive/40"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-bold text-ink-dark">{m.title}</span>
                              <span className="text-xs font-semibold text-accent-orange">
                                {m.fee === 0 ? "ฟรี" : `+฿${m.fee}`}
                              </span>
                            </div>
                            <p className="text-xs text-muted-green">{m.desc}</p>
                          </div>
                        ))}
                      </div>

                      {/* Delivery Address Form if Delivery selected */}
                      {delivery.method === "delivery" && (
                        <div className="p-5 rounded-[20px] bg-canvas-cream border border-border-subtle space-y-3 mt-4">
                          <h4 className="text-xs font-bold text-ink-dark uppercase">ที่อยู่สำหรับการจัดส่งพัสดุ</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              placeholder="ชื่อผู้รับพัสดุ *"
                              value={delivery.recipientName}
                              onChange={(e) => setDelivery({ ...delivery, recipientName: e.target.value })}
                              className="px-3 py-2 rounded-[12px] bg-white border border-border-subtle text-xs"
                            />
                            <input
                              type="tel"
                              placeholder="เบอร์โทรศัพท์ผู้รับ *"
                              value={delivery.phone}
                              onChange={(e) => setDelivery({ ...delivery, phone: e.target.value })}
                              className="px-3 py-2 rounded-[12px] bg-white border border-border-subtle text-xs"
                            />
                            <input
                              type="text"
                              placeholder="บ้านเลขที่, ซอย, ถนน *"
                              value={delivery.address}
                              onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
                              className="sm:col-span-2 px-3 py-2 rounded-[12px] bg-white border border-border-subtle text-xs"
                            />
                            <input
                              type="text"
                              placeholder="ตำบล / แขวง *"
                              value={delivery.subdistrict}
                              onChange={(e) => setDelivery({ ...delivery, subdistrict: e.target.value })}
                              className="px-3 py-2 rounded-[12px] bg-white border border-border-subtle text-xs"
                            />
                            <input
                              type="text"
                              placeholder="อำเภอ / เขต *"
                              value={delivery.district}
                              onChange={(e) => setDelivery({ ...delivery, district: e.target.value })}
                              className="px-3 py-2 rounded-[12px] bg-white border border-border-subtle text-xs"
                            />
                            <input
                              type="text"
                              placeholder="จังหวัด *"
                              value={delivery.province}
                              onChange={(e) => setDelivery({ ...delivery, province: e.target.value })}
                              className="px-3 py-2 rounded-[12px] bg-white border border-border-subtle text-xs"
                            />
                            <input
                              type="text"
                              placeholder="รหัสไปรษณีย์ *"
                              value={delivery.postalCode}
                              onChange={(e) => setDelivery({ ...delivery, postalCode: e.target.value })}
                              className="px-3 py-2 rounded-[12px] bg-white border border-border-subtle text-xs"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 5: REVIEW & PDPA CONSENT */}
                {step === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-ink-dark mb-1">ตรวจสอบข้อมูลและยืนยันข้อตกลง</h2>
                      <p className="text-sm text-muted-green">
                        โปรดตรวจสอบความถูกต้องของข้อมูลทั้งหมด และทำเครื่องหมายยอมรับข้อกำหนด
                      </p>
                    </div>

                    {/* Summary Cards */}
                    <div className="space-y-3 text-xs">
                      {/* Category Review */}
                      <div className="p-4 rounded-[16px] bg-canvas-cream border border-border-subtle flex items-center justify-between">
                        <div>
                          <span className="text-muted-green block">กิจกรรม</span>
                          <span className="font-bold text-ink-dark text-sm">{selectedCategory.name} ({selectedCategory.distance})</span>
                          <span className="text-muted-green block mt-0.5">ปล่อยตัว {selectedCategory.startTime}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="px-3 py-1 rounded-full bg-white border border-border-subtle font-medium text-ink-dark hover:bg-soft-olive"
                        >
                          แก้ไข
                        </button>
                      </div>

                      {/* Participants Review */}
                      <div className="p-4 rounded-[16px] bg-canvas-cream border border-border-subtle flex items-start justify-between">
                        <div className="space-y-1">
                          <span className="text-muted-green block">ผู้สมัคร ({participants.length} ท่าน)</span>
                          {participants.map((p, i) => (
                            <div key={i} className="font-medium text-ink-dark">
                              {i + 1}. {p.fullNameTh} (Bib: {p.bibName}) • ไซส์เสื้อ: {p.shirtSize}
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="px-3 py-1 rounded-full bg-white border border-border-subtle font-medium text-ink-dark hover:bg-soft-olive"
                        >
                          แก้ไข
                        </button>
                      </div>

                      {/* Emergency Review */}
                      <div className="p-4 rounded-[16px] bg-canvas-cream border border-border-subtle flex items-center justify-between">
                        <div>
                          <span className="text-muted-green block">ผู้ติดต่อฉุกเฉิน</span>
                          <span className="font-bold text-ink-dark">
                            {medical.emergencyContactName} ({medical.emergencyContactRelation}) - {medical.emergencyContactPhone}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="px-3 py-1 rounded-full bg-white border border-border-subtle font-medium text-ink-dark hover:bg-soft-olive"
                        >
                          แก้ไข
                        </button>
                      </div>

                      {/* Kit Fulfillment Review */}
                      <div className="p-4 rounded-[16px] bg-canvas-cream border border-border-subtle flex items-center justify-between">
                        <div>
                          <span className="text-muted-green block">การรับ Race Kit</span>
                          <span className="font-bold text-ink-dark">
                            {delivery.method === "delivery"
                              ? `จัดส่งทางไปรษณีย์ (${delivery.recipientName} - ${delivery.address} ${delivery.postalCode})`
                              : delivery.method === "early"
                              ? "รับล่วงหน้า 1 วัน ณ ลานชุมชนวังหมี"
                              : delivery.method === "proxy"
                              ? "มอบอำนาจผู้อื่นรับแทน"
                              : "รับด้วยตนเองเช้าวันงาน"}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setStep(4)}
                          className="px-3 py-1 rounded-full bg-white border border-border-subtle font-medium text-ink-dark hover:bg-soft-olive"
                        >
                          แก้ไข
                        </button>
                      </div>
                    </div>

                    {/* PDPA & Consent Checkboxes per Spec Section 5 */}
                    <div className="p-5 rounded-[20px] bg-soft-olive/40 border border-border-subtle space-y-3.5">
                      <h4 className="text-xs font-bold text-ink-dark uppercase tracking-wider">
                        การยินยอมและข้อกำหนด (Required Consents)
                      </h4>

                      {[
                        { key: "isInfoAccurate", label: "ข้าพเจ้ายืนยันว่าข้อมูลที่ระบุข้างต้นถูกต้อง เป็นความจริงทุกประการ" },
                        { key: "acceptTerms", label: "ยอมรับกฎระเบียบและเงื่อนไขการเข้าร่วมกิจกรรมวิ่งวังหมีกระทิง RUN LEARN LAND 2026" },
                        { key: "acceptPdpa", label: "ยอมรับนโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA) เพื่อการบริหารจัดการกิจกรรมและการแพทย์" },
                        { key: "acceptPhotoConsent", label: "ยินยอมให้บันทึกภาพถ่ายและวิดีโอระหว่างกิจกรรม เพื่อการประชาสัมพันธ์โครงการและการกุศล" },
                        { key: "acknowledgeRisks", label: "รับทราบความเสี่ยงของกิจกรรมกลางแจ้ง และยืนยันว่ามีสุขภาพพร้อมสำหรับการเข้าร่วม" },
                      ].map((c) => (
                        <label key={c.key} className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-ink-dark">
                          <input
                            type="checkbox"
                            checked={consents[c.key as keyof ConsentInfo]}
                            onChange={(e) => setConsents({ ...consents, [c.key]: e.target.checked })}
                            className="w-4 h-4 rounded text-accent-orange focus:ring-accent-orange mt-0.5"
                          />
                          <span>{c.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 6: PAYMENT & CONFIRMATION */}
                {step === 6 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-ink-dark mb-1">ชำระเงินและยืนยันสิทธิ์</h2>
                      <p className="text-sm text-muted-green">
                        สแกนชำระผ่าน PromptPay QR หรือชำระด้วยบัตรเครดิต ยอดรวมทั้งสิ้น ฿{totalAmount}
                      </p>
                    </div>

                    {/* Payment Method Tabs */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("promptpay")}
                        className={`p-3.5 rounded-[16px] border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                          paymentMethod === "promptpay"
                            ? "bg-ink-dark text-white border-ink-dark"
                            : "bg-canvas-cream text-ink-dark border-border-subtle"
                        }`}
                      >
                        <IconQrcode size={18} />
                        <span>PromptPay QR</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("credit_card")}
                        className={`p-3.5 rounded-[16px] border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                          paymentMethod === "credit_card"
                            ? "bg-ink-dark text-white border-ink-dark"
                            : "bg-canvas-cream text-ink-dark border-border-subtle"
                        }`}
                      >
                        <IconCreditCard size={18} />
                        <span>บัตรเครดิต / เดบิต</span>
                      </button>
                    </div>

                    {/* PromptPay QR Interface */}
                    {paymentMethod === "promptpay" ? (
                      <div className="p-6 rounded-[24px] bg-canvas-cream border border-border-subtle flex flex-col items-center text-center space-y-4">
                        <span className="text-xs font-semibold text-muted-green uppercase tracking-wider">
                          Thai QR Payment / พร้อมเพย์
                        </span>
                        
                        {/* Dynamic QR Code */}
                        <div className="p-4 bg-white rounded-[20px] border border-border-subtle shadow-xs inline-block">
                          <QRCodeSVG
                            value={`00020101021129370016A000000677010111011300668123456785802TH5303764540${totalAmount}.006304`}
                            size={190}
                            level="M"
                          />
                        </div>

                        <div>
                          <span className="text-2xl font-bold text-ink-dark">฿{totalAmount}</span>
                          <span className="text-xs text-muted-green block mt-0.5">
                            บัญชีกองทุนอนุรักษ์ธรรมชาติชุมชนวังหมี (044-X-XXXXX-X)
                          </span>
                        </div>

                        {/* Slip Upload Simulator */}
                        <div className="w-full max-w-sm pt-2">
                          <button
                            type="button"
                            onClick={() => setSlipUploaded(true)}
                            className={`w-full py-2.5 px-4 rounded-[14px] text-xs font-semibold border transition-all ${
                              slipUploaded
                                ? "bg-status-success/15 border-status-success text-status-success"
                                : "bg-white border-border-subtle text-ink-dark hover:bg-soft-olive"
                            }`}
                          >
                            {slipUploaded ? "✓ แนบสลิปชำระเงินเรียบร้อยแล้ว" : "จำลองแนบสลิปโอนเงิน (Optional)"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Credit Card Form */
                      <div className="p-6 rounded-[24px] bg-canvas-cream border border-border-subtle space-y-3.5 text-xs">
                        <div>
                          <label className="text-xs font-medium text-ink-dark block mb-1">หมายเลขบัตรเครดิต</label>
                          <input
                            type="text"
                            placeholder="4111 2222 3333 4444"
                            className="w-full px-3.5 py-2.5 rounded-[12px] bg-white border border-border-subtle text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-medium text-ink-dark block mb-1">วันหมดอายุ (MM/YY)</label>
                            <input
                              type="text"
                              placeholder="12/28"
                              className="w-full px-3.5 py-2.5 rounded-[12px] bg-white border border-border-subtle text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-ink-dark block mb-1">CVV / CVC</label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full px-3.5 py-2.5 rounded-[12px] bg-white border border-border-subtle text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Confirm Button */}
                    <button
                      type="button"
                      disabled={isProcessingPayment}
                      onClick={handleConfirmPayment}
                      className="w-full py-4 rounded-[16px] bg-accent-orange hover:bg-accent-orange/90 text-surface-white font-bold text-base shadow-xs transition-transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isProcessingPayment ? (
                        <span>กำลังยืนยันรายการชำระเงิน...</span>
                      ) : (
                        <>
                          <span>ยืนยันการชำระเงิน ฿{totalAmount} และรับสิทธิ์ทันที</span>
                          <IconArrowRight size={18} stroke={2} />
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* NAVIGATION BUTTONS (Back / Next) - Sticky for Mobile per Spec Section 7 */}
                {step < 6 && (
                  <div className="mt-8 pt-6 border-t border-border-subtle flex items-center justify-between gap-4">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="px-5 py-3 rounded-[14px] border border-border-subtle text-sm font-semibold text-ink-dark bg-white hover:bg-soft-olive flex items-center gap-1.5"
                      >
                        <IconArrowLeft size={16} />
                        <span>ย้อนกลับ</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-7 py-3 rounded-[14px] bg-ink-dark hover:bg-ink-dark/90 text-surface-white text-sm font-semibold flex items-center gap-2 transition-transform active:scale-95"
                    >
                      <span>ต่อไป: {stepsList[step].label}</span>
                      <IconArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* STEP 7: REGISTRATION SUCCESS SCREEN */
          successOrder && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="rounded-[24px] bg-surface-white border border-border-subtle p-6 sm:p-10 shadow-xs text-center">
                <div className="w-16 h-16 rounded-full bg-status-success/15 text-status-success mx-auto flex items-center justify-center mb-4">
                  <IconCircleCheck size={36} stroke={2} />
                </div>

                <span className="text-xs font-semibold text-accent-orange uppercase tracking-wider">
                  Registration Confirmed
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-ink-dark mt-1 mb-2">
                  ยินดีต้อนรับสู่ วังหมีกระทิง RUN LEARN LAND
                </h1>
                <p className="text-sm text-muted-green max-w-md mx-auto mb-6">
                  การสมัครและชำระเงินเสร็จสมบูรณ์ ระบบได้ออกหมายเลข Bib และ QR E-Ticket สำหรับ Check-in วันงานให้เรียบร้อยแล้ว
                </p>

                {/* E-Ticket Card */}
                <div className="p-6 rounded-[22px] bg-canvas-cream border border-border-subtle max-w-md mx-auto text-left space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                    <div>
                      <span className="text-[10px] text-muted-green uppercase font-semibold">รหัสการสมัคร</span>
                      <p className="text-base font-mono font-bold text-ink-dark">{successOrder.registrationCode}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-muted-green uppercase font-semibold">เบอร์วิ่ง (BIB)</span>
                      <p className="text-lg font-mono font-bold text-accent-orange">{successOrder.bibNumber}</p>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="flex flex-col items-center justify-center py-2">
                    <div className="p-3 bg-white rounded-[16px] border border-border-subtle shadow-xs mb-2">
                      <QRCodeSVG value={successOrder.registrationCode} size={150} level="M" />
                    </div>
                    <span className="text-[11px] text-muted-green">
                      ใช้ QR นี้สำหรับสแกนรับ Race Kit และ Check-in เข้าจุดปล่อยตัว
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-ink-dark pt-2 border-t border-border-subtle">
                    <div className="flex justify-between">
                      <span className="text-muted-green">ประเภทกิจกรรม:</span>
                      <span className="font-bold">{successOrder.categoryName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-green">ชื่อผู้สมัครหลัก:</span>
                      <span className="font-semibold">{successOrder.participants[0]?.fullNameTh}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-green">ชื่อบน Bib:</span>
                      <span className="font-mono font-bold">{successOrder.participants[0]?.bibName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-green">สถานะชำระเงิน:</span>
                      <span className="text-status-success font-bold">ชำระแล้ว (฿{successOrder.amount})</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-5 py-2.5 rounded-[14px] bg-white border border-border-subtle text-xs font-semibold text-ink-dark hover:bg-soft-olive flex items-center gap-1.5"
                  >
                    <IconPrinter size={16} />
                    <span>พิมพ์ใบยืนยัน / E-Ticket</span>
                  </button>
                  <a
                    href={`/registration/status?code=${successOrder.registrationCode}`}
                    className="px-6 py-2.5 rounded-[14px] bg-ink-dark text-white text-xs font-semibold hover:bg-ink-dark/90 flex items-center gap-1.5"
                  >
                    <span>ไปยัง Participant Dashboard</span>
                    <IconArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          )
        )}
      </main>

      {/* SIZE CHART MODAL */}
      {showSizeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-surface-white rounded-[24px] border border-border-subtle p-6 max-w-md w-full shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border-subtle">
              <h3 className="text-base font-bold text-ink-dark">ตารางขนาดเสื้อที่ระลึก (นิ้ว)</h3>
              <button
                type="button"
                onClick={() => setShowSizeModal(false)}
                className="text-muted-green hover:text-ink-dark text-sm font-bold"
              >
                ปิด
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-canvas-cream text-muted-green">
                  <tr>
                    <th className="p-2.5 rounded-l-[8px]">ไซส์</th>
                    <th className="p-2.5">รอบอก (Chest)</th>
                    <th className="p-2.5 rounded-r-[8px]">ความยาว (Length)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {SHIRT_SIZES.map((s) => (
                    <tr key={s.size} className="hover:bg-soft-olive/30">
                      <td className="p-2.5 font-bold text-ink-dark">{s.size}</td>
                      <td className="p-2.5">{s.chest}</td>
                      <td className="p-2.5">{s.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-muted-green">
              * เนื้อผ้าไมโครโพลีเอสเตอร์ Recycled น้ำหนักเบา ระบายเหงื่อเร็ว ไม่ระคายผิว
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm text-muted-green">กำลังโหลดระบบรับสมัคร...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
