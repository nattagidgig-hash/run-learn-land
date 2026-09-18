import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { INITIAL_CATEGORIES } from "@/lib/db";
import {
  IconCalendarEvent,
  IconMapPin,
  IconHeartbeat,
  IconArrowRight,
  IconShieldCheck,
  IconRoute,
  IconShirt,
  IconUserCheck,
  IconCheck,
  IconInfoCircle,
  IconCircleCheckFilled,
  IconTrees,
  IconAward,
  IconSparkles
} from "@tabler/icons-react";

const FUND_GOAL = 500000;

export default function HomePage() {
  const categories = INITIAL_CATEGORIES;
  const totalQuota = categories.reduce((s, c) => s + c.quota, 0);
  const registered = categories.reduce((s, c) => s + (c.quota - c.remaining), 0);
  const raised = categories.reduce((s, c) => s + (c.quota - c.remaining) * c.price, 0);
  const raisedPct = Math.min(100, Math.round((raised / FUND_GOAL) * 1000) / 10);

  return (
    <div className="min-h-screen flex flex-col bg-canvas-cream text-ink-dark">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-20 border-b border-border-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Announcement Pill */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-soft-olive border border-border-subtle text-xs sm:text-sm font-medium text-ink-dark">
                <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
                <span>เปิดรับสมัครอย่างเป็นทางการ • โควตารวม {totalQuota.toLocaleString()} ที่นั่งเท่านั้น</span>
              </div>
            </div>

            {/* Main Hero Header */}
            <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
              <h1 className="sr-only">วังหมีกระทิง RUN LEARN LAND</h1>
              <p className="text-base sm:text-xl text-muted-green leading-relaxed max-w-2xl mx-auto">
                เดิน–วิ่งสัมผัสผืนป่าดงพญาเย็น เรียนรู้วิถีชีวิตกระทิงวังน้ำเขียว และร่วมระดมทุนสนับสนุนอุปกรณ์ผู้พิทักษ์ป่าชุมชน
              </p>
            </div>

            {/* Hero Image Slot (16:9) per Spec Section 4 */}
            <div className="max-w-5xl mx-auto mb-10 sm:mb-14">
              <ImageSlot
                ratio="16:9"
                source="/cover.jpg"
                label="โปสเตอร์หลักโครงการ วังหมีกระทิง RUN LEARN LAND"
                sublabel="Family Nature Trail Festival"
                className="shadow-sm overflow-hidden border-2 border-border-subtle"
              />
            </div>

            {/* Key Event Badges / Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="p-5 rounded-[20px] bg-surface-white border border-border-subtle flex items-start gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-soft-olive flex items-center justify-center text-ink-dark shrink-0">
                  <IconCalendarEvent size={22} stroke={1.8} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-muted-green uppercase tracking-wider">วันจัดกิจกรรม</h3>
                  <p className="text-sm font-bold text-ink-dark mt-0.5">19–22 กุมภาพันธ์ 2570</p>
                  <p className="text-xs text-muted-green mt-0.5">Family Nature Trail Festival</p>
                </div>
              </div>

              <div className="p-5 rounded-[20px] bg-surface-white border border-border-subtle flex items-start gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-soft-olive flex items-center justify-center text-ink-dark shrink-0">
                  <IconMapPin size={22} stroke={1.8} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-muted-green uppercase tracking-wider">สถานที่</h3>
                  <p className="text-sm font-bold text-ink-dark mt-0.5">ลานชุมชนบ้านวังหมี</p>
                  <p className="text-xs text-muted-green mt-0.5">อ.วังน้ำเขียว จ.นครราชสีมา</p>
                </div>
              </div>

              <div className="p-5 rounded-[20px] bg-surface-white border border-border-subtle flex items-start gap-4">
                <div className="w-10 h-10 rounded-[12px] bg-soft-olive flex items-center justify-center text-ink-dark shrink-0">
                  <IconAward size={22} stroke={1.8} />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-muted-green uppercase tracking-wider">เป้าหมายระดมทุน</h3>
                  <p className="text-sm font-bold text-ink-dark mt-0.5">500,000 บาท</p>
                  <p className="text-xs text-muted-green mt-0.5">สนับสนุนผู้พิทักษ์ป่าชุมชน</p>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="mt-8 text-center">
              <Link
                href="/register"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-[16px] bg-ink-dark hover:bg-ink-dark/90 text-surface-white text-base font-semibold shadow-xs transition-transform active:scale-95"
              >
                <span>เลือกกิจกรรมและสมัครทันที</span>
                <IconArrowRight size={18} stroke={2} />
              </Link>
            </div>
          </div>
        </section>

        {/* CHARITY FUNDRAISING GOAL SECTION */}
        <section className="py-12 bg-surface-white border-b border-border-subtle">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="rounded-[24px] bg-soft-olive/50 border border-border-subtle p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-accent-orange">
                    กองทุนอนุรักษ์ธรรมชาติวังหมี
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-ink-dark">
                    ความคืบหน้าระดมทุนเพื่อพิทักษ์ผืนป่ากระทิง
                  </h3>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-2xl sm:text-3xl font-bold text-ink-dark">{raised.toLocaleString()}</span>
                  <span className="text-sm text-muted-green ml-1">/ {FUND_GOAL.toLocaleString()} บาท</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div
                role="progressbar"
                aria-valuenow={raisedPct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="ความคืบหน้าระดมทุน"
                className="w-full h-3.5 bg-canvas-cream rounded-full overflow-hidden border border-border-subtle mb-3"
              >
                <div className="h-full bg-accent-orange rounded-full transition-all duration-1000" style={{ width: `${raisedPct}%` }} />
              </div>

              <div className="flex items-center justify-between text-xs text-muted-green font-medium">
                <span>ยอดปัจจุบัน {raisedPct}%</span>
                <span>ผู้สมัครแล้ว {registered.toLocaleString()} คนจาก {totalQuota.toLocaleString()} สิทธิ์</span>
              </div>
            </div>
          </div>
        </section>

        {/* RACE CATEGORIES SECTION (Step 1 Preview) */}
        <section className="py-14 sm:py-20 border-b border-border-subtle bg-canvas-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-semibold tracking-widest text-accent-orange uppercase block mb-1">
                Race Categories
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-ink-dark">
                เลือกกิจกรรมที่เหมาะกับคุณ
              </h2>
              <p className="text-sm sm:text-base text-muted-green mt-2">
                เปิดรับ 3 ระยะ ครอบคลุมตั้งแต่สายเดินชิลล์ ครอบครัวพร้อมเด็ก ไปจนถึงนักวิ่งเทรลขาลุย
              </p>
            </div>

            {/* Cards (Desktop 3 cols, Mobile vertical per Spec) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {categories.map((cat) => {
                return (
                  <div
                    key={cat.id}
                    className="rounded-[24px] bg-surface-white border border-border-subtle hover:border-muted-green/60 p-6 sm:p-7 flex flex-col justify-between transition-all relative"
                  >
                    {/* Package Artwork Image */}
                    {cat.imageUrl && (
                      <div className="mb-4 overflow-hidden rounded-[18px] border border-border-subtle aspect-square relative bg-canvas-cream">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={cat.imageUrl}
                          alt={cat.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Top Tag & Price */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-soft-olive text-ink-dark border border-border-subtle">
                          {cat.distance}
                        </span>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-ink-dark">฿{cat.price}</span>
                          <span className="text-xs text-muted-green block">ต่อท่าน</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-ink-dark mb-1">{cat.name}</h3>
                      <p className="text-xs text-accent-orange font-medium mb-3">{cat.challengeLevel} • ความชัน {cat.elevation}</p>
                      
                      <p className="text-sm text-muted-green leading-relaxed mb-5">
                        {cat.description}
                      </p>

                      {/* Quota Indicator */}
                      <div className="p-3 rounded-[14px] bg-canvas-cream border border-border-subtle mb-5">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-muted-green">โควตาคงเหลือ</span>
                          <span className="font-bold text-ink-dark">{cat.remaining} / {cat.quota} สิทธิ์</span>
                        </div>
                        <div className="w-full h-2 bg-border-subtle/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-status-success rounded-full"
                            style={{ width: `${(cat.remaining / cat.quota) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Timing and Audience */}
                      <div className="space-y-1.5 text-xs text-ink-dark/90 pb-4 border-b border-border-subtle/70 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-green">ปล่อยตัว:</span>
                          <span className="font-semibold">{cat.startTime}</span>
                          <span className="text-muted-green ml-auto">คัตออฟ: {cat.cutoffTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-green">เหมาะสำหรับ:</span>
                          <span className="font-medium">{cat.targetAudience}</span>
                        </div>
                      </div>

                      {/* Perks checklist */}
                      <div className="space-y-2 mb-6">
                        <span className="text-xs font-semibold text-muted-green uppercase tracking-wider block">
                          สิ่งที่จะได้รับ:
                        </span>
                        {cat.perks.slice(0, 4).map((perk, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-ink-dark">
                            <IconCheck size={14} className="text-status-success shrink-0 mt-0.5" />
                            <span>{perk}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <Link
                        href={`/register?category=${cat.id}`}
                        className="w-full py-3 rounded-[14px] text-sm font-semibold flex items-center justify-center gap-2 transition-colors bg-accent-orange text-surface-white hover:bg-accent-orange/90"
                      >
                        <span>เลือกกิจกรรมนี้</span>
                        <IconArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6-STEP REGISTRATION FLOW HIGHLIGHT */}
        <section className="py-14 sm:py-20 bg-surface-white border-b border-border-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold tracking-widest text-accent-orange uppercase block mb-1">
                Seamless Experience
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink-dark">
                ขั้นตอนการสมัคร 6 สเต็ปง่าย ๆ
              </h2>
              <p className="text-sm text-muted-green mt-2">
                ออกแบบให้กรอกกระชับ ไม่ต้องเลื่อนยาว บันทึก Draft อัตโนมัติ ป้องกันข้อมูลสูญหาย
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {[
                { step: "01", title: "เลือกกิจกรรม", desc: "เลือก 3 กม., 4.2 กม. หรือ 14 กม.", icon: IconRoute },
                { step: "02", title: "ข้อมูลผู้สมัคร", desc: "เดี่ยว ครอบครัว หรือกลุ่ม", icon: IconUserCheck },
                { step: "03", title: "สุขภาพและฉุกเฉิน", desc: "ประวัติการแพ้และเบอร์ติดต่อ", icon: IconHeartbeat },
                { step: "04", title: "เสื้อและ Race Kit", desc: "เลือกไซส์และวิธีรับบิบ", icon: IconShirt },
                { step: "05", title: "ตรวจสอบและ PDPA", desc: "ทบทวนข้อมูลและยินยอม", icon: IconShieldCheck },
                { step: "06", title: "ชำระเงินและรับบิบ", desc: "พร้อม QR E-Ticket ทันที", icon: IconCircleCheckFilled },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 sm:p-5 rounded-[20px] bg-canvas-cream border border-border-subtle flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-accent-orange">{item.step}</span>
                      <item.icon size={20} className="text-muted-green" stroke={1.8} />
                    </div>
                    <h4 className="text-sm font-bold text-ink-dark mb-1">{item.title}</h4>
                    <p className="text-xs text-muted-green leading-normal">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PHOTO SLOTS & TRAIL ATMOSPHERE (Spec Section 4) */}
        <section className="py-14 sm:py-20 bg-canvas-cream border-b border-border-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-semibold tracking-widest text-accent-orange uppercase block mb-1">
                  Atmosphere & Gallery
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-ink-dark">
                  ภาพบรรยากาศพื้นที่และเส้นทาง
                </h2>
                <p className="text-sm text-muted-green mt-1">
                  ทุกช่องภาพเชื่อมต่อกับระบบ Media Management หลังบ้าน ปรับเปลี่ยนได้โดยไม่ต้องแก้โค้ด
                </p>
              </div>
              <Link
                href="/route"
                className="text-xs sm:text-sm font-semibold text-accent-orange hover:underline inline-flex items-center gap-1 self-start md:self-auto"
              >
                <span>ดูรายละเอียดแผนที่เส้นทาง</span>
                <IconArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ImageSlot
                ratio="1:1"
                source="/packages/nature-walk.jpg"
                label="เนเจอร์วอล์ค 3 กม. เดินสำรวจธรรมชาติ"
                sublabel="ระยะ 3 กม. • สัตว์นำทาง ผึ้งและนกทูแคนน่ารัก"
              />
              <ImageSlot
                ratio="1:1"
                source="/packages/family-run.jpg"
                label="แฟมิลี่รัน 4.2 กม. วิ่งสนุกทั้งครอบครัว"
                sublabel="ระยะ 4.2 กม. • หมีน้อยนักเดินทางและครอบครัว"
              />
              <ImageSlot
                ratio="1:1"
                source="/packages/mini-trail.jpg"
                label="มินิเทรล 14 กม. ท้าทายเส้นทางธรรมชาติ"
                sublabel="ระยะ 14 กม. • กระทิงป่านักวิ่งเทรลขาลุย"
              />
            </div>
          </div>
        </section>

        {/* SAFETY MEASURES */}
        <section className="py-12 sm:py-16 bg-surface-white border-b border-border-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-8 sm:p-10 rounded-[24px] bg-soft-olive/40 border border-border-subtle">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-1 space-y-3">
                  <div className="w-12 h-12 rounded-[16px] bg-ink-dark text-white flex items-center justify-center">
                    <IconShieldCheck size={26} stroke={1.8} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-ink-dark">
                    มาตรฐานความปลอดภัยระดับสูงสุด
                  </h3>
                  <p className="text-sm text-muted-green leading-relaxed">
                    ความปลอดภัยของนักวิ่งคือหัวใจสำคัญ ทีมงานประสานงานร่วมกับเจ้าหน้าที่พิทักษ์ป่าและหน่วยกู้ภัยตลอด 24 ชั่วโมง
                  </p>
                </div>

                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-[16px] bg-white border border-border-subtle">
                    <h4 className="text-sm font-bold text-ink-dark mb-1">จุดปฐมพยาบาลเคลื่อนที่</h4>
                    <p className="text-xs text-muted-green">ประจำทุก 3 กม. พร้อมแพทย์ พยาบาลวิชาชีพ และเครื่องกระตุกหัวใจอัตโนมัติ (AED)</p>
                  </div>
                  <div className="p-4 rounded-[16px] bg-white border border-border-subtle">
                    <h4 className="text-sm font-bold text-ink-dark mb-1">เจ้าหน้าที่คุมเส้นทางป่า</h4>
                    <p className="text-xs text-muted-green">ชุดลาดตระเวนสำรวจจุดกระทิงล่วงหน้า 3 ชั่วโมง เพื่อความปลอดภัยของนักวิ่งทุกคน</p>
                  </div>
                  <div className="p-4 rounded-[16px] bg-white border border-border-subtle">
                    <h4 className="text-sm font-bold text-ink-dark mb-1">จุดบริการน้ำดื่มมาตรฐาน</h4>
                    <p className="text-xs text-muted-green">น้ำดื่มสะอาด เกลือแร่ และผลไม้พื้นถิ่น ไม่สร้างขยะพลาสติก (BYO Cup สนับสนุนแก้วส่วนตัว)</p>
                  </div>
                  <div className="p-4 rounded-[16px] bg-white border border-border-subtle">
                    <h4 className="text-sm font-bold text-ink-dark mb-1">ประกันอุบัติเหตุคุ้มครอง</h4>
                    <p className="text-xs text-muted-green">ผู้สมัครทุกคนได้รับความคุ้มครองอุบัติเหตุวงเงินตามมาตรฐานสากลตลอดระยะเวลากิจกรรม</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SUPPORTERS & ORGANIZERS */}
        <section className="py-12 bg-canvas-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-semibold tracking-widest text-muted-green uppercase block mb-4">
              ภาคีเครือข่ายและผู้สนับสนุน
            </span>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium text-ink-dark/80">
              <span className="px-4 py-2 rounded-[12px] bg-surface-white border border-border-subtle">องค์การบริหารส่วนตำบลวังหมี</span>
              <span className="px-4 py-2 rounded-[12px] bg-surface-white border border-border-subtle">กลุ่มวิสาหกิจชุมชนเกษตรอินทรีย์วังน้ำเขียว</span>
              <span className="px-4 py-2 rounded-[12px] bg-surface-white border border-border-subtle">ชมรมอนุรักษ์กระทิงและสัตว์ป่าวังหมี</span>
              <span className="px-4 py-2 rounded-[12px] bg-surface-white border border-border-subtle">โรงพยาบาลส่งเสริมสุขภาพตำบลวังหมี</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
