"use client"
import { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, Microscope, Users, Clock, Award, FileText, Eye, Lock, Beaker, Target, ArrowRight, Phone, Calendar } from 'lucide-react';

const BloodBankTesting = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const testingSteps = [
    {
      step: 1,
      title: "Initial Collection",
      description: "Blood is collected in sterile conditions with proper labeling and documentation.",
      icon: <Users className="text-red-600" size={32} />,
      duration: "5-10 minutes"
    },
    {
      step: 2,
      title: "Laboratory Receipt",
      description: "Samples arrive at our state-of-the-art testing facility within 2 hours of collection.",
      icon: <Clock className="text-red-600" size={32} />,
      duration: "< 2 hours"
    },
    {
      step: 3,
      title: "Blood Typing",
      description: "ABO and Rh factor determination using advanced immunohematology techniques.",
      icon: <Target className="text-red-600" size={32} />,
      duration: "30 minutes"
    },
    {
      step: 4,
      title: "Disease Screening",
      description: "Comprehensive testing for infectious diseases using FDA-approved methods.",
      icon: <Microscope className="text-red-600" size={32} />,
      duration: "2-4 hours"
    },
    {
      step: 5,
      title: "Quality Control",
      description: "Double verification and quality assurance checks by certified technologists.",
      icon: <Shield className="text-red-600" size={32} />,
      duration: "1 hour"
    },
    {
      step: 6,
      title: "Final Approval",
      description: "Medical director review and approval for release or disposal.",
      icon: <CheckCircle className="text-red-600" size={32} />,
      duration: "30 minutes"
    }
  ];

  const testingTypes = [
    {
      category: "Blood Typing",
      tests: [
        "ABO Blood Group (A, B, AB, O)",
        "Rh Factor (Positive/Negative)",
        "Extended Phenotyping",
        "Antibody Screening",
        "Crossmatching"
      ],
      description: "Ensures compatibility between donor and recipient blood types."
    },
    {
      category: "Infectious Disease Screening",
      tests: [
        "HIV-1/2 (Human Immunodeficiency Virus)",
        "HBV (Hepatitis B Virus)",
        "HCV (Hepatitis C Virus)",
        "HTLV-I/II (Human T-Lymphotropic Virus)",
        "Syphilis (Treponema pallidum)",
        "West Nile Virus",
        "Chagas Disease",
        "Zika Virus (seasonal)"
      ],
      description: "Protects recipients from transfusion-transmissible infections."
    },
    {
      category: "Additional Testing",
      tests: [
        "Cytomegalovirus (CMV)",
        "Hemoglobin Levels",
        "Platelet Function",
        "Bacterial Contamination",
        "Nucleic Acid Testing (NAT)"
      ],
      description: "Specialized tests based on blood component and recipient needs."
    }
  ];

  const qualityMetrics = [
    { metric: "Test Accuracy", value: "99.9%", icon: <Target className="text-blue-600" size={24} /> },
    { metric: "Processing Time", value: "< 8 hours", icon: <Clock className="text-green-600" size={24} /> },
    { metric: "FDA Compliance", value: "100%", icon: <Shield className="text-purple-600" size={24} /> },
    { metric: "Quality Control", value: "24/7", icon: <Eye className="text-orange-600" size={24} /> }
  ];

  const accordionData = [
    {
      id: 'safety',
      title: 'Safety Protocols',
      content: 'Our laboratory follows strict safety protocols including biosafety level 2 procedures, personal protective equipment requirements, and waste disposal guidelines. All staff undergo regular training and certification updates.'
    },
    {
      id: 'technology',
      title: 'Testing Technology',
      content: 'We utilize state-of-the-art automated testing systems including enzyme immunoassays, chemiluminescent microparticle immunoassays, and nucleic acid amplification testing to ensure the highest accuracy and sensitivity.'
    },
    {
      id: 'certification',
      title: 'Certifications & Accreditation',
      content: 'Our laboratory is accredited by AABB, CAP, and FDA registered. We maintain certifications including CLIA, ISO 15189, and participate in proficiency testing programs to ensure continuous quality improvement.'
    },
    {
      id: 'results',
      title: 'Results & Reporting',
      content: 'Test results are available within 8 hours of sample receipt. Results are reported through secure electronic systems to authorized healthcare providers. Donors receive notification of any significant findings requiring follow-up.'
    }
  ];

  const handleNavigation = (path) => {
    console.log(`Navigating to: ${path}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-full">
                <Microscope size={48} />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Blood Testing Services</h1>
            <p className="text-xl mb-8">
              State-of-the-art laboratory testing ensuring the safety and compatibility of every blood donation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleNavigation('/contact')}
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Contact Lab
              </button>
              <button 
                onClick={() => handleNavigation('/schedule-test')}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
              >
                Schedule Test
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Metrics */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {qualityMetrics.map((item, index) => (
              <div key={index} className="text-center bg-white rounded-lg p-6 shadow-lg">
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{item.value}</div>
                <div className="text-gray-600">{item.metric}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testing Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Testing Process</h2>
            <p className="text-xl text-gray-600">From collection to approval - every step ensures safety</p>
          </div>

          <div className="max-w-6xl mx-auto">
            {testingSteps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center mb-12 last:mb-0">
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>
                <div className="flex-grow text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start mb-2">
                    <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full mr-3">
                      Step {step.step}
                    </span>
                    <span className="text-sm text-gray-500">{step.duration}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < testingSteps.length - 1 && (
                  <div className="hidden md:block ml-8">
                    <ArrowRight className="text-gray-400" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testing Types Tabs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Comprehensive Testing</h2>
            <p className="text-xl text-gray-600">Every donation undergoes rigorous testing</p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
              {testingTypes.map((type, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(type.category.toLowerCase().replace(/\s+/g, ''))}
                  className={`px-6 py-3 font-semibold border-b-2 transition-colors duration-300 ${
                    activeTab === type.category.toLowerCase().replace(/\s+/g, '')
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-gray-600 hover:text-red-600'
                  }`}
                >
                  {type.category}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {testingTypes.map((type, index) => (
              <div
                key={index}
                className={`${
                  activeTab === type.category.toLowerCase().replace(/\s+/g, '') ? 'block' : 'hidden'
                }`}
              >
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">{type.category}</h3>
                      <p className="text-gray-600 mb-6">{type.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Shield size={16} className="mr-2" />
                        FDA Approved Testing Methods
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Tests Performed:</h4>
                      <ul className="space-y-2">
                        {type.tests.map((test, testIndex) => (
                          <li key={testIndex} className="flex items-center text-gray-700">
                            <CheckCircle size={16} className="text-green-500 mr-3 flex-shrink-0" />
                            {test}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">Learn more about our testing procedures</p>
            </div>

            <div className="space-y-4">
              {accordionData.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedAccordion(expandedAccordion === item.id ? null : item.id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="text-lg font-semibold text-gray-800">{item.title}</span>
                    <div className={`transform transition-transform duration-200 ${
                      expandedAccordion === item.id ? 'rotate-180' : ''
                    }`}>
                      <ArrowRight className="text-gray-400" size={20} />
                    </div>
                  </button>
                  {expandedAccordion === item.id && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">{item.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Laboratory Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">World-Class Laboratory</h2>
            <p className="text-xl text-gray-600">Advanced technology and expert staff</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Beaker className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Automated Systems</h3>
              <p className="text-gray-600">
                State-of-the-art automated testing equipment reduces human error and increases efficiency.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Secure Data</h3>
              <p className="text-gray-600">
                HIPAA-compliant data management with encrypted storage and secure transmission.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Expert Staff</h3>
              <p className="text-gray-600">
                Board-certified pathologists and licensed medical technologists ensure quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Questions About Our Testing?</h2>
          <p className="text-xl mb-8">Our laboratory experts are here to help</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleNavigation('/contact')}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center"
            >
              <Phone size={20} className="mr-2" />
              Contact Lab Director
            </button>
            <button 
              onClick={() => handleNavigation('/schedule-tour')}
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300 flex items-center justify-center"
            >
              <Calendar size={20} className="mr-2" />
              Schedule Lab Tour
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BloodBankTesting;