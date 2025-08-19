"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Users, Award, Clock, Phone, MapPin, Calendar, Shield, Target, ArrowRight, Star, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-red-600 text-white shadow-md">
      
    </header>
  );
};

const BloodBankHome = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stats, setStats] = useState({
    livesImpacted: 0,
    unitsCollected: 0,
    activeDonors: 0,
    yearsService: 0
  });
  const [showAlert, setShowAlert] = useState(false);

  // Navigation function using useRouter
  const handleNavigation = (path) => {
    router.push(path);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handlePhoneCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleEmailContact = () => {
    window.open('mailto:info@lifeblood.org', '_self');
  };

  // Hero slider images/content
  const heroSlides = [
    {
      title: "Save Lives, Give Blood",
      subtitle: "Your donation can save up to 3 lives. Be a hero today.",
      image: "bg-gradient-to-r from-red-600 to-red-800",
      cta: "Donate Now",
      path: "/donate"
    },
    {
      title: "Emergency Blood Needed",
      subtitle: "O-negative blood urgently required. Your help matters.",
      image: "bg-gradient-to-r from-red-700 to-red-900",
      cta: "Find Location",
      path: "/locations"
    },
    {
      title: "Join Our Mission",
      subtitle: "Become a regular donor and make a lasting impact.",
      image: "bg-gradient-to-r from-red-500 to-red-700",
      cta: "Learn More",
      path: "/about"
    }
  ];

  // Blood type availability data
  const bloodTypes = [
    { type: 'O+', availability: 85, status: 'Good' },
    { type: 'O-', availability: 25, status: 'Critical' },
    { type: 'A+', availability: 70, status: 'Fair' },
    { type: 'A-', availability: 45, status: 'Low' },
    { type: 'B+', availability: 60, status: 'Fair' },
    { type: 'B-', availability: 30, status: 'Critical' },
    { type: 'AB+', availability: 75, status: 'Good' },
    { type: 'AB-', availability: 40, status: 'Low' }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Donor",
      text: "Donating blood has become a meaningful part of my life. Knowing I'm helping save lives gives me incredible satisfaction.",
      rating: 5
    },
    {
      name: "Dr. Michael Chen",
      role: "Emergency Physician",
      text: "The blood bank's rapid response and quality service has helped us save countless emergency patients. Outstanding work!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Cancer Survivor",
      text: "During my treatment, I needed multiple transfusions. Thanks to generous donors, I'm here today, healthy and grateful.",
      rating: 5
    }
  ];

  // Animate stats on component mount
  useEffect(() => {
    const targetStats = {
      livesImpacted: 50000,
      unitsCollected: 125000,
      activeDonors: 8500,
      yearsService: 25
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setStats({
        livesImpacted: Math.floor(targetStats.livesImpacted * progress),
        unitsCollected: Math.floor(targetStats.unitsCollected * progress),
        activeDonors: Math.floor(targetStats.activeDonors * progress),
        yearsService: Math.floor(targetStats.yearsService * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setStats(targetStats);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // Auto-advance hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'Low': return 'text-orange-600 bg-orange-100';
      case 'Fair': return 'text-yellow-600 bg-yellow-100';
      case 'Good': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
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
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 ${heroSlides[currentSlide].image} transition-all duration-1000`}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in-delay">
            {heroSlides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleNavigation(heroSlides[currentSlide].path)}
              className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              {heroSlides[currentSlide].cta}
            </button>
            <button 
              onClick={() => handleNavigation('/about')}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-300"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Slider indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white" size={32} fill="currentColor" />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">{stats.livesImpacted.toLocaleString()}+</h3>
              <p className="text-gray-600">Lives Impacted</p>
            </div>
            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">{stats.unitsCollected.toLocaleString()}+</h3>
              <p className="text-gray-600">Units Collected</p>
            </div>
            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">{stats.activeDonors.toLocaleString()}+</h3>
              <p className="text-gray-600">Active Donors</p>
            </div>
            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">{stats.yearsService}+</h3>
              <p className="text-gray-600">Years of Service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blood Inventory Status */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Current Blood Inventory</h2>
            <p className="text-xl text-gray-600">Real-time availability of blood types</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {bloodTypes.map((blood) => (
              <div key={blood.type} className="bg-white rounded-lg shadow-lg p-6 text-center border-2 hover:border-red-200 transition-all duration-300">
                <div className="text-3xl font-bold text-red-600 mb-2">{blood.type}</div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                  <div 
                    className="bg-red-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${blood.availability}%` }}
                  ></div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-2">{blood.availability}%</div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(blood.status)}`}>
                  {blood.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive blood banking solutions</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-red-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Blood Donation</h3>
              <p className="text-gray-600 mb-6">Safe, comfortable, and convenient blood donation experience with trained professionals.</p>
              <button 
                onClick={() => handleNavigation('/donate')}
                className="text-red-600 font-semibold hover:text-red-700 flex items-center justify-center mx-auto"
              >
                Learn More <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-red-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Blood Testing</h3>
              <p className="text-gray-600 mb-6">Comprehensive screening and testing to ensure the safety and quality of all blood products.</p>
              <button 
                onClick={() => handleNavigation('/testing')}
                className="text-red-600 font-semibold hover:text-red-700 flex items-center justify-center mx-auto"
              >
                Learn More <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="text-red-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">24/7 Emergency</h3>
              <p className="text-gray-600 mb-6">Round-the-clock emergency blood supply for hospitals and medical emergencies.</p>
              <button 
                onClick={() => handleNavigation('/emergency')}
                className="text-red-600 font-semibold hover:text-red-700 flex items-center justify-center mx-auto"
              >
                Learn More <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What People Say</h2>
            <p className="text-xl text-gray-600">Stories from our community</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400" size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Save Lives?</h2>
          <p className="text-xl mb-8">Your donation can make the difference between life and death.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleNavigation('/schedule-donation')}
              className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Schedule Donation
            </button>
            <button 
              onClick={() => handleNavigation('/locations')}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-300"
            >
              Find Location
            </button>
          </div>
        </div>
      </section>

      {/* Contact Info Footer */}
      <section className="py-12 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <Phone className="mr-3" size={24} />
              <div>
                <div className="font-semibold">Emergency Hotline</div>
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
                <button 
                  onClick={() => handleNavigation('/locations')}
                  className="text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                  123 Health Ave, Medical District
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <Calendar className="mr-3" size={24} />
              <div>
                <div className="font-semibold">Operating Hours</div>
                <button 
                  onClick={() => handleNavigation('/contact')}
                  className="text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                  24/7 Emergency Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BloodBankHome;