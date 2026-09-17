"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImageSlot } from "@/components/ui/ImageSlot";
import {
  IconTrees,
  IconAward,
  IconShieldCheck,
  IconHeartbeat,
  IconArrowRight
} from "@tabler/icons-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas-cream text-ink-dark">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest text-accent-orange uppercase block mb-1">
            Story & Mission
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-ink-dark">
            เรื่องราวโครงการและเป้าหมายการกุศล
          </h1>
          <p className="text-sm sm:text-base text-muted-green mt-3">
            ผืนป่าวังหมี แหล่งอาศัยสำคัญของกระทิงป่าแห่งดงพญาเย็น–เขาใหญ่ และพลังชุมชนเพื่อการอยู่ร่วมกันอย่างสมดุล
          </p>
        </div>

        {/* Story Section */}
        <div className="rounded-[24px] bg-surface-white border border-border-subtle p-6 sm:p-10 shadow-xs space-y-8 mb-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-ink-dark">
              ทำไมต้องเป็น "วังหมีกระทิง RUN LEARN LAND"?
            </h2>
            <p className="text-sm sm:text-base text-muted-green leading-relaxed">
              ตำบลวังหมี อำเภอวังน้ำเขียว จังหวัดนครราชสีมา ตั้งอยู่บนแนวเชื่อมต่อผืนป่ามรดกโลกดงพญาเย็น–เขาใหญ่ ในช่วงหลายปีที่ผ่านมา จำนวนกระทิงป่าได้เพิ่มขึ้นและออกมาหากินตามแนวป่าชุมชน การจัดกิจกรรมวิ่งการกุศลครั้งนี้ไม่ได้มีเป้าหมายเพียงแค่การออกกำลังกาย แต่คือการสร้าง <strong>"สะพานแห่งการเรียนรู้ (LEARN)"</strong> ให้คนเมืองและนักวิ่งได้สัมผัสธรรมชาติอย่างเข้าใจ และสนับสนุนกองทุนดูแลผู้พิทักษ์ป่าชุมชน
            </p>
          </div>

          <ImageSlot
            ratio="16:9"
            label="ภาพวิถีชีวิตกระทิงป่าและชุมชนแนวขอบป่าวังหมี"
            sublabel="สัดส่วน 16:9 • สะท้อนความอุดมสมบูรณ์ของระบบนิเวศวังน้ำเขียว"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border-subtle text-xs sm:text-sm">
            <div className="p-4 rounded-[18px] bg-canvas-cream border border-border-subtle space-y-1">
              <span className="font-bold text-ink-dark block">1. สนับสนุนผู้พิทักษ์ป่า</span>
              <p className="text-muted-green text-xs">จัดซื้อวิทยุสื่อสาร กล้องดักถ่ายภาพสัตว์ป่า และชุดปฐมพยาบาลเดินป่า</p>
            </div>
            <div className="p-4 rounded-[18px] bg-canvas-cream border border-border-subtle space-y-1">
              <span className="font-bold text-ink-dark block">2. ปลูกพืชอาหารสัตว์ป่า</span>
              <p className="text-muted-green text-xs">ทำแปลงหญ้าและโป่งเทียมลดการที่กระทิงออกมารบกวนพืชผลการเกษตร</p>
            </div>
            <div className="p-4 rounded-[18px] bg-canvas-cream border border-border-subtle space-y-1">
              <span className="font-bold text-ink-dark block">3. ทุนการศึกษาเยาวชน</span>
              <p className="text-muted-green text-xs">สนับสนุนทุนการศึกษาบุตรหลานครอบครัวพิทักษ์ป่าในพื้นที่ตำบลวังหมี</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-[24px] bg-soft-olive/40 border border-border-subtle text-center space-y-4">
          <h3 className="text-xl font-bold text-ink-dark">ร่วมเป็นส่วนหนึ่งของการพิทักษ์ผืนป่ากระทิง</h3>
          <p className="text-sm text-muted-green max-w-md mx-auto">
            ทุกการก้าววิ่งของท่าน คือแรงสนับสนุนที่ส่งตรงถึงชุมชนและเจ้าหน้าที่ผู้เสียสละ
          </p>
          <a
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[14px] bg-accent-orange text-white text-sm font-semibold hover:bg-accent-orange/90 shadow-xs"
          >
            <span>สมัครร่วมกิจกรรมเลย</span>
            <IconArrowRight size={16} />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
