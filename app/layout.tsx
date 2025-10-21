import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import Script from "next/script";

<Script src="https://checkout.razorpay.com/v1/checkout.js" />


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cricketing Veins - Premier Cricket Services',
  description: 'Professional cricket services including ground booking, umpiring, scoring, and live streaming',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
