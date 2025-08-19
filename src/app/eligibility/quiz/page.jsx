"use client";
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Heart, Phone, MapPin, Calendar, HelpCircle, CheckCircle, XCircle, ArrowRight, Users } from 'lucide-react';

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
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

const EligibilityQuiz = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    age: '',
    weight: '',
    health: '',
    pregnancy: '',
    tattoo: '',
    travel: '',
    medication: '',
    surgery: ''
  });
  const [result, setResult] = useState(null);

  const questions = [
    {
      id: 'age',
      question: 'Are you between 17 and 65 years old (or 16 with parental consent)?',
      options: ['Yes', 'No'],
      description: 'You must be between 17 and 65 years old to donate blood (16 with parental consent in some regions).'
    },
    {
      id: 'weight',
      question: 'Do you weigh at least 110 pounds (50 kg)?',
      options: ['Yes', 'No'],
      description: 'A minimum weight of 110 pounds is required to ensure safe donation.'
    },
    {
      id: 'health',
      question: 'Are you in good general health and feeling well today?',
      options: ['Yes', 'No'],
      description: 'You should be free from acute illnesses (e.g., cold, flu) and chronic conditions that are not well-controlled.'
    },
    {
      id: 'pregnancy',
      question: 'If female, have you been pregnant or breastfeeding in the last 6 months?',
      options: ['Yes', 'No', 'Not applicable'],
      description: 'Women must wait 6 months after pregnancy or breastfeeding to donate.'
    },
    {
      id: 'tattoo',
      question: 'Have you gotten a tattoo or piercing in the last 6 months?',
      options: ['Yes', 'No'],
      description: 'A 6-month deferral is required after tattoos or piercings to ensure no infections.'
    },
    {
      id: 'travel',
      question: 'Have you traveled to a malaria-endemic area in the last 12 months?',
      options: ['Yes', 'No'],
      description: 'Travel to certain high-risk areas may require a 6-12 month deferral.'
    },
    {
      id: 'medication',
      question: 'Are you currently taking antibiotics or blood thinners?',
      options: ['Yes', 'No'],
      description: 'Certain medications, like antibiotics or blood thinners, may require a deferral period.'
    },
    {
      id: 'surgery',
      question: 'Have you had major surgery in the last 6 months?',
      options: ['Yes', 'No'],
      description: 'A 6-month deferral is required after major surgery or until fully recovered from minor procedures.'
    }
  ];

  const handleAnswer = (answer) => {
    setQuizAnswers({ ...quizAnswers, [questions[step].id]: answer });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate result
      const isEligible = (
        quizAnswers.age === 'Yes' &&
        quizAnswers.weight === 'Yes' &&
        quizAnswers.health === 'Yes' &&
        (quizAnswers.pregnancy === 'No' || quizAnswers.pregnancy === 'Not applicable') &&
        quizAnswers.tattoo === 'No' &&
        quizAnswers.travel === 'No' &&
        quizAnswers.medication === 'No' &&
        quizAnswers.surgery === 'No'
      );
      setResult({
        eligible: isEligible,
        message: isEligible
          ? 'Based on your answers, you may be eligible to donate blood! Schedule an appointment to confirm with our staff.'
          : 'Based on your answers, you may not be eligible to donate at this time. Contact us for personalized guidance.'
      });
    }
  };

  const handleRestart = () => {
    setStep(0);
    setQuizAnswers({
      age: '',
      weight: '',
      health: '',
      pregnancy: '',
      tattoo: '',
      travel: '',
      medication: '',
      surgery: ''
    });
    setResult(null);
  };

  const handlePhoneCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Blood Donation Eligibility Quiz</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Answer a few questions to determine if you’re eligible to donate blood and help save lives.
          </p>
          <Link
            href="/eligibility"
            className="text-red-100 underline hover:text-white transition-colors"
          >
            Learn More About Eligibility
          </Link>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {result ? 'Your Eligibility Results' : 'Eligibility Quiz'}
            </h2>
            <p className="text-xl text-gray-600">
              {result ? 'See your results below.' : 'Answer each question to check your eligibility.'}
            </p>
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
            {!result ? (
              <div>
                <div className="flex items-center mb-6">
                  <HelpCircle className="text-red-600 mr-3" size={32} />
                  <h3 className="text-2xl font-semibold text-gray-800">
                    Question {step + 1} of {questions.length}
                  </h3>
                </div>
                <p className="text-lg text-gray-600 mb-4">{questions[step].question}</p>
                <p className="text-sm text-gray-500 mb-6">{questions[step].description}</p>
                <div className="grid md:grid-cols-3 gap-4">
                  {questions[step].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-all duration-300"
                      aria-label={`Select ${option} for ${questions[step].question}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="mt-6 text-sm text-gray-600">
                  Progress: {step + 1}/{questions.length}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-center mb-6">
                  {result.eligible ? (
                    <CheckCircle className="text-green-600 mr-3" size={32} />
                  ) : (
                    <XCircle className="text-red-600 mr-3" size={32} />
                  )}
                  <h3 className="text-2xl font-semibold text-gray-800">Your Results</h3>
                </div>
                <p className="text-lg text-gray-600 mb-6">{result.message}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {result.eligible ? (
                    <button
                      onClick={() => router.push('/donate')}
                      className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all duration-300"
                      aria-label="Schedule a blood donation"
                    >
                      Schedule Donation
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePhoneCall('+15559110000')}
                      className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition-all duration-300"
                      aria-label="Contact blood bank for eligibility guidance"
                    >
                      Contact Us
                    </button>
                  )}
                  <button
                    onClick={handleRestart}
                    className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-red-600 hover:text-white transition-all duration-300"
                    aria-label="Restart eligibility quiz"
                  >
                    Restart Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Next Steps</h2>
            <p className="text-xl text-gray-600">
              Whether you’re eligible or not, here’s how you can get involved.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg shadow-lg p-6 text-center">
              <Heart className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Donate Blood</h3>
              <p className="text-gray-600 mb-4">If eligible, schedule a donation to save lives.</p>
              <button
                onClick={() => router.push('/donate')}
                className="text-red-600 font-semibold hover:text-red-700 flex items-center justify-center mx-auto"
                aria-label="Learn more about donating blood"
              >
                Schedule Now <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-lg p-6 text-center">
              <Users className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Spread Awareness</h3>
              <p className="text-gray-600 mb-4">Share our mission to encourage others to donate.</p>
              <Link
                href="/about"
                className="text-red-600 font-semibold hover:text-red-700 flex items-center justify-center"
                aria-label="Learn more about our mission"
              >
                Learn More <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            <div className="bg-gray-50 rounded-lg shadow-lg p-6 text-center">
              <Phone className="text-red-600 mx-auto mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Support</h3>
              <p className="text-gray-600 mb-4">Have questions? Contact our team for guidance.</p>
              <button
                onClick={() => handlePhoneCall('+15559110000')}
                className="text-red-600 font-semibold hover:text-red-700 flex items-center justify-center"
                aria-label="Contact blood bank for support"
              >
                Contact Us <ArrowRight size={16} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Common questions about the eligibility quiz.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'Is the quiz result definitive?',
                answer: 'The quiz provides a preliminary assessment. Final eligibility is confirmed by our staff during the donation process.'
              },
              {
                question: 'Can I retake the quiz?',
                answer: 'Yes, you can restart the quiz at any time to reassess your eligibility.'
              },
              {
                question: 'What if I’m not eligible now?',
                answer: 'If you’re not eligible, you may become eligible later. Contact us to discuss your specific situation.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <HelpCircle className="mr-2 text-red-600" size={20} />
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
          <p className="text-xl mb-8">Take the next step to save lives through blood donation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/donate')}
              className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              aria-label="Schedule a blood donation"
            >
              Schedule Donation
            </button>
            <button
              onClick={() => router.push('/locations')}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-300"
              aria-label="Find a donation center"
            >
              Find Donation Center
            </button>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default EligibilityQuiz;