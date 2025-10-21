'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Trophy,
  Users,
  Target,
  Camera,
  Clock,
  MapPin,
  Star,
  Check,
  Calendar,
  Phone,
  Mail,
  User as LucideUser,
  CreditCard,
  ArrowRight,
} from 'lucide-react';
import {
  BookingService,
  Ground,
  Umpire,
  Scorer,
  StreamingPackage,
} from '@/lib/bookingData';
import { AuthService, User } from '@/lib/auth';

export default function Booking() {
  const router = useRouter();

  const [selectedService, setSelectedService] = useState('ground');
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  const [grounds, setGrounds] = useState<Ground[]>([]);
  const [umpires, setUmpires] = useState<Umpire[]>([]);
  const [scorers, setScorers] = useState<Scorer[]>([]);
  const [streamingPackages, setStreamingPackages] = useState<StreamingPackage[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '',
    specialRequirements: '',
    numCameras: 1,
    numDays: 1,
  });

  const bookingService = BookingService.getInstance();
  const authService = AuthService.getInstance();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: currentUser.name,
        email: currentUser.email,
      }));
    }

    // Load data
    setGrounds(bookingService.getAllGrounds());
    setUmpires(bookingService.getAllUmpires());
    setScorers(bookingService.getAllScorers());
    setStreamingPackages(bookingService.getAllStreamingPackages());
  }, []);

  const services = [
    {
      id: 'ground',
      icon: <Trophy className="w-8 h-8" />,
      title: 'Ground Booking',
      description: 'Premium cricket grounds with excellent facilities',
      color: 'from-green-500 to-emerald-600',
      images: '/img.jpg',
    },
    {
      id: 'umpire',
      icon: <Users className="w-8 h-8" />,
      title: 'Professional Umpire',
      description: 'Certified umpires for fair and professional matches',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      id: 'scorer',
      icon: <Target className="w-8 h-8" />,
      title: 'Expert Scorer',
      description: 'Accurate ball-by-ball scoring and statistics',
      color: 'from-purple-500 to-violet-600',
    },
    {
      id: 'streaming',
      icon: <Camera className="w-8 h-8" />,
      title: 'Live Streaming',
      description: 'Professional HD live streaming services',
      color: 'from-orange-500 to-red-600',
    },
  ];

  const timeSlots = [
    '6:00 AM - 10:00 AM',
    '10:00 AM - 2:00 PM',
    '2:00 PM - 6:00 PM',
    '6:00 PM - 10:00 PM',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const value =
      e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  /** =========================================
   *  HANDLE BOOKING AND REDIRECT TO PAYMENT
   * ========================================= */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('Please login to make a booking');
      return;
    }

    if (!selectedItem) {
      alert('Please select an item to book');
      return;
    }

    let serviceName = '';
    let totalAmount = 0;

    // Get selected service data
    switch (selectedService) {
      case 'ground':
        const ground = grounds.find((g) => g.id === selectedItem);
        serviceName = ground?.name || '';
        totalAmount = ground?.pricePerDay || 0;
        break;
      case 'umpire':
        const umpire = umpires.find((u) => u.id === selectedItem);
        serviceName = umpire?.name || '';
        totalAmount = umpire?.pricePerMatch || 0;
        break;
      case 'scorer':
        const scorer = scorers.find((s) => s.id === selectedItem);
        serviceName = scorer?.name || '';
        totalAmount = scorer?.pricePerMatch || 0;
        break;
      case 'streaming':
        const streamingPackage = streamingPackages.find((p) => p.id === selectedItem);
        serviceName = streamingPackage?.name || '';
        totalAmount =
          (streamingPackage?.pricePerMatch || 0) *
          formData.numCameras *
          formData.numDays;
        break;
    }

    const bookingId = Date.now().toString();
    const newBooking = {
      id: bookingId,
      userId: user.id,
      userName: formData.name,
      userEmail: formData.email,
      userPhone: formData.phone,
      serviceType: selectedService,
      serviceName,
      date: formData.date,
      slot: formData.timeSlot,
      status: 'pending',
      specialRequirements: formData.specialRequirements,
      totalAmount,
      numberOfCams: formData.numCameras,
      numberOfDays: formData.numDays,
    };

    // ✅ Save booking in localStorage
    const existingBookings = JSON.parse(localStorage.getItem('cricketBookings') || '[]');
    localStorage.setItem('cricketBookings', JSON.stringify([...existingBookings, newBooking]));

    // ✅ Redirect to payment page with bookingId
    router.push(`/payment?bookingId=${bookingId}`);
  };

  /** =========================================
   *  RENDER ITEMS BASED ON SERVICE
   * ========================================= */
  const renderServiceItems = () => {
    let items: any[] = [];

    switch (selectedService) {
      case 'ground':
        items = grounds;
        break;
      case 'umpire':
        items = umpires;
        break;
      case 'scorer':
        items = scorers;
        break;
      case 'streaming':
        items = streamingPackages;
        break;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item.id)}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              selectedItem === item.id
                ? 'border-green-500 bg-green-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
            }`}
          >
            <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              {item.available !== false && (
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Available
                </span>
              )}
            </div>

            <p className="text-gray-600 text-sm mb-4">
              {item.description || item.location || `${item.experience} experience`}
            </p>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">
                  ₹{item.pricePerDay || item.pricePerMatch}
                </span>
                <span className="text-xs text-gray-500">
                  {selectedService === 'ground' ? 'per day' : 'per match'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  /** =========================================
   *  MAIN RETURN
   * ========================================= */
  return (
    <main className="pt-16 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <section className="py-20 bg-gradient-to-br from-green-50 to-orange-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Book Your</span>
              <span className="text-gray-800"> Cricket Experience</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our comprehensive range of cricket services and book your perfect cricket experience today.
            </p>
          </div>
        </div>
      </section>

      {/* Service Selection */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Select Your Service
          </h2>

          <div className="grid grid-cols-16 md:grid-cols-5 lg:grid-cols-4 gap-10 mb-10">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => {
                  setSelectedService(service.id);
                  setSelectedItem('');
                }}
                className={`p-10 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedService === service.id
                    ? 'border-green-300 bg-white shadow-xl'
                    : 'border-gray-300 bg-white hover:border-green-300 hover:shadow-lg'
                }`}
              >
                {service.icon}
                <h3 className="text-lg font-semibold text-gray-800 mt-9 mb-1">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Service Items */}
          {renderServiceItems()}

          {/* Booking Form */}
          {selectedItem && (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Booking</h3>

              {!user && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-yellow-800">
                    Please <a href="/auth/login" className="underline">login</a> to make a booking.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-2 py-4 border border-gray-300 text-gray-700 rounded-lg mt-3"
                  />
                </div>

                {/* Time Slot Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
                  {(() => {
                    let bookedSlots: string[] = [];
                    if (selectedItem && formData.date) {
                      const existingBookings = JSON.parse(localStorage.getItem('cricketBookings') || '[]');
                      bookedSlots = existingBookings
                        .filter(
                          (b: any) =>
                            b.serviceType === selectedService &&
                            b.serviceName ===
                              (grounds.find((g) => g.id === selectedItem)?.name ||
                                umpires.find((u) => u.id === selectedItem)?.name ||
                                scorers.find((s) => s.id === selectedItem)?.name ||
                                streamingPackages.find((p) => p.id === selectedItem)?.name) &&
                            b.date === formData.date
                        )
                        .map((b: any) => b.slot);
                    }

                    return (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {timeSlots.map((slot, index) => {
                          const isBooked = bookedSlots.includes(slot);
                          const isSelected = formData.timeSlot === slot;

                          return (
                            <button
                              key={index}
                              type="button"
                              disabled={isBooked}
                              onClick={() => setFormData({ ...formData, timeSlot: slot })}
                              className={`px-4 py-3 rounded-lg border text-center text-sm font-medium transition-all duration-300 ${
                                isBooked
                                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                  : isSelected
                                  ? 'bg-green-600 text-white border-green-700'
                                  : 'bg-white text-gray-700 hover:bg-green-50 border-gray-300 hover:border-green-400'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Live Streaming Specific Fields */}
              {selectedService === 'streaming' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Number of Cameras</label>
                    <input
                      type="number"
                      name="numCameras"
                      min={0}
                      value={formData.numCameras}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Number of Days</label>
                    <input
                      type="number"
                      name="numDays"
                      min={0}
                      value={formData.numDays}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg"
                    />
                  </div>
                </div>
              )}

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Special Requirements</label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg"
                />
              </div>

              {/* Dynamic Total Price for Live Streaming */}
              {selectedService === 'streaming' && selectedItem && (
                <p className="mt-4 text-lg font-bold text-green-600">
                  Total Price: ₹
                  {(streamingPackages.find((p) => p.id === selectedItem)?.pricePerMatch || 0) *
                    formData.numCameras *
                    formData.numDays}
                </p>
              )}

              <button
                type="submit"
                disabled={!user}
                className="mt-8 w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-all"
              >
                <span>Confirm Booking & Pay</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
