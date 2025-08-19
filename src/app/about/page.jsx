"use client";
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Heart, Phone, MapPin, Calendar, Users, Target, Award, ArrowRight } from 'lucide-react';

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
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

const About = () => {
  const router = useRouter();

  const handlePhoneCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About Our Blood Bank</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We are dedicated to saving lives by ensuring a safe and reliable blood supply for our community.
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

      {/* Our Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To provide a sustainable blood supply to meet the needs of patients, promote donor awareness, and ensure safe donation practices.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Target className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Save Lives</h3>
              <p className="text-gray-600">Ensure every patient in need receives life-saving blood transfusions.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Users className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Engagement</h3>
              <p className="text-gray-600">Inspire and educate our community to participate in blood donation.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Award className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Safety First</h3>
              <p className="text-gray-600">Maintain the highest standards for donor and recipient safety.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our History Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our History</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Founded in 1995, our blood bank has grown to become a cornerstone of healthcare in the region.
            </p>
          </div>
          <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg p-8">
            <p className="text-gray-600 mb-4">
              Since our establishment, we have collected over 100,000 units of blood, saving countless lives. Our journey began with a small team of dedicated volunteers and has expanded to a network of donation centers, mobile drives, and partnerships with local hospitals.
            </p>
            <p className="text-gray-600">
              We are proud to have served our community for over 25 years, adapting to new technologies and safety protocols to ensure a reliable blood supply.
            </p>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated professionals and volunteers who make our mission possible.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Users className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Medical Staff</h3>
              <p className="text-gray-600">Our certified nurses and phlebotomists ensure a safe and comfortable donation experience.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Heart className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Volunteers</h3>
              <p className="text-gray-600">Our volunteers organize drives and educate the community about the importance of blood donation.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Award className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Leadership</h3>
              <p className="text-gray-600">Our experienced leadership team guides our mission with compassion and innovation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how your donations make a difference in our community.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg shadow-lg p-6 text-center">
              <Heart className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">100,000+ Units</h3>
              <p className="text-gray-600">Collected and distributed to save lives.</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-lg p-6 text-center">
              <Users className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">50,000+ Donors</h3>
              <p className="text-gray-600">Engaged in our mission to give blood.</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-lg p-6 text-center">
              <Target className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">200+ Hospitals</h3>
              <p className="text-gray-600">Supported with a reliable blood supply.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Get Involved</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our mission to save lives through blood donation and community outreach.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Heart className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Donate Blood</h3>
              <p className="text-gray-600 mb-4">Your donation can save up to three lives.</p>
              <button
                onClick={() => router.push('/donate')}
                className="text-red-600 font-semibold hover:text-red-700 flex items-center justify-center mx-auto"
                aria-label="Schedule a blood donation"
              >
                Schedule Now <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Users className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Volunteer</h3>
              <p className="text-gray-600 mb-4">Help organize donation drives or educate the community.</p>
              <Link
                href="/contact"
                className="text-red-600 font-semibold hover:text-red-700 flex items-center justify-center"
                aria-label="Contact us to volunteer"
              >
                Contact Us <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Target className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Spread Awareness</h3>
              <p className="text-gray-600 mb-4">Share our mission to encourage more donors.</p>
              <Link
                href="/eligibility"
                className="text-red-600 font-semibold hover:text-red-700 flex items-center justify-center"
                aria-label="Learn about eligibility to spread awareness"
              >
                Learn More <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-8">Be a part of our life-saving work by donating, volunteering, or spreading the word.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/donate')}
              className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              aria-label="Schedule a blood donation"
            >
              Donate Now
            </button>
            <button
              onClick={() => router.push('/contact')}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-300"
              aria-label="Contact us to get involved"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default About;