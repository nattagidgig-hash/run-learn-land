import type { Metadata, Viewport } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-prompt",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#14251B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "วังหมีกระทิง RUN LEARN LAND | แพลตฟอร์มรับสมัครงานวิ่งเพื่อธรรมชาติ",
  description: "งานวิ่งการกุศลเพื่อผืนป่าและสิ่งแวดล้อม วังหมี วังน้ำเขียว เดิน-วิ่งสัมผัสธรรมชาติ เรียนรู้ และอนุรักษ์",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={`${prompt.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col antialiased bg-canvas-cream text-ink-dark selection:bg-olive-highlight selection:text-ink-dark">
        {children}
      </body>
    </html>
  );
}
