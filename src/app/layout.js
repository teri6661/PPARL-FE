import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// Import Komponen Layout
// import Bootstrap from "@/app/layout/bootstrap";
import "react-datepicker/dist/react-datepicker.css";

// Custom Styles
import "../../public/assets/css/style.css";
import Bootstrap from "./layout/bootstrap";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PPARL Management System",
  description:
    "PPARL management system is a comprehensive platform for managing experts, projects, and client relationships.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-scroll-behavior="smooth"
      data-bs-theme="light"
      data-color-theme="Blue_Theme"
      data-layout="vertical"
      data-boxed-layout="boxed"
      data-card="shadow"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} link-sidebar`}
        data-sidebartype="full"
      >
        <Bootstrap />
        {children}
      </body>
    </html>
  );
}
