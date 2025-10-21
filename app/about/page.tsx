'use client';

import {
  Trophy,
  Users,
  Camera,
  Target,
  Award,
  Clock,
  Zap,
  Star,
  Heart,
  Shield,
  GraduationCap,
} from 'lucide-react';

export default function About() {
  const services = [
    {
      icon: <Camera className="w-12 h-12" />,
      title: "Live Streaming",
      description:
        "Professional HD live streaming services with multiple camera angles, expert commentary, and real-time statistics for cricket matches of all levels.",
      color: "from-red-400 to-red-600",
      delay: "animate-stagger-1",
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: "Professional Scoring",
      description:
        "Accurate ball-by-ball scoring with detailed statistics, player performance tracking, and comprehensive match reports.",
      color: "from-purple-400 to-purple-600",
      delay: "animate-stagger-2",
    },
    {
      icon: <Trophy className="w-12 h-12" />,
      title: "Ground Facilities",
      description:
        "Premium cricket grounds with excellent pitch conditions, modern facilities, and all necessary equipment for competitive matches.",
      color: "from-green-400 to-green-600",
      delay: "animate-stagger-3",
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Certified Umpiring",
      description:
        "Experienced and certified umpires who ensure fair play and maintain the highest standards of cricket officiating.",
      color: "from-blue-400 to-blue-600",
      delay: "animate-stagger-4",
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Tournament Management",
      description:
        "Complete tournament organization including scheduling, logistics, and coordination for cricket competitions.",
      color: "from-yellow-400 to-yellow-600",
      delay: "animate-stagger-5",
    },
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: "Cricket Academy",
      description:
        "Train like professionals at our Cricket Academy — where passion meets technique. Personalized coaching, fitness programs, and modern net facilities for all ages and levels.",
      color: "from-orange-400 via-amber-500 to-red-500",
      delay: "animate-stagger-6",
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support to assist with bookings, queries, and any cricket-related requirements.",
      color: "from-indigo-400 to-indigo-600",
      delay: "animate-stagger-7",
    },
  ];

  const stats = [
    {
      number: "500+",
      label: "Matches Organized",
      icon: <Trophy className="w-8 h-8" />,
      color: "from-green-400 to-green-600",
    },
    {
      number: "50+",
      label: "Grounds Available",
      icon: <Target className="w-8 h-8" />,
      color: "from-blue-400 to-blue-600",
    },
    {
      number: "100+",
      label: "Professional Umpires",
      icon: <Users className="w-8 h-8" />,
      color: "from-purple-400 to-purple-600",
    },
    {
      number: "1000+",
      label: "Happy Customers",
      icon: <Heart className="w-8 h-8" />,
      color: "from-red-400 to-red-600",
    },
  ];

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-orange-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-green-500 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-orange-500 rounded-full animate-bounce-custom"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-purple-500 rounded-full animate-pulse-custom"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fadeInUp">
            <div className="mb-6 animate-rotateIn">
              <Zap className="w-16 h-16 text-yellow-500 mx-auto animate-pulse-custom" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text-cricket">About</span>{" "}
              <span className="text-gray-800">Cricketing Veins</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium animate-slideInLeft">
              We are passionate cricket enthusiasts dedicated to providing world-class cricket services
              that bring the spirit of the game to life through professional excellence and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-green-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeInLeft">
            <h2 className="text-4xl font-bold mb-6">
              <span className="gradient-text">Our Cricket</span>{" "}
              <span className="gradient-text-orange">Journey</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded by cricket lovers, Cricketing Veins started with a simple vision — to bring
              professional-grade cricket experiences to every enthusiast, whether beginner or pro.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              From local tournaments to live broadcasts, we’ve grown into a full-service cricket platform
              blending technology, passion, and performance.
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg animate-pulse-custom">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold gradient-text">Excellence in Every Service</h3>
                <p className="text-gray-600">Committed to delivering top-quality cricket experiences</p>
              </div>
            </div>
          </div>
          <div className="relative animate-fadeInRight">
            <div className="w-full h-96 bg-gradient-to-br from-green-100 via-emerald-100 to-orange-100 rounded-2xl flex items-center justify-center shadow-2xl">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-custom shadow-xl">
                  <span className="text-white font-bold text-4xl animate-rotateIn">CV</span>
                </div>
                <p className="gradient-text font-bold text-lg">Cricket Excellence Since Day One</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-green-50 relative overflow-hidden">
        <div className="text-center mb-16">
          <Star className="w-12 h-12 text-yellow-500 mx-auto animate-rotateIn" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">What We</span>{" "}
            <span className="gradient-text-purple">Offer</span>
          </h2>
          <p className="text-xl text-gray-600 font-medium">Comprehensive cricket services tailored to your needs</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white p-8 rounded-2xl shadow-xl border border-gray-100 group overflow-hidden animate-fadeInUp ${service.delay}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-all duration-500`}></div>
              <div className="relative z-10">
                <div className={`text-white mb-6 p-4 rounded-full bg-gradient-to-br ${service.color} w-fit animate-pulse-custom`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-12 h-12 text-yellow-300 mx-auto mb-6 animate-rotateIn" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Impact in Numbers</h2>
          <p className="text-xl text-green-100 font-medium mb-12">Trusted by cricket communities across the region</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group animate-fadeInUp">
                <div className={`p-4 bg-gradient-to-br ${stat.color} rounded-full w-fit mx-auto mb-4 animate-pulse-custom group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-white">{stat.number}</h3>
                <p className="text-green-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-orange-50 text-center relative overflow-hidden">
        <Heart className="w-16 h-16 text-red-500 mx-auto mb-6 animate-pulse-custom" />
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="gradient-text">Our</span>{" "}
          <span className="gradient-text-orange">Mission</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8 font-medium">
          To revolutionize cricket services by combining traditional cricket values with modern technology — ensuring
          every match, academy, and event is handled with professionalism, precision, and passion.
        </p>
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full inline-flex items-center space-x-2 font-semibold shadow-xl animate-glow hover:scale-105 transition-transform">
          <span>Cricket is in our veins</span>
          <Trophy className="w-5 h-5 animate-bounce-custom" />
        </div>
      </section>
    </main>
  );
}
