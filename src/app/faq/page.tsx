"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { IconChevronDown, IconChevronUp, IconHelp } from "@tabler/icons-react";

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "หากสมัครแล้วติดภารกิจ สามารถขอคืนเงิน (Refund) ได้หรือไม่?",
      a: "เนื่องจากเป็นกิจกรรมการกุศลเพื่อนำรายได้สมทบกองทุนชุมชน ผู้จัดงานขอสงวนสิทธิ์ไม่คืนเงินค่าสมัครทุกกรณี แต่ท่านสามารถติดต่อทีมงานเพื่อขอ 'โอนสิทธิ์' หรือเปลี่ยนชื่อผู้ร่วมวิ่งได้ล่วงหน้าก่อนวันงาน 14 วัน"
    },
    {
      q: "เด็กเล็กสามารถเข้าร่วมระยะ Nature Walk 3 กม. หรือ Family Run 4.2 กม. ได้หรือไม่?",
      a: "สามารถเข้าร่วมได้ ทั้ง 2 ระยะได้รับการออกแบบให้เหมาะสำหรับเด็กและครอบครัว มีฐานกิจกรรมการเรียนรู้ธรรมชาติ และมีรถกู้ชีพดูแลความปลอดภัยตลอดเส้นทาง สำหรับเด็กอายุต่ำกว่า 5 ขวบวิ่งร่วมกับผู้ปกครองได้โดยไม่ต้องเสียค่าสมัคร (แต่จะไม่ได้รับเสื้อและเหรียญ)"
    },
    {
      q: "การรับ Race Kit ทางไปรษณีย์ จะได้รับช่วงไหน?",
      a: "สำหรับผู้ที่เลือกการจัดส่งพัสดุ ทีมงานจะจัดส่งผ่านขนส่งเอกชนล่วงหน้าก่อนวันงานประมาณ 10–14 วัน พร้อมแจ้งหมายเลข Tracking ให้ท่านตรวจสอบสถานะผ่านระบบ Participant Portal"
    },
    {
      q: "ในเส้นทางมีโอกาสพบกระทิงป่าหรือไม่ และมีความปลอดภัยเพียงใด?",
      a: "เส้นทางได้รับการประสานงานร่วมกับหน่วยพิทักษ์ป่าดงพญาเย็นและชุดลาดตระเวนชุมชน โดยจะมีการสำรวจพื้นที่ล่วงหน้า 3 ชั่วโมงก่อนปล่อยตัวเพื่อความปลอดภัย และจุดที่กระทิงชอบออกมาหากินจะมีเจ้าหน้าที่ดูแลอย่างเข้มงวด"
    },
    {
      q: "จำเป็นต้องพกแก้วน้ำส่วนตัวมาหรือไม่?",
      a: "จำเป็นอย่างยิ่ง งานนี้ปฏิบัติตามมาตรฐาน Zero Waste เพื่อลดขยะในพื้นที่อนุรักษ์ธรรมชาติ จะไม่มีการแจกแก้วกระดาษตามจุดให้น้ำ ขอความร่วมมือนักวิ่งพกแก้วน้ำซิลิโคนพับได้ หรือกระติกน้ำส่วนตัวมาเติมน้ำดื่มได้ไม่อั้นตลอดเส้นทาง"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-canvas-cream text-ink-dark">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest text-accent-orange uppercase block mb-1">
            Questions & Answers
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-ink-dark">
            คำถามที่พบบ่อย (FAQ)
          </h1>
          <p className="text-sm sm:text-base text-muted-green mt-3">
            รวบรวมข้อสงสัยเกี่ยวกับการสมัคร การรับ Race Kit และกติกาการแข่งขัน
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="rounded-[20px] bg-surface-white border border-border-subtle overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-ink-dark hover:bg-soft-olive/20"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <IconChevronUp size={20} className="text-accent-orange shrink-0" />
                  ) : (
                    <IconChevronDown size={20} className="text-muted-green shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-muted-green leading-relaxed border-t border-border-subtle/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
