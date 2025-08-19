"use client"
import { useState } from 'react';
import { Heart, Clock, MapPin, Calendar, CheckCircle, X, User, Phone, Mail, AlertTriangle, Award, Users, Target, Gift, ArrowRight, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';

const BloodBankDonate = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [eligibilityCheck, setEligibilityCheck] = useState({
    age: '',
    weight: '',
    lastDonation: '',
    healthStatus: '',
    medications: '',
    travel: ''
  });
  const [donorForm, setDonorForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bloodType: '',
    donationType: 'whole-blood'
  });

  const donationTypes = [
    {
      type: 'whole-blood',
      name: 'Whole Blood Donation',
      duration: '45-60 minutes',
      frequency: 'Every 56 days',
      description: 'Standard blood donation that can be separated into red cells, plasma, and platelets.',
      impact: 'Can help up to 3 patients',
      icon: <Heart className="text-red-600" size={32} fill="currentColor" />
    },
    {
      type: 'platelets',
      name: 'Platelet Donation',
      duration: '2-3 hours',
      frequency: 'Every 7 days',
      description: 'Specialized donation focusing on platelets for cancer patients and surgical procedures.',
      impact: 'Can help multiple patients',
      icon: <Target className="text-blue-600" size={32} />
    },
    {
      type: 'plasma',
      name: 'Plasma Donation',
      duration: '1-2 hours',
      frequency: 'Every 28 days',
      description: 'Protein-rich liquid portion of blood used for trauma and burn patients.',
      impact: 'Critical for emergency care',
      icon: <Gift className="text-green-600" size={32} />
    }
  ];

  const locations = [
    {
      id: 'main',
      name: 'Main Donation Center',
      address: '123 Health Ave, Medical District',
      hours: 'Mon-Fri: 7:00 AM - 7:00 PM, Sat-Sun: 8:00 AM - 4:00 PM',
      phone: '+1 (555) 123-DONATE',
      services: ['Whole Blood', 'Platelets', 'Plasma']
    },
    {
      id: 'north',
      name: 'North Campus Center',
      address: '456 University Blvd, North Campus',
      hours: 'Mon-Sat: 9:00 AM - 6:00 PM',
      phone: '+1 (555) 456-7890',
      services: ['Whole Blood', 'Plasma']
    },
    {
      id: 'mobile',
      name: 'Mobile Blood Drive',
      address: 'Various Locations - See Schedule',
      hours: 'Check mobile schedule',
      phone: '+1 (555) 987-6543',
      services: ['Whole Blood']
    }
  ];

  const timeSlots = [
    '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  const eligibilityRequirements = [
    { requirement: 'Age 17+ (16 with parental consent)', met: true },
    { requirement: 'Weigh at least 110 pounds', met: true },
    { requirement: 'Be in good general health', met: true },
    { requirement: 'No tattoos/piercings in last 3 months', met: true },
    { requirement: 'No recent travel to malaria-endemic areas', met: true },
    { requirement: 'Wait 56 days between whole blood donations', met: true }
  ];

  const donationProcess = [
    {
      step: 1,
      title: 'Registration & Health History',
      duration: '10-15 minutes',
      description: 'Complete registration and health questionnaire with our staff.',
      icon: <User className="text-blue-600" size={24} />
    },
    {
      step: 2,
      title: 'Mini Physical & Vitals',
      duration: '5-10 minutes',
      description: 'Quick health check including temperature, blood pressure, and hemoglobin.',
      icon: <CheckCircle className="text-green-600" size={24} />
    },
    {
      step: 3,
      title: 'Blood Donation',
      duration: '8-12 minutes',
      description: 'The actual blood collection process with trained phlebotomists.',
      icon: <Heart className="text-red-600" size={24} />
    },
    {
      step: 4,
      title: 'Rest & Refreshments',
      duration: '10-15 minutes',
      description: 'Relax and enjoy snacks while we monitor your recovery.',
      icon: <Gift className="text-purple-600" size={24} />
    }
  ];

  const faqData = [
    {
      id: 'safety',
      question: 'Is blood donation safe?',
      answer: 'Yes, blood donation is very safe. We use sterile, single-use equipment for each donor. All equipment is disposed of after one use, making infection transmission impossible.'
    },
    {
      id: 'frequency',
      question: 'How often can I donate?',
      answer: 'You can donate whole blood every 56 days (8 weeks), platelets every 7 days (up to 24 times per year), and plasma every 28 days. Your body replenishes donated blood quickly.'
    },
    {
      id: 'preparation',
      question: 'How should I prepare for donation?',
      answer: 'Eat a healthy meal before donating, drink plenty of water, get a good nights sleep, and bring a valid ID. Avoid fatty foods before donation.'
    },
    {
      id: 'side-effects',
      question: 'What are the side effects?',
      answer: 'Most donors feel fine after donating. Some may experience slight dizziness or fatigue. Serious reactions are very rare (less than 1% of donations).'
    },
    {
      id: 'time',
      question: 'How long does donation take?',
      answer: 'The entire process takes about 45-60 minutes for whole blood donation. The actual blood collection takes only 8-12 minutes.'
    }
  ];

  const handleFormChange = (field, value) => {
    setDonorForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEligibilityChange = (field, value) => {
    setEligibilityCheck(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleScheduleSubmit = () => {
    if (!selectedLocation || !selectedDate || !selectedTime || !donorForm.firstName || !donorForm.lastName || !donorForm.email || !donorForm.phone) {
      alert('Please fill in all required fields to schedule your appointment.');
      return;
    }

    const locationName = locations.find(loc => loc.id === selectedLocation)?.name || selectedLocation;
    alert(`Appointment Scheduled Successfully!\n\nName: ${donorForm.firstName} ${donorForm.lastName}\nLocation: ${locationName}\nDate: ${selectedDate}\nTime: ${selectedTime}\nType: ${donationTypes.find(type => type.type === donorForm.donationType)?.name}\n\nYou will receive a confirmation email shortly.`);
  };

  const handlePhoneCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  const checkEligibility = () => {
    let eligible = true;
    let issues = [];

    if (parseInt(eligibilityCheck.age) < 17) {
      eligible = false;
      issues.push('Must be at least 17 years old');
    }
    if (parseInt(eligibilityCheck.weight) < 110) {
      eligible = false;
      issues.push('Must weigh at least 110 pounds');
    }
    if (eligibilityCheck.lastDonation && new Date(eligibilityCheck.lastDonation) > new Date(Date.now() - 56 * 24 * 60 * 60 * 1000)) {
      eligible = false;
      issues.push('Must wait 56 days between whole blood donations');
    }

    if (eligible) {
      alert('Great news! Based on your responses, you appear eligible to donate blood. Please proceed with scheduling your appointment.');
    } else {
      alert(`Based on your responses, you may not be eligible to donate at this time:\n\n${issues.join('\n')}\n\nPlease contact us at +1 (555) 123-DONATE for more information.`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-full">
                <Heart size={48} fill="currentColor" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Donate Blood, Save Lives</h1>
            <p className="text-xl mb-8">
              Your single donation can save up to 3 lives. Join our community of heroes making a difference every day.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">Every 2 seconds</div>
                <div className="text-sm">someone needs blood</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">38% of people</div>
                <div className="text-sm">are eligible to donate</div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">Less than 3%</div>
                <div className="text-sm">actually donate annually</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
            {[
              { id: 'schedule', label: 'Schedule Donation' },
              { id: 'eligibility', label: 'Check Eligibility' },
              { id: 'process', label: 'Donation Process' },
              { id: 'faq', label: 'FAQ' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold border-b-2 transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-600 hover:text-red-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Schedule Donation Tab */}
          {activeTab === 'schedule' && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Schedule Your Donation</h2>
                <p className="text-gray-600">Choose your donation type, location, and preferred time</p>
              </div>

              {/* Donation Types */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {donationTypes.map((donation) => (
                  <div
                    key={donation.type}
                    className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-300 border-2 ${
                      donorForm.donationType === donation.type
                        ? 'border-red-500 shadow-xl transform scale-105'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                    onClick={() => handleFormChange('donationType', donation.type)}
                  >
                    <div className="flex justify-center mb-4">
                      {donation.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{donation.name}</h3>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-semibold">{donation.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Frequency:</span>
                        <span className="font-semibold">{donation.frequency}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{donation.description}</p>
                    <div className="text-center">
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
                        {donation.impact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Booking Form */}
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            value={donorForm.firstName}
                            onChange={(e) => handleFormChange('firstName', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            value={donorForm.lastName}
                            onChange={(e) => handleFormChange('lastName', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            placeholder="Smith"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={donorForm.email}
                          onChange={(e) => handleFormChange('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="john.smith@email.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={donorForm.phone}
                          onChange={(e) => handleFormChange('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Blood Type (if known)
                        </label>
                        <select
                          value={donorForm.bloodType}
                          onChange={(e) => handleFormChange('bloodType', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Unknown/Not Sure</option>
                          <option value="O-">O-</option>
                          <option value="O+">O+</option>
                          <option value="A-">A-</option>
                          <option value="A+">A+</option>
                          <option value="B-">B-</option>
                          <option value="B+">B+</option>
                          <option value="AB-">AB-</option>
                          <option value="AB+">AB+</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Appointment Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Donation Center *
                        </label>
                        <select
                          value={selectedLocation}
                          onChange={(e) => setSelectedLocation(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Select a location</option>
                          {locations.map((location) => (
                            <option key={location.id} value={location.id}>
                              {location.name}
                            </option>
                          ))}
                        </select>
                        
                        {selectedLocation && (
                          <div className="mt-3 p-4 bg-white rounded-lg border">
                            {(() => {
                              const location = locations.find(loc => loc.id === selectedLocation);
                              return location ? (
                                <div>
                                  <div className="flex items-center mb-2">
                                    <MapPin size={16} className="text-gray-500 mr-2" />
                                    <span className="text-sm text-gray-700">{location.address}</span>
                                  </div>
                                  <div className="flex items-center mb-2">
                                    <Clock size={16} className="text-gray-500 mr-2" />
                                    <span className="text-sm text-gray-700">{location.hours}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Phone size={16} className="text-gray-500 mr-2" />
                                    <button
                                      onClick={() => handlePhoneCall(location.phone.replace(/\s+/g, '').replace(/[()+-]/g, ''))}
                                      className="text-sm text-red-600 hover:text-red-700"
                                    >
                                      {location.phone}
                                    </button>
                                  </div>
                                </div>
                              ) : null;
                            })()}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Preferred Time *
                        </label>
                        <select
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Select a time</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <button
                        onClick={handleScheduleSubmit}
                        className="w-full bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors duration-300 transform hover:scale-105"
                      >
                        Schedule My Donation
                      </button>
                      <p className="text-sm text-gray-600 text-center mt-4">
                        You will receive a confirmation email with appointment details and preparation instructions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Eligibility Check Tab */}
          {activeTab === 'eligibility' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Check Your Eligibility</h2>
                <p className="text-gray-600">Quick screening to see if you're ready to donate</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Quick Eligibility Check */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Basic Requirements</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Age
                      </label>
                      <input
                        type="number"
                        value={eligibilityCheck.age}
                        onChange={(e) => handleEligibilityChange('age', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter your age"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Weight (pounds)
                      </label>
                      <input
                        type="number"
                        value={eligibilityCheck.weight}
                        onChange={(e) => handleEligibilityChange('weight', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter your weight"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Blood Donation Date
                      </label>
                      <input
                        type="date"
                        value={eligibilityCheck.lastDonation}
                        onChange={(e) => handleEligibilityChange('lastDonation', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        General Health Status
                      </label>
                      <select
                        value={eligibilityCheck.healthStatus}
                        onChange={(e) => handleEligibilityChange('healthStatus', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="">Select your health status</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="poor">Poor</option>
                      </select>
                    </div>
                    
                    <button
                      onClick={checkEligibility}
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
                    >
                      Check My Eligibility
                    </button>
                  </div>
                </div>

                {/* Eligibility Requirements */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">General Requirements</h3>
                  
                  <div className="space-y-4">
                    {eligibilityRequirements.map((req, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={16} />
                        <span className="text-gray-700 text-sm">{req.requirement}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <div className="flex">
                      <AlertTriangle className="text-yellow-600 mr-3" size={20} />
                      <div>
                        <div className="font-semibold text-yellow-800 mb-1">Important Note</div>
                        <div className="text-yellow-700 text-sm">
                          This is a basic screening. A complete health questionnaire and mini-physical will be conducted at your appointment.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Donation Process Tab */}
          {activeTab === 'process' && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">What to Expect</h2>
                <p className="text-gray-600">Your donation journey from arrival to departure</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {donationProcess.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white rounded-lg shadow-lg p-8 relative">
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                          {step.step}
                        </div>
                      </div>
                      
                      <div className="flex justify-center mb-4 mt-2">
                        {step.icon}
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                      <div className="text-sm text-red-600 font-semibold mb-3">{step.duration}</div>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Preparation Tips */}
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">How to Prepare</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <CheckCircle className="text-green-500 mr-2" size={20} />
                      Do This
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <ArrowRight className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                        Eat a healthy meal before donating
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                        Drink plenty of water (16-20 oz before donation)
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                        Get a good night's sleep
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                        Bring a valid photo ID
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                        Wear comfortable clothing with sleeves that roll up
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <X className="text-red-500 mr-2" size={20} />
                      Avoid This
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                        Fatty or greasy foods before donation
                      </li>
                      <li className="flex items-start">
                        <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                        Alcohol 24 hours before donation
                      </li>
                      <li className="flex items-start">
                        <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                        Aspirin 48 hours before platelet donation
                      </li>
                      <li className="flex items-start">
                        <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                        Heavy exercise immediately before donation
                      </li>
                      <li className="flex items-start">
                        <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                        Coming on an empty stomach
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-600">Get answers to common questions about blood donation</p>
              </div>

              <div className="space-y-4">
                {faqData.map((faq) => (
                  <div key={faq.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                      <div className={`transform transition-transform duration-200 ${
                        expandedFAQ === faq.id ? 'rotate-180' : ''
                      }`}>
                        <ChevronDown className="text-gray-400" size={24} />
                      </div>
                    </button>
                    {expandedFAQ === faq.id && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-red-50 rounded-lg p-8 text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Still Have Questions?</h3>
                <p className="text-gray-600 mb-6">Our friendly staff is here to help with any concerns you may have.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => handlePhoneCall('+15551234567')}
                    className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors duration-300 flex items-center justify-center"
                  >
                    <Phone size={16} className="mr-2" />
                    Call +1 (555) 123-DONATE
                  </button>
                  <button className="border-2 border-red-600 text-red-600 px-6 py-3 rounded-full font-semibold hover:bg-red-600 hover:text-white transition-colors duration-300">
                    Live Chat Support
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Donate Blood?</h2>
              <p className="text-gray-600">The impact of your donation goes beyond saving lives</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="text-red-600" size={32} fill="currentColor" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Save Lives</h3>
                <p className="text-gray-600">Each donation can help up to 3 patients in need of blood transfusions.</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Help Your Community</h3>
                <p className="text-gray-600">Support local hospitals and patients in your community who depend on donations.</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Health Benefits</h3>
                <p className="text-gray-600">Regular donation can help reduce iron levels and may lower cardiovascular risks.</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gift className="text-purple-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Free Health Check</h3>
                <p className="text-gray-600">Get a mini-physical including blood pressure, temperature, and hemoglobin levels.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donor Recognition */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Join Our Donor Community</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-bronze-400 to-bronze-600 text-white rounded-lg p-6">
                <Award size={32} className="mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Bronze Donor</h3>
                <p className="text-sm">1-9 donations</p>
                <p className="text-xs mt-2 opacity-75">Digital donor card & thank you certificate</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-400 to-gray-600 text-white rounded-lg p-6">
                <Award size={32} className="mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Silver Donor</h3>
                <p className="text-sm">10-24 donations</p>
                <p className="text-xs mt-2 opacity-75">Silver pin & priority scheduling</p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white rounded-lg p-6">
                <Award size={32} className="mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Gold Donor</h3>
                <p className="text-sm">25+ donations</p>
                <p className="text-xs mt-2 opacity-75">Gold pin & special recognition events</p>
              </div>
            </div>

            <div className="bg-red-600 text-white rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
              <p className="text-xl mb-6">Schedule your appointment today and join thousands of heroes in our community.</p>
              <button 
                onClick={() => setActiveTab('schedule')}
                className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
              >
                Schedule My Donation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <section className="py-12 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <Phone className="mb-3 md:mb-0 md:mr-3" size={24} />
                <div>
                  <div className="font-semibold mb-1">Donation Hotline</div>
                  <button 
                    onClick={() => handlePhoneCall('+15551234567')}
                    className="text-red-400 hover:text-red-300 transition-colors duration-200"
                  >
                    +1 (555) 123-DONATE
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <MapPin className="mb-3 md:mb-0 md:mr-3" size={24} />
                <div>
                  <div className="font-semibold mb-1">Main Donation Center</div>
                  <div className="text-gray-300">123 Health Ave, Medical District</div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center md:items-start">
                <Clock className="mb-3 md:mb-0 md:mr-3" size={24} />
                <div>
                  <div className="font-semibold mb-1">Hours of Operation</div>
                  <div className="text-gray-300">Mon-Fri: 7 AM - 7 PM<br />Sat-Sun: 8 AM - 4 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BloodBankDonate;