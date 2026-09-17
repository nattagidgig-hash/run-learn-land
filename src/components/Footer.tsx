import React from "react";
import {
  IconPhoneCall,
  IconMapPin,
  IconShieldCheck,
  IconHeartbeat,
  IconCalendarEvent
} from "@tabler/icons-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-ink-dark text-canvas-cream mt-auto border-t border-ink-dark/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[14px] bg-soft-olive text-ink-dark flex items-center justify-center font-bold text-lg">
                RLL
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                วังหมีกระทิง RUN LEARN LAND
              </span>
            </div>
            <p className="text-sm text-soft-olive/80 leading-relaxed font-light">
              โครงการวิ่งเพื่อการกุศลและอนุรักษ์แนวเชื่อมต่อผืนป่าดงพญาเย็น–เขาใหญ่ รายได้สมทบกองทุนสนับสนุนอุปกรณ์ผู้พิทักษ์ป่าและทุนการศึกษาเยาวชนชุมชนตำบลวังหมี
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-white/10 text-olive-highlight font-medium">
              <IconShieldCheck size={14} />
              มาตรฐานความปลอดภัยกิจกรรมกลางแจ้ง
            </div>
          </div>

          {/* Location & Dates */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider text-accent-orange uppercase">
              วันและสถานที่
            </h4>
            <ul className="space-y-2.5 text-sm text-soft-olive/80">
              <li className="flex items-start gap-2.5">
                <IconCalendarEvent size={18} className="text-olive-highlight shrink-0 mt-0.5" />
                <span>วันอาทิตย์ที่ 8 พฤศจิกายน 2026 (05:00 - 11:00 น.)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <IconMapPin size={18} className="text-olive-highlight shrink-0 mt-0.5" />
                <span>จุดปล่อยตัว: ลานกิจกรรมชุมชนบ้านวังหมี ต.วังหมี อ.วังน้ำเขียว จ.นครราชสีมา</span>
              </li>
              <li className="flex items-start gap-2.5">
                <IconHeartbeat size={18} className="text-olive-highlight shrink-0 mt-0.5" />
                <span>ทีมแพทย์ฉุกเฉินและจุดปฐมพยาบาลประจำทุก 3 กม.</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider text-accent-orange uppercase">
              เมนูหลัก
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-soft-olive/80">
              <a href="/activities" className="hover:text-white transition-colors">ระยะกิจกรรม</a>
              <a href="/route" className="hover:text-white transition-colors">แผนที่เส้นทาง</a>
              <a href="/schedule" className="hover:text-white transition-colors">กำหนดการ</a>
              <a href="/rules" className="hover:text-white transition-colors">กฎและกติกา</a>
              <a href="/faq" className="hover:text-white transition-colors">คำถามที่พบบ่อย</a>
              <a href="/registration/status" className="hover:text-white transition-colors">เช็กสถานะบิบ</a>
              <a href="/about" className="hover:text-white transition-colors">เกี่ยวกับโครงการ</a>
              <a href="/admin" className="hover:text-white transition-colors text-olive-highlight">ระบบเจ้าหน้าที่</a>
            </div>
          </div>

          {/* Emergency & Contacts */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider text-accent-orange uppercase">
              สายด่วนประสานงาน
            </h4>
            <div className="p-4 rounded-[18px] bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-sm text-white font-medium">
                <IconPhoneCall size={16} className="text-accent-orange" />
                <span>ศูนย์ประสานงานจัดงาน: 044-999-888</span>
              </div>
              <div className="text-xs text-soft-olive/70 leading-relaxed">
                ติดต่อสอบถามรายละเอียดการสมัคร การรับ Race Kit และแจ้งเหตุฉุกเฉิน
              </div>
            </div>
            <div className="text-xs text-soft-olive/60 pt-1">
              Email: contact@runlearnland-wangmee.org
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-soft-olive/60 gap-4">
          <p>© 2026 วังหมีกระทิง RUN LEARN LAND. สงวนลิขสิทธิ์ทุกประการ.</p>
          <div className="flex items-center gap-6">
            <a href="/rules" className="hover:text-soft-olive">นโยบายความเป็นส่วนตัว (PDPA)</a>
            <a href="/rules" className="hover:text-soft-olive">เงื่อนไขการเข้าร่วมกิจกรรม</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
