'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Play,
  Users,
  Trophy,
  Camera,
  Star,
  ArrowRight,
  Zap,
  Award,
  Target,
  Clock,
  GraduationCap,
  X,
} from 'lucide-react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Ground Booking',
      description:
        'Premium cricket grounds available for matches and practice sessions.',
      color: 'from-emerald-400 via-green-500 to-emerald-600',
      details:
        'Choose from a range of professional cricket grounds with turf, nets, and high-quality facilities. Ideal for tournaments, practice, or corporate matches.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Professional Umpiring',
      description: 'Certified umpires for all levels of cricket matches.',
      color: 'from-blue-400 via-blue-500 to-blue-600',
      details:
        'We provide ICC-certified and experienced umpires ensuring fair play, accuracy, and discipline in every match.',
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Expert Scoring',
      description: 'Accurate and professional scoring services for your matches.',
      color: 'from-purple-400 via-purple-500 to-purple-600',
      details:
        'Our scorers use digital systems to track live data, providing instant statistics and match summaries.',
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: 'Live Streaming',
      description: 'High-quality live streaming to broadcast your cricket matches.',
      color: 'from-orange-400 via-red-500 to-red-600',
      details:
        'Stream your matches live in HD with professional commentary, overlays, and real-time scoreboards.',
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Cricket Academy',
      description: 'Train with certified coaches and unlock your cricket potential.',
      color: 'from-yellow-400 via-orange-400 to-yellow-500',
      details:
        'Join our Cricket Academy for world-class coaching, fitness sessions, and regular match exposure. Open for all age groups and skill levels.',
    },
  ];

  const stats = [
    {
      number: '500+',
      label: 'Matches Organized',
      icon: <Trophy className="w-6 h-6" />,
    },
    {
      number: '50+',
      label: 'Grounds Available',
      icon: <Target className="w-6 h-6" />,
    },
    {
      number: '100+',
      label: 'Professional Umpires',
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: '24/7',
      label: 'Support Available',
      icon: <Clock className="w-6 h-6" />,
    },
  ];

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: "url('/img.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10"></div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'
            }`}
          >
            <img
              src="/LOGO Cricketing Veins.png"
              alt="Cricketing Veins Logo"
              className="w-28 h-28 mx-auto rounded-full shadow-xl border-4 border-green-400 mb-6 bg-white/80"
            />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
              Welcome to <span className="text-green-400">Cricketing Veins</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Experience the thrill of cricket like never before — streaming, umpiring,
              grounds, academy, and more!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="bg-green-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-2xl hover:scale-105"
              >
                <span>Book Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg hover:scale-105"
              >
                <span>Learn More</span>
                <Play className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 via-green-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-fadeInUp">
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-gradient-to-br from-green-400 to-green-600 rounded-full animate-pulse-custom">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold gradient-text-cricket mb-2">
                {stat.number}
              </div>
              <div className="text-green-100 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Award className="w-12 h-12 text-green-600 mx-auto animate-float" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text-cricket">Our Cricket</span>{' '}
              <span className="gradient-text-orange">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              Professional cricket services designed to elevate your game and experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => setSelectedService(service)}
                className={`relative cursor-pointer p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-white/90 backdrop-blur-sm`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 hover:opacity-10 transition-opacity duration-300`}
                ></div>
                <div className="relative z-10 text-center">
                  <div
                    className={`text-white mb-4 p-3 rounded-full bg-gradient-to-br ${service.color} w-fit mx-auto`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for Service Details */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fadeInUp">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
              onClick={() => setSelectedService(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <div
              className={`p-3 rounded-full bg-gradient-to-br ${selectedService.color} w-fit mb-4`}
            >
              {selectedService.icon}
            </div>
            <h2 className="text-2xl font-bold mb-2">{selectedService.title}</h2>
            <p className="text-gray-600 mb-4">{selectedService.details}</p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-all duration-300"
            >
              <span>Contact Us</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      )}

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-center text-white">
        <Star className="w-16 h-16 text-yellow-300 mx-auto mb-6 animate-float" />
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Experience Cricket Like Never Before?
        </h2>
        <p className="text-xl text-green-100 mb-8 font-medium">
          Join thousands of cricket enthusiasts who trust Cricketing Veins for their
          cricket needs.
        </p>
        <Link
          href="/contact"
          className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2"
        >
          <span>Get Started Today</span>
          <Play className="w-5 h-5" />
        </Link>
      </section>
    </main>
  );
}
