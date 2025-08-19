"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Heart, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  ArrowLeft,
  Star,
  Shield,
  Users,
  Target,
  Info,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-red-600 text-white shadow-md">
      {/* Header content would go here */}
    </header>
  );
};

const ScheduleDonationPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bloodType: '',
    donorId: '',
    birthDate: '',
    lastDonation: ''
  });
  const [eligibilityCheck, setEligibilityCheck] = useState({
    age: false,
    weight: false,
    health: false,
    lastDonation: false,
    medications: false
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Mock locations data
  const locations = [
    {
      id: 1,
      name: "Main Blood Center",
      address: "123 Health Ave, Medical District",
      phone: "+1 (555) 911-0001",
      type: "main",
      image: "bg-gradient-to-br from-red-500 to-red-700"
    },
    {
      id: 2,
      name: "North Side Donation Center",
      address: "456 Community Blvd, North Park",
      phone: "+1 (555) 911-0002",
      type: "donation",
      image: "bg-gradient-to-br from-blue-500 to-blue-700"
    },
    {
      id: 3,
      name: "University Medical Plaza",
      address: "789 Campus Drive, University District",
      phone: "+1 (555) 911-0003",
      type: "mobile",
      image: "bg-gradient-to-br from-green-500 to-green-700"
    },
    {
      id: 4,
      name: "South Bay Health Center",
      address: "321 Bay Street, South Harbor",
      phone: "+1 (555) 911-0004",
      type: "donation",
      image: "bg-gradient-to-br from-purple-500 to-purple-700"
    }
  ];

  // Generate time slots
  const timeSlots = [
    '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'
  ];

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];

  // Generate available dates (next 30 days, excluding Sundays)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip Sundays (day 0)
      if (date.getDay() !== 0) {
        dates.push({
          date: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          }),
          available: Math.random() > 0.2 // 80% chance of availability
        });
      }
    }
    return dates;
  };

  const [availableDates] = useState(generateAvailableDates());

  const handleNavigation = (path) => {
    router.push(path);
    showAlertMessage('Navigating to page...');
  };

  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleStepChange = (step) => {
    if (step > currentStep) {
      // Validate current step before proceeding
      if (currentStep === 1 && !selectedLocation) {
        showAlertMessage('Please select a location first');
        return;
      }
      if (currentStep === 2 && (!selectedDate || !selectedTime)) {
        showAlertMessage('Please select date and time');
        return;
      }
      if (currentStep === 3 && !isFormValid) {
        showAlertMessage('Please complete all required fields');
        return;
      }
      if (currentStep === 4 && !Object.values(eligibilityCheck).every(Boolean)) {
        showAlertMessage('Please complete the eligibility check');
        return;
      }
    }
    setCurrentStep(step);
  };

  const handleDonorInfoChange = (field, value) => {
    const updatedInfo = { ...donorInfo, [field]: value };
    setDonorInfo(updatedInfo);
    
    // Check form validation
    const required = ['firstName', 'lastName', 'email', 'phone', 'birthDate'];
    const isValid = required.every(field => updatedInfo[field].trim() !== '');
    setIsFormValid(isValid);
  };

  const handleEligibilityChange = (field, value) => {
    setEligibilityCheck({ ...eligibilityCheck, [field]: value });
  };

  const handleSubmitAppointment = () => {
    setShowConfirmation(true);
    showAlertMessage('Appointment scheduled successfully!');
  };

  const getSelectedLocationData = () => {
    return locations.find(loc => loc.id === parseInt(selectedLocation));
  };

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, title: 'Location', icon: MapPin },
      { number: 2, title: 'Date & Time', icon: Calendar },
      { number: 3, title: 'Your Info', icon: User },
      { number: 4, title: 'Eligibility', icon: Shield },
      { number: 5, title: 'Confirm', icon: CheckCircle }
    ];

    return (
      <div className="flex items-center justify-center mb-12">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          
          return (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : isActive 
                    ? 'bg-red-600 border-red-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
                </div>
                <span className={`text-sm mt-2 font-medium ${
                  isActive ? 'text-red-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                  currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderLocationSelection = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Your Location</h2>
        <p className="text-lg text-gray-600">Select a convenient blood donation center near you</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {locations.map((location) => (
          <div
            key={location.id}
            onClick={() => setSelectedLocation(location.id.toString())}
            className={`cursor-pointer rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 ${
              selectedLocation === location.id.toString() 
                ? 'ring-4 ring-red-500 ring-opacity-50' 
                : 'hover:shadow-xl'
            }`}
          >
            <div className={`${location.image} h-24 relative`}>
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              {selectedLocation === location.id.toString() && (
                <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                  <CheckCircle className="text-red-600" size={20} />
                </div>
              )}
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{location.name}</h3>
              <div className="flex items-start text-gray-600 mb-2">
                <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                <span>{location.address}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone size={16} className="mr-2" />
                <span>{location.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDateTimeSelection = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Select Date & Time</h2>
        <p className="text-lg text-gray-600">Choose your preferred appointment slot</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Date Selection */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Dates</h3>
          <div className="bg-white rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto">
            {availableDates.map((dateObj, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(dateObj.date)}
                disabled={!dateObj.available}
                className={`w-full p-3 mb-2 rounded-lg text-left transition-all duration-200 ${
                  selectedDate === dateObj.date
                    ? 'bg-red-600 text-white'
                    : dateObj.available
                    ? 'bg-gray-50 hover:bg-red-50 text-gray-800'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{dateObj.display}</span>
                  {!dateObj.available && <span className="text-xs">Unavailable</span>}
                  {selectedDate === dateObj.date && <CheckCircle size={16} />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Times</h3>
          <div className="bg-white rounded-lg shadow-lg p-4 max-h-96 overflow-y-auto">
            {selectedDate ? (
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time, index) => {
                  const isAvailable = Math.random() > 0.3; // 70% availability
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedTime(time)}
                      disabled={!isAvailable}
                      className={`p-3 rounded-lg text-sm transition-all duration-200 ${
                        selectedTime === time
                          ? 'bg-red-600 text-white'
                          : isAvailable
                          ? 'bg-gray-50 hover:bg-red-50 text-gray-800'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <Clock size={48} className="mx-auto mb-2 opacity-50" />
                <p>Please select a date first</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedDate && selectedTime && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
          <CheckCircle className="text-green-600 mx-auto mb-2" size={24} />
          <p className="text-green-800 font-semibold">
            Selected: {availableDates.find(d => d.date === selectedDate)?.display} at {selectedTime}
          </p>
        </div>
      )}
    </div>
  );

  const renderDonorInfo = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Information</h2>
        <p className="text-lg text-gray-600">Please provide your details for the appointment</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">First Name *</label>
            <input
              type="text"
              value={donorInfo.firstName}
              onChange={(e) => handleDonorInfoChange('firstName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter your first name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Last Name *</label>
            <input
              type="text"
              value={donorInfo.lastName}
              onChange={(e) => handleDonorInfoChange('lastName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter your last name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email *</label>
            <input
              type="email"
              value={donorInfo.email}
              onChange={(e) => handleDonorInfoChange('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Phone *</label>
            <input
              type="tel"
              value={donorInfo.phone}
              onChange={(e) => handleDonorInfoChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Date of Birth *</label>
            <input
              type="date"
              value={donorInfo.birthDate}
              onChange={(e) => handleDonorInfoChange('birthDate', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Blood Type</label>
            <select
              value={donorInfo.bloodType}
              onChange={(e) => handleDonorInfoChange('bloodType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Select blood type</option>
              {bloodTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Donor ID (if existing)</label>
            <input
              type="text"
              value={donorInfo.donorId}
              onChange={(e) => handleDonorInfoChange('donorId', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Enter donor ID"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Last Donation Date</label>
            <input
              type="date"
              value={donorInfo.lastDonation}
              onChange={(e) => handleDonorInfoChange('lastDonation', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <Info className="text-blue-600 mr-2 mt-1" size={16} />
            <div className="text-blue-800 text-sm">
              <p className="font-semibold mb-1">Privacy Notice:</p>
              <p>Your information is kept strictly confidential and used only for donation scheduling and health screening purposes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEligibilityCheck = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Eligibility Check</h2>
        <p className="text-lg text-gray-600">Please confirm you meet the donation requirements</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="space-y-6">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="age"
              checked={eligibilityCheck.age}
              onChange={(e) => handleEligibilityChange('age', e.target.checked)}
              className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="age" className="ml-3 text-gray-700">
              <span className="font-semibold">Age Requirement:</span> I am between 17-65 years old (16 with parental consent)
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="weight"
              checked={eligibilityCheck.weight}
              onChange={(e) => handleEligibilityChange('weight', e.target.checked)}
              className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="weight" className="ml-3 text-gray-700">
              <span className="font-semibold">Weight Requirement:</span> I weigh at least 110 pounds (50 kg)
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="health"
              checked={eligibilityCheck.health}
              onChange={(e) => handleEligibilityChange('health', e.target.checked)}
              className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="health" className="ml-3 text-gray-700">
              <span className="font-semibold">Health Status:</span> I am feeling well today and have no cold, flu, or fever symptoms
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="lastDonation"
              checked={eligibilityCheck.lastDonation}
              onChange={(e) => handleEligibilityChange('lastDonation', e.target.checked)}
              className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="lastDonation" className="ml-3 text-gray-700">
              <span className="font-semibold">Donation Interval:</span> It has been at least 56 days (8 weeks) since my last whole blood donation
            </label>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="medications"
              checked={eligibilityCheck.medications}
              onChange={(e) => handleEligibilityChange('medications', e.target.checked)}
              className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="medications" className="ml-3 text-gray-700">
              <span className="font-semibold">Medications:</span> I am not taking any medications that would prevent me from donating blood
            </label>
          </div>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="text-yellow-600 mr-2 mt-1" size={16} />
            <div className="text-yellow-800 text-sm">
              <p className="font-semibold mb-1">Important:</p>
              <p>A brief health screening will be conducted before donation. If you're unsure about any requirement, our staff will help determine your eligibility on-site.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConfirmation = () => {
    const location = getSelectedLocationData();
    const dateDisplay = availableDates.find(d => d.date === selectedDate)?.display;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Confirm Your Appointment</h2>
          <p className="text-lg text-gray-600">Please review your appointment details</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-6">
            {/* Appointment Summary */}
            <div className="border-b pb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Appointment Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <MapPin className="text-red-600 mr-3" size={20} />
                  <div>
                    <p className="font-semibold">{location?.name}</p>
                    <p className="text-gray-600 text-sm">{location?.address}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="text-red-600 mr-3" size={20} />
                  <div>
                    <p className="font-semibold">{dateDisplay}</p>
                    <p className="text-gray-600 text-sm">{selectedTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Donor Information */}
            <div className="border-b pb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="font-semibold">{donorInfo.firstName} {donorInfo.lastName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-semibold">{donorInfo.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Phone</p>
                  <p className="font-semibold">{donorInfo.phone}</p>
                </div>
                {donorInfo.bloodType && (
                  <div>
                    <p className="text-gray-600">Blood Type</p>
                    <p className="font-semibold">{donorInfo.bloodType}</p>
                  </div>
                )}
              </div>
            </div>

            {/* What to Expect */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">What to Expect</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="text-red-600" size={20} />
                  </div>
                  <p className="font-semibold text-sm">Health Screening</p>
                  <p className="text-gray-600 text-xs">10-15 minutes</p>
                </div>
                <div className="text-center">
                  <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Heart className="text-red-600" size={20} />
                  </div>
                  <p className="font-semibold text-sm">Blood Donation</p>
                  <p className="text-gray-600 text-xs">8-10 minutes</p>
                </div>
                <div className="text-center">
                  <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="text-red-600" size={20} />
                  </div>
                  <p className="font-semibold text-sm">Recovery</p>
                  <p className="text-gray-600 text-xs">10-15 minutes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start">
              <CheckCircle className="text-green-600 mr-2 mt-1" size={16} />
              <div className="text-green-800 text-sm">
                <p className="font-semibold mb-1">Ready to Save Lives!</p>
                <p>You'll receive a confirmation email with appointment details and preparation instructions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Alert notification */}
      {showAlert && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <CheckCircle size={20} className="mr-2" />
            {alertMessage}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Appointment Confirmed!</h3>
            <p className="text-gray-600 mb-6">
              Your blood donation appointment has been successfully scheduled. You'll receive a confirmation email shortly.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleNavigation('/dashboard')}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
              >
                View My Appointments
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Heart className="mx-auto mb-4" size={48} />
            <h1 className="text-4xl font-bold mb-4">Schedule Your Blood Donation</h1>
            <p className="text-xl">Your generosity can save up to 3 lives</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Step Indicator */}
          {renderStepIndicator()}

          {/* Step Content */}
          <div className="min-h-[600px]">
            {currentStep === 1 && renderLocationSelection()}
            {currentStep === 2 && renderDateTimeSelection()}
            {currentStep === 3 && renderDonorInfo()}
            {currentStep === 4 && renderEligibilityCheck()}
            {currentStep === 5 && renderConfirmation()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12 max-w-4xl mx-auto">
            <button
              onClick={() => handleStepChange(currentStep - 1)}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-red-600 hover:bg-red-50'
              }`}
            >
              <ArrowLeft size={20} className="mr-2" />
              Previous
            </button>

            <div className="text-gray-500">
              Step {currentStep} of 5
            </div>

            {currentStep < 5 ? (
              <button
                onClick={() => handleStepChange(currentStep + 1)}
                className="flex items-center bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200"
              >
                Next
                <ArrowRight size={20} className="ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmitAppointment}
                className="flex items-center bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200"
              >
                <CheckCircle size={20} className="mr-2" />
                Schedule Appointment
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Donate Blood?</h2>
            <p className="text-lg text-gray-600">Every donation makes a difference</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-red-600" size={32} fill="currentColor" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Save Lives</h3>
              <p className="text-gray-600">One donation can help save up to 3 lives in emergency situations</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Health Check</h3>
              <p className="text-gray-600">Free mini health screening including blood pressure and hemoglobin check</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Community Impact</h3>
              <p className="text-gray-600">Help maintain local blood supply for hospitals and emergency services</p>
            </div>
          </div>
        </div>
      </section>

      {/* Preparation Tips */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Prepare for Your Donation</h2>
              <p className="text-lg text-gray-600">Follow these simple tips for a successful donation</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-green-600">DO</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={16} />
                    <span>Eat a healthy meal and drink plenty of water before donating</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={16} />
                    <span>Get a good night's sleep before your appointment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={16} />
                    <span>Wear comfortable clothing with sleeves that can be rolled up</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" size={16} />
                    <span>Bring a valid photo ID and your donor card (if you have one)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 text-red-600">DON'T</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <X className="text-red-600 mr-3 mt-1 flex-shrink-0" size={16} />
                    <span>Don't donate if you're feeling unwell or have cold/flu symptoms</span>
                  </li>
                  <li className="flex items-start">
                    <X className="text-red-600 mr-3 mt-1 flex-shrink-0" size={16} />
                    <span>Don't consume alcohol 24 hours before donation</span>
                  </li>
                  <li className="flex items-start">
                    <X className="text-red-600 mr-3 mt-1 flex-shrink-0" size={16} />
                    <span>Don't smoke for at least 1 hour before donation</span>
                  </li>
                  <li className="flex items-start">
                    <X className="text-red-600 mr-3 mt-1 flex-shrink-0" size={16} />
                    <span>Don't take aspirin 2 days prior to platelet donation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-12 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-lg mb-6">Our team is here to assist you with scheduling or questions</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.open('tel:+15559110000', '_self')}
              className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
            >
              <Phone size={20} className="mr-2" />
              Call Support
            </button>
            <button 
              onClick={() => handleNavigation('/contact')}
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors duration-200 flex items-center justify-center"
            >
              <Mail size={20} className="mr-2" />
              Email Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScheduleDonationPage;