"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Phone, MapPin, Calendar, Facebook, Twitter, Instagram, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);

  const handlePhoneCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterStatus({
        type: 'success',
        message: 'Thank you for subscribing! Stay tuned for updates.'
      });
      setEmail('');
    } else {
      setNewsletterStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
    }
  };

  const linkVariants = {
    hover: {
      scale: 1.1,
      color: '#fed7d7',
      transition: { duration: 0.3 }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-red-900 text-white relative overflow-hidden"
      role="contentinfo"
    >
      <div className="absolute inset-0 bg-[url('/blood-pattern.png')] opacity-10 bg-cover bg-center pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Contact Information */}
          <motion.div variants={sectionVariants}>
            <h3 className="text-xl font-bold mb-4 text-red-300">Contact Us</h3>
            <div className="space-y-4">
              <motion.div
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Phone className="mr-3 text-red-400" size={20} />
                <div>
                  <div className="text-sm font-semibold">Emergency Hotline</div>
                  <button
                    onClick={() => handlePhoneCall('+15559110000')}
                    className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    aria-label="Call emergency hotline"
                  >
                    +1 (555) 911-BLOOD
                  </button>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin className="mr-3 text-red-400" size={20} />
                <div>
                  <div className="text-sm font-semibold">Main Center</div>
                  <Link
                    href="/locations"
                    className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    aria-label="View main center location"
                  >
                    123 Health Ave, Medical District
                  </Link>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Calendar className="mr-3 text-red-400" size={20} />
                <div>
                  <div className="text-sm font-semibold">Operating Hours</div>
                  <Link
                    href="/contact"
                    className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    aria-label="View operating hours"
                  >
                    24/7 Emergency Services
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={sectionVariants}>
            <h3 className="text-xl font-bold mb-4 text-red-300">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/donate', label: 'Donate Blood', aria: 'Donate blood' },
                { href: '/eligibility', label: 'Eligibility', aria: 'Check eligibility' },
                { href: '/about', label: 'About Us', aria: 'About us' },
                { href: '/contact', label: 'Contact', aria: 'Contact us' }
              ].map((link) => (
                <motion.li key={link.href} whileHover="hover" variants={linkVariants}>
                  <Link
                    href={link.href}
                    className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    aria-label={link.aria}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div variants={sectionVariants}>
            <h3 className="text-xl font-bold mb-4 text-red-300">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                { href: 'https://facebook.com/bloodbank', icon: Facebook, aria: 'Follow us on Facebook' },
                { href: 'https://x.com/bloodbank', icon: Twitter, aria: 'Follow us on X' },
                { href: 'https://instagram.com/bloodbank', icon: Instagram, aria: 'Follow us on Instagram' }
              ].map((social, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={social.href}
                    className="text-red-400 hover:text-red-300 transition-colors duration-200"
                    aria-label={social.aria}
                  >
                    <social.icon size={24} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div variants={sectionVariants}>
            <h3 className="text-xl font-bold mb-4 text-red-300">Stay Updated</h3>
            <form onSubmit={handleNewsletterSubmit}>
              <div className="relative mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-red-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
                  aria-label="Email for newsletter"
                  aria-required="true"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-all duration-300"
                  aria-label="Subscribe to newsletter"
                >
                  <Send size={16} />
                </button>
              </div>
              {newsletterStatus && (
                <div
                  className={`text-sm p-2 rounded-lg ${
                    newsletterStatus.type === 'success'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                  aria-live="polite"
                >
                  {newsletterStatus.message}
                </div>
              )}
            </form>
          </motion.div>
        </div>
        <motion.div
          className="mt-8 text-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          &copy; {new Date().getFullYear()} Blood Bank. All rights reserved.
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;