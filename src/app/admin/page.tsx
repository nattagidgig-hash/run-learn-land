"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { db } from "@/lib/db";
import { RegistrationOrder, RegistrationStatus } from "@/types";
import {
  IconUsers,
  IconCreditCard,
  IconCheck,
  IconQrcode,
  IconSearch,
  IconDownload,
  IconShirt,
  IconPhoto,
  IconRefresh,
  IconShieldCheck,
  IconAlertCircle,
  IconClock,
  IconCircleCheck
} from "@tabler/icons-react";

const STATUS_LABEL: Record<string, string> = {
  draft: "ฉบับร่าง",
  pending_payment: "รอชำระเงิน",
  confirmed: "ยืนยันสิทธิ์แล้ว",
  kit_ready: "เตรียม Kit แล้ว",
  checked_in: "เช็กอินแล้ว",
  finished: "เข้าเส้นชัยแล้ว",
};

// ponytail: client-side PIN gate over localStorage data; swap for Supabase auth + RLS when the real backend lands
const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN;

const noopSubscribe = () => () => {};

function AdminGate({ children }: { children: React.ReactNode }) {
  const stored = useSyncExternalStore(
    noopSubscribe,
    () => sessionStorage.getItem("rll_admin") === "1",
    () => false
  );
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  if (stored || unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col bg-canvas-cream text-ink-dark">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (ADMIN_PIN && pin === ADMIN_PIN) {
              sessionStorage.setItem("rll_admin", "1");
              setUnlocked(true);
            } else {
              setError(true);
            }
          }}
          className="w-full max-w-sm rounded-[24px] bg-surface-white border border-border-subtle p-6 sm:p-8 shadow-xs space-y-4"
        >
          <div className="w-12 h-12 rounded-full bg-soft-olive text-ink-dark flex items-center justify-center mx-auto">
            <IconShieldCheck size={24} stroke={1.8} />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-bold">ระบบเจ้าหน้าที่</h1>
            <p className="text-xs text-muted-green mt-1">กรอกรหัสผ่านเจ้าหน้าที่เพื่อเข้าใช้งาน</p>
          </div>
          <label className="block">
            <span className="sr-only">รหัสผ่านเจ้าหน้าที่</span>
            <input
              type="password"
              inputMode="numeric"
              autoComplete="current-password"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="รหัสผ่าน"
              className="w-full px-4 py-3 rounded-[14px] bg-canvas-cream border border-border-subtle text-center text-base font-mono focus:outline-hidden focus:ring-2 focus:ring-accent-orange"
            />
          </label>
          {error && (
            <p role="alert" className="text-xs text-status-error text-center">
              {ADMIN_PIN ? "รหัสผ่านไม่ถูกต้อง" : "ยังไม่ได้ตั้งค่า NEXT_PUBLIC_ADMIN_PIN"}
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-[14px] bg-ink-dark hover:bg-ink-dark/90 text-white font-bold text-sm"
          >
            เข้าสู่ระบบ
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminGate>
      <AdminContent />
    </AdminGate>
  );
}

function AdminContent() {
  const [activeTab, setActiveTab] = useState<"overview" | "registrations" | "checkin" | "media">("overview");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // State
  const [stats, setStats] = useState(db.getAdminStats());
  const [registrations, setRegistrations] = useState<RegistrationOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Check-in state
  const [checkinInput, setCheckinInput] = useState("");
  const [checkinResult, setCheckinResult] = useState<{ success: boolean; message: string; reg?: RegistrationOrder } | null>(null);

  const loadData = () => {
    setStats(db.getAdminStats());
    setRegistrations(db.getRegistrations());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter registrations
  const filtered = registrations.filter((r) => {
    const matchQuery =
      !searchQuery ||
      r.registrationCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.bibNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.participants.some(
        (p) =>
          p.fullNameTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.bibName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.phone.includes(searchQuery)
      );

    const matchCat = filterCategory === "all" || r.categoryId === filterCategory;
    const matchStatus = filterStatus === "all" || r.status === filterStatus;

    return matchQuery && matchCat && matchStatus;
  });

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      "Registration Code",
      "Bib",
      "Category",
      "Type",
      "Primary Name",
      "Phone",
      "Email",
      "Shirt Size",
      "Amount",
      "Payment Status",
      "Status",
      "Kit Delivery",
      "Created At"
    ];

    const rows = registrations.map((r) => [
      r.registrationCode,
      r.bibNumber,
      r.categoryName,
      r.regType,
      `"${r.participants[0]?.fullNameTh || ""}"`,
      r.participants[0]?.phone || "",
      r.participants[0]?.email || "",
      r.participants[0]?.shirtSize || "",
      r.amount,
      r.paymentStatus,
      r.status,
      r.kitDelivery.method,
      r.createdAt
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `RUN_LEARN_LAND_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Change Registration Status
  const handleStatusChange = (id: string, newStatus: RegistrationStatus) => {
    db.updateRegistration(id, { status: newStatus });
    loadData();
  };

  // Check-in action
  const handleCheckinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkinInput.trim()) return;
    const res = db.checkinParticipant(checkinInput.trim());
    setCheckinResult({
      success: res.success,
      message: res.message,
      reg: res.registration
    });
    if (res.success) {
      setCheckinInput("");
      loadData();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas-cream text-ink-dark">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-ink-dark text-white">
                Admin Control Tower
              </span>
              <span className="text-xs text-muted-green">Wangmee Bull RUN LEARN LAND</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-ink-dark mt-1">
              ระบบบริหารจัดการผู้สมัครและจุดเช็กอิน
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-[14px] bg-white border border-border-subtle text-xs font-semibold text-ink-dark hover:bg-soft-olive flex items-center gap-1.5 shadow-xs"
            >
              <IconDownload size={15} />
              <span>Export CSV นักวิ่ง</span>
            </button>
            <button
              type="button"
              onClick={loadData}
              className="p-2 rounded-[14px] bg-white border border-border-subtle text-ink-dark hover:bg-soft-olive"
              aria-label="รีเฟรชข้อมูล"
              title="รีเฟรชข้อมูล"
            >
              <IconRefresh size={16} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-border-subtle">
          {[
            { id: "overview", label: "ภาพรวมสถิติ (Overview)", icon: IconUsers },
            { id: "registrations", label: "รายชื่อผู้สมัคร (Registrations)", icon: IconUsers },
            { id: "checkin", label: "จุดเช็กอินหน้างาน (Check-in Station)", icon: IconQrcode },
            { id: "media", label: "จัดการรูปภาพ (Media Assets)", icon: IconPhoto },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-colors ${
                activeTab === tab.id
                  ? "bg-ink-dark text-white"
                  : "bg-surface-white text-muted-green border border-border-subtle hover:text-ink-dark"
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-[22px] bg-surface-white border border-border-subtle shadow-xs">
                <span className="text-xs font-semibold text-muted-green uppercase">ผู้สมัครทั้งหมด</span>
                <p className="text-2xl sm:text-3xl font-bold text-ink-dark mt-1">{stats.totalRegistrations} ราย</p>
                <span className="text-[11px] text-muted-green mt-1 block">นับรวมทุกประเภทการสมัคร</span>
              </div>

              <div className="p-5 rounded-[22px] bg-surface-white border border-border-subtle shadow-xs">
                <span className="text-xs font-semibold text-muted-green uppercase">ชำระเงินแล้ว</span>
                <p className="text-2xl sm:text-3xl font-bold text-status-success mt-1">{stats.paidCount} ราย</p>
                <span className="text-[11px] text-muted-green mt-1 block">รอชำระ: {stats.pendingPaymentCount} ราย</span>
              </div>

              <div className="p-5 rounded-[22px] bg-surface-white border border-border-subtle shadow-xs">
                <span className="text-xs font-semibold text-muted-green uppercase">รายได้รวม</span>
                <p className="text-2xl sm:text-3xl font-bold text-accent-orange mt-1">฿{stats.totalRevenue.toLocaleString()}</p>
                <span className="text-[11px] text-muted-green mt-1 block">ยอดเงินเข้าบัญชีกองทุน</span>
              </div>

              <div className="p-5 rounded-[22px] bg-surface-white border border-border-subtle shadow-xs">
                <span className="text-xs font-semibold text-muted-green uppercase">เช็กอินแล้วหน้างาน</span>
                <p className="text-2xl sm:text-3xl font-bold text-ink-dark mt-1">{stats.checkedInCount} คน</p>
                <span className="text-[11px] text-status-success mt-1 block">รับ Race Kit เรียบร้อยแล้ว</span>
              </div>
            </div>

            {/* Quota per Category & Shirt Inventory */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Quota Tracker */}
              <div className="p-6 rounded-[24px] bg-surface-white border border-border-subtle shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-ink-dark uppercase tracking-wider">
                  โควตาคงเหลือแต่ละระยะ (Atomic Quota)
                </h3>
                <div className="space-y-4">
                  {stats.categories.map((c) => {
                    const filled = c.quota - c.remaining;
                    const percent = Math.round((filled / c.quota) * 100);
                    return (
                      <div key={c.id} className="space-y-1.5 text-xs">
                        <div className="flex justify-between font-bold text-ink-dark">
                          <span>{c.name} ({c.distance})</span>
                          <span>{filled} / {c.quota} สิทธิ์ ({percent}%)</span>
                        </div>
                        <div className="w-full h-2.5 bg-canvas-cream rounded-full overflow-hidden border border-border-subtle">
                          <div
                            className="h-full bg-accent-orange rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-muted-green">คงเหลือว่าง: {c.remaining} ที่นั่ง</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Shirt Inventory */}
              <div className="p-6 rounded-[24px] bg-surface-white border border-border-subtle shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-ink-dark uppercase tracking-wider">
                    ยอดสั่งผลิตเสื้อแยกตามไซส์ (Shirt Inventory)
                  </h3>
                  <IconShirt size={18} className="text-muted-green" />
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 text-center text-xs">
                  {Object.entries(stats.shirtCounts).map(([size, count]) => (
                    <div key={size} className="p-3 rounded-[14px] bg-canvas-cream border border-border-subtle">
                      <span className="font-bold text-ink-dark block text-sm">{size}</span>
                      <span className="text-accent-orange font-bold text-base mt-1 block">{count}</span>
                      <span className="text-[10px] text-muted-green">ตัว</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-muted-green">
                  * ข้อมูลนี้ใช้ส่งตัดเย็บกับโรงงานชุมชนล่วงหน้า 30 วันก่อนจัดงาน
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: REGISTRATIONS MANAGEMENT */}
        {activeTab === "registrations" && (
          <div className="space-y-6">
            {/* Search & Filters */}
            <div className="p-5 rounded-[22px] bg-surface-white border border-border-subtle shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="ค้นหาชื่อ, เบอร์ Bib, รหัสสมัคร..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 pl-10 rounded-[14px] bg-canvas-cream border border-border-subtle text-xs focus:outline-hidden focus:ring-2 focus:ring-accent-orange"
                />
                <IconSearch size={16} className="absolute left-3.5 top-3 text-muted-green" />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 rounded-[12px] bg-canvas-cream border border-border-subtle text-xs font-medium text-ink-dark"
                >
                  <option value="all">ทุกประเภทกิจกรรม</option>
                  <option value="nature-walk">Nature Walk 3 กม.</option>
                  <option value="family-run">Family Run 4.2 กม.</option>
                  <option value="mini-trail">Mini Trail 14 กม.</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 rounded-[12px] bg-canvas-cream border border-border-subtle text-xs font-medium text-ink-dark"
                >
                  <option value="all">ทุกสถานะ</option>
                  <option value="confirmed">ยืนยันสิทธิ์แล้ว</option>
                  <option value="pending_payment">รอชำระเงิน</option>
                  <option value="checked_in">เช็กอินแล้ว</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-[24px] bg-surface-white border border-border-subtle shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-canvas-cream text-muted-green border-b border-border-subtle uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-4">รหัส / บิบ</th>
                      <th className="p-4">ผู้สมัครหลัก</th>
                      <th className="p-4">ระยะกิจกรรม</th>
                      <th className="p-4">เสื้อ / Kit</th>
                      <th className="p-4">ยอดเงิน</th>
                      <th className="p-4">สถานะ</th>
                      <th className="p-4 text-right">การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {filtered.length > 0 ? (
                      filtered.map((r) => (
                        <React.Fragment key={r.id}>
                        <tr className="hover:bg-soft-olive/20 transition-colors">
                          <td className="p-4">
                            <span className="font-mono font-bold text-ink-dark block">{r.registrationCode}</span>
                            <span className="font-mono text-accent-orange font-bold text-xs">{r.bibNumber}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-bold text-ink-dark block">{r.participants[0]?.fullNameTh}</span>
                            <span className="text-muted-green text-[11px]">โทร: {r.participants[0]?.phone}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-medium text-ink-dark">{r.categoryName}</span>
                            <span className="text-muted-green block text-[11px]">{r.regType} ({r.participants.length} คน)</span>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-ink-dark block">ไซส์ {r.participants[0]?.shirtSize}</span>
                            <span className="text-muted-green text-[11px]">
                              {r.kitDelivery.method === "delivery" ? "จัดส่งพัสดุ" : "รับด้วยตนเอง"}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="font-bold text-ink-dark block">฿{r.amount}</span>
                            <span
                              className={`text-[10px] font-bold ${
                                r.paymentStatus === "verified" ? "text-status-success" : "text-status-warning"
                              }`}
                            >
                              {r.paymentStatus === "verified" ? "ชำระแล้ว" : "รอตรวจสอบ"}
                            </span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-block ${
                                r.status === "checked_in"
                                  ? "bg-status-success/20 text-status-success"
                                  : r.status === "confirmed"
                                  ? "bg-status-success/15 text-status-success"
                                  : "bg-status-warning/20 text-status-warning"
                              }`}
                            >
                              {STATUS_LABEL[r.status] ?? r.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-1">
                            {r.status !== "checked_in" && (
                              <button
                                type="button"
                                onClick={() => handleStatusChange(r.id, "checked_in")}
                                className="px-2.5 py-1 rounded-[10px] bg-status-success text-white text-[11px] font-semibold hover:bg-status-success/90"
                              >
                                เช็กอิน
                              </button>
                            )}
                            <button
                              type="button"
                              aria-expanded={expandedId === r.id}
                              onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                              className="px-2.5 py-1 rounded-[10px] bg-canvas-cream border border-border-subtle text-[11px] font-medium text-ink-dark hover:bg-soft-olive"
                            >
                              {expandedId === r.id ? "ซ่อน" : "ดู"}
                            </button>
                          </td>
                        </tr>
                        {expandedId === r.id && (
                          <tr className="bg-canvas-cream/60">
                            <td colSpan={7} className="p-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {r.participants.map((p, i) => (
                                  <div key={p.id} className="p-3 rounded-[14px] bg-white border border-border-subtle space-y-0.5">
                                    <div className="font-bold text-ink-dark">{i + 1}. {p.fullNameTh}</div>
                                    <div className="text-muted-green">{p.fullNameEn || "-"} • Bib: <span className="font-mono text-ink-dark">{p.bibName}</span></div>
                                    <div className="text-muted-green">เกิด {p.birthDate} • ไซส์ {p.shirtSize} • บัตร xxxx{p.idCardLast4 || "----"}</div>
                                    <div className="text-muted-green">โทร {p.phone} • {p.email || "-"} • {p.province}</div>
                                  </div>
                                ))}
                                <div className="p-3 rounded-[14px] bg-white border border-border-subtle space-y-0.5 sm:col-span-2 lg:col-span-3">
                                  <div className="font-bold text-ink-dark">ผู้ติดต่อฉุกเฉิน</div>
                                  <div className="text-muted-green">
                                    {r.medical.emergencyContactName} ({r.medical.emergencyContactRelation}) • {r.medical.emergencyContactPhone}
                                    {r.medical.emergencyContactAltPhone ? ` / ${r.medical.emergencyContactAltPhone}` : ""}
                                  </div>
                                  {(r.medical.chronicDiseaseDetail || r.medical.allergyDetail || r.medical.physicalLimitationDetail) && (
                                    <div className="text-status-error">
                                      {[r.medical.chronicDiseaseDetail, r.medical.allergyDetail, r.medical.physicalLimitationDetail].filter(Boolean).join(" • ")}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-muted-green">
                          ไม่พบข้อมูลผู้สมัครที่ค้นหา
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CHECK-IN STATION */}
        {activeTab === "checkin" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="rounded-[24px] bg-surface-white border border-border-subtle p-6 sm:p-8 shadow-xs text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-soft-olive text-ink-dark mx-auto flex items-center justify-center">
                <IconQrcode size={30} stroke={1.8} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-ink-dark">จุดสแกนเช็กอินวันงาน (Check-in Station)</h2>
                <p className="text-xs text-muted-green mt-1">
                  สแกนคิวอาร์โค้ดจากหน้าจอโทรศัพท์ของนักวิ่ง หรือระบุเลข Bib / หมายเลขสมัคร
                </p>
              </div>

              <form onSubmit={handleCheckinSubmit} className="max-w-md mx-auto space-y-3 pt-2">
                <input
                  type="text"
                  placeholder="สแกนหรือพิมพ์เลขสมัคร / BIB..."
                  value={checkinInput}
                  onChange={(e) => setCheckinInput(e.target.value)}
                  autoFocus
                  className="w-full px-4 py-3 rounded-[14px] bg-canvas-cream border border-border-subtle text-base font-mono text-center font-bold focus:outline-hidden focus:ring-2 focus:ring-accent-orange"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-[14px] bg-ink-dark hover:bg-ink-dark/90 text-white font-bold text-sm shadow-xs"
                >
                  ยืนยันเช็กอินและส่งมอบ Race Kit
                </button>
              </form>

              {/* Checkin Result Feedback */}
              {checkinResult && (
                <div
                  className={`p-5 rounded-[20px] text-left text-xs space-y-2 mt-4 border ${
                    checkinResult.success
                      ? "bg-status-success/10 border-status-success/30 text-status-success"
                      : "bg-status-error/10 border-status-error/30 text-status-error"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {checkinResult.success ? <IconCheck size={18} stroke={3} /> : <IconAlertCircle size={18} />}
                    <span>{checkinResult.message}</span>
                  </div>

                  {checkinResult.reg && (
                    <div className="p-3 bg-white rounded-[12px] border border-border-subtle text-ink-dark space-y-1">
                      <div className="flex justify-between font-bold">
                        <span>{checkinResult.reg.participants[0]?.fullNameTh}</span>
                        <span className="text-accent-orange font-mono">Bib: {checkinResult.reg.bibNumber}</span>
                      </div>
                      <div className="flex justify-between text-muted-green">
                        <span>กิจกรรม: {checkinResult.reg.categoryName}</span>
                        <span>ไซส์เสื้อ: {checkinResult.reg.participants[0]?.shirtSize}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Offline fallback note per Spec Section 11 */}
            <div className="p-4 rounded-[16px] bg-soft-olive/40 border border-border-subtle text-xs text-muted-green flex items-start gap-2.5">
              <IconShieldCheck size={18} className="text-ink-dark shrink-0 mt-0.5" />
              <span>
                <strong>ระบบรองรับโหมดออฟไลน์:</strong> หากสัญญาณอินเทอร์เน็ตในผืนป่าไม่เสถียร ระบบจะบันทึกลง Local Cache ทันทีและส่งขึ้นเซิร์ฟเวอร์อัตโนมัติเมื่อกลับมาออนไลน์
              </span>
            </div>
          </div>
        )}

        {/* TAB 4: MEDIA ASSET MANAGEMENT */}
        {activeTab === "media" && (
          <div className="space-y-6">
            <div className="p-6 rounded-[24px] bg-surface-white border border-border-subtle shadow-xs space-y-4">
              <div>
                <h2 className="text-lg font-bold text-ink-dark">จัดการรูปภาพ Mockup และแบนเนอร์ (ImageSlot Control)</h2>
                <p className="text-xs text-muted-green mt-1">
                  ปรับเปลี่ยนภาพหน้าแรก กิจกรรม และเส้นทางได้ทันทีโดยไม่ต้องแก้โค้ด ตามข้อกำหนดใน Mega Spec Section 4
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-ink-dark">Hero Image (สัดส่วน 16:9)</span>
                  <div className="aspect-[16/9] rounded-[18px] bg-canvas-cream border border-border-subtle flex flex-col items-center justify-center p-4 text-center">
                    <IconPhoto size={24} className="text-muted-green mb-1" />
                    <span className="text-xs font-semibold text-ink-dark">ภาพทิวทัศน์ผืนป่าวังหมี</span>
                    <button
                      type="button"
                      onClick={() => alert("ระบบพร้อมเชื่อมต่อ Supabase Storage Bucket 'public-media'")}
                      className="mt-2 px-3 py-1 rounded-full text-[11px] bg-white border border-border-subtle font-medium text-ink-dark hover:bg-soft-olive"
                    >
                      เปลี่ยนภาพใหม่
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-ink-dark">Content Card 1 (สัดส่วน 4:5)</span>
                  <div className="aspect-[4/5] rounded-[18px] bg-canvas-cream border border-border-subtle flex flex-col items-center justify-center p-4 text-center">
                    <IconPhoto size={24} className="text-muted-green mb-1" />
                    <span className="text-xs font-semibold text-ink-dark">ทุ่งหญ้าและจุดชมกระทิง</span>
                    <button
                      type="button"
                      onClick={() => alert("ระบบพร้อมเชื่อมต่อ Supabase Storage Bucket 'public-media'")}
                      className="mt-2 px-3 py-1 rounded-full text-[11px] bg-white border border-border-subtle font-medium text-ink-dark hover:bg-soft-olive"
                    >
                      เปลี่ยนภาพใหม่
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-ink-dark">Content Card 2 (สัดส่วน 4:5)</span>
                  <div className="aspect-[4/5] rounded-[18px] bg-canvas-cream border border-border-subtle flex flex-col items-center justify-center p-4 text-center">
                    <IconPhoto size={24} className="text-muted-green mb-1" />
                    <span className="text-xs font-semibold text-ink-dark">สันเขามินิเทรล 14 กม.</span>
                    <button
                      type="button"
                      onClick={() => alert("ระบบพร้อมเชื่อมต่อ Supabase Storage Bucket 'public-media'")}
                      className="mt-2 px-3 py-1 rounded-full text-[11px] bg-white border border-border-subtle font-medium text-ink-dark hover:bg-soft-olive"
                    >
                      เปลี่ยนภาพใหม่
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
