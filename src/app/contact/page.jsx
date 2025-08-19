"use client";
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Phone, MapPin, Calendar, Mail, MessageSquare, Send, ArrowRight } from 'lucide-react';

const Header = () => {
  const pathname = usePathname();
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/donate', label: 'Donate Blood' },
    { href: '/request', label: 'Request Blood' },
    { href: '/inventory', label: 'Blood Inventory' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/eligibility', label: 'Eligibility' }
  ];

  return (
    <header className="bg-red-600 text-white shadow-md">
      
    </header>
  );
};

const Contact = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission (replace with actual API call in production)
    if (formData.name && formData.email && formData.message) {
      setFormStatus({
        type: 'success',
        message: 'Thank you for your message! We will get back to you soon.'
      });
      setFormData({ name: '', email: '', message: '' });
    } else {
      setFormStatus({
        type: 'error',
        message: 'Please fill out all fields.'
      });
    }
  };

  const handlePhoneCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We’re here to answer your questions, provide support, or help you get involved with our mission to save lives.
          </p>
          <button
            onClick={() => router.push('/donate')}
            className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            aria-label="Schedule a blood donation"
          >
            Get Involved
          </button>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reach out to us through any of the following methods for assistance or inquiries.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Phone className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Emergency Hotline</h3>
              <p className="text-gray-600 mb-4">For urgent needs, call our 24/7 hotline.</p>
              <button
                onClick={() => handlePhoneCall('+15559110000')}
                className="text-red-600 font-semibold hover:text-red-700 flex items-center justify-center mx-auto"
                aria-label="Call emergency hotline"
              >
                +1 (555) 911-BLOOD <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <MapPin className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Main Center</h3>
              <p className="text-gray-600 mb-4">Visit our primary donation center.</p>
              <Link
                href="/locations"
                className="text-red-600 font-semibold hover:text-red-700 flex items-center justify-center"
                aria-label="View main center location"
              >
                123 Health Ave, Medical District <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Calendar className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Operating Hours</h3>
              <p className="text-gray-600 mb-4">We’re available around the clock for emergencies.</p>
              <Link
                href="/contact"
                className="text-red-600 font-semibold hover:text-red-700 flex items-center justify-center"
                aria-label="View operating hours"
              >
                24/7 Emergency Services <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Send Us a Message</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have a question or want to get involved? Fill out the form below, and we’ll get back to you soon.
            </p>
          </div>
          <div className="max-w-3xl mx-auto bg-gray-50 rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <MessageSquare className="text-red-600 mr-3" size={32} />
              <h3 className="text-2xl font-semibold text-gray-800">Contact Form</h3>
            </div>
            {formStatus && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  formStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
                aria-live="polite"
              >
                {formStatus.message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Your Name"
                  aria-required="true"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Your Email"
                  aria-required="true"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  rows="5"
                  placeholder="Your Message"
                  aria-required="true"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all duration-300 flex items-center justify-center mx-auto"
                aria-label="Submit contact form"
              >
                Send Message <Send size={16} className="ml-2" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Common questions about contacting us or getting involved.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'How can I schedule a donation appointment?',
                answer: 'You can schedule a donation by visiting our donation page or calling our hotline at +1 (555) 911-BLOOD.'
              },
              {
                question: 'Can I volunteer with the blood bank?',
                answer: 'Yes! Contact us through this form or our hotline to learn about volunteer opportunities.'
              },
              {
                question: 'How quickly will I get a response to my message?',
                answer: 'We aim to respond to all inquiries within 24-48 hours.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <Mail className="mr-2 text-red-600" size={20} />
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8">Join our mission by donating blood or volunteering with us.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/donate')}
              className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              aria-label="Schedule a blood donation"
            >
              Donate Now
            </button>
            <button
              onClick={() => router.push('/eligibility')}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-300"
              aria-label="Check your eligibility to donate"
            >
              Check Eligibility
            </button>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default Contact;