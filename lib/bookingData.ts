export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  serviceType: 'ground' | 'umpire' | 'scorer' | 'streaming';
  serviceName: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  specialRequirements?: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Ground {
  id: string;
  name: string;
  location: string;
  description: string;
  facilities: string[];
  pricePerDay: number;
  available: boolean;
  image?: string;
  createdAt: string;
}

export interface Umpire {
  id: string;
  name: string;
  experience: string;
  certifications: string[];
  pricePerMatch: number;
  available: boolean;
  rating: number;
  matchesOfficiated: number;
  createdAt: string;
}

export interface Scorer {
  id: string;
  name: string;
  experience: string;
  specialties: string[];
  pricePerMatch: number;
  available: boolean;
  rating: number;
  matchesScored: number;
  createdAt: string;
}

export interface StreamingPackage {
  id: string;
  name: string;
  description: string;
  features: string[];
  pricePerMatch: number;
  available: boolean;
  equipment: string[];
  createdAt: string;
}

export class BookingService {
  private static instance: BookingService;

  static getInstance(): BookingService {
    if (!BookingService.instance) {
      BookingService.instance = new BookingService();
    }
    return BookingService.instance;
  }

  // Booking Management
  createBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Booking {
    const booking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const bookings = this.getAllBookings();
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    return booking;
  }

  getAllBookings(): Booking[] {
    if (typeof window === 'undefined') return [];
    const bookings = localStorage.getItem('bookings');
    return bookings ? JSON.parse(bookings) : [];
  }

  updateBookingStatus(bookingId: string, status: Booking['status']): boolean {
    const bookings = this.getAllBookings();
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    
    if (bookingIndex !== -1) {
      bookings[bookingIndex].status = status;
      bookings[bookingIndex].updatedAt = new Date().toISOString();
      localStorage.setItem('bookings', JSON.stringify(bookings));
      return true;
    }
    return false;
  }

  deleteBooking(bookingId: string): boolean {
    const bookings = this.getAllBookings();
    const filteredBookings = bookings.filter(b => b.id !== bookingId);
    localStorage.setItem('bookings', JSON.stringify(filteredBookings));
    return true;
  }

  // Ground Management
  getAllGrounds(): Ground[] {
    if (typeof window === 'undefined') return this.getDefaultGrounds();
    const grounds = localStorage.getItem('grounds');
    return grounds ? JSON.parse(grounds) : this.getDefaultGrounds();
  }

  addGround(groundData: Omit<Ground, 'id' | 'createdAt'>): Ground {
    const ground: Ground = {
      ...groundData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    const grounds = this.getAllGrounds();
    grounds.push(ground);
    localStorage.setItem('grounds', JSON.stringify(grounds));
    return ground;
  }

  updateGround(groundId: string, updates: Partial<Ground>): boolean {
    const grounds = this.getAllGrounds();
    const groundIndex = grounds.findIndex(g => g.id === groundId);
    
    if (groundIndex !== -1) {
      grounds[groundIndex] = { ...grounds[groundIndex], ...updates };
      localStorage.setItem('grounds', JSON.stringify(grounds));
      return true;
    }
    return false;
  }

  deleteGround(groundId: string): boolean {
    const grounds = this.getAllGrounds();
    const filteredGrounds = grounds.filter(g => g.id !== groundId);
    localStorage.setItem('grounds', JSON.stringify(filteredGrounds));
    return true;
  }

  // Umpire Management
  getAllUmpires(): Umpire[] {
    if (typeof window === 'undefined') return this.getDefaultUmpires();
    const umpires = localStorage.getItem('umpires');
    return umpires ? JSON.parse(umpires) : this.getDefaultUmpires();
  }

  addUmpire(umpireData: Omit<Umpire, 'id' | 'createdAt'>): Umpire {
    const umpire: Umpire = {
      ...umpireData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    const umpires = this.getAllUmpires();
    umpires.push(umpire);
    localStorage.setItem('umpires', JSON.stringify(umpires));
    return umpire;
  }

  updateUmpire(umpireId: string, updates: Partial<Umpire>): boolean {
    const umpires = this.getAllUmpires();
    const umpireIndex = umpires.findIndex(u => u.id === umpireId);
    
    if (umpireIndex !== -1) {
      umpires[umpireIndex] = { ...umpires[umpireIndex], ...updates };
      localStorage.setItem('umpires', JSON.stringify(umpires));
      return true;
    }
    return false;
  }

  deleteUmpire(umpireId: string): boolean {
    const umpires = this.getAllUmpires();
    const filteredUmpires = umpires.filter(u => u.id !== umpireId);
    localStorage.setItem('umpires', JSON.stringify(filteredUmpires));
    return true;
  }

  // Scorer Management
  getAllScorers(): Scorer[] {
    if (typeof window === 'undefined') return this.getDefaultScorers();
    const scorers = localStorage.getItem('scorers');
    return scorers ? JSON.parse(scorers) : this.getDefaultScorers();
  }

  addScorer(scorerData: Omit<Scorer, 'id' | 'createdAt'>): Scorer {
    const scorer: Scorer = {
      ...scorerData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    const scorers = this.getAllScorers();
    scorers.push(scorer);
    localStorage.setItem('scorers', JSON.stringify(scorers));
    return scorer;
  }

  updateScorer(scorerId: string, updates: Partial<Scorer>): boolean {
    const scorers = this.getAllScorers();
    const scorerIndex = scorers.findIndex(s => s.id === scorerId);
    
    if (scorerIndex !== -1) {
      scorers[scorerIndex] = { ...scorers[scorerIndex], ...updates };
      localStorage.setItem('scorers', JSON.stringify(scorers));
      return true;
    }
    return false;
  }

  deleteScorer(scorerId: string): boolean {
    const scorers = this.getAllScorers();
    const filteredScorers = scorers.filter(s => s.id !== scorerId);
    localStorage.setItem('scorers', JSON.stringify(filteredScorers));
    return true;
  }

  // Streaming Package Management
  getAllStreamingPackages(): StreamingPackage[] {
    if (typeof window === 'undefined') return this.getDefaultStreamingPackages();
    const packages = localStorage.getItem('streamingPackages');
    return packages ? JSON.parse(packages) : this.getDefaultStreamingPackages();
  }

  addStreamingPackage(packageData: Omit<StreamingPackage, 'id' | 'createdAt'>): StreamingPackage {
    const streamingPackage: StreamingPackage = {
      ...packageData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    const packages = this.getAllStreamingPackages();
    packages.push(streamingPackage);
    localStorage.setItem('streamingPackages', JSON.stringify(packages));
    return streamingPackage;
  }

  updateStreamingPackage(packageId: string, updates: Partial<StreamingPackage>): boolean {
    const packages = this.getAllStreamingPackages();
    const packageIndex = packages.findIndex(p => p.id === packageId);
    
    if (packageIndex !== -1) {
      packages[packageIndex] = { ...packages[packageIndex], ...updates };
      localStorage.setItem('streamingPackages', JSON.stringify(packages));
      return true;
    }
    return false;
  }

  deleteStreamingPackage(packageId: string): boolean {
    const packages = this.getAllStreamingPackages();
    const filteredPackages = packages.filter(p => p.id !== packageId);
    localStorage.setItem('streamingPackages', JSON.stringify(filteredPackages));
    return true;
  }

  // Default Data
  private getDefaultGrounds(): Ground[] {
    return [
      {
        id: '1',
        name: 'Mumbai Cricket Stadium',
        location: 'Andheri, Mumbai',
        description: 'Premium cricket ground with excellent facilities',
        facilities: ['Professional pitch', 'Floodlights', 'Pavilion', 'Parking'],
        pricePerDay: 12000,
        available: true,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Delhi Sports Complex',
        location: 'CP, New Delhi',
        description: 'Modern cricket facility with all amenities',
        facilities: ['Turf pitch', 'Changing rooms', 'Scoreboard', 'Cafeteria'],
        pricePerDay: 10000,
        available: true,
        createdAt: new Date().toISOString()
      }
    ];
  }

  private getDefaultUmpires(): Umpire[] {
    return [
      {
        id: '1',
        name: 'Rajesh Kumar',
        experience: '10 years',
        certifications: ['ICC Level 2', 'BCCI Certified'],
        pricePerMatch: 3000,
        available: true,
        rating: 4.8,
        matchesOfficiated: 150,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Amit Sharma',
        experience: '8 years',
        certifications: ['ICC Level 1', 'State Board Certified'],
        pricePerMatch: 2500,
        available: true,
        rating: 4.6,
        matchesOfficiated: 120,
        createdAt: new Date().toISOString()
      }
    ];
  }

  private getDefaultScorers(): Scorer[] {
    return [
      {
        id: '1',
        name: 'Priya Patel',
        experience: '6 years',
        specialties: ['Digital scoring', 'Live statistics', 'Match reports'],
        pricePerMatch: 2000,
        available: true,
        rating: 4.9,
        matchesScored: 200,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Suresh Reddy',
        experience: '5 years',
        specialties: ['Ball-by-ball scoring', 'Player statistics'],
        pricePerMatch: 1800,
        available: true,
        rating: 4.7,
        matchesScored: 180,
        createdAt: new Date().toISOString()
      }
    ];
  }

  private getDefaultStreamingPackages(): StreamingPackage[] {
    return [
      {
        id: '1',
        name: 'Professional HD Package',
        description: 'Complete HD streaming with multiple cameras',
        features: ['4K cameras', 'Live commentary', 'Graphics overlay', 'Social media integration'],
        pricePerMatch: 20000,
        available: true,
        equipment: ['4 HD cameras', 'Audio equipment', 'Streaming software'],
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Standard Package',
        description: 'Basic streaming setup for local matches',
        features: ['2 HD cameras', 'Basic graphics', 'Live streaming'],
        pricePerMatch: 12000,
        available: true,
        equipment: ['2 HD cameras', 'Basic audio setup'],
        createdAt: new Date().toISOString()
      }
    ];
  }
}