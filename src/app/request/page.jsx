"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, Phone, MapPin, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-red-600 text-white shadow-md">
      
    </header>
  );
};

const RequestBlood = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    bloodType: '',
    urgency: '',
    quantity: '',
    name: '',
    email: '',
    phone: '',
    hospital: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
  const urgencyLevels = ['Critical', 'Urgent', 'Non-Urgent'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.bloodType) newErrors.bloodType = 'Blood type is required';
    if (!formData.urgency) newErrors.urgency = 'Urgency level is required';
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = 'Valid quantity is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone || !/^\+?[\d\s-]{10,}$/.test(formData.phone)) newErrors.phone = 'Valid phone number is required';
    if (!formData.hospital) newErrors.hospital = 'Hospital name is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    // Simulate API call
    console.log('Submitting blood request:', formData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        bloodType: '',
        urgency: '',
        quantity: '',
        name: '',
        email: '',
        phone: '',
        hospital: '',
        message: ''
      });
      setErrors({});
      router.push('/request/success'); // Redirect to a success page (you'll need to create this)
    }, 2000);
  };

  const handlePhoneCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <CheckCircle size={20} className="mr-2" />
            Blood request submitted successfully!
          </div>
        </div>
      )}

      {/* Error Notification */}
      {showError && (
        <div className="fixed top-20 right-4 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <AlertCircle size={20} className="mr-2" />
            Please fix the errors in the form.
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Request Blood</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Need blood urgently? Fill out the form below, and our team will coordinate with you as soon as possible.
          </p>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Blood Request Form</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">Blood Type</label>
                <select
                  id="bloodType"
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${errors.bloodType ? 'border-red-500' : ''}`}
                >
                  <option value="">Select Blood Type</option>
                  {bloodTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.bloodType && <p className="mt-1 text-sm text-red-600">{errors.bloodType}</p>}
              </div>

              <div>
                <label htmlFor="urgency" className="block text-sm font-medium text-gray-700">Urgency Level</label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${errors.urgency ? 'border-red-500' : ''}`}
                >
                  <option value="">Select Urgency</option>
                  {urgencyLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.urgency && <p className="mt-1 text-sm text-red-600">{errors.urgency}</p>}
              </div>

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity (Units)</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${errors.quantity ? 'border-red-500' : ''}`}
                  placeholder="Enter number of units"
                />
                {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Enter your email"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="hospital" className="block text-sm font-medium text-gray-700">Hospital Name</label>
                <input
                  type="text"
                  id="hospital"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm ${errors.hospital ? 'border-red-500' : ''}`}
                  placeholder="Enter hospital name"
                />
                {errors.hospital && <p className="mt-1 text-sm text-red-600">{errors.hospital}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Additional Information</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  placeholder="Provide any additional details (e.g., patient condition, delivery instructions)"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default RequestBlood;