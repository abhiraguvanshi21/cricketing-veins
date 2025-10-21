'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { ArrowLeft, CheckCircle } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

function PaymentInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  const [booking, setBooking] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [paymentStarted, setPaymentStarted] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  // Load booking details
  useEffect(() => {
    const allBookings = JSON.parse(localStorage.getItem('cricketBookings') || '[]');
    const foundBooking = allBookings.find((b: any) => b.id === bookingId);

    if (foundBooking) {
      setBooking(foundBooking);
      setAmount(foundBooking.totalAmount.toString());
    } else {
      alert('Booking not found!');
      router.push('/booking');
    }
  }, [bookingId, router]);

  /** Create Razorpay order and open checkout */
  const handlePayNow = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      const res = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(amount),
          currency: 'INR',
          receipt: bookingId,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to create Razorpay order');
      }

      const { order } = data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Cricketing Veins",
        description: booking.serviceName,
        order_id: order.id,
        prefill: {
          name: booking.userName,
          email: booking.userEmail || "test@example.com",
          contact: booking.userPhone || "9999999999",
        },
        method: { upi: true, card: true, netbanking: true, wallet: true },
        theme: { color: "#22c55e" },
        handler: async function (response: any) {
          const verifyRes = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            const allBookings = JSON.parse(localStorage.getItem('cricketBookings') || '[]');
            const updatedBookings = allBookings.map((b: any) =>
              b.id === bookingId ? { ...b, status: 'paid', paidAmount: parseFloat(amount) } : b
            );
            localStorage.setItem('cricketBookings', JSON.stringify(updatedBookings));

            setPaymentConfirmed(true);

            setTimeout(() => {
              router.push('/booking-confirmation');
            }, 3000);
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setPaymentStarted(true);
    } catch (error: any) {
      alert(error.message || 'Something went wrong while starting payment');
    }
  };

  /** Direct UPI deep link */
  const handleOpenUpiApp = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const upiID = "9161036941@ptyes"; // Replace with your actual UPI ID
    const upiLink = `upi://pay?pa=${upiID}&pn=Cricketing%20Veins&am=${amount}&cu=INR&tn=${encodeURIComponent(
      booking.serviceName
    )}`;

    console.log("Opening UPI link:", upiLink);
    window.location.href = upiLink;
  };

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading booking details...</p>
      </div>
    );
  }

  if (paymentConfirmed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-6">
        <CheckCircle className="w-20 h-20 text-green-600 mb-4" />
        <h2 className="text-3xl font-bold text-green-700 mb-2">Payment Confirmed!</h2>
        <p className="text-gray-700 mb-4">
          Thank you for your payment. Your booking is now confirmed.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-16">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <div className="max-w-3xl mx-auto p-6">
        <button
          onClick={() => router.push('/booking')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Booking
        </button>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Complete Payment</h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Booking Summary</h2>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">Name:</span> {booking.userName}</p>
              <p><span className="font-medium">Service:</span> {booking.serviceName}</p>
              <p><span className="font-medium">Date:</span> {booking.date}</p>
              <p><span className="font-medium">Time Slot:</span> {booking.timeSlot}</p>
              <p><span className="font-medium">Total Amount:</span> ₹{booking.totalAmount}</p>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Payment Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:ring-2 focus:ring-green-500"
              placeholder="Enter amount"
            />
          </div>

          <div className="space-y-6">
            <button
              onClick={handlePayNow}
              className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-all"
            >
              Pay with Razorpay
            </button>

            <div className="flex items-center">
              <div className="flex-grow h-px bg-gray-200"></div>
              <span className="px-4 text-gray-500 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-200"></div>
            </div>

            <button
              onClick={handleOpenUpiApp}
              className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all"
            >
              Open UPI App
            </button>
          </div>

          <p className="mt-4 text-center text-gray-500 text-sm">
            If you pay using a direct UPI app, please return here and click Razorpay's "I Have Paid" to confirm your booking.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading payment...</div>}>
      <PaymentInner />
    </Suspense>
  );
}
