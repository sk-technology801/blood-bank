"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Calendar, 
  Navigation, 
  Search, 
  Filter, 
  Heart, 
  Shield, 
  Users, 
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Star,
  Car,
  Accessibility,
  Coffee
} from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-red-600 text-white shadow-md">
      {/* Header content would go here */}
    </header>
  );
};

const LocationsPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [mapView, setMapView] = useState(false);

  // Mock locations data
  const locations = [
    {
      id: 1,
      name: "Main Blood Center",
      address: "123 Health Ave, Medical District",
      city: "Downtown",
      phone: "+1 (555) 911-0001",
      type: "main",
      status: "open",
      hours: {
        weekday: "6:00 AM - 10:00 PM",
        weekend: "8:00 AM - 8:00 PM"
      },
      services: ["donation", "testing", "emergency"],
      amenities: ["parking", "wheelchair", "wifi", "refreshments"],
      coordinates: { lat: 40.7128, lng: -74.0060 },
      bloodTypes: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
      urgentNeeds: ["O-", "B-"],
      rating: 4.9,
      reviews: 1247,
      image: "bg-gradient-to-br from-red-500 to-red-700",
      description: "Our flagship location with state-of-the-art facilities and 24/7 emergency services."
    },
    {
      id: 2,
      name: "North Side Donation Center",
      address: "456 Community Blvd, North Park",
      city: "North Side",
      phone: "+1 (555) 911-0002",
      type: "donation",
      status: "open",
      hours: {
        weekday: "7:00 AM - 7:00 PM",
        weekend: "9:00 AM - 5:00 PM"
      },
      services: ["donation", "testing"],
      amenities: ["parking", "wheelchair", "refreshments"],
      coordinates: { lat: 40.7580, lng: -73.9855 },
      bloodTypes: ["O+", "A+", "B+", "AB+"],
      urgentNeeds: ["O+"],
      rating: 4.7,
      reviews: 892,
      image: "bg-gradient-to-br from-blue-500 to-blue-700",
      description: "Convenient northside location focusing on regular blood donations."
    },
    {
      id: 3,
      name: "University Medical Plaza",
      address: "789 Campus Drive, University District",
      city: "University Area",
      phone: "+1 (555) 911-0003",
      type: "mobile",
      status: "open",
      hours: {
        weekday: "10:00 AM - 6:00 PM",
        weekend: "Closed"
      },
      services: ["donation"],
      amenities: ["wheelchair", "wifi"],
      coordinates: { lat: 40.6892, lng: -74.0445 },
      bloodTypes: ["O+", "A+", "A-", "B+"],
      urgentNeeds: ["A-"],
      rating: 4.6,
      reviews: 634,
      image: "bg-gradient-to-br from-green-500 to-green-700",
      description: "Located on campus for easy access by students and university staff."
    },
    {
      id: 4,
      name: "South Bay Health Center",
      address: "321 Bay Street, South Harbor",
      city: "South Bay",
      phone: "+1 (555) 911-0004",
      type: "donation",
      status: "busy",
      hours: {
        weekday: "8:00 AM - 8:00 PM",
        weekend: "10:00 AM - 6:00 PM"
      },
      services: ["donation", "testing"],
      amenities: ["parking", "wheelchair", "refreshments", "wifi"],
      coordinates: { lat: 40.6501, lng: -74.0293 },
      bloodTypes: ["O+", "O-", "A+", "B+", "AB+"],
      urgentNeeds: [],
      rating: 4.8,
      reviews: 1056,
      image: "bg-gradient-to-br from-purple-500 to-purple-700",
      description: "Modern facility serving the growing South Bay community."
    },
    {
      id: 5,
      name: "West End Mobile Unit",
      address: "Mobile Unit - Various Locations",
      city: "West End",
      phone: "+1 (555) 911-0005",
      type: "mobile",
      status: "scheduled",
      hours: {
        weekday: "Schedule Varies",
        weekend: "Schedule Varies"
      },
      services: ["donation"],
      amenities: ["wheelchair"],
      coordinates: { lat: 40.7282, lng: -74.0776 },
      bloodTypes: ["O+", "A+", "B+"],
      urgentNeeds: ["O+"],
      rating: 4.5,
      reviews: 423,
      image: "bg-gradient-to-br from-orange-500 to-orange-700",
      description: "Mobile blood drive serving various community locations throughout the week."
    },
    {
      id: 6,
      name: "Emergency Response Center",
      address: "999 Emergency Way, Hospital District",
      city: "Hospital District",
      phone: "+1 (555) 911-0006",
      type: "emergency",
      status: "open",
      hours: {
        weekday: "24/7",
        weekend: "24/7"
      },
      services: ["emergency", "testing"],
      amenities: ["parking", "wheelchair"],
      coordinates: { lat: 40.7410, lng: -73.9896 },
      bloodTypes: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"],
      urgentNeeds: ["O-", "B-", "A-"],
      rating: 4.9,
      reviews: 756,
      image: "bg-gradient-to-br from-red-600 to-red-800",
      description: "24/7 emergency blood supply for critical medical situations."
    }
  ];

  const handleNavigation = (path) => {
    router.push(path);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handlePhoneCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleDirections = (location) => {
    const query = encodeURIComponent(`${location.address}, ${location.city}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || location.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'open': return 'Open Now';
      case 'busy': return 'Very Busy';
      case 'closed': return 'Closed';
      case 'scheduled': return 'By Schedule';
      default: return 'Unknown';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'main': return <Heart className="text-red-600" size={20} />;
      case 'donation': return <Users className="text-blue-600" size={20} />;
      case 'mobile': return <Navigation className="text-orange-600" size={20} />;
      case 'emergency': return <Shield className="text-red-700" size={20} />;
      default: return <MapPin className="text-gray-600" size={20} />;
    }
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'parking': return <Car size={16} />;
      case 'wheelchair': return <Accessibility size={16} />;
      case 'wifi': return '📶';
      case 'refreshments': return <Coffee size={16} />;
      default: return '•';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      {/* Alert notification */}
      {showAlert && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <CheckCircle size={20} className="mr-2" />
            Navigating to page...
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Find a Location</h1>
            <p className="text-xl mb-8">Convenient blood donation centers near you</p>
            
            {/* Search and Filter */}
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by location name or address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30"
                  />
                </div>
                
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="pl-12 pr-8 py-4 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30 bg-white appearance-none cursor-pointer"
                  >
                    <option value="all">All Locations</option>
                    <option value="main">Main Centers</option>
                    <option value="donation">Donation Centers</option>
                    <option value="mobile">Mobile Units</option>
                    <option value="emergency">Emergency Centers</option>
                  </select>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex justify-center mb-4">
                <div className="bg-white bg-opacity-20 rounded-full p-1">
                  <button
                    onClick={() => setMapView(false)}
                    className={`px-6 py-2 rounded-full transition-all duration-300 ${!mapView ? 'bg-white text-red-600' : 'text-white'}`}
                  >
                    List View
                  </button>
                  <button
                    onClick={() => setMapView(true)}
                    className={`px-6 py-2 rounded-full transition-all duration-300 ${mapView ? 'bg-white text-red-600' : 'text-white'}`}
                  >
                    Map View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="text-lg text-gray-600">
              {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''} found
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-red-600 hover:text-red-700 flex items-center"
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Map View Placeholder */}
      {mapView && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin size={48} className="mx-auto mb-4" />
                <p className="text-xl">Interactive Map Coming Soon</p>
                <p>For now, use the list view to find locations</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Locations List */}
      {!mapView && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredLocations.map((location) => (
                <div key={location.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Location Header */}
                  <div className={`${location.image} h-32 relative`}>
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    <div className="absolute top-4 left-4 flex items-center">
                      {getTypeIcon(location.type)}
                      <span className="ml-2 text-white font-semibold capitalize">{location.type} Center</span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(location.status)}`}>
                        {getStatusText(location.status)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Location Info */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{location.name}</h3>
                      <div className="flex items-start text-gray-600 mb-2">
                        <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                        <span>{location.address}, {location.city}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Phone size={16} className="mr-2" />
                        <button 
                          onClick={() => handlePhoneCall(location.phone)}
                          className="text-red-600 hover:text-red-700"
                        >
                          {location.phone}
                        </button>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock size={16} className="mr-2" />
                        <span>Weekdays: {location.hours.weekday}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      <div className="flex items-center mr-4">
                        <Star className="text-yellow-400 mr-1" size={16} fill="currentColor" />
                        <span className="font-semibold">{location.rating}</span>
                      </div>
                      <span className="text-gray-600 text-sm">({location.reviews} reviews)</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-4">{location.description}</p>

                    {/* Services */}
                    <div className="mb-4">
                      <div className="font-semibold text-gray-800 mb-2">Services:</div>
                      <div className="flex flex-wrap gap-2">
                        {location.services.map((service, index) => (
                          <span key={index} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm capitalize">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="mb-4">
                      <div className="font-semibold text-gray-800 mb-2">Amenities:</div>
                      <div className="flex flex-wrap gap-3">
                        {location.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center text-gray-600 text-sm">
                            {getAmenityIcon(amenity)}
                            <span className="ml-1 capitalize">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Urgent Needs */}
                    {location.urgentNeeds.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center mb-2">
                          <AlertCircle className="text-red-600 mr-2" size={16} />
                          <span className="font-semibold text-red-600">Urgent Need:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {location.urgentNeeds.map((type, index) => (
                            <span key={index} className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleDirections(location)}
                        className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
                      >
                        <Navigation size={18} className="mr-2" />
                        Get Directions
                      </button>
                      <button
                        onClick={() => handleNavigation('/schedule-donation')}
                        className="flex-1 border-2 border-red-600 text-red-600 px-4 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-200 flex items-center justify-center"
                      >
                        <Calendar size={18} className="mr-2" />
                        Schedule Visit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredLocations.length === 0 && (
              <div className="text-center py-16">
                <MapPin size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No locations found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedFilter('all');
                  }}
                  className="text-red-600 hover:text-red-700 font-semibold"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Emergency Contact Section */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Shield className="mx-auto text-red-600 mb-4" size={48} />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Emergency Blood Supply</h2>
            <p className="text-lg text-gray-600 mb-8">
              Need emergency blood supply? Our Emergency Response Center is available 24/7 for critical situations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handlePhoneCall('+15559110006')}
                className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-all duration-300 flex items-center justify-center"
              >
                <Phone size={20} className="mr-2" />
                Emergency Hotline
              </button>
              <button
                onClick={() => handleNavigation('/emergency')}
                className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-all duration-300 flex items-center justify-center"
              >
                Learn More
                <ArrowRight size={20} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <section className="py-12 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <Phone className="mr-3" size={24} />
              <div>
                <div className="font-semibold">General Information</div>
                <button 
                  onClick={() => handlePhoneCall('+15559110000')}
                  className="text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                  +1 (555) 911-BLOOD
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <MapPin className="mr-3" size={24} />
              <div>
                <div className="font-semibold">Main Center</div>
                <span className="text-red-400">123 Health Ave, Medical District</span>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <Calendar className="mr-3" size={24} />
              <div>
                <div className="font-semibold">Schedule a Visit</div>
                <button 
                  onClick={() => handleNavigation('/schedule-donation')}
                  className="text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                  Book Online
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationsPage;