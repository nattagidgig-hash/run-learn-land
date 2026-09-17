"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { db } from "@/lib/db";
import { RegistrationOrder } from "@/types";
import {
  IconSearch,
  IconCircleCheck,
  IconClock,
  IconShirt,
  IconMapPin,
  IconDownload,
  IconPrinter,
  IconPhoneCall,
  IconQrcode,
  IconInfoCircle,
  IconCheck,
  IconCalendarEvent,
  IconFileText,
  IconAward
} from "@tabler/icons-react";
import { QRCodeSVG } from "qrcode.react";

function StatusContent() {
  const searchParams = useSearchParams();
  const codeParam = searchParams?.get("code") || "";

  const [searchQuery, setSearchQuery] = useState(codeParam);
  const [order, setOrder] = useState<RegistrationOrder | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (codeParam) {
      handleSearch(codeParam);
    } else {
      // Default to first seed record for demo
      const first = db.getRegistrations()[0];
      if (first) {
        setOrder(first);
        setSearchQuery(first.registrationCode);
      }
    }
  }, [codeParam]);

  const handleSearch = (queryToSearch?: string) => {
    const q = queryToSearch !== undefined ? queryToSearch : searchQuery;
    setHasSearched(true);
    if (!q.trim()) {
      setOrder(null);
      return;
    }
    const found = db.getRegistration(q.trim());
    setOrder(found || null);
  };

  // Status timeline steps
  const timelineStages = [
    { key: "applied", label: "สมัครแล้ว", completed: true },
    { key: "paid", label: "ชำระเงินแล้ว", completed: order?.paymentStatus === "verified" },
    { key: "confirmed", label: "ยืนยันสิทธิ์แล้ว", completed: order?.status !== "draft" && order?.status !== "pending_payment" },
    { key: "kit_ready", label: "เตรียม Race Kit แล้ว", completed: order?.status === "kit_ready" || order?.status === "checked_in" || order?.status === "finished" },
    { key: "checked_in", label: "เช็กอินแล้ว", completed: order?.status === "checked_in" || order?.status === "finished" },
    { key: "finished", label: "เข้าเส้นชัยแล้ว", completed: order?.status === "finished" },
    { key: "certificate", label: "ได้รับใบประกาศ", completed: order?.status === "finished" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-canvas-cream text-ink-dark">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header & Search Bar */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-semibold tracking-widest text-accent-orange uppercase block mb-1">
            Participant Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink-dark mb-3">
            ตรวจสอบสถานะการสมัคร & บิบวิ่ง
          </h1>
          <p className="text-sm text-muted-green mb-6">
            ค้นหาด้วยเลขที่การสมัคร (เช่น RLL-2026-8801), เบอร์ Bib หรือเบอร์โทรศัพท์ที่ใช้สมัคร
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex items-center gap-2 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="ระบุเลขสมัคร, Bib หรือเบอร์โทร..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-[14px] bg-surface-white border border-border-subtle text-sm focus:outline-hidden focus:ring-2 focus:ring-accent-orange shadow-xs"
              />
              <IconSearch size={18} className="absolute left-3.5 top-3.5 text-muted-green" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-[14px] bg-ink-dark hover:bg-ink-dark/90 text-surface-white text-sm font-semibold shadow-xs"
            >
              ค้นหา
            </button>
          </form>
        </div>

        {/* Search Results */}
        {order ? (
          <div className="space-y-8">
            {/* Top Overview Card */}
            <div className="rounded-[24px] bg-surface-white border border-border-subtle p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-soft-olive text-ink-dark">
                      {order.categoryName}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        order.status === "checked_in"
                          ? "bg-status-success/20 text-status-success"
                          : order.paymentStatus === "verified"
                          ? "bg-status-success/15 text-status-success"
                          : "bg-status-warning/20 text-status-warning"
                      }`}
                    >
                      {order.status === "checked_in"
                        ? "เช็กอินแล้ว (Checked-in)"
                        : order.paymentStatus === "verified"
                        ? "ยืนยันสิทธิ์แล้ว (Confirmed)"
                        : "รอชำระเงิน (Pending)"}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink-dark">
                    {order.participants[0]?.fullNameTh}
                  </h2>
                  <p className="text-xs text-muted-green mt-0.5">
                    เลขสมัคร: <span className="font-mono font-bold text-ink-dark">{order.registrationCode}</span> • สมัครเมื่อ {new Date(order.createdAt).toLocaleDateString('th-TH')}
                  </p>
                </div>

                <div className="text-left sm:text-right p-4 rounded-[18px] bg-canvas-cream border border-border-subtle sm:min-w-[160px]">
                  <span className="text-[11px] text-muted-green uppercase font-semibold block">หมายเลขบิบ (BIB)</span>
                  <span className="text-2xl sm:text-3xl font-mono font-black text-accent-orange block mt-0.5">
                    {order.bibNumber}
                  </span>
                  <span className="text-[11px] font-mono font-medium text-muted-green">
                    {order.participants[0]?.bibName}
                  </span>
                </div>
              </div>

              {/* Status Timeline per Spec Section 6 */}
              <div className="pt-6">
                <span className="text-xs font-semibold text-muted-green uppercase tracking-wider block mb-4">
                  ลำดับสถานะกิจกรรม (Status Timeline)
                </span>
                <div className="overflow-x-auto pb-2">
                  <div className="flex items-center justify-between min-w-[620px]">
                    {timelineStages.map((stage, idx) => (
                      <div key={stage.key} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                              stage.completed
                                ? "bg-status-success text-white"
                                : "bg-canvas-cream border border-border-subtle text-muted-green"
                            }`}
                          >
                            {stage.completed ? <IconCheck size={16} stroke={3} /> : idx + 1}
                          </div>
                          <span
                            className={`text-[11px] mt-2 whitespace-nowrap font-medium ${
                              stage.completed ? "text-ink-dark font-bold" : "text-muted-green"
                            }`}
                          >
                            {stage.label}
                          </span>
                        </div>
                        {idx < timelineStages.length - 1 && (
                          <div
                            className={`h-0.5 flex-1 mx-2 transition-all ${
                              timelineStages[idx + 1].completed
                                ? "bg-status-success"
                                : "bg-border-subtle"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Split Grid: Left QR E-Ticket & Right Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: QR Code Check-in Card (5 cols) */}
              <div className="md:col-span-5 rounded-[24px] bg-surface-white border border-border-subtle p-6 text-center space-y-4 shadow-xs">
                <span className="text-xs font-semibold uppercase text-accent-orange tracking-wider">
                  Check-in E-Ticket
                </span>
                <h3 className="text-base font-bold text-ink-dark">
                  คิวอาร์โค้ดสำหรับรายงานตัววันงาน
                </h3>

                <div className="p-4 bg-white rounded-[20px] border border-border-subtle shadow-xs inline-block mx-auto">
                  <QRCodeSVG value={order.registrationCode} size={175} level="M" />
                </div>

                <div className="text-xs text-muted-green leading-relaxed px-2">
                  แสดง QR Code นี้แก่เจ้าหน้าที่ ณ จุดลงทะเบียน ลานชุมชนบ้านวังหมี เพื่อรับ Bib และชิปจับเวลา
                </div>

                <div className="pt-2 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-[12px] bg-canvas-cream border border-border-subtle text-xs font-semibold text-ink-dark hover:bg-soft-olive flex items-center gap-1.5"
                  >
                    <IconPrinter size={15} />
                    <span>พิมพ์บัตร E-Ticket</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Details & Race Guide (7 cols) */}
              <div className="md:col-span-7 space-y-6">
                
                {/* Participants & Race Kit Card */}
                <div className="rounded-[24px] bg-surface-white border border-border-subtle p-6 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-ink-dark uppercase tracking-wider pb-2 border-b border-border-subtle">
                    รายละเอียดผู้สมัครในรายการนี้ ({order.participants.length} ท่าน)
                  </h3>
                  <div className="space-y-3">
                    {order.participants.map((p, idx) => (
                      <div key={p.id} className="p-3.5 rounded-[16px] bg-canvas-cream border border-border-subtle text-xs space-y-1">
                        <div className="flex justify-between font-bold text-ink-dark">
                          <span>{idx + 1}. {p.fullNameTh} ({p.fullNameEn || "-"})</span>
                          <span className="text-accent-orange">ไซส์เสื้อ: {p.shirtSize}</span>
                        </div>
                        <div className="flex justify-between text-muted-green">
                          <span>Bib Name: <strong className="text-ink-dark font-mono">{p.bibName}</strong></span>
                          <span>โทร: {p.phone}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Info */}
                  <div className="p-3.5 rounded-[16px] bg-soft-olive/40 border border-border-subtle text-xs">
                    <div className="flex items-center gap-2 font-bold text-ink-dark mb-1">
                      <IconShirt size={16} className="text-accent-orange" />
                      <span>สถานะการรับ Race Kit:</span>
                      <span className="font-normal text-muted-green">
                        {order.kitDelivery.method === "delivery"
                          ? `จัดส่งทางพัสดุ (${order.kitDelivery.recipientName})`
                          : order.kitDelivery.method === "early"
                          ? "รับล่วงหน้า 1 วัน ณ ลานชุมชนวังหมี"
                          : "รับด้วยตนเองเช้าวันงาน 05:00 น."}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event Schedule & Mandatory Gear Notice */}
                <div className="rounded-[24px] bg-surface-white border border-border-subtle p-6 shadow-xs space-y-4 text-xs">
                  <h3 className="text-sm font-bold text-ink-dark uppercase tracking-wider pb-2 border-b border-border-subtle flex items-center justify-between">
                    <span>กำหนดการและข้อแนะนำ</span>
                    <a href="/schedule" className="text-accent-orange hover:underline font-medium">
                      ดูกำหนดการเต็ม
                    </a>
                  </h3>

                  <div className="space-y-2 text-ink-dark">
                    <div className="flex items-start gap-2">
                      <IconCalendarEvent size={16} className="text-olive-highlight shrink-0 mt-0.5" />
                      <span><strong>วันจัดงาน:</strong> วันอาทิตย์ที่ 8 พฤศจิกายน 2026 (เปิดจุดเช็กอิน 05:00 น.)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <IconMapPin size={16} className="text-olive-highlight shrink-0 mt-0.5" />
                      <span><strong>จุดปล่อยตัว:</strong> ลานกิจกรรมชุมชนบ้านวังหมี ต.วังหมี อ.วังน้ำเขียว</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <IconInfoCircle size={16} className="text-olive-highlight shrink-0 mt-0.5" />
                      <span><strong>อุปกรณ์แนะนำ:</strong> ขวดน้ำพกพา (งานรักษ์โลกงดแจกแก้วกระดาษ), หมวกกันแดด, ยาทากันแมลง</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          hasSearched && (
            <div className="p-8 rounded-[24px] bg-surface-white border border-border-subtle text-center max-w-md mx-auto space-y-3">
              <IconInfoCircle size={36} className="text-status-warning mx-auto" />
              <h3 className="text-base font-bold text-ink-dark">ไม่พบข้อมูลการสมัคร</h3>
              <p className="text-xs text-muted-green">
                โปรดตรวจสอบความถูกต้องของเลขสมัครหรือเบอร์โทรศัพท์ หากเพิ่งสมัครเสร็จระบบอาจใช้เวลาประมวลผลสักครู่
              </p>
              <a
                href="/register"
                className="inline-block mt-2 px-5 py-2.5 rounded-[12px] bg-ink-dark text-white text-xs font-semibold"
              >
                สมัครเข้าร่วมกิจกรรมใหม่
              </a>
            </div>
          )
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function RegistrationStatusPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm text-muted-green">กำลังโหลดข้อมูลผู้สมัคร...</div>}>
      <StatusContent />
    </Suspense>
  );
}
