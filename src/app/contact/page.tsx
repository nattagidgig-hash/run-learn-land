"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  IconPhoneCall,
  IconMail,
  IconMapPin,
  IconClock,
  IconCheck,
  IconCircleCheck
} from "@tabler/icons-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas-cream text-ink-dark">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest text-accent-orange uppercase block mb-1">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-ink-dark">
            ติดต่อทีมงานประสานงาน
          </h1>
          <p className="text-sm sm:text-base text-muted-green mt-3">
            มีข้อสงสัยหรือต้องการสอบถามข้อมูลเพิ่มเติม สามารถติดต่อศูนย์อำนวยการจัดงานได้ตลอดเวลา
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Info Column (5 cols) */}
          <div className="lg:col-span-5 rounded-[24px] bg-surface-white border border-border-subtle p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-ink-dark uppercase tracking-wider pb-3 border-b border-border-subtle">
              ข้อมูลการติดต่อหลัก
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-[12px] bg-soft-olive text-ink-dark flex items-center justify-center shrink-0">
                  <IconPhoneCall size={18} />
                </div>
                <div>
                  <span className="text-xs text-muted-green block">สายด่วนจัดงาน</span>
                  <span className="font-bold text-ink-dark">044-999-888, 081-234-5678</span>
                  <span className="text-[11px] text-muted-green block">เปิดสายทุกวัน 08:00 - 18:00 น.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-[12px] bg-soft-olive text-ink-dark flex items-center justify-center shrink-0">
                  <IconMail size={18} />
                </div>
                <div>
                  <span className="text-xs text-muted-green block">อีเมลประสานงาน</span>
                  <span className="font-bold text-ink-dark">contact@runlearnland-wangmee.org</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-[12px] bg-soft-olive text-ink-dark flex items-center justify-center shrink-0">
                  <IconMapPin size={18} />
                </div>
                <div>
                  <span className="text-xs text-muted-green block">ที่ตั้งศูนย์ประสานงาน</span>
                  <span className="font-medium text-ink-dark">
                    ที่ทำการองค์การบริหารส่วนตำบลวังหมี เลขที่ 99 หมู่ 6 ต.วังหมี อ.วังน้ำเขียว จ.นครราชสีมา 30370
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-[18px] bg-canvas-cream border border-border-subtle text-xs text-muted-green space-y-1">
              <span className="font-bold text-ink-dark block">สำหรับผู้สนับสนุนและสปอนเซอร์:</span>
              <p>ติดต่อฝ่ายพัฒนาชุมชน โทร 081-999-7777 หรือ LINE Official: @wangmeebull</p>
            </div>
          </div>

          {/* Right Contact Form Column (7 cols) */}
          <div className="lg:col-span-7 rounded-[24px] bg-surface-white border border-border-subtle p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-ink-dark uppercase tracking-wider mb-2">
              ส่งข้อความถึงทีมงาน
            </h2>
            <p className="text-xs text-muted-green mb-6">
              กรอกข้อความของท่าน เจ้าหน้าที่จะติดต่อกลับภายใน 24 ชั่วโมง
            </p>

            {sent ? (
              <div className="p-8 rounded-[20px] bg-status-success/10 border border-status-success/30 text-center space-y-2">
                <IconCircleCheck size={36} className="text-status-success mx-auto" />
                <h3 className="text-base font-bold text-status-success">ส่งข้อความเรียบร้อยแล้ว</h3>
                <p className="text-xs text-muted-green">
                  ขอบพระคุณสำหรับข้อความ ทีมงานจะประสานงานและติดต่อกลับโดยเร็วที่สุด
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-ink-dark block mb-1">ชื่อ–นามสกุล *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="เช่น สมชาย วังน้ำเขียว"
                    className="w-full px-3.5 py-2.5 rounded-[14px] bg-canvas-cream border border-border-subtle text-sm focus:outline-hidden focus:ring-2 focus:ring-accent-orange"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-ink-dark block mb-1">เบอร์โทรศัพท์ติดต่อ *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08XXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-[14px] bg-canvas-cream border border-border-subtle text-sm focus:outline-hidden focus:ring-2 focus:ring-accent-orange"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-ink-dark block mb-1">ข้อความหรือคำถาม *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="พิมพ์ข้อความที่ต้องการสอบถาม..."
                    className="w-full px-3.5 py-2.5 rounded-[14px] bg-canvas-cream border border-border-subtle text-sm focus:outline-hidden focus:ring-2 focus:ring-accent-orange"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-[14px] bg-ink-dark hover:bg-ink-dark/90 text-white text-sm font-semibold shadow-xs"
                >
                  ส่งข้อความ
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
