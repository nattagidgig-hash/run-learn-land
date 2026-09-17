"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  IconShieldCheck,
  IconAlertTriangle,
  IconCheck,
  IconFileText,
  IconHeartbeat,
  IconTrees
} from "@tabler/icons-react";

export default function RulesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas-cream text-ink-dark">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest text-accent-orange uppercase block mb-1">
            Regulations & Safety
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-ink-dark">
            กติกาและนโยบายความปลอดภัย
          </h1>
          <p className="text-sm sm:text-base text-muted-green mt-3">
            ข้อปฏิบัติเพื่อความปลอดภัยของนักวิ่งทุกคน และการร่วมพิทักษ์ผืนป่าอย่างยั่งยืน
          </p>
        </div>

        <div className="space-y-8">
          {/* Section 1: Mandatory Gear */}
          <div className="rounded-[24px] bg-surface-white border border-border-subtle p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-ink-dark flex items-center gap-2">
              <IconShieldCheck size={22} className="text-accent-orange" />
              <span>อุปกรณ์บังคับและอุปกรณ์แนะนำ (Equipment Requirements)</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-[18px] bg-canvas-cream border border-border-subtle space-y-2">
                <span className="font-bold text-ink-dark block">สำหรับระยะ Mini Trail 12 กม. (บังคับ)</span>
                <ul className="space-y-1.5 text-muted-green">
                  <li>• นกหวีดฉุกเฉินประจำตัว (ตรวจก่อนเข้าสตาร์ท)</li>
                  <li>• กระติกน้ำหรือเป้น้ำพกพา ความจุอย่างน้อย 500 ml</li>
                  <li>• โทรศัพท์มือถือพร้อมแบตเตอรี่เต็มและบันทึกเบอร์ฉุกเฉิน</li>
                  <li>• รองเท้าสำหรับวิ่งเทรลที่มีดอกยางยึดเกาะ</li>
                </ul>
              </div>

              <div className="p-4 rounded-[18px] bg-canvas-cream border border-border-subtle space-y-2">
                <span className="font-bold text-ink-dark block">สำหรับทุกระยะ (แนะนำ)</span>
                <ul className="space-y-1.5 text-muted-green">
                  <li>• แก้วน้ำพกพาส่วนตัว (งานนี้งดใช้แก้วกระดาษ 100%)</li>
                  <li>• หมวกกันแดดและครีมกันแดด</li>
                  <li>• ยาประจำตัวสำหรับผู้มีโรคประจำตัว</li>
                  <li>• สเปรย์หรือโลชั่นกันแมลง</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 2: General Race Rules */}
          <div className="rounded-[24px] bg-surface-white border border-border-subtle p-6 sm:p-8 shadow-xs space-y-4 text-xs sm:text-sm">
            <h2 className="text-xl font-bold text-ink-dark flex items-center gap-2">
              <IconFileText size={22} className="text-accent-orange" />
              <span>กฎระเบียบการแข่งขันทั่วไป</span>
            </h2>
            <div className="space-y-3 text-ink-dark/90 leading-relaxed">
              <p>
                1. <strong>การติดหมายเลขบิบ (Bib Number):</strong> ผู้เข้าร่วมกิจกรรมต้องติดหมายเลขวิ่งไว้ด้านหน้าบริเวณหน้าอกให้มองเห็นได้ชัดเจนตลอดเวลา ไม่อนุญาตให้พับหรือตัดทอนตัวเลข
              </p>
              <p>
                2. <strong>การโอนสิทธิ์และเปลี่ยนชื่อ:</strong> การโอนสิทธิ์หรือเปลี่ยนชื่อผู้สมัครสามารถดำเนินการผ่านระบบแอดมินล่วงหน้าก่อนวันงานอย่างน้อย 14 วัน เพื่อความถูกต้องของประกันอุบัติเหตุ
              </p>
              <p>
                3. <strong>การตัดเวลา (Cut-off Time):</strong> มีการกำหนดจุดตัดเวลาอย่างเคร่งครัด หากนักวิ่งไม่สามารถผ่านจุดตัดเวลาตามที่กำหนด จะมีรถพยาบาลและรถบริการนำท่านกลับสู่จุดเส้นชัยเพื่อความปลอดภัย
              </p>
              <p>
                4. <strong>การทิ้งขยะ (Zero Littering Policy):</strong> ทิ้งขยะเฉพาะในถังขยะที่จัดไว้ตามจุดบริการน้ำดื่ม (Aid Stations) เท่านั้น หากทิ้งขยะในเส้นทางธรรมชาติจะถูกปรับตัดสิทธิ์ทันที
              </p>
            </div>
          </div>

          {/* Section 3: PDPA Policy */}
          <div className="rounded-[24px] bg-surface-white border border-border-subtle p-6 sm:p-8 shadow-xs space-y-4 text-xs sm:text-sm">
            <h2 className="text-xl font-bold text-ink-dark flex items-center gap-2">
              <IconTrees size={22} className="text-accent-orange" />
              <span>นโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA)</span>
            </h2>
            <div className="space-y-2 text-muted-green leading-relaxed">
              <p>
                โครงการวังหมีกระทิง RUN LEARN LAND จัดเก็บข้อมูลส่วนบุคคลของท่าน (รวมถึงชื่อ นามสกุล เบอร์โทรศัพท์ และข้อมูลสุขภาพที่จำเป็น) เพื่อวัตถุประสงค์ในการลงทะเบียน จัดทำประกันอุบัติเหตุ และการดูแลทางการแพทย์ฉุกเฉินเท่านั้น
              </p>
              <p>
                ข้อมูลสุขภาพจะถูกจำกัดสิทธิ์การเข้าถึงเฉพาะบุคลากรทางการแพทย์ประจำงานเท่านั้น และจะไม่ถูกเปิดเผยต่อบุคคลภายนอกโดยไม่ได้รับความยินยอม
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
