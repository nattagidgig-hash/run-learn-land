"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { INITIAL_CATEGORIES } from "@/lib/db";
import { ImageSlot } from "@/components/ui/ImageSlot";
import {
  IconCheck,
  IconClock,
  IconAward,
  IconArrowRight,
  IconMapPin,
  IconShieldCheck
} from "@tabler/icons-react";

export default function ActivitiesPage() {
  const categories = INITIAL_CATEGORIES;

  return (
    <div className="min-h-screen flex flex-col bg-canvas-cream text-ink-dark">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest text-accent-orange uppercase block mb-1">
            Race Distances & Experience
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-ink-dark">
            ระยะกิจกรรม วังหมีกระทิง 2026
          </h1>
          <p className="text-sm sm:text-base text-muted-green mt-3">
            เปิดรับ 3 ระยะกิจกรรม ออกแบบให้สอดคล้องกับธรรมชาติและระดับความพร้อมของผู้เข้าร่วมทุกคน
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              className={`rounded-[24px] bg-surface-white border border-border-subtle p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image / Visual Column (5 cols) */}
              <div className="lg:col-span-5 space-y-3">
                <ImageSlot
                  ratio="4:5"
                  label={cat.imageLabel}
                  sublabel={`สัดส่วน 4:5 • กิจกรรม ${cat.name}`}
                  className="rounded-[20px]"
                />
              </div>

              {/* Details Column (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-soft-olive text-ink-dark border border-border-subtle">
                      {cat.distance}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-canvas-cream text-accent-orange border border-border-subtle">
                      {cat.challengeLevel}
                    </span>
                    <span className="text-xs text-muted-green ml-auto">
                      โควตา {cat.remaining} / {cat.quota} สิทธิ์
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-ink-dark">{cat.name}</h2>
                  <p className="text-sm text-muted-green leading-relaxed mt-2">
                    {cat.description}
                  </p>
                </div>

                {/* Specs Box */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-[18px] bg-canvas-cream border border-border-subtle text-xs">
                  <div>
                    <span className="text-muted-green block">เวลาปล่อยตัว</span>
                    <span className="font-bold text-ink-dark text-sm">{cat.startTime}</span>
                  </div>
                  <div>
                    <span className="text-muted-green block">เวลาคัตออฟ</span>
                    <span className="font-bold text-ink-dark text-sm">{cat.cutoffTime}</span>
                  </div>
                  <div>
                    <span className="text-muted-green block">ความชันสะสม</span>
                    <span className="font-bold text-accent-orange text-sm">{cat.elevation}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-3 pt-2 border-t border-border-subtle/60">
                    <span className="text-muted-green">เหมาะสำหรับ: </span>
                    <span className="font-medium text-ink-dark">{cat.targetAudience}</span>
                  </div>
                </div>

                {/* Perks Checklist */}
                <div>
                  <span className="text-xs font-bold text-muted-green uppercase tracking-wider block mb-2">
                    สิ่งที่จะได้รับในชุดสมัคร:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {cat.perks.map((p, i) => (
                      <div key={i} className="flex items-start gap-2 text-ink-dark">
                        <IconCheck size={14} className="text-status-success shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-green block">ค่าสมัครร่วมกิจกรรม</span>
                    <span className="text-2xl font-bold text-ink-dark">฿{cat.price}</span>
                    <span className="text-xs text-muted-green ml-1">/ ท่าน</span>
                  </div>
                  <a
                    href={`/register?category=${cat.id}`}
                    className="px-6 py-3 rounded-[14px] bg-accent-orange hover:bg-accent-orange/90 text-white text-sm font-semibold flex items-center gap-2 shadow-xs transition-transform active:scale-95"
                  >
                    <span>สมัครระยะนี้</span>
                    <IconArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
