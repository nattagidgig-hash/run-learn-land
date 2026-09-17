"use client";

import React, { useState } from "react";
import Link from "next/navigation";
import { usePathname } from "next/navigation";
import {
  IconRoute,
  IconCalendarEvent,
  IconMap,
  IconCircleCheck,
  IconShieldCheck,
  IconMenu2,
  IconX,
  IconArrowRight,
  IconUserCircle
} from "@tabler/icons-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "หน้าแรก", href: "/" },
    { label: "ระยะกิจกรรม", href: "/activities", icon: IconRoute },
    { label: "เส้นทางและระดับชัน", href: "/route", icon: IconMap },
    { label: "กำหนดการ", href: "/schedule", icon: IconCalendarEvent },
    { label: "ความปลอดภัยและกติกา", href: "/rules", icon: IconShieldCheck },
    { label: "เช็กสถานะ/บิบ", href: "/registration/status", icon: IconCircleCheck },
  ];

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname?.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-canvas-cream/95 backdrop-blur-xs border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Logo & Title */}
          <a href="/" className="flex items-center gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="วังหมีกระทิง RUN LEARN LAND"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-accent-orange uppercase">
                Family Nature Trail Festival
              </span>
              <span className="text-base sm:text-lg font-bold text-ink-dark tracking-tight leading-tight">
                วังหมีกระทิง RUN LEARN LAND
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-full transition-colors flex items-center gap-1.5 ${
                    active
                      ? "bg-ink-dark text-surface-white font-semibold"
                      : "text-muted-green hover:text-ink-dark hover:bg-soft-olive/60"
                  }`}
                >
                  {link.icon && <link.icon size={16} stroke={1.8} />}
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/admin"
              className="px-3 py-2 text-xs font-medium text-muted-green hover:text-ink-dark transition-colors flex items-center gap-1"
              title="สำหรับเจ้าหน้าที่"
            >
              <IconUserCircle size={16} stroke={1.8} />
              ระบบเจ้าหน้าที่
            </a>
            <a
              href="/register"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[14px] bg-accent-orange hover:bg-accent-orange/90 text-surface-white text-sm font-semibold shadow-xs transition-transform active:scale-95"
            >
              <span>สมัครวิ่ง</span>
              <IconArrowRight size={16} stroke={2} />
            </a>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="/register"
              className="px-3.5 py-1.5 rounded-[12px] bg-accent-orange text-surface-white text-xs font-semibold"
            >
              สมัครวิ่ง
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-[12px] border border-border-subtle text-ink-dark bg-white"
              aria-label="เมนู"
            >
              {mobileOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Scrollable Nav (Per Spec) */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none -mx-4 px-4 border-t border-border-subtle/40">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap px-3.5 py-1.5 text-xs font-medium rounded-full shrink-0 flex items-center gap-1.5 ${
                  active
                    ? "bg-ink-dark text-surface-white font-semibold"
                    : "bg-surface-white border border-border-subtle text-muted-green"
                }`}
              >
                {link.icon && <link.icon size={14} stroke={1.8} />}
                {link.label}
              </a>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-surface-white border-b border-border-subtle px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-sm text-ink-dark hover:bg-soft-olive/50 font-medium"
            >
              {link.icon && <link.icon size={18} className="text-muted-green" />}
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-border-subtle flex items-center justify-between">
            <a
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="text-xs text-muted-green hover:text-ink-dark flex items-center gap-1.5"
            >
              <IconUserCircle size={16} />
              ระบบแอดมินและจุด Check-in
            </a>
            <a
              href="/registration/status"
              onClick={() => setMobileOpen(false)}
              className="text-xs font-semibold text-accent-orange"
            >
              ตรวจสอบบิบ & QR
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
