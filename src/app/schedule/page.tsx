"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  IconCalendarEvent,
  IconClock,
  IconMapPin,
  IconShirt,
  IconAward,
  IconCircleCheck
} from "@tabler/icons-react";

export default function SchedulePage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas-cream text-ink-dark">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest text-accent-orange uppercase block mb-1">
            Event Timeline
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-ink-dark">
            กำหนดการจัดงาน
          </h1>
          <p className="text-sm sm:text-base text-muted-green mt-3">
            วันรับ Race Kit ล่วงหน้า และกำหนดการวันปล่อยตัว ภายในเทศกาล 19–22 กุมภาพันธ์ 2570
          </p>
        </div>

        {/* Day 1: Expo & Kit Collection */}
        <div className="mb-10 rounded-[24px] bg-surface-white border border-border-subtle p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
            <div>
              <span className="text-xs font-bold text-accent-orange uppercase tracking-wider block">
                ก่อนวันปล่อยตัว 1 วัน
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-ink-dark mt-0.5">
                วันรับ Race Kit และนิทรรศการอนุรักษ์กระทิง
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-soft-olive text-ink-dark">
              Expo Day
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {[
              { time: "13:00 - 18:00 น.", title: "เปิดจุดรับ Race Kit ล่วงหน้า", desc: "แสดง QR E-Ticket และบัตรประชาชนเพื่อรับเสื้อและหมายเลข Bib ณ ลานกิจกรรมชุมชนวังหมี" },
              { time: "15:00 - 16:30 น.", title: "เวิร์กชอปเยาวชนและครอบครัว", desc: "กิจกรรม 'รอยเท้ากระทิงและพืชอาหารสัตว์ป่า' โดยนักวิชาการป่าไม้และไกด์ชุมชน" },
              { time: "17:00 - 17:45 น.", title: "บรรยายสรุปเส้นทางเทรล (Race Briefing)", desc: "บรีฟเส้นทาง ข้อควรระวัง จุดพยาบาล สำหรับนักวิ่ง Mini Trail 14K" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-[16px] bg-canvas-cream border border-border-subtle flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <div className="flex items-center gap-2 font-mono font-bold text-accent-orange sm:min-w-[140px]">
                  <IconClock size={16} />
                  <span>{item.time}</span>
                </div>
                <div>
                  <h4 className="font-bold text-ink-dark">{item.title}</h4>
                  <p className="text-xs text-muted-green mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Day 2: Race Day */}
        <div className="rounded-[24px] bg-surface-white border border-border-subtle p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
            <div>
              <span className="text-xs font-bold text-accent-orange uppercase tracking-wider block">
                วันปล่อยตัว (Race Day)
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-ink-dark mt-0.5">
                วันแข่งขันและกิจกรรมวิ่ง (Race Day)
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-orange text-white">
              Race Day
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {[
              { time: "05:00 น.", title: "เปิดประตูพื้นที่จัดงาน & จุดรับฝากของ", desc: "เปิดให้เช็กอินวันงาน รับอาหารว่างยามเช้า และเตรียมความพร้อมร่างกาย" },
              { time: "05:20 น.", title: "เช็กชื่อนักกีฬา Mini Trail 14K เข้าสู่บล็อกสตาร์ท", desc: "ตรวจอุปกรณ์บังคับ (นกหวีด, ขวดน้ำพกพา)" },
              { time: "05:30 น.", title: "ปล่อยตัว Mini Trail 14 กม.", desc: "คัตออฟเวลา 09:00 น. (3 ชั่วโมง 30 นาที)" },
              { time: "06:00 น.", title: "ปล่อยตัว Family Run 4.2 กม.", desc: "คัตออฟเวลา 08:00 น. (2 ชั่วโมง)" },
              { time: "06:30 น.", title: "ปล่อยตัว Nature Walk 3 กม.", desc: "คัตออฟเวลา 08:30 น. (2 ชั่วโมง)" },
              { time: "08:00 - 10:30 น.", title: "อาหารเช้าชุมชน & พิธีมอบรางวัล", desc: "ซุ้มอาหารพื้นถิ่นออร์แกนิกวังน้ำเขียว พิธีมอบเงินสนับสนุนกองทุนพิทักษ์ป่าวังหมี" },
              { time: "11:00 น.", title: "สิ้นสุดกิจกรรมอย่างเป็นทางการ", desc: "ปิดเส้นทางการแข่งขันและเก็บกวาดขยะคืนความสะอาดสู่ผืนป่า" },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-[16px] bg-canvas-cream border border-border-subtle flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <div className="flex items-center gap-2 font-mono font-bold text-ink-dark sm:min-w-[140px]">
                  <IconClock size={16} className="text-accent-orange" />
                  <span>{item.time}</span>
                </div>
                <div>
                  <h4 className="font-bold text-ink-dark">{item.title}</h4>
                  <p className="text-xs text-muted-green mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
