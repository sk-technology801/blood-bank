"use client";
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Heart, Phone, MapPin, Calendar, Info, CheckCircle, XCircle, Users, Shield, Clock, Stethoscope, Droplet, Activity, Pill, Globe, Apple, Coffee, HelpCircle, ArrowRight } from 'lucide-react';

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

const Eligibility = () => {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState(null);

  const handlePhoneCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // FAQ Data for Eligibility
  const faqs = [
    {
      question: 'Can I donate if I’m on medication?',
      answer: 'It depends on the medication. Some medications, like antibiotics, may require a deferral period, while others, like blood pressure medication, may not disqualify you. Contact us for specific guidance.'
    },
    {
      question: 'How soon after surgery can I donate?',
      answer: 'You must wait at least 6 months after major surgery or until fully recovered from minor procedures. Consult with our staff for personalized advice.'
    },
    {
      question: 'Can I donate if I’ve traveled recently?',
      answer: 'Travel to certain areas with infectious diseases (e.g., malaria-endemic regions) may require a deferral of 6-12 months. Check our travel restrictions for details.'
    },
    {
      question: 'What if I have a tattoo or piercing?',
      answer: 'You must wait 6 months after a tattoo or piercing from a licensed facility to ensure no infections. Unregulated facilities may require a longer deferral.'
    },
    {
      question: 'Can I donate if I’m vegetarian or vegan?',
      answer: 'Yes, as long as you meet other eligibility criteria and have adequate iron levels. A balanced diet is important for donation readiness.'
    }
  ];

  // Myths Data
  const myths = [
    {
      myth: 'Donating blood weakens you permanently.',
      fact: 'Donating blood is safe, and your body replenishes blood volume within 24-48 hours and red blood cells within weeks.'
    },
    {
      myth: 'You can contract diseases from donating blood.',
      fact: 'Donation is performed with sterile, single-use equipment, ensuring no risk of disease transmission.'
    },
    {
      myth: 'Only certain blood types are needed.',
      fact: 'All blood types are needed, though some (e.g., O-negative) are in higher demand due to their universal compatibility.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Blood Donation Eligibility</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover if you’re eligible to donate blood and make a life-saving impact. Explore the criteria below.
          </p>
          <button
            onClick={() => router.push('/donate')}
            className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Check Eligibility & Donate
          </button>
        </div>
      </section>

      {/* General Eligibility Requirements */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">General Requirements</h2>
            <p className="text-xl text-gray-600">Basic criteria to become a blood donor.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Heart className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Age</h3>
              <p className="text-gray-600">You must be between 17 and 65 years old (16 with parental consent in some regions).</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Users className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Weight</h3>
              <p className="text-gray-600">You must weigh at least 110 pounds (50 kg) to ensure safe donation.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <CheckCircle className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Health</h3>
              <p className="text-gray-600">You should be in good general health and feeling well on the day of donation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Health Conditions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Health Conditions</h2>
            <p className="text-xl text-gray-600">Certain medical conditions may affect your eligibility.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg shadow-lg p-6">
              <Stethoscope className="text-red-600 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Chronic Illnesses</h3>
              <p className="text-gray-600">Conditions like diabetes or heart disease may disqualify you if not well-controlled. Consult with our staff.</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-lg p-6">
              <XCircle className="text-red-600 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Infectious Diseases</h3>
              <p className="text-gray-600">History of HIV, hepatitis, or other transmissible diseases permanently defers you from donating.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Medications & Treatments */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Medications & Treatments</h2>
            <p className="text-xl text-gray-600">Some medications and treatments may require a deferral period.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
              <Pill className="text-red-600 mr-4" size={24} />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Medications</h3>
                <p className="text-gray-600">Antibiotics, blood thinners, or certain other drugs may require a waiting period. Check with our team.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 flex items-start">
              <Clock className="text-red-600 mr-4" size={24} />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Recent Treatments</h3>
                <p className="text-gray-600">Recent surgeries, transfusions, or vaccinations may require a deferral of 6-12 months.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle Factors */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Lifestyle Factors</h2>
            <p className="text-xl text-gray-600">Your lifestyle choices can impact your eligibility.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg shadow-lg p-6">
              <Activity className="text-red-600 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Tattoos & Piercings</h3>
              <p className="text-gray-600">Wait 6 months after getting a tattoo or piercing from a licensed facility before donating.</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-lg p-6">
              <Globe className="text-red-600 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Travel History</h3>
              <p className="text-gray-600">Travel to malaria-endemic or other high-risk areas may require a 6-12 month deferral.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pregnancy and Postpartum */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Pregnancy & Postpartum</h2>
            <p className="text-xl text-gray-600">Special considerations for female donors.</p>
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <Droplet className="text-red-600 mb-4 mx-auto" size={32} />
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Deferral Period</h3>
            <p className="text-gray-600 text-center">Women must wait at least 6 months after pregnancy, childbirth, or breastfeeding to donate.</p>
          </div>
        </div>
      </section>

      {/* Donation Frequency */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Donation Frequency</h2>
            <p className="text-xl text-gray-600">How often you can donate blood safely.</p>
          </div>
          <div className="max-w-3xl mx-auto bg-gray-50 rounded-lg shadow-lg p-6">
            <Clock className="text-red-600 mb-4 mx-auto" size={32} />
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Waiting Periods</h3>
            <p className="text-gray-600 text-center">Whole blood donors must wait 56 days between donations. Platelet or plasma donors may have shorter intervals.</p>
          </div>
        </div>
      </section>

      {/* Preparation for Donation */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Preparing to Donate</h2>
            <p className="text-xl text-gray-600">Steps to ensure a safe and successful donation experience.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Apple className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Eat Well</h3>
              <p className="text-gray-600">Consume iron-rich foods (e.g., spinach, red meat) and stay hydrated before donating.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Coffee className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Avoid Caffeine</h3>
              <p className="text-gray-600">Limit caffeine and alcohol 24 hours before donation to maintain hydration.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Clock className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Rest Well</h3>
              <p className="text-gray-600">Get a good night’s sleep before donating to ensure you’re feeling strong.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Donation Care */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Post-Donation Care</h2>
            <p className="text-xl text-gray-600">How to take care of yourself after donating blood.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg shadow-lg p-6">
              <Droplet className="text-red-600 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Hydrate</h3>
              <p className="text-gray-600">Drink plenty of water or juice after donating to replenish fluids.</p>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-lg p-6">
              <Activity className="text-red-600 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Avoid Strenuous Activity</h3>
              <p className="text-gray-600">Rest for 24 hours and avoid heavy lifting or intense exercise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* First-Time Donors */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">First-Time Donors</h2>
            <p className="text-xl text-gray-600">Special considerations for those new to blood donation.</p>
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <Users className="text-red-600 mb-4 mx-auto" size={32} />
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">What to Expect</h3>
            <p className="text-gray-600 text-center">First-time donors will undergo a health screening and receive guidance from our staff to ensure a comfortable experience.</p>
            <button
              onClick={() => router.push('/donate')}
              className="mt-4 text-red-600 font-semibold hover:text-red-700 flex items-center justify-center mx-auto"
            >
              Learn More About Donating <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Eligibility Myths Debunked */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Eligibility Myths Debunked</h2>
            <p className="text-xl text-gray-600">Clearing up common misconceptions about blood donation.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {myths.map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg shadow-lg p-6">
                <XCircle className="text-red-600 mb-4" size={32} />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Myth: {item.myth}</h3>
                <p className="text-gray-600">Fact: {item.fact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Quiz Teaser */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Take Our Eligibility Quiz</h2>
            <p className="text-xl text-gray-600">Not sure if you’re eligible? Take our quick quiz to find out!</p>
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 text-center">
            <HelpCircle className="text-red-600 mb-4 mx-auto" size={32} />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick Eligibility Check</h3>
            <p className="text-gray-600 mb-4">Answer a few questions about your health and lifestyle to determine if you can donate blood today.</p>
            <button
              onClick={() => router.push('/eligibility/quiz')}
              className="bg-red-600 text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-red-700 transition-all duration-300"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Common questions about eligibility.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 cursor-pointer"
                onClick={() => toggleFaq(index)}
                role="button"
                aria-expanded={openFaq === index}
                aria-label={`Toggle ${faq.question}`}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <Info className="mr-2 text-red-600" size={20} />
                  {faq.question}
                </h3>
                {openFaq === index && (
                  <p className="text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Donate */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Donate?</h2>
            <p className="text-xl text-gray-600">Your donation can make a life-saving difference.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Heart className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Save Lives</h3>
              <p className="text-gray-600">One donation can save up to three lives, helping patients in critical need.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Users className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Impact</h3>
              <p className="text-gray-600">Join thousands of donors making a difference in your community.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Shield className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Safe Process</h3>
              <p className="text-gray-600">Our trained staff ensure a safe and comfortable donation experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Save Lives?</h2>
          <p className="text-xl mb-8">If you’re eligible, schedule your donation today or find a donation center near you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/donate')}
              className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Schedule Donation
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
                <Link
                  href="/locations"
                  className="text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                  123 Health Ave, Medical District
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start">
              <Calendar className="mr-3" size={24} />
              <div>
                <div className="font-semibold">Operating Hours</div>
                <Link
                  href="/contact"
                  className="text-red-400 hover:text-red-300 transition-colors duration-200"
                >
                  24/7 Emergency Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Eligibility;