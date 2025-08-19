"use client"
import { useState, useEffect } from 'react';
import { Phone, Clock, AlertTriangle, Shield, Heart, Users, MapPin, Calendar, CheckCircle, ArrowRight, Zap, Truck, Hospital, User, FileText, Search, Plus, Minus } from 'lucide-react';

const BloodBankEmergency = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [emergencyForm, setEmergencyForm] = useState({
    bloodType: '',
    units: 1,
    urgency: 'immediate',
    hospital: '',
    contactPerson: '',
    phone: '',
    patientInfo: ''
  });
  const [emergencyStats, setEmergencyStats] = useState({
    responseTime: '< 15 min',
    availability: '24/7',
    coverage: '50+ hospitals',
    hotlineStatus: 'active'
  });

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const bloodInventory = [
    { type: 'O-', units: 12, status: 'critical', color: 'bg-red-500' },
    { type: 'O+', units: 45, status: 'good', color: 'bg-green-500' },
    { type: 'A-', units: 8, status: 'critical', color: 'bg-red-500' },
    { type: 'A+', units: 32, status: 'fair', color: 'bg-yellow-500' },
    { type: 'B-', units: 6, status: 'critical', color: 'bg-red-500' },
    { type: 'B+', units: 28, status: 'fair', color: 'bg-yellow-500' },
    { type: 'AB-', units: 15, status: 'good', color: 'bg-green-500' },
    { type: 'AB+', units: 38, status: 'good', color: 'bg-green-500' }
  ];

  const emergencyProcedures = [
    {
      step: 1,
      title: "Call Emergency Hotline",
      description: "Contact our 24/7 emergency hotline immediately",
      phone: "+1 (555) 911-BLOOD",
      icon: <Phone className="text-red-600" size={24} />
    },
    {
      step: 2,
      title: "Provide Patient Information",
      description: "Blood type, units needed, urgency level, and patient details",
      details: "Have MRN, blood type, crossmatch history ready",
      icon: <FileText className="text-red-600" size={24} />
    },
    {
      step: 3,
      title: "Receive Confirmation",
      description: "Get order confirmation and estimated delivery time",
      details: "Average response: 15 minutes",
      icon: <CheckCircle className="text-red-600" size={24} />
    },
    {
      step: 4,
      title: "Emergency Delivery",
      description: "Blood products delivered by emergency transport team",
      details: "GPS tracking available",
      icon: <Truck className="text-red-600" size={24} />
    }
  ];

  const emergencyContacts = [
    {
      title: "Primary Emergency Hotline",
      phone: "+1 (555) 911-BLOOD",
      description: "24/7 Emergency blood requests",
      priority: "high",
      icon: <AlertTriangle className="text-red-600" size={20} />
    },
    {
      title: "Medical Director (On-Call)",
      phone: "+1 (555) 123-4567",
      description: "Complex cases and consultations",
      priority: "medium",
      icon: <User className="text-blue-600" size={20} />
    },
    {
      title: "Laboratory Emergency",
      phone: "+1 (555) 987-6543",
      description: "Testing and crossmatch emergencies",
      priority: "medium",
      icon: <Search className="text-green-600" size={20} />
    },
    {
      title: "Transport Coordination",
      phone: "+1 (555) 456-7890",
      description: "Delivery tracking and logistics",
      priority: "low",
      icon: <Truck className="text-purple-600" size={20} />
    }
  ];

  const handleFormChange = (field, value) => {
    setEmergencyForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUnitsChange = (increment) => {
    setEmergencyForm(prev => ({
      ...prev,
      units: Math.max(1, prev.units + increment)
    }));
  };

  const handleEmergencySubmit = () => {
    if (!emergencyForm.bloodType || !emergencyForm.hospital || !emergencyForm.contactPerson || !emergencyForm.phone) {
      alert('Please fill in all required fields marked with *');
      return;
    }
    alert(`Emergency request submitted!\n\nBlood Type: ${emergencyForm.bloodType}\nUnits: ${emergencyForm.units}\nUrgency: ${emergencyForm.urgency}\nHospital: ${emergencyForm.hospital}\n\nA coordinator will call you within 2 minutes.`);
  };

  const handlePhoneCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'good': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Emergency Header Bar */}
      <div className="bg-red-600 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-2 md:mb-0">
              <AlertTriangle size={20} className="mr-2 animate-pulse" />
              <span className="font-bold">EMERGENCY SERVICES ACTIVE</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center">
                <Shield size={16} className="mr-1" />
                <span>All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-full">
                <Zap size={48} />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">24/7 Emergency Blood Services</h1>
            <p className="text-xl mb-8">
              Immediate response for critical blood needs. Every second counts.
            </p>
            <div className="bg-white bg-opacity-10 rounded-lg p-6 mb-8">
              <div className="text-3xl font-bold mb-2">EMERGENCY HOTLINE</div>
              <button 
                onClick={() => handlePhoneCall('+15559110000')}
                className="text-4xl font-bold text-yellow-300 hover:text-yellow-200 transition-colors duration-200"
              >
                +1 (555) 911-BLOOD
              </button>
              <div className="text-lg mt-2">Available 24/7/365</div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(emergencyStats).map(([key, value], index) => {
              const icons = [<Clock size={24} />, <Shield size={24} />, <Hospital size={24} />, <CheckCircle size={24} />];
              const labels = ['Response Time', 'Availability', 'Hospital Coverage', 'Hotline Status'];
              
              return (
                <div key={index} className="text-center bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-center mb-3 text-red-600">
                    {icons[index]}
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
                  <div className="text-gray-600 text-sm">{labels[index]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real-time Blood Inventory */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Live Blood Inventory</h2>
            <p className="text-gray-600">Real-time availability updated every 5 minutes</p>
            <div className="text-sm text-gray-500 mt-2">
              Last updated: {currentTime.toLocaleString()}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto mb-8">
            {bloodInventory.map((blood) => (
              <div key={blood.type} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-2xl font-bold text-gray-800 mb-2">{blood.type}</div>
                <div className="text-3xl font-bold mb-3">{blood.units}</div>
                <div className="text-sm text-gray-600 mb-3">units available</div>
                <div className={`w-full h-2 rounded-full mb-2 ${blood.color}`}></div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(blood.status)}`}>
                  {blood.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm">Critical (&lt;20)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm">Fair (20-35)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm">Good (&gt;35)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Request Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Emergency Blood Request</h2>
              <p className="text-gray-600">For immediate assistance, call our emergency hotline. This form is for documentation purposes.</p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <div className="flex items-center">
                <AlertTriangle className="text-yellow-600 mr-3" size={24} />
                <div>
                  <div className="font-semibold text-yellow-800">For Life-Threatening Emergencies</div>
                  <div className="text-yellow-700">Call +1 (555) 911-BLOOD immediately. Do not rely solely on this form.</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Blood Type Required *
                  </label>
                  <select
                    value={emergencyForm.bloodType}
                    onChange={(e) => handleFormChange('bloodType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="">Select Blood Type</option>
                    <option value="O-">O- (Universal Donor)</option>
                    <option value="O+">O+</option>
                    <option value="A-">A-</option>
                    <option value="A+">A+</option>
                    <option value="B-">B-</option>
                    <option value="B+">B+</option>
                    <option value="AB-">AB-</option>
                    <option value="AB+">AB+ (Universal Recipient)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Units Needed *
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleUnitsChange(-1)}
                      className="bg-gray-200 hover:bg-gray-300 p-2 rounded-l-lg transition-colors duration-200"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      value={emergencyForm.units}
                      onChange={(e) => handleFormChange('units', parseInt(e.target.value) || 1)}
                      className="w-full px-4 py-3 border-t border-b border-gray-300 text-center focus:ring-2 focus:ring-red-500"
                      min="1"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => handleUnitsChange(1)}
                      className="bg-gray-200 hover:bg-gray-300 p-2 rounded-r-lg transition-colors duration-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Urgency Level *
                  </label>
                  <select
                    value={emergencyForm.urgency}
                    onChange={(e) => handleFormChange('urgency', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    required
                  >
                    <option value="immediate">Immediate (Life-threatening)</option>
                    <option value="urgent">Urgent (Within 1 hour)</option>
                    <option value="routine">Routine Emergency (Within 4 hours)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hospital/Facility *
                  </label>
                  <input
                    type="text"
                    value={emergencyForm.hospital}
                    onChange={(e) => handleFormChange('hospital', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Hospital name and department"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    value={emergencyForm.contactPerson}
                    onChange={(e) => handleFormChange('contactPerson', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Doctor/Nurse name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    value={emergencyForm.phone}
                    onChange={(e) => handleFormChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Patient Information
                </label>
                <textarea
                  value={emergencyForm.patientInfo}
                  onChange={(e) => handleFormChange('patientInfo', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  rows="4"
                  placeholder="Patient age, weight, medical history, crossmatch information, etc."
                ></textarea>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={handleEmergencySubmit}
                  className="bg-red-600 text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-colors duration-300 transform hover:scale-105"
                >
                  Submit Emergency Request
                </button>
                <p className="text-sm text-gray-600 mt-4">
                  By submitting this form, you confirm this is a legitimate medical emergency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Procedures */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Emergency Procedure</h2>
              <p className="text-gray-600">Follow these steps for fastest blood delivery</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {emergencyProcedures.map((procedure, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                      {procedure.step}
                    </div>
                  </div>
                  
                  <div className="flex justify-center mb-4 mt-2">
                    {procedure.icon}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{procedure.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{procedure.description}</p>
                  
                  {procedure.phone && (
                    <button 
                      onClick={() => handlePhoneCall(procedure.phone.replace(/\s+/g, '').replace(/[()+-]/g, ''))}
                      className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors duration-200"
                    >
                      {procedure.phone}
                    </button>
                  )}
                  
                  {procedure.details && (
                    <div className="text-xs text-gray-500 mt-2">{procedure.details}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Emergency Contacts</h2>
              <p className="text-gray-600">Direct lines for different emergency needs</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {emergencyContacts.map((contact, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${
                    contact.priority === 'high' ? 'border-red-500' :
                    contact.priority === 'medium' ? 'border-yellow-500' : 'border-blue-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      {contact.icon}
                      <h3 className="text-lg font-bold text-gray-800 ml-3">{contact.title}</h3>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      contact.priority === 'high' ? 'bg-red-100 text-red-600' :
                      contact.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {contact.priority.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{contact.description}</p>
                  
                  <button 
                    onClick={() => handlePhoneCall(contact.phone.replace(/\s+/g, '').replace(/[()+-]/g, ''))}
                    className="bg-gray-800 text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-700 transition-colors duration-200 w-full"
                  >
                    {contact.phone}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Remember: Every Second Counts</h2>
          <p className="text-xl mb-8">For immediate blood emergencies, call our 24/7 hotline</p>
          <button 
            onClick={() => handlePhoneCall('+15559110000')}
            className="bg-white text-red-600 px-12 py-4 rounded-full font-bold text-2xl hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
          >
            +1 (555) 911-BLOOD
          </button>
        </div>
      </section>
    </div>
  );
};

export default BloodBankEmergency;