'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Users,
  Star,
  Camera,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Award,
  Zap,
  X,
} from 'lucide-react';

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: 'Cricket Academy',
      description:
        'Professional cricket training for all age groups, led by experienced coaches focusing on skills, fitness, and discipline.',
      features: [
        'Beginner to advanced training programs',
        'Certified coaches and ex-players',
        'Video analysis and skill assessment',
        'Fitness and diet guidance',
        'Weekly performance reports',
      ],
      benefits: [
        'Personalized coaching plans',
        'All-round cricket development',
        'Professional career mentorship',
        'Access to tournaments and trials',
      ],
      color: 'from-yellow-400 via-orange-500 to-yellow-600',
      pricing: '₹4000/month (includes kit & fitness)',
    },
    {
      icon: <Trophy className="w-12 h-12" />,
      title: 'Ground Booking',
      description:
        'Premium cricket grounds available for matches and practice sessions with state-of-the-art facilities.',
      features: [
        'Multiple ground sizes (standard, mini, practice)',
        'Well-maintained turf and equipment',
        'Changing rooms and parking facilities',
        'Flexible booking slots (morning to evening)',
        'Online booking system with instant confirmation',
      ],
      benefits: [
        'Professional playing conditions',
        'Convenient location access',
        'Affordable pricing packages',
        '24/7 ground availability',
      ],
      color: 'from-emerald-400 via-green-500 to-emerald-600',
      pricing: 'Starting from ₹500/hour',
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Professional Umpiring',
      description:
        'Certified and experienced umpires for all levels of cricket matches ensuring fair play and accurate decisions.',
      features: [
        'Level 1 & Level 2 certified umpires',
        'Experience with international standards',
        'Real-time score updates',
        'Post-match reports and statistics',
        'Emergency umpire replacement service',
      ],
      benefits: [
        'Fair and unbiased officiating',
        'Professional match management',
        'Detailed match analytics',
        'Insurance coverage included',
      ],
      color: 'from-blue-400 via-blue-500 to-blue-600',
      pricing: '₹2000/match + ₹500/additional umpire',
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: 'Expert Scoring',
      description:
        'Accurate and professional scoring services with real-time updates and comprehensive match statistics.',
      features: [
        'Live scoring on multiple platforms',
        'Detailed ball-by-ball commentary',
        'Player performance analytics',
        'Custom scoring formats support',
        'Data export in multiple formats',
      ],
      benefits: [
        'Real-time match updates',
        'Professional presentation',
        'Comprehensive statistics',
        'Social media integration',
      ],
      color: 'from-purple-400 via-purple-500 to-purple-600',
      pricing: '₹1500/match',
    },
    {
      icon: <Camera className="w-12 h-12" />,
      title: 'Live Streaming',
      description:
        'High-quality live streaming services to broadcast your cricket matches to global audiences.',
      features: [
        '4K HD streaming quality',
        'Multiple camera angles',
        'Real-time chat and interaction',
        'On-demand replay availability',
        'Custom branding and overlays',
      ],
      benefits: [
        'Global reach and audience',
        'Professional production quality',
        'Interactive viewer experience',
        'Match highlights generation',
      ],
      color: 'from-orange-400 via-red-500 to-red-600',
      pricing: '₹3000/match + streaming costs',
    },
  ];

  return (
    <main className="pt-16 min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <Award className="w-16 h-16 text-yellow-300 mx-auto mb-6 animate-float" />
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our Cricket Services
          </h1>
          <p className="text-xl text-green-100 mb-8 font-medium">
            Comprehensive cricket services designed to elevate your game and provide an unforgettable experience
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                onClick={() => setSelectedService(index)}
                className={`relative p-8 rounded-3xl shadow-2xl cursor-pointer border border-gray-100 hover:shadow-3xl transition-transform hover:-translate-y-2 group overflow-hidden ${
                  isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>
                <div className="relative z-10 text-center">
                  <div
                    className={`text-white inline-flex p-5 rounded-2xl bg-gradient-to-br ${service.color} mb-5`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-green-600 font-semibold mb-3">{service.pricing}</p>
                  <p className="text-gray-600 line-clamp-3">{service.description}</p>
                  <div className="mt-5">
                    <span className="inline-flex items-center text-green-700 font-semibold group-hover:underline">
                      View Details <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for Details */}
      {selectedService !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-8 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-6">
              <div
                className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${services[selectedService].color} text-white mb-4`}
              >
                {services[selectedService].icon}
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {services[selectedService].title}
              </h2>
              <p className="text-green-600 font-semibold mb-3">
                {services[selectedService].pricing}
              </p>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {services[selectedService].description}
              </p>
            </div>

            <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" /> Key Features
            </h4>
            <ul className="mb-6 list-disc pl-6 text-gray-700 space-y-1">
              {services[selectedService].features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
              <Zap className="w-5 h-5 text-orange-500 mr-2" /> Benefits
            </h4>
            <ul className="mb-8 list-disc pl-6 text-gray-700 space-y-1">
              {services[selectedService].benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>

            <Link
              href="/booking"
              className={`inline-flex items-center space-x-2 bg-gradient-to-r ${services[selectedService].color} text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105`}
            >
              <span>Book This Service</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 via-green-900 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <Shield className="w-16 h-16 text-green-400 mx-auto mb-6 animate-float" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose Cricketing Veins?
          </h2>
          <p className="text-xl text-green-100 mb-12 font-medium">
            Experience the difference with our professional cricket services
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Reliable Service</h3>
              <p className="text-green-100">Consistent quality and punctual delivery across all services</p>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-green-100">Certified professionals with years of cricket experience</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Modern Technology</h3>
              <p className="text-green-100">Latest equipment and digital tools for superior results</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
