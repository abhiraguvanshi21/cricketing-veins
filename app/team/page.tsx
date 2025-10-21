'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Trophy,
    Users,
    Star,
    Camera,
    Mail,
    Phone,
    MapPin,
    Award,
    ArrowRight,
    UserCheck,
    Target,
    GraduationCap,
} from 'lucide-react';

export default function Team() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const departments = [

        {
            icon: <GraduationCap className="w-12 h-12" />,
            title: 'Cricket Academy Department',
            description:
                'Our academy focuses on training young cricketers with professional coaching, fitness programs, and player development pathways for the future of cricket.',
            color: 'from-yellow-400 via-orange-500 to-red-500',
            team: [
                {
                    name: 'Ravi Deshmukh',
                    role: 'Head Coach',
                    experience: '15 years',
                    specialization: 'Professional cricket coaching & player development',
                    contact: {
                        email: 'ravi.academy@cricketingveins.com',
                        phone: '+91-9876543222',
                    },
                },
                {
                    name: 'Simran Kaur',
                    role: 'Fitness Trainer',
                    experience: '10 years',
                    specialization: 'Athletic training & injury prevention',
                    contact: {
                        email: 'simran.fitness@cricketingveins.com',
                        phone: '+91-9876543223',
                    },
                },
                {
                    name: 'Mohammed Ali',
                    role: 'Talent Scout',
                    experience: '8 years',
                    specialization: 'Player scouting & youth recruitment',
                    contact: {
                        email: 'ali.scout@cricketingveins.com',
                        phone: '+91-9876543224',
                    },
                },
            ],
        },
        {
            icon: <Trophy className="w-12 h-12" />,
            title: 'Ground Management Department',
            description: 'Responsible for maintaining premium cricket grounds and ensuring top-quality playing conditions.',
            color: 'from-emerald-400 via-green-500 to-emerald-600',
            team: [
                {
                    name: 'Rajesh Kumar',
                    role: 'Ground Manager',
                    experience: '8 years',
                    specialization: 'Turf maintenance & facility management',
                    contact: { email: 'rajesh.ground@cricketingveins.com', phone: '+91-9876543210' },
                },
                {
                    name: 'Priya Sharma',
                    role: 'Operations Coordinator',
                    experience: '5 years',
                    specialization: 'Booking coordination & customer service',
                    contact: { email: 'priya.ops@cricketingveins.com', phone: '+91-9876543211' },
                },
                {
                    name: 'Amit Patel',
                    role: 'Maintenance Supervisor',
                    experience: '6 years',
                    specialization: 'Equipment maintenance & repairs',
                    contact: { email: 'amit.maintenance@cricketingveins.com', phone: '+91-9876543212' },
                },
            ],
        },
        {
            icon: <Users className="w-12 h-12" />,
            title: 'Umpiring Department',
            description: 'Certified umpires ensuring fair play and professional officiating for all cricket matches.',
            color: 'from-blue-400 via-blue-500 to-blue-600',
            team: [
                {
                    name: 'Vikram Singh',
                    role: 'Chief Umpire',
                    experience: '12 years',
                    specialization: 'International level officiating',
                    contact: { email: 'vikram.umpire@cricketingveins.com', phone: '+91-9876543213' },
                },
                {
                    name: 'Sneha Reddy',
                    role: 'Senior Umpire',
                    experience: '9 years',
                    specialization: 'Domestic & local matches',
                    contact: { email: 'sneha.umpire@cricketingveins.com', phone: '+91-9876543214' },
                },
                {
                    name: 'Karan Mehta',
                    role: 'Umpire Coordinator',
                    experience: '7 years',
                    specialization: 'Match scheduling & umpire assignment',
                    contact: { email: 'karan.coord@cricketingveins.com', phone: '+91-9876543215' },
                },
            ],
        },
        {
            icon: <Star className="w-12 h-12" />,
            title: 'Scoring Department',
            description: 'Expert scorers providing accurate match statistics and real-time scoring services.',
            color: 'from-purple-400 via-purple-500 to-purple-600',
            team: [
                {
                    name: 'Anjali Gupta',
                    role: 'Head Scorer',
                    experience: '10 years',
                    specialization: 'Professional scoring & analytics',
                    contact: { email: 'anjali.scorer@cricketingveins.com', phone: '+91-9876543216' },
                },
                {
                    name: 'Rohit Verma',
                    role: 'Digital Scoring Specialist',
                    experience: '6 years',
                    specialization: 'Live scoring software & data management',
                    contact: { email: 'rohit.digital@cricketingveins.com', phone: '+91-9876543217' },
                },
                {
                    name: 'Meera Joshi',
                    role: 'Statistics Analyst',
                    experience: '4 years',
                    specialization: 'Match statistics & performance analysis',
                    contact: { email: 'meera.stats@cricketingveins.com', phone: '+91-9876543218' },
                },
            ],
        },
        {
            icon: <Camera className="w-12 h-12" />,
            title: 'Live Streaming Department',
            description: 'Professional broadcasting team delivering high-quality live cricket streaming worldwide.',
            color: 'from-orange-400 via-red-500 to-red-600',
            team: [
                {
                    name: 'Arjun Nair',
                    role: 'Broadcast Director',
                    experience: '11 years',
                    specialization: 'Live production & technical direction',
                    contact: { email: 'arjun.broadcast@cricketingveins.com', phone: '+91-9876543219' },
                },
                {
                    name: 'Pooja Desai',
                    role: 'Camera Operator',
                    experience: '8 years',
                    specialization: 'Multi-camera operations & cinematography',
                    contact: { email: 'pooja.camera@cricketingveins.com', phone: '+91-9876543220' },
                },
                {
                    name: 'Suresh Kumar',
                    role: 'Technical Support',
                    experience: '7 years',
                    specialization: 'Streaming technology & equipment maintenance',
                    contact: { email: 'suresh.tech@cricketingveins.com', phone: '+91-9876543221' },
                },
            ],
        },
    ];

    return (
        <main className="pt-16 min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
                    <UserCheck className="w-16 h-16 text-yellow-300 mx-auto mb-6 animate-float" />
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Our Expert Team
                    </h1>
                    <p className="text-xl text-green-100 mb-8 font-medium">
                        Meet the dedicated professionals behind our cricket services departments
                    </p>
                </div>
            </section>

            {/* Departments Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {departments.map((dept, deptIndex) => (
                        <div
                            key={deptIndex}
                            className={`mb-16 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}
                            style={{ animationDelay: `${deptIndex * 300}ms` }}
                        >
                            {/* Department Header */}
                            <div className="text-center mb-12">
                                <div className="flex items-center justify-center space-x-4 mb-4">
                                    <div
                                        className={`text-white p-4 rounded-2xl bg-gradient-to-br ${dept.color} animate-pulse-custom`}
                                    >
                                        {dept.icon}
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                                        {dept.title}
                                    </h2>
                                </div>
                                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                    {dept.description}
                                </p>
                            </div>

                            {/* Team Members Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {dept.team.map((member, memberIndex) => (
                                    <div
                                        key={memberIndex}
                                        className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                                    >
                                        <div className="text-center mb-4">
                                            <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                                                <Users className="w-10 h-10 text-gray-600" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800 mb-1">
                                                {member.name}
                                            </h3>
                                            <p className={`text-lg font-semibold bg-gradient-to-r ${dept.color} bg-clip-text text-transparent mb-2`}>
                                                {member.role}
                                            </p>
                                            <p className="text-gray-600 text-sm mb-2">
                                                Experience: {member.experience}
                                            </p>
                                            <p className="text-gray-500 text-sm">
                                                {member.specialization}
                                            </p>
                                        </div>

                                        {/* Contact Info */}
                                        <div className="border-t border-gray-100 pt-4 mt-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                    <Mail className="w-4 h-4" />
                                                    <span className="truncate">{member.contact.email}</span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                    <Phone className="w-4 h-4" />
                                                    <span>{member.contact.phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-r from-gray-900 via-green-900 to-gray-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <Target className="w-12 h-12 text-green-400 mx-auto animate-float" />
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Team Excellence
                        </h2>
                        <p className="text-xl text-green-100 font-medium">
                            Our commitment to quality and professionalism
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center animate-fadeInUp">
                            <div className="text-3xl md:text-4xl font-bold gradient-text-cricket mb-2">
                                50+
                            </div>
                            <div className="text-green-100 font-medium">Team Members</div>
                        </div>
                        <div className="text-center animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                            <div className="text-3xl md:text-4xl font-bold gradient-text-cricket mb-2">
                                100+
                            </div>
                            <div className="text-green-100 font-medium">Years Combined Experience</div>
                        </div>
                        <div className="text-center animate-fadeInUp" style={{ animationDelay: '400ms' }}>
                            <div className="text-3xl md:text-4xl font-bold gradient-text-cricket mb-2">
                                5
                            </div>
                            <div className="text-green-100 font-medium">Specialized Departments</div>
                        </div>
                        <div className="text-center animate-fadeInUp" style={{ animationDelay: '600ms' }}>
                            <div className="text-3xl md:text-4xl font-bold gradient-text-cricket mb-2">
                                24/7
                            </div>
                            <div className="text-green-100 font-medium">Support Available</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
                    <Award className="w-16 h-16 text-yellow-300 mx-auto mb-6 animate-float" />
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Join Our Team
                    </h2>
                    <p className="text-xl text-green-100 mb-8 font-medium">
                        Passionate about cricket? We're always looking for talented professionals to join our team
                    </p>
                    <Link
                        href="/contact"
                        className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center space-x-2"
                    >
                        <span>Contact Us</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
