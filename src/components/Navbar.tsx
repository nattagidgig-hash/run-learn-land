"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconRoute,
  IconCalendarEvent,
  IconMap,
  IconCircleCheck,
  IconShieldCheck,
  IconArrowRight,
} from "@tabler/icons-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();

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
          <Link href="/" className="flex items-center gap-3 group">
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
          </Link>

          {/* Desktop Nav Links */}
          <nav aria-label="เมนูหลัก" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-3 py-2 text-sm font-medium rounded-full transition-colors flex items-center gap-1.5 ${
                    active
                      ? "bg-ink-dark text-surface-white font-semibold"
                      : "text-muted-green hover:text-ink-dark hover:bg-soft-olive/60"
                  }`}
                >
                  {link.icon && <link.icon size={16} stroke={1.8} />}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Register CTA */}
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 lg:px-5 lg:py-2.5 rounded-[12px] lg:rounded-[14px] bg-accent-orange hover:bg-accent-orange/90 text-surface-white text-xs lg:text-sm font-semibold shadow-xs transition-transform active:scale-95"
          >
            <span>สมัครวิ่ง</span>
            <IconArrowRight size={16} stroke={2} className="hidden lg:block" />
          </Link>
        </div>

        {/* Mobile Horizontal Scrollable Nav */}
        <nav aria-label="เมนูหลัก" className="lg:hidden relative -mx-4 border-t border-border-subtle/40">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 px-4 scrollbar-none">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap px-3.5 py-1.5 text-xs font-medium rounded-full shrink-0 flex items-center gap-1.5 ${
                    active
                      ? "bg-ink-dark text-surface-white font-semibold"
                      : "bg-surface-white border border-border-subtle text-muted-green"
                  }`}
                >
                  {link.icon && <link.icon size={14} stroke={1.8} />}
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-canvas-cream to-transparent" />
        </nav>
      </div>
    </header>
  );
};
