'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  FileText,
  MapPin,
  UserCheck,
  Trophy,
  Video,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Star,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Mail
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  joinDate: string;
}

interface Blog {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
}

interface Ground {
  pricePerDay: ReactNode;
  available: any;
  id: string;
  name: string;
  location: string;
  description: string;
  facilities: string[];
  pricing: string;
  rating: number;
  image: string;
}

interface Umpire {
  pricePerMatch: ReactNode;
  matchesOfficiated: ReactNode;
  id: string;
  name: string;
  experience: string;
  specialization: string;
  rating: number;
  pricing: string;
  image: string;
}

interface Scorer {
  id: string;
  name: string;
  experience: string;
  expertise?: string;
  specialties?: string[];
  rating: number;
  pricing?: string;
  pricePerMatch: number;
  image: string;
  matchesScored: number;
}

interface StreamingPackage {
  image: any;
  available: any;
  id: string;
  name: string;
  description: string;
  features: string[];
  pricing: string;
  duration: string;
  pricePerMatch?: number; // Added to fix error
}

interface Booking {
  id: string;
  email: string;
  phone: string;
  userName: string;      // Service booked by
  serviceName: string;   // Which service
  date: string;
  slot: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  numberOfCams?: number; // For live streaming
  numberOfDays?: number; // For live streaming
  equipment?: string[];  // For live streaming
}

interface AcademyPlayer {
  id: string;
  name: string;
  email: string;
  phone: string;
  admissionDate: string;
  course: string; // e.g., Beginner, Intermediate, Advanced
  age: number;
  experience: string;
  notes?: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState<User[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [grounds, setGrounds] = useState<Ground[]>([]);
  const [umpires, setUmpires] = useState<Umpire[]>([]);
  const [scorers, setScorers] = useState<Scorer[]>([]);
  const [streamingPackages, setStreamingPackages] = useState<StreamingPackage[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [academyPlayers, setAcademyPlayers] = useState<AcademyPlayer[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  // Image handling
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (imageUrl: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        callback(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const storedMessages = localStorage.getItem('contactMessages');
    if (storedMessages) setMessages(JSON.parse(storedMessages));
  }, []);


  useEffect(() => {
    // Check if user is admin
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      router.push('/auth/login');
      return;
    }

    const user = JSON.parse(currentUser);
    if (user.role !== 'admin') {
      router.push('/');
      return;
    }

    // Load data from localStorage
    loadData();
  }, [router]);

  const loadData = () => {
    const storedUsers = localStorage.getItem('users');
    const storedBlogs = localStorage.getItem('blogs');
    const storedGrounds = localStorage.getItem('grounds');
    const storedUmpires = localStorage.getItem('umpires');
    const storedScorers = localStorage.getItem('scorers');
    const storedStreamingPackages = localStorage.getItem('streamingPackages');
    const storedBookings = localStorage.getItem('cricketBookings');
    const storedAcademyPlayers = localStorage.getItem('academyPlayers');
    const storedMessages = localStorage.getItem('contactMessages');

    if (storedUsers) setUsers(JSON.parse(storedUsers));
    if (storedBlogs) setBlogs(JSON.parse(storedBlogs));
    if (storedGrounds) setGrounds(JSON.parse(storedGrounds));
    if (storedUmpires) setUmpires(JSON.parse(storedUmpires));
    if (storedScorers) setScorers(JSON.parse(storedScorers));
    if (storedStreamingPackages) setStreamingPackages(JSON.parse(storedStreamingPackages));
    if (storedBookings) setBookings(JSON.parse(storedBookings));
    if (storedAcademyPlayers) setAcademyPlayers(JSON.parse(storedAcademyPlayers));
    if (storedMessages) setMessages(JSON.parse(storedMessages));
  };

  const saveData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
    loadData(); // Refresh data after saving
  };

  const handleAddNew = (type: string) => {
    setModalType(type);
    setEditingItem(null);
    setFormData({});
    setShowModal(true);
  };

  const handleEdit = (type: string, item: any) => {
    setModalType(type);
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = (type: string, id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      switch (type) {
        case 'user':
          const updatedUsers = users.filter(user => user.id !== id);
          setUsers(updatedUsers);
          saveData('users', updatedUsers);
          break;
        case 'blog':
          const updatedBlogs = blogs.filter(blog => blog.id !== id);
          setBlogs(updatedBlogs);
          saveData('blogs', updatedBlogs);
          break;
        case 'ground':
          const updatedGrounds = grounds.filter(ground => ground.id !== id);
          setGrounds(updatedGrounds);
          saveData('grounds', updatedGrounds);
          break;
        case 'umpire':
          const updatedUmpires = umpires.filter(umpire => umpire.id !== id);
          setUmpires(updatedUmpires);
          saveData('umpires', updatedUmpires);
          break;
        case 'scorer':
          const updatedScorers = scorers.filter(scorer => scorer.id !== id);
          setScorers(updatedScorers);
          saveData('scorers', updatedScorers);
          break;
        case 'streaming':
          const updatedPackages = streamingPackages.filter(pkg => pkg.id !== id);
          setStreamingPackages(updatedPackages);
          saveData('streamingPackages', updatedPackages);
          break;
        case 'academy':
          const updatedAcademyPlayers = academyPlayers.filter(player => player.id !== id);
          setAcademyPlayers(updatedAcademyPlayers);
          saveData('academyPlayers', updatedAcademyPlayers);
          break;
      }
    }
  };

  const handleBookingStatusChange = (bookingId: string, newStatus: 'approved' | 'rejected') => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );

    setBookings(updatedBookings);
    saveData('cricketBookings', updatedBookings); // Make sure this key matches where you store bookings
    alert(`Booking ${newStatus === 'approved' ? 'approved' : 'rejected'} successfully.`);
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      const updatedBookings = bookings.filter(booking => booking.id !== bookingId);

      setBookings(updatedBookings);
      saveData('cricketBookings', updatedBookings); // Persist updated bookings
      alert('Booking deleted successfully.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSaveItem(formData);
  };

  const handleSaveItem = (formData: any) => {
    let newItem = { ...formData, id: editingItem?.id || Date.now().toString() };
    switch (modalType) {
      case 'ground':
        if (editingItem) {
          const updatedGrounds = grounds.map(g => g.id === editingItem.id ? newItem : g);
          setGrounds(updatedGrounds);
          saveData('grounds', updatedGrounds);
        } else {
          const updatedGrounds = [...grounds, newItem];
          setGrounds(updatedGrounds);
          saveData('grounds', updatedGrounds);
        }
        break;
      case 'umpire':
        if (editingItem) {
          const updatedUmpires = umpires.map(u => u.id === editingItem.id ? newItem : u);
          setUmpires(updatedUmpires);
          saveData('umpires', updatedUmpires);
        } else {
          const updatedUmpires = [...umpires, newItem];
          setUmpires(updatedUmpires);
          saveData('umpires', updatedUmpires);
        }
        break;
      case 'scorer':
        if (editingItem) {
          const updatedScorers = scorers.map(s => s.id === editingItem.id ? newItem : s);
          setScorers(updatedScorers);
          saveData('scorers', updatedScorers);
        } else {
          const updatedScorers = [...scorers, newItem];
          setScorers(updatedScorers);
          saveData('scorers', updatedScorers);
        }
        break;
      case 'streaming':
        if (editingItem) {
          const updatedPackages = streamingPackages.map(p => p.id === editingItem.id ? newItem : p);
          setStreamingPackages(updatedPackages);
          saveData('streamingPackages', updatedPackages);
        } else {
          const updatedPackages = [...streamingPackages, newItem];
          setStreamingPackages(updatedPackages);
          saveData('streamingPackages', updatedPackages);
        }
        break;
      case 'blog':
        if (editingItem) {
          const updatedBlogs = blogs.map(b => b.id === editingItem.id ? newItem : b);
          setBlogs(updatedBlogs);
          saveData('blogs', updatedBlogs);
        } else {
          const updatedBlogs = [...blogs, newItem];
          setBlogs(updatedBlogs);
          saveData('blogs', updatedBlogs);
        }
        break;
      case 'academy':
        if (editingItem) {
          const updatedAcademyPlayers = academyPlayers.map(p => p.id === editingItem.id ? newItem : p);
          setAcademyPlayers(updatedAcademyPlayers);
          saveData('academyPlayers', updatedAcademyPlayers);
        } else {
          const updatedAcademyPlayers = [...academyPlayers, newItem];
          setAcademyPlayers(updatedAcademyPlayers);
          saveData('academyPlayers', updatedAcademyPlayers);
        }
        break;
      default:
        break;
    }
    setShowModal(false);
  };

  const renderModal = () => {
    if (!showModal) return null;

    const renderFormFields = () => {
      switch (modalType) {
        case 'ground':
          return (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-purple-700 mb-2">Ground Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:ring-purple-500 text-purple-800 placeholder-purple-400"
                  placeholder="Enter ground name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 text-blue-800 placeholder-blue-400"
                  placeholder="Enter location"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-green-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-green-500 text-green-800 placeholder-green-400"
                  placeholder="Enter description"
                  rows={3}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-orange-700 mb-2">Facilities (comma separated)</label>
                <input
                  type="text"
                  name="facilities"
                  value={Array.isArray(formData.facilities) ? formData.facilities.join(', ') : formData.facilities || ''}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-orange-500 text-orange-800 placeholder-orange-400"
                  placeholder="Professional pitch, Floodlights, Pavilion"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-indigo-700 mb-2">Price Per Day (₹)</label>
                <input
                  type="number"
                  name="pricePerDay"
                  value={formData.pricePerDay || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 text-indigo-800 placeholder-indigo-400"
                  placeholder="12000"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-pink-700 mb-2">Ground Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e, (imageUrl) =>
                      setFormData((prev: any) => ({ ...prev, image: imageUrl }))
                    )
                  }
                />

                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-lg"
                  />
                )}

              </div>
            </>
          );
        case 'umpire':
          return (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-purple-700 mb-2">Umpire Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:ring-purple-500 text-purple-800 placeholder-purple-400"
                  placeholder="Enter umpire name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-2">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 text-blue-800 placeholder-blue-400"
                  placeholder="10 years"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-green-700 mb-2">Certifications (comma separated)</label>
                <input
                  type="text"
                  name="certifications"
                  value={Array.isArray(formData.certifications) ? formData.certifications.join(', ') : formData.certifications || ''}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-green-500 text-green-800 placeholder-green-400"
                  placeholder="ICC Level 2, BCCI Certified"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-orange-700 mb-2">Rating (1-5)</label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-orange-500 text-orange-800 placeholder-orange-400"
                  placeholder="4.8"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-indigo-700 mb-2">Price Per Match (₹)</label>
                <input
                  type="number"
                  name="pricePerMatch"
                  value={formData.pricePerMatch || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 text-indigo-800 placeholder-indigo-400"
                  placeholder="3000"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-pink-700 mb-2">Matches Officiated</label>
                <input
                  type="number"
                  name="matchesOfficiated"
                  value={formData.matchesOfficiated || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:ring-pink-500 text-pink-800 placeholder-pink-400"
                  placeholder="150"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-red-700 mb-2">Umpire Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e, (imageUrl) =>
                      setFormData((prev: any) => ({ ...prev, image: imageUrl }))
                    )
                  }
                />

                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-lg"
                  />
                )}

              </div>
            </>
          );
        case 'scorer':
          return (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-purple-700 mb-2">Scorer Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:ring-purple-500 text-purple-800 placeholder-purple-400"
                  placeholder="Enter scorer name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-2">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 text-blue-800 placeholder-blue-400"
                  placeholder="6 years"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-green-700 mb-2">Specialties (comma separated)</label>
                <input
                  type="text"
                  name="specialties"
                  value={Array.isArray(formData.specialties) ? formData.specialties.join(', ') : formData.specialties || ''}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-green-500 text-green-800 placeholder-green-400"
                  placeholder="Digital scoring, Live statistics"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-orange-700 mb-2">Rating (1-5)</label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-orange-500 text-orange-800 placeholder-orange-400"
                  placeholder="4.9"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-indigo-700 mb-2">Price Per Match (₹)</label>
                <input
                  type="number"
                  name="pricePerMatch"
                  value={formData.pricePerMatch || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 text-indigo-800 placeholder-indigo-400"
                  placeholder="2000"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-pink-700 mb-2">Matches Scored</label>
                <input
                  type="number"
                  name="matchesScored"
                  value={formData.matchesScored || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:ring-pink-500 text-pink-800 placeholder-pink-400"
                  placeholder="200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-red-700 mb-2">Scorer Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e, (imageUrl) =>
                      setFormData((prev: any) => ({ ...prev, image: imageUrl }))
                    )
                  }
                />

                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-lg"
                  />
                )}

              </div>
            </>
          );
        case 'streaming':
          return (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-purple-700 mb-2">Package Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:ring-purple-500 text-purple-800 placeholder-purple-400"
                  placeholder="Professional HD Package"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 text-blue-800 placeholder-blue-400"
                  placeholder="Complete HD streaming with multiple cameras"
                  rows={3}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-green-700 mb-2">Features (comma separated)</label>
                <input
                  type="text"
                  name="features"
                  value={Array.isArray(formData.features) ? formData.features.join(', ') : formData.features || ''}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-green-500 text-green-800 placeholder-green-400"
                  placeholder="4K cameras, Live commentary, Graphics overlay"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-orange-700 mb-2">Equipment (comma separated)</label>
                <input
                  type="text"
                  name="equipment"
                  value={Array.isArray(formData.equipment) ? formData.equipment.join(', ') : formData.equipment || ''}
                  onChange={(e) => handleInputChange(e)}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-orange-500 text-orange-800 placeholder-orange-400"
                  placeholder="4 HD cameras, Audio equipment, Streaming software"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-indigo-700 mb-2">Price Per Match (₹)</label>
                <input
                  type="number"
                  name="pricePerMatch"
                  value={formData.pricePerMatch || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 text-indigo-800 placeholder-indigo-400"
                  placeholder="20000"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-red-700 mb-2">Package Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e, (imageUrl) =>
                      setFormData((prev: any) => ({ ...prev, image: imageUrl }))
                    )
                  }
                />

                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-lg"
                  />
                )}

              </div>
            </>
          );
        case 'blog':
          return (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-purple-700 mb-2">Blog Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:ring-purple-500 text-purple-800 placeholder-purple-400"
                  placeholder="Enter blog title"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 text-blue-800"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Technology">Technology</option>
                  <option value="Grounds">Grounds</option>
                  <option value="Umpiring">Umpiring</option>
                  <option value="Streaming">Streaming</option>
                  <option value="Scoring">Scoring</option>
                  <option value="Community">Community</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-green-700 mb-2">Excerpt</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-green-500 text-green-800 placeholder-green-400"
                  placeholder="Brief description of the blog post"
                  rows={2}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-orange-700 mb-2">Content</label>
                <textarea
                  name="content"
                  value={formData.content || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-orange-500 text-orange-800 placeholder-orange-400"
                  placeholder="Full blog content"
                  rows={6}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-indigo-700 mb-2">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author || 'Admin'}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 text-indigo-800 placeholder-indigo-400"
                  placeholder="Author name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-pink-700 mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date || new Date().toISOString().split('T')[0]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:ring-pink-500 text-pink-800"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-red-700 mb-2">Blog Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e, (imageUrl) =>
                      setFormData((prev: any) => ({ ...prev, image: imageUrl }))
                    )
                  }
                />

                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-lg"
                  />
                )}

              </div>
            </>
          );
        case 'academy':
          return (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-purple-700 mb-2">Player Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:ring-purple-500 text-purple-800 placeholder-purple-400"
                  placeholder="Enter player name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-blue-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 text-blue-800 placeholder-blue-400"
                  placeholder="player@example.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-green-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:ring-green-500 text-green-800 placeholder-green-400"
                  placeholder="+91 9876543210"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-orange-700 mb-2">Admission Date</label>
                <input
                  type="date"
                  name="admissionDate"
                  value={formData.admissionDate || new Date().toISOString().split('T')[0]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-orange-500 text-orange-800"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-indigo-700 mb-2">Course</label>
                <select
                  name="course"
                  value={formData.course || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 text-indigo-800"
                  required
                >
                  <option value="">Select course</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-pink-700 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  min="5"
                  max="50"
                  value={formData.age || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:ring-pink-500 text-pink-800 placeholder-pink-400"
                  placeholder="15"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-red-700 mb-2">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-red-200 rounded-lg focus:border-red-500 focus:ring-red-500 text-red-800 placeholder-red-400"
                  placeholder="2 years playing cricket"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-500 focus:ring-gray-500 text-gray-800 placeholder-gray-400"
                  placeholder="Additional notes about the player"
                  rows={3}
                />
              </div>
            </>
          );
        default:
          return null;
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingItem ? 'Edit' : 'Add New'} {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="p-6">
            {renderFormFields()}
            <div className="flex space-x-4 pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
              >
                {editingItem ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const toggleUserRole = (userId: string) => {
    const updatedUsers = users.map(user =>
      user.id === userId
        ? { ...user, role: user.role === 'admin' ? 'user' as const : 'admin' as const }
        : user
    );
    setUsers(updatedUsers);
    saveData('users', updatedUsers);
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Users */}
      <div
        onClick={() => setActiveTab('users')}
        className="cursor-pointer bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100">Total Users</p>
            <p className="text-3xl font-bold">{users.length}</p>
          </div>
          <Users className="w-12 h-12 text-purple-200" />
        </div>
      </div>

      {/* Blogs */}
      <div
        onClick={() => setActiveTab('blogs')}
        className="cursor-pointer bg-gradient-to-br from-blue-500 to-cyan-600 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100">Total Blogs</p>
            <p className="text-3xl font-bold">{blogs.length}</p>
          </div>
          <FileText className="w-12 h-12 text-blue-200" />
        </div>
      </div>

      {/* Bookings */}
      <div
        onClick={() => setActiveTab('bookings')}
        className="cursor-pointer bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100">Total Bookings</p>
            <p className="text-3xl font-bold">{bookings.length}</p>
          </div>
          <Calendar className="w-12 h-12 text-orange-200" />
        </div>
      </div>

      {/* Grounds */}
      <div
        onClick={() => setActiveTab('grounds')}
        className="cursor-pointer bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100">Total Grounds</p>
            <p className="text-3xl font-bold">{grounds.length}</p>
          </div>
          <MapPin className="w-12 h-12 text-green-200" />
        </div>
      </div>

      {/* Umpires */}
      <div
        onClick={() => setActiveTab('umpires')}
        className="cursor-pointer bg-gradient-to-br from-blue-500 to-cyan-800 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100">Total Umpires</p>
            <p className="text-3xl font-bold">{umpires.length}</p>
          </div>
          <UserCheck className="w-12 h-12 text-green-200" />
        </div>
      </div>

      {/* Scorers */}
      <div
        onClick={() => setActiveTab('scorers')}
        className="cursor-pointer bg-gradient-to-br from-orange-600 to-emerald-900 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100">Total Scorers</p>
            <p className="text-3xl font-bold">{scorers.length}</p>
          </div>
          <Trophy className="w-12 h-12 text-green-200" />
        </div>
      </div>

      {/* Streaming */}
      <div
        onClick={() => setActiveTab('streaming')}
        className="cursor-pointer bg-gradient-to-br from-green-700 to-emerald-900 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100">Total Streaming</p>
            <p className="text-3xl font-bold">{streamingPackages.length}</p>
          </div>
          <Video className="w-12 h-12 text-green-200" />
        </div>
      </div>

      {/* Academy */}
      <div
        onClick={() => setActiveTab('academy')}
        className="cursor-pointer bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-indigo-100">Academy Players</p>
            <p className="text-3xl font-bold">{academyPlayers.length}</p>
          </div>
          <Users className="w-12 h-12 text-indigo-200" />
        </div>
      </div>

      {/* Messages */}
      <div
        onClick={() => setActiveTab('messages')}
        className="cursor-pointer bg-gradient-to-br from-blue-900 to-emerald-500 p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100">Messages</p>
            <p className="text-3xl font-bold">{messages.length}</p>
          </div>
          <Mail className="w-12 h-12 text-green-200" />
        </div>
      </div>
    </div>
  );


  const renderUsers = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Role</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Join Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">{user.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-green-100 text-green-800'
                    }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{user.joinDate}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleUserRole(user.id)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title={`Change to ${user.role === 'admin' ? 'user' : 'admin'}`}
                    >
                      <UserCheck className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete('user', user.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete user"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBlogs = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Blog Management</h2>
        <button
          onClick={() => handleAddNew('blog')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Blog</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="mb-3">
              <h3 className="font-semibold text-gray-800 mb-1">{blog.title}</h3>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {blog.category}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{blog.excerpt}</p>
            <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
              <span>By {blog.author}</span>
              <span>{blog.date}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit('blog', blog)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
                title="Edit blog"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete('blog', blog.id)}
                className="text-red-600 hover:text-red-800 transition-colors"
                title="Delete blog"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">User Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Service</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Slot</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Cams</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Days</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{booking.userName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{booking.serviceName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{booking.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{booking.slot || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{booking.numberOfCams || '—'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{booking.numberOfDays || '—'}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${booking.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                    >
                      {booking.status || 'Pending'}
                    </span>
                  </td>

                  {/* Action Buttons */}
                  <td className="px-4 py-3 text-sm flex space-x-2">
                    <button
                      onClick={() => handleBookingStatusChange(booking.id, 'approved')}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleBookingStatusChange(booking.id, 'rejected')}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-xs"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleDeleteBooking(booking.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );


  const renderGrounds = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Ground Management</h2>
        <button
          onClick={() => handleAddNew('ground')}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Ground</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {grounds.map((ground) => (
          <div key={ground.id} className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            {ground.image && (
              <img src={ground.image} alt={ground.name} className="w-full h-32 object-cover rounded-lg mb-3" />
            )}
            <div className="mb-3">
              <h3 className="font-semibold text-gray-800 mb-1">{ground.name}</h3>
              <p className="text-sm text-gray-600">{ground.location}</p>
            </div>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{ground.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
              <span>₹{ground.pricePerDay}/day</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                {ground.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit('ground', ground)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
                title="Edit ground"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete('ground', ground.id)}
                className="text-red-600 hover:text-red-800 transition-colors"
                title="Delete ground"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUmpires = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Umpire Management</h2>
        <button
          onClick={() => handleAddNew('umpire')}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Umpire</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {umpires.map((umpire) => (
          <div key={umpire.id} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            {umpire.image && (
              <img src={umpire.image} alt={umpire.name} className="w-full h-32 object-cover rounded-lg mb-3" />
            )}
            <div className="mb-3">
              <h3 className="font-semibold text-gray-800 mb-1">{umpire.name}</h3>
              <p className="text-sm text-gray-600">{umpire.experience}</p>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-600">{umpire.rating}/5</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
              <span>₹{umpire.pricePerMatch}/match</span>
              <span>{umpire.matchesOfficiated} matches</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit('umpire', umpire)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
                title="Edit umpire"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete('umpire', umpire.id)}
                className="text-red-600 hover:text-red-800 transition-colors"
                title="Delete umpire"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderScorers = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Scorer Management</h2>
        <button
          onClick={() => handleAddNew('scorer')}
          className="bg-gradient-to-r from-purple-500 to-violet-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-violet-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Scorer</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scorers.map((scorer) => (
          <div key={scorer.id} className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            {scorer.image && (
              <img src={scorer.image} alt={scorer.name} className="w-full h-32 object-cover rounded-lg mb-3" />
            )}
            <div className="mb-3">
              <h3 className="font-semibold text-gray-800 mb-1">{scorer.name}</h3>
              <p className="text-sm text-gray-600">{scorer.experience}</p>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-600">{scorer.rating}/5</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
              <span>₹{scorer.pricePerMatch}/match</span>
              <span>{scorer.matchesScored} matches</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit('scorer', scorer)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
                title="Edit scorer"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete('scorer', scorer.id)}
                className="text-red-600 hover:text-red-800 transition-colors"
                title="Delete scorer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStreamingPackages = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Streaming Package Management</h2>
        <button
          onClick={() => handleAddNew('streaming')}
          className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Package</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {streamingPackages.map((pkg) => (
          <div key={pkg.id} className="bg-gradient-to-br from-orange-50 to-red-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            {pkg.image && (
              <img src={pkg.image} alt={pkg.name} className="w-full h-32 object-cover rounded-lg mb-3" />
            )}
            <div className="mb-3">
              <h3 className="font-semibold text-gray-800 mb-1">{pkg.name}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{pkg.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
              <span>₹{pkg.pricePerMatch}/match</span>
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                {pkg.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit('streaming', pkg)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
                title="Edit package"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete('streaming', pkg.id)}
                className="text-red-600 hover:text-red-800 transition-colors"
                title="Delete package"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAcademy = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Academy Player Management</h2>
        <button
          onClick={() => handleAddNew('academy')}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Player</span>
        </button>
      </div>

      {academyPlayers.length === 0 ? (
        <p className="text-gray-600">No academy players yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Course</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Age</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Admission Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {academyPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{player.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{player.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{player.phone}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <span className="inline-block bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                      {player.course}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{player.age}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{player.admissionDate}</td>
                  <td className="px-4 py-3 text-sm flex space-x-2">
                    <button
                      onClick={() => handleEdit('academy', player)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Edit player"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete('academy', player.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete player"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderMessages = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Messages</h2>

      {messages.length === 0 ? (
        <p className="text-gray-600">No messages yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Phone</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Service</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Message</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {messages.map((msg) => (
                <tr key={msg.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{msg.firstName} {msg.lastName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{msg.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{msg.phone}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{msg.serviceInterest}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{msg.message}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{msg.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );


  return (
    <main className="min-h-screen bg-gray-100 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your cricket services platform</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Trophy },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'blogs', label: 'Blogs', icon: FileText },
              { id: 'bookings', label: 'Bookings', icon: Calendar },
              { id: 'grounds', label: 'Grounds', icon: MapPin },
              { id: 'umpires', label: 'Umpires', icon: UserCheck },
              { id: 'scorers', label: 'Scorers', icon: Trophy },
              { id: 'streaming', label: 'Streaming', icon: Video },
              { id: 'academy', label: 'Academy', icon: Users },
              { id: 'message', label: 'Messages', icon: Mail },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'blogs' && renderBlogs()}
          {activeTab === 'bookings' && renderBookings()}
          {activeTab === 'grounds' && renderGrounds()}
          {activeTab === 'umpires' && renderUmpires()}
          {activeTab === 'scorers' && renderScorers()}
          {activeTab === 'streaming' && renderStreamingPackages()}
          {activeTab === 'academy' && renderAcademy()}
          {activeTab === 'messages' && renderMessages()}
        </div>

        {/* Modal */}
        {renderModal()}
      </div>
    </main>
  );
}