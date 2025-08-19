"use client";
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Heart, Phone, MapPin, Calendar, AlertCircle, Search, Filter, Users, Star, Info, ArrowRight } from 'lucide-react';

const Header = () => {
  const pathname = usePathname();
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/donate', label: 'Donate Blood' },
    { href: '/request', label: 'Request Blood' },
    { href: '/inventory', label: 'Blood Inventory' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <header className="bg-red-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">Blood Bank</Link>
        </div>
        <nav className="flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-red-100 transition-colors ${pathname === link.href ? 'text-red-100 font-semibold' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

const BloodInventory = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString());

  // Sample blood inventory data
  const initialInventory = [
    { type: 'O+', units: 250, availability: 85, status: 'Good', lastDonated: '2025-08-18' },
    { type: 'O-', units: 50, availability: 25, status: 'Critical', lastDonated: '2025-08-17' },
    { type: 'A+', units: 200, availability: 70, status: 'Fair', lastDonated: '2025-08-19' },
    { type: 'A-', units: 80, availability: 45, status: 'Low', lastDonated: '2025-08-16' },
    { type: 'B+', units: 180, availability: 60, status: 'Fair', lastDonated: '2025-08-18' },
    { type: 'B-', units: 60, availability: 30, status: 'Critical', lastDonated: '2025-08-15' },
    { type: 'AB+', units: 220, availability: 75, status: 'Good', lastDonated: '2025-08-19' },
    { type: 'AB-', units: 90, availability: 40, status: 'Low', lastDonated: '2025-08-17' }
  ];

  const [inventory, setInventory] = useState(initialInventory);

  // Filter and search logic
  const filteredInventory = inventory.filter((blood) => {
    const matchesSearch = blood.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || blood.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handlePhoneCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Critical': return 'text-red-600 bg-red-100';
      case 'Low': return 'text-orange-600 bg-orange-100';
      case 'Fair': return 'text-yellow-600 bg-yellow-100';
      case 'Good': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Simulate periodic inventory update
  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdated(new Date().toLocaleString());
      setInventory((prev) =>
        prev.map((blood) => ({
          ...blood,
          units: Math.max(0, blood.units + Math.floor(Math.random() * 10) - 5),
          availability: Math.min(100, Math.max(0, blood.availability + Math.floor(Math.random() * 10) - 5)),
          status:
            blood.availability <= 30 ? 'Critical' :
            blood.availability <= 50 ? 'Low' :
            blood.availability <= 70 ? 'Fair' : 'Good'
        }))
      );
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  // Donation Impact Data
  const donationImpact = [
    { icon: Heart, title: 'Lives Saved', value: '50,000+', description: 'Each donation can save up to three lives.' },
    { icon: Users, title: 'Community Impact', value: '8,500+', description: 'Active donors supporting our mission.' },
    { icon: Calendar, title: 'Years of Service', value: '25+', description: 'Decades of providing life-saving blood.' }
  ];

  // FAQ Data
  const faqs = [
    {
      question: 'Why is blood inventory important?',
      answer: 'Maintaining adequate blood inventory ensures we can meet emergency and planned medical needs, such as surgeries, trauma care, and chronic illness treatments.'
    },
    {
      question: 'How often is the inventory updated?',
      answer: 'Our inventory is updated in real-time as donations are received and blood is distributed. The timestamp above the table shows the last update.'
    },
    {
      question: 'What does "Critical" status mean?',
      answer: 'A "Critical" status indicates that the blood type is at dangerously low levels (below 30% availability), and urgent donations are needed.'
    },
    {
      question: 'Can I donate for a specific blood type?',
      answer: 'Yes, you can donate to help restock any blood type, especially those marked as Critical or Low. Visit our donation page to schedule.'
    }
  ];

  // Testimonials Data
  const testimonials = [
    {
      name: 'Dr. Sarah Thompson',
      role: 'Transfusion Specialist',
      text: 'The blood bank’s transparent inventory system allows us to plan critical surgeries with confidence, knowing we have the blood types we need.',
      rating: 5
    },
    {
      name: 'John Patel',
      role: 'Regular Donor',
      text: 'Seeing the inventory levels motivates me to donate regularly, especially when I see critical shortages for my blood type.',
      rating: 5
    },
    {
      name: 'Lisa Nguyen',
      role: 'Hospital Administrator',
      text: 'The real-time inventory updates help our hospital coordinate with the blood bank efficiently, ensuring patient care is never delayed.',
      rating: 5
    }
  ];

  // Blood Type Information
  const bloodTypeInfo = [
    { type: 'O+', description: 'Most common blood type, compatible with all positive blood types.' },
    { type: 'O-', description: 'Universal donor, can be given to any blood type.' },
    { type: 'A+', description: 'Common blood type, compatible with A+ and AB+ recipients.' },
    { type: 'A-', description: 'Can donate to A-, A+, AB-, and AB+ recipients.' },
    { type: 'B+', description: 'Can donate to B+ and AB+ recipients.' },
    { type: 'B-', description: 'Rare blood type, can donate to B-, B+, AB-, and AB+.' },
    { type: 'AB+', description: 'Universal recipient, can receive from all blood types.' },
    { type: 'AB-', description: 'Rarest blood type, can receive from all negative blood types.' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Blood Inventory</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Monitor our real-time blood stock levels and help us maintain critical supplies by donating today.
          </p>
          <button
            onClick={() => router.push('/donate')}
            className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Donate Now
          </button>
        </div>
      </section>

      {/* Inventory Table */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
            <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
              <Search className="mr-2 text-gray-600" size={20} />
              <input
                type="text"
                placeholder="Search by blood type..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full sm:w-64 rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center">
              <Filter className="mr-2 text-gray-600" size={20} />
              <select
                value={filterStatus}
                onChange={handleFilterChange}
                className="rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              >
                <option value="All">All Statuses</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Low">Low</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>
          <div className="text-right text-sm text-gray-600 mb-4">
            Last Updated: {lastUpdated}
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-red-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Blood Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Units Available</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Availability (%)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Last Donated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInventory.map((blood) => (
                    <tr key={blood.type} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{blood.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{blood.units}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-600 h-2 rounded-full"
                            style={{ width: `${blood.availability}%` }}
                          ></div>
                        </div>
                        <span className="ml-2">{blood.availability}%</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(blood.status)}`}>
                          {blood.status}
                        </span>
                        {blood.status === 'Critical' && (
                          <AlertCircle className="inline ml-2 text-red-600" size={16} />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{blood.lastDonated}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => router.push('/donate')}
                          className="text-red-600 hover:text-red-700 font-semibold"
                        >
                          Donate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {filteredInventory.length === 0 && (
            <div className="text-center text-gray-600 mt-4">
              No blood types match your search or filter criteria.
            </div>
          )}
        </div>
      </section>

      {/* Donation Impact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Impact of Your Donation</h2>
            <p className="text-xl text-gray-600">Every drop counts. See how your contribution makes a difference.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {donationImpact.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="text-red-600" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-3xl font-semibold text-red-600 mb-4">{item.value}</p>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blood Type Information Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Blood Type Information</h2>
            <p className="text-xl text-gray-600">Learn about different blood types and their compatibility.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bloodTypeInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center border-2 hover:border-red-200 transition-all duration-300">
                <div className="text-3xl font-bold text-red-600 mb-2">{info.type}</div>
                <p className="text-gray-600">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Common questions about our blood inventory.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <Info className="mr-2 text-red-600" size={20} />
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Community Says</h2>
            <p className="text-xl text-gray-600">Hear from donors and medical professionals.</p>
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
          <h2 className="text-4xl font-bold mb-4">Help Restock Critical Blood Types</h2>
          <p className="text-xl mb-8">Your donation can ensure we meet urgent demands for life-saving blood.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/donate')}
              className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Donate Now
            </button>
            <button
              onClick={() => router.push('/locations')}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-300"
            >
              Find Donation Center
            </button>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default BloodInventory;