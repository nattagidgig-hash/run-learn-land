"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImageSlot } from "@/components/ui/ImageSlot";
import {
  IconMapPin,
  IconHeartbeat,
  IconShieldCheck,
  IconArrowRight,
  IconInfoCircle,
  IconRoute
} from "@tabler/icons-react";

export default function RoutePage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas-cream text-ink-dark">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest text-accent-orange uppercase block mb-1">
            Elevation & Maps
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-ink-dark">
            แผนที่เส้นทางและระดับความชัน
          </h1>
          <p className="text-sm sm:text-base text-muted-green mt-3">
            เส้นทางวิ่งธรรมชาติรอบผืนป่าชุมชนตำบลวังหมี อำเภอวังน้ำเขียว จุดบริการน้ำดื่ม และจุดปฐมพยาบาล
          </p>
        </div>

        {/* Route Map Slot */}
        <div className="max-w-5xl mx-auto mb-14">
          <div className="rounded-[24px] bg-surface-white border border-border-subtle p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <span className="text-sm font-bold text-ink-dark flex items-center gap-2">
                <IconRoute size={18} className="text-accent-orange" />
                <span>แผนที่เส้นทางรวมทั้ง 3 ระยะ (Topographic Map)</span>
              </span>
              <span className="text-xs text-muted-green">อัปเดตล่าสุด 2026</span>
            </div>

            <ImageSlot
              ratio="16:9"
              label="แผนที่เส้นทาง Nature Walk, Family Run และ Mini Trail 12K"
              sublabel="สัดส่วน 16:9 • แสดงเส้นทาง จุดพยาบาล จุดให้น้ำ และเส้นทางหนีภัย"
            />
          </div>
        </div>

        {/* Aid Stations & Elevation Profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="rounded-[24px] bg-surface-white border border-border-subtle p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-soft-olive text-ink-dark">3 กม.</span>
              <span className="text-xs font-bold text-accent-orange">ความชัน +45m</span>
            </div>
            <h3 className="text-lg font-bold text-ink-dark">Nature Walk 3K</h3>
            <p className="text-xs text-muted-green leading-relaxed">
              ทางราบเรียบเลียบขอบป่าชุมชน สวนผลไม้ และแนวแปลงเกษตรอินทรีย์ ไม่มีโขดหินลื่น เหมาะกับเด็กเล็กและผู้สูงอายุ
            </p>
            <div className="p-3.5 rounded-[14px] bg-canvas-cream border border-border-subtle text-xs space-y-1">
              <div className="font-bold text-ink-dark">จุดบริการน้ำดื่ม (Water Station)</div>
              <div className="text-muted-green">• WS1 ที่ กม. 1.5 (น้ำดื่มและเกลือแร่)</div>
              <div className="text-muted-green">• จุดพยาบาลเคลื่อนที่ประจำจุดกึ่งกลาง</div>
            </div>
          </div>

          <div className="rounded-[24px] bg-surface-white border border-border-subtle p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-soft-olive text-ink-dark">4.2 กม.</span>
              <span className="text-xs font-bold text-accent-orange">ความชัน +85m</span>
            </div>
            <h3 className="text-lg font-bold text-ink-dark">Family Run 4.2K</h3>
            <p className="text-xs text-muted-green leading-relaxed">
              เส้นทางลูกรังสลับดินแน่น ผ่านทุ่งหญ้าธรรมชาติจุดหากินของกระทิง มีเนินลาดเอียงเล็กน้อย เพิ่มความสนุกและท้าทาย
            </p>
            <div className="p-3.5 rounded-[14px] bg-canvas-cream border border-border-subtle text-xs space-y-1">
              <div className="font-bold text-ink-dark">จุดบริการน้ำดื่ม (Water Station)</div>
              <div className="text-muted-green">• WS1 ที่ กม. 2.0 (น้ำดื่ม ผลไม้ และเกลือแร่)</div>
              <div className="text-muted-green">• หน่วยปฐมพยาบาลพร้อมรถกู้ชีพสแตนด์บาย</div>
            </div>
          </div>

          <div className="rounded-[24px] bg-surface-white border border-border-subtle p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-soft-olive text-ink-dark">12 กม.</span>
              <span className="text-xs font-bold text-accent-orange">ความชัน +320m</span>
            </div>
            <h3 className="text-lg font-bold text-ink-dark">Mini Trail 12K</h3>
            <p className="text-xs text-muted-green leading-relaxed">
              เส้นทางเทรลธรรมชาติ สันเขาหิน ป่าไผ่ และทางลาดชัน สัมผัสทิวทัศน์ 360 องศา เทือกเขาดงพญาเย็น–เขาใหญ่
            </p>
            <div className="p-3.5 rounded-[14px] bg-canvas-cream border border-border-subtle text-xs space-y-1">
              <div className="font-bold text-ink-dark">จุดบริการน้ำดื่ม (Water Station)</div>
              <div className="text-muted-green">• WS1 ที่ กม. 3.5 (สันเขาแรก)</div>
              <div className="text-muted-green">• WS2 ที่ กม. 7.0 (จุดชมวิวกระทิง)</div>
              <div className="text-muted-green">• WS3 ที่ กม. 10.0 (ทางลงป่าไผ่)</div>
            </div>
          </div>
        </div>

        {/* Environmental & Wildlife Protection Rule */}
        <div className="p-6 rounded-[24px] bg-soft-olive/40 border border-border-subtle flex items-start gap-4">
          <IconShieldCheck size={26} className="text-ink-dark shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm text-ink-dark leading-relaxed">
            <h4 className="font-bold text-base">กฎเหล็กการวิ่งในพื้นที่เขตอนุรักษ์ธรรมชาติ</h4>
            <p>
              1. ห้ามทิ้งขยะทุกชนิดในเส้นทางธรรมชาติ หากพบเห็นปรับตัดสิทธิ์การแข่งขันทันที (Leave No Trace)
            </p>
            <p>
              2. ห้ามใช้เสียงตะโกนหรือเปิดลำโพงบลูทูธเสียงดังรบกวนสัตว์ป่าตลอดเส้นทาง
            </p>
            <p>
              3. หากพบกระทิงป่าในระยะปลอดภัย ให้หยุดเดินและปฏิบัติตามคำสั่งของเจ้าหน้าที่ผู้พิทักษ์ป่าอย่างเคร่งครัด
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
